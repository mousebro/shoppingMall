$(function(){
(   async function(){
   await $("#headerContain").load("header.html")
   await $("#footerContain").load("footer.html")
    var bImage=document.getElementById("img_thumb");
    var sImage = document.querySelectorAll(".singleContain>.img_thumg_list>li img")
        var img_thumb_contain = document.querySelector(".singleContain>.img_thumb_contain")
        var imgRange = document.getElementById("imgRange")
        var singleContain = document.getElementById("singleContain")
        var imgRangeBig =document.getElementById("imgRangeBig")
    var timer = null;
    var scrollTop=0;
    //bImage.innerHTML+=bImage.innerHTML
    window.onscroll =function(e){
        scrollTop=document.body.scrollTop
        ||document.documentElement.scrollTop
        
    }
    sImage[0].style.opacity =1 
        img_thumb_contain.onmousemove =function(e){
            clearInterval(timer)
            imgRange.style.display="block"
            imgRangeBig.style.display="block"	
            imgRange.style.left = e.clientX-43-singleContain.offsetLeft-1+"px"
            imgRange.style.top = e.clientY-50-singleContain.offsetTop-1+scrollTop+"px"
            var a =parseFloat(bImage.offsetLeft/-403)+1;
            imgRangeBig.style.backgroundImage="url(images/d"+a+".jpg)"
            imgRangeBig.style.backgroundPositionX = -(e.clientX-43-singleContain.offsetLeft-1)*3+"px";  
            imgRangeBig.style.backgroundPositionY = -(e.clientY-50-singleContain.offsetTop+scrollTop-1)*3+"px";
    }

    img_thumb_contain.onmouseout = function(){
            clearInterval(timer)
    imgRange.style.display="none"
            imgRangeBig.style.display="none"
            setImage()
    }
    function setImage(){      
        timer=setInterval(function(){
            for(var i=0;i<sImage.length;i++){
                sImage[i].style.opacity = .5
            }                 
            if(bImage.offsetLeft == -1209){
                bImage.style.left = 0+"px"
                sImage[0].style.opacity =1 
            }else{              
                bImage.style.left = bImage.offsetLeft -403+"px"
            sImage[parseFloat(bImage.offsetLeft/-403)].style.opacity =1  
            }            
        },3000)
    }
    setImage()


    //尺码选择
        var $sizeA = $("table>tbody>tr:nth-child(2)>td:nth-child(2)>ul>li>a")
        $sizeA.click(function(e){
            var $this = $(this)
            $this.parent().siblings().children(".redBorder").removeClass("redBorder")
            $this.addClass("redBorder")
        })
     //点击按钮进行数量的增减
        var $divBtn = $("[data-toggle='countChange']")
        $divBtn.on("click","span",function(){
            var $this = $(this)
            var num = $this.parent().prev().val()
            if($this.attr("data-toggle") == "addCount"){
                num++
            }else{
                if(num !=1){
                    num--
                } 
            }
            $this.parent().prev().val(num)    
        })
    //点击加入购物车
        var submitBtn = $("[data-submit = 'submitP']")
        submitBtn.on("click","a",function(e){
            e.preventDefault()
            var $this = $(this)
            if(document.cookie!=""){
                if($this.attr("data-submit") == "add"){
                    var pcount = $("[ data-toggle='countChange']").prev().val()
                    var prid = $(".single_shelfItem>h3").attr("prid")
                    var uid = CookiesA.uid;
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:"http://127.0.0.1:3000/product/addToCart",
                        data:{
                            pcount,
                            prid,
                            uid
                        },
                        success:function(res){
                            alert(res.msg)
                        }
                    })
                }
            }else{
                alert("请先登录")
            }

        })

   })()
})