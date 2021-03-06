var setting = {
    view: {
        addHoverDom: addHoverDom,     //鼠标悬停时显示用户自定义的控件，如zTree内部的编辑，删除等
        removeHoverDom: removeHoverDom,//鼠标失去悬停焦点时隐藏用户自定义的控件
        selectedMulti: false,         //设置是否允许同事选中多个节点
        fontCss: {} // 设置字体
    },
    edit: {
        enable: true,                  //设置zTree是否处于编辑状态
        editNameSelectAll: true,    //节点编辑名称input初次显示时，设置txt内容是否为权限状态
        removeTitle: "删除",            // K
        renameTitle: "命名",        // 设置修改按钮名称
        showRemoveBtn: true,      // 控制是否显示删除按钮
        showRenameBtn: true,      // 控制是否显示修改按钮
        drag: {
            autoExpandTrigger: true, //托拽节点时父节点是否自动展开
            prev: true,            // 是否允许拖拽到目标节点之前
            inner: false,        // 是否允许拖拽到目标节点子节点中
            next: true,           // 是否允许拖拽到目标节点之后
            isCopy: false,        // 拖拽是否进行复制
            isMove: true
        },
    },
    data: {
        simpleData: {
            enable: true  //确定zTree初始化时的节点数据、异步加载时的节点数据、或addNodes方法中输入的newNodes诗句是否采用简单数据模式(Array)，不需要
            // 用户再把数据库中取出的List强行转换为复杂的JSON嵌套格式
        },
        keep: {
            leaf: true,    // 表示叶子节点不能变成根节点
            parent: true   // 表示根节点不能变成叶子节点
        },
    },
    callback: {
        //    beforeDrag: beforeDrag,   //用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否开始拖拽操作
        //   beforeEditName: beforeEditName, //用于捕获及诶单编辑按钮的click事件，并且根据返回值确定是否允许进入名称编辑状态
        beforeRemove: beforeRemove,//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作。
        //  beforeRename: beforeRename,//用于捕获节点编辑名称结束(input失去焦点或按下Enter键)之后，更新节点名称数据之前的事件回调函数，并根据返回值确定是否允许
        beforeClick: beforeClick, // 选中前事件
        beforeRename:beforeRename,
        onRemove: onRemove,// 删除按钮点击后事件
        onRename: onRename, // 编辑按钮点击后事件
        //  beforeDrag: zTreeBeforeDrag,// 拖拽执行前事件
        beforeDrop: beforeDrop, // 拖拽释放前执行事件（用于提示是否执行顺序调换）
        onDrop: onDrop, // 拖拽事件结束之后执行事件
        //    onClick:onclick, // 点击后事件
    }
};

var zNodes = [];

var log, className = "dark";
var organizationId;
var organizationPId;
var organizationName;

/**
 * 重命名事件之前
 */
function beforeRename(){
   return checkAuthorityById(-533);  // 验证权限
}

/**
 *
 * @param treeId
 * @param treeNode
 */
function beforeClick(treeId, treeNode) {
    organization1.id = treeNode.id;
    organization1.pId = treeNode.pId;
    organization1.name = treeNode.name;
    organizationId = organization1.id;
    organizationPId = organization1.pId;
    organizationName = organization1.name;
    if (treeNode.isParent) { //是否有子节点
        $("#url").hide(); // 隐藏
        if (treeNode.pId === 1) {// 判断是否是一级菜单
            if(checkAuthorityById(-544)) {  // 验证权限
                showIcon(treeNode);
            }
        } else {
            return false;
        }
    } else {  // 没有则显示出选择页面
        if(checkAuthorityById(-543)) {  // 验证权限
            showUrl(treeNode);
        }
    }
}

/**
 * 显示一级菜单图标
 */
