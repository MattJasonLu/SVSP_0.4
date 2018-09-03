
/**
 *医废出入库脚本文件
 * created by JackYang on 2018/9/3
 */
//加载医废出入库新增页面的登记单号
function getNewestId() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getNewestMedicalWastesId",                  // url
        dataType: "json",
        //data:{'stockId':stockId},
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                 $('#medicalWastesId').val(result.medicalWastesId);
                console.log(result);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！");
        }
    });
}
//保存医废出入库信息
function saveMedicalWastes() {
//获得输入的信息
    data={
        medicalWastesId:$('#medicalWastesId').val(),
        department:$('#department').val(),
        departmentName:$('#departmentName').val(),
        adjustName:$('#adjustName').val(),
        adjustDate:$('#adjustDate').val(),
        dateTime:$('#date').val(),
        thisMonthWastes:$('#thisMonthWastes').val(),
        directDisposal:$('#directDisposal').val(),
        cookingWastes:$('#cookingWastes').val(),
        afterCookingNumber:$('#afterCookingNumber').val(),
        afterCookingInbound:$('#afterCookingInbound').val(),
        thisMonthSendCooking:$('#thisMonthSendCooking').val(),
        errorNumber:$('#errorNumber').val(),
        wetNumber:$('#wetNumber').val(),
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addMedicalWastes",                  // url
        dataType: "json",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                alert(result.message);
                window.location.href="medicalWasteManager.html";
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });
}
//加载医危废数据
function loadMedicalWastesList() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "loadMedicalWastesList",                  // url
        dataType: "json",
        //data:{'stockId':stockId},
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setMedicalWastesList(result);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")

        }
    });
}
//加载医危废数据
function setMedicalWastesList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result.medicalWastesList, function (index, item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 登记单号
                case (0):
                    $(this).html(obj.medicalWastesId);
                    break;
                // 登记日期
                case (1):
                    $(this).html(getDateStr(obj.dateTime));
                    break;
                // 登记部门
                case (2):
                    $(this).html(obj.department);
                    break;
                // 登记人
                case (3):
                    $(this).html(obj.departmentName);
                    break;
                // 修改人
                case (4):
                    $(this).html(obj.adjustName);
                    break;
                // 修改时间
                case (5):
                    $(this).html(getDateStr(obj.adjustDate));
                    break;
                    //本月进厂危废
                case (6):
                    $(this).html(obj.thisMonthWastes);
                    break;
                    //本日直接转外处置量
                case (7):
                    $(this).html(obj.directDisposal);
                    break;
                //本日蒸煮医废(过磅)
                case (8):
                    $(this).html(obj.cookingWastes);
                    break;
                    //蒸煮后重量
                case (9):
                    $(this).html(obj.afterCookingNumber);
                    break;
                    //蒸煮后入库量
                case (10):
                    $(this).html(obj.afterCookingInbound);
                    break;
                    //本月蒸煮后外送量
                case (11):
                    $(this).html(obj.thisMonthSendCooking);
                    break;
                    //误差量
                case (12):
                    $(this).html(obj.errorNumber);
                    break;
                    //水分含量
                case (13):
                    $(this).html(obj.wetNumber);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);


    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}
//高级查询
function searchMedicalWastes() {
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            dateTime: $("#search-dateTime").val(),//库存编号
            departmentName: $("#search-departmentName").val(),//产废单位联系人
        };
        console.log(data);
        // 模糊查询
    }
    // else {
    //     data = {
    //         keyword: $("#searchContent").val(),
    //         page: page
    //     };
    //     console.log(data);
    // }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchMedicalWastes",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}