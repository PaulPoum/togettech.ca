// backend/src/models/News.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'news',
  timestamps: true,
  underscored: true,
});
