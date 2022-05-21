import * as DocService from '../services/doc_service.js';
import * as UserService from '../services/user_service.js';
import handleResponse from '../../utils/response_handler.js';
import { generateAccessToken } from '../../utils/util.js';

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UserService.signUp(name, email, password);

  const { code, user } = result;
  if (code > 9999) {
    handleResponse(code, res);
    return;
  }

  const { accessToken, accTokenExp } = await generateAccessToken({
    provider: 'native',
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    data: {
      access_token: accessToken,
      access_expired: accTokenExp,
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
    handleResponse(code, res);
    return;
  }

  const { accessToken, accTokenExp } = await generateAccessToken({
    provider: req.body.provider,
    name: user.name,
    email: user.email,
  });

  res.status(200).send({
    data: {
      access_token: accessToken,
      access_expired: accTokenExp,
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
    handleResponse(code, res);
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
  handleResponse(code, res);
};

export {
  signUp,
  signIn,
  getProfile,
  leaveDoc,
};
