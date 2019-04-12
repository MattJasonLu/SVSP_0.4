var user = {};
var oldPassword = "";
/**
 * 显示信息
 */
function viewPersonalInformation() {
    loadNavigationList();    // 动态菜单加载
    $.ajax({
        type: "POST",                           // 方法类型
        url: "getCurrentUserInfo",            // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
               // console.log(result);
                var data = result.data;
                $("#username").text(data.username);//index + 1
                $("#department").text(data.department);
                $("#company").text(data.company);
                $("#email").text(data.email);
                user.username = data.username;
                user.department = data.department;
                user.company = data.company;
                user.email = data.email;
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 显示密码修改框
 */
function changePassword() {
    $("#changePasswordModal").modal('show')
}

/**
 * 验证密码是否正确
 * @param item
 */
function validation(item) {
    var password = $(item).val();
    user.password = password;
    $.ajax({
        type: "POST",
        url: "validationUser",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                if (result.count == 0) {
                    alert("密码不正确，请重新输入！");
                }else {
                    oldPassword = password;   // 保存旧密码，用于之后验证
                }
            } else {
                console.log(result)
            }
        },
        error: function (result) {
            console.log("服务器异常！")
        }
    });
}

/**
 * 验证新旧密码是否一致
 * @param item
 */
function validationOld(item){
    var newPassword = $(item).val(); // 新密码
    if(oldPassword == newPassword) {
        alert("新密码与旧密码一致，请重新输入!");
        $("#newPassword1").val("");  // 清空输入框
        $("#newPassword").val("");
    }
}

/**
 * 修改密码
 */
function confirmChange() {
    var newPassword1 = $("#newPassword1").val();
    var newPassword = $("#newPassword").val();
    if (newPassword1 != newPassword) {
        alert("两次密码不一致，请重新输入!");
        $("#newPassword1").val("");  // 清空输入框
        $("#newPassword").val("");
    } else if(oldPassword == newPassword1){
        alert("新密码与旧密码一致，请重新输入!");
        $("#newPassword1").val("");  // 清空输入框
        $("#newPassword").val("");
    }else{  // 修改密码
        user.password = newPassword;
        console.log(user);
        //更新字表数据
        $.ajax({
            type: "POST",
            url: "modifyPassword",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(user),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                } else {
                    console.log(result)
                }
            },
            error: function (result) {
                console.log("服务器异常！")
            }
        });
    }
}
