// everything starts here

const mongoose = require('mongoose');

// make mongoose use global Promises
mongoose.Promise = global.Promise;
// connect
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create database model
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
});

const Users = mongoose.model('Users', {
  user: {
    type: String,
    require: true,
    minlength: 1,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true,
  },
});
// samples

// const newUser = new Users({
//   user: 'Jared',
//   email: 'Jared@me.me',
// });

// newUser.save().then(
//   (res) => {
//     console.log(`Success ${res}`);
//   },
//   (e) => {
//     console.log(`Oh shit >>> ${e}`);
//   },
// );

// const newTodo = new Todo({
//   text: 'cook dinner',
// });

// newTodo
//   .save()
//   .then(() => console.log('saved item'), e => console.log(`${e} >>> unable to save todo`));

// const newTodoTwo = new Todo({
//   text: 'clean cat poop',
//   completed: true,
//   completedAt: 835,
// });

// newTodoTwo
//   .save()
//   .then(
//     () => console.log(`saved item ${newTodoTwo}`),
//     e => console.log(`${e} >>> unable to save ${newTodoTwo}`),
//   );
