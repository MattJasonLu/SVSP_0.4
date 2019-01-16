/**
 * 加载下拉框数据
 */
function loadSelect() {
    loadNavigationList();   // 设置动态菜单
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
    // $.ajax({
    //     type: "POST",                            // 方法类型
    //     url: "getFormTypeByDataDictionary",                  // url
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined) {
    //             var data = eval(result);
    //             var formType = $("select[name='formType']");
    //             formType.children().remove();
    //             $.each(data.data, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(item.dataDictionaryItemId);
    //                 option.text(item.dictionaryItemName);
    //                 formType.append(option);
    //             });
    //             formType.get(0).selectedIndex = -1;
    //
    //         }
    //     },
    //     error: function (result) {
    //
    //     }
    // });
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getPackageTypeByDataDictionary",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result !== undefined) {
    //             var data = eval(result);
    //             // 高级检索下拉框数据填充
    //             var packageType = $("select[name='packageType']");
    //             packageType.children().remove();
    //             $.each(data.data, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(item.dataDictionaryItemId);
    //                 option.text(item.dictionaryItemName);
    //                 packageType.append(option);
    //             });
    //             packageType.get(0).selectedIndex = -1;
    //         } else {
    //             console.log("fail: " + result);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });
    // 处理方式
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProcessWayByDataDictionary",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var processWay = $("select[name='processWay']");
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
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getUnitByDataDictionary",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined) {
    //             var data = eval(result);
    //             var wastesUnit = $("select[name='wastesUnit']");
    //             wastesUnit.children().remove();
    //             $.each(data.data, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(item.dataDictionaryItemId);
    //                 option.text(item.dictionaryItemName);
    //                 wastesUnit.append(option);
    //             });
    //             wastesUnit.get(0).selectedIndex = 1;//默认为吨==>YH
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });

    // 设置进料方式
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getHandleCategoryByDataDictionary",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var handleCategory = $("select[name='handleCategory']");
                handleCategory.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 设置税率
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getTicketRate1ByDataDictionary",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var rate = $("select[name='rate']");
                rate.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    rate.append(option);
                });
                rate.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 设置产废单位
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getAllClients",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var produceCompany = $("select[name='produceCompany']");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.selectpicker('val', '');
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    $('.selectpicker').selectpicker('refresh');
    $('.loader').hide();
}

/**
 * 加行
 * @param item
 */
function addNewLine(item) {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size:4 //显示条目
    });
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").val("");
    clonedTr.children().find("a[name='delbtn']").remove();
    //clonedTr.children().find("select[name='name']").selectpicker('val',"");
    clonedTr.children().find("input[name='number']").val('0.000');  // 数量初始为0
    // clonedTr.children().find("input[name='warehouseArea']").val('0.00');  // 单价初始为0
    // clonedTr.children().find("input[name='totalPrice']").val('0.00');  // 金额初始为0
    // 获取编号
    var id = $("#plusBtn").prev().children().find("span[name='serialNumber']").text();   // 获取最后一行序号
    var id1=(id.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().find("span[name='serialNumber']").text(num);   // 更新序号
    clonedTr.children("td:not(0)").find("span,input,select").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.children().eq(0).find("span[name='serialNumber']").text(num);
    clonedTr.insertAfter(tr);
    var delBtn = "<a name='delbtn' class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);
    if($("span[name='serialNumber']").length === 2) {  // 给第一行增加减行按钮
        $("#serialNumber0").before(delBtn);
    }
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker('refresh');
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
}
/**
 * 删除行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 4;         // 行数
    var tBody = $("#tbody1");                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    console.log("行数:"+length);
    for (var i = 1; i < length; i++) {             // 更新ID
        tBody.children().eq(i).find("input,select,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i - 1);
            $(this).prop('id', newId);
        });
        tBody.children().eq(i).find("span[name='serialNumber']").text(i);// 更新序号
    }
    // totalCalculate(); // 减行后重新计算金额
    console.log("length:"+$("span[name='serialNumber']").length);
    if($("span[name='serialNumber']").length === 1){  // 如果只有一行则不允许删除
        $("a[name='delbtn']").remove();
    }
}
/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    // 遍历数据
    $("#inboundOrderData").children().not("#plusBtn").each(function () {
        var wastesAmount = $(this).find("input[name='wastesAmount']").val();
        var unitPriceTax = $(this).find("input[name='unitPriceTax']").val();
        var totalPrice = (parseFloat(wastesAmount) * parseFloat(unitPriceTax)).toFixed(2);
        if (isNaN(totalPrice)) totalPrice = 0; // 不显示NaN
        $(this).find("td[name='totalPrice']").text(totalPrice);
    });
}


/**
 * 增加入库单
 */
function addInboundOrder() {
    var inboundOrderItemList = [];
    var wareHouse = {};
    $("#inboundOrderData").children().not("#plusBtn").each(function () {
        console.log($(this).html());
        var inboundOrder = {};
        inboundOrder.transferDraftId = $(this).find("input[name='transferDraftId']").val();
        inboundOrder.produceCompany = {
            clientId: $(this).find("select[name='produceCompany']").selectpicker('val')
        };
        var wastes = {};
        wastes.name = $(this).find("input[name='wastesName']").val();
        wastes.wastesId = $(this).find("select[name='wastesCode']").val();
        inboundOrder.wastes = wastes;
        inboundOrder.wastesAmount = $(this).find("input[name='wastesAmount']").val();
        inboundOrder.unitPriceTax = $(this).find("input[name='unitPriceTax']").val();
        inboundOrder.totalPrice = $(this).find("td[name='totalPrice']").text();
        inboundOrder.processWayItem = {
            dataDictionaryItemId: $(this).find("select[name='processWay']").val()
        };
        inboundOrder.handleCategoryItem = {
            dataDictionaryItemId: $(this).find("select[name='handleCategory']").val()
        };
        inboundOrder.ticketRateItem = {
            dataDictionaryItemId: $(this).find("select[name='rate']").val()
        };
        inboundOrder.remarks = $(this).find("input[name='remarks']").val();
        inboundOrder.wareHouse = {
            wareHouseId: $(this).find("select[name='warehouse']").val()
        };
        wareHouse.wareHouseId = $(this).find("select[name='warehouse']").val();
        inboundOrder.warehouseArea = $(this).find("input[name='warehouseArea']").val();
        inboundOrderItemList.push(inboundOrder);
    });
    var data = {};
    data.inboundOrderItemList = inboundOrderItemList;
    data.wareHouse = wareHouse;
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