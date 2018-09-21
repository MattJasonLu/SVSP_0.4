//-----------------月份列表页面---------------------
var sel1 = false;

function setYearListSelect() {
    var year = new Date().getFullYear(); //获取当前年份
    var sel = $('#selectYear');//获取select下拉列表
    for (var i = 1999; i < year + 3; i++)//循环添加2006到当前年份加3年的每个年份依次添加到下拉列表
    {
        var option = $('<option />');
        option.val(i);
        option.text(i);
        sel.append(option);
    }
    if (sel1 === false) $("#selectYear").get(0).selectedIndex = parseInt(year) - 1999;
    // sel.val(year);           // 设置默认为当前年份
}

/**
 * 搜索重置功能
 */
function reset() {
    $("#senior").find("input").val("");
}

function selectedYear() {
    sel1 = true;
    loadMonthData();
}

var year = "";

/**
 * 加载列表数据
 */
function loadMonthData() {
    $(".newLine").remove();
    setYearListSelect();               // 设置年份下拉框
    year = $("#selectYear").find("option:selected").text();
    console.log("year：" + year);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMonthData",                  // url
        data: {
            year: year
        },
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null) {
                console.log(result);
                if (result.status == "success")
                    setMonthDataList(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

function setMonthDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 年份
                    $(this).html(year + '年');
                    break;
                case (1):
                    // 月份
                    $(this).html(parseInt(index) + '月');
                    break;
                case (2):
                    // 接运单总金额
                    $(this).html(obj.wayBillTotalPrice);
                    break;
                case (3):
                    // 到账总金额
                    $(this).html(obj.accountTotalPrice);
                    break;
                case (4):
                    // 有效总金额
                    $(this).html(obj.effectiveTotalPrice);
                    break;
                case (5):
                    // 总提成
                    $(this).html(obj.totalCommission);
                    break;
                case (6):
                    // 当月发放总金额
                    $(this).html(obj.monthSendedTotalPrice);
                    break;
                case (7):
                    // 未发放总金额
                    $(this).html(obj.monthNotSendTotalPrice);
                    break;
                case (8):
                    // 备注
                    $(this).html(obj.remarks);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 获取月份-单击
 * @param item
 * @returns {string}
 */
function getMounthAndYear(item) {
    var date = {};
    date.year = item.parentElement.parentElement.firstElementChild.innerHTML;
    date.month = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    return date;
}

/**
 * 获取月份-双击
 * @returns {string}
 */
function getMounthAndYear1(item) {
    var date = {};
    date.year = item.firstElementChild.innerHTML;
    date.month = item.firstElementChild.nextElementSibling.innerHTML;
    return date;
}

/**
 * 单击查看
 * @param item
 */
function toView(item) {
    //获取月份
    localStorage.month = parseInt(getMounthAndYear(item).month.replace(/[^0-9]/ig, ""));//截取数字
    localStorage.year = parseInt(getMounthAndYear(item).year.replace(/[^0-9]/ig, ""));//截取数字
    location.href = "assessment1.html";
}

/**
 * 双击查看
 * @param item
 */
function toView1(item) {
    //获取月份
    localStorage.month = parseInt(getMounthAndYear1(item).month.replace(/[^0-9]/ig, ""));//截取数字
    localStorage.year = parseInt(getMounthAndYear1(item).year.replace(/[^0-9]/ig, ""));//截取数字
    location.href = "assessment1.html";
}

//-----------------------业务员列表页面-----------------
function reset1() {
    $("#senior1").find("input").val("");
    $("#searchContent1").val("");
}

function loadMonthSalesmanData() {
    var m = localStorage.month;
    var y = localStorage.year;
    if (parseInt(m) < 10) m = "0" + m;
    var month = y + m;
    console.log(month);
    $(".newLine").remove();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMonthSalesmanData",                  // url
        data: {
            month: month
        },
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null) {
                console.log(result);
                if (result.status === "success")
                    setSalesmanMonthDataList(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

function setSalesmanMonthDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone1");
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass('myclass');
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 业务员编号
                    $(this).html(obj.salesmanId);
                    break;
                case (1):
                    // 业务员姓名
                    $(this).html(obj.salesmanName);
                    break;
                case (2):
                    // 年月份
                    $(this).html(localStorage.year + "年" + localStorage.month + "月");
                    break;
                case (3):
                    // 系数
                    $(this).html(obj.coefficient);
                    break;
                case (4):
                    // 接运单金额
                    $(this).html(obj.wayBillTotalPrice);
                    break;
                case (5):
                    // 到账金额
                    $(this).html(obj.accountTotalPrice);
                    break;
                case (6):
                    // 有效金额
                    $(this).html(obj.effectiveTotalPrice);
                    break;
                case (7):
                    // 提成
                    $(this).html(obj.totalCommission);
                    break;
                case (8):
                    // 当月发放金额
                    $(this).html(obj.monthSendedTotalPrice);
                    break;
                case (9):
                    // 当月未发放金额
                    $(this).html(obj.monthNotSendTotalPrice);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    // 隐藏无数据的tr
    tr.hide();
}

function getSalesmanId(item) {
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

function getSalesmanId1(item) {
    return item.firstElementChild.innerHTML;
}

function toViewSalesman(item) {
    localStorage.salesmanId = getSalesmanId(item);//获取业务员ID
    location.href = "assessment2.html";
}

function toViewSalesman1(item) {
    localStorage.salesmanId = getSalesmanId1(item);//获取业务员ID
    location.href = "assessment2.html";
}

/**
 * 回车查询
 */
function enterSearch(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        search1();      //
    }
}

var array = [];//存放所有的tr
var array1 = [];//存放目标的tr
/**
 * 月度考核业务员列表查询功能
 */
function search1() {
    $('.myclass').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass'));
    if ($("#senior1").is(':visible')) {// 高级查询
        //搜索关键字
        var salesmanId = $('#search1-salesmanId').val();
        var salesmanName = $('#search1-salesmanName').val();
        var wayBillTotalPrice = $('#search1-wayBillTotalPrice').val();
        for (var j = 0; j < array.length; j++) {
            $.each(array[j], function () {
                //console.log(this);
                if (!($(this).children('td').eq(0).text().indexOf(salesmanId) != -1 && $(this).children('td').eq(1).text().indexOf(salesmanName) != -1
                    && $(this).children('td').eq(4).text().indexOf(wayBillTotalPrice) != -1)) {
                    $(this).hide();
                }
                if (($(this).children('td').eq(0).text().indexOf(salesmanId) != -1 && $(this).children('td').eq(1).text().indexOf(salesmanName) != -1
                    && $(this).children('td').eq(4).text().indexOf(wayBillTotalPrice) != -1)) {
                    array1.push($(this));
                }
            });
        }

        for (var i = 0; i < array1.length; i++) {
            $.each(array1[i], function () {
                $('#tbody1').append(this);
            });
        }

        if (salesmanId.length <= 0 && salesmanName.length <= 0 && wayBillTotalPrice.length < 0) {
            $('.myclass').each(function () {
                $(this).show();
            })
        }
    } else {
        // 模糊查询
        var text = $('#searchContent1').val();
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
}

//---------------------------合同明细页面---------------
function reset2() {
    $("#senior2").find("input").val("");
    $("#searchContent2").val("");
}

function loadContractListData() {
    var m = localStorage.month;
    var y = localStorage.year;
    if (parseInt(m) < 10) m = "0" + m;
    var month = y + m;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getContractBySalesman",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            salesmanId: localStorage.salesmanId,
            month: month
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != null) {
                setContractList(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

function setContractList(result) {
    // 获取id为clone2的tr元素
    var tr = $("#clone2");
    tr.siblings().remove();
    $.each(result.assessmentInfo, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass('myClass2');
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 业务员编号
                    $(this).html(obj.salesmanId);
                    break;
                case (1):
                    // 业务员
                    $(this).html(obj.salesmanName);
                    break;
                case (2):
                    // 产废单位
                    $(this).html(obj.companyName);
                    break;
                case (3):
                    // 到账日期
                    $(this).html();
                    break;
                case (4):
                    // 开票时间
                    if (result.wayBillInfo[index] != null && result.wayBillInfo[index].wayBillItemList[0] != null)
                        $(this).html(getDateStr(result.wayBillInfo[index].wayBillItemList[0].invoiceDate));
                    break;
                case (5):
                    // 接运单时间
                    if (result.wayBillInfo[index] != null)
                        $(this).html(getDateStr(result.wayBillInfo[index].wayBillDate));
                    break;
                case (6):
                    // 接运单金额
                    $(this).html(obj.wayBillTotalPrice);
                    break;
                case (7):
                    // 系数
                    $(this).html(obj.coefficient);
                    break;
                case (8):
                    // 到账金额
                    $(this).html(obj.accountTotalPrice);
                    break;
                case (9):
                    // 有效金额
                    $(this).html(obj.effectiveTotalPrice);
                    break;
                case (10):
                    // 提成
                    $(this).html(obj.totalCommission);
                    break;
                case (11):
                    // 当月发放金额
                    $(this).html(obj.monthSendedTotalPrice);
                    break;
                case (12):
                    // 未发放金额
                    $(this).html(obj.monthNotSendTotalPrice);
                    break;
                case (13):
                    // 备注
                    if (result.wayBillInfo[index] != null)
                        $(this).html(result.wayBillInfo[index].remarks);
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

var salesmanId = "";

function toViewItems(item) {
    salesmanId = getSalesmanId(item);

}


function toViewItems1(item) {
    salesmanId = getSalesmanId1(item);
}

/**
 * 回车查询
 */
function enterSearch1(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        search2();      //
    }
}

/**
 * 月度考核合同明细列表查询功能
 */
function search2() {
    $('.myClass2').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myClass2'));
    if ($("#senior2").is(':visible')) {// 高级查询
        //搜索关键字
        var produceCompanyName = $('#search2-produceCompanyName').val();
        var accountDate = $('#search2-accountDate').val();
        var remarks = $('#search2-remarks').val();
        for (var j = 0; j < array.length; j++) {
            $.each(array[j], function () {
                //console.log(this);
                if (!($(this).children('td').eq(2).text().indexOf(produceCompanyName) != -1 && $(this).children('td').eq(3).text().indexOf(accountDate) != -1
                    && $(this).children('td').eq(13).text().indexOf(remarks) != -1)) {
                    $(this).hide();
                }
                if (($(this).children('td').eq(2).text().indexOf(produceCompanyName) != -1 && $(this).children('td').eq(3).text().indexOf(accountDate) != -1
                    && $(this).children('td').eq(13).text().indexOf(remarks) != -1)) {
                    array1.push($(this));
                }
            });
        }

        for (var i = 0; i < array1.length; i++) {
            $.each(array1[i], function () {
                $('#tbody2').append(this);
            });
        }

        if (produceCompanyName.length <= 0 && accountDate.length <= 0 && remarks.length < 0) {
            $('.myClass2').each(function () {
                $(this).show();
            })
        }
    } else {
        // 模糊查询
        var text = $('#searchContent2').val();
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
            $('.myClass2').each(function () {
                $(this).show();
            })
        }
    }
}
