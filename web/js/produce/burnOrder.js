function loadDate(){

}
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var week = parseInt(day / 7) + a;
    return year + "年" + month + "月" + day + "日";
}
//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}
/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

//-----------------------------
/**
 * 设置预处理单列表数据
 */
function loadPretreatmentList(){
    //设置创建日期
    $("#date").val(getWeekDate());
    //获取数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPretreatmentList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPretreatmentList(result.data);
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
 * 设置预处理单数据
 * @param result
 */
function setPretreatmentList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone1");
    tr.siblings().remove();
    var serialNumber = 0;
    $.each(result, function (index, item) {
        serialNumber ++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case(1):
                    //序号
                    $(this).html(serialNumber);
                    break;
                case (2):
                    // 预处理单号
                    $(this).html(obj.id);
                    break;
                case (3):
                    // 状态
                    $(this).html(obj.state.name);
                    break;
                case (4):
                    // 创建日期
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                case (5):
                    // 重量合计
                    $(this).html(obj.weightTotal);
                    break;
                case (6):
                    // 备注
                    $(this).html(obj.remarks);
                    break;
                case (7):
                    // 散装比例
                    $(this).html(obj.bulkProportion);
                    break;
                case (8):
                    // 残渣比例
                    $(this).html(obj.distillationProportion);
                    break;
                case (9):
                    // 废液比例
                    $(this).html(obj.wasteLiquidProportion);
                    break;
                case (10):
                    // 污泥比例
                    $(this).html(obj.sludgeProportion);
                    break;
                case(11):
                    //预处理暂存点
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
 * 获取预处理单号
 * @param item
 * @returns {string}
 */
function getPretreatmentId(item) {
    return item.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
}

/**
 * 双击查看
 * @param item
 */
function toView(item) {
    var id = getPretreatmentId(item);
    showViewModal(id);
}

/**
 * 显示查看模态框
 * @param id
 */
function showViewModal(id) {
    $(".newLine").remove();
    $.ajax({
        type: "POST",
        url: "getById",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                //设置数据
                var data = eval(result.data);
                console.log(result);
                setViewPretreatmentClone(result.data);
                $("#view-pretreatmentId").text(data.id);
                $("#view-remarks").text(data.remarks);
                $("#view-weightTotal").text(data.weightTotal);
                $("#view-calorificTotal").text(data.calorificTotal);
                $("#view-ashPercentageTotal").text(data.ashPercentageTotal);
                $("#view-wetPercentageTotal").text(data.wetPercentageTotal);
                $("#view-volatileNumberTotal").text(data.volatileNumberTotal);
                $("#view-chlorinePercentageTotal").text(data.chlorinePercentageTotal);
                $("#view-sulfurPercentageTotal").text(data.sulfurPercentageTotal);
                $("#view-phTotal").text(data.phTotal);
                $("#view-phosphorusPercentageTotal").text(data.phosphorusPercentageTotal);
                $("#view-fluorinePercentageTotal").text(data.fluorinePercentageTotal);
                $("#view-distillationProportion").text(data.distillationProportion);
                $("#view-wasteLiquidProportion").text(data.wasteLiquidProportion);
                $("#view-sludgeProportion").text(data.sludgeProportion);
                $("#view-bulkProportion").text(data.bulkProportion);
                $("#view-crushingProportion").text(data.crushingProportion);
                $("#view-suspensionProportion").text(data.suspensionProportion);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#viewModal").modal('show');
}

/**
 * 为查看模态框设置克隆数据
 * @param result
 */
function setViewPretreatmentClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone");
    $.each(result.pretreatmentItemList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 序号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 产废单位
                    $(this).html(obj.produceCompanyName);
                    break;
                case (2):
                    // 指标要求及来源
                    $(this).html(obj.requirements);
                    break;
                case (3):
                    // 危废名称
                    $(this).html(obj.wastes.name);
                    break;
                case (4):
                    // 比例
                    $(this).html(obj.proportion);
                    break;
                case (5):
                    // 重量（吨）
                    $(this).html(obj.wastes.weight);
                    break;
                case (6):
                    // 危废热值
                    $(this).html(obj.wastes.calorific);
                    break;
                case (7):
                    // 灰分
                    $(this).html(obj.wastes.ashPercentage);
                    break;
                case (8):
                    // 水分
                    $(this).html(obj.wastes.wetPercentage);
                    break;
                case (9):
                    // 挥发份
                    $(this).html(obj.wastes.volatileNumber);
                    break;
                case (10):
                    // 氯
                    $(this).html(obj.wastes.chlorinePercentage);
                    break;
                case (11):
                    // 硫
                    $(this).html(obj.wastes.sulfurPercentage);
                    break;
                case (12):
                    // PH
                    $(this).html(obj.wastes.ph);
                    break;
                case (13):
                    // P
                    $(this).html(obj.wastes.phosphorusPercentage);
                    break;
                case (14):
                    // F
                    $(this).html(obj.wastes.fluorinePercentage);
                    break;
                case (15):
                    // 备注
                    $(this).html(obj.wastes.remarks);
                    break;
                case (16):
                    // 处置方式
                    $(this).html(obj.wastes.processWay.name);
                    break;
                case (17):
                    // 进料方式
                    $(this).html(obj.wastes.handleCategory.name);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.addClass("newLine");
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 添加焚烧工单
 */
function confirmInsert(){
// 定义计划列表，存储勾选的计划
    var planList = [];
    // 遍历计划单表格行，获取勾选的计划列表
    $("#burnOrderData").children().not("#planClonedTr").each(function () {
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
                plan.transferDraftId = $(this).find("td[name='transferDraftId']").text();
                plan.transferCount = $(this).find("td[name='transferCount']").text();
                plan.poundsCount = $(this).find("td[name='poundsCount']").text();
                plan.leftCount = $(this).find("td[name='leftCount']").text();
                plan.prepareTransferCount = $(this).find("td[name='prepareTransferCount']").text();
                plan.prepareTransferCount = $(this).find("td[name='prepareTransferCount']").text();
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
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(i+1);
                    break;
                case (1):
                    $(this).html(planList[i].inboundPlanOrderId);
                    break;
                case (2):
                    $(this).html(planList[i].produceCompanyName);
                    break;
                case (3):
                    $(this).html(planList[i].wastesName);
                    break;
                case (4):
                    $(this).html(planList[i].wastesCode);
                    break;
                case (5):
                    $(this).html(planList[i].poundsCount);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
}
