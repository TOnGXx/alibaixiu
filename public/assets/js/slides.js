$('#file').on('change', function () {
    // 得到管理员选择的文件
    var file = this.files[0];
    // 创建一个formData 对像 实现文件二进制上传
    var formData = new FormData();
    // 管理员选择的文件添加到formData 对像中
    formData.append('image', file);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#image').val(response[0].image)
        }
    })

})

// 轮播图数据添加
$('#slidesForm').on('submit', function () {
    // 获取管理员在表单输入的内容
    var formData = $(this).serialize();
    // 
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false;
    // 阻止表单默认提交行为
})

// 实现图片轮播数据展示功能  
// 向服务器发送请求 获得图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // console.log(response);
        var html = template('slidesTpl', { data: response });
        // console.log(html);

        $('#slidesBox').html(html)
    }
})

// 轮播图删除功能
$('#slidesBox').on('click','.delete' ,function () {
    if (confirm('你确定要进行删除操作吗?')) {
        // 获取 要删除的轮播图 id
        var id = $(this).attr('data-id');
        // 发送ajax请求 进行删除操作
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})