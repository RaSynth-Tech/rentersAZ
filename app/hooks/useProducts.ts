import { useState, useEffect } from 'react';
import type { Product } from '../types/product';

// Cache for products
let productsCache: Product[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Check if we have cached data that's still valid
      const now = Date.now();
      if (productsCache && (now - lastFetchTime) < CACHE_DURATION) {
        setProducts(productsCache);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Update cache
        productsCache = data;
        lastFetchTime = now;
        
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
} 