/***
 * 采购计划单主页脚本文件
 * */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
var array0=[];
var array=[];
var array1=[];


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
            url: "totalProcurementPlanRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
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
            url: "searchProcurementPlanCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
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
    var total = loadPages(totalRecord, count);
    return total;
}



/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
    addPageClass(pageNumber);           // 设置页码标蓝
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
            url: "getList1",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setCompatibility(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchProcurementPlanCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
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
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber == null || pageNumber == "") {
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
                url: "getList1",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setCompatibility(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }  else {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchProcurementPlanCount",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    // console.log(result);
                    if (result > 0) {
                        totalRecord = result;
                        console.log("总记录数为:" + result);
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

/**页面加载*/
function loadPage() {
    loadNavigationList();   // 设置动态菜单
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
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchData();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",
            url: "getProcurementPlanList",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data:JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    setPageClone(result)
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                }
            },
            error:function (result) {

            }
        });
    }

    //设置物资类别下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialCategoryByDataDictionary",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var materialCategoryItem = $("#search-materialCategoryItem");
                materialCategoryItem.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    materialCategoryItem.append(option);
                });
                materialCategoryItem.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    isSearch = false;
}


/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setProcurementPlan(result);
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
            addAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");

}

//设置采购单数据
function setProcurementPlan(result) {
    var tr = $('#cloneTr');

    tr.siblings().remove();

    $.each(result.data, function (index, item) {
        var data = eval(item);
        // console.log(data)
        var clonedTr = tr.clone();
        clonedTr.attr('class','myclass');
        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {

            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (1):
                    $(this).html(index + 1);
                    break;

                //月度采购计划单号
                case (2):
                    $(this).html(data.procurementPlanId);
                    break;
                //申请月份
                case(3):
                    $(this).html(data.applyMouth);
                    break;

                // 创建人
                case (4):
                    $(this).html(data.createName);
                    break;

                //创建日期
                case (5):
                    $(this).html(getDateStr(data.createDate));
                    break;

                // 修改人
                case (6):
                    $(this).html((data.adjustName));
                    break;

                //修改日期
                case (7):
                    $(this).html(getDateStr(data.adjustDate));
                    break;

                // 审批人
                case (8):
                    $(this).html(data.approvalName);
                    break;
                // 状态
                case (9):
                    if(data.checkStateItem!=null){
                        $(this).html(data.checkStateItem.dictionaryItemName);
                    }

                    break;


            }
            clonedTr.removeAttr("id");
            // if(clonedTr.children('td').eq(8).html()=='已作废'){
            //     $(clonedTr).hide();
            // }
            clonedTr.insertBefore(tr);
        });
        //把克隆好的tr追加到原来的tr前面
        // 隐藏无数据的tr

        tr.hide();




    });
}

//查看
function viewProcurementPlan(item) {
    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
    $('#appointModal2').modal('show')
    $.ajax({
        type: "POST",
        url: "getProcurementPlanById",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                  console.log(result)
                if(result.data!=null){
                    setViewModal(result.data)
                    if(result.data.checkStateItem!=null){
                        $('#checkState').text(result.data.checkStateItem.dictionaryItemName);
                    }

                }


            }
        },
        error:function (result) {
            
        }
        
    })
}
//设置查看模态框数据
function setViewModal(result) {

    var tr = $('#cloneTr2');

    tr.siblings().remove();

    $.each(result.procurementPlanItemList,function (index,item) {

        var obj = eval(item);

        var clonedTr = tr.clone();

        clonedTr.show();

            //序号
            $(clonedTr).children('td').eq(0).html(index+1)
        //物资名称
          $(clonedTr).children('td').eq(1).html(obj.suppliesName)
        //规格型号
        $(clonedTr).children('td').eq(2).html(obj.specifications)
        //申购部门
        $(clonedTr).children('td').eq(3).html(obj.proposer)
        //需求数量
        $(clonedTr).children('td').eq(4).html(obj.demandQuantity)
        //单位
        if(obj.unitDataItem!=null){
            $(clonedTr).children('td').eq(5).html(obj.unitDataItem.dictionaryItemName)
        }
        //单价
        $(clonedTr).children('td').eq(6).html(obj.price.toFixed(2))
        //统计金额
        $(clonedTr).children('td').eq(7).html(obj.priceTotal.toFixed(2))
        if(obj.materialCategoryItem!=null){
            $(clonedTr).children('td').eq(8).html(obj.materialCategoryItem.dictionaryItemName)
        }
        //备注
        $(clonedTr).children('td').eq(9).html(obj.remarks)
            clonedTr.removeAttr('id');
            clonedTr.insertBefore(tr);


        tr.hide();
    })
    
    
}

//修改
function procurementPlanModify(item) {

    var checkState=$(item).parent().parent().children('td').eq(9).html();
    if(checkState=='待提交'){
        var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
        $('#procurementPlanIdAdjust').val(procurementPlanId)
        $('#appointModal3').modal('show')
        $.ajax({
            type: "POST",
            url: "getProcurementPlanById",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data:{"procurementPlanId":procurementPlanId},
            dataType: "json",
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    setAdjustModal(result.data)
                    $('#adjustName').val(result.data.adjustName);
                    $('#adjustDate').val(getDateStr(result.data.adjustDate));
                }
            },
            error:function (result) {

            }

        })
    }
    else {alert("只可修改待提交的数据！")}

}

//设置修改模态框数据
function setAdjustModal(result) {


    var tr = $('#cloneTr3');

    tr.siblings().remove();

    $.each(result.procurementPlanItemList,function (index,item) {

        var obj = eval(item);

        var clonedTr = tr.clone();

        clonedTr.show();

        clonedTr.attr('class','myclass3')
        //序号
        $(clonedTr).children('td').eq(0).html(index+1)
        //物资名称
        $(clonedTr).children('td').eq(1).html(obj.suppliesName)
        //规格型号
        $(clonedTr).children('td').eq(2).html(obj.specifications)
        //申购部门
        $(clonedTr).children('td').eq(3).html(obj.proposer)
        //需求数量
        $(clonedTr).children('td').eq(4).find('input').val(obj.demandQuantity)
        //单位
        if(obj.unitDataItem!=null){
            $(clonedTr).children('td').eq(5).html(obj.unitDataItem.dictionaryItemName)
        }
        //单价
        $(clonedTr).children('td').eq(6).find('input').val(obj.price.toFixed(2))
        //统计金额
        $(clonedTr).children('td').eq(7).html(obj.priceTotal.toFixed(2))
        //备注
        $(clonedTr).children('td').eq(8).html(obj.remarks)
             if(obj.materialCategoryItem!=null){
                 $(clonedTr).children('td').eq(9).html(obj.materialCategoryItem.dictionaryItemName)
             }
        $(clonedTr).children('td').eq(10).html(obj.id)

        $('#procurementPlanId').val(obj.procurementPlanId);
        clonedTr.removeAttr('id');
        clonedTr.insertBefore(tr);


        tr.hide();
    })


    if(array0.length==0){
        $('.myclass3').each(function () {
            array0.push(this)
        })
    }

}

//需求数量输入框的计算
function Cal(item) {

    var demandQuantity=$(item).val();
    if(demandQuantity.length<0){
        demandQuantity=0;
    }
    if(isNaN(demandQuantity)){
        demandQuantity=0
    }
    if(!isNaN(demandQuantity)){
        var price=$(item).parent().next().next().find('input').val();
        if(price.length<0){
            price=0;
        }
        if(isNaN(price)){
            price=0
        }
        if(!isNaN(price)){
            var priceTotal=parseFloat(demandQuantity)*parseFloat(price);
            $(item).parent().next().next().next().html(parseFloat(priceTotal).toFixed(2))
        }

    }


}

//单价输入框计算
function Cal2(item) {
    var price=$(item).val();
    if(price.length<0){
        price=0;
    }
    if(isNaN(price)){
        price=0
    }
    if(!isNaN(price)){
        var demandQuantity=$(item).parent().prev().prev().find('input').val();

        if(demandQuantity.length<0){
            demandQuantity=0;
        }
        if(isNaN(demandQuantity)){
            demandQuantity=0
        }
        if(!isNaN(demandQuantity)){
            var priceTotal=parseFloat(demandQuantity)*parseFloat(price);
            $(item).parent().next().html(parseFloat(priceTotal).toFixed(2))
        }


    }


}

//确认修改
function confirmAdjust() {
  //先更新主表
    var data={
        procurementPlanId:$('#procurementPlanId').val(),
        adjustName:$('#adjustName').val(),
        adjustDate:$('#adjustDate').val(),
    }
    $.ajax({
        type: "POST",
        url: "adjustProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                $('.myclass3').each(function () {
                    var dataItem={
                        id:$(this).children('td').eq(10).html(),
                        demandQuantity:$(this).children('td').eq(4).find('input').val(),
                        price:$(this).children('td').eq(6).find('input').val(),
                        priceTotal:$(this).children('td').eq(7).html(),
                    }

                   $.ajax({
                       type: "POST",
                       url: "adjustProcurementPlanItem",
                       async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                       data:JSON.stringify(dataItem),
                       dataType: "json",
                       contentType: 'application/json;charset=utf-8',
                       success:function (result) {

                       },
                       error:function (result) {

                       }
                   })


                })
                alert("修改成功")
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#appointModal3").modal("hide");
            }
        },
        error:function (result) {
            
        }
    })
    console.log(data)


}


