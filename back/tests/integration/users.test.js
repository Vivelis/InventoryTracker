/**
 * @module users.test.js
 * @fileoverview This module contains the tests for the users api.
 * @project InventoryTracker
 * @license MIT
 */

const supertest = require('supertest');
const app = require('../../app');

const requestWithSupertest = supertest(app);

describe('User Endpoints', () => {
  beforeAll(async () => {
    console.log("container ip : " + global.__TESTCONTAINERS_POSTGRE_IP__);
    console.log("container port : " + global.__TESTCONTAINERS_POSTGRE_PORT_5432__);
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('POST /api/v1/users/sign-up should return 200', async () => {
    const response = await requestWithSupertest.post('/api/v1/users/sign-up');
    expect(response.statusCode).toBe(200);
  });
});
