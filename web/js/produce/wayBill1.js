var currentPage = 1;                          //当前页数
var isSearch = false;
var data;
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
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalWayBillRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchWayBillTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
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
    }
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
    setWayBillList(result);             // 设置数据
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
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageWayBillList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
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
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchWayBill",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
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
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageWayBillList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWayBillList(result.data);

                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchWayBill",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageWayBillList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
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
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
    isSearch = false;
}

function setWayBillList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
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
                case (1):
                    //接运单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 废物生产单位
                    $(this).html(obj.produceCompanyName);
                    break;
                case (3):
                    //总额
                {
                    var total = 0;
                    for (var i = 0; i < obj.wayBillItemList.length; i++) {
                        total += obj.wayBillItemList[i].wastesTotalPrice;
                    }
                    //减去总运费
                    obj.total = total - obj.freight;
                }
                    $(this).html(obj.total.toFixed(2));
                    break;
                case (4):
                    //总运费
                    $(this).html(obj.freight.toFixed(2));
                    break;
                case (5):
                    // 创建人
                    $(this).html(obj.founder);
                    break;
                case (6):
                    //接运单创建日期
                    $(this).html(getDateStr(obj.wayBillDate));
                    break;
                case (7):
                    //备注
                    $(this).html(obj.remarks);
                    break;
                case (8):
                    //危废产生单位经手人
                    $(this).html(obj.produceCompanyOperator);
                    break;
                case (9):
                    //接运单状态
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                        break;
                    }
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
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {
    // 设置审批状态
    $.ajax({
        type: "POST",
        url: "getCheckStateDataByDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-wayBillState");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    if (item.dataDictionaryItemId == 76 ||
                        item.dataDictionaryItemId == 63 ||
                        item.dataDictionaryItemId == 67 ||
                        item.dataDictionaryItemId == 66 ||
                        item.dataDictionaryItemId == 69 ||
                        item.dataDictionaryItemId == 75) {
                        var option = $('<option />');
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        checkState.append(option);
                    }
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });

}

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    var name = 't_pr_waybill';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select id,produceCompanyName,total,freight,founder,wayBillDate,remarks,produceCompanyOperator,state from t_pr_waybill where id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select id,produceCompanyName,total,freight,founder,wayBillDate,remarks,produceCompanyOperator,state from t_pr_waybill;";
    }
    console.log("sql:" + sqlWords);
    window.open('exportExcelWayBill?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    // var filePath = 'Files/Templates/接运单模板.xlsx';
    // window.open('downloadFile?filePath=' + filePath);

}

$("#downloadModal").click(function () {
    // 打开页面，此处最好使用提示页面
    console.log("click");
    var newWin = window.open('loadingPage.html');
    var filePath = 'Files/Templates/接运单模板.xlsx';
    ajax().done(function () {
        // 重定向到目标页面
        newWin.location.href = 'downloadFile?filePath=' + filePath;
    });
});


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
            url: "importWayBillExcel",              // url
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

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchWayBill();      //
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
                searchWayBill();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchWayBill();      //
            }
        }, 600);
    });
});

/**
 * 查询功能
 */
