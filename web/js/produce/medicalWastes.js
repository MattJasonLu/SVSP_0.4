var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array = [];
array1 = [];
array0=[];

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
    window.location.reload();
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
        totalRecord = array1.length;
    }
    var count = countValue();                         // 可选
    return loadPages(totalRecord, count);
}

/**
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
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
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
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
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) { //分页用的
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadMedicalWastesList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log("走到这了！");
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
        for (var i = 0; i < array1.length; i++) {
            $(array1[i]).hide();
        }
        var i = parseInt((pageNumber - 1) * countValue());
        var j = parseInt((pageNumber - 1) * countValue()) + parseInt(countValue() - 1);
        for (var i = i; i <= j; i++) {
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
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
            for (var i = 0; i < array1.length; i++) {
                $(array1[i]).hide();
            }
            var i = parseInt((pageNumber - 1) * countValue());
            var j = parseInt((pageNumber - 1) * countValue()) + parseInt(countValue() - 1);
            for (var i = i; i <= j; i++) {
                $('#tbody1').append(array1[i]);
                $(array1[i]).show();
            }
        }
    }
}


//粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) {
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchMedicalWastes1();
            }
            else if (event.keyCode == '13') {
                searchMedicalWastes1();
            }
        }, 600);

    });
});

//粗查询
function searchMedicalWastes1() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);

    isSearch = true;

    var text = $.trim($('#searchContent').val());
    console.log(text);
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (($(this).children('td').text().indexOf(text) == -1)) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1) {
                array1.push($(this));
            }
        });
    }

    console.log(array1);
    console.log("长度" + array1.length);

    var total;

    if (array1.length % countValue() == 0) {
        total = array1.length / countValue()
    }

    if (array1.length % countValue() > 0) {
        total = Math.ceil(array1.length / countValue());
    }

    if (array1.length / countValue() < 1) {
        total = 1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for (i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(1);
    for (var i = 0; i < array1.length; i++) {
        (array1[i]).hide();
    }

    //首页展示
    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


    if (text.length <= 0) {
        loadMedicalWastesList();
    }

}

/**
 *医废出入库脚本文件
 * created by JackYang on 2018/9/3
 */
//加载医废出入库新增页面的登记单号
function getNewestId() {
    loadNavigationList();    // 设置动态菜单
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getNewestMedicalWastesId",                  // url
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('#medicalWastesId').val(result.medicalWastesId);
                console.log(result);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                var equipment = $("#equipment");
                equipment.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>')
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    equipment.append(option);
                    $('.selectpicker').selectpicker('refresh');
                });
            }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常")
        }

    });
    $('#date').val(dateToString(new Date()))

    // 设置计量单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getUnitByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var wastesUnit = $("select[name='unit']");
                wastesUnit.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    wastesUnit.append(option);
                });
                wastesUnit.get(0).selectedIndex = 0;
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    // 设置用户信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentUserInfo",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result.data);
                $("#departmentName").val(data.name);  // 将创建人设置为当前登陆用户
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//保存医废出入库信息
function saveMedicalWastes() {
//获得输入的信息
    data = {
        medicalWastesId: $('#medicalWastesId').val(),
        department: $('#department').val(),
        departmentName: $('#departmentName').val(),
        adjustName: $('#adjustName').val(),
        adjustDate: $('#adjustDate').val(),
        dateTime: $('#date').val(),
        thisMonthWastes: $('#thisMonthWastes').val(),
        directDisposal: $('#directDisposal').val(),
        cookingWastes: $('#cookingWastes').val(),
        afterCookingNumber: $('#afterCookingNumber').val(),
        afterCookingInbound: $('#afterCookingInbound').val(),
        thisMonthSendCooking: $('#thisMonthSendCooking').val(),
        errorNumber: $('#errorNumber').val(),
        wetNumber: $('#wetNumber').val(),
        incineration: $('#incineration').val(),
        unitDataItem: { dataDictionaryItemId: $('#unit').val() },
        equipmentDataItem: { dataDictionaryItemId:$('#equipment').selectpicker('val') }
    };
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addMedicalWastes",                  // url
        dataType: "json",
        async: false,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                alert(result.message);
                window.location.href = "medicalWasteManager.html";
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

//加载医危废数据
function loadMedicalWastesList() {
    $('.loader').show();
    loadNavigationList();    // 设置动态菜单
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
    if(array0.length==0){
        for (var i = 1; i <= totalPage(); i++) {
            switchPage(parseInt(i));

            array0.push($('.myclass'));
        }
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "loadMedicalWastesList",                  // url
        dataType: "json",
        async: false,
        data: JSON.stringify(page),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide();
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
                //setMedicalWastesList(result);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")

        }
    });
    isSearch = false;
}

