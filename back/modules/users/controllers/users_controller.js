/**
 * @fileoverview Controllers methods for the users routes.
 * @project InventoryTracker
 * @license MIT
 */

const crypt = require('../../../common/cryptography/crypt');
const jwt = require('../../../common/cryptography/token');

const roles = require('../../../common/config/roles');
const UserModel = require('../../../common/database/models/user');

module.exports = {
  signUp: async (req, res) => {
    const payload = req.body;

    const encryptedPassword = crypt.encryptPassword(payload.password);
    let { role } = payload;

    if (!role) {
      role = roles.USER;
    }

    let user = null;

    try {
      user = await UserModel.createUser(
        Object.assign(payload, { password: encryptedPassword, role }),
      );
    } catch (error) {
      console.error(`[error] occurred while creating a new user :\n${error}`);
      return res.status(500).json({
        status: false,
        error: {
          message: 'An error occurred while creating the user',
        },
      });
    }

    const accessToken = jwt.generateAccessToken(payload.username, user.id);

    return res.status(200).json({
      status: true,
      data: {
        user: user.toJSON(),
        token: accessToken,
      },
    });
  },

  signIn: async (req, res) => {
    const { username, password } = req.body;
    let user = null;

    try {
      user = await UserModel.findUser({ username });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error,
      });
    }
    const encryptedPassword = crypt.encryptPassword(password);

    if (!user || user.password !== encryptedPassword) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Username or password invalid, please try again',
        },
      });
    }

    const accessToken = jwt.generateAccessToken(user.username, user.id);

    return res.status(200).json({
      status: true,
      data: {
        user: user.toJSON(),
        token: accessToken,
      },
    });
  },

  signOut: (req, res) => {

  },

  getActiveUser: (req, res) => {

  },
};
