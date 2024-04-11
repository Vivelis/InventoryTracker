/**
 * @module common/database_management
 * @fileoverview This module contains the database management functions.
 * @project InventoryTracker
 * @license MIT
 */

const { Sequelize } = require('sequelize');
const UserModel = require('./models/user_model');
const NodeModel = require('./models/node_model');

const DATABASE_NAME = process.env.DATABASE_NAME || 'database';
const DATABASE_USER = process.env.DATABASE_USER || 'user';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.DATABASE_PORT || '5432';
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || 'postgres';
const DO_RESET_DATABASE = process.env.RESET_DATABASE || false;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: DATABASE_DIALECT
});

function testConnection() {
    console.log(`Checking database connection...`);
    try {
        sequelize.authenticate();
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

    user.hasMany(node, { as: "rootNodes" })
    node.belongsTo(user, { as: "creator" });
}

module.exports = {
    initialize: () => {
        if (testConnection() == false)
            return false;
        defineModels();
        defineModelsRelations();

        sequelize.sync({ force: DO_RESET_DATABASE });
        return true;
    }
};
