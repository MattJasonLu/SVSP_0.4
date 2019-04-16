var inboundPlanOrderIdArray = [];
var itemIndex = 0;


/**
 * 入库计划单查询
 */
function searchPlan() {
    // 查询数据源
    var data = {
        inboundPlanOrderId: $("#search-inboundPlanOrderId").val(),
        transferDraftId: $("#search-transferDraftId").val(),
        departmentId: $("#search-planDate").val(),
        companyId: $("#search-transferDate").val(),
        produceCompany: {
            companyName: $("#search-produceCompanyName").val()
        },
        acceptCompany: {
            companyName: $("#search-acceptCompany").val()
        },
        wastes: {
            name: $("#search-wastesName").val(),
            wastesId: $("#search-wastesCode").val()
        }
    };
    
    $.ajax({
        type: "POST",
        url: "searchInboundPlanOrder",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });

}

/**
 * 设置下拉框数据
 */
function setSelectItem() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcessWay",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var processWayArray = $("select[name='processWay']");
                for (var i = 0; i < processWayArray.length; i++) {
                    var processWay = $(processWayArray[i]);
                    // console.log(processWay);
                    processWay.children().remove();
                    $.each(data.processWayList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        processWay.append(option);
                    });
                    processWay.get(0).selectedIndex = -1;
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var handleCategoryArray = $("select[name='handleCategory']");
                for (var i = 0; i < handleCategoryArray.length; i++) {
                    var handleCategory = $(handleCategoryArray[i]);
                    handleCategory.children().remove();
                    $.each(data.handleCategoryList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        handleCategory.append(option);
                    });
                    handleCategory.get(0).selectedIndex = -1;
                }
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 增加入库单
 */
