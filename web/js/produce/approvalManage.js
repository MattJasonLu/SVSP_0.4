var currentPage = 1;                          //当前页数
var data = {};
var approvalProcessId = "";

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchApprovalManageTotal",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result > 0) {
                totalRecord = result;
            } else {
                console.log("fail: " + result);
                totalRecord = 0;
            }
        },
        error: function (result) {
            console.log("error: " + result);
            totalRecord = 0;
        }
    });
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();          // 删除之前克隆页码
    setDataList(result);             // 设置数据
    $("#next").prev().hide();            // 将页码克隆模板隐藏
    var total = totalPage();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    for (var i = 0; i < total; i++) {
        var li = $("#next").prev();
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(i + 1);          // 页数赋值
        clonedLi.find('a:first-child').click(function () {    // 设置点击事件
            var num = $(this).text();
            switchPage(num);        // 跳转页面
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页码标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber == totalPage()) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage()) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(currentPage);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    data.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchApprovalManage",         // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined) {
                setDataList(result.data);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter(pageNumber);
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchApprovalManage",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setDataList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
}

/**
 * 分页 获取首页内容
 * */
function loadPageWayBillList() {
    loadNavigationList(); // 设置动态菜单
    var pageNumber = 1;               // 显示首页
    currentPage = pageNumber;
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    data.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchApprovalManage",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 设置克隆数据
 * @param result
 */
function setDataList(result) {
    $('#tBody').empty();  // 删除旧数据
    $.each(result, function (index, item) {    // 遍历数据并插入
        var tr = "<tr>\n" +
            "                        <td class=\"text-center\">\n" +
            "                            <label>\n" +
            "                                <input name=\"select\" class=\"checkbox\" type=\"checkbox\" id=\"blankCheckbox\" value=\"option1\" aria-label=\"...\">\n" +
            "                            </label>\n" +
            "                        </td>\n" +
            "                        <td class=\"text-center\">" + item.id + "</td>\n" +
            "                        <td class=\"text-center\">" + item.type + "</td>\n" +
            "                        <td class=\"text-center\">" + getDateStr(item.creationDate) + "</td>\n" +
            "                        <td class=\"text-center\">" + item.creator + "</td>\n" +
            "                        <td class=\"dropdown text-center\">\n" +
            "                            <a href=\"#\" title=\"编辑\" onclick=\"showEditModal(this)\"><span class=\"glyphicon glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>\n" +
            "                            <a href=\"#\" title=\"链接配置\" onclick=\"hrefShow(this)\"><span class=\"glyphicon glyphicon-retweet\" aria-hidden=\"true\"></span></a>\n" +
            "                            <a href=\"#\" title=\"删除\" onclick='deleteModelById(this)'><span class=\"glyphicon glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a>\n" +
            "                        </td>\n" +
            "                    </tr>";
        $('#tBody').append(tr);   // 插入新数据
    });
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp === 0) {
                searchData();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        }, 600);
    });
});

/**
 * 查询功能
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    data = {};   // 清空历史数据
    if ($("#senior").is(':visible')) {
        data = {
            type: $.trim($("#search_type").val()),
            creator: $.trim($("#search_creator").val()),
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
        data = {
            page: page,
            keywords: keywords
        }
    }
    console.log("查询数据");
    console.log(data);
    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchApprovalManage",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result.data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
}


//////////////////////
/**
 * 打开编辑模态框
 */
