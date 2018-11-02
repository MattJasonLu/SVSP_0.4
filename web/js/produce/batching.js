/**加载库存的数据1
 * 
 */

var currentPage = 1;                          //当前页数
var data1;
var isSearch = false;
array=[];
array1=[]
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalBatchingRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
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
    } else {
        totalRecord=array1.length;
    }
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        //window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getBatchOrderList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setBatchingOrderList(result.batchingOrderList);
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
                url: "getBatchOrderList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                       setBatchingOrderList(result.batchingOrderList);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }  if (isSearch) {//查询用的
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

function  batchingList() {
    var page={};
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryListBat",                  // url 配料单新增页面获取仓储信息
        data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
         if(result != undefined && result.status == "success"){
             console.log(result);
             //设置库存列表
             setWasteInventoryList(result.data);
         }
         else {
             console.log(result.message);
         }
        },
        error:function (result) {
        alert("服务器异常！")
        }

    });
    //加载高级查询数据
    setSeniorSelectedList();

    //自动赋值
    $('#createDate').val(dateToString(new Date()))
   var data= getCurrentUserData();
    console.log(data)
    if(data!=null){
        $('#creator').val(data.username);
    }

}



function resetList() {
    isSearch=false;
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
    $("select[name='search-companyName']").selectpicker('val',' ');
    loadBatchingOrderList();
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setBatchingOrderList(result.batchingOrderList);
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
 * 配料单页面高级查询
 */
//查询功能
array=[];
array1=[];
function searchBatchOrder() {
   isSearch=false;
    array.length=0;//清空数组
    array1.length=0;
    $('.myclass').each(function () {
        $(this).show();
    });
    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    var text=$.trim($('#searchContent').val());
    //创建日期
    var createDate=$("#search-batchingDate").val();
    //处理类别
    var processWay=$('#search-processWay option:selected').text();
    //危废名称
    var wastesName=$.trim($("#search-wastesName").val());
    //产废单位
    var companyName=$.trim($('#search-client').val());
    console.log(processWay);
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(!($(this).children('td').eq(9).text().indexOf(createDate)!=-1&&$(this).children('td').eq(4).text().indexOf(processWay)!=-1
                &&$(this).children('td').eq(3).text().indexOf(wastesName)!=-1&&$(this).children('td').eq(7).text().indexOf(companyName)!=-1&&$(this).children('td').text().indexOf(text)!=-1
            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(9).text().indexOf(createDate)!=-1&&$(this).children('td').eq(4).text().indexOf(processWay)!=-1
                &&$(this).children('td').eq(3).text().indexOf(wastesName)!=-1&&$(this).children('td').eq(7).text().indexOf(companyName)!=-1&&$(this).children('td').text().indexOf(text)!=-1)){
                array1.push($(this));
            }
        });
    }

    // for(var i=0;i<array1.length;i++){
    //     $.each(array1[i],function () {
    //         $('#tbody1').append(this) ;
    //     });
    // }


    // if(createDate.length<=0&&wastesName.length<=0&&processWay.length<=0&&companyName.length<=0){
    //     switchPage(1);
    //     $('.myclass').each(function () {
    //         $(this).show();
    //     })
    // }
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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }
    

}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchBatchOrder();      //
    }
}

/**设置库存列表数据
 */
