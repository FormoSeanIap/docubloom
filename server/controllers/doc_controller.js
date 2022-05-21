import * as DocService from '../services/doc_service.js';
import * as UserService from '../services/user_service.js';
import { generateResponse } from '../../utils/util.js';

const getUsers = async (req, res) => {
  const { docId } = req.params;
  const result = await DocService.getUsers(docId);

  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  res.status(200).send({
    data: result,
  });
};

const addUser = async (req, res) => {
  const { docId } = req.params;
  const { email: collaboratorEmail, role: collaboratorRole } = req.body;
  const userRole = req.user.role;

  const result = await DocService.addUser(docId, collaboratorEmail, collaboratorRole, userRole);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  const { code, userDetail: collaborator } = await UserService.getUserDetail(collaboratorEmail);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
  }

  res.status(200).send({
    message: 'add new user success',
    data: {
      docId,
      user: {
        email: collaborator.email,
        name: collaborator.name,
        id: collaborator.id,
      },
    },
  });
};

const updateUser = async (req, res) => {
  const { docId, userId } = req.params;
  const { role: collaboratorRole } = req.body;
  const { role: userRole } = req.user;

  const result = await DocService.updateUser(docId, userId, collaboratorRole, userRole);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  res.status(200).send({
    message: 'update success',
    data: {
      docId,
      userId,
      userRole: collaboratorRole,
    },
  });
};

const deleteUser = async (req, res) => {
  const { docId, userId } = req.params;

  const result = await DocService.deleteUser(docId, userId);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  res.status(200).send({
    message: 'delete success',
    data: {
      docId,
      userId,
    },
  });
};

const getDoc = async (req, res) => {
  const { docId } = req.params;

  const result = await DocService.getDoc(docId);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }
  const doc = result.data;
  res.status(200).send({
    data: doc,
  });
};

const createDoc = async (req, res) => {
  const doc = req.body.data;

  const result = await DocService.createDoc(req.user.id, doc);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  const docId = result.insertedId.toString();

  res.status(200).send({
    data: {
      id: docId,
    },
  });
};

const editDoc = async (req, res) => {
  const { docId } = req.params;
  const doc = req.body.data;

  const result = await DocService.editDoc(docId, doc);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  res.status(200).send({ message: 'update success' });
};

const deleteDoc = async (req, res) => {
  const { docId } = req.params;

  const result = await DocService.deleteDoc(docId);
  if (result.error) {
    res.status(result.status).send({ error: result.error });
    return;
  }

  res.status(200).send({ message: 'delete success' });
};

export {
  getDoc,
  createDoc,
  editDoc,
  deleteDoc,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
