import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@/components/ui/GearIcon";
import { MapPin, Globe, Hash, Search } from "lucide-react";

interface ScrapeFormProps {
  country: string;
  city: string;
  limit: number;
  isLoading: boolean;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onSubmit: () => void;
}

export const ScrapeForm = ({
  country,
  city,
  limit,
  isLoading,
  onCountryChange,
  onCityChange,
  onLimitChange,
  onSubmit,
}: ScrapeFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="industrial-panel rounded-xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <GearIcon size={32} className="text-copper" speed={10} />
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
          Scraping Parameters
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Country Input */}
          <div className="space-y-2">
            <label className="text-sm font-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Country
            </label>
            <Input
              type="text"
              placeholder="United States"
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* City Input */}
          <div className="space-y-2">
            <label className="text-sm font-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              City
            </label>
            <Input
              type="text"
              placeholder="New York"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Limit Input */}
          <div className="space-y-2">
            <label className="text-sm font-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Data Limit
            </label>
            <Input
              type="number"
              placeholder="50"
              value={limit}
              onChange={(e) => onLimitChange(Math.max(1, Math.min(500, parseInt(e.target.value) || 1)))}
              min={1}
              max={500}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="copper"
          size="lg"
          className="w-full md:w-auto"
          disabled={isLoading || !country || !city}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <GearIcon size={20} className="text-primary-foreground" speed={2} />
              <span>Extracting Data...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span>Start Scraping</span>
            </div>
          )}
        </Button>
      </form>
    </motion.div>
  );
};
