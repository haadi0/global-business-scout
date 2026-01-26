import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrapeHistoryItem, fetchScrapeHistory, deleteScrapeHistory, clearAllHistory } from "@/services/sessionService";
import { exportToExcel } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { 
  History, 
  Download, 
  Trash2, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  MapPin,
  Briefcase,
  Database
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HistoryPanelProps {
  onLoadHistory: (item: ScrapeHistoryItem) => void;
  onContinueScrape: (item: ScrapeHistoryItem) => void;
  refreshTrigger?: number;
}

export const HistoryPanel = ({ onLoadHistory, onContinueScrape, refreshTrigger }: HistoryPanelProps) => {
  const [history, setHistory] = useState<ScrapeHistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await fetchScrapeHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      await deleteScrapeHistory(id);
      setHistory(prev => prev.filter(item => item.id !== id));
      toast({
        title: "History Deleted",
        description: "Scrape history item has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete history item.",
        variant: "destructive",
      });
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllHistory();
      setHistory([]);
      toast({
        title: "History Cleared",
        description: "All scrape history has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear history.",
        variant: "destructive",
      });
    }
  };

  const handleExport = (item: ScrapeHistoryItem) => {
    const filename = `${item.niche}_${item.city}_${item.country}_${new Date(item.created_at).toISOString().split("T")[0]}`;
    exportToExcel(item.data, filename, true);
    toast({
      title: "Export Successful",
      description: `${item.data.length} records exported to ${filename}.xlsx`,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (history.length === 0 && !isLoading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="industrial-panel rounded-xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-copper/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-copper" />
          <span className="font-display font-bold text-foreground">Scrape History</span>
          <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
            {history.length} files
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              loadHistory();
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              {/* Clear All Button */}
              {history.length > 0 && (
                <div className="flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All History
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear All History?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all your scrape history. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearAll} className="bg-destructive text-destructive-foreground">
                          Clear All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              {/* History Items */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-card border border-border rounded-lg hover:border-copper/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Briefcase className="h-4 w-4 text-copper flex-shrink-0" />
                          <span className="font-display font-bold text-foreground truncate">
                            {item.niche}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.city}, {item.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            {item.total_scraped} records
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLoadHistory(item)}
                          title="View Data"
                        >
                          <Database className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExport(item)}
                          title="Download Excel"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="mechanical"
                          size="sm"
                          onClick={() => onContinueScrape(item)}
                          title="Continue Scraping"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this history?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the scrape history for "{item.niche}" in {item.city}, {item.country}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive text-destructive-foreground">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
