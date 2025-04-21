import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb-client';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('renteraz');
    const collection = db.collection('products');

    // Get all unique categories
    const categories = await collection.distinct('category');

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 