import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileSpreadsheet,
  Check,
  ExternalLink,
  Link2,
  RefreshCw,
  Download,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Trash2,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BusinessData } from "@/types/business";
import { supabase } from "@/integrations/supabase/client";

interface GoogleSheetsConnectProps {
  data: BusinessData[];
  city: string;
  country: string;
  niche: string;
}

interface SheetInfo {
  id: string;
  name: string;
  lastUsed: string;
}

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export const GoogleSheetsConnect = ({ data, city, country, niche }: GoogleSheetsConnectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [spreadsheetInput, setSpreadsheetInput] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [savedSheets, setSavedSheets] = useState<SheetInfo[]>([]);
  const { toast } = useToast();

  // Load saved sheets
  useEffect(() => {
    const saved = localStorage.getItem("dataforge_google_sheets");
    if (saved) {
      try { setSavedSheets(JSON.parse(saved)); } catch {}
    }
  }, []);

  const saveSheet = (sheet: SheetInfo) => {
    const updated = [sheet, ...savedSheets.filter(s => s.id !== sheet.id)].slice(0, 10);
    setSavedSheets(updated);
    localStorage.setItem("dataforge_google_sheets", JSON.stringify(updated));
  };

  const removeSheet = (id: string) => {
    const updated = savedSheets.filter(s => s.id !== id);
    setSavedSheets(updated);
    localStorage.setItem("dataforge_google_sheets", JSON.stringify(updated));
  };

  const extractId = (input: string): string => {
    const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : input.trim();
  };

  const handleInputChange = (value: string) => {
    setSpreadsheetInput(value);
    const id = extractId(value);
    setSpreadsheetId(id);
    setConnectionStatus("disconnected");
  };

  const handleConnect = async () => {
    if (!spreadsheetId) {
      toast({ title: "Error", description: "Enter a spreadsheet URL or ID", variant: "destructive" });
      return;
    }

    setConnectionStatus("connecting");
    try {
      const { data: result, error } = await supabase.functions.invoke("export-sheets", {
        body: { action: "test", spreadsheetId, niche, city },
      });
      if (error) throw error;
      if (result?.success) {
        setConnectionStatus("connected");
        const sheetName = `${niche || 'Data'} - ${city || 'Export'}`;
        saveSheet({ id: spreadsheetId, name: sheetName, lastUsed: new Date().toISOString() });
        toast({ title: "✓ Connected", description: "Ready to export data" });
      } else {
        throw new Error(result?.error || "Connection failed");
      }
    } catch (error: any) {
      setConnectionStatus("error");
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleQuickConnect = (sheet: SheetInfo) => {
    setSpreadsheetInput(sheet.id);
    setSpreadsheetId(sheet.id);
    setConnectionStatus("connected");
    saveSheet({ ...sheet, lastUsed: new Date().toISOString() });
    toast({ title: "✓ Connected", description: `Connected to ${sheet.name}` });
  };

  const handleExport = async (fullExport: boolean) => {
    if (!spreadsheetId || connectionStatus !== "connected") {
      toast({ title: "Not connected", description: "Connect to a sheet first", variant: "destructive" });
      return;
    }
    setIsExporting(true);
    try {
      const exportData = data.map((item) =>
        fullExport
          ? {
              "Business Name": item.name,
              Email: item.email || "",
              Phone: item.phone || "",
              Website: item.website || "",
              Address: item.address || "",
              Category: item.category || "",
              Facebook: item.socialMedia?.facebook || "",
              Instagram: item.socialMedia?.instagram || "",
              Twitter: item.socialMedia?.twitter || "",
              LinkedIn: item.socialMedia?.linkedin || "",
              Rating: item.rating?.toString() || "",
              Reviews: item.reviews?.toString() || "",
            }
          : {
              "Business Name": item.name,
              Email: item.email || "",
              Description: item.category || "",
              Website: item.website || "",
            }
      );

      const { data: result, error } = await supabase.functions.invoke("export-sheets", {
        body: {
          action: "export",
          spreadsheetId,
          sheetName: `${niche}_${city}`,
          data: exportData,
          niche,
          city,
          country,
        },
      });

      if (error) throw error;
      if (result?.success) {
        // Copy CSV data to clipboard for easy paste
        if (result.csvData) {
          await navigator.clipboard.writeText(result.csvData);
        }
        toast({
          title: "Export Ready!",
          description: `${data.length} records copied to clipboard. Open your sheet and paste (Ctrl+V).`,
        });
      } else {
        throw new Error(result?.error || "Export failed");
      }
    } catch (error: any) {
      toast({ title: "Export Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyData = async (fullExport: boolean) => {
    const exportData = data.map((item) =>
      fullExport
        ? [item.name, item.email || "", item.phone || "", item.website || "", item.address || "", item.category || "", item.rating?.toString() || "", item.reviews?.toString() || ""].join("\t")
        : [item.name, item.email || "", item.category || "", item.website || ""].join("\t")
    );
    const headers = fullExport
      ? "Name\tEmail\tPhone\tWebsite\tAddress\tCategory\tRating\tReviews"
      : "Name\tEmail\tDescription\tWebsite";
    const tsvContent = [headers, ...exportData].join("\n");

    try {
      await navigator.clipboard.writeText(tsvContent);
      toast({
        title: "Copied to Clipboard!",
        description: `${data.length} records ready to paste into Google Sheets.`,
      });
    } catch {
      toast({ title: "Copy failed", description: "Could not access clipboard", variant: "destructive" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-copper/30 hover:border-copper hover:bg-copper/10"
          disabled={data.length === 0}
        >
          <FileSpreadsheet className="h-4 w-4 text-copper" />
          <span>Google Sheets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-xl">
            <FileSpreadsheet className="h-6 w-6 text-copper" />
            Google Sheets Export
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Quick Connect - Saved Sheets */}
          {savedSheets.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Recent Sheets — Click to Connect</Label>
              <div className="grid gap-1.5">
                {savedSheets.map((sheet) => (
                  <div
                    key={sheet.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                      spreadsheetId === sheet.id && connectionStatus === "connected"
                        ? "border-green-500/50 bg-green-500/5"
                        : "border-border hover:border-copper/50 hover:bg-copper/5"
                    }`}
                    onClick={() => handleQuickConnect(sheet)}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {spreadsheetId === sheet.id && connectionStatus === "connected" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <FileSpreadsheet className="h-4 w-4 text-copper flex-shrink-0" />
                      )}
                      <span className="text-sm truncate">{sheet.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
                      onClick={(e) => { e.stopPropagation(); removeSheet(sheet.id); }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Connection */}
          <div className="space-y-2">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {savedSheets.length > 0 ? "Or Connect New Sheet" : "Connect Google Sheet"}
            </Label>
            <div className="flex gap-2">
              <Input
                value={spreadsheetInput}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Paste Google Sheets URL or ID..."
                className="flex-1 font-mono text-xs"
              />
              <Button
                variant={connectionStatus === "connected" ? "outline" : "copper"}
                size="sm"
                onClick={handleConnect}
                disabled={connectionStatus === "connecting" || !spreadsheetId}
                className="px-4"
              >
                {connectionStatus === "connecting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : connectionStatus === "connected" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-mono ${
            connectionStatus === "connected" ? "bg-green-500/10 text-green-600" :
            connectionStatus === "error" ? "bg-red-500/10 text-red-500" :
            "bg-muted text-muted-foreground"
          }`}>
            {connectionStatus === "connected" ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Connected — {data.length} records ready to export
              </>
            ) : connectionStatus === "error" ? (
              <>
                <AlertCircle className="h-3.5 w-3.5" />
                Connection failed. Check your spreadsheet ID.
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" />
                Enter spreadsheet URL to connect
              </>
            )}
          </div>

          {/* Export Actions */}
          <AnimatePresence>
            {connectionStatus === "connected" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="mechanical"
                    size="sm"
                    onClick={() => handleExport(false)}
                    disabled={isExporting}
                  >
                    {isExporting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Download className="h-4 w-4 mr-1" />}
                    Basic Export
                  </Button>
                  <Button
                    variant="copper"
                    size="sm"
                    onClick={() => handleExport(true)}
                    disabled={isExporting}
                  >
                    {isExporting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Download className="h-4 w-4 mr-1" />}
                    Full Export
                  </Button>
                </div>

                {/* One-Click Copy for pasting */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleCopyData(false)}>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy Basic
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleCopyData(true)}>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy Full
                  </Button>
                </div>

                <p className="text-[10px] text-muted-foreground text-center">
                  Export prepares data → Open your Google Sheet → Paste with Ctrl+V
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Help */}
          <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">How it works:</p>
            <ol className="list-decimal list-inside space-y-0.5">
              <li>Open <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Google Sheets <ExternalLink className="h-2.5 w-2.5 inline" /></a> and create/open a sheet</li>
              <li>Copy the URL from your browser</li>
              <li>Paste it above and connect</li>
              <li>Click Export or Copy, then paste into your sheet</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
