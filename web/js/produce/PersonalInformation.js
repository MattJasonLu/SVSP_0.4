function changePassword() {
    $("#changePasswordModal").modal('show')
}

/**
 * 取消修改密码
 */
function cancelChange() {
    window.location.reload();
}
/**
 * 修改密码
 */
function confirmChange() {
    var data;
    data = {
        password: $("#password").val(),
        newPassword: $("#newPassword").val(),
        newPassword1: $("#newPassword1").val()
    };
    console.log(data);
    //更新字表数据
    $.ajax({
        type: "POST",
        url: "savePassword",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
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
/**
 * 显示信息
 */
function viewPersonalInformation() {
    $.ajax({
        type: "POST",                           // 方法类型
        url: "getPersonalInformation",            // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                if(result.password != null)
                    $("#password").val(result.password);//index + 1
                if(result.newPassword != null)
                    $("#newPassword").val(result.newPassword);
                if(result.newPassword1 != null)
                    $("#newPassword1").val(result.newPassword1);
            } else {
                console.log(result.message);
            }

        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setInvoicedList();
}