function showEditModal(e) {
    $.ajax({  // 获取所有角色数据
        type: "POST",                            // 方法类型
        url: "listRole",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success") {
                var role = $("select[name='role']");
                $.each(result.data, function (index, item) {   // 设置角色下拉框
                    var option = $('<option />');
                    option.val(item.id);
                    option.text(item.roleName);
                    role.append(option);
                });
                $("select[name='role']").val(-1);   // 初始化
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("服务器错误！");
        }
    });
    approvalProcessId = $(e).parent().parent().children().eq(1).text();  // 获取审批流ID
     // 根据编号获取数据
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getApprovalProcessModelById",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: parseInt(approvalProcessId)
        },
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success") {
                var data = eval(result.data);
                $("#edit_type").val(data.type);
                $(".oldLine").remove();   // 清空历史行
                var tr = $("#cloneTr1");
                tr.hide();
                var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";
                $.each(data.approvalNodeList, function (index, item) {
                    var cloneTr = tr.clone();
                    cloneTr.show();
                    cloneTr.children('td').eq(0).find("a").remove();  // 删除旧按钮
                    cloneTr.children('td').eq(0).append(delBtn);   // 增加减行按钮
                    // 赋值
                    cloneTr.find("input[name='id']").val(item.id);
                    cloneTr.find("select[name='role']").val(item.roleId);
                    cloneTr.find("span[name='approvalPId']").text(item.approvalPId);
                    cloneTr.addClass("oldLine");    // 添加class
                    $("#edit_plus").before(cloneTr);   // 插入新数据
                });
                if($(".oldLine").length > 0){  // 存在行数
                    tr.hide();  // 隐藏模板行
                }
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("服务器错误！");
        }
    });
    $("#editModal").modal("show");   // 显示编辑模态框

}

/**
 * 打开新增模态框
 */
function showNewAddModal() {
    $(".oldLine").remove();  // 删除历史数据
    $(".id").val("");
    $(".type").val("");
    $.ajax({  // 获取所有角色数据
        type: "POST",                            // 方法类型
        url: "listRole",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success") {
                var role = $("select[name='role']");
                $.each(result.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.id);
                    option.text(item.roleName);
                    role.append(option);
                });
                $("select[name='role']").val("");   // 初始化
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("服务器错误！");
        }
    });
    approvalProcessId = "";  // 清空审批流编号
    $("#newAddModal").modal("show");   // 显示新增模态框
}

/**
 * 设置审批流ID
 * @param e
 */
function setApprovalId(e) {
    approvalProcessId = $(e).val();   // 获取并设置审批流ID
}

/**
 * 保存新增审批流数据
 */
function saveNewApproval() {
    var approvalProcess = {};
    approvalProcess.id = parseInt(approvalProcessId);   // 审批流编号
    approvalProcess.type = $(".type").val();
    var roleIdList = [];  // 选择的角色集合
    var idList = [];    // 编号集合：检测是否重复
    approvalProcess.approvalNodeList = [];   // 节点集合
    var user = getCurrentUserData();  // 获取当前登陆人信息
    if (user != null) {
        approvalProcess.modifier = user.name;
        approvalProcess.creator = user.name;
    } else {
        approvalProcess.modifier = "未登录";
        approvalProcess.creator = "未登录";
    }
    $.each($("#add_plus").prevAll().not($("#cloneTr4")), function (index, item) {  // 获取节点数据
        var approvalNode = {};
        var id = $(this).find("input[name='id']").val();
        if(id === ""){
            alert("编号不能为空！");
            $(this).find("input[name='id']").focus();  // 获取鼠标焦点
            return false;
        }else if(idList.indexOf(id) !== -1){
            alert("编号不能重复！");
            $(this).find("input[name='id']").focus();  // 获取鼠标焦点
            return false;
        }else{
            idList.push(id);
            approvalNode.id = id;
        }
        var roleId = $(this).find("select[name='role']").val();
        if(roleId != null && roleId !== undefined && roleId !== ""){
            approvalNode.roleId = roleId;
        }else {
            alert("角色不能为空！");
            $(this).find("select[name='role']").focus();  // 获取鼠标焦点
            return false;
        }
        approvalNode.approvalPId = $(this).find("span[name='approvalPId']").text();
        approvalNode.approvalProcessId = approvalProcessId;   // 外键ID
        approvalProcess.approvalNodeList.push(approvalNode);
        if(roleIdList.indexOf(roleId) !== -1){  // 如果存在则提醒
            alert("角色不能重复！");
            $(this).find("select[name='role']").val("");
            $(this).find("select[name='role']").focus();   // 获取鼠标焦点
            return false;
        }else {  // 不存在则添加
            roleIdList.push(roleId);
        }
    });
    console.log("保存数据为：");
    console.log(approvalProcess);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addApprovalModel",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(approvalProcess),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}

/**
 * 编辑功能加行
 * @param item
 */
function addNewLine(item) {
    // 获取上一行tr
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide();
    clonedTr.attr('class', 'oldLine');
    clonedTr.show();
    // 清空旧数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";
    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn);   // 增加减行按钮

    var id = $(item).parent().parent().prev().find("input[name='id']").val();  // 获取上一行ID
    if(id != null && id !== "") {
        clonedTr.find("input[name='id']").val(parseInt(id) + 1);  // 设置本行ID
        $(item).parent().parent().prev().find("span[name='approvalPId']").text(parseInt(id) + 1);  // 设置上一行父节点ID
    }else{  // 如果是第一行则ID新增
        if(approvalProcessId != ""){
            id = new Date().getFullYear() + getFormatNumber(approvalProcessId,3) + "000";
            clonedTr.find("input[name='id']").val(parseInt(id) + 1);  // 设置本行ID
            $(item).parent().parent().prev().find("span[name='approvalPId']").text(parseInt(id) + 1);  // 设置上一行父节点ID
        }else {
            alert("请先设置审批流编号！");
            $(".id").focus();   // 获取鼠标焦点
            return false;
        }
    }
    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");

}

