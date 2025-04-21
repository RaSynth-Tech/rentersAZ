import { FilterState } from '../types/product';
import { SearchFilters } from './SearchFilters';
import { CategoryBar } from './CategoryBar';

interface FiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

export function Filters({ filters, updateFilter }: FiltersProps) {
  return (
    <>
      {/* <SearchFilters filters={filters} updateFilter={updateFilter} /> */}
      <CategoryBar filters={filters} updateFilter={updateFilter} />
    </>
  );
} 