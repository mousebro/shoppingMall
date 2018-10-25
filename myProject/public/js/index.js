function getClass(classname){
	return document.getElementsByClassName(classname);
}
function changeStyle(elem,itemname){
	var product_ease=getClass("product_ease")[0];
	var Div=product_ease.children;
	var Li=product_ease_list.getElementsByTagName("li");
	for(var i in Li){
		Li[i].className="";
	}
	for(var j=1;j<Div.length;j++ ){
		Div[j].style.display="none";
	}
	elem.className="item_active";
	itemname.style.display="block";
	
}
/*产品列表加载*/
function getProductList(target,key){
	ajax({
		type:"get",
		url:"/product/getProduct",
		data:{
			key:key
		},
		success:function(response){
			var latest_designs_product = document.querySelector(
				"div.product_ease>div."+target
			);
			latest_designs_product.innerHTML="";
			for(var i in response){
				var originalPrice = response[i].originalPrice;
				var price = response[i].price;
				var imgUrl ="images/"+ response[i].imgUrl;
				var Html = `<div class="latest_designs_product">
				<div class="product_tag">新品</div>
				<!--<div class="quick_view">详情</div>-->
				<div class="product_image_contain">
					<a class="wrap_container" href="single.html?prid=${response[i].pid}" >详情</a>
					<img src="${imgUrl}" alt=""/>
				</div>
				<div class="designs_product_detail">
					<a href="simgle.html" class="product_name">黑色T-hirt</a>
					<div class="product_price">
						<span>&yen;${price}</span>&nbsp;
						<del>&yen;${originalPrice}</del>
					</div>
					<a href="single.html" class="itemBtn">购买</a>
				</div>
			</div>`

			latest_designs_product.innerHTML +=Html;
			
			}
		}
	});
}
window.onload=function(){
	var timer=null;
	var product_ease_list=document.getElementById("product_ease_list");
	var special_offer =document.getElementById("special_offer");
	var product_collection= document.getElementById("product_collection");
	var latest_product=document.getElementById("latest_product");
	var latest_designs_contain=getClass("latest_designs_contain")[0];
	var special_offer_contain=getClass("special_offer_contain")[0];
	var collections_contain=getClass("collections_contain")[0];
	getProductList("latest_designs_contain","lastest");
	latest_product.onclick=function(){
		changeStyle(latest_product,latest_designs_contain);
	};
	product_collection.onclick=function(){
		changeStyle(product_collection,collections_contain);
		getProductList("collections_contain","collection");		
	};
	special_offer.onclick=function(){
		changeStyle(special_offer,special_offer_contain);
		getProductList("special_offer_contain","special");
		
	}
	
//轮播图
	var img = document.getElementsByClassName("banner_img");
	var banner_container=document.getElementsByClassName("banner_container")[0];
	var num = 40000;//负数求模不好操作，所以给个大数字吧
	var banner_timer=null;
	function setImg() {
        //求模的方法能让num始终在0-3之间循环
        var numA = num % 4;
        var numB = (num + 1) % 4;
        var numC = (num + 2) % 4;
        var numD = (num + 3) % 4;
        img[numA].style.width = 800+ "px";
        img[numA].style.height = 480 + "px";
        img[numA].style.backgroundColor = "#808080";
        img[numA].style.zIndex = 4;
        img[numA].style.left = 150 + "px";
        img[numA].style.top = 0;
        img[numA].style.opacity = 1;

        img[numB].style.width = 468 + "px";
        img[numB].style.height = 312 + "px";
        img[numB].style.backgroundColor = "#666666";
        img[numB].style.zIndex = 1;
        img[numB].style.left = 0;
        img[numB].style.top = 44 + "px";
        img[numB].style.opacity = 0.6;

        img[numC].style.width = 351 + "px";
        img[numC].style.height = 234 + "px";
        img[numC].style.backgroundColor = "#666666";
        img[numC].style.zIndex = 0;
        img[numC].style.left = 534 + "px";
        img[numC].style.top = 83 + "px";
        img[numC].style.opacity = 0;

        img[numD].style.width = 468 + "px";
        img[numD].style.height = 312 + "px";
        img[numD].style.backgroundColor = "#666666";
        img[numD].style.zIndex = 1;
        img[numD].style.left = 632 + "px";
        img[numD].style.top = 44 + "px";
        img[numD].style.opacity = 0.6;
    }

		banner_container.onmouseover=function(){
			clearInterval(banner_timer);
		}
		banner_container.onmouseout=function(){
			runBanner();
		}
	
    setImg();
	function runBanner(){
		banner_timer=setInterval(function(){
			num ++;
			setImg();
		},3000);
	}    
	runBanner();
    document.getElementById("banner_btnLeft").onclick = function () {
        num ++;
        setImg()
    };
    document.getElementById("banner_btnRight").onclick = function () {
        num --;
        setImg()
    };

}