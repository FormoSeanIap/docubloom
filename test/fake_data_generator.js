import 'dotenv/config.js';
import argon2 from 'argon2';
import dayjs from 'dayjs';
import url from 'url';
import { docCollection, userCollection } from '../server/models/mongodb.js';
import { users } from './fake_data.js';

/* ============ execute when called directly from the command line ============ */
// if (require.main === module) {
//   main();
// }

const { NODE_ENV } = process.env;

// TODO: study and use bulk in replace of insertMany and deleteMany in the future

function getCurrentTime() {
  return dayjs().format();
}

async function hashPassword(password) {
  const hash = await argon2.hash(password);
  return hash;
}

async function checkPassword(password, hash) {
  const isPwdCorrect = await argon2.verify(hash, password);
  return isPwdCorrect;
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
  } catch (e) {
    console.error('createFakeUsers error', e);
  }
}

async function createFakeData() {
  if (NODE_ENV !== 'test') {
    console.error('createFakeData only runs in test env');
    return;
  }
  await createFakeUsers();
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
  } catch (e) {
    console.error('truncate fake users error', e);
  }
  try {
    await docCollection.deleteMany({});
    console.log('truncate fake docs success');
  } catch (e) {
    console.error('truncate fake docs error', e);
  }
  console.log('truncate fake data finished');
}

async function main() {
  await truncateFakeData();
  await createFakeData();
}

/* ============ execute when called directly via command line ============ */
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  main();
}

/* ============ the require way for being called directly ============ */
// if (require.main === module) {
//   main();
// }
