/**
 * Created by matt on 2018/8/29.
 */
var data;               // 搜索条件数据
var resultData;         // 搜索后获取数据
/**
 * 加载下拉框数据
 * */
function loadPageClientList() {
    setSelectList();
}

/**
 * 为公司名下拉框填充数据
 */
function setSelectList() {
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
                var clientList = $("#search-companyName");
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
}

/**
 * 查询框输入单个数据时自动为剩余数据赋值
 */
function autoSetSearchClientData() {
    var client = {};
    client.clientId = $.trim($("#search-clientId").val());
    client.companyName = $("#search-companyName").find("option:selected").text();
    if (client.companyName === '请选择') client.companyName = '';
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(client),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result.data);
                if ($.trim($("#search-clientId").val()) == null) {
                    $("#search-clientId").val(result.data[0].clientId);
                }
                if ($("#search-companyName").find("option:selected").text() === '未选择') {
                    $("#search-companyName").val(result.data[0].clientId);
                }
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}


/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#search-clientId').keyup(function (event) { //给Input赋予onkeyup事件
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
 * 查找客户
 */
function searchData() {
    if ($("#senior").is(':visible')) {
        var companyName = $("#search-companyName").find("option:selected").text();
        if (companyName === '请选择') companyName = '';
        data = {
            clientId: $.trim($("#search-clientId").val()),
            companyName: companyName
        };
    }
    if (data == null) alert("查询数据不能为空！");
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchClientData",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                resultData = result;
                setDataList(result);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 设置企业数据
    for (var i = 0; i < result.clientList.length; i++) {
        if (result.clientList[i] != null && result.clientList[i].clientState != null && result.clientList[i].clientState.name != "已禁用") {
            $("#companyName").text(result.clientList[0].companyName);
            $("#companyId").text(result.clientList[0].clientId);
            $("#companyArea").text(result.clientList[0].location);
            $("#location").text(result.clientList[0].location);
            $("#contactName").text(result.clientList[0].contactName);
        }
    }
    // 设置接运单数据
    $("#sendSampleNumber").text(result.sampleInfoList.length);
    $("#sampleOrderNumber").text(result.sampleInfoList.length);
    var sum = 0;
    for (var i = 0; i < result.sampleInfoList.length; i++) {        // 计算确认收样的接运单数量
        if (result.sampleInfoList[i].samplingDate != null && result.sampleInfoList[i].samplingDate != '') {
            sum++;
        }
    }
    $("#samplePassNumber").text(sum);
    $("#sampleRejectNumber").text(parseInt(result.sampleInfoList.length) - sum);
    // 设置合同数据
    $("#validContractTotal").text(result.contractList.length);    // 所有有效合同
    var sum1 = 0;
    var wastesSpeciesTotal = 0;
    var wastesAmountTotal = 0;
    var wastesResidueAmountTotal = 0;
    var currentWastesSpeciesTotal = 0;
    var currentWastesAmountTotal = 0;
    var currentWastesReceiveAmountTotal = 0;
    var wastesCodeArray = [];
    var currentWastesArray = [];
    for (var i1 = 0; i1 < result.contractList.length; i1++) {
        if (result.contractList[i1].quotationItemList.length > 0)
            for (var j = 0; j < result.contractList[i1].quotationItemList.length; j++) {
                if ($.inArray(result.contractList[i1].quotationItemList[j].wastesCode, wastesCodeArray) === -1) { // 当元素不存在于数组中时
                    wastesSpeciesTotal++;                      // 危废种类累加
                    wastesCodeArray.push(result.contractList[i1].quotationItemList[j].wastesCode);
                }
                wastesAmountTotal += result.contractList[i1].quotationItemList[j].contractAmount;    // 计算危废总量
            }
        //计算当前有效合同数
        if (result.contractList[i1].endTime == null || getDateStr(result.contractList[i1].endTime) > dateToString(new Date())) {
            sum1++;                // 若当前日期小于合同终止日期或者合同终止日期未定则判定为仍在执行的合同
            if (result.contractList[i1].quotationItemList.length > 0)
                for (var j1 = 0; j1 < result.contractList[i1].quotationItemList.length; j1++) {
                    if ($.inArray(result.contractList[i1].quotationItemList[j1].wastesCode, wastesCodeArray) === -1) { // 当元素不存在于数组中时
                        currentWastesSpeciesTotal++;                      // 有效合同的危废种类累加
                        currentWastesArray.push(result.contractList[i1].quotationItemList[j1].wastesCode);
                    }
                    currentWastesAmountTotal += result.contractList[i1].quotationItemList[j1].contractAmount;    // 计算有效合同的危废总量
                }
        }
    }
    $("#wastesSpeciesTotal").text(wastesSpeciesTotal);
    $("#wastesAmountTotal").text(wastesAmountTotal.toFixed(2));
    $("#wastesResidueAmountTotal").text(wastesResidueAmountTotal.toFixed(2));
    $("#currentValidContractTotal").text(sum1);    // 当前有效合同
    $("#currentWastesSpeciesTotal").text(currentWastesSpeciesTotal);
    $("#currentWastesAmountTotal").text(currentWastesAmountTotal.toFixed(2));
    $("#currentWastesReceiveAmountTotal").text(currentWastesReceiveAmountTotal.toFixed(2));
    $("#currentWastesResidueAmountTotal").text((currentWastesAmountTotal - currentWastesReceiveAmountTotal).toFixed(2));
    // 派车统计
    $("#sentCarTotalNumber").text(0);
    $("#totalMileage").text(0);
    $("#totalDriveTime").text(0);
}

