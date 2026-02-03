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
  Plus,
  RefreshCw,
  Download,
  AlertCircle,
  CheckCircle2,
  Loader2,
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
  lastModified?: string;
}

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export const GoogleSheetsConnect = ({ data, city, country, niche }: GoogleSheetsConnectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetName, setSheetName] = useState("Sheet1");
  const [isExporting, setIsExporting] = useState(false);
  const [savedSheets, setSavedSheets] = useState<SheetInfo[]>([]);
  const [showNewSheet, setShowNewSheet] = useState(false);
  const [newSheetName, setNewSheetName] = useState("");
  const { toast } = useToast();

  // Load saved sheets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dataforge_google_sheets");
    if (saved) {
      try {
        setSavedSheets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved sheets:", e);
      }
    }
  }, []);

  // Save sheets to localStorage
  const saveSheetToHistory = (sheet: SheetInfo) => {
    const updated = [sheet, ...savedSheets.filter(s => s.id !== sheet.id)].slice(0, 10);
    setSavedSheets(updated);
    localStorage.setItem("dataforge_google_sheets", JSON.stringify(updated));
  };

  const handleConnect = async () => {
    if (!spreadsheetId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a spreadsheet ID",
        variant: "destructive",
      });
      return;
    }

    setConnectionStatus("connecting");

    try {
      // Test connection by calling the edge function
      const { data: result, error } = await supabase.functions.invoke("export-sheets", {
        body: {
          action: "test",
          spreadsheetId: spreadsheetId.trim(),
        },
      });

      if (error) throw error;

      if (result?.success) {
        setConnectionStatus("connected");
        saveSheetToHistory({
          id: spreadsheetId.trim(),
          name: result.sheetName || `Sheet - ${city}`,
          lastModified: new Date().toISOString(),
        });
        toast({
          title: "Connected!",
          description: "Successfully connected to Google Sheets",
        });
      } else {
        throw new Error(result?.error || "Failed to connect");
      }
    } catch (error: any) {
      setConnectionStatus("error");
      toast({
        title: "Connection Failed",
        description: error.message || "Could not connect to the spreadsheet",
        variant: "destructive",
      });
    }
  };

  const handleExport = async (fullExport: boolean) => {
    if (!spreadsheetId.trim()) {
      toast({
        title: "Error",
        description: "Please connect to a spreadsheet first",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    try {
      const exportData = data.map((item) => {
        if (fullExport) {
          return {
            "Business Name": item.name,
            "Email": item.email || "",
            "Phone": item.phone || "",
            "Website": item.website || "",
            "Address": item.address || "",
            "Category": item.category || "",
            "Facebook": item.socialMedia?.facebook || "",
            "Instagram": item.socialMedia?.instagram || "",
            "Twitter": item.socialMedia?.twitter || "",
            "LinkedIn": item.socialMedia?.linkedin || "",
            "Rating": item.rating?.toString() || "",
            "Reviews": item.reviews?.toString() || "",
          };
        } else {
          return {
            "Business Name": item.name,
            "Email": item.email || "",
            "Description": item.category || "",
            "Website": item.website || "",
          };
        }
      });

      const { data: result, error } = await supabase.functions.invoke("export-sheets", {
        body: {
          action: "export",
          spreadsheetId: spreadsheetId.trim(),
          sheetName: sheetName || "Sheet1",
          data: exportData,
          niche,
          city,
          country,
        },
      });

      if (error) throw error;

      if (result?.success) {
        toast({
          title: "Export Successful!",
          description: `${data.length} records exported to Google Sheets`,
        });
        
        saveSheetToHistory({
          id: spreadsheetId.trim(),
          name: `${niche} - ${city}`,
          lastModified: new Date().toISOString(),
        });
      } else {
        throw new Error(result?.error || "Export failed");
      }
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message || "Could not export to Google Sheets",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const selectSheet = (sheet: SheetInfo) => {
    setSpreadsheetId(sheet.id);
    setConnectionStatus("disconnected");
  };

  const removeSheet = (sheetId: string) => {
    const updated = savedSheets.filter(s => s.id !== sheetId);
    setSavedSheets(updated);
    localStorage.setItem("dataforge_google_sheets", JSON.stringify(updated));
  };

  const extractSpreadsheetId = (input: string): string => {
    // Handle full URLs
    const urlMatch = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch) return urlMatch[1];
    // Handle just the ID
    return input.trim();
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
          <span>Export to Sheets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-xl">
            <FileSpreadsheet className="h-6 w-6 text-copper" />
            Google Sheets Export
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Connection Status */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-input border border-border">
            {connectionStatus === "connected" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : connectionStatus === "connecting" ? (
              <Loader2 className="h-5 w-5 text-copper animate-spin" />
            ) : connectionStatus === "error" ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Link2 className="h-5 w-5 text-muted-foreground" />
            )}
            <div className="flex-1">
              <p className="font-medium text-sm">
                {connectionStatus === "connected" ? "Connected to Google Sheets" :
                 connectionStatus === "connecting" ? "Connecting..." :
                 connectionStatus === "error" ? "Connection Failed" :
                 "Not Connected"}
              </p>
              <p className="text-xs text-muted-foreground">
                {connectionStatus === "connected" 
                  ? `Ready to export ${data.length} records`
                  : "Enter your spreadsheet ID to connect"
                }
              </p>
            </div>
          </div>

          {/* Saved Sheets */}
          {savedSheets.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Recent Sheets</Label>
              <div className="grid gap-2 max-h-32 overflow-y-auto">
                {savedSheets.map((sheet) => (
                  <div
                    key={sheet.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      spreadsheetId === sheet.id 
                        ? "border-copper bg-copper/10" 
                        : "border-border hover:border-copper/50"
                    }`}
                    onClick={() => selectSheet(sheet)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileSpreadsheet className="h-4 w-4 text-copper flex-shrink-0" />
                      <span className="text-sm truncate">{sheet.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSheet(sheet.id);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spreadsheet ID Input */}
          <div className="space-y-2">
            <Label htmlFor="spreadsheetId" className="text-sm font-medium">
              Spreadsheet ID or URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="spreadsheetId"
                value={spreadsheetId}
                onChange={(e) => {
                  setSpreadsheetId(extractSpreadsheetId(e.target.value));
                  setConnectionStatus("disconnected");
                }}
                placeholder="Paste spreadsheet URL or ID..."
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                onClick={handleConnect}
                disabled={connectionStatus === "connecting" || !spreadsheetId.trim()}
                className="flex-shrink-0"
              >
                {connectionStatus === "connecting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : connectionStatus === "connected" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Paste the full URL or just the spreadsheet ID from Google Sheets
            </p>
          </div>

          {/* Sheet Name */}
          <div className="space-y-2">
            <Label htmlFor="sheetName" className="text-sm font-medium">
              Sheet Tab Name
            </Label>
            <Input
              id="sheetName"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              placeholder="Sheet1"
              className="font-mono text-sm"
            />
          </div>

          {/* Export Buttons */}
          <AnimatePresence mode="wait">
            {connectionStatus === "connected" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="mechanical"
                    onClick={() => handleExport(false)}
                    disabled={isExporting}
                    className="flex items-center gap-2"
                  >
                    {isExporting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Basic Export
                  </Button>
                  <Button
                    variant="copper"
                    onClick={() => handleExport(true)}
                    disabled={isExporting}
                    className="flex items-center gap-2"
                  >
                    {isExporting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Full Export
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="p-2 bg-input rounded border border-border">
                    <p className="font-semibold text-foreground mb-1">Basic</p>
                    <p>Name, Email, Description, Website</p>
                  </div>
                  <div className="p-2 bg-input rounded border border-border">
                    <p className="font-semibold text-foreground mb-1">Full</p>
                    <p>All fields including social, rating, reviews</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Section */}
          <div className="p-4 bg-brass/10 rounded-lg border border-brass/20">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-brass" />
              Quick Setup
            </h4>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Create a new Google Sheet or open existing</li>
              <li>Copy the spreadsheet URL from browser</li>
              <li>Paste above and click connect</li>
              <li>Choose Basic or Full export</li>
            </ol>
            <a
              href="https://sheets.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-copper hover:text-copper/80"
            >
              Open Google Sheets <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
