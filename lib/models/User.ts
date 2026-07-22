import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  name: string;
  firstName?: string;
  email: string;
  phone?: string;
  passwordHash: string;
  businessName: string;
  businessType: string;
  businessCategory?: string;
  isEmailVerified?: boolean;
  role: 'admin' | 'super-admin' | 'operator';
  status: 'active' | 'pending' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  phone?: string;
  businessName: string;
  businessType: string;
  businessCategory?: string;
  isEmailVerified?: boolean;
  role: 'admin' | 'super-admin' | 'operator';
  status: string;
  createdAt: string;
}

export function formatUserResponse(user: IUser): UserResponse {
  return {
    id: user._id ? user._id.toString() : '',
    name: user.name || user.firstName || '',
    firstName: user.firstName || user.name || '',
    email: user.email,
    phone: user.phone || '',
    businessName: user.businessName,
    businessType: user.businessType || user.businessCategory || 'Retail Shop',
    businessCategory: user.businessCategory || user.businessType || 'Retail Shop',
    isEmailVerified: user.isEmailVerified ?? true,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
  };
}
