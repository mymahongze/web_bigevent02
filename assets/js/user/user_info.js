$(function () {
    var form = layui.form
    form.verify({
        nickname:function (value) {
            if(value.length > 6){
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                // 为表单快速赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    $("#btnReset").on("click",function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //提交用户信息
    var layer = layui.layer;
    $(".layui-form").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //更新成功 渲染父页面(调用父页面中更新用户信息和头像的方法)
                window.parent.getUserInfo()
            }
        });
    })
})