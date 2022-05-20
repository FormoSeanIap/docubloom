/* eslint-disable no-undef */
import 'dotenv/config.js';
import { users } from './fake_data.js';
import { expect, requester } from './set_up.js';
import { getCurrentTime, getTimeDiff } from './fake_data_generator.js';
import { userCollection } from '../server/models/mongodb.js';

const expectedExpireTime = process.env.TOKEN_EXPIRE;

describe('user', () => {
  before(() => console.log('user test began'));

  /* ============ sign up ============ */

  it('sign up', async () => {
    const user = {
      name: 'sean',
      email: 'sean@sean.com',
      password: 'sean',
    };

    const res = await requester.post('/api/1.0/user/signup').send(user);

    const { body } = res;

    const expectedRes = {
      data: {
        access_token: body.data.access_token,
        access_expired: body.data.access_expired,
        login_at: body.data.login_at,
        user: {
          id: body.data.user.id,
          name: body.data.user.name,
          email: body.data.user.email,
        },
      },
    };

    expect(body).to.deep.equal(expectedRes);
    expect(body.data.access_token).to.be.a('string');
    expect(body.data.access_expired).to.equal(expectedExpireTime);
    expect(expect(getTimeDiff(body.data.login_at, getCurrentTime(), 'second') < 1));
  });

  it('sign up without name, email or password', async () => {
    const userNoName = {
      email: 'arthur@gmail.com',
      password: 'password',
    };

    const resNoname = await requester.post('/api/1.0/user/signup').send(userNoName);

    expect(resNoname.statusCode).to.equal(400);
    expect(resNoname.body.error.code).to.equal(31003);

    const userNoEmail = {
      name: 'arthur',
      password: 'password',
    };

    const resNoEmail = await requester.post('/api/1.0/user/signup').send(userNoEmail);

    expect(resNoEmail.statusCode).to.equal(400);
    expect(resNoEmail.body.error.code).to.equal(31003);

    const userNoPwd = {
      name: 'arthur',
      email: 'arthur@gmail.com',
    };

    const resNoPwd = await requester.post('/api/1.0/user/signup').send(userNoPwd);

    expect(resNoPwd.statusCode).to.equal(400);
    expect(resNoPwd.body.error.code).to.equal(31003);
  });

  it('sign up with existed email', async () => {
    const user = {
      name: users[0].name,
      email: users[0].email,
      password: 'password',
    };

    const res = await requester.post('/api/1.0/user/signup').send(user);

    expect(res.status).to.equal(409);
    expect(res.body.error.code).to.equal(31002);
  });

  it('sign up with invalid email', async () => {
    const user = {
      name: 'sean',
      email: 'sean',
      password: 'sean',
    };

    const res = await requester.post('/api/1.0/user/signup').send(user);

    expect(res.status).to.equal(400);
    expect(res.body.error.code).to.deep.equal(31001);
  });

  it('sign up with invalid password', async () => {
    const user = {
      name: 'sean',
      email: 'sean@sean.com',
      password: 'sea',
    };

    const res = await requester.post('/api/1.0/user/signup').send(user);

    expect(res.status).to.equal(400);
    expect(res.body.error.code).to.deep.equal(31001);
  });

  it('sign up with malicious email', async () => {
    const user = {
      name: 'sean',
      email: '<script>alert(1)</script>',
      password: 'password',
    };

    const res = await requester.post('/api/1.0/user/signup').send(user);

    expect(res.status).to.equal(400);
    expect(res.body.error.code).to.deep.equal(31001);
  });

  /* ============ sign in ============ */

  it('native sign in with correct password', async () => {
    const user1 = users[0];
    const user = {
      provider: user1.provider,
      email: user1.email,
      password: user1.password,
    };

    const res = await requester.post('/api/1.0/user/signin').send(user);

    const { data } = res.body;
    const userExpect = {
      id: data.user.id, // need id from returned data
      provider: user1.provider,
      name: user1.name,
      email: user1.email,
    };

    expect(data.user).to.deep.equal(userExpect);
    expect(data.access_token).to.be.a('string');
    expect(data.access_expired).to.equal(expectedExpireTime);
    expect(getTimeDiff(data.login_at, getCurrentTime(), 'second') < 1);

    // make sure DB is changed, too
    const { last_login_at: loginTime, updated_dt: updatedDt } = await userCollection
      .findOne({ email: user.email });

    expect(getTimeDiff(loginTime, getCurrentTime(), 'second') < 1);
    expect(getTimeDiff(updatedDt, getCurrentTime(), 'second') < 1);
  });

  it('native sign in without provider', async () => {
    const user1 = users[0];
    const user = {
      email: user1.email,
      password: user1.password,
    };

    const res = await requester.post('/api/1.0/user/signin').send(user);

    expect(res.body).to.deep.equal({
      error: {
        code: 32101,
        title: 'sign in fails',
        message: 'provider is not supported',
      },
    });
  });

  it('native sign in without email or password', async () => {
    const user1 = users[0];
    const userNoEmail = {
      provider: user1.provider,
      password: user1.password,
    };

    const res1 = await requester.post('/api/1.0/user/signin').send(userNoEmail);

    expect(res1.status).to.equal(400);
    expect(res1.body).to.deep.equal({
      error: {
        code: 32201,
        title: 'native sign in fails',
        message: 'email or password are required',
      },
    });

    const userNoPassword = {
      provider: user1.provider,
      email: user1.email,
    };

    const res2 = await requester.post('/api/1.0/user/signin').send(userNoPassword);

    expect(res2.status).to.equal(400);
    expect(res2.body).to.deep.equal({
      error: {
        code: 32201,
        title: 'native sign in fails',
        message: 'email or password are required',
      },
    });
  });

  it('native sign in with wrong email or password', async () => {
    const user1 = users[0];
    const userWrongPwd = {
      provider: user1.provider,
      email: user1.email,
      password: 'wrong password',
    };

    const res1 = await requester.post('/api/1.0/user/signin').send(userWrongPwd);

    expect(res1.status).to.equal(403);
    expect(res1.body).to.deep.equal({
      error: {
        code: 32202,
        title: 'native sign in fails',
        message: 'email or password incorrect',
      },
    });

    const userWrongEmail = {
      provider: user1.provider,
      email: user1.email,
      password: 'wrong password',
    };

    const res2 = await requester.post('/api/1.0/user/signin').send(userWrongEmail);

    expect(res2.status).to.equal(403);
    expect(res2.body).to.deep.equal({
      error: {
        code: 32202,
        title: 'native sign in fails',
        message: 'email or password incorrect',
      },
    });
  });

  it('native sign in with malicious password', async () => {
    const user1 = users[0];
    const user = {
      provider: user1.provider,
      email: user1.email,
      password: '" OR 1=1; -- ',
    };

    const res = await requester.post('/api/1.0/user/signin').send(user);

    expect(res.status).to.equal(403);
    expect(res.body.error.code).to.deep.equal(32202);
  });

  it('sign in with unsupported provider', async () => {
    const user = {
      provider: 'unsupported',
      email: 'test@test.com',
      password: 'test',
    };

    const res = await requester.post('/api/1.0/user/signin').send(user);

    expect(res.status).to.equal(400);
    expect(res.body.error.code).to.deep.equal(32101);
  });

  /* ============ get user profile ============ */

  it('get profile with valid access_token', async () => {
    const userToSignIn = {
      provider: 'native',
      email: 'test@test.com',
      password: 'test',
    };

    const signInRes = await requester.post('/api/1.0/user/signin').send(userToSignIn);

    const user1 = signInRes.body.data.user;

    const accessToken = signInRes.body.data.access_token;
    const profileRes = await requester.get('/api/1.0/user/profile').set('Authorization', `Bearer ${accessToken}`);

    const { data } = profileRes.body;
    const user2 = {
      id: data.id,
      provider: data.provider,
      name: data.name,
      email: data.email,
    };

    const { docs } = data;

    expect(user2).to.deep.equal(user1);
    expect(docs).to.be.an('array').lengthOf(0);
  });

  it('get profile without access_token', async () => {
    const res = await requester.get('/api/1.0/user/profile');

    expect(res.status).to.equal(401);
    expect(res.body.error.code).to.equal(20001);
  });

  it('get profile with invalid access_token', async () => {
    const res = await requester.get('/api/1.0/user/profile').set('Authorization', 'Bearer wrong_token');

    expect(res.status).to.equal(403);
    expect(res.body.error.code).to.equal(20002);
  });

  after(() => console.log('user test finished'));
});
