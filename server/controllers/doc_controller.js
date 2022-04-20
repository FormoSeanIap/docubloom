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

export { 
  getUsers 
};