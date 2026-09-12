/**
 * @fileoverview This file contains the schema definition for the sign in payload.
 * @project InventoryTracker
 * @license MIT
 */

module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: [
    'username',
    'password',
  ],
  additionalProperties: false,
};
