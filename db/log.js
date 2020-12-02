const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../utils/constant')
let log

log = (req, res, next) => {
    console.log(res.statusCode, req.url, req.body, req.rawHeaders[1], req._startTime, req.method, req.query)
    let code = res.statusCode           //请求状态
    let url = req.url                   //请求url
    let body = req.body                 //POST请求体
    let query = req.query               //GET请求体
    let token = req.rawHeaders[1]       //token
    let startTile = req._startTime      //请求时间
    let method = req.method             //请求方式
    if (method == 'GET') {
        
    } else {
        
    }
    if (req.url.indexOf('login') == -1) {
      jwt.verify(req.rawHeaders[1], PRIVATE_KEY, function (err, data) {
        if (err) console.log(err)
        console.log('解析的数据', data)
      })
    }
    next()
  }

module.exports=log