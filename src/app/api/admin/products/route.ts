import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { PRODUCTS_DATA, ProductItem } from '@/data/productsData';

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('products');
    
    let list = await collection.find().toArray();
    if (list.length === 0) {
      await collection.insertMany(PRODUCTS_DATA);
      list = await collection.find().toArray();
    }
    
    const formatted = list.map((item: any) => ({
      id: item.id || item._id.toString(),
      _id: item._id.toString(),
      name: item.name,
      category: item.category,
      brand: item.brand,
      shortDesc: item.shortDesc,
      fullDesc: item.fullDesc,
      engine: item.engine,
      displacement: item.displacement,
      power: item.power,
      weight: item.weight,
      cuttingWidth: item.cuttingWidth,
      fuelCapacity: item.fuelCapacity,
      imageBgColor: item.imageBgColor || "#eefbf2",
      image: item.image || "",
      highlights: item.highlights || [],
      specs: item.specs || {},
      voiceGreeting: item.voiceGreeting || {
        en: `${item.name} is a high performance agricultural equipment.`,
        ta: `${item.name} ஒரு சிறந்த விவசாய சாதனம்.`
      }
    }));

    return NextResponse.json({ status: 'success', data: formatted });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('products');
    
    const body = await req.json();
    const {
      id,
      name,
      category,
      brand,
      shortDesc,
      fullDesc,
      engine,
      displacement,
      power,
      weight,
      cuttingWidth,
      fuelCapacity,
      imageBgColor,
      image,
      highlights,
      specs,
      voiceGreeting
    } = body;
    
    if (!name) {
      return NextResponse.json({ status: 'error', message: 'Product name is required' }, { status: 400 });
    }

    const doc: Partial<ProductItem> & { id: string } = {
      id: id || `prod_${Date.now()}`,
      name,
      category: category || 'BRUSH CUTTER',
      brand: brand || 'GEORGE MAIJO EQUIPMENT',
      shortDesc: shortDesc || 'Heavy duty agricultural equipment.',
      fullDesc: fullDesc || 'Designed for field efficiency and durability.',
      engine: engine || 'Air-Cooled Engine',
      displacement: displacement || 'N/A',
      power: power || 'N/A',
      weight: weight || 'N/A',
      cuttingWidth: cuttingWidth || 'N/A',
      fuelCapacity: fuelCapacity || 'N/A',
      imageBgColor: imageBgColor || '#eefbf2',
      image: image || '',
      highlights: highlights || [],
      specs: specs || {},
      voiceGreeting: voiceGreeting || {
        en: `${name} is equipped with high-power agricultural features.`,
        ta: `${name} சக்திவாய்ந்த விவசாய சாதனம்.`
      }
    };

    await collection.insertOne(doc);
    return NextResponse.json({ status: 'success', data: doc });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('products');
    
    const body = await req.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'Product ID is required' }, { status: 400 });
    }

    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );

    return NextResponse.json({ status: 'success', message: 'Product updated successfully', result });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('products');
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'Product ID is required' }, { status: 400 });
    }

    await collection.deleteOne({ id });
    return NextResponse.json({ status: 'success', message: 'Product deleted from collection' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
