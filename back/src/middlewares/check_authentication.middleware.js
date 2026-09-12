/**
 * @fileoverview This file contains the middleware to check the authentication process.
 * @project InventoryTracker
 * @license MIT
 */

const Session = require('../common/database/models/session');

module.exports = {
  /**
   * Checks if the session is valid.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} The response object.
   */
  checkSession: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let sessionId = null;

    if (authHeader) {
      if (!authHeader.startsWith('Bearer')) {
        return res.status(401).json({
          status: false,
          error: {
            message: 'Bad request => invalid auth mechanism',
          },
        });
      }

      sessionId = authHeader.split(' ')[1];
    } else {
      sessionId = req.cookies.id;
    }

    if (sessionId == null || sessionId == '') {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Bad request => sessionId is missing',
        },
      });
    }

    const session = await Session.getSession(sessionId);

    if (session === null) {
      res.clearCookie('sessionId');
      return res.status(401).json({
        status: false,
        error: {
          message: 'Unauthorized => invalid session',
        },
      });
    }

    req.session = session;
    next();
    return null;
  },

  /**
   * Checks if the CSRF token is valid.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} The response object.
   */
  checkCsrf: async (req, res, next) => {
    const csrfHeader = req.headers['x-csrf-token'];
    const csrfCookie = req.cookies.csrfToken;

    if (csrfHeader == null || csrfCookie == null) {
      const missingField = csrfHeader == null ? 'x-csrf-token' : 'csrfToken';

      return res.status(400).json({
        status: false,
        error: {
          message: `Bad request => ${missingField} is missing`,
        },
      });
    }

    if (csrfHeader !== csrfCookie) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Forbidden => CSRF token mismatch',
        },
      });
    }
    next();
    return null;
  },
};
