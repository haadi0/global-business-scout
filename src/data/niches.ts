export type CompetitionLevel = 'low' | 'medium' | 'high';

export interface NicheItem {
  name: string;
  competition: CompetitionLevel;
  needsDigitalServices?: boolean;
}

export const businessNiches: NicheItem[] = [
  // ===== LOW COMPETITION - HIGH DIGITAL SERVICE NEEDS =====
  // These businesses desperately need web, AI, automation, SMM, logos, etc.
  
  // Trade & Home Services (Need websites, booking systems, local SEO)
  { name: "Septic Tank Services", competition: "low", needsDigitalServices: true },
  { name: "Bee Removal", competition: "low", needsDigitalServices: true },
  { name: "Junk Removal", competition: "low", needsDigitalServices: true },
  { name: "Pressure Washing", competition: "low", needsDigitalServices: true },
  { name: "Window Tinting", competition: "low", needsDigitalServices: true },
  { name: "Tree Trimming", competition: "low", needsDigitalServices: true },
  { name: "Gutter Cleaning", competition: "low", needsDigitalServices: true },
  { name: "Pool Cleaning", competition: "low", needsDigitalServices: true },
  { name: "Carpet Cleaning", competition: "low", needsDigitalServices: true },
  { name: "Chimney Sweep", competition: "low", needsDigitalServices: true },
  { name: "Fence Installation", competition: "low", needsDigitalServices: true },
  { name: "Garage Door Repair", competition: "low", needsDigitalServices: true },
  { name: "Locksmith", competition: "low", needsDigitalServices: true },
  { name: "Upholstery Cleaning", competition: "low", needsDigitalServices: true },
  { name: "Mobile Car Wash", competition: "low", needsDigitalServices: true },
  { name: "Notary Services", competition: "low", needsDigitalServices: true },
  { name: "Driveway Sealing", competition: "low", needsDigitalServices: true },
  { name: "Sprinkler System Repair", competition: "low", needsDigitalServices: true },
  { name: "Concrete Contractors", competition: "low", needsDigitalServices: true },
  { name: "Stump Removal", competition: "low", needsDigitalServices: true },
  { name: "Power Generator Installation", competition: "low", needsDigitalServices: true },
  { name: "Crawl Space Repair", competition: "low", needsDigitalServices: true },
  { name: "Foundation Repair", competition: "low", needsDigitalServices: true },
  { name: "Water Damage Restoration", competition: "low", needsDigitalServices: true },
  { name: "Mold Remediation", competition: "low", needsDigitalServices: true },
  
  // Small Manufacturing & Custom Work (Need logos, branding, e-commerce)
  { name: "Machine Embroidery Shops", competition: "low", needsDigitalServices: true },
  { name: "Custom Embroidery", competition: "low", needsDigitalServices: true },
  { name: "Screen Printing Shops", competition: "low", needsDigitalServices: true },
  { name: "Trophy & Award Shops", competition: "low", needsDigitalServices: true },
  { name: "Sign Making Companies", competition: "low", needsDigitalServices: true },
  { name: "Vinyl Wrap Installers", competition: "low", needsDigitalServices: true },
  { name: "Custom Furniture Makers", competition: "low", needsDigitalServices: true },
  { name: "Upholstery Shops", competition: "low", needsDigitalServices: true },
  { name: "Cabinet Makers", competition: "low", needsDigitalServices: true },
  { name: "Metal Fabricators", competition: "low", needsDigitalServices: true },
  { name: "Welding Shops", competition: "low", needsDigitalServices: true },
  { name: "CNC Machine Shops", competition: "low", needsDigitalServices: true },
  { name: "3D Printing Services", competition: "low", needsDigitalServices: true },
  { name: "Laser Engraving", competition: "low", needsDigitalServices: true },
  { name: "Leather Goods Makers", competition: "low", needsDigitalServices: true },
  
  // Local Retail & Services (Need SMM, local SEO, automation)
  { name: "Pet Grooming", competition: "low", needsDigitalServices: true },
  { name: "Mobile Pet Grooming", competition: "low", needsDigitalServices: true },
  { name: "Pet Boarding", competition: "low", needsDigitalServices: true },
  { name: "Dog Walking Services", competition: "low", needsDigitalServices: true },
  { name: "Aquarium Maintenance", competition: "low", needsDigitalServices: true },
  { name: "Coin Laundromats", competition: "low", needsDigitalServices: true },
  { name: "Alteration Shops", competition: "low", needsDigitalServices: true },
  { name: "Watch Repair Shops", competition: "low", needsDigitalServices: true },
  { name: "Shoe Repair Shops", competition: "low", needsDigitalServices: true },
  { name: "Key Cutting Services", competition: "low", needsDigitalServices: true },
  { name: "Cell Phone Repair", competition: "low", needsDigitalServices: true },
  { name: "Computer Repair Shops", competition: "low", needsDigitalServices: true },
  { name: "Vacuum Cleaner Repair", competition: "low", needsDigitalServices: true },
  { name: "Small Engine Repair", competition: "low", needsDigitalServices: true },
  { name: "Lawnmower Repair", competition: "low", needsDigitalServices: true },
  
  // Health & Wellness (Need booking systems, websites, AI chatbots)
  { name: "Acupuncture Clinics", competition: "low", needsDigitalServices: true },
  { name: "Massage Therapists", competition: "low", needsDigitalServices: true },
  { name: "Reflexology Centers", competition: "low", needsDigitalServices: true },
  { name: "Float Therapy Centers", competition: "low", needsDigitalServices: true },
  { name: "Cryotherapy Centers", competition: "low", needsDigitalServices: true },
  { name: "Salt Therapy Rooms", competition: "low", needsDigitalServices: true },
  { name: "Hypnotherapy", competition: "low", needsDigitalServices: true },
  { name: "Nutritionists", competition: "low", needsDigitalServices: true },
  { name: "Dietitians", competition: "low", needsDigitalServices: true },
  { name: "Herbalists", competition: "low", needsDigitalServices: true },
  { name: "Naturopaths", competition: "low", needsDigitalServices: true },
  { name: "Speech Therapists", competition: "low", needsDigitalServices: true },
  { name: "Occupational Therapists", competition: "low", needsDigitalServices: true },
  
  // Professional Services (Need websites, automation, CRM)
  { name: "Bookkeepers", competition: "low", needsDigitalServices: true },
  { name: "Tax Preparers", competition: "low", needsDigitalServices: true },
  { name: "Translation Services", competition: "low", needsDigitalServices: true },
  { name: "Court Reporters", competition: "low", needsDigitalServices: true },
  { name: "Private Investigators", competition: "low", needsDigitalServices: true },
  { name: "Process Servers", competition: "low", needsDigitalServices: true },
  { name: "Estate Sale Companies", competition: "low", needsDigitalServices: true },
  { name: "Auction Houses", competition: "low", needsDigitalServices: true },
  { name: "Appraisal Services", competition: "low", needsDigitalServices: true },
  { name: "Home Inspectors", competition: "low", needsDigitalServices: true },
  { name: "Energy Auditors", competition: "low", needsDigitalServices: true },
  { name: "Environmental Consultants", competition: "low", needsDigitalServices: true },
  
  // Food & Beverage (Need online ordering, SMM, delivery automation)
  { name: "Food Trucks", competition: "low", needsDigitalServices: true },
  { name: "Catering Kitchens", competition: "low", needsDigitalServices: true },
  { name: "Meal Prep Services", competition: "low", needsDigitalServices: true },
  { name: "Personal Chefs", competition: "low", needsDigitalServices: true },
  { name: "Specialty Food Stores", competition: "low", needsDigitalServices: true },
  { name: "Butcher Shops", competition: "low", needsDigitalServices: true },
  { name: "Fish Markets", competition: "low", needsDigitalServices: true },
  { name: "Organic Farm Stands", competition: "low", needsDigitalServices: true },
  { name: "Juice Bars", competition: "low", needsDigitalServices: true },
  { name: "Smoothie Shops", competition: "low", needsDigitalServices: true },
  { name: "Ice Cream Shops", competition: "low", needsDigitalServices: true },
  { name: "Candy Stores", competition: "low", needsDigitalServices: true },
  
  // Education & Training (Need LMS, websites, AI tools)
  { name: "Tutoring Services", competition: "low", needsDigitalServices: true },
  { name: "Music Teachers", competition: "low", needsDigitalServices: true },
  { name: "Art Teachers", competition: "low", needsDigitalServices: true },
  { name: "Driving Schools", competition: "low", needsDigitalServices: true },
  { name: "Language Schools", competition: "low", needsDigitalServices: true },
  { name: "Cooking Classes", competition: "low", needsDigitalServices: true },
  { name: "Pottery Studios", competition: "low", needsDigitalServices: true },
  { name: "Sewing Classes", competition: "low", needsDigitalServices: true },
  { name: "Woodworking Classes", competition: "low", needsDigitalServices: true },
  { name: "Photography Classes", competition: "low", needsDigitalServices: true },
  
  // Events & Entertainment (Need booking, websites, SMM)
  { name: "DJ Services", competition: "low", needsDigitalServices: true },
  { name: "Party Rental Companies", competition: "low", needsDigitalServices: true },
  { name: "Bounce House Rentals", competition: "low", needsDigitalServices: true },
  { name: "Photo Booth Rentals", competition: "low", needsDigitalServices: true },
  { name: "Face Painters", competition: "low", needsDigitalServices: true },
  { name: "Balloon Artists", competition: "low", needsDigitalServices: true },
  { name: "Magicians", competition: "low", needsDigitalServices: true },
  { name: "Clowns & Entertainers", competition: "low", needsDigitalServices: true },
  { name: "Mobile Escape Rooms", competition: "low", needsDigitalServices: true },
  { name: "Karaoke Services", competition: "low", needsDigitalServices: true },
  
  // Specialized Contractors (Need websites, lead generation)
  { name: "Solar Panel Installers", competition: "low", needsDigitalServices: true },
  { name: "EV Charger Installers", competition: "low", needsDigitalServices: true },
  { name: "Smart Home Installers", competition: "low", needsDigitalServices: true },
  { name: "Security System Installers", competition: "low", needsDigitalServices: true },
  { name: "Home Theater Installers", competition: "low", needsDigitalServices: true },
  { name: "Radiant Floor Heating", competition: "low", needsDigitalServices: true },
  { name: "Ductless AC Installers", competition: "low", needsDigitalServices: true },
  { name: "Insulation Contractors", competition: "low", needsDigitalServices: true },
  { name: "Waterproofing Contractors", competition: "low", needsDigitalServices: true },
  { name: "Epoxy Floor Coating", competition: "low", needsDigitalServices: true },
  
  // ===== MEDIUM COMPETITION =====
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
  { name: "Accounting Services", competition: "medium" },
  { name: "Insurance Agents", competition: "medium" },
  { name: "Veterinarians", competition: "medium" },
  { name: "Bakeries", competition: "medium" },
  { name: "Florists", competition: "medium" },
  { name: "Yoga Studios", competition: "medium" },
  { name: "Martial Arts Schools", competition: "medium" },
  { name: "Dance Studios", competition: "medium" },
  { name: "Music Schools", competition: "medium" },
  { name: "Print Shops", competition: "medium" },
  { name: "Copy Centers", competition: "medium" },
  { name: "Staffing Agencies", competition: "medium" },
  
  // ===== HIGH COMPETITION (Saturated markets) =====
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

export const getNicheSuggestions = (query: string, digitalServicesOnly: boolean = false): NicheItem[] => {
  let niches = businessNiches;
  
  if (digitalServicesOnly) {
    niches = niches.filter(niche => niche.needsDigitalServices);
  }
  
  if (!query.trim()) {
    return niches.slice(0, 15);
  }
  
  const lowerQuery = query.toLowerCase();
  return niches
    .filter(niche => niche.name.toLowerCase().includes(lowerQuery))
    .slice(0, 15);
};

export const getLowCompetitionNiches = (): NicheItem[] => {
  return businessNiches.filter(niche => niche.competition === 'low');
};

export const getDigitalServiceNiches = (): NicheItem[] => {
  return businessNiches.filter(niche => niche.needsDigitalServices);
};
