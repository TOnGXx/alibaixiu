//  修改 用户密码  表单发生提交行为
$('#modifyForm').on('submit',function(){
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize()
    // 调用接口函数  实现密码修改功能
    $.ajax({
        type:'put',
        url:'/users/password',
        data : formData,
        success : function(){
            location.href = '/admin/login.html'
        }
    })
    return false;
    //  阻止表单默认提交行为
})