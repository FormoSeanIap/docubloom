import 'dotenv/config.js';
import { MongoClient } from 'mongodb';

const {
  NODE_ENV,
  MONGO_DB_URL,
  MONGO_DB_NAME,
  MONGO_DB_COLLECTION_DOCS,
  MONGO_DB_COLLECTION_USERS,
  MONGO_DB_NAME_TEST,
} = process.env;

const mongoConfig = {
  production: {
    /* ============ for EC2 machine ============ */
    url: MONGO_DB_URL,
    dbName: MONGO_DB_NAME,
    docCollection: MONGO_DB_COLLECTION_DOCS,
    userCollection: MONGO_DB_COLLECTION_USERS,
  },
  development: {
    /* ============ for local development ============ */
    url: MONGO_DB_URL,
    dbName: MONGO_DB_NAME,
    docCollection: MONGO_DB_COLLECTION_DOCS,
    userCollection: MONGO_DB_COLLECTION_USERS,
  },
  test: {
    /* ============ for automation test (command: npm run test) ============ */
    url: MONGO_DB_URL,
    dbName: MONGO_DB_NAME_TEST,
    docCollection: MONGO_DB_COLLECTION_DOCS,
    userCollection: MONGO_DB_COLLECTION_USERS,
  },
};

// Connection URL
const { url } = mongoConfig[NODE_ENV];
const client = new MongoClient(url, { useNewUrlParser: true });

// Database Name
const { dbName } = mongoConfig[NODE_ENV];
const db = client.db(dbName);

try {
  await client.connect();
  console.log(`MongoDB connected successfully to server on ${url}`);
} catch (err) {
  console.error('MongoDB connection failed', err);
}

const docCollection = db.collection(mongoConfig[NODE_ENV].docCollection);
const userCollection = db.collection(mongoConfig[NODE_ENV].userCollection);

export { client, docCollection, userCollection };
