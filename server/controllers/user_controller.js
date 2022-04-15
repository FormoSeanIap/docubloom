import * as User from '../models/user_model.js';
import { main } from '../models/mongodb.js';
import * as document from '../models/document_model.js';

const signUp = async (req, res, next) => {
  
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      res.status(400).send({ error: 'Request Error: name, email and password are required.' });
      return;
  }

  const result = await User.signUp(name, email, password);
  if (result.error) {
      res.status(403).send({ error: result.error });
      return;
  }

  const user = result.user;
  if (!user) {
      res.status(500).send({ error: 'Database Query Error' });
      return;
  }

  res.status(200).send({
      data: {
          access_token: user.access_token,
          login_at: user.login_at,
          user: {
              id: user.id,
              name: user.name,
              email: user.email,
          },
      },
  });
}


// const getDoc = async (req, res, next) => {
//   const result = await document.getDoc();
//   // const { name, age } = req.body;
//   // const doc = { name, age };
//   // const result = await db.collection('users').insertOne(doc);
//   // res.send(result);
//   res.send(result);
// }


// const createDoc = async (req, res, next) => {
//   // const { name, age } = req.body;
//   // const doc = { name, age };
//   // const result = await db.collection('users').insertOne(doc);
//   // res.send(result);
//   res.send('done.');
// }


export { signUp };