// src/pages/admin/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
//import { Bar } from 'react-chartjs-2';
const Bar = React.lazy(() => import('react-chartjs-2').then(m => ({ default: m.Bar })));

import 'chart.js/auto';

type StatItem = {
  label: string;
  value: number;
  icon: React.ReactNode;
};

type TimeSeries = {
  labels: string[];
  values: number[];
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ users: 0, careers: 0, applications: 0 });
  const [recentUsers, setRecentUsers] = useState<
    Array<{ id: number; email: string; createdAt: string }>
  >([]);
  const [hourly, setHourly] = useState<TimeSeries | null>(null);
  const [daily, setDaily] = useState<TimeSeries | null>(null);
  const [monthly, setMonthly] = useState<TimeSeries | null>(null);
  const [yearly, setYearly] = useState<TimeSeries | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
      headers: { Authorization: `Bearer ${token}` },
    });

    (async () => {
      try {
        // Statistiques util.
        const usersRes = await api.get('/api/users');
        const users = usersRes.data as Array<{ id: number; email: string; createdAt: string }>;
        setStats(s => ({ ...s, users: users.length }));
        setRecentUsers(
          users
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map(u => ({
              id: u.id,
              email: u.email,
              createdAt: new Date(u.createdAt).toLocaleDateString('fr-FR'),
            }))
        );

        const careersRes = await api.get('/api/careers');
        setStats(s => ({ ...s, careers: (careersRes.data as { id: number }[]).length }));

        const appsRes = await api.get('/api/applications');
        setStats(s => ({ ...s, applications: (appsRes.data as { id: number }[]).length }));

        // Trafic site
        const [hr, dy, mo, yr] = await Promise.all([
          api.get<TimeSeries>('/api/traffic/hourly'),
          api.get<TimeSeries>('/api/traffic/daily'),
          api.get<TimeSeries>('/api/traffic/monthly'),
          api.get<TimeSeries>('/api/traffic/yearly'),
        ]);
        setHourly(hr.data);
        setDaily(dy.data);
        setMonthly(mo.data);
        setYearly(yr.data);
      } catch (err) {
        console.error('Erreur chargement dashboard :', err);
      }
    })();
  }, []);

  const statItems: StatItem[] = [
    { label: 'Utilisateurs', value: stats.users, icon: <></> },
    { label: 'Offres Careers', value: stats.careers, icon: <></> },
    { label: 'Candidatures', value: stats.applications, icon: <></> },
  ];

  const makeChart = (ts: TimeSeries | null, title: string) => (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header>{title}</Card.Header>
      <Card.Body style={{ minHeight: 200 }}>
        {!ts ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Bar
            data={{
              labels: ts.labels,
              datasets: [
                {
                  label: title,
                  data: ts.values,
                  backgroundColor: '#00C2FF',
                  borderRadius: 4,
                },
              ],
            }}
          />
        )}
      </Card.Body>
    </Card>
  );

  return (
    <>
      {/* Stat Cards */}
      <Row className="gy-4">
        {statItems.map((s, i) => (
          <Col key={i} xs={12} md={4}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="shadow-sm border-0">
                <Card.Body className="d-flex align-items-center">
                  <div className="me-3 text-info">{s.icon}</div>
                  <div>
                    <h4>
                      {typeof s.value === 'number' ? (
                        s.value
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </h4>
                    <small className="text-muted">{s.label}</small>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Trafic */}
      <Row className="gy-4 mt-4">
        <Col xs={12} md={3}>{makeChart(hourly, 'Visites par heure')}</Col>
        <Col xs={12} md={3}>{makeChart(daily, 'Visites par jour')}</Col>
        <Col xs={12} md={3}>{makeChart(monthly, 'Visites par mois')}</Col>
        <Col xs={12} md={3}>{makeChart(yearly, 'Visites par année')}</Col>
      </Row>

      {/* Derniers utilisateurs */}
      <Row className="gy-4 mt-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header>Derniers utilisateurs</Card.Header>
            <Table hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Inscrit le</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : (
                  recentUsers.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.email}</td>
                      <td>{u.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
