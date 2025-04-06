'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product } from '../types/product';

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  pagination: PaginationInfo;
  hasMore: boolean;
  refreshProducts: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0
  });
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = async (page = 1, limit = 6, append = false) => {
    try {
      // Only set loading to true if this is the initial load
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      console.log(`fetching products page ${page}, limit ${limit}`);
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      // Ensure each product has an _id property
      const productsWithId = data.products.map((product: any) => ({
        ...product,
        _id: product._id || product.id
      }));
      
      // Update products state - either append or replace
      if (append) {
        setProducts(prevProducts => [...prevProducts, ...productsWithId]);
      } else {
        setProducts(productsWithId);
      }
      
      // Update pagination info
      setPagination(data.pagination);
      
      // Check if there are more products to load
      setHasMore(data.pagination.page < data.pagination.totalPages);
      
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = async () => {
    if (!loading && !loadingMore && hasMore) {
      await fetchProducts(pagination.page + 1, pagination.limit, true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    loadingMore,
    error,
    pagination,
    hasMore,
    refreshProducts: () => fetchProducts(),
    loadMore
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
} 