//提交
function submitProcurementPlan(item) {
    initSubmitFName(submitProcurementPlan1.name);
    if(confirm("确认提交?")){
        //点击确定后操作
        var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
        publicSubmit(procurementPlanId, getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
        // $.ajax({
        //     type: "POST",
        //     url: "submitProcurementPlan",
        //     async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        //     data:{"procurementPlanId":procurementPlanId},
        //     dataType: "json",
        //     //contentType: 'application/json;charset=utf-8',
        //        success:function (result) {
        //            if (result != undefined && result.status == "success"){
        //                alert(result.message)
        //                window.location.reload()
        //            }
        //            else {
        //                alert(result.message)
        //            }
        //        },
        //     error:function (result) {
        //         alert('服务器异常')
        //     }
        // })


    }
}

function submitProcurementPlan1(id) {
    $.ajax({
        type: "POST",
        url: "submitProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":id},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message)
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
            }
            else {
                alert(result.message)
            }
        },
        error:function (result) {
            alert('服务器异常')
        }
    })
}

//审批模态框显示
function approvalProcurementPlan() {

    // var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();
    //
    // $('#procurementPlanId2').text(procurementPlanId)
    //
    // $.ajax({
    //     type: "POST",
    //     url: "getProcurementPlanById",
    //     async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
    //     data:{"procurementPlanId":procurementPlanId},
    //     dataType: "json",
    //     //contentType: 'application/json;charset=utf-8',
    //     success:function (result) {
    //         if (result != undefined && result.status == "success"){
    //             console.log(result)
    //             $('#approvalName').val(result.data.approvalName);
    //             $('#advice').val(result.data.advice)
    //         }
    //     },
    //     error:function (result) {
    //
    //     }
    //
    // })


    $('#approval2').modal('show');




}

//审批通过
function confirmProcurementPlan(id) {

    var procurementPlanId= $('#procurementPlanId2').text();

    var approvalName =$('#approvalName').val();

    var advice=$('#advice').val();


    $.ajax({
        type: "POST",
        url: "approvalProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":id,'approvalName':approvalName,'advice':advice},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message)
                window.location.reload()
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert('服务器异常！');
        }
    })

}

//驳回模态框显示
function backProcurementPlan(item) {
    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();

    $('#procurementPlanId3').text(procurementPlanId)

    $.ajax({
        type: "POST",
        url: "getProcurementPlanById",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":procurementPlanId},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                // $('#approvalName').val(result.data.approvalName);
                $('#advice2').val(result.data.advice)
            }
        },
        error:function (result) {

        }

    })


    $('#contractInfoForm3').modal('show');
}

//确认驳回
function back(id) {

    var procurementPlanId= $('#procurementPlanId3').text();


    var advice=$('#advice2').val();


    $.ajax({
        type: "POST",
        url: "backProcurementPlan",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"procurementPlanId":id,'advice':advice},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                // alert(result.message)
                // window.location.reload()
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert('服务器异常！');
        }
    })


}

//作废采购计划单
function cancelProcurementPlan(item) {
    var procurementPlanId=$(item).parent().parent().children('td').eq(2).html();

    if(confirm("确定作废该计划单?")){
        //点击确定后操作
         $.ajax({
             type: "POST",
             url: "cancelProcurementPlanById",
             async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
             data:{"procurementPlanId":procurementPlanId},
             dataType: "json",
             //contentType: 'application/json;charset=utf-8',
             success:function (result) {
                 if (result != undefined && result.status == "success"){
                     console.log(result)
                     alert(result.message)
                     $("#pageNumber").val(currentPage);   // 设置当前页页数
                     inputSwitchPage();  // 跳转当前页
                 }
             },
             error:function (result) {

             }
         })
    }
}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },600);
    });
});

