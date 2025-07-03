// backend/src/routes/traffic.js
import express from 'express';
import {
  getHourly,
  getDaily,
  getWeekly,
  getMonthly,
  getYearly
} from '../controllers/trafficController.js';

const router = express.Router();

router.get('/hourly', getHourly);
router.get('/daily', getDaily);
router.get('/weekly', getWeekly);
router.get('/monthly', getMonthly);
router.get('/yearly', getYearly);

export default router;
