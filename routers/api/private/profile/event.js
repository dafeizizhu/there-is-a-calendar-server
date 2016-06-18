var express = require('express')
var router = new express.Router()
var ObjectId = require('mongoose').Types.ObjectId

var Event = require('../../../../models/event')

function getErrorMessage(err) {
  if (err.name == 'ValidationError') {
    return '非法数据'
  }
}

router
  .route('/')
  .post(function (req, res) {
    var _id = ObjectId()
    var title = req.body.title ? req.body.title.trim() : ''
    var location = req.body.location ? req.body.location.trim() : ''
    var begin = req.body.begin ? new Date(Number(req.body.begin)) : ''
    var end = req.body.end ? new Date(Number(req.body.end)) : ''
    var repeat = req.body.repeat ? Boolean(req.body.repeat) : false
    var calendar = req.body.calendar ? req.body.calendar.trim() : ''
    var remark = req.body.remark ? req.body.remark : ''

    Event.create({
      _id: _id,
      title: title,
      location: location,
      begin: begin,
      end: end,
      repeat: repeat,
      calendar: calendar,
      remark: remark
    }).then(function (e) {
      res.send({
        success: true,
        message: '创建成功',
        event: {
          id: e._id,
          title: e.title,
          location: e.location,
          begin: e.begin,
          end: e.end,
          repeat: e.repeat,
          calendar: e.calendar, 
          remark: e.remark
        }
      })
    }).catch(function (err) {
      console.log(err)
      res.send({
        success: false,
        message: getErrorMessage(err) || err
      })
    })
  })

module.exports = router
