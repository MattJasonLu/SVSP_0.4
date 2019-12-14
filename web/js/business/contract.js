/**
 * Created by JackYang on 2018/8/27.
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
//合同索引值
var contractIndex = 0;
//模糊查询
array = [];//存放所有的tr
array1 = [];//存放目标的tr
array0=[]

// //重置
// function reset() {
//     $("#senior").find("input").val("");
//     $("#searchContent").val("");
//     $("#senior").find("select").get(0).selectedIndex = -1;
// }

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage(contractIndex) {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalContractManageRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                'contractIndex': contractIndex
            },
            success: function (result) {
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
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchDeriveContractCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
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
    //console.log(totalRecord);
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}





/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setContractList(result);
    var total = totalPage(contractIndex);
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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");

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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    // console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage(contractIndex)) {
        pageNumber = totalPage(contractIndex);
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage(contractIndex);        //尾页
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
    if (pageNumber == totalPage(contractIndex)) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage(contractIndex)) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;                   //当前页面
    setPageCloneAfter(contractIndex, pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    page.contractIndex = contractIndex;
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setContractList(result);
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
    if (pageNumber > totalPage(contractIndex)) {
        pageNumber = totalPage(contractIndex);
    }
    if (pageNumber > totalPage(contractIndex)) {
        pageNumber = totalPage(contractIndex);
    }
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
        if (pageNumber == totalPage(contractIndex)) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage(contractIndex)) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter(contractIndex, pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageContractManageList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setContractList(result);
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

/**
 * 分页 获取首页内容
 * */
function loadPageContractManageList() {
     loadNavigationList();   // 设置动态菜单
    $('.loader').show();
    //让修改操作提交后页面刷新仍然停留在当前页面而不是刷新到首页
    var state = $("#state").find("option:selected").text();
    $('#back').hide();
    var name = localStorage['name1'];
    console.log("合同类型"+name);
    if (name == 'undefined' || name == "Wastes" || name == undefined) {
        $('#Wa').click();
     //   localStorage.clear();
        $('#toggleName').text("产废单位名称");
    }
    if (name == "Emergency") {
        console.log('点击了')
        $('#Em').click();
     //   localStorage.clear();
        //如果是物流就改为处置单位
        $('#toggleName').text("产废单位名称");
    }
    if (name == "Logistics") {
        $('#Lo').trigger("click");
       // localStorage.clear();
    }
    // if (name == "Derive") {
    //     $('#De').click();
    //     localStorage.clear();
    // }
    // if (name == "Purchase") {
    //
    // }
    //分页
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    // page.contractIndex = contractIndex;
    // page.contractIndex = 0;                                    //首页默认为危废合同
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "loadPageContractManageList",          // url
    //     async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
    //     data: JSON.stringify(page),
    //     dataType: "json",
    //     contentType: 'application/json;charset=utf-8',
    //     success: function (result) {
    //         if (result != undefined && result.status == "success") {
    //             console.log(result);
    //             setPageClone(result);
    //             console.log(contractIndex,pageNumber)
    //             setPageCloneAfter(contractIndex, pageNumber);        // 重新设置页码
    //         } else {
    //             console.log(result.message);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //         console.log("失败");
    //     }
    // });
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchContract();
        window.localStorage.removeItem('approvalId');
    }
    setSeniorSelectedList();
}

function ContractListByName(item) {
    if(array0.length==0){

        contractIndex=2;
        for (var i = 1; i <= totalPage(contractIndex); i++) {
            switchPage(parseInt(i));
            array0.push($('.myclass1'));
        }
        contractIndex=1;
        for (var i = 1; i <= totalPage(contractIndex); i++) {
            switchPage(parseInt(i));
            array0.push($('.myclass1'));
        }
        contractIndex=0;
        for (var i = 1; i <= totalPage(contractIndex); i++) {
            switchPage(parseInt(i));
            array0.push($('.myclass1'));
        }
        switchPage(1)
        // if (text.length <= 0) {
        //     localStorage.name = "Logistics";
        //     loadPageContractManageList();
        // }
        // $.ajax({
        //     type: "POST",                       // 方法类型
        //     url: "loadPageContractManageList",                  // url
        //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        //     dataType: "json",
        //     data: JSON.stringify(page),
        //     contentType: "application/json; charset=gbk",
        //     success: function (result) {
        //         if (result != undefined) {
        //             console.log(result);
        //             setContractList(result);
        //         } else {
        //             console.log("fail: " + result);
        //         }
        //     },
        //     error: function (result) {
        //         console.log("error: " + result);
        //     }
        // });
    }
    currentPage = 1;                   //在onload之后执行
    $('#state').get(0).selectedIndex = 0;
    nameBykey = item.innerHTML;
    if (nameBykey == '危废合同') {
        contractIndex = 0;
        var page = {};
        var pageNumber = 1;
        page.count = countValue();                                 // 可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=gbk",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    $('.loader').hide();
                    console.log(result);
                    setPageClone(result);
                    setPageCloneAfter(contractIndex,1)
                    //setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });

    }
    if (nameBykey == "应急处置合同") {
        contractIndex = 1;
        var page = {};
        var pageNumber = 1;
        page.count = countValue();                                 // 可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
      //  localStorage.clear();
        //如果是物流就改为处置单位
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=gbk",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    $('.loader').hide()
                    setContractList(result);
                    setPageCloneAfter(contractIndex,1)
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (nameBykey == "物流合同") {
        //列表切换
        contractIndex = 2;
        var page = {};
        var pageNumber = 1;
        page.count = countValue();                                 // 可选
        page.pageNumber = 1;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=gbk",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    $('.loader').hide()
                    console.log(result);
                    setContractList(result);
                    setPageCloneAfter(contractIndex,1)
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (item.innerHTML == "次生合同") {
        //console.log(name);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listContractByName",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    $('.loader').hide()
                    setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (item.innerHTML == "采购合同") {
        $('.loader').hide()
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listContractByName",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"name": "Purchase"},
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }


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

//设置合同列表高级查询下拉框数据
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckStateDataByDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

}

//合同列表高级查询
function searchContract() {
    $('#tbody1').find('.myclass1').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);

    var text = $.trim($('#searchContent').val());

    var companyName = $.trim($('#search-companyName').val());//产废单位

    var checkState = $.trim($('#search-checkState option:selected').text());


    var suppierName = $.trim($('#search-suppierName').val());//处置单位

    var contactName = $.trim($('#search-contactName').val());


    var beginTime = $.trim($('#beginTime').val());

    var endTime = $.trim($('#endTime').val());

    var startDate = getDateByStr(beginTime);

    var endDate = getDateByStr(endTime);

    var smallContract = $("#smallContract").prop('checked');

    var small;
    if (smallContract == true) {
        small = '小额合同';
    }
    if (smallContract == false) {
        small = '额合同';
    }
    console.log(small)

    isSearch = true;
    var arraydate = [];
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            arraydate.push(($(this).children('td').eq(8).text()))
        });
    }
    // console.log(arraydate)
    var arraydate1 = [];
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            arraydate1.push(($(this).children('td').eq(9).text()))
        });
    }


    var dateMin = (arraydate[0]);
    var dateMax = (arraydate1[0]);
    for (var i = 0; i < arraydate.length; i++) {
        if (new Date(arraydate[i]).getTime() < new Date(dateMin) || dateMin.length == 0) {
            dateMin = (arraydate[i]);
        }

    }
    for (var i = 0; i < arraydate1.length; i++) {
        if (new Date(arraydate1[i]).getTime() > new Date(dateMax) || dateMax.length == 0) {
            dateMax = (arraydate1[i]);
        }
    }
    // console.log(dateMin+dateMax)
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {

            if (startDate.toString() == 'Invalid Date') {
                startDate = dateMin;
            }
            if (endDate.toString() == 'Invalid Date') {
                endDate = dateMax;
            }
            var start = $(this).children('td').eq(8).text();
            var end = $(this).children('td').eq(9).text();

            if (start.length == 0) {
                start = startDate;
            }
            if (end.length == 0) {
                end = endDate;
            }
            if (!($(this).children('td').eq(2).text().indexOf(companyName) != -1
                && $(this).children('td').text().indexOf(text) != -1 &&
                $(this).children('td').eq(4).text().indexOf(checkState) != -1
                && $(this).children('td').eq(6).text().indexOf(contactName) != -1 && (new Date(start).getTime() >= new Date(startDate).getTime())
                && (new Date(end).getTime() <= new Date(endDate).getTime() && $(this).children('td').eq(12).text().indexOf(small)!=-1)&& $(this).children('td').eq(13).text().indexOf(nameBykey)!=-1
            )) {
                $(this).hide();
            }
            if (($(this).children('td').eq(2).text().indexOf(companyName) != -1
                && $(this).children('td').text().indexOf(text) != -1 &&
                $(this).children('td').eq(4).text().indexOf(checkState) != -1 && (new Date(start).getTime() >= new Date(startDate).getTime())
                && $(this).children('td').eq(6).text().indexOf(contactName) != -1
                && (new Date(end).getTime() <= new Date(endDate).getTime()) && $(this).children('td').eq(12).text().indexOf(small)!=-1)&& $(this).children('td').eq(13).text().indexOf(nameBykey)!=-1
            ) {
                array1.push($(this));
            }
        });
    }
  console.log(nameBykey)


    for(x=0;x<array1.length;x++){
        console.log($(array1[x].children('td').eq(1).html()))
    }

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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(contractIndex,1)

    for (var i = 0; i < array1.length; i++) {
        array1[i].hide();
    }

    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


}






function searchFuzzy() {
    console.log(nameBykey)
    $('#tbody1').find('.myclass1').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);
   console.log(array)
    var text = $.trim($('#searchContent').val());
    isSearch = true;
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (($(this).children('td').text().indexOf(text) == -1)||$(this).children('td').eq(13).text().indexOf(nameBykey.toString())==-1) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1&&$(this).children('td').eq(13).text().indexOf(nameBykey.toString())!=-1) {
                array1.push($(this));
            }
        });
    }
    console.log(array1)
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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(contractIndex,1);

    for (var i = 0; i < array1.length; i++) {
        array1[i].hide();
    }

    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        console.log(nameBykey)
        if(nameBykey=='危废合同'){
            contractIndex = 0;
            var page = {};
            var pageNumber = 1;
            page.count = countValue();                                 // 可选
            page.pageNumber = pageNumber;
            page.start = (pageNumber - 1) * page.count;
            page.contractIndex = contractIndex;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageContractManageList",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                contentType: "application/json; charset=gbk",
                data: JSON.stringify(page),
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPageClone(result);
                        setPageCloneAfter(contractIndex,1)
                        //setContractList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if(nameBykey=='应急处置合同'){
            contractIndex = 1;
            var page = {};
            var pageNumber = 1;
            page.count = countValue();                                 // 可选
            page.pageNumber = pageNumber;
            page.start = (pageNumber - 1) * page.count;
            page.contractIndex = contractIndex;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageContractManageList",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                contentType: "application/json; charset=gbk",
                data: JSON.stringify(page),
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPageClone(result);
                        setPageCloneAfter(contractIndex,1)
                        //setContractList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if(nameBykey=='物流合同'){
            contractIndex = 2;
            var page = {};
            var pageNumber = 1;
            page.count = countValue();                                 // 可选
            page.pageNumber = pageNumber;
            page.start = (pageNumber - 1) * page.count;
            page.contractIndex = contractIndex;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageContractManageList",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                contentType: "application/json; charset=gbk",
                data: JSON.stringify(page),
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPageClone(result);
                        setPageCloneAfter(contractIndex,1)
                        //setContractList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }

    }

}

function setContractList(result) {
    //console.log(eval(result));//可以取到
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr1");//克隆一行
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var obj = eval(item);
        // console.log(obj);
        // 循环遍历cloneTr的每一个td元素，并赋值
        if (obj.contractId == "") {
            obj.contractId = ""
        }
        if (obj.contractType == null) {
            obj.contractType.name = "";
        }
        if (obj.companyName == "") {
            obj.companyName = "";
        }
        if (obj.province == null) {
            obj.province = "";
        }
        if (obj.city == "") {
            obj.city = "";
        }
        if (obj.contactName == "") {
            obj.contactName = "";
        }
        if (obj.telephone == "") {
            obj.telephone = "";
        }
        if (obj.contractContent == "") {
            var clonedTr = tr.clone();
            clonedTr.show();
            clonedTr.attr('class', 'myclass1');
            clonedTr.children("td").each(function (inner_index) {
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 合同编号
                    case (1):
                        $(this).html(obj.contractId);
                        break;
                    //处置单位名称
                    case (2):
                        // $(this).html();
                        //判断是否是物流合同
                        if (obj.contractType.name == '物流合同') {
                            if (obj.supplier != null) {
                                $(this).html(obj.supplier.companyName);
                            }
                        }
                        else {
                            if (obj.client != null) {
                                $(this).html(obj.client.companyName);
                            }

                        }
                        break;
                    // 合同名称
                    case (3):
                        $(this).html(obj.contractName);
                        break;
                    // 状态
                    case (4):
                        if (obj.checkStateItem != null){
                            $(this).html(obj.checkStateItem.dictionaryItemName);
                            // if(obj.checkStateItem.dictionaryItemName=='已作废'){
                            //     $(this).parent().hide();
                            // }
                        }

                        break;
                    // 公司名称
                    // case (5):
                    //     $(this).html(obj.companyName);
                    //     break;
                    // 所属区域
                    // case (6):
                    //     if (obj.province != null) {
                    //         $(this).html(obj.province.name + obj.city);
                    //     }
                    //     else {
                    //         $(this).html("");
                    //     }
                    //     break;
                    // 合约量
                    case (5):
                        $(this).html(obj.agreedQuantity.toFixed(2));
                        break;
                    // 联系人
                    case (6):
                        $(this).html(obj.contactName);
                        break;
                    // 联系方式
                    case (7):
                        $(this).html(obj.telephone);
                        break;
                    // 签订日期
                    case (8):
                        if (obj.beginTime != null) {
                            var time = gettime(obj.beginTime);
                            $(this).html(time);
                        }
                        else {
                            $(this).html("");
                        }
                        break;
                    // case (10):
                    //     if(obj.checkState.name == "已作废"){
                    //         $(".glyphicon3").removeAttr("onclick");
                    //         document.getElementById("glyphicon3").style.color="#9d9d9d";
                    //     }
                    //     if(obj.checkState.name == "待审批"){
                    //
                    //     }else if(obj.checkState.name == "审批中"){
                    //         $(this).children().eq(1).attr("class","disabled");
                    //         $(this).children().eq(1).removeAttr("onclick");
                    //     }else if(obj.checkState.name == "履约中"){
                    //         $(this).children().eq(1).attr("class","disabled");
                    //         $(this).children().eq(1).removeAttr("onclick");
                    //         $(this).children().eq(2).attr("class","disabled");
                    //         $(this).children().eq(2).removeAttr("onclick");
                    //         $(this).children().eq(3).attr("class","disabled");
                    //         $(this).children().eq(3).removeAttr("onclick");
                    //     }else{
                    //         $(this).children().eq(1).attr("class","disabled");
                    //         $(this).children().eq(1).removeAttr("onclick");
                    //         $(this).children().eq(2).attr("class","disabled");
                    //         $(this).children().eq(2).removeAttr("onclick");
                    //         $(this).children().eq(3).attr("class","disabled");
                    //         $(this).children().eq(3).removeAttr("onclick");
                    //     }
                    //     break;
                    //截止日期

                    //截止日期
                    // 截至日期
                    case (9):
                        if (obj.endTime != null) {
                            var time = gettime(obj.endTime);
                            $(this).html(time);
                        }
                        else {
                            $(this).html("");
                        }
                        break;
                    case (10):{
                        if(obj.small=="false"||obj.small==false){
                            $(this).html("不是");
                        }
                        if(obj.small=="true"||obj.small==true){
                            $(this).html("是");
                        }

                        break;
                    }
                    //录入人
                    case (11):
                        $(this).html(obj.reviewer);
                        break;
                    //大小额合同
                    case (12):
                        var total = 0;
                        $.each(obj.quotationItemList, function (index, item) {
                            total += parseFloat(item.unitPriceTax)
                        })
                        if (total == 0) {
                            $(this).html("小额合同");
                        }
                        if (total > 0) {
                            $(this).html("大额合同");
                        }
                        break;
                        //合同类型
                    case (13):
                       if(obj.contractType!=null){
                       $(this).html(obj.contractType.name)
                       }
                       break;

                }
            });

            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    });
    // 隐藏无数据的tr
    tr.hide();
}




//获取时间
function gettime(obj) {
    var year = (parseInt(obj.year) + 1900).toString();
    var mouth = parseInt((obj.month) + 1).toString();
    if (mouth.length != 2) {
        mouth = 0 + mouth;
    }
    //  dataLeftCompleting(2, "0", mouth.toString()).toString();
    var day = parseInt((obj.date)).toString();
    //ataLeftCompleting(2, "0", day.toString()).toString();
    if (day.length != 2) {
        day = 0 + day;
    }
    var time1 = year + "-" + mouth + "-" + day;
    return time1;
}


function contractSubmit() {
    initSubmitFName(submitContract1.name);
    //在此提交
    if(confirm("确定提交?")){
        //点击确定后操作
        var items = $("input[name='select']:checked");//判断复选框是否选中
        if (items.length > 0) {
            items.each(function () {//遍历
                var id = getContractId1(this);//获得合同编号
                publicSubmit(id, getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
                // getContractById(id);

            });
            function getContractById(id) {
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "submitContract1",              // url
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    data: {
                        'id': id
                    },
                    success: function (result) {
                        if (result != undefined) {
                        } else {
                            console.log("fail: " + result);
                        }
                    },
                    error: function (result) {
                        console.log("error: " + result);
                    }
                });
            }


            // alert("提交成功!");
            // window.location.reload()
        }
        else {
            alert("请勾选要提交的合同！")
        }
    }

}