function setWasteInventoryList(result) {
    $(".myclass").hide();
    var tr = $("#cloneTr");
    tr.attr('class','myclass')
    // console.log(result);
    //tr.siblings().remove();
        $.each(result, function (index, item) {
            if(parseFloat(item.actualCount)>0&&item.boundType.name=='危废入库'){
                // 克隆tr，每次遍历都可以产生新的tr
                var clonedTr = tr.clone();
                clonedTr.show();
                // 循环遍历cloneTr的每一个td元素，并赋值
                clonedTr.children("td").each(function (inner_index) {
                    var obj = eval(item);
                    // 根据索引为部分td赋值
                    switch (inner_index) {
                        // 入库编号
                        case (1):
                            $(this).html(obj.inboundOrderId);
                            break;
                            //入库日期
                        case (2):
                            $(this).html(getDateStr(obj.inboundDate));
                            break;
                        // 仓库号
                        case (3):
                            if(obj.wareHouse!=null){
                                $(this).html(obj.wareHouse.wareHouseName);
                            }

                            break;
                        //产废单位
                        case (4):
                            if(obj.produceCompany!=null){
                                $(this).html(obj.produceCompany.companyName);
                            }
                            break;
                        // 危废名称
                        case (5):
                                $(this).html(obj.wastesName);
                            break;
                        // 危废代码
                        case (6):
                                $(this).html(obj.wastesCode);
                            break;
                        // 产废类别
                        case (7):
                            $(this).html(obj.wastesCode);
                            break;
                        // 进料方式
                        case (8):
                            if(obj.handleCategory!=null){
                                $(this).html(obj.handleCategory.name);
                            }
                            break;
                        case (9):
                            if(obj.processWay!=null){
                                $(this).html(obj.processWay.name);
                            }
                            break;
                        //数量
                        case (10):
                            $(this).html(obj.actualCount.toFixed(2));
                            break;
                        //剩余数量
                        case (11):
                            $(this).html(obj.leftNumeber.toFixed(2));
                            break;
                        case (12):
                            $(this).html(obj.remarks);
                            break;
                        case (13):
                            $(this).html(obj.inboundOrderItemId);
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
    tr.removeAttr('class');

    //遍历赋值
    $(".myclass").each(function(){
        //1获得入库单号
        var inboundOrderItemId=$(this).children('td').last().text();
        //console.log(inboundOrderId);
       $("#residualQuantity").attr("name",inboundOrderItemId);
        $("#residualQuantity").removeAttr('id');
    });


}

/*配料*/
function batching() {
    //1确认前删除行元素==>已下拉的
$('#cloneTr2').siblings().remove();


    var items = $("input[name='select']:checked");//判断复选框是否选中
    items.each(function () {
        //获得库存Id
      var inboundOrderItemId=  $(this).parent().parent().parent().children('td').last().text();
      console.log(inboundOrderItemId);
      //根据inboundOrderItemId获得库存的信息，进行转移放到配料中
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWasteInventoryByInboundOrderId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{'inboundOrderItemId':inboundOrderItemId},
            success:function (result) {
                if(result != undefined && result.status == "success"){
                   console.log(result);
                    //设置配料列表
                    setBatchingWList(result.data);
                }
                else {
                    console.log(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！")
            }

        });
    });
}

/**设置配料列表数据
 *
 */
function setBatchingWList(result) {
    var tr = $("#cloneTr2");
    tr.attr('class','myclass2');
    //tr.siblings().remove();
    console.log(result);
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj=eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 入库编号
                case (0):
                    $(this).html(obj.inboundOrderId);
                    break;
                // 仓库号
                case (1):
                    if(obj.wareHouse!=null){
                        $(this).html(obj.wareHouse.wareHouseName);
                    }

                    break;
                //产废单位
                case (2):
                    if(obj.produceCompany!=null){
                        $(this).html(obj.produceCompany.companyName);
                    }
                    break;
                // 危废名称
                case (3):
                        $(this).html(obj.wastesName);
                    break;
                // 危废代码
                case (4):
                        $(this).html(obj.wastesCode);
                    break;
                // 产废类别
                case (5):
                    $(this).html(obj.wastesCode);
                    break;
                // 进料方式
                case (6):
                    if(obj.handleCategory!=null){
                        $(this).html(obj.handleCategory.name);
                    }
                    break;
                //处置类别
                case (7):
                    if(obj.processWay!=null){
                        $(this).html(obj.processWay.name);
                    }
                    break;
                    //数量
                case (8):
                    break;
                case (9):
                    $(this).html(obj.actualCount.toFixed(2));
                    break;
                case (10):
                    $(this).html(obj.remarks);
                    break;
                case (11):
                    $(this).html(obj.inboundOrderItemId);
                    break;
                case (12):
                    if(obj.produceCompany!=null){
                        $(this).html(obj.produceCompany.clientId);
                    }
                    break;
                case (13):
                    if(obj.wareHouse!=null){
                        $(this).html(obj.wareHouse.wareHouseId);
                    }
                    break;
                case (14):
                        $(this).html(obj.transferDraftId);
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

//加载高级查询数据
function setSeniorSelectedList() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });//下拉框样式
    //查找枚举的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSeniorList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
               // console.log(result);
                var data = eval(result);
                // 高级检索下拉框数据填充
                //进料方式
                var handelCategory = $("#search-handelCategory");
                handelCategory.children().remove();
                $.each(data.handelCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    handelCategory.append(option);
                });
                handelCategory.get(0).selectedIndex = -1;
                //危废代码
                // var wastesInfoList = $("#search-wasteId");
                // // 清空遗留元素
                // wastesInfoList.children().remove();
                // $.each(data.data, function (index, item) {
                //     var option = $('<option />');
                //     option.val(item.code);
                //     option.text(item.code);
                //     wastesInfoList.append(option);
                // });
                // wastesInfoList.removeAttr('id');
                // $('.selectpicker').selectpicker('refresh');
                var companyList=$("#search-companyName");
                companyList.children().remove();
                $.each(data.array, function (index, item) {
                    var option = $('<option />');
                    option.val(item.companyName);
                    option.text(item.companyName);
                    companyList.append(option);
                });
                companyList.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
                $('.selectpicker').selectpicker('val',"");
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });



}

//高级查询功能
array=[];//存放所有的tr
array1=[];//存放目标的tr

//危废出库查询
function searchInventory() {
    array.length=0;//清空数组
    array1.length=0;//清空数组
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });//下拉框样式



    $('.myclass').each(function () {
        $(this).show();
        array.push($(this));
    });
    var text=$.trim($('#searchContentAdd').val());

    var beginTime=$.trim($('#search-inDate').val());

    var endTime=$.trim($('#search-endDate').val());

    var startDate=getDateByStr(beginTime);

    var endDate=getDateByStr(endTime);

    var hangdeCategory=$.trim($("#search-handelCategory option:selected").text());

    var companyName=$.trim($("select[name='search-companyName']").selectpicker('val'));

    var wastesCode=$.trim($("#search-wasteId").val());

    var arraydate=[];
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            arraydate.push(($(this).children('td').eq(2).text()))
        });
    }

    var dateMin=(arraydate[0]);
    var dateMax=(arraydate[0]);

    for(var i=0;i<arraydate.length;i++){
        if(new Date(arraydate[i]).getTime()<new Date(dateMin)||dateMin.length==0){
            dateMin=(arraydate[i]);
        }
        if(new Date(arraydate[i]).getTime()>new Date(dateMax)||dateMax.length==0){
            dateMax=(arraydate[i]);
        }

    }


    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(startDate.toString()=='Invalid Date'){
                startDate=dateMin;
            }
            if(endDate.toString()=='Invalid Date'){
                endDate=dateMax;
            }
            console.log($(this).children('td').eq(6).text().toString())
            var code=($(this).children('td').eq(6).text().toString()).substring($(this).children('td').eq(6).text().length-2,$(this).children('td').eq(6).text().length);
            if(!($(this).children('td').eq(8).text().indexOf(hangdeCategory)!=-1
                &&$(this).children('td').eq(4).text().indexOf(companyName)!=-1&&code.indexOf(wastesCode)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&(new Date($(this).children('td').eq(2).text()).getTime()>=new Date(startDate).getTime() &&new Date($(this).children('td').eq(2).text()).getTime()<=new Date(endDate).getTime())
            )){
                $(this).hide();
            }
            if($(this).children('td').eq(8).text().indexOf(hangdeCategory)!=-1
                &&$(this).children('td').eq(4).text().indexOf(companyName)!=-1&&code.indexOf(text)!=-1
                &&(new Date($(this).children('td').eq(2).text()).getTime()>=new Date(startDate).getTime() &&new Date($(this).children('td').eq(2).text()).getTime()<=new Date(endDate).getTime())){
                array1.push($(this));
            }
        });
    }

    for(var i=0;i<array1.length;i++){
        $.each(array1[i],function () {
            $('#tbody1').append(this) ;
        });
    }
    // if(inboundDate.length<=0&&companyName.length<=0&&hangdeCategory.length<=0&&wastesCode.length<=0){
    //     $('.myclass').each(function () {
    //         $(this).attr('style','display: table-row');
    //     })
    // }

}

