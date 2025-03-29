import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { categories } from '../data/products';
import { config } from '../config/config';
import { FilterState } from '../types/product';
import { PRICE_RANGES } from '../constants';

interface FiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

export function Filters({ filters, updateFilter }: FiltersProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    updateFilter('selectedCategories', newCategories);
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>City</InputLabel>
              <Select
                value={filters.selectedCity}
                onChange={(e) => updateFilter('selectedCity', e.target.value)}
                label="City"
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
      <Box sx={{ 
        position: 'sticky', 
        top: 24,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        p: 2,
        boxShadow: 1,
        height: 'fit-content',
        ml: -1
      }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category}
              button
              selected={filters.selectedCategories.includes(category)}
              onClick={() => handleCategoryChange(category)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
} 