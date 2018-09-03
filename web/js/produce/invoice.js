function viewClient() {
    $.ajax({
        type: "POST",                // 方法类型
        url: "getClient",            // url
        async: false,
        dataType: "json",
        data:{
            id: "0038"
        },
        success: function (result) {
            if (result != undefined) {
                // var data = eval(result.data);
                $("#companyName").text(result.companyName);//index + 1
                $("#organizationCode").text(result.organizationCode);
                $("#representative").text(result.representative);
                $("#industry").text(result.industry);
                $("#enterpriseType").text(result.enterpriseType.name);
                $("#operationType").text(result.operationType.name);
                $("#operationRecord").text(result.operationRecord.name);
                $("#street").text(result.street);
                $("#clientId").text(result.clientId);
                $("#licenseCode").text(result.licenseCode);
                $("#postCode").text(result.postCode);
                $("#product").text(result.product);
                $("#operationMode").text(result.operationMode.name);
                $("#contingencyPlan").text(result.contingencyPlan.name);
                $("#applicationStatus").text(result.applicationStatus.name);
                $("#location").text(result.location);
            } else {
                // console.log(result.message);
            }
            // console.log($("#companyName").text(result.companyName));
            // console.log($("#industry").text(result.industry));
            // console.log($("#organizationCode").text(result.organizationCode));
            // console.log($("#representative").text(result.representative));
            // console.log($("#enterpriseType").text(result.enterpriseType.name));
            // console.log($("#operationType").text(result.operationType.name));
            // console.log($("#operationRecord").text(result.operationRecord.name));
            // console.log($("#street").text(result.street));
            // console.log($("#clientId").text(result.clientId));
            // console.log($("#licenseCode").text(result.licenseCode));
            // console.log($("#postCode").text(result.postCode));
            // console.log($("#product").text(result.product));
            // console.log($("#operationMode").text(result.operationMode.name));
            // console.log($("#contingencyPlan").text(result.contingencyPlan.name));
            // console.log($("#applicationStatus").text(result.applicationStatus.name));
            // console.log($("#location").text(result.location));
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}
/**
 * 加载表格数据
 * */
function setInvoice(obj) {
    // 赋值
    $("#companyName").text(obj.companyName);//index + 1
    $("#organizationCode").text(obj.organizationCode);
    $("#representative").text(obj.representative);
    $("#industry").text(obj.industry);
    $("#enterpriseType").text(obj.enterpriseType.name);
    $("#operationType").text(obj.operationType);
    $("#operationRecord").text(obj.operationRecord);
    $("#street").text(obj.street);
    $("#clientId").text(obj.clientId);
    $("#licenseCode").text(obj.licenseCode);
    $("#postCode").text(obj.postCode);
    $("#product").text(obj.product);
    $("#operationMode").text(obj.operationMode);
    $("#contingencyPlan").text(obj.contingencyPlan);
    $("#applicationStatus").text(obj.applicationStatus);
    $("#location").text(obj.location);
}

function loadPoundsItems() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPounds",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result.data);
                $("#modal1_outTime").text(getTimeStr(data.outTime));
                $("#modal1_enterLicencePlate").text(data.enterLicencePlate);
                $("#modal1_outLicencePlate").text(data.outLicencePlate);
                $("#modal1_goodsName").text(data.goodsName);
                $("#modal1_grossWeight").text(data.grossWeight);
                $("#modal1_deliveryCompany").text(data.deliveryCompany.companyName);
                $("#modal1_tare").text(data.tare);
                $("#modal1_receiveCompany").text(data.receiveCompany.companyName);
                $("#modal1_netWeight").text(data.netWeight);
                $("#modal1_businessType").text(data.businessType);
                $("#modal1_enterTime").text(getTimeStr(data.enterTime));
                $("#modal1_weighman").text(data.weighman);
                $("#modal1_driver").text(data.driver);
                $("#modal1_remarks").text(data.remarks);
                //  $("#modal1_printTime").text(getTimeStr(data.printTime));
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