/**
 * 编辑功能减行功能
 * @param e
 */
function delLine(e) {
    $(e).parent().parent().prev().find("span[name='approvalPId']").text("");  // 清空上一行父节点ID
    $(e).parent().parent().remove();  // 删除行
}

/**
 * 改变子节点父ID
 * @param e
 */
function changeApprovalPId(e) {
    // 获取下一级ID并设置
    var id = $(e).val();
    $.each($(e).parent().parent().prevAll().not($("#cloneTr1")),function(index, item){
       if(id === $(this).find("input[name='id']").val()) {
           alert("编号重复！");
       }
    });
    $(e).parent().parent().prev().find("span[name='approvalPId']").text(id);
}

/**
 * 保存修改数据
 */
function saveModifyData() {
    var approvalProcess = {}; // 初始化对象
    var roleIdList = [];  // 选择的角色集合
    var idList = [];    // 编号集合：检测是否重复
    approvalProcess.approvalNodeList = [];   // 节点集合
    approvalProcess.type = $("#edit_type").val();  // 审批流类型
    approvalProcess.id = parseInt(approvalProcessId);   // 审批流编号
    var user = getCurrentUserData();  // 获取当前登陆人信息
    if (user != null) {
        approvalProcess.modifier = user.name;
    } else {
        approvalProcess.modifier = "未登录";
    }
    $.each($("#edit_plus").prevAll().not($("#cloneTr1")), function (index, item) {  // 获取节点数据
        var approvalNode = {};
        var id = $(this).find("input[name='id']").val();
        if(id === ""){
            alert("编号不能为空！");
            $(this).find("input[name='id']").focus();  // 获取鼠标焦点
            return false;
        }else if(idList.indexOf(id) !== -1){
            alert("编号不能重复！");
            $(this).find("input[name='id']").focus();  // 获取鼠标焦点
            return false;
        }else{
            idList.push(id);
            approvalNode.id = id;
        }
        var roleId = $(this).find("select[name='role']").val();
        if(roleId != null && roleId !== undefined && roleId !== ""){
            approvalNode.roleId = roleId;
        }else {
            alert("角色不能为空！");
            $(this).find("select[name='role']").focus();  // 获取鼠标焦点
            return false;
        }
        approvalNode.approvalPId = $(this).find("span[name='approvalPId']").text();
        approvalNode.approvalProcessId = approvalProcessId;   // 外键ID
        approvalProcess.approvalNodeList.push(approvalNode);
        console.log(roleIdList);
        if(roleIdList.indexOf(roleId) !== -1){  // 如果存在则提醒
             alert("角色不能重复！");
            $(this).find("select[name='role']").val("");
            $(this).find("select[name='role']").focus();   // 获取鼠标焦点
            return false;
        }else {  // 不存在则添加
            roleIdList.push(roleId);
        }
    });
    console.log("保存数据为：");
    console.log(approvalProcess);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "updateApprovalProcessModelById",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(approvalProcess),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#editModal").modal("hide");   // 隐藏编辑模态框
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}