function submitContract1(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "submitContract1",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'id': id
        },
        success: function (result) {
            if (result != undefined) {
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}
function getContractId1(item) {
    return item.parentElement.parentElement.nextElementSibling.innerHTML;
}

/***
 * 查看合同
 */
function viewContract(item) {
    contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var contractType = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
    // console.log(contractId+contractType);
    $('#close').show();
    $('#btn').text();
    $('#back').text('');
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getContractId",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'contractId': contractId
        },
        success: function (result) {
            //console.log(result);
            if (result != undefined) {
                console.log(result);
                var data = eval(result);
                //开始日期
                if (data.beginTime != null) {
                    var begin = gettime(data.beginTime);
                }
                else {
                    var begin = "";
                }
                //截止日期
                if (data.endTime != null) {
                    var end = gettime(data.endTime);
                }
                else {
                    var end = "";
                }
                //合同状态
                if (data.checkStateItem != null) {
                    $("#modal3_contractState").text(data.checkStateItem.dictionaryItemName);
                }
                else {
                    $("#modal3_contractState").text("");
                }

                //合同版本
                $("#modal3_contractVersion").text(data.contractVersion.name);//合同版本
                // $("#modal3_companyName").text(data.companyName);
                if (data.contractVersion.name == "公司合同") {
                    $("#modal3_contractName").text(data.contractName);//合同名称
                }
                if (data.contractVersion.name == "产废单位合同") {
                    $("#modal3_contractName").text(data.contractName);//合同名称
                }
                //联系人
                $("#modal3_contactName").text(data.contactName);
                //合同编号
                $("#modal3_contractId").text(data.contractId);
                $("#modal3_beginTime").text(begin);
                $("#modal3_endTime").text(end);
                //  $("#modal3_area").text(data.province.name+""+data.city);
                //联系方式
                $("#modal3_telephone").text(data.telephone);
                //预计处置费
                $("#modal3_order").text(data.order1);
                if (data.contractType.name == '物流合同') {
                    $('#name1').html("处置单位名称&nbsp;&nbsp;");
                    //$("#modal3_suppierName").text(data.suppierName);
                    //供用商姓名
                    if (data.supplier != null) {
                        $('#modal3_suppierName').text(data.supplier.companyName);
                    }
                    //运费承担主体 判断
                    if(data.freightBearer==true){
                        $('#modal3_freightBearer').text("客户承担");
                    }
                    if(data.freightBearer==false){
                        $('#modal3_freightBearer').text("经营单位承担");
                    }

                }
                if (data.contractType.name != '物流合同') {
                    $('#name1').html("产废单位名称&nbsp;&nbsp;");
                    if (data.client != null) {
                        $("#modal3_suppierName").text(data.client.companyName);//公司名称
                    }
                    //运费承担主体 无
                    $('#modal3_freightBearer').text("无");
                }

                //开票税率1
                if (data.ticketRateItem!= null) {
                    if (data.ticketRateItem!= null)   {
                        $('#modal3_ticketRate1').text(data.ticketRateItem.dictionaryItemName);
                    }

                }
                else {

                    $('#modal3_ticketRate1').text(" ");
                }
                //开票税率2
                // if(data.ticketRate2==null){
                //     $('#modal3_ticketRate2').text(" ");
                // }
                // else {
                //     $('#modal3_ticketRate2').text(data.ticketRate2.name);
                // }
                //资质开始日期
                // if(data.beginQualification==null){
                //     $('#modal3_beginQualification').text(" ");
                // }
                // else {
                //     var begin1=gettime(data.beginQualification);
                //     $('#modal3_beginQualification').text(begin1);
                // }
                //资质结束日期
                // if(data.endQualification==null){
                //     $('#modal3_endQualification').text(" ");
                // }
                // else {
                //     var end1=gettime(data.endQualification);
                //     $('#modal3_endQualification').text(end1);
                // }
                //物流公司资质
                //  $('#modal3_logisticsQualification').text(data.logisticsQualification);
                //开户行名称
                $('#modal3_bankName').text(data.bankName);
                //开户行账号
                $('#modal3_bankAccout').text(data.bankAccount);
                if (data.freight == true) {//需要运费
                    $('#modal3_freight').removeAttr("checked");
                    $('#modal3_freight').prop("checked", true);
                }
                if (data.freight == false) {//不需要运费
                    $('#modal3_freight').removeAttr("checked");
                }
                $('#modal3_contractAppendices').click(function () {
                    if (data.contractAppendicesUrl != null && data.contractAppendicesUrl != "") {
                        window.open('downloadFile?filePath=' + data.contractAppendicesUrl);
                        window.location.reload()
                    } else {
                        alert("未上传文件");
                        window.location.reload()
                    }
                });

                //合同总金额
                $('#modal3_totalPrice').text(data.totalPrice.toFixed(3));


                //赋值报价单明细
                if (data.quotationItemList != null) {
                    setContractListModal(data.quotationItemList);
                }


                $('#search').prop("readonly", false);
            } else {
                $("#modal3_contactName").text("");
                $("#modal3_contractState").text("");
                $("#modal3_contractVersion").text("");
                $("#modal3_companyName").text("");
                $("#modal3_contactName").text("");
                $("#modal3_contractId").text("");
                $("#modal3_beginTime").text("");
                $("#modal3_endTime").text("");
                $("#modal3_area").text("");
                $("#modal3_telephone").text("");
                $("#modal3_order").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#contractInfoForm').modal('show');
    $('#btn').hide();//审批隐藏
    $('#back').hide();//驳回隐藏
    $('#print').show();//打印显示
    $('#print').show();//打印显示
}

//设置克隆行的数据合同查看功能1
function setContractListModal(result) {
    //$('.myclass1').hide();
    var tr = $("#cloneTr");
    tr.siblings().remove();
    tr.attr('class', 'myclass1');
    $.each(result, function (index, item) {
        //console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            //1生成领料单号
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index + 1);
                    break;
                // 八位码
                case (1):
                    $(this).html(obj.wastesCode);
                    break;
                // 单位
                case (2):
                    $(this).html(obj.wastesName);
                    break;
                // 库存量
                case (3):
                    if (obj.packageTypeItem != null) {
                        $(this).html(obj.packageTypeItem.dictionaryItemName);
                    }

                    break;
                // 需求数量
                case (4):
                    if (obj.unitDataItem != null) {
                        $(this).html(obj.unitDataItem.dictionaryItemName);
                    }

                    break;
                // 备注
                case (5):
                    $(this).html(obj.unitPriceTax.toFixed(3));
                    break;
                case (6):
                    $(this).html(obj.contractAmount.toFixed(3));
                    break;
                case (7):
                    $(this).html(obj.totalPrice.toFixed(3));
                    break;
                case (8):
                    if (obj.transportItem != null) {
                        $(this).html(obj.transportItem.dictionaryItemName);
                    }
                    break;
                case (9):
                    $(this).html(obj.remarks);
                    break;
                case (10):
                    $(this).find('button').click(function () {
                        if (obj.picture != null && obj.picture != "") {
                            window.open('downloadFile?filePath=' + obj.picture);
                            window.location.reload()
                        } else {
                            alert("未上传文件");
                            window.location.reload()
                        }
                    })
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

/***
 * 查看合同2
 */
function viewContract1(item) {
    var contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var contractType = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
    if (contractType.indexOf('应急处置合同') != -1) {
        //做跳转
        //window.location.href = "emergency?contractId="+contractId;
        //转到html便于操作
        localStorage.name1 = contractId;
        location.href = "showemergency.html";
    }
    else {
        $('#btn').text();
        $('#back').text('');
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getContractId",                   // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                'contractId': contractId
            },
            success: function (result) {
                // console.log(result);
                if (result != undefined) {
                    var data = eval(result);
                    if (data.beginTime != null) {
                        var begin = gettime(data.beginTime);
                    }
                    else {
                        var begin = "";
                    }
                    if (data.endTime != null) {
                        var end = gettime(data.endTime);
                    }
                    else {
                        var end = "";
                    }
                    $("#modal3_contractState").text(data.checkState.name);
                    $("#modal3_contractVersion").text(data.contractVersion.name);
                    $("#modal3_companyName").text(data.companyName);
                    if (data.contractVersion.name == "公司合同") {
                        $("#modal3_contractName").text(data.contractName);//合同名称
                    }
                    if (data.contractVersion.name == "产废单位合同") {
                        $("#modal3_contractName").text(data.contractName);//合同名称
                    }
                    $("#modal3_contactName").text(data.contactName);
                    $("#modal3_contractId").text(data.contractId);
                    $("#modal3_beginTime").text(begin);
                    $("#modal3_endTime").text(end);
                    $("#modal3_area").text(data.province.name + "" + data.city);
                    $("#modal3_telephone").text(data.telephone);
                    $("#modal3_order").text(data.order1);
                    //开票税率1
                    if (data.ticketRate1 == null) {
                        $('#modal3_ticketRate1').text(" ");
                    }
                    else {
                        $('#modal3_ticketRate1').text(data.ticketRate1.name);
                    }
                    //开票税率2
                    // if(data.ticketRate2==null){
                    //     $('#modal3_ticketRate2').text(" ");
                    // }
                    // else {
                    //     $('#modal3_ticketRate2').text(data.ticketRate2.name);
                    // }
                    //资质开始日期
                    if (data.beginQualification == null) {
                        $('#modal3_beginQualification').text(" ");
                    }
                    else {
                        var begin1 = gettime(data.beginQualification);
                        $('#modal3_beginQualification').text(begin1);
                    }
                    //资质结束日期
                    if (data.endQualification == null) {
                        $('#modal3_endQualification').text(" ");
                    }
                    else {
                        var end1 = gettime(data.endQualification);
                        $('#modal3_endQualification').text(end1);
                    }
                    //物流公司资质
                    $('#modal3_logisticsQualification').text(data.logisticsQualification);
                    //开户行名称
                    $('#modal3_bankName').text(data.bankName);
                    //开户行账号
                    $('#modal3_bankAccout').text(data.bankAccount);
                    if (data.freight == true) {//需要运费
                        $('#modal3_freight').removeAttr("checked");
                        $('#modal3_freight').prop("checked", true);
                    }
                    if (data.freight == false) {//不需要运费
                        $('#modal3_freight').removeAttr("checked");
                    }
                    $('#search').prop("readonly", false);
                } else {
                    $("#modal3_contactName").text("");
                    $("#modal3_contractState").text("");
                    $("#modal3_contractVersion").text("");
                    $("#modal3_companyName").text("");
                    $("#modal3_contactName").text("");
                    $("#modal3_contractId").text("");
                    $("#modal3_beginTime").text("");
                    $("#modal3_endTime").text("");
                    $("#modal3_area").text("");
                    $("#modal3_telephone").text("");
                    $("#modal3_order").text("");
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
        $('#contractInfoForm').modal('show');
        $('#btn').hide();//审批隐藏
        $('#back').hide();//驳回隐藏
        $('#print').show();//打印显示
        $('#print').show();//打印显示
    }

}

/***
 * 修改合同
 */
function adjustContract(item) {
    //1获取合同id
    var contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    // console.log(contractId);
    //2判断合同的名字然后跳转到相应的jsp页面做修改
    var contractName = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
    // console.log(contractName);
    if (contractName.indexOf('危废') != -1) {
        //使用html便于操作
        localStorage.contractId = contractId;
        location.href = "adjustWaste.html";
        //window.location.href = "showContract?contractId=" + contractId;
    }
    if (contractName.indexOf('次生') != -1) {
        window.location.href = "Secondary?contractId=" + contractId;
    }
    if (contractName.indexOf('物流') != -1) {
        localStorage.contractId = contractId;
        location.href = "adjustLogistics.html";
        //window.location.href = "logistics?contractId=" + contractId;
    }
    if (contractName == '采购') {
        //window.location.href = "showContract?contractId="+contractId;
    }
    if (contractName.indexOf('应急') != -1) {
        // window.location.href = "emergency1?contractId="+contractId;
        //换到html页面，便于操作
        localStorage.contractId = contractId;
        location.href = "adjustUrgent.html";
    }

}

//危废合同页面新增
function loadWastesContractSelectList() {
    $('.loader').show();
    loadNavigationList();   // 设置动态菜单

    var contactType=localStorage.contractType;
    console.log("合同类型:"+contactType)
    //默认选中合同类型
    $("#contractType").val(contactType)

    //获取送审人员，送审日期，送审部门
   var  user= getCurrentUserData();

    if(user!=null){
        $('#reviewer').val(user.name)

        $('#reviewDepartment').val(user.department)

    }

    $("#reviewDate").val(dateToString(new Date()));

     $("#Yes").hide()
     $("#No").hide()

    //赋值送审人员，送审日期，送审部门
    // $("#reviewer").val("yunchenxia");



    // $("#reviewDepartment").val(user.department);
    //危废编码赋值
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
    code = "";
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //包装类型
    $.ajax({
        type: 'POST',
        url: "getPackageTypeByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    packageType.append(option);
                });

                // $('.selectpicker').selectpicker('val', clientList1);//默认选中
                //$('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //单位
    $.ajax({
        type: 'POST',
        url: "getUnitByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var unit = $('#unit');
                unit.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unit.append(option);
                });
                unit.get(0).selectedIndex = 1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //开票类型
    $.ajax({
        type: 'POST',
        url: "getTicketRate1ByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var taxRate = $('#taxRate1');
                taxRate.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    taxRate.append(option);
                });
                taxRate.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });



    //1隐藏运费承担主体
    $('#freight').html("")
    //2隐藏客户承担、经营单位承担
    $('#freightCheckbox').hide();


    $('#supplier').hide();//供应商隐藏
    $('#client').show();//产废单位显示
    $('#name').text('产废单位');
    var contractName1 = $('#contractName1');
    contractName1.hide();//默认公司合同 隐藏掉客户合同

   // $("#contractType1").val('危废');


    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        async: false,
        dataType: "json",
        data: {"key": "危废"},
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var data = eval(result);
                // //赋值合同编号
                // $('#contractId').html(data.contractId);

                var clientName = $('#companyName');//产废单位
                clientName.children().remove();
                $.each(data.companyNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientName.append(option);
                });

                $('.selectpicker').selectpicker('refresh');

                // $.ajax({
                //     type: "POST",                       // 方法类型
                //     url: "getClientListById",                  // url
                //     data: {'clientId': $("#companyName option:selected").val()},
                //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                //     dataType: "json",
                //     //contentType: "application/json; charset=utf-8",
                //     success: function (result) {
                //         if (result != undefined && result.status == "success") {
                //             // console.log(result);
                //              var company = result.client;//取得被选中处置单位的信息
                //               console.log(eval(company))
                //             //赋值开票类型
                //             if(company.ticketRateItem!=null){
                //                 $('#taxRate1').val(company.ticketRateItem.dataDictionaryItemId);
                //             }
                //           else {
                //                 $('#taxRate1').get(0).selectedIndex = 0;
                //             }
                //
                //
                //
                //
                //             $('#contactName').prop("value", company.contactName);
                //
                //             //赋值联系方式
                //             if (company.mobile != "" && company.phone == "") {
                //                 $('#telephone').prop("value", company.mobile);
                //             }
                //             if (company.mobile == "" && company.phone != "") {
                //                 $('#telephone').prop("value", company.phone);
                //             }
                //             if (company.mobile == "" && company.phone == "") {
                //                 $('#telephone').prop("value", "");
                //             }
                //             if (company.mobile != "" && company.phone != "") {
                //                 $('#telephone').prop("value", company.mobile);
                //             }
                //             $('#bankName').prop("value", company.bankName);
                //             //赋值开户行账号
                //             $('#bankAccount').prop("value", company.bankAccount);
                //             $('#company1').prop("value", company.companyName);
                //         }
                //         else {
                //             alert(result.message);
                //         }
                //     },
                //     error: function (result) {
                //         alert("服务器异常！");
                //     }
                // });


            } else {
            }
        },
        error: function (result) {
            console.log(result);
        }
    });



    findModel();
}

