/**
 * 分页 获取首页内容
 * */
function loadPageList() {
    loadNavigationList();   // 动态菜单部署
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listWareHouse",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setData(result.data);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
            console.log("失败");
        }
    });
}

/**
 * 设置数据
 * @param result
 */
function setData(result) {
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
                case (0):
                    $(this).html(obj.wareHouseId);
                    break;
                case (1):
                    $(this).html(obj.wareHouseCode);
                    break;
                case (2):
                    $(this).html(obj.wareHouseName);
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

/**
 * 增加仓库
 */
function addWareHouse() {
    var data = {
        wareHouseName: $("#wareHouseName").val(),
        wareHouseCode: $("#wareHouseCode").val()
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addWareHouse",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
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
            console.log("失败");
        }
    });
}

var editId;
/**
 * 显示修改框体
 * @param e
 */
function showEditModal(e) {
    var id = getId(e);
    editId = id;
    var data = {
        id: id
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWareHouseById",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: data,
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // 显示原有信息
                console.log(result);
                var obj = eval(result.data);
                $("#editWareHouseCode").val(obj.wareHouseCode);
                $("#editWareHouseName").val(obj.wareHouseName);
                $("#editModal").modal('show');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            console.log("失败");
        }
    });

}

/**
 * 更新信息
 */
function updateWarehouse() {
    var data = {
        wareHouseId: editId,
        wareHouseName: $("#editWareHouseName").val(),
        wareHouseCode: $("#editWareHouseCode").val()
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateWareHouse",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
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
            console.log("失败");
        }
    });
}

/**
 * 通过编号删除仓库
 * @param e
 */
function deleteWarehouse(e) {
    var r = confirm("是否删除？");
    if (r) {
        var id = getId(e);
        var data = {
            id: id
        };
        $.ajax({
            type: "POST",                       // 方法类型
            url: "deleteWareHouseById",   // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: data,
            dataType: "json",
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
                console.log("失败");
            }
        });
    }
}

function show2() {
    $("#modalId").modal('show');
}

function getId(e) {
    return $(e).parent().parent().find("td[name='id']").text();
}