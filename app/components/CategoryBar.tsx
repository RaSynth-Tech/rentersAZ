import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { categories } from '../data/products';
import { FilterState } from '../types/product';

interface CategoryBarProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

export function CategoryBar({ filters, updateFilter }: CategoryBarProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    updateFilter('selectedCategories', newCategories);
  };

  return (
    <Box sx={{ 
      position: 'sticky', 
      top: 24,
      backgroundColor: 'background.paper',
      borderRadius: 1,
      p: 1.5,
      boxShadow: 1,
      height: 'fit-content',
      ml: -1
    }}>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
        Categories
      </Typography>
      <List dense>
        {categories.map((category) => (
          <ListItem
            key={category}
            button
            selected={filters.selectedCategories.includes(category)}
            onClick={() => handleCategoryChange(category)}
            sx={{
              borderRadius: 1,
              mb: 0.25,
              py: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CategoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={category} primaryTypographyProps={{ fontSize: '0.875rem' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 