function addInboundOrder(type) {
    var inboundOrderItemList = [];
    $("#inboundOrderData").children().not("#inboundClonedTr").each(function () {
        var inboundOrder = {};
        inboundOrder.inboundPlanOrderId = $(this).find("td[name='inboundPlanOrderId']").text();
        inboundOrder.transferDraftId = $(this).find("td[name='transferDraftId']").text();
        var produceCompany = {};
        produceCompany.companyName = $(this).find("td[name='produceCompanyName']").text();
        inboundOrder.produceCompany = produceCompany;
        var wastes = {};
        wastes.name = $(this).find("td[name='wastesName']").text();
        wastes.wastesId = $(this).find("td[name='wastesCode']").text();
        inboundOrder.wastes = wastes;
        inboundOrder.wastesAmount = $(this).find("td[name='wastesAmount']").text();
        inboundOrder.unitPriceTax = $(this).find("td[name='unitPriceTax']").text();
        inboundOrder.totalPrice = $(this).find("td[name='totalPrice']").text();
        inboundOrder.processWay = $(this).find("select[name='processWay']").val();
        inboundOrder.handleCategory = $(this).find("select[name='handleCategory']").val();
        inboundOrder.remarks = $(this).find("input[name='remarks']").val();
        inboundOrder.warehouseArea = $(this).find("input[name='warehouseArea']").val();
        inboundOrderItemList.push(inboundOrder);
    });
    var data = {};
    data.inboundOrderItemList = inboundOrderItemList;

    $.ajax({
        type: "POST",                       // 方法类型
        url: "addInboundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                alert(result.message);
                $(location).prop('href', 'warehouseManage.html');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}


/************入库单管理页面脚本*********/

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**********************客户部分**********************/
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
    var data = {};
    var totalRecord = 0;
    var page = {};
    page.count = 0;
    page.start = 0;
    data.page = page;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countInboundPlanOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countInboundPlanOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
    if (totalRecord === 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count === 0)
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
    setInboundOrderDataList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = [];
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
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if (pageNumber === 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber === -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber === undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber === 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber === totalPage()) {
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
    var data = {};
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    data.page = page;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listInboundPlanOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setInboundOrderDataList(result.data);
                } else {
                    console.log(result);
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
            url: "listInboundPlanOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setInboundOrderDataList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
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
    if (pageNumber == null || pageNumber == undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber === 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber === totalPage()) {
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
        var data = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        data.page = page;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listInboundPlanOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        setInboundOrderDataList(result.data);
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
                url: "listInboundPlanOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
                        // console.log(result);
                        setInboundOrderDataList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
    }
}

/**
 * 分页 获取首页内容
 * */
function loadPageList() {
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    var data = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    data.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
     getSelectedInfo();
}

/**
 * 设置数据
 * @param result
 */
function setInboundOrderDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        var data = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='inboundPlanOrderId']").text(data.inboundPlanOrderId);
        clonedTr.find("td[name='planDate']").text(getDateStr(data.planDate));
        if (data.produceCompany != null) clonedTr.find("td[name='produceCompanyName']").text(data.produceCompany.companyName);
        clonedTr.find("td[name='transferDate']").text(getDateStr(data.transferDate));
        clonedTr.find("td[name='transferDraftId']").text(data.transferDraftId);
        if (data.wastes != null) {
            clonedTr.find("td[name='wastesName']").text(data.wastes.name);
            clonedTr.find("td[name='wastesCode']").text(data.wastes.wastesId);
        }
        // clonedTr.find("td[name='prepareTransferCount']").text(data.prepareTransferCount);
        clonedTr.find("td[name='transferCount']").text(parseFloat(data.transferCount).toFixed(3));
        // clonedTr.find("td[name='storageCount']").text(data.storageCount);
        clonedTr.find("td[name='leftCount']").text(parseFloat(data.leftCount).toFixed(3));
        // clonedTr.find("td[name='poundsCount']").text(data.poundsCount);
        if (data.checkState != null) clonedTr.find("td[name='checkState']").text(data.checkState.name);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 显示增加模态框
 */
function showAddModal() {
    // 设置产废单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllClients",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var produceCompany = $("#addProduceCompany");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.selectpicker("refresh");
                produceCompany.selectpicker('val', '');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 设置危废代码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesCode = $("#addWastesCode");
                wastesCode.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.selectpicker("refresh");
                wastesCode.selectpicker('val', '');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $("#addModal").modal("show");
}

function addInboundPlanOrder() {
    var data = {
        planDate: $("#addPlanDate").val(),
        produceCompany: {
            clientId: $("#addProduceCompany").val()
        },
        transferDate: $("#addTransferDate").val(),
        transferDraftId: $("#addTransferDraftId").val(),
        wastes: {
            name: $("#addWastesName").val(),
            code: $("#addWastesCode").val()
        },
        // prepareTransferCount: $("#addPrepareTransferCount").val(),
        transferCount: $("#addTransferCount").val(),
        // storageCount: $("#addStorageCount").val(),
        // poundsCount: $("#addPoundsCount").val(),
        leftCount: $("#addLeftCount").val()
    };
    console.log(data);
    $.ajax({
        type: "POST",                      // 方法类型
        url: "addInboundPlanOrder",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 查找
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    var data = {};
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
   var wastes = {};
   wastes.name = $.trim($("#search-wastesName").val());
   wastes.wastesId = $.trim($("#search-wastesCode").val());
   var produceCompany = {};
    produceCompany.companyName = $.trim($("#search-companyName").val());
    if ($("#senior").is(':visible')) {
        data = {
            inboundPlanOrderId: $.trim($("#search-inboundPlanOrderId").val()),
            transferDraftId:$.trim($("#search-transferDraftId").val()),
            wastes : wastes,
            produceCompany : produceCompany,
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;
}

/**
 * 设置高级查询的审核状态数据
 */
function getSelectedInfo() {
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getCheckState",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result !== undefined) {
    //             var data = eval(result);
    //             // 高级检索下拉框数据填充
    //             var checkState = $("#search-checkState");
    //             checkState.children().remove();
    //             $.each(data.checkStateList, function (index, item) {
    //                 if (item.index == 13 || item.index == 7) {
    //                     var option = $('<option />');
    //                     option.val(index);
    //                     option.text(item.name);
    //                     checkState.append(option);
    //                 }
    //             });
    //             checkState.get(0).selectedIndex = -1;
    //         } else {
    //             console.log("fail: " + result);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });
    //
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getRecordState",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result !== undefined) {
    //             var data = eval(result);
    //             // 高级检索下拉框数据填充
    //             var recordState = $("#search-recordState");
    //             recordState.children().remove();
    //             $.each(data.recordStateList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 recordState.append(option);
    //             });
    //             recordState.get(0).selectedIndex = -1;
    //         } else {
    //             console.log("fail: " + result);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });
    // 设置产废单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllClients",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var produceCompany = $("#model-companyName");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.selectpicker("refresh");
                produceCompany.selectpicker('val', '');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 设置危废代码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesCode = $("#model-wastesCode");
                wastesCode.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.selectpicker("refresh");
                wastesCode.selectpicker('val', '');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSampleFormType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log("下拉数据为：");
                console.log(data);
                // 下拉框数据填充
                var wastesFormType = $("#model-wastesFormType");
                wastesFormType.children().remove();   //清空之前数据
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val((item.index));
                    option.text(item.name);
                    wastesFormType.append(option);
                });
                wastesFormType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 作废
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundPlanOrderInvalid",
            async: false,
            dataType: "json",
            data: {
                inboundPlanOrderId: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 确认收样
 * @param e
 */
function setSignIn(e) {
    var r = confirm("确认收样该入库计划单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundPlanOrderSignIn",
            async: false,
            dataType: "json",
            data: {
                inboundPlanOrderId: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 查看数据
 * @param e
 */
function viewData(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setViewData(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
    $("#viewModal").modal("show");

    function setViewData(result) {
        var obj = eval(result);
        $("#inboundPlanOrderId").val(obj.inboundPlanOrderId);
        $("#transferDraftId").val(obj.transferDraftId);
        if (obj.produceCompany != null) $("#produceCompany").val(obj.produceCompany.companyName);
        $("#prepareTransferCount").val(parseFloat(obj.prepareTransferCount).toFixed(3));
        $("#transferCount").val(parseFloat(obj.transferCount).toFixed(3));
        $("#storageCount").val(parseFloat(obj.storageCount).toFixed(3));
        $("#planDate").val(getDateStr(obj.planDate));
        $("#transferDate").val(getDateStr(obj.transferDate));
        if (obj.wastes != null) {
            $("#wastesName").val(obj.wastes.name);
            $("#wastesCode").val(obj.wastes.wastesId);
        }
        $("#poundsCount").val(parseFloat(obj.poundsCount).toFixed(3));
        $("#leftCount").val(parseFloat(obj.leftCount).toFixed(3));
    }
}
var inboundPlanOrder = {};
var planId;
/**
 * 显示预约送样的模态框
 * @param e
 */
function showSampleInfo(e) {
    // 获取编号
    var id = getIdByMenu(e);
    planId = id;
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                // 为全局对象赋值
                inboundPlanOrder = result.data;
                var obj = eval(result.data);
                // 页面赋值
                $("#model-companyName").selectpicker('val',obj.produceCompany.clientId);
                $("#model-wastesName").val(obj.wastes.name);
                $("#model-wastesCode").selectpicker('val',obj.wastes.wastesId);
                var code = obj.wastes.wastesId;
                code = "HW" + code.substring(code.length, code.length - 2); //截取最后两位
                $("#model-wastesCategory").val(code);
                if (obj.wastes.formType != null) $("#model-wastesFormType").val(obj.wastes.formType.index);
                $("#model-transferId").val(obj.transferDraftId);
                $.ajax({   // 获取当前登录用户名
                    type: "POST",                       // 方法类型
                    url: "getCurrentUserInfo",              // url
                    cache: false,
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    success: function (result) {
                        if (result.status == "success" && result.data != null) {
                            $("#model-sendingPerson").val(result.data.name);
                        } else {
                            console.log(result.message);
                        }
                    },
                    error: function (result) {
                        console.log(result);
                    }
                });

            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 显示模态框
    $("#appointModal").modal("show");
}

/**
 * 自动匹配危废类别
 * @param item
 */
function autoSetCategory(item) {
    var code = $(item).find("option:selected").text();
    console.log("code:" + code);
    if (code != "" || code != null) {
        code = "HW" + code.substring(code.length, code.length - 2); //截取最后两位
        console.log("code:" + code);
        $(item).parent().parent().nextAll().find("input[name$='wastesCategory']").val(code);  // 以wastesHandleCategory结尾的
    }
}


/**
 * 联单编号检测
 * @param item
 */
function test(item) {
    $('#pass1').hide();    // 通过
    $('#break1').hide();  // 存在
    $('#break2').hide();   // 不是18位
    var id = $.trim($(item).val());
    if($(item).val().length != 18) {
        $('#break2').show();  // 存在
        $('#pass1').hide();    // 通过
        $('#break1').hide();  // 存在
    }else{
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSampleInformationWareHouseByTransferId",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{
                'transferId' : id
            },
            success:function (result) {
                if (result != undefined){
                    console.log("count="+result);
                    if(result > 0){  // 存在该联单号
                        $('#break1').show();
                        $('#pass1').hide();    // 通过
                        $('#break2').hide();   // 不是18位
                    }else{
                        $('#pass1').show();
                        $('#break1').hide();  // 存在
                        $('#break2').hide();   // 不是18位
                    }
                    if($.trim(id).length<=0){
                        $('#pass1').hide();
                        $('#break1').hide();
                        $('#break2').hide();
                    }
                }
            },
            error:function (result) {

            }
        });
    }

}

/**
 * 添加预约登记单
 */
function addAppoint() {
    var sampleInformation = {};
    var companyCode = $("#model-companyName").val();   // 获取公司代码
    if ($("#model-id").val() == null || $("#model-id").val() == "") {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getCurrentSampleInformationWareHouseId",                 // url
            data: {
                companyCode: companyCode
            },
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                //alert("数据获取成功！");
                sampleInformation.id = result.id;
            },
            error: function (result) {
                alert("服务器异常!");
                console.log(result);
            }
        });
    } else {
        sampleInformation.id = $("#model-id").val();
    }
    sampleInformation.companyName = $("#model-companyName").find("option:selected").text();
    sampleInformation.companyCode = $("#model-companyName").find("option:selected").val();
    sampleInformation.sendingPerson = $("#model-sendingPerson").val();
    sampleInformation['wastesList'] = [];
    var lineCount = 1;
    var wastesId = null;
    //获取wastesId
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentWareHouseWastesId",                 // url
        data: {
            'sampleId': sampleInformation.id
        },
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("wastesId获取成功!");
            wastesId = result.id;
        },
        error: function (result) {
            //  alert("wastesId获取失败!");
            console.log(result);
        }
    });
    var sId = wastesId.substring(0, wastesId.length - 5); // 删除后五位
    var id1 = wastesId.substring(wastesId.length - 5, wastesId.length); // 保留后五位
    for (var i = 0; i < lineCount; i++) {
        if (i > 0) id1++;
        var wastes = {};
        var $i = i;
        //id 递增
        var id2 = sId + id1;
        wastes.id = id2;
        wastes.code = $("#model-wastesCode").find("option:selected").text();
        wastes.name = $("#model-wastesName").val();
        wastes.transferId = $("#model-transferId").val();
        var formType = $("#model-wastesFormType").find("option:selected").val();
        switch (parseInt(formType)) {
            case 2 :
                formType = "Liquid";
                break;
            case 3 :
                formType = "Solid";
                break;
            case 4 :
                formType = "HalfSolid";
                break;
            case 5 :
                formType = "Solid1AndHalfSolid";
                break;
            case 6 :
                formType = "HalfSolidAndLiquid";
                break;
            case 7 :
                formType = "Solid1AndLiquid";
                break;
        }
        wastes.formType = formType;
        wastes.category = $("#model-wastesCategory").val();
        wastes.isPH = $("input[name='wastesList[" + $i + "].isPH']").prop('checked');
        wastes.isAsh = $("input[name='wastesList[" + $i + "].isAsh']").prop('checked');
        wastes.isWater = $("input[name='wastesList[" + $i + "].isWater']").prop('checked');
        wastes.isHeat = $("input[name='wastesList[" + $i + "].isHeat']").prop('checked');
        wastes.isSulfur = $("input[name='wastesList[" + $i + "].isS']").prop('checked');
        wastes.isChlorine = $("input[name='wastesList[" + $i + "].isCl']").prop('checked');
        wastes.isFluorine = $("input[name='wastesList[" + $i + "].isF']").prop('checked');
        wastes.isPhosphorus = $("input[name='wastesList[" + $i + "].isP']").prop('checked');
        wastes.isFlashPoint = $("input[name='wastesList[" + $i + "].isFlashPoint']").prop('checked');
        wastes.isViscosity = $("input[name='wastesList[" + $i + "].isViscosity']").prop('checked');
        wastes.isHotMelt = $("input[name='wastesList[" + $i + "].isHotMelt']").prop('checked');
        sampleInformation.wastesList.push(wastes);
    }
    sampleInformation.emergency = $("#emergency").prop('checked');  // 单据是否加急
    console.log("添加的数据为：");
    console.log(sampleInformation);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addSampleInfoWareHouse",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(sampleInformation),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    var r = confirm(data.message + ", 确认收样该入库计划单吗？");
                    if (r) {
                        $.ajax({
                            type: "POST",
                            url: "setInboundPlanOrderSignIn",
                            async: false,
                            dataType: "json",
                            data: {
                                inboundPlanOrderId: planId
                            },
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                    console.log(result);
                                    alert(result.message);
                                    window.location.reload();
                                } else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                console.log(result);
                                alert("服务器异常");
                            }
                        });
                    }
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 显示对比框
 */
