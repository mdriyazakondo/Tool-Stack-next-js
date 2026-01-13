import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("❌ Missing MONGODB_URI env");
if (!dbName) throw new Error("❌ Missing DB_NAME env");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

export async function dbConnect(collectionName) {
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log("✅ MongoDB Connected");
    }

    const db = client.db(dbName);
    return db.collection(collectionName);
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    throw error;
  }
}
