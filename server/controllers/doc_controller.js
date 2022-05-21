import * as DocService from '../services/doc_service.js';
import * as UserService from '../services/user_service.js';
import { generateResponse } from '../../utils/util.js';

const getUsers = async (req, res) => {
  const { docId } = req.params;
  const { code, users } = await DocService.getUsers(docId);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }

  res.status(200).send({
    data: users,
  });
};

const addUser = async (req, res) => {
  const { docId } = req.params;
  const { email: collaboratorEmail, role: collaboratorRole } = req.body;
  const userRole = req.user.role;

  const addUserResult = await DocService.addUser(
    docId,
    collaboratorEmail,
    collaboratorRole,
    userRole,
  );
  if (addUserResult.code > 9999) {
    const response = generateResponse(addUserResult.code);
    res.status(response.status).send({ error: response.error });
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

  const { code } = await DocService.updateUser(docId, userId, collaboratorRole, userRole);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }

  const response = generateResponse(code);
  res.status(response.status).send({ message: response.message });
};

const deleteUser = async (req, res) => {
  const { docId, userId } = req.params;

  const { code } = await DocService.deleteUser(docId, userId);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  const response = generateResponse(code);
  res.status(response.status).send({ message: response.message });
};

const getDoc = async (req, res) => {
  const { docId } = req.params;

  const { code, doc } = await DocService.getDoc(docId);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  res.status(200).send({
    data: doc.data,
  });
};

const createDoc = async (req, res) => {
  const doc = req.body.data;

  const { code } = await DocService.createDoc(req.user.id, doc);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  const response = generateResponse(code);
  res.status(response.status).send({ message: response.message });
};

const editDoc = async (req, res) => {
  const { docId } = req.params;
  const doc = req.body.data;

  const { code } = await DocService.editDoc(docId, doc);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  const response = generateResponse(code);
  res.status(response.status).send({ message: response.message });
};

const deleteDoc = async (req, res) => {
  const { docId } = req.params;

  const { code } = await DocService.deleteDoc(docId);
  if (code > 9999) {
    const response = generateResponse(code);
    res.status(response.status).send({ error: response.error });
    return;
  }
  const response = generateResponse(code);
  res.status(response.status).send({ message: response.message });
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
