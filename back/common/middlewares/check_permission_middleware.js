/**
 * @fileoverview This file contains the middleware to check the user's role.
 * @project InventoryTracker
 * @license MIT
 */

const UserModel = require('../database/models/user');

module.exports = {
  has: (role) => (req, res, next) => {
    const {
      user: { userId },
    } = req;

    UserModel.findUser({ id: userId }).then((user) => {
      // IF user does not exist in our database, means something is fishy
      // THEN we will return forbidden error and ask user to login again
      if (!user) {
        return res.status(403).json({
          status: false,
          error: 'Invalid user. Please login again',
        });
      }

      const userRole = user.role;

      // IF user does not possess the required role
      // THEN return forbidden error
      if (userRole !== role) {
        return res.status(403).json({
          status: false,
          error: `You need to be a ${role} to access this endpoint`,
        });
      }

      next();
    });
  },
};
