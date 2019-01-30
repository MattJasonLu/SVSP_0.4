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
        showRenameBtn: false,      // 控制是否显示修改按钮
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
        beforeRename: beforeRename,
        onRemove: onRemove,// 删除按钮点击后事件
        onRename: false, // 编辑按钮点击后事件
        //beforeDrag: zTreeBeforeDrag,// 拖拽执行前事件
        beforeDrop: false, // 拖拽释放前执行事件（用于提示是否执行顺序调换）
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
function beforeRename() {
    return false;  //
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
    showUrl(treeNode);
}

/**
 * 显示更新名称和编码页面
 */
function showUrl(treeNode) {
    var div = "<div class=\"col-md-3\" id=\"url1\">\n" +
        "<div>\n" +
        "<table class=\"table table-striped table-hover table-condensed\">\n" +
        "<thead>\n" +
        "<tr>\n" +
        "<th class=\"text-center\">编码</th>\n" +
        "<th class=\"text-center\">名称</th>\n" +
        "<th class=\"text-center\">规格</th>\n" +
        "<th class=\"text-center\">计量单位</th>\n" +
        "<th class=\"text-center\">类别</th>\n" +
        "</tr>\n" +
        "</thead>\n" +
        "<tbody id=\"tbody1\">\n" +
        "<tr id=\"cloneTr\">\n" +
        "<td class=\"text-center\" ><input class='text-center' id='id'></td>\n" +
        "<td class=\"text-center\" ><input class='text-center' id='name'></td>\n" +
        "<td class=\"text-center\" ><input class='text-center' id='specification'></td>\n" +
        "<td class=\"text-center\" ><select class='text-center' id='unit'></select></td>\n" +
        "<td class=\"text-center\" ><select class='text-center' id='materialCategoryItem'></select></td>\n" +
        "</tr>\n" +
        "</tbody>\n" +
        "</table>\n" +
        "</div>\n" +
        "<div class=\"row text-center\">\n" +
        "<a class=\"btn btn-success\" id=\"save\" onclick=\"save();\">保存</a>\n" +
        "<a class=\"btn btn-danger\" onclick=\"cancel();\">取消</a>\n" +
        "</div>\n" +
        "</div>";
    $("#url1").remove();  // 删除之前数据
    $("#zTree").after(div);  // 插入
    // 设置计量单位下拉框
    $.ajax({
        type: "POST",
        url: "getUnitByDataDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status === "success") {
                var data = eval(result.data);
                console.log(result);
                // 高级检索下拉框数据填充
                var unit = $("#unit");
                unit.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unit.append(option);
                });
                unit.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
    $.ajax({  // 物资类别
        type:'POST',
        url:"getMaterialCategoryByDataDictionary",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                console.log(result);
                var materialCategoryItem=$('#materialCategoryItem');
                materialCategoryItem.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    materialCategoryItem.append(option);
                });
                materialCategoryItem.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getIngredientsTreeById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: treeNode.id
        },
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === 'success' && result.data != null) {
                $("#id").val(result.data.id);
                $("#name").val(result.data.name);
                $("#specification").val(result.data.specification);
                if (result.data.unitDataItem != null) {
                    $("#unit").val(result.data.unitDataItem.dataDictionaryItemId);
                }
                if(result.data.materialCategoryItem != null) {
                    $("#materialCategoryItem").val(result.data.materialCategoryItem.dataDictionaryItemId);
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
 * 取消
 */
function cancel() {
    $("#url1").remove(); // 隐藏
}

/**
 * 保存更新的数据
 */
function save() {
    var ingredientsTree = {};
    ingredientsTree.id = organizationId;  // 旧编码（ID）
    ingredientsTree.code = $("#id").val();
    ingredientsTree.name = $("#name").val();
    ingredientsTree.specification = $("#specification").val();
    var unitDataItem = {};
    unitDataItem.dataDictionaryItemId = $("#unit").find("option:checked").val();
    ingredientsTree.unitDataItem = unitDataItem;
    var materialCategoryItem = {};
    materialCategoryItem.dataDictionaryItemId = $("#materialCategoryItem").find("option:checked").val();
    ingredientsTree.materialCategoryItem = materialCategoryItem;
    console.log("保存：");
    console.log(ingredientsTree);
    if (ingredientsTree != null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updateIngredientsTree",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(ingredientsTree),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status === "success") {
                    alert("保存成功！");
                    $("#url1").hide();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
    } else if (ingredientsTree.id == null) {
        alert("保存失败，编号丢失！");
    }
}

/**
 * 删除执行之前事件
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
function beforeRemove(treeId, treeNode) {
    //if(checkAuthorityById(-534)) {  // 验证权限
    if (treeNode.id === 0) { // 主节点不可删除
        alert("不可删除！");
        return false;
    }
    return confirm("确认删除" + treeNode.name + " 吗？");
}

/**
 * 删除功能
 * */
function onRemove(e, treeId, treeNode) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "deleteIngredientsTreeById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: treeNode.id
        },
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === "success") {
                //window.location.reload(); // 重新设置页面
            } else {
                alert(result.message);
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
    // if (treeNode.id < 1)   // 最后一层不设新增按钮
    // $("#addBtn_" + treeNode.tId).hide(); // 最后一层隐藏新增按钮
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

/**
 * 首页加载
 */
$(document).ready(function () {
    $('.loader').show();  // 显示进度条
    loadNavigationList(); // 设置动态菜单
    loadIngredientsTreeList();  // 获取并设置节点数据
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);//根据参数初始化树
    $('.loader').hide();  // 隐藏进度条
    $("#selectAll").bind("click", selectAll);
});