//根据合同类型选择模板
function findModel() {

    var contractType = ($('#contractType option:selected').text()).substring(0, 2);


    $("#contractType1").val(contractType)

    if (contractType == '物流') {


        //1显示运费承担主体
        $('#freight').html("运费承担主体")
        //2显示客户承担、经营单位承担
        $('#freightCheckbox').show();
        $('#supplier').show();//供应商显示
        $('#client').hide();//产废单位隐藏
        $('#name').text('处置单位名称')
        //取得下拉菜单的选项
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getContractList",                  // url
            async: false,
            dataType: "json",
            data: {"key": contractType},
            success: function (result) {
                if (result != undefined) {

                    var data = eval(result);

                    $('.selectpicker').selectpicker('refresh');

                    var suppier = $('#suppier');

                    suppier.children().remove();

                    $.each(data.supplierNameList, function (index, item) {
                        var option = $('<option />');
                        option.val(item.supplierId);
                        option.text(item.companyName);
                        suppier.append(option);
                    });
                    $('.selectpicker').selectpicker('refresh');

                    //2赋值
                    //开票税率下拉框
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getSupplierListById",                  // url
                        data: {'supplierId': $("#suppier option:selected").val()},
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        //contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {
                                console.log(result);
                                var suppier = result.supplier;//取得被选中处置单位的信息

                                if(suppier.ticketRateItem!=null){
                                    $('#taxRate1').val(suppier.ticketRateItem.dataDictionaryItemId);
                                }
                                else
                                    $('#taxRate1').get(0).selectedIndex = 0;
                                $('#contactName').prop("value", suppier.contactName);
                                //赋值联系方式

                                $("#telephone").prop("value", suppier.phone);//赋值联系电话

                                $("#contactName").prop("value", suppier.contactName);//赋值联系人
                                //console.log(suppier.companyName);
                                $("#suppierName").val(suppier.companyName);//赋值处置单位名称

                                $('#bankName').prop("value", suppier.bankName);
                                //赋值开户行账号
                                $('#bankAccount').prop("value", suppier.bankAccount);

                                $('#company1').prop("value", suppier.companyName);
                            }
                            else {
                                alert(result.message);
                            }
                        },
                        error: function (result) {
                            alert("服务器异常！");
                        }
                    });

                } else {
                    //console.log(result);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });


    }


    if (contractType != '物流') {

        $('#supplier').hide();//供应商隐藏

        $('#client').show();//产废单位显示

        $('#name').text('产废单位')

        //1隐藏运费承担主体
        $('#freight').html("")

        //2隐藏客户承担、经营单位承担
        $('#freightCheckbox').hide();

        $.ajax({
            type: "POST",                            // 方法类型
            url: "getContractList",                  // url
            async: false,
            dataType: "json",
            data: {"key": contractType},
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    var data = eval(result);
                    // //赋值合同编号
                    // $('#contractId').html(data.contractId);

                    var clientName = $('#companyName');//产废单位

                    clientName.children().remove();

                    $.each(data.companyNameList, function (index, item) {
                        var option = $('<option />');
                        option.val(item.clientId);
                        option.text(item.companyName);
                        clientName.append(option);
                    });

                    $('.selectpicker').selectpicker('refresh');

                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getClientListById",                  // url
                        data: {'clientId': $("#companyName option:selected").val()},
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        //contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {
                                // console.log(result);
                                var company = result.client;//取得被选中处置单位的信息

                                if(company.ticketRateItem!=null){
                                    $('#taxRate1').val(company.ticketRateItem.dataDictionaryItemId);
                                }
                                else
                                    $('#taxRate1').get(0).selectedIndex = 0;

                                $('#contactName').prop("value", company.contactName);
                                //赋值联系方式
                                if (company.mobile != "" && company.phone == "") {
                                    $('#telephone').prop("value", company.mobile);
                                }
                                if (company.mobile == "" && company.phone != "") {
                                    $('#telephone').prop("value", company.phone);
                                }
                                if (company.mobile == "" && company.phone == "") {
                                    $('#telephone').prop("value", "");
                                }
                                if (company.mobile != "" && company.phone != "") {
                                    $('#telephone').prop("value", company.mobile);
                                }
                                $('#bankName').prop("value", company.bankName);
                                //赋值开户行账号
                                $('#bankAccount').prop("value", company.bankAccount);
                                $('#company1').prop("value", company.companyName);
                            }
                            else {
                                alert(result.message);
                            }
                        },
                        error: function (result) {
                            alert("服务器异常！");
                        }
                    });


                    // var suppier = $('#suppier');
                    // suppier.children().remove();
                    // $.each(data.supplierNameList, function (index, item) {
                    //     var option = $('<option />');
                    //     option.val(item.supplierId);
                    //     option.text(item.companyName);
                    //     suppier.append(option);
                    // });


                    $('.selectpicker').selectpicker('refresh');
                    //2赋值
                    //开票税率下拉框
                    //开票税率1下拉框

                    // $.ajax({
                    //     type: "POST",                       // 方法类型
                    //     url: "getClientListById",                  // url
                    //     data: {'clientId': $("#companyName option:selected").val()},
                    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    //     dataType: "json",
                    //     //contentType: "application/json; charset=utf-8",
                    //     success: function (result) {
                    //         if (result != undefined && result.status == "success") {
                    //             // console.log(result);
                    //             var company = result.client;//取得被选中处置单位的信息
                    //             //console.log(company);
                    //             var taxRate1 = $('#taxRate1');
                    //
                    //
                    //             $('#contactName').prop("value", company.contactName);
                    //             //赋值联系方式
                    //             if (company.mobile != "" && company.phone == "") {
                    //                 $('#telephone').prop("value", company.mobile);
                    //             }
                    //             if (company.mobile == "" && company.phone != "") {
                    //                 $('#telephone').prop("value", company.phone);
                    //             }
                    //             if (company.mobile == "" && company.phone == "") {
                    //                 $('#telephone').prop("value", "");
                    //             }
                    //             if (company.mobile != "" && company.phone != "") {
                    //                 $('#telephone').prop("value", company.mobile);
                    //             }
                    //             $('#bankName').prop("value", company.bankName);
                    //             //赋值开户行账号
                    //             $('#bankAccount').prop("value", company.bankAccount);
                    //             $('#company1').prop("value", company.companyName);
                    //         }
                    //         else {
                    //             alert(result.message);
                    //         }
                    //     },
                    //     error: function (result) {
                    //         alert("服务器异常！");
                    //     }
                    // });

                } else {
                }
            },
            error: function (result) {
                console.log(result);
            }
        });

    }



    $('.loader').hide();









}


//合同编号校验
function  Verification(item) {
    var contractId=$(item).val();
    
    $.ajax({
        type: "POST",                       // 方法类型
        url: "Verification",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'contractId': contractId
        },
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                        if(result.flag==true){
                           $("#Yes").hide();
                            $("#No").show();
                        }
                if(result.flag==false){
                    $("#Yes").show();
                    $("#No").hide();
                }
            }
        },
        error:function (result) {
            
        }
    })

}



























//根据编码查找名称
function findWastesName(item) {

    var code = $(item).prev().prev().attr('title');

    //根据危废编码获取危废名称
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getWastesNameByCode",                  // url
        async: false,
        dataType: "json",
        data: {"code": code},
        //contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log($(item).parents('td'))
                $(item).parents('td').next().children('input').val(result.wastesName)
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常!")
        }
    })

}


//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/*导入费用明细*/
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importQuotationItemExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    if (result.status == "success") {
                        console.log(result);
                        // window.location.reload();         //刷新
                        $('.selectpicker').selectpicker({
                            language: 'zh_CN',
                            // style: 'btn-info',
                            size: 6
                        });//下拉框样式

                        //费用明细明细赋值
                        classNumber = $('.myclass').length;
                        $.each(result.data, function (index, item) {
                            $('.selectpicker').selectpicker({
                                language: 'zh_CN',
                                // style: 'btn-info',
                                size: 4
                            });//下拉框样式

                            var tr = $('#cloneTr1');
                            // tr.siblings().remove();
                            var cloneTr = tr.clone();
                            cloneTr.attr('class', 'myclass');
                            cloneTr.show();
                            // cloneTr.children('td').eq(1).find('select').selectpicker('val', item.wastesCode);
                            cloneTr.children('td').eq(2).children('input').val(item.wastesName);
                            // cloneTr.children('td').eq(4).children('input').val(item.util);
                            cloneTr.children('td').eq(5).children('input').val(item.unitPriceTax.toFixed(2));
                            cloneTr.children('td').eq(6).children('input').val(item.contractAmount.toFixed(2));
                            cloneTr.children('td').eq(7).children('input').val(item.totalPrice.toFixed(2));
                            if (item.packageType != null) {
                                cloneTr.children('td').eq(3).children('select').val(item.packageType.index);
                            }
                            if (item.util != null) {
                                cloneTr.children('td').eq(4).children('select').val(item.util.index);
                            }
                            if (item.transport != null) {
                                cloneTr.children('td').eq(8).children('select').val(item.transport.index);
                            }


                            $.ajax({
                                type: 'POST',
                                url: "getWastesInfoList",
                                async: false,
                                dataType: "json",
                                contentType: "application/json;charset=utf-8",
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {
                                        // console.log(result);
                                        var obj = eval(result);
                                        var wastesCode = cloneTr.children('td').eq(1).find('select');
                                        wastesCode.children().remove();
                                        $.each(obj.data, function (index, item) {
                                            var option = $('<option/>');
                                            option.val(item.code);
                                            option.text(item.code);
                                            wastesCode.append(option);
                                        });
                                        wastesCode.selectpicker('val', item.wastesCode);
                                        wastesCode.removeAttr('id');
                                        $('.selectpicker').selectpicker('refresh');
                                    }
                                    else {
                                        alert(result.message);
                                    }
                                },
                                error: function (result) {
                                    console.log(result);
                                }
                            });


                            cloneTr.removeAttr('id');
                            cloneTr.insertAfter(tr);
                            $('.selectpicker').data('selectpicker', null);
                            $('.bootstrap-select').find("button:first").remove();
                            $('.selectpicker').selectpicker();
                            $('.selectpicker').selectpicker('refresh');
                            tr.hide();
                            tr.removeAttr('class');

                        })

                        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                        $('.myclass').each(function (index, item) {
                            $(this).children('td').eq(0).html(index + 1);
                            if ((classNumber + index) != 1) {
                                $(this).children('td').eq(0).append(delBtn);
                            }
                        })


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
        // $('#importExcelModal').hide();
    });
}


//计算总价
function calculateTotalPrice(item) {
    var unitPrice = $(item).parent().parent().children('td').eq(6).children('input').val();
    if (unitPrice.length == 0) {
        unitPrice = 0;
    }
    var contractAmount = $(item).parent().parent().children('td').eq(5).children('input').val();
    if (contractAmount.length == 0) {
        contractAmount = 0;
    }
    console.log(unitPrice + "==" + contractAmount);
    $(item).parent().parent().children('td').eq(7).children('input').val((parseFloat(unitPrice) * parseFloat(contractAmount)).toFixed(2));
}

function warning(item) {
    // if($('#beginTime').val().length>0&&$('#endTime').val().length>0){
    //    $('#endTime').parent().next('span').remove();
    // }
    if ($(item).val().length > 0) {
        $(item).parent().next('span').remove();
    }
}

//保存合同
function contractWastesSave() {
    var addType = $("input[name='addType']:checked").val();

    if ($('#beginTime').val().length == 0 || $('#endTime').val().length == 0) {
        $('#endTime').parent().next('span').remove();
        var span = $('<span>');
        span.text("请输入日期！");
        span.css('color', 'red');
        $('#endTime').parent().after($(span));
    }


    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {
        if ($('#contractName').val().length == 0) {
            $('#contractName').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractName1').after($(span));
        }
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractName').val().length > 0) {
            var contractType1;
            if ($('#contractType').val() == '应急处置合同') {
                contractType1 = 'Emergency';
            }
            if ($('#contractType').val() == '危废合同') {
                contractType1 = 'Wastes';
            }
            if ($('#contractType').val() == '物流合同') {
                contractType1 = 'Logistics';
            }

            var totalPrice = 0;
            $('.myclass').each(function () {
                var price = parseFloat($(this).children('td').eq(7).children('input').val());
                if(isNaN(price)){
                    price=0
                }
                totalPrice += price;


            })
                      var smallContract=$("input[name='1']:checked").val();
            var small;
            if(smallContract=="false"){
                small=false;
            }
            if(smallContract=="true"){
                small=true;
            }

            var data = {
                small:small,
                client: {clientId: $('#companyName').selectpicker('val')},
                supplier: {supplierId: $('#suppier').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractName').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                contractId:$('#contractId').val(),
                contractType: $('#contractType').val(),
                totalPrice: parseFloat(totalPrice).toFixed(2),
                freightBearer: $("input[name='freightBearer']:checked").val(),
                reviewer:$('#reviewer').val(),
                reviewDepartment:$('#reviewDepartment').val(),
                reviewDate:$('#reviewDate').val(),
                ticketRateItem:{dataDictionaryItemId:$('#taxRate1').val()}
            };
            console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        //添加图片地址
                        var formFile = new FormData();
                        formFile.append("contractId", $('#contractId').html());
                        if ($('#contractAppendices').prop('type') != 'text') {
                            var pictureFile = $('#contractAppendices')[0].files[0];
                            console.log('合同附件:'+pictureFile)
                            formFile.append("contractAppendices", pictureFile);
                            if(pictureFile!=undefined){
                                //保存合同附件
                                $.ajax({
                                    type: "POST",                            // 方法类型
                                    url: "saveContractAppendices",                     // url
                                    cache: false,
                                    async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                    data: formFile,
                                    dataType: "json",
                                    processData: false,
                                    contentType: false,
                                    success: function (result) {
                                        if (result != undefined && result.status == "success") {

                                        }
                                        else {

                                        }
                                    },
                                    error: function (result) {
                                        console.log("error: " + result);
                                        alert("服务器异常!");
                                    }
                                });
                            }

                        }

                        //console.log(result);
                        $('.myclass').each(function () {
                            if ($(this).children('td').eq(2).children('input').val().length > 0) { //如果有报价才添加


                            var quotationItemData = {
                                contractId: $('#contractId').val(),
                                client: {clientId: $('#companyName').selectpicker('val')},
                                wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                                wastesName: $(this).children('td').eq(2).children('input').val(),
                                packageTypeItem: {dataDictionaryItemId: $(this).children('td').eq(3).find('select').val()},
                                transportItem: {dataDictionaryItemId: $(this).children('td').eq(8).children('select').val()},
                                unitDataItem: {dataDictionaryItemId: $(this).children('td').eq(4).children('select').val()},
                                // packageType: $(this).children('td').eq(3).children('select').val(),
                                // transport: $(this).children('td').eq(8).children('select').val(),
                                // util: $(this).children('td').eq(4).children('select').val(),
                                unitPriceTax: $(this).children('td').eq(6).children('input').val(),
                                contractAmount: $(this).children('td').eq(5).children('input').val(),
                                totalPrice: $(this).children('td').eq(7).children('input').val(),
                                remarks: $(this).children('td').eq(9).children('input').val(),
                                beginTime: $('#beginTime').val(),
                                endTime: $('#endTime').val(),
                            };
                            //console.log(quotationItemData);
                            //1添加报价单明细
                            $.ajax({
                                type: 'POST',
                                url: "addQuotationItem",
                                async: false,
                                data: JSON.stringify(quotationItemData),
                                dataType: "json",
                                contentType: "application/json;charset=utf-8",
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {
                                        // console.log(result);
                                    }
                                    else {
                                        alert(result.message);

                                    }
                                },
                                error: function (result) {
                                    alert("服务器异常！");
                                }
                            });

                            //     //添加图片地址
                            var formFile = new FormData();
                            var wastesCode = $(this).children('td').eq(1).children('div').find('button').attr('title');
                            var wastesName = $(this).children('td').eq(2).children('input').val();
                            formFile.append('wastesCode', wastesCode);
                            formFile.append('wastesName', wastesName);
                            formFile.append("contractId", $('#contractId').html());
                            console.log($(this).children('td').eq(10).children('input').prop('type'))
                            if ($(this).children('td').eq(10).children('input').prop('type') != 'text') {
                                var pictureFile = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                                formFile.append("pictureFile", pictureFile);
                            }
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "savePictureFiles",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: formFile,
                                dataType: "json",
                                processData: false,
                                contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }
                        });

                    }
                    else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });


            alert("添加成功！");
            if (addType == 'continue') {
               window.location.reload()
            }
            if (addType == 'break') {
                // $("#commentForm").attr('action','contractManage.html');
                history.go(-1);
            }
        }
    }


    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {

        if ($('#contractType1').val() == null) {
            $('#contractType1').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractType2').after($(span));
        }
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractType1').val().length > 0) {
            var contractType1;
            if ($('#contractType').val() == '应急处置合同') {
                contractType1 = 'Emergency';
            }
            if ($('#contractType').val() == '危废合同') {
                contractType1 = 'Wastes';
            }
            if ($('#contractType').val() == '物流合同') {
                contractType1 = 'Logistics';
            }

            var totalPrice = 0;
            $('.myclass').each(function () {
                var price = parseFloat($(this).children('td').eq(7).children('input').val());
                console.log('price:'+price)
               if(isNaN(price)){
                   price=0
               }
                totalPrice += price;


            })
            var smallContract=$("input[name='1']:checked").val();
            console.log("smallContract:"+smallContract)
            var small;
            if(smallContract=="false"){
                small=false;
            }
            if(smallContract=="true"){
                small=true;
            }
            var data = {
                small:small,
                client: {clientId: $('#companyName').selectpicker('val')},
                supplier: {supplierId: $('#suppier').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractType1').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                contractId:$('#contractId').val(),
                contractType: $('#contractType').val(),
                totalPrice:parseFloat(totalPrice).toFixed(2),
               freightBearer: $("input[name='freightBearer']:checked").val(),
                reviewer:$('#reviewer').val(),
                reviewDepartment:$('#reviewDepartment').val(),
                reviewDate:$('#reviewDate').val(),
                ticketRateItem:{dataDictionaryItemId:$('#taxRate1').val()}
            };


            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {

                        //添加合同地址
                        var formFile = new FormData();
                        formFile.append("contractId", $('#contractId').html());
                        if ($('#contractAppendices').prop('type') != 'text') {
                            var pictureFile = $('#contractAppendices').get(0).files[0];
                            console.log('合同附件:'+pictureFile)
                            formFile.append("contractAppendices", pictureFile);
                            if(pictureFile!=undefined){
                                //保存合同附件
                                $.ajax({
                                    type: "POST",                            // 方法类型
                                    url: "saveContractAppendices",                     // url
                                    cache: false,
                                    async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                    data: formFile,
                                    dataType: "json",
                                    processData: false,
                                    contentType: false,
                                    success: function (result) {
                                        if (result != undefined && result.status == "success") {

                                        }
                                        else {

                                        }
                                    },
                                    error: function (result) {
                                        console.log("error: " + result);
                                        alert("服务器异常!");
                                    }
                                });
                            }

                        }




                        // console.log(result);
                        $('.myclass').each(function () {
                            if ($(this).children('td').eq(2).children('input').val().length > 0) { //如果有报价才添加
                            //var formFile = new FormData();
                            var quotationItemData = {
                                contractId: $('#contractId').val(),
                                client: {clientId: $('#companyName').selectpicker('val')},
                                wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                                wastesName: $(this).children('td').eq(2).children('input').val(),
                                packageTypeItem: {dataDictionaryItemId: $(this).children('td').eq(3).find('select').val()},
                                transportItem: {dataDictionaryItemId: $(this).children('td').eq(8).children('select').val()},
                                unitDataItem: {dataDictionaryItemId: $(this).children('td').eq(4).children('select').val()},
                                // packageType: $(this).children('td').eq(3).children('select').val(),
                                // transport: $(this).children('td').eq(8).children('select').val(),
                                // util: $(this).children('td').eq(4).children('select').val(),
                                unitPriceTax: $(this).children('td').eq(6).children('input').val(),
                                contractAmount: $(this).children('td').eq(5).children('input').val(),
                                totalPrice: $(this).children('td').eq(7).children('input').val(),
                                remarks: $(this).children('td').eq(9).children('input').val(),
                                // pictureFile:$(this).children('td').eq(10).find("input[name='picture']").get(0).files[0]
                                beginTime: $('#beginTime').val(),
                                endTime: $('#endTime').val(),
                            };
                            console.log(quotationItemData);
                            //1添加报价单明细
                            $.ajax({
                                type: 'POST',
                                async: false,
                                url: "addQuotationItem",
                                data: JSON.stringify(quotationItemData),
                                dataType: "json",
                                contentType: "application/json;charset=utf-8",
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {
                                        // console.log(result);
                                    }
                                    else {
                                        alert(result.message);

                                    }
                                },
                                error: function (result) {
                                    alert("服务器异常！");
                                }
                            });


                            //     //添加图片地址
                            var formFile = new FormData();
                            var wastesCode = $(this).children('td').eq(1).children('div').find('button').attr('title');
                            var wastesName = $(this).children('td').eq(2).children('input').val();
                            formFile.append('wastesCode', wastesCode);
                            formFile.append('wastesName', wastesName);
                            formFile.append("contractId", $('#contractId').html());
                            if ($(this).children('td').eq(10).children('input').prop('type') != 'text') {
                                var pictureFile = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                                formFile.append("pictureFile", pictureFile);
                                console.log(formFile)
                            }
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "savePictureFiles",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: formFile,
                                dataType: "json",
                                processData: false,
                                contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }
                        });

                        // $('.myclass').each(function () {
                        //
                        // })

                    }
                    else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });

            alert("添加成功！")
            if (addType == 'continue') {
                window.location.reload()
            }
            if (addType == 'break') {
                // $("#commentForm").attr('action','contractManage.html');
                history.go(-1);
            }
        }
    }


}

