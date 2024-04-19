/**
 * @module routes/users
 * @fileoverview This module contains the routes for the users.
 * @project InventoryTracker
 * @license MIT
 */

const express = require('express');

const router = express.Router();

router.post('/sign-in', (req, res) => {
  res.send('respond with a resource');
});

router.post('/sign-up', (req, res) => {
  res.send('respond with a resource');
});

router.get('/sign-out', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