//加载医危废数据
function setMedicalWastesList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.medicalWastesList, function (index, item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class', 'myclass');
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 登记单号
                case (1):
                    $(this).html(obj.medicalWastesId);
                    break;
                // 登记日期
                case (2):
                    $(this).html(getDateStr(obj.dateTime));
                    break;
                // 登记部门
                case (3):
                    $(this).html(obj.department);
                    break;
                // 登记人
                case (4):
                    $(this).html(obj.departmentName);
                    break;
                // 修改人
                case (5):
                    $(this).html(obj.adjustName);
                    break;
                // 修改时间
                case (6):
                    $(this).html(getDateStr(obj.adjustDate));
                    break;
                //本月进厂危废
                case (7):
                    $(this).html(obj.thisMonthWastes.toFixed(3));
                    break;
                //本日直接转外处置量
                case (8):
                    $(this).html(obj.directDisposal.toFixed(3));
                    break;
                //本日蒸煮医废(过磅)
                case (9):
                    $(this).html(obj.cookingWastes.toFixed(3));
                    break;
                //蒸煮后重量
                case (10):
                    $(this).html(obj.afterCookingNumber.toFixed(3));
                    break;
                //蒸煮后入库量
                case (11):
                    $(this).html(obj.afterCookingInbound.toFixed(3));
                    break;
                //本月蒸煮后外送量
                case (12):
                    $(this).html(obj.thisMonthSendCooking.toFixed(3));
                    break;
                //误差量
                case (13):
                    $(this).html(obj.errorNumber.toFixed(3));
                    break;
                //水分含量
                case (14):
                    $(this).html(obj.wetNumber.toFixed(3));
                    break;
                case (15):
                    if (obj.unitDataItem != null) {
                        $(this).html(obj.unitDataItem.dictionaryItemName);
                    }
                    break;
                //处置设备
                case (16):
                    if (obj.equipmentDataItem != null) {
                        $(this).html(obj.equipmentDataItem.dictionaryItemName);
                    }
                    break;
                case (17):
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                    }
                    break;
            }
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
            tr.removeAttr('class');
        });
        // 把克隆好的tr追加到原来的tr前面

    });
    // 隐藏无数据的tr
    tr.hide();

}

