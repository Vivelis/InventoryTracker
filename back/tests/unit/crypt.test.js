/**
 * @fileoverview This file contains the unit tests for the crypt module.
 * @project InventoryTracker
 * @license MIT
 */

const crypt = require('../../src/common/cryptography/crypt');

describe('Crypt', () => {
  it('should encrypt a password', () => {
    const encryptedPassword = crypt.encryptPassword('password');
    expect(encryptedPassword).toBeDefined();
  });
});
