function loadDate() {

}

function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    var week = parseInt(day / 7) + a;
    return year + "年" + month + "月" + day + "日";
}

//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}

/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

//-----------------------------

var pretreatmentId = "";    //预处理单号
var num = 0;               //克隆行数
var pretreatmentIdArray = [];
var burnOrderId;      //焚烧工单号
var i1 = 0;           //焚烧工单序号
/**
 * 设置预处理单列表数据
 */
function loadPretreatmentList() {
    i1 = 0;                         //刷新页面时重新计数
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
        serialNumber++;
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
 * 获取预处理单号(双击)
 * @param item
 * @returns {string}
 */
function getPretreatmentId(item) {
    return item.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
}

/**
 * 获取预处理单号（单击）
 * @param item
 * @returns {*}
 */
function getPretreatmentId1(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
}


/**
 * 双击编辑暂存点位置
 * @param item
 */
function toUpdate1(item) {
    pretreatmentId = getPretreatmentId(item);
    showViewModal(pretreatmentId);
}

/**
 * 单击编辑暂存点位置
 * @param item
 */
function toUpdate(item) {
    pretreatmentId = getPretreatmentId1(item);
    showViewModal(pretreatmentId);
}

/**
 * 显示预处理单编辑模态框
 * @param id
 */
function showViewModal(id) {
    $(".newLine").remove();
    $.ajax({
        type: "POST",
        url: "getPretreatmentById",
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
 * 为预处理编辑模态框设置克隆数据
 * @param result
 */
function setViewPretreatmentClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone");
    num = 0;
    $.each(result.pretreatmentItemList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        //重设id
        console.log("num:" + num);
        clonedTr.children().find("input").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num + 1);
            $(this).prop('id', newId);
        });
        num++;
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
                // case (18):
                //     //预处理暂存点
                //     if(obj.temporaryAddress != null || obj.temporaryAddress != "")
                //         $(this).text(obj.temporaryAddress);
                //     break;

            }
            var $num = num + 1;
            $("#view["+ $num +"]-temporaryAddress").text(obj.temporaryAddress);
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
function confirmInsert() {
// 定义焚烧工单，存储勾选预处理单
    var burnOrderList = [];
    var currentId = parseInt(getCurrentBurnOrderId());
    // 遍历计划单表格行，获取勾选的计划列表
    $("#pretreatmentData").children().not("#clone1").each(function () {
        //检查焚烧单号是否存在
        $("#burnOrderData").children().not("#burnOrderClonedTr").each(function () {
            while(currentId.toString() === $(this).find("td[name='burnOrder-burnOrderId']").text()){
                currentId++;
            }
        });
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var pretreatmentId1 = $(this).find("td[name='pretreatmentId']").text();
            if ($.inArray(pretreatmentId1, pretreatmentIdArray) == -1) {
                pretreatmentIdArray.push(pretreatmentId1);
                var burnOrder = {};
                burnOrder.id = currentId.toString();
                var pretreatment = {};
                pretreatment.id = pretreatmentId1;
                pretreatment.weightTotal = $(this).find("td[name='weightTotal']").text();
                pretreatment.remarks = $(this).find("td[name='remarks']").text();
                pretreatment.bulkProportion = $(this).find("td[name='bulkProportion']").text();
                pretreatment.distillationProportion = $(this).find("td[name='distillationProportion']").text();
                pretreatment.wasteLiquidProportion = $(this).find("td[name='wasteLiquidProportion']").text();
                pretreatment.sludgeProportion = $(this).find("td[name='sludgeProportion']").text();
                burnOrder.pretreatment = pretreatment;
                burnOrder.state = "新建";
                burnOrder.creationDate = getWeekDate();
                burnOrderList.push(burnOrder);
                currentId++;
                console.log(currentId);
            }
        }
    });
    // 遍历js对象数组列表，循环增加入库单条目列表
    for (var i = 0; i < burnOrderList.length; i++) {
        i1++;
        var tr = $("#burnOrderClonedTr");
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        var obj = eval(burnOrderList[i]);
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    //序号
                    $(this).html(i1);
                    break;
                case (1):
                    //焚烧工单号
                    $(this).html(obj.id);
                    break;
                case(2):
                    //预处理单号
                    $(this).html(obj.pretreatment.id);
                    break;
                case (3):
                    //状态
                    $(this).html(obj.state);
                    break;
                case (4):
                    //创建日期
                    $(this).html(obj.creationDate);
                    break;
                case (5):
                    //总重量
                    $(this).html(obj.pretreatment.weightTotal);
                    break;
                case (6):
                    //备注
                    $(this).html(obj.pretreatment.remarks);
                    break;
                case (7):
                    //散装比例
                    $(this).html(obj.pretreatment.bulkProportion);
                    break;
                case (8):
                    //残渣比例
                    $(this).html(obj.pretreatment.distillationProportion);
                    break;
                case (9):
                    //废液比例
                    $(this).html(obj.pretreatment.wasteLiquidProportion);
                    break;
                case (10):
                    //污泥比例
                    $(this).html(obj.pretreatment.sludgeProportion);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
}

/**
 * 将焚烧工单数据添加到数据库
 */
function save(){
    var res = false;
    $("#burnOrderData").children().not("#burnOrderClonedTr").each(function () {
        var burnOrder = {};
        burnOrder.id = $(this).find("td[name='burnOrder-burnOrderId']").text();
        console.log("burnOrderId:" + burnOrder.id);
        var pretreatment = {};
        pretreatment.id = $(this).find("td[name='burnOrder-pretreatmentId']").text();
        burnOrder.pretreatment = pretreatment;
        //将焚烧工单数据插入到数据库
        $.ajax({
            type: "POST",
            url: "insertNewBurnOrder",
            async: false,
            data: JSON.stringify(burnOrder),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if(result.status == "success"){
                    console.log(result.message);
                    res = true;
                }else alert(result.message);
            },
            error:function (result) {
                console.log(result.message);
                res = false;
            }
        });
    });
    if(res === true){
        alert("焚烧工单添加成功！");
        window.location.href="burnOrderList.html";
    }else if (res === false){
        alert("焚烧工单添加失败！");
    }


}