/**
 * 新增功能
 * @param item
 */
function addMenu(item) {
    var ingredientsTree = {};
    ingredientsTree.pId = organization1.id;
    if (organization1 != null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addIngredientsTree",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(ingredientsTree),
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
function loadIngredientsTreeList() {
    zNodes = [];  // 清空数组
    organization1 = {}; // 初始化
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadIngredientsTreeList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === 'success') {
                var data = result.data;
                // 设置数组
                for (var i = 0; i < data.length; i++) {
                    var ingredientsTree = {};
                    ingredientsTree.id = data[i].id; // 设置节点数据
                    ingredientsTree.pId = data[i].pId;
                    if (data[i].specification != null && data[i].specification !== "null") {
                        ingredientsTree.name = data[i].name + ":" + data[i].specification;
                    } else {
                        ingredientsTree.name = data[i].name;
                    }
                    // if (data[i].id < 10 || (data[i].id == 11)) // 公司默认展开
                    if (data[i].pId <= 0) { // 设置
                        ingredientsTree.icon = "image/page/menu-one.png";
                        ingredientsTree.open = true;   // 设置下拉是否展开
                    } else if (0 < data[i].pId && data[i].pId < 10) { // 设置一级菜单
                        ingredientsTree.open = false;   // 设置下拉是否展开
                        ingredientsTree.icon = "image/page/menu-two.png";
                    } else if (data[i].pId < 100) { // 设置二级菜单
                        ingredientsTree.icon = "image/page/menu-three.png";
                        ingredientsTree.open = false;   // 设置下拉是否展开
                    } else if (data[i].pId >= 100) { // 设置图标
                        ingredientsTree.icon = "image/page/menu-four.png";
                        ingredientsTree.open = false;   // 设置下拉是否展开
                    }
                    zNodes.push(ingredientsTree);  // 将节点添加到LIST中
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
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").show();
}

function closeModal() {
    $("#importExcelModal").hide();
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/辅料物品树状导入模板.xlsx';
    window.open('downloadFile?filePath=' + filePath);
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importIngredientsTreeExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result.status == "success") {
                        alert(result.message);
                        window.location.reload();         //刷新
                    } else {
                        alert(result.message);
                        window.location.reload();
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
}