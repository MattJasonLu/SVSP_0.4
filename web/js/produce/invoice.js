/**
 * 显示信息
 */
function viewClient() {
    $.ajax({
        type: "POST",                // 方法类型
        url: "getClient",            // url
        async: false,
        dataType: "json",
        data:{
            id: "0069"
        },
        success: function (result) {
            if (result != undefined) {
                if(result.companyName != null)
                $("#companyName").val(result.companyName);//index + 1
                if(result.organizationCode != null)
                $("#organizationCode").val(result.organizationCode);
                if(result.representative != null)
                $("#representative").val(result.representative);
                if(result.industry != null)
                $("#industry").val(result.industry);
                if(result.enterpriseType != null)
                $("#enterpriseType").val(result.enterpriseType.name);
                if(result.operationType != null)
                $("#operationType").val(result.operationType.name);
                if(result.operationRecord != null)
                $("#operationRecord").val(result.operationRecord.name);
                if(result.street != null)
                $("#street").val(result.street);
                if(result.clientId != null)
                $("#clientId").val(result.clientId);
                if(result.licenseCode != null)
                $("#licenseCode").val(result.licenseCode);
                if(result.postCode != null)
                $("#postCode").val(result.postCode);
                if(result.product != null)
                $("#product").val(result.product);
                if(result.operationMode != null)
                $("#operationMode").val(result.operationMode.name);
                if(result.contingencyPlan != null)
                $("#contingencyPlan").val(result.contingencyPlan.name);
                if(result.applicationStatus != null)
                $("#applicationStatus").val(result.applicationStatus.name);
                if(result.location != null)
                $("#location").val(result.location);
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
    // $.ajax({
    //     type: "POST",                // 方法类型
    //     url: "getClient",            // url
    //     async: false,
    //     dataType: "json",
    //     data:{
    //         id: "0168"
    //     },
    //     success: function (result) {
    //         if (result != undefined) {
    //             $("#companyName").val(result.companyName);//index + 1
    //             $("#organizationCode").val(result.organizationCode);
    //             $("#representative").val(result.representative);
    //             $("#industry").val(result.industry);
    //             $("#enterpriseType").val(result.enterpriseType.name);
    //             $("#operationType").val(result.operationType.name);
    //             $("#operationRecord").val(result.operationRecord.name);
    //             $("#street").val(result.street);
    //             $("#clientId").val(result.clientId);
    //             $("#licenseCode").val(result.licenseCode);
    //             $("#postCode").val(result.postCode);
    //             $("#product").val(result.product);
    //             $("#operationMode").val(result.operationMode.name);
    //             $("#contingencyPlan").val(result.contingencyPlan.name);
    //             $("#applicationStatus").val(result.applicationStatus.name);
    //             $("#location").val(result.location);
    //         } else {
    //             console.log(result.message);
    //         }
    //
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //         console.log("失败");
    //     }
    // });
    $('.myclass2').each(function () {
        index++;
        var data = {
            companyName: $(this).children('td').eq(1).children('input').val(),
            organizationCode: $(this).children('td').eq(3).children('input').val(),
            representative: $(this).children('td').eq(1).html(),
            industry: $(this).children('td').eq(3).children('input').val(),
            enterpriseType: $(this).children('td').eq(1).children('input').val(),
            operationType: $(this).children('td').eq(3).children('input').val(),
            operationRecord: $(this).children('td').eq(1).children('input').val(),
            street: $(this).children('td').eq(3).children('input').val(),
            clientId: $(this).children('td').eq(1).children('input').val(),
            licenseCode: $(this).children('td').eq(3).children('input').val(),
            postCode: $(this).children('td').eq(1).children('input').val(),
            product: $(this).children('td').eq(3).children('input').val(),
            operationMode: $(this).children('td').eq(1).children('input').val(),
            contingencyPlan: $(this).children('td').eq(3).children('input').val(),
            applicationStatus: $(this).children('td').eq(1).children('input').val(),
            location: $(this).children('td').eq(3).children('input').val()
        };
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
                    console.log(result)
                }
                else {
                    console.log(result)
                }
            },
            error: function (result) {
                console.log("服务器异常！")
            }


        });

    })
}
function readyForUpdate() {
    $("#table").find("input").removeAttr("readonly");
    // $("#save").className="hidden";
    // $("#close").className="hidden";
    $("#save").removeAttr("class","hidden");
    $("#close").removeAttr("class","hidden");
    $("#print").setAttribute("class","hidden");
}