/**
 * 修改
 */
function adjustConfirm() {
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
            url: "updateCompatibilityItem",                  // url
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
    });
}