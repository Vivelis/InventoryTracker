/**
 * @fileoverview This is a configuration file for the json web tokens.
 * @project InventoryTracker
 * @license MIT
 */

/**
 * Configuration object for JSON Web Tokens.
 * @typedef {Object} WebTokenConfig
 * @property {string} jwtSecret - The secret key used to sign the JWTs.
 * @property {number} jwtExpirationInSeconds - The expiration time for the JWTs in seconds.
 */

/**
 * JSON Web Token configuration.
 * @type {WebTokenConfig}
 */
module.exports = {
  jwtSecret: '!!CryptoCat@!!',
  jwtExpirationInSeconds: 60 * 60, // 1 hour
};
