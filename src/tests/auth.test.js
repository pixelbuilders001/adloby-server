import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test('health endpoint works', async () => {
  const res = await request(app).get('/api/v1/health');
  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
});

test('user can register', async () => {
  const res = await request(app).post('/api/v1/auth/register').send({
    name: 'Brijesh',
    email: 'brijesh@example.com',
    password: 'Password@123',
  });
  expect(res.statusCode).toBe(201);
  expect(res.body.data.tokens.accessToken).toBeDefined();
});
