export type CompetitionLevel = 'low' | 'medium' | 'high';

export interface NicheItem {
  name: string;
  competition: CompetitionLevel;
  needsDigitalServices?: boolean;
  category?: string;
}

export const businessNiches: NicheItem[] = [
  // ===== LOW COMPETITION - HIGH DIGITAL SERVICE NEEDS =====
  
  // Trade & Home Services (Need websites, booking systems, local SEO)
  { name: "Septic Tank Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Bee Removal", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Junk Removal", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Pressure Washing", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Window Tinting", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Tree Trimming", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Gutter Cleaning", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Pool Cleaning", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Carpet Cleaning", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Chimney Sweep", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Fence Installation", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Garage Door Repair", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Locksmith", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Upholstery Cleaning", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Mobile Car Wash", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Notary Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Driveway Sealing", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Sprinkler System Repair", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Concrete Contractors", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Stump Removal", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Power Generator Installation", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Crawl Space Repair", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Foundation Repair", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Water Damage Restoration", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Mold Remediation", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Window Cleaning Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Handyman Services", competition: "low", needsDigitalServices: true, category: "Home Services" },
  { name: "Blinds & Shutters Installers", competition: "low", needsDigitalServices: true, category: "Home Services" },
  
  // Construction & Trades (Need websites, project portfolios, lead gen)
  { name: "General Contractors", competition: "medium", needsDigitalServices: true, category: "Construction" },
  { name: "Demolition Companies", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Excavation Services", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Masonry Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Steel Erectors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Scaffolding Companies", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Drywall Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Tile Installers", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Stucco Contractors", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Paving Companies", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Grading & Land Clearing", competition: "low", needsDigitalServices: true, category: "Construction" },
  { name: "Retaining Wall Builders", competition: "low", needsDigitalServices: true, category: "Construction" },
  
  // Real Estate & Property (Need websites, CRM, AI chatbots, automation)
  { name: "Property Management", competition: "medium", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Photography", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Home Staging Companies", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Appraisers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Land Surveyors", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Vacation Rental Managers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Commercial Real Estate Brokers", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  { name: "Real Estate Investment Groups", competition: "low", needsDigitalServices: true, category: "Real Estate" },
  
  // Small Manufacturing & Custom Work (Need logos, branding, e-commerce)
  { name: "Machine Embroidery Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Custom Embroidery", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Screen Printing Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Trophy & Award Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Sign Making Companies", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Vinyl Wrap Installers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Custom Furniture Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Upholstery Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Cabinet Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Metal Fabricators", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Welding Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "CNC Machine Shops", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "3D Printing Services", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Laser Engraving", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Leather Goods Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Candle Making Studios", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Soap Making Companies", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  { name: "Custom Jewelry Makers", competition: "low", needsDigitalServices: true, category: "Manufacturing" },
  
  // Vintage & Specialty Retail (Need e-commerce, SMM, branding)
  { name: "Vintage Clothing Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Thrift Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Antique Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Consignment Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Record Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Comic Book Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Hobby & Craft Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Fabric Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Bead & Jewelry Supply Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Vape Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Smoke Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Pawn Shops", competition: "low", needsDigitalServices: true, category: "Retail" },
  { name: "Surplus Stores", competition: "low", needsDigitalServices: true, category: "Retail" },
  
  // Local Retail & Services (Need SMM, local SEO, automation)
  { name: "Pet Grooming", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Mobile Pet Grooming", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Pet Boarding", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Dog Walking Services", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Aquarium Maintenance", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Pet Sitting Services", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  { name: "Dog Daycare Centers", competition: "low", needsDigitalServices: true, category: "Pet Services" },
  
  // Repair & Maintenance (Need websites, booking, automation)
  { name: "Coin Laundromats", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Alteration Shops", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Watch Repair Shops", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Shoe Repair Shops", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Key Cutting Services", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Cell Phone Repair", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Computer Repair Shops", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Vacuum Cleaner Repair", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Small Engine Repair", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Lawnmower Repair", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Appliance Refurbishing", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  { name: "Furniture Restoration", competition: "low", needsDigitalServices: true, category: "Repair & Maintenance" },
  
  // Health & Wellness (Need booking systems, websites, AI chatbots)
  { name: "Acupuncture Clinics", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Massage Therapists", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Reflexology Centers", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Float Therapy Centers", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Cryotherapy Centers", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Salt Therapy Rooms", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Hypnotherapy", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Nutritionists", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Dietitians", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Herbalists", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Naturopaths", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Speech Therapists", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Occupational Therapists", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "IV Hydration Therapy", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Infrared Sauna Studios", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  { name: "Colon Hydrotherapy", competition: "low", needsDigitalServices: true, category: "Health & Wellness" },
  
  // Professional Services (Need websites, automation, CRM)
  { name: "Bookkeepers", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Tax Preparers", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Translation Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Court Reporters", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Private Investigators", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Process Servers", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Estate Sale Companies", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Auction Houses", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Appraisal Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Home Inspectors", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Energy Auditors", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Environmental Consultants", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Immigration Consultants", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Patent Agents", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  { name: "Resume Writing Services", competition: "low", needsDigitalServices: true, category: "Professional Services" },
  
  // Food & Beverage (Need online ordering, SMM, delivery automation)
  { name: "Food Trucks", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Catering Kitchens", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Meal Prep Services", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Personal Chefs", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Specialty Food Stores", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Butcher Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Fish Markets", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Organic Farm Stands", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Juice Bars", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Smoothie Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Ice Cream Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Candy Stores", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Donut Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Tea Houses", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  { name: "Wine Shops", competition: "low", needsDigitalServices: true, category: "Food & Beverage" },
  
  // Education & Training (Need LMS, websites, AI tools)
  { name: "Tutoring Services", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Music Teachers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Art Teachers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Driving Schools", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Language Schools", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Cooking Classes", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Pottery Studios", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Sewing Classes", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Woodworking Classes", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Photography Classes", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "Test Prep Centers", competition: "low", needsDigitalServices: true, category: "Education" },
  { name: "After-School Programs", competition: "low", needsDigitalServices: true, category: "Education" },
  
  // Events & Entertainment (Need booking, websites, SMM)
  { name: "DJ Services", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Party Rental Companies", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Bounce House Rentals", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Photo Booth Rentals", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Face Painters", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Balloon Artists", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Magicians", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Clowns & Entertainers", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Mobile Escape Rooms", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Karaoke Services", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Wedding Venues", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Wedding Planners", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Wedding Florists", competition: "low", needsDigitalServices: true, category: "Events" },
  { name: "Wedding Cake Bakers", competition: "low", needsDigitalServices: true, category: "Events" },
  
  // Specialized Contractors (Need websites, lead generation)
  { name: "Solar Panel Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "EV Charger Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Smart Home Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Security System Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Home Theater Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Radiant Floor Heating", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Ductless AC Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Insulation Contractors", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Waterproofing Contractors", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Epoxy Floor Coating", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Glass & Mirror Installers", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  { name: "Elevator Maintenance", competition: "low", needsDigitalServices: true, category: "Specialized Contractors" },
  
  // Agriculture & Outdoor (Need websites, e-commerce, automation)
  { name: "Landscaping Design", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Nurseries & Garden Centers", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Hydroponics Suppliers", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Beekeeping Supplies", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Farm Equipment Dealers", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Seed & Feed Stores", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Organic Farms", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  { name: "Christmas Tree Farms", competition: "low", needsDigitalServices: true, category: "Agriculture" },
  
  // Automotive (Need websites, booking, SMM)
  { name: "Auto Detailing", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Transmission Repair", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Brake Repair Shops", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "RV Repair Shops", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Motorcycle Repair", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Boat Repair & Marine", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Trailer Dealers", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Used Car Lots", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Auto Glass Repair", competition: "low", needsDigitalServices: true, category: "Automotive" },
  { name: "Wheel & Tire Shops", competition: "low", needsDigitalServices: true, category: "Automotive" },
  
  // Cleaning & Specialty Services (Need websites, automation, booking)
  { name: "Air Duct Cleaning", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Crime Scene Cleaning", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Hoarding Cleanup", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Biohazard Cleanup", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Graffiti Removal", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Dryer Vent Cleaning", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Commercial Cleaning", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  { name: "Post-Construction Cleaning", competition: "low", needsDigitalServices: true, category: "Cleaning" },
  
  // Beauty & Personal Care (Need SMM, booking, branding)
  { name: "Lash Extension Studios", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Microblading Studios", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Tattoo Removal Clinics", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Wig Shops", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Nail Salons", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Med Spas", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Tanning Salons", competition: "low", needsDigitalServices: true, category: "Beauty" },
  { name: "Barbershops", competition: "low", needsDigitalServices: true, category: "Beauty" },
  
  // Fitness & Recreation (Need websites, booking, AI)
  { name: "CrossFit Gyms", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Pilates Studios", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Boxing Gyms", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Rock Climbing Gyms", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Trampoline Parks", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Go-Kart Tracks", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Mini Golf Courses", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Batting Cages", competition: "low", needsDigitalServices: true, category: "Fitness" },
  { name: "Archery Ranges", competition: "low", needsDigitalServices: true, category: "Fitness" },
  
  // ===== MEDIUM COMPETITION =====
  { name: "Plumbers", competition: "medium", category: "Home Services" },
  { name: "Electricians", competition: "medium", category: "Home Services" },
  { name: "HVAC Contractors", competition: "medium", category: "Home Services" },
  { name: "Roofing Contractors", competition: "medium", category: "Construction" },
  { name: "Landscaping", competition: "medium", category: "Home Services" },
  { name: "Auto Body Shops", competition: "medium", category: "Automotive" },
  { name: "Pest Control", competition: "medium", category: "Home Services" },
  { name: "Moving Companies", competition: "medium", category: "Home Services" },
  { name: "House Cleaning", competition: "medium", category: "Cleaning" },
  { name: "Painting Contractors", competition: "medium", category: "Construction" },
  { name: "Flooring Installation", competition: "medium", category: "Construction" },
  { name: "Appliance Repair", competition: "medium", category: "Repair & Maintenance" },
  { name: "Towing Services", competition: "medium", category: "Automotive" },
  { name: "Photography Studios", competition: "medium", category: "Events" },
  { name: "Event Planners", competition: "medium", category: "Events" },
  { name: "Catering Services", competition: "medium", category: "Food & Beverage" },
  { name: "Dog Trainers", competition: "medium", category: "Pet Services" },
  { name: "Personal Trainers", competition: "medium", category: "Fitness" },
  { name: "Accounting Services", competition: "medium", category: "Professional Services" },
  { name: "Insurance Agents", competition: "medium", category: "Professional Services" },
  { name: "Veterinarians", competition: "medium", category: "Pet Services" },
  { name: "Bakeries", competition: "medium", category: "Food & Beverage" },
  { name: "Florists", competition: "medium", category: "Retail" },
  { name: "Yoga Studios", competition: "medium", category: "Fitness" },
  { name: "Martial Arts Schools", competition: "medium", category: "Fitness" },
  { name: "Dance Studios", competition: "medium", category: "Education" },
  { name: "Music Schools", competition: "medium", category: "Education" },
  { name: "Print Shops", competition: "medium", category: "Manufacturing" },
  { name: "Copy Centers", competition: "medium", category: "Professional Services" },
  { name: "Staffing Agencies", competition: "medium", category: "Professional Services" },
  
  // ===== HIGH COMPETITION (Saturated markets) =====
  { name: "Restaurants", competition: "high", category: "Food & Beverage" },
  { name: "Coffee Shops", competition: "high", category: "Food & Beverage" },
  { name: "Real Estate Agents", competition: "high", category: "Real Estate" },
  { name: "Dentists", competition: "high", category: "Health & Wellness" },
  { name: "Lawyers", competition: "high", category: "Professional Services" },
  { name: "Gyms", competition: "high", category: "Fitness" },
  { name: "Hair Salons", competition: "high", category: "Beauty" },
  { name: "Spas", competition: "high", category: "Beauty" },
  { name: "Car Dealerships", competition: "high", category: "Automotive" },
  { name: "Hotels", competition: "high", category: "Real Estate" },
  { name: "Auto Mechanics", competition: "high", category: "Automotive" },
  { name: "Chiropractors", competition: "high", category: "Health & Wellness" },
  { name: "Physical Therapists", competition: "high", category: "Health & Wellness" },
  { name: "Medical Clinics", competition: "high", category: "Health & Wellness" },
  { name: "Pharmacies", competition: "high", category: "Health & Wellness" },
  { name: "Banks", competition: "high", category: "Professional Services" },
  { name: "Gas Stations", competition: "high", category: "Retail" },
  { name: "Grocery Stores", competition: "high", category: "Retail" },
  { name: "Fast Food", competition: "high", category: "Food & Beverage" },
  { name: "Pizza Shops", competition: "high", category: "Food & Beverage" },
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
