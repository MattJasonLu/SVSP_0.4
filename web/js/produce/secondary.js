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
        if(item.actualCount>0&&(item.wastes.name=='炉渣'||item.wastes.name=='飞灰'||item.wastes.name=='桶')){
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
                        if (obj.wareHouse == null) {
                            $(this).html("");
                        }
                        else {
                            $(this).html(obj.wareHouse.wareHouseId);
                        }
                        break;
                    //产废单位
                    case (3):
                        $(this).html(obj.wastes.client.companyName);
                        break;
                    // 危废名称
                    case (4):
                        $(this).html(obj.wastes.name);
                        break;
                    // 危废代码
                    case (5):
                        $(this).html(obj.wastes.wastesId);
                        break;
                    // 产废类别
                    case (6):
                        $(this).html("");
                        break;
                    // 进料方式
                    case (7):
                        $(this).html(obj.wastes.handleCategory.name);
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
                        $(this).html(obj.wastes.remarks);
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
        var inboundOrderId=  $(this).parent().parent().next().html();
        //根据id获得库存的信息，进行转移放到配料中
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWasteInventoryByInboundOrderId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{'inboundOrderId':inboundOrderId},
            success:function (result) {
                if(result != undefined && result.status == "success"){
                    console.log(result);
                    //设置配料列表
                    setBatchingWList(result.data);
                    //赋值配料单号这里为自动生成
                    $("#batchingOrderId").val(result.batchingOrderId);
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
                    if(obj.wareHouse==null){
                        $(this).html("");
                    }
                    else {
                        $(this).html(obj.wareHouse.wareHouseId);
                    }
                    break;
                //产废单位
                case (2):
                    $(this).html(obj.wastes.client.companyName);
                    break;
                // 危废名称
                case (3):
                    $(this).html(obj.wastes.name);
                    break;
                // 危废代码
                case (4):
                    $(this).html(obj.wastes.wastesId);
                    break;
                // 产废类别
                case (5):
                    $(this).html("");
                    break;
                // 进料方式
                case (6):
                    $(this).html(obj.wastes.handleCategory.name);
                    break;
                //数量
                case (7):
                    break;
                case (8):
                    $(this).html(obj.wastes.remarks);
                    break;
                case (9):
                    $(this).html(obj.wasteInventoryId);
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
                wasteInventory:{inboundOrderId:$(this).children().get(0).innerHTML, wareHouse:{wareHouseId:$(this).children().get(1).innerHTML},},
                outboundNumber:$("#input1").val(),
                outboundDate:$('#date').val(),
                creator:$('#creator').val(),
                departmentName:$('#departmentName').val(),
                boundType:$("#outboundType").val()
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
    url: "getOutBoundOrderList",                  // url
    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success:function (result) {
        if (result != undefined && result.status == "success"){
            console.log(result);
            setPageClone(result.jsonArray);
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
        console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        if(item.checkState.name=="已出库"&&item.boundType.name=='次生出库'){
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
                        $(this).html(obj.wareHouse.wareHouseId);
                        break;
                    // 部门
                    case (2):
                        $(this).html(obj.departmentName);
                        break;
                    // 业务员
                    case (3):
                        $(this).html(obj.salesman.name);
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
                    case (7):
                        $(this).html("");
                        break;
                    //制单人
                    case (8):
                        $(this).html(obj.creator);
                        break;
                    //保管员
                    case (9):
                        $(this).html("");
                        break;
                    //审批人
                    case (10):
                        $(this).html(obj.auditor);
                        break;
                    //计划数量
                    case (11):
                        $(this).html(obj.outboundNumber);
                        break;
                    //危废数量
                    case (12):
                        $(this).html(obj.outboundNumber);
                        break;
                    //进料方式
                    case (13):
                        $(this).html(obj.wastes.handleCategory.name);
                        break;
                    //单据状态
                    case (14):
                        $(this).html(obj.picker);
                        break;
                    //审批状态
                    case (15):
                        $(this).html(obj.checkState.name);
                        break;
                    //备注
                    case (16):
                        $(this).html(obj.wastes.remarks);
                        break;
                    //转移联单号
                    case (17):
                        $(this).html(obj.picker);
                        break;
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