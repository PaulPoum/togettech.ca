// backend/src/routes/careers.js
import express from 'express';
import {
  listCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController.js';

const router = express.Router();

router.get('/',       listCareers);
router.get('/:id',    getCareer);
router.post('/',      createCareer);
router.put('/:id',    updateCareer);
router.delete('/:id', deleteCareer);

export default router;
