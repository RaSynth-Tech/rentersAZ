import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import { generateProducts } from '@/app/data/products';

export async function POST() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Generate and insert new products
    const products = generateProducts(50);
    const productsWithOwnerInfo = products.map(product => ({
      ...product,
      ownerId: `owner_${Math.floor(Math.random() * 1000)}`,
      ownerName: `Owner ${Math.floor(Math.random() * 1000)}`,
      ownerRating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      reviews: [],
      status: 'available'
    }));

    await Product.insertMany(productsWithOwnerInfo);

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      count: productsWithOwnerInfo.length 
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 