import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profilePicture: { type: String }, // URL for profile picture
  dateOfBirth: { type: Date },
  bio: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  idDocumentUrl: { type: String }, // URL to an uploaded identification document
  
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  
  rentalHistory: [{ 
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['completed', 'ongoing', 'cancelled'] }
  }],
  ratings: { type: Number, default: 0 },
  reviews: [{ 
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  rentalPreferences: {
    preferredDuration: String, // e.g., "short-term", "long-term"
    budget: Number, // maximum amount willing to pay
    categories: [String]
  },
  
  paymentMethods: [{
    type: { type: String }, // e.g., "credit_card", "paypal"
    providerId: String,     // e.g., a token or ID from the payment provider
    last4: String,          // last four digits if applicable
    expiryDate: String
  }],
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  
  contactPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true }
  },
  
  role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter' },
  status: { type: String, enum: ['active', 'suspended', 'pending'], default: 'active' },
  lastLogin: { type: Date }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema); 