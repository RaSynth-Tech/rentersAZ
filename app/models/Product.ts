import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  images: [{ type: String }],
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerRating: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
  },
  availability: {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  },
  rating: { type: Number, required: true },
  reviews: [{
    id: String,
    userId: String,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: String
  }],
  createdAt: { type: String, default: new Date().toISOString() },
  updatedAt: { type: String, default: new Date().toISOString() }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema); 