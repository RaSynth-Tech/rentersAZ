'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  Alert,
  Snackbar,
  SelectChangeEvent,
} from '@mui/material';
import { User, UpdateUserDto, userService } from '@/app/services/user.service';

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export default function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [formData, setFormData] = useState<UpdateUserDto>({
    name: user.name,
    phone: user.phone || '',
    address: user.address || { street: '', city: '', state: '', zipCode: '' },
    bio: user.bio || '',
    gender: user.gender || 'Other',
    dateOfBirth: user.dateOfBirth || '',
    contactPreferences: user.contactPreferences || { email: true, sms: false, push: true },
    rentalPreferences: user.rentalPreferences || { preferredDuration: '', budget: 0, categories: [] },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleGenderChange = (e: SelectChangeEvent<'Male' | 'Female' | 'Other'>) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value as 'Male' | 'Female' | 'Other' }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: date.toISOString() }));
    }
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactPreferences: { ...prev.contactPreferences, [name]: checked },
    }));
  };

  const handleRentalPreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentalPreferences: { ...prev.rentalPreferences, [name]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await userService.updateUser(user.id, formData);
      onUpdate(updatedUser);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            name="street"
            value={formData.address?.street || ''}
            onChange={handleAddressChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.address?.city || ''}
            onChange={handleAddressChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.address?.state || ''}
            onChange={handleAddressChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="zipCode"
            value={formData.address?.zipCode || ''}
            onChange={handleAddressChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Rental Preferences
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Preferred Duration"
            name="preferredDuration"
            value={formData.rentalPreferences?.preferredDuration || ''}
            onChange={handleRentalPreferenceChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Budget"
            name="budget"
            type="number"
            value={formData.rentalPreferences?.budget || ''}
            onChange={handleRentalPreferenceChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Contact Preferences
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.contactPreferences?.email || false}
                onChange={handlePreferenceChange}
                name="email"
              />
            }
            label="Email Notifications"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.contactPreferences?.sms || false}
                onChange={handlePreferenceChange}
                name="sms"
              />
            }
            label="SMS Notifications"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.contactPreferences?.push || false}
                onChange={handlePreferenceChange}
                name="push"
              />
            }
            label="Push Notifications"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 