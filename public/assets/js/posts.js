// 向服务器发送请求  获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response)
        $('#page').html(page)
    }
})

// 处理分页
function changePage(page) {
    // alert('23')
    // 向服务器发送请求  获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    })

}

// 筛选功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categoryTpl', { data: response })
        // console.log(html);

        $('#categoryBox').html(html)
    }
})

$('#fileerForm').on('submit', function () {
    // alert('123')
    var formData = $(this).serialize();
    // 向服务器发送请求  获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data:formData,
        success: function (response) {
            console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    })

    //阻止表单默认提交行为
    return false

})

// 处理日期时间 格式
function formateDate(date) {
    date = new Date(date);

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}