/*
*次生出库脚本文件
 */
function reset() {
    window.location.reload();
}
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
var array0=[];//初始化时存放的数组
var array=[];//存放所有的tr
var array1=[];//存放目标的tr
//危废出库查询
/**********************出库部分**********************/
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
            url: "totalSecOutBoundRecord",                  // url
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
    } else {
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
       console.log("总记录数为0，请检查！");
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
            url: "loadSecOutBoundList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    setOutBoundList(result.data);
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
                url: "loadSecOutBoundList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setOutBoundList(result.data);
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
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
}
/**
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setOutBoundList(result);
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

//加载次生出库信息==>次生出库页面
function onLoadSecondary() {
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
        type: "POST",                       // 方法类型
        url: "loadSecOutBoundList",                  // url
        data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                $('.loader').hide();
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    });
    //进料方式高级检索
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWay",                  // url
       // data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var processWay=$('#search-materialForm');
                processWay.children().remove();
                $.each(result.processWayList,function (index,item) {
                    var option=$('<option/>')
                    option.val(index);
                    option.text(item.name);
                    processWay.append(option);
                })
                processWay.get(0).selectedIndex=-1;
            }
        else {
                alert(result.message);
            }


        },
        error:function (result) {
            alert("服务器异常")
        }
    });
    isSearch=false;
}

//设置出库数据列表==>次生出库页面
function setOutBoundList(result) {
    var tr = $("#clonedTr1");
    tr.siblings().remove();
    //console.log(result);
    //tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
        // console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                //1生成领料单号
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 出库单号
                    case (1):
                        $(this).html(obj.outboundOrderId);
                        break;
                    // 出库日期
                    case (2):
                        $(this).html(getDateStr(obj.outboundDate));
                        break;

                    // 出库类别
                    case (3):
                        if(obj.boundType!=null){
                            $(this).html(obj.boundType.name);
                        }

                        break;
                    // 主管
                    // case (7):
                    //     $(this).html("");
                    //     break;
                    //制单人
                    // case (8):
                    //     $(this).html(obj.creator);
                    //     break;
                    //保管员
                    // case (9):
                    //     $(this).html("");
                    //     break;
                    //审批人
                    // case (10):
                    //     $(this).html(obj.auditor);
                    //     break;
                    //计划数量
                    case (4):
                        $(this).html(obj.outboundNumber.toFixed(2));
                        break;
                    case (5):
                        $(this).html(obj.outboundNumber.toFixed(2));
                        break;
                        //处置方式
                    case (6):
                        if(obj.processWayItem!=null){
                            $(this).html(obj.processWayItem.dictionaryItemName);
                        }

                        break
                    case (7):
                        if(obj.checkStateItem!=null){
                            $(this).html(obj.checkStateItem.dictionaryItemName);
                        }

                        break
                    case (8):
                        $(this).html(obj.inboundOrderItemId);
                        break

                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
          if(clonedTr.children('td').eq(7).html()=="已退库"){
               $(clonedTr).hide();
          }
    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}

//加载次生列表==>次生出库新增页面
function loadSecondaryList() {
    loadNavigationList();    // 设置动态菜单
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    var page = {};
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryInventoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(page),
        contentType: 'application/json;charset=utf-8',
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                var equipment=$("#equipment");
                equipment.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>')
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
        error:function (result) {
            alert("服务器异常")
        }

    });

    //进料方式高级检索
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWay",                  // url
        // data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var processWay=$('#search-processWay');
                processWay.children().remove();
                $.each(result.processWayList,function (index,item) {
                    var option=$('<option/>')
                    option.val(index);
                    option.text(item.name);
                    processWay.append(option);
                })
                processWay.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }


        },
        error:function (result) {
            alert("服务器异常")
        }
    });

    $('#date').val(dateToString(new Date()))

}

//设置次生库存列表数据==>次生出库新增页面
function setWasteInventoryList(result) {
    $(".myclass").hide();
    var tr = $("#cloneTr");
    tr.attr('class','myclass')
    console.log(result);
    //tr.siblings().remove();
    $.each(result, function (index, item) {
        if(parseFloat(item.actualCount).toFixed(2)>0&&item.boundType.name=='次生入库'){
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
                        if(obj.secondaryCategoryItem!=null){
                            $(this).html((obj.secondaryCategoryItem.dictionaryItemName));
                        }
                        else {
                            $(this).html((obj.wastesName));
                        }

                        break;
                    // 危废代码
                    case (6):
                        $(this).html(obj.wastesCode);
                        break;
                    // 进料方式
                    case (7):
                        if(obj.processWay){
                            $(this).html(obj.processWay.name);
                        }
                        break;
                    //数量
                    case (8):
                        $(this).html(parseFloat(obj.actualCount).toFixed(2));
                        break;
                    //剩余数量
                    case (9):
                        $(this).html(parseFloat(obj.leftNumeber).toFixed(2));
                        break;
                        //入库单明细
                    case (10):
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
        var inboundOrderId=this.firstElementChild.nextElementSibling.innerHTML;
        //console.log(inboundOrderId);
        $("#residualQuantity").attr("name",inboundOrderId);
        $("#residualQuantity").removeAttr('id');
    });


}

//次生出库确认按钮==>次生出库新增页面
function batching() {

    $('#cloneTr2').siblings().remove();

    var items = $("input[name='select']:checked");//判断复选框是否选中
    items.each(function () {
        //获得库存Id
        if($(this).parent().parent().parent().attr('style')!='display: none;'){
            var inboundOrderItemId=  $(this).parent().parent().parent().children('td').last().text();
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
        }

    });
}

//设置配料列表数据==>次生出库新增页面
function setBatchingWList(result) {
    var tr = $("#cloneTr2");
    tr.attr('class','myclass2');
    //tr.siblings().remove();
    //console.log(result);
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
                // 入库日期
                case (1):
                                $(this).html(getDateStr(obj.inboundDate));
                    break;
                //仓库号
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
                // 危废名称
                case (4):
                    $(this).html(convertSecondWastesNameEngToChn(obj.wastesName));
                    break;
                // 产废类别
                case (5):
                    $(this).html(obj.wastesCode);
                    break;
                // 处理方式
                case (6):
                    if(obj.processWay!=null){
                        $(this).html(obj.processWay.name);
                    }
                    break;
                //数量
                case (7):
                    break;
                case (8):
                    $(this).html(obj.actualCount.toFixed(2));
                    break;
              //入库单明细
                case (9):
                    $(this).html(obj.inboundOrderItemId);
                    break;
                //公司编号
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
                //入库单明细
                case (11):
                    $(this).html(obj.inboundOrderItemId);
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

//数量加减==>次生出库新增页面
function subtraction(item) {
    //获得相应的入库单号
    var flag=false;
    var inboundOrderId = item.parentElement.parentElement.firstElementChild.innerHTML;
    var number=$(item).val();
    //1根据入库单号获得总量，然后根据配料量减去得到剩余量
    setTimeout(time(inboundOrderId,number), 2000);
    // console.log(array)
    //进行运算
}
//==>次生出库新增页面
function time(inboundOrderId,number) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryLeftNumber",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {'inboundOrderId':inboundOrderId,'number':number},
        dataType: "json",
        // contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                $("td[name="+inboundOrderId+"]").html(result.leftNumber);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}
//保存==>次生出库新增页面
function save() {
    if($('#date').val().length>0){
        if(confirm("确定生成出库单?")){
            //点击确定后操作
            $(".myclass2").each(function () {
                var data={
                    inboundOrderItemId:$(this).children('td').eq(9).html(),
                    outboundDate:$('#date').val(),
                    creator:$('#creator').val(),
                    departmentName:$('#departmentName').val(),
                    equipmentDataItem:{dataDictionaryItemId:$('#equipment').selectpicker('val')},
                    outboundOrderId:$(this).children('td').eq(0).html(),
                    client:{clientId:$(this).children('td').eq(10).html()},
                    wastesName:$(this).children('td').eq(4).html(),
                    wasteCategory:$(this).children('td').eq(5).html(),
                    processWayItem:{dictionaryItemName:($(this).children('td').eq(6).html())},
                    outboundNumber:$(this).children('td').eq(7).children('input').val(),
                    wareHouse:{wareHouseId:$(this).children('td').eq(11).html()}
                };
                console.log(data);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "addSecondary",                  // url
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
        }
        alert("添加成功！");
      window.location.href="secondaryOutbound.html";

    }
    else {
        $('#date').parent().next('span').remove();
        var span=$('<span>');
        span.text("请输入日期！");
        span.css('color','red');
        $('#date').after($(span));
    }

}

function warning(item) {
    // if($('#beginTime').val().length>0&&$('#endTime').val().length>0){
    //    $('#endTime').parent().next('span').remove();
    // }
    if($(item).val().length>0){
        $(item).next('span').remove();
    }
}

//设置危废查询列表
function setWasteInventoryList1(result) {
    var tr=$('#cloneTr');
    tr.siblings().remove();
    tr.attr('class','myclass')
    $.each(result,function (index,item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if(item.boundType.name=='次生入库'){
            var clonedTr = tr.clone();
            clonedTr.show();
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 入库单号
                    case (1):
                        $(this).html(obj.inboundOrderId);
                        break;
                    // 入库日期
                    case (2):
                        $(this).html(getDateStr(obj.inboundDate));
                        break;
                    //产废单位
                    case (3):
                        $(this).html(obj.produceCompany.companyName);
                        break;
                    // 仓库名称
                    case (4):
                        $(this).html("");
                        break;
                    // 入库类别
                    case (5):
                        $(this).html(obj.boundType.name);
                        break;
                    // 进料方式
                    case (6):
                        $(this).html(obj.handleCategory.name);
                        break;
                    // 危废名称
                    case (7):
                        if(obj.laboratoryTest.wastesName=='slag'){
                            $(this).html('炉渣');
                        }
                        if(obj.laboratoryTest.wastesName=='ash'){
                            $(this).html('飞灰');
                        }
                        if(obj.laboratoryTest.wastesName=='bucket'){
                            $(this).html('桶');
                        }


                        break;
                    //危废类型
                    // case (8):
                    //     $(this).html(obj.wastesCategory);
                    //     break;
                    //数量
                    case (8):
                        $(this).html(obj.actualCount);
                        break;
                    //单价
                    case (9):
                        $(this).html(obj.unitPriceTax);
                        break;
                    //总价
                    case (10):
                        $(this).html(parseInt(obj.actualCount)*(obj.unitPriceTax).toFixed(2)  );
                        break;
                    //创建时间
                    case (11):
                        $(this).html(getDateStr(obj.creatorDate));
                        break;
                    case (12):
                        $(this).html(obj.inboundOrderItemId);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    })
    tr.hide();
    tr.removeAttr('class');
}

//设置克隆页码==>次生出库和库存页面
function setPageClone1(result) {
    $(".beforeClone").remove();
    setWasteInventoryList1(result);
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

//双击查看出库单明细==>次生出库
function viewOutBound(item) {
    var outboundOrderId=$(item).children().get(5).innerHTML;
    //根据出库单号查询结果
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getByOutBoundOrderId",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //赋值
                //产废单位
                $("#companyName").text(result.data[0].client.companyName);
                // //出库时间
                $('#outBoundDate').text(getDateStr(result.data[0].outboundDate));
                // //废物名称
                $('#name').text(result.data[0].laboratoryTest.wastesName);
                // //废物代码
                $('#wastesId').text(result.data[0].laboratoryTest.wastesCode);
                // //重量
                $('#wastesAmount').text(result.data[0].outboundNumber);
                // //物质形态
                if(result.data[0].formType!=null){
                    $('#formType').text(result.data[0].formType.name);
                }

                // //包装形式
                if(result.data[0].packageType!=null){
                    $('#packageType').text(result.data[0].packageType.name);
                }
                //热值/KCal/Kg最大
                $('#kCalMax').text(result.data[0].laboratoryTest.heatMaximum);
                $('#kCalAvg').text(result.data[0].laboratoryTest.heatAverage);
                $('#kCalMin').text(result.data[0].laboratoryTest.heatMinimum);
                // //PH
                $('#phMax').text(result.data[0].laboratoryTest.phMaximum);
                $('#phAvg').text(result.data[0].laboratoryTest.phAverage);
                $('#phMin').text(result.data[0].laboratoryTest.phMaximum);
                //灰分/%
                $('#ashMax').text(result.data[0].laboratoryTest.ashMaximum);
                $('#ashAvg').text(result.data[0].laboratoryTest.ashAverage);
                $('#ashMin').text(result.data[0].laboratoryTest.ashMinimum);
                //水分
                $('#waterMax').text(result.data[0].laboratoryTest.waterContentMaximum);
                $('#waterAvg').text(result.data[0].laboratoryTest.waterContentAverage);
                $('#waterMin').text(result.data[0].laboratoryTest.waterContentMinimum);
                //硫含量
                $('#sMax').text(result.data[0].laboratoryTest.sulfurContentMaximum);
                $('#sAvg').text(result.data[0].laboratoryTest.sulfurContentAverage);
                $('#sMin').text(result.data[0].laboratoryTest.sulfurContentMinimum);
                //氯含量
                $('#clMax').text(result.data[0].laboratoryTest.chlorineContentMaximum);
                $('#clAvg').text(result.data[0].laboratoryTest.chlorineContentAverage);
                $('#clMin').text(result.data[0].laboratoryTest.chlorineContentMinimum);
                //磷含量
                $('#pMax').text(result.data[0].laboratoryTest.phosphorusContentMaximum);
                $('#pAvg').text(result.data[0].laboratoryTest.phosphorusContentAverage);
                $('#pMin').text(result.data[0].laboratoryTest.phosphorusContentMinimum);
                //氟含量
                $('#fMax').text(result.data[0].laboratoryTest.fluorineContentMaximum);
                $('#fAvg').text(result.data[0].laboratoryTest.fluorineContentAverage);
                $('#fMin').text(result.data[0].laboratoryTest.fluorineContentMinimum);
                //处理方式
                if(result.data[0].processWay!=null){
                    $('#processingMethod').text(result.data[0].processWay.name);
                }
                if(result.data[0].handelCategory!=null){
                    //进料方式
                    $('#handelCategory').text(result.data[0].handelCategory.name);
                }

                //入库单号
                $("#outboundOrderId").val(result.data[0].outboundOrderId);
                $('#appointModal2').modal('show');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    }) ;
}

//属性调整==>次生出库
function adjustAttr() {

    //加载进料方式的下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandelCategoryList",                  // url
        data:{'outboundOrderId':$("#outboundOrderId").val()},
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                index1=result.handelCategory.index;
                var type=$('#modal-type');
                type.children().remove();
                $.each(result.array1,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    type.append(option);
                })
                type.get(0).selectedIndex=index1-1;
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常！")
        },

    });
    $('#examineModal').modal('show');

}

//确认修改属性
function comfirm() {
    console.log($("#outboundOrderId").val());
    console.log($('#modal-type').val());
    $.ajax({
        type: "POST",                       // 方法类型
        url: "upHandelCategoryById",                  // url
        data:{'outboundOrderId':$("#outboundOrderId").val(),'index':$('#modal-type').val()},
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                alert(result.message);
                window.location.reload();
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

//导出
function exportExcel() {
    console.log("export");
    var name = 't_pl_outboundorder';
    var idArry = [];//存放主键
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select t_pl_outboundorder.outboundOrderId 出库单号,t_pl_outboundorder.outboundDate 出库日期 ,t_pl_outboundorder.creator  创建人,t_pl_outboundorder.auditor 审核人, t_pl_outboundorder.outboundNumber   出库数量,t_pl_outboundorder.handelCategory 进料方式, t_pl_outboundorder.processWay 处置方式,t_pl_outboundorder.wasteCategory 危废类别,t_pl_outboundorder.wastesCode 危废编码,t_pl_outboundorder.guardian 保管员,  t_pl_outboundorder.unitPriceTax 单价,  t_pl_outboundorder.packageType 包装形式,t_pl_outboundorder.formType   物质形态 from t_pl_outboundorder  join t_pr_laboratorytest where t_pl_outboundorder.laboratoryTestId=t_pr_laboratorytest.laboratorytestnumber and t_pl_outboundorder.boundType='SecondaryOutbound';";
        window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
    }

    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().next().next().next().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().next().next().next().next().html());        // 将选中项的编号存到集合中
            }
        });
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += idArry[i] + ",";
                else if (i == idArry.length - 1) sql += idArry[i] + ");"
            }
            var sqlWords = "select t_pl_outboundorder.outboundOrderId 出库单号,t_pl_outboundorder.outboundDate 出库日期 ,t_pl_outboundorder.creator  创建人,t_pl_outboundorder.auditor 审核人, t_pl_outboundorder.outboundNumber   出库数量,t_pl_outboundorder.handelCategory 进料方式, t_pl_outboundorder.processWay 处置方式,t_pl_outboundorder.wasteCategory 危废类别,t_pl_outboundorder.wastesCode 危废编码,t_pl_outboundorder.guardian 保管员,  t_pl_outboundorder.unitPriceTax 单价,  t_pl_outboundorder.packageType 包装形式,t_pl_outboundorder.formType   物质形态 from t_pl_outboundorder  join t_pr_laboratorytest where t_pl_outboundorder.laboratoryTestId=t_pr_laboratorytest.laboratorytestnumber and t_pl_outboundorder.boundType='SecondaryOutbound' and outboundOrderId"+sql;

        }
        window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
    }


}

//查看==>次生出库
function view1(item) {
    var outboundOrderId=$(item).parent().parent().children('td').eq(1).html();
    //根据出库单号查询结果

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecOutBoundById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //赋值
                //产废单位
                if(result.data.client!=null){
                    $("#companyName").text(result.data.client.companyName);
                }
                // //出库时间
                $('#outBoundDate').text(getDateStr(result.data.outboundDate));


                // //废物名称
                //    if(obj.){
                //
                //    }
                if(result.data.secondaryCategoryItem!=null){
                    $('#name').text(convertStrToWastesName(result.data.secondaryCategoryItem.dictionaryItemName));
                }
                else {
                    $('#name').text(convertStrToWastesName(result.data.wastesName));
                }




                // //废物代码

                    $('#wastesId').text(result.data.wasteCategory);

                // //重量
                $('#wastesAmount').text(result.data.outboundNumber);
                // //物质形态
                // if(result.data[0].formType!=null){
                //     $('#formType').text(result.data[0].formType.name);
                // }
                //
                // // //包装形式
                // if(result.data[0].packageType!=null){
                //     $('#packageType').text(result.data[0].packageType.name);
                // }
                // if(result.data[0].laboratoryTest!=null) {
                //     //热值/KCal/Kg最大
                //     $('#kCalMax').text(result.data[0].laboratoryTest.heatMaximum);
                //     $('#kCalAvg').text(result.data[0].laboratoryTest.heatAverage);
                //     $('#kCalMin').text(result.data[0].laboratoryTest.heatMinimum);
                //     // //PH
                //     $('#phMax').text(result.data[0].laboratoryTest.phMaximum);
                //     $('#phAvg').text(result.data[0].laboratoryTest.phAverage);
                //     $('#phMin').text(result.data[0].laboratoryTest.phMaximum);
                //     //灰分/%
                //     $('#ashMax').text(result.data[0].laboratoryTest.ashMaximum);
                //     $('#ashAvg').text(result.data[0].laboratoryTest.ashAverage);
                //     $('#ashMin').text(result.data[0].laboratoryTest.ashMinimum);
                //     //水分
                //     $('#waterMax').text(result.data[0].laboratoryTest.waterContentMaximum);
                //     $('#waterAvg').text(result.data[0].laboratoryTest.waterContentAverage);
                //     $('#waterMin').text(result.data[0].laboratoryTest.waterContentMinimum);
                //     //硫含量
                //     $('#sMax').text(result.data[0].laboratoryTest.sulfurContentMaximum);
                //     $('#sAvg').text(result.data[0].laboratoryTest.sulfurContentAverage);
                //     $('#sMin').text(result.data[0].laboratoryTest.sulfurContentMinimum);
                //     //氯含量
                //     $('#clMax').text(result.data[0].laboratoryTest.chlorineContentMaximum);
                //     $('#clAvg').text(result.data[0].laboratoryTest.chlorineContentAverage);
                //     $('#clMin').text(result.data[0].laboratoryTest.chlorineContentMinimum);
                //     //磷含量
                //     $('#pMax').text(result.data[0].laboratoryTest.phosphorusContentMaximum);
                //     $('#pAvg').text(result.data[0].laboratoryTest.phosphorusContentAverage);
                //     $('#pMin').text(result.data[0].laboratoryTest.phosphorusContentMinimum);
                //     //氟含量
                //     $('#fMax').text(result.data[0].laboratoryTest.fluorineContentMaximum);
                //     $('#fAvg').text(result.data[0].laboratoryTest.fluorineContentAverage);
                //     $('#fMin').text(result.data[0].laboratoryTest.fluorineContentMinimum);
                // }
                //处理方式
                if(result.data.processWayItem!=null){
                    $('#processingMethod').text(result.data.processWayItem.dictionaryItemName);
                }
                if(result.data.handleCategoryItem!=null){
                    //进料方式
                    $('#handelCategory').text(result.data.handleCategoryItem.dictionaryItemName);
                }
                //处置设备
                if(result.data.equipmentDataItem!=null){
                    $('#equipment').text(result.data.equipmentDataItem.dictionaryItemName);
                }
                //出库
                $("#outBoundId1").html(result.data.outboundOrderId);
                $('#appointModal2').modal('show');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    }) ;
}



//修改次生出库
function adjust(item) {
    var outboundOrderId=$(item).parent().parent().children('td').eq(1).html();

    // $('#appointModal3').modal('show');

    //根据出库单号查询结果
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecOutBoundById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //赋值
                //产废单位
                if(result.data.client!=null){
                    $("#companyName1").text(result.data.client.companyName);
                }
                // //出库时间
                $('#outBoundDate1').val(getDateStr(result.data.outboundDate));


                // //废物名称
                $('#name1').text(convertStrToWastesName(result.data.wastesName));



                // //废物代码

                $('#wastesId1').text(result.data.wasteCategory);

                // //重量
                $('#wastesAmount1').val(result.data.outboundNumber.toFixed(2));

                $('#wastesAmount2').html(result.data.outboundNumber.toFixed(2));

                $('#secInBoundId').html(result.data.inboundOrderId);
                //处理方式
                if(result.data.processWayItem!=null){
                    $('#processingMethod1').text(result.data.processWayItem.dictionaryItemName);
                }

                if(result.data.handelCategory!=null){
                    //进料方式
                    $('#handelCategory1').text(result.data.handelCategory.name);
                }

                //处置设备
                if(result.data.equipmentDataItem!=null){
                    $('#equipment1').text(result.data.equipmentDataItem.dictionaryItemName);
                }
                //出库单号
                $("#secOutBoundId").html(result.data.outboundOrderId);

                //库存数量
                $("#Inventory").html(result.data.inventoryNumber.toFixed(2));

                $("#Inventory2").html(result.data.inventoryNumber.toFixed(2));

                //入库单明细
                $('#inboundOrderItemId').text((result.data.inboundOrderItemId));

                $('#appointModal3').modal('show');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    }) ;

}


//次生出库修改
function adjustSecOutBound() {

  var outboundOrderId=$('#secOutBoundId').html();

    var inboundOrderItemId=$('#inboundOrderItemId').html();

    var outBoundNumber=$('#wastesAmount1').val();

    var inventoryNumber=$('#Inventory').html();

    var outboundDate=$('#outBoundDate1').val();

    var data={
        outboundOrderId:outboundOrderId,
        inboundOrderItemId:inboundOrderItemId,
        outboundNumber:outBoundNumber,
        inventoryNumber:inventoryNumber,
        outboundDate:outboundDate
    };

    console.log(data)
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateSecOutBound",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message)
                window.location.reload()
            }
        },
        error:function (result) {
            
        }
    })

}

//计算出库数和库存量
function Cal() {

    var outboundNumber=$("#wastesAmount1").val();//手输入的出库数量

    if(outboundNumber.length==0){
        outboundNumber=0;
    }
    if(　isNaN(outboundNumber)){
        alert("请输入数字!")
    }

    if(　!isNaN(outboundNumber)){
        var inventoryNumber=$('#Inventory2').html();//现有库存==》不会变

        var difference=parseFloat(outboundNumber)-parseFloat($('#wastesAmount2').html());//差量

        var inventoryNumber1=parseFloat(inventoryNumber)-parseFloat(difference);

        if(parseFloat(inventoryNumber1)>0){
            $('#Inventory').html(parseFloat(inventoryNumber1).toFixed(2))
        }
        else {
            alert("配料量大于库存量，请重新配料！")
            $('#wastesAmount1').val($("#wastesAmount2").html())
        }

    }

}

//作废
function cancel(item) {

    $('#appointModal4').modal('show');

    var outboundOrderId=$(item).parent().parent().children('td').eq(1).html();
    //根据出库单号查询结果

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecOutBoundById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var obj=eval(result.data);

                $('#inboundOrderId2').html(obj.inboundOrderId);

                $('#outboundOrderId2').html(obj.outboundOrderId);

                $('#inventoryNumber2').html(parseFloat(obj.inventoryNumber).toFixed(2));

                $('#cancelNumber').html(parseFloat(obj.outboundNumber).toFixed(2));

                $('#inventoryNumber3').html((parseFloat(obj.outboundNumber)+parseFloat(obj.inventoryNumber)).toFixed(2));

                $('#inboundOrderItemId2').html(obj.inboundOrderItemId);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    }) ;




}

//作废方法
function confirmCancel(){


        var data={
            outboundOrderId:$('#outboundOrderId2').html(),
            inventoryNumber:$('#inventoryNumber3').html(),
            inboundOrderItemId:$('#inboundOrderItemId2').html(),

        }

        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelSecOutBoundOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
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



//次生出库信息高级查询
function searchSecOutbound() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);
    isSearch=true;

    //如果需要按日期范围查询 寻找最早入库的日期
    var date;

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewestDateSec",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        //data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                date=getDateStr(result.dateList[0]);
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

    var text=$.trim($('#searchContent').val());
    //1出库日期
    var outBoundDate=$.trim($('#search-storageDate').val());

    var endDate=$.trim($('#search-endDate').val());
    //2出库数量
    var outBoundNumber=$.trim($('#search-storageQuantity').val());
    //3出库单号
    var outboundOrderId =$.trim($('#search-storageNumber').val());
    //4进料方式
    var processWay=$.trim($('#search-materialForm option:selected').text());
    //业务员
    var salesman=$.trim($('#search-salesman').val());

    var wareHouseName=$.trim($('#search-warehouseId').val());

    var startDate=getDateByStr(outBoundDate);
    var endDate=getDateByStr(endDate);

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {

            if(startDate.toString()=='Invalid Date'){
                startDate=getDateByStr(date);
            }
            if(endDate.toString()=='Invalid Date'){
                endDate=new Date();
            }
            var start=$(this).children('td').eq(2).text();
            if(start.length==0){
                start=date;
            }

            if(!($(this).children('td').eq(5).text().indexOf(outBoundNumber)!=-1&&$(this).children('td').text().indexOf(text)!=-1
            &&$(this).children('td').eq(6).text().indexOf(processWay)!=-1&&$(this).children('td').eq(1).text().indexOf(outboundOrderId)!=-1
                &&(getDateByStr(start)<=endDate&&getDateByStr(start)>=startDate)
            )){
                $(this).hide();
           }
            if(($(this).children('td').eq(5).text().indexOf(outBoundNumber)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(6).text().indexOf(processWay)!=-1&&$(this).children('td').eq(1).text().indexOf(outboundOrderId)!=-1
                &&(getDateByStr(start)<=endDate&&getDateByStr(start)>=startDate))){
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
    setPageCloneAfter(1);
    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    // isSearch=false;
    // if(outBoundDate.length<=0&&outBoundNumber.length<=0&&processWay.length<=0&&outboundOrderId.length<=0){
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
        searchSecOutbound();      //
    }
}

//次生出库粗查询

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchSecondaryOuntBound();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchSecondaryOuntBound();      //
            }
        },600);
    });
});

//粗查询
function searchSecondaryOuntBound() {
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
        onLoadSecondary();
    }


}

//退库
function rollback(item) {

    $('#appointModal5').modal('show')

    var outboundOrderId=$(item).parent().parent().children('td').eq(1).html();
    //根据出库单号查询结果

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecOutBoundById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var obj=eval(result.data);

                $('#inboundOrderId3').html(obj.inboundOrderId);

                $('#outboundOrderId3').html(obj.outboundOrderId);

                $('#inventoryNumber4').html(parseFloat(obj.inventoryNumber).toFixed(2));

                $('#cancelNumber3').html(parseFloat(obj.outboundNumber).toFixed(2));

                $('#inventoryNumber5').html((parseFloat(obj.outboundNumber)+parseFloat(obj.inventoryNumber)).toFixed(2));

                $('#inboundOrderItemId3').html(obj.inboundOrderItemId);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    }) ;






}

//退库方法
function confirmRetired() {


    var data={
        outboundOrderId:$('#outboundOrderId3').html(),
        inventoryNumber:$('#inventoryNumber5').html(),
        inboundOrderItemId:$('#inboundOrderItemId3').html(),

    }

    $.ajax({
        type: "POST",                       // 方法类型
        url: "retireOutBoundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
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
        var inboundOrderItemId=$(item).parent().parent().children('td').eq(9).html();
       console.log(inboundOrderItemId)
        $('.myclass').each(function () {
            if($(this).children('td').eq(10).html()==inboundOrderItemId){
                var total= parseFloat($(this).children('td').eq(8).html());
                console.log(total)
                //剩余数量
                var residual=total-parseFloat(count);
                if(parseFloat(residual)>=0){
                    $(item).parent().next().html(residual.toFixed(2))
                    $(this).children('td').eq(9).html(residual.toFixed(2))//同步到上面的剩余数量

                }
                else {
                    alert("配料数量超出最大数额！重新配料")
                }


            }

        })
    }










}




//次生出库新增页面粗查询

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContentAdd').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchSecondaryOuntBoundAdd();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchSecondaryOuntBoundAdd();      //
            }
        },600);
    });
});


//粗查询==>新增页面
function searchSecondaryOuntBoundAdd() {

    $('.myclass').each(function () {
        $(this).show();
    })

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



/**
 * 回车查询
 */
