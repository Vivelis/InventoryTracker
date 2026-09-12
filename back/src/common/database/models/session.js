/**
 * @fileoverview Session model allows to store user sessions in the database.
 * @project InventoryTracker
 * @licence MIT
 */

const { DataTypes } = require('sequelize');
const token = require('../../cryptography/token');

const SessionModel = {
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  csrfToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  // userId: UserModel
  // createdAt: Date
  // updatedAt: Date
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('session', SessionModel, { timestamps: true });
  },

  createSession: async (userId) => {
    const sessionId = token.generateSessionToken();
    const csrfToken = token.generateSessionToken();

    return this.model.create({ sessionId, csrfToken, userId });
  },

  getSession: async (sessionId) => this.model.findOne({ where: { sessionId } }),

  deleteSession: async (sessionId) => this.model.destroy({ where: { sessionId } }),

  deleteUserSessions: async (userId) => this.model.destroy({ where: { userId } }),
};
