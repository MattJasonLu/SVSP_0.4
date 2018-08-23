/**
 * Created by matt on 2018/8/23.
 */

/**
 * 读取账号列表
 */
function loadDataList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listUser",                  // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setDataList(result.data);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    function setDataList(result) {
        // 获取id为cloneTr的tr元素
        var tr = $("#cloneTr");
        tr.siblings().remove();
        $.each(result, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 编号
                    case (1):
                        $(this).html(obj.id);
                        break;
                    case (2):
                        $(this).html(obj.username);
                        break;
                    case (3):
                        $(this).html(obj.name);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
    }
}

/**
 * 增加用户
 */
function addUser() {
//        var data = new FormData();
//        data.append('username', $("#username").val());
//        data.append('password', $("#password").val());
//        data.append('name', $("#name").val());
//        data.append('department', $("#department").val());
//        data.append('job', $("#job").val());
//        data.append('cfmPassword', $("#cfmPassword").val());
//        data.append('age', $("#age").val());
//        data.append('level', $("#level").val());
//        data.append('canAllocate', $("input[name='canAllocate']:checked").val());
//        data.append('isClient', $("input[name='isClient']:checked").val());
//        data.append('sex', $("input[name='sex']:checked").val());
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addUser",                       // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: $('#userInfoForm').serialize(),
//            data: JSON.stringify(data),
        dataType: "json",
//            contentType: "application/json; charset=utf-8",
//            processData: false,
        success: function (result) {
            if (result != undefined) {
                if (result.status == "success") {
                    alert(result.message);
                    $(location).attr('href', 'userManage.html');//跳转
                } else {
                    console.log(result);
                    alert(result.message);
                }
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}