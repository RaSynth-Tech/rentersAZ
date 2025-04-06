'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { categories } from '../../data/products';
import ImageUpload from './ImageUpload'; // Import the updated ImageUpload component

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
}

export default function ListItemForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    images: [],
    location: {
      address: '',
      city: '',
      state: '',
      country: 'India',
    },
    availability: {
      startDate: '',
      endDate: '',
    },
  });

  // Handle text and select inputs
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if (!name) return;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform form data to match your product schema
      const productData = {
        ...formData,
        price: Number(formData.price),
        ownerId: 'temp-user-id', // Replace with actual user ID
        ownerName: 'John Doe', // Replace with actual user name
        ownerRating: 5,
        rating: 0,
        reviews: [],
        status: 'available',
        subcategory: '',
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const result = await response.json();
      console.log('Product created:', result);
      router.push('/');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        List Your Item
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* Form Fields */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Price per day"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Typography>₹</Typography>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Address Fields */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="City"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="State"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
            />
          </Grid>
          {/* Date Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Available From"
              name="availability.startDate"
              type="date"
              value={formData.availability.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Available Until"
              name="availability.endDate"
              type="date"
              value={formData.availability.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Image Upload */}
          <Grid item xs={12}>
            <ImageUpload
              category={formData.category}
              onImagesUploaded={(urls) =>
                setFormData((prev) => ({
                  ...prev,
                  images: urls,
                }))
              }
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              List Item
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
