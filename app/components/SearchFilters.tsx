import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { FilterState } from '../types/product';
import { PRICE_RANGES } from '../constants';
import { config } from '../config/config';

interface SearchFiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

export function SearchFilters({ filters, updateFilter }: SearchFiltersProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            size="small"
            sx={{ 
              '& .MuiInputBase-root': { 
                height: '40px',
                '& input': {
                  padding: '8px 12px',
                  fontSize: '0.875rem'
                }
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',
                transform: 'translate(14px, 8px) scale(1)',
                '&.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -9px) scale(0.75)'
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>City</InputLabel>
            <Select
              value={filters.selectedCity}
              onChange={(e) => updateFilter('selectedCity', e.target.value)}
              label="City"
              sx={{ 
                height: '40px',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                  fontSize: '0.875rem'
                }
              }}
            >
              <MenuItem value="">All Cities</MenuItem>
              {config.cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Price Range</InputLabel>
            <Select
              value={filters.priceRange}
              onChange={(e) => updateFilter('priceRange', e.target.value)}
              label="Price Range"
              sx={{ 
                height: '40px',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                  fontSize: '0.875rem'
                }
              }}
            >
              {PRICE_RANGES.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
} 