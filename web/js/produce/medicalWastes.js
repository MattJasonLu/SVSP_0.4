
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
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentNameList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                var equipment=$("#equipment");
                equipment.children().remove();
                $.each(result.equipmentList,function (index,item) {
                    var option=$('<option/>')
                    option.val(index);
                    option.text(item.name);
                    equipment.append(option);
                    $('.selectpicker').selectpicker('refresh');
                });
            }
            else {
                alert(result.message)
            }
        },
        error:function (result) {
            alert("服务器异常")
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
        equipment:$('#equipment').selectpicker('val'),
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
//误差量计算
//医废-误差量计算公式：误差量=本日进厂医废（接运单）-本日直接转外处置量-本日蒸煮医废（过磅量）
function geterrorNumberByWastes() {
    thisMonthWastes = $('#thisMonthWastes').val();
    if($('#thisMonthWastes').val()==null||$('#thisMonthWastes').val()==''){
        thisMonthWastes=0;
    }
    directDisposal=$('#directDisposal').val();
    if($('#directDisposal').val()==null||$('#directDisposal').val()==''||$('#directDisposal').val().length<=0){
        directDisposal=0;
    }
    cookingWastes=$('#cookingWastes').val();
    if($('#cookingWastes').val()==null||$('#cookingWastes').val()==''||$('#cookingWastes').val().length<=0){
        cookingWastes=0;
    }
    $("#errorNumber").val(parseInt(thisMonthWastes)-parseInt(directDisposal)-parseInt(cookingWastes));
}

function geterrorNumberByDisposal() {
    thisMonthWastes = $('#thisMonthWastes').val();
    if($('#thisMonthWastes').val()==null||$('#thisMonthWastes').val()==''){
        thisMonthWastes=0;
    }
    directDisposal=$('#directDisposal').val();
    if($('#directDisposal').val()==null||$('#directDisposal').val()==''||$('#directDisposal').val().length<=0){
        directDisposal=0;
    }
    cookingWastes=$('#cookingWastes').val();
    if($('#cookingWastes').val()==null||$('#cookingWastes').val()==''||$('#cookingWastes').val().length<=0){
        cookingWastes=0;
    }
    $("#errorNumber").val(parseInt(thisMonthWastes)-parseInt(directDisposal)-parseInt(cookingWastes));


}


function geterrorNumberByCook() {
    thisMonthWastes = $('#thisMonthWastes').val();
    if($('#thisMonthWastes').val()==null||$('#thisMonthWastes').val()==''){
        thisMonthWastes=0;
    }
    directDisposal=$('#directDisposal').val();
    if($('#directDisposal').val()==null||$('#directDisposal').val()==''||$('#directDisposal').val().length<=0){
        directDisposal=0;
    }
    cookingWastes=$('#cookingWastes').val();
    if($('#cookingWastes').val()==null||$('#cookingWastes').val()==''||$('#cookingWastes').val().length<=0){
        cookingWastes=0;
    }
    afterCookingNumber=$('#afterCookingNumber').val();
    if($('#afterCookingNumber').val()==null||$('#afterCookingNumber').val()==''||$('#afterCookingNumber').val().length<=0){
        afterCookingNumber=0;
    }
    $("#wetNumber").val(parseInt(cookingWastes)-parseInt(afterCookingNumber));
    $("#errorNumber").val(parseInt(thisMonthWastes)-parseInt(directDisposal)-parseInt(cookingWastes));
}

//水分含量计算
//医废-水分含量计算公式：水份含量=本日蒸煮医废（过磅量）-蒸煮后重量
function getWaterByCooking() {
    cookingWastes=$('#cookingWastes').val();
    if($('#cookingWastes').val()==null||$('#cookingWastes').val()==''||$('#cookingWastes').val().length<=0){
        cookingWastes=0;
    }
    afterCookingNumber=$('#afterCookingNumber').val();
    if($('#afterCookingNumber').val()==null||$('#afterCookingNumber').val()==''||$('#afterCookingNumber').val().length<=0){
        afterCookingNumber=0;
    }
    $("#wetNumber").val(parseInt(cookingWastes)-parseInt(afterCookingNumber));

}
array=[];
array1=[];
//粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchWastesAnalysis();
            }
        },400);
    });
});

//粗查询
function searchWastesAnalysis() {
    switchPage(1);
    $('.myclass').each(function () {
        $(this).show();
    });
    //1分页模糊查询
    array.length=0;//清空数组
    array1.length=0;
    for(var i=1;i<=totalPage();i++){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    var text=$('#searchContent').val();
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(($(this).children('td').text().indexOf(text)==-1)){
                $(this).hide();
            }
            if($(this).children('td').text().indexOf(text)!=-1){
                array1.push($(this));
            }
        });
    }
    for(var i=0;i<array1.length;i++){
        $.each(array1[i],function () {
            $('#tbody1').append(this) ;
        });
    }

    if(text.length<=0){
        switchPage(1);
        $('.myclass').each(function () {
            $(this).show();
        })
    }
}