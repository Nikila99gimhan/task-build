const request = require('supertest');
const app = require('../src/index');

describe('Task API', () => {
  describe('GET /health', () => {
    it('should return ok status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /tasks', () => {
    it('should return an empty array initially', async () => {
      const res = await request(app).get('/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({ title: 'Test Task', description: 'A test task' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test Task');
      expect(res.body.id).toBeDefined();
      expect(res.body.completed).toBe(false);
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({ description: 'No title here' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title is required');
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update an existing task', async () => {
      const created = await request(app)
        .post('/tasks')
        .send({ title: 'Update Me' });

      const res = await request(app)
        .put(`/tasks/${created.body.id}`)
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app)
        .put('/tasks/nonexistent-id')
        .send({ completed: true });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete an existing task', async () => {
      const created = await request(app)
        .post('/tasks')
        .send({ title: 'Delete Me' });

      const res = await request(app).delete(`/tasks/${created.body.id}`);
      expect(res.status).toBe(204);
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app).delete('/tasks/nonexistent-id');
      expect(res.status).toBe(404);
    });
  });
});
