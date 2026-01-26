import { BusinessData } from "@/types/business";
import { supabase } from "@/integrations/supabase/client";

export const scrapeBusinessData = async (
  country: string,
  city: string,
  niche: string,
  limit: number,
  offset: number = 0
): Promise<{ success: boolean; data: BusinessData[]; message: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('scrape-businesses', {
      body: { country, city, niche, limit, offset },
    });

    if (error) {
      console.error('Edge function error:', error);
      return {
        success: false,
        data: [],
        message: error.message || 'Failed to scrape business data',
      };
    }

    if (!data.success) {
      return {
        success: false,
        data: [],
        message: data.error || 'Scraping failed',
      };
    }

    // Map the response to BusinessData format
    const businesses: BusinessData[] = (data.data || []).map((item: any, index: number) => ({
      id: item.id || `${Date.now()}-${index}`,
      name: item.name || 'Unknown Business',
      email: item.email,
      phone: item.phone,
      website: item.website,
      address: item.address,
      category: item.category || niche,
      socialMedia: item.socialMedia || {},
      rating: item.rating,
      reviews: item.reviews,
    }));

    return {
      success: true,
      data: businesses,
      message: `Successfully scraped ${businesses.length} ${niche} businesses from ${city}, ${country}`,
    };
  } catch (error) {
    console.error('Scrape error:', error);
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};
