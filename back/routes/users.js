/**
 * @fileoverview This module contains the routes for the users.
 * @project InventoryTracker
 * @license MIT
 */

const express = require('express');

const router = express.Router();

// Middleware Imports
const isAuthenticatedMiddleware = require('../common/middlewares/is_authenticated_middleware');
const SchemaValidationMiddleware = require('../common/middlewares/schema_validation_middleware');
const CheckPermissionsMiddleware = require('../common/middlewares/check_permission_middleware');

// Controller Imports
const UsersController = require('../modules/users/controllers/users_controller');

// JSON Schema Imports for payload verification
const updateUserPayload = require('../modules/users/schemas/update_user_payload');
const changeRolePayload = require('../modules/users/schemas/change_role_payload');
const signUpPayload = require('../modules/users/schemas/sign_up_payload');
const signInPayload = require('../modules/users/schemas/sign_in_payload');

const { roles } = require('../common/config/roles');

router.get(
  '/',
  [isAuthenticatedMiddleware.check],
  UsersController.getActiveUser,
);

router.post(
  '/sign-up',
  [
    SchemaValidationMiddleware.verify(signUpPayload),
    UsersController.signUp,
  ],
);

router.post(
  '/sign-in',
  [
    SchemaValidationMiddleware.verify(signInPayload),
    UsersController.signIn,
  ],
);

// router.get(
//   '/sign-out'
//     [
//       UsersController.signOut
//     ],
// );

module.exports = router;
