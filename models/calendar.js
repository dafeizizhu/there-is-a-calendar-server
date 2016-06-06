var mongoose = require('mongoose')
var objectId = mongoose.Schema.Types.ObjectId

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
  }
})

module.exports = mongoose.model('Calendar', CalendarSchema)
