
/**
 * 获取首页内容
 * */
function loadPageWayBillDetailList() {
    $('.selectpicker').selectpicker('val', '');
    //编辑显示按钮，查看隐藏按钮
    if (localStorage.add == 0) {
        $("#addBtn").addClass('hidden');
        if($("#addBtn").hasClass('show')) $("#addBtn").removeClass('show');
    }
    else {
        $("#addBtn").addClass('show');
        if($("#addBtn").hasClass('hidden')) $("#addBtn").removeClass('hidden');

    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWayBill",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setWayBillItemList(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("首页获取失败");
        }
    });
}

/**
 * 克隆数据
 * @param result
 */
function setWayBillItemList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    $.each(result.wayBillItemList, function (index, item) {
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
                    $(this).html(result.id);
                    break;
                case (1):
                    // 委托单位/危废生产单位
                    $(this).html(result.produceCompanyName);
                    break;
                case (2):
                    //接收单位
                    $(this).html(obj.receiveCompanyName);
                    break;
                case (3):
                    //接收单位经手人
                    $(this).html(obj.receiveCompanyOperator);
                    break;
                case (4):
                    // 接运单日期
                    $(this).html(getDateStr(obj.receiveDate));
                    break;
                case (5):
                    //业务员
                    $(this).html(obj.salesmanName);
                    break;
                case (6):
                    //危废名称
                    $(this).html(obj.wastesName);
                    break;
                case (7):
                    //危废代码
                    $(this).html(obj.wastesCode);
                    break;
                case (8):
                    //危废数量
                    $(this).html(obj.wastesAmount);
                    break;
                case (9):
                    //危废含税单价
                    $(this).html(obj.wastesPrice);
                    break;
                case(10):
                    //危废单个合计
                    var total = obj.wastesPrice * obj.wastesAmount;
                    $(this).html(total);
                    break;
                case(11):
                    //开票日期
                    $(this).html(getDateStr(obj.invoiceDate));
                    break;
                case(12):
                    //发票号码
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
 * 显示新增模态框
 */
function showAddModal() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWayBill",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result.data);
                $("#wastes0-id").text(localStorage.id);
                $("#wastes0-produceCompany").text(data.produceCompanyName);
                $("#wastes0-founder").text(data.founder);
                $("#wastes0-wayBillDate").text(getDateStr(data.wayBillDate));
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("数据获取失败");
        }
    });
    $('#addModal').modal('show');
}

/**
 * 新增行
 */
function addNewItemLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#addBtn1").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    var num = clonedTr.children().find("span:first").prop('id').charAt(6);
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").selectpicker('val', '');
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();
    clonedTr.children().find("input,select,span").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, parseInt(num) + 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
}

function getSalesmanIdByName(name) {
    //业务员姓名转ID
    var id = null;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSalesmanIdByName",                 // url
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
 * 确认新增危废
 */
function addWastes() {
    //总行数
    var lineCount = $("span[id^='wastes'][id$='produceCompany']").length;
    var wayBill = {};
    wayBill['wayBillItemList'] = [];
    var ItemId = getCurrentItemId();
    var wastesId = parseInt(getCurrentWastesId());
    for (var i = 0; i < lineCount; i++) {
        var ItemId1 = ItemId++;
        var wastesId1 = wastesId++;
        var wayBillItem = {};
        var $i = i;
      //  wayBillItem.salesmanId = $("#wastes" + $i + "-salesman option:selected").val();
        wayBillItem.salesmanName = $("#wastes" + $i + "-salesman option:selected").text();
        wayBillItem.receiveCompanyName = $("#wastes" + $i + "-receiveCompany option:selected").text();
        wayBillItem.wastesId = conversionIdFormat(wastesId1);
        wayBillItem.wastesName = $("#wastes" + $i + "-name").val();
        wayBillItem.wastesAmount = $("#wastes" + $i + "-wasteAmount").val();
        wayBillItem.wastesCode = $("#wastes" + $i + "-wasteCode option:selected").text();
        wayBillItem.wastesPrice = $("#wastes" + $i + "-unitPriceTax").val();
        wayBillItem.wastesTotalPrice = parseFloat(wayBillItem.wastesAmount) * parseFloat(wayBillItem.wastesPrice);
        wayBillItem.itemId = ItemId1.toString();
        wayBillItem.invoiceDate = $("#wastes" + $i + "-invoiceDate").val();
        wayBillItem.invoiceNumber = $("#wastes" + $i + "-invoiceNumber").val();
        wayBillItem.receiveCompanyOperator = $("#wastes" + $i + "-receiveCompanyOpterator").val();
        wayBillItem.receiveDate = $("#wastes" + $i + "-receiveDate").val();
        wayBillItem.wayBillId = localStorage.id;
        wayBill.wayBillItemList.push(wayBillItem);
    }
    console.log(wayBill);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addWayBillItem",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                    console.log(data.exception);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
    add1 = false;
}

/**
 * 页面准备完成后载入下拉框信息
 */
$(document).ready(function () {
    var lineCount = $("span[id^='wastes'][id$='produceCompany']").length;
    for (var i = 0; i < lineCount; i++) {
        var $i = i;
        // 添加接收单位信息
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
                    var clientList = $("#wastes" + $i + "-receiveCompany");
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
                    var data = eval(result);
                    // 各下拉框数据填充
                    var clientList = $("#wastes" + $i + "-salesman");
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
                    var wastesCode = $("#wastes" + $i + "-wasteCode");
                    $.each(data.wastesCodeList, function (index, item) {
                        var option = $('<option />');
                        option.val(parseInt(item.code.replace(/[^0-9]/ig,"")));
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