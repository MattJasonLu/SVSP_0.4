// 客户对象
var client = {};
/**
 * 显示信息
 */
function viewClient() {
    $.ajax({
        type: "POST",                // 方法类型
        url: "getClient",            // url
        async: false,
        dataType: "json",
        data: {
            id: "0168"
        },
        success: function (result) {
            if (result != undefined) {
                client = result;
                $("#companyName").text(result.companyName);
                $("#organizationCode").text(result.organizationCode);
                $("#representative").text(result.representative);
                $("#industry").text(result.industry);
                if(result.enterpriseType != null) $("#enterpriseType").text(result.enterpriseType.name);
                if(result.operationType != null) $("#operationType").text(result.operationType.name);
                if(result.operationRecord != null) $("#operationRecord").text(result.operationRecord.name);
                $("#street").text(result.street);
                $("#clientId").text(result.clientId);
                $("#licenseCode").text(result.licenseCode);
                $("#postCode").text(result.postCode);
                $("#product").text(result.product);
                if(result.operationMode != null) $("#operationMode").text(result.operationMode.name);
                if(result.contingencyPlan != null) $("#contingencyPlan").text(result.contingencyPlan.name);
                if(result.applicationStatus != null) $("#applicationStatus").text(result.applicationStatus.name);
                $("#location").text(result.location);
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
 * 更新信息
 */
function updateClient() {
    var data = {
        clientId: '0168',
        companyName: $("#companyName").val(),
        organizationCode: $("#organizationCode").val(),
        representative: $("#representative").val(),
        industry: $("#industry").val(),
        enterpriseType: $("#enterpriseType").val(),
        operationType: $("#operationType").val(),
        operationRecord: $("#operationRecord").val(),
        street: $("#street").val(),
        licenseCode: $("#licenseCode").val(),
        postCode: $("#postCode").val(),
        product: $("#product").val(),
        operationMode: $("#operationMode").val(),
        contingencyPlan: $("#contingencyPlan").val(),
        applicationStatus: $("#applicationStatus").val(),
        location: $("#location").val()
    };
    console.log(data);
    //更新字表数据
    $.ajax({
        type: "POST",
        url: "saveClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
            // window.location.reload();
        }
    });

}

/**
 * 修改单元格为input或者select
 */
function readyForUpdate() {

    // 转变成input的数组
    var inputArray = ["companyName", "organizationCode", "representative", "industry", "street", "licenseCode", "postCode", "product", "location"];
    // 转变成select的数组
    var selectArray = ["enterpriseType", "operationType", "operationRecord", "operationMode", "contingencyPlan", "applicationStatus"];
    // 变更输入框
    for (var i = 0; i < inputArray.length; i++){
        // 通过id获取到单元格中的文本
        var td = $("#" + inputArray[i]);
        var content = td.text();
        // 文本清空
        td.text("");
        // 创建一个输入框
        var input = $('<input/>');
        input.val(content);      // 为输入框赋值
        input.attr("id", td.attr("id")); // 输入框设置id
        input.addClass("form-control"); // 增加样式
        td.append(input);
        // 单元格去掉id，保持id唯一性
        td.removeAttr("id");
    }
    // 变更下拉框
    for (var i = 0; i < selectArray.length; i++){
        // 通过id获取到单元格中的文本
        var td = $("#" + selectArray[i]);
        var content = td.text();
        // 文本清空
        td.text("");
        // 创建一个输入框
        var select = $('<select></select>');
        select.text(content);      // 为输入框赋值
        select.attr("id", td.attr("id")); // 输入框设置id
        select.addClass("form-control"); // 增加样式
        td.append(select);
        // 单元格去掉id，保持id唯一性
        td.removeAttr("id");
    }

    setInvoicedList();


    // 显示保存和取消按钮
    $("#save").removeClass("hidden");
    $("#close").removeClass("hidden");
    $("#editBtn").addClass("hidden");
}

/**
 * 设置下拉框数据
 */
function setInvoicedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 下拉框数据填充
                var enterpriseType = $("#enterpriseType");
                enterpriseType.children().remove();
                $.each(data.enterpriseTypeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    enterpriseType.append(option);
                });
                if (client != null && client.enterpriseType != null)
                    enterpriseType.val(client.enterpriseType.index - 1);
                else enterpriseType.get(0).selectedIndex = -1;

                var operationMode = $("#operationMode");
                operationMode.children().remove();
                $.each(data.operationModeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    operationMode.append(option);
                });

                if (client != null && client.operationMode != null)
                    operationMode.val(client.operationMode.index - 1);
                else operationMode.get(0).selectedIndex = -1;

                var operationType = $("#operationType");
                operationType.children().remove();
                $.each(data.operationTypeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    operationType.append(option);
                });
                if (client != null && client.operationType != null)
                    operationType.val(client.operationType.index - 1);
                else operationType.get(0).selectedIndex = -1;
                //
                var contingencyPlan = $("#contingencyPlan");
                contingencyPlan.children().remove();
                $.each(data.contingencyPlanStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    contingencyPlan.append(option);
                });
                if (client != null && client.contingencyPlan != null)
                    contingencyPlan.val(client.contingencyPlan.index - 1);
                else contingencyPlan.get(0).selectedIndex = -1;
                //
                var operationRecord = $("#operationRecord");
                operationRecord.children().remove();
                $.each(data.operationRecordStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    operationRecord.append(option);
                });
                if (client != null && client.operationRecord != null)
                    operationRecord.val(client.operationRecord.index - 1);
                else operationRecord.get(0).selectedIndex = -1;
                //
                var applicationStatus = $("#applicationStatus");
                applicationStatus.children().remove();
                $.each(data.applicationStatusStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    applicationStatus.append(option);
                });
                if (client != null && client.applicationStatus != null)
                    applicationStatus.val(client.applicationStatus.index - 1);
                else  applicationStatus.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}



