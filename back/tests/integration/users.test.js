/**
 * @fileoverview This module contains the tests for the users api.
 * @project InventoryTracker
 * @license MIT
 */

const supertest = require('supertest');
const app = require('../../app');

const requestWithSupertest = supertest(app);
const username = 'username';
const password = 'password';
const email = 'email@test.com';

describe('User Endpoints', () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('POST /api/v1/users/sign-up should return 200', async () => {
    const response = await requestWithSupertest.post('/api/v1/users/sign-up').send({ 'username': username , 'password': password, 'email' : email})

    console.log("body : " + JSON.stringify(response.body));
    expect(response.statusCode).toBe(200);
  });

  // it('GET /api/v1/users/sign-in should return 200', async () => {
  //   const response = await requestWithSupertest.get('/api/v1/users/sign-in').auth(username, password).set('Accept', 'application/json').send({username: username, password: password});

  //   console.log("body : " + JSON.stringify(response.body));
  //   expect(response.statusCode).toBe(200);
  //   expect(response.type).toBe('application/json');
  // });
});
