import { collection } from './mongodb.js';
import { ObjectId } from 'mongodb';

const getDoc = async (doc_id) => {
  try {
    const doc = await collection.find ({"_id": ObjectId(doc_id)}).toArray();
    return doc;
  } catch (err) {
    console.error('get doc error:', err.message);
    return { error: err.message };
  }
}

export { getDoc };