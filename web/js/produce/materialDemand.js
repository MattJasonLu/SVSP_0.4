/*********************
 * jackYang
 */

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
/**
 * 重置页面功能
 */
function reset() {
    window.location.reload();
}

/*获得最新一期的物料需求*/
function getNewest() {
    $.ajax({
        type:"POST",
        url:"getMaterialList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result !== undefined && result.status === "success"){
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
            url: "totalMaterRecord",                  // url
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
    }
    else {
        console.log(data1)
        if(data1.keywords==undefined){//高级查询
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchMaterialRequireItemCount",                  // url
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
        if(data1.keywords!=undefined){
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchMaterialRequireCount",                  // url
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


    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setMaterialList(result.array);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getMaterialList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                   setPageClone(result);
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
        data1['page'] = page;
        if(data1.keywords==undefined){ //高级查询
            console.log("进来了")
            $.ajax({
                type: "POST",                            // 方法类型
                url: "searchMaterialRequireItem",                 // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success"){
                        // setCompatibility(result)
                        setMaterialList(result.array)
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
        if(data1.keywords!=undefined){
            $.ajax({
                type: "POST",                            // 方法类型
                url: "searchMaterialRequire",                 // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success"){
                        setMaterialList(result.array)
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
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getMaterialList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPageClone(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            if(data1.keywords==undefined){ //高级查询
                console.log("进来了")
                $.ajax({
                    type: "POST",                            // 方法类型
                    url: "searchMaterialRequireItem",                 // url
                    async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: JSON.stringify(data1),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success"){
                            setMaterialList(result.array)
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
            if(data1.keywords!=undefined){
                $.ajax({
                    type: "POST",                            // 方法类型
                    url: "searchMaterialRequire",                 // url
                    async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: JSON.stringify(data1),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success"){
                            setMaterialList(result.array)
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


/*加载物料需求列表*/
function loadPageMaterialList() {
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

    $.ajax({
        type:"POST",
        url:"getMaterialList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result !== undefined && result.status === "success"){
                console.log(result);
                var obj=result.array;
                //设置下拉框数据
                setPageClone(result)
                // setMaterialList(obj,n);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });
    isSearch = false;
    //加载高级查询的数据
    //物质形态和包装方式
    $.ajax({
        type:"POST",
        url:"getFormTypeAndPackageType",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined){
              var formType=$("#search-formType");
                formType.children().remove();
                $.each(result.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;

                var packageType=$('#search-packageType');
                packageType.children().remove();
                $.each(result.packageTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = -1;









            }
            else {
                alert(result.message);
            }
        },
    });

    //进料方式
    $.ajax({
        type:"POST",
        url:"getHandleCategory",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined){
                var handleCategory=$("#search-handleCategory");
                handleCategory.children().remove();
                $.each(result.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = -1;












            }
            else {
                alert(result.message);
            }
        },
    });


}
/*加载表格数据*/
function setMaterialList(result) {
    var tr = $("#cloneTr1");//克隆一行
    //tr.siblings().remove();
    //每日配比量合计
   // tr.siblings().remove();
    tr.siblings().remove();
    $.each(result, function (index, item) {
        var data = eval(item);
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
                //物料单号
                case (2):
                    $(this).html(data.materialRequireId);
                    break;
                // 周生产计划总量
                case (3):
                    $(this).html((data.weeklyDemandTotal).toFixed(1));
                    break;
                //目前库存总量
                case (4):
                    $(this).html(data.currentInventoryTotal.toFixed(1));
                    break;
                // 安全库存总量
                case (5):
                    $(this).html(data.safetyTotal.toFixed(1));
                    break;
                //市场采购总量
                case (6):
                    $(this).html(data.marketPurchasesTotal.toFixed(1));
                    break;
                // 热值平均
                case (7):
                    $(this).html(data.calorificAvg.toFixed(1));
                    break;
                // 灰分平均
                case (8):
                    $(this).html(data.ashAvg.toFixed(1));
                    break;
                //水分平均
                case (9):
                    $(this).html(data.waterAvg.toFixed(1));
                    break;
                //S平均
                case (10):
                    $(this).html(data.sAvg.toFixed(1));
                    break;
                //CL平均
                case (11):
                    $(this).html(data.clAvg.toFixed(1));
                    break;
                //P平均
                case (12):
                    $(this).html(data.pAvg.toFixed(1));
                    break;
                //F平均
                case (13):
                    $(this).html(data.fAvg.toFixed(1));
                    break;
                //PH平均
                case (14):
                    $(this).html(data.phAvg.toFixed(1));
                    break;
                //状态
                case (15):
                    if (data.checkState != null) {
                        $(this).html(data.checkState.name);
                    }
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);

    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeClass("myclass")

}
//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}
/*导入物料需求*/
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importMaterialRequireIdExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result.status == "success") {
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
/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'model/materialDemand.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}
/**
 *
 * 导出
 * @returns {string}
 */
function exportExcel() {
    console.log("export");
    var name = 't_pr_materialrequire';
    var sqlWords = "select * from t_pr_materialrequire;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}
/*
* 操作行选定*/
function selected2(item) {
    //1获得表单编号
    var id = item.firstElementChild.innerHTML;
    if ($(item).css('background-color') == 'rgb(127, 255, 212)') {
        $(item).css('background-color', "");
        //删除所选Id
        arrayId.pop(id);
    }
    else {
        if (arrayId.length == 0) {
            arrayId.push(id);
        }
        if (arrayId.length == 1) {
            $(item).css("background", 'Aquamarine').siblings().css("background", "");
            arrayId.length = 0;
            arrayId.push(id);
        }
    }
}

/*
* 审批*/
function approvalMa(item){


    $.ajax({
        type: "POST",
        url: "getMaterialRequireByMaterialRequireId",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'materialRequireId': $(item).parent().parent().children('td').eq(2).html()},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //赋值配伍单号
             $("#remarks").val(result.data.opinion);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });

    $('#materialRequireId').text($(item).parent().parent().children('td').eq(2).html())



    $('#contractInfoForm2').modal('show');


    // $.ajax({
    //     type: "POST",
    //     url: "backMa",
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     data: {'id': id, 'remarks': remarks,},
    //     success: function (result) {
    //         if(result != undefined && result.status == "success"){
    //             alert(result.message);
    //             console.log(result);
    //             window.location.reload();
    //         }
    //         else {
    //             alert(result.message)
    //         }
    //     },
    //     error: function (result) {
    //         alert("服务器异常！")
    //     }
    // });


}

/*驳回*/
function backMa() {
    id=arrayId[0];
    $("#back1").show();
    $("#confirm").hide();
    if(arrayId.length==1){
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getByMrId",         // url
            // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {"id":id.toString()},
            dataType: "json",
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    var obj=result.data;
                    console.log(obj);
                    //赋值
                    //物料编号
                    $("#materialRequireId").text(obj.materialRequireId);
                    //序号
                    $("#id").text(obj.id);
                    $('#advice').text(obj.approvalContent);
                    //驳回意见
                    $("#remarks").text(obj.remarks);
                    $("#contractInfoForm2").modal('show');
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
    else {
        alert("请选择数据！")
    }
}

//把按钮功能分出来做这个是审批
function confirm2() {
    var materialRequireId=$('#materialRequireId').text();
    var opinion=$('#remarks').val();
    $.ajax({
        type: "POST",
        url: "approvalMa",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'materialRequireId': materialRequireId, 'opinion': opinion,},
        success: function (result) {
            if(result != undefined && result.status == "success"){
                alert(result.message);
                console.log(result);
                window.location.reload();
            }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });


}

//把按钮功能分出来做这个是驳回
function back2() {
    remarks = $('#remarks').val();
    $.ajax({
        type: "POST",
        url: "backMa",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'id': id, 'remarks': remarks,},
        success: function (result) {
            if(result != undefined && result.status == "success"){
                alert(result.message);
                console.log(result);
                window.location.reload();
            }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });

}

/*时间显示*/
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var days = new Date();
    days.setFullYear(year);
    days.setMonth(month);
    days.setDate(1);
    if(obj.getDay() <= days.getDay()){
        var week = parseInt(day / 7) + a + 1;
    }else {
        week = parseInt(day / 7) + a;
    }
    return year + "年" + month + "月第" + week + "周";
}

/*提交功能*/
function submitMa() {
    var items = $("input[name='select']:checked");//判断复选框是否选中

    if(items.length>0){
        if(confirm("确认提交?")){
            $.each(items,function () {
                if($(this).parent().parent().next().next().html().length>0){
                   var materialRequireId=$(this).parent().parent().next().next().html();
                   //提交方法
                    $.ajax({
                        type: "POST",
                        url: "submitByMrId",
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data: {'materialRequireId': materialRequireId},
                        success: function (result) {
                            if(result != undefined && result.status == "success"){
                                console.log(result);
                            }
                            else {
                                alert(result.message)
                            }
                        },
                        error: function (result) {
                            alert("服务器异常！")
                        }
                    });
                }
            })


        }
        alert('提交成功!')
        window.location.reload();
    }
    else {
        alert("请勾选数据！")
    }



}
/*作废*/
function cancelMa(item) {

    var materialRequireId=$(item).parent().parent().children('td').eq(2).html();
    if(confirm("确认作废?")){
     //作废方法
        $.ajax({
            type: "POST",
            url: "cancelByMrId",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'materialRequireId': materialRequireId},
            success: function (result) {
                if(result != undefined && result.status == "success"){
                    console.log(result);
                    alert(result.message)
                    window.location.reload();
                }
                else {
                    alert(result.message)
                }
            },
            error: function (result) {
                alert("服务器异常！")
            }
        });

    }


}
/*修改页面*/
function adjustMa() {
    $("#editBtnGrp").removeClass("hidden");
    $("#editBtnGrp").addClass("show");
    var td=$("td[name='123']");//找到指定的单元格
    td.each(function () {
        var content = $(this).html();//获得内容
        var name = $(this).attr('name');
        if (name.search("123") != -1) {
            $(this).attr('name', '');
            $(this).html("<input type='text' style='width: 100px;' value='" + content + "' name='count'>");
        }
    });
    //取消按钮点击是刷新
    $("#editBtnCancel").click(function () {
        window.location.reload();
    });
    $("#editBtnSave").click(function () {
     //1遍历指定的行
        $(".myclass").each(function(){
           var id=this.firstElementChild.innerHTML;//获得编号
            var marketPurchases=$(this.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild).val();
            //当前采购量
          //进行批量更新
            console.log(id+"==>"+marketPurchases);
            updatemarketPur(id,marketPurchases);
        });
        alert("更新成功！");
        window.location.reload();
    });
}
//更新采购量
function updatemarketPur(id,marketPurchases) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updatemarketPurchases",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{"id":id,"marketPurchases":marketPurchases},
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });


}

/*确认修改*/
function modify() {
    var data=$("#materialInfoForm").serialize();
    console.log(data);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getForm",         // url
        // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{"data":data},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message);
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
 * 点击图标查看
 */
function view1(item) {
    var materialRequireId=$(item).parent().parent().children('td').eq(2).html();

    $.ajax({
        type: "POST",
        url: "getMaterialRequireById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'materialRequireId': materialRequireId},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //赋值配伍单号
                $('#materialRequireId1').text(materialRequireId);
                setCompatibilityModal(result.materialRequireItemList);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });

    $('#appointModal2').modal('show');

}

/**
 * 设置查看模态框
 */
function setCompatibilityModal(result) {

    var tr = $('#cloneTr');

    tr.siblings().remove();
    var weeklyDemandTotal=0;
    var currentInventoryTotal=0;
    var safetyTotal=0;
    var marketPurchasesTotal=0;
    var calorificMaxTotal=0;
    var calorificMinTotal=0;
    var ashMaxTotal=0;
    var ashMinTotal=0;
    var waterMaxTotal=0;
    var waterMinTotal=0;
    var clMaxTotal=0;
    var clMinTotal=0;
    var sMaxTotal=0;
    var sMinTotal=0;
    var pMaxTotal=0;
    var pMinTotal=0;
    var fMaxTotal=0;
    var fMinTotal=0;
    var phMaxTotal=0;
    var phMinTotal=0;
    $.each(result,function (index,item) {
        var obj = eval(item);

        var clonedTr = tr.clone();

        clonedTr.show();

        clonedTr.children('td').each(function (inner_index) {

            switch (inner_index) {
                //序号
                case (0):
                    $(this).html(index + 1);
                    break;

                //进料方式
                case (1):
                    if (obj.handleCategory != null) {
                        $(this).html(obj.handleCategory.name);
                    }
                    break;

                //物质形态
                case (2):
                    if (obj.formType != null) {
                        $(this).html(obj.formType.name);
                    }
                    break;
                //包装方式
                case (3):
                if(obj.packageType!=null){
                    $(this).html(obj.packageType.name);
                }

                    break;
                //周生产计划量
                case (4):
                    $(this).html(obj.weeklyDemand.toFixed(1));
                    weeklyDemandTotal+=parseFloat(obj.weeklyDemand)
                    break;
                //目前库存量
                case (5):
                    $(this).html(obj.currentInventory.toFixed(1));
                    currentInventoryTotal+=parseFloat(obj.currentInventory)
                    break;
                //安全库存量
                case (6):
                    $(this).html(obj.safety.toFixed(1));
                    safetyTotal+=parseFloat(obj.safety)
                    break;
                //市场采购量
                case (7):
                    $(this).html(obj.marketPurchases.toFixed(1));
                    marketPurchasesTotal+=parseFloat(obj.marketPurchases)
                    break;
                //热值Max
                case (8):
                    $(this).html(obj.calorificMax.toFixed(1));
                    calorificMaxTotal+=parseFloat(obj.calorificMax)
                    break;
                //热值Min
                case (9):
                    $(this).html(obj.calorificMin.toFixed(1));
                    calorificMinTotal+=parseFloat(obj.calorificMin)
                    break;
                //灰分Max
                case (10):
                    $(this).html(obj.ashMax.toFixed(1));
                    ashMaxTotal+=parseFloat(obj.ashMax)
                    break;
                //灰分Min
                case (11):
                    $(this).html(obj.ashMin.toFixed(1));
                    ashMinTotal+=parseFloat(obj.ashMin)
                    break;
                //水分Max
                case (12):
                    $(this).html(obj.waterMax.toFixed(1));
                    waterMaxTotal+=parseFloat(obj.waterMax)
                    break;
                //水分Min
                case (13):
                    $(this).html(obj.waterMin.toFixed(1));
                    waterMinTotal+=parseFloat(obj.waterMin)
                    break;
                    //氯Max
                case (14):
                    $(this).html(obj.clMax.toFixed(1));
                    clMaxTotal+=parseFloat(obj.clMax)
                    break;
                    //氯Min
                case (15):
                    $(this).html(obj.clMin.toFixed(1));
                    clMinTotal+=parseFloat(obj.clMin)
                    break;
                    //硫Max
                case (16):
                    $(this).html(obj.sMax.toFixed(1));
                    sMaxTotal+=parseFloat(obj.sMax)
                    break;
                    //硫Min
                case (17):
                    $(this).html(obj.sMin.toFixed(1));
                    sMinTotal+=parseFloat(obj.sMin)
                    break;
                    //磷Max
                case (18):
                    $(this).html(obj.pMax.toFixed(1));
                    pMaxTotal+=parseFloat(obj.pMax)
                    break;
                    //磷Min
                case (19):
                    $(this).html(obj.pMin.toFixed(1));
                    pMinTotal+=parseFloat(obj.pMin)
                    break;
                    //氟Max
                case (20):
                    $(this).html(obj.fMax.toFixed(1));
                    fMaxTotal+=parseFloat(obj.fMax)
                    break;
                    //氟Min
                case (21):
                    $(this).html(obj.fMin.toFixed(1));
                    fMinTotal+=parseFloat(obj.fMin)
                    break;
                    //酸碱度Max
                case (22):
                    $(this).html(obj.phMax.toFixed(1));
                    phMaxTotal+=parseFloat(obj.phMax)
                    break;
                    //酸碱度MaxMin
                case (23):
                    $(this).html(obj.phMin.toFixed(1));
                    phMinTotal+=parseFloat(obj.phMin);
                    break;

            }
            clonedTr.removeAttr('id');
            clonedTr.insertBefore(tr);

        })

        tr.hide();


    })
    $("#weeklyDemandTotal").html(weeklyDemandTotal.toFixed(1));
    $("#currentInventoryTotal").html(currentInventoryTotal.toFixed(1));
    $("#safetyTotal").html(safetyTotal.toFixed(1));
    $("#marketPurchasesTotal").html(marketPurchasesTotal.toFixed(1));
    $("#calorificMaxTotal").html(calorificMaxTotal.toFixed(1));
    $("#calorificMinTotal").html(calorificMinTotal.toFixed(1));
    $("#ashMaxTotal").html(ashMaxTotal.toFixed(1));
    $("#ashMinTotal").html(ashMinTotal.toFixed(1));
    $("#waterMaxTotal").html(waterMaxTotal.toFixed(1));
    $("#waterMinTotal").html(waterMinTotal.toFixed(1));
    $("#clMaxTotal").html(clMaxTotal.toFixed(1));
    $("#clMinTotal").html(clMinTotal.toFixed(1));
    $("#sMaxTotal").html(sMaxTotal.toFixed(1));
    $("#sMinTotal").html(sMinTotal.toFixed(1));
    $("#pMaxTotal").html(pMaxTotal.toFixed(1));
    $("#pMinTotal").html(pMinTotal.toFixed(1));
    $("#fMaxTotal").html(fMaxTotal.toFixed(1));
    $("#fMinTotal").html(fMinTotal.toFixed(1));
    $("#phMaxTotal").html(phMaxTotal.toFixed(1));
    $("#phMinTotal").html(phMinTotal.toFixed(1));


}

//修改功能
function adjust(item) {
var materialRequireId=$(item).parent().parent().children('td').eq(2).html();

    localStorage.materialRequireId = materialRequireId;
    window.location.href = "adjustMaterialDemand.html";
}


//修改页面初始化

function adjustMater() {
    var materialRequireId = localStorage['materialRequireId'];

    $("#materialRequireId").text(materialRequireId);

    $.ajax({
        type: "POST",
        url: "getMaterialRequireById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'materialRequireId': materialRequireId},
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success") {
                       console.log(result)
                var tr = $('#cloneTr2');
                $('#cloneTr2').siblings().remove();
                $.each(result.materialRequireItemList,function (index,item) {
                    var obj = eval(item);

                    var cloneTr = tr.clone();

                    cloneTr.attr('class', 'myclass2');
                    cloneTr.show();

                    cloneTr.children('td').eq(0).html(index + 1);

                    cloneTr.children('td').eq(4).children('input').val(obj.weeklyDemand);

                    cloneTr.children('td').eq(5).children('input').val(obj.currentInventory);

                    cloneTr.children('td').eq(6).children('input').val(obj.safety);

                    cloneTr.children('td').eq(7).children('input').val(obj.marketPurchases);

                    cloneTr.children('td').eq(8).children('input').val(obj.calorificMax);

                    cloneTr.children('td').eq(9).children('input').val(obj.calorificMin);

                    cloneTr.children('td').eq(10).children('input').val(obj.ashMax);

                    cloneTr.children('td').eq(11).children('input').val(obj.ashMin);

                    cloneTr.children('td').eq(12).children('input').val(obj.waterMax);

                    cloneTr.children('td').eq(13).children('input').val(obj.waterMin);

                    cloneTr.children('td').eq(14).children('input').val(obj.clMax);

                    cloneTr.children('td').eq(15).children('input').val(obj.clMin);

                    cloneTr.children('td').eq(16).children('input').val(obj.sMax);

                    cloneTr.children('td').eq(17).children('input').val(obj.sMin);

                    cloneTr.children('td').eq(18).children('input').val(obj.pMax);

                    cloneTr.children('td').eq(19).children('input').val(obj.pMin);

                    cloneTr.children('td').eq(20).children('input').val(obj.fMax);

                    cloneTr.children('td').eq(21).children('input').val(obj.fMin);

                    cloneTr.children('td').eq(22).children('input').val(obj.phMax);

                    cloneTr.children('td').eq(23).children('input').val(obj.phMin);

                    if(obj.handleCategory != null){
                        $.ajax({
                            type: 'POST',
                            url: "getHandleCategory",
                            //data:JSON.stringify(data),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined) {
                                    // console.log(result);
                                    var handelCategory = cloneTr.children('td').eq(1).children('select');
                                    handelCategory.children().remove();
                                    $.each(result.handleCategoryList, function (index, item) {
                                        var option = $('<option/>');
                                        option.val(item.index);
                                        option.text(item.name);
                                        handelCategory.append(option);
                                    });
                                    handelCategory.get(0).selectedIndex = item.handleCategory.index - 1;
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

                    if (item.formType != null) {
                        //形态
                        $.ajax({
                            type: 'POST',
                            url: "getFormTypeAndPackageType",
                            //data:JSON.stringify(data),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined) {
                                    // console.log(result);
                                    var formType = cloneTr.children('td').eq(2).children('select');
                                    formType.children().remove();
                                    $.each(result.formTypeList, function (index, item) {
                                        var option = $('<option/>');
                                        option.val(item.index);
                                        option.text(item.name);
                                        formType.append(option);
                                    });
                                    formType.get(0).selectedIndex = obj.formType.index - 1;
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                console.log(result);
                            }

                        });
                        //cloneTr.children('td').eq(2).children('select').selectedIndex=3;
                    }

                    if(obj.packageType!=null){
                        //包装
                        $.ajax({
                            type: 'POST',
                            url: "getFormTypeAndPackageType",
                            //data:JSON.stringify(data),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined) {
                                    // console.log(result);
                                    var packageType = cloneTr.children('td').eq(3).children('select');
                                    packageType.children().remove();
                                    $.each(result.packageTypeList, function (index, item) {
                                        var option = $('<option/>');
                                        option.val(item.index);
                                        option.text(item.name);
                                        packageType.append(option);
                                    });
                                    packageType.get(0).selectedIndex = obj.packageType.index - 1;
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

                    cloneTr.children('td').eq(24).html(obj.id);

                    cloneTr.insertBefore(tr);
                    tr.removeAttr('class');


                });

                tr.hide();


            }
        },
        error:function (result) {
            alert("服务器异常！")
        }


    });

}

//确认修改
function adjustConfirm() {

    var weeklyDemandTotal=0;

    var currentInventoryTotal=0;

    var safetyTotal=0;

    var marketPurchasesTotal=0;

    $('.myclass2').each(function () {
        var materialRequireItem={
            handleCategory: $(this).children('td').eq(1).children('select').get(0).selectedIndex,
            formType: $(this).children('td').eq(2).children('select').get(0).selectedIndex,
            packageType:$(this).children('td').eq(3).children('select').get(0).selectedIndex,
            weeklyDemand:$(this).children('td').eq(4).children('input').val(),
            currentInventory:$(this).children('td').eq(5).children('input').val(),
            safety:$(this).children('td').eq(6).children('input').val(),
            marketPurchases:$(this).children('td').eq(7).children('input').val(),
            id:$(this).children('td').eq(24).html(),
        };
        //物料明细的更新
        $.ajax({
            type: 'POST',
            url: "updateMaterialRequireItem",
            data:JSON.stringify(materialRequireItem),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                }
                else {
                    alert(result.message);
                }

            },
            error:function (result) {
                alert("服务器异常!")
            }
            
        });

       console.log(materialRequireItem)//物料明细
        weeklyDemandTotal+=parseFloat($(this).children('td').eq(4).children('input').val());
        currentInventoryTotal+=parseFloat($(this).children('td').eq(5).children('input').val());
        safetyTotal+=parseFloat($(this).children('td').eq(6).children('input').val());
        marketPurchasesTotal+=parseFloat($(this).children('td').eq(7).children('input').val());
    })
    var materialRequire={
        materialRequireId:$('#materialRequireId').text(),
        weeklyDemandTotal:weeklyDemandTotal,
        currentInventoryTotal:currentInventoryTotal,
        safetyTotal:safetyTotal,
        marketPurchasesTotal:marketPurchasesTotal
    };
  console.log(materialRequire)
    //更新主表
    //物料明细的更新
    $.ajax({
        type: 'POST',
        url: "updateMaterialRequire",
        data:JSON.stringify(materialRequire),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
            }
            else {
                alert(result.message);
            }

        },
        error:function (result) {
            alert("服务器异常!")
        }

    });

  alert("修改成功!")
    window.location.href="materialDemand.html"

}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchMaterialRequire();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchMaterialRequire();      //
            }
        },400);
    });
});
//粗查询

function searchMaterialRequire() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var keywords = $.trim($("#searchContent").val());
    data1 = {
        page: page,
        keywords: keywords
    }
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchMaterialRequire",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined || result.status == "success") {
                   console.log(result);
                   setPageClone(result)
                   // setMaterialList(result.array)
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
}

//高级查询
function searchMa() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;

    data1={
        materialRequireId:$('#search-materialRequireId').val(),
        handleCategory:$("#search-handleCategory").val(),
        formType:$("#search-formType").val(),
        packageType:$("#search-packageType").val(),
        weeklyDemandBeg:$("#search-weeklyDemandBeg").val(),
        weeklyDemandEnd:$("#search-weeklyDemandEnd").val(),
        currentInventoryBeg:$("#search-currentInventoryBeg").val(),
        currentInventoryEnd:$("#search-currentInventoryEnd").val(),
        safetyBeg:$("#search-safetyBeg").val(),
        safetyEnd:$("#search-safetyEnd").val(),
        marketPurchasesBeg:$("#search-marketPurchasesBeg").val(),
        marketPurchasesEnd:$("#search-marketPurchasesEnd").val(),
        page: page,
    };
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");

    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchMaterialRequireItem",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success"){
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




