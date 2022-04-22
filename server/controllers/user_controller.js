import * as User from '../models/user_model.js';
import * as DocService from '../services/doc_service.js';

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
          access_expired: user.access_expired,
          login_at: user.login_at,
          user: {
              id: user.id,
              name: user.name,
              email: user.email,
          },
      },
  });
};

const signIn = async (req, res) => {
    const data = req.body;

    let result;
    switch (data.provider) {
        case 'native':
            result = await nativeSignIn(data.email, data.password);
            break;
        case 'facebook':
            result = { error: 'Facebook signIn is currently under construction' };
            // result = await facebookSignIn(data.access_token);
            break;
        case 'google':
            result = { error: 'Google signIn is currently under construction' };
            // result = await googleSignIn(data.access_token);
            break;
        default:
            result = { error: 'Wrong Request' };
    }

    if (result.error) {
        const status_code = result.status ? result.status : 403;
        res.status(status_code).send({ error: result.error });
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
            access_expired: user.access_expired,
            login_at: user.login_at,
            user: {
                id: user.id,
                provider: user.provider,
                name: user.name,
                email: user.email,
            },
        },
    });
};

const nativeSignIn = async (email, password) => {
    if (!email || !password) {
        return { error: 'Request Error: email and password are required.', status: 400 };
    }

    try {
        return await User.nativeSignIn(email, password);
    } catch (error) {
        return { error };
    }
};

const getProfile = async (req, res) => {

    const userDocs = await User.getUserDocs(req.user.id);

    res.status(200).send({
        data: {
            id: req.user.id,
            provider: req.user.provider,
            name: req.user.name,
            email: req.user.email,
            docs: userDocs
        },
    });
    return;
};

const leaveDoc = async (req, res) => {
    const userId = req.user.id;
    const docId = req.params.docId;

    const result = await DocService.deleteUser(docId, userId);
    if (result.error) {
        const status_code = result.status ? result.status : 403;
        res.status(status_code).send({ error: result.error });
        return;
    }

    res.status(200).send({
        message: 'Successfully left the document',
        data: {
            userId,
            docId,
        }
    });
};

export {
    signUp,
    signIn,
    getProfile,
    leaveDoc,
};