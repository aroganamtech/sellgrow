import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { PRODUCTS_DATA } from '@/data/productsData';

export async function GET() {
    try {
        const db = await getDatabase();
        const collection = db.collection('products');
        const metaCollection = db.collection('_meta');
        const seedMeta = await metaCollection.findOne({ key: 'products_seeded' });
        let list = await collection.find().toArray();
        if (list.length === 0 && !seedMeta) {
            await collection.insertMany(PRODUCTS_DATA);
            await metaCollection.updateOne({ key: 'products_seeded' }, { $set: { seeded: true, seededAt: new Date() } }, { upsert: true });
            list = await collection.find().toArray();
        }
        else if (list.length > 0 && !seedMeta) {
            await metaCollection.updateOne({ key: 'products_seeded' }, { $set: { seeded: true, seededAt: new Date() } }, { upsert: true });
        }
        const formatted = list.map((item) => ({
            id: item.id || item._id.toString(),
            _id: item._id.toString(),
            name: item.name,
            sku: item.sku || `GM-${(item.name || '').toUpperCase().replace(/[^A-Z0-9]/g, "-").slice(0, 8)}-${Math.floor(100 + Math.random() * 900)}`,
            price: item.price || "B2B Quote",
            variants: item.variants || "Single Variant",
            category: item.category,
            brand: item.brand,
            shortDesc: item.shortDesc || item.description || "",
            fullDesc: item.fullDesc || item.description || "",
            description: item.description || item.shortDesc || "",
            engine: item.engine || "N/A",
            displacement: item.displacement || "N/A",
            power: item.power || "N/A",
            weight: item.weight || "N/A",
            cuttingWidth: item.cuttingWidth || "N/A",
            fuelCapacity: item.fuelCapacity || "N/A",
            imageBgColor: item.imageBgColor || "#eefbf2",
            image: item.image || "",
            galleryImages: item.galleryImages || [],
            hologramVideo: item.hologramVideo || "/videos/george-maijo-bc-358-4sp-3d.mp4",
            brochure: item.brochure || "",
            stock: item.stock || 50,
            highlights: item.highlights || [],
            specs: item.specs || {},
            voiceGreeting: item.voiceGreeting || {
                en: `${item.name} is a high performance agricultural equipment.`,
                ta: `${item.name} ஒரு சிறந்த விவசாய சாதனம்.`
            }
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
        const collection = db.collection('products');
        const body = await req.json();
        const {
            id, name, sku, price, variants, category, brand,
            shortDesc, fullDesc, description, engine, displacement,
            power, weight, cuttingWidth, fuelCapacity, imageBgColor,
            image, galleryImages, hologramVideo, brochure, stock,
            highlights, specs, voiceGreeting
        } = body;

        if (!name) {
            return NextResponse.json({ status: 'error', message: 'Product name is required' }, { status: 400 });
        }

        const doc = {
            id: id || `prod_${Date.now()}`,
            name,
            sku: sku || `GM-${name.toUpperCase().replace(/[^A-Z0-9]/g, "-").slice(0, 8)}-${Math.floor(100 + Math.random() * 900)}`,
            price: price || "B2B Quote",
            variants: variants || "Single Variant",
            category: category || 'BRUSH CUTTER',
            brand: brand || 'GEORGE MAIJO EQUIPMENT',
            shortDesc: shortDesc || description || 'Heavy duty commercial equipment.',
            fullDesc: fullDesc || description || 'Designed for field efficiency and durability.',
            description: description || shortDesc || 'Heavy duty commercial equipment.',
            engine: engine || (specs ? (specs["Engine Model"] || specs["Engine Type"] || "Air-Cooled Engine") : 'Air-Cooled Engine'),
            displacement: displacement || (specs ? (specs["Displacement"] || "N/A") : 'N/A'),
            power: power || (specs ? (specs["Max Power Output"] || specs["Power"] || "N/A") : 'N/A'),
            weight: weight || (specs ? (specs["Dry Weight"] || specs["Weight"] || "N/A") : 'N/A'),
            cuttingWidth: cuttingWidth || (specs ? (specs["Cutting Width"] || "N/A") : 'N/A'),
            fuelCapacity: fuelCapacity || (specs ? (specs["Fuel Tank Capacity"] || specs["Fuel Tank"] || "N/A") : 'N/A'),
            imageBgColor: imageBgColor || '#eefbf2',
            image: image || '',
            galleryImages: galleryImages || [],
            hologramVideo: hologramVideo || '',
            brochure: brochure || '',
            stock: stock || 50,
            highlights: highlights || [],
            specs: specs || {},
            voiceGreeting: voiceGreeting || {
                en: `${name} is equipped with high-power agricultural features.`,
                ta: `${name} சக்திவாய்ந்த விவசாய சாதனம்.`
            }
        };

        await collection.updateOne({ id: doc.id }, { $set: doc }, { upsert: true });
        return NextResponse.json({ status: 'success', data: doc });
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const db = await getDatabase();
        const collection = db.collection('products');
        const body = await req.json();
        const { id, ...updateData } = body;
        if (!id) {
            return NextResponse.json({ status: 'error', message: 'Product ID is required' }, { status: 400 });
        }
        const result = await collection.updateOne({ id }, { $set: updateData });
        return NextResponse.json({ status: 'success', message: 'Product updated successfully', result });
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
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
    }
    catch (error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
