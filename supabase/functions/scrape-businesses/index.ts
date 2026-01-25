import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { country, city, niche, limit } = await req.json();

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

    // Build search query
    const searchQuery = `${niche} in ${city}, ${country}`;
    console.log('Searching for:', searchQuery);

    // Call RapidAPI Google Maps Data endpoint
    const response = await fetch(
      `https://maps-data.p.rapidapi.com/searchmaps.php?query=${encodeURIComponent(searchQuery)}&limit=${limit || 50}&lang=en&country=us`,
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

    // Map RapidAPI response to our BusinessData format
    const businesses = (result.data || []).map((item: any, index: number) => ({
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
