$(function(){
    $("[data-input='search']").on("keyup",function(e){
        if(e.keyCode == 13){
            $("#searchBtn").click()
        }        
        
    })
    //点击搜索按钮
    $("#searchBtn").on("click",function(e){
        var kWords = $("[data-input='search']").val().trim();
        if(kWords !== ""){
            location.href ="products.html?kwords="+kWords;
        }
    })
    if(location.search!=""){
        var kcodes=decodeURI(location.search.slice(8))
        $("[data-input='search']").val(kcodes)
    }
})