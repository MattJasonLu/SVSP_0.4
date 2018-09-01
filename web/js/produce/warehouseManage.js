function view1() {
    $("#appointModal2").modal("show");
}
function view2() {
    $("#examineModal").modal("show");
}
//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}
/**
 * 获取用户的编号
 * @param item
 * @returns {string}
 */
function getId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

/**
 * 作废计划单
 * @param item 用户
 */
function changeAttribute(item) {
    $("#examineModal").modal("show");
}
/**
 * 作废计划单
 * @param item 用户
 */
function cancel(item) {
    var id = getId(item);
    var r = confirm("确认作废？");
    if (r === true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'model-wastesCode': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result !== undefined) {
                    if (result.status === "success") {
                        alert("作废成功");
                        window.location.reload();
                    } else if (result.status === "fail") {
                        alert("作废失败");
                    }
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
 * 签收计划单
 * @param item 用户
 */
function signIn(item) {
    var id = getId(item);
    var r = confirm("确认签收？");
    if (r === true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'model-wastesCode': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result !== undefined) {
                    if (result.status === "success") {
                        alert("禁用成功");
                        window.location.reload();
                    } else if (result.status === "fail") {
                        alert("禁用失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

var inboundPlanOrderIdArray = [];

/**
 * 读取入库计划单数据
 */
function loadInboundPlanOrder() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#planClonedTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    $(this).html(obj.inboundPlanOrderId);
                    break;
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                case (3):
                    $(this).html(getDateStr(obj.planDate));
                    break;
                case (4):
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (5):
                    if (obj.acceptCompany != null)
                        $(this).html(obj.acceptCompany.companyName);
                    break;
                case (6):
                    $(this).html(getDateStr(obj.transferDate));
                    break;
                case (7):
                    $(this).html(obj.transferCount);
                    break;
                case (8):
                    $(this).html(obj.poundsCount);
                    break;
                case (9):
                    $(this).html(obj.storageCount);
                    break;
                case (10):
                    $(this).html(obj.leftCount);
                    break;
                case (11):
                    $(this).html(obj.prepareTransferCount);
                    break;
                case (12):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.name);
                    break;
                case (13):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.wastesId);
                    break;
                case (14):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.category);
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

/**
 * 增加计划单到入库单中
 */
function addPlan2Order() {
    // 定义计划列表，存储勾选的计划
    var planList = [];
    // 遍历计划单表格行，获取勾选的计划列表
    $("#planOrderData").children().not("#planClonedTr").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var inboundPlanOrderId = $(this).find("td[name='inboundPlanOrderId']").text();
            if ($.inArray(inboundPlanOrderId, inboundPlanOrderIdArray) == -1) {
                inboundPlanOrderIdArray.push(inboundPlanOrderId);
                var plan = {};
                plan.inboundPlanOrderId = inboundPlanOrderId;
                plan.transferDraftId = $(this).find("td[name='transferDraftId']").text();
                plan.planDate = $(this).find("td[name='planDate']").text();
                plan.produceCompanyName = $(this).find("td[name='produceCompanyName']").text();
                plan.acceptCompanyName = $(this).find("td[name='acceptCompanyName']").text();
                plan.transferDate = $(this).find("td[name='transferDate']").text();
                plan.transferCount = $(this).find("td[name='transferCount']").text();
                plan.poundsCount = $(this).find("td[name='poundsCount']").text();
                plan.storageCount = $(this).find("td[name='storageCount']").text();
                plan.leftCount = $(this).find("td[name='leftCount']").text();
                plan.prepareTransferCount = $(this).find("td[name='prepareTransferCount']").text();
                plan.wastesName = $(this).find("td[name='wastesName']").text();
                plan.wastesCode = $(this).find("td[name='wastesCode']").text();
                plan.wastesCategory = $(this).find("td[name='wastesCategory']").text();
                planList.push(plan);
            }
        }
    });
    // 遍历js对象数组列表，循环增加入库单条目列表
    for (var i = 0; i < planList.length; i++) {
        var tr = $("#inboundClonedTr");
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='index']").text(i+1);
        clonedTr.find("td[name='inboundPlanOrderId']").text(planList[i].inboundPlanOrderId);
        clonedTr.find("td[name='transferDraftId']").text(planList[i].transferDraftId);
        clonedTr.find("td[name='produceCompanyName']").text(planList[i].produceCompanyName);
        clonedTr.find("td[name='wastesName']").text(planList[i].wastesName);
        clonedTr.find("td[name='wastesCode']").text(planList[i].wastesCode);
        clonedTr.find("td[name='wastesAmount']").text(planList[i].poundsCount);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
    // 设置下拉框数据
    setSelectItem();
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
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countInboundOrder",                  // url
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchTransferDraftTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
        window.alert("总记录数为0，请检查！");
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
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listInboundOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    setDataList(result.data);
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
            url: "searchTransferDraft",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
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
    if (pageNumber == null || pageNumber === undefined) {
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listInboundOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
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
                url: "searchTransferDraft",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
                        // console.log(result);
                        setDataList(result.data);
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
        url: "listInboundOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
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
    // getCheckState();
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
        clonedTr.find("td[name='inboundOrderId']").text(data.inboundOrderId);
        clonedTr.find("td[name='inboundDate']").text(getDateStr(data.inboundDate));
        if (data.wareHouseName != null)
        clonedTr.find("td[name='wareHouseName']").text(data.wareHouse.wareHouseName);
        if (data.boundType != null)
        clonedTr.find("td[name='boundType']").text(data.boundType.name);
        if (data.checkState != null)
        clonedTr.find("td[name='checkState']").text(data.checkState.name);
        clonedTr.find("td[name='remarks']").text(data.remarks);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 查找
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            id: $("#search-draftId").val(),
            checkState: $("#search-checkState").val(),
            produceCompany: {
                companyName: $("#search-produceCompanyName").val()
            },
            transportCompany: {
                companyName: $("#search-transportCompanyName").val()
            },
            acceptCompany: {
                companyName: $("#search-acceptCompanyName").val()
            },
            dispatcher: $("#search-dispatcher").val(),
            destination: $("#search-destination").val(),
            transferTime: $("#search-transferTime").val(),
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
        url: "searchTransferDraft",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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
 * 设置物质形态和包装方式的枚举信息
 */
function getSelectedInfo() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesFormType = $("#wastesFormType");
                wastesFormType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastesFormType.append(option);
                });
                wastesFormType.get(0).selectedIndex = -1;
                var wastespackagetype = $("#wastesPackageType");
                wastespackagetype.children().remove();
                $.each(data.packageTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastespackagetype.append(option);
                });
                wastespackagetype.get(0).selectedIndex = -1;
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
 * 设置高级查询的审核状态数据
 */