/**
 * 链接模态框
 */
function hrefShow(e) {
    approvalProcessId = $(e).parent().parent().children().eq(1).text();  // 获取审批流ID
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getUrlList",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success") {
                $('#hrefTBody').empty();  // 删除旧数据
                console.log(result);
                $.each(result.data, function (index, item) {
                    var tr = "<tr onclick='setChecked(this)'>\n" +
                        "                                <td class=\"text-center\">\n" +
                        "                                    <label>\n" +
                        "                                        <input name=\"select1\" class=\"checkbox\" type=\"checkbox\" id=\"blankCheckbox1\" value=\"option1\" aria-label=\"...\">\n" +
                        "                                    </label>\n" +
                        "                                </td>\n" +
                        "                                <td class=\"text-center\">" + item.name + "</td>\n" +
                        "                                <td class=\"text-center\">" + item.url + "</td>\n" +
                        "                            </tr>";
                    if(parseInt(approvalProcessId) === item.pId){  // 选中
                        tr = "<tr onclick='setChecked(this)'>\n" +
                            "                                <td class=\"text-center\">\n" +
                            "                                    <label>\n" +
                            "                                        <input name=\"select1\" class=\"checkbox\" type=\"checkbox\" checked='checked' id=\"blankCheckbox1\" value=\"option1\" aria-label=\"...\">\n" +
                            "                                    </label>\n" +
                            "                                </td>\n" +
                            "                                <td class=\"text-center\">" + item.name + "</td>\n" +
                            "                                <td class=\"text-center\">" + item.url + "</td>\n" +
                            "                            </tr>";
                    }
                    $('#hrefTBody').append(tr);
                });
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
    $("#hrefModal").modal('show');
}

/**
 * 设置当前行选中
 * @param e
 */
function setChecked(e) {
    $(e).children().eq(0).find("input[name='select1']").attr("checked",true);  // 设置选中
}

/**
 * 保存链接数据
 */
function saveHref() {
    var approvalProcess = {};
    approvalProcess.id = approvalProcessId;   // 获取审批流模板ID
    approvalProcess.urlList = [];   // 页面链接
    var user = getCurrentUserData();  // 获取当前登陆人信息
    if (user != null) {
        approvalProcess.modifier = user.name;
    } else {
        approvalProcess.modifier = "未登录";
    }
    $.each($("input[name='select1']:checked"), function (index, item) {
        approvalProcess.urlList.push($(this).parent().parent().next().next().text());  // 获取选中的链接并传入集合
    });
    console.log("链接数据为：");
    console.log(approvalProcess);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "updateApprovalProcessModelUrlById",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(approvalProcess),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#hrefModal").modal("hide");   // 隐藏编辑模态框
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}

/**
 * 删除审批流
 * @param e
 */
function deleteModelById(e) {
    if (confirm("确认删除？")) {
        var id = $(e).parent().parent().children().eq(1).text();  // 获取审批流ID
        $.ajax({
            type: "POST",                            // 方法类型
            url: "deleteApprovalProcessModelById",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                id: parseInt(id)
            },
            dataType: "json",
            success: function (result) {
                if (result.data != undefined || result.status == "success") {
                    alert("删除成功！");
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器错误！");
            }
        });
    }

}