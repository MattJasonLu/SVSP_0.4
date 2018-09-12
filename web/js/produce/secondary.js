/*
*次生出库脚本文件
 */
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
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
            url: "totalOutBoundRecord",                  // url
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchOutBoundTotal",                  // url
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
    var count = countValue();                         // 可选
    return loadPages(totalRecord, count);
}
//加载次生危废列表
function loadSecondaryList() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    var page = {};
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getOutBoundList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result ) {
            if (result != undefined && result.status == "success"){
                // console.log(result);
                //1获得下拉列表
                var outboundType=$("#outboundType");
                //2清除子元素
                outboundType.children().remove();
                //3遍历获得项来赋值
                $.each(result.array,function (index,item) {
                    //4创建选项元素
                    var option = $('<option />');
                    //5给option赋值
                    option.val(index);
                    option.text(item.name);
                    //6添加到父节点
                    outboundType.append(option);
                });
                //7初始化选项
                outboundType.get(0).selectedIndex=-1;

            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryList",                  // url
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

/**设置库存列表数据
 */
function setWasteInventoryList(result) {
    $(".myclass").hide();
    var tr = $("#cloneTr");
    tr.attr('class','myclass')
    console.log(result);
    //tr.siblings().remove();
    $.each(result, function (index, item) {
        if(item.actualCount>0&&item.boundType.name=='次生入库'){
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
                    // 仓库号
                    case (2):
                        $(this).html("");
                        break;
                    //产废单位
                    case (3):
                        $(this).html(obj.produceCompany.companyName);
                        break;
                    // 危废名称
                    case (4):
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
                    // 危废代码
                    case (5):
                        $(this).html(obj.laboratoryTest.wastesCode);
                        break;
                    // 产废类别
                    case (6):
                        $(this).html(obj.wastesCategory);
                        break;
                    // 进料方式
                    case (7):
                        if(obj.handleCategory!=null){
                            $(this).html(obj.handleCategory.name);
                        }

                        break;
                    //数量
                    case (8):
                        $(this).html(obj.actualCount);
                        break;
                    //剩余数量
                    case (9):
                        $(this).html(obj.leftNumeber);
                        break;
                    case (10):
                        $(this).html(obj.remarks);
                        break;
                    case (11):
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
/*出库*/
function batching() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    items.each(function () {
        //获得库存Id
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
    });
}
/**设置配料列表数据
 *
 */
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
                // 仓库号
                case (1):
                        $(this).html("");
                    break;
                //产废单位
                case (2):
                    $(this).html(obj.produceCompany.companyName);
                    break;
                // 危废名称
                case (3):
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
                // 危废代码
                case (4):
                    $(this).html(obj.laboratoryTest.wastesCode);
                    break;
                // 产废类别
                case (5):
                    $(this).html("");
                    break;
                // 进料方式
                case (6):
                    if(obj.handleCategory!=null){
                        $(this).html(obj.handleCategory.name);
                    }

                    break;
                //数量
                case (7):
                    $(this).html(obj.actualCount);
                    break;
                case (8):
                    $(this).html(obj.remarks);
                    break;
                case (9):
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
//数量加减
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
//保存
function save() {
    if(confirm("确定生成出库单?")){
        //点击确定后操作
        $(".myclass2").each(function () {
            var data={
                inboundOrderItemId:$(this).children('td').last().text(),
                outboundNumber:$(this).children('td').get(7).innerHTML,
                outboundDate:$('#date').val(),
                boundType:$("#outboundType").val(),
                creator:$('#creator').val(),
                departmentName:$('#departmentName').val(),
                equipment:$('#equipment').selectpicker('val'),
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

      // alert("添加成功！");
      // window.location.href="secondaryOutbound.html";
}

//加载次生出库信息
function onLoadSecondary() {
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
$.ajax({
    type: "POST",                       // 方法类型
    url: "loadOutBoundList",                  // url
    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success:function (result) {
        if (result != undefined && result.status == "success"){
            console.log(result);
            setPageClone(result.data);
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
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
}
//设置出库数据列表
function setOutBoundList(result) {
    var tr = $("#clonedTr1");
    //console.log(result);
    //tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
       // console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        if(item.boundType.name=='次生出库'){
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                //1生成领料单号
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 仓库号
                    case (1):
                        if(obj.wareHouse!=null){
                            $(this).html(obj.wareHouse.wareHouseId);
                        }
                        break;
                    // 部门
                    case (2):
                        $(this).html(obj.departmentName);
                        break;
                    // 业务员
                    case (3):
                        if(obj.client.salesman!=null){
                            $(this).html(obj.client.salesman.name);
                        }

                        break;
                    // 出库日期
                    case (4):
                        $(this).html(getDateStr(obj.outboundDate));
                        break;
                    // 出库单号
                    case (5):
                        $(this).html(obj.outboundOrderId);
                        break;
                    // 出库类别
                    case (6):
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
                    case (7):
                        $(this).html(obj.outboundNumber);
                        break;
                    //危废数量
                    case (8):
                        $(this).html(obj.outboundNumber);
                        break;
                    //进料方式
                    case (9):
                        if(obj.handelCategory!=null){
                            $(this).html(obj.handelCategory.name);
                        }
                        break;
                    //单据状态
                    case (10):
                        $(this).html(obj.recordState.name);
                        break;
                    //审批状态
                    case (11):
                        $(this).html(obj.checkState.name);
                        break;
                    //备注
                    case (12):
                        $(this).html(obj.remarks);
                        break;
                    //转移联单号
                    // case (17):
                    //     $(this).html(obj.picker);
                    //     break;
                    //
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
}

/**
 *
 *加载次生数据
 */
function loadWasteInventoryList() {
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
    //查询危废仓库信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryList", // url
        data: JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if(result != undefined && result.status == "success"){
                console.log(result);
                //设置危废查询列表
                setPageClone1(result.data);
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
    //加载进料方式列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandelCategoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                var type=$('#search-type');
                type.children().remove();
                $.each(result.array1,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    type.append(option);
                })
                type.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常！")
        },

    });
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

/**
 * 设置克隆页码
 * */
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
//双击查看出库单明细
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

//查看出库信息
function view(item) {
    var inboundOrderItemId=$(item).parent().prev().html();
    console.log(inboundOrderItemId);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getByInboundOrderItemId",                  // url 计算数据库的总条数
        data:{'inboundOrderItemId':inboundOrderItemId},
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //危废库存查看，点击查看按钮
                setByInboundOrderItemId(result);
                $("#appointModal2").modal('show');
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
//危废库存查看，点击查看按钮
function setByInboundOrderItemId(result) {
    var tr=$('#cloneTr3');
    tr.siblings().remove();
    $.each(result.wasteInventoryList,function (index,item) {
        var clonedTr=tr.clone();
        clonedTr.show();
        clonedTr.children('td').each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                case (0):
                    $(this).html(getDateStr(obj.inboundDate));
                    break;
                case (1):
                    $(this).html(obj.produceCompany.companyName);
                    break;
                case (2):
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
                case (3):
                    $(this).html(obj.laboratoryTest.wastesCode);
                    break;
                case (4):
                    $(this).html(obj.actualCount);
                    break;
                case (5):
                    $(this).html(obj.handleCategory.name);
                    break;
            }
        })
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);

    })
    tr.hide();
}
//属性调整
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
    var sqlWords = "select * from t_pl_outboundorder  join t_pr_laboratorytest where t_pl_outboundorder.laboratoryTestId=t_pr_laboratorytest.laboratorytestnumber and t_pl_outboundorder.boundType='SecondaryOutbound';";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}
var text = "";
//实时筛选，不用点击按钮
function search1(){
        text = $('#input').val();//获取文本框输入
        var tr=$('#cloneTr');
            // $("#table tr:not('#theader')").hide().filter(":contains('"+text+"')").show();
       $('.myclass').each(function () {
           if($(this).children('td').text().indexOf(text)==-1){
               $(this).hide();
           }
       })

}

/**
 *
 * 导出
 * @returns {string}
 */

