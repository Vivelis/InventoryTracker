/**
 * @fileoverview This file contains the encryption functions.
 * @project InventoryTracker
 * @license MIT
 */

const crypto = require('crypto');

module.exports = {

  /**
     * Encrypts the password using SHA256 Algorithm.
     * @param {string} password - The password to be encrypted.
     * @returns {string} - The encrypted password.
     */
  encryptPassword: (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  },
};
