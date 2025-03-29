import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Filter, WithId, Document } from 'mongodb';

interface Product extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  images: string[];
  location: {
    city: string;
    state: string;
    country: string;
  };
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductQuery = Filter<WithId<Product>>;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const priceRange = searchParams.get('priceRange');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const client = await clientPromise;
    const db = client.db('renteraz');
    const collection = db.collection<Product>('products');

    // Build query
    const query: ProductQuery = {};
    
    if (category) {
      query.category = category;
    }
    
    if (subcategory) {
      query.subcategory = subcategory;
    }
    
    if (city) {
      query['location.city'] = city;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        query.price = { $gte: min, $lte: max };
      } else {
        query.price = { $gte: min };
      }
    }

    // Get total count for pagination
    const total = await collection.countDocuments(query);

    // Get paginated results
    const products = await collection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('renteraz');
    const collection = db.collection('products');

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 