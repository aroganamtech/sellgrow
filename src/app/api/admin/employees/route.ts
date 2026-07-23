import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const DEFAULT_EMPLOYEES = [
  { name: "Naveen S", email: "717824i605@kce.in.ac", work: "Voice AI Integration", status: "Active", access: "Full Access", assignedSubAdmin: "Operator Main" },
  { name: "Karthik R", email: "karthik@sellgrow.co", work: "CRM Automation", status: "Active", access: "Read & Write", assignedSubAdmin: "AI Dev Team" },
  { name: "Priya K", email: "priya@sellgrow.co", work: "Landing Page Editor", status: "Active", access: "View Only", assignedSubAdmin: "Support Agent" },
  { name: "Amit Shah", email: "amit@sellgrow.co", work: "Customer Support", status: "Suspended", access: "View Only", assignedSubAdmin: "Unassigned" },
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/employees');
    
    let list = await collection.find().toArray();
    if (list.length === 0) {
      await collection.insertMany(DEFAULT_EMPLOYEES);
      list = await collection.find().toArray();
    }
    
    const formatted = list.map((item: any) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      work: item.work,
      status: item.status,
      access: item.access,
      assignedSubAdmin: item.assignedSubAdmin
    }));

    return NextResponse.json({ status: 'success', data: formatted });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/employees');
    
    const body = await req.json();
    const { name, email, work, access, status, assignedSubAdmin } = body;
    
    if (!name || !email) {
      return NextResponse.json({ status: 'error', message: 'Name and Email are required' }, { status: 400 });
    }

    const doc = {
      name,
      email,
      work: work || 'Voice AI Integration',
      access: access || 'View Only',
      status: status || 'Active',
      assignedSubAdmin: assignedSubAdmin || 'Unassigned'
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

export async function PUT(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/employees');
    
    const body = await req.json();
    const { id, work, access, status, assignedSubAdmin } = body;
    
    if (!id) {
      return NextResponse.json({ status: 'error', message: 'Employee ID is required' }, { status: 400 });
    }

    let filter: any = { id };
    try {
      if (ObjectId.isValid(id)) {
        filter = { $or: [{ _id: new ObjectId(id) }, { id }] };
      }
    } catch (e) {}

    const updateFields: any = {};
    if (work !== undefined) updateFields.work = work;
    if (access !== undefined) updateFields.access = access;
    if (status !== undefined) updateFields.status = status;
    if (assignedSubAdmin !== undefined) updateFields.assignedSubAdmin = assignedSubAdmin;

    await collection.updateOne(filter, { $set: updateFields });
    
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('superadmin/employees');
    
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
