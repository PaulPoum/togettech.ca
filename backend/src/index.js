// backend/src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';
import { User } from './models/User.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connecté');
    // Création automatique des tables si inexistant
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés');

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Erreur au démarrage :', err);
    process.exit(1);
  }
};

start();
