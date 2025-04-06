import axios from 'axios';
import { config } from '../config/config';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  profilePicture?: string;
  dateOfBirth?: string;
  bio?: string;
  gender?: 'Male' | 'Female' | 'Other';
  rentalPreferences?: {
    preferredDuration: string;
    budget: number;
    categories: string[];
  };
  contactPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  profilePicture?: string;
  dateOfBirth?: string;
  bio?: string;
  gender?: 'Male' | 'Female' | 'Other';
  rentalPreferences?: {
    preferredDuration?: string;
    budget?: number;
    categories?: string[];
  };
  contactPreferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
}

class UserService {
  private readonly api = axios.create({
    baseURL: '/api/users',
  });

  async getCurrentUser() {
    const { data } = await this.api.get('/me');
    return data as User;
  }

  async updateUser(userId: string, updateData: UpdateUserDto) {
    console.log(updateData)
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

  async updatePreferences(userId: string, contactPreferences: UpdateUserDto['contactPreferences']) {
    const { data } = await this.api.patch(`/${userId}/preferences`, { contactPreferences });
    return data;
  }

  async deleteAccount(userId: string) {
    await this.api.delete(`/${userId}`);
  }
}

export const userService = new UserService(); 