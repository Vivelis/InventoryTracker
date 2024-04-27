/**
 * @fileoverview Middleware to validate incoming request body against the schema
 * provided as argument.
 * @link [ajv module](https://ajv.js.org/)
 * @project InventoryTracker
 * @license MIT
 */

const Ajv = require('ajv');

const AJV_OPTS = { allErrors: true };

module.exports = {
  /**
     * Compiles the schema provided in argument and validates the data for the
     * compiled schema, and returns errors if any
     * @param {Object} schema - AJV Schema to validate against
     * @returns {Function} - Express request handler
     */
  verify: (schema) => {
    if (!schema) {
      throw new Error('Schema not provided');
    }

    return (req, res, next) => {
      const { body } = req;
      const ajv = new Ajv(AJV_OPTS);
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) {
        return next();
      }

      return res.status(400).send({
        status: false,
        error: {
          message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
        },
      });
    };
  },
};
