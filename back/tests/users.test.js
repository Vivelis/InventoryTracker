/**
 * @module users.test.js
 * @fileoverview This module contains the tests for the users api.
 * @project InventoryTracker
 * @license MIT
 */

const supertest = require('supertest');
const app = require('../app');

const requestWithSupertest = supertest(app);

describe('Index Endpoint', () => {
  it('GET / should return 200', async () => {
    const response = await requestWithSupertest.get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('User Endpoints', () => {
  beforeAll(() => {
    const redisConnectionURI = `redis://${global.__TESTCONTAINERS_REDIS_IP__}:${global.__TESTCONTAINERS_REDIS_PORT_6379__}`;
    redisClient = redis.createClient(redisConnectionURI);

    // if you have declared multiple containers, they will be available to access as well. e.g.
    // `global.__TESTCONTAINERS_${CONFIG_KEY}_IP__`
    // `global.__TESTCONTAINERS_${CONFIG_KEY}_PORT_${CONFIG_PORT}__`
  });

  afterAll(() => {
    redisClient.quit();
  });

  it('POST /api/v1/users/sign-up should return 200', async () => {
    const response = await requestWithSupertest.post('/api/v1/users/sign-up');
    expect(response.statusCode).toBe(200);
  });
});
