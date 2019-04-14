var roleId = "";    // 角色ID
var firstMenuName = "";   // 一级菜单名
/**
 * 加载首页数据
 */
function loadData() {
    loadNavigationList();   // 加
    // 载动态菜单
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

    /**
     * 设置数据
     * @param result
     */
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
 * 显示首页配置模态框并设置数据
 * @param e
 */
function firstModalShow(e) {
    roleId = $(e).parent().parent().find("td[name='roleId']").text();   // 获取角色ID
    // 获取页面数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMenuPageList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setPageDataList(result.data);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 显示模态框
    $("#firstModal").modal('show');

    /**
     * 设置页面数据  已选择的隐藏
     * @param data
     */
    function setPageDataList(data) {
        $("#firstMenu").children().remove();   // 删除历史数据
        $.each(JSON.parse(localStorage.getItem("menuOrganization")).organizationList, function (index, item) {   // 循环页面list进行部署
            if (index < data.length - 1) {
                var p = "<p onclick='showChildrenPage(this)' class=\"firstMenu\">" + item.name + "</p><span hidden name=\"id\">" + item.id + "</span>\n" +
                    "                            <hr class=\"firstMenu\">";
            } else {   // 最后一个节点无需分割线
                var p = "<p onclick='showChildrenPage()' class=\"firstMenu\">" + item.name + "</p><span hidden name=\"id\">" + item.id + "</span>\n";
            }
            $("#firstMenu").append(p);   // 插入元素
        });


    }
}

var selectPageList = ["page"];    // 选中的页面url 后台获取

/**
 * 显示该一级菜单下的页面
 */
function showChildrenPage(e) {
    firstMenuName = $(e).text();      // 获取一级菜单名
    // 后台根据一级菜单获取选中页面的url
    var data = {};
    data.id = roleId;
    data.name = firstMenuName;
    $.ajax({
        type: "POST",
        url: "getPageIdListByMenuNameAndRoleId",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
               selectPageList = result.data;
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("获取选中页面失败！");
        }
    });
    $("#menuPage").children().remove();   // 删除历史数据
    $.each(JSON.parse(localStorage.getItem("menuOrganization")).organizationList, function (index, item) {
        if (item.name === firstMenuName) {
            setPageUrlClone(item, selectPageList);    // 设置一级菜单下的页面
            return true;
        }
    });
}

/**
 * 递归遍历设置一级菜单下含url的页面
 * @param data
 * @param selectPageList 已选页面的url list
 */
function setPageUrlClone(data) {
    if (data.organizationList != null && data.organizationList.length > 0) {
        $.each(data.organizationList, function (index, item) {
            if (item.url != null && item.url !== "" && item.url !== "firstPage.html") {
                if (index < data.organizationList.length - 1) {  // 末尾不设分割线
                    if (selectPageList.indexOf(item.id) !== -1) {   // 该页面为已选
                        var p = "<div onclick='setChecked(this)'><input type='checkbox' checked  name='select'><p class=\"firstMenu\">" + item.name + "</p><span hidden name='id'>" + item.id + "</span></div>\n" +
                            "                            <hr class=\"firstMenu\">";
                    } else {
                        var p = "<div onclick='setChecked(this)'><input type='checkbox' name='select'><p class=\"firstMenu\">" + item.name + "</p><span hidden name='id'>" + item.id + "</span></div>\n" +
                            "                            <hr class=\"firstMenu\">";
                    }
                } else {
                    if (selectPageList.indexOf(item.id) !== -1) {   // 该页面为已选
                        var p = "<div onclick='setChecked(this)'><input type='checkbox' checked name='select'><p class=\"firstMenu\">" + item.name + "</p><span hidden name='id'>" + item.id + "</span></div>\n";
                    } else {
                        var p = "<div onclick='setChecked(this)'><input type='checkbox' name='select'><p class=\"firstMenu\">" + item.name + "</p><span hidden name='id'>" + item.id + "</span></div>\n";
                    }

                }
                $("#menuPage").append(p);   // 插入元素
            }
            setPageUrlClone(item);     // 查找子节点
        });
    }
}

/**
 * 设置当前行选中
 * @param e
 */
function setChecked(e) {
    $(e).children().eq(0).find("input[name='select']").attr("checked", true);  // 设置选中
}

/**
 * 保存勾选数据
 */
function save() {
    var organization = {};
    organization.organizationList = [];
    organization.id = parseInt(roleId);   // 用于乘装角色ID
    organization.name = firstMenuName; // 一级菜单名
    // 遍历页面获取选中的页面
    $.each($("#menuPage").children(), function (index, item) {
        if ($(item).find("input[name='select']").length > 0 && $(item).find("input[name='select']:checked").length > 0) {  // 该页面选中
            var organizationItem = {};
            organizationItem.id = $(item).find("span[name='id']").text();   // 获取页面ID
            organization.organizationList.push(organizationItem);   // 插入集合
        }
    });
    $.ajax({
        type: "POST",
        url: "addPageConfiguration",
        async: false,
        dataType: "json",
        data: JSON.stringify(organization),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                alert("保存成功！");
            } else {
                alert("保存失败！");
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}
