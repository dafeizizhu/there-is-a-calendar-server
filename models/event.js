var mongoose = require('mongoose')
var objectId = mongoose.Schema.Types.ObjectId

var EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  begin: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  repeat: {
    type: Boolean,
    default: false
  },
  calendar: {
    type: objectId,
    ref: 'Calendar'
  },
  remark: {
    type: String
  }
})

module.exports = mongoose.model('Event', EventSchema)
