import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const DEFAULT_SERVICES = [
  { id: "srv_1", name: "WhatsApp business", description: "WhatsApp Business API gateway and chat broadcast engine", status: "Active", successRate: 99.1, latency: 45, requests24h: 12580 },
  { id: "srv_2", name: "Website View", description: "Live tracking of client web traffic and active sessions dashboard", status: "Active", successRate: 99.8, latency: 15, requests24h: 32050 },
  { id: "srv_3", name: "App view", description: "Mobile application interface logs and native session tracker", status: "Active", successRate: 98.6, latency: 22, requests24h: 18450 },
  { id: "srv_4", name: "AI Bot", description: "Generative AI customer service assistant bot for apps and websites", status: "Active", successRate: 97.4, latency: 180, requests24h: 5410 },
  { id: "srv_5", name: "3D View", description: "Immersive 3D model visualization and rendering engine component", status: "Active", successRate: 95.0, latency: 120, requests24h: 890 },
  { id: "srv_6", name: "Sells CRM", description: "Sales pipeline tracking, lead conversion analytics, and CRM dashboard", status: "Active", successRate: 99.5, latency: 35, requests24h: 7430 },
  { id: "srv_7", name: "Digital Marketing", description: "SEO metrics tracking, ad campaign monitoring, and marketing suite", status: "Active", successRate: 99.0, latency: 60, requests24h: 15400 },
  { id: "srv_8", name: "Website Creation", description: "Automated premium landing page generation and builder engine", status: "Active", successRate: 99.2, latency: 110, requests24h: 2150 },
  { id: "srv_9", name: "Borcher", description: "Brochure creator, brand material generation, and catalog PDF builder", status: "Active", successRate: 96.5, latency: 140, requests24h: 1200 },
  { id: "srv_10", name: "Logo", description: "Branding asset builder, vector logo designs generator, and asset hosting", status: "Active", successRate: 98.9, latency: 85, requests24h: 4620 },
  { id: "srv_11", name: "Social Media", description: "Social platforms auto-posting gateway and feed synchronization engine", status: "Active", successRate: 97.2, latency: 95, requests24h: 8950 }
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('services');
    
    let list = await collection.find().toArray();
    if (list.length === 0) {
      await collection.insertMany(DEFAULT_SERVICES);
      list = await collection.find().toArray();
    }
    
    const formatted = list.map((item: any) => ({
      id: item.id || item._id.toString(),
      _id: item._id.toString(),
      name: item.name,
      description: item.description,
      status: item.status,
      successRate: item.successRate,
      latency: item.latency,
      requests24h: item.requests24h,
      features: item.features || [],
      priceMonthlyINR: item.priceMonthlyINR,
      priceMonthlyUSD: item.priceMonthlyUSD,
      priceYearlyINR: item.priceYearlyINR,
      priceYearlyUSD: item.priceYearlyUSD
    }));

    return NextResponse.json({ status: 'success', data: formatted });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('services');
    
    const body = await req.json();
    const { id, name, description, status, successRate, latency, requests24h, features, priceMonthlyINR, priceMonthlyUSD, priceYearlyINR, priceYearlyUSD } = body;
    
    if (!name) {
      return NextResponse.json({ status: 'error', message: 'Name is required' }, { status: 400 });
    }

    const doc = {
      id: id || `srv_${Date.now()}`,
      name,
      description,
      status: status || 'Active',
      successRate: successRate || 99.0,
      latency: latency || 50,
      requests24h: requests24h || 1000,
      features: features || [],
      priceMonthlyINR: priceMonthlyINR || 0,
      priceMonthlyUSD: priceMonthlyUSD || 0,
      priceYearlyINR: priceYearlyINR || 0,
      priceYearlyUSD: priceYearlyUSD || 0
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
    const collection = db.collection('services');
    
    const body = await req.json();
    const { id, name, description, status, successRate, latency, requests24h, features, priceMonthlyINR, priceMonthlyUSD, priceYearlyINR, priceYearlyUSD } = body;
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
    }

    const updateFields: any = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (successRate !== undefined) updateFields.successRate = successRate;
    if (latency !== undefined) updateFields.latency = latency;
    if (requests24h !== undefined) updateFields.requests24h = requests24h;
    if (features !== undefined) updateFields.features = features;
    if (priceMonthlyINR !== undefined) updateFields.priceMonthlyINR = priceMonthlyINR;
    if (priceMonthlyUSD !== undefined) updateFields.priceMonthlyUSD = priceMonthlyUSD;
    if (priceYearlyINR !== undefined) updateFields.priceYearlyINR = priceYearlyINR;
    if (priceYearlyUSD !== undefined) updateFields.priceYearlyUSD = priceYearlyUSD;

    await collection.updateOne({ id }, { $set: updateFields });
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('services');
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
    }

    await collection.deleteOne({ id });
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
