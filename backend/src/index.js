// backend/src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sequelize } from './config/database.js';
import userRoutes from './routes/users.js';
import newsRoutes from './routes/news.js';
import careerRoutes from './routes/careers.js';
import authRoutes from './routes/auth.js';
import trafficRoutes from './routes/traffic.js';
import applicationRoutes from './routes/applications.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Exposition des images uploadées pour les news
app.use(
  '/uploads/news',
  express.static(path.join(process.cwd(), 'public', 'uploads', 'news'))
);
// CVs et lettres de motivation
app.use(
  '/uploads/applications',
  express.static(path.join(process.cwd(), 'public', 'uploads', 'applications'))
);
// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/traffic', trafficRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ MySQL connecté');

    // **IMPORTANT** : on retire alter:true pour ne plus tenter de recréer sans cesse
    await sequelize.sync();  
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