function enterSearch1() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchSecOutboundAdd();      //
    }
}

//次生高级查询==>新增页面
function searchSecOutboundAdd() {

    array.length=0;//清空数组

    array1.length=0;//清空数组

    $('.myclass').each(function () {
        $(this).show();
        array.push($(this));
    });


    var text=$.trim($('#searchContentAdd').val());

    var beginTime=$.trim($('#search-inDate').val());

    var endTime=$.trim($('#search-endDate').val());

    var startDate=getDateByStr(beginTime);

    var endDate=getDateByStr(endTime);

    var processWay=$.trim($("#search-processWay option:selected").text());

    var wastesCode=$.trim($("#search-wasteId").val());


    var companyName=$.trim($("#search-companyName").val());

    console.log(companyName)

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

            var code=($(this).children('td').eq(6).text().toString()).substring($(this).children('td').eq(6).text().length-2,$(this).children('td').eq(6).text().length);
           var date=$(this).children('td').eq(2).text()
      if(date.length<=0){
               date=startDate;
      }
            if(!($(this).children('td').eq(7).text().indexOf(processWay)!=-1
                &&$(this).children('td').eq(4).text().indexOf(companyName)!=-1&&code.indexOf(wastesCode)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&(new Date(date).getTime()>=new Date(startDate).getTime() &&new Date(date).getTime()<=new Date(endDate).getTime())
            )){
                $(this).hide();
            }
            if($(this).children('td').eq(7).text().indexOf(processWay)!=-1
                &&$(this).children('td').eq(4).text().indexOf(companyName)!=-1&&code.indexOf(wastesCode)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&(new Date(date).getTime()>=new Date(startDate).getTime() &&new Date(date).getTime()<=new Date(endDate).getTime())){
                array1.push($(this));
            }
        });
    }

    for(var i=0;i<array1.length;i++){
        $.each(array1[i],function () {
            $('#tbody1').append(this) ;
        });
    }

}