function searchWayBill() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#senior").is(':visible')) {
        switch ($("#search-wayBillState").val()) {
            case "0":
                state = "NewBuild";
                break;//新建
            case "1":
                state = "ToExamine";
                break;//待审批
            case "2":
                state = "Examining";
                break;//审批中
            case "3":
                state = "Approval";
                break;//审批通过
            case "4":
                state = "Backed";
                break;//驳回
            case "5":
                state = "Invalid";
                break; // 作废
        }
        data = {
            id: $.trim($("#search-id").val()),
            produceCompanyName: $.trim($("#search-companyName").val()),
            total: $.trim($("#search-total").val()),
            freight: $.trim($("#search-freight").val()),
            founder: $.trim($("#search-founder").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            produceCompanyOperator: $.trim($("#search-operator").val()),
            checkStateItem: {
                dataDictionaryItemId: $("#search-wayBillState").val()
            },
            state: state,
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
        switch (keywords) {
            case("新建"):
                keywords = "NewBuild";
                break;
            case("待审批"):
                keywords = "ToExamine";
                break;
            case("审批中"):
                keywords = "Examining";
                break;
            case("审批通过"):
                keywords = "Approval";
                break;
            case("已驳回"):
                keywords = "Backed";
                break;
            case("驳回"):
                keywords = "Backed";
                break;
            case("已作废"):
                keywords = "Invalid";
                break;
            case("作废"):
                keywords = "Invalid";
                break;
            case("已确认"):
                keywords = "Confirm";
                break;
            case("确认"):
                keywords = "Confirm";
                break;
            case ("已出库"):
                keywords = "OutBounded";
                break;
            case ("出库"):
                keywords = "OutBounded";
                break;
        }
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
            url: "searchWayBill",                 // url
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

function getWayBillId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 双击编辑
 * @param item
 */
function editWayBill1(item) {
    var id = item.firstElementChild.nextElementSibling.innerHTML;
    localStorage.id = id;
    localStorage.add = 1;
    location.href = "wayBill.html";
}

/**
 * 查看功能
 */
function toView(item) {
    var id = getWayBillId(item);
    // localStorage.id = id;
    // localStorage.add = 0;
    // location.href = "wayBill.html";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWayBill",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setDataItemList(result);
                $("#viewModal").modal('show');
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

function setDataItemList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone1");
    tr.siblings().remove();
    if (result.data != null)
        $.each(result.data.wayBillItemList, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (0):
                        //接运单号
                        $(this).html(result.data.id);
                        break;
                    case (1):
                        //危废名称
                        $(this).html(obj.wastesName);
                        break;
                    case (2):
                        //危废代码
                        $(this).html(obj.wastesCode);
                        break;
                    case (3):
                        //数量
                        $(this).html(obj.wastesAmount.toFixed(2));
                        break;
                    case (4):
                        // 单价
                        $(this).html(obj.wastesPrice.toFixed(2));
                        break;
                    case (5):
                        // 合计
                        var total = obj.wastesPrice * obj.wastesAmount;
                        $(this).html(total.toFixed(2));
                        break;
                    case (6):
                        //业务员
                        $(this).html(obj.salesmanName);
                        break;
                    case (7):
                        // 委托单位
                        $(this).html(result.data.produceCompanyName);
                        break;
                    case (8):
                        //接收单位
                        $(this).html(obj.receiveCompanyName);
                        break;
                    case (9):
                        //接收单位经手人
                        $(this).html(obj.receiveCompanyOperator);
                        break;
                    case (10):
                        // 接运单日期
                        $(this).html(getDateStr(obj.receiveDate));
                        break;
                    case (11):
                        // 开票日期
                        $(this).html(getDateStr(obj.invoiceDate));
                        break;
                    case (12):
                        // 发票号码
                        $(this).html(obj.invoiceNumber);
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
 * 编辑功能
 */
function editWayBill(item) {
    var state = $(item).parent().prev().text();
    if (state == '新建') {
        var id = getWayBillId(item);
        localStorage.id = id;
        localStorage.add = 1;
        location.href = "wayBill.html";
    } else if (state == '审批中') {
        alert("单据审批中，不可修改！");
    } else if (state == '已作废') {
        alert("单据已作废，不可修改！");
    } else {
        alert("单据不可修改！");
    }
}

/**
 * 提交功能
 */
function submit(item) {
    var state = $(item).parent().prev().text();
    var id = getWayBillId(item);
    if (state == '新建' || state == '已驳回') {
        if (confirm("确认提交？"))
            $.ajax({
                type: "POST",
                url: "submitWayBill",
                async: false,
                data: {
                    id: id
                },
                dataType: "json",
                success: function (result) {
                    if (result.status == "success") {
                        alert("提交成功！");
                        window.location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    console.log(result);
                    alert("服务器异常!");
                }
            });
    } else if (state == '审批中') {
        alert("单据审批中，不可提交！");
    } else if (state == '已作废') {
        alert("单据已作废，不可提交！");
    } else {
        alert("单据不可提交！");
    }
}

/**
 * 审批
 */
function examination(item) {
    var state = $(item).parent().prev().text();
    if (state != '审批中') {
        alert("请提交后再进行审批操作！");
    } else {
        wayBillId = getWayBillId(item);
        $('#examinationModal').modal('show');//手动触发模态框弹出
    }
}

function approval() {
    $('#contractInfoForm2').modal('show');
    $("#passContent").val($("#advice").val());
}

function reject() {
    $('#contractInfoForm3').modal('show');
    $("#backContent").val($("#advice").val());
}

/**
 * 审批通过
 * */
function approval1() {
    console.log($("#advice").val());
    console.log($("#passContent").val());
    var advice = $("#passContent").val();
    var wayBill = {};
    wayBill.id = wayBillId;
    wayBill.advice = advice;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "approvalWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var data = eval(result);
            console.log(data.message);
            alert("服务器异常!");
        }
    });
}

/**
 * 审批驳回
 * */
function reject1() {
    var advice = $("#backContent").val();
    var wayBill = {};
    wayBill.id = wayBillId;
    wayBill.advice = advice;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "rejectWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var data = eval(result);
            console.log(data.message);
            alert("服务器异常!");
        }
    });
}

