// backend/src/controllers/newsController.js
import { News } from '../models/News.js';
import fs from 'fs/promises';
import path from 'path';

// GET /api/news
export const listNews = async (req, res) => {
  try {
    const all = await News.findAll({
      order: [['date', 'DESC']],
      attributes: ['id','title','excerpt','content','date','imagePath'],
    });
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /api/news/:id
export const getNews = async (req, res) => {
  try {
    const item = await News.findByPk(req.params.id, {
      attributes: ['id','title','excerpt','content','date','imagePath'],
    });
    if (!item) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/news
export const createNews = async (req, res) => {
  try {
    const { title, excerpt, content, date } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/news/${req.file.filename}`;
    }
    const news = await News.create({
      title,
      excerpt,
      content,
      date,
      imagePath,
    });
    res.status(201).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de créer l’actualité' });
  }
};

// PUT /api/news/:id
export const updateNews = async (req, res) => {
  try {
    const { title, excerpt, content, date } = req.body;
    const item = await News.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Article non trouvé' });

    // remplacer l’image si nouvelle fournie
    if (req.file) {
      if (item.imagePath) {
        const oldPath = path.join(process.cwd(), 'public', item.imagePath);
        await fs.unlink(oldPath).catch(() => {});
      }
      item.imagePath = `/uploads/news/${req.file.filename}`;
    }

    await item.update({
      title,
      excerpt,
      content,
      date,
    });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de mettre à jour l’actualité' });
  }
};

// DELETE /api/news/:id
export const deleteNews = async (req, res) => {
  try {
    const item = await News.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Article non trouvé' });

    // supprimer fichier si existant
    if (item.imagePath) {
      const imgPath = path.join(process.cwd(), 'public', item.imagePath);
      await fs.unlink(imgPath).catch(() => {});
    }
    await item.destroy();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de supprimer l’actualité' });
  }
};