/**
 * 新增页面的回车查询
 * @param item
 */
/**
 * 回车查询
 */
function enterSearch1() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchInventory();      //
    }
}


//数量加减
function adjustNumber(item) {
    var inboundOrderId=item.parentElement.firstElementChild.innerHTML;
    console.log(inboundOrderId);
    var td=$("td[name='123']");//找到指定的单元格
    var td1=$("td[name='321']");
    if(td.length!=0){
        td.each(function () {
            //获得指定的入库单号
            var content = $(this).html();//获得内容
            var name = $(this).attr('name');
            if (name.search("123") != -1) {
                $(this).attr('name', '321');
                $(this).html("<input type='text' style='width: 100px;' value="+content+" name='count'  id='input1' onkeyup='subtraction(this);'>");
            }
        });
    }
    if(td1.length!=0){
        $(td1).html($("#input1").val());
        $("#input1").remove();
        $(td1).attr('name', '123');
       $(td).html("<td class='text-right modal-packingType' onclick=' adjustNumber(this);'>");
    }


}

//数量加减
function subtraction(item) {
    //获得相应的入库单号
    var inboundOrderItemId = $(item).parent().parent().children('td').last().text();
    var number=$(item).val();
    //console.log(inboundOrderItemId);
    //1根据入库单号获得总量，然后根据配料量减去得到剩余量
    setTimeout(time(inboundOrderItemId,number), 2000);
  // console.log(array)
    //进行运算
}

