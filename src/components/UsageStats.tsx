import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Zap, HardDrive, Clock, TrendingUp } from "lucide-react";

interface UsageStatsProps {
  requestsUsed: number;
  bandwidthUsedMB: number;
}

export const UsageStats = ({ requestsUsed, bandwidthUsedMB }: UsageStatsProps) => {
  const maxRequests = 10;
  const maxBandwidthMB = 10240;
  const requestsPercentage = Math.min((requestsUsed / maxRequests) * 100, 100);
  const bandwidthPercentage = Math.min((bandwidthUsedMB / maxBandwidthMB) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="industrial-panel rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-copper" />
        <h3 className="font-display font-bold text-foreground">API Usage (Basic Plan)</h3>
        <span className="text-xs font-mono text-muted-foreground ml-auto">$0.00/mo</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requests Usage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-brass" />
              <span className="text-sm font-mono text-muted-foreground">Monthly Requests</span>
            </div>
            <span className="text-sm font-display font-bold text-foreground">
              {requestsUsed} / {maxRequests}
            </span>
          </div>
          <Progress 
            value={requestsPercentage} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground font-mono">
            Hard limit • Resets monthly
          </p>
        </div>

        {/* Bandwidth Usage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-copper" />
              <span className="text-sm font-mono text-muted-foreground">Bandwidth</span>
            </div>
            <span className="text-sm font-display font-bold text-foreground">
              {bandwidthUsedMB.toFixed(1)} / {maxBandwidthMB} MB
            </span>
          </div>
          <Progress 
            value={bandwidthPercentage} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground font-mono">
            +$0.001 per 1MB over limit
          </p>
        </div>
      </div>

      {/* Rate Limit Info */}
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Rate: 1000 req/hour</span>
        </div>
        <div className="flex items-center gap-1">
          <span>•</span>
          <span>Maps, News, Image Search, Text Search APIs</span>
        </div>
      </div>
    </motion.div>
  );
};
