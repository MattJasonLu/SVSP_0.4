/*
*待办事项脚本文件
*
* */
var currentPage = 1;                          //当前页数
var data = {};
var approvalProcessId = "";

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getOrderIdAndUrlByRoleIdCount",                  // url
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
 * 设置克隆数据
 * @param result
 */
function setDataList(result) {
    $('#tBody').empty();  // 删除旧数据
    $.each(result, function (index, item) {
        var state;

        if(item.type=="6"){
            state='重新提交'
        }
        if(item.type=="7"){
            state='重新审批'
        }
        if(item.type=="2") {
            state="待审批"
        }
        console.log(state)
      var tr=" <tr ondblclick='dbGo(this)'>\n" +
          "                        <td class=\"text-center\">\n" +
          "                            <label>\n" +
          "                                <input name=\"select\" class=\"checkbox\" type=\"checkbox\" id=\"blankCheckbox\" value=\"option1\" aria-label=\"...\">\n" +
          "                            </label>\n" +
          "                        </td>\n" +
          "                        <td class=\"text-center\">"+item.orderId+"</td>\n" +
          "                        <td class=\"text-center\">"+state+"</td>\n" +
          "                        <td class=\"text-center\">"+item.urlName+"</td>\n" +
          "                        <td class=\"text-center\">"+item.url+"</td>\n" +
          "                        <td class=\"text-center\">\n" +
          "                            <a  id=\"function_-155\" onclick='go(this)' title=\"跳转\">\n" +
          "                                <span class=\"glyphicon glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n" +
          "                            </a>\n" +
          "                        </td>\n" +
          "                    </tr>"
        $('#tBody').append(tr);
    });
}

function dbGo(item) {
    var url=$(item).children("td").eq(4).html();
    var storage=window.localStorage;
    storage['approvalId']=$(item).children("td").eq(1).html();
    window.location.href=url;
}
function go(item) {
     var url=$(item).parent().prev().html();
     var storage=window.localStorage;
     storage['approvalId']=$(item).parent().parent().children('td').eq(1).html()
     window.location.href=url;
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
        url: "getOrderIdAndUrlByRoleId",         // url
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
            url: "getOrderIdAndUrlByRoleId",         // url
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


function LoadTodo() {
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
        url: "getOrderIdAndUrlByRoleId",          // url
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