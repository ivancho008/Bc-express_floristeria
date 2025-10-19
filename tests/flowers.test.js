const request = require('supertest');
const app = require('../server');

describe('Flowers API', () => {
  test('GET /api/flowers returns 200 and array', async () => {
    const res = await request(app).get('/api/flowers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('CRUD lifecycle: POST -> GET by id -> PUT -> DELETE', async () => {
    // Create
    const newFlower = {
      name: 'Test Flower X',
      color: 'Blue',
      price: 9.99,
      seasonality: 'All year',
      stock: 10,
      origin: 'Test Dept',
      fragrance: 'Mild',
      supplier: 'Test Supplier'
    };

    const postRes = await request(app).post('/api/flowers').send(newFlower);
    expect(postRes.statusCode).toBe(201);
    expect(postRes.body).toMatchObject({ name: newFlower.name, color: newFlower.color });
    const createdId = postRes.body.id;

    // Get by id
    const getRes = await request(app).get(`/api/flowers/${createdId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.id).toBe(createdId);

    // Update
    const updated = { ...newFlower, color: 'Magenta' };
    const putRes = await request(app).put(`/api/flowers/${createdId}`).send(updated);
    expect(putRes.statusCode).toBe(200);
    expect(putRes.body.color).toBe('Magenta');

    // Delete
    const delRes = await request(app).delete(`/api/flowers/${createdId}`);
    expect(delRes.statusCode).toBe(200);
    expect(delRes.body).toHaveProperty('id', createdId);

    // Confirm deletion
    const getAfterDelete = await request(app).get(`/api/flowers/${createdId}`);
    expect(getAfterDelete.statusCode).toBe(404);
  });

  test('POST /api/flowers validation returns 400 when missing fields', async () => {
    const invalid = { name: 'Incomplete' }; // missing required fields
    const res = await request(app).post('/api/flowers').send(invalid);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});
