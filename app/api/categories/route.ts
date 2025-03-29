import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('renteraz');
    const collection = db.collection('products');

    // Get all unique categories
    const categories = await collection.distinct('category');

    // Get subcategories for each category
    const categoriesWithSubcategories = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await collection.distinct('subcategory', { category });
        return {
          category,
          subcategories: subcategories.filter(Boolean) // Remove null/undefined values
        };
      })
    );

    return NextResponse.json(categoriesWithSubcategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 