
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array=[];
array1=[];
/**********************客户部分**********************/
/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}
//重置
function reset() {
    isSearch = false;
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    //$("#senior").find("select").get(0).selectedIndex = -1;
    loadMedicalWastesList();
}
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalMedicalWasteRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }
    if (isSearch) {
        totalRecord=array1.length;
    }
    var count = countValue();                         // 可选
    return loadPages(totalRecord, count);
}
/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

/**
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setMedicalWastesList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = new Array();
    for (var i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber == totalPage()) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage()) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadMedicalWastesList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setMedicalWastesList(result);
                } else {
                    console.log("fail: " + result);
                    // setClientList(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                // setClientList(result);
            }
        });
    }
    if (isSearch) {//查询用的
        for(var i=0;i<array1.length;i++){
            $(array1[i]).hide();
        }
        var i=parseInt((pageNumber-1)*countValue());
        var j=parseInt((pageNumber-1)*countValue())+parseInt(countValue()-1);
        for(var i=i;i<=j;i++){
            $('#tbody1').append(array1[i]);
            $(array1[i]).show();
        }
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadMedicalWastesList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setMedicalWastesList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if (isSearch) {//查询用的
            for(var i=0;i<array1.length;i++){
                $(array1[i]).hide();
            }
            var i=parseInt((pageNumber-1)*countValue());
            var j=parseInt((pageNumber-1)*countValue())+parseInt(countValue()-1);
            for(var i=i;i<=j;i++){
                $('#tbody1').append(array1[i]);
                $(array1[i]).show();
            }
        }
    }
}




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
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "loadMedicalWastesList",                  // url
        dataType: "json",
        data: JSON.stringify(page),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setPageClone(result);
                //setMedicalWastesList(result);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")

        }
    });
    isSearch=false;
}
//加载医危废数据
function setMedicalWastesList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();

    $.each(result.medicalWastesList, function (index, item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class','myclass');
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
            clonedTr.removeAttr("id");
            clonedTr.insertAfter(tr);
        });
        // 把克隆好的tr追加到原来的tr前面

    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}
//高级查询
function searchMedicalWastes() {
    isSearch=false;
    array.length=0;//清空数组
    array1.length=0;//清空数组
    //1分页模糊查询

    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }

    isSearch=true;

    var text=$('#searchContent').val();

    var date=$('#search-dateTime').val();

    var person=$('#search-departmentName').val();

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(!($(this).children('td').eq(1).text().indexOf(date)!=-1&&$(this).children('td').eq(3).text().indexOf(person)!=-1
              &&$(this).children('td').text().indexOf(text)!=-1
            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(1).text().indexOf(date)!=-1&&$(this).children('td').eq(3).text().indexOf(person)!=-1
                &&$(this).children('td').text().indexOf(text)!=-1
            )){
                array1.push($(this));
            }
        });
    }
    console.log(array1);
    var total;

    if(array1.length%countValue()==0){
        total=array1.length/countValue()
    }

    if(array1.length%countValue()>0){
        total=Math.ceil(array1.length/countValue());
    }

    if(array1.length/countValue()<1){
        total=1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for ( i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i+1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }

    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


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

//粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchMedicalWastes1();
            }
        },400);
    });
});

//粗查询
function searchMedicalWastes1() {

    isSearch=false;

    loadMedicalWastesList();

    //1分页模糊查询
    array.length=0;//清空数组
    array1.length=0;

    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    console.log(array);
    isSearch = true;

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

    var total;

    if(array1.length%countValue()==0){
        total=array1.length/countValue()
    }

    if(array1.length%countValue()>0){
        total=Math.ceil(array1.length/countValue());
    }

    if(array1.length/countValue()<1){
        total=1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for ( i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i+1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }

    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }
    if(text.length<=0){
        loadMedicalWastesList();
    }

}