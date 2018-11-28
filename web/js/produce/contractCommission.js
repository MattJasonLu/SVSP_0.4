/**
 * 获取数据
 */
function loadContractPercentage() {
    loadNavigationList();  // 设置动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadContractPercentage",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setDataList(result);
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

function setDataList(result) {
    var tr = $("#clonedTr");//克隆一行
    //tr.siblings().remove();
    var totalContractAmount = 0;
    var totalEligibleQuantity = 0;
    $.each(result.data, function (index, item) {
        var obj = eval(item);
        totalContractAmount += obj.contractAmount;
        totalEligibleQuantity += obj.eligibleQuantity;
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                //签约量划分
                case (0):
                    if (obj.contractAmountMin == 0 || obj.contractAmountMin == null)
                        $(this).html("签约量<" + obj.contractAmountMax);
                    else if (obj.contractAmountMax == null || obj.contractAmountMax == 0)
                        $(this).html(obj.contractAmountMin+"≤签约量");
                    else $(this).html(obj.contractAmountMin+"≤签约量<"+obj.contractAmountMax);
                    break;
                //合约量
                case (1):
                    $(this).html(obj.contractAmount);
                    break;
                //符合条件量
                case (2):
                    $(this).html(obj.eligibleQuantity);
                    break;
                //提成比例
                case (3):
                    $(this).html(obj.commissionRatio.toFixed(3));
                    break;
                //加权平均提成比例
                case (4):
                    $(this).html(obj.weightedAverageCommissionRatio.toFixed(3));
                    break;
            }
        });
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    // 总计数据赋值
    $("#totalContractAmount").text(totalContractAmount);
    $("#totalEligibleQuantity").text(totalEligibleQuantity);
}

//////////////////////////编辑页面////////////////////
/**
 * 获取数据
 */
function loadContractPercentage1() {
    loadNavigationList();  // 设置动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadContractPercentage",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setDataList1(result);
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


function setDataList1(result) {
    var tr = $("#clonedTr");//克隆一行
    //tr.siblings().remove();
    var totalContractAmount = 0;
    var totalEligibleQuantity = 0;
    var num = 0;
    $.each(result.data, function (index, item) {
        var obj = eval(item);
        totalContractAmount += obj.contractAmount;
        totalEligibleQuantity += obj.eligibleQuantity;
        var clonedTr = tr.clone();
        num++;
        if (num > 1) {       // 将非第一行的其他行添加上减行按钮
            var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
            clonedTr.children("td:eq(0)").prepend(delBtn);
        }
        clonedTr.children().find("input").each(function () {  // 更新ID
            //id更新
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, parseInt(num) - 1);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                //签约量划分
                case (0):
                    $(this).find("input").eq(0).val(obj.contractAmountMin);
                    if(obj.contractAmountMax == null || obj.contractAmountMax == 0){}
                    else $(this).find("input").eq(1).val(obj.contractAmountMax);
                    break;
                //合约量
                case (1):
                    $(this).find("input").val(obj.contractAmount);
                    break;
                //符合条件量
                case (2):
                    $(this).find("input").val(obj.eligibleQuantity);
                    break;
                //提成比例
                case (3):
                    $(this).find("input").val(obj.commissionRatio.toFixed(3));
                    break;
                //加权平均提成比例
                case (4):
                    $(this).find("input").val(obj.weightedAverageCommissionRatio.toFixed(3));
                    break;
            }
        });
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 删除无数据的tr
    tr.remove();
    // 总计数据赋值
    $("#totalContractAmount1").text(totalContractAmount);
    $("#totalEligibleQuantity1").text(totalEligibleQuantity);
}

/**
 * 即时计算总和
 */
function calculateTotal(){
    var lineCount = $("input[id^='contractAmountMin']").length;   // 获取总行数
    console.log("lineCount:"+lineCount);
    var totalContractAmount = 0;
    var totalEligibleQuantity = 0;
    for(var $i = 1; $i < lineCount; $i++){
        var contractAmount = $("#contractAmount" + $i).val();
        var eligibleQuantity = $("#eligibleQuantity" + $i).val();
        if(contractAmount != null || contractAmount != '')
            totalContractAmount += parseFloat(contractAmount);
        if(eligibleQuantity != null || eligibleQuantity != '')
            totalEligibleQuantity += parseFloat(eligibleQuantity);
    }
    // 总计数据赋值
    $("#totalContractAmount1").text(totalContractAmount);
    $("#totalEligibleQuantity1").text(totalEligibleQuantity);
}

/**
 * 新增行
 */
function addNewLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#plusBtn1").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    // 获取编号
    var num = $("input[id^='contractAmountMin']").length;  //获取总行数
    clonedTr.children().find("input").each(function () {
        //id更新
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, parseInt(num));
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertBefore($("#plusBtn1"));
}

/**
 * 删除行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 2;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 1; i < length; i++) {
        tBody.children().eq(i).children().find("input").each(function () {
            //id更新
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
    }
}


/**
 * 保存更改的数据
 */
function saveData() {
    var contractPercentageList = [];
    var lineCount = $("input[id^='contractAmountMin']").length;  //获取总行数
    for (var i = 0; i < lineCount; i++) {
        var $i = i;
        var contractPercentage = {};
        contractPercentage.contractAmountMin = $("#contractAmountMin" + $i).val();
        contractPercentage.contractAmountMax = $("#contractAmountMax" + $i).val();
        contractPercentage.contractAmount = $("#contractAmount" + $i).val();
        contractPercentage.eligibleQuantity = $("#eligibleQuantity" + $i).val();
        contractPercentage.commissionRatio = $("#commissionRatio" + $i).val();
        contractPercentage.weightedAverageCommissionRatio = $("#weightedAverageCommissionRatio" + $i).val();
        contractPercentageList.push(contractPercentage);         // 将多个对象装到LIST中
    }
    console.log(contractPercentageList);
    $.ajax({
        type: "POST",
        url: "saveContractPercentageList",
        async: false, // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(contractPercentageList),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                if (confirm("保存成功，是否返回主页？"))
                    window.location.href = "contractCommission.html";
                else window.location.reload(); // 刷新界面
            }
            else {
                console.log(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
}