function getCheckState() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
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
 * 作废转移联单
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该联单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransferDraftInvalid",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result !== undefined && result.status === "success") {
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
}

/**
 * 提交转移联单
 */
function setSubmit(e) {    //已提交
    var r = confirm("确认提交该联单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransferDraftToExamine",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result !== undefined && result.status === "success") {
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
}

/**
 * 修改数据
 * @param e
 */
function adjustData(e) {
    var id = getIdByMenu(e);
    localStorage.transferDraftId = id;
    location.href = "transferDraftInfo.html";
}

/**
 * 根据编号来获取对应的联单信息
 */
function loadData() {
    var id = localStorage.transferDraftId;
    if (id != null) {
        $.ajax({
            type: "POST",
            url: "getTransferDraftById",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    console.log(result);
                    var data = eval(result.data);
                    if (data.produceCompany != null) {
                        $("#produceCompanyName").val(data.produceCompany.companyName);
                        $("#produceCompanyPhone").val(data.produceCompany.phone);
                        $("#produceCompanyLocation").val(data.produceCompany.location);
                        $("#produceCompanyPostcode").val(data.produceCompany.postCode);
                    }
                    if (data.transportCompany != null) {
                        $("#transportCompanyName").val(data.transportCompany.companyName);
                        $("#transportCompanyPhone").val(data.transportCompany.phone);
                        $("#transportCompanyLocation").val(data.transportCompany.location);
                        $("#transportCompanyPostcode").val(data.transportCompany.postCode);
                    }
                    if (data.acceptCompany != null) {
                        $("#acceptCompanyName").val(data.acceptCompany.companyName);
                        $("#acceptCompanyPhone").val(data.acceptCompany.phone);
                        $("#acceptCompanyLocation").val(data.acceptCompany.location);
                        $("#acceptCompanyPostcode").val(data.acceptCompany.postCode);
                    }
                    if (data.wastes != null) {
                        $("#wastesName").val(data.wastes.name);
                        $("#wastesPrepareTransferCount").val(data.wastes.prepareTransferCount);
                        $("#wastesCharacter").val(data.wastes.wastesCharacter);
                        $("#wastesCategory").val(data.wastes.category);
                        $("#wastesTransferCount").val(data.wastes.transferCount);
                        $("#wastesCode").val(data.wastes.code);
                        $("#wastesSignCount").val(data.wastes.signCount);
                        if (data.wastes.formType != null)
                            $("#wastesFormType").val(data.wastes.formType.index-1);
                        if (data.wastes.packageType != null)
                            $("#wastesPackageType").val(data.wastes.packageType.index-1);
                    }
                    $("#outwardIsTransit").prop('checked', data.outwardIsTransit);
                    $("#outwardIsUse").prop('checked', data.outwardIsUse);
                    $("#outwardIsDeal").prop('checked', data.outwardIsDeal);
                    $("#outwardIsDispose").prop('checked', data.outwardIsDispose);
                    $("#mainDangerComponent").val(data.mainDangerComponent);
                    $("#dangerCharacter").val(data.dangerCharacter);
                    $("#emergencyMeasure").val(data.emergencyMeasure);
                    $("#emergencyEquipment").val(data.emergencyEquipment);
                    $("#dispatcher").val(data.dispatcher);
                    $("#destination").val(data.destination);
                    $("#transferTime").val(getTimeStr(data.transferTime));
                    $("#firstCarrier").val(data.firstCarrier);
                    $("#firstCarryTime").val(getTimeStr(data.firstCarryTime));
                    $("#firstModel").val(data.firstModel);
                    $("#firstBrand").val(data.firstBrand);
                    $("#firstTransportNumber").val(data.firstTransportNumber);
                    $("#firstOrigin").val(data.firstOrigin);
                    $("#firstStation").val(data.firstStation);
                    $("#firstDestination").val(data.firstDestination);
                    $("#firstCarrierSign").val(data.firstCarrierSign);
                    $("#secondCarrier").val(data.firstCarrier);
                    $("#secondCarryTime").val(getTimeStr(data.firstCarryTime));
                    $("#secondModel").val(data.secondModel);
                    $("#secondBrand").val(data.secondBrand);
                    $("#secondTransportNumber").val(data.secondTransportNumber);
                    $("#secondOrigin").val(data.secondOrigin);
                    $("#secondStation").val(data.secondStation);
                    $("#secondDestination").val(data.secondDestination);
                    $("#secondCarrierSign").val(data.secondCarrierSign);
                    $("#acceptCompanyLicense").val(data.acceptCompanyLicense);
                    $("#recipient").val(data.recipient);
                    $("#acceptDate").val(getDateStr(data.acceptDate));
                    $("#disposeIsUse").prop('checked', data.disposeIsUse);
                    $("#disposeIsStore").prop('checked', data.disposeIsStore);
                    $("#disposeIsBurn").prop('checked', data.disposeIsBurn);
                    $("#disposeIsLandFill").prop('checked', data.disposeIsLandFill);
                    $("#disposeIsOther").prop('checked', data.disposeIsOther);
                    $("#headSign").val(data.headSign);
                    $("#signDate").val(getDateStr(data.signDate));
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
        url: "getTransferDraftById",
        async: false,
        dataType: "json",
        data: {"id": id},
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                var date = eval(result);
                $("#produceCompanyName").val(date.acceptCompany.companyName);
                $("#produceCompanyPhone").val(date.acceptCompany.phone);
                $("#produceCompanyLocation").val(date.produceCompanyLocation);
                $("#transportCompanyName").val(date.transportCompanyName);
                $("#transportCompanyLocation").val(date.transportCompanyLocation);
                $("#acceptCompanyName").val(date.acceptCompanyName);
                $("#acceptCompanyLocation").val(date.acceptCompanyLocation);
                $("#produceCompanyPostcode").val(date.produceCompanyPostcode);
                $("#transportCompanyPhone").val(date.transportCompanyPhone);
                $("#transportCompanyPostcode").val(date.transportCompanyPostcode);
                $("#acceptCompanyPhone").val(date.acceptCompanyPhone);
                $("#acceptCompanyPostcode").val(date.acceptCompanyPostcode);
                $("#wastesName").val(date.wastesName);
                $("#wastesPrepareTransferCount").val(date.wastesPrepareTransferCount);
                $("#wastesCharacter").val(date.wastesCharacter);
                $("#wastesCategory").val(date.wastesCategory);
                $("#wastesTransferCount").val(date.wastesTransferCount);
                if(date.wastesFormType !== null) $("#wastesFormType").val(date.wastesFormType);
                $("#wastesCode").val(date.wastesCode);
                $("#wastesSignCount").val(date.wastesSignCount);
                if(date.wastesPackageType !== null) $("#wastesPackageType").val(date.wastesPackageType);
                $("#outwardIsTransit").val(date.outwardIsTransit);
                $("#outwardIsUse").val(date.outwardIsUse);
                $("#outwardIsDeal").val(date.outwardIsDeal);
                $("#outwardIsDispose").val(date.outwardIsDispose);
                $("#mainDangerComponent").val(date.mainDangerComponent);
                $("#dangerCharacter").val(date.dangerCharacter);
                $("#emergencyMeasure").val(date.emergencyMeasure);
                $("#emergencyEquipment").val(date.emergencyEquipment);
                $("#dispatcher").val(date.dispatcher);
                $("#destination").val(date.destination);
                $("#transferTime").val(date.transferTime);
                $("#firstCarrier").val(date.firstCarrier);
                $("#firstCarryTime").val(date.firstCarryTime);
                $("#firstModel").val(date.firstModel);
                $("#firstBrand").val(date.firstBrand);
                $("#firstTransportNumber").val(date.firstTransportNumber);
                $("#firstOrigin").val(date.firstOrigin);
                $("#firstStation").val(date.firstStation);
                $("#firstDestination").val(date.firstDestination);
                $("#firstCarrierSign").val(date.firstCarrierSign);
                $("#secondCarrier").val(date.secondCarrier);
                $("#secondCarryTime").val(date.secondCarryTime);
                $("#secondModel").val(date.secondModel);
                $("#secondBrand").val(date.secondBrand);
                $("#secondTransportNumber").val(date.secondTransportNumber);
                $("#secondOrigin").val(date.secondOrigin);
                $("#secondStation").val(date.secondStation);
                $("#secondDestination").val(date.secondDestination);
                $("#secondCarrierSign").val(date.secondCarrierSign);
                $("#acceptCompanyLicense").val(date.acceptCompanyLicense);
                $("#recipient").val(date.recipient);
                $("#acceptDate").val(date.acceptDate);
                $("#disposeIsUse").val(date.disposeIsUse);
                $("#disposeIsStore").val(date.disposeIsStore);
                $("#disposeIsBurn").val(date.disposeIsBurn);
                $("#disposeIsLandFill").val(date.disposeIsLandFill);
                $("#disposeIsOther").val(date.disposeIsOther);
                $("#headSign").val(date.headSign);
                $("#signDate").val(date.signDate);
            } else {
                alert(result.message);
                $("#produceCompanyName").val("");
                $("#produceCompanyPhone").val("");
                $("#produceCompanyLocation").val("");
                $("#transportCompanyName").val("");
                $("#transportCompanyLocation").val("");
                $("#acceptCompanyName").val("");
                $("#acceptCompanyLocation").val("");
                $("#produceCompanyPostcode").val("");
                $("#transportCompanyPhone").val("");
                $("#transportCompanyPostcode").val("");
                $("#acceptCompanyPhone").val("");
                $("#acceptCompanyPostcode").val("");
                $("#wastesName").val("");
                $("#wastesPrepareTransferCount").val("");
                $("#wastesCharacter").val("");
                $("#wastesCategory").val("");
                $("#wastesTransferCount").val("");
                $("#wastesFormType").val("");
                $("#wastesCode").val("");
                $("#wastesSignCount").val("");
                $("#wastesPackageType").val("");
                $("#outwardIsTransit").val("");
                $("#outwardIsUse").val("");
                $("#outwardIsDeal").val("");
                $("#outwardIsDispose").val("");
                $("#mainDangerComponent").val("");
                $("#dangerCharacter").val("");
                $("#emergencyMeasure").val("");
                $("#emergencyEquipment").val("");
                $("#dispatcher").val("");
                $("#destination").val("");
                $("#transferTime").val("");
                $("#firstCarrier").val("");
                $("#firstCarryTime").val("");
                $("#firstModel").val("");
                $("#firstBrand").val("");
                $("#firstTransportNumber").val("");
                $("#firstOrigin").val("");
                $("#firstStation").val("");
                $("#firstDestination").val("");
                $("#firstCarrierSign").val("");
                $("#secondCarrier").val("");
                $("#secondCarryTime").val("");
                $("#secondModel").val("");
                $("#secondBrand").val("");
                $("#secondTransportNumber").val("");
                $("#secondOrigin").val("");
                $("#secondStation").val("");
                $("#secondDestination").val("");
                $("#secondCarrierSign").val("");
                $("#acceptCompanyLicense").val("");
                $("#recipient").val("");
                $("#acceptDate").val("");
                $("#disposeIsUse").val("");
                $("#disposeIsStore").val("");
                $("#disposeIsBurn").val("");
                $("#disposeIsLandFill").val("");
                $("#disposeIsOther").val("");
                $("#headSign").val("");
                $("#signDate").val("");
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
    $("#appointModal2").modal("show");
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}