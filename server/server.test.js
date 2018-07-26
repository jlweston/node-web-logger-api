var expect = require('expect')
var request = require('supertest')
var { ObjectID } = require('mongodb')

var { app } = require('./server')
var { Log } = require('./models/log')

var logs = [{
  _id: new ObjectID(),
  data: 'My first todo',
  type: 'string'
}, {
  _id: new ObjectID(),
  data: 2,
  type: 'number'
}]

Log.remove({}).then()

beforeEach((done) => {
  Log.remove({}).then(() => {
    return Log.insertMany(logs)
  }).then(() => done())
})

describe('POST /log', () => {
  it('should log a new item', (done) => {
    var data = 'Hi, my name is Jamie'
    request(app)
      .post('/log')
      .send({data})
      .expect(201)
      .expect((res) => {
        expect(res.body.data).toBe(data)
      })
      .end(done())
  })
})