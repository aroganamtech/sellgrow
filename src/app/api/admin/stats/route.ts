import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // 1. Total Registered Users from registered_users collection
    const registeredUsersCount = await db.collection('registered_users').countDocuments();
    
    // 2. Calculate MRR based on active subscriptions in database
    let mrrInr = 0;
    let mrrUsd = 0;
    try {
      const activeSubscriptions = await db.collection('subscriptions').find({ status: 'active' }).toArray();
      activeSubscriptions.forEach((sub: any) => {
        if (sub.currency === 'INR' || sub.currency === 'inr') {
          mrrInr += sub.amount || 0;
        } else {
          mrrUsd += sub.amount || 0;
        }
      });
    } catch (err) {
      console.warn("Could not query subscriptions collection:", err);
    }
    
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
      console.warn("FastAPI backend is offline (connection refused).");
    }
    
    // 5. Fetch actual users list from users collection
    const users = await db.collection('users').find().toArray();
    
    // Deduplicate users by email address
    const uniqueUsersMap = new Map();
    users.forEach((u: any) => {
      if (u.email) {
        const emailLower = u.email.toLowerCase().trim();
        if (!uniqueUsersMap.has(emailLower)) {
          uniqueUsersMap.set(emailLower, u);
        }
      } else {
        uniqueUsersMap.set(u._id.toString(), u);
      }
    });

    const uniqueUsersArray = Array.from(uniqueUsersMap.values());

    const formattedUsers = uniqueUsersArray.map((u: any) => {
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
        plan: u.plan || 'Free Trial',
        joined: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2026-07-21'
      };
    });
    
    // Recalculate unique count if the registered users collection contains duplicates
    const finalRegisteredCount = Math.max(registeredUsersCount, uniqueUsersArray.length);

    return NextResponse.json({
      status: 'success',
      registeredUsers: finalRegisteredCount,
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
