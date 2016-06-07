var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var CalendarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    default: 'red',
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Calendar', CalendarSchema)
