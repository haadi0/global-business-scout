import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GearIcon } from "@/components/ui/GearIcon";
import { Lock, User, Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background gear-pattern flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Gears */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GearIcon 
          size={300} 
          className="absolute -top-20 -left-20 text-iron/20" 
          speed={20}
        />
        <GearIcon 
          size={200} 
          className="absolute top-40 -right-10 text-copper/10" 
          reverse 
          speed={15}
        />
        <GearIcon 
          size={150} 
          className="absolute -bottom-10 left-1/4 text-steel/15" 
          speed={25}
        />
        <GearIcon 
          size={100} 
          className="absolute bottom-20 right-1/4 text-brass/10" 
          reverse 
          speed={18}
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="industrial-panel rounded-xl p-8 md:p-10">
          {/* Logo / Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <GearIcon size={48} className="text-copper" speed={8} />
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                DataForge
              </h1>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              Industrial-Grade Data Scraping Platform
            </p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="text-sm font-display text-muted-foreground uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="operator@dataforge.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-sm font-display text-muted-foreground uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                variant="copper"
                size="xl"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <GearIcon size={24} className="text-primary-foreground" speed={2} />
                    <span>Initializing Systems...</span>
                  </div>
                ) : (
                  "Access Control Panel"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground text-xs font-mono">
              Demo Mode: Enter any credentials to proceed
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
