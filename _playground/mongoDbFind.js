const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDo', (err, db) => {
  if (err) {
    return console.log(` ${err} unable to connect to server`);
  }
  console.log('Connected to server');
  // db
  //   .collection('Todos')
  //   .find({
  //     _id: new ObjectID('5ac010970826e75316086bf3'),
  //   })
  //   .toArray()
  //   .then(
  //     (docs) => {
  //       console.log('Todos');
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     (err) => {
  //       console.log(`could not get data ${err}`);
  //     },
  //   );

  // db
  //   .collection('Todos')
  //   .find()
  //   .count()
  //   .then(
  //     (count) => {
  //       console.log(`Todos count: ${count}`);
  //     },
  //     (err) => {
  //       console.log(`could not get data ${err}`);
  //     },
  //   );

  db
    .collection('Users')
    .find({ name: 'Jared' })
    .toArray()
    .then(
      (docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
      },
      (err) => {
        console.log(`could not get data ${err}`);
      },
    );

  // db.close();
});
