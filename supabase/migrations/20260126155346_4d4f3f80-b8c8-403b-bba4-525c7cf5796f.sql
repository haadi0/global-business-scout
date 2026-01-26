-- Create table for API usage tracking
CREATE TABLE public.api_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  requests_used INTEGER NOT NULL DEFAULT 0,
  bandwidth_used_mb DECIMAL(10,2) NOT NULL DEFAULT 0,
  last_reset_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for scrape history
CREATE TABLE public.scrape_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  niche TEXT NOT NULL,
  total_scraped INTEGER NOT NULL DEFAULT 0,
  last_offset INTEGER NOT NULL DEFAULT 0,
  data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrape_history ENABLE ROW LEVEL SECURITY;

-- Public access policies (using session_id for tracking)
CREATE POLICY "Anyone can view their own usage" ON public.api_usage FOR SELECT USING (true);
CREATE POLICY "Anyone can insert usage" ON public.api_usage FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update their own usage" ON public.api_usage FOR UPDATE USING (true);

CREATE POLICY "Anyone can view scrape history" ON public.scrape_history FOR SELECT USING (true);
CREATE POLICY "Anyone can insert scrape history" ON public.scrape_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update scrape history" ON public.scrape_history FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete scrape history" ON public.scrape_history FOR DELETE USING (true);

-- Create index for faster lookups
CREATE INDEX idx_scrape_history_session ON public.scrape_history(session_id);
CREATE INDEX idx_scrape_history_inputs ON public.scrape_history(session_id, country, city, niche);
CREATE INDEX idx_api_usage_session ON public.api_usage(session_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_api_usage_updated_at
BEFORE UPDATE ON public.api_usage
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scrape_history_updated_at
BEFORE UPDATE ON public.scrape_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();