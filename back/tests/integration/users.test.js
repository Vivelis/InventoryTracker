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
    const maxTries = 10;

    for (let tryNbr = 0; !isServerReady && tryNbr < maxTries; tryNbr += 1) {
      try {
        await new Promise((resolve) => setTimeout(() => resolve(), 50));
        const response = await requestWithSupertest.get('/is-server-ready');
        isServerReady = response.body.isServerReady;
      } catch (error) {
        isServerReady = false;
      }
    }
    if (!isServerReady) {
      throw new Error('Server is not ready');
    }
  });

  afterAll(async () => {
    // avoid jest open handle error
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });

  it('POST /api/v1/users/sign-up valid', async () => {
    const response = await requestWithSupertest
      .post('/api/v1/users/sign-up')
      .send({ username, password, email });

    expect(response.statusCode).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('csrfToken');
    expect(response.headers['set-cookie'][0]).toMatch(/id=/);
  });

  it('GET /api/v1/users/sign-in valid', async () => {
    const response = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('csrfToken');
    expect(response.headers['set-cookie'][0]).toMatch(/id=/);
  });

  it('PUT /api/v1/users/sign-out valid', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const sessionId = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sessionId}`)
      .set('Cookie', [`id=${sessionId}`, `csrfToken=${csrfToken}`])
      .set('x-csrf-token', csrfToken);

    expect(signOutResponse.statusCode).toBe(200);
    expect(signOutResponse.headers['set-cookie'][0]).toMatch(/id=/);
  });

  it('POST /api/v1/users/sign-up invalid (no username)', async () => {
    const response = await requestWithSupertest
      .post('/api/v1/users/sign-up')
      .send({ password });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('error');
  });

  it('POST /api/v1/users/sign-up invalid (no password)', async () => {
    const response = await requestWithSupertest
      .post('/api/v1/users/sign-up')
      .send({ username });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('error');
  });

  it('POST /api/v1/users/sign-in invalid (no username)', async () => {
    const response = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth('', password)
      .set('Accept', 'application/json')
      .send({ password });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('error');
  });

  it('POST /api/v1/users/sign-in invalid (no password)', async () => {
    const response = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, '')
      .set('Accept', 'application/json')
      .send({ username });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('error');
  });

  it('PUT /api/v1/users/sign-out invalid (no csrfToken cookie)', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const sessionId = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sessionId}`)
      .set('Cookie', [`id=${sessionId}`])
      .set('x-csrf-token', csrfToken);

    expect(signOutResponse.statusCode).toBe(400);
    expect(signOutResponse.type).toBe('application/json');
    expect(signOutResponse.body).toHaveProperty('error');
  });

  it('PUT /api/v1/users/sign-out invalid (no x-csrf-token header)', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const sessionId = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sessionId}`)
      .set('Cookie', [`id=${sessionId}`, `csrfToken=${csrfToken}`]);

    expect(signOutResponse.statusCode).toBe(400);
    expect(signOutResponse.type).toBe('application/json');
    expect(signOutResponse.body).toHaveProperty('error');
  });

  it('PUT /api/v1/users/sign-out invalid (no sessionId)', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Cookie', [`csrfToken=${csrfToken}`])
      .set('x-csrf-token', csrfToken);

    expect(signOutResponse.statusCode).toBe(400);
    expect(signOutResponse.type).toBe('application/json');
    expect(signOutResponse.body).toHaveProperty('error');
  });

  it('PUT /api/v1/users/sign-out invalid (invalid sessionId)', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const sessionId = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer invalid')
      .set('Cookie', ['id=invalid', `csrfToken=${csrfToken}`])
      .set('x-csrf-token', csrfToken);

    expect(signOutResponse.statusCode).toBe(401);
    expect(signOutResponse.type).toBe('application/json');
    expect(signOutResponse.body).toHaveProperty('error');
  });

  it('PUT /api/v1/users/sign-out invalid (invalid csrfToken cookie)', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const sessionId = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sessionId}`)
      .set('Cookie', [`id=${sessionId}`, 'csrfToken=invalid'])
      .set('x-csrf-token', csrfToken);

    expect(signOutResponse.statusCode).toBe(401);
    expect(signOutResponse.type).toBe('application/json');
    expect(signOutResponse.body).toHaveProperty('error');
  });

  it('PUT /api/v1/users/sign-out invalid (invalid csrfToken header)', async () => {
    const signInResponse = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, password)
      .set('Accept', 'application/json')
      .send({ username, password });

    expect(signInResponse.statusCode).toBe(200);

    const { csrfToken } = signInResponse.body;
    const sessionId = signInResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const signOutResponse = await requestWithSupertest
      .put('/api/v1/users/sign-out')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sessionId}`)
      .set('Cookie', [`id=${sessionId}`, `csrfToken=${csrfToken}`])
      .set('x-csrf-token', 'invalid');

    expect(signOutResponse.statusCode).toBe(401);
    expect(signOutResponse.type).toBe('application/json');
    expect(signOutResponse.body).toHaveProperty('error');
  });

  it('POST /api/v1/users/sign-in invalid username', async () => {
    const response = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth('invalid', password)
      .set('Accept', 'application/json')
      .send({
        username: 'invalid',
        password,
      });

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('error');
  });

  it('POST /api/v1/users/sign-in invalid password', async () => {
    const response = await requestWithSupertest
      .get('/api/v1/users/sign-in')
      .auth(username, 'invalid')
      .set('Accept', 'application/json')
      .send({
        username,
        password: 'invalid',
      });

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('error');
  });
});
