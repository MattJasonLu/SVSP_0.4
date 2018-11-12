var setting = {
    view: {
        addHoverDom: addHoverDom,     //鼠标悬停时显示用户自定义的控件，如zTree内部的编辑，删除等
        removeHoverDom: removeHoverDom,//鼠标失去悬停焦点时隐藏用户自定义的控件
        selectedMulti: false          //设置是否允许同事选中多个节点
    },
    edit: {
        enable: true,                  //设置zTree是否处于编辑状态
        editNameSelectAll: true,       //节点编辑名称input初次显示时，设置txt内容是否为权限状态
        showRemoveBtn: showRemoveBtn,   //enable: true时生效，首先触发callback回调函数，判定用户是否进行删除操作；如果未设置beforeRemove或beforeRemove返回true，
                                        //则删除节点并触发callback.onRemove回调函数。
        showRenameBtn: showRenameBtn    //enable: true时生效，先进入节点名称编辑状态，编辑名称完毕(input失去焦点或按下Enter键)，会触发callback.beforeRename
                                        //回调函数，用户可根据自己的规则判定是否允许修改名称，若beforeRename返回false，则继续保持编辑名称状态，直到名称
                                        // 符合规则位置(按下ESC键可取消编辑名称状态，恢复原名称)。若未设置beforeRename或beforeRename返回true，则结束节点
                                        // 编辑名称状态，更新节点名称并触发callback.onRename回调函数。
    },
    data: {
        simpleData: {
            enable: true  //确定zTree初始化时的节点数据、异步加载时的节点数据、或addNodes方法中输入的newNodes诗句是否采用简单数据模式(Array)，不需要
            // 用户再把数据库中取出的List强行转换为复杂的JSON嵌套格式
        }
    },
    callback: {
        beforeDrag: beforeDrag,   //用于捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否开始拖拽操作
        beforeEditName: beforeEditName, //用于捕获及诶单编辑按钮的click事件，并且根据返回值确定是否允许进入名称编辑状态
        beforeRemove: beforeRemove,//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作。
        beforeRename: beforeRename,//用于捕获节点编辑名称结束(input失去焦点或按下Enter键)之后，更新节点名称数据之前的事件回调函数，并根据返回值确定是否允许
        // 更改名称的操作。节点进入编辑名称状态后，按ESC键可以放弃当前修改，恢复原名称，取消编辑名称状态从V3.5.13开始，
        // 取消编辑状态也会触发此回调函数，根据isCancel参数判断
        onRemove: onRemove,//用于捕获节点之后的事件回调函数。
        onRename: onRename //用于捕获节点编辑名称结束之后的事件回调函数。节点进入名称编辑状态，并且就该节点名称后触发此回调函数。如果用户设置了beforeRename回调函数，
        //并返回false，将无法触发onRename事件回调函数，若通过直接修改treeNode的数据，并且利用update方法更新，是不会触发此函数的。
    }
};

var zNodes = [
    {id:1, pId:0, name:"测试专用", open:true},       //id:1(父节点1)                 id:2(父节点2)
    {id:11, pId:1, name:"IT部", open:true},                          //id:11(次父节点1)               id:21(次父节点2)
    {id:111, pId:11, name:"项目组1", file:"test/warehouse1"},         //id:111(次父节点1的子节点1)       id:211(次父节点2的子节点1)
    {id:112, pId:11, name:"项目组2", file:"test/warehouse2"},
    {id:113, pId:11, name:"项目组3", file:"test/warehouse3"},
    {id:114, pId:11, name:"项目组4", file:"test/warehouse4"},
    {id:115, pId:11, name:"项目组5", file:"test/warehouse5"},
    {id:116, pId:11, name:"项目组6", file:"test/warehouse6"},
    {id:117, pId:11, name:"项目组7", file:"test/warehouse7"},
    {id:118, pId:11, name:"项目组8", file:"test/warehouse8"},

    {id:2, pId:0, name:"常州北控安耐得环保科技有限公司", open:false},                  //pId:0(0级节点，即最大父节点)             pId:0(0级节点，即最大父节点)
    {id:21, pId:2, name:"焚烧组"},                                                //pId:1(第一组节点组，上面必须有0级节点)     pId:2(第二组节点组，上面必须有0级节点)
    {id:211, pId:21, name:"焚烧炉1", file:"test/incinerator1"},                   //pId:11(第一组节点组中第一组子节点)         pId:21(第二组节点组中第一组子节点)
    {id:212, pId:21, name:"焚烧炉2", file:"test/incinerator2"},
    {id:213, pId:21, name:"焚烧炉3", file:"test/incinerator3"},
    {id:214, pId:21, name:"焚烧炉4", file:"test/incinerator4"},
    {id:215, pId:21, name:"焚烧炉5", file:"test/incinerator5"},
    {id:216, pId:21, name:"焚烧炉6", file:"test/incinerator6"},
    {id:217, pId:21, name:"焚烧炉7", file:"test/incinerator7"},
    {id:218, pId:21, name:"焚烧炉8", file:"test/incinerator8"}
];

var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
    return false;
}
function beforeEditName(treeId, treeNode) {
    className = (className === "dark" ? "":"dark");
    showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    setTimeout(function() {
       // if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
            setTimeout(function() {
                zTree.editName(treeNode);
            }, 0);
      //  }
    }, 0);
    return false;
}
function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "":"dark");
    showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    return confirm("确认删除" + treeNode.name + " 吗？");
}
function onRemove(e, treeId, treeNode) {
    showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}
function beforeRename(treeId, treeNode, newName, isCancel) {
    className = (className === "dark" ? "":"dark");
    showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    if (newName.length == 0) {
        setTimeout(function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.cancelEditName();
            alert("节点名称不能为空.");
        }, 0);
        return false;
    }
    return true;
}
function onRename(e, treeId, treeNode, isCancel) {
    showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
}
function showRemoveBtn(treeId, treeNode) {
    return !treeNode.isFirstNode;
}
function showRenameBtn(treeId, treeNode) {
    return !treeNode.isLastNode;
}
function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='"+className+"'>"+str+"</li>");
    if(log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now= new Date(),
        h=now.getHours(),
        m=now.getMinutes(),
        s=now.getSeconds(),
        ms=now.getMilliseconds();
    return (h+":"+m+":"+s+ " " +ms);
}

var newCount = 1;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='新增' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_"+treeNode.tId);
    if (btn) btn.bind("click", function(){ // 新增节点
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
        return false;
    });
};
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_"+treeNode.tId).unbind().remove();
};
function selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
}

$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);//根据参数初始化树
    $("#selectAll").bind("click", selectAll);
});

/**
 * 新增功能
 * @param item
 */
function addOrganization(){

}