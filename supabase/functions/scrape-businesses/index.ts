import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Try to extract email from a website using Firecrawl - graceful fallback
async function tryExtractEmail(website: string): Promise<string | null> {
  try {
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlKey || !website) return null;

    const url = website.startsWith('http') ? website : `https://${website}`;
    
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firecrawlKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: false,
        timeout: 10000,
      }),
    });

    if (!response.ok) return null;

    const result = await response.json();
    const content = result.data?.markdown || '';
    
    // Extract emails using regex
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = content.match(emailRegex);
    
    if (emails && emails.length > 0) {
      // Filter out common non-business emails
      const filtered = emails.filter((e: string) => {
        const lower = e.toLowerCase();
        return !lower.includes('example.com') && 
               !lower.includes('sentry.io') &&
               !lower.includes('wixpress.com') &&
               !lower.includes('wordpress.com') &&
               !lower.endsWith('.png') &&
               !lower.endsWith('.jpg');
      });
      return filtered[0] || null;
    }
    return null;
  } catch (error) {
    console.warn('Email extraction failed for', website, '- skipping:', error.message);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { country, city, niche, limit, offset = 0, extractEmails = false } = await req.json();

    if (!country || !city || !niche) {
      return new Response(
        JSON.stringify({ success: false, error: 'Country, city, and niche are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!apiKey) {
      console.error('RAPIDAPI_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchQuery = `${niche} in ${city}, ${country}`;
    console.log('Searching for:', searchQuery, 'offset:', offset, 'extractEmails:', extractEmails);

    const response = await fetch(
      `https://maps-data.p.rapidapi.com/searchmaps.php?query=${encodeURIComponent(searchQuery)}&limit=${limit || 50}&offset=${offset}&lang=en&country=us`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'maps-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('RapidAPI error:', response.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: `API request failed: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    console.log('RapidAPI response received, items:', result.data?.length || 0);

    // Map base business data
    let businesses = (result.data || []).map((item: any, index: number) => ({
      id: item.place_id || `${Date.now()}-${index}`,
      name: item.name || 'Unknown Business',
      email: item.email || null,
      phone: item.phone_number || item.phone || null,
      website: item.website || null,
      address: item.full_address || item.address || null,
      category: item.type || item.category || niche,
      socialMedia: {},
      rating: item.rating ? parseFloat(item.rating) : null,
      reviews: item.reviews ? parseInt(item.reviews) : null,
    }));

    // Email extraction via Firecrawl (fallback - won't break scraping if it fails)
    if (extractEmails) {
      console.log('Email extraction enabled - attempting for businesses without emails...');
      const emailPromises = businesses.map(async (biz: any) => {
        if (!biz.email && biz.website) {
          try {
            const extractedEmail = await tryExtractEmail(biz.website);
            if (extractedEmail) {
              console.log(`Extracted email for ${biz.name}: ${extractedEmail}`);
              return { ...biz, email: extractedEmail };
            }
          } catch {
            // Silently fail - don't break the scrape
          }
        }
        return biz;
      });

      try {
        businesses = await Promise.allSettled(emailPromises).then(results =>
          results.map((r, i) => r.status === 'fulfilled' ? r.value : businesses[i])
        );
      } catch (error) {
        console.warn('Bulk email extraction failed, returning data without emails:', error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, data: businesses }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Edge function error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
