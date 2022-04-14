const { main } = require('../models/mongodb');
const document = require('../models/document_model');

const getDoc = async (req, res, next) => {
  const result = await document.getDoc();
  // const { name, age } = req.body;
  // const doc = { name, age };
  // const result = await db.collection('users').insertOne(doc);
  // res.send(result);
  res.send(result);
}


const createDoc = async (req, res, next) => {
  // const { name, age } = req.body;
  // const doc = { name, age };
  // const result = await db.collection('users').insertOne(doc);
  // res.send(result);
  res.send('done.');
}

module.exports = {
  getDoc,
  createDoc,
}