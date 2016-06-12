var express = require('express')
var router = new express.Router()
var md5 = require('md5')

var User = require('../../models/user')
var Calendar = require('../../models/calendar')
var Event = require('../../models/event')

var normalizr = require('normalizr')
var normalize = normalizr.normalize
var Schema = normalizr.Schema
var arrayOf = normalizr.arrayOf

var userSchema = new Schema('users')
var calendarSchema = new Schema('calendars')
var eventSchema = new Schema('events')

userSchema.define({
  calendars: arrayOf(calendarSchema)
})

calendarSchema.define({
  events: arrayOf(eventSchema)
})

router
  .route('/')
  .post(function (req, res) {
    var _user
    var _calendars
    if (req.session.user) {
      res.send({
        success: false,
        message: '已经登入了'
      })
    } else {
      User.findOne({
        name: req.body.name, 
        password: md5(req.body.password)
      }).then(function (user) {
        if (user) {
          _user = user
          return Calendar.find({ user: user._id })
        } else {
          throw new Error('用户名或者密码不符')
        }
      }).then(function (calendars) {
        _calendars = calendars
        return Event.find({
          calendar: {
            $in: _calendars.map(function (calendar) { return calendar._id })
          }
        })
      }).then(function (events) {
        return new Promise(function (resolve) {
          resolve({
            id: _user._id,
            name: _user.name,
            calendars: _calendars.map(function (c) {
              return {
                id: c._id,
                name: c.name,
                color: c.color,
                events: events.filter(function (e) { 
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
      }).then(function (user) {
        req.session.user = _user
        res.send({
          success: true,
          message: '登入成功',
          user: user
        })
      }).catch(function (err) {
        res.send({
          success: false,
          message: String(err)
        })
      })
    }
  })

module.exports = router
