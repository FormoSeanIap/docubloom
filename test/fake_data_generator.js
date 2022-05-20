import 'dotenv/config.js';
import argon2 from 'argon2';
import dayjs from 'dayjs';
import url from 'url';
import { docCollection, userCollection } from '../server/models/mongodb.js';
import { users, docs } from './fake_data.js';

const { NODE_ENV } = process.env;

// TODO: study and use bulk in replace of insertMany and deleteMany in the future

function getCurrentTime() {
  return dayjs().format();
}

function getTimeDiff(startTime, endTime, type) {
  const diff = dayjs(endTime).diff(dayjs(startTime), type);
  return diff;
}

async function hashPassword(password) {
  const hash = await argon2.hash(password);
  return hash;
}

async function createFakeUsers() {
  const usersToInsert = await Promise.all(users.map(async (user) => {
    const {
      provider, email, password, name,
    } = user;
    return {
      provider,
      email,
      password: await hashPassword(password),
      name,
      last_login_at: getCurrentTime(),
      created_dt: getCurrentTime(),
      updated_dt: getCurrentTime(),
    };
  }));
  try {
    await userCollection.insertMany(usersToInsert);
    console.log('createFakeUsers success');
  } catch (err) {
    console.error('createFakeUsers error', err);
  }
}

async function createFakeDocs() {
  const rawUserIds = await userCollection.find({}, { projection: { _id: 1 } }).toArray();
  const userIds = rawUserIds.map((user) => user._id.toHexString());

  // doc 1 has test0 as owner, test1 as editor, test2 as viewer
  const doc1ToInsert = {
    users: {
      [userIds[0]]: 'O',
      [userIds[1]]: 'E',
      [userIds[2]]: 'V',
    },
    data: docs[0],
  };
  // doc 2 has test0 as owner, test1 as viewer
  const doc2ToInsert = {
    users: {
      [userIds[0]]: 'O',
      [userIds[1]]: 'V',
    },
    data: docs[1],
  };
  // doc 3 has test1 as owner, test2 as editor
  const doc3ToInsert = {
    users: {
      [userIds[1]]: 'O',
      [userIds[2]]: 'E',
    },
    data: docs[2],
  };
  // doc 4 has test2 as owner
  const doc4ToInsert = {
    users: {
      [userIds[2]]: 'O',
    },
    data: docs[3],
  };

  const docsToInsert = [doc1ToInsert, doc2ToInsert, doc3ToInsert, doc4ToInsert];
  try {
    await docCollection.insertMany(docsToInsert);
    console.log('createFakeDocs success');
  } catch (err) {
    console.error('createFakeDocs error', err);
  }
}

async function createFakeData() {
  if (NODE_ENV !== 'test') {
    console.error('createFakeData only runs in test env');
    return;
  }
  await createFakeUsers();
  await createFakeDocs();
  console.log('createFakeData finished');
}

async function truncateFakeData() {
  if (NODE_ENV !== 'test') {
    console.log('truncateFakeData only runs in test env');
    return;
  }
  try {
    await userCollection.deleteMany({});
    console.log('truncate fake users success');
  } catch (err) {
    console.error('truncate fake users error', err);
  }
  try {
    await docCollection.deleteMany({});
    console.log('truncate fake docs success');
  } catch (err) {
    console.error('truncate fake docs error', err);
  }
  console.log('truncate fake data finished');
}
async function main() {
  await truncateFakeData();
  await createFakeData();
  console.log('all finished');
}

/* ============ execute when called directly via command line ============ */
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  main();
}

/* ============ the require way for being called directly ============ */
// if (require.main === module) {
//   main();
// }

export {
  truncateFakeData,
  createFakeData,
  getCurrentTime,
  getTimeDiff,
};
