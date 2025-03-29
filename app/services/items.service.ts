import axios from 'axios';
import { config } from '../config/config';

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  availability: {
    startDate: string;
    endDate: string;
  };
  status: 'available' | 'rented' | 'maintenance';
  rating?: number;
  reviews?: Array<{
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

export interface CreateItemDto {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  availability: {
    startDate: string;
    endDate: string;
  };
}

class ItemsService {
  private readonly api = axios.create({
    baseURL: `${config.api.baseUrl}/items`,
  });

  async getItems(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    page?: number;
    limit?: number;
  }) {
    const { data } = await this.api.get('', { params });
    return data;
  }

  async getItemById(id: string) {
    const { data } = await this.api.get(`/${id}`);
    return data;
  }

  async createItem(item: CreateItemDto) {
    const { data } = await this.api.post('', item);
    return data;
  }

  async updateItem(id: string, item: Partial<CreateItemDto>) {
    const { data } = await this.api.patch(`/${id}`, item);
    return data;
  }

  async deleteItem(id: string) {
    await this.api.delete(`/${id}`);
  }

  async addReview(itemId: string, review: {
    rating: number;
    comment: string;
  }) {
    const { data } = await this.api.post(`/${itemId}/reviews`, review);
    return data;
  }

  async rentItem(itemId: string, rental: {
    startDate: string;
    endDate: string;
  }) {
    const { data } = await this.api.post(`/${itemId}/rent`, rental);
    return data;
  }
}

export const itemsService = new ItemsService(); 