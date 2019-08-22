const express = require("express");
const api = express();

api.use(express.json());

const projects = [];
var cont = 0;

// global
api.use((req, res, next) => {
  cont++;
  console.log(`Até o momento ${cont} requisições.`);
  next();
});

//local
function checkProjectExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project NOT FOUND." });
  }
  next();
}

//rotas

api.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    task: []
  };

  projects.push(project);

  return res.json(projects);
});

api.post("/projects/:id/tasks", checkProjectExist, (req, res) => {
  var project = verificarId(req);

  const { title } = req.body;

  project.task.push(title);

  return res.json(projects);
});

api.get("/projects", (req, res) => {
  return res.json(projects);
});

api.put("/projects/:id", checkProjectExist, (req, res) => {
  var project = verificarId(req);

  const { title } = req.body;

  project.title = title;

  return res.json(projects);
});

api.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

// functions
function verificarId(req) {
  const { id } = req.params;
  return (project = projects.find(p => p.id == id));
}

api.listen(3000);
