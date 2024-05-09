/**
 * @fileoverview This module contains the routes for the users.
 * @project InventoryTracker
 * @license MIT
 */

const express = require('express');

const router = express.Router();

// Middleware Imports
const isAuthenticatedMiddleware = require('../middlewares/check_authentication.middleware');
const SchemaValidationMiddleware = require('../middlewares/schema_validation.middleware');
const CheckPermissionsMiddleware = require('../middlewares/check_permission.middleware');

// Controller Imports
const UsersController = require('../controllers/users.controller');

// JSON Schema Imports for payload verification
const updateUserPayload = require('../schemas/update_user_payload');
const changeRolePayload = require('../schemas/change_role_payload');
const signUpPayload = require('../schemas/sign_up_payload');
const signInPayload = require('../schemas/sign_in_payload');

const { roles } = require('../common/config/roles');

router.get(
  '/',
  [
    isAuthenticatedMiddleware.checkCsrf,
    isAuthenticatedMiddleware.checkSession,
  ],
  UsersController.getActiveUser,
);

router.post(
  '/sign-up',
  [
    SchemaValidationMiddleware.verify(signUpPayload),
  ],
  UsersController.signUp,
);

router.get(
  '/sign-in',
  [
    SchemaValidationMiddleware.verify(signInPayload),
  ],
  UsersController.signIn,
);

router.put(
  '/sign-out',
  [
    isAuthenticatedMiddleware.checkCsrf,
    isAuthenticatedMiddleware.checkSession,
  ],
  UsersController.signOut,
);

module.exports = router;
