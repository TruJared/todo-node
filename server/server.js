// library modules
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// mongoose
const { mongoose } = require('./db/mongoose');

// models
const { Todo } = require('./models/todo');
const { Users } = require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save().then(doc => res.status(200).send(doc), e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => res.status(200).send({ todos }), e => res.status(400).send(e));
});

// GET /todos/${_id}

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  // is ID valid?
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('bad ID');
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
