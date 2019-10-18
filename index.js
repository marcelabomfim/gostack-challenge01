const express = require('express');

// data
const projects = [];
let requestsCount = 0;

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

const validateBodyParams = expectedParams => (req, res, next) => {
  const { body } = req;
  const missingFields = expectedParams.filter(param => !(param in body));

  if (missingFields.length) {
    return res.status(400).json({
      error: `Missing field${missingFields.length > 1 ? 's' : ''}: ${missingFields.join(', ')}`
    });
  }

  return next();
};

const incrementRequestsCount = (req, res, next) => {
  requestsCount++;
  console.log('Request count:', requestsCount);
  next();
};

app.all('*', incrementRequestsCount);

// routes
app.get('/', (req, res) => {
  return res.send('GoStack Challenge 01!');
});

app.get('/projects', (req, res) => {
  return res.json({ projects });
});

app.post('/projects', validateBodyParams(['id', 'title']), (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json({ projects });
});

app.put('/projects/:id', checkProjectExists, validateBodyParams(['title']),(req, res) => {
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

app.post('/projects/:id/tasks', checkProjectExists, validateBodyParams(['title']), (req, res) => {
  const { projectIndex } = req;
  const { title } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    tasks: [...projects[projectIndex].tasks, title]
  };

  return res.json({ projects });
});

app.listen(3000);
