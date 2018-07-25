var mongoose = require('mongoose')
var { Schema } = require('mongoose')

var LogSchema = new Schema({
  data: {
  },
  loggedAt: {
    type: Number
  },
  type: {
    required: true,
    type: 'String'
  }
})

var Log = mongoose.model('Log', LogSchema)

module.exports = { Log }