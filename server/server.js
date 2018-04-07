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

// middleware
const { authenticate } = require('./middleware/authenticate');

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
    user
      .save()
      .then(() => user.generateAuthToken())
      .then((token) => {
        res.header('x-auth', token).send(user);
      })
      .catch(e => res.status(400).send(e));
  } else {
    res.status(400).send('Invalid user name or password');
  }
});

// GET /user/me
app.get('/users/me', authenticate, (req, res) => res.send(req.user));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
