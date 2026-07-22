import { getClientPromise } from './mongodb';

export const DB_NAME = process.env.MONGODB_DB || 'sellgrow';

export async function getDatabase() {
  const client = await getClientPromise();
  return client.db(DB_NAME);
}

export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}
