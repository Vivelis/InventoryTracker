/**
 * @module users.test.js
 * @fileoverview This module contains the tests for the users api.
 * @project InventoryTracker
 * @license MIT
 */

const app = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

describe("Index Endpoint", () => {
    it("GET / should return 200", async () => {
        const response = await requestWithSupertest.get("/");
        expect(response.statusCode).toBe(200);
    });
});

describe("User Endpoints", () => {
    it("POST /api/v1/users/sign-up should return 200", async () => {
        const response = await requestWithSupertest.post("/api/v1/users/sign-up");
        expect(response.statusCode).toBe(200);
    });
});