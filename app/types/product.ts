export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface Availability {
  startDate: string;
  endDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: "Electronics" | "Sports Equipment" | "Home & Garden" | "Vehicles" | "Fashion" | "Tools" | "Books" | "Musical Instruments" | "Party Supplies" | "Camping Gear" | "Houses" | "Apartments";
  subcategory?: string;
  price: number;
  images: string[];
  rating: number;
  location: Location;
  availability: Availability;
  ownerId: string;
  ownerName: string;
  ownerRating: number;
  status: 'available' | 'rented' | 'maintenance';
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  selectedCategories: string[];
  selectedSubcategories: Record<string, string[]>;
  searchQuery: string;
  selectedCity: string;
  priceRange: string;
} 