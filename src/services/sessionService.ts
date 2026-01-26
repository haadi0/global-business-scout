import { supabase } from "@/integrations/supabase/client";
import { BusinessData } from "@/types/business";

const getSessionId = (): string => {
  let sessionId = localStorage.getItem('dataforge_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('dataforge_session_id', sessionId);
  }
  return sessionId;
};

export interface ApiUsage {
  requests_used: number;
  bandwidth_used_mb: number;
  last_reset_at: string;
}

export interface ScrapeHistoryItem {
  id: string;
  country: string;
  city: string;
  niche: string;
  total_scraped: number;
  last_offset: number;
  data: BusinessData[];
  created_at: string;
  updated_at: string;
}

export const fetchApiUsage = async (): Promise<ApiUsage> => {
  const sessionId = getSessionId();
  
  const { data, error } = await supabase
    .from('api_usage')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error && error.code === 'PGRST116') {
    // No record found, create one
    const { data: newData, error: insertError } = await supabase
      .from('api_usage')
      .insert({ session_id: sessionId })
      .select()
      .single();
    
    if (insertError) throw insertError;
    return {
      requests_used: newData.requests_used,
      bandwidth_used_mb: Number(newData.bandwidth_used_mb),
      last_reset_at: newData.last_reset_at,
    };
  }

  if (error) throw error;
  
  return {
    requests_used: data.requests_used,
    bandwidth_used_mb: Number(data.bandwidth_used_mb),
    last_reset_at: data.last_reset_at,
  };
};

export const updateApiUsage = async (requestsUsed: number, bandwidthUsedMB: number): Promise<void> => {
  const sessionId = getSessionId();
  
  const { error } = await supabase
    .from('api_usage')
    .update({
      requests_used: requestsUsed,
      bandwidth_used_mb: bandwidthUsedMB,
    })
    .eq('session_id', sessionId);

  if (error) throw error;
};

export const incrementApiUsage = async (additionalBandwidthMB: number): Promise<ApiUsage> => {
  const sessionId = getSessionId();
  
  // Fetch current usage
  let current = await fetchApiUsage();
  
  const newRequestsUsed = current.requests_used + 1;
  const newBandwidth = current.bandwidth_used_mb + additionalBandwidthMB;
  
  const { error } = await supabase
    .from('api_usage')
    .update({
      requests_used: newRequestsUsed,
      bandwidth_used_mb: newBandwidth,
    })
    .eq('session_id', sessionId);

  if (error) throw error;
  
  return {
    requests_used: newRequestsUsed,
    bandwidth_used_mb: newBandwidth,
    last_reset_at: current.last_reset_at,
  };
};

export const fetchScrapeHistory = async (): Promise<ScrapeHistoryItem[]> => {
  const sessionId = getSessionId();
  
  const { data, error } = await supabase
    .from('scrape_history')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return (data || []).map(item => ({
    ...item,
    data: item.data as unknown as BusinessData[],
  }));
};

export const findExistingScrape = async (
  country: string,
  city: string,
  niche: string
): Promise<ScrapeHistoryItem | null> => {
  const sessionId = getSessionId();
  
  const { data, error } = await supabase
    .from('scrape_history')
    .select('*')
    .eq('session_id', sessionId)
    .eq('country', country)
    .eq('city', city)
    .eq('niche', niche)
    .single();

  if (error && error.code === 'PGRST116') {
    return null;
  }
  
  if (error) throw error;
  
  return {
    ...data,
    data: data.data as unknown as BusinessData[],
  };
};

export const saveScrapeHistory = async (
  country: string,
  city: string,
  niche: string,
  data: BusinessData[],
  lastOffset: number
): Promise<ScrapeHistoryItem> => {
  const sessionId = getSessionId();
  
  // Check if entry exists
  const existing = await findExistingScrape(country, city, niche);
  
  if (existing) {
    // Merge data, avoiding duplicates by ID
    const existingIds = new Set(existing.data.map(b => b.id));
    const newData = data.filter(b => !existingIds.has(b.id));
    const mergedData = [...existing.data, ...newData];
    
    const { data: updated, error } = await supabase
      .from('scrape_history')
      .update({
        data: mergedData as unknown as any,
        total_scraped: mergedData.length,
        last_offset: lastOffset,
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    
    return {
      ...updated,
      data: updated.data as unknown as BusinessData[],
    };
  } else {
    // Create new entry
    const { data: newEntry, error } = await supabase
      .from('scrape_history')
      .insert({
        session_id: sessionId,
        country,
        city,
        niche,
        data: data as unknown as any,
        total_scraped: data.length,
        last_offset: lastOffset,
      })
      .select()
      .single();

    if (error) throw error;
    
    return {
      ...newEntry,
      data: newEntry.data as unknown as BusinessData[],
    };
  }
};

export const deleteScrapeHistory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('scrape_history')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const clearAllHistory = async (): Promise<void> => {
  const sessionId = getSessionId();
  
  const { error } = await supabase
    .from('scrape_history')
    .delete()
    .eq('session_id', sessionId);

  if (error) throw error;
};
