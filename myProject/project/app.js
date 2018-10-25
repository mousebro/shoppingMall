/*构建服务器*/
const express= require("express");
const bodyParse= require("body-parser");
const cookieParse = require("cookie-parser");
const user= require('./routers/user.js');
const product = require("./routers/product.js");
const app=new express();
app.listen(3000,()=>{
	console.log("listening 3000 port");
});
app.use(cookieParse())
/*托管静态资源*/
app.use(express.static('../public'));
app.use(bodyParse.urlencoded({
	extended:false
}));

/*路由器挂载*/
app.use('/user',user);
app.use('/product',product);

