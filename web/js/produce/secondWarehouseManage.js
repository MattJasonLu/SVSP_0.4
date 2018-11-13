/**
 * Created by matt on 2018/8/2.
 */
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;

var editId;

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
 * 修改
 */
function showModify(e) {
    var id = getIdByMenu(e);
    editId = id;
    setEditSelectList();
    $.ajax({
        type: "POST",
        url: "getInboundOrderById",
        async: false,
        dataType: "json",
        data: {
            inboundOrderId: id
        },
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setEditItemDataList(result.data);
                // inboundOrderItemList
                $("#editModal").modal("show");
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
 * 设置编辑框的下拉数据
 */
function setEditSelectList() {
    // 设置下拉列表
    // 设置次生类别
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesName = $("select[name='editWastesName']");
                wastesName.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name);
                    wastesName.append(option);
                });
                wastesName.get(0).selectedIndex = -1;
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
                var wastesCode = $("select[name='editWastesCode']:first");
                wastesCode.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                // wastesCode.get(0).selectedIndex = -1;
                //刷新下拉数据
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var formType = $("select[name='editFormType']:first");
                formType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;
                var packageType = $("select[name='editPackageType']:first");
                packageType.children().remove();
                $.each(data.packageTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {

        }
    });
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProcessWay",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var processWay = $("select[name='editProcessWay']:first");
                processWay.children().remove();
                $.each(data.processWayList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    processWay.append(option);
                });
                processWay.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {

        }
    });

    // 设置计量单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getUnitList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var wastesUnit = $("select[name='editWastesUnit']:first");
                wastesUnit.children().remove();
                $.each(data.unitList, function (index, item) {
                    if (item.index == 1 || item.index == 2) {
                        var option = $('<option />');
                        option.val(item.index);
                        option.text(item.name);
                        wastesUnit.append(option);
                    }
                });
                wastesUnit.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 设置数据
 * @param result
 */
function setEditItemDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#itemEditClonedTr");
    tr.siblings().remove();
    $.each(result.inboundOrderItemList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    //接运单号
                    $(this).find("td").text(index + 1);
                    break;
                case (1):
                    if (obj.produceCompany != null)
                    $(this).find("span").text(obj.produceCompany.companyName);
                    break;
                case (2):
                    if (obj.wastes != null)
                    $(this).find("select").val(convertSecondWastesNameEngToChn(obj.wastes.name));
                    break;
                case (3):
                    if (obj.wastes != null)
                    $(this).find("select").selectpicker('val', obj.wastes.wastesId);
                    break;
                case (4):
                    $(this).find("input").val(parseFloat(obj.wastesAmount).toFixed(3));
                    break;
                case (5):
                    if (obj.wastesUnit != null)
                    $(this).find("select").val(obj.wastesUnit.index-1);
                    break;
                case (6):
                    $(this).find("input").val(parseFloat(obj.unitPriceTax).toFixed(3));
                    break;
                case (7):
                    $(this).find("input").val(parseFloat(obj.totalPrice).toFixed(3));
                    break;
                case (8):
                    if (obj.processWay != null)
                    $(this).find("select").val(obj.processWay.index-1);
                    break;
                case (9):
                    if (obj.formType != null)
                    $(this).find("select").val(obj.formType.index-1);
                    break;
                case (10):
                    if (obj.packageType != null)
                    $(this).find("select").val(obj.packageType.index-1);
                    break;
                case (11):
                    if (obj.laboratoryTest != null)
                    $(this).find("input").val(parseFloat(obj.laboratoryTest.heatAverage).toFixed(3));
                    break;
                case (12):
                    if (obj.laboratoryTest != null)
                    $(this).find("input").val(parseFloat(obj.laboratoryTest.waterContentAverage).toFixed(3));
                    break;
                case (13):
                    $(this).find("input").val(obj.remarks);
                    break;
                case (14):
                    $(this).find("input").val(obj.warehouseArea);
                    break;
                case (15):
                    $(this).find("span").text(obj.inboundOrderItemId);
                    break;
            }
        });

        // 循环遍历cloneTr的每一个td元素，并赋值
        // clonedTr.find("td[name='editIndex']").text(index + 1);
        // if (data.produceCompany != null) clonedTr.find("span[name='editProduceCompanyName']").text(data.produceCompany.companyName);
        // if (data.wastes != null) {
        //     clonedTr.find("select[name='editWastesName']:first").val(convertSecondWastesNameEngToChn(data.wastes.name));
        //     clonedTr.find("select[name='editWastesCode']:first").selectpicker('val', data.wastes.wastesId);
        // }
        // clonedTr.find("input[name='editWastesAmount']").val(parseFloat(data.wastesAmount).toFixed(3));
        // if (data.wastesUnit != null) clonedTr.find("select[name='editWastesUnit']:first").val(data.wastesUnit.index-1);
        // clonedTr.find("input[name='editUnitPriceTax']").val(parseFloat(data.unitPriceTax).toFixed(3));
        // clonedTr.find("input[name='editTotalPrice']").val(parseFloat(data.totalPrice).toFixed(3));
        // if (data.processWay != null) clonedTr.find("select[name='editProcessWay']:first").val(data.processWay.index-1);
        // if (data.formType != null) clonedTr.find("select[name='editFormType']:first").val(data.formType.index-1);
        // if (data.packageType != null) clonedTr.find("select[name='editPackageType']:first").val(data.packageType.index-1);
        // if (data.laboratoryTest != null) {
        //     clonedTr.find("input[name='editHeatAverage']").val(parseFloat(data.laboratoryTest.heatAverage).toFixed(3));
        //     clonedTr.find("input[name='editWaterContentAverage']").val(parseFloat(data.laboratoryTest.waterContentAverage).toFixed(3));
        // }
        // clonedTr.find("input[name='editRemarks']").val(data.remarks);
        // clonedTr.find("input[name='editWarehouseArea']").val(data.warehouseArea);

        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 修改次生数据
 */