//产废单位列表下拉框
function findClient() {
    $.ajax({
        type: "POST",                            // 方法类型
        async: false,
        url: "getContractList",                  // url
        dataType: "json",
        data: {"key": "危废"},
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getClientListById",                  // url
                    data: {'clientId': $("#companyName option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            var company = result.client;//取得被选中处置单位的信息
                            console.log(company);
                            if(company.ticketRateItem!=null){
                                $('#taxRate1').val(company.ticketRateItem.dataDictionaryItemId);
                            }
                            else {
                                $('#taxRate1').get(0).selectedIndex = 0;
                            }

                            $('#contactName').prop("value", company.contactName);
                            //赋值联系方式
                            if (company.mobile != "" && company.phone == "") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            if (company.mobile == "" && company.phone != "") {
                                $('#telephone').prop("value", company.phone);
                            }
                            if (company.mobile == "" && company.phone == "") {
                                $('#telephone').prop("value", "");
                            }
                            if (company.mobile != "" && company.phone != "") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            $('#bankName').prop("value", company.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value", company.bankAccount);
                            $('#company1').prop("value", company.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//提交危废合同
function contractWastesSubmit() {
    var s = ($('#contractInfoForm').serializeJSON());
    var addType = $("input[name='addType']:checked").val();
    //console.log(s);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "submitContract",                       // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify($('#contractInfoForm').serializeJSON()),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //(eval(result));
                console.log("success: " + result);
                alert("提交成功!");
                if (addType == "continue") $(location).attr('href', 'wastesContractInfo.html');
                else {
                   // localStorage.clear();
                    $(location).attr('href', 'contractManage.html');
                    localStorage.name1 = "Wastes";
                    location.href = "contractManage.html";
                }

                //$(location).attr('href', 'contractManage.html');//跳转
                //$(location).attr('href', 'contractManage.html');//跳转
            } else {
                console.log("fail: " + result);
                alert("保存失败!");
            }
        },
        error: function (result) {
            console.log("error: " + result);
            alert("服务器异常!");
        }
    });
}

//克隆行方法
function addNewLine() {
    // // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7),td:eq(8),td:eq(9),td:eq(10)").find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1 = (id.replace(/[^0-9]/ig, ""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num - 1);
        //console.log(newName);
        $(this).prop('name', newName);
    });
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").append(delBtn);
    $(clonedTr).children('td').eq(4).find("select").val(139);
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    // $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
    // //危废编码赋值
    // code="";
    // $.ajax({
    //     type:'POST',
    //     url:"getWastesInfoList",
    //     //data:JSON.stringify(data),
    //     dataType: "json",
    //     contentType: "application/json;charset=utf-8",
    //     success: function (result){
    //         if (result != undefined && result.status == "success"){
    //             var obj=eval(result);
    //             var wastesCode=$('#wastesCode');
    //             wastesCode.children().remove();
    //             $.each(obj.data,function (index,item) {
    //                 if(index==0){
    //                     code=item.code;
    //                     //根据危废编码获取危废名称==》页面加载
    //                     $.ajax({
    //                         type: "POST",                            // 方法类型
    //                         url: "getWastesNameByCode",                  // url
    //                         dataType: "json",
    //                         data:{"code":code},
    //                         //contentType: "application/json;charset=utf-8",
    //                         success:function (result) {
    //                             if (result != undefined && result.status == "success"){
    //                                 $("select[name='wastesCode']").parents('td').next().children('input').val(result.wastesName)
    //                             }
    //                             else {
    //                                 alert(result.message);
    //                             }
    //                         },
    //                         error:function (result) {
    //                             alert("服务器异常!")
    //                         }
    //                     })
    //                 }
    //                 var option=$('<option/>');
    //                 option.val(item.code);
    //                 option.text(item.code);
    //                 wastesCode.append(option);
    //             });
    //             wastesCode.removeAttr('id');
    //             $('.selectpicker').selectpicker('refresh');
    //         }
    //         else {
    //             alert(result.message);
    //         }
    //     },
    //     error:function (result) {
    //         console.log(result);
    //     }
    // });


}

//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
    var i = 0
    $('.myclass').each(function (index, item) {
        console.log(index)

        $(this).children('td').eq(0).html((parseInt(index) + 1).toString() + "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>");


        // $(this).children('td').eq(0).html((parseInt(index) + 1).toString());


    });
}

