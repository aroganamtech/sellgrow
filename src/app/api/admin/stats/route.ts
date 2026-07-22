import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // 1. Total Registered Users from registered_users collection
    const registeredUsersCount = await db.collection('registered_users').countDocuments();
    
    // 2. Calculate MRR based on active registered users (₹2,499 / $49 per user)
    const mrrInr = 2499 * registeredUsersCount;
    const mrrUsd = 49 * registeredUsersCount;
    
    // 3. AI Agent Executions: since database has no executions logs, exact count is 0
    const executions = 0;
    
    // 4. FastAPI Backend Status & Response Time
    let backendStatus = 'Offline';
    let responseTime = 0;
    
    try {
      const startTime = Date.now();
      const res = await fetch('http://localhost:8000/', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        responseTime = Date.now() - startTime;
        backendStatus = `Healthy (${responseTime}ms)`;
      }
    } catch (err) {
      console.warn("FastAPI backend is offline:", err);
    }
    
    // 5. Fetch actual users list from users collection
    const users = await db.collection('users').find().toArray();
    const formattedUsers = users.map((u: any) => {
      let region: "India" | "International" = "International";
      if (u.email && (u.email.endsWith('.in') || u.email.endsWith('.in.ac') || u.email.includes('.in'))) {
        region = "India";
      } else if (u.phone && u.phone.startsWith('+91')) {
        region = "India";
      }
      
      return {
        id: u._id.toString(),
        name: u.name || u.firstName || 'Master Operator',
        email: u.email,
        role: u.role === 'superadmin' || u.role === 'SuperAdmin' ? 'SuperAdmin' : u.role === 'admin' || u.role === 'Admin' ? 'Admin' : 'User',
        region: region,
        status: u.status === 'suspended' || u.status === 'Suspended' ? 'Suspended' : 'Active',
        joined: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2026-07-21'
      };
    });
    
    return NextResponse.json({
      status: 'success',
      registeredUsers: registeredUsersCount,
      mrr: {
        inr: mrrInr,
        usd: mrrUsd
      },
      executions,
      backendStatus,
      users: formattedUsers
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Failed to fetch admin stats'
    }, { status: 500 });
  }
}
