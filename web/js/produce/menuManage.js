var setting = {
    view: {
        addHoverDom: addHoverDom,     //鼠标悬停时显示用户自定义的控件，如zTree内部的编辑，删除等
        removeHoverDom: removeHoverDom,//鼠标失去悬停焦点时隐藏用户自定义的控件
        selectedMulti: false,         //设置是否允许同事选中多个节点
        fontCss: { } // 设置字体
    },
    edit: {
        enable: true,                  //设置zTree是否处于编辑状态
        editNameSelectAll: true,    //节点编辑名称input初次显示时，设置txt内容是否为权限状态
        removeTitle: "删除",            // K
        renameTitle: "编辑",        // 设置修改按钮名称
        showRemoveBtn: true,   // 控制是否显示删除按钮
        showRenameBtn: true    // 控制是否显示修改按钮
    },
    data: {
        simpleData: {
            enable: true  //确定zTree初始化时的节点数据、异步加载时的节点数据、或addNodes方法中输入的newNodes诗句是否采用简单数据模式(Array)，不需要
            // 用户再把数据库中取出的List强行转换为复杂的JSON嵌套格式
        }
    },
    callback: {
        //    beforeDrag: beforeDrag,   //用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否开始拖拽操作
        //   beforeEditName: beforeEditName, //用于捕获及诶单编辑按钮的click事件，并且根据返回值确定是否允许进入名称编辑状态
        beforeRemove: beforeRemove,//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作。
        //  beforeRename: beforeRename,//用于捕获节点编辑名称结束(input失去焦点或按下Enter键)之后，更新节点名称数据之前的事件回调函数，并根据返回值确定是否允许
        onRemove: onRemove,// 删除按钮点击后事件
        onRename: onRename // 编辑按钮点击后事件
    }
};

var zNodes = [

];

var log, className = "dark";

function beforeRemove(treeId, treeNode) {
    return confirm("确认删除" + treeNode.name + " 吗？");
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
    if (treeNode.id > 99)   // 最后一层不设新增按钮
        $("#addBtn_" + treeNode.tId).hide(); // 最后一层隐藏新增按钮
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
    loadMenu();  // 获取并设置节点数据
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);//根据参数初始化树
    $("#selectAll").bind("click", selectAll);
});

/**
 * 新增功能
 * @param item
 */
function addMenu(item) {
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
                    if (data[i].id < 10 || (data[i].id == 11)) // 公司默认展开
                        organization.open = true;   // 设置下拉是否展开
                    if (data[i].id < 10) { // 设置功能图标
                        organization.icon = "image/organization-company.png";
                    } else if (data[i].id < 100) { // 设置部门图标
                        organization.icon = "image/organization-department.png";
                    } else if (data[i].id < 1000) { // 设置项目组图标
                        organization.icon = "image/organization-team.png";
                    }
                    zNodes.push(organization);  // 将节点添加到LIST中
                }
                console.log(zNodes);
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