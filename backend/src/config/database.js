// backend/src/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_URL || 
  `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);
