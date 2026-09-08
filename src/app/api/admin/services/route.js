import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
const DEFAULT_SERVICES = [
    { id: "srv_website", name: "Website", description: "Automated premium landing page generation and builder engine", status: "Active", priceMonthlyINR: 4999, priceMonthlyUSD: 69, priceYearlyINR: 49999, priceYearlyUSD: 699, features: ["Automated Premium Layouts", "High-Speed Page Builder"] },
    { id: "srv_brochure_logo", name: "Brochure & Logo", description: "Brochure creator, brand material generation, and vector logo builder", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 14, priceYearlyINR: 9999, priceYearlyUSD: 139, features: ["High-Res Vector Formats", "Exportable PDF Catalogs"] },
    { id: "srv_social_media", name: "Social Media Creation", description: "Social platforms auto-posting gateway and feed synchronization engine", status: "Active", priceMonthlyINR: 1199, priceMonthlyUSD: 16, priceYearlyINR: 11999, priceYearlyUSD: 159, features: ["Scheduled Auto-Posting Engine", "Cross-Platform Feed Sync"] },
    { id: "srv_seo_ads", name: "SEO/AEO/GEO, Google Ads", description: "Search engine metrics tracking, ad campaign monitoring, and AI optimization", status: "Active", priceMonthlyINR: 1999, priceMonthlyUSD: 29, priceYearlyINR: 19999, priceYearlyUSD: 299, features: ["SEO & GEO Performance Metrics", "Google Ads Campaign Manager"] },
    { id: "srv_whatsapp_api", name: "WhatsApp API", description: "Official Meta WhatsApp Business API gateway and broadcast engine", status: "Active", priceMonthlyINR: 1399, priceMonthlyUSD: 25, priceYearlyINR: 13999, priceYearlyUSD: 259, features: ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"] },
    { id: "srv_mobile_view", name: "Mobile View", description: "Mobile application interface logs and native session tracker", status: "Active", priceMonthlyINR: 1499, priceMonthlyUSD: 19, priceYearlyINR: 14999, priceYearlyUSD: 199, features: ["Mobile App Interface Logs", "Native Session Tracker"] },
    { id: "srv_website_view", name: "Website View", description: "Live tracking of client web traffic and active sessions dashboard", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 15, priceYearlyINR: 9999, priceYearlyUSD: 149, features: ["Live Client Traffic Tracking", "Active Sessions Dashboard"] },
    { id: "srv_3d_view", name: "3D View", description: "Immersive 3D model visualization and rendering engine component", status: "Active", priceMonthlyINR: 3999, priceMonthlyUSD: 59, priceYearlyINR: 39999, priceYearlyUSD: 599, features: ["Immersive 3D Model Rendering", "Interactive WebGL Component"] },
    { id: "srv_ai_agent", name: "AI Agent", description: "Generative AI customer service assistant bot for apps and websites", status: "Active", priceMonthlyINR: 2999, priceMonthlyUSD: 39, priceYearlyINR: 29999, priceYearlyUSD: 399, features: ["Generative AI Customer Agent", "Smart Context Responses"] },
    { id: "srv_sells_crm", name: "Sells CRM", description: "Sales pipeline tracking, lead conversion analytics, and CRM dashboard", status: "Active", priceMonthlyINR: 2499, priceMonthlyUSD: 35, priceYearlyINR: 24999, priceYearlyUSD: 349, features: ["Lead Conversion Pipeline", "Real-time Analytics Tracker"] }
];
export async function GET() {
    try {
        const db = await getDatabase();
        const collection = db.collection('services');
        const metaCollection = db.collection('_meta');
        const seedMeta = await metaCollection.findOne({ key: 'services_seeded' });
        let list = await collection.find().toArray();
        if (list.length === 0 && !seedMeta) {
            await collection.insertMany(DEFAULT_SERVICES);
            await metaCollection.updateOne({ key: 'services_seeded' }, { $set: { seeded: true, seededAt: new Date() } }, { upsert: true });
            list = await collection.find().toArray();
        }
        else if (list.length > 0 && !seedMeta) {
            await metaCollection.updateOne({ key: 'services_seeded' }, { $set: { seeded: true, seededAt: new Date() } }, { upsert: true });
        }
        const formatted = list.map((item, idx) => ({
            id: item.id || (item._id ? item._id.toString() : `srv_${idx}`),
            _id: item._id ? item._id.toString() : String(item.id || `srv_${idx}`),
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
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
export async function POST(req) {
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
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
export async function PUT(req) {
    try {
        const db = await getDatabase();
        const collection = db.collection('services');
        const body = await req.json();
        const { id, name, description, status, successRate, latency, requests24h, features, priceMonthlyINR, priceMonthlyUSD, priceYearlyINR, priceYearlyUSD } = body;
        if (!id) {
            return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
        }
        const updateFields = {};
        if (name !== undefined)
            updateFields.name = name;
        if (description !== undefined)
            updateFields.description = description;
        if (status !== undefined)
            updateFields.status = status;
        if (successRate !== undefined)
            updateFields.successRate = successRate;
        if (latency !== undefined)
            updateFields.latency = latency;
        if (requests24h !== undefined)
            updateFields.requests24h = requests24h;
        if (features !== undefined)
            updateFields.features = features;
        if (priceMonthlyINR !== undefined)
            updateFields.priceMonthlyINR = priceMonthlyINR;
        if (priceMonthlyUSD !== undefined)
            updateFields.priceMonthlyUSD = priceMonthlyUSD;
        if (priceYearlyINR !== undefined)
            updateFields.priceYearlyINR = priceYearlyINR;
        if (priceYearlyUSD !== undefined)
            updateFields.priceYearlyUSD = priceYearlyUSD;
        await collection.updateOne({ id }, { $set: updateFields });
        return NextResponse.json({ status: 'success' });
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
export async function DELETE(req) {
    try {
        const db = await getDatabase();
        const collection = db.collection('services');
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ status: 'error', message: 'ID is required' }, { status: 400 });
        }
        let filter = { id };
        if (ObjectId.isValid(id)) {
            filter = { $or: [{ _id: new ObjectId(id) }, { id }] };
        }
        await collection.deleteOne(filter);
        return NextResponse.json({ status: 'success' });
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
