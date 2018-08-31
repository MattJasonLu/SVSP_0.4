function view1() {
    $("#appointModal2").modal("show");
}
function view2() {
    $("#examineModal").modal("show");
}
//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}
/**
 * 获取用户的编号
 * @param item
 * @returns {string}
 */
function getId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

/**
 * 作废计划单
 * @param item 用户
 */
function changeAttribute(item) {
    $("#examineModal").modal("show");
}
/**
 * 作废计划单
 * @param item 用户
 */
function cancel(item) {
    var id = getId(item);
    var r = confirm("确认作废？");
    if (r === true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'model-wastesCode': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result !== undefined) {
                    if (result.status === "success") {
                        alert("作废成功");
                        window.location.reload();
                    } else if (result.status === "fail") {
                        alert("作废失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}
/**
 * 签收计划单
 * @param item 用户
 */
function signIn(item) {
    var id = getId(item);
    var r = confirm("确认签收？");
    if (r === true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'model-wastesCode': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result !== undefined) {
                    if (result.status === "success") {
                        alert("禁用成功");
                        window.location.reload();
                    } else if (result.status === "fail") {
                        alert("禁用失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

var inboundPlanOrderIdArray = [];

/**
 * 读取入库计划单数据
 */
function loadInboundPlanOrder() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#planClonedTr");
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
                    $(this).html(obj.inboundPlanOrderId);
                    break;
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                case (3):
                    $(this).html(getDateStr(obj.planDate));
                    break;
                case (4):
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (5):
                    if (obj.acceptCompany != null)
                        $(this).html(obj.acceptCompany.companyName);
                    break;
                case (6):
                    $(this).html(getDateStr(obj.transferDate));
                    break;
                case (7):
                    $(this).html(obj.transferCount);
                    break;
                case (8):
                    $(this).html(obj.poundsCount);
                    break;
                case (9):
                    $(this).html(obj.storageCount);
                    break;
                case (10):
                    $(this).html(obj.leftCount);
                    break;
                case (11):
                    $(this).html(obj.prepareTransferCount);
                    break;
                case (12):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.name);
                    break;
                case (13):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.wastesId);
                    break;
                case (14):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.category);
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
 * 增加计划单到入库单中
 */
function addPlan2Order() {
    // 定义计划列表，存储勾选的计划
    var planList = [];
    // 遍历计划单表格行，获取勾选的计划列表
    $("#planOrderData").children().not("#planClonedTr").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var inboundPlanOrderId = $(this).find("td[name='inboundPlanOrderId']").text();
            if ($.inArray(inboundPlanOrderId, inboundPlanOrderIdArray) == -1) {
                inboundPlanOrderIdArray.push(inboundPlanOrderId);
                var plan = {};
                plan.inboundPlanOrderId = inboundPlanOrderId;
                plan.transferDraftId = $(this).find("td[name='transferDraftId']").text();
                plan.planDate = $(this).find("td[name='planDate']").text();
                plan.produceCompanyName = $(this).find("td[name='produceCompanyName']").text();
                plan.acceptCompanyName = $(this).find("td[name='acceptCompanyName']").text();
                plan.transferDate = $(this).find("td[name='transferDate']").text();
                plan.transferCount = $(this).find("td[name='transferCount']").text();
                plan.poundsCount = $(this).find("td[name='poundsCount']").text();
                plan.storageCount = $(this).find("td[name='storageCount']").text();
                plan.leftCount = $(this).find("td[name='leftCount']").text();
                plan.prepareTransferCount = $(this).find("td[name='prepareTransferCount']").text();
                plan.wastesName = $(this).find("td[name='wastesName']").text();
                plan.wastesCode = $(this).find("td[name='wastesCode']").text();
                plan.wastesCategory = $(this).find("td[name='wastesCategory']").text();
                planList.push(plan);
            }
        }
    });
    // 遍历js对象数组列表，循环增加入库单条目列表
    for (var i = 0; i < planList.length; i++) {
        var tr = $("#inboundClonedTr");
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='index']").text(i+1);
        clonedTr.find("td[name='inboundPlanOrderId']").text(planList[i].inboundPlanOrderId);
        clonedTr.find("td[name='transferDraftId']").text(planList[i].transferDraftId);
        clonedTr.find("td[name='produceCompanyName']").text(planList[i].produceCompanyName);
        clonedTr.find("td[name='wastesName']").text(planList[i].wastesName);
        clonedTr.find("td[name='wastesCode']").text(planList[i].wastesCode);
        clonedTr.find("td[name='wastesAmount']").text(planList[i].poundsCount);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
    // 设置下拉框数据
    setSelectItem();
}

/**
 * 设置下拉框数据
 */
function setSelectItem() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWay",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var processWayArray = $("select[name='processWay']");
                for (var i = 0; i < processWayArray.length; i++) {
                    var processWay = $(processWayArray[i]);
                    // console.log(processWay);
                    processWay.children().remove();
                    $.each(data.processWayList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        processWay.append(option);
                    });
                    processWay.get(0).selectedIndex = -1;
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var handleCategoryArray = $("select[name='handleCategory']");
                for (var i = 0; i < handleCategoryArray.length; i++) {
                    var handleCategory = $(handleCategoryArray[i]);
                    handleCategory.children().remove();
                    $.each(data.handleCategoryList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        handleCategory.append(option);
                    });
                    handleCategory.get(0).selectedIndex = -1;
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 增加入库单
 */
function addInboundOrder(type) {
    var inboundOrderItemList = [];
    $("#inboundOrderData").children().not("#inboundClonedTr").each(function () {
        var inboundOrder = {};
        inboundOrder.inboundPlanOrderId = $(this).find("td[name='inboundPlanOrderId']").text();
        inboundOrder.transferDraftId = $(this).find("td[name='transferDraftId']").text();
        var produceCompany = {};
        produceCompany.companyName = $(this).find("td[name='produceCompanyName']").text();
        inboundOrder.produceCompany = produceCompany;
        var wastes = {};
        wastes.name = $(this).find("td[name='wastesName']").text();
        wastes.wastesId = $(this).find("td[name='wastesCode']").text();
        inboundOrder.wastes = wastes;
        inboundOrder.wastesAmount = $(this).find("td[name='wastesAmount']").text();
        inboundOrder.unitPriceTax = $(this).find("td[name='unitPriceTax']").text();
        inboundOrder.totalPrice = $(this).find("td[name='totalPrice']").text();
        inboundOrder.processWay = $(this).find("select[name='processWay']").val();
        inboundOrder.handleCategory = $(this).find("select[name='handleCategory']").val();
        inboundOrder.remarks = $(this).find("input[name='remarks']").val();
        inboundOrder.warehouseArea = $(this).find("input[name='warehouseArea']").val();
        inboundOrderItemList.push(inboundOrder);
    });
    var data = {};
    data.inboundOrderItemList = inboundOrderItemList;

    $.ajax({
        type: "POST",                       // 方法类型
        url: "addInboundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                alert(result.message);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}