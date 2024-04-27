/**
 * @fileoverview This module contains the user model.
 * @project InventoryTracker
 * @license MIT
 */

const { DataTypes } = require('sequelize');
const { Roles } = require('../../config/roles');

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: Roles.USER,
  },
  // rootNodes: Array<NodeModel>
  // createdAt: Date
  // updatedAt: Date
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('user', UserModel, { timestamps: true, freezeTableName: true });
  },

  createUser: (user) => {
    return this.model.create(user)
  },

  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    })
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    })
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
    })
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query,
    })
  },
};
