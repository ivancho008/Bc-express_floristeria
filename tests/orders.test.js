const request = require('supertest');
const app = require('../server');

describe('Orders API', () => {
  test('GET /api/orders returns 200 and array', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('CRUD lifecycle: POST -> GET by id -> PUT -> DELETE', async () => {
    const newOrder = {
      customerName: 'Test Customer',
      bouquetId: 1,
      deliveryDate: '2025-12-01',
      status: 'Pending',
      address: 'Test Address 123',
      phone: '3001112222',
      paymentMethod: 'Cash',
      note: 'No note'
    };

    const postRes = await request(app).post('/api/orders').send(newOrder);
    expect(postRes.statusCode).toBe(201);
    const createdId = postRes.body.id;

    // Get by id
    const getRes = await request(app).get(`/api/orders/${createdId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.id).toBe(createdId);

    // Update
    const updated = { ...newOrder, status: 'Delivered' };
    const putRes = await request(app).put(`/api/orders/${createdId}`).send(updated);
    expect(putRes.statusCode).toBe(200);
    expect(putRes.body.status).toBe('Delivered');

    // Delete
    const delRes = await request(app).delete(`/api/orders/${createdId}`);
    expect(delRes.statusCode).toBe(200);

    // Confirm deletion
    const getAfterDelete = await request(app).get(`/api/orders/${createdId}`);
    expect(getAfterDelete.statusCode).toBe(404);
  });

  test('POST /api/orders validation returns 400 when missing fields', async () => {
    const invalid = { customerName: 'Incomplete' };
    const res = await request(app).post('/api/orders').send(invalid);
    expect(res.statusCode).toBe(400);
  });
});
