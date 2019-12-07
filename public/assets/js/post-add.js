 // 向服务器端发送请求 获取文章分类数据
 $.ajax({
     type:'get',
     url:'/categories',
     success: function(response){
        // console.log(response);
        var html = template('categoryTpl',{data:response});
        $('#category').html(html)
        // console.log(html);
        
     }
 })

 // 实现文件图片上传功能
 $('#feature').on('change',function(){
     // 获取到管理员 原则到的图片
     var file = this.files[0];
     // 创建一个formData 对像 实现图片上传功能
     var formData = new FormData();
    //  将管理员选择到的图片追加到formData 对像中
    formData.append('cover',file);
    // 实现文章封面上传功能
    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,
        // 告诉$.ajax 方法不要处理data属性的参数
        processData : false,
        // 告诉$.ajax 不要设置d参数类型
        contentType: false,
        success: function(response){
            // console.log(response);
            $('#thumbnail').val(response[0].cover)
        }
    })

 })

 // 添加文章
 $('#addForm').on('submit',function(){
    // 获取 管理员在表单中输入的内容
    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url:' /posts',
        data: formData,
        success: function (){
            // 文章添加成功 就添加到文章列表页面
            location.href = '/admin/posts.html'
        }
    })
    // 阻止表单默认提交行为
    return false;
 })