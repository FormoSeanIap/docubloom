import * as DocService from '../services/doc_service.js';
import * as UserService from '../services/user_service.js';

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UserService.signUp(name, email, password);

  if (result.error) {
    const statusCode = result.status ? result.status : 403;
    res.status(statusCode).send({ error: result.error });
    return;
  }
  const { user } = result;
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
  const result = await UserService.signIn(req.body);

  if (result.error) {
    const statusCode = result.status ? result.status : 403;
    res.status(statusCode).send({ error: result.error });
    return;
  }

  const { user } = result;

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

const getProfile = async (req, res) => {
  const userDocs = await UserService.getDocs(req.user.id);

  if (userDocs.error) {
    const statusCode = userDocs.status ? userDocs.status : 403;
    res.status(statusCode).send({ error: userDocs.error });
    return;
  }

  res.status(200).send({
    data: {
      id: req.user.id,
      provider: req.user.provider,
      name: req.user.name,
      email: req.user.email,
      docs: userDocs,
    },
  });
};

const leaveDoc = async (req, res) => {
  const userId = req.user.id;
  const { docId } = req.params;

  const result = await DocService.deleteUser(docId, userId);
  if (result.error) {
    const statusCode = result.status ? result.status : 403;
    res.status(statusCode).send({ error: result.error });
    return;
  }

  res.status(200).send({
    message: 'Successfully left the document',
    data: {
      userId,
      docId,
    },
  });
};

export {
  signUp,
  signIn,
  getProfile,
  leaveDoc,
};
