$('#addCategory').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();

    $.ajax({

        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单的默认行为
    return false;
})


    // 发送 ajax 请求 向服务器端索要分类列表
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            // console.log(response);
            var html = template('categoryListTpl',{data:response})
            $('#categoryBox').html(html);
        }
    })

    // 为编辑按钮添加点击事件
    $('#categoryBox').on('click','.edit',function(){
        //  获取要修改的 分类数据的id
        var id = $(this).attr('data-id');
        //  根据id 获取分类数据 的详细信息
        $.ajax({
            type:'get',
            url:'/categories/' + id,
            success:function (response){
                // console.log(response);
                var html = template('modifyCategoryTpl',response);
                $('#formBox').html(html);
                // console.log(html);
            }
        })
    })

    // 修改分类列表
    $('#formBox').on('submit','#modifyCategory',function(){
        // 获用户在表单中输入的内容
        var formData = $(this).serialize();
        // 获取要修改的用户 id
        var id = $(this).attr('data-id')
        // 发送ajax 请求 修改分类列表
        $.ajax({
            type:'put',
            url:'/categories/' + id,
            data: formData,
            success: function(){
                location.reload();
            }
        })
        // 阻止表单默认行为
        return false;
    })

    // 删除分类 
    $('#categoryBox').on('click','.delete',function(){

        if(confirm('你确定要执行删除操作吗?')){

            var id = $(this).attr('data-id')
            $.ajax({
                type:'delete',
                url:'/categories/' + id,
                success:function(){
                    location.reload()
                }
            })
        }
    })