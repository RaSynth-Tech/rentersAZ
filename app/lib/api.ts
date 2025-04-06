const API_BASE_URL = '/api';

export interface Product {
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerRating: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
  status: 'available' | 'rented' | 'maintenance';
  rating: number;
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

export interface ProductsResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface Category {
  category: string;
  subcategories: string[];
}

export const api = {
  // Products
  getProducts: async (params?: {
    category?: string;
    subcategory?: string;
    search?: string;
    city?: string;
    priceRange?: string;
    page?: number;
    limit?: number;
  }): Promise<ProductsResponse> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value.toString());
      });
    }
    const response = await fetch(`${API_BASE_URL}/products?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },
}; 