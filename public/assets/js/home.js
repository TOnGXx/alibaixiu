// 获取轮播图列表
$.ajax({
    type:'get',
    url : '/slides',
    success:function(response){
        console.log(response);
        
    }
})