function time(inboundOrderItemId,number) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryLeftNumber",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {'inboundOrderItemId':inboundOrderItemId,'number':number},
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                $("td[name="+inboundOrderItemId+"]").html(result.leftNumber);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

//保存
function save() {
    $(".myclass2").each(function () {
        var data={
            inboundOrder:{ inboundOrderId:$(this).children('td').eq(0).html()},
            wareHouse:{ wareHouseId:$(this).children('td').eq(13).html()},
            produceCompany:{clientId:$(this).children('td').eq(12).html()},
            wastesName:$(this).children('td').eq(3).html(),
            wasteCategory:$(this).children('td').eq(5).html(),
            handelCategory:getHandleCategoryFromStr($(this).children('td').eq(6).html()),
            batchingNumber:$(this).children('td').eq(8).children('input').val(),//配料的数量
            batchingDate:$("#date").val(),//配料日期
            createDate:$("#createDate").val(),//创建日期
            creator:$("#creator").val(),
            inboundOrderItemId:$(this).children('td').eq(11).html(),
            transferDraftId:$(this).children('td').eq(14).html(),
            processWay:getProcessWayFromStr($(this).children('td').eq(7).html()),
    };
        console.log(data);
        $.ajax({
                type: "POST",                       // 方法类型
                url: "addBatchingOrderBat",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
               contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                }
                else {
                    alert(result.message);

                }
            },

            error:function (result) {
                    alert("服务器异常")

            }
        });
    });
    alert("添加成功！");
    window.location.href="ingredientsList.html";
}