function modifyData() {
    var data = {
        inboundOrderId: editId
    };
    data['inboundOrderItemList'] = [];
    var items = $("#itemEditData").find("tr[id!='itemEditClonedTr']");
    items.each(function() {
        var item = {};
        var wastes = {
            name: $(this).find("select[name='editWastesName']").val(),
            wastesId: $(this).find("select[name='editWastesCode']").selectpicker('val')
        };
        item.wastes = wastes;
        item.wastesAmount = $(this).find("input[name='editWastesAmount']").val();
        item.wastesUnit = $(this).find("select[name='editWastesUnit']").val();
        item.unitPriceTax = $(this).find("input[name='unitPriceTax']").val();
        item.totalPrice = $(this).find("input[name='editTotalPrice']").val();
        item.processWay = $(this).find("select[name='editProcessWay']").val();
        item.formType = $(this).find("select[name='editFormType']").val();
        item.packageType = $(this).find("select[name='editPackageType']").val();
        var laboratoryTest = {
            heatAverage: $(this).find("input[name='editHeatAverage']").val(),
            waterContentAverage: $(this).find("input[name='editWaterContentAverage']").val()
        };
        item.laboratoryTest = laboratoryTest;
        item.remarks = $(this).find("input[name='editRemarks']").val();
        item.warehouseArea = $(this).find("input[name='editWarehouseArea']").val();
        item.inboundOrderItemId = $(this).find("span[name='id']").text();
        data.inboundOrderItemList.push(item);
    });
    $.ajax({
        type: "POST",
        url: "updateSecondInboundOrder",
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                alert(result.message);
                window.location.reload();
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
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        var data1 = {};
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countSecondInboundOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            contentType: "application/json; charset=utf-8",
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
            url: "countSecondInboundOrder",                  // url
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
    setDataList(result);
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
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        var data1 = {};
        data1.page = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listSecondInboundOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
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
            url: "listSecondInboundOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        var data1 = {};
        data1.page = page;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listSecondInboundOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
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
                }
            });
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listSecondInboundOrder",         // url
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
    var data1 = {};
    data1.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSecondInboundOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data1),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
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
    getSelectedInfo();
}

/**
 * 设置高级查询的审核状态数据
 */
function getSelectedInfo() {
    // 设置校验状态
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
                    if (item.index == 13 || item.index == 7) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        checkState.append(option);
                    }
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
    // 设置记录状态
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRecordState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var recordState = $("#search-recordState");
                recordState.children().remove();
                $.each(data.recordStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    recordState.append(option);
                });
                recordState.get(0).selectedIndex = -1;
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
 * 设置数据
 * @param result
 */
function setDataList(result) {
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
        if (data.wareHouse != null) clonedTr.find("td[name='wareHouseName']").text(data.wareHouse.wareHouseName);
        if (data.boundType != null) clonedTr.find("td[name='boundType']").text(data.boundType.name);
        if (data.recordState != null) clonedTr.find("td[name='recordState']").text(data.recordState.name);
        clonedTr.find("td[name='creatorId']").text(data.creatorId);
        clonedTr.find("td[name='keeperId']").text(data.keeperId);
        clonedTr.find("td[name='directorId']").text(data.directorId);
        clonedTr.find("td[name='approverId']").text(data.approverId);
        if (data.checkState != null) clonedTr.find("td[name='checkState']").text(data.checkState.name);
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
            inboundOrderId: $("#search-inboundOrderId").val(),
            wareHouse: {
                wareHouseName: $("#search-warehouseName").val()
            },
            recordState: $("#search-recordState").val(),
            checkState: $("#search-checkState").val(),
            companyId: $("#search-beginTime").val(), // 起始时间
            modifierId: $("#search-endTime").val(),   // 结束时间
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
        url: "listSecondInboundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;
}

