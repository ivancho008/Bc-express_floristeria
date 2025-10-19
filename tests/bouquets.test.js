const request = require('supertest');
const app = require('../server');

describe('Bouquets API', () => {
  test('GET /api/bouquets returns 200 and array', async () => {
    const res = await request(app).get('/api/bouquets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('CRUD lifecycle: POST -> GET by id -> PUT -> DELETE', async () => {
    // Create bouquet
    const newBouquet = {
      name: 'Test Bouquet X',
      description: 'Test description',
      price: 30.5,
      flowerIds: [1,2],
      occasion: 'Test',
      wrapping: 'Brown paper',
      designer: 'Test Designer'
    };

    const postRes = await request(app).post('/api/bouquets').send(newBouquet);
    expect(postRes.statusCode).toBe(201);
    const createdId = postRes.body.id;

    // Get by id
    const getRes = await request(app).get(`/api/bouquets/${createdId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.id).toBe(createdId);

    // Update
    const updated = { ...newBouquet, price: 35.0 };
    const putRes = await request(app).put(`/api/bouquets/${createdId}`).send(updated);
    expect(putRes.statusCode).toBe(200);
    expect(putRes.body.price).toBe(35.0);

    // Delete
    const delRes = await request(app).delete(`/api/bouquets/${createdId}`);
    expect(delRes.statusCode).toBe(200);

    // Confirm deletion
    const getAfterDelete = await request(app).get(`/api/bouquets/${createdId}`);
    expect(getAfterDelete.statusCode).toBe(404);
  });

  test('POST /api/bouquets validation returns 400 when missing fields', async () => {
    const invalid = { name: 'Incomplete' };
    const res = await request(app).post('/api/bouquets').send(invalid);
    expect(res.statusCode).toBe(400);
  });
});
