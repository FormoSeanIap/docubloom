import { collection } from './mongodb.js';

const getDoc = async () => {
  const findResult = await collection.find({}).toArray();
  return findResult;
  // console.log('Found documents =>', findResult);
}

export { getDoc };