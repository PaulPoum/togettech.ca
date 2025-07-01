// backend/src/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // charge les variables depuis .env

export const sequelize = new Sequelize(
  process.env.DB_NAME,    // nom de la BDD
  process.env.DB_USER,    // utilisateur
  process.env.DB_PASS,    // mot de passe
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,        // passez à console.log pour debug
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
