/**
 * @fileoverview This module contains the functions for token generation and verification.
 * @project InventoryTracker
 * @license MIT
 */

const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpirationInSeconds } = require('../config/token');

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
};
