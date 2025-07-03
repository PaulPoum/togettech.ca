// backend/src/routes/news.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';

const router = express.Router();

// configuration Multer pour uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'uploads', 'news'));
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});
const upload = multer({ storage });

// Routes
router.get('/', listNews);
router.get('/:id', getNews);
router.post('/', upload.single('image'), createNews);
router.put('/:id', upload.single('image'), updateNews);
router.delete('/:id', deleteNews);

export default router;