//配料单显示页面加载
function loadBatchingOrderList() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    //1执行ajax取数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getBatchOrderList",                  // url
        data: JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
               //setBatchingOrderList(result.batchingOrderList);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            }
            else
                alert(result.message);

        },
        error:function (result) {
            alert("服务器异常！");
        }


    });
    //2加载高级搜岁下拉框
    setSenierList();
    isSearch = false;
}

//2加载高级搜索下拉框
function setSenierList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWay",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
       // data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var processWay=$('#search-processWay');
                processWay.children().remove();
                $.each(result.processWayList,function (index,item) {
                     var option=$('<option/>');
                      option.val(index);
                      option.text(item.name);
                     processWay.append(option);
                });
                processWay.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message)
            }
        },
        error:function (result) {
          alert("服务器异常！")

        }
    });
}

//加载配料单数据源
function setBatchingOrderList(result) {
        var tr = $("#cloneTr3");
        // tr.attr('class','myclass')
        tr.siblings().remove();
        $.each(result, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            if(item.checkState.name=='待领料'){
                var clonedTr = tr.clone();
                clonedTr.attr('class','myclass');
                clonedTr.show();
                // 循环遍历cloneTr的每一个td元素，并赋值
                clonedTr.children("td").each(function (inner_index) {
                    var obj = eval(item);
                    // 根据索引为部分td赋值
                    switch (inner_index) {
                        // 配料单号
                        case (1):
                            $(this).html(obj.batchingOrderId);
                            break;
                        // 仓库
                        case (2):
                            if(obj.wareHouse!=null){
                                $(this).html(obj.wareHouse.wareHouseName);
                            }
                            break;
                        // 产废单位
                        case (3):
                            if(obj.produceCompany!=null){
                                $(this).html(obj.produceCompany.companyName);
                            }
                            break;
                        // 废物名称
                        case (4):
                                $(this).html(obj.wastesName);
                            break;
                        // 配量数量(吨)
                        case (5):
                            $(this).html(obj.batchingNumber.toFixed(2));
                            break;
                        // 配量日期
                        case (6):
                                $(this).html(getDateStr(obj.batchingDate));
                            break;
                        //创建日期
                        case (7):
                            $(this).html(getDateStr(obj.createDate));
                            break;
                        //联单号
                        case (8):
                                $(this).html((obj.transferDraftId));

                            break;
                            //进料方式
                        case (9):
                            if(obj.handelCategory!=null){
                                $(this).html((obj.handelCategory.name));
                            }
                            break;
                            //处置方式
                        case (10):
                            if(obj.processWay!=null){
                                $(this).html((obj.processWay.name));
                            }
                            break;

                        //状态
                        case (11):
                            if(obj.checkState!=null){
                                $(this).html(obj.checkState.name);
                            }

                            break;


                            //入库单明细
                        case (12):
                            $(this).html(obj.inboundOrderItemId);
                            break;
                        //产废单位编号
                        case (13):
                            if(obj.produceCompany!=null){
                                $(this).html(obj.produceCompany.clientId);
                            }
                            break;
                            //仓库编号
                        case (14):
                            $(this).html(obj.wareHouse.wareHouseId);
                            break;
                    }
                });
                // 把克隆好的tr追加到原来的tr前面
                clonedTr.removeAttr("id");
                clonedTr.insertBefore(tr);
            }
        });
        // 隐藏无数据的tr
      // tr.removeAttr('class');
        tr.hide();
}

