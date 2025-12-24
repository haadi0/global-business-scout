import { BusinessData } from "@/types/business";

// Simulated business data generator for demo purposes
const generateMockBusinesses = (city: string, country: string, niche: string, limit: number): BusinessData[] => {
  const domains = ["gmail.com", "outlook.com", "yahoo.com", "business.com"];
  
  const businesses: BusinessData[] = [];
  
  for (let i = 0; i < limit; i++) {
    const businessName = `${niche} ${city} ${i + 1}`;
    const slug = businessName.toLowerCase().replace(/\s+/g, "");
    
    businesses.push({
      id: `${Date.now()}-${i}`,
      name: businessName,
      email: `contact@${slug}.${domains[Math.floor(Math.random() * domains.length)]}`,
      phone: `+${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`,
      website: `https://www.${slug}.com`,
      address: `${Math.floor(Math.random() * 999 + 1)} Main Street, ${city}, ${country}`,
      category: niche,
      socialMedia: {
        facebook: Math.random() > 0.3 ? `https://facebook.com/${slug}` : undefined,
        instagram: Math.random() > 0.4 ? `https://instagram.com/${slug}` : undefined,
        twitter: Math.random() > 0.5 ? `https://twitter.com/${slug}` : undefined,
        linkedin: Math.random() > 0.6 ? `https://linkedin.com/company/${slug}` : undefined,
      },
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviews: Math.floor(Math.random() * 500 + 10),
    });
  }
  
  return businesses;
};

export const scrapeBusinessData = async (
  country: string,
  city: string,
  niche: string,
  limit: number
): Promise<{ success: boolean; data: BusinessData[]; message: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Generate mock data (in production, this would call your backend API)
  const data = generateMockBusinesses(city, country, niche, limit);
  
  return {
    success: true,
    data,
    message: `Successfully scraped ${data.length} ${niche} businesses from ${city}, ${country}`,
  };
};
