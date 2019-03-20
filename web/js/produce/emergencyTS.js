/*应急暂存脚本*/

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;

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
            url: "loadEmergencyMaterialCount",                  // url
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
            url: "searchEmergencyMaterialCount",                  // url
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setEmergencyTSList(result);
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
    if(pageNumber > totalPage()){
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
    var page = {};
    addPageClass(pageNumber);           // 设置页码标蓝
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
            url: "loadEmergencyTSList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setEmergencyTSList(result);
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
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchEmergencyMaterial",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setEmergencyTSList(result);
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

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
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
                url: "loadEmergencyTSList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setEmergencyTSList(result);
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
                url: "searchEmergencyMaterial",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setEmergencyTSList(result);
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

/**
 * 分页 获取首页内容
 * */
function loadEmergencyTSList() {
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchData();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadEmergencyTSList",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    setPageClone(result);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                console.log("失败");
            }
        });
        isSearch = false;
    }
}

/**设置合同数据
 * @param result
 */
function setEmergencyTSList(result) {
    //console.log(eval(result));//可以取到
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");//克隆一行
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var obj = eval(item);
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class', 'myclass1');
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 计划单号
                case (1):
                    $(this).html(obj.planId);
                    break;
                //应急单位
                case (2):
                    if(obj.client!=null){
                        $(this).html(obj.client.companyName);
                    }
                    break;
                // 处置单位
                case (3):
                    if(obj.supplier!=null){
                        $(this).html(obj.supplier.companyName);
                    }
                    break;

                // 危废名称
                case (4):
                    $(this).html(obj.wastesName);
                    break;
                // 危废代码
                case (5):
                    $(this).html(obj.wastesCode);
                    break;

                // 暂存数量
                case (6):
                    $(this).html(obj.temporaryCount.toFixed(3)+"吨");
                    break;
                // 应急联单编号
                case (7):
                    $(this).html(obj.emergencyNumber);

                    break;
                // 创建时间
                case (8):
                  if(obj.createTime!=null){
                      $(this).html(getDateStr(obj.createTime));
                  }
                    break;
                    //状态
                case (9):{
                   if(obj.checkStateItem!=null){
                       $(this).html((obj.checkStateItem.dictionaryItemName));
                   }

                    break;
                }
                //附件路径
                case (10):
                    $(this).html(obj.fileUrl);
                    break;

            }
        });

        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);

    });
    // 隐藏无数据的tr
    tr.hide();
}



/*新增模态框*/
function addModal() {
    
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size:4
    });
    
    //单位下拉框赋值
    $.ajax({
        type: 'POST',
        url: "listClient",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined){
                // console.log(result)
                var obj=eval(result)
                var client =$('#emergencyCompany');
                client.children().remove();
                $.each(obj, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    client.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
            }
                },
        error:function (result) {
            
        }
    })
    


    $("#addModal").modal('show')
}

/*新增方法实现*/
function addDate() {
    var data={
        planId:$('#emergencyId').val(),
        client:{clientId:$('#emergencyCompany').selectpicker('val')},
        wastesName:$('#emergencyName').val(),
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addEmergencyMaterial",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message)
                window.location.reload()
            }
            else
                alert(result.message)
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })

}

/*完善模态框*/
function perfectInfo(item) {


    var checkState=$(item).parent().prev().prev().html();
    if(checkState!='审批通过'){


    //赋值危废代码
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size:4
    });
    $.ajax({
        type: 'POST',
        url: "getWastesInfoList",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                var obj=eval(result)
                var code =$('#8code');
                code.children().remove();
                $.each(obj.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    code.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
            }
        },
        error:function (result) {

        }
    })

    //赋值处置单位
    $.ajax({
        type: 'POST',
        url: "listSupplier",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined){
                console.log(result)
                var obj=eval(result)
                var emergencyProduceCompany =$('#emergencyProduceCompany');
                emergencyProduceCompany.children().remove();
                $.each(obj, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    emergencyProduceCompany.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
            }
        },
        error:function (result) {

        }
    })



    var planId=$(item).parent().parent().children('td').eq(1).html();
    $('#id').text(planId);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEmergencyTSById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{planId:planId},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                var data=eval(result.data);
                console.log(data)

                if(data.supplier!=null){
                    $('#emergencyProduceCompany').selectpicker('val',data.supplier.supplierId)
                }

                $('#Name').val(data.wastesName)

                $('#8code').selectpicker('val',data.wastesCode)

                $('#emergencyTransferDraftId').val(data.emergencyNumber)

                $('#temporaryCount').val(data.temporaryCount.toFixed(3))


            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })
    $("#perfectInfo").modal('show')
    }
    else {
        alert("审批通过后不能完善信息！")
    }
}

