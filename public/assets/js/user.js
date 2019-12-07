function serializeObj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach(item => {
        obj[item.name] = item.value;
    })

    return obj;
}

// 创建用户
$('#userForm').on('submit', function (e) {

    e.preventDefault()
    var formData = serializeObj($(this));

    if(formData.id) {
        $.ajax({
            type: 'put',
            url: '/users/' + formData.id,
            data: formData,
            success: function () {
                location.reload();
            },
            error: function () {
                alert('创建用户失败')
            }
        })
    } else {
        $.ajax({
                type: 'post',
                url: '/users',
                data: formData,
                success: function () {
                    location.reload();
                },
                error: function () {
                    alert('创建用户失败')
                }
        })
    }
 
    // // 阻止表单默认行为
    return false;

})

// 上传头像

$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax不要解析请求参数
        processData : false,
        // 告诉ajax不要解析请求参数的类型
        contentType: false,
        success : function(data){
            console.log(data);

            // 实现头像预览功能
            $('#preview').attr('src',data[0].avatar);
            $('#hiddenAvatar').val(data[0].avatar)
        }

    })
})


// 渲染列表
$.ajax({
    type: 'get',
    url: '/users',
    success:function(response) {
        // console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl',{users:response});
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
        
    }
})

// 修改 用户信息

$('#userBox').on('click','.edit',function(){
    var id = $(this).attr('data-id')
    // alert(id)
    $.ajax({
        type:'get',
        url:'/users/' + id,
        success : function (response){
            console.log(response);
            var html = template('modifyTpl',response)
            console.log(html);
            $('#userForm').html(html)
        }

    })
})


// 删除用户
$('#userBox').on('click','.delete' , function(){
    // 如果管理员确定删除用户
    if(confirm('你确定要删除此用户吗?')) {
        // 获取到要删除的用户id
        var id = $(this).attr('data-id')
        // alert(id);
        // 向服务器端发送请求  删除用户
        $.ajax({
            type:'delete',
            url:'/users/' + id,
            success: function () {
                // 删除成功 即刷新页面 显示最新的数据
                location.reload()
            }
        })
    }
})

// 全选控制单选 当全选按钮状态发生改变时
$('#selectAll').on('change',function(){
    // 获得全选按钮当前的状态
    var status = $(this).prop('checked')
    // 如果 全选按钮的 状态为 true
    if(status){
        // 显示 批量删除按钮
        $('#deleteMany').show()
    }else{
        $('#deleteMany').hide()
    }
    // alert(status);
    // 获取到所有用户 并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked',status);
})

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change','.userStatus',function() {
    // 获取到所有的用户
    var inputs = $('#userBox').find('input')

    // 判断 用户的数量 和 选中的 数量是否相同
    if(inputs.length == inputs.filter(':checked').length){
        // alert('所有的用户都被选中')
        $('#selectAll').prop('checked',true)
    }else{
        // alert('用户没有被全部选中')
        $('#selectAll').prop('checked',false)

    }

    // 如果选中的复选框大于0  显示批量删除按钮
    if(inputs.filter(':checked').length > 0) {
        $('#deleteMany').show()
    }else{
        $('#deleteMany').hide()
    }
})

// 批量删除
$('#deleteMany').on('click',function(){
    var arr = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // console.log(checkedUser);
    // 循环复选框 获取data-id属性的值
    checkedUser.each(function(index,ele){
        // 向数组里 添加  自定义属性 data-id 的 id 值
        arr.push($(ele).attr('data-id'));
    })

    if(confirm('您确定要进行批量删除操作吗')){
        $.ajax({
            type:'delete',
            url:'/users/' + arr.join('-'),
            success: function(){
                location.reload()
            }
        })
    }
})
