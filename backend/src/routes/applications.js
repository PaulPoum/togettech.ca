import express from 'express';
import { createApplication, listApplications, upload } from '../controllers/applicationController.js';

const router = express.Router();

// multi-upload fields : 'cv' et 'letter'
router.post(
  '/',
  upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'letter', maxCount: 1 }]),
  createApplication
);

// GET /api/applications
router.get('/', listApplications);

export default router;
