/**
 * Created by matt on 2018/8/23.
 */

/**
 * 角色编号
 */
var roleId = -1;

/**
 * 读取账号列表
 */
function loadUserList() {
    loadNavigationList();  // 设置动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listUser",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setDataList(result.data);
            }
        },
        error: function (result) {
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
    loadNavigationList();  // 设置动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setDataList(result.data);
            }
        },
        error: function (result) {
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
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
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
        error: function (result) {
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
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                }
            },
            error: function (result) {
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
function loadRoleAndFunction() {
    $('.loader').show();  // 显示进度条
    loadNavigationList();  // 设置动态菜单
    // 读取角色列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide();   // 隐藏进度条
                setDataList(result.data);
            }
        },
        error: function (result) {
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
            clonedTr.find('a').prop('id', item.id);
            clonedTr.removeProp("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
    }

    // 读取功能列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listFunction",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setFunctionList(result.data);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    // 设置功能列表
    function setFunctionList(result) {
        var list = eval(result);
        var data = setFunctionChildren(list);
        //    $('#tree').treeview(options);  //其中options选项允许用户定制treeview的默认外观和行为。它们在初始化时作为一个对象被传递给插件
        // 显示功能列表
        $(function () {
            $('#tree').treeview({
                data: data, //节点数据
             //   showCheckbox:true,
                multiSelect: true, //是否可以同时选择多个节点      Boolean
                nodeIcon: "glyphicon glyphicon-unchecked", //所有节点的默认图标
                selectedIcon: "glyphicon glyphicon-check", //节点被选中时显示的图标         String
                color: "#000000", //节点的前景色      string
                backColor: "#ffffff", //节点的背景色      string
                selectedColor: "#000000", //当节点被选中时的前景色
                selectedBackColor: "#ffffff", //当节点被选中时的背景色
                onhoverColor: "#F5F5F5", //光标停在节点上激活的默认背景色      String
                highlightSearchResults: false,//搜索结果不高亮
                state: { //描述节点的初始状态    Object
                    checked: false, //是否选中节点
                    /*disabled: true,*/ //是否禁用节点
                    expanded: false, //是否展开节点
                    selected: false //是否选中节点
                },
                onNodeSelected: nodeChecked,   // 父子节点关联全选
                onNodeUnselected: nodeUnchecked   // 父子节点关联全不选
            });
        });
        $('#tree').treeview('collapseAll', {silent: true}); // 折叠所有节点

        // 设置子功能
        function setFunctionChildren(children) {
            var childList = [];
            for (var j = 0; j < children.length; j++) {
                var child = {};
                var nodes = [];
                child.id = children[j].id;
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
}

/**
 * 设置子节点全选
 * @type {boolean}
 */
var nodeCheckedSilent = false;
function nodeChecked(event, node) {
    if (nodeCheckedSilent) {
        return;
    }
    nodeCheckedSilent = true;
    checkAllParent(node);
    checkAllSon(node);
    nodeCheckedSilent = false;
}

var nodeUncheckedSilent = false;

/**
 * 子节点全不选
 * @param event
 * @param node
 */
function nodeUnchecked(event, node) {
    if (nodeUncheckedSilent)
        return;
    nodeUncheckedSilent = true;
    uncheckAllParent(node);
    uncheckAllSon(node);
    nodeUncheckedSilent = false;
}

//选中全部父节点
function checkAllParent(node) {
    $('#searchTree').treeview('selectNode', node.nodeId, {silent: true});
    var parentNode = $('#tree').treeview('getParent', node.nodeId);
    if (!("nodeId" in parentNode)) {
        return;
    } else {
        checkAllParent(parentNode);
    }
}

//取消全部父节点
function uncheckAllParent(node) {
    $('#searchTree').treeview('unselectNode', node.nodeId, {silent: true});
    var siblings = $('#tree').treeview('getSiblings', node.nodeId);
    var parentNode = $('#tree').treeview('getParent', node.nodeId);
    if (!("nodeId" in parentNode)) {
        return;
    }
    var isAllUnchecked = true;  //是否全部没选中
    for (var i in siblings) {
        if (siblings[i].state.selected) {
            isAllUnchecked = false;
            break;
        }
    }
    if (isAllUnchecked) {
        uncheckAllParent(parentNode);
    }
}

//级联选中所有子节点
function checkAllSon(node) {
    $('#tree').treeview('selectNode', node.nodeId, {silent: true});
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            checkAllSon(node.nodes[i]);
        }
    }
}

//级联取消所有子节点
function uncheckAllSon(node) {
    $('#tree').treeview('unselectNode', node.nodeId, {silent: true});
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            uncheckAllSon(node.nodes[i]);
        }
    }
}
/**
 * 通过用户编号显示权限
 * @param e
 */
