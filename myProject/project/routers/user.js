const pool= require('../pool.js');
const express = require('express');
const cookie = require("cookie");
const cookieParser =require("cookie-parser")
/*创建路由器*/
const router = express.Router();
router.use(cookieParser())
/*在路由器下添加路由*/
/*注册路由*/
router.post('/register',(req,res)=>{
    var obj=req.body;
  		var uname=obj.uname;
		var upwd=obj.upwd;
		var sql="INSERT INTO user(uname,upwd) VALUES(?,?)";
		pool.query(sql,[uname,upwd],(err,result)=>{
			if(err) throw err;
			if(result.affectedRows>0){
				res.send({code:200,msg:"注册成功"});
			}else{
				res.send({code:301,msg:"注册失败"});
			}
		});

});

/*判断用户名是否合法*/
router.get('/checkUser',(req,res)=>{
	var uname=req.query.uname;
	var sql="select * from user where uname=?";
		//测试
	
	pool.query(sql,uname,(err,result)=>{
		if(err) throw err;
		if(result.length!=0){
			res.send({code:200,msg:'用户名合法'});
		}else{
			res.send({code:201,msg:'用户名不存在'});
		}
	});

});
/*用户登录路由*/
router.post('/login',(req,res)=>{
   	var obj=req.body; 
	var uname=obj.uname;
	var upwd=obj.upwd;
	var sql="SELECT * FROM user WHERE uname=? and upwd=?";	
	var cookies = cookie.parse(req.header.cookie || "");	
	var name = cookies.name;
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	pool.query(sql,[uname,upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			var str=JSON.stringify(result)
			var user=JSON.parse(str)[0]
			var uname = user.uname;
			var uid = user.uid;
			var data = new Date().getTime();
			res.cookie("uname",uname,{Domain:".127.0.0.1",path:"/"})
			res.cookie("uid",uid,{Domain:".127.0.0.1",path:"/"})
			res.write(JSON.stringify({code:200,msg:"登录成功"}));
			res.end();
		}else{
			res.write(JSON.stringify({code:202,msg:"登录失败,请检查密码"}));
			res.end();
		}
	});

});
/*用户登出*/
router.post("/loginOut",(req,res)=>{
	var uname = req.body.uname;
	var uid = req.body.uid ;
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	if(uname ==" " || uid == " "){
		res.write(JSON.stringify({code:401,msg:"登出失败"}))
		res.end()
	}else{
		res.cookie("uname",uname,{maxAge:0,Domain:".127.0.0.1",path:"/"})
		res.cookie("uid",uid,{maxAge:0,Domain:".127.0.0.1",path:"/"})
		res.write(JSON.stringify({code:200,msg:"登出成功"}))
		res.end()	
	}

})

module.exports= router;