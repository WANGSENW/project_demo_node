const express = require('express')
const router = express.Router()
const querySql = require('../../db/index')
const jwt = require('jsonwebtoken')
const {PWD_SALT,PRIVATE_KEY,EXPIRESD} = require('../../utils/constant')


router.post('/register', async (req,res,next) => {
    const { username, password } = req.body
    try {
        let sql = 'select * from app_user where 1=1'
        if (username && password) {
            sql += ` and username='${username}'`
            let user = await querySql(sql)
            if (user.length < 1) {
                res.send({ msg:'该账号不存在',code:200,data:user }) 
            }
            sql += ` and password='${password}'`
            let result = await querySql(sql)
            if (result.length >= 1) {
                let token = jwt.sign({username},PRIVATE_KEY,{expiresIn:EXPIRESD})
                res.send({ msg: '登录成功', code: 200, data: result, token })
            } else {
                res.send({ msg:'登录失败',code:200,data:'请检查账号和密码是否正确' })
            }
        } else {
            res.send({msg:'登录失败',code:5011,data:e})
        }
        next()
    } catch (e) {
        next(e)
        res.send({msg:'登录失败',code:501,data:e})
    }
})

module.exports=router