/**
 * 作废功能
 */
function invalidWayBill(item) {
    var state = $(item).parent().prev().text();
    if (state == '新建') {
        var id = getWayBillId(item);
        if (confirm("确定作废？"))
            $.ajax({
                type: "POST",
                url: "invalidWayBill",
                async: false,
                data: {
                    id: id
                },
                dataType: "json",
                success: function (result) {
                    if (result.status == "success") {
                        alert("作废成功！");
                        window.location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    console.log(result);
                    alert("服务器异常!");
                }
            });
    } else if (state == '审核中') {
        alert("单据审核中，不能作废！")
    } else if (state == '已作废') {
        alert("单据已作废！");
    } else {
        alert("单据不能作废！");
    }
}

/**
 * 获取当前时间
 * @returns {string}
 */
function getcurrentDaydate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    return year + "年" + month + "月" + day + "日";
}

function getCurrentDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;
}

/**
 * 获取接运单id
 */
function getCurrentWayBillId() {
    $.ajax({
        type: "POST",
        url: "getCurrentWayBillId",
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != null) {
                wayBillId = result.id;
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 显示接运单新增页面
 */
function addWayBillModal() {
    window.location.href = "wayBillAdd.html";
}

/**
 * 加载接运单新增页面数据
 */
function showAddData() {
    loadNavigationList();   // 动态菜单部署
    getCurrentWayBillId();
    $("#modal-id").text(wayBillId);
    $("#modal-creationDate").text(getcurrentDaydate());
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentUserInfo",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result.data);
                console.log(data);
                // 各下拉框数据填充
                $("#modal-founder").val(data.username);  // 将创建人设置为当前登陆用户
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 页面准备完成后载入新增模态框下拉框信息11
 */
$(document).ready(function () {

    var lineCount = $("select[id^='modal'][id$='salesman']").length;
    //添加产废单位信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllClients",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 各下拉框数据填充
                var clientList = $("#modal-produceCompanyName");
                // 清空遗留元素
                clientList.children().first().siblings().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientList.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
            } else {
//                    console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    for (var i = 0; i < lineCount; i++) {
        var $i = i;
        //添加单位信息
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getAllClients",              // url
            cache: false,
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    // 各下拉框数据填充
                    var clientList = $("#modal" + $i + "-receiveCompany");
                    // 清空遗留元素
                    clientList.children().first().siblings().remove();
                    $.each(data, function (index, item) {
                        var option = $('<option />');
                        option.val(item.clientId);
                        option.text(item.companyName);
                        clientList.append(option);
                    });
                    $('.selectpicker').selectpicker('refresh');
                } else {
//                    console.log(result);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });

        // 添加业务员信息
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getAllSalesman",              // url
            cache: false,
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    // console.log(1323)
                    var data = eval(result);
                    // 各下拉框数据填充
                    var clientList = $("#modal" + $i + "-salesman");
                    // 清空遗留元素
                    clientList.children().first().siblings().remove();
                    $.each(data, function (index, item) {
                        var option = $('<option />');
                        option.val(item.salesmanId);
                        option.text(item.name);
                        clientList.append(option);
                    });
                    $('.selectpicker').selectpicker('refresh');
                } else {
//                    console.log(result);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
        // 添加危废代码信息
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getClientAndWastesCodeSelectedList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != undefined && result.status === "success") {
                    var data = eval(result);
                    console.log("下拉数据为：");
                    console.log(data);
                    // 下拉框数据填充
                    var wastesCode = $("#modal" + $i + "-wastesCode");
                    $.each(data.wastesCodeList, function (index, item) {
                        var option = $('<option />');
                        option.val(item.code);
                        option.text(item.code);
                        wastesCode.append(option);
                    });
                    //刷新下拉数据
                    $('.selectpicker').selectpicker('refresh');
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }

});

/**
 * 接运单新增模态框新增条目按钮
 */
function addNewItemLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").selectpicker('val', '');
    clonedTr.children().find("input[id^='modal'][id$='receiveCompany']").val("北控安耐得环保科技发展常州有限公司");
    // 获取编号
    var serialNumber = $("#plusBtn").prev().children().get(0).innerHTML;
    var id1 = (serialNumber.replace(/[^0-9]/ig, ""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;    // 设置序号
    clonedTr.children().find("input,select,span").each(function () {
        //id更新
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
    // tr.hide();
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);

    //中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4,
        title: '请选择',
    });
    $('.selectpicker').data('selectpicker', null);
    // $('.bootstrap-select').find("button:first").remove();
    $('.bootstrap-select').find("button:first").addClass("hidden");
    $('.selectpicker').selectpicker('refresh');
    $("select[name='salesman']").selectpicker('val', salesman.salesmanId); // 设置业务员信息
}

/**
 * 删除行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 3;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 1; i < length; i++) {             // 更新序号
        tBody.children().eq(i).children().eq(0).get(0).innerHTML = i + 1;     // 更新序号
        // 重新加上减行按钮
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        tBody.children().eq(i).children("td:eq(0)").prepend(delBtn);
        tBody.children().eq(i).children().find("input,select,span").each(function () {
            //id更新
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
    }
}

/**
 * 确认新增-将数据存到数据库
 */
function addWayBill() {
    //获取数据
    var wayBill = {};
    wayBill.produceCompanyName = $("#modal-produceCompanyName option:selected").text();
    wayBill.produceCompanyId = getClientIdByName(wayBill.produceCompanyName);
    wayBill.founder = $("#modal-founder").val();
    wayBill.id = $("#modal-id").text();
    wayBill.freight = $("#modal-freight").val();
    wayBill.produceCompanyOperator = $("#modal-produceCompanyOperator").val();
    wayBill.remarks = $("#modal-remarks").val();
    wayBill.contractId = contractId;
    var lineCount = $("input[id^='modal'][id$='receiveCompany']").length;
    console.log(lineCount);
    var total = 0;
    var wayBillItemList = [];
    var ItemId = getCurrentItemId();
    var wastesId = parseInt(getCurrentWastesId());
    for (var i = 0; i < lineCount; i++) {
        var $i = i;
        var wayBillItem = {};
        wayBillItem.salesmanName = $("select[id='modal" + $i + "-salesman']").find("option:selected").text();
        wayBillItem.receiveCompanyName = $("input[id='modal" + $i + "-receiveCompany']").val();
        wayBillItem.wastesId = conversionIdFormat(wastesId);
        wayBillItem.wastesName = $("input[id='modal" + $i + "-wastesName']").val();
        wayBillItem.wastesAmount = $("input[id='modal" + $i + "-wasteAmount']").val();
        wayBillItem.wastesCode = $("select[id='modal" + $i + "-wastesCode']").find("option:selected").text();
        wayBillItem.wastesPrice = $("input[id='modal" + $i + "-wastesPrice']").val();
        wayBillItem.wastesTotalPrice = parseFloat(wayBillItem.wastesAmount) * parseFloat(wayBillItem.wastesPrice);
        wayBillItem.itemId = ItemId.toString();
        wayBillItem.invoiceDate = $("input[id='modal" + $i + "-invoiceDate']").val();
        wayBillItem.receiveDate = $("input[id='modal" + $i + "-receiveDate']").val();
        wayBillItem.invoiceNumber = $("input[id='modal" + $i + "-invoiceNumber']").val();
        wayBillItem.receiveCompanyOperator = $("input[id='modal" + $i + "-receiveCompanyOperator']").val();
        wayBillItem.wayBillId = $("#modal-id").text();
        wayBillItemList.push(wayBillItem);
        console.log(wayBillItem);
        wastesId++;
        ItemId++;
        total += wayBillItem.wastesTotalPrice;
    }
    wayBill.total = total - wayBill.freight;
    wayBill.wayBillItemList = wayBillItemList;
    console.log("添加的数据为：");
    console.log(wayBill);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    if (confirm("添加成功，是否返回主页?")) {
                        window.location.href = "wayBill1.html";
                    } else window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 根据公司名获取ID
 * @param name
 * @returns {*}
 */
function getClientIdByName(name) {
    //接收公司名转ID
    var id = null;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getClientIdByName",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            name: name
        },
        dataType: "json",
        success: function (result) {
            id = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return id;
}

/**
 * 获取当前接运单条目ID
 * @returns {number}
 */
function getCurrentItemId() {
    //获取详细项目序列号
    var ItemId = 0;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentItemId",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            ItemId = parseInt(result.id);
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return ItemId;
}

/**
 * 获取当前危废ID
 * @returns {*}
 */
function getCurrentWastesId() {
    //获取当前危废编号
    var id = null;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentItemWastesId",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            id = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return id;
}

/**
 * 规范wastesId格式
 * @param id
 * @returns {string}
 */
function conversionIdFormat(id) {
    var aid = "";
    $.ajax({
        type: "POST",                            // 方法类型
        url: "changeWastesIdFormat",             // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            aid = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return aid;
}

$(window).on('load', function () {
    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4,
        title: '请选择',
        dropupAuto: false
    });
});

/**
 * 自动匹配业务员
 */
function setSalesmanNameAuto() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "setSalesmanNameAuto",             // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            alert(result.message);
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
}

var salesman;

/**
 * 选择公司后自动匹配业务员
 */
function autoSetSalesman() {
    $(".newLine").remove();  //删除历史行
    var companyName = $("#modal-produceCompanyName").find("option:selected").text(); // 获取选中的公司
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSalesmanByCompanyName",             // url
        data: {
            companyName: companyName
        },
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            if (result != null && result.status == "success" && result.data != null) {
                console.log(result);
                salesman = result.data;
                $("select[name='salesman']").selectpicker('val', salesman.salesmanId); // 设置业务员信息
            }
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    console.log(companyName);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getWastesInfoByCompanyName",             // url
        data: {
            companyName: companyName
        },
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            if (result != null && result.status == "success" && result.data != null) {
                console.log("合同数据:");
                console.log(result);
                var wastesList = result.data.quotationItemList;
                contractId = result.data.contractId;
                console.log("合同ID：" + contractId);
                for (var i = 0; i < wastesList.length; i++) {
                    if (i > 0) addNewItemLine();
                    var $i = i;
                    $("input[id='modal" + $i + "-wastesName']").val(wastesList[i].wastesName);
                    $("input[id='modal" + $i + "-wasteAmount']").val(wastesList[i].contractAmount.toFixed(2));
                    $("select[id='modal" + $i + "-wastesCode']").selectpicker('val', wastesList[i].wastesCode);
                    $("input[id='modal" + $i + "-wastesPrice']").val(wastesList[i].unitPriceTax.toFixed(2));
                    $("input[id='modal" + $i + "-receiveDate']").get(0).value = getCurrentDate();
                }
            } else {
                alert("未检测到合同数据，请检查该公司合同是否存在、审核或过期！");
            }
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
}

var contractId = '';

/**
 * 改变背景颜色
 */
function setColor(item) {
    console.log("b");
    // $(item).css("background-color","#ff6d5e");
    $(item).addClass("active");

}

/**
 * 下载接运单合同附件
 * @param item
 */
function downLoadContract(item) {
    var id = getWayBillId(item);
    $.ajax({
            type: "POST",                            // 方法类型
            url: "getContractByWayBillId",             // url
            data: {
                id: id
            },
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                //alert("数据获取成功！");
                if (result != null && result.status == "success" && result.data != null) {
                    var data = result.data;
                    console.log("合同数据");
                    console.log(data);
                    if (data.contractAppendicesUrl != null && data.contractAppendicesUrl != "") {
                        window.open('downloadFile?filePath=' + data.contractAppendicesUrl);
                    } else {
                        alert("未上传文件！");
                    }
                }else{
                    alert("未检测到合同数据！");
                }
            },
            error:function (result) {
                    alert("下载失败!");
                    console.log(result);
                }
        });
}