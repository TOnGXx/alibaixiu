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
        data: formData,
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

//  删除文章
$('#postsBox').on('click', '.delete', function () {
    if (confirm('你确定要进行删除操作吗?')) {
        // 获取到管理员要删除的文章id
        var id = $(this).attr('data-id');
        // alert(id)
        // 发送 ajax 删除文章请求
        $.ajax({
            type:'delete',
            url:'/posts/' +id,
            success: function(){
                location.reload();
            }
        })
    }
})

