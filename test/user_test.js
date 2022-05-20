/* eslint-disable no-undef */
import 'dotenv/config.js';
import assert from 'assert';
import sinon from 'sinon';
import dayjs from 'dayjs';
import { users } from './fake_data.js';
import { expect, requester } from './set_up.js';
import { getCurrentTime, getTimeDiff } from './fake_data_generator.js';
import { docCollection, userCollection } from '../server/models/mongodb.js';
import * as UserModel from '../server/models/user_model.js';

const expectedExpireTime = process.env.TOKEN_EXPIRE;

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// let stub;

describe('user', () => {
  before(() => {
    // const fakeGetFacebookProfile = (token) => {
    //   if (!token) {
    //     return Promise.resolve();
    //   }
    //   if (token === fbTokenSignInFirstTime) {
    //     return Promise.resolve(fbProfileSignInFirstTime);
    //   } if (token === fbTokenSignInAgain) {
    //     return Promise.resolve(fbProfileSignInAgain);
    //   }
    //   return Promise.reject({ error: { code: 190 } });
    // };
    // stub = sinon.stub(UserModel, 'getFacebookProfile').callsFake(fakeGetFacebookProfile);
  });

  /**
   * Sign Up
   */

  // it('sign up', async () => {
  //   const user = {
  //     name: 'arthur',
  //     email: 'arthur@gmail.com',
  //     password: 'password',
  //   };

  //   const res = await requester.post('/api/1.0/user/signup').send(user);

  //   const { data } = res.body;

  //   const userExpected = {
  //     id: data.user.id, // need id from returned data
  //     provider: 'native',
  //     name: user.name,
  //     email: user.email,
  //     picture: null,
  //   };

  //   expect(data.user).to.deep.equal(userExpected);
  //   expect(data.access_token).to.be.a('string');
  //   expect(data.access_expired).to.equal(expectedExpireTime);
  //   expect(new Date(data.login_at).getTime()).to.closeTo(Date.now(), 1000);
  // });

  // it('sign up without name or email or password', async () => {
  //   const user1 = {
  //     email: 'arthur@gmail.com',
  //     password: 'password',
  //   };

  //   const res1 = await requester.post('/api/1.0/user/signup').send(user1);

  //   expect(res1.statusCode).to.equal(400);

  //   const user2 = {
  //     name: 'arthur',
  //     password: 'password',
  //   };

  //   const res2 = await requester.post('/api/1.0/user/signup').send(user2);

  //   expect(res2.statusCode).to.equal(400);

  //   const user3 = {
  //     name: 'arthur',
  //     email: 'arthur@gmail.com',
  //   };

  //   const res3 = await requester.post('/api/1.0/user/signup').send(user3);

  //   expect(res3.statusCode).to.equal(400);
  // });

  // it('sign up with existed email', async () => {
  //   const user = {
  //     name: users[0].name,
  //     email: users[0].email,
  //     password: 'password',
  //   };

  //   const res = await requester.post('/api/1.0/user/signup').send(user);

  //   expect(res.body.error).to.equal('Email Already Exists');
  // });

  // it('sign up with malicious email', async () => {
  //   const user = {
  //     name: users[0].name,
  //     email: '<script>alert(1)</script>',
  //     password: 'password',
  //   };

  //   const res = await requester.post('/api/1.0/user/signup').send(user);

  //   expect(res.body.error).to.equal('Request Error: Invalid email format');
  // });

  /**
   * Native Sign In
   */

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
    expect(res1.body.error).to.equal({
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
    expect(res2.body.error).to.equal({
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
    expect(res.body.error).to.equal({
      error: {
        code: 32202,
        title: 'native sign in fails',
        message: 'email or password incorrect',
      },
    });
  });

  /**
   * Get User Profile
   */

  // it('get profile with valid access_token', async () => {
  //   const user = {
  //     provider: 'facebook',
  //     access_token: fbTokenSignInFirstTime,
  //   };

  //   const res1 = await requester.post('/api/1.0/user/signin').send(user);

  //   const user1 = res1.body.data.user;

  //   const accessToken = res1.body.data.access_token;
  //   const res2 = await requester.get('/api/1.0/user/profile').set('Authorization', `Bearer ${accessToken}`);

  //   const user2 = res2.body.data;
  //   const expectedUser = {
  //     provider: user1.provider,
  //     name: fbProfileSignInFirstTime.name,
  //     email: fbProfileSignInFirstTime.email,
  //     picture: `https://graph.facebook.com/${fbProfileSignInFirstTime.id}/picture?type=large`,
  //   };

  //   expect(user2).to.deep.equal(expectedUser);
  // });

  // it('get profile without access_token', async () => {
  //   const res = await requester.get('/api/1.0/user/profile');

  //   expect(res.status).to.equal(401);
  // });

  // it('get profile with invalid access_token', async () => {
  //   const res = await requester.get('/api/1.0/user/profile').set('Authorization', 'Bearer wrong_token');

  //   expect(res.status).to.equal(403);
  // });

  after(() => {
    // stub.restore();
  });
});
