import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  Divider,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();
  const theme = useTheme();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setFormData(newValue === 0 
      ? { email: '', password: '' }
      : { email: '', password: '', name: '', confirmPassword: '' }
    );
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (activeTab === 0) {
        // Login with credentials
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        toast.success('Successfully logged in!');
        onClose();
        router.refresh();
      } else {
        // Register new user
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        // After successful registration, sign in the user
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error(signInResult.error);
        }

        toast.success('Successfully registered and logged in!');
        onClose();
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signIn('google', {
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('Successfully logged in with Google!');
      onClose();
      router.refresh();
    } catch (err) {
      setError('Failed to login with Google');
      toast.error('Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '600px',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }
      }}
    >
      {/* Left side - Image */}
      <Box
        sx={{
          width: '50%',
          position: 'relative',
          display: { xs: 'none', md: 'block' },
          bgcolor: 'primary.main',
        }}
      >
        <Image
          src="/login/login.png"
          alt="Login"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      {/* Right side - Form */}
      <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column' }}>
        <DialogTitle sx={{ pb: 0, pt: 1 }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Box sx={{ px: 3, pb: 1 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {activeTab === 0 
              ? 'Rent Anything, Anywhere'
              : 'Join Our Rental Community'
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeTab === 0 
              ? 'Access thousands of items from trusted owners in your area'
              : 'Start renting or sharing your items with the community'
            }
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            px: 3,
            minHeight: '48px',
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab 
            label="Login" 
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              minHeight: '48px',
              py: 0
            }}
          />
          <Tab 
            label="Register" 
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              minHeight: '48px',
              py: 0
            }}
          />
        </Tabs>

        <DialogContent sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          flex: 1,
          p: 2,
          '&:last-child': { pb: 2 }
        }}>
          {error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '12px'
          }}>
            {activeTab === 1 && (
              <TextField
                label="Full Name"
                name="name"
                value={(formData as RegisterFormData).name || ''}
                onChange={handleChange}
                required
                fullWidth
                autoFocus
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    height: '40px',
                  }
                }}
              />
            )}
            
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              autoFocus={activeTab === 0}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: '40px',
                }
              }}
            />
            
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: '40px',
                }
              }}
            />

            {activeTab === 1 && (
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={(formData as RegisterFormData).confirmPassword || ''}
                onChange={handleChange}
                required
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    height: '40px',
                  }
                }}
              />
            )}

            <Box sx={{ mt: 1 }}>
              <DialogActions sx={{ p: 0, mb: 1, gap: 1 }}>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  color="inherit"
                  disabled={isLoading}
                  size="small"
                  sx={{
                    borderColor: 'black',
                    color: 'black',
                    borderRadius: '8px',
                    textTransform: 'none',
                    height: '36px',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  size="small"
                  sx={{
                    bgcolor: 'black',
                    borderRadius: '8px',
                    textTransform: 'none',
                    height: '36px',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  }}
                >
                  {isLoading 
                    ? (activeTab === 0 ? 'Logging in...' : 'Registering...')
                    : (activeTab === 0 ? 'Login' : 'Register')
                  }
                </Button>
              </DialogActions>

              <Divider sx={{ my: 1 }}>or</Divider>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                size="small"
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  borderRadius: '8px',
                  textTransform: 'none',
                  height: '36px',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                Continue with Google
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
} 