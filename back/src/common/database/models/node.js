/**
 * @fileoverview This module contains the node model.
 * @project InventoryTracker
 * @license MIT
 */

const { DataTypes } = require('sequelize');

const NodeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isChecked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // children: Array<NodeModel>
  // parent: NodeModel
  // creator: UserModel
  // createdAt: Date
  // updatedAt: Date
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('node', NodeModel, { timestamps: true });
    this.model.hasMany(this.model, { as: 'children' });
    this.model.belongsTo(this.model, { as: 'parent' });
  },
};
