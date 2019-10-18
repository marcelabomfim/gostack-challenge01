const express = require('express');

// data
const projects = [];

// server
const app = express();

// config
app.use(express.json());

// middlewares
const checkProjectExists = (req, res, next) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return res.status(400).json({ error: 'Project does not exists.'});
  }

  req.projectIndex = projectIndex;

  return next();
};

// routes
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

app.put('/projects/:id', checkProjectExists, (req, res) => {
  const { projectIndex } = req;
  const { title } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    title
  };

  return res.json({ projects });
});

app.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { projectIndex } = req;

  projects.splice(projectIndex, 1);

  return res.json({ projects });
});

app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { projectIndex } = req;
  const { title } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    tasks: [...projects[projectIndex].tasks, title]
  };

  return res.json({ projects });
});

app.listen(3000);
