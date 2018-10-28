$(function(){
    //获取搜索框的内容
    var kcodes=decodeURI(location.search.slice(8)) 
    if(location.search!=""){
        kcodes=decodeURI(location.search.slice(8))
        addProduct(kcodes,1)
        $("[data-into='prevPageBtn']").addClass("disabled")
    }
    function addProduct(kcodes,pno){
        $.ajax({
            url:"/product/search",
            dataType:"json",
            type:"get",
            data:{
                kwords : kcodes,
                pno:pno
            },
            success:function(res){
                var {length,result}=res;
                var num = Math.ceil(parseInt(length)/9)
                var html=""
                for(var i=0;i<(pno<num?9:(parseInt(length)%9));i++){
                    html +=`<div class="latest_designs_product" v-for="product in products" >
                    <div class="product_tag">新品</div>
                   <div class="product_image_contain">
                       <a class="wrap_container" href="single.html?prid=${result[i].pid}" >详情</a>
                       <img src="images/${result[i].imgUrl}" alt=""/>
                   </div>
                   <div class="designs_product_detail">
                       <a href="simgle.html?prid=${result[i].pid}" class="product_name">黑色T-hirt</a>
                       <div class="product_price">
                           <span >￥&nbsp;${result[i].price}</span>&nbsp;
                           <del >￥&nbsp;${result[i].originalPrice}</del>
                       </div>
                       <div>
                           <button data-add="deleteToCart">-</button>
                           <input type="text" value="1">
                           <button  data-add="addToCart">+</button>
                       </div>
                       <a href="javascript:void(0)" class="itemBtn" prid=${result[i].pid} data-add="addCart">添加到购物车</a>
                   </div>
               </div>`
                }
                //为商品加减按钮按钮绑定点击事件
                $("#productContian").on("click","[data-add='deleteToCart'],[data-add='addToCart']",function(){
                    var $this = $(this)
                    if($this.html()=="+"){
                        var value=$this.prev().val()
                        value++
                        $this.prev().val(value)
                    }
                    if($this.html()=="-" && $this.next().val()!=1){
                        var value=$this.next().val()
                        value--
                        $this.next().val(value)
                    }
                })
                //根据搜索的数据个数来生成分页按钮的个数
                var html2 =""
                $(".divdePage>ul>li:not(:first-child):not(:last-child)").remove()
                $("[data-into='productCount']").html(`共${length}条数据`)
                var fragment = document.createDocumentFragment()
                for(var i=1;i<=num;i++){
                    var Li=$("<li pno="+i+">"+i+"</li>")[0]
                    fragment.appendChild(Li)
                }
                $pageNextLi = $(".divdePage>ul>li:first-child")
                $pageNextLi.after(fragment)
                $(`[pno=${pno}]`).addClass("active")
                //for(var j=0;j<parseInt(length);)
                $("#productContian").html(html)

                //点击添加购物车按钮进行商品添加
                $("#productContian").on("click","[data-add='addCart']",function(){
                    var $this = $(this)
                    var prid = $this.attr("prid")
                    var num = $this.prev().children("input").val()
                    if(document.cookie){
                        var arr = document.cookie.split("; ")
                        var arr2={}
                        for(var i in arr){
                            var part = arr[i].split("=")
                            arr2[part[0].trim()]=part[1].trim()
                        }
                        $.ajax({
                            type:"get",
                            dataType:"json",
                            url:"http://localhost:3000/product/addToCart",
                            data:{
                                pcount:num,
                                uid:arr2.uid,
                                prid:prid 
                            },
                            success:function(res){
                                //重新加载购物车列表的商品信息
                                if(res.code==200){
                                   $("#shoppintCart>div>ul>li:not(:first-child):not(:last-child)").remove()
                                    getShoppingCart()
                                    $this.prev().children("input").val(1)
                                }
                            }

                        })
                    }else{
                        alert("请先登录")
                    }

                    
                })


            }
        })
    }
//自动加载购物车列表
    function getShoppingCart(){
        var arr = document.cookie.split("; ")
        var arr2={}
        for(var i in arr){
            var part = arr[i].split("=")
            arr2[part[0].trim()]=part[1].trim()
        }
        $.ajax({
            type:"get",
            dataType:"json",
            url:"http://localhost:3000/product/checkout",
            data:{
                uid:arr2.uid
            },
            success:function(res){
                var $liFirst = $("#shoppintCart>div>ul>li:first-child")
                var $liLast = $("#shoppintCart>div>ul>li:last-child")
               
                $("#shoppintCart>div>ul>li:not(:last-child):not(:first-child)").remove()
                for(var i in res){
                    $liFirst.after(`                    <li>
                    <span>${res[i].title}</span>
                    <button cid=${res[i].cid} data-cart="deleteProducts">-</button> 
                    <span>${res[i].pcount}</span>
                    <button cid=${res[i].cid} data-cart="addProducts">+</button>
                    <span data-add="singlePrice">￥${(res[i].pcount*res[i].price).toFixed(2)}</span>
                </li>`)
                }
                var totalPrice = 0;
                var $li = $("[data-add='singlePrice']")
                for(var i=0 ;i<$li.length;i++){
                    totalPrice += parseInt($($li[i]).html().slice(1))
                }
                $liLast.children("span").html(`&yen;${totalPrice.toFixed(2)}`)

                //商品添加和删除


            }  
        })
    }
    //购物车点击商品的增加与删除按钮进行商品的增删
    var $ul = $("#shoppintCart>div>ul")
    $ul.on("click","[data-cart='addProducts'],[data-cart='deleteProducts'],[data-cart='clearAll']",function(e){
        var arr = document.cookie.split("; ")
        var arr2={}
        for(var i in arr){
            var part = arr[i].split("=")
            arr2[part[0].trim()]=part[1].trim()
        }
        var uid = arr2.uid
        e.stopPropagation()
        e.preventDefault()
        var $this = $(this)
        var cid = $this.attr("cid")
        if($this.html()=="-"){
            var pcount = parseInt($this.next().html())
            if(pcount==1){
                if(confirm("是否删除该商品")){
                    pcount=pcount-1
                    updateCart(pcount,cid,uid)
                }
            }else{
                pcount=pcount-1
                updateCart(pcount,cid,uid)
            }
        }else if($this.html()=="+"){
            var pcount = parseInt($this.prev().html())
            pcount++
            updateCart(pcount,cid)
        }else if($this.attr("data-cart")=="clearAll"){
            if(confirm("是否要清空购物车")){
                console.log("dfsafda")
                var pcount="all"
                updateCart(pcount,cid,uid)
                
            }
        }
    })
    //鼠标滚动事件导致购物车固定在一定的位置
    $(window).bind("scroll", function(){
        var top = $(this).scrollTop(); // 当前窗口的滚动距离
        if(top>1000){
            $ul.css({
                "top":"1000px"
            })
        }else if(top>233){
            top=top+"px"
            $ul.css({
                "top":top
            }) 
        }else{
            $ul.css({
                "top":"223px"
            }) 
        }
    });

    function updateCart(pcount,cid,uid){
        $.ajax({
            type:"get",
            dataType:"json",
            url:"http://localhost:3000/product/updateCart",
            data:{
                pcount:pcount,
                cid:cid,
                uid:uid
            },
            success:function(res){
                getShoppingCart();
            }  
        })
    }
    if(document.cookie){
        getShoppingCart()
    }
    //分页按钮
    $divdePage = $("[data-into='divdepage']")
    $divdePage.on("click","li,button",function(e){
        var $pageLi = $(".divdePage>ul>li:not(:first-child):not(:last-child)")
        var $this = $(this)
        if($this.attr("data-into")=="nextPageBtn"){             //下一页按钮
            var $activePage = $this.siblings(".active")
            if($activePage.attr("pno") < $pageLi.length){
                $activePage.removeClass("active")
                $activePage.next().addClass("active")
                $("[data-into='prevPageBtn']").removeClass("disabled")
                $("[data-into='nextPageBtn']").removeClass("disabled")
                if($activePage.attr("pno") == $pageLi.length-1){
                    $("[data-into='nextPageBtn']").addClass("disabled")
                }
                //点击上一页重新加载数据
                var pno =  parseInt($activePage.next().attr("pno"))
                addProduct(kcodes,pno)
              }
            //重新加载页面数据

        }else if($this.attr("data-into")=="prevPageBtn"){  //上一页按钮
            var $activePage = $this.siblings(".active")
            if($activePage.attr("pno") > 1){
                $activePage.removeClass("active")
                $activePage.prev().addClass("active")
                $("[data-into='prevPageBtn']").removeClass("disabled")
                $("[data-into='nextPageBtn']").removeClass("disabled")
                if($activePage.attr("pno") == 2){
                    $("[data-into='prevPageBtn']").addClass("disabled")
                }
                var pno =  parseInt($activePage.prev().attr("pno"))
                addProduct(kcodes,pno)
            }
        }else if($this.attr("data-into")=="jumpPage"){  //手动输入
            var pno = $("[data-into='pageNum']").val()
            if(pno<$pageLi && pno>0){
                addProduct(kcodes,pno) 
            }
        }else{                                                      //指定页码            
            $("[data-into='prevPageBtn']").removeClass("disabled")
            $("[data-into='nextPageBtn']").removeClass("disabled")
            $this.siblings().removeClass("active")
            $this.addClass("active")
            if($this.attr("pno")==1)
                $("[data-into='prevPageBtn']").addClass("disabled")
            else if($this.attr("pno")== $pageLi.length)
                $("[data-into='nextPageBtn']").addClass("disabled")
            
            var pno = parseInt($this.html())
            addProduct(kcodes,pno) 
        }
        
    })
})