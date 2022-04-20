import 'dotenv/config';
const { MONGO_DB_URL, MONGO_DB_NAME, MONGO_DB_COLLECTION_DOCS } = process.env;
import { MongoClient } from 'mongodb';

// Connection URL
const url = MONGO_DB_URL;
const client = new MongoClient(url, { useNewUrlParser: true });

// Database Name
const dbName = MONGO_DB_NAME;
const db = client.db(dbName);

try {
  await client.connect();
  console.log(`MongoDB connected successfully to server on ${url}`);
} catch (err) {
  console.error('MongoDB connection failed', err);
}

const collection_docs = db.collection(MONGO_DB_COLLECTION_DOCS);

export { client, collection_docs };