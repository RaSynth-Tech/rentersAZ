export interface Location {
  city: string;
}

export interface Availability {
  startDate: string;
  endDate: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: "Electronics" | "Sports Equipment" | "Home & Garden" | "Vehicles" | "Fashion" | "Tools" | "Books" | "Musical Instruments" | "Party Supplies" | "Camping Gear" | "Houses" | "Apartments";
  subcategory?: string;
  price: number;
  images: string[];
  rating: number;
  location: Location;
  availability: Availability;
}

export interface FilterState {
  selectedCategories: string[];
  selectedSubcategories: string[];
  searchQuery: string;
  selectedCity: string;
  priceRange: string;
} 