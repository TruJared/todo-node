const mongoose = require('mongoose');

// make mongoose use global Promises
mongoose.Promise = global.Promise;
// connect
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };
