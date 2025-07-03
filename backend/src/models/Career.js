// backend/src/models/Career.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Career = sequelize.define('Career', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  postedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'posted_at',
  },
  closingDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'closing_date',
    comment: 'Date limite pour postuler',
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Durée du contrat (ex. "6 mois", "CDD 12 mois")',
  },
}, {
  tableName: 'careers',
  underscored: true,
  timestamps: false,
});
