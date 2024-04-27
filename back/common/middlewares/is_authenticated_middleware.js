/**
 * @fileoverview This file contains the middleware to check the authentication process.
 * @project InventoryTracker
 * @license MIT
 */

const jwt = require('../cryptography/token');

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bad request => missing auth headers',
        },
      });
    }

    if (!authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bad request => invalid auth mechanism',
        },
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bad request => bearer token missing in the authorization headers',
        },
      });
    }

    jwt.verifyToken(token, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: 'Bad request => invalid token provided',
        });
      }

      req.user = user;
      next();
    });
  },
};