/**
 * 添加预处理暂存点位置信息
 */
function addTemporaryAddress() {
    //遍历获取暂存点数据
    var pretreatment = {};
    pretreatment.id = pretreatmentId;
    var pretreatmentItemList= [];
    for(var i = 0; i < num ; i++){
        var $i = i + 1;
        var pretreatmentItem = {};
        pretreatmentItem.temporaryAddress = $("#view["+ $i +"]-temporaryAddress").text();
        pretreatmentItem.serialNumber = $i;
        pretreatmentItemList.push(pretreatmentItem);
    }
    pretreatment.pretreatmentItemList = pretreatmentItemList;
    $.ajax({
        type: "POST",
        url: "updateTemporaryAddressById",
        async: false,
        data: JSON.stringify(pretreatment),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.status == "success") {
                alert(result.message);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 获取当前焚烧工单编号
 */
function getCurrentBurnOrderId() {
    var id1 = "";
    $.ajax({
        type: "POST",
        url: "getCurrentBurnOrderId",
        async: false,
        dataType: "json",
        success: function (result) {
              id1 = result.id;
              console.log("id:" + id1);
        },
        error: function (result) {
            alert("服务器异常!");
        }
    });
    return id1;
}

/**
 * 获取焚烧工单号(双击)
 * @param item
 * @returns {string}
 */
function getBurnOrderId(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 获取焚烧工单号（单击）
 * @param item
 * @returns {string}
 */
function getBurnOrderId1(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 双击查看焚烧工单
 * @param item
 */
function toView(item) {
    burnOrderId = getBurnOrderId(item);
    showBurnOrderViewModal(burnOrderId);
}

/**
 * 单击查看焚烧工单
 */
function toView1(item) {
    burnOrderId = getBurnOrderId1(item);
    showBurnOrderViewModal(burnOrderId);
}

/**
 * 显示焚烧工单模态框
 * @param id
 */
function showBurnOrderViewModal(id) {
    $(".newLine").remove();
    $.ajax({
        type: "POST",
        url: "getBurnOrderById",
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
                setViewBurnOrderClone(result.data.pretreatment);
                $("#view1-Id").text(data.id);
                $("#view1-remarks").text(data.pretreatment.remarks);
                $("#view1-weightTotal").text(data.pretreatment.weightTotal);
                $("#view1-calorificTotal").text(data.pretreatment.calorificTotal);
                $("#view1-ashPercentageTotal").text(data.pretreatment.ashPercentageTotal);
                $("#view1-wetPercentageTotal").text(data.pretreatment.wetPercentageTotal);
                $("#view1-volatileNumberTotal").text(data.pretreatment.volatileNumberTotal);
                $("#view1-chlorinePercentageTotal").text(data.pretreatment.chlorinePercentageTotal);
                $("#view1-sulfurPercentageTotal").text(data.pretreatment.sulfurPercentageTotal);
                $("#view1-phTotal").text(data.pretreatment.phTotal);
                $("#view1-phosphorusPercentageTotal").text(data.pretreatment.phosphorusPercentageTotal);
                $("#view1-fluorinePercentageTotal").text(data.pretreatment.fluorinePercentageTotal);
                $("#view1-distillationProportion").text(data.pretreatment.distillationProportion);
                $("#view1-wasteLiquidProportion").text(data.pretreatment.wasteLiquidProportion);
                $("#view1-sludgeProportion").text(data.pretreatment.sludgeProportion);
                $("#view1-bulkProportion").text(data.pretreatment.bulkProportion);
                $("#view1-crushingProportion").text(data.pretreatment.crushingProportion);
                $("#view1-suspensionProportion").text(data.pretreatment.suspensionProportion);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#viewModal1").modal('show');
}

/**
 * 为查看模态框设置克隆数据
 * @param result
 */
function setViewBurnOrderClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone1");
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
                case (18):
                    //预处理暂存点
                    if(obj.temporaryAddress != null || obj.temporaryAddress != "")
                        $(this).html(obj.temporaryAddress);
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

