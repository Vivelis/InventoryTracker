/**
 * @fileoverview This file is used to configure jest to use the testcontainers
 * @link [original creator](https://medium.com/trendyol-tech/how-to-test-database-queries-and-more-with-node-js-2f02b08707a7)
 * @project InventoryTracker
 * @license MIT
 */

// eslint-disable-next-line node/no-missing-require
const testContainersPreset = require('@trendyol/jest-testcontainers/jest-preset');

module.exports = Object.assign(testContainersPreset);