/**
 * 增加数据
 */
function addData(state) {

    var data = {
        checkState: state === 'save' ? 'ToSubmit' : 'ToExamine'
    };
    // 定义列表
    data['inboundOrderItemList'] = [];
    var trs = $("#inboundOrderData").find("tr[id!='plus']");
    for (var i = 0; i < trs.length; i++) {
        var tr = $(trs[i]);
        var item = {
            produceCompany: {
                companyName: tr.find("td[name='produceCompanyName']").text()
            },
            wastes: {
                name: tr.find("select[name='wastesName']").val(),
                wastesId: tr.find("select[name='wastesCode']").val()
            },
            wastesAmount: tr.find("input[name='wastesAmount']").val(),
            wastesUnit: tr.find("select[name='wastesUnit']").val(),
            unitPriceTax: tr.find("input[name='unitPriceTax']").val(),
            totalPrice: tr.find("td[name='totalPrice']").text(),
            processWay: tr.find("select[name='processWay']").val(),
            handleCategory: tr.find("select[name='handleCategory']").val(),
            formType: tr.find("select[name='formType']").val(),
            packageType: tr.find("select[name='packageType']").val(),
            laboratoryTest: {
                heatAverage: tr.find("input[name='heat']").val(),
                waterContentAverage: tr.find("input[name='waterContent']").val(),
            },
            remarks: tr.find("input[name='remarks']").val(),
            warehouseArea: tr.find("input[name='warehouseArea']").val()
        };
        console.log(item.wastes);
        // console.log(item);
        data.inboundOrderItemList.push(item);
    }
    // 上传用户数据
    $.ajax({
        type: "POST",                           // 方法类型
        url: "addSecondInboundOrder",                // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined) {
                if (result.status === "success") {
                    alert(result.message);

                    $(location).attr('href', 'secondWarehouseManage.html');
                } else {
                    console.log(result);
                    alert(result.message);
                }
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });

}

/**
 * 作废转移联单
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundOrderStateInvalid",
            async: false,
            dataType: "json",
            data: {
                inboundOrderId: id
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
            }
        });
    }
}

function setSubmit(e) {
    var r = confirm("确认提交该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setInboundOrderStateSubmit",
            async: false,
            dataType: "json",
            data: {
                inboundOrderId: id
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
        url: "getInboundOrderById",
        async: false,
        dataType: "json",
        data: {
            inboundOrderId: id
        },
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setItemDataList(result.data);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $("#viewModal").modal("show");
}

/**
 * 设置数据
 * @param result
 */
function setItemDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#itemClonedTr");
    tr.siblings().remove();
    $.each(result.inboundOrderItemList, function (index, item) {
        var data = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='index']").text(index + 1);
        if (data.produceCompany != null) clonedTr.find("td[name='produceCompanyName']").text(data.produceCompany.companyName);
        if (data.wastes != null) {
            clonedTr.find("td[name='wastesName']").text(convertStrToWastesName(data.wastes.name));
            clonedTr.find("td[name='wastesCode']").text(data.wastes.wastesId);
        }
        clonedTr.find("td[name='wastesAmount']").text(parseFloat(data.wastesAmount).toFixed(3));
        if (data.wastesUnit != null) clonedTr.find("td[name='wastesUnit']").text(data.wastesUnit.name);
        clonedTr.find("td[name='unitPriceTax']").text(parseFloat(data.unitPriceTax).toFixed(3));
        clonedTr.find("td[name='totalPrice']").text(parseFloat(data.totalPrice).toFixed(3));
        if (data.processWay != null) clonedTr.find("td[name='processWay']").text(data.processWay.name);
        if (data.handleCategory != null) clonedTr.find("td[name='handleCategory']").text(data.handleCategory.name);
        if (data.formType != null) clonedTr.find("td[name='formType']").text(data.formType.name);
        if (data.packageType != null) clonedTr.find("td[name='packageType']").text(data.packageType.name);
        if (data.laboratoryTest != null) {
            clonedTr.find("td[name='heatAverage']").text(data.laboratoryTest.heatAverage);
            clonedTr.find("td[name='phAverage']").text(data.laboratoryTest.phAverage);
            clonedTr.find("td[name='ashAverage']").text(data.laboratoryTest.ashAverage);
            clonedTr.find("td[name='waterContentAverage']").text(data.laboratoryTest.waterContentAverage);
            clonedTr.find("td[name='chlorineContentAverage']").text(data.laboratoryTest.chlorineContentAverage);
            clonedTr.find("td[name='sulfurContentAverage']").text(data.laboratoryTest.sulfurContentAverage);
            clonedTr.find("td[name='phosphorusContentAverage']").text(data.laboratoryTest.phosphorusContentAverage);
            clonedTr.find("td[name='fluorineContentAverage']").text(data.laboratoryTest.fluorineContentAverage);
        }
        clonedTr.find("td[name='remarks']").text(data.remarks);
        clonedTr.find("td[name='warehouseArea']").text(data.warehouseArea);

        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return e.parent().parent().find("td[name='inboundOrderId']").text();
}
var id1;
/**
 * 增加新行
 */
