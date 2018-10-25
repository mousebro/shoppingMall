$(function(){
    //商品数量的增加与删除
    var $del = $("section .allContain > table > tbody tr td:nth-child(3) > div > button:first-child ")
    var $add = $("section .allContain > table > tbody tr td:nth-child(3) > div > button:last-child ")
 
    //进入该页面进行用户的购物车清单加载
    function addProductList(){
        var cookies = (document.cookie).split("; ")
        var userMsg = {}
        for(var i=0;i<cookies.length;i++){
            var arr=cookies[i].split("=");
            userMsg[arr[0]]=arr[1] 
        }
        $.ajax({
            type:"get",
            dataType:"json",
            url:"http://localhost:3000/product/checkout",
            data:{
                uid:userMsg.uid
            },
            success: function(res) {
                var result =res;
                var $Tbody = $(".allContain>table>tbody")
                var html = ""
                for(var i=0;i<result.length;i++){
                    html+=`<tr>
                    <td>
                        <div></div>
                    </td>
                    <td>
                       <a href="#">
                            <img src="images/${result[i].imgUrl}" alt="">
                       </a>
                    </td>
                    <td>
                        <div>
                            <button data-toggle="delete" data-cid=${result[i].cid}>-</button>
                            <span>${result[i].pcount}</span>
                            <button data-cid=${result[i].cid}>+</button>
                        </div>
                    </td>
                    <td>手提包</td>
                    <td>${result[i].price}&yen;</td>
                    <td>${(result[i].pcount * result[i].price).toFixed(2)}&yen;</td>
                </tr>`
                }
                $Tbody.html(html)
                $del = $("section .allContain > table > tbody tr td:nth-child(3) > div > button:first-child ")
                $add = $("section .allContain > table > tbody tr td:nth-child(3) > div > button:last-child ")
                checkoutList()
                function updatePro(num,$del){
                    var cid = $del.attr("data-cid")
                    $.ajax({
                        url:"http://localhost:3000/product/updateCart",
                        type:"get",
                        dataType:"json",
                        data:{
                            cid:cid,
                            pcount:num 
                        },
                        success:function(res){
                            if(res.code == 200){
                            $del.next().html(num)    
                            var $priceTd = $del.parent().parent().parent().find("td:nth-child(5)");
                            var price = parseInt($priceTd.html());
                            var $totalTd = $del.parent().parent().parent().find("td:last-child");
                            var totalSum = price*num;
                            $totalTd.html(totalSum.toFixed(2)+"￥")
                            checkoutList()
                            addProductList()
                            }
                        }
                    })
                }
                //点击删除按钮减少对应商品数量
                $del.on("click",function(){
                    var $del = $(this)
                    var num = parseInt($del.next().html())
                    num--
                    if(num==0){
                        if(confirm("是否删除该商品")){
                            updatePro(num)
                            addProductList()
                        }else{
                            addProductList()
                        }
                    }else{
                        updatePro(num)
                    }

                })
                //点击增加按钮进行对应商品数量增加
                $add.on("click",function(){        
                    var $add = $(this);
                    var num = parseInt($add.prev().html());
                    num++;
                    updatePro(num,$add)   
                })
            }
        })    
    }
    if(document.cookie!=""){
        addProductList()

    }
    function checkoutList(){
        var $name =$("section .allContain .shoppingCartFooter .shoppingBacket ul li span:last-child")
        var $subTotal =$("section .allContain > table > tbody tr td:nth-child(6)")        
        var totalPrice = 0
        $subTotal.each((i,elem)=>{
            var $elem = $(elem)
            totalPrice+= parseInt($elem.html()) 
        })
        $name.html(totalPrice.toFixed(2)+"&yen")
    }
    checkoutList()
    /*点击继续购物回到原页面*/
    $(".shoppingCartFooter>.backGoshopping").on("click",function(e){
        e.preventDefault();
        history.go(-1)
    })
    
})