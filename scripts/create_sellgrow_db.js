const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz.zkjrg.mongodb.net/sellgrow?retryWrites=true&w=majority";

async function createSellGrowDatabase() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB cluster.");

    const db = client.db("sellgrow");

    // Create collections and insert initial setup documents so the database is created in MongoDB Compass/Atlas
    console.log("Creating initial collections for 'sellgrow' database...");

    const settingsCol = db.collection("system_settings");
    await settingsCol.insertOne({
      project: "sellgrow",
      version: "3.0.0",
      description: "SellGrow Platform Core Database",
      status: "active",
      createdAt: new Date(),
    });

    const usersCol = db.collection("users");
    await usersCol.updateOne(
      { email: "admin@sellgrow.com" },
      {
        $set: {
          name: "Naveen S",
          email: "admin@sellgrow.com",
          businessName: "Aroganam Tech",
          businessType: "FMCG Enterprise",
          registered_business: {
            businessName: "Aroganam Tech",
            businessType: "FMCG Enterprise",
            registeredAt: new Date(),
            status: "active",
          },
          role: "admin",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: new Date(),
        },
      },
      { upsert: true }
    );

    const productsCol = db.collection("products");
    await productsCol.insertOne({
      title: "Sample SellGrow Product",
      category: "General",
      price: 0,
      isSample: true,
      createdAt: new Date(),
    });

    console.log("\n==========================================");
    console.log("SUCCESS! Database 'sellgrow' created on MongoDB Atlas!");
    console.log("Created collections: system_settings, users, products");
    console.log("==========================================");

  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await client.close();
  }
}

createSellGrowDatabase();