//高级查询
function searchMedicalWastes() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);

    isSearch = true;

    var text = $.trim($('#searchContent').val());

    var person = $.trim($('#search-departmentName').val());

    var beginTime = $.trim($('#search-storageDate').val());

    var endTime = $.trim($('#search-endDate').val());

    var startDate = getDateByStr(beginTime);

    var endDate = getDateByStr(endTime);

    var checkState= $('#search-checkState option:selected').text();


    var arraydate = [];
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            arraydate.push(($(this).children('td').eq(2).text()))
        });
    }

    var dateMin = (arraydate[0]);
    var dateMax = (arraydate[0]);

    for (var i = 0; i < arraydate.length; i++) {
        if (new Date(arraydate[i]).getTime() < new Date(dateMin) || dateMin.length == 0) {
            dateMin = (arraydate[i]);
        }
        if (new Date(arraydate[i]).getTime() > new Date(dateMax) || dateMax.length == 0) {
            dateMax = (arraydate[i]);
        }

    }
    console.log(dateMin + dateMax)

    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (startDate.toString() == 'Invalid Date') {
                startDate = dateMin;
            }
            if (endDate.toString() == 'Invalid Date') {
                endDate = dateMax;
            }
            console.log(startDate + endDate)
            // console.log($(this).children('td').eq(2).text())
            if (!($(this).children('td').eq(4).text().indexOf(person) != -1&&$(this).children('td').eq(16).text().indexOf(checkState) != -1
                && $(this).children('td').text().indexOf(text) != -1
                && (new Date($(this).children('td').eq(2).text()).getTime() >= new Date(startDate).getTime() && new Date($(this).children('td').eq(2).text()).getTime() <= new Date(endDate).getTime())

            )) {
                $(this).hide();
            }
            if (($(this).children('td').eq(4).text().indexOf(person) != -1&&$(this).children('td').eq(16).text().indexOf(checkState) != -1
                && $(this).children('td').text().indexOf(text) != -1
                && (new Date($(this).children('td').eq(2).text()).getTime() >= new Date(startDate).getTime() && new Date($(this).children('td').eq(2).text()).getTime() <= new Date(endDate).getTime())
            )) {
                array1.push($(this));
            }
        });
    }
    console.log(array1);
    var total;

    if (array1.length % countValue() == 0) {
        total = array1.length / countValue()
    }

    if (array1.length % countValue() > 0) {
        total = Math.ceil(array1.length / countValue());
    }

    if (array1.length / countValue() < 1) {
        total = 1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for (i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(1);
    for (var i = 0; i < array1.length; i++) {
        array1[i].hide();
    }

    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchMedicalWastes();      //
    }
}

//误差量计算
//医废-误差量计算公式：误差量=本日进厂医废（接运单）-本日直接转外处置量-本日蒸煮医废（过磅量）==>废除公式==>调整正确
//误差量=本日进厂医废（接运单）-本日蒸煮医废（过磅量）==>最新公式
function geterrorNumberByWastes() {
    thisMonthWastes = $('#thisMonthWastes').val();
    if ($('#thisMonthWastes').val() == null || $('#thisMonthWastes').val() == '') {
        thisMonthWastes = 0;
    }
    directDisposal = $('#directDisposal').val();
    if ($('#directDisposal').val() == null || $('#directDisposal').val() == '' || $('#directDisposal').val().length <= 0) {
        directDisposal = 0;
    }
    cookingWastes = $('#cookingWastes').val();
    if ($('#cookingWastes').val() == null || $('#cookingWastes').val() == '' || $('#cookingWastes').val().length <= 0) {
        cookingWastes = 0;
    }
    $("#errorNumber").val((parseFloat(thisMonthWastes) - parseFloat(cookingWastes))-parseFloat((directDisposal)).toFixed(3));
}

function geterrorNumberByDisposal() {
    thisMonthWastes = $('#thisMonthWastes').val();
    if ($('#thisMonthWastes').val() == null || $('#thisMonthWastes').val() == '') {
        thisMonthWastes = 0;
    }
    directDisposal = $('#directDisposal').val();
    if ($('#directDisposal').val() == null || $('#directDisposal').val() == '' || $('#directDisposal').val().length <= 0) {
        directDisposal = 0;
    }
    cookingWastes = $('#cookingWastes').val();
    if ($('#cookingWastes').val() == null || $('#cookingWastes').val() == '' || $('#cookingWastes').val().length <= 0) {
        cookingWastes = 0;
    }
    $("#errorNumber").val((parseFloat(thisMonthWastes) - parseFloat(directDisposal) - parseFloat(cookingWastes)).toFixed(3));


}


function geterrorNumberByCook() {
    thisMonthWastes = $('#thisMonthWastes').val();
    if ($('#thisMonthWastes').val() == null || $('#thisMonthWastes').val() == '') {
        thisMonthWastes = 0;
    }
    directDisposal = $('#directDisposal').val();
    if ($('#directDisposal').val() == null || $('#directDisposal').val() == '' || $('#directDisposal').val().length <= 0) {
        directDisposal = 0;
    }
    cookingWastes = $('#cookingWastes').val();
    if ($('#cookingWastes').val() == null || $('#cookingWastes').val() == '' || $('#cookingWastes').val().length <= 0) {
        cookingWastes = 0;
    }
    afterCookingNumber = $('#afterCookingNumber').val();
    if ($('#afterCookingNumber').val() == null || $('#afterCookingNumber').val() == '' || $('#afterCookingNumber').val().length <= 0) {
        afterCookingNumber = 0;
    }
    $("#wetNumber").val((parseFloat(cookingWastes) - parseFloat(afterCookingNumber)).toFixed(3));
    $("#errorNumber").val((parseFloat(thisMonthWastes) - parseFloat(cookingWastes))-parseFloat((directDisposal)).toFixed(3));
}

