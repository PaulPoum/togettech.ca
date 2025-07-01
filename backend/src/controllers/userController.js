// backend/src/controllers/userController.js
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

// GET /api/users
export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt'],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt'],
    });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash: hash,
      firstName: firstName || null,
      lastName: lastName || null,
      role: role === 'admin' ? 'admin' : 'user',
      isActive: true,
    });
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }
    res.status(500).json({ error: 'Impossible de créer l\'utilisateur' });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  const { firstName, lastName, role, isActive } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    await user.update({
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      role: role ?? user.role,
      isActive: typeof isActive === 'boolean' ? isActive : user.isActive,
    });
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de mettre à jour l\'utilisateur' });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    // soft delete
    await user.update({ isActive: false });
    res.json({ message: 'Utilisateur désactivé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de supprimer l\'utilisateur' });
  }
};
