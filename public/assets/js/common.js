$('#logout').on('click', function () {
    var isConfirm = confirm('您确定要退出吗?');

    if (isConfirm) {
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(data){
          location.href = '/admin/login.html'
        },
        error:function(){
          alert('退出失败')
        }
      })

    }
  })

  // 处理日期时间 格式
function formateDate(date) {
  date = new Date(date);

  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 向服务器发送请求 索要登录用户信息 
$.ajax({
  type:'get',
  url:'/users/' + userId,
  success : function(response){
    console.log(response);
    $('.avatar').attr('src',response.avatar);
    $('.profile .name').html(response.nickName)
  }
})