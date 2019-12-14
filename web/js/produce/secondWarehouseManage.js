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
    var text = mySelect.options[index].text;
    if(text == "全部"){
        text = "0";
    }
    return text;
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
    // 设置次生类别
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryCategoryByDataDictionary",                  // url
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
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
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
        url: "getFormTypeByDataDictionary",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var formType = $("select[name='editFormType']:first");
                formType.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;

            }
        },
        error: function (result) {

        }
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPackageTypeByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var packageType = $("select[name='editPackageType']:first");
                packageType.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = -1;
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
        url: "getProcessWayByDataDictionary",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var processWay = $("select[name='editProcessWay']:first");
                processWay.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
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
        url: "getUnitByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var wastesUnit = $("select[name='editWastesUnit']:first");
                wastesUnit.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    wastesUnit.append(option);
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
                    $(this).find("select").val(obj.secondaryCategoryItem.dataDictionaryItemId);
                    break;
                case (3):
                    if (obj.wastes != null)
                    $(this).find("select").selectpicker('val', obj.wastes.wastesId);
                    break;
                case (4):
                    $(this).find("input").val(parseFloat(obj.wastesAmount).toFixed(3));
                    break;
                case (5):
                    if (obj.unitDataItem != null)
                    $(this).find("select").val(obj.unitDataItem.dataDictionaryItemId);
                    break;
                case (6):
                    $(this).find("input").val(parseFloat(obj.unitPriceTax).toFixed(3));
                    break;
                case (7):
                    $(this).find("input").val(parseFloat(obj.totalPrice).toFixed(3));
                    break;
                case (8):
                    if (obj.processWay != null)
                    $(this).find("select").val(obj.processWay.dataDictionaryItemId);
                    break;
                case (9):
                    if (obj.formType != null)
                    $(this).find("select").val(obj.formTypeItem.dataDictionaryItemId);
                    break;
                case (10):
                    if (obj.packageType != null)
                    $(this).find("select").val(obj.packageTypeItem.dataDictionaryItemId);
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
        $('.selectpicker').data('selectpicker', null);
        $('.bootstrap-select').find("button:first").remove();
        $('.selectpicker').selectpicker("refresh");
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
            wastesId: $(this).find("select[name='editWastesCode']").selectpicker('val')
        };
        item.wastes = wastes;
        item.wastesAmount = $(this).find("input[name='editWastesAmount']").val();
        var unitDataItem = {
            dataDictionaryItemId: $(this).find("select[name='editWastesUnit']").val()
        };
        item.unitDataItem = unitDataItem;
        item.unitPriceTax = $(this).find("input[name='unitPriceTax']").val();
        item.totalPrice = $(this).find("input[name='editTotalPrice']").val();
        var secondaryCategoryItem = {
            dataDictionaryItemId: $(this).find("select[name='editWastesName']").val()
        };
        item.secondaryCategoryItem = secondaryCategoryItem;
        var processWayItem = {
            dataDictionaryItemId: $(this).find("select[name='editProcessWay']").val()
        };
        item.processWayItem = processWayItem;
        var formTypeItem = {
            dataDictionaryItemId: $(this).find("select[name='editFormType']").val()
        };
        item.formTypeItem = formTypeItem;
        var packageTypeItem = {
            dataDictionaryItemId: $(this).find("select[name='editPackageType']").val()
        };
        item.packageTypeItem = packageTypeItem;
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
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#editModal").modal("hide");
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
    loadNavigationList();   // 设置动态菜单
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
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchData();
        window.localStorage.removeItem('approvalId');
    }else {
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
    }

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
    var pageTotal = 0;
    $.each(result, function (index, item) {
        var data = eval(item);

        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='inboundOrderId']").text(data.inboundOrderId);
        clonedTr.find("td[name='inboundDate']").text(getDateStr(data.inboundDate));

        if (data.inboundOrderItemList.length > 0) {
            if (data.inboundOrderItemList[0].wareHouse != null) clonedTr.find("td[name='wareHouseName']").text(data.inboundOrderItemList[0].wareHouse.wareHouseName);
            if (data.inboundOrderItemList[0].secondaryCategoryItem != null)
            clonedTr.find("td[name='wastesName']").text(data.inboundOrderItemList[0].secondaryCategoryItem.dictionaryItemName);
            if (data.inboundOrderItemList[0].wastes != null) {
                clonedTr.find("td[name='wastesCode']").text(data.inboundOrderItemList[0].wastes.wastesId);
            }
            // 增加本页合计
            pageTotal += data.inboundOrderItemList[0].wastesAmount;
            clonedTr.find("td[name='wastesAmount']").text(parseFloat(data.inboundOrderItemList[0].wastesAmount).toFixed(3));
            if (data.inboundOrderItemList[0].unitDataItem != null) clonedTr.find("td[name='wastesUnit']").text(data.inboundOrderItemList[0].unitDataItem.dictionaryItemName);
            clonedTr.find("td[name='unitPriceTax']").text(parseFloat(data.inboundOrderItemList[0].unitPriceTax).toFixed(2));
            clonedTr.find("td[name='totalPrice']").text(parseFloat(data.inboundOrderItemList[0].totalPrice).toFixed(2));
            if (data.inboundOrderItemList[0].laboratoryTest != null) {
                var heatAverage = parseFloat(data.inboundOrderItemList[0].laboratoryTest.heatAverage).toFixed(3);
                clonedTr.find("td[name='heatAverage']").text(isNaN(heatAverage) ? 0 : heatAverage);
                var waterContentAverage = parseFloat(data.inboundOrderItemList[0].laboratoryTest.laboratoryTest).toFixed(3);
                clonedTr.find("td[name='waterContentAverage']").text(isNaN(waterContentAverage) ? 0 : waterContentAverage);
            }
        }
        clonedTr.find("td[name='creatorId']").text(data.creatorId);
        if (data.checkStateItem != null) clonedTr.find("td[name='checkState']").text(data.checkStateItem.dictionaryItemName);
        clonedTr.find("td[name='remarks']").text(data.remarks);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    // 增加本页合计
    var clonedTr = tr.clone();
    clonedTr.show();
    clonedTr.find("td[name='wastesCode']").text("合计");
    clonedTr.find("td[name='wastesAmount']").text(pageTotal.toFixed(3));
    clonedTr.removeAttr("id");
    clonedTr.insertBefore(tr);
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
    var wareHouse = {};
    for (var i = 0; i < trs.length; i++) {
        var tr = $(trs[i]);
        wareHouse.wareHouseId = tr.find("select[name='warehouse']").val();
        var item = {
            inboundDate: tr.find("input[name='inboundDate']").val(),
            produceCompany: {
                companyName: tr.find("input[name='produceCompanyName']").val()
            },
            wastes: {
                name: tr.find("select[name='wastesName']").text(),
                wastesId: tr.find("select[name='wastesCode']").val()
            },
            secondaryCategoryItem: {
                dataDictionaryItemId: tr.find("select[name='wastesName']").val()
            },
            wastesAmount: tr.find("input[name='wastesAmount']").val(),
            unitDataItem: {
                dataDictionaryItemId: tr.find("select[name='wastesUnit']").val()
            },
            unitPriceTax: tr.find("input[name='unitPriceTax']").val(),
            totalPrice: tr.find("td[name='totalPrice']").text(),
            processWayItem: {
                dataDictionaryItemId: tr.find("select[name='processWay']").val()
            },
            handleCategoryItem: {
                dataDictionaryItemId: tr.find("select[name='handleCategory']").val()
            },
            formTypeItem: {
                dataDictionaryItemId: tr.find("select[name='formType']").val()
            },
            packageTypeItem: {
                dataDictionaryItemId: tr.find("select[name='packageType']").val()
            },
            laboratoryTest: {
                heatAverage: tr.find("input[name='heat']").val(),
                waterContentAverage: tr.find("input[name='waterContent']").val()
            },
            remarks: tr.find("input[name='remarks']").val(),
            wareHouse: {
                wareHouseId: tr.find("select[name='warehouse']").val()
            },
            warehouseArea: tr.find("input[name='warehouseArea']").val()
        };
        console.log(item.wastes);
        // console.log(item);
        data.wareHouse = wareHouse;
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
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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

/*审批方法*/
/*驳回方法*/



/**
 * 提交
 * @param e
 */
function setSubmit(e) {
    initSubmitFName(setInboundOrderStateSubmit.name);
    var r = confirm("确认提交该入库单吗？");
    if (r) {
        var id = getIdByMenu(e);
        publicSubmit(id,getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
        // $.ajax({
        //     type: "POST",
        //     url: "setInboundOrderStateSubmit",
        //     async: false,
        //     dataType: "json",
        //     data: {
        //         inboundOrderId: id
        //     },
        //     success: function (result) {
        //         if (result !== undefined && result.status === "success") {
        //             console.log(result);
        //             alert(result.message);
        //             window.location.reload();
        //         } else {
        //             alert(result.message);
        //         }
        //     },
        //     error: function (result) {
        //         console.log(result);
        //     }
        // });
    }
}
function setInboundOrderStateSubmit(id) {
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
        clonedTr.find("td[name='wastesName']").text(data.secondaryCategoryItem.dictionaryItemName);
        if (data.wastes != null) {
            clonedTr.find("td[name='wastesCode']").text(data.wastes.wastesId);
        }
        clonedTr.find("td[name='wastesAmount']").text(parseFloat(data.wastesAmount).toFixed(3));
        if (data.unitDataItem != null) clonedTr.find("td[name='wastesUnit']").text(data.unitDataItem.dictionaryItemName);
        clonedTr.find("td[name='unitPriceTax']").text(parseFloat(data.unitPriceTax).toFixed(3));
        clonedTr.find("td[name='totalPrice']").text(parseFloat(data.totalPrice).toFixed(3));
        if (data.processWayItem != null) clonedTr.find("td[name='processWay']").text(data.processWayItem.dictionaryItemName);
        if (data.handleCategoryItem != null) clonedTr.find("td[name='handleCategory']").text(data.handleCategoryItem.dictionaryItemName);
        if (data.formTypeItem != null) clonedTr.find("td[name='formType']").text(data.formTypeItem.dictionaryItemName);
        if (data.packageTypeItem != null) clonedTr.find("td[name='packageType']").text(data.packageTypeItem.dictionaryItemName);
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
        if (!$(this).hasClass("selectpicker")) $(this).get(0).selectedIndex = -1;
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
    // 设置编号
    clonedTr.find("td[name='index']").text(num);
    // 设置公司名称
    clonedTr.find("input[name='produceCompanyName']").val("北控安耐得环保科技发展常州有限公司");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine($(this));id1--;'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);
    clonedTr.insertAfter(tr);
    // 去除重复
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();
    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        dropupAuto: false,
        size: 4
    });
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
    loadNavigationList();   // 设置动态菜单
    // 设置下拉列表
    // 设置次生类别
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryCategoryByDataDictionary",                  // url
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
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
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
        url: "getFormTypeByDataDictionary",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var formType = $("select[name='formType']");
                formType.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;

            }
        },
        error: function (result) {

        }
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPackageTypeByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var packageType = $("select[name='packageType']");
                packageType.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // update 2019年1月4日 by ljc ：去除处理方式
    // $.ajax({
    //     type: "POST",                            // 方法类型
    //     url: "getProcessWayByDataDictionary",                  // url
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined) {
    //             var data = eval(result);
    //             var processWay = $("select[name='processWay']");
    //             processWay.children().remove();
    //             $.each(data.data, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(item.dataDictionaryItemId);
    //                 option.text(item.dictionaryItemName);
    //                 processWay.append(option);
    //             });
    //             processWay.get(0).selectedIndex = -1;
    //         }
    //     },
    //     error: function (result) {
    //
    //     }
    // });

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
                var warehouse = $("select[name='warehouse']");
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

    // 设置计量单位
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getUnitByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var wastesUnit = $("select[name='wastesUnit']");
                wastesUnit.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    wastesUnit.append(option);
                });
                wastesUnit.get(0).selectedIndex = 1;//默认为吨==>YH
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        dropupAuto: false,
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

function setInboundOrderStateApproval(id) {
    $.ajax({
        type: "POST",
        url: "setInboundOrderStateApproval",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (result) {
            if (result !== undefined && result.status === "success") {
               alert(result.message)
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function setInboundOrderStateBack(id) {
    $.ajax({
        type: "POST",
        url: "setInboundOrderStateBack",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                // alert(result.message)
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
 * 新审批
 */
function approval(item) {
    initSubmitFName(setInboundOrderStateSubmit.name);
    initApprovalFName(setInboundOrderStateApproval.name);
    initBakcFName(setInboundOrderStateBack.name);
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