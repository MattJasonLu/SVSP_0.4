var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**********************出库部分**********************/
function reset() {
    isSearch=false;
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
    loadOutBoundList();
}

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
            url: "totalWastesOutBoundRecord",                  // url
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
    }else {
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
            url: "loadWastesOutBoundList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setOutBoundList(result.data);
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
    } if (isSearch) {//查询用的
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
                url: "loadWastesOutBoundList",         // url
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
 * 分页 获取首页内容==>危废
 * */
function loadOutBoundList() {
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
        type: "POST",                       // 方法类型
        url: "loadWastesOutBoundList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(page),
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
    //加载进料方式列表
    //进料方式高级检索
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategory",                  // url
        // data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var processWay=$('#search-materialForm');
                processWay.children().remove();
                $.each(result.handleCategoryList,function (index,item) {
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
    isSearch = false;


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
                    console.log(result);
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
                            $(this).html(obj.client.companyName);
                        break;
                    // 危废名称
                    case (2):
                        $(this).html(obj.laboratoryTest.wastesName);
                        break;
                    // 危废代码
                    case (3):
                        $(this).html(obj.laboratoryTest.wastesCode);
                        break;
                    // 出库数量
                    case (4):
                        $(this).html(obj.recipientsNumber);
                        break;
                    // 单价
                    case (5):
                        $(this).html(obj.quotationItem.unitPriceTax);
                        break;
                    // 金额
                    case (6):
                        $(this).html(parseInt(obj.recipientsNumber)*parseInt(obj.quotationItem.unitPriceTax).toFixed(2));
                        break;
                    //处置方式
                    case (7):
                        $(this).html(obj.processWay.name);
                        break;
                    //备注
                    case (8):
                        $(this).html(obj.remarks);
                        break;
                    //库区
                    case (9):
                        $(this).html("");
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
            var boundType=$("#outboundType").val();
            //3制单人
            var  creator=$('#creator').val();
            //4审核人
            var auditor=$('#auditor').val();
            //5领料单号
            var materialRequisitionId=$(this).children().get(10).innerHTML;
            //6处置设备
            var equipment=$('#equipment').selectpicker('val')-1;
            data={
                boundType:boundType,
                outboundDate:outboundDate,
                creator:creator,
                auditor:auditor,
                outboundNumber:$(this).children('td').get(4).innerHTML,
                materialRequisitionOrder:{materialRequisitionId:materialRequisitionId},
                equipment:equipment,
            }
            console.log(data);
           addOutBoundOrder(data);
        });

    }
   window.location.href="warehouseManageOut.html";





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

//设置出库数据列表
function setOutBoundList(result) {
    var tr = $("#clonedTr1");
    //console.log(result);
    tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
        //console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 仓库号
                    case (1):
                        $(this).html("");
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
                    case (7):
                        $(this).html("");
                        break;
                    //制单人
                    case (8):
                        $(this).html(obj.creator);
                        break;
                    //保管员
                    case (9):
                        $(this).html(obj.guardian);
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
                        $(this).html(obj.handelCategory.name);
                        break;
                        //单据状态
                    case (14):
                        $(this).html(obj.recordState.name);
                        break;
                        //审批状态
                    case (15):
                        $(this).html(obj.checkState.name);
                        break;
                        //备注
                    case (16):
                        $(this).html("");
                        break;
                        //转移联单号
                    case (17):
                        $(this).html(obj.transferDraftId);
                        break;

                    //
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
                if(result.data[0].client!=null){
                    $("#companyName").text(result.data[0].client.companyName);
                }

                // //出库时间
                $('#outBoundDate').text(getDateStr(result.data[0].outboundDate));
                if(result.data[0].laboratoryTest!=null){
                    // //废物名称
                    $('#name').text(result.data[0].laboratoryTest.wastesName);
                }
                if(result.data[0].laboratoryTest!=null){
                    // //废物代码
                    $('#wastesId').text(result.data[0].laboratoryTest.wastesCode);
                }
                // //重量
                 $('#wastesAmount').text(result.data[0].outboundNumber);
                if(result.data[0].quotationItem!=null){
                    if(result.data[0].quotationItem.formType!=null){
                        //物质形态
                        $('#formType').text(result.data[0].quotationItem.formType.name);
                    }
                }
                // //包装形式
                $('#packageType').text("");
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
                $('#processingMethod').text(result.data[0].processWay.name);
                //进料方式
                $('#handelCategory').text(result.data[0].handelCategory.name);
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
    var sqlWords = "select * from t_pl_outboundorder join t_pr_laboratorytest where t_pl_outboundorder.laboratoryTestId=t_pr_laboratorytest.laboratorytestnumber;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 单击查看
 * @param item
 */
function view1(item){
    var outboundOrderId=$(item).parent().parent().children('td').get(5).innerHTML;
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
                if(result.data[0].client!=null){
                    $("#companyName").text(result.data[0].client.companyName);
                }

                // //出库时间
                $('#outBoundDate').text(getDateStr(result.data[0].outboundDate));
                if(result.data[0].laboratoryTest!=null){
                    // //废物名称
                    $('#name').text(result.data[0].laboratoryTest.wastesName);
                }
                if(result.data[0].laboratoryTest!=null){
                    // //废物代码
                    $('#wastesId').text(result.data[0].laboratoryTest.wastesCode);
                }
                // //重量
                $('#wastesAmount').text(result.data[0].outboundNumber);
                if(result.data[0].quotationItem!=null){
                    if(result.data[0].quotationItem.formType!=null){
                        //物质形态
                        $('#formType').text(result.data[0].quotationItem.formType.name);
                    }
                }
                // //包装形式
                $('#packageType').text("");
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
                $('#processingMethod').text(result.data[0].processWay.name);
                //进料方式
                $('#handelCategory').text(result.data[0].handelCategory.name);
                //入库单号
                $("#outboundOrderId").val(result.data[0].outboundOrderId);
                //处置设备
                if(result.data[0].equipment!=null){
                    $('#equipment').text(result.data[0].equipment.name);
                }
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

//作废
function cancel(item) {
    if(confirm("确定作废?")){
        //点击确定后操作
        var outboundOrderId=$(item).parent().parent().children('td').get(5).innerHTML;
        console.log(outboundOrderId);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelOutBoundOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data:{'outboundOrderId':outboundOrderId},
            dataType: "json",
            success:function (result) {
                if (result != undefined && result.status == "success"){
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



}

array=[];//存放所有的tr
array1=[];//存放目标的tr
//危废出库查询
function searchWasteOut() {
    isSearch=false;
    //如果需要按日期范围查询 寻找最早的日期
    var date;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewestDate",                  // url
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

    array.length=0;//清空数组
    array1.length=0;//清空数组
    //1分页模糊查询
    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    isSearch=true;
// console.log(array);
    var text=$.trim($('#searchContent').val());
   //1出库日期
    var outBoundDate=$.trim($('#search-storageDate').val());
    var endDate=$.trim($('#search-endDate').val());
    //2出库数量
    var outBoundNumber=$.trim($('#search-storageQuantity').val());
    //3业务员
    var salesman =$.trim($('#search-storageNumber').val());
    //4进料方式
    var processWay=$.trim($('#search-materialForm option:selected').text());
   var startDate=getDateByStr(outBoundDate);
   var endDate=getDateByStr(endDate);
   console.log(startDate+endDate);
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
          if(startDate.toString()=='Invalid Date'){
              startDate=getDateByStr(date);
          }
          if(endDate.toString()=='Invalid Date'){
              endDate=new Date();
          }
                if(!($(this).children('td').eq(12).text().indexOf(outBoundNumber)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                    &&$(this).children('td').eq(13).text().indexOf(processWay)!=-1&&$(this).children('td').eq(3).text().indexOf(salesman)!=-1
                    &&(getDateByStr($(this).children('td').eq(4).text())<=endDate&&getDateByStr($(this).children('td').eq(4).text())>=startDate)
                )){
                    $(this).hide();
                }
                if(($(this).children('td').eq(12).text().indexOf(outBoundNumber)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                    &&$(this).children('td').eq(13).text().indexOf(processWay)!=-1&&$(this).children('td').eq(3).text().indexOf(salesman)!=-1)
                    &&(getDateByStr($(this).children('td').eq(4).text())<=endDate&&getDateByStr($(this).children('td').eq(4).text())>=startDate)
                ){
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
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }



    // if(outBoundDate.length<=0&&outBoundNumber.length<=0&&processWay.length<0&&outboundOrderId.length<0){
    //     switchPage(1);
    //     $('.myclass').each(function () {
    //         $(this).show();
    //     })
    // }


}

//危废出库粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchOutBound();
            }
        },400);
    });
});

//粗查询
function searchOutBound() {

    isSearch=false;

    //loadOutBoundList();

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
        loadOutBoundList();
    }


}

