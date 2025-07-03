import { Application } from '../models/Application.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// configuration multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'public', 'uploads', 'applications');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});
export const upload = multer({ storage });

export const createApplication = async (req, res) => {
  try {
    const { careerId, name, email, message } = req.body;
    if (!req.files?.cv?.length || !req.files?.letter?.length) {
      return res.status(400).json({ error: 'CV et lettre requis' });
    }
    const cvPath = `/uploads/applications/${req.files.cv[0].filename}`;
    const letterPath = `/uploads/applications/${req.files.letter[0].filename}`;

    const app = await Application.create({ careerId, name, email, message, cvPath, letterPath });
    res.status(201).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de soumettre la candidature' });
  }
};

export const listApplications = async (req, res) => {
  try {
    const apps = await Application.findAll({ order: [['created_at', 'DESC']] });
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
