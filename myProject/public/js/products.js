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
                           <button>-</button>
                           <input type="text" value="1">
                           <button >+</button>
                       </div>
                       <a href="javascript:void(0)" class="itemBtn">添加到购物车</a>
                   </div>
               </div>`
                }
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
            }
        })
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