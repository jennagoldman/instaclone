require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jenna@test.com',
        password: 'testPass'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'jenna@test.com',
          __v: 0
        });
      });
  });
});
