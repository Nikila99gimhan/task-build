const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(express.static('public'));

let tasks = [];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  const sorted = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  res.json(sorted);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const task = {
    id: uuidv4(),
    title,
    description: description || '',
    priority: ['high', 'medium', 'low'].includes(priority) ? priority : 'medium',
    dueDate: dueDate || null,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks[index] = { ...tasks[index], ...req.body, id: tasks[index].id };
  res.json(tasks[index]);
});

app.patch('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const { completed } = req.body;
  if (typeof completed === 'boolean') {
    tasks[index].completed = completed;
    tasks[index].completedAt = completed ? new Date().toISOString() : null;
  }
  res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task API running on port ${PORT}`);
  });
}

module.exports = app;
