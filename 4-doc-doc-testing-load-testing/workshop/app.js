const express = require('express');
const bodyParser = require('body-parser');
const toDoService = require('./services/toDoService');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.get('/todo', async (req, res) => {
  await toDoService.getTasks()
    .then(toDos => res.status(200).send(toDos))
    .catch (err => res.status(400).send(err)) 
});

app.post('/todo', async (req, res) => {
  await toDoService.createTask(req.body)
    .then((savedToDo) => res.status(201).send(savedToDo))
    .catch((err) => res.status(400).send(err));
});

app.patch('/todo/:id', async (req, res) => {
  const { id } = req.params;
  await toDoService.markTaskAsDone(id)
    .then((toDo) => res.status(200).send(toDo))
    .catch((err) => res.status(400).send(err));
});

module.exports = app; 