var a=new Array();
var b=new Array();
//生成领料单
 function generateRequisition(){
     var items = $("input[name='select']:checked");//判断复选框是否选中

     if(items.length>0){
         items.each(function () {
             //获得配料单号
             var batchingOrderId=  $(this).parent().parent().parent().children('td').eq(1).html();
            a.push(batchingOrderId);
             //仓库编号
            var wareHouseId= $(this).parent().parent().parent().children('td').eq(13).html();

            //产废单位编号
             var clientId=$(this).parent().parent().parent().children('td').eq(11).html();

             //类别
             var wasteCategory=$(this).parent().parent().parent().children('td').eq(5).html();

             //配料数量(吨)
             var recipientsNumber=$(this).parent().parent().parent().children('td').eq(6).html();

             //联单号
            var transferDraftId=$(this).parent().parent().parent().children('td').eq(14).html();

             //危废名称
             var wastesName=$(this).parent().parent().parent().children('td').eq(4).html();


             //数量
             var batchingNumber=$(this).parent().parent().parent().children('td').eq(6).html();

             //入库单明细编号
             var inboundOrderItemId=$(this).parent().parent().parent().children('td').eq(12).html();
             var data={
                 materialRequisitionId: batchingOrderId,
                 wastesName:wastesName,
                 transferDraftId:transferDraftId,
                 wareHouse:{wareHouseId:wareHouseId},
                 client:{clientId:clientId},
                 wasteCategory:wasteCategory,
                 recipientsNumber:recipientsNumber,
                 inboundOrderItemId:inboundOrderItemId
          };
           // console.log(data)
                 //点击确定后操作
            //add(data);
         });
         if(confirm("是否跳转到领料单页面?")){
             window.location.href="materialRequisition1.html";
             localStorage.setItem("temp",a); //会返回1,2,3

         }
     }
    else {
         alert("请勾选数据！")
     }
 }

 //生成领料单
function add(data) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addRequisition",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if(result != undefined && result.status == "success"){
                console.log(result);
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

//领料单新增页面预加载
function loadMaterialRequisitionList(){
    var b=(localStorage.getItem("temp"));//1,2,3
    console.log("b:"+b);
  if(b!=null){
      var page={};
      $('#cloneTr1').siblings().remove();
      $.ajax({
          type: "POST",                       // 方法类型
          url: "getMaterialRequisitionList",                  // url
          data:{"b":b},
          async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
          dataType: "json",
          //contentType: "application/json; charset=utf-8",
          success:function (result) {
              if (result != undefined && result.status == "success"){
                  console.log(result);
                  //设置领料单新增列表
                  if(result.jsonArray!=null){
                      setMaterialRequisitionList(result.jsonArray);
                  }

              }
              else {

                  alert(result.message);
              }
          },
          error:function (result) {
              alert("服务器异常！")
          }
      });
      localStorage.removeItem("temp")//删除指定key本地存储的值
  }

}

