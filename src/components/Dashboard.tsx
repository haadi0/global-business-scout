import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GearIcon } from "@/components/ui/GearIcon";
import { ScrapeForm } from "@/components/ScrapeForm";
import { DataTable } from "@/components/DataTable";
import { ExportPanel } from "@/components/ExportPanel";
import { UsageStats } from "@/components/UsageStats";
import { HistoryPanel } from "@/components/HistoryPanel";
import { BusinessData } from "@/types/business";
import { scrapeBusinessData } from "@/services/scrapeService";
import { 
  fetchApiUsage, 
  incrementApiUsage, 
  saveScrapeHistory, 
  findExistingScrape,
  ScrapeHistoryItem 
} from "@/services/sessionService";
import { useToast } from "@/hooks/use-toast";
import { Database, LogOut, Cog, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [limit, setLimit] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<BusinessData[]>([]);
  const [requestsUsed, setRequestsUsed] = useState(0);
  const [bandwidthUsedMB, setBandwidthUsedMB] = useState(0);
  const [existingScrape, setExistingScrape] = useState<ScrapeHistoryItem | null>(null);
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);
  const { toast } = useToast();

  // Load API usage from database on mount
  useEffect(() => {
    const loadUsage = async () => {
      try {
        const usage = await fetchApiUsage();
        setRequestsUsed(usage.requests_used);
        setBandwidthUsedMB(usage.bandwidth_used_mb);
      } catch (error) {
        console.error('Failed to load API usage:', error);
      }
    };
    loadUsage();
  }, []);

  // Check for existing scrape when inputs change
  useEffect(() => {
    const checkExisting = async () => {
      if (country && city && niche) {
        try {
          const existing = await findExistingScrape(country, city, niche);
          setExistingScrape(existing);
        } catch (error) {
          console.error('Failed to check existing scrape:', error);
        }
      } else {
        setExistingScrape(null);
      }
    };
    checkExisting();
  }, [country, city, niche]);

  const handleScrape = async (isContinue: boolean = false, offset: number = 0) => {
    if (!country || !city || !niche.trim()) {
      toast({
        title: "Missing Parameters",
        description: "Please enter country, city, and business niche to start scraping.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    if (!isContinue) {
      setScrapedData([]);
    }

    try {
      const result = await scrapeBusinessData(country, city, niche, limit, offset);

      if (result.success) {
        // Merge with existing data if continuing
        const newData = isContinue && existingScrape 
          ? [...existingScrape.data, ...result.data]
          : result.data;
        
        setScrapedData(newData);
        
        // Update API usage in database
        const bandwidthAdded = result.data.length * 0.02;
        const updatedUsage = await incrementApiUsage(bandwidthAdded);
        setRequestsUsed(updatedUsage.requests_used);
        setBandwidthUsedMB(updatedUsage.bandwidth_used_mb);

        // Save to history
        await saveScrapeHistory(country, city, niche, newData, offset + result.data.length);
        setHistoryRefreshTrigger(prev => prev + 1);

        toast({
          title: isContinue ? "Continue Scraping Complete" : "Scraping Complete",
          description: `${result.data.length} new records scraped. Total: ${newData.length} records.`,
        });
      } else {
        toast({
          title: "Scraping Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during scraping.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueScrape = () => {
    if (existingScrape) {
      handleScrape(true, existingScrape.last_offset);
    }
  };

  const handleLoadHistory = (item: ScrapeHistoryItem) => {
    setCountry(item.country);
    setCity(item.city);
    setNiche(item.niche);
    setScrapedData(item.data);
    toast({
      title: "History Loaded",
      description: `Loaded ${item.data.length} records from ${item.niche} in ${item.city}, ${item.country}`,
    });
  };

  const handleContinueFromHistory = (item: ScrapeHistoryItem) => {
    setCountry(item.country);
    setCity(item.city);
    setNiche(item.niche);
    setScrapedData(item.data);
    // Continue scraping from where it left off
    setTimeout(() => {
      handleScrape(true, item.last_offset);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background gear-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GearIcon size={36} className="text-copper" speed={10} />
              <div>
                <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  DataForge
                </h1>
                <p className="text-xs text-muted-foreground font-mono hidden sm:block">
                  Business Data Extraction Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Database className="h-4 w-4 text-copper" />
                <span>{scrapedData.length} Records</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* API Usage Stats */}
        <UsageStats requestsUsed={requestsUsed} bandwidthUsedMB={bandwidthUsedMB} />
        
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="industrial-panel rounded-lg p-4 text-center">
            <Cog className="h-5 w-5 text-copper mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">{limit}</p>
            <p className="text-xs text-muted-foreground font-mono">Max Records</p>
          </div>
          <div className="industrial-panel rounded-lg p-4 text-center">
            <Database className="h-5 w-5 text-brass mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">{scrapedData.length}</p>
            <p className="text-xs text-muted-foreground font-mono">Extracted</p>
          </div>
          <div className="industrial-panel rounded-lg p-4 text-center hidden md:block">
            <p className="text-lg font-display font-bold text-foreground truncate">
              {city || "—"}
            </p>
            <p className="text-xs text-muted-foreground font-mono">Target City</p>
          </div>
          <div className="industrial-panel rounded-lg p-4 text-center hidden md:block">
            <p className="text-lg font-display font-bold text-foreground truncate">
              {country || "—"}
            </p>
            <p className="text-xs text-muted-foreground font-mono">Target Country</p>
          </div>
        </motion.div>

        {/* Existing Scrape Notice */}
        {existingScrape && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="industrial-panel rounded-xl p-4 border-2 border-copper/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-foreground flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-copper" />
                  Previous scrape found
                </p>
                <p className="text-sm text-muted-foreground">
                  You have {existingScrape.total_scraped} records for "{niche}" in {city}, {country}. 
                  Continue from where you left off?
                </p>
              </div>
              <Button variant="copper" onClick={handleContinueScrape}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Continue Scraping
              </Button>
            </div>
          </motion.div>
        )}

        {/* Scrape Form */}
        <ScrapeForm
          country={country}
          city={city}
          niche={niche}
          limit={limit}
          isLoading={isLoading}
          onCountryChange={setCountry}
          onCityChange={setCity}
          onNicheChange={setNiche}
          onLimitChange={setLimit}
          onSubmit={() => handleScrape(false)}
        />

        {/* Loading Animation */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="industrial-panel rounded-xl p-8 flex flex-col items-center justify-center"
          >
            <div className="relative">
              <GearIcon size={80} className="text-copper" speed={3} />
              <GearIcon 
                size={50} 
                className="text-brass absolute top-1/2 left-full -translate-y-1/2 -ml-4" 
                reverse 
                speed={4} 
              />
            </div>
            <p className="mt-6 font-display text-lg text-foreground">
              Extracting Business Data...
            </p>
            <p className="text-muted-foreground font-mono text-sm mt-2">
              Scraping {limit} {niche} records from {city}, {country}
            </p>
          </motion.div>
        )}

        {/* History Panel */}
        <HistoryPanel 
          onLoadHistory={handleLoadHistory}
          onContinueScrape={handleContinueFromHistory}
          refreshTrigger={historyRefreshTrigger}
        />

        {/* Export Panel */}
        {!isLoading && <ExportPanel data={scrapedData} city={city} country={country} niche={niche} />}

        {/* Data Table */}
        {!isLoading && <DataTable data={scrapedData} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs font-mono">
            DataForge © 2024 — Industrial-Grade Data Extraction
          </p>
        </div>
      </footer>
    </div>
  );
};
