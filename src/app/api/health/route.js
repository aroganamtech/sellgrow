import { NextResponse } from 'next/server';
import { getDatabase, DB_NAME } from '@/lib/db';
export async function GET() {
    try {
        const db = await getDatabase();
        const collections = await db.listCollections().toArray();
        return NextResponse.json({
            status: 'ok',
            database: DB_NAME,
            connected: true,
            collections: collections.map(c => c.name)
        });
    }
    catch (error) {
        return NextResponse.json({
            status: 'error',
            database: DB_NAME,
            connected: false,
            error: error.message || 'Database connection failed'
        }, { status: 500 });
    }
}