//应急合同新增页面加载
function loadEmSelectList() {
    loadNavigationList();   // 动态菜单加载
    CKEDITOR.editorConfig = function (config) {
        config.toolbarGroups = [
            {name: 'clipboard', groups: ['clipboard', 'undo']},
            {name: 'links', groups: ['links']},
            {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
            {name: 'insert', groups: ['insert']},
            {name: 'forms', groups: ['forms']},
            {name: 'tools', groups: ['tools']},
            {name: 'document', groups: ['mode', 'document', 'doctools']},
            {name: 'others', groups: ['others']},
            '/',
            {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
            {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
            {name: 'styles', groups: ['styles']},
            {name: 'colors', groups: ['colors']},
            {name: 'about', groups: ['about']}
        ];
        config.removeButtons = 'Underline,Subscript,Superscript';
        config.pasteFromWordRemoveFontStyles = false;
        config.pasteFromWordRemoveStyles = false;
        config.removePlugins = 'elementspath';
    };
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
    //取得下拉菜单的选项
    var contractType = $('#contractType');
    contractType.hide();
    var contractName1 = $('#contractName1');
    contractName1.hide();
    $.ajax({
        type: "POST",                            // 方法类型
        async: false,
        url: "getContractList",                  // url
        dataType: "json",
        data: {"key": "应急"},
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var data = eval(result);
                // 各下拉框数据填充
                var contractType1 = $("#contractType1");//模板名称下拉框
                contractType1.children().remove();
                $.each(data.modelNameList, function (index, item) {
                    if (item != null && item.modelName != "") {
                        //console.log(item);
                        var option = $('<option />');
                        option.val(item.modelName);
                        option.text(item.modelName);
                        contractType1.append(option);
                    }
                });
                contractType1.get(0).selectedIndex = -1;
                var province = $("#province");
                province.children().remove();
                $.each(data.provinceStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    province.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                //获取相应的市级
                $.ajax({
                    type: "POST",                            // 方法类型
                    url: "getCityList",                  // url
                    async: false,
                    dataType: "json",
                    data: {
                        'provinceId': 1
                    },
                    success: function (result) {
                        if (result != undefined) {
                            var data = eval(result);
                            //console.log(data);
                            //var contractName = $("#contractName");
                            //下拉框填充
                            var city = $("#city");
                            city.children().remove();
                            cityIndex = "";
                            $.each(data, function (index, item) {
                                //  console.log(item);
                                var option1 = $('<option />');
                                option1.val(item.cityname);
                                option1.text(item.cityname);
                                if (item.cityname == '${contract.city}') {
                                    cityIndex = index;
                                }
                                city.append(option1);
                            });
                            $('.selectpicker').selectpicker('refresh');


                        } else {
                            //console.log(result);
                        }
                    },
                    error: function (result) {
                        console.log(result);
                    }
                });
                var clientName = $('#companyName');
                clientName.children().remove();
                $.each(data.companyNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientName.append(option);
                });
                //clientName.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
                var options1 = $("#companyName option:selected").val(); //获取选中的项
                //console.log(options1);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getClientListById",                  // url
                    data: {'clientId': $("#companyName option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            // console.log(result);
                            var company = result.client;//取得被选中处置单位的信息
                            //console.log(company);
                            var taxRate1 = $('#taxRate1');
                            i = "";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if (company.ticketType != null) {
                                    if (company.ticketType.name == item.name) {
                                        i = index;
                                    }
                                }
                                else {
                                    i = -1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value", company.contactName);
                            //赋值联系方式
                            if (company.mobile != "" && company.phone == "") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            if (company.mobile == "" && company.phone != "") {
                                $('#telephone').prop("value", company.phone);
                            }
                            if (company.mobile == "" && company.phone == "") {
                                $('#telephone').prop("value", "");
                            }
                            if (company.mobile != "" && company.phone != "") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            $('#bankName').prop("value", company.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value", company.bankAccount);
                            $('#company1').prop("value", company.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //危废编码赋值
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(index + 1);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //包装类型
    $.ajax({
        type: 'POST',
        url: "getFormTypeAndPackageType",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(index + 1);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
}


/**
 * 保存应急合同
 */
function contractEmSave() {
    var addType = $("input[name='addType']:checked").val();
    if ($('#beginTime').val().length == 0 || $('#endTime').val().length == 0) {
        $('#endTime').parent().next('span').remove();
        var span = $('<span>');
        span.text("请输入日期！");
        span.css('color', 'red');
        $('#endTime').parent().after($(span));
    }
    console.log($('input[name="contractVersion"]:checked').val())
    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {
        if ($('#contractName').val().length == 0) {
            $('#contractName').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractName1').after($(span));
        }
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractName').val().length > 0) {
            var data = {
                client: {clientId: $('#companyName').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractName').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                ticketRate1: $('#taxRate1').val(),
                contractType: $('#contractType').val(),
            };
            // console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
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
            $('.myclass').each(function () {
                var quotationItemData = {
                    client: {clientId: $('#companyName').selectpicker('val')},
                    wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                    wastesName: $(this).children('td').eq(2).children('input').val(),
                    packageType: $(this).children('td').eq(3).children('select').val(),
                    transport: $(this).children('td').eq(8).children('select').val(),
                    util: $(this).children('td').eq(4).children('input').val(),
                    unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                    contractAmount: $(this).children('td').eq(6).children('input').val(),
                    totalPrice: $(this).children('td').eq(7).children('input').val(),
                };
                //console.log(quotationItemData);
                //1添加报价单明细
                $.ajax({
                    type: 'POST',
                    url: "addQuotationItem",
                    async: false,
                    data: JSON.stringify(quotationItemData),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //console.log(result);
                        }
                        else {
                            alert(result.message);

                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            });
            alert("添加成功！");
            if (addType == 'continue') {
                $(location).attr('href', 'urgentContractInfo.html');
            }
            if (addType == 'break') {
                console.log("来了")
             //   localStorage.clear();
                window.location.href = "contractManage.html";
                localStorage.name1 = "Emergency";

            }

        }
    }


    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {
        if ($('#contractType1').val() == null) {
            $('#contractType1').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractType2').after($(span));
        }
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractType1 ').val().length > 0) {
            var data = {
                client: {clientId: $('#companyName').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractType1').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                ticketRate1: $('#taxRate1').val(),
                contractType: $('#contractType').val(),
            };
            //console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        //console.log(result);
                    }
                    else {
                        console.log(result)
                        alert(result.message);
                    }
                },
                error: function (result) {
                    console.log(result)
                    alert("服务器异常！");
                }
            });
            $('.myclass').each(function () {
                var quotationItemData = {
                    client: {clientId: $('#companyName').selectpicker('val')},
                    wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                    wastesName: $(this).children('td').eq(2).children('input').val(),
                    packageType: $(this).children('td').eq(3).children('select').val(),
                    transport: $(this).children('td').eq(8).children('select').val(),
                    util: $(this).children('td').eq(4).children('input').val(),
                    unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                    contractAmount: $(this).children('td').eq(6).children('input').val(),
                    totalPrice: $(this).children('td').eq(7).children('input').val(),
                };
                //console.log(quotationItemData);
                //1添加报价单明细
                $.ajax({
                    type: 'POST',
                    url: "addQuotationItem",
                    async: false,
                    data: JSON.stringify(quotationItemData),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //console.log(result);
                        }
                        else {
                            alert(result.message);

                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            });
            alert("添加成功！");
            if (addType == 'continue') {
                $(location).attr('href', 'urgentContractInfo.html');
            }
            if (addType == 'break') {
                console.log("来了")
              //  localStorage.clear();
                window.location.href = "contractManage.html";
                localStorage.name1 = "Emergency";

            }
            // if(addType=='continue'){
            //     $(location).attr('href', 'urgentContractInfo.html');
            // }
            // if(addType=='break'){
            //     localStorage.clear();
            //     $(location).attr('href', 'contractManage.html');
            //     localStorage.name="Emergency";
            //     location.href="contractManage.html";
            //
            // }
        }
    }


}

//物流合同新增页面初始化
function loadLogicContractSelectList() {
    loadNavigationList();   // 动态菜单加载
    var contractType = $('#contractType');
    contractType.hide();//合同类型隐藏不需要显示
    var contractName1 = $('#contractName1');
    contractName1.hide();
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
//取得下拉菜单的选项
    $.ajax({
        type: "POST",                            // 方法类型
        async: false,
        url: "getContractList",                  // url
        dataType: "json",
        data: {"key": "物流"},
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //console.log(data);
                //1赋值
                // $('#contacts').prop("value",obj.contactName);//联系人
                // $('#telephone').prop("value",obj.phone);//联系电话
                // 各下拉框数据填充
                var contractType1 = $("#contractType1");
                contractType1.children().remove();
                $.each(data.modelNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.modelName);
                    option.text(item.modelName);
                    contractType1.append(option);
                });
                contractType1.get(0).selectedIndex = -1;
                // var province = $("#province");
                // province.children().remove();
                // $.each(data.provinceStrList, function (index, item) {
                //     var option = $('<option />');
                //     option.val(index);
                //     option.text(item.name);
                //     province.append(option);
                // });
                // province.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
                //获取相应的市级
                // $.ajax({
                //     type: "POST",                            // 方法类型
                //     url: "getCityList",                  // url
                //     dataType: "json",
                //     data:{
                //         'provinceId': 1
                //     },
                //     success: function (result) {
                //         if (result != undefined) {
                //             var data = eval(result);
                //             //console.log(data);
                //             //var contractName = $("#contractName");
                //             //下拉框填充
                //             var city=$("#city");
                //             city.children().remove();
                //             cityIndex="";
                //             $.each(data, function (index, item) {
                //                 //  console.log(item);
                //                 var option1 = $('<option />');
                //                 option1.val(item.cityname);
                //                 option1.text(item.cityname);
                //                 if(item.cityname=='${contract.city}'){
                //                     cityIndex=index;
                //                 }
                //                 city.append(option1);
                //             });
                //             $('.selectpicker').selectpicker('refresh');
                //
                //
                //         } else {
                //             console.log(result);
                //         }
                //     },
                //     error:function (result) {
                //         console.log(result);
                //     }
                // });
                var suppier = $('#suppier');
                suppier.children().remove();
                $.each(data.supplierNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    suppier.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                //2赋值
                //开票税率下拉框
                //开票税率1下拉框
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getSupplierListById",                  // url
                    data: {'supplierId': $("#suppier option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            // console.log(result);
                            var suppier = result.supplier;//取得被选中处置单位的信息
                            var taxRate1 = $('#taxRate1');
                            i = "";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if (suppier.ticketType != null) {
                                    if (suppier.ticketType.name == item.name) {
                                        i = index;
                                    }
                                }
                                else {
                                    i = -1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value", suppier.contactName);
                            //赋值联系方式
                            $("#telephone").prop("value", suppier.phone);//赋值联系电话
                            $("#contactName").prop("value", suppier.contactName);//赋值联系人
                            //console.log(suppier.companyName);
                            $("#suppierName").val(suppier.companyName);//赋值处置单位名称
                            $('#bankName').prop("value", suppier.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value", suppier.bankAccount);
                            $('#company1').prop("value", suppier.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
                // var suppier=data.supplierNameList[options1];//取得被选中处置单位的信息
                // var taxRate1=$('#taxRate1');
                // index1=""
                // taxRate1.children().remove();
                // $.each(data.ticketRateStrList1, function (index, item) {
                //     console.log(data.ticketRateStrList1);
                //     var option = $('<option />');
                //     if(suppier.ticketRate!=null){
                //         if(suppier.ticketRate.name==item.name){
                //             index1=index;
                //         }
                //     }
                //     else {
                //         index1=-1;
                //     }
                //     option.val(index);
                //     option.text(item.name);
                //     taxRate1.append(option);
                // });
                // taxRate1.get(0).selectedIndex = index1;
                // //开票税率2下拉框
                // // var taxRate2=$('#taxRate2');
                // // taxRate2.children().remove();
                // // $.each(data.ticketRateStrList2, function (index, item) {
                // //    // console.log(item);
                // //     var option = $('<option />');
                // //     option.val(index);
                // //     option.text(item.name);
                // //     taxRate2.append(option);
                // // });
                // // taxRate2.get(0).selectedIndex = -1;
                // $("#telephone").prop("value",suppier.phone);//赋值联系电话
                // $("#contactName").prop("value",suppier.contactName);//赋值联系人
                // //console.log(suppier.companyName);
                // $("#suppierName").val(suppier.companyName);//赋值处置单位名称
            } else {
                //console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //危废编码赋值
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(index + 1);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //包装类型
    $.ajax({
        type: 'POST',
        url: "getFormTypeAndPackageType",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(index + 1);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
}

//点击查询供应商信息
function findSuppier() {

    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        async: false,
        dataType: "json",
        data: {"key": "物流"},
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);

                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getSupplierListById",                  // url
                    data: {'supplierId': $("#suppier option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            var suppier = result.supplier;//取得被选中处置单位的信息

                            if(suppier.ticketRateItem!=null){
                                $('#taxRate1').val(suppier.ticketRateItem.dataDictionaryItemId);
                            }
                            else {
                                $('#taxRate1').get(0).selectedIndex = 0;
                            }

                            $('#contactName').prop("value", suppier.contactName);
                            //赋值联系方式
                            $("#telephone").prop("value", suppier.phone);//赋值联系电话
                            $("#contactName").prop("value", suppier.contactName);//赋值联系人
                            //console.log(suppier.companyName);
                            $("#suppierName").val(suppier.companyName);//赋值处置单位名称
                            $('#bankName').prop("value", suppier.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value", suppier.bankAccount);
                            $('#company1').prop("value", suppier.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//保存物流合同
function contractLogicSave() {
    var addType = $("input[name='addType']:checked").val();
    if ($('#beginTime').val().length == 0 || $('#endTime').val().length == 0) {
        $('#endTime').parent().next('span').remove();
        var span = $('<span>');
        span.text("请输入日期！");
        span.css('color', 'red');
        $('#endTime').parent().after($(span));
    }
    console.log(addType)

    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {
        if ($('#contractName').val().length == 0) {
            $('#contractName').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractName1').after($(span));
        }
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractName').val().length > 0) {
            var data = {
                supplier: {supplierId: $('#suppier').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractName').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                ticketRate1: $('#taxRate1').val(),
                contractType: $('#contractType').val(),
            };
            //console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        //console.log(result);
                    }
                    else {
                        console.log(result)
                        alert(result.message);
                    }
                },
                error: function (result) {
                    console.log(result)
                    alert("服务器异常！");
                }
            });
            $('.myclass').each(function () {
                var quotationItemData = {
                    supplier: {supplierId: $('#suppier').selectpicker('val')},
                    wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                    wastesName: $(this).children('td').eq(2).children('input').val(),
                    packageType: $(this).children('td').eq(3).children('select').val(),
                    transport: $(this).children('td').eq(8).children('select').val(),
                    util: $(this).children('td').eq(4).children('input').val(),
                    unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                    contractAmount: $(this).children('td').eq(6).children('input').val(),
                    totalPrice: $(this).children('td').eq(7).children('input').val(),
                };
                //console.log(quotationItemData);
                //1添加报价单明细
                $.ajax({
                    type: 'POST',
                    async: false,
                    url: "addQuotationItem",
                    data: JSON.stringify(quotationItemData),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //console.log(result);
                        }
                        else {
                            alert(result.message);

                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            });
            alert("添加成功！")
            if (addType == 'continue') {
                $(location).attr('href', 'logisticsContractInfo.html');
            }
            else {
                window.location.href = 'contractManage.html';
             //   localStorage.clear();
                localStorage.name1 = "Logistics";

            }
        }

    }


    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {
        if ($('#contractType1').val() == null) {
            $('#contractType1').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractType2').after($(span));
        }
        var addType = $("input[name='addType']:checked").val();
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractType1 ').val().length > 0) {
            var data = {
                supplier: {supplierId: $('#suppier').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractType1').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                ticketRate1: $('#taxRate1').val(),
                contractType: $('#contractType').val(),
            };
            //console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        //console.log(result);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });
            $('.myclass').each(function () {
                var quotationItemData = {
                    supplier: {supplierId: $('#suppier').selectpicker('val')},
                    wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                    wastesName: $(this).children('td').eq(2).children('input').val(),
                    packageType: $(this).children('td').eq(3).children('select').val(),
                    transport: $(this).children('td').eq(8).children('select').val(),
                    util: $(this).children('td').eq(4).children('input').val(),
                    unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                    contractAmount: $(this).children('td').eq(6).children('input').val(),
                    totalPrice: $(this).children('td').eq(7).children('input').val(),
                };
                //console.log(quotationItemData);
                //1添加报价单明细
                $.ajax({
                    type: 'POST',
                    async: false,
                    url: "addQuotationItem",
                    data: JSON.stringify(quotationItemData),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //console.log(result);
                        }
                        else {
                            alert(result.message);

                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            });
            alert("添加成功！");
            if (addType == 'continue') {
                $(location).attr('href', 'logisticsContractInfo.html');
            }
            if (addType == 'break') {
             //   localStorage.clear();
                window.location.href = 'contractManage.html';
                localStorage.name1 = "Logistics";

            }
        }
    }


}

function contractLogicSave() {
    var addType = $("input[name='addType']:checked").val();
    if ($('#beginTime').val().length == 0 || $('#endTime').val().length == 0) {
        $('#endTime').parent().next('span').remove();
        var span = $('<span>');
        span.text("请输入日期！");
        span.css('color', 'red');
        $('#endTime').parent().after($(span));
    }
    console.log(addType)

    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {
        if ($('#contractName').val().length == 0) {
            $('#contractName').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractName1').after($(span));
        }
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractName').val().length > 0) {
            var data = {
                supplier: {supplierId: $('#suppier').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractName').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                ticketRate1: $('#taxRate1').val(),
                contractType: $('#contractType').val(),
            };
            //console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        //console.log(result);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });
            $('.myclass').each(function () {
                var quotationItemData = {
                    supplier: {supplierId: $('#suppier').selectpicker('val')},
                    wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                    wastesName: $(this).children('td').eq(2).children('input').val(),
                    packageType: $(this).children('td').eq(3).children('select').val(),
                    transport: $(this).children('td').eq(8).children('select').val(),
                    util: $(this).children('td').eq(4).children('input').val(),
                    unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                    contractAmount: $(this).children('td').eq(6).children('input').val(),
                    totalPrice: $(this).children('td').eq(7).children('input').val(),
                };
                //console.log(quotationItemData);
                //1添加报价单明细
                $.ajax({
                    type: 'POST',
                    async: false,
                    url: "addQuotationItem",
                    data: JSON.stringify(quotationItemData),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //console.log(result);
                        }
                        else {
                            alert(result.message);

                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            });
            alert("添加成功！")
            if (addType == 'continue') {
                $(location).attr('href', 'logisticsContractInfo.html');
            }
            else {
                window.location.href = 'contractManage.html';
             //   localStorage.clear();
                localStorage.name1 = "Logistics";

            }
        }

    }


    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {
        if ($('#contractType1').val() == null) {
            $('#contractType1').parent().next('span').remove();
            var span = $('<span>');
            span.text("请输入合同名称！");
            span.css('color', 'red');
            $('#contractType2').after($(span));
        }
        var addType = $("input[name='addType']:checked").val();
        if ($('#beginTime').val().length > 0 && $('#endTime').val().length > 0 && $('#contractType1 ').val().length > 0) {
            var data = {
                supplier: {supplierId: $('#suppier').selectpicker('val')},
                contractVersion: $('input[name="contractVersion"]:checked').val(),
                beginTime: $('#beginTime').val(),
                endTime: $('#endTime').val(),
                contractName: $('#contractType1').val(),
                bankName: $('#bankName').val(),
                bankAccount: $('#bankAccount').val(),
                freight: $('#isFreight').prop('checked'),
                telephone: $('#telephone').val(),
                contactName: $('#contactName').val(),
                ticketRate1: $('#taxRate1').val(),
                contractType: $('#contractType').val(),
            };
            //console.log(data);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        //console.log(result);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });
            $('.myclass').each(function () {
                var quotationItemData = {
                    supplier: {supplierId: $('#suppier').selectpicker('val')},
                    wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                    wastesName: $(this).children('td').eq(2).children('input').val(),
                    packageType: $(this).children('td').eq(3).children('select').val(),
                    transport: $(this).children('td').eq(8).children('select').val(),
                    util: $(this).children('td').eq(4).children('input').val(),
                    unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                    contractAmount: $(this).children('td').eq(6).children('input').val(),
                    totalPrice: $(this).children('td').eq(7).children('input').val(),
                };
                //console.log(quotationItemData);
                //1添加报价单明细
                $.ajax({
                    type: 'POST',
                    async: false,
                    url: "addQuotationItem",
                    data: JSON.stringify(quotationItemData),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //console.log(result);
                        }
                        else {
                            alert(result.message);

                        }
                    },
                    error: function (result) {
                        alert("服务器异常！");
                    }
                });
            });
            alert("添加成功！");
            if (addType == 'continue') {
                $(location).attr('href', 'logisticsContractInfo.html');
            }
            if (addType == 'break') {
           //     localStorage.clear();
                window.location.href = 'contractManage.html';
                localStorage.name1 = "Logistics";

            }
        }
    }


}


/*************合同修改部分****************/

/**危废合同修改*/
/**
 * 装载危废合同修改下拉框列表
 */
function loadContractSelectList() {
    loadNavigationList();   // 动态菜单加载

    //危废编码赋值
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //包装类型
    $.ajax({
        type: 'POST',
        url: "getFormTypeAndPackageType",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    var contractType = $('#contractType');

    contractType.hide();//隐藏合同类别

    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //接收传过来的合同编号
    var contractId = localStorage['contractId'];

    //取得下拉菜单的选项
    $('#contractId').prop("value", contractId);

    $.ajax({
        type: "POST",                            // 方法类型
        async: false,
        url: "getContractId1",                  // url
        dataType: "json",
        data: {'contractId': contractId, "key": '危废'},//key是查询危废类别的模板
        success: function (result) {
            var data = eval(result);
            var contract = data.contract;
            console.log(contract);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "getContractBymodelName1",                  // url
                async: false,
                dataType: "json",
                data: {'modelName': contract.modelName},//如果是公司合同就会有合同模板名称作为合同名称
                success: function (result) {
                    var obj = eval(result);
                    if (obj != null) {
                        $('#content').val(obj.contractContent);//获得模板的内容
                    }

                },
                error: function (result) {
                    alert("服务器异常！")

                }
            });
            if (contract.beginTime != null) {
                $("#beginTime").prop("value", getTime(contract.beginTime));
            }
            else {
                $("#beginTime").prop("value", "");
            }
            //赋值截止时间
            if (contract.endTime != null) {
                $("#endTime").prop("value", getTime(contract.endTime));
            }
            else {
                $("#endTime").prop("value", "");
            }
            //赋值是否包含运费
            var freight = contract.freight;
            if (freight == "false" || freight == false) {
                $('#isFreight').removeAttr("checked");
                $('#isFreight').prop("checked", false);
                $('#isFreight').prop("value", false);
            }
            if (freight == true || freight == "true") {
                $('#isFreight').removeAttr("checked");
                $('#isFreight').prop("checked", true);
                $('#isFreight').prop("value", true);
            }
            //赋值合同版本
            var contractVersion = contract.contractVersion.name;
            if (contractVersion == '公司合同') {
                contractVersion = 'companyContract'
                //赋值合同名称
                $('#contractName').prop("value", contract.contractName);
            }
            if (contractVersion == '产废单位合同') {
                contractVersion = 'customerContract'
                $('#contractName').prop("value", contract.contractName);
            }
            $(":radio[name='contractVersion'][value='" + contractVersion + "']").prop("checked", "checked");
            if (contractVersion == "companyContract") {
                //执行方法
                $('#contractVersion').click();
            }
            if (contractVersion == "customerContract") {
                //执行方法
                $('#contractVersion2').click();
            }

            //赋值联系人
            $('#contactName').prop("value", contract.contactName);
            //赋值开户行名称
            $('#bankName').prop("value", contract.bankName);
            //赋值开户行账号
            $('#bankAccount').prop("value", contract.bankAccount);
            //联系电话
            $('#telephone').prop("value", contract.telephone);
            if (result != undefined) {
                // 各下拉框数据填充
                //省级填充
                // index1="";
                // var province = $("#province");
                // province.children().remove();
                // $.each(data.provinceStrList, function (index, item) {
                //     var option = $('<option />');
                //     option.val(index);
                //     option.text(item.name);
                //     if(data.province!=null){
                //         if(item.name==contract.province.name){
                //             index1=index;
                //         }
                //     }else {
                //         index1=-1;
                //     }
                //
                //     province.append(option);
                // });
                // province.get().selectedIndex=index1;
                // $('.selectpicker').selectpicker('refresh');
                // console.log(provinceId);//省市ID
                //获取相应的市级
                // provinceId=contract.province.index;
                // $.ajax({
                //     type: "POST",                            // 方法类型
                //     url: "getCityList",                  // url
                //     dataType: "json",
                //     data:{
                //         'provinceId': provinceId
                //     },
                //     success: function (result) {
                //         if (result != undefined) {
                //             var data = eval(result);
                //             //console.log(data);
                //             //var contractName = $("#contractName");
                //             //下拉框填充
                //             var city=$("#city");
                //             city.children().remove();
                //             cityIndex="";
                //             $.each(data, function (index, item) {
                //                 //  console.log(item);
                //                 var option1 = $('<option />');
                //                 option1.val(item.cityname);
                //                 option1.text(item.cityname);
                //                 if(data.city==item.cityname){
                //                     cityIndex=index;
                //                 }
                //                 city.append(option1);
                //             });
                //             $('.selectpicker').selectpicker('refresh');
                //             city.get(0).selectedIndex = cityIndex;
                //         } else {
                //             console.log(result);
                //         }
                //     },
                //     error:function (result) {
                //         console.log(result);
                //     }
                // });
                //产废单位名称下拉框
                //赋值产废单位名称
                //处置单位名称
                var clientName = $('#companyName');
                clientName.children().remove();
                index2 = "";
                $.each(data.companyNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    if (item.companyName == contract.client.companyName) {
                        index2 = index;
                    }
                    clientName.append(option);
                });
                clientName.get(0).selectedIndex = index2;
                $('.selectpicker').selectpicker('refresh');
                // $.ajax({
                //     type: "POST",                       // 方法类型
                //     url: "getClientListById",                  // url
                //     data:{'clientId':$("#companyName option:selected").val()},
                //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                //     dataType: "json",
                //     //contentType: "application/json; charset=utf-8",
                //     success:function (result) {
                //         if (result != undefined && result.status == "success") {
                //             // console.log(result);
                //             var company=result.client;//取得被选中处置单位的信息
                //             //console.log(company);
                //             var taxRate1=$('#taxRate1');
                //             i="";
                //             taxRate1.children().remove();
                //             $.each(data.ticketRateStrList1, function (index, item) {
                //                 // console.log(item);
                //                 var option = $('<option />');
                //                 option.val(index);
                //                 option.text(item.name);
                //                 if(company.ticketType!=null){
                //                     if(company.ticketType.name==item.name){
                //                         i=index;
                //                     }
                //                 }
                //                 else {
                //                     i=-1;
                //                 }
                //                 taxRate1.append(option);
                //             });
                //             taxRate1.get(0).selectedIndex = i;
                //             $('#contactName').prop("value",company.contactName);
                //             //赋值联系方式
                //             if(company.mobile!=""&&company.phone==""){
                //                 $('#telephone').prop("value",company.mobile);
                //             }
                //             if(company.mobile==""&&company.phone!=""){
                //                 $('#telephone').prop("value",company.phone);
                //             }
                //             if(company.mobile==""&&company.phone==""){
                //                 $('#telephone').prop("value","");
                //             }
                //             if(company.mobile!=""&&company.phone!="") {
                //                 $('#telephone').prop("value", company.mobile);
                //             }
                //             $('#bankName').prop("value",company.bankName);
                //             //赋值开户行账号
                //             $('#bankAccount').prop("value",company.bankAccount);
                //             $('#company1').prop("value",company.companyName);
                //         }
                //         else {
                //             alert(result.message);
                //         }
                //     },
                //     error:function (result) {
                //         alert("服务器异常！");
                //     }
                // });

                // if(contract.company1!=""){
                //     $('#company1').prop("value",contract.company1);
                // }
                // else {
                //     var options1=$("#companyName option:selected").val(); //获取选中的项
                //     //  console.log(options1);
                //     var company=data.companyNameList[options1];//取得被选中处置单位的信息
                //     $('#company1').prop("value",company.companyName);
                // }
                //赋值模板列表
                var contractType1 = $('#contractType1');
                contractType1.children().remove();
                index3 = "";
                $.each(data.modelNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.modelName);
                    option.text(item.modelName);
                    if (item.modelName == contract.modelName) {
                        index3 = index;
                    }
                    contractType1.append(option);
                });
                contractType1.get(0).selectedIndex = index3;
                //开票税率1下拉框
                var ticketRate1 = $('#taxRate1');
                ticketRate1.children().remove();
                index4 = "";
                $.each(data.ticketRateStrList1, function (index, item) {
                    //看具体的item 在指定val
                    //console.log(item);
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    if (contract.ticketRate1 != null) {
                        if (contract.ticketRate1.name == item.name) {
                            index4 = index;
                        }
                    }
                    else index4 = -1;
                    ticketRate1.append(option);
                });
                ticketRate1.get(0).selectedIndex = index4;
                //开票税率2下拉框
                $.each(contract.quotationItemList, function (index, item) {
                    $('.selectpicker').selectpicker({
                        language: 'zh_CN',
                        // style: 'btn-info',
                        size: 4
                    });//下拉框样式
                    var tr = $('#cloneTr1');
                    // tr.siblings().remove();
                    var cloneTr = tr.clone();
                    cloneTr.attr('class', 'myclass');
                    cloneTr.show();
                    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                    cloneTr.children('td').eq(0).html(parseInt(contract.quotationItemList.length) - index);
                    cloneTr.children("td:eq(0)").append(delBtn);
                    cloneTr.children('td').eq(2).children('input').val(item.wastesName);
                    cloneTr.children('td').eq(4).children('input').val(item.util);
                    cloneTr.children('td').eq(5).children('input').val(item.unitPriceTax);
                    cloneTr.children('td').eq(6).children('input').val(item.contractAmount);
                    cloneTr.children('td').eq(7).children('input').val(item.totalPrice);
                    if (item.packageType != null) {
                        cloneTr.children('td').eq(3).children('select').val(item.packageType.index);
                    }
                    if (item.transport != null) {
                        cloneTr.children('td').eq(8).children('select').val(item.transport.index);
                    }
                    cloneTr.children('td').eq(1).find('select').selectpicker('val', item.wastesCode);
                    cloneTr.removeAttr('id');
                    cloneTr.insertAfter(tr);
                    $('.selectpicker').data('selectpicker', null);
                    $('.bootstrap-select').find("button:first").remove();
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                    tr.hide();
                    tr.removeAttr('class');

                });


            }
            else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });


}


/**
 * 危废合同修改
 */
function contractAdjustSave() {
    var contractType1;
    if ($('#contractType').val() == '应急处置合同') {
        contractType1 = 'Emergency';
    }
    if ($('#contractType').val() == '危废合同') {
        contractType1 = 'Wastes';
    }
    if ($('#contractType').val() == '物流合同') {
        contractType1 = 'Logistics';
    }
    if ($('#contractType').val() == '次生合同') {
        contractType1 = 'Derive';
    }
    if ($('#contractType').val() == '采购合同') {
        contractType1 = 'Purchase';
    }
    if ($('#contractType').val() == '其他合同') {
        contractType1 = 'Other';
    }

    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {


        var totalPrice = 0;
        $('.myclass').each(function () {
            var price = parseFloat($(this).children('td').eq(7).children('input').val());
            totalPrice += price;


        })

        var smallContract=$("input[name='1']:checked").val();
        var small;
        if(smallContract=="false"){
            small=false;
        }
        if(smallContract=="true"){
            small=true;
        }
        var data = {
            small:small,
            contractId: $('#contractId1').html(),
            newId: $('#contractId').val(),
            client: {clientId: $('#companyName').selectpicker('val')},
            contractVersion: $('input[name="contractVersion"]:checked').val(),
            beginTime: $('#beginTime').val(),
            endTime: $('#endTime').val(),
            contractName: $('#contractName').val(),
            bankName: $('#bankName').val(),
            bankAccount: $('#bankAccount').val(),
            freight: $('#isFreight').prop('checked'),
            telephone: $('#telephone').val(),
            contactName: $('#contactName').val(),
            ticketRateItem:{dataDictionaryItemId:$('#taxRate1').val()},
            contractType: contractType1,
            totalPrice:parseFloat(totalPrice).toFixed(2),
            freightBearer: $("input[name='freightBearer']:checked").val(),
        };
        console.log(data);
        $.ajax({
            type: 'POST',
            url: "updateContract",
            async: false,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    //更新合同附件
                    var file = $('#contactFile').get(0).files[0];
                    if (file != undefined) {
                        var formFile = new FormData();
                        formFile.append("contractId", $('#contractId').val());
                        formFile.append("contractAppendices", file);
                        //保存合同附件
                        $.ajax({
                            type: "POST",                            // 方法类型
                            url: "saveContractAppendices",                     // url
                            cache: false,
                            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                            data: formFile,
                            dataType: "json",
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                if (result != undefined && result.status == "success") {

                                }
                                else {

                                }
                            },
                            error: function (result) {
                                console.log("error: " + result);
                                alert("服务器异常!");
                            }
                        });
                    }
                    console.log(result);
                    $('.myclass').each(function () {
                        var quotationItemData = {
                            contractId: $('#contractId').val(),
                            client: {clientId: $('#companyName').selectpicker('val')},
                            wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName: $(this).children('td').eq(2).children('input').val(),
                            packageTypeItem: {dataDictionaryItemId:$(this).children('td').eq(3).children('select').val()},
                            transportItem: {dataDictionaryItemId:$(this).children('td').eq(8).children('select').val()},
                            unitDataItem: {dataDictionaryItemId:$(this).children('td').eq(4).children('select').val()},
                            unitPriceTax: $(this).children('td').eq(6).children('input').val(),
                            contractAmount: $(this).children('td').eq(5).children('input').val(),
                            totalPrice: $(this).children('td').eq(7).children('input').val(),
                            remarks: $(this).children('td').eq(9).children('input').val(),
                            beginTime: $('#beginTime').val(),
                            endTime: $('#endTime').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type: 'POST',
                            url: "updateQuotationItem",
                            data: JSON.stringify(quotationItemData),
                            async: false,
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常");

                            }
                        });


                        var file = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                        if (file != undefined) {
                            //     //添加图片地址
                            var formFile = new FormData();
                            var wastesCode = $(this).children('td').eq(1).children('div').find('button').attr('title');
                            var wastesName = $(this).children('td').eq(2).children('input').val();
                            formFile.append('wastesCode', wastesCode);
                            formFile.append('wastesName', wastesName);
                            formFile.append("contractId", $('#contractId').val());
                            console.log($(this).children('td').eq(10).children('input').prop('type'))
                            if ($(this).children('td').eq(10).children('input').prop('type') != 'text') {
                                var pictureFile = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                                formFile.append("pictureFile", pictureFile);

                            }
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "savePictureFiles",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: formFile,
                                dataType: "json",
                                processData: false,
                                contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }
                        if (file == undefined) {
                            var wastesCode = $(this).children('td').eq(1).children('div').find('button').attr('title');
                            var wastesName = $(this).children('td').eq(2).children('input').val();
                            var contractId = $('#contractId').val();
                            var picture = $(this).children('td').eq(12).html();
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "updatePictureUrl",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: {
                                    "wastesCode": wastesCode,
                                    'wastesName': wastesName,
                                    'contractId': contractId,
                                    'picture': picture
                                },
                                dataType: "json",
                                // processData: false,
                                //contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }


                        // //     //添加图片地址
                        // var formFile = new FormData();
                        // var wastesCode=$(this).children('td').eq(1).children('div').find('button').attr('title');
                        // var wastesName= $(this).children('td').eq(2).children('input').val();
                        // formFile.append('wastesCode',wastesCode);
                        // formFile.append('wastesName',wastesName);
                        // formFile.append("contractId", $('#contractId').html());
                        // console.log($(this).children('td').eq(10).children('input').prop('type'))
                        // if ($(this).children('td').eq(10).children('input').prop('type') != 'text') {
                        //     var pictureFile = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                        //     formFile.append("pictureFile", pictureFile);
                        //
                        // }
                        // $.ajax({
                        //     type: "POST",                            // 方法类型
                        //     url: "savePictureFiles",                     // url
                        //     cache: false,
                        //     async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                        //     data: formFile,
                        //     dataType: "json",
                        //     processData: false,
                        //     contentType: false,
                        //     success: function (result) {
                        //         if (result != undefined && result.status == "success")
                        //         {
                        //
                        //         }
                        //         else {
                        //
                        //         }
                        //     },
                        //     error: function (result) {
                        //         console.log("error: " + result);
                        //         alert("服务器异常!");
                        //     }
                        // });
                    });
                    alert("修改成功!");
                    history.back(-1)
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常");

            }
        });
    }


    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {

        var totalPrice = 0;
        $('.myclass').each(function () {
            var price = parseFloat($(this).children('td').eq(7).children('input').val());
            if(isNaN(price)){
                price=0
            }
            totalPrice += price;


        })
        var smallContract=$("input[name='1']:checked").val();
        var small;
        if(smallContract=="false"){
            small=false;
        }
        if(smallContract=="true"){
            small=true;
        }
        var data = {
            small:small,
            contractId: $('#contractId1').html(),
            newId: $('#contractId').val(),
            client: {clientId: $('#companyName').selectpicker('val')},
            contractVersion: $('input[name="contractVersion"]:checked').val(),
            beginTime: $('#beginTime').val(),
            endTime: $('#endTime').val(),
            contractName: $('#contractType1').val(),
            bankName: $('#bankName').val(),
            bankAccount: $('#bankAccount').val(),
            freight: $('#isFreight').prop('checked'),
            telephone: $('#telephone').val(),
            contactName: $('#contactName').val(),
            ticketRateItem:{dataDictionaryItemId:$('#taxRate1').val()},
            contractType: contractType1,
            totalPrice:parseFloat(totalPrice),
            freightBearer: $("input[name='freightBearer']:checked").val(),
        };
        console.log(data);
        $.ajax({
            type: 'POST',
            url: "updateContract",
            data: JSON.stringify(data),
            async: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {

                    //更新合同附件
                    var file = $('#contactFile').get(0).files[0];
                    if (file != undefined) {
                        var formFile = new FormData();
                        formFile.append("contractId", $('#contractId').val());
                        formFile.append("contractAppendices", file);
                        //保存合同附件
                        $.ajax({
                            type: "POST",                            // 方法类型
                            url: "saveContractAppendices",                     // url
                            cache: false,
                            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                            data: formFile,
                            dataType: "json",
                            processData: false,
                            contentType: false,
                            success: function (result) {
                                if (result != undefined && result.status == "success") {

                                }
                                else {

                                }
                            },
                            error: function (result) {
                                console.log("error: " + result);
                                alert("服务器异常!");
                            }
                        });
                    }



                    $('.myclass').each(function () {
                        var quotationItemData = {
                            contractId: $('#contractId').val(),
                            client: {clientId: $('#companyName').selectpicker('val')},
                            wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName: $(this).children('td').eq(2).children('input').val(),
                            packageTypeItem: {dataDictionaryItemId:$(this).children('td').eq(3).children('select').val()},
                            transportItem: {dataDictionaryItemId:$(this).children('td').eq(8).children('select').val()},
                            unitDataItem: {dataDictionaryItemId:$(this).children('td').eq(4).children('select').val()},
                            unitPriceTax: $(this).children('td').eq(6).children('input').val(),
                            contractAmount: $(this).children('td').eq(5).children('input').val(),
                            totalPrice: $(this).children('td').eq(7).children('input').val(),
                            remarks: $(this).children('td').eq(9).children('input').val(),
                            beginTime: $('#beginTime').val(),
                            endTime: $('#endTime').val(),
                        };
                        console.log(quotationItemData);
                        // 1添加报价单明细
                        $.ajax({
                            type: 'POST',
                            url: "updateQuotationItem",
                            data: JSON.stringify(quotationItemData),
                            async: false,
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常");

                            }
                        });
                        var file = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                        if (file != undefined) {
                            //     //添加图片地址
                            var formFile = new FormData();
                            var wastesCode = $(this).children('td').eq(1).children('div').find('button').attr('title');
                            var wastesName = $(this).children('td').eq(2).children('input').val();
                            formFile.append('wastesCode', wastesCode);
                            formFile.append('wastesName', wastesName);
                            formFile.append("contractId", $('#contractId').val());
                            console.log($(this).children('td').eq(10).children('input').prop('type'))
                            if ($(this).children('td').eq(10).children('input').prop('type') != 'text') {
                                var pictureFile = $(this).children('td').eq(10).find("input[name='picture']").get(0).files[0];
                                formFile.append("pictureFile", pictureFile);

                            }
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "savePictureFiles",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: formFile,
                                dataType: "json",
                                processData: false,
                                contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }
                        if (file == undefined) {
                            var wastesCode = $(this).children('td').eq(1).children('div').find('button').attr('title');
                            var wastesName = $(this).children('td').eq(2).children('input').val();
                            var contractId = $('#contractId').val();
                            var picture = $(this).children('td').eq(12).html();
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "updatePictureUrl",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: {
                                    "wastesCode": wastesCode,
                                    'wastesName': wastesName,
                                    'contractId': contractId,
                                    'picture': picture
                                },
                                dataType: "json",
                                // processData: false,
                                //contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }

                    });
                    console.log(result)
                    alert("修改成功!");
                    history.back(-1)
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常");

            }
        });

    }
}

/**
 * 应急合同修改
 */
/**
 * 装载下拉框列表应急修改
 */
function loadContractSelectList() {

    //危废编码赋值
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //包装类型
    $.ajax({
        type: 'POST',
        url: "getFormTypeAndPackageType",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
    var contractType = $('#contractType');

    contractType.hide();//隐藏合同类别

    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //接收传过来的合同编号
    var contractId = localStorage['contractId'];

    //取得下拉菜单的选项
    $('#contractId').prop("value", contractId);


}

/**
 * 应急合同修改
 */
function contractAdjustEmSave() {
    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {
        var data = {
            contractId: $('#contractId').val(),
            client: {clientId: $('#companyName').selectpicker('val')},
            contractVersion: $('input[name="contractVersion"]:checked').val(),
            beginTime: $('#beginTime').val(),
            endTime: $('#endTime').val(),
            contractName: $('#contractName').val(),
            bankName: $('#bankName').val(),
            bankAccount: $('#bankAccount').val(),
            freight: $('#isFreight').prop('checked'),
            telephone: $('#telephone').val(),
            contactName: $('#contactName').val(),
            ticketRate1: $('#taxRate1').val(),
            contractType: $('#contractType').val(),
        };
        console.log(data);
        $.ajax({
            type: 'POST',
            url: "updateContract",
            async: false,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    $('.myclass').each(function () {
                        var quotationItemData = {
                            contractId: $('#contractId').val(),
                            client: {clientId: $('#companyName').selectpicker('val')},
                            wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName: $(this).children('td').eq(2).children('input').val(),
                            packageType: $(this).children('td').eq(3).children('select').get(0).selectedIndex,
                            transport: $(this).children('td').eq(8).children('select').get(0).selectedIndex,
                            util: $(this).children('td').eq(4).children('input').val(),
                            unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                            contractAmount: $(this).children('td').eq(6).children('input').val(),
                            totalPrice: $(this).children('td').eq(7).children('input').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type: 'POST',
                            async: false,
                            url: "updateQuotationItem",
                            data: JSON.stringify(quotationItemData),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常");

                            }
                        });
                    });
                    alert("修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    //location.href="contractManage.html";
                    localStorage.name1 = "Emergency";
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常");

            }
        });
    }
    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {
        var data = {
            contractId: $('#contractId').val(),
            client: {clientId: $('#companyName').selectpicker('val')},
            contractVersion: $('input[name="contractVersion"]:checked').val(),
            beginTime: $('#beginTime').val(),
            endTime: $('#endTime').val(),
            contractName: $('#contractType1').val(),
            bankName: $('#bankName').val(),
            bankAccount: $('#bankAccount').val(),
            freight: $('#isFreight').prop('checked'),
            telephone: $('#telephone').val(),
            contactName: $('#contactName').val(),
            ticketRate1: $('#taxRate1').val(),
            contractType: $('#contractType').val(),
        };
        console.log(data);
        $.ajax({
            type: 'POST',
            async: false,
            url: "updateContract",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    $('.myclass').each(function () {
                        var quotationItemData = {
                            contractId: $('#contractId').val(),
                            client: {clientId: $('#companyName').selectpicker('val')},
                            wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName: $(this).children('td').eq(2).children('input').val(),
                            packageType: $(this).children('td').eq(3).children('select').val(),
                            transport: $(this).children('td').eq(8).children('select').val(),
                            util: $(this).children('td').eq(4).children('input').val(),
                            unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                            contractAmount: $(this).children('td').eq(6).children('input').val(),
                            totalPrice: $(this).children('td').eq(7).children('input').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type: 'POST',
                            async: false,
                            url: "updateQuotationItem",
                            data: JSON.stringify(quotationItemData),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常");

                            }
                        });
                    });
                    console.log(result)
                    alert("修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    //location.href="contractManage.html";
                    localStorage.name1 = "Emergency";
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常");

            }
        });

    }
}

/**
 * 物流合同修改
 */

function loadLogContractSelectList() {
    loadNavigationList();   // 动态菜单加载

    //危废编码赋值
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //包装类型
    $.ajax({
        type: 'POST',
        url: "getFormTypeAndPackageType",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
    var contractType = $('#contractType');

    contractType.hide();//隐藏合同类别

    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //接收传过来的合同编号
    var contractId = localStorage['contractId'];

    //取得下拉菜单的选项
    $('#contractId').prop("value", contractId);

    $.ajax({
        type: "POST",                            // 方法类型
        async: false,
        url: "getContractId1",                  // url
        dataType: "json",
        data: {'contractId': contractId, "key": '应急'},//key是查询危废类别的模板
        success: function (result) {
            var data = eval(result);
            var contract = data.contract;
            console.log(contract);
            $.ajax({
                type: "POST",                            // 方法类型
                async: false,
                url: "getContractBymodelName1",                  // url
                dataType: "json",
                data: {'modelName': contract.modelName},//如果是公司合同就会有合同模板名称作为合同名称
                success: function (result) {
                    var obj = eval(result);
                    if (obj != null) {
                        $('#content').val(obj.contractContent);//获得模板的内容
                    }

                },
                error: function (result) {
                    alert("服务器异常！")

                }
            });
            if (contract.beginTime != null) {
                $("#beginTime").prop("value", getTime(contract.beginTime));
            }
            else {
                $("#beginTime").prop("value", "");
            }
            //赋值截止时间
            if (contract.endTime != null) {
                $("#endTime").prop("value", getTime(contract.endTime));
            }
            else {
                $("#endTime").prop("value", "");
            }
            //赋值是否包含运费
            var freight = contract.freight;
            if (freight == "false" || freight == false) {
                $('#isFreight').removeAttr("checked");
                $('#isFreight').prop("checked", false);
                $('#isFreight').prop("value", false);
            }
            if (freight == true || freight == "true") {
                $('#isFreight').removeAttr("checked");
                $('#isFreight').prop("checked", true);
                $('#isFreight').prop("value", true);
            }
            //赋值合同版本
            var contractVersion = contract.contractVersion.name;
            if (contractVersion == '公司合同') {
                contractVersion = 'companyContract'
                //赋值合同名称
                $('#contractName').prop("value", contract.contractName);
            }
            if (contractVersion == '产废单位合同') {
                contractVersion = 'customerContract'
                $('#contractName').prop("value", contract.contractName);
            }
            $(":radio[name='contractVersion'][value='" + contractVersion + "']").prop("checked", "checked");
            if (contractVersion == "companyContract") {
                //执行方法
                $('#contractVersion').click();
            }
            if (contractVersion == "customerContract") {
                //执行方法
                $('#contractVersion2').click();
            }

            //赋值联系人
            $('#contactName').prop("value", contract.contactName);
            //赋值开户行名称
            $('#bankName').prop("value", contract.bankName);
            //赋值开户行账号
            $('#bankAccount').prop("value", contract.bankAccount);
            //联系电话
            $('#telephone').prop("value", contract.telephone);
            if (result != undefined) {
                // 各下拉框数据填充
                //省级填充
                // index1="";
                // var province = $("#province");
                // province.children().remove();
                // $.each(data.provinceStrList, function (index, item) {
                //     var option = $('<option />');
                //     option.val(index);
                //     option.text(item.name);
                //     if(data.province!=null){
                //         if(item.name==contract.province.name){
                //             index1=index;
                //         }
                //     }else {
                //         index1=-1;
                //     }
                //
                //     province.append(option);
                // });
                // province.get().selectedIndex=index1;
                // $('.selectpicker').selectpicker('refresh');
                // console.log(provinceId);//省市ID
                //获取相应的市级
                // provinceId=contract.province.index;
                // $.ajax({
                //     type: "POST",                            // 方法类型
                //     url: "getCityList",                  // url
                //     dataType: "json",
                //     data:{
                //         'provinceId': provinceId
                //     },
                //     success: function (result) {
                //         if (result != undefined) {
                //             var data = eval(result);
                //             //console.log(data);
                //             //var contractName = $("#contractName");
                //             //下拉框填充
                //             var city=$("#city");
                //             city.children().remove();
                //             cityIndex="";
                //             $.each(data, function (index, item) {
                //                 //  console.log(item);
                //                 var option1 = $('<option />');
                //                 option1.val(item.cityname);
                //                 option1.text(item.cityname);
                //                 if(data.city==item.cityname){
                //                     cityIndex=index;
                //                 }
                //                 city.append(option1);
                //             });
                //             $('.selectpicker').selectpicker('refresh');
                //             city.get(0).selectedIndex = cityIndex;
                //         } else {
                //             console.log(result);
                //         }
                //     },
                //     error:function (result) {
                //         console.log(result);
                //     }
                // });
                //产废单位名称下拉框
                //赋值产废单位名称
                //处置单位名称
                var supplier = $('#suppier');
                supplier.children().remove();
                index2 = "";
                $.each(data.supplierNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    if (item.companyName == contract.supplier.companyName) {
                        index2 = index;
                    }
                    supplier.append(option);
                });
                supplier.get(0).selectedIndex = index2;
                $('.selectpicker').selectpicker('refresh');
                // $.ajax({
                //     type: "POST",                       // 方法类型
                //     url: "getClientListById",                  // url
                //     data:{'clientId':$("#companyName option:selected").val()},
                //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                //     dataType: "json",
                //     //contentType: "application/json; charset=utf-8",
                //     success:function (result) {
                //         if (result != undefined && result.status == "success") {
                //             // console.log(result);
                //             var company=result.client;//取得被选中处置单位的信息
                //             //console.log(company);
                //             var taxRate1=$('#taxRate1');
                //             i="";
                //             taxRate1.children().remove();
                //             $.each(data.ticketRateStrList1, function (index, item) {
                //                 // console.log(item);
                //                 var option = $('<option />');
                //                 option.val(index);
                //                 option.text(item.name);
                //                 if(company.ticketType!=null){
                //                     if(company.ticketType.name==item.name){
                //                         i=index;
                //                     }
                //                 }
                //                 else {
                //                     i=-1;
                //                 }
                //                 taxRate1.append(option);
                //             });
                //             taxRate1.get(0).selectedIndex = i;
                //             $('#contactName').prop("value",company.contactName);
                //             //赋值联系方式
                //             if(company.mobile!=""&&company.phone==""){
                //                 $('#telephone').prop("value",company.mobile);
                //             }
                //             if(company.mobile==""&&company.phone!=""){
                //                 $('#telephone').prop("value",company.phone);
                //             }
                //             if(company.mobile==""&&company.phone==""){
                //                 $('#telephone').prop("value","");
                //             }
                //             if(company.mobile!=""&&company.phone!="") {
                //                 $('#telephone').prop("value", company.mobile);
                //             }
                //             $('#bankName').prop("value",company.bankName);
                //             //赋值开户行账号
                //             $('#bankAccount').prop("value",company.bankAccount);
                //             $('#company1').prop("value",company.companyName);
                //         }
                //         else {
                //             alert(result.message);
                //         }
                //     },
                //     error:function (result) {
                //         alert("服务器异常！");
                //     }
                // });

                // if(contract.company1!=""){
                //     $('#company1').prop("value",contract.company1);
                // }
                // else {
                //     var options1=$("#companyName option:selected").val(); //获取选中的项
                //     //  console.log(options1);
                //     var company=data.companyNameList[options1];//取得被选中处置单位的信息
                //     $('#company1').prop("value",company.companyName);
                // }
                //赋值模板列表
                var contractType1 = $('#contractType1');
                contractType1.children().remove();
                index3 = "";
                $.each(data.modelNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.modelName);
                    option.text(item.modelName);
                    if (item.modelName == contract.modelName) {
                        index3 = index;
                    }
                    contractType1.append(option);
                });
                contractType1.get(0).selectedIndex = index3;
                //开票税率1下拉框
                var ticketRate1 = $('#taxRate1');
                ticketRate1.children().remove();
                index4 = "";
                $.each(data.ticketRateStrList1, function (index, item) {
                    //看具体的item 在指定val
                    //console.log(item);
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    if (contract.ticketRate1 != null) {
                        if (contract.ticketRate1.name == item.name) {
                            index4 = index;
                        }
                    }
                    else index4 = -1;
                    ticketRate1.append(option);
                });
                ticketRate1.get(0).selectedIndex = index4;
                //开票税率2下拉框
                $.each(contract.quotationItemList, function (index, item) {
                    $('.selectpicker').selectpicker({
                        language: 'zh_CN',
                        // style: 'btn-info',
                        size: 4
                    });//下拉框样式
                    var tr = $('#cloneTr1');
                    // tr.siblings().remove();
                    var cloneTr = tr.clone();
                    cloneTr.attr('class', 'myclass');
                    cloneTr.show();
                    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                    cloneTr.children('td').eq(0).html(parseInt(contract.quotationItemList.length) - index);
                    cloneTr.children("td:eq(0)").append(delBtn);
                    cloneTr.children('td').eq(2).children('input').val(item.wastesName);
                    cloneTr.children('td').eq(4).children('input').val(item.util);
                    cloneTr.children('td').eq(5).children('input').val(item.unitPriceTax);
                    cloneTr.children('td').eq(6).children('input').val(item.contractAmount);
                    cloneTr.children('td').eq(7).children('input').val(item.totalPrice);
                    if (item.packageType != null) {
                        cloneTr.children('td').eq(3).children('select').val(item.packageType.index);
                    }
                    if (item.transport != null) {
                        cloneTr.children('td').eq(8).children('select').val(item.transport.index);
                    }
                    cloneTr.children('td').eq(1).find('select').selectpicker('val', item.wastesCode);
                    cloneTr.removeAttr('id');
                    cloneTr.insertAfter(tr);
                    $('.selectpicker').data('selectpicker', null);
                    $('.bootstrap-select').find("button:first").remove();
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                    tr.hide();
                    tr.removeAttr('class');

                });


            }
            else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });


}

/**
 * 物流合同修改方法
 */
function contractLogAdjustSave() {
    if ($('input[name="contractVersion"]:checked').val() == 'customerContract') {
        var data = {
            contractId: $('#contractId').val(),
            supplier: {supplierId: $('#suppier').selectpicker('val')},
            contractVersion: $('input[name="contractVersion"]:checked').val(),
            beginTime: $('#beginTime').val(),
            endTime: $('#endTime').val(),
            contractName: $('#contractName').val(),
            bankName: $('#bankName').val(),
            bankAccount: $('#bankAccount').val(),
            freight: $('#isFreight').prop('checked'),
            telephone: $('#telephone').val(),
            contactName: $('#contactName').val(),
            ticketRate1: $('#taxRate1').val(),
            contractType: $('#contractType').val(),
        };
        console.log(data);
        $.ajax({
            type: 'POST',
            url: "updateContract",
            async: false,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    $('.myclass').each(function () {
                        var quotationItemData = {
                            contractId: $('#contractId').val(),
                            supplier: {supplierId: $('#suppier').selectpicker('val')},
                            wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName: $(this).children('td').eq(2).children('input').val(),
                            packageType: $(this).children('td').eq(3).children('select').get(0).selectedIndex,
                            transport: $(this).children('td').eq(8).children('select').get(0).selectedIndex,
                            util: $(this).children('td').eq(4).children('input').val(),
                            unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                            contractAmount: $(this).children('td').eq(6).children('input').val(),
                            totalPrice: $(this).children('td').eq(7).children('input').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type: 'POST',
                            async: false,
                            url: "updateQuotationItem",
                            data: JSON.stringify(quotationItemData),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常");

                            }
                        });
                    });
                    alert("修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    //location.href="contractManage.html";
                    localStorage.name1 = "Logistics";
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常");

            }
        });
    }
    if ($('input[name="contractVersion"]:checked').val() == 'companyContract') {
        var data = {
            contractId: $('#contractId').val(),
            supplier: {supplierId: $('#suppier').selectpicker('val')},
            contractVersion: $('input[name="contractVersion"]:checked').val(),
            beginTime: $('#beginTime').val(),
            endTime: $('#endTime').val(),
            contractName: $('#contractType1').val(),
            bankName: $('#bankName').val(),
            bankAccount: $('#bankAccount').val(),
            freight: $('#isFreight').prop('checked'),
            telephone: $('#telephone').val(),
            contactName: $('#contactName').val(),
            ticketRate1: $('#taxRate1').val(),
            contractType: $('#contractType').val(),
        };
        console.log(data);
        $.ajax({
            type: 'POST',
            async: false,
            url: "updateContract",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    $('.myclass').each(function () {
                        var quotationItemData = {
                            contractId: $('#contractId').val(),
                            supplier: {supplierId: $('#suppier').selectpicker('val')},
                            wastesCode: $(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName: $(this).children('td').eq(2).children('input').val(),
                            packageType: $(this).children('td').eq(3).children('select').val(),
                            transport: $(this).children('td').eq(8).children('select').val(),
                            util: $(this).children('td').eq(4).children('input').val(),
                            unitPriceTax: $(this).children('td').eq(5).children('input').val(),
                            contractAmount: $(this).children('td').eq(6).children('input').val(),
                            totalPrice: $(this).children('td').eq(7).children('input').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type: 'POST',
                            async: false,
                            url: "updateQuotationItem",
                            data: JSON.stringify(quotationItemData),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常");

                            }
                        });
                    });
                    console.log(result)
                    alert("修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    //location.href="contractManage.html";
                    localStorage.name1 = "Logistics";
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常");

            }
        });

    }
}

//修改合同 最新版
function adjust(item) {

 if($(item).parent().parent().children('td').eq(4).html()=='已签订'){
 alert('已签订的合同无法修改！')
 }
 else {


    var contractId = $(item).parent().parent().children('td').eq(1).html();

    localStorage.contractId = contractId;
    window.location.href = "wastesContractInfoChange.html";
 }
}

//合同修改页面初始化
function adjustNewContract() {
    $('.loader').show();
    loadNavigationList();   // 设置动态菜单
    //赋值合同编号
    var contractId = localStorage['contractId'];
    $('#contractId1').html(contractId);
    $('#contractId').val(contractId);
    $("#Yes").hide()
    $("#No").hide()

    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //危废编码赋值
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var obj = eval(result);
                var wastesCode = $('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //运输方式
    $.ajax({
        type: 'POST',
        url: "getTransportTypeByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",

        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var transportType = $('#transportType');
                transportType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    //包装类型
    $.ajax({
        type: 'POST',
        url: "getPackageTypeByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var packageType = $('#packageType');
                packageType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //单位
    $.ajax({
        type: 'POST',
        url: "getUnitByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var unit = $('#unit');
                unit.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unit.append(option);
                });
                unit.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //开票类型
    $.ajax({
        type: 'POST',
        url: "getTicketRate1ByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(result);
                var taxRate = $('#taxRate1');
                taxRate.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    taxRate.append(option);
                });
                taxRate.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });





    //赋值
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getByContractId",                  // url
        dataType: "json",
        data: {'contractId': contractId},
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {

                console.log(result)

                var data = eval(result);

                var contract = data.contract;
               var  radios =$("input [name='1']");
               console.log(radios)
                 if(contract.small=="false"||contract.small==false){
                     $(":radio[name='1'][value='false']").prop("checked", "checked");
                 }
                if(contract.small=="true"||contract.small==true){
                    $(":radio[name='1'][value='true']").prop("checked", "checked");
                }

                $('#contractType').val(contract.contractType.name);

                //赋值合同版本
                var contractVersion = contract.contractVersion.name;

                if (contractVersion == '公司合同') {
                    contractVersion = 'companyContract'
                    //赋值合同名称
                    $('#contractType1').prop("value", contract.contractName);
                }

                if (contractVersion == '产废单位合同') {
                    contractVersion = 'customerContract'
                    $('#contractName').prop("value", contract.contractName);
                }

                $(":radio[name='contractVersion'][value='" + contractVersion + "']").prop("checked", "checked");

                if (contractVersion == "companyContract") {
                    //执行方法
                    $('#contractVersion').click();
                }

                if (contractVersion == "customerContract") {
                    //执行方法
                    $('#contractVersion2').click();
                }


                if (contract.contractType.name == '物流合同') {
                    $('#client').hide();
                    $('#supplier').show();
                    $('#name').text("处置单位");

                    //显示
                    $('#freight').html('运费承担主体')
                    $('#freightCheckbox').show();

                    //赋值radio
                    if(contract.freightBearer==true){ //客户选中
                        $('#freightCheckbox').children('label').eq(1).find('input').attr("checked","checked");
                        $('#freightCheckbox').children('label').eq(0).find('input').removeAttr("checked");
                    }

                    if(contract.freightBearer==false){//经营单位承担选中
                        $('#freightCheckbox').children('label').eq(0).find('input').attr("checked","checked");
                        $('#freightCheckbox').children('label').eq(1).find('input').removeAttr("checked");
                    }
                    if (result != undefined) {

                        //产废单位名称下拉框
                        //处置单位名称
                        var supplier = $('#suppier');
                        supplier.children().remove();
                        index2 = "";
                        $.each(data.supplierNameList, function (index, item) {
                            var option = $('<option />');
                            option.val(item.supplierId);
                            option.text(item.companyName);
                            if (item.companyName == contract.supplier.companyName) {
                                index2 = index;
                            }
                            supplier.append(option);
                        });
                        supplier.get(0).selectedIndex = index2;
                        $('.selectpicker').selectpicker('refresh');

                       //开票税率1下拉框

                        if(contract.supplier.ticketRateItem!=null){
                            $('#taxRate1').val(contract.supplier.ticketRateItem.dataDictionaryItemId);
                        }
                        else {
                            $('#taxRate1').get(0).selectedIndex = 0;
                        }




                        //费用明细赋值
                        $.each(contract.quotationItemList, function (index, item) {
                            console.log(item)
                            $('.selectpicker').selectpicker({
                                language: 'zh_CN',
                                // style: 'btn-info',
                                size: 6
                            });//下拉框样式
                            var tr = $('#cloneTr1');
                            // tr.siblings().remove();
                            var cloneTr = tr.clone();
                            cloneTr.attr('class', 'myclass');
                            cloneTr.show();
                            var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                            cloneTr.children('td').eq(0).html(parseInt(contract.quotationItemList.length) - index);
                            console.log(index + 1)
                            //  if((parseInt(contract.quotationItemList.length)-index)!=1){
                            //
                            // }
                            cloneTr.children("td:eq(0)").append(delBtn);
                            // cloneTr.children('td').eq(1).find('select').selectpicker('val', item.wastesCode);
                            cloneTr.children('td').eq(2).children('input').val(item.wastesName);
                            // cloneTr.children('td').eq(4).children('input').val(item.util);
                            cloneTr.children('td').eq(5).children('input').val(item.contractAmount.toFixed(2));
                            cloneTr.children('td').eq(6).children('input').val(item.unitPriceTax.toFixed(2));
                            cloneTr.children('td').eq(7).children('input').val(item.totalPrice.toFixed(2));
                            if (item.packageTypeItem != null) {
                                cloneTr.children('td').eq(3).children('select').val(item.packageTypeItem.dataDictionaryItemId);
                            }
                            if (item.transportItem != null) {
                                cloneTr.children('td').eq(8).children('select').val(item.transportItem.dataDictionaryItemId);
                            }
                            if (item.unitDataItem != null) {
                                cloneTr.children('td').eq(4).children('select').val(item.unitDataItem.dataDictionaryItemId);
                            }
                            cloneTr.children('td').eq(9).children('input').val(item.remarks);

                            cloneTr.children('td').eq(11).find('button').click(function () {
                                if (item.picture != null && item.picture != "") {
                                    window.open('downloadFile?filePath=' + item.picture);
                                } else {
                                    alert("未上传文件");
                                }
                            })

                            cloneTr.children('td').eq(12).html(item.picture);

                            //危废编码赋值
                            //==>优化
                            var wastesCode = cloneTr.children('td').eq(1).find('select');
                            wastesCode.selectpicker('val', item.wastesCode);
                            // $('.selectpicker').selectpicker('refresh');


                            // $.ajax({
                            //     type: 'POST',
                            //     url: "getWastesInfoList",
                            //     async: false,
                            //     dataType: "json",
                            //     contentType: "application/json;charset=utf-8",
                            //     success: function (result) {
                            //         if (result != undefined && result.status == "success") {
                            //             // console.log(result);
                            //             var obj = eval(result);
                            //             var wastesCode = cloneTr.children('td').eq(1).find('select');
                            //             wastesCode.children().remove();
                            //             $.each(obj.data, function (index, item) {
                            //                 var option = $('<option/>');
                            //                 option.val(item.code);
                            //                 option.text(item.code);
                            //                 wastesCode.append(option);
                            //             });
                            //             wastesCode.selectpicker('val', item.wastesCode);
                            //             wastesCode.removeAttr('id');
                            //             $('.selectpicker').selectpicker('refresh');
                            //         }
                            //         else {
                            //             alert(result.message);
                            //         }
                            //     },
                            //     error: function (result) {
                            //         console.log(result);
                            //     }
                            // });

                            cloneTr.removeAttr('id');
                            cloneTr.insertAfter(tr);
                            $('.selectpicker').data('selectpicker', null);
                            $('.bootstrap-select').find("button:first").remove();
                            // $('.selectpicker').selectpicker();
                            $('.selectpicker').selectpicker({
                                language: 'zh_CN',
                                size: 6
                            });
                            $('.selectpicker').selectpicker('refresh');

                            tr.hide();
                            tr.removeAttr('class');

                        });


                    }


                }

                    //非物流合同
                else {
                    $('#client').show();
                    $('#supplier').hide();
                    $('#name').text("产废单位");

                    //隐藏
                    $('#freight').html('')
                    $('#freightCheckbox').hide();
                    if (result != undefined) {

                        //处置单位名称
                        var clientName = $('#companyName');
                        clientName.children().remove();
                        index2 = "";
                        $.each(data.companyNameList, function (index, item) {
                            var option = $('<option />');
                            option.val(item.clientId);
                            option.text(item.companyName);
                            if (item.companyName == contract.client.companyName) {
                                index2 = index;
                            }
                            clientName.append(option);
                        });
                        clientName.get(0).selectedIndex = index2;
                        $('.selectpicker').selectpicker('refresh');




                        //开票税率下拉框

                        if(contract.client.ticketRateItem!=null){
                            $('#taxRate1').val(contract.client.ticketRateItem.dataDictionaryItemId);
                        }
                        else {
                            $('#taxRate1').get(0).selectedIndex =0;
                        }
                        //费用明细赋值
                        $.each(contract.quotationItemList, function (index, item) {
                            $('.selectpicker').selectpicker({
                                language: 'zh_CN',
                                // style: 'btn-info',
                                size: 6
                            });//下拉框样式
                            var tr = $('#cloneTr1');
                            // tr.siblings().remove();
                            var cloneTr = tr.clone();
                            cloneTr.attr('class', 'myclass');
                            cloneTr.show();
                            var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                            cloneTr.children('td').eq(0).html(parseInt(contract.quotationItemList.length) - index);
                            //cloneTr.children("td:eq(0)").append(delBtn);
                            // if((parseInt(contract.quotationItemList.length)-index)!=1){
                            //     cloneTr.children("td:eq(0)").append(delBtn);
                            // }
                            cloneTr.children("td:eq(0)").append(delBtn);
                            cloneTr.children('td').eq(2).children('input').val(item.wastesName);
                            // cloneTr.children('td').eq(4).children('input').val(item.util);
                            cloneTr.children('td').eq(6).children('input').val(item.unitPriceTax.toFixed(2));
                            cloneTr.children('td').eq(5).children('input').val(item.contractAmount.toFixed(2));
                            cloneTr.children('td').eq(7).children('input').val(item.totalPrice.toFixed(2));
                            if (item.packageTypeItem != null) {
                                cloneTr.children('td').eq(3).children('select').val(item.packageTypeItem.dataDictionaryItemId);
                            }
                            if (item.transportItem != null) {
                                cloneTr.children('td').eq(8).children('select').val(item.transportItem.dataDictionaryItemId);
                            }
                            if (item.unitDataItem != null) {
                                cloneTr.children('td').eq(4).children('select').val(item.unitDataItem.dataDictionaryItemId);
                            }
                            cloneTr.children('td').eq(9).children('input').val(item.remarks);


                            //危废编码赋值
                            //==>优化
                            var wastesCode = cloneTr.children('td').eq(1).find('select');
                            wastesCode.selectpicker('val', item.wastesCode);
                            // $.ajax({
                            //     type: 'POST',
                            //     url: "getWastesInfoList",
                            //     async: false,
                            //     dataType: "json",
                            //     contentType: "application/json;charset=utf-8",
                            //     success: function (result) {
                            //         if (result != undefined && result.status == "success") {
                            //             // console.log(result);
                            //             var obj = eval(result);
                            //             var wastesCode = cloneTr.children('td').eq(1).find('select');
                            //             wastesCode.children().remove();
                            //             $.each(obj.data, function (index, item) {
                            //                 var option = $('<option/>');
                            //                 option.val(item.code);
                            //                 option.text(item.code);
                            //                 wastesCode.append(option);
                            //             });
                            //             cloneTr.children('td').eq(1).find('select').selectpicker('val', item.wastesCode);
                            //             wastesCode.removeAttr('id');
                            //             $('.selectpicker').selectpicker('refresh');
                            //         }
                            //         else {
                            //             alert(result.message);
                            //         }
                            //     },
                            //     error: function (result) {
                            //         console.log(result);
                            //     }
                            // });

                            //上传文件复制
                            cloneTr.children('td').eq(10).children('input').text(item.picture);

                            cloneTr.children('td').eq(11).find('button').click(function () {
                                if (item.picture != null && item.picture != "") {
                                    window.open('downloadFile?filePath=' + item.picture);
                                } else {
                                    alert("未上传文件");
                                }
                            })
                            cloneTr.children('td').eq(12).html(item.picture);
                            cloneTr.removeAttr('id');
                            cloneTr.insertAfter(tr);
                            $('.selectpicker').data('selectpicker', null);
                            $('.bootstrap-select').find("button:first").remove();
                            // $('.selectpicker').selectpicker();
                            $('.selectpicker').selectpicker({
                                language: 'zh_CN',
                                size: 6
                            });
                            $('.selectpicker').selectpicker('refresh');
                            tr.hide();
                            tr.removeAttr('class');

                        });
                    }
                }


                // $.ajax({
                //     type: "POST",                            // 方法类型
                //     url: "getContractBymodelName1",                  // url
                //     dataType: "json",
                //     data: {'modelName': contract.modelName},//如果是公司合同就会有合同模板名称作为合同名称
                //     success: function (result) {
                //         var obj = eval(result);
                //         if (obj != null) {
                //             $('#content').val(obj.contractContent);//获得模板的内容
                //         }
                //
                //     },
                //     error: function (result) {
                //         alert("服务器异常！")
                //
                //     }
                // });

                if (contract.beginTime != null) {
                    $("#beginTime").prop("value", getDateStr(contract.beginTime));
                }
                //赋值截止时间
                if (contract.endTime != null) {
                    $("#endTime").prop("value", getDateStr(contract.endTime));
                }

                //赋值联系人
                $('#contactName').prop("value", contract.contactName);
                //赋值开户行名称
                $('#bankName').prop("value", contract.bankName);
                //赋值开户行账号
                $('#bankAccount').prop("value", contract.bankAccount);
                //联系电话
                $('#telephone').prop("value", contract.telephone);

                //附件地址
                $('#contactFile').val(contract.contractAppendicesUrl);

                //送审人员/部门/日期
                $('#reviewer').val(contract.reviewer);

                $('#reviewDepartment').val((contract.reviewDepartment));

                $('#reviewDate').val(getDateStr(contract.reviewDate));

            }
            else {
                console.log(result);
            }

        },
        error: function (result) {
            console.log(result);
        }
    });

    $('.loader').hide();
}

function backContractManage(){

   //  localStorage.removeItem('name1')
   // console.log( $('#contractType').val())
   //  var contractType1;
   //  if ($('#contractType').val() == '应急处置合同') {
   //      contractType1 = 'Emergency';
   //  }
   //  if ($('#contractType').val() == '危废合同') {
   //      contractType1 = 'Wastes';
   //  }
   //  if ($('#contractType').val() == '物流合同') {
   //      contractType1 = 'Logistics';
   //  }
   //  localStorage.name1=contractType1;
   //  $(location).attr('href', 'contractManage.html');

    history.back(-1);//返回上一页
}

//作废
function cancel(item) {
    //查看合同编号
    var contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var name1 = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
    var r = confirm("是否作废该合同？");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "cancelContract",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"contractId": contractId},
            success: function (result) {
                var obj = eval(result);
                if (obj.state == "success") {
                    alert("作废成功！");
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }
                else {
                    alert("作废失败")
                }
            },
            error: function (result) {
                alert("服务器异常！")
            }
        });
    }
    else {
    }
}


//审批
// function approval(item) {
//     //出现模态框和查看一个效果
//     contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
//     name1 = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
//
//     $.ajax({
//         type: "POST",                       // 方法类型
//         url: "getContractId",                   // url
//         async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
//         dataType: "json",
//         data: {
//             'contractId': contractId
//         },
//         success: function (result) {
//             //console.log(result);
//             if (result != undefined) {
//                 console.log(result);
//                 var data = eval(result);
//                 //开始日期
//                 if (data.beginTime != null) {
//                     var begin = gettime(data.beginTime);
//                 }
//                 else {
//                     var begin = "";
//                 }
//                 //截止日期
//                 if (data.endTime != null) {
//                     var end = gettime(data.endTime);
//                 }
//                 else {
//                     var end = "";
//                 }
//                 //合同状态
//                 if (data.checkState != null) {
//                     $("#modal3_contractState").text(data.checkState.name);
//                 }
//                 else {
//                     $("#modal3_contractState").text("");
//                 }
//
//                 //合同版本
//                 $("#modal3_contractVersion").text(data.contractVersion.name);//合同版本
//                 // $("#modal3_companyName").text(data.companyName);
//                 if (data.contractVersion.name == "公司合同") {
//                     $("#modal3_contractName").text(data.contractName);//合同名称
//                 }
//                 if (data.contractVersion.name == "产废单位合同") {
//                     $("#modal3_contractName").text(data.contractName);//合同名称
//                 }
//                 //联系人
//                 $("#modal3_contactName").text(data.contactName);
//                 //合同编号
//                 $("#modal3_contractId").text(data.contractId);
//                 $("#modal3_beginTime").text(begin);
//                 $("#modal3_endTime").text(end);
//                 //  $("#modal3_area").text(data.province.name+""+data.city);
//                 //联系方式
//                 $("#modal3_telephone").text(data.telephone);
//                 //预计处置费
//                 $("#modal3_order").text(data.order1);
//
//                 if (data.contractType.name == '物流合同') {
//                     $('#name1').html("处置单位名称&nbsp;&nbsp;");
//                     //供用商姓名
//                     if (data.supplier != null) {
//                         $('#modal3_suppierName').text(data.supplier.companyName);
//                     }
//                     //运费承担主体 判断
//                     if(data.freightBearer==true){
//                         $('#modal3_freightBearer').text("客户承担");
//                     }
//                     if(data.freightBearer==false){
//                         $('#modal3_freightBearer').text("经营单位承担");
//                     }
//
//                 }
//                 if (data.contractType.name != '物流合同') {
//                     $('#name1').html("产废单位名称&nbsp;&nbsp;");
//                     if (data.client != null) {
//                         $("#modal3_suppierName").text(data.client.companyName);//公司名称
//                     }
//                     //运费承担主体 无
//                     $('#modal3_freightBearer').text("无");
//                 }
//
//                 //开票税率1
//                 if (data.client!= null) {
//                     if (data.client.ticketRateItem!= null)   {
//                         $('#modal3_ticketRate1').text(data.client.ticketRateItem.dictionaryItemName);
//                     }
//
//                 }
//                 else {
//
//                     $('#modal3_ticketRate1').text(" ");
//                 }
//
//                 //赋值 ==》审批/驳回内容
//                 $("#advice").val(data.opinion);
//                 $("#backContent").val(data.backContent);
//                 //开户行名称
//                 $('#modal3_bankName').text(data.bankName);
//                 //开户行账号
//                 $('#modal3_bankAccout').text(data.bankAccount);
//                 if (data.freight == true) {//需要运费
//                     $('#modal3_freight').removeAttr("checked");
//                     $('#modal3_freight').prop("checked", true);
//                 }
//                 if (data.freight == false) {//不需要运费
//                     $('#modal3_freight').removeAttr("checked");
//                 }
//
//                 //赋值报价单明细
//                 if (data.quotationItemList != null) {
//                     setContractListModal(data.quotationItemList);
//                 }
//
//
//                 $('#search').prop("readonly", false);
//             } else {
//                 $("#modal3_contactName").text("");
//                 $("#modal3_contractState").text("");
//                 $("#modal3_contractVersion").text("");
//                 $("#modal3_companyName").text("");
//                 $("#modal3_contactName").text("");
//                 $("#modal3_contractId").text("");
//                 $("#modal3_beginTime").text("");
//                 $("#modal3_endTime").text("");
//                 $("#modal3_area").text("");
//                 $("#modal3_telephone").text("");
//                 $("#modal3_order").text("");
//             }
//         },
//         error: function (result) {
//             console.log(result);
//         }
//     });
//     $('#close').show();
//     $('#back').show();//驳回显示
//     $('#btn').show()//审批显示
//     $('#back').text('驳回');//设置驳回字样
//     $('#print').hide();//打印隐藏
//     $('#contractInfoForm').modal('show');//出现第一个模态框
//
//
// }



//把按钮功能分出来做这个是审批
function confirm1(id) {
    opinion = $('#advice').val();
    //console.log(opinion);
    //1获取文本框的值
    $.ajax({
        type: "POST",
        url: "approvalContract",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'contractId': id, 'opinion': opinion,},
        success: function (result) {
            var obj = eval(result);
            if (obj.state == "success") {
                alert("审批成功!")
               window.location.reload()
            }
            else {
                alert("审批失败")
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

function back1(id) {
    backContent = $('#backContent').val();
    //设置状态驳回
    $.ajax({
        type: "POST",
        url: "backContract",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'contractId': id, 'backContent': backContent},
        success: function (result) {
            var obj = eval(result);
            if (obj.state == "success") {
                // alert("已驳回！");
                // window.location.reload()
            }
            else {
                alert("审批失败")
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

//导入报价单明细
function importQuExcelChoose() {
    $("#importExcelModal").modal('show');
}


/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/危废费用明细导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

//反转函数
function Reserve(S) {
    //return S.split("").reverse().join("");
    var tmp = "";
    for (i = 0; i < S.length; i++) {
        tmp = S.charAt(i) + tmp;
    }
    return tmp;
}

function ToFullUpper(n) {
    var S = Reserve(n);
    var R = "";
    for (i = 0; Len = S.length, i < Len; i++) {
        //如果是第9位的倍数,这么这个一定是亿位
        if (i % 8 == 0 && i != 0)
            R = this.UNUM[S.charAt(i)] + this.UNIT[5] + R
        //如果是第5位的倍数,这么这个一定是万位
        else if (i % 4 == 0 && i != 0)
            R = this.UNUM[S.charAt(i)] + this.UNIT[4] + R
        //其它位则对应 个十百千,请注意个位的特殊处理方式
        else
            R = this.UNUM[S.charAt(i)] + this.UNIT[(i + 1) % 4] + R
    }
    return R;
}

function TrimZero(R) {
    return R.replace(/零([十百千])/ig, "零")
        .replace(/亿零{4,4}万/ig, "亿")
        .replace(/([亿万])零{4,4}/ig, "$1")
        .replace(/零{2,3}/ig, "零")
        .replace(/([十百千])零{1,3}([万|亿])/ig, "$1$2")
        .replace(/(.*)零$/, "$1")
        .replace(/零亿/ig, "零")
        .replace(/^一十/, "十");
}

function ToUpper(s) {
    return TrimZero(ToFullUpper(s));
}


//签订合同
function signed(item) {
    var contractId=$(item).parent().parent().children('td').eq(1).html();

    if(confirm('确认签订合同?')){
             $.ajax({
                 type: "POST",
                 url: "signContract",
                 async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                 dataType: "json",
                 data: {'contractId': contractId},
                 success:function (result) {
                     if (result != undefined && result.status == "success"){
                         alert(result.message)
                         $("#pageNumber").val(currentPage);   // 设置当前页页数
                         inputSwitchPage();  // 跳转当前页
                     }
                     else {

                         alert(result.message);

                     }
                 },
                 error:function (result) {
                     alert("服务器异常!")
                 }
             })
    }


}

//打印
function print() {
    //打印模态框
    $("#footer").hide();
    $("#contractInfoForm").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: true
    });
}