//水分含量计算
//医废-水分含量计算公式：水份含量=本日蒸煮医废（过磅量）-蒸煮后重量
function getWaterByCooking() {
    cookingWastes = $('#cookingWastes').val();
    if ($('#cookingWastes').val() == null || $('#cookingWastes').val() == '' || $('#cookingWastes').val().length <= 0) {
        cookingWastes = 0;
    }
    afterCookingNumber = $('#afterCookingNumber').val();
    if ($('#afterCookingNumber').val() == null || $('#afterCookingNumber').val() == '' || $('#afterCookingNumber').val().length <= 0) {
        afterCookingNumber = 0;
    }
    $("#wetNumber").val((parseFloat(cookingWastes) - parseFloat(afterCookingNumber)).toFixed(3));

}

function cancelMedicalWastes(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();
    console.log(id)
    if (confirm("确认作废？")) {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "cancelMedicalWastes",                  // url
            dataType: "json",
            data: {'id': id},
            async: false,
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message)
                    window.location.reload();
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常！")

            }
        });

    }

}


//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

//导出数据
function exportExcel() {
    console.log("export");
    var name = '医危废出入库';
    var idArry = [];//存放主键
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select a.medicalWastesId,a.dateTime, a.department,a.departmentName,a.adjustName,a.adjustDate,a.thisMonthWastes,a.directDisposal,a.cookingWastes,a.afterCookingNumber, a.afterCookingInbound, a.thisMonthSendCooking,a.errorNumber, a.wetNumber,b.dictionaryItemName from t_pl_medicalwastes a join datadictionaryitem b on b.dataDictionaryItemId=a.equipmentId" ;

        window.open('exportExcelMedicalWastes?name=' + name + '&sqlWords=' + sqlWords);

    }

    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().html());        // 将选中项的编号存到集合中
            }
        });
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += idArry[i] + ",";
                else if (i == idArry.length - 1) sql += idArry[i] + ");"
            }
            var sqlWords = "select a.medicalWastesId,a.dateTime, a.department,a.departmentName,a.adjustName,a.adjustDate,a.thisMonthWastes,a.directDisposal,a.cookingWastes,a.afterCookingNumber, a.afterCookingInbound, a.thisMonthSendCooking,a.errorNumber, a.wetNumber,b.dictionaryItemName from t_pl_medicalwastes a join datadictionaryitem b on b.dataDictionaryItemId=a.equipmentId and medicalWastesId " + sql;


        }

        console.log(sqlWords)
        window.open('exportExcelMedicalWastes?name=' + name + '&sqlWords=' + sqlWords);
    }
}

function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importMedicalWaste",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result.status == "success") {

                    } else {
                        alert(result.message);
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
        alert("导入成功！");
        window.location.reload();         //刷新
    });
}

// function importExcel() {
//     document.getElementById("idExcel").click();
//     document.getElementById("idExcel").addEventListener("change", function () {
//         var id = '0000';
//         console.log("change");
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "getCurrentCompatibilityId",              // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             dataType: "json",
//             contentType: false,
//             success: function (result) {
//                 if (result != undefined || result != NaN) {
//                     id = result.compatibilityId;
//                 } else {
//                     alert("数据获取失败！ " + result);
//                 }
//             },
//             error: function (result) {
//                 alert("导入失败，请检查后重试！")
//                 console.log("error" + result);
//             }
//         });
//         var eFile = document.getElementById("idExcel").files[0];
//         var formFile = new FormData();
//         formFile.append("excelFile", eFile);
//         formFile.append("tableName", 't_pr_pw');
//         formFile.append("id", id);
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "importCompatibilityExcel",              // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             dataType: "json",
//             data: formFile,
//             processData: false,
//             contentType: false,
//             success: function (result) {
//                 if (result != undefined) {
//                     console.log(result);
//                     if (result.status == "success") {
//                         alert(result.message);
//                         window.location.reload();         //刷新
//                     } else {
//                         alert(result.message);
//                     }
//                 }
//             },
//             error: function (result) {
//                 console.log(result);
//             }
//         });
//     });
//
// }

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/医危废出入库数据.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