function showComparison(e) {
    $("#cloneTr2").siblings().remove();
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var obj = eval(result.data);
                var clientId = obj.produceCompany.clientId;
                var wastesName = obj.wastes.name;
                var wastesCode = obj.wastes.wastesId;
                var data={
                    produceCompany:{clientId:clientId},
                    wastesName:wastesName,
                    wastesCode:wastesCode
                };

                console.log(id);

                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "comparison",                  // url
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    data:JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success:function (result) {
                        if (result != undefined && result.status == "success") {
                            setCompareList(result);
                        }
                    },
                    error:function (result) {

                    }
                });
                $("#comparison").modal('show');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });

    function setCompareList(result) {
        console.log(result);
        // 获取id为cloneTr的tr元素
        var tr = $("#cloneTr2");

        var sampleInfoAnalysis=result.sampleInfoAnalysis;
        if (sampleInfoAnalysis == null) {
            // 隐藏无数据的tr
            tr.hide();
            alert("没有对应化验单！");
            return;
        }

        var clonedTr = tr.clone();

        clonedTr.show();
        if(sampleInfoAnalysis.produceCompany !=null){
            clonedTr.children('td').eq(1).html(sampleInfoAnalysis.produceCompany.companyName)
        }
        clonedTr.children('td').eq(2).html(sampleInfoAnalysis.wastesName);
        clonedTr.children('td').eq(3).html(sampleInfoAnalysis.wastesCode);
        if(sampleInfoAnalysis.formType!=null){
            clonedTr.children('td').eq(4).html(sampleInfoAnalysis.formType.name);
        }
        clonedTr.children('td').eq(5).html(setNumber2Line(sampleInfoAnalysis.PH.toFixed(2)));
        clonedTr.children('td').eq(6).html(setNumber2Line(sampleInfoAnalysis.ash.toFixed(2)));
        clonedTr.children('td').eq(7).html(setNumber2Line(sampleInfoAnalysis.chlorine.toFixed(2)));
        clonedTr.children('td').eq(8).html(setNumber2Line(sampleInfoAnalysis.sulfur.toFixed(2)));
        clonedTr.children('td').eq(9).html(setNumber2Line(sampleInfoAnalysis.chlorine.toFixed(2)));
        clonedTr.children('td').eq(10).html(setNumber2Line(sampleInfoAnalysis.fluorine.toFixed(2)));
        clonedTr.children('td').eq(11).html(setNumber2Line(sampleInfoAnalysis.phosphorus.toFixed(2)));
        clonedTr.children('td').eq(12).html(setNumber2Line(sampleInfoAnalysis.flashPoint.toFixed(2)));
        clonedTr.children('td').eq(13).html(setNumber2Line(sampleInfoAnalysis.viscosity));
        clonedTr.children('td').eq(14).html(setNumber2Line(sampleInfoAnalysis.hotMelt));
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        // tr.siblings().remove();
        $.each(result.receiveSampleAnalysisList, function (index, item) {
            var obj = eval(item);
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            if(obj.produceCompany !=null){
                clonedTr.children('td').eq(1).html(obj.produceCompany.companyName)
            }
            clonedTr.children('td').eq(2).html(obj.wastesName);
            clonedTr.children('td').eq(3).html(obj.wastesCode);
            if(obj.formType!=null){
                clonedTr.children('td').eq(4).html(obj.formType.name);
            }
            clonedTr.children('td').eq(5).html(setNumber2Line(obj.PH.toFixed(2)));
            clonedTr.children('td').eq(6).html(setNumber2Line(obj.ash.toFixed(2)));
            clonedTr.children('td').eq(7).html(setNumber2Line(obj.chlorine.toFixed(2)));
            clonedTr.children('td').eq(8).html(setNumber2Line(obj.sulfur.toFixed(2)));
            clonedTr.children('td').eq(9).html(setNumber2Line(obj.chlorine.toFixed(2)));
            clonedTr.children('td').eq(10).html(setNumber2Line(obj.fluorine.toFixed(2)));
            clonedTr.children('td').eq(11).html(setNumber2Line(obj.phosphorus.toFixed(2)));
            clonedTr.children('td').eq(12).html(setNumber2Line(obj.flashPoint.toFixed(2)));
            clonedTr.children('td').eq(13).html(setNumber2Line(obj.viscosity));
            clonedTr.children('td').eq(14).html(setNumber2Line(obj.hotMelt));
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();

    }
}

var imgUrl = '';
/**
 * 显示图片
 * @param e
 */
function showImg(e) {
    // 获取编号
    var id = getIdByMenu(e);

    // 设置编号
    $("#imgInboundPlanOrderId").val(id);
    // 获取入库计划单对象信息
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                // 更新危废图片路径
                imgUrl = result.data.imgUrl;
            } else {
                console.log(result.message);
                imgUrl = '';
            }
        },
        error: function (result) {
            console.log(result);
            imgUrl = '';
        }
    });
    // 显示图片模态框
    $("#imgModal").modal("show");
}
// 设置点击事件
function downloadImg() {
    if (imgUrl == '') {
        alert("未上传图片！");
    } else {
        window.open('downloadFile?filePath=' + imgUrl);
    }
}

