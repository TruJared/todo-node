const mongoose = require('mongoose');

// make mongoose use global Promises
mongoose.Promise = global.Promise;
// connect
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };
