// backend/src/controllers/trafficController.js
import { Op, fn, col, literal, Sequelize } from 'sequelize';
import { Visit } from '../models/Visit.js';

// Helper: renvoyer 0 pour les buckets vides
const fillBuckets = (labels, rows, labelKey, valueKey) => {
  const map = Object.fromEntries(rows.map(r => [r[labelKey], Number(r[valueKey])]));
  return labels.map(l => map[l] || 0);
};

export const getHourly = async (req, res) => {
  const today = new Date();
  const start = new Date(today.setHours(0,0,0,0));
  const rows = await Visit.findAll({
    attributes: [
      [fn('HOUR', col('timestamp')), 'hour'],
      [fn('COUNT', '*'), 'count']
    ],
    where: { timestamp: { [Op.gte]: start } },
    group: ['hour'],
    raw: true
  });
  const labels = Array.from({length:24}, (_,i)=>i);
  return res.json(fillBuckets(labels, rows, 'hour', 'count'));
};

export const getDaily = async (req, res) => {
  // par défaut 7 derniers jours
  const days = Number(req.query.days) || 7;
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (days-1));
  start.setHours(0,0,0,0);
  const rows = await Visit.findAll({
    attributes: [
      [fn('DATE', col('timestamp')), 'date'],
      [fn('COUNT', '*'), 'count']
    ],
    where: { timestamp: { [Op.between]: [start, end] } },
    group: ['date'],
    order: [[literal('date'),'ASC']],
    raw: true
  });
  // génère labels YYYY-MM-DD
  const labels = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
    labels.push(d.toISOString().slice(0,10));
  }
  return res.json(fillBuckets(labels, rows, 'date', 'count'));
};

export const getWeekly = async (req, res) => {
  //  the last 12 weeks
  const weeks = Number(req.query.weeks) || 12;
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (weeks*7 - 1));
  const rows = await Visit.findAll({
    attributes: [
      [fn('YEARWEEK', col('timestamp')), 'week'],
      [fn('COUNT', '*'), 'count']
    ],
    where: { timestamp: { [Op.between]: [start, end] } },
    group: ['week'],
    order: [[literal('week'),'ASC']],
    raw: true
  });
  // labels sous forme "YYYY-WW"
  const labels = [];
  const tmp = new Date(start);
  for (let i=0; i<weeks; i++) {
    const y = tmp.getFullYear();
    const w = String(Math.ceil((((tmp - new Date(y,0,1))/86400000)+ new Date(y,0,1).getDay()+1)/7)).padStart(2,'0');
    labels.push(`${y}${w}`);
    tmp.setDate(tmp.getDate()+7);
  }
  return res.json(fillBuckets(labels, rows, 'week', 'count'));
};

export const getMonthly = async (req, res) => {
  // 12 derniers mois
  const months = Number(req.query.months) || 12;
  const end = new Date();
  const rows = await Visit.findAll({
    attributes: [
      [fn('DATE_FORMAT', col('timestamp'), literal("'%Y-%m'")), 'month'],
      [fn('COUNT', '*'), 'count']
    ],
    where: {
      timestamp: {
        [Op.between]: [
          new Date(end.getFullYear(), end.getMonth() - (months-1), 1),
          end
        ]
      }
    },
    group: ['month'],
    order: [[literal('month'),'ASC']],
    raw: true
  });
  // génère labels YYYY-MM
  const labels = [];
  const tmp = new Date(end.getFullYear(), end.getMonth()-(months-1), 1);
  for (let i=0; i<months; i++) {
    labels.push(`${tmp.getFullYear()}-${String(tmp.getMonth()+1).padStart(2,'0')}`);
    tmp.setMonth(tmp.getMonth()+1);
  }
  return res.json(fillBuckets(labels, rows, 'month', 'count'));
};

export const getYearly = async (_req, res) => {
  // 5 dernières années
  const years = 5;
  const end = new Date();
  const rows = await Visit.findAll({
    attributes: [
      [fn('YEAR', col('timestamp')), 'year'],
      [fn('COUNT', '*'), 'count']
    ],
    where: {
      timestamp: {
        [Op.between]: [
          new Date(end.getFullYear()-(years-1),0,1),
          end
        ]
      }
    },
    group: ['year'],
    order: [[literal('year'),'ASC']],
    raw: true
  });
  const labels = [];
  for (let y = end.getFullYear()-(years-1); y<=end.getFullYear(); y++) {
    labels.push(String(y));
  }
  return res.json(fillBuckets(labels, rows, 'year', 'count'));
};