function showAuthorityById(e) {
    //$("#span_content").text("数据处理中...").show(1500);
    $('.loader').show();  // 显示进度条
    roleId = e.prop('id');
    $.ajax({
        type: "POST",
        url: "getFunctionByRoleId",
        async: true,
        dataType: "json",
        data: {
            roleId: roleId
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setFunctionChecked(result.data);
                setTimeout(function () {
                    $("#span_content").text("数据处理完成").delay(1500).hide(0);
                }, 0);
                $('.loader').hide();  // 隐藏进度条
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 设置功能勾选
 * @param result
 */
function setFunctionChecked(result) {
    uncheckAll();
    var data = eval(result);
    for (var i = 0; i < data.length; i++) {
        var name = data[i].functionName;
        var id = data[i].id;
        console.log("functionId=" + id);
        var nodes = $('#tree').treeview('search', [name, {
            ignoreCase: true,     // case insensitive
            exactMatch: true,    // like or equals
            revealResults: false,  // reveal matching nodes
            animated: "fast"         // 设置部署速度
        }]);
        $('#tree').treeview('selectNode', nodes[0]);
    }
}

/**
 * 保存选中的节点到数据库
 */
function saveAuthority() {
    // 如果用户没有选择过角色
    if (roleId == -1) {
        alert("未选择角色！");
        return;
    }
    var nodes = $('#tree').treeview('getSelected', {silent: false});
    var functionIdList = [];
    for (var i in nodes) {
        var functionId = nodes[i].id;
        functionIdList.push(functionId);
    }
    console.log(functionIdList);
    $.ajax({
        type: "post",
        url: "updateAuthority",
        dataType: "json",
        data: {
            roleId: roleId,
            functionIdList: functionIdList
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 更新权限表
 */
function setFunctionTreeByMenuTree() {
    $('.loader').show();  // 显示进度条
    $.ajax({
        type: "post",
        url: "setFunctionTreeByMenuTree",
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide();  // 隐藏进度条
                alert(result.message);
                window.location.reload();
            } else {
                $('.loader').hide();  // 隐藏进度条
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 勾选所有树节点
 */
function checkAll() {
    // 获取所有未勾选上的节点
    var nodes = $('#tree').treeview('getUnselected', {silent: false});
    // 遍历每个节点，调用节点勾选方法
    for (var i = 0; i < nodes.length; i++) {
        $('#tree').treeview('selectNode', nodes[i]);
    }
}

/**
 * 去除勾选所有树节点
 */
function uncheckAll() {
    // 获取所有勾选上的节点
    var nodes = $('#tree').treeview('getSelected', {silent: false});
    // 遍历每个节点，调用节点去除勾选方法
    for (var i = 0; i < nodes.length; i++) {
        $('#tree').treeview('unselectNode', nodes[i]);
    }
}

/**
 * 增加角色
 */
function addRole() {
    $("#modal-roleName").val("");
    $('#roleInfoModal').modal('toggle');
    // 点击事件
    $("#saveBtn").click(function () {
        console.log($("#modal-roleName").val());
        $.ajax({
            type: "POST",
            url: "addRole",
            async: false,
            dataType: "json",
            data: JSON.stringify({
                roleName: $("#modal-roleName").val()
            }),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
}

/**
 * 删除功能
 * @param e
 */
function deleteRole(e) {
    var roleId = $(e).parent().parent().find("td[name='id']").text();
    if (confirm("确认删除？")) {
        $.ajax({
            type: "POST",
            url: "deleteRole",
            async: false,
            dataType: "json",
            data: {
                id: roleId
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }
}

/**
 * 修改角色名称
 * @param e
 */
function adjustRole(e) {
    var roleId = e.parent().parent().find("td[name='id']").text();
    var roleName = e.parent().parent().find("td[name='roleName']").text();
    $("#modal-roleName").val(roleName);
    $('#roleInfoModal').modal('toggle');
    // 点击事件
    $("#saveBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "setRoleName",
            async: false,
            dataType: "json",
            data: JSON.stringify({
                id: roleId,
                roleName: $("#modal-roleName").val()
            }),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
}

var editId;

/**
 * 显示编辑模态框
 */
function showEditModal(e) {
    // 获取用户编号
    var userId = getUserId(e);
    editId = userId;
    // 清空数据
    $("#editModal").find("input").val("");
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getUserById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            id: userId
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var obj = eval(result.data);
                $("#username").val(obj.username);
                $("#name").val(obj.name);
                $("#age").val(parseInt(obj.age));
                $("#email").val(obj.email);
                if (obj.sex) {
                    $("#sex").prop("checked", true);
                    $("#sex2").prop("checked", false);
                } else {
                    $("#sex").prop("checked", false);
                    $("#sex2").prop("checked", true);
                }
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    // 显示模态框
    $("#editModal").modal("show");
}

/**
 * 更新用户信息
 */
function updateUserInfo() {
    var data = {
        id: editId,
        username: $("#username").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        sex: $("#sex").prop("checked"),
        age: $("#age").val(),
        email: $("#email").val()
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateUser",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 用户删除
 * @param e
 */
function userRemove(e) {
    if(confirm("是否删除该账号？")) {
        var userId = getUserId(e);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "deleteUserById",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                id: userId
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    window.location.reload();   // 刷新页面
                }else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器错误！");
            }
        });
    }

}