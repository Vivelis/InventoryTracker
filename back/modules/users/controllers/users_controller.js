/**
 * @fileoverview Controllers methods for the users routes.
 * @project InventoryTracker
 * @license MIT
 */

const crypt = require('../../../common/cryptography/crypt');
const jwt = require('../../../common/cryptography/token');

const UserModel = require('../../../common/database/models/user');
const { get } = require('../../../routes');

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
      return res.status(500).json({
        status: false,
        error,
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

  signIn: (req, res) => {

  },

  signOut: (req, res) => {

  },

  getActiveUser: (req, res) => {

  },
};
