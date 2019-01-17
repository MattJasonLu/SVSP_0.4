var roleId = "";

/**
 * 加载角色列表
 */
function loadRoleList() {
    loadNavigationList();   // 加载动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if(result != null && result.status ==="success") {
                   setRoleList(result.data);
            }else {
                console.log(result.message);
            }
        },
        error: function (result) {
            alert("服务器错误，请重新加载！");
        }
    });
}

/**
 * 设置克隆行数据
 * @param result
 */
function setRoleList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    var serialNumber = 0;   // 序号
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        serialNumber++;
        var clonedTr = tr.clone();
        clonedTr.show();
        var obj = eval(item);
        clonedTr.removeAttr("id");
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.insertBefore(tr);
        clonedTr.find("td[name='id']").text(obj.id);
        clonedTr.find("td[name='serialNumber']").text(serialNumber);
        clonedTr.find("td[name='roleName']").text(obj.roleName);
    });
    // 隐藏无数据的tr
    tr.hide();
}


/**
 * 修改角色可选择的仓库列表
 */
function editModal(e) {
    roleId = $(e).parent().parent().find("td[name='id']");   // 获取角色ID
    $.ajax({   // 获取仓库数据
        type: "POST",                       // 方法类型
        url: "listWareHouse",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if(result != null && result.status ==="success") {
                console.log(result);
                setWareHouseList(result.data);
            }else {
                console.log(result.message);
            }
        },
        error: function (result) {
            alert("服务器错误，请重新加载！");
        }
    });
    $("#editModal").modal('show');  // 显示模态框
}

/**
 * 设置仓库克隆行
 * @param result
 */
function setWareHouseList(result) {
// 获取id为cloneTr的tr元素
    var tr = $("#cloneTr1");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var obj = eval(item);
        clonedTr.removeAttr("id");
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.insertBefore(tr);
        clonedTr.find("td[name='wareHouseId']").text(obj.wareHouseId);
        clonedTr.find("td[name='wareHouseName']").text(obj.wareHouseName);
        clonedTr.find("input[name='select']").prop('checked', true);   // 默认全选
    });
    // 隐藏无数据的tr
    tr.hide();
}
// $("input[name='wastesList[" + $i + "].isPH']").prop('checked');
/**
 * 保存修改数据
 */
function saveDate(){
    roleId;
    var length = $("td[name='wareHouseId']").length;   // 获取长度
    // for() {
    //
    // }
}