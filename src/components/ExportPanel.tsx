import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BusinessData } from "@/types/business";
import { exportToExcel, ExportMode } from "@/utils/exportUtils";
import { FileSpreadsheet, Download, FileText, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleSheetsConnect } from "@/components/GoogleSheetsConnect";

interface ExportPanelProps {
  data: BusinessData[];
  city: string;
  country: string;
  niche: string;
}

export const ExportPanel = ({ data, city, country, niche }: ExportPanelProps) => {
  const { toast } = useToast();

  if (data.length === 0) {
    return null;
  }

  const handleExport = (mode: ExportMode) => {
    const filename = `${niche}_${city}_${country}_${new Date().toISOString().split("T")[0]}`;
    exportToExcel(data, filename, mode);
    
    toast({
      title: "Export Successful",
      description: `${data.length} records exported to ${filename}.xlsx`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="industrial-panel rounded-xl p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-6 w-6 text-copper" />
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Export Data
            </h3>
            <p className="text-muted-foreground text-sm font-mono">
              {data.length} records ready for export
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <GoogleSheetsConnect data={data} city={city} country={country} niche={niche} />
          <Button
            variant="mechanical"
            onClick={() => handleExport("basic")}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Basic Export</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("contact")}
            className="flex items-center gap-2 border-copper/30 hover:border-copper hover:bg-copper/10"
          >
            <Phone className="h-4 w-4" />
            <span>Contact Export</span>
          </Button>
          <Button
            variant="copper"
            onClick={() => handleExport("full")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Full Export</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-muted-foreground">
        <div className="p-3 bg-input rounded-lg border border-border">
          <p className="font-display text-foreground mb-1 font-semibold">Basic Export</p>
          <p>Name, Email, Description, Website</p>
        </div>
        <div className="p-3 bg-input rounded-lg border border-border">
          <p className="font-display text-foreground mb-1 font-semibold">Contact Export</p>
          <p>Name, Phone, Description</p>
        </div>
        <div className="p-3 bg-input rounded-lg border border-border">
          <p className="font-display text-foreground mb-1 font-semibold">Full Export</p>
          <p>All fields: Name, Email, Phone, Address, Social Media, Rating, Reviews, etc.</p>
        </div>
      </div>
    </motion.div>
  );
};