//修改赋值
function medicalWasteManagerModify(item) {
    $('#addModa2').modal('show');
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });

    $('#date').val(dateToString(new Date()))

    //根据编号获取信息赋值
    var medicalWastesId = $(item).parent().parent().children('td').eq(1).html();

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMedicalWasteById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {'medicalWastesId': medicalWastesId},
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var obj=eval(result.data);
                $('#medicalWastesId').val(obj.medicalWastesId);
                $('#dateTime').val(getDateStr(obj.dateTime));
                $('#department').val(obj.department);
                $('#departmentName').val(obj.departmentName);
                $('#adjustName').val(obj.adjustName);
                $('#adjustDate').val(getDateStr(obj.adjustDate));
                $('#thisMonthWastes').val(parseFloat(obj.thisMonthWastes).toFixed(3));
                $('#directDisposal').val(parseFloat(obj.directDisposal).toFixed(3));
                $('#cookingWastes').val(parseFloat(obj.cookingWastes).toFixed(3));
                $('#afterCookingNumber').val(parseFloat(obj.afterCookingNumber).toFixed(3));
                $('#afterCookingInbound').val(parseFloat(obj.afterCookingInbound).toFixed(3));
                $('#thisMonthSendCooking').val(parseFloat(obj.thisMonthSendCooking).toFixed(3));
                $('#errorNumber').val(parseFloat(obj.errorNumber).toFixed(3));
                $('#wetNumber').val(parseFloat(obj.wetNumber).toFixed(3));
                $('#incineration').val(parseFloat(obj.incineration).toFixed(3));
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getEquipmentByDataDictionary",                  // url
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            console.log(result)
                            var equipment = $("#equipment");
                            equipment.children().remove();
                            $.each(result.data, function (index, item) {
                                var option = $('<option/>')
                                option.val(item.dataDictionaryItemId);
                                option.text(item.dictionaryItemName);
                                equipment.append(option);
                                equipment.selectpicker('val',obj.equipmentDataItem.dataDictionaryItemId);
                                $('.selectpicker').selectpicker('refresh');
                            });
                        }
                        else {
                            alert(result.message)
                        }
                    },
                    error: function (result) {
                        alert("服务器异常")
                    }

                });

            }
        },
        error:function (result) {
            
        }
    })

}

//修改方法
function adjustMedicalWaste() {
    var data={
        medicalWastesId  : $('#medicalWastesId').val(),
        dateTime: $('#dateTime').val(),
        department: $('#department').val(),
        departmentName: $('#departmentName').val(),
        adjustName: $('#adjustName').val(),
        adjustDate: $('#adjustDate').val(),
        thisMonthWastes: $('#thisMonthWastes').val(),
        directDisposal:  $('#directDisposal').val(),
        cookingWastes:  $('#cookingWastes').val(),
        afterCookingNumber:  $('#afterCookingNumber').val(),
        afterCookingInbound:  $('#afterCookingInbound').val(),
        thisMonthSendCooking:  $('#thisMonthSendCooking').val(),
        errorNumber:  $('#errorNumber').val(),
        wetNumber:  $('#wetNumber').val(),
        incineration:  $('#incineration').val(),
        equipmentDataItem: {dataDictionaryItemId:$('#equipment').selectpicker('val')}
    };
    console.log(data)
    //更新
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateMedicalWaste",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
         dataType: "json",
         contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert("修改成功")
                window.location.reload();
            }
        },
        error:function (result) {

        }
    })


}


