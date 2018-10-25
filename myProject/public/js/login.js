$(function(){
	
var register_login=document.getElementsByClassName("login_register_contain")[0];
var login_register_contain=document.getElementsByClassName("login_register_contain")[0];
var login_cancel_btn=getId("login_cancel_btn");
var callback_msg_contain=document.getElementsByClassName("callback_msg_contain")[0];
var modal_footer=document.getElementsByClassName("modal_footer")[0];
var login_user_show = document.getElementById("login_user_show");
document.getElementById("login_btn").onclick=function(){
		login_register_contain.style.display="block";
}		 
login_cancel_btn.onclick=function(){
	showLogin()
}
function showLogin(){
 	login_register_contain.style.display="none";	
	 getId("contain_for_L").style.display="block";
	modal_footer.style.display="block";
	callback_msg_contain.style.display="none";		
}
var login_btn = document.querySelector("[data-toggle='login']")
login_btn.onclick = function(){
	var login_register_contain = document.getElementsByClassName("login_register_contain")[0];
	login_register_contain.style.display = "block";
	getId("contain_for_L").style.display="block";
	modal_footer.style.display="block";
	callback_msg_contain.style.display="none";	
}		
/*用户注册*/
	var register_btn = document.getElementById("register_btn");
	var reg =/\s/
/*判断密码是否为空*/
	getId("regist_password").onblur=function(){ 	
		if(getId("regist_password").value==""  || reg.test(getId("regist_password").value)){
			getId("regist_password_remind").innerHTML="密码不能为空";
			getId("regist_password_remind").style.display="block";			
			getId("regist_password_remind").style.color='red';
		}else{
			getId("regist_password_remind").innerHTML="密码合法";
			getId("regist_password_remind").style.display="block";			
			getId("regist_password_remind").style.color='green';
		}
	}
/*判断两次密码是否一致*/
	getId("rigist_password_again").onblur=function(){
		if(getId("regist_password").value==""){
			getId("regist_password_remind_again").innerHTML="前后密码不一致";
			getId("regist_password_remind_again").style.display="block";			
			getId("regist_password_remind_again").style.color='red';
		}else if(getId("rigist_password_again").value==getId("regist_password").value){
			getId("regist_password_remind_again").innerHTML="密码合法";
			getId("regist_password_remind_again").style.display="block";			
			getId("regist_password_remind_again").style.color='green';
			register_btn.disabled=false;
			register_btn.style.background="#FDA30E";
		}else{
			getId("regist_password_remind_again").innerHTML="前后密码不一致";
			getId("regist_password_remind_again").style.display="block";			
			getId("regist_password_remind_again").style.color='red';
			register_btn.disabled=true;
			getId("register_btn").style.background="#7B7B7B";
		}
	}

	getId("register_btn").onclick=()=>{
		getId("register_btn").style.background="#7B7B7B";			
		checkUsername("regist_user_name",'regist_username_remind');
		if(getId("regist_username_remind").innerHTML=="用户名已被占用"){
			return;
		}			
		var regist_user_name=document.getElementById("regist_user_name").value;
		var regist_password = document.getElementById("regist_password").value;
		var rigist_password_again=document.getElementById("rigist_password_again").value;
		var logoin_model_contain=document.getElementsByClassName("logoin_model_contain")[0];
		var callback_msg_contain=document.getElementsByClassName("callback_msg_contain")[0];
		var modal_footer=document.getElementsByClassName("modal_footer")[0]
		var xhr=null;			
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}else{
			xhr= new ActiveXObj("Micsoft.XMLHttp");
		}
		xhr.onreadystatechange=()=>{
			if(xhr.readyState==4 && xhr.status==200){
				var result=JSON.parse(xhr.responseText);
				if(result.code==200){
					getId("contain_for_L").style.display="none";
					modal_footer.style.display="none";
					callback_msg_contain.style.display="block";
					callback_msg_contain.innerHTML="<h1 class='callback_msg'>注册成功<h1>";
					setTimeout(function(){
						var login_register_contain = document.getElementsByClassName("login_register_contain")[0];
						login_register_contain.style.display = "none";
						getId("contain_for_L").style.display="block";
						modal_footer.style.display="block";
						callback_msg_contain.style.display="none";
					},3000)									

				}
				
			}
		}
		var req = "uname="+regist_user_name+"&upwd="+regist_password;
		xhr.open("post",'/user/register',true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(req);

	}
/*登录判断用户名是否存在*/
	var login_user_name=getId("login_user_name");
	getId("login_user_name").onblur=function(){					
		checkUsername("login_user_name",'login_username_remind');
				
	}
/*注册判断用户名是否存在*/
	getId("regist_user_name").onblur=function(){			
		checkUsername("regist_user_name",'regist_username_remind');
		
	}
	function checkUsername(uname,remind,result){	
		var login_username=getId(uname).value;
		if(login_username==""){
			getId(remind).innerHTML="用户名不能为空";
			getId(remind).style.color="red"
			getId(remind).style.display="block"				
		}else{
			var xhr=null;
			xhr=getXhr(); 
			xhr.onreadystatechange=()=>{
				if(xhr.readyState==4 && xhr.status==200){
						result=JSON.parse(xhr.responseText);						 						
					if(result.code==200 && uname=="login_user_name"){
						getId(remind).innerHTML=result.msg;			//登录用户名判断
						getId(remind).style.display="block";
						getId(remind).style.color='green';	
					}else if(result.code==200 && uname=="regist_user_name"){
						getId(remind).innerHTML="用户名已被占用";			//注册用户名判断
						getId(remind).style.display="block";
						getId(remind).style.color='red';				
					}else if(result.code==201 && uname=="regist_user_name"){
						getId(remind).innerHTML="用户名合法";
						getId(remind).style.display="block";			//注册用户名判断
						getId(remind).style.color='green';	
					}else if(result.code==201 && uname=="login_user_name"){
						getId(remind).innerHTML=result.msg;			//登录用户名判断
						getId(remind).style.display="block";
						getId(remind).style.color='red';
					}
					
				}
			}
			
			xhr.open('get','/user/checkUser?uname='+login_username,true);
			xhr.send(null);
		}			
		
	}
/*判断用户是否登录*/
	function checkLogin(){
		var login_user_show =document.getElementById("login_user_show");
		if(document.cookie=="") return;
		var CookiesA ={}
		document.cookie.split(";").forEach(function(Cookies){
			var parts =Cookies.split("=");
			CookiesA[ parts[0].trim() ]=(parts[1] || "").trim();
		})
		var login_user_show = document.getElementById("login_user_show");		
		login_user_show.innerHTML = `你好！${CookiesA.uname}<span id="login_out_span">&nbsp;&nbsp;注销<span>`
		var loginOutBtn = document.getElementById("login_out_span");
		loginOutBtn.onclick = function(){
			ajax({
				type:"POST",
				url:"/user/loginOut",
				data:{
					"uname":CookiesA.uname,
					"uid":CookiesA.uid
				},
				success: function(res) {
					login_user_show.innerHTML = `请<span data-toggle="login">&nbsp;&nbsp;登录<span>`
					var login_btn = document.querySelector("[data-toggle='login']")
					login_btn.onclick = function(){
						var login_register_contain = document.getElementsByClassName("login_register_contain")[0];
						login_register_contain.style.display = "block";
						getId("contain_for_L").style.display="block";
						modal_footer.style.display="block";
						callback_msg_contain.style.display="none";
							
					}
					location.reload();
				}
			})
		}
	}
	checkLogin()
/*用户登录*/
	getId("login_password").onblur=function(){
		getId("login_password").value
		if(getId("login_username_remind").innerHTML=="用户名不存在" ||getId("login_user_name").value==""){		
			return;
		}else if(getId("login_password").value==""){
			getId("login_password_remind").style.display="block";
			getId("login_password_remind").innerHTML="密码不能为空";
			getId("login_password_remind").style.color="red";
		}else if(getId("login_username_remind").innerHTML=="用户名合法"){
			getId("login_btn_a").disabled=false;
			getId("login_btn_a").style.background="#FDA30E";
		}else if(getId("login_password").value!=""){
			getId("login_password_remind").style.display="none";
		}	
	}
	getId("login_btn_a").onclick=function(e){
		e.stopPropagation();
		
			if(getId("login_username_remind").innerHTML=="用户名已被占用" || getId("login_user_name").value=="" || getId("login_password").value==""){	
				getId("login_btn_a").disabled=true;
				getId("login_btn_a").style.background="#7B7B7B";	
				return;
			}
			var xhr=null;
			var uname=getId("login_user_name").value;
			var upwd=getId("login_password").value;
			xhr=getXhr(); 
			xhr.onreadystatechange=()=>{
						if(xhr.readyState==4 && xhr.status==200){
							var result=JSON.parse(xhr.responseText);
							if(result.code==200 || result.code==202){
								var callback_msg_contain=document.getElementsByClassName("callback_msg_contain")[0];
								var modal_footer=document.getElementsByClassName("modal_footer")[0];
								getId("contain_for_L").style.display="none";
								modal_footer.style.display="none";
								callback_msg_contain.style.display="block";
								callback_msg_contain.innerHTML="<h1 class='callback_msg'>"+result.msg+"<h1>";		
								
								var CookiesA ={}
								document.cookie.split(";").forEach(function(Cookies){
									var parts =Cookies.split("=");
									CookiesA[ parts[0].trim() ]=(parts[1] || "").trim();
								})
								var login_user_show = document.getElementById("login_user_show");		
								login_user_show.innerHTML = `你好！${CookiesA.uname}<span data-toggle="singnoutBtn">&nbsp;&nbsp;注销<span>`
								var loginOutBtn = document.querySelector("[data-toggle='singnoutBtn']");
								location.reload();
								loginOutBtn.onclick = function(){
									ajax({
										type:"POST",
										url:"/user/loginOut",
										data:{
											"uname":CookiesA.uname,
											"uid":CookiesA.uid
										},
										success: function(res) {
											login_user_show.innerHTML = `请<span data-toggle="login">&nbsp;&nbsp;登录<span>`
											var login_btn = document.querySelector("[data-toggle='login']")
											login_btn.onclick = function(){
												var login_register_contain = document.getElementsByClassName("login_register_contain")[0];
												login_register_contain.style.display = "block";
												getId("contain_for_L").style.display="block";
												modal_footer.style.display="block";
												callback_msg_contain.style.display="none";
												location.reload();
											}
										}
									})
								}
								setTimeout(function(){
									var login_register_contain = document.getElementsByClassName("login_register_contain")[0];
									login_register_contain.style.display = "none";
									getId("contain_for_L").style.display="block";
									modal_footer.style.display="block";
									callback_msg_contain.style.display="none";
								},3000)	
							}
							
						}
					}
			var req = "uname="+uname+"&upwd="+upwd;
			xhr.open("post",'/user/login',true);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(req);	
		
		
}
//用户登出

/*点击购物车时跳转到购物车页面*/	
 var cartBox = document.getElementById("cart_box");
 cartBox.onclick=function(){
	 console.log("fdsjklfjdsl")
	 window.open("http://127.0.0.1:3000/checkout.html","_self");
	 
 }
})