/**
 * 详情1（送样）
 */
function viewData1() {
    // $("#detail1").preventDefault();
    // 设置送样模态框数据
    $('#modal1-beginTime').val("");
    $('#modal1-endTime').val("");
    $("#date1").show();
    if (resultData != null) {
        $("#modal1_companyName").text(resultData.clientList[0].companyName);
        $("#modal1-sendSampleNumber").text(resultData.sampleInfoList.length);
        $("#modal1-sampleOrderNumber").text(resultData.sampleInfoList.length);
        var sum = 0;
        for (var i = 0; i < resultData.sampleInfoList.length; i++) {        // 计算确认收样的接运单数量
            if (resultData.sampleInfoList[i].samplingDate != null && resultData.sampleInfoList[i].samplingDate != '') {
                sum++;
            }
        }
        $("#modal1-samplePassNumber").text(sum);
        $("#modal1-sampleRejectNumber").text(resultData.sampleInfoList.length - sum);
        setSampleList(resultData.sampleInfoList);
    }
    $("#modal1").modal("show")
}

/**
 * 为送样模态框设置克隆数据
 * @param result
 */
function setSampleList(result) {
    console.log(result);
    $(".newLine").remove();                 // 删除旧数据
    // 获取id为cloneTr的tr元素
    var tr = $("#clone1");
    //tr.siblings().remove();
    var serialNumber = 0;
    $.each(result, function (index, item) {
        if (item.wastesList != null)
            $.each(item.wastesList, function (index1, item1) {
                serialNumber++;
                // 克隆tr，每次遍历都可以产生新的tr
                var clonedTr = tr.clone();
                clonedTr.addClass('myclass1');
                clonedTr.show();
                // 循环遍历cloneTr的每一个td元素，并赋值
                clonedTr.children("td").each(function (inner_index) {
                    var obj = eval(item1);
                    // 根据索引为部分td赋值
                    switch (inner_index) {
                        // 序号
                        case (0):
                            $(this).html(serialNumber);
                            break;
                        // 送样单位
                        case (1):
                            if (resultData != null && resultData.clientList[0] != null)
                                $(this).html(resultData.clientList[0].companyName);
                            break;
                        // 单据类型
                        case (2):
                            $(this).html("--");
                            break;
                        // 单据号
                        case (3):
                            $(this).html(item.id);
                            break;
                        // 危废八位码
                        case (4):
                            $(this).html(obj.code);
                            break;
                        // 危废俗称
                        case (5):
                            $(this).html(obj.name);
                            break;
                        // 负责人
                        case (6):
                            $(this).html(item.laboratorySigner);
                            break;
                        // 送样日期
                        case (7):
                            $(this).html(getDateStr(item.creationDate));
                            break;
                        // 来源数据类型
                        case (8):
                            if (item.signOrderId == "仓储部送样登记") {
                                $(this).html("仓储部送样登记");
                            } else {
                                $(this).html("市场部送样登记");
                            }
                            break;
                        // 单据状态
                        case (9):
                            if (item.applyState != null)
                                $(this).html(item.applyState.name);
                            break;
                        // 送样类型
                        case (10):
                            $(this).html("--");
                            break;
                        // 对应分析单单号(化验单单号)
                        case (11):
                            $(this).html(item.newId);
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
    });
}

var array = [];//存放所有的tr
var array1 = [];//存放目标的tr
/**
 * 送样模态框日期查询
 */
function searchDate1() {
    $('.myclass1').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass1'));
    //搜索关键字
    var beginTime = $.trim($('#modal1-beginTime').val());
    var endTime = $.trim($('#modal1-endTime').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            // 设置查询条件
            var time = $(this).children('td').eq(7).text();
            if (beginTime != null && endTime != null && beginTime != "" && endTime != "") {
                if (time > endTime || time < beginTime) {
                    $(this).hide();       //不满足条件的隐藏
                }
            } else if (!(time <= endTime || time >= beginTime)) {
                $(this).hide();
            }
            if (beginTime != null && endTime != null && (time <= endTime && time >= beginTime)) {
                array1.push($(this));     // 满足条件插入到数组中
            } else if (time <= endTime || time >= beginTime) {
                array1.push($(this));
            }
        });
    }
    // 将查询到的数据显示
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tBody1').append(this);
        });
    }
    // 若输入框未数据则将全部数据显示
    if (beginTime.length <= 0 && endTime.length <= 0) {
        $('.myclass1').each(function () {
            $(this).show();
        })
    }
}

