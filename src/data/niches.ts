export type CompetitionLevel = 'low' | 'medium' | 'high';

export interface NicheItem {
  name: string;
  competition: CompetitionLevel;
}

export const businessNiches: NicheItem[] = [
  // Low Competition (Great for new scrapers)
  { name: "Septic Tank Services", competition: "low" },
  { name: "Bee Removal", competition: "low" },
  { name: "Junk Removal", competition: "low" },
  { name: "Pressure Washing", competition: "low" },
  { name: "Window Tinting", competition: "low" },
  { name: "Tree Trimming", competition: "low" },
  { name: "Gutter Cleaning", competition: "low" },
  { name: "Pool Cleaning", competition: "low" },
  { name: "Carpet Cleaning", competition: "low" },
  { name: "Chimney Sweep", competition: "low" },
  { name: "Fence Installation", competition: "low" },
  { name: "Garage Door Repair", competition: "low" },
  { name: "Locksmith", competition: "low" },
  { name: "Upholstery Cleaning", competition: "low" },
  { name: "Mobile Car Wash", competition: "low" },
  { name: "Pet Grooming", competition: "low" },
  { name: "Notary Services", competition: "low" },
  
  // Medium Competition
  { name: "Plumbers", competition: "medium" },
  { name: "Electricians", competition: "medium" },
  { name: "HVAC Contractors", competition: "medium" },
  { name: "Roofing Contractors", competition: "medium" },
  { name: "Landscaping", competition: "medium" },
  { name: "Auto Body Shops", competition: "medium" },
  { name: "Pest Control", competition: "medium" },
  { name: "Moving Companies", competition: "medium" },
  { name: "House Cleaning", competition: "medium" },
  { name: "Painting Contractors", competition: "medium" },
  { name: "Flooring Installation", competition: "medium" },
  { name: "Appliance Repair", competition: "medium" },
  { name: "Towing Services", competition: "medium" },
  { name: "Photography Studios", competition: "medium" },
  { name: "Event Planners", competition: "medium" },
  { name: "Catering Services", competition: "medium" },
  { name: "Dog Trainers", competition: "medium" },
  { name: "Personal Trainers", competition: "medium" },
  { name: "Tutoring Services", competition: "medium" },
  { name: "Accounting Services", competition: "medium" },
  { name: "Insurance Agents", competition: "medium" },
  { name: "Veterinarians", competition: "medium" },
  { name: "Bakeries", competition: "medium" },
  { name: "Florists", competition: "medium" },
  { name: "Yoga Studios", competition: "medium" },
  { name: "Martial Arts Schools", competition: "medium" },
  { name: "Dance Studios", competition: "medium" },
  { name: "Music Schools", competition: "medium" },
  
  // High Competition (Saturated markets)
  { name: "Restaurants", competition: "high" },
  { name: "Coffee Shops", competition: "high" },
  { name: "Real Estate Agents", competition: "high" },
  { name: "Dentists", competition: "high" },
  { name: "Lawyers", competition: "high" },
  { name: "Gyms", competition: "high" },
  { name: "Hair Salons", competition: "high" },
  { name: "Spas", competition: "high" },
  { name: "Car Dealerships", competition: "high" },
  { name: "Hotels", competition: "high" },
  { name: "Auto Mechanics", competition: "high" },
  { name: "Chiropractors", competition: "high" },
  { name: "Physical Therapists", competition: "high" },
  { name: "Medical Clinics", competition: "high" },
  { name: "Pharmacies", competition: "high" },
  { name: "Banks", competition: "high" },
  { name: "Gas Stations", competition: "high" },
  { name: "Grocery Stores", competition: "high" },
  { name: "Fast Food", competition: "high" },
  { name: "Pizza Shops", competition: "high" },
];

export const getCompetitionColor = (competition: CompetitionLevel): string => {
  switch (competition) {
    case 'low':
      return 'text-green-500 bg-green-500/10';
    case 'medium':
      return 'text-yellow-500 bg-yellow-500/10';
    case 'high':
      return 'text-red-500 bg-red-500/10';
  }
};

export const getCompetitionLabel = (competition: CompetitionLevel): string => {
  switch (competition) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Med';
    case 'high':
      return 'High';
  }
};

export const getNicheSuggestions = (query: string): NicheItem[] => {
  if (!query.trim()) {
    return businessNiches.slice(0, 10);
  }
  
  const lowerQuery = query.toLowerCase();
  return businessNiches
    .filter(niche => niche.name.toLowerCase().includes(lowerQuery))
    .slice(0, 10);
};
