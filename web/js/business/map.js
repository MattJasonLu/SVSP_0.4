/**
 * 读取客户的数据
 */
function loadClientData() {
    $.ajax({
        type: "POST",
        url: "getClientList",
        async: false,
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var obj = eval(result);
                var div = $("#cloneContent");
                // 遍历客户
                for (var i = 0; i < obj.length; i++) {
                    // 创建条目
                    var clonedDiv = div.clone();
                    // 赋值
                    clonedDiv.find("span[name='client']").text(obj[i].companyName);
                    // 显示
                    clonedDiv.show();
                    // 移除编号
                    clonedDiv.removeAttr("id");
                    clonedDiv.insertBefore(div);
                }
                // 隐藏原来的div
                div.hide();
            }
        },
        error: function (result) {
            console.log("获取信息失败");
        }
    });
}