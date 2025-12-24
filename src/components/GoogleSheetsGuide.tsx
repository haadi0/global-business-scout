import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@/components/ui/GearIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileSpreadsheet,
  ChevronRight,
  ChevronLeft,
  Check,
  ExternalLink,
  Copy,
  Key,
  Share2,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    title: "Create a Google Sheet",
    description: "Go to Google Sheets and create a new spreadsheet for your scraped data.",
    link: "https://sheets.google.com",
    linkText: "Open Google Sheets",
    tip: "Give your sheet a descriptive name like 'Business Data - [City Name]'",
  },
  {
    title: "Enable Google Sheets API",
    description: "Visit the Google Cloud Console and enable the Google Sheets API for your project.",
    link: "https://console.cloud.google.com/apis/library/sheets.googleapis.com",
    linkText: "Enable Sheets API",
    tip: "You may need to create a new Google Cloud project if you don't have one",
  },
  {
    title: "Create Service Account",
    description: "Create a service account in Google Cloud Console to authenticate API requests.",
    link: "https://console.cloud.google.com/iam-admin/serviceaccounts",
    linkText: "Create Service Account",
    tip: "Download the JSON key file and keep it secure",
  },
  {
    title: "Share Your Sheet",
    description: "Share your Google Sheet with the service account email address (ends with @*.iam.gserviceaccount.com).",
    tip: "Give the service account 'Editor' access to allow writing data",
  },
  {
    title: "Copy Spreadsheet ID",
    description: "Get your spreadsheet ID from the URL. It's the long string between /d/ and /edit",
    example: "https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit",
    tip: "The ID looks like: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  },
  {
    title: "You're All Set!",
    description: "Your Google Sheets integration is ready. Exported data will appear in your spreadsheet automatically.",
    tip: "Pro tip: Create separate sheets for different cities or countries",
  },
];

export const GoogleSheetsGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const handleCopyExample = () => {
    navigator.clipboard.writeText("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms");
    toast({
      title: "Copied!",
      description: "Example spreadsheet ID copied to clipboard",
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepIcons = [FileSpreadsheet, Key, Settings, Share2, Copy, CheckCircle2];
  const StepIcon = stepIcons[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-copper/30 hover:border-copper hover:bg-copper/10">
          <FileSpreadsheet className="h-4 w-4 text-copper" />
          <span>Connect Google Sheets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-xl">
            <GearIcon size={28} className="text-copper" speed={8} />
            Google Sheets Setup Guide
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-1 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  index <= currentStep ? "bg-copper" : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Step Counter */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-1">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-copper" : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="industrial-panel rounded-lg p-5"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-copper/10 text-copper">
                  <StepIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {steps[currentStep].description}
                  </p>

                  {steps[currentStep].example && (
                    <div className="bg-input rounded-md p-3 mb-4 font-mono text-xs break-all border border-border">
                      <span className="text-muted-foreground">{steps[currentStep].example}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyExample}
                        className="mt-2 h-7 text-xs"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Example ID
                      </Button>
                    </div>
                  )}

                  {steps[currentStep].link && (
                    <a
                      href={steps[currentStep].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-copper hover:text-copper/80 text-sm font-medium transition-colors"
                    >
                      {steps[currentStep].linkText}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  <div className="mt-4 flex items-start gap-2 p-3 bg-brass/10 rounded-md border border-brass/20">
                    <Check className="h-4 w-4 text-brass mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-brass">Tip:</span>{" "}
                      {steps[currentStep].tip}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                variant="copper"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Done
              </Button>
            ) : (
              <Button
                variant="copper"
                onClick={nextStep}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
