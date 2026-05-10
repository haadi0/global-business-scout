export const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Brazil",
  "Mexico",
  "Italy",
  "Spain",
  "Netherlands",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Belgium",
  "Austria",
  "Ireland",
  "New Zealand",
  "Singapore",
  "United Arab Emirates",
  "South Africa",
  "Portugal",
  "Poland",
  "Czech Republic",
  "Greece",
  "Turkey",
  "Russia",
  "China",
  "South Korea",
  "Indonesia",
  "Malaysia",
  "Thailand",
  "Philippines",
  "Vietnam",
  "Pakistan",
  "Bangladesh",
  "Egypt",
  "Nigeria",
  "Kenya",
  "Saudi Arabia",
  "Israel",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "Venezuela",
  "Tanzania",
  "Uganda",
  "Rwanda",
  "Botswana",
  "Namibia"
];

export const citiesByCountry: Record<string, string[]> = {
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "Seattle", "Denver", "Boston", "Nashville", "Detroit", "Miami", "Atlanta", "Las Vegas", "Portland", "San Francisco"],
  "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Bristol", "Sheffield", "Leeds", "Edinburgh", "Leicester", "Coventry", "Bradford", "Cardiff", "Belfast", "Nottingham", "Newcastle", "Southampton", "Brighton", "Plymouth", "Reading"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor", "Saskatoon", "Regina", "St. John's", "Barrie", "Kelowna"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba"],
  "Germany": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Saint-Étienne", "Le Havre", "Toulon"],
  "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Pune", "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana"],
  "Japan": ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Chiba", "Kitakyushu", "Sakai"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia", "Guarulhos", "Campinas", "São Luís"],
  "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Juárez", "Zapopan", "Mérida", "San Luis Potosí", "Aguascalientes", "Hermosillo", "Saltillo", "Mexicali", "Culiacán"],
  "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste"],
  "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Arnhem", "Enschede", "Amersfoort"],
  "Switzerland": ["Zurich", "Geneva", "Basel", "Lausanne", "Bern", "Winterthur", "Lucerne", "St. Gallen", "Lugano", "Biel"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping"],
  "Norway": ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen", "Fredrikstad", "Kristiansand", "Sandnes", "Tromsø", "Sarpsborg"],
  "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde"],
  "Finland": ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Pori"],
  "Belgium": ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur", "Leuven", "Mons", "Mechelen"],
  "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels", "Sankt Pölten", "Dornbirn"],
  "Ireland": ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Swords", "Dundalk", "Bray", "Navan"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier-Hastings", "Dunedin", "Palmerston North", "Nelson", "Rotorua"],
  "Singapore": ["Singapore"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Ain"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Polokwane", "Nelspruit", "Kimberley"],
  "Portugal": ["Lisbon", "Porto", "Amadora", "Braga", "Setúbal", "Coimbra", "Funchal", "Almada", "Agualva-Cacém", "Vila Nova de Gaia"],
  "Poland": ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", "Bydgoszcz", "Lublin", "Katowice"],
  "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc", "České Budějovice", "Hradec Králové", "Ústí nad Labem", "Pardubice"],
  "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Ioannina", "Chania", "Chalcis", "Agrinio"],
  "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Diyarbakır"],
  "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don"],
  "China": ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Wuhan", "Xi'an", "Suzhou", "Nanjing", "Chongqing", "Tianjin", "Dongguan", "Shenyang", "Qingdao"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Changwon", "Goyang"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Tangerang", "Depok", "Bekasi"],
  "Malaysia": ["Kuala Lumpur", "George Town", "Ipoh", "Johor Bahru", "Malacca City", "Shah Alam", "Petaling Jaya", "Kuching", "Kota Kinabalu", "Kuantan"],
  "Thailand": ["Bangkok", "Nonthaburi", "Nakhon Ratchasima", "Chiang Mai", "Hat Yai", "Udon Thani", "Pak Kret", "Khon Kaen", "Pattaya", "Phuket"],
  "Philippines": ["Manila", "Quezon City", "Davao City", "Caloocan", "Cebu City", "Zamboanga City", "Taguig", "Antipolo", "Pasig", "Cagayan de Oro"],
  "Vietnam": ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho", "Bien Hoa", "Hue", "Nha Trang", "Buon Ma Thuot", "Vung Tau"],
  "Pakistan": ["Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Peshawar", "Multan", "Hyderabad", "Islamabad", "Quetta"],
  "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Rangpur", "Comilla", "Gazipur", "Narayanganj", "Mymensingh"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Aswan", "Ismailia", "Faiyum"],
  "Nigeria": ["Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt", "Benin City", "Maiduguri", "Zaria", "Aba", "Jos"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Malindi", "Kitale", "Garissa", "Thika", "Nyeri"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Ta'if", "Tabuk", "Buraidah", "Khamis Mushait", "Abha"],
  "Israel": ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak"],
  "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "San Miguel de Tucumán", "Mar del Plata", "Salta", "Santa Fe", "San Juan"],
  "Chile": ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta", "Temuco", "Rancagua", "Talca", "Arica", "Chillán"],
  "Colombia": ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga", "Pereira", "Santa Marta", "Ibagué"],
  "Peru": ["Lima", "Arequipa", "Callao", "Trujillo", "Chiclayo", "Iquitos", "Huancayo", "Piura", "Chimbote", "Cusco"],
  "Venezuela": ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay", "Ciudad Guayana", "Barcelona", "Maturín", "Petare", "Turmero"],
  "Tanzania": ["Dar es Salaam", "Dodoma", "Mwanza", "Arusha", "Mbeya", "Morogoro", "Tanga", "Zanzibar City", "Kigoma", "Moshi", "Tabora", "Iringa", "Songea", "Musoma", "Bukoba"],
  "Uganda": ["Kampala", "Wakiso", "Mukono", "Nansana", "Kira", "Ssabagabo", "Mbarara", "Mbale", "Jinja", "Masaka", "Entebbe", "Lira", "Gulu", "Soroti", "Kasese"],
  "Rwanda": ["Kigali", "Butare", "Gitarama", "Ruhengeri", "Gisenyi", "Byumba", "Cyangugu", "Kibuye", "Kibungo", "Nyanza", "Rwamagana", "Musanze", "Huye", "Rubavu", "Muhanga"],
  "Botswana": ["Gaborone", "Francistown", "Molepolole", "Maun", "Serowe", "Selibe Phikwe", "Kanye", "Mahalapye", "Mogoditshane", "Mochudi", "Lobatse", "Palapye", "Tlokweng", "Ramotswa", "Thamaga"],
  "Namibia": ["Windhoek", "Walvis Bay", "Swakopmund", "Oshakati", "Rundu", "Rehoboth", "Katima Mulilo", "Otjiwarongo", "Okahandja", "Ondangwa", "Grootfontein", "Mariental", "Tsumeb", "Keetmanshoop", "Lüderitz"]
};

export const isValidCountry = (input: string): boolean => {
  if (!input.trim()) return true;
  const normalizedInput = input.toLowerCase().trim();
  return countries.some(country => country.toLowerCase().includes(normalizedInput));
};

export const isValidCity = (input: string, country: string): boolean => {
  if (!input.trim()) return true;
  if (!country.trim()) return true;
  
  const cities = citiesByCountry[country] || [];
  if (cities.length === 0) return true; // Allow any city if country not in our list
  
  const normalizedInput = input.toLowerCase().trim();
  return cities.some(city => city.toLowerCase().includes(normalizedInput));
};

export const getCountrySuggestions = (input: string): string[] => {
  if (!input.trim()) return countries.slice(0, 8);
  const normalizedInput = input.toLowerCase().trim();
  return countries.filter(country => 
    country.toLowerCase().includes(normalizedInput)
  ).slice(0, 8);
};

export const getCitySuggestions = (input: string, country: string): string[] => {
  const cities = citiesByCountry[country] || [];
  if (!input.trim()) return cities.slice(0, 8);
  const normalizedInput = input.toLowerCase().trim();
  return cities.filter(city => 
    city.toLowerCase().includes(normalizedInput)
  ).slice(0, 8);
};