//设置领料单新增列表
function setMaterialRequisitionList(result) {
    var tr = $("#cloneTr1");
    tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr

                var clonedTr = tr.clone();
                clonedTr.show();
                // 循环遍历cloneTr的每一个td元素，并赋值
                clonedTr.children("td").each(function (inner_index) {
                    var obj = eval(item);
                    // 根据索引为部分td赋值
                    switch (inner_index) {
                        // 配料单号
                        case (0):
                            $(this).html(obj.batchingOrderId);
                            break;
                        // 厂家
                        case (1):
                            if(obj.produceCompany!=null){
                                $(this).html(obj.produceCompany.companyName);
                            }

                            break;
                        // 危废名称
                        case (2):
                                $(this).html(obj.wastesName);
                            break;
                        // 危废类别
                        case (3):
                                $(this).html(obj.wasteCategory);
                            break;
                        // 仓库
                        case (4):
                            if(obj.wareHouse!=null){
                                $(this).html(obj.wareHouse.wareHouseName);
                            }
                            break;
                        // 配料数量
                        case (5):
                            $(this).html(obj.batchingNumber.toFixed(2));
                            break;
                        //领用数量
                        case (6):
                            $(this).html(obj.batchingNumber.toFixed(2));
                            break;
                       //进料方式
                        case (7):
                            if(obj.handelCategory!=null){
                                $(this).html(obj.handelCategory.name);
                            }
                            break;
                            //处置方式
                        case (8):
                            if(obj.processWay!=null){
                                $(this).html(obj.processWay.name);
                            }
                            break;
                            //入库单明细
                        case (9):
                            $(this).html(obj.inboundOrderItemId);
                            break;
                            //单位编号
                        case (10):
                            if(obj.produceCompany!=null){
                                $(this).html(obj.produceCompany.clientId);
                            }
                            break;
                            //仓库编号
                        case (11):
                            if(obj.wareHouse!=null){
                                $(this).html(obj.wareHouse.wareHouseId);
                            }
                            break;
                            //转移联单
                        case (12):
                                $(this).html(obj.transferDraftId);
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

//判断是否存在领料单号
function isMaterialRequisitionOrderId() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "isMaterialRequisitionOrderId",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
       success:function (result) {
           if (result != undefined && result.status == "success"){
               //console.log(result.theNewestmaterialRequisitionOrderId);
               theNewestmaterialRequisitionOrderId=result.theNewestmaterialRequisitionOrderId;
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

//生成领料单号(当数据库没有领料单的时候)
function generateRequisitionNumber(index) {
   var date=new Date();
   var year=(date.getFullYear()).toString();
   var mouth=((date.getMonth()+1)).toString();
   while (index.toString().length!=3) {
       index="0"+index;
   }

   if(mouth.length!=2){
       mouth="0"+mouth;
   }
  return year+mouth+index;

}

//生成领料单号(当数据库存在领料单的时候)
function generateRequisitionNumber1(theNewestmaterialRequisitionOrderId) {
    var s= theNewestmaterialRequisitionOrderId;//原字符串
    var s2 = s.substring(s.length - 3, s.length);//最后一个3字符
    var s1=s.substring(0, s.length - 3);
    var number = getString3((parseInt(s2) + 1));
    return s1+number;
}

function getString3(number) {
    while (number.length!=3){
        number="0"+number;
    }
    return number;
}

//保存领料单 实则是更新++>现在就是添加
function updateMaterialRequisitionOrder() {
    if(confirm("确认领料?")){
//1遍历
        $('.myclass').each(function (index) {
            var materialRequisitionId= $(this).children('td').eq(0).html();//领料单号

            //部门
            var departmentName=$("#departmentName").val();
            //主管副总经理
            var deputyGeneral=$("#deputyGeneral").val();
            //仓库部门主管
            var warehouseManager=$("#warehouseManager").val();
            //保管员
            var guardian=$("#guardian").val();
            //	领料部门主管
            var materialManager=$("#materialManager").val();
            //领料人
            var picker=$("#picker").val();
            //领料日期
            var pickerDate=$("#pickerDate").val();

           var data={
                departmentName:departmentName,
                deputyGeneral:deputyGeneral,
                warehouseManager:warehouseManager,
                guardian:guardian,
                materialManager:materialManager,
                picker:picker,
               pickerDate:pickerDate,
               materialRequisitionId:$(this).children("td").eq(0).html(),
               wastesName:$(this).children("td").eq(2).html(),
               wasteCategory:$(this).children("td").eq(3).html(),
               recipientsNumber:$(this).children("td").eq(6).html(),
               handelCategory:getHandleCategoryFromStr($(this).children("td").eq(7).html()),
               processWay:getProcessWayFromStr($(this).children("td").eq(8).html()),
               inboundOrderItemId:$(this).children("td").eq(9).html(),
               client:{clientId:$(this).children("td").eq(10).html()},
               wareHouse:{wareHouseId:$(this).children("td").eq(11).html()},
               transferDraftId:$(this).children("td").eq(12).html(),
            };
           add(data);
        });
        alert("领料单分配完毕!")
        if(confirm("是否跳转到领料单列表页面?")){
            //点击确定后操作
            window.location.href="materialRequisition.html"
        }
    }

}

//更新领料单的特有数据
function update(data) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateMaterialRequisitionOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
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

//配料单页面粗查询

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchBatchingList();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchBatchingList();      //
            }
        },600);
    });
});

