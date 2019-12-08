// 文件上传功能
$('#logo').on('change', function () {
    // 获取管理员选择的图片
    var file = this.files[0];

    // 创建 formData 对像实现图片二进制上传
    var formData = new FormData();

    // 将图片添加到 formData 对像中
    formData.append('logo', file);

    // 发送ajax 请求  实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#hiddenLogo').val(response[0].logo)
            // 将logo图片显示在页面中
            $('#preview').attr('src', response[0].logo)

        }
    })
})

// 网站添加操作
$('#settingsForm').on('submit', function () {
    // 获取到管理员 输入的内容
    var formData = $(this).serialize();

    // 发送ajax请求 添加网站 操作
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    })

    // 阻止表单默认提交行为
    return false;
})

// 显示网站数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        console.log(response);
        // 判断 是否有数据
        if(response) {
            // 显示图片
            $('#hiddenLogo').val(response.logo);
            $('#preview').attr('src',response.logo);
            // 显示站点名称
            $('#site_name').val(response.title);
            // 显示站点描述
            $('#site_description').val(response.description);
            // 显示站点关键词
            $('#site_keywords').val(response.keywords);
            // 显示是否开启评论
            $('#comment_status').prop('checked',response.comment)
            // 显示是否开启人工审核
            $('#comment_reviewed').prop('checked',response.review)
        }
        
    }
})