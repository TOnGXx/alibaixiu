// 向服务器端发送 $.ajax 请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        // console.log(response);
        var html = template('commentsTpl', response);
        // console.log(html);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl', response)
        $('#pageBox').html(pageHTML);
    }
})

// 实现分页
function changePage(page) {
    // 向服务器端发送 $.ajax 请求 获取评论列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            var html = template('commentsTpl', response);
            // console.log(html);
            $('#commentsBox').html(html);
            var pageHTML = template('pageTpl', response)
            $('#pageBox').html(pageHTML);
        }
    })

}

// 审核评论
$('#commentsBox').on('click', '.status', function () {
    // 获取 当前 评论的状态
    var state = $(this).attr('data-status');
    // alert(state)
    // 获取当前评论的id
    var id = $(this).attr('data-id')
    // 向服务器端发送 请求  更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
})

// 删除评论
$('#commentsBox').on('click', '.delete', function () {

    if (confirm('你真的要进行删除操作吗?')) {
        var id = $(this).attr('data-id')

        // 向服务器端发送 请求 删除评论
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});