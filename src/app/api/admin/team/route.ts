import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';


const DEFAULT_TEAM = [
  { sgId: "SG-SA-100", name: "Naveen S", email: "naveen@sellgrow.io", role: "SuperAdmin", status: "Active", permissions: "Full Access", password: "sellgrow123", assignedServices: ["srv_1", "srv_2", "srv_3", "srv_4", "srv_5", "srv_6", "srv_7", "srv_8", "srv_9", "srv_10", "srv_11"] },
  { sgId: "SG-A-101", name: "Operator Main", email: "operator@sellgrow.io", role: "Operator", status: "Active", permissions: "Read/Write", password: "operator123", assignedServices: ["srv_1", "srv_2", "srv_3"] },
  { sgId: "SG-A-102", name: "AI Dev Team", email: "developer@sellgrow.io", role: "Developer", status: "Active", permissions: "Read/Write", password: "developer123", assignedServices: ["srv_4", "srv_5", "srv_8"] },
  { sgId: "SG-A-103", name: "Manager Ops", email: "manager@sellgrow.io", role: "Manager", status: "Active", permissions: "Full Access", password: "manager123", assignedServices: ["srv_6", "srv_7", "srv_11"] },
  { sgId: "SG-A-104", name: "Support Agent", email: "support@sellgrow.io", role: "Support", status: "Active", permissions: "Read Only", password: "support123", assignedServices: ["srv_1", "srv_2"] },
  { sgId: "SG-A-105", name: "Admin Lead", email: "admin@sellgrow.io", role: "Admin", status: "Active", permissions: "Full Access", password: "admin123", assignedServices: ["srv_1", "srv_2", "srv_3", "srv_6", "srv_7"] }
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/sub-admin');
    const metaCollection = db.collection<any>('_meta');
    
    const seedMeta = await metaCollection.findOne({ key: 'team_seeded' });
    let list = await collection.find().toArray();
    
    if (list.length === 0 && !seedMeta) {
      await collection.insertMany(DEFAULT_TEAM);
      await metaCollection.updateOne(
        { key: 'team_seeded' },
        { $set: { seeded: true, seededAt: new Date() } },
        { upsert: true }
      );
      list = await collection.find().toArray();
    } else if (list.length > 0 && !seedMeta) {
      await metaCollection.updateOne(
        { key: 'team_seeded' },
        { $set: { seeded: true, seededAt: new Date() } },
        { upsert: true }
      );
    }
    
    const formatted = list.map((item: any, idx: number) => ({
      id: item._id.toString(),
      sgId: item.sgId || (item.role === 'SuperAdmin' ? 'SG-SA-100' : `SG-A-${101 + idx}`),
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

    const count = await collection.countDocuments();
    const sgId = body.sgId || `SG-A-${101 + count}`;

    const doc = {
      sgId,
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
    const { id, sgId, permissions, role, status, name, email, password, authKey, adminLevel, country, assignedServices } = body;
    
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
    if (sgId !== undefined) updateFields.sgId = sgId;
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
