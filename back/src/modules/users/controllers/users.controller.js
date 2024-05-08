/**
 * @fileoverview Controllers methods for the users routes.
 * @project InventoryTracker
 * @license MIT
 */

const crypt = require('../../../common/cryptography/crypt');
const Sequelize = require('sequelize');

const roles = require('../../../common/config/roles');
const UserModel = require('../../../common/database/models/user');
const SessionModel = require('../../../common/database/models/session');

const MAX_AGE = 3 * 24 * 60 * 60 * 1000;

module.exports = {
  /**
   * Creates a new user and sends back the user and the access token.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} The response object.
   */
  signUp: async (req, res) => {
    const payload = req.body;
    const authHeader = req.headers.authorization;
    let username = null;
    let password = null;

    if (authHeader && !authHeader.startsWith('Basic')) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bad request => invalid auth mechanism',
        },
      });
    }

    if (authHeader) {
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      username = auth[0];
      password = auth[1];
    } else {
      username = payload.username;
      password = payload.password;
    }
    const encryptedPassword = crypt.encryptPassword(password);

    let { role } = payload;

    if (!role) {
      role = roles.USER;
    }

    let user = null;

    try {
      user = await UserModel.createUser(
        Object.assign({ username: username, password: encryptedPassword, role }),
      );
    } catch (error) {
      if (e instanceof Sequelize.UniqueConstraintError) {
        return res.status(409).json({
          status: false,
          error: {
            message: 'Username already exists',
          },
        });
      }

      console.error(`[error] occurred while creating a new user :\n${error}`);
      return res.status(500).json({
        status: false,
        error: {
          message: 'An error occurred while creating the user',
        },
      });
    }

    const session = await SessionModel.createSession(user.id);

    res.setHeader('Authorization', `Bearer ${session.sessionId} ${session.csrfToken}`);
    res.cookie('id', session.sessionId, { httpOnly: true, secure: true, sameSite: true, maxAge: MAX_AGE })
    return res.status(201).json({
      status: true,
        title: 'User Registration Successful',
        detail: 'Successfully registered new user',
        csrfToken: session.csrfToken,
    });
  },

  /**
   * Signs in a user and sends back the user and the access token.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} The response object.
   */
  signIn: async (req, res) => {
    const payload = req.body;
    const authHeader = req.headers.authorization;
    let username = null;
    let password = null;
    let user = null;

    if (authHeader && !authHeader.startsWith('Basic')) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bad request => invalid auth mechanism',
        },
      });
    }

    if (authHeader) {
      const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      username = auth[0];
      password = auth[1];
    } else {
      username = payload.username;
      password = payload.password;
    }

    try {
      user = await UserModel.findUser({ username });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }

    if (user === null) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Username or password invalid, please try again',
        },
      });
    }

    const encryptedPassword = crypt.encryptPassword(password);
    const isPasswordValid = encryptedPassword === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Username or password invalid, please try again',
        },
      });
    }

    const session = await SessionModel.createSession(user.id);

    res.setHeader('Authorization', `Bearer ${session.sessionId} ${session.csrfToken}`);
    res.cookie('id', session.sessionId, { httpOnly: true, secure: true, sameSite: true, maxAge: MAX_AGE })
    return res.status(200).json({
      status: true,
        title: 'User Registration Successful',
        detail: 'Successfully registered new user',
        csrfToken: session.csrfToken,
    });
  },

  /**
   * Signs out the user, invalidating the token.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} The response object.
   */
  signOut: async (req, res) => {
    const session = req.session;

    if (!session) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'User is not authenticated',
        },
      });
    }

    SessionModel.deleteSession(session.sessionId);
    res.clearCookie('id');
    return res.status(200).json({
      status: true,
      message: 'User successfully logged out',
    });
  },

  /**
   * Send the active user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<Response>} The response object.
   */
  getActiveUser: async (req, res) => {

  },
};
