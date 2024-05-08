/**
 * @fileoverview This module contains the roles that can be assigned to a user.
 * @project InventoryTracker
 * @license MIT
 */

/**
 * Roles that can be assigned to a user.
 * @typedef {Object} Roles
 * @property {string} ADMIN - The admin role.
 * @property {string} USER - The user role.
 */

module.exports = {
  /**
   * Roles that can be assigned to a user.
   * @type {Roles}
   */
  Roles: {
    ADMIN: 'admin',
    USER: 'user',
  },
};
