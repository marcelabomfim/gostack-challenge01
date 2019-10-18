const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

app.get('/', (req, res) => {
  return res.send('GoStack Challenge 01!');
});

app.get('/projects', (req, res) => {
  return res.json({ projects });
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json({ projects });
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  projects[projectIndex] = {
    ...projects[projectIndex],
    title
  };

  return res.json({ projects });
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  projects.splice(projectIndex, 1);

  return res.json({ projects });
});

app.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  projects[projectIndex] = {
    ...projects[projectIndex],
    tasks: [...projects[projectIndex].tasks, title]
  };

  return res.json({ projects });
});

app.listen(3000);
