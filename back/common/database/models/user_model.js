/**
 * @module modules/users/models/user_model
 * @fileoverview This module contains the user model.
 * @project InventoryTracker
 * @license MIT
 */

const { DataTypes } = require('sequelize');
const { Roles } = require('../../roles');

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Roles.USER
    }
    // rootNodes: Array<NodeModel>
    // createdAt: Date
    // updatedAt: Date
};

module.exports = {
    initialize: (sequelize) => {
        this.model = sequelize.define("user", UserModel, { timestamps: true });
    },
};
