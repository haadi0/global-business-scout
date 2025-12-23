export interface BusinessData {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  category: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  rating?: number;
  reviews?: number;
}

export interface ScrapeRequest {
  country: string;
  city: string;
  limit: number;
  category?: string;
}

export interface ScrapeResponse {
  success: boolean;
  data: BusinessData[];
  total: number;
  message?: string;
}
