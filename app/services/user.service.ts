import axios from 'axios';
import { config } from '../config/config';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  preferences?: {
    notifications?: boolean;
    newsletter?: boolean;
    darkMode?: boolean;
  };
}

class UserService {
  private readonly api = axios.create({
    baseURL: `${config.api.baseUrl}/users`,
  });

  async getCurrentUser() {
    const { data } = await this.api.get('/me');
    return data as User;
  }

  async updateUser(userId: string, updateData: UpdateUserDto) {
    const { data } = await this.api.patch(`/${userId}`, updateData);
    return data as User;
  }

  async getUserListings(userId: string) {
    const { data } = await this.api.get(`/${userId}/listings`);
    return data;
  }

  async getUserRentals(userId: string) {
    const { data } = await this.api.get(`/${userId}/rentals`);
    return data;
  }

  async getUserReviews(userId: string) {
    const { data } = await this.api.get(`/${userId}/reviews`);
    return data;
  }

  async updatePreferences(userId: string, preferences: UpdateUserDto['preferences']) {
    const { data } = await this.api.patch(`/${userId}/preferences`, preferences);
    return data;
  }

  async deleteAccount(userId: string) {
    await this.api.delete(`/${userId}`);
  }
}

export const userService = new UserService(); 