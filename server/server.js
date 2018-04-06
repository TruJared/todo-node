const env = process.env.NODE_ENV || 'development';
console.log(`Current Env >>> ${env} <<<`);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

// library modules
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// mongoose
const { mongoose } = require('./db/mongoose');

// models
const { Todo } = require('./models/todo');
const { Users } = require('./models/users');

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
