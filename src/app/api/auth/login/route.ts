import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { verifyPassword } from '@/lib/auth-utils';
import { IUser, formatUserResponse } from '@/lib/models/User';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { status: 'error', message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    
    // Connect to users collection in sellgrow database
    const usersCol = await getCollection('users');

    // Fetch registration details directly from users collection in sellgrow database
    const user = (await usersCol.findOne({ email: normalizedEmail })) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email or password. Please register an account first.' },
        { status: 401 }
      );
    }

    // Verify password against stored hash from sellgrow database
    const isPasswordValid = verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Update lastLogin timestamp in users collection
    const now = new Date();
    await usersCol.updateOne(
      { email: normalizedEmail },
      { $set: { lastLogin: now, updatedAt: now } }
    );

    const userResponse = formatUserResponse(user);

    return NextResponse.json({
      status: 'success',
      message: 'Login successful.',
      user: userResponse,
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal server error during login.' },
      { status: 500 }
    );
  }
}
