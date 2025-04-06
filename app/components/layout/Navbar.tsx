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
  Avatar,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { config } from '@/app/config/config';
import LoginModal from '../auth/LoginModal';
import { useSession, signOut } from 'next-auth/react';

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
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
    setIsLoginModalOpen(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.refresh();
  }, [router]);

  const handleProfile = useCallback(() => {
    router.push('/profile');
  }, [router]);

  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
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

          <Box sx={{ display: 'flex', gap: 2, ml: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={() => router.push('/')}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#000000b5' },
              }}
            >
              Rent Now
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push('/list')}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#000000b5' },
              }}
            >
              List Item
            </Button>
            {status === 'authenticated' ? (
              <>
                <Tooltip title="Profile">
                  <IconButton onClick={handleProfile} size="small">
                    {session?.user?.image ? (
                      <Avatar src={session.user.image} alt={session.user.name} />
                    ) : (
                      <PersonIcon fontSize="large" />
                    )}
                  </IconButton>
                </Tooltip>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    borderColor: 'black',
                    color: 'black',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={handleLogin}
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  textTransform: 'none',
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
      <LoginModal 
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </AppBar>
  );
}

function LoadingFallback() {
  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
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
            RentersA-Z
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