//查询
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        var  checkState=$('#search-checkState').val()
        if(checkState.length<=0){
            checkState=null;
        }
        var applyMouth=$('#year').val()+"-"+$('#applyMonth option:selected').text();
        data1 = {
            applyMouth:applyMouth,
            procurementPlanId:$('#search-procurementPlanId').val(),
            adjustName:$('#search-adjustName').val(),
            approvalName:$('#search-approvalName').val(),
            createName:$('#search-createName').val(),
            page: page,
            checkStateItem:{dataDictionaryItemId:checkState},
            createDateStart:$('#search-createDateStart').val(),
            createDateEnd:$('#search-createDateEnd').val(),
            adjustDateStart:$('#search-adjustDateStart').val(),
            adjustDateEnd:$('#search-adjustDateEnd').val(),
            materialCategoryItem:{dataDictionaryItemId:$('#search-materialCategoryItem').val()}

        };
    }
    else{
        var keywords = $.trim($("#searchContent").val());

        data1 = {
            page: page,
            keywords: keywords
        }
    }
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchProcurementPlan",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    setPageClone(result)
                } else {
                    alert(result.message);

                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

//修改模态框页面的查询
function adjustSearch() {
 //    $('#tbody1').find('.myclass3').hide();
 //    array.length=0;//清空数组
 //
 //    array1.length=0;//清空数组
 //
 //    array=[].concat(array0);
 //
 //    console.log(array)
 //
 //    var  suppliesName=$('#search-suppliesName').val();
 //
 //    var  specifications=$('#search-specifications').val();
 //
 //    var  proposer=$('#search-proposer').val();
 //
 //
 //    for (var j = 0; j < array.length; j++) {
 //        $.each(array[j], function () {
 //            //console.log(this);
 //            if (!($(this).children('td').eq(1).text().indexOf(suppliesName) != -1 && $(this).children('td').eq(2).text().indexOf(specifications) != -1&& $(this).children('td').eq(3).text().indexOf(proposer) != -1
 //            )) {
 //                $(this).hide();
 //            }
 //            if (($(this).children('td').eq(1).text().indexOf(suppliesName) != -1 && $(this).children('td').eq(2).text().indexOf(specifications) != -1&& $(this).children('td').eq(3).text().indexOf(proposer) != -1
 //            )) {
 //                array1.push($(this));
 //            }
 //        });
 //    }
 // console.log(array1)
 //    for(var i=0;i<array1.length;i++){
 //        $.each(array1[i],function () {
 //            $('#tbody1').append(this) ;
 //        });
 //    }

    var data={
        suppliesName:$('#search-suppliesName').val(),
        specifications:$('#search-specifications').val(),
        proposer:$('#search-proposer').val(),
        procurementPlanId:$('#procurementPlanIdAdjust').val()
    };

    $.ajax({
        type: "POST",                            // 方法类型
        url: "searchAdjust",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined && result.status == "success") {
                setAdjustModal(result)
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}

//修改页面重置
function resetAdjust() {
    $('#search-suppliesName').val("")
    $('#search-specifications').val("")
    $('#search-proposer').val("")
}


//导出
function exportExcel() {
    var name = 't_pr_procumentplan';

    var idArry = [];//存放主键
    var items = $("input[name='select']:checked");//判断复选框是否选中

    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select a.procurementPlanId,a.createName,a.createDate,a.adjustName,a.adjustDate,a.approvalName,b.suppliesName,b.specifications,b.proposer,b.demandQuantity,c.dictionaryItemName,b.price,b.priceTotal,b.remarks  from  t_pr_procumentplan a  join t_pr_procumentplanitem b on  a.procurementPlanId=b.procurementPlanId join datadictionaryitem c on c.dataDictionaryItemId=b.unitId   " ;
        window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
    }

    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().next().html());        // 将选中项的编号存到集合中
            }
        });
        console.log(idArry)
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += idArry[i] + ",";
                else if (i == idArry.length - 1) sql += idArry[i] + ");"
            }
            var sqlWords = "select a.procurementPlanId,a.createName,a.createDate,a.adjustName,a.adjustDate,a.approvalName,b.suppliesName,b.specifications,b.proposer,b.demandQuantity,c.dictionaryItemName,b.price,b.priceTotal,b.remarks  from  t_pr_procumentplan a  join t_pr_procumentplanitem b on  a.procurementPlanId=b.procurementPlanId join datadictionaryitem c on c.dataDictionaryItemId=b.unitId  and a.procurementPlanId " + sql;

        }
        console.log(sqlWords)
        window.open('exportExcelProcurementPlan?name=' + name + '&sqlWords=' + sqlWords);
    }




}

//打印
function print() {
    if($('#checkState').text()=='审批通过'){
        //打印模态框
        $("#footer").hide();
        $("#printThis").printThis({
            // debug: false,             // 调试模式下打印文本的渲染状态
            // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
            // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
            // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
            // copyTagClasses: true
        });
    }
    else {
        alert("只可打印审批通过的单据!")
    }
}

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(submitProcurementPlan1.name);
    initApprovalFName(confirmProcurementPlan.name);
    initBakcFName(back.name);
    var id=$(item).parent().parent().children("td").eq(2).html();
    $('#ApprovalOrderId').text(id);
    $.ajax({
        type: "POST",
        url: "getAllChildNode",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'orderId': id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                if(result.data!=null){
                    setApprovalModal(result.data);
                    $("#approval").modal('show');
                }

            }
            else {
                alert('未提交，无法审批！')
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    });

}