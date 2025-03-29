import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL));
  }

  return NextResponse.redirect(new URL('/api/auth/signin/google', process.env.NEXT_PUBLIC_APP_URL));
} 