import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { categories, subcategories } from '../data/products';
import { FilterState } from '../types/product';
import { useState } from 'react';

interface CategoryBarProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

export function CategoryBar({ filters, updateFilter }: CategoryBarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    updateFilter('selectedCategories', [category]);
    // Clear subcategories when changing category
    updateFilter('selectedSubcategories', {});
  };

  const handleSubcategoryChange = (category: string, subcategory: string) => {
    updateFilter('selectedSubcategories', {
      [category]: [subcategory]
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Box sx={{ 
      position: 'sticky', 
      top: 24,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      p: 2,
      boxShadow: 2,
      height: 'fit-content',
      width: '100%',
      maxWidth: 280,
    }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Categories
      </Typography>
      <List component="nav" sx={{ width: '100%' }}>
        {categories.map((category) => (
          <Box key={category}>
            <ListItem
              button
              selected={filters.selectedCategories.includes(category)}
              onClick={() => handleCategoryChange(category)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                pl: 2,
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemText 
                primary={category} 
                primaryTypographyProps={{ 
                  fontSize: '0.875rem',
                }} 
              />
              {subcategories[category as keyof typeof subcategories] && (
                expandedCategories.includes(category) ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItem>
            {subcategories[category as keyof typeof subcategories] && (
              <Collapse in={expandedCategories.includes(category)} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 4, pr: 2, mb: 1 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Select Type</InputLabel>
                    <Select
                      value={filters.selectedSubcategories?.[category]?.[0] || ''}
                      onChange={(e) => handleSubcategoryChange(category, e.target.value)}
                      label="Select Type"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.24)',
                        },
                      }}
                    >
                      {subcategories[category as keyof typeof subcategories].map((subcategory) => (
                        <MenuItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Collapse>
            )}
            {category !== categories[categories.length - 1] && <Divider sx={{ my: 0.5 }} />}
          </Box>
        ))}
      </List>
    </Box>
  );
} 