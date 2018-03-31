const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDo', (err, db) => {
  if (err) {
    return console.log(` ${err} unable to connect to server`);
  }
  console.log('Connected to server');

  // db.collection('Todos').insertOne(
  //   {
  //     text: 'something to do',
  //     completed: false,
  //   },
  //   (err, res) => {
  //     if (err) {
  //       return console.log(`Unable to insert todo ${err}`);
  //     }
  //     console.log(JSON.stringify(res.ops, undefined, 2));
  //   }
  // );

  // db.collection('Users').insertOne(
  //   {
  //     name: 'Jared',
  //     age: 40,
  //     location: 15931,
  //   },
  //   (err, res) => {
  //     if (err) {
  //       return console.log(`Unable to insert user ${err}`);
  //     }
  //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
  //   },
  // );

  db.close();
});
