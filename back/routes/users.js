/**
 * @module routes/users
 * @fileoverview This module contains the routes for the users.
 * @project InventoryTracker
 * @license MIT
 */

var express = require('express');
var router = express.Router();

router.post('/sign-in', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign-out', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
