import { useState, useEffect, useRef, useCallback } from "react";
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
import { Database, LogOut, Cog, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
  const [extractEmails, setExtractEmails] = useState(false);
  const [requestsUsed, setRequestsUsed] = useState(0);
  const [bandwidthUsedMB, setBandwidthUsedMB] = useState(0);
  const [existingScrape, setExistingScrape] = useState<ScrapeHistoryItem | null>(null);
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);
  
  // Continuous scraping state
  const [isContinuousScraping, setIsContinuousScraping] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [currentBatchSize] = useState(100); // Scrape in batches of 100
  const abortRef = useRef(false);
  
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

  const updateUsageAfterBatch = useCallback(async (newDataCount: number) => {
    const bandwidthAdded = newDataCount * 0.02;
    const updatedUsage = await incrementApiUsage(bandwidthAdded);
    setRequestsUsed(updatedUsage.requests_used);
    setBandwidthUsedMB(updatedUsage.bandwidth_used_mb);
  }, []);

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
    abortRef.current = false;

    try {
      // If continuing, load existing data first
      let previousData: BusinessData[] = [];
      if (isContinue) {
        const existing = await findExistingScrape(country, city, niche);
        if (existing) {
          previousData = existing.data;
          setScrapedData(previousData);
        }
      } else {
        setScrapedData([]);
      }

      const result = await scrapeBusinessData(country, city, niche, limit, offset, extractEmails);

      if (result.success) {
        // Deduplicate
        const existingIds = new Set(previousData.map(b => b.id));
        const newRecords = result.data.filter(b => !existingIds.has(b.id));
        const mergedData = [...previousData, ...newRecords];
        
        setScrapedData(mergedData);
        await updateUsageAfterBatch(newRecords.length);
        await saveScrapeHistory(country, city, niche, mergedData, offset + result.data.length);
        setHistoryRefreshTrigger(prev => prev + 1);

        toast({
          title: isContinue ? "Continue Scraping Complete" : "Scraping Complete",
          description: `${newRecords.length} new records. Total: ${mergedData.length}.`,
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

  // Continuous batch scraping - scrapes in batches and updates UI in real-time
  const handleContinuousScrape = async (totalTarget: number, startOffset: number = 0, existingData: BusinessData[] = []) => {
    if (!country || !city || !niche.trim()) {
      toast({
        title: "Missing Parameters",
        description: "Please enter country, city, and business niche.",
        variant: "destructive",
      });
      return;
    }

    setIsContinuousScraping(true);
    setIsLoading(true);
    abortRef.current = false;
    setBatchProgress({ current: 0, total: totalTarget });
    
    let allData = [...existingData];
    let currentOffset = startOffset;
    let totalFetched = 0;

    try {
      while (totalFetched < totalTarget && !abortRef.current) {
        const batchSize = Math.min(currentBatchSize, totalTarget - totalFetched);
        
        const result = await scrapeBusinessData(country, city, niche, batchSize, currentOffset, extractEmails);

        if (!result.success) {
          toast({
            title: "Batch Failed",
            description: `Stopped at ${totalFetched} records: ${result.message}`,
            variant: "destructive",
          });
          break;
        }

        if (result.data.length === 0) {
          toast({
            title: "No More Results",
            description: `All available data scraped. Total: ${allData.length} records.`,
          });
          break;
        }

        // Deduplicate and merge
        const existingIds = new Set(allData.map(b => b.id));
        const newRecords = result.data.filter(b => !existingIds.has(b.id));
        allData = [...allData, ...newRecords];
        
        totalFetched += result.data.length;
        currentOffset += result.data.length;

        // Update UI in real-time
        setScrapedData([...allData]);
        setBatchProgress({ current: totalFetched, total: totalTarget });

        // Save progress after each batch
        await updateUsageAfterBatch(newRecords.length);
        await saveScrapeHistory(country, city, niche, allData, currentOffset);
        setHistoryRefreshTrigger(prev => prev + 1);

        // Brief pause between batches
        if (totalFetched < totalTarget && !abortRef.current) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      if (!abortRef.current) {
        toast({
          title: "Continuous Scraping Complete",
          description: `Total: ${allData.length} records scraped successfully.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Scraping interrupted. Progress has been saved.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsContinuousScraping(false);
      setBatchProgress({ current: 0, total: 0 });
    }
  };

  const handleStopScraping = () => {
    abortRef.current = true;
    toast({
      title: "Stopping...",
      description: "Finishing current batch. Progress is saved.",
    });
  };

  const handleContinueScrape = () => {
    if (existingScrape) {
      handleContinuousScrape(limit, existingScrape.last_offset, existingScrape.data);
    }
  };

  const handleSubmit = async () => {
    // Always check for existing scrape and auto-resume from last offset
    const existing = await findExistingScrape(country, city, niche);
    if (existing && existing.data.length > 0) {
      // Auto-resume from where we left off
      if (limit > currentBatchSize) {
        handleContinuousScrape(limit, existing.last_offset, existing.data);
      } else {
        handleScrape(true, existing.last_offset);
      }
    } else {
      // Fresh scrape
      if (limit > currentBatchSize) {
        handleContinuousScrape(limit);
      } else {
        handleScrape(false);
      }
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
    handleContinuousScrape(limit, item.last_offset, item.data);
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
          extractEmails={extractEmails}
          onCountryChange={setCountry}
          onCityChange={setCity}
          onNicheChange={setNiche}
          onLimitChange={setLimit}
          onExtractEmailsChange={setExtractEmails}
          onSubmit={handleSubmit}
        />

        {/* Continuous Scraping Progress */}
        {isContinuousScraping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="industrial-panel rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <GearIcon size={50} className="text-copper" speed={3} />
                  <GearIcon 
                    size={30} 
                    className="text-brass absolute top-1/2 left-full -translate-y-1/2 -ml-2" 
                    reverse 
                    speed={4} 
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground">
                    Continuous Scraping...
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Batch processing {niche} in {city}, {country}
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={handleStopScraping}>
                Stop
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{batchProgress.current} / {batchProgress.total}</span>
              </div>
              <Progress 
                value={batchProgress.total > 0 ? (batchProgress.current / batchProgress.total) * 100 : 0} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground font-mono text-center">
                {scrapedData.length} total records collected • Data updates live below
              </p>
            </div>
          </motion.div>
        )}

        {/* Simple Loading Animation (non-continuous) */}
        {isLoading && !isContinuousScraping && (
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