/*查看*/
function viewData(item) {
    var planId=$(item).parent().parent().children('td').eq(1).html();

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEmergencyTSById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{planId:planId},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                       var data=eval(result.data);
                       console.log(data)
                           $('#planId').val(data.planId)
                if(data.client!=null){
                    $('#client').val(data.client.companyName)
                }
                if(data.supplier!=null){
                    $('#supplier').val(data.supplier.companyName)
                }

                $('#wastesName').val(data.wastesName)

                $('#wastesCode').val(data.wastesCode)

                $('#emergencyNumber').val(data.emergencyNumber)

                $('#temporaryCount1').val(data.temporaryCount.toFixed(3))
                if(data.createTime!=null){
                    $('#createTime').val(getDateStr(data.createTime))
                }
                if(data.checkStateItem!=null){
                    $('#checkStateItem').val(data.checkStateItem.dictionaryItemName)
                }

            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })



    $('#approval').hide();

    $('#inBound').hide();

    $('#view').modal('show')
}

/*完善信息方法*/
function confirmPerfect() {
    var data={
        planId:$('#id').text(),
        wastesCode:$('#8code').selectpicker('val'),
        supplier:{supplierId:$('#emergencyProduceCompany').selectpicker('val')},
        emergencyNumber:$('#emergencyTransferDraftId').val(),
        wastesName:$('#Name').val(),
        temporaryCount:$('#temporaryCount').val(),

    }
    console.log(data)

    //上传附件
    var planId=$('#id').text();
    var formFile = new FormData();
    formFile.append("planId",planId)
    if ($('#file').prop('type') != 'text') {
        var multipartFile = $('#file')[0].files[0];
        formFile.append("multipartFile", multipartFile);
        if(multipartFile!=undefined){
            //保存采购附件
            $.ajax({
                type: "POST",                            // 方法类型
                url: "saveEmergencyMaterialFile",                     // url
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



    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateEmergencyTS",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message);
                //附件上传

                window.location.reload()
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

//附件下载
function downLoadFile(item) {
    var contractAppendicesUrl=$(item).parent().prev().html();
    if (contractAppendicesUrl != null && contractAppendicesUrl != "") {
        window.open('downloadFile?filePath=' + contractAppendicesUrl);
        window.location.reload()
    } else {
        alert("未上传文件");
        // window.location.reload()
    }
}

/*查询*/
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchData();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        }, 600);
    });
});

