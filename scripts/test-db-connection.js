const { MongoClient } = require('mongodb');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

const uri = process.env.MONGODB_URI || 'mongodb+srv://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz.zkjrg.mongodb.net/sellgrow?retryWrites=true&w=majority';

async function testConnection() {
  console.log('Connecting to MongoDB Atlas at:', uri.replace(/([^:]+):([^@]+)@/, '$1:****@'));
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    const db = client.db('sellgrow');
    const collections = await db.listCollections().toArray();
    console.log('Collections in sellgrow DB:', collections.map(c => c.name));
    
    // Check team collection
    const teamColl = db.collection('superadmin/sub-admin');
    const teamCount = await teamColl.countDocuments();
    console.log('Team member count in superadmin/sub-admin collection:', teamCount);

    // Check services collection
    const srvColl = db.collection('services');
    const srvCount = await srvColl.countDocuments();
    console.log('Service count in services collection:', srvCount);
    
    await client.close();
    console.log('Database test complete with 0 errors!');
  } catch (err) {
    console.error('MongoDB Atlas Connection Error:', err);
    process.exit(1);
  }
}

testConnection();
