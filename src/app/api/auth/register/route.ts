import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { hashPassword } from '@/lib/auth-utils';
import { IUser, formatUserResponse } from '@/lib/models/User';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, name, email, phone, password, businessName, businessCategory, businessType } = body;

    const userFirstName = (firstName || name || '').trim();
    const userBusinessCat = (businessCategory || businessType || 'Retail Shop').trim();

    // Field Validations
    if (!userFirstName || !email || !password || !businessName) {
      return NextResponse.json(
        { status: 'error', message: 'Please fill in all required fields (First Name, Email, Password, Business Name).' },
        { status: 400 }
      );
    }

    // Password Complexity Validation: at least 8 chars, 1 uppercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.',
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    
    // Connect to sellgrow database collections
    const registeredUsersCol = await getCollection('registered_users');
    const usersCol = await getCollection('users');

    // Check if user already exists
    const existingUser = await registeredUsersCol.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'An account with this email address already exists. Please login.' },
        { status: 409 }
      );
    }

    // Create user object
    const newUser: IUser = {
      name: userFirstName,
      firstName: userFirstName,
      email: normalizedEmail,
      phone: (phone || '').trim(),
      passwordHash: hashPassword(password),
      businessName: businessName.trim(),
      businessType: userBusinessCat,
      businessCategory: userBusinessCat,
      isEmailVerified: true,
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
    };

    // Store in registered_users collection
    const result = await registeredUsersCol.insertOne(newUser);
    newUser._id = result.insertedId;

    // Sync to users collection
    await usersCol.updateOne(
      { email: normalizedEmail },
      { $set: newUser },
      { upsert: true }
    );

    const userResponse = formatUserResponse(newUser);

    return NextResponse.json({
      status: 'success',
      message: 'Account registered successfully in sellgrow database.',
      user: userResponse,
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}
