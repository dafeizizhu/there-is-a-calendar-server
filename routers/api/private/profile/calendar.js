var express = require('express')
var router = new express.Router()
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var log4js = require('log4js')

var User = require('../../../../models/user')
var Calendar = require('../../../../models/calendar')

function getErrorMessage(err) {
  if (err.name == 'ValidationError') {
    return '非法数据'
  } else if (err.name == 'CastError') {
    return '无对应数据'
  } else {
    switch (err.code) {
      case 11000:
        return '名称已存在'
    }
  }
}

var logger = log4js.getLogger('routers/api/private/profile/calendar')

router
  .route('/')
  .post(function (req, res) {
    var name = req.body.name ? req.body.name.trim() : ''
    var color = req.body.color ? req.body.color.trim() : 'red'
    var userId = req.session.user ? req.session.user._id : ''
    var _id = ObjectId()
    Calendar.create({
      _id: _id,
      name: name,
      color: color,
      user: userId
    }).then(function (c) {
      res.send({
        success: true,
        message: '创建成功',
        calendar: {
          id: c._id,
          name: c.name,
          color: c.color,
          user: c.user
        }
      })
    }).catch(function (err) {
      logger.warn('create calendar faild, err: ' + err)
      res.send({
        success: false,
        message: getErrorMessage(err) || err 
      })
    })
  })

router
  .route('/:id')
  .put(function (req, res) {
    Calendar.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      color: req.body.color
    }).then(function (c) {
      if (c) {
        res.send({
          success: true,
          message: '修改成功',
          calendar: {
            id: c._id,
            name: req.body.name,
            color: req.body.color,
            user: c.user
          }
        })
      } else {
        res.send({
          success: false,
          message: '找不到对应数据'
        })
      }
    }).catch(function (err) {
      logger.warn('update calendar faild, err: ' + err)
      res.send({
        success: false,
        message: getErrorMessage(err) || err
      })
    })
  })
  .delete(function (req, res) {
    Calendar.findOneAndRemove({ _id: req.params.id }).then(function (c) {
      res.send({
        success: true,
        message: '删除成功',
        calendar: {
          id: c._id,
          name: c.name,
          color: c.color,
          user: c.user
        }
      })
    }).catch(function (err) {
      logger.warn('remove calendar faild, err: ' + err)
      res.send({
        success: false,
        message: getErrorMessage(err) || err
      })
    })
  })

module.exports = router
