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



function selectedYear() {
    sel1 = true;
    loadMonthData();
}

var year = "";

/**
 * 加载列表数据
 */
function loadMonthData() {
    $('.loader').show();  // 显示进度条
    loadNavigationList();   // 动态菜单部署
    $(".newLine").remove();
    // setYearListSelect();               // 设置年份下拉框
    // year = $("#selectYear").find("option:selected").text();
    year = new Date().getFullYear();       // 默认显示当前年份
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
                if (result.status === "success"){
                    $('.loader').hide();   // 隐藏进度条
                    setMonthDataList(result);
                }
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
        clonedTr.addClass('myclass');
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    // 年份
                    $(this).html(year + '年');
                    break;
                case (2):
                    // 月份
                    $(this).html(parseInt(index) + '月');
                    break;
                case (3):
                    // 接运单总金额
                    $(this).html(obj.wayBillTotalPrice.toFixed(2));
                    break;
                case (4):
                    // 到账总金额
                    $(this).html(obj.accountTotalPrice.toFixed(2));
                    break;
                case (5):
                    // 有效总金额
                    $(this).html(obj.effectiveTotalPrice.toFixed(2));
                    break;
                case (6):
                    // 总提成
                    $(this).html(obj.totalCommission.toFixed(2));
                    break;
                case (7):
                    // 当月发放总金额
                    $(this).html(obj.monthSendedTotalPrice.toFixed(2));
                    break;
                case (8):
                    // 未发放总金额
                    $(this).html(obj.monthNotSendTotalPrice.toFixed(2));
                    break;
                case (9):
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
function getMonthAndYear(item) {
    var date = {};
    date.year = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    date.month = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
    return date;
}

/**
 * 获取月份-双击
 * @returns {string}
 */
function getMonthAndYear1(item) {
    var date = {};
    date.year = item.firstElementChild.nextElementSibling.innerHTML;
    date.month = item.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
    return date;
}

/**
 * 单击查看
 * @param item
 */
function toView(item) {
    //获取月份
    localStorage.month = parseInt(getMonthAndYear(item).month.replace(/[^0-9]/ig, ""));//截取数字
    localStorage.year = parseInt(getMonthAndYear(item).year.replace(/[^0-9]/ig, ""));//截取数字
    location.href = "assessment1.html";
}

/**
 * 双击查看
 * @param item
 */
function toView1(item) {
    //获取月份
    localStorage.month = parseInt(getMonthAndYear1(item).month.replace(/[^0-9]/ig, ""));//截取数字
    localStorage.year = parseInt(getMonthAndYear1(item).year.replace(/[^0-9]/ig, ""));//截取数字
    location.href = "assessment1.html";
}

/**
 * 导出功能
 */
function exportExcel(){
    var name = 'assessment';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        var year = item.parentElement.parentElement.nextElementSibling.innerHTML.replace(/[^0-9]/ig, "");
        var month = item.parentElement.parentElement.nextElementSibling.nextElementSibling.innerHTML.replace(/[^0-9]/ig, "");
        if (parseInt(month) < 10) month = "0" + month;
        month = year + month;
        $.ajax({           // 根据年月份获取合同ID
            type: "POST",                       // 方法类型
            url: "getContractByMonth",                  // url
            data: {
                month: month
            },
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != null) {
                    console.log(result);
                    if (result.status === "success"){
                        var data = result.data;
                         for(var i = 0; i < data.length; i++)
                             idArry.push(data[i].contractId);        // 将选中项包含的合同编号存到集合中
                    }
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    });
    var sqlWords = '';
    var sql = " in (";
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += idArry[i]+ ",";
            else if (i == idArry.length - 1) sql += idArry[i] + ") order by beginTime asc;";
        }
        sqlWords = "select a.contractId,a.beginTime,d.salesmanId,d.name,c.companyName,b.total,b.remarks from t_contract as a join t_pr_waybill as b join client as c join salesman as d where contractType='Wastes' and a.clientId = c.clientId and c.salesmanId = d.salesmanId and a.contractId = b.contractId and a.contractId" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select a.contractId,a.beginTime,d.salesmanId,d.name,c.companyName,b.total,b.remarks from t_contract as a join t_pr_waybill as b join client as c join salesman as d where contractType='Wastes' and a.clientId = c.clientId and c.salesmanId = d.salesmanId and a.contractId = b.contractId order by beginTime asc;";
    }
    window.open('exportExcelAssessment?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 回车查询
 */
function enterSearch2(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

var data1 = null;        // 查询载体
/**
 * 查询功能
 */
function searchData(){
    if ($("#senior").is(':visible')) {
       // $("#searchContent").hide(); // 高级查询时隐藏模糊输入框
        var startDate = null;
        var endDate = null;
        if($("#search-startDate").val() != '') startDate = $("#search-startDate").val() + "-01";
        if($("#search-endDate").val() != '') endDate = $("#search-endDate").val() + "-01";
        data1 = {
            startDate: startDate,
            endDate: endDate,
            salesmanName: $.trim($("#search-salesmanName").val())
        };
        console.log(data1);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchMonthData",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    $(".newLine").remove();
                    setMonthDataList(result);
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }else{
      //  $("#searchContent").show();
        $('.myclass').each(function () {
            $(this).show();
        });
        $(".newLine").remove();       // 清楚之前行
        array = [];//清空数组
        array1 = [];
        array.push($('.myclass'));
        // 模糊查询
        var text = $.trim($('#searchContent').val());
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


//-----------------------业务员列表页面-----------------
function loadMonthSalesmanData() {
    $('.loader').show();  // 显示进度条
    loadNavigationList();   // 动态菜单部署
    var m = localStorage.month;
    var y = localStorage.year;
    if (parseInt(m) < 10) m = "0" + m;
    var month = y + m;
    console.log("month:"+month);
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
                if (result.status === "success"){
                    setSalesmanMonthDataList(result);
                    $('.loader').hide();  // 隐藏进度条
                }
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
                    $(this).html(obj.wayBillTotalPrice.toFixed(2));
                    break;
                case (5):
                    // 到账金额
                    $(this).html(obj.accountTotalPrice.toFixed(2));
                    break;
                case (6):
                    // 有效金额
                    $(this).html(obj.effectiveTotalPrice.toFixed(2));
                    break;
                case (7):
                    // 提成
                    $(this).html(obj.totalCommission.toFixed(2));
                    break;
                case (8):
                    // 当月发放金额
                    $(this).html(obj.monthSendedTotalPrice.toFixed(2));
                    break;
                case (9):
                    // 当月未发放金额
                    $(this).html(obj.monthNotSendTotalPrice.toFixed(2));
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

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    // 月份考核页面
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },600);
    });
    // 业务员列表页面
    $('#searchContent1').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                search1();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search1();      //
            }
        },600);
    });
    // 合同明细页面
    $('#searchContent2').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                search2();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search2();      //
            }
        },600);
    });
});

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
        var salesmanId = $.trim($('#search1-salesmanId').val());
        var salesmanName = $.trim($('#search1-salesmanName').val());
        var wayBillTotalPrice = $.trim($('#search1-wayBillTotalPrice').val());
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
        var text = $.trim($('#searchContent1').val());
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

function loadContractListData() {
    loadNavigationList();   // 动态菜单部署
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
                    $(this).html(obj.wayBillTotalPrice.toFixed(2));
                    break;
                case (7):
                    // 系数
                    $(this).html(obj.coefficient);
                    break;
                case (8):
                    // 到账金额
                    $(this).html(obj.accountTotalPrice.toFixed(2));
                    break;
                case (9):
                    // 有效金额
                    $(this).html(obj.effectiveTotalPrice.toFixed(2));
                    break;
                case (10):
                    // 提成
                    $(this).html(obj.totalCommission.toFixed(2));
                    break;
                case (11):
                    // 当月发放金额
                    $(this).html(obj.monthSendedTotalPrice.toFixed(2));
                    break;
                case (12):
                    // 未发放金额
                    $(this).html(obj.monthNotSendTotalPrice.toFixed(2));
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
        var produceCompanyName = $.trim($('#search2-produceCompanyName').val());
        var accountDate = $.trim($('#search2-accountDate').val());
        var remarks = $.trim($('#search2-remarks').val());
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
        var text = $.trim($('#searchContent2').val());
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
