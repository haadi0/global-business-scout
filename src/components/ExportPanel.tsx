import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BusinessData } from "@/types/business";
import { exportToExcel } from "@/utils/exportUtils";
import { FileSpreadsheet, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleSheetsGuide } from "@/components/GoogleSheetsGuide";

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

  const handleExport = (fullExport: boolean) => {
    // Include niche in filename
    const filename = `${niche}_${city}_${country}_${new Date().toISOString().split("T")[0]}`;
    exportToExcel(data, filename, fullExport);
    
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
          <GoogleSheetsGuide />
          <Button
            variant="mechanical"
            onClick={() => handleExport(false)}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Basic Export</span>
          </Button>
          <Button
            variant="copper"
            onClick={() => handleExport(true)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Full Export</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-muted-foreground">
        <div className="p-3 bg-input rounded-lg border border-border">
          <p className="font-display text-foreground mb-1 font-semibold">Basic Export</p>
          <p>Name, Email, Description, Website</p>
        </div>
        <div className="p-3 bg-input rounded-lg border border-border">
          <p className="font-display text-foreground mb-1 font-semibold">Full Export</p>
          <p>All fields: Name, Email, Phone, Address, Social Media, Rating, Reviews, etc.</p>
        </div>
      </div>
    </motion.div>
  );
};
