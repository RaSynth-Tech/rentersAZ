'use client';

import { useState, useEffect, Suspense, useCallback, memo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { config } from '@/app/config/config';

// Memoize the search input component
const SearchInput = memo(({ 
  searchQuery, 
  onSearch, 
  onKeyPress, 
  onChange 
}: { 
  searchQuery: string;
  onSearch: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <TextField
    size="small"
    placeholder="Search items..."
    value={searchQuery}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ 
      flexGrow: 1,
      maxWidth: 400,
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'background.paper',
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={onSearch} size="small">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
));

SearchInput.displayName = 'SearchInput';

// Memoize the city select component
const CitySelect = memo(({ 
  selectedCity, 
  onChange 
}: { 
  selectedCity: string;
  onChange: (event: SelectChangeEvent) => void;
}) => (
  <FormControl size="small" sx={{ minWidth: 200 }}>
    <Select
      value={selectedCity}
      onChange={onChange}
      displayEmpty
      sx={{
        backgroundColor: 'background.paper',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'divider',
        },
      }}
    >
      <MenuItem value="">All Cities</MenuItem>
      {config.cities.map((city: string) => (
        <MenuItem key={city} value={city}>
          {city}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
));

CitySelect.displayName = 'CitySelect';

function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData');
      setIsLoggedIn(!!userData);
    }
  }, []);

  useEffect(() => {
    // Set initial values from URL
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCity(searchParams.get('city') || '');
  }, [searchParams]);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  }, [searchQuery, router, searchParams]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleCityChange = useCallback((event: SelectChangeEvent) => {
    const city = event.target.value;
    setSelectedCity(city);
    const params = new URLSearchParams(searchParams.toString());
    if (city) {
      params.set('city', city);
    } else {
      params.delete('city');
    }
    router.push(`/?${params.toString()}`);
  }, [router, searchParams]);

  const handleLogin = useCallback(() => {
    if (typeof window !== 'undefined') {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 0, 
              mr: 4,
              fontWeight: 700,
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/')}
          >
            RentersA-Z
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
            <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onKeyPress={handleKeyPress}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CitySelect
              selectedCity={selectedCity}
              onChange={handleCityChange}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/')}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#000000b5;',
                },
              }}
            >
              Rent Now
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/list')}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#000000b5;',
                },
              }}
            >
              List Item
            </Button>
            {isLoggedIn ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function LoadingFallback() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 0, 
              mr: 4,
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Renteraz
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NavbarContent />
    </Suspense>
  );
} 