function showIcon(treeNode) {
    var div = "<div class=\"col-md-2\" id='icon1'>\n" +
        "<div id=\"icon\" >\n" +
        "<div style=\"overflow-y:scroll;height: 300px;overflow-x:scroll;\" id='scroll'>\n" +
        "<table class=\"table table-striped table-hover table-condensed\">\n" +
        "<thead>\n" +
        "<tr>\n" +
        "<th class=\"text-center\">\n" +
        "<input id=\"search1\" style=\"\" type=\"text\" class=\"form-control\"\n" +
        "placeholder=\"请输入查询内容\" onkeyup=\"searchIcon()\">\n" +
        "</th>\n" +
        "<th class=\"text-center\">编号</th>\n" +
        "<th class=\"text-center\">名称</th>\n" +
        "<th class=\"text-center\">图标</th>\n" +
        "</tr>\n" +
        "</thead>\n" +
        "<tbody id=\"tbody2\">\n" +
        "<tr id=\"cloneTr2\">\n" +
        "<td class=\"text-center\">\n" +
        "<label>\n" +
        "<input name=\"select1\" class=\"radio\" type=\"radio\"\n" +
        "value=\"option1\"\n" +
        "aria-label=\"...\">\n" +
        "</label>\n" +
        "</td>\n" +
        "<td class=\"text-center\" name=\"id\">1</td>\n" +
        "<td class=\"text-center\" name=\"name\">list</td>\n" +
        "<td class=\"text-center\" name=\"icon\"></td>\n" +
        "</tr>\n" +
        "</tbody>\n" +
        "</table>\n" +
        "</div>\n" +
        "<div class=\"row text-center\">\n" +
        "<a class=\"btn btn-success\" id=\"save1\" onclick=\"saveIcon();\">保存</a>\n" +
        "<a class=\"btn btn-danger\" onclick=\"cancel1();\">取消</a>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>";
    $("#url1").remove();   // 删除链接设置页面
    $("#icon1").remove(); // 删除之前页面
    $("#zTree").after(div);  // 插入
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadFirstMenuIconList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status == 'success') {
                setDataListIcon(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
}

/**
 * 设置一级菜单图标
 * @param result
 */
function setDataListIcon(result) {
    var data = {};
    $.ajax({  // 获取该页面的链接
        type: "POST",                       // 方法类型
        url: "getMenuById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: organization1.id
        },
        dataType: "json",
        success: function (result) {
            if (result != null && result.status == 'success') {
                data = result.data;
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
    var tr = $("#cloneTr2");
    tr.siblings().remove();
    if (result.data != null){
        $.each(result.data, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            if (data.icon != null && data.icon != "" && data.icon === item.icon) { // 如果设置过超链接则将其单选项选中
                clonedTr.find("input[name='select1']").attr("checked",true);  //设置单选框选中
                clonedTr.find("input[name='select1']").attr("id","select2");  // 用于滚动条定位
            }
            clonedTr.find("td[name='id']").text(item.id);
            clonedTr.find("td[name='name']").text(item.name);
            var span = "<span class='" + item.icon + "' aria-hidden='true'></span>";
            clonedTr.find("td[name='icon']").append(span);
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.addClass('myclass');
            clonedTr.insertBefore(tr);
        });
        // 删除无数据的tr
        tr.remove();
        if($("#select2").length > 0){
            var Y =$("#select2").parent().parent().parent().offset().top;  //取得对应组件的坐标
            $("#scroll").scrollTop(Y - 350);    //设置滚动条位置
        }
    }
}

/**
 * 查询图标
 */
function searchIcon() {
    $('.myclass').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass'));
    var text = $.trim($('#search1').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            if (($(this).children('td').text().indexOf(text) == -1)) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1) {
                array1.push($(this));
            }
        });
    }
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tbody2').append(this);
        });
    }

    if (text.length <= 0) {
        $('.myclass').each(function () {
            $(this).show();
        })
    }
}


/**
 * 显示所有页面url
 */
