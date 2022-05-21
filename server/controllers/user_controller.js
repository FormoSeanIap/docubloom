import * as DocService from '../services/doc_service.js';
import * as UserService from '../services/user_service.js';
import { generateResponse } from '../../utils/util.js';

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UserService.signUp(name, email, password);

  const { code, user } = result;
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }

  // TODO: wrap res obj here instead of service layer
  res.status(200).send({
    data: {
      access_token: user.access_token,
      access_expired: user.access_expired,
      login_at: user.last_login_at,
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

  const { code, user } = result;
  if (code > 9999) {
    const response = generateResponse(code);
    // TODO: make it { error: response.message }
    res.status(response.status).send({ error: response.error });
    return;
  }

  // TODO: wrap res obj here instead of service layer
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
  const { code, docs } = await UserService.getDocs(req.user.id);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }

  res.status(200).send({
    data: {
      id: req.user.id,
      provider: req.user.provider,
      name: req.user.name,
      email: req.user.email,
      docs,
    },
  });
};

const leaveDoc = async (req, res) => {
  const userId = req.user.id;
  const { docId } = req.params;

  const { code } = await DocService.deleteUser(docId, userId);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  const response = generateResponse(code);
  res.status(response.status).send({ message: response.message });
};

export {
  signUp,
  signIn,
  getProfile,
  leaveDoc,
};
