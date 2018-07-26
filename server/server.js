var env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/LoggerApp' 
} else if (env === 'test') {
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/LoggerAppTEST'
}
  
console.log(env)

var express = require('express')
var bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Log } = require('./models/log')

const port = process.env.PORT || 3000

var app = express()
app.use(bodyParser.json())

app.post('/log', (req,res) => {  
  var data = req.body.data
  var type = typeof req.body.data
  var loggedAt = new Date().getTime()

  var log = new Log({
    data,
    type,
    loggedAt
  })

  log.save().then((doc) => {
    res.status(201).send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/log', (req,res) => { 
  Log.find().sort({ loggedAt: 'desc' }).limit(100).then((logs) => {
  
    console.log(typeof logs)

    let newObj = Object.keys(logs).reduce(function(previous, current) {
      console.log(logs[current])
      var c = logs[current]
      previous[current] = {
        data: c.data,
        type: c.type,
        loggedAt: new Date(c.loggedAt).toUTCString()
      };
      return previous;
    }, {});
    res.send(newObj)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.listen(port, () => {})

module.exports = {
  app
}