function showUrl(treeNode) {
    var div = "<div class=\"col-md-3\" id=\"url1\">\n" +
        "<div id=\"url\" >\n" +
        "<div style=\"overflow-y:scroll;height: 500px;overflow-x:scroll;\" id='scroll1'>\n" +
        "<table class=\"table table-striped table-hover table-condensed\">\n" +
        "<thead>\n" +
        "<tr>\n" +
        "<th class=\"text-center\">\n" +
        "<input id=\"search\" style=\"width: 150px\" type=\"text\" class=\"form-control\"\n" +
        "placeholder=\"请输入查询内容\" onkeyup=\"search()\">\n" +
        "</th>\n" +
        "<th class=\"text-center\">编号</th>\n" +
        "<th class=\"text-center\">名称</th>\n" +
        "<th class=\"text-center\">链接</th>\n" +
        "<th class=\"text-center\" hidden>图标</th>\n" +
        "</tr>\n" +
        "</thead>\n" +
        "<tbody id=\"tbody1\">\n" +
        "<tr id=\"cloneTr\">\n" +
        "<td class=\"text-center\">\n" +
        "<label>\n" +
        "<input name=\"select\" class=\"radio\" type=\"radio\"\n" +
        "value=\"option1\"\n" +
        "aria-label=\"...\">\n" +
        "</label>\n" +
        "</td>\n" +
        "<td class=\"text-center\" name=\"id\"></td>\n" +
        "<td class=\"text-center\" name=\"name\"></td>\n" +
        "<td class=\"text-center\" name=\"url\" onclick=\"toUrl(this)\"></td>\n" +
        "<td class=\"text-center\" name=\"icon\" hidden></td>\n" +
        "</tr>\n" +
        "</tbody>\n" +
        "</table>\n" +
        "</div>\n" +
        "<div class=\"row text-center\">\n" +
        "<a class=\"btn btn-success\" id=\"save\" onclick=\"save();\">保存</a>\n" +
        "<a class=\"btn btn-danger\" onclick=\"cancel();\">取消</a>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>";
    $("#icon1").remove();     // 删除图标设置页面
    $("#url1").remove();  // 删除之前数据
    $("#zTree").after(div);  // 插入
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMenuPageList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status == 'success') {
                setDataList(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
}

/**
 * 设置页面链接数据
 * @param result
 */
function setDataList(result) {
    var data = {};
    $.ajax({  // 获取该页面的链接
        type: "POST",                       // 方法类型
        url: "getMenuById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: organization1.id
        },
        dataType: "json",
        success: function (result) {
            if (result != null && result.status == 'success') {
                data = result.data;
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
    var tr = $("#cloneTr");
    tr.siblings().remove();
    if (result.data != null){
        $.each(result.data, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            if (data.url != null && data.url != "" && data.url === item.url) { // 如果设置过超链接则将其单选项选中
                clonedTr.find("input[name='select']").attr("checked", true);
                clonedTr.find("input[name='select']").attr("id","select2");  // 用于滚动条定位
            }
            clonedTr.find("td[name='id']").text(item.id);
            clonedTr.find("td[name='name']").text(item.name);
            clonedTr.find("td[name='url']").text(item.url);
            clonedTr.find("td[name='icon']").text(item.icon);
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.addClass('myclass');
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.remove();
        if($("#select2").length > 0){
            var Y =$("#select2").parent().parent().parent().offset().top;  //取得对应组件的坐标
            $("#scroll1").scrollTop(Y - 400);    //滚动条定位
        }
    }

}

/**
 * 取消
 */
function cancel() {
    $("#url1").remove(); // 隐藏
}

/**
 * 取消
 */
function cancel1() {
    $("#icon1").remove(); // 隐藏
}

/**
 * 保存链接
 */
function save() {
    var tr = $("input[name='select']:checked").parent().parent().parent();
    organization1.id = organizationId;
    organization1.pId = organizationPId;
    organization1.name = organizationName;
    organization1.url = tr.find("td[name='url']").text(); // 获取链接
    organization1.icon = tr.find("td[name='icon']").text(); // 获取图标
    console.log("保存：");
    console.log(organization1);
    if (organization1 != null && organization1.url != '' && organization1.id != null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updateMenuUrl",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(organization1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status == "success") {
                    alert("保存成功！");
                    //window.location.reload(); // 重新设置页面
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
    } else if (organization1.id == null) {
        alert("保存失败，编号丢失！");
    }
}

/**
 * 保存图标
 */
function saveIcon() {
    var tr = $("input[name='select1']:checked").parent().parent().parent();
    organization1.id = organizationId;
    organization1.pId = organizationPId;
    organization1.name = organizationName;
    organization1.icon = tr.find("td[name='icon']").find("span").eq(0).attr("class"); // 获取图标
    console.log(organization1);
    if (organization1 != null && organization1.icon != '') {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updateMenuIcon",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(organization1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status == "success") {
                    alert("保存成功！");
                    window.location.reload(); // 重新设置页面
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
    }
}

/**
 * 拖拽释放之前执行事件
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 */
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    if(checkAuthorityById(-542)) {  // 验证权限
        var oldPid = treeNodes[0].pId;
        var targetPid = targetNode.pId;
        if (oldPid != targetPid) {
            alert("只能移动同一级菜单下的节点");
            return false;
        }
    }else{
        return false;
    }
}

/**
 * 节点拖拽完成后的事件
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 */
function onDrop(treeId, treeNodes, targetNode, moveType) {
    var childrenNodes = targetNode[0].getParentNode().children;
    var result = "";
    for (var i = 0; i < childrenNodes.length; i++) {
        if (i > 0) result += "/";
        result += childrenNodes[i].id;
    }
    var pId = targetNode[0].pId;
    console.log("ID");
    console.log(result);
    if (result != "") {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updateMenuOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                idList: result,
                pId: pId,
            },
            dataType: "json",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status == "success") {
                    window.location.reload(); // 重新设置页面
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
    }

}

function beforeRemove(treeId, treeNode) {
    if(checkAuthorityById(-534)) {  // 验证权限
        if (treeNode.id === 1) { // 主节点不可删除
            alert("不可删除！");
            return false;
        }
        return confirm("确认删除" + treeNode.name + " 吗？");
    }else{
        return false;
    }
}

/**
 * 删除功能
 * */
function onRemove(e, treeId, treeNode) {
    organization1.id = treeNode.id;
    organization1.pId = treeNode.pId;
    organization1.name = treeNode.name;
    console.log("删除的数据：");
    console.log(organization1);
    if (organization1 != null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "deleteMenu",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(organization1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status == "success") {
                    window.location.reload(); // 重新设置页面
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
    }
}

/**
 * 重命名
 * */
function onRename(e, treeId, treeNode, isCancel) {
    organization1.id = treeNode.id;
    organization1.pId = treeNode.pId;
    organization1.name = treeNode.name;
    console.log("数据：");
    console.log(organization1);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMenuByName",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(organization1),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            // console.log(result);
            if (result != null && result.status == "success" && result.data != null) {
                alert("名称重复！");
                window.location.reload();
            } else if (result != null && result.data == null) { // 如果不存在改名字则进行改名
                if (organization1 != null) {
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "updateMenuName",                  // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        data: JSON.stringify(organization1),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            // console.log(result);
                            if (result != null && result.status == "success") {
                                // window.location.reload(); // 重新设置页面
                            } else {
                                alert(result.message);
                            }
                        },
                        error: function (result) {
                            alert(result.message);
                        }
                    });
                }
            }
        },
        error: function (result) {
            alert(result.message);
        }
    });
}