function addNewLine() {
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.find("input").val("");
    clonedTr.find("select").each(function () {
        $(this).get(0).selectedIndex = -1;
    });
    // 获取编号
    var id = tr.find("td[name='index']").text();
    var num = parseInt(id);
    if (!isNaN(num)) {
        num++;
        id1 = num;
    } else {
        id1++;
        num = id1;
    }
    clonedTr.find("td[name='index']").text(num);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine($(this));id1--;'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);
    clonedTr.insertAfter(tr);
    //
    // $('.selectpicker').data('selectpicker', null);
    // $('.bootstrap-select').find("button:first").remove();
    // // 中文重写select 查询为空提示信息
    // $('.selectpicker').selectpicker({
    //     language: 'zh_CN',
    //     size: 4,
    //     title: '请选择',
    //     dropupAuto:false
    // });
    // $('.selectpicker').selectpicker('refresh');
}
/**
 * 删除行操作
 * @param e
 */
function delLine(e) {
    e.parent().parent().remove();
}
/**
 * 设置下拉框数据
 */
function setSelectList() {
    // 设置下拉列表
    // 设置次生类别
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesName = $("select[name='wastesName']");
                wastesName.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name);
                    wastesName.append(option);
                });
                wastesName.get(0).selectedIndex = -1;
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
                var wastesCode = $("select[name='wastesCode']");
                wastesCode.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                // wastesCode.get(0).selectedIndex = -1;
                //刷新下拉数据
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var formType = $("select[name='formType']");
                formType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;
                var packageType = $("select[name='packageType']");
                packageType.children().remove();
                $.each(data.packageTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {

        }
    });
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProcessWay",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var processWay = $("select[name='processWay']");
                processWay.children().remove();
                $.each(data.processWayList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    processWay.append(option);
                });
                processWay.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {

        }
    });
    $("select[name='wastesName']").get(0).selectedIndex = -1;

    // 设置计量单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getUnitList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var wastesUnit = $("select[name='wastesUnit']");
                wastesUnit.children().remove();
                $.each(data.unitList, function (index, item) {
                    if (item.index == 1 || item.index == 2) {
                        var option = $('<option />');
                        option.val(item.index);
                        option.text(item.name);
                        wastesUnit.append(option);
                    }
                });
                wastesUnit.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
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

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    console.log("export");
    var name = 't_pl_inboundorder';
    var sqlWords = "select t_pl_inboundorder.inboundOrderId, inboundDate, warehouseId, boundType, transferDraftId, (select companyName from client where clientId=produceCompanyId) as 'companyName', wastesName, wastesCode, wastesAmount, unitPriceTax, totalPrice, processWay, handleCategory, t_pl_inboundorderitem.remarks, warehouseArea from t_pl_inboundorder join t_pl_inboundorderitem where t_pl_inboundorderitem.inboundOrderId=t_pl_inboundorder.inboundOrderId and boundType='SecondaryInbound';";
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
    var filePath = 'Files/Templates/次生入库单导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r) {
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
            url: "importSecondWastesInboundExcel",              // url
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
 * 计算总价
 * @param e
 */
function calculateTotalPrice(e) {
    var tr = $(e).parent().parent();
    // 单价
    var unitPriceTax = parseFloat(tr.find("input[name='unitPriceTax']").val());
    var wastesAmount = parseFloat(tr.find("input[name='wastesAmount']").val());
    var total = unitPriceTax * wastesAmount;
    if (!isNaN(total)) tr.find("td[name='totalPrice']").text(total.toFixed(3));
}

$(window).on('load', function () {
    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4,
        title: '请选择',
        dropupAuto:false
    });
});