//高级查询
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            planId:$.trim($('#search-inboundPlanOrderId').val()),
            wastesName:$.trim($('#search-wastesName').val()),
            wastesCode:$.trim($('#search-wastesCode').val()),
            emergencyNumber:$.trim($('#search-emergencyNumber').val()),
            checkStateItem:{dataDictionaryItemId:$("#search-checkState").val()},
            client:{companyName:$.trim($("#search-companyName").val())},
            supplier:{companyName:$.trim($("#search-transferDraftId").val())},
            page: page,
        };
        console.log(data);
        // 模糊查询
    } else {
        var keyword=$.trim($("#searchContent").val());
        data = {
            keyword: keyword,
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchEmergencyMaterial",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

/*入库*/
function InBoundDate(item) {

    var checkState=$(item).parent().prev().prev().html();
    if(checkState!='审批通过'){


    var planId=$(item).parent().parent().children('td').eq(1).html();

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEmergencyTSById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{planId:planId},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                var data=eval(result.data);
                console.log(data)
                $('#planId').val(data.planId)
                if(data.client!=null){
                    $('#client').val(data.client.companyName)
                }
                if(data.supplier!=null){
                    $('#supplier').val(data.supplier.companyName)
                }

                $('#wastesName').val(data.wastesName)

                $('#wastesCode').val(data.wastesCode)

                $('#emergencyNumber').val(data.emergencyNumber)

                $('#temporaryCount1').val(data.temporaryCount.toFixed(3))

                if(data.createTime!=null){
                    $('#createTime').val(getDateStr(data.createTime))
                }
                if(data.checkStateItem!=null){
                    $('#checkStateItem').val(data.checkStateItem.dictionaryItemName)
                }

            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })

    // 获取仓库数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listWareHouse",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var warehouse = $("#wareHouse");
                warehouse.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.wareHouseId);
                    option.text(item.wareHouseName);
                    warehouse.append(option);
                });
                warehouse.get(0).selectedIndex = -1;
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 获取处理方式
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWayByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var processWay = $("#processWay");
                processWay.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    processWay.append(option);
                });
                processWay.get(0).selectedIndex = 0;
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 获取进料方式
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategoryByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var handleCategory = $("#handleCategory");
                handleCategory.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = -1;
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 获取开票税率
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getTicketRate1ByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var rate = $("#ticketRateItem");
                rate.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    rate.append(option);
                });
                rate.get(0).selectedIndex = -1;
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    $('#approval').show();

    $('#inBound').show();

    $('#view').modal('show')

    }
    else {
        alert('已入库的单据无法入库！')
    }
    // $("#approval2").modal('show')
}

/*审批过后进行入库*/
function InApproval() {

    if(confirm("审批通过直接入库，确认审批?")){
        //点击确定后操作
        var inboundOrderItemList = [];
        var wareHouse = {};
        var inboundOrder = {};
        inboundOrder.transferDraftId =$('#emergencyNumber').val();
        var produceCompany = {};
        produceCompany.companyName = $('#client').val();
        inboundOrder.produceCompany = produceCompany;
        var wastes = {};
        wastes.name = $('#wastesName').val();
        wastes.wastesId = $('#wastesCode').val();
        inboundOrder.wastes = wastes;
        inboundOrder.wastesAmount = $('#temporaryCount1').val();
        inboundOrder.processWayItem = {
            dataDictionaryItemId: $('#processWay').val()
        };
        inboundOrder.handleCategoryItem = {
            dataDictionaryItemId: $('#handleCategory').val()
        };
        inboundOrder.ticketRateItem = {
            dataDictionaryItemId:  $('#ticketRateItem').val()
        };
        inboundOrder.wareHouse = {
            wareHouseId:  $('#wareHouse').val()
        };
        inboundOrderItemList.push(inboundOrder);
        var data = {};
        data.inboundOrderItemList = inboundOrderItemList;
        data.wareHouse = {wareHouseId:  $('#wareHouse').val()};
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addInboundOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result !== undefined && result.status == "success") {

                    //2更新状态
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "approvalEmergencyMaterial",                  // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        data: {planId: $('#planId').val()},
                        dataType: "json",
                        // contentType: "application/json; charset=utf-8",
                        success:function (result) {
                            if (result != undefined && result.status == "success"){
                                alert(result.message)
                                window.location.reload()
                            }
                                },
                        error:function (result) {
                            alert(result.message)
                            // window.location.reload()
                        }
                    })
                   
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }



}

function confirmDate(item) {
    var planId=$(item).parent().parent().children('td').eq(1).html();

    if(confirm("确定提交?")){
        //点击确定后操作
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setEmergencyTSToExamine",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data:{planId:planId},
            dataType: "json",
            // contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(data)
                    alert("提交成功")
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
    publicSubmit(planId,getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)

}
function setEmergencyTSToExamine(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "setEmergencyTSToExamine",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{planId:id},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(data)
                alert("提交成功")
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
function setEmergencyToApproval(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "setEmergencyToApproval",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{planId:id},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){


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

function setEmergencyToBack(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "setEmergencyToBack",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{planId:id},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){


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

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(setEmergencyTSToExamine.name);
    initApprovalFName(setEmergencyToApproval.name);
    initBakcFName(setEmergencyToBack.name);
    var id=$(item).parent().parent().children("td").eq(1).html();
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