import request from 'supertest';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();

app.get('/api/test', (req, res) => {
  res.status(200).send('Hello from server');
});

app.get('/api/error', (req, res, next) => {
  next(new Error('Test Error'));
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

describe('Express Server Tests', () => {
  it('should respond with "Hello from server" for /api/test route', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from server');
  });

  it('should handle server errors gracefully', async () => {
    const response = await request(app).get('/api/error');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Test Error');
  });

  it('should handle non-existing routes with 404', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
  });
});
