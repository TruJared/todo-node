const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDo', (err, db) => {
  if (err) {
    return console.log(` ${err} unable to connect to server`);
  }
  console.log('Connected to server');

  // delete many
  db
    .collection('Users')
    .deleteMany({ name: 'Jared' })
    .then(result => console.log(result));

  // // delete one
  // db
  //   .collection('Todos')
  //   .deleteOne({ text: 'eat breakfast' })
  //   .then(result => console.log(result));

  // find one and delete
  db
    .collection('Users')
    .findOneAndDelete({ _id: new ObjectID('5ac00d11f3471b58b3f5b0f3') })
    .then(result => console.log(result));

  // db.close();
});
