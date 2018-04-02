// modules
const expect = require('expect');
const request = require('supertest');

//
const { app } = require('./../server');
const { Todo } = require('./../models/todo');

// purge database before test
beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

// POST tests
describe('POST /todos', () => {
  // testing for post to db
  it('should create a new todo', (done) => {
    const text = 'this is a test string';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create a todo with an empty body', (done) => {
    const text = '';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