var rejectId;

/**
 * 显示拒收框
 * @param e
 */
function showReject(e) {
    // 获取编号
    var id = getIdByMenu(e);
    rejectId = id;
    // 显示拒收原因
    $.ajax({
        type: "POST",
        url: "getInboundPlanOrder",
        async: false,
        dataType: "json",
        data: {"inboundPlanOrderId": id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                $("#advice").val(result.data.advice);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $("#rejectModal").modal("show");
}

/**
 * 拒收
 */
function reject() {
    var advice = $("#advice").val();
    var data = {
        inboundPlanOrderId: rejectId,
        advice: advice
    };

    $.ajax({
        type: "POST",
        url: "setInboundPlanOrderReject",
        async: false,
        dataType: "json",
        data: data,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    // console.log(e.parent().html());
    return e.parent().parent().find("td[name='inboundPlanOrderId']").text();
}

// 覆盖Modal.prototype的hideModal方法
$.fn.modal.Constructor.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
        //判断当前页面所有的模态框都已经隐藏了之后body移除.modal-open，即body出现滚动条。
        $('.modal.fade.in').length === 0 && that.$body.removeClass('modal-open');
        that.resetAdjustments();
        that.resetScrollbar();
        that.$element.trigger('hidden.bs.modal');
    })
};

// 页面变黑
$(document).on('show.bs.modal', '.modal', function(event) {
    $(this).appendTo($('body'));
}).on('shown.bs.modal', '.modal.in', function(event) {
    setModalsAndBackdropsOrder();
}).on('hidden.bs.modal', '.modal', function(event) {
    setModalsAndBackdropsOrder();
});

function setModalsAndBackdropsOrder() {
    var modalZIndex = 1040;
    $('.modal.in').each(function(index) {
        var $modal = $(this);
        modalZIndex++;
        $modal.css('zIndex', modalZIndex);
        $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
    });
    $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
}

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    console.log("export");
    var name = 't_pl_inboundorder';
    var sqlWords = "select t_pl_inboundorder.inboundOrderId, inboundDate, warehouseId, boundType, transferDraftId, (select companyName from client where clientId=produceCompanyId) as 'companyName', wastesName, wastesCode, wastesAmount, unitPriceTax, totalPrice, processWay, handleCategory, t_pl_inboundorderitem.remarks, warehouseArea from t_pl_inboundorder join t_pl_inboundorderitem where t_pl_inboundorderitem.inboundOrderId=t_pl_inboundorder.inboundOrderId and boundType='WasteInbound';";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/危废入库单导入模板.xlsx';
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
            url: "importWastesInboundExcel",              // url
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
                        window.location.reload();
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
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },400);
    });
});