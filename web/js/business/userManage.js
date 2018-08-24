/**
 * Created by matt on 2018/8/23.
 */

/**
 * 读取账号列表
 */
function loadUserList() {
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
                    case (4):
                        if (obj.role != null) $(this).html(obj.role.roleName);
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

/**
 * 读取角色列表
 */
function loadRoleList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
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
                        $(this).html(obj.roleName);
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
 * 设置角色
 */
function showRoleModal(e) {
    var userId = getUserId(e);
    console.log(userId);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var role = $("#role");
                role.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.id);
                    option.text(item.roleName);
                    role.append(option);
                });
                role.get(0).selectedIndex = -1;
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    // 显示角色模态框
    $('#roleModal').modal("show");
    // 角色框保存点击事件
    $("#saveRole").click(function () {
        var roleId = $("#role").val();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setRole",                  // url
            data: {
                userId: userId,
                roleId: roleId
            },
            async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                }
            },
            error:function (result) {
                console.log(result);
            }
        });
    });
}

/**
 * 获取用户编号
 * @param e
 */
function getUserId(e) {
    var tr = $(e.parentElement.parentElement);
    var id = tr.find("td[name='id']").text();
    return id;
}

/**
 * 读取权限列表
 */
function loadAuthorityList() {
    // 读取角色列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
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
        var tr = $("#roleCloneLi");
        tr.siblings().remove();
        $.each(result, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.find('a').text(item.roleName);
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.prop('id', item.id);
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
    }

    // 读取功能列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listFunction",                  // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setFunctionList(result.data);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    // 设置功能列表
    function setFunctionList(result) {
        var list = eval(result);
        var data = setFunctionChildren(list);
        //    $('#tree').treeview(options);  //其中options选项允许用户定制treeview的默认外观和行为。它们在初始化时作为一个对象被传递给插件
        // 显示功能列表
        $(function() {
            $('#tree').treeview({
                data: data, //节点数据
                multiSelect: true, //是否可以同时选择多个节点      Boolean
                nodeIcon: "glyphicon glyphicon-unchecked", //所有节点的默认图标
                selectedIcon: "glyphicon glyphicon-check", //节点被选中时显示的图标         String
                color: "#000000", //节点的前景色      string
                backColor: "#ffffff", //节点的背景色      string
                selectedColor: "#000000", //当节点被选中时的前景色
                selectedBackColor: "#ffffff", //当节点被选中时的背景色
                onhoverColor: "#F5F5F5", //光标停在节点上激活的默认背景色      String
                state: { //描述节点的初始状态    Object
                    checked: false, //是否选中节点
                    /*disabled: true,*/ //是否禁用节点
                    expanded: false, //是否展开节点
                    selected: false //是否选中节点
                }
            });
        });
        // 设置子功能
        function setFunctionChildren(children) {
            var childList = [];
            for (var j = 0; j < children.length; j++) {
                var child = {};
                var nodes = [];
                child.text = children[j].functionName;
                if (children[j].children.length > 0) {
                    nodes = setFunctionChildren(children[j].children);
                }
                if (nodes.length > 0) child.nodes = nodes;
                childList.push(child);
            }
            return childList;
        }
    }


    
    
    

    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadAuthority",                  // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result.data);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
}