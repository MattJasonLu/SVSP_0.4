var currentPage = 1;                          //当前页数
var data = {};
var wayBillId = "0000000000";

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 链接模态框
 */
function hrefShow() {
    $("#hrefModal").modal('show');
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
                    setWayBillList(result.data);
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
    $.each(result, function (index, item) {
        var tr = "<tr>\n" +
            "                        <td class=\"text-center\">\n" +
            "                            <label>\n" +
            "                                <input name=\"select\" class=\"checkbox\" type=\"checkbox\" id=\"blankCheckbox\" value=\"option1\" aria-label=\"...\">\n" +
            "                            </label>\n" +
            "                        </td>\n" +
            "                        <td class=\"text-center\">"+item.id+"</td>\n" +
            "                        <td class=\"text-center\">"+item.type+"</td>\n" +
            "                        <td class=\"text-center\">"+getDateStr(item.creationDate)+"</td>\n" +
            "                        <td class=\"text-center\">"+item.creator+"</td>\n" +
            "                        <td class=\"dropdown text-center\">\n" +
            "                            <a href=\"#\" title=\"查看\"><span class=\"glyphicon glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a>\n" +
            "                            <a href=\"#\" title=\"编辑\" onclick=\"showEditModal()\"><span class=\"glyphicon glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></a>\n" +
            "                            <a href=\"#\" title=\"链接配置\" onclick=\"hrefShow()\"><span class=\"glyphicon glyphicon glyphicon-glyphicon-retweet\" aria-hidden=\"true\"></span></a>\n" +
            "                            <a href=\"#\" title=\"删除\"><span class=\"glyphicon glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a>\n" +
            "                        </td>\n" +
            "                    </tr>";
        $('#tBody').append(tr);
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
function showEditModal() {
    $("#editModal").modal("show");   // 显示编辑模态框

}

function addNewLine(item) {
    // 获取上一行tr
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide();
    clonedTr.attr('class', 'myclass3');
    clonedTr.show();
    // 清空旧数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";
    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn);   // 增加减行按钮
    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}