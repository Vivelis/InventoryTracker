/**
 * @module routes/index
 * @fileoverview This module contains the routes for the index page.
 * @project InventoryTracker
 * @license MIT
 */

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
