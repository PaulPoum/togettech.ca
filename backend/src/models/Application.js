import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  careerId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: 'careers', key: 'id' },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { isEmail: true },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cvPath: {
    type: DataTypes.STRING(255),  // chemin relatif du CV uploadé
    allowNull: false,
  },
  letterPath: {
    type: DataTypes.STRING(255),  // chemin relatif de la lettre uploadée
    allowNull: false,
  },
}, {
  tableName: 'applications',
  timestamps: true,
  underscored: true,
});
