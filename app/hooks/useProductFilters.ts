import { useState } from 'react';
import type { Product } from '../types/product';
import { FilterState } from '../types/product';
import { ITEMS_PER_PAGE } from '../constants';

export function useProductFilters(products: Product[]) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: [],
    selectedSubcategories: {},
    searchQuery: '',
    selectedCity: '',
    priceRange: '',
  });

  const filteredProducts = products.filter(product => {
    const matchesCategories = filters.selectedCategories.length === 0 || 
      filters.selectedCategories.includes(product.category);
    
    const matchesSubcategories = !filters.selectedSubcategories[product.category]?.length || 
      (product.subcategory && filters.selectedSubcategories[product.category].includes(product.subcategory));
    
    const matchesSearch = filters.searchQuery === '' || 
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesCity = filters.selectedCity === '' || 
      product.location.city.toLowerCase() === filters.selectedCity.toLowerCase();
    
    return matchesCategories && matchesSubcategories && matchesSearch && matchesCity;
  });

  const paginatedProducts = filteredProducts.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setDisplayCount(ITEMS_PER_PAGE);
  };

  return {
    filters,
    updateFilter,
    filteredProducts,
    paginatedProducts,
    displayCount,
    handleLoadMore,
  };
} 