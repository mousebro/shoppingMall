const pool = require('../pool.js');
const express = require('express');
const router = express.Router();
/*加载商品列表*/
router.get('/getProduct',(req,res)=>{
    var req =req.query;
    var pbrand = req.key;
    var sql = "SELECT * FROM product WHERE pbrand=?";
    pool.query(sql,pbrand,(err,result)=>{
       if(err) throw err;
   
       if(result.length){
           res.writeHead(200,{
               "Content-Type":"application/json;charset=utf-8",
               "Access-Control-Allow-Origin":"*"
           })
           res.write(JSON.stringify(result));
           res.end();
       }
    });
});
//加载用户购物车商品
router.get("/checkout",(req,res)=>{
    var qObj = req.query;
    var uid = qObj.uid;
    var sql = `SELECT * FROM product INNER JOIN shoppingcart ON prid = pid WHERE uid = ?`;
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result))
        res.end()
    })
})

//更新用户购物车中的商品
router.get("/updateCart",(req,res)=>{
    var cid = req.query.cid;
    var pcount = req.query.pcount;
    res.writeHead(200,{
        "Content-Type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
    })
    if(pcount>0){
        var sql1 = `UPDATE shoppingcart SET pcount=? WHERE cid=?`
        data = [pcount,cid]
    }else{
        var sql1 = `DELETE FROM shoppingcart WHERE cid=?`
        data = cid
    }
    pool.query(sql1,data,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.write(JSON.stringify({code:200,msg:"修改成功"}))
            res.end()
        }
    })
})
router.get("/addToCart",(req,res)=>{
    var pcount =parseInt( req.query.pcount);
    var prid = req.query.prid;
    var uid = req.query.uid
    res.writeHead(200,{
        "Content-Type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
    })
    var sql = `SELECT * FROM shoppingcart WHERE prid =? AND uid =?`;
    pool.query(sql,[prid,uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var result1 = JSON.stringify(result)
            result1 = JSON.parse(result1);
            pcount=parseInt(result1[0].pcount)+pcount
            var sql1 = `UPDATE shoppingcart SET pcount=? WHERE uid=? AND prid=?`;
            pool.query(sql1,[pcount,uid,prid],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.write(JSON.stringify({code:200,msg:"添加修改成功"}))
                    res.end()
                }
            })
        }else{

            var sql1 = `INSERT INTO shoppingcart VALUES(null,?,?,?)`
            pool.query(sql1,[uid,prid,pcount],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.write(JSON.stringify({code:200,msg:"添加成功"}))
                    res.end()
                }
            })
        }
    })
})
router.get("/search",(req,res)=>{
    var kywords = req.query.kwords;
    var pno = req.query.pno;
    var arr=kywords.split(" ");
    for(var i in arr){
        arr[i]="title like '%"+arr[i]+"%'"
   }
   var str = arr.join(" AND ")
   var sql = `select * from product where ${str}`
    res.writeHead(200,{
        "Content-Type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Origin" : "*"
    })
    pool.query(sql,str,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var length=result.length;
            result=result.slice(9*(pno-1),9*pno)
            //res.write(JSON.stringify({code:3,msg:"成功"}))
            res.write(JSON.stringify(
                {
                    code:200,
                    msg:"成功搜索到商品",
                    length:length,
                    result:result
                }
            ))
            res.end()
        }else{
            res.write(JSON.stringify({code:201,msg:"没有找到任何商品"}))
            res.end()
        }
    })

})
module.exports = router;