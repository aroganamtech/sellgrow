import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('products');
    
    const body = await req.json();
    const { productId, image } = body;
    
    if (!productId) {
      return NextResponse.json({ status: 'error', message: 'productId is required' }, { status: 400 });
    }

    const result = await collection.updateOne(
      { id: productId },
      { $set: { image: image || '' } }
    );

    return NextResponse.json({
      status: 'success',
      message: 'Product image updated in products/image collection',
      productId,
      image: image || ''
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('products');
    
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    
    if (!productId) {
      return NextResponse.json({ status: 'error', message: 'productId is required' }, { status: 400 });
    }

    await collection.updateOne(
      { id: productId },
      { $set: { image: '' } }
    );

    return NextResponse.json({
      status: 'success',
      message: 'Product image removed from products/image collection',
      productId
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
