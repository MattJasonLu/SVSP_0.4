// 客户对象
var client = {};
/**
 * 显示信息
 */
function viewClient() {
    loadNavigationList();   // 动态菜单部署
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
                console.log(client)
                $("#companyName").text(result.companyName);
                $("#organizationCode").text(result.organizationCode);
                $("#representative").text(result.representative);
                $("#industry").text(result.industry);
                if(result.enterpriseTypeItem != null) $("#enterpriseType").text(result.enterpriseTypeItem.dictionaryItemName);
                if(result.operationTypeItem != null) $("#operationType").text(result.operationTypeItem.dictionaryItemName);
                if(result.operationRecordItem != null) $("#operationRecord").text(result.operationRecordItem.dictionaryItemName);
                $("#street").text(result.street);
                $("#clientId").text(result.clientId);
                $("#licenseCode").text(result.licenseCode);
                $("#postCode").text(result.postCode);
                $("#product").text(result.product);
                if(result.operationModelItem != null) $("#operationMode").text(result.operationModelItem.dictionaryItemName);
                if(result.contingencyPlanItem != null) $("#contingencyPlan").text(result.contingencyPlanItem.dictionaryItemName);
                if(result.applicationStatusItem != null) $("#applicationStatus").text(result.applicationStatusItem.dictionaryItemName);
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
        enterpriseTypeItem:{dataDictionaryItemId:$("#enterpriseType").val()} ,
        operationTypeItem:{dataDictionaryItemId:$("#operationType").val()} ,
        operationRecordItem:{dataDictionaryItemId:$("#operationRecord").val()} ,
        street: $("#street").val(),
        licenseCode: $("#licenseCode").val(),
        postCode: $("#postCode").val(),
        product: $("#product").val(),
        operationModelItem:{dataDictionaryItemId: $("#operationMode").val()},
        contingencyPlanItem: {dataDictionaryItemId:$("#contingencyPlan").val()},
        applicationStatusItem:{dataDictionaryItemId:$("#applicationStatus").val()},
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
    $("#function_-371").addClass("hidden");
}

/**
 * 设置下拉框数据
 */
function setInvoicedList() {

    //企业类型
    $.ajax({
        type: 'POST',
        url: "getEnterpriseTypeByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var enterpriseType = $("#enterpriseType");
                enterpriseType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    enterpriseType.append(option);
                });
                if (client != null && client.enterpriseTypeItem != null)
                    enterpriseType.val(client.enterpriseTypeItem.dataDictionaryItemId);
                else enterpriseType.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //危废经营记录情况
    $.ajax({
        type: 'POST',
        url: "getOperationRecordByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var operationRecord = $("#operationRecord");
                operationRecord.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    operationRecord.append(option);
                });
                if (client != null && client.operationRecordItem != null)
                    operationRecord.val(client.operationRecordItem.dataDictionaryItemId);
                else operationRecord.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //经营方式
    $.ajax({
        type: 'POST',
        url: "getOperationModeByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var operationMode = $("#operationMode");
                operationMode.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    operationMode.append(option);
                });
                if (client != null && client.operationModelItem != null)
                    operationMode.val(client.operationModelItem.dataDictionaryItemId);
                else operationMode.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //申报状态
    $.ajax({
        type: 'POST',
        url: "getApplicationStatusByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var applicationStatus = $("#applicationStatus");
                applicationStatus.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    applicationStatus.append(option);
                });
                if (client != null && client.applicationStatusItem != null)
                    applicationStatus.val(client.applicationStatusItem.dataDictionaryItemId);
                else applicationStatus.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //经营单位类别
    $.ajax({
        type: 'POST',
        url: "getOperationTypeByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var operationType = $("#operationType");
                operationType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    operationType.append(option);
                });
                if (client != null && client.operationTypeItem != null)
                    operationType.val(client.operationTypeItem.dataDictionaryItemId);
                else operationType.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //事故防范应急预案
    $.ajax({
        type: 'POST',
        url: "getContingencyPlanByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var contingencyPlan = $("#contingencyPlan");
                contingencyPlan.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    contingencyPlan.append(option);
                });
                if (client != null && client.contingencyPlanItem != null)
                    contingencyPlan.val(client.contingencyPlanItem.dataDictionaryItemId);
                else contingencyPlan.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });



    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getSelectedList",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined) {
    //             var data = eval(result);
    //             // 下拉框数据填充
    //             var enterpriseType = $("#enterpriseType");
    //             enterpriseType.children().remove();
    //             $.each(data.enterpriseTypeStrList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 enterpriseType.append(option);
    //             });
    //             if (client != null && client.enterpriseType != null)
    //                 enterpriseType.val(client.enterpriseType.index - 1);
    //             else enterpriseType.get(0).selectedIndex = -1;
    //
    //             var operationMode = $("#operationMode");
    //             operationMode.children().remove();
    //             $.each(data.operationModeStrList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 operationMode.append(option);
    //             });
    //
    //             if (client != null && client.operationMode != null)
    //                 operationMode.val(client.operationMode.index - 1);
    //             else operationMode.get(0).selectedIndex = -1;
    //
    //             var operationType = $("#operationType");
    //             operationType.children().remove();
    //             $.each(data.operationTypeStrList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 operationType.append(option);
    //             });
    //             if (client != null && client.operationType != null)
    //                 operationType.val(client.operationType.index - 1);
    //             else operationType.get(0).selectedIndex = -1;
    //             //
    //             var contingencyPlan = $("#contingencyPlan");
    //             contingencyPlan.children().remove();
    //             $.each(data.contingencyPlanStrList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 contingencyPlan.append(option);
    //             });
    //             if (client != null && client.contingencyPlan != null)
    //                 contingencyPlan.val(client.contingencyPlan.index - 1);
    //             else contingencyPlan.get(0).selectedIndex = -1;
    //             //
    //             var operationRecord = $("#operationRecord");
    //             operationRecord.children().remove();
    //             $.each(data.operationRecordStrList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 operationRecord.append(option);
    //             });
    //             if (client != null && client.operationRecord != null)
    //                 operationRecord.val(client.operationRecord.index - 1);
    //             else operationRecord.get(0).selectedIndex = -1;
    //             //
    //             var applicationStatus = $("#applicationStatus");
    //             applicationStatus.children().remove();
    //             $.each(data.applicationStatusStrList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 applicationStatus.append(option);
    //             });
    //             if (client != null && client.applicationStatus != null)
    //                 applicationStatus.val(client.applicationStatus.index - 1);
    //             else  applicationStatus.get(0).selectedIndex = -1;
    //         } else {
    //             console.log("fail: " + result);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });
}



