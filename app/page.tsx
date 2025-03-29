'use client';

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  useTheme,
  CircularProgress,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import { useState, Suspense } from 'react';
import { products, categories, subcategories } from './data/products';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import CategoryIcon from '@mui/icons-material/Category';
import { config } from '@/app/config/config';

const ITEMS_PER_PAGE = 50;

function ProductGridContent() {
  const theme = useTheme();
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const itemsPerPage = 12;

  // Get unique categories
  const availableCategories = Array.from(new Set(products.map(p => p.category)));

  // Filter products based on selected categories, subcategories, search query, and city
  const filteredProducts = products.filter(product => {
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSubcategories = selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory || '');
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === '' || 
      product.location.city.toLowerCase() === selectedCity.toLowerCase();
    
    return matchesCategories && matchesSubcategories && matchesSearch && matchesCity;
  });

  // Get paginated products
  const paginatedProducts = filteredProducts.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setDisplayCount(ITEMS_PER_PAGE); // Reset to initial count when filters change
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
    setDisplayCount(ITEMS_PER_PAGE); // Reset to initial count when filters change
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
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
                  selected={selectedCategory === category}
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
        </Grid>
        <Grid item xs={12} md={10}>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>City</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
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
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    label="Price Range"
                  >
                    <MenuItem value="">All Prices</MenuItem>
                    <MenuItem value="0-1000">Under ₹1,000</MenuItem>
                    <MenuItem value="1000-5000">₹1,000 - ₹5,000</MenuItem>
                    <MenuItem value="5000-10000">₹5,000 - ₹10,000</MenuItem>
                    <MenuItem value="10000+">Over ₹10,000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2" sx={{ fontSize: '1rem' }}>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.875rem' }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="primary" sx={{ fontSize: '1rem' }}>
                          ₹{product.price}/day
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {product.location.city}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: '0.875rem' }}>
                          ({product.rating.toFixed(1)})
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          {/* Load More Button */}
          {displayCount < filteredProducts.length && (
            <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleLoadMore}
                size="large"
                sx={{ 
                  minWidth: 200,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Load More
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>

      {/* Bottom Ad */}
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="YOUR-AD-CLIENT-ID"
          data-ad-slot="YOUR-AD-SLOT-ID"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Box>
    </Container>
  );
}

function LoadingFallback() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
    </Container>
  );
}

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-AD-CLIENT-ID"
        crossOrigin="anonymous"
      />
      <Suspense fallback={<LoadingFallback />}>
        <ProductGridContent />
      </Suspense>
    </Container>
  );
}
