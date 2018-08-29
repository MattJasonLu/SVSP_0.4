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
/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
// function switchPage(pageNumber) {
//     if (pageNumber == 0) {                 //首页
//         pageNumber = 1;
//     }
//     if (pageNumber == -2) {
//         pageNumber = totalPage();        //尾页
//     }
//     if (pageNumber == null || pageNumber == undefined) {
//         console.log("参数为空,返回首页!");
//         pageNumber = 1;
//     }
//     $("#current").find("a").text("当前页：" + pageNumber);
//     if (pageNumber == 1) {
//         $("#previous").addClass("disabled");
//         $("#firstPage").addClass("disabled");
//         $("#next").removeClass("disabled");
//         $("#endPage").removeClass("disabled");
//     }
//     if (pageNumber == totalPage()) {
//         $("#next").addClass("disabled");
//         $("#endPage").addClass("disabled");
//         $("#previous").removeClass("disabled");
//         $("#firstPage").removeClass("disabled");
//     }
//     if (pageNumber > 1) {
//         $("#previous").removeClass("disabled");
//         $("#firstPage").removeClass("disabled");
//     }
//     if (pageNumber < totalPage()) {
//         $("#next").removeClass("disabled");
//         $("#endPage").removeClass("disabled");
//     }
//     var page = {};
//     page.count = countValue();                        //可选
//     page.pageNumber = pageNumber;
//     currentPage = pageNumber;          //当前页面
//     //addClass("active");
//     page.start = (pageNumber - 1) * page.count;
//     if (!isSearch) {
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "loadPageStockList",         // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             data: JSON.stringify(page),
//             dataType: "json",
//             contentType: 'application/json;charset=utf-8',
//             success: function (result) {
//                 if (result != undefined) {
//                     // console.log(result);
//                     setStockList(result);
//                 } else {
//                     console.log("fail: " + result);
//                     // setClientList(result);
//                 }
//             },
//             error: function (result) {
//                 console.log("error: " + result);
//                 // setClientList(result);
//             }
//         });
//     } else {
//         data['page'] = page;
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "searchClient",         // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             data: JSON.stringify(data),
//             dataType: "json",
//             contentType: 'application/json;charset=utf-8',
//             success: function (result) {
//                 if (result != undefined) {
//                     // console.log(result);
//                     setClientList(result.data);
//                 } else {
//                     console.log("fail: " + result);
//                     // setClientList(result);
//                 }
//             },
//             error: function (result) {
//                 console.log("error: " + result);
//                 // setClientList(result);
//             }
//         });
//     }
// }

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
                url: "loadPageStockList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setClientList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchStock",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setClientList(result.data);
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
    }
}

