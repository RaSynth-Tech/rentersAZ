'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { User, userService } from '@/app/services/user.service';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileForm from '@/app/components/profile/ProfileForm';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<User> | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }
    if (session && session.user) {
      fetchUserData();
    }
  }, [status, session, router]);

  const fetchUserData = async () => {
    try {
      const userData = await userService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditFormData(user);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
    setEditFormData(null);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Paper>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        {/* Profile Header */}
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              color: 'white',
              fontSize: '2.5rem',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
          </Box>
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {!isEditing ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push('/my-items')}
            >
              View My Items
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push('/list')}
            >
              List New Item
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {isEditing ? (
          <ProfileForm user={user} onUpdate={handleUserUpdate} />
        ) : (
          <Grid container spacing={4}>
            {/* Personal Information Card */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                      <Typography variant="body1">{user.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                      <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                    {user.phone && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                        <Typography variant="body1">{user.phone}</Typography>
                      </Grid>
                    )}
                    {user.gender && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Gender</Typography>
                        <Typography variant="body1">{user.gender}</Typography>
                      </Grid>
                    )}
                    {user.dateOfBirth && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Date of Birth</Typography>
                        <Typography variant="body1">
                          {new Date(user.dateOfBirth).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    )}
                    {user.bio && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">Bio</Typography>
                        <Typography variant="body1">{user.bio}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Address Card */}
            {user.address && (
              <Grid item xs={12}>
                <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      Address
                    </Typography>
                    <Grid container spacing={3}>
                      {user.address.street && (
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">Street</Typography>
                          <Typography variant="body1">{user.address.street}</Typography>
                        </Grid>
                      )}
                      {user.address.city && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">City</Typography>
                          <Typography variant="body1">{user.address.city}</Typography>
                        </Grid>
                      )}
                      {user.address.state && (
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2" color="textSecondary">State</Typography>
                          <Typography variant="body1">{user.address.state}</Typography>
                        </Grid>
                      )}
                      {user.address.zipCode && (
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2" color="textSecondary">ZIP Code</Typography>
                          <Typography variant="body1">{user.address.zipCode}</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Rental Preferences Card */}
            {user.rentalPreferences && (
              <Grid item xs={12}>
                <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      Rental Preferences
                    </Typography>
                    <Grid container spacing={3}>
                      {user.rentalPreferences.preferredDuration && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">Preferred Duration</Typography>
                          <Typography variant="body1">{user.rentalPreferences.preferredDuration}</Typography>
                        </Grid>
                      )}
                      {user.rentalPreferences.budget && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">Budget</Typography>
                          <Typography variant="body1">${user.rentalPreferences.budget}</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Contact Preferences Card */}
            {user.contactPreferences && (
              <Grid item xs={12}>
                <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      Contact Preferences
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="textSecondary">Email Notifications</Typography>
                        <Typography variant="body1">
                          {user.contactPreferences.email ? 'Enabled' : 'Disabled'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="textSecondary">SMS Notifications</Typography>
                        <Typography variant="body1">
                          {user.contactPreferences.sms ? 'Enabled' : 'Disabled'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle2" color="textSecondary">Push Notifications</Typography>
                        <Typography variant="body1">
                          {user.contactPreferences.push ? 'Enabled' : 'Disabled'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
