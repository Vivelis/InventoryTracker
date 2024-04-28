/**
 * @fileoverview This module contains the database management functions.
 * @project InventoryTracker
 * @license MIT
 */

const { Sequelize } = require('sequelize');
const UserModel = require('./models/user');
const NodeModel = require('./models/node');

const DATABASE_NAME = process.env.DATABASE_NAME || 'inventory_tracker';
const DATABASE_USER = process.env.DATABASE_USER || 'inventory_tracker';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password';
const DATABASE_HOST = global.__TESTCONTAINERS_POSTGRE_IP__ || process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = global.__TESTCONTAINERS_POSTGRE_PORT_5432__ || process.env.DATABASE_PORT || '5432';
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || 'postgres';
const DO_RESET_DATABASE = process.env.RESET_DATABASE || false;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: DATABASE_DIALECT,
});

async function testConnection() {
  console.log('Checking database connection...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

function defineModels() {
  UserModel.initialize(sequelize);
  NodeModel.initialize(sequelize);
}

function defineModelsRelations() {
  const { user, node } = sequelize.models;

  user.hasMany(node, { as: 'rootNodes' });
  node.belongsTo(user, { as: 'creator' });
}

module.exports = {
  initialize: async () => {
    if (await testConnection() === false) {
      throw new Error('Database connection failed');
    }
    defineModels();
    defineModelsRelations();

    await sequelize.sync({ force: DO_RESET_DATABASE });
    return true;
  },
};
