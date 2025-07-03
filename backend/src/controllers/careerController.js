// backend/src/controllers/careerController.js
import { Career } from '../models/Career.js';

// GET /api/careers
export const listCareers = async (req, res) => {
  try {
    const careers = await Career.findAll({ order: [['postedAt','DESC']] });
    res.json(careers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /api/careers/:id
export const getCareer = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ error: 'Offre non trouvée' });
    res.json(career);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/careers
export const createCareer = async (req, res) => {
  const { title, description, location, closingDate, duration } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Titre et description requis' });
  }
  try {
    const career = await Career.create({
      title,
      description,
      location: location || null,
      closingDate: closingDate ? new Date(closingDate) : null,
      duration: duration || null,
    });
    res.status(201).json(career);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de créer l’offre' });
  }
};

// PUT /api/careers/:id
export const updateCareer = async (req, res) => {
  const { title, description, location, closingDate, duration } = req.body;
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ error: 'Offre non trouvée' });
    await career.update({
      title:       title       ?? career.title,
      description: description ?? career.description,
      location:    location    ?? career.location,
      closingDate: closingDate !== undefined
        ? (closingDate ? new Date(closingDate) : null)
        : career.closingDate,
      duration:    duration    ?? career.duration,
    });
    res.json(career);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de mettre à jour l’offre' });
  }
};

// DELETE /api/careers/:id
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ error: 'Offre non trouvée' });
    await career.destroy();
    res.json({ message: 'Offre supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de supprimer l’offre' });
  }
};