//粗查询
function searchBatchingList() {

    isSearch=false;

    //loadBatchingOrderList();

    //1分页模糊查询
    array.length=0;//清空数组

    array1.length=0;

    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }

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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        loadBatchingOrderList();
    }

}

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContentAdd').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchBatchinAdd();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchBatchinAdd();      //
            }
        },600);
    });
});

//配料单新增页面粗查询
function searchBatchinAdd() {
    $('.myclass').each(function () {
        $(this).show();
    })
    //1分页模糊查询
    array.length=0;//清空数组
    array1.length=0;
    array.push($('.myclass'));
    var text=$.trim($('#searchContentAdd').val());
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
        $('.myclass').each(function () {
            $(this).show();
        })
    }
}

//导出
function exportExcel() {
    console.log("export");
    var name = 't_pl_batchingorder';
    var idArry = [];//存放主键

    var items = $("input[name='select']:checked");//判断复选框是否选中

    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select batchingOrderId 配料单号,batchingDate 配料日期,createDate 创建日期,remarks 备注,wareHouseId 仓库编号,produceCompany 产废单位编号,acceptCompany 接收单位编号,batchingNumber 配料数量,handelCategory 进料方式, packageType 包装方式,unitPrice 单价, inboundOrderId 入库单号,creator 创建人,wastesCode 危废编码,wasteCategory 危废类别,processWay 处置方式, formType 物质形态  from t_pl_batchingorder;";
        window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
    }
    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().next().html());        // 将选中项的编号存到集合中
            }
        });
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += idArry[i] + ",";
                else if (i == idArry.length - 1) sql += idArry[i] + ");"
            }
            var sqlWords = "select batchingOrderId 配料单号,batchingDate 配料日期,createDate 创建日期,remarks 备注,wareHouseId 仓库编号,produceCompany 产废单位编号,acceptCompany 接收单位编号,batchingNumber 配料数量,handelCategory 进料方式, packageType 包装方式,unitPrice 单价, inboundOrderId 入库单号,creator 创建人,wastesCode 危废编码,wasteCategory 危废类别,processWay 处置方式, formType 物质形态 from t_pl_batchingorder  where  batchingOrderId" + sql;

        }
        window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
    }


}

//导入
function importExcelChoose(){
    $("#importExcelModal").modal('show');

}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = '/var/local/apache-tomcat-7.0.86/bin/Files/Templates/burnOrderMode.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importBatchExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result != undefined && result.status == "success") {
                        alert(result.message);
                        window.location.reload();         //刷新
                    } else {
                        alert(result.message);
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
}

//延迟进行计算
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $("#input[name='count']").keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                CalRemainQuantities();
            }
        },1000);
    });
});

//实时计算剩余数量

function CalRemainQuantities(item) {
 var count=$(item).val();//需要的数量
    if(count.length==0){
         count=0;
    }
    if(　isNaN(count)){
          alert("请输入数字!")
    }

    if(　!isNaN(count)){
        var inboundOrderItemId=$(item).parent().parent().children('td').eq(11).html();
        console.log(inboundOrderItemId)
        $('.myclass').each(function () {
            if($(this).children('td').eq(13).html()==inboundOrderItemId){
                var total= parseFloat($(this).children('td').eq(10).html());
                console.log(total)
                //剩余数量
                var residual=total-parseFloat(count);
                if(parseFloat(residual)>=0){
                    $(item).parent().next().html(residual.toFixed(2))
                    $(this).children('td').eq(11).html(residual.toFixed(2))//同步到上面的剩余数量

                }
                else {
                    alert("配料数量超出最大数额！重新配料")
                }


            }

        })
    }










}