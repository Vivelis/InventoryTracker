/**
 * @fileoverview This module contains the tests for the users api.
 * @project InventoryTracker
 * @license MIT
 */

const supertest = require('supertest');
const app = require('../../app');

const requestWithSupertest = supertest(app);
const username = 'usernameValue';
const password = 'passwordValue';
const email = 'email@test.com';

describe('User Endpoints', () => {
  beforeAll(async () => {
    // wait server to be ready
    let isServerReady = false;

    while (!isServerReady) {
      try {
        await new Promise((resolve) => setTimeout(() => resolve(), 50));
        const response = await requestWithSupertest.get('/is-server-ready');
        isServerReady = response.body.isServerReady;
      } catch (error) {
        console.log('Server not ready yet');
      }
    }
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('POST /api/v1/users/sign-up should return 200', async () => {
    const response = await requestWithSupertest.post('/api/v1/users/sign-up').send({ 'username': username , 'password': password, 'email' : email})

    console.log("body : " + JSON.stringify(response.body));
    expect(response.statusCode).toBe(200);
  });

  it('GET /api/v1/users/sign-in should return 200', async () => {
    const response = await requestWithSupertest.get('/api/v1/users/sign-in').auth(username, password).set('Accept', 'application/json').send({username: username, password: password});

    console.log("body : " + JSON.stringify(response.body));
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
  });
});
