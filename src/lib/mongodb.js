import { MongoClient } from 'mongodb';
import dns from 'dns';
// Fix for Node.js DNS resolution order on Windows & local router DNS blocking SRV lookup
try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    dns.setDefaultResultOrder('ipv4first');
}
catch (e) {
    // Ignore
}
const DEFAULT_SRV_URI = 'mongodb+srv://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz.zkjrg.mongodb.net/sellgrow?retryWrites=true&w=majority';
const DEFAULT_DIRECT_URI = 'mongodb://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz-shard-00-00.zkjrg.mongodb.net:27017,careerblitz-shard-00-01.zkjrg.mongodb.net:27017,careerblitz-shard-00-02.zkjrg.mongodb.net:27017/sellgrow?ssl=true&replicaSet=atlas-yqqypr-shard-0&authSource=admin&retryWrites=true&w=majority';
let client = null;
let clientPromise = null;
async function connectWithFallback(primaryUri) {
    const options = {
        maxPoolSize: 50, // Support up to 50 concurrent DB operations per instance
        minPoolSize: 5, // Keep 5 warm connections ready instantly
        maxIdleTimeMS: 30000, // Close idle connections after 30s
        waitQueueTimeoutMS: 5000, // Timeout queued operations after 5s instead of hanging
        socketTimeoutMS: 30000, // Timeout socket operations after 30s
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
    };
    try {
        const c = new MongoClient(primaryUri, options);
        return await c.connect();
    }
    catch (err) {
        console.warn('Primary MongoDB connection failed, attempting direct connection fallback...', err.message);
        const fallbackUri = process.env.MONGODB_DIRECT_URI || DEFAULT_DIRECT_URI;
        const cFallback = new MongoClient(fallbackUri, options);
        return await cFallback.connect();
    }
}
export function getClientPromise() {
    const uri = process.env.MONGODB_URI || DEFAULT_SRV_URI;
    let globalWithMongo = global;
    if (process.env.NODE_ENV === 'development') {
        if (!globalWithMongo._mongoClientPromise) {
            globalWithMongo._mongoClientPromise = connectWithFallback(uri);
        }
        return globalWithMongo._mongoClientPromise;
    }
    else {
        if (!clientPromise) {
            clientPromise = connectWithFallback(uri);
        }
        return clientPromise;
    }
}
export default getClientPromise;
