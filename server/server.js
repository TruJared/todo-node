require('./config/config.js');

// library modules
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// mongoose
const { mongoose } = require('./db/mongoose');

// models
const { Todo } = require('./models/todo');
const { User } = require('./models/users');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save().then(doc => res.status(200).send(doc), e => res.status(400).send(e));
});

// GET /todos
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

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('bad ID');
  }

  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('bad ID');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => res.status(400).send(e));
});

// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  if (user.email && user.password) {
    return user.save().then(user =>
      res
        .status(200)
        .send(user)
        .catch((e) => {
          res.status(400).send(e);
        }));
  }
  res.send('invalid user name or password');
});

// GET /user
app.get('/users', (req, res) => {
  User.find().then(user => res.status(200).send({ user }), e => res.status(400).send(e));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
