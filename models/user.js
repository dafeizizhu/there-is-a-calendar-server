var mongoose = require('mongoose')
var uuid = require('node-uuid')
var normalizr = require('normalizr')
var normalize = normalizr.normalize
var Schema = normalizr.Schema
var arrayOf = normalizr.arrayOf

var Calendar = require('./calendar')
var Event = require('./event')

var userSchema = new Schema('users')
var calendarSchema = new Schema('calendars')
var eventSchema = new Schema('events')

userSchema.define({
  calendars: arrayOf(calendarSchema)
})

calendarSchema.define({
  events: arrayOf(eventSchema)
})

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.static('findOneWithDetail', function (id) {
  var _user, _calendars, _events

  return this.findOne({
    _id: id
  }).then(function (user) {
    _user = user
    if (user) {
      return Calendar.find({ user: user._id })
    } else {
      return new Promise(function (resolve, reject) {
        reject(new Error('该用户不存在'))
      })
    }
  }).then(function (calendars) {
    _calendars = calendars
    return Event.find({
      calendar: {
        $in: _calendars.map(function (c) { return c._id })
      }
    })
  }).then(function (events) {
    _events = events
    return new Promise(function (resolve) {
      resolve({
        id: _user._id,
        name: _user.name,
        calendars: _calendars.map(function (c) {
          return {
            id: c._id,
            name: c.name,
            color: c.color,
            events: _events.filter(function (e) {
              return e.calendar == c._id.toString()
            }).map(function (e) {
              return {
                id: e._id,
                title: e.title,
                location: e.location,
                begin: e.begin.valueOf(),
                end: e.end.valueOf(),
                remark: e.remark,
                repeat: e.repeat
              }
            })
          }
        })
      })
    })
  }).then(function (user) {
    return new Promise(function (resolve) {
      resolve(normalize(user, userSchema))
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
