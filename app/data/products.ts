export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerRating: number;
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
  status: 'available' | 'rented' | 'maintenance';
  rating: number;
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export const categories = [
  'Electronics',
  'Sports Equipment',
  'Home & Garden',
  'Vehicles',
  'Fashion',
  'Tools',
  'Books',
  'Musical Instruments',
  'Party Supplies',
  'Camping Gear',
  'Houses',
  'Apartments',
] as const;

export const subcategories = {
  'Houses': [
    '2 BHK',
    '3 BHK',
    '4 BHK',
    'Villa',
    'Independent House',
    'Penthouse',
  ],
  'Apartments': [
    'Studio',
    '1 BHK',
    '2 BHK',
    '3 BHK',
    'Duplex',
    'Loft',
  ],
} as const;

const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Kolkata'];

export const categoryImages = {
  'Electronics': [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  ],
  'Houses': [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    'https://images.unsplash.com/photo-1600596542815-ffad4c153a9c9',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b',
  ],
  'Apartments': [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  ],
  'Sports Equipment': [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b',
  ],
  'Home & Garden': [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
  ],
  'Vehicles': [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
  ],
  'Fashion': [
    'https://images.unsplash.com/photo-1445205170230-053b83016050',
    'https://images.unsplash.com/photo-1445205170230-053b83016050',
    'https://images.unsplash.com/photo-1445205170230-053b83016050',
    'https://images.unsplash.com/photo-1445205170230-053b83016050',
    'https://images.unsplash.com/photo-1445205170230-053b83016050',
  ],
  'Tools': [
    'https://images.unsplash.com/photo-1581147036324-db1f2c9e9a61',
    'https://images.unsplash.com/photo-1581147036324-db1f2c9e9a61',
    'https://images.unsplash.com/photo-1581147036324-db1f2c9e9a61',
    'https://images.unsplash.com/photo-1581147036324-db1f2c9e9a61',
    'https://images.unsplash.com/photo-1581147036324-db1f2c9e9a61',
  ],
  'Books': [
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
  ],
  'Musical Instruments': [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  ],
  'Party Supplies': [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
  ],
  'Camping Gear': [
    'https://images.unsplash.com/photo-1504851149312-5a0ad5444099',
    'https://images.unsplash.com/photo-1504851149312-5a0ad5444099',
    'https://images.unsplash.com/photo-1504851149312-5a0ad5444099',
    'https://images.unsplash.com/photo-1504851149312-5a0ad5444099',
    'https://images.unsplash.com/photo-1504851149312-5a0ad5444099',
  ],
} as const;

// Helper function to generate random price based on category
function getPriceRange(category: string): { min: number; max: number } {
  switch (category) {
    case 'Houses':
      return { min: 50000, max: 200000 };
    case 'Apartments':
      return { min: 15000, max: 50000 };
    case 'Vehicles':
      return { min: 1000, max: 5000 };
    case 'Electronics':
      return { min: 500, max: 2000 };
    default:
      return { min: 100, max: 1000 };
  }
}

// Helper function to generate random rating
function getRandomRating(): number {
  return Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1));
}

// Helper function to generate random location
function getRandomLocation(): { city: string; state: string; country: string } {
  const cities = [
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
  ];
  const city = cities[Math.floor(Math.random() * cities.length)];
  return {
    city,
    state: 'Maharashtra',
    country: 'India',
  };
}

// Helper function to generate random availability dates
function getRandomAvailability() {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 1);
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

export function generateProducts(count: number = 50) {
  const products = [];
  const priceRanges = {
    Houses: { min: 50000, max: 200000 },
    Apartments: { min: 15000, max: 50000 },
    Vehicles: { min: 1000, max: 5000 },
    Electronics: { min: 500, max: 2000 },
    default: { min: 100, max: 1000 },
  };

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subcategory = subcategories[category as keyof typeof subcategories]?.[
      Math.floor(Math.random() * (subcategories[category as keyof typeof subcategories]?.length || 0))
    ] || '';
    const priceRange = priceRanges[category as keyof typeof priceRanges] || priceRanges.default;
    const price = Math.floor(Math.random() * (priceRange.max - priceRange.min) + priceRange.min);
    const location = getRandomLocation();
    const availability = getRandomAvailability();
    const categoryImageArray = categoryImages[category as keyof typeof categoryImages] || categoryImages.Electronics;
    const images = categoryImageArray;

    products.push({
      id: i,
      title: `${subcategory ? `${subcategory} ` : ''}${category} ${i}`,
      description: `A high-quality ${category.toLowerCase()}${subcategory ? ` - ${subcategory}` : ''} available for rent. Perfect for your needs.`,
      price,
      category,
      subcategory,
      images,
      rating: getRandomRating(),
      location,
      availability,
    });
  }

  return products;
}

export const products = generateProducts(50); 