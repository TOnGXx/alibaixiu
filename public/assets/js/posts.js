// 向服务器发送请求  获取文章列表数据
$.ajax({
    type: 'get',
    url:'/posts',
    success:function(response){
        // console.log(response);
        var html = template('postsTpl',response);
        $('#postsBox').html(html);
        var page = template('pageTpl',response)
        $('#page').html(page)
    }
})

// 处理日期时间 格式
function formateDate(date){
     date = new Date(date);

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}