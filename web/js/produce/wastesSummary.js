/**
 * 重置搜索数据1
 */
function reset() {
    window.location.reload();

}

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

array=[];
array1=[];
array0=[];
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
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        var data1 = {};
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWastesSummaryCount",                  // url 计算数据库的总条数
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result.data > 0) {
                    totalRecord = result.data;
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
        totalRecord=array1.length;
    }
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setWasteInventoryList(result.data);
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
    console.log("当前页：" + pageNumber);
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
    if (!isSearch) {
        var data1 = {};
        data1.page = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWastesSummaryList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if(result != undefined && result.status == "success"){
                    setWasteInventoryList(result.data);
                    //setWasteInventoryList(result.data);
                }
                else {
                    console.log(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！")
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            var data1 = {};
            data1.page = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getWastesSummaryList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWasteInventoryList(result.data);
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
 *
 *加载危废数据
 */
function loadWasteInventoryList() {
    $('.loader').show();
    loadNavigationList();    // 设置动态菜单
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    // if(array0.length==0){
    //     for (var i = 1; i <= totalPage(); i++) {
    //         switchPage(parseInt(i));
    //
    //         array0.push($('.myclass'));
    //     }
    // }
    //查询危废仓库信息
    var data1 = {};
    data1.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesSummaryList", // url
        data: JSON.stringify(data1),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if(result != undefined && result.status == "success"){
                $('.loader').hide();
                console.log(result);
                //设置危废查询列表
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
                //setWasteInventoryList(result.data);
            }
            else {
                console.log(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    });
    isSearch = false;
}

// 设置危废查询列表
function setWasteInventoryList(result) {
    var tr=$('#cloneTr');
    tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result,function (index,item) {
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.find("td[name='inboundOrderId']").text(obj.inboundOrderId);
        clonedTr.find("td[name='outboundOrderId']").text(obj.outboundOrderId);
        if (obj.inboundDate != null) clonedTr.find("td[name='inboundDate']").text(getDateStr(obj.inboundDate));
        if (obj.outboundDate != null) clonedTr.find("td[name='outboundDate']").text(getDateStr(obj.outboundDate));
        clonedTr.find("td[name='wastesName']").text(obj.wastesName);
        clonedTr.find("td[name='wastesCode']").text(obj.wastesCode);
        if (obj.produceCompany != null) clonedTr.find("td[name='produceCompanyName']").text(obj.produceCompany.companyName);
        if (obj.unitDataItem != null) clonedTr.find("td[name='unitDataItem']").text(obj.unitDataItem.dictionaryItemName);
        clonedTr.find("td[name='beginningCount']").text(parseFloat(obj.beginningCount).toFixed(3));
        clonedTr.find("td[name='beginningPrice']").text(parseFloat(obj.beginningCount*obj.unitPriceTax).toFixed(2));
        clonedTr.find("td[name='inboundCount']").text(parseFloat(obj.inboundCount).toFixed(3));
        clonedTr.find("td[name='inboundPrice']").text(parseFloat(obj.inboundCount*obj.unitPriceTax).toFixed(2));
        clonedTr.find("td[name='outboundCount']").text(parseFloat(obj.outboundCount).toFixed(3));
        clonedTr.find("td[name='outboundPrice']").text(parseFloat(obj.outboundCount*obj.unitPriceTax).toFixed(2));
        clonedTr.find("td[name='storageCount']").text(parseFloat(obj.storageCount).toFixed(3));
        clonedTr.find("td[name='storagePrice']").text(parseFloat(obj.storageCount*obj.unitPriceTax).toFixed(2));
        clonedTr.find("td[name='id']").text(obj.id);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
    tr.removeAttr('class');
}

//危废库存查询功能
function searchWastesInventory() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);
    isSearch=true;
    var text=$.trim($('#searchContent').val());
    //1入库日期
    var  inboundOrderId =$.trim($('#search-inDate').val());
    var endDate=$.trim($('#search-endDate').val());
    //2产废单位
    var client=$.trim($('#search-client').val());
    //3进料方式
    var handelCategory=$.trim($('#search-type option:selected').text());

    var startDate=getDateByStr(inboundOrderId);

    var endDate=getDateByStr(endDate);

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

    var wareHouseName=$.trim($('#search-storageType').val());
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(startDate.toString()=='Invalid Date'){
                startDate = dateMin;
            }
            if(endDate.toString()=='Invalid Date'){
                endDate = dateMax;
            }
            var start=$(this).children('td').eq(2).text();
            if(start.length==0){
                start=dateMin;
            }
            //console.log(this);
            if(!($(this).children('td').eq(3).text().indexOf(client)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(5).text().indexOf(handelCategory)!=-1&&$(this).children('td').eq(4).text().indexOf(wareHouseName)!=-1
                && (new Date(start).getTime() >= new Date(startDate).getTime() && new Date(start).getTime() <= new Date(endDate).getTime())
            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(3).text().indexOf(client)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(5).text().indexOf(handelCategory)!=-1&&$(this).children('td').eq(4).text().indexOf(wareHouseName)!=-1
                && (new Date(start).getTime() >= new Date(startDate).getTime() && new Date(start).getTime() <= new Date(endDate).getTime())
            )){
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
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(1);
    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }






    // if(inboundOrderId.length<=0&&client.length<=0&&handelCategory.length<0){
    //     switchPage(1);
    //     $('.myclass').each(function () {
    //         $(this).show();
    //     })
    // }
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchWastesInventory();      //
    }
}
//危废库存粗查询

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchWastesInventory1();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchWastesInventory1();      //
            }
        },600);
    });
});

//粗查询
function searchWastesInventory1() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);

    isSearch=true;

    var text=$.trim($('#searchContent').val());

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
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(1);
    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        loadWasteInventoryList();
    }

}


