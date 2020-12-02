var express = require('express');
var router = express.Router();
const querySql = require('../db/index')

/* 查询接口 get */
router.get('/list', async (req, res, next)=> {
  const { pageSize, pageNo, shop_name } = req.query
  try {
    let sql = `select * from employee where 1=1`
    if (shop_name) {
      sql+=` and shop_name LIKE '%${shop_name}%'`
    }
    sql += ` limit ${pageNo},${pageSize}`
    let response = await querySql(sql)
    res.send({ msg: "查询成功", code: 200, data: response })
  } catch (e) {
    next(e)
    res.send({msg:"查询失败",code:501,data:response})
  }
})

/* 查询接口 post */
router.post('/listPost', async(req, res, next)=> {
  console.log(req.body)
  const { pageSize, pageNo, shop_name } = req.body
  try {
    let sql = `select * from employee where 1=1`
    if (shop_name) {
      sql+=` and shop_name LIKE '%${shop_name}%'`
    }
    sql += ` limit ${pageNo},${pageSize}`
    let response = await querySql(sql)
    res.send({ msg: "查询成功", code: 200, data: response })
  }catch(e){
    next(e)
    res.send({msg:"查询失败",code:501,data:response})
  }
})

module.exports = router;
