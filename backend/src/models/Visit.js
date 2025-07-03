// backend/src/models/Visit.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Visit = sequelize.define('Visit', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'visits',
  timestamps: false,
  underscored: true,
});
