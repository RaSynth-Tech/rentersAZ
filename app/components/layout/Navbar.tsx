'use client';

import { useState, useEffect, Suspense } from 'react';
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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    const city = event.target.value;
    setSelectedCity(city);
    const params = new URLSearchParams(searchParams.toString());
    if (city) {
      params.set('city', city);
    } else {
      params.delete('city');
    }
    router.push(`/?${params.toString()}`);
  };

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      setIsLoggedIn(false);
    }
  };

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
              cursor: 'pointer',
            }}
            onClick={() => router.push('/')}
          >
            Renteraz
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
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
                    <IconButton onClick={handleSearch} size="small">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
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
                  backgroundColor: 'primary.main',
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
                  backgroundColor: 'primary.main',
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