function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}

function getTime() {  // 获取当前时间
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}

var newCount = 1;       // 新节点个数，起始值为1
var organization1 = {};   // 承装需要修改/删除/新增的数据
/**
 * 鼠标悬浮时事件
 * */
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add buttonOrganizationAdd' id='addBtn_" + treeNode.tId
        + "' title='新增' onfocus='this.blur();' ></span>";
    sObj.after(addStr); // 插入新增按钮
    // if (treeNode.id > 99)   // 最后一层不设新增按钮
    //$("#addBtn_" + treeNode.tId).hide(); // 最后一层隐藏新增按钮
    organization1 = {};  // 初始化
    var btn1 = $(".buttonOrganizationAdd"); // 获取对象
    if (btn1) btn1.bind("click", function () { // 新增事件
        organization1.id = treeNode.id;
        organization1.pId = treeNode.pId;
        organization1.name = treeNode.name;
        addMenu();  // 新增
    });
};

/**
 * 鼠标移开事件
 * */
function removeHoverDom(treeId, treeNode) { // 鼠标移开后删除按钮
    $("#editBtn_" + treeNode.tId).unbind().remove();
    $("#removeBtn_" + treeNode.tId).unbind().remove();
    $("#addBtn_" + treeNode.tId).unbind().remove();
};

function selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
}

$(document).ready(function () {
    $('.loader').show();  // 显示进度条
    getMenuTree();   // 更新动态菜单树状结构数据
    loadNavigationList(); // 设置动态菜单
    loadMenu();  // 获取并设置节点数据
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);//根据参数初始化树
    $('.loader').hide();  // 隐藏进度条
    $("#selectAll").bind("click", selectAll);
});

function getMenuTree(){
    // 获取动态菜单数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMenuTree",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === "success") {
                var obj = JSON.stringify(result.data);
                localStorage.setItem("menuOrganization", obj);
            }
        },
        error: function (result) {
            console.log(result.message);
        }
    });
}

/**
 * 新增功能
 * @param item
 */
function addMenu(item) {
    if(checkAuthorityById(-532)) {  // 验证权限
        organization1.level = organization1.id.toString().length;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentUserInfo",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status === "success") {
                    organization1.founder = result.data.name;  // 设置登陆用户名
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
        console.log(organization1);
        if (organization1 != null) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "addMenu",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(organization1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    // console.log(result);
                    if (result != null && result.status == "success") {
                        window.location.reload(); // 刷新页面
                    } else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert(result.message);
                }
            });
        }
    }
}

/**
 * 显示
 */
function loadMenu() {
    zNodes = [];  // 清空数组
    organization1 = {}; // 初始化
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMenuList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status == 'success') {
                var data = result.data;
                // 设置数组
                for (var i = 0; i < data.length; i++) {
                    var organization = {};
                    organization.id = data[i].id; // 设置节点数据
                    organization.pId = data[i].pId;
                    organization.name = data[i].name;
                    // if (data[i].id < 10 || (data[i].id == 11)) // 公司默认展开
                    if (data[i].pId === 0) { // 设置
                        organization.icon = "image/page/menu-one.png";
                        organization.open = true;   // 设置下拉是否展开
                    } else if (0 < data[i].pId && data[i].pId < 10) { // 设置一级菜单
                        organization.open = false;   // 设置下拉是否展开
                        organization.icon = "image/page/menu-two.png";
                    } else if (data[i].pId < 100) { // 设置二级菜单
                        organization.icon = "image/page/menu-three.png";
                        organization.open = false;   // 设置下拉是否展开
                    } else if (data[i].pId >= 100) { // 设置图标
                        organization.icon = "image/page/menu-four.png";
                        organization.open = false;   // 设置下拉是否展开
                    }
                    zNodes.push(organization);  // 将节点添加到LIST中
                }
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
}

/**
 * 查询
 */
function search() {
    $('.myclass').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass'));
    var text = $.trim($('#search').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            if (($(this).children('td').text().indexOf(text) == -1)) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1) {
                array1.push($(this));
            }
        });
    }
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tbody1').append(this);
        });
    }

    if (text.length <= 0) {
        $('.myclass').each(function () {
            $(this).show();
        })
    }
}

/**
 * 点击跳转页面
 * @param item
 */
function toUrl(item) {
    window.location.href = $(item).text();
}