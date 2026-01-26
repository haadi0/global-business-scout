import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@/components/ui/GearIcon";
import { MapPin, Globe, Hash, Search, AlertCircle, Briefcase, TrendingUp } from "lucide-react";
import {
  countries,
  citiesByCountry,
  getCountrySuggestions,
  getCitySuggestions,
  isValidCountry,
  isValidCity,
} from "@/data/locations";
import { 
  getNicheSuggestions, 
  getCompetitionColor, 
  getCompetitionLabel, 
  NicheItem 
} from "@/data/niches";

interface ScrapeFormProps {
  country: string;
  city: string;
  niche: string;
  limit: number;
  isLoading: boolean;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onNicheChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onSubmit: () => void;
}

export const ScrapeForm = ({
  country,
  city,
  niche,
  limit,
  isLoading,
  onCountryChange,
  onCityChange,
  onNicheChange,
  onLimitChange,
  onSubmit,
}: ScrapeFormProps) => {
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showNicheSuggestions, setShowNicheSuggestions] = useState(false);
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [nicheSuggestions, setNicheSuggestions] = useState<NicheItem[]>([]);
  
  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const nicheRef = useRef<HTMLDivElement>(null);

  const countryValid = isValidCountry(country);
  const cityValid = isValidCity(city, country);
  const hasCountryInList = countries.includes(country);

  useEffect(() => {
    setCountrySuggestions(getCountrySuggestions(country));
  }, [country]);

  useEffect(() => {
    setCitySuggestions(getCitySuggestions(city, country));
  }, [city, country]);

  useEffect(() => {
    setNicheSuggestions(getNicheSuggestions(niche));
  }, [niche]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setShowCountrySuggestions(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCitySuggestions(false);
      }
      if (nicheRef.current && !nicheRef.current.contains(e.target as Node)) {
        setShowNicheSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryValid || !cityValid || !niche.trim()) return;
    onSubmit();
  };

  const selectCountry = (value: string) => {
    onCountryChange(value);
    onCityChange(""); // Reset city when country changes
    setShowCountrySuggestions(false);
  };

  const selectCity = (value: string) => {
    onCityChange(value);
    setShowCitySuggestions(false);
  };

  const selectNiche = (value: string) => {
    onNicheChange(value);
    setShowNicheSuggestions(false);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Country Input */}
          <div className="space-y-2 relative" ref={countryRef}>
            <label className="text-sm font-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Country
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="United States"
                value={country}
                onChange={(e) => onCountryChange(e.target.value)}
                onFocus={() => setShowCountrySuggestions(true)}
                className={`${!countryValid && country ? "border-destructive focus:ring-destructive" : ""}`}
                required
                disabled={isLoading}
              />
              {!countryValid && country && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
              )}
            </div>
            {!countryValid && country && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Country not recognized. Please select from suggestions.
              </p>
            )}
            
            {/* Country Suggestions Dropdown */}
            <AnimatePresence>
              {showCountrySuggestions && countrySuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto"
                >
                  {countrySuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => selectCountry(suggestion)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-copper/10 hover:text-copper transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* City Input */}
          <div className="space-y-2 relative" ref={cityRef}>
            <label className="text-sm font-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              City
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="New York"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                onFocus={() => setShowCitySuggestions(true)}
                className={`${!cityValid && city ? "border-destructive focus:ring-destructive" : ""}`}
                required
                disabled={isLoading}
              />
              {!cityValid && city && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
              )}
            </div>
            {!cityValid && city && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                City not found for {country}. Check spelling or select from list.
              </p>
            )}
            {hasCountryInList && citySuggestions.length === 0 && city && (
              <p className="text-xs text-muted-foreground">
                Custom city will be used for scraping.
              </p>
            )}
            
            {/* City Suggestions Dropdown */}
            <AnimatePresence>
              {showCitySuggestions && citySuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto"
                >
                  {citySuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => selectCity(suggestion)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-copper/10 hover:text-copper transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Niche Input */}
          <div className="space-y-2 relative" ref={nicheRef}>
            <label className="text-sm font-display text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Business Niche
            </label>
            <Input
              type="text"
              placeholder="e.g. Restaurants, Plumbers, Dentists"
              value={niche}
              onChange={(e) => onNicheChange(e.target.value)}
              onFocus={() => setShowNicheSuggestions(true)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Select or type any business niche
            </p>
            
            {/* Niche Suggestions Dropdown */}
            <AnimatePresence>
              {showNicheSuggestions && nicheSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl max-h-72 overflow-y-auto"
                >
                  {nicheSuggestions.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => selectNiche(item.name)}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-copper/10 hover:text-copper transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${getCompetitionColor(item.competition)}`}>
                        {getCompetitionLabel(item.competition)}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
            <p className="text-xs text-muted-foreground">Max 500 records per scrape</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="copper"
          size="lg"
          className="w-full md:w-auto"
          disabled={isLoading || !country || !city || !niche.trim() || !countryValid || !cityValid}
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
