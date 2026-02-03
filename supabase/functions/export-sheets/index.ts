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
    const { action, spreadsheetId, sheetName, data, niche, city, country } = await req.json();

    if (!spreadsheetId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Spreadsheet ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For now, we'll use a simple approach that works without OAuth
    // This stores the data in a format that can be copy-pasted or uses the public API
    
    if (action === 'test') {
      // Test connection by checking if the spreadsheet ID format is valid
      const idPattern = /^[a-zA-Z0-9-_]{25,}$/;
      if (!idPattern.test(spreadsheetId)) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Invalid spreadsheet ID format. Make sure you copied the correct ID from your Google Sheets URL.' 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Spreadsheet ID format is valid',
          sheetName: `${niche || 'Data'} - ${city || 'Export'}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'export') {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'No data to export' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Convert data to TSV format for easy pasting
      const headers = Object.keys(data[0]);
      const tsvRows = [
        headers.join('\t'),
        ...data.map(row => headers.map(h => String(row[h] || '')).join('\t'))
      ];
      const tsvContent = tsvRows.join('\n');

      // Generate a download-ready format
      const csvRows = [
        headers.join(','),
        ...data.map(row => 
          headers.map(h => {
            const value = String(row[h] || '');
            // Escape quotes and wrap in quotes if contains comma
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        )
      ];
      const csvContent = csvRows.join('\n');

      // Return success with formatted data
      // The frontend can use this to provide copy functionality
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Prepared ${data.length} records for export`,
          recordCount: data.length,
          sheetName: sheetName || 'Sheet1',
          tsvData: tsvContent,
          csvData: csvContent,
          filename: `${niche}_${city}_${country}_${new Date().toISOString().split('T')[0]}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Export sheets error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
