$(function () {
    $("#link_reg").on("click", function () {
        $(".reg_box").show()
        $(".login_box").hide()
    })
    $("#link_login").on("click", function () {
        $(".login_box").show()
        $(".reg_box").hide()
    })

    var form = layui.form
    //登录表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function (value) {
            var pwd = $(".reg_box input[name=password]").val()
        //    console.log(value);
            if (pwd != value) {
               return "两次输入不一致"
            }
        }
    })

    //发起注册用户的ajax请求
    var layer = layui.layer
    $("#form_reg").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/api/reguser",
            data: {
                username:$(".reg_box input[name=username]").val(),
                password:$(".reg_box input[name=password]").val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功了，去登陆！")
                $("#link_login").click()
                $("#form_reg")[0].reset()
            }
        });
    })


    // 发起登录的ajax请求
    $("#form_login").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("登陆失败！")
                }
                layer.msg("登陆成功！")
                localStorage.setItem("token",res.token)
                location.href = "/index.html"
            }
        });
    })
})