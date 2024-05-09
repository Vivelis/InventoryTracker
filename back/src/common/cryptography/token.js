/**
 * @fileoverview This module contains the functions for token generation and verification.
 * @project InventoryTracker
 * @license MIT
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { jwtSecret, jwtExpirationInSeconds } = require('../config/token');

const TOKEN_LENGTH = 64;

module.exports = {
  generateAccessToken: (username, userId) => jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    },
  ),

  verifyToken: (token, promise) => jwt.verify(token, jwtSecret, promise),

  generateSessionToken: () => crypto.randomBytes(TOKEN_LENGTH).toString('hex'),
};
