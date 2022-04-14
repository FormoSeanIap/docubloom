const { collection } = require('./mongodb');

const getDoc = async () => {
  const findResult = await collection.find({}).toArray();
  return findResult;
  // console.log('Found documents =>', findResult);
}

module.exports = {
  getDoc,
}