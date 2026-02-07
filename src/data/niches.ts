export type CompetitionLevel = 'low' | 'medium' | 'high';

export interface NicheItem {
  name: string;
  competition: CompetitionLevel;
  needsDigitalServices?: boolean;
  category?: string;
}

export const businessNiches: NicheItem[] = [
  // ===== LOW COMPETITION - HIGH DIGITAL SERVICE NEEDS =====

  // Travel & Tourism (Need websites, booking systems, SMM, AI chatbots)
  { name: "Travel Agencies", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Tour Operators", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Adventure Tourism Companies", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Eco Tourism Agencies", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Safari & Wildlife Tours", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Cultural Tour Guides", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Cruise Travel Agents", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Luxury Travel Planners", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Honeymoon Travel Planners", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Group Travel Organizers", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Medical Tourism Agencies", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Pilgrimage Tour Operators", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Visa & Immigration Consultants", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Airport Transfer Services", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },
  { name: "Travel Photography Tours", competition: "low", needsDigitalServices: true, category: "Travel & Tourism" },

  // Clothing & Fashion (Need e-commerce, SMM, branding, logos)
  { name: "Clothing Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Boutique Fashion Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Vintage Clothing Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Custom Tailoring Shops", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Bridal Shops", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Ethnic Wear Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Streetwear Brands", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Uniform Suppliers", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Sportswear Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Plus Size Clothing Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Children's Clothing Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Shoe Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Handbag & Accessories Shops", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Consignment & Thrift Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },
  { name: "Fabric & Textile Stores", competition: "low", needsDigitalServices: true, category: "Fashion & Retail" },

  // Real Estate & Property (Need websites, CRM, AI chatbots, automation)
  { name: "Property Management Companies", competition: "medium", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Photography", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Home Staging Companies", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Appraisers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Vacation Rental Managers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Commercial Real Estate Brokers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Investment Groups", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Developers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Land Brokers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Short-Term Rental Management", competition: "low", needsDigitalServices: true, category: "Real Estate" },

  // Construction & Contractors (Need websites, project portfolios, lead gen)
  { name: "General Contractors", competition: "medium", needsDigitalServices: true, category: "Construction" },
  { name: "Roofing Contractors", competition: "medium", needsDigitalServices: true, category: "Construction" },
  { name: "Paving Companies", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Masonry Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Demolition Companies", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Excavation Services", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Concrete Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Flooring Installation", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Painting Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Tile Installers", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Foundation Repair", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Waterproofing Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Insulation Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Solar Panel Installers", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Smart Home Installers", competition: "low", needsDigitalServices: true, category: "Construction" },

  // Manufacturing & Custom Work (Need logos, branding, e-commerce)
  { name: "Machine Embroidery Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Custom Embroidery", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Screen Printing Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Sign Making Companies", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Custom Furniture Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Cabinet Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Metal Fabricators", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "CNC Machine Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "3D Printing Services", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Laser Engraving", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Custom Jewelry Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Packaging Companies", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Print & Design Studios", competition: "low", needsDigitalServices: true, category: "Manufacturing" },

  // Health & Wellness (Need booking systems, websites, AI chatbots)
  { name: "Dental Clinics", competition: "medium", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Physiotherapy Clinics", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Chiropractic Clinics", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Dermatology Clinics", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Eye Care Centers", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Mental Health Counselors", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Nutritionists & Dietitians", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "IV Hydration Therapy", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Med Spas", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Acupuncture Clinics", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Massage Therapy Centers", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Rehabilitation Centers", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Home Healthcare Services", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Veterinary Clinics", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },

  // Beauty & Personal Care (Need SMM, booking, branding)
  { name: "Hair Salons & Barbershops", competition: "medium", needsDigitalServices: true, category: "Beauty" },
  { name: "Nail Salons", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Lash & Brow Studios", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Tattoo Studios", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Permanent Makeup Studios", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Skincare Clinics", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Tanning Studios", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Beauty Supply Stores", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Cosmetics Brands", competition: "low", needsDigitalServices: true, category: "Beauty" },

  // Food & Beverage (Need online ordering, SMM, delivery automation)
  { name: "Restaurants", competition: "medium", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Catering Companies", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Food Trucks", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Bakeries & Pastry Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Coffee Shops & Cafés", competition: "medium", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Juice Bars & Smoothie Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Meal Prep Services", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Specialty Food Stores", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Wine & Liquor Stores", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Cloud Kitchens", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Ice Cream & Dessert Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Ethnic Food Restaurants", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },

  // Professional & Business Services (Need websites, automation, CRM)
  { name: "Accounting Firms", competition: "medium", needsDigitalServices: true, category: "Professional Services" },
  { name: "Law Firms", competition: "medium", needsDigitalServices: true, category: "Professional Services" },
  { name: "Insurance Agencies", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Tax Preparation Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Bookkeeping Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Staffing & Recruitment Agencies", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Translation Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Business Consulting Firms", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Financial Planning Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Notary Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Private Investigation Agencies", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Marketing Agencies (Local)", competition: "low", needsDigitalServices: true, category: "Professional Services" },

  // Education & Training (Need LMS, websites, AI tools)
  { name: "Language Schools", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Driving Schools", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Tutoring Centers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Music Schools & Studios", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Dance Studios", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Coding Bootcamps", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Test Prep Centers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Early Childhood Centers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Vocational Training Centers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Coaching & Mentoring Services", competition: "low", needsDigitalServices: true, category: "Education" },

  // Events & Weddings (Need booking, websites, SMM)
  { name: "Wedding Planners", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Event Venues", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Event Planners", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Photography Studios", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Videography Services", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "DJ & Entertainment Services", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Florists", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Party & Event Rentals", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Corporate Event Companies", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Wedding Cake Designers", competition: "low", needsDigitalServices: true, category: "Events" },

  // Fitness & Sports (Need websites, booking, AI, apps)
  { name: "Gyms & Fitness Centers", competition: "medium", needsDigitalServices: true, category: "Fitness" },
  { name: "Yoga Studios", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Pilates Studios", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "CrossFit Gyms", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Martial Arts Schools", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Personal Training Studios", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Swimming Schools", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Sports Coaching Academies", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Rock Climbing Gyms", competition: "low", needsDigitalServices: true, category: "Fitness" },

  // Automotive (Need websites, booking, SMM)
  { name: "Auto Detailing", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Auto Body & Paint Shops", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Used Car Dealerships", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Car Rental Agencies", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Auto Glass Repair", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Tire & Wheel Shops", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Motorcycle Dealerships", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Towing Services", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Car Wash Chains", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "EV Charging Stations", competition: "low", needsDigitalServices: true, category: "Automotive" },

  // Home Services (Need websites, booking, automation)
  { name: "Plumbing Companies", competition: "medium", needsDigitalServices: true, category: "Home Services" },
  { name: "Electricians", competition: "medium", needsDigitalServices: true, category: "Home Services" },
  { name: "HVAC Contractors", competition: "medium", needsDigitalServices: true, category: "Home Services" },
  { name: "Pest Control Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Moving Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Pressure Washing Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Landscaping Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Pool Service Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Garage Door Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Locksmith Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Security System Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Home Inspection Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Cleaning Companies", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Junk Removal Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Water Damage Restoration", competition: "low", needsDigitalServices: true, category: "Home Services" },

  // Pet Services (Need SMM, booking, branding)
  { name: "Pet Grooming Salons", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Pet Boarding Facilities", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Dog Training Services", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Pet Stores", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Dog Daycare Centers", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Pet Photography", competition: "low", needsDigitalServices: true, category: "Pet Services" },

  // Logistics & Transportation (Need websites, tracking, automation)
  { name: "Freight & Shipping Companies", competition: "low", needsDigitalServices: true, category: "Logistics" },
  { name: "Courier Services", competition: "low", needsDigitalServices: true, category: "Logistics" },
  { name: "Warehouse & Storage Facilities", competition: "low", needsDigitalServices: true, category: "Logistics" },
  { name: "Moving & Relocation Services", competition: "low", needsDigitalServices: true, category: "Logistics" },
  { name: "Limo & Chauffeur Services", competition: "low", needsDigitalServices: true, category: "Logistics" },
  { name: "Charter Bus Companies", competition: "low", needsDigitalServices: true, category: "Logistics" },
  { name: "Trucking Companies", competition: "low", needsDigitalServices: true, category: "Logistics" },

  // Technology & IT Services (Need websites, SMM, branding)
  { name: "IT Support Companies", competition: "low", needsDigitalServices: true, category: "Technology" },
  { name: "Computer Repair Shops", competition: "low", needsDigitalServices: true, category: "Technology" },
  { name: "Managed IT Services", competition: "low", needsDigitalServices: true, category: "Technology" },
  { name: "Cybersecurity Firms", competition: "low", needsDigitalServices: true, category: "Technology" },
  { name: "CCTV & Security Camera Installers", competition: "low", needsDigitalServices: true, category: "Technology" },
  { name: "AV Equipment Rentals", competition: "low", needsDigitalServices: true, category: "Technology" },

  // Agriculture & Farming (Need e-commerce, websites, automation)
  { name: "Farms & Ranches", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Nurseries & Garden Centers", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Organic Farms", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Farm Equipment Dealers", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Landscaping Supply Stores", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Hydroponics & Indoor Farming", competition: "low", needsDigitalServices: true, category: "Agriculture" },

  // Entertainment & Recreation (Need websites, booking, SMM)
  { name: "Escape Rooms", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Trampoline Parks", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Go-Kart & Racing Tracks", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Bowling Alleys", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Amusement & Theme Parks", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Paintball & Airsoft Fields", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Arcade & Game Centers", competition: "low", needsDigitalServices: true, category: "Entertainment" },
  { name: "Movie Theaters", competition: "low", needsDigitalServices: true, category: "Entertainment" },

  // Hospitality (Need websites, booking, automation, SMM)
  { name: "Hotels & Resorts", competition: "medium", needsDigitalServices: true, category: "Hospitality" },
  { name: "Bed & Breakfasts", competition: "low", needsDigitalServices: true, category: "Hospitality" },
  { name: "Hostels", competition: "low", needsDigitalServices: true, category: "Hospitality" },
  { name: "Boutique Hotels", competition: "low", needsDigitalServices: true, category: "Hospitality" },
  { name: "Serviced Apartments", competition: "low", needsDigitalServices: true, category: "Hospitality" },
  { name: "Campgrounds & RV Parks", competition: "low", needsDigitalServices: true, category: "Hospitality" },
  { name: "Resorts & Spas", competition: "low", needsDigitalServices: true, category: "Hospitality" },

  // Retail & E-Commerce (Need websites, e-commerce, SMM, logos)
  { name: "Gift Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Bookstores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Electronics Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Furniture Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Home Décor Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Sporting Goods Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Toy Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Art Galleries", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Musical Instrument Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Eyewear & Optical Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Supplement & Health Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Antique & Collectibles Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
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

export const getCategories = (): string[] => {
  const categories = new Set(businessNiches.map(n => n.category).filter(Boolean));
  return Array.from(categories) as string[];
};

export const getNicheSuggestions = (query: string, digitalServicesOnly: boolean = false, category?: string): NicheItem[] => {
  let niches = businessNiches;
  
  if (digitalServicesOnly) {
    niches = niches.filter(niche => niche.needsDigitalServices);
  }
  
  if (category) {
    niches = niches.filter(niche => niche.category === category);
  }
  
  if (!query.trim()) {
    return niches.slice(0, 20);
  }
  
  const lowerQuery = query.toLowerCase();
  return niches
    .filter(niche => niche.name.toLowerCase().includes(lowerQuery))
    .slice(0, 20);
};

export const getLowCompetitionNiches = (): NicheItem[] => {
  return businessNiches.filter(niche => niche.competition === 'low');
};

export const getDigitalServiceNiches = (): NicheItem[] => {
  return businessNiches.filter(niche => niche.needsDigitalServices);
};