/**
 * 送样模态框打印功能
 */
function print1() {
    //打印模态框
    $("#date1").hide();
    $("#modal1").printThis({});
}

/**
 * 详情2（经营合同统计）
 */
function viewData2() {
    $('#modal2-beginTime').val("");
    $('#modal2-endTime').val("");
    $("#date2").show();
    if (resultData != null) {
        $("#modal2_companyName").text(resultData.clientList[0].companyName);
        setContractList(resultData.contractList);
    }
    $("#modal2").modal("show")
}

/**
 * 设置合同模态框数据
 */
function setContractList(result) {
    console.log(result);
    $(".newLine").remove();                 // 删除旧数据
    // 获取id为cloneTr的tr元素
    var tr = $("#clone2");
    //tr.siblings().remove();
    var serialNumber = 0;
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass("myclass2");
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(serialNumber);
                    break;
                // 合同状态
                case (1):
                    if (obj.checkState != null)
                        $(this).html(obj.checkState.name);
                    break;
                // 合同编号
                case (2):
                    $(this).html(obj.contractId);
                    break;
                // 开始日期
                case (3):
                    $(this).html(getDateStr(obj.beginTime));
                    break;
                // 截止日期
                case (4):
                    $(this).html(getDateStr(obj.endTime));
                    break;
                // 业务员
                case (5):
                    $(this).html(obj.salesmanName);
                    break;
                // 整单金额
                case (6):
                    if (obj.totalPrice != "" && obj.totalPrice != null)
                        $(this).html(obj.totalPrice.toFixed(2));
                    break;
                // 合同附件名
                case (7):
                    $(this).html(obj.contractAppendicesUrl);
                    break;
                // 经营合同详情（暂用正文数据）
                case (8):
                    //$(this).html();
                    $(this).find("#modal_contractAppendices").click(function () {
                        if (obj.contractAppendicesUrl != null && obj.contractAppendicesUrl != "") {
                            window.open('downloadFile?filePath=' + obj.contractAppendicesUrl);
                        } else {
                            alert("未上传文件");
                        }
                    });
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
 * 合同模态框日期查询
 */
function searchDate2() {
    $('.myclass2').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass2'));
    //搜索关键字
    var beginTime = $.trim($('#modal2-beginTime').val());
    var endTime = $.trim($('#modal2-endTime').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            // 设置查询条件
            var time = $(this).children('td').eq(3).text();
            if (beginTime != null && endTime != null && beginTime != "" && endTime != "") {
                if (time > endTime || time < beginTime) {
                    $(this).hide();
                }
            } else if (!(time <= endTime || time >= beginTime)) {
                $(this).hide();
            }
            if (beginTime != null && endTime != null && (time <= endTime && time >= beginTime)) {
                array1.push($(this));
            } else if (time <= endTime || time >= beginTime) {
                array1.push($(this));
            }
        });
    }
    // 将查询到的数据显示
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tBody2').append(this);
        });
    }
    // 若输入框未输入数据则全部显示
    if (beginTime.length <= 0 && endTime.length <= 0) {
        $('.myclass2').each(function () {
            $(this).show();
        })
    }
}

