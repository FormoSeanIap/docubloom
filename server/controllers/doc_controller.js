import * as DocService from '../services/doc_service.js';
import * as UserService from '../services/user_service.js';
import handleResponse from '../../utils/response_handler.js';

const getUsers = async (req, res) => {
  const { docId } = req.params;
  const { code, users } = await DocService.getUsers(docId);
  if (code > 9999) {
    handleResponse(code, res);
    return;
  }

  function generateUserToRespond(user) {
    return {
      id: user._id.toHexString(),
      email: user.email,
      name: user.name,
    };
  }

  function generateMultiUsersToRespond(usersArr) {
    return usersArr.map(generateUserToRespond);
  }

  const ownersToRespond = generateMultiUsersToRespond(users.owners);
  const editorsToRespond = generateMultiUsersToRespond(users.editors);
  const viewersToRespond = generateMultiUsersToRespond(users.viewers);

  res.status(200).send({
    data: {
      owners: ownersToRespond,
      editors: editorsToRespond,
      viewers: viewersToRespond,
    },
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
    handleResponse(addUserResult.code, res);
    return;
  }

  const { code, userDetail: collaborator } = await UserService.getUserDetail(collaboratorEmail);
  if (code > 9999) {
    handleResponse(code, res);
    return;
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
  handleResponse(code, res);
};

const deleteUser = async (req, res) => {
  const { docId, userId } = req.params;

  const { code } = await DocService.deleteUser(docId, userId);
  handleResponse(code, res);
};

const getDoc = async (req, res) => {
  const { docId } = req.params;

  const { code, doc } = await DocService.getDoc(docId);
  if (code > 9999) {
    handleResponse(code, res);
    return;
  }
  res.status(200).send({
    data: doc.data,
  });
};

const createDoc = async (req, res) => {
  const doc = req.body.data;

  const { code } = await DocService.createDoc(req.user.id, doc);
  handleResponse(code, res);
};

const editDoc = async (req, res) => {
  const { docId } = req.params;
  const doc = req.body.data;

  const { code } = await DocService.editDoc(docId, doc);
  handleResponse(code, res);
};

const deleteDoc = async (req, res) => {
  const { docId } = req.params;

  const { code } = await DocService.deleteDoc(docId);
  handleResponse(code, res);
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
