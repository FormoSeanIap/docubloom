import * as Doc from '../models/doc_model.js';

const getUsers = async (req, res) => {
  const { docId } = req.params;
  const result = await Doc.getUsers(docId);

  if (result.error) {
    const status_code = result.status ? result.status : 403;
    res.status(status_code).send({ error: result.error });
    return;
  }

  res.status(200).send({
    data: result
  });
}

const getDoc = async (req, res, next) => {

  const { docId } = req.params;

  const result = await Doc.getDoc(docId);
  if (result.error) {
      const status_code = result.status ? result.status : 403;
      res.status(status_code).send({ error: result.error });
      return;
  }
  const doc = result.data;
  res.status(200).send({
      data: doc
  })
  return;
}

const createDoc = async (req, res, next) => {
  
  const doc = req.body.data;
  if (!doc) {
      res.status(400).send({ error: 'Request Error: document data is required.' });
      return;
  }
  
  const result = await Doc.createDoc(req.user.id, doc);
  if (result.error) {
      const status_code = result.status ? result.status : 403;
      res.status(status_code).send({ error: result.error });
      return;
  }
  const docId = result.insertedId.toString();

  res.status(200).send({
      data: {
          id: docId,
      }
  })
}

const editDoc = async (req, res, next) => {
  
  const { docId } = req.params;
  const doc = req.body.data;

  const result = await Doc.editDoc(docId, doc);

  if (result.error) {
      const status_code = result.status ? result.status : 403;
      res.status(status_code).send({ error: result.error });
      return;
  }

  res.status(200).send({message: 'update success'});
}


const deleteDoc = async (req, res, next) => {
  
  const { docId } = req.params;
  const userId = req.user.id;

  const result = await Doc.deleteDoc(docId);
  if (result.error) {
      const status_code = result.status ? result.status : 403;
      res.status(status_code).send({ error: result.error });
      return;
  }

  res.status(200).send({message: 'delete success'});
}

export { 
  getDoc,
  createDoc,
  editDoc, 
  deleteDoc,
  getUsers ,
};