/**
 * 合同模态框打印功能
 */
function print2() {
    //打印模态框
    $("#date2").hide();
    $("#modal2").printThis({});
}

/**
 * 详情3（派车统计）
 */
function viewData3() {
    $('#modal3-beginTime').val("");
    $('#modal3-endTime').val("");
    $("#date3").show();
    // $("#detail3").preventDefault();
    $("#modal3").modal("show")
}

/**
 * 派车模态框打印功能
 */
function print3() {
    //打印模态框
    $("#date3").hide();
    $("#modal3").printThis({});
}

/**
 * 详情4(危废接收)
 */
function viewData4() {
    $('#modal4-beginTime').val("");
    $('#modal4-endTime').val("");
    $("#date4").show();
    if (resultData != null) {
        $("#modal4_companyName").text(resultData.clientList[0].companyName);
        setInboundOrderItemList(resultData.inboundOrderItemList);
    }
    $("#modal4").modal("show")
}

/**
 * 设置危废接收模态框
 * @param result
 */
function setInboundOrderItemList(result) {
    $(".newLine").remove();                 // 删除旧数据
    // 获取id为cloneTr的tr元素
    var tr = $("#clone4");
    //tr.siblings().remove();
    var serialNumber = 0;
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass("myclass4");
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(serialNumber);
                    break;
                // 八位码
                case (1):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.wastesId);
                    break;
                // 危废名称
                case (2):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.name);
                    break;
                // 包装类型
                case (3):
                    if (obj.packageType != null)
                        $(this).html(obj.packageType.name);
                    break;
                // 数量
                case (4):
                    $(this).html(obj.wastesAmount.toFixed(2));
                    break;
                // 单位
                case (5):
                    $(this).html("吨");
                    break;
                // 转移联单号
                case (6):
                    $(this).html(obj.transferDraftId);
                    break;
                // 入库时间
                case (7):
                    $(this).html(getDateStr(obj.inboundDate));
                    break;
                // 生命周期
                case (8):
                    $(this).html("--");
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
 * 危废接收模态框日期查询
 */
function searchDate4() {
    $('.myclass4').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass4'));
    //搜索关键字
    var beginTime = $.trim($('#modal4-beginTime').val());
    var endTime = $.trim($('#modal4-endTime').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            // 设置查询条件
            var time = $(this).children('td').eq(7).text();
            if (beginTime != null && endTime != null && beginTime != "" && endTime != "") {
                if (time > endTime || time < beginTime) {
                    $(this).hide();       //不满足条件的隐藏
                }
            } else if (!(time <= endTime || time >= beginTime)) {
                $(this).hide();
            }
            if (beginTime != null && endTime != null && (time <= endTime && time >= beginTime)) {
                array1.push($(this));     // 满足条件插入到数组中
            } else if (time <= endTime || time >= beginTime) {
                array1.push($(this));
            }
        });
    }
    // 将查询到的数据显示
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tBody4').append(this);
        });
    }
    // 若输入框未数据则将全部数据显示
    if (beginTime.length <= 0 && endTime.length <= 0) {
        $('.myclass4').each(function () {
            $(this).show();
        })
    }
}

/**
 * 危废接收模态框打印功能
 */
function print4() {
    //打印模态框
    $("#date4").hide();
    $("#modal4").printThis({});
}

/**
 * 详情5（危废处置）
 */
function viewData5() {
    $('#modal5-beginTime').val("");
    $('#modal5-endTime').val("");
    $("#date5").show();
    if (resultData != null) {
        $("#modal5_companyName").text(resultData.clientList[0].companyName);
        setOutBoundList(resultData.outboundOrderList);
    }
    $("#modal5").modal("show")
}

/**
 * 设置危废处置模态框数据
 */
