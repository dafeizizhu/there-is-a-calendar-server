var express = require('express')
var router = new express.Router()
var md5 = require('md5')

var User = require('../../models/user')
var Calendar = require('../../models/calendar')
var Event = require('../../models/event')

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
          req.session.user = _user = user
          return Calendar.find({ user: user._id })
        } else {
          res.send({
            success: false,
            message: '用户名或者密码不符'
          })
        }
      }).then(function (calendars) {
        _calendars = calendars
        return Event.find({
          calendar: {
            $in: _calendars.map(function (calendar) { return calendar._id })
          }
        })
      }).then(function (events) {
        res.send({
          success: true,
          message: '登入成功',
          user: {
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
          }
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
