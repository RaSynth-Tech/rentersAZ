export const config = {
  app: {
    name: 'RenterAZ',
    description: 'Your One-Stop Platform for Renting Items',
    version: '1.0.0',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  auth: {
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  company: {
    name: 'RenterAZ Technologies Pvt Ltd',
    address: '#123, Electronic City Phase 1',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560100',
    country: 'India',
    email: 'contact@renteraz.com',
    phone: '+91-1234567890',
  },
  cities: [
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
  ],
  theme: {
    primaryColor: '#000000',
    secondaryColor: '#f50057',
    navbar: {
      glass: true,
      blur: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      darkBackgroundColor: 'rgba(18, 18, 18, 0.8)',
    },
  },
  ads: {
    topBanner: true,
    bottomBanner: true,
    adSlots: {
      top: 'top-banner-slot-id',
      bottom: 'bottom-banner-slot-id',
    },
  },
} as const; 