function setOutBoundList(result) {
    console.log("出库数据：");
    console.log(result);
    $(".newLine").remove();                 // 删除旧数据
    // 获取id为cloneTr的tr元素
    var tr = $("#clone5");
    //tr.siblings().remove();
    var serialNumber = 0;
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass("myclass5");
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(serialNumber);
                    break;
                // 八位码
                case (1):
                    $(this).html(obj.wasteCategory);
                    break;
                // 危废名称
                case (2):
                    $(this).html(obj.wastesName);
                    break;
                // 包装类型
                case (3):
                    if (obj.packageType != null)
                        $(this).html(obj.packageType.name);
                    break;
                // 数量
                case (4):
                    if (obj.outboundNumber != null)
                        $(this).html(obj.outboundNumber.toFixed(2));
                    break;
                // 单位
                case (5):
                    $(this).html("吨");
                    break;
                // 转移联单号
                case (6):
                    $(this).html(obj.transferDraftId);
                    break;
                // 出库时间
                case (7):
                    $(this).html(getDateStr(obj.outboundDate));
                    break;
                // 生命周期
                case (8):
                    $(this).html("--");
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
 * 危废处置模态框日期查询
 */
function searchDate5() {
    $('.myclass5').each(function () {
        $(this).show();
    });
    array = [];//清空数组
    array1 = [];
    array.push($('.myclass5'));
    //搜索关键字
    var beginTime = $.trim($('#modal5-beginTime').val());
    var endTime = $.trim($('#modal5-endTime').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            // 设置查询条件
            var time = $(this).children('td').eq(7).text();
            if (beginTime != null && endTime != null && beginTime != "" && endTime != "") {
                if (time > endTime || time < beginTime) {
                    $(this).hide();       //不满足条件的隐藏
                }
            } else if (!(time <= endTime || time >= beginTime)) {
                $(this).hide();
            }
            if (beginTime != null && endTime != null && (time <= endTime && time >= beginTime)) {
                array1.push($(this));     // 满足条件插入到数组中
            } else if (time <= endTime || time >= beginTime) {
                array1.push($(this));
            }
        });
    }
    // 将查询到的数据显示
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tBody5').append(this);
        });
    }
    // 若输入框未数据则将全部数据显示
    if (beginTime.length <= 0 && endTime.length <= 0) {
        $('.myclass5').each(function () {
            $(this).show();
        })
    }
}

/**
 * 危废处置模态框打印功能
 */
function print5() {
    //打印模态框
    $("#date5").hide();
    $("#modal5").printThis({});
}

/**
 * 详情6（企业相关附件）
 */
function viewData6() {
    if (resultData != null && resultData.clientList[0] != null){
        $("#modal6_companyName").text(resultData.clientList[0].companyName);
        setFileList(resultData.clientList[0]);
    }
    $("#modal6").modal("show");
}


/**
 * 设置危废处置模态框数据
 */
function setFileList(result) {
    console.log("数据：");
    console.log(result);
    $(".newLine").remove();                 // 删除旧数据
    // 获取id为cloneTr的tr元素
    var tr = $("#clone6");
    var fileList = [];
    fileList.push(result.processAttachmentUrl);
    fileList.push(result.materialAttachmentUrl);
    //tr.siblings().remove();
   var i = 0;
    $.each(fileList,function(index,item){ // 总共两个附件
        i++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass("myclass5");
        clonedTr.show();
        console.log(item);
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(i);
                    break;
                // 文件名称
                case (1):
                    $(this).html(item);
                    break;
                // 上传日期
                case (2):
                    $(this).html(getDateStr(result.createTime));
                    break;
                // 文件类型
                case (3):
                    var index1 = item.indexOf(".");
                    var result1 = item.substr(index1 + 1,item.length);
                    $(this).html(result1);
                    break;
                // 上传人
                case (4):
                    $(this).html(result.creator);
                    break;
                case (5):
                    $(this).find("#modal6_contractAppendices").click(function () {
                        if (item != null && item != "") {
                            window.open('downloadFile?filePath=' + item);
                        } else {
                            alert("未上传文件");
                        }
                    });
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    }
);
// 隐藏无数据的tr
tr.hide();
}

/**
 * 合同附件模态框打印功能
 */
function print6() {
    //打印模态框
    $("#modal6").printThis({});
}