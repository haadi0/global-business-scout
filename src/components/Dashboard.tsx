import { useState } from "react";
import { motion } from "framer-motion";
import { GearIcon } from "@/components/ui/GearIcon";
import { ScrapeForm } from "@/components/ScrapeForm";
import { DataTable } from "@/components/DataTable";
import { ExportPanel } from "@/components/ExportPanel";
import { BusinessData } from "@/types/business";
import { scrapeBusinessData } from "@/services/scrapeService";
import { useToast } from "@/hooks/use-toast";
import { Database, LogOut, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [limit, setLimit] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<BusinessData[]>([]);
  const { toast } = useToast();

  const handleScrape = async () => {
    if (!country || !city) {
      toast({
        title: "Missing Parameters",
        description: "Please enter both country and city to start scraping.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setScrapedData([]);

    try {
      const result = await scrapeBusinessData(country, city, limit);

      if (result.success) {
        setScrapedData(result.data);
        toast({
          title: "Scraping Complete",
          description: result.message,
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

        {/* Scrape Form */}
        <ScrapeForm
          country={country}
          city={city}
          limit={limit}
          isLoading={isLoading}
          onCountryChange={setCountry}
          onCityChange={setCity}
          onLimitChange={setLimit}
          onSubmit={handleScrape}
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
              Scraping {limit} records from {city}, {country}
            </p>
          </motion.div>
        )}

        {/* Export Panel */}
        {!isLoading && <ExportPanel data={scrapedData} city={city} country={country} />}

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
