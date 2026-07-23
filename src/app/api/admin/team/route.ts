import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const DEFAULT_TEAM = [
  { name: "Naveen S", email: "naveen@sellgrow.co", role: "SuperAdmin", status: "Active", permissions: "Full Access", password: "sellgrow123", assignedServices: [] },
  { name: "Operator Main", email: "operator@sellgrow.co", role: "Operator", status: "Active", permissions: "Read/Write", password: "sellgrow123", assignedServices: [] },
  { name: "AI Dev Team", email: "ai-dev@sellgrow.co", role: "Developer", status: "Active", permissions: "Read/Write", password: "sellgrow123", assignedServices: [] },
  { name: "Support Agent", email: "support@sellgrow.co", role: "Support", status: "Active", permissions: "Read Only", password: "sellgrow123", assignedServices: [] },
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/sub-admin');
    
    let list = await collection.find().toArray();
    if (list.length === 0) {
      await collection.insertMany(DEFAULT_TEAM);
      list = await collection.find().toArray();
    }
    
    const formatted = list.map((item: any) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      role: item.role,
      status: item.status,
      permissions: item.permissions,
      password: item.password,
      authKey: item.authKey || 'Level-5 Master',
      adminLevel: item.adminLevel || 'Platform Creator',
      country: item.country || '🇮🇳 India HQ',
      assignedServices: item.assignedServices || [],
    }));

    return NextResponse.json({ status: 'success', data: formatted });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/sub-admin');
    
    const body = await req.json();
    const { name, email, role, status, permissions, password, assignedServices } = body;
    
    if (!name || !email) {
      return NextResponse.json({ status: 'error', message: 'Name and Email are required' }, { status: 400 });
    }

    const doc = {
      name,
      email,
      role,
      status: status || 'Active',
      permissions: permissions || 'Read Only',
      password: password || 'sellgrow123',
      assignedServices: assignedServices || [],
    };

    const result = await collection.insertOne(doc);
    return NextResponse.json({
      status: 'success',
      data: { id: result.insertedId.toString(), ...doc }
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/sub-admin');
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
    }

    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
      await collection.deleteOne({ id });
    }
    
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/sub-admin');
    
    const body = await req.json();
    const { id, permissions, role, status, name, email, password, authKey, adminLevel, country, assignedServices } = body;
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
    }

    let filter: any = { id };
    try {
      if (ObjectId.isValid(id)) {
        filter = { $or: [{ _id: new ObjectId(id) }, { id }] };
      }
    } catch (e) {}

    const updateFields: any = {};
    if (permissions !== undefined) updateFields.permissions = permissions;
    if (role !== undefined) updateFields.role = role;
    if (status !== undefined) updateFields.status = status;
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (password !== undefined) updateFields.password = password;
    if (authKey !== undefined) updateFields.authKey = authKey;
    if (adminLevel !== undefined) updateFields.adminLevel = adminLevel;
    if (country !== undefined) updateFields.country = country;
    if (assignedServices !== undefined) updateFields.assignedServices = assignedServices;

    await collection.updateOne(filter, { $set: updateFields });
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
