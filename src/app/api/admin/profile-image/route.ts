import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET — fetch the current super admin profile image
export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/images');

    const doc = await collection.findOne({ type: 'profile' });

    if (!doc) {
      return NextResponse.json({ status: 'success', data: null });
    }

    return NextResponse.json({
      status: 'success',
      data: {
        imageBase64: doc.imageBase64,
        mimeType: doc.mimeType || 'image/jpeg',
        updatedAt: doc.updatedAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// POST — upload / replace the super admin profile image (stored as base64)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType } = body;

    if (!imageBase64) {
      return NextResponse.json({ status: 'error', message: 'imageBase64 is required' }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection('superadmin/images');

    // Upsert — there is always exactly one profile image document
    await collection.updateOne(
      { type: 'profile' },
      {
        $set: {
          type: 'profile',
          imageBase64,
          mimeType: mimeType || 'image/jpeg',
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ status: 'success', message: 'Profile image saved.' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// DELETE — remove the profile image
export async function DELETE() {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/images');
    await collection.deleteOne({ type: 'profile' });
    return NextResponse.json({ status: 'success', message: 'Profile image removed.' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