//点击确认进行出库操作
function outBound() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    //获得领料单号
    items.each(function (index) {
        var materialRequisitionId = $(this).parent().parent().next().html();
        //1根据领料单号获取数据
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getByMaterialRequisitionId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {'materialRequisitionId':materialRequisitionId},
            dataType: "json",
            //contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //设置出库列表
                    if(result.materialRequisitionOrder!=undefined){
                        setOutboutList(result.materialRequisitionOrder,index);
                    }

                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });
    });
    //赋值出库单号
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getOutBoundOrderId",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     //contentType: "application/json; charset=utf-8",
    //     success:function (result) {
    //         if (result != undefined && result.status == "success"){
    //             console.log(result);
    //             $("#outboundOrderId").val(result.outboundOrderId);
    //
    //         }
    //         else {
    //             alert(result.message);
    //         }
    //     },
    //     error:function (result) {
    //         alert("服务器异常！");
    //     }
    // });


}
//设置出库列表
function setOutboutList(result,index) {
    id="";
    var tr = $("#cloneTr2");
    //tr.siblings().remove();
    tr.attr('class','myclass2');
        // 克隆tr，每次遍历都可以产生新的tr
        if(result.checkState.name=='待出库'){
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                //1生成领料单号
                var obj=eval(result);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 序号
                    case (0):
                        $(this).html(index+1);
                        break;
                    // 产废单位
                    case (1):
                        if(obj.client!=null){
                            $(this).html(obj.client.companyName);
                        }
                        break;
                    // 危废名称
                    case (2):
                        $(this).html(obj.wastes.name);
                        break;
                    // 危废代码
                    case (3):
                        $(this).html(obj.wastes.wastesId);
                        break;
                    // 出库数量
                    case (4):
                        $(this).html(obj.batchingOrder.batchingNumber);
                        break;
                    // 单价
                    case (5):
                        $(this).html(0);
                        break;
                    // 金额
                    case (6):
                        $(this).html(0);
                        break;
                    //处置方式
                    case (7):
                        $(this).html(obj.wastes.processWay.name);
                        break;
                    //备注
                    case (8):
                        $(this).html(obj.wastes.remarks);
                        break;
                    //库区
                    case (9):
                        $(this).html(obj.wareHouse.wareHouseName);
                        break;
                    //领料单号
                    case (10):
                        $(this).html(obj.materialRequisitionId);
                        break;
                    //
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');


}
//保存添加至库存
function saveOutBound(){
    if(confirm("确定生成出库单?")){
        //点击确定后操作
        //获得输入的数据
        $('.myclass2').each(function (index) {
            //1出库日期
            var outboundDate=$("#outBoundDate").val();
            //2出库类别
            var outboundType=$("#outboundType").val();
            //3制单人
            var  creator=$('#creator').val();
            //4审核人
            var auditor=$('#auditor').val();
            //5领料单号
            var materialRequisitionId=$(this).children().get(10).innerHTML;
            data={
                outboundDate:outboundDate,
                creator:creator,
                auditor:auditor,
                materialRequisitionOrder:{materialRequisitionId:materialRequisitionId}
            }
            addOutBoundOrder(data);
        });
        window.location.href="warehouseManageOut.html";
    }






}
//添加出库单
function addOutBoundOrder(data) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addOutBoundOrder",                  // url
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
/**
 * 分页 获取首页内容
 * */
function loadOutBoundList() {
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
                //设置下拉列表
                setPageClone(result.data);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    }) ;
    // 设置高级检索的下拉框数据
    //setSeniorSelectedList();
    isSearch = false;


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
        if(item.checkState.name=="已出库"){
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
                        $(this).html(obj.materialRequisitionOrder.wareHouse.wareHouseName);
                        break;
                    // 部门
                    case (2):
                        $(this).html(obj.materialRequisitionOrder.departmentName);
                        break;
                    // 业务员
                    case (3):
                        $(this).html("");
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
                        $(this).html("危废出库");
                        break;
                    // 主管
                    case (7):
                        $(this).html(obj.materialRequisitionOrder.deputyGeneral);
                        break;
                    //制单人
                    case (8):
                        $(this).html(obj.creator);
                        break;
                    //保管员
                    case (9):
                        $(this).html(obj.materialRequisitionOrder.guardian);
                        break;
                    //审批人
                    case (10):
                        $(this).html(obj.auditor);
                        break;
                    //计划数量
                    case (11):
                        $(this).html(obj.materialRequisitionOrder.wastes.wasteAmount);
                        break;
                    //危废数量
                    case (12):
                        $(this).html(obj.materialRequisitionOrder.wastes.wasteAmount);
                        break;
                    //进料方式
                    case (13):
                        $(this).html(obj.materialRequisitionOrder.wastes.handleCategory.name);
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
                        $(this).html(obj.materialRequisitionOrder.wastes.remarks);
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
                $("#companyName").text(result.data[0].materialRequisitionOrder.client.companyName);
                //出库时间
                $('#outBoundDate').text(getDateStr(result.data[0].outboundDate));
                //废物名称
                $('#name').text(result.data[0].materialRequisitionOrder.wastes.name);
                //废物代码
                $('#wastesId').text(result.data[0].materialRequisitionOrder.wastes.wastesId);
                //重量
                $('#wastesAmount').text(result.data[0].materialRequisitionOrder.wastes.wasteAmount);
                //物质形态
                $('#formType').text(result.data[0].materialRequisitionOrder.wastes.formType.name);
                //包装形式
                $('#packageType').text(result.data[0].materialRequisitionOrder.wastes.calorific);
                //热值/KCal/Kg
                $('#KCal').text(result.data[0].materialRequisitionOrder.wastes.wastesId);
                //PH
                $('#PH').text(result.data[0].materialRequisitionOrder.wastes.ph);
                //灰分/%
                $('#ashContent').text(result.data[0].materialRequisitionOrder.wastes.ashPercentage);
                //水分/%
                $('#waterContent').text(result.data[0].materialRequisitionOrder.wastes.wetPercentage);
                //氯含量/%
                $('#CLContent').text(result.data[0].materialRequisitionOrder.wastes.chlorinePercentage);
                //硫含量/%
                $('#SContent').text(result.data[0].materialRequisitionOrder.wastes.sulfurPercentage);
                //磷含量/%
                $('#PContent').text(result.data[0].materialRequisitionOrder.wastes.phosphorusPercentage);
                //氟含量/%
                $('#FContent').text(result.data[0].materialRequisitionOrder.wastes.fluorinePercentage);
                //处理方式
                $('#processingMethod').text(result.data[0].materialRequisitionOrder.wastes.processWay.name);
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