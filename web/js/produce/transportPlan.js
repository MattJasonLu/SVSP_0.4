/**
 * 分页 获取首页内容
 * */
function loadData() {
    loadNavigationList();   // 设置动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRecentTransportPlan",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    $("#week").text(getWeekDate());
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.transportPlanItemList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            changeId(clonedTr, index+1);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(index+1);
                    break;
                case (2):
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (3):
                    if (obj.handleCategory != null)
                        $(this).html(obj.handleCategory.name);
                    break;
                case (4):
                    $(this).html(getDateStr(obj.approachTime));
                    break;
                case (5):
                    $(this).html(obj.wastes.name);
                    break;
                case (6):
                    $(this).html(obj.wastes.wastesId);
                    break;
                case (7):
                    $(this).html(obj.wastes.wasteAmount);
                    break;
                case (8):
                    $(this).html(obj.wastes.unit);
                    break;
                case (9):
                    if (obj.wastes.formType != null)
                        $(this).html(obj.wastes.formType.name);
                    break;
                case (10):
                    if (obj.wastes.packageType != null)
                        $(this).html(obj.wastes.packageType.name);
                    break;
                case (11):
                    $(this).html(obj.wastes.calorific);
                    break;
                case (12):
                    $(this).html(obj.wastes.ph);
                    break;
                case (13):
                    $(this).html(obj.wastes.ashPercentage);
                    break;
                case (14):
                    $(this).html(obj.wastes.wetPercentage);
                    break;
                case (15):
                    $(this).html(obj.wastes.chlorinePercentage);
                    break;
                case (16):
                    $(this).html(obj.wastes.sulfurPercentage);
                    break;
                case (17):
                    $(this).html(obj.wastes.phosphorusPercentage);
                    break;
                case (18):
                    $(this).html(obj.wastes.fluorinePercentage);
                    break;
                case (19):
                    if (obj.wastes.processWay != null)
                        $(this).html(obj.wastes.processWay.name);
                    break;
                case (20):
                    $(this).html(obj.id);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    $("#id").val(result.id);
    $("#author").val(result.author);
    $("#departmentDirector").val(result.departmentDirector);
    $("#group").val(result.group);
    $("#productionDirector").val(result.productionDirector);

    /**
     * 改变id
     * @param element
     */
    function changeId(element, index) {
        element.find("td[id*='transportPlanItemList']").each(function () {
            var oldId = $(this).prop("id");
            var newId = oldId.replace(/[0-9]\d*/, index);
            $(this).prop('id', newId);
        });
    }
}

/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

function setWastesData() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getTransportPlanWastesList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setWastesDataList(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    /**
     * 设置数据
     * @param result
     */
    function setWastesDataList(result) {
        // 获取id为cloneTr的tr元素
        var tr = $("#wastesClonedTr");
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
                        if (obj.client != null)
                            $(this).html(obj.client.companyName);
                        break;
                    case (2):
                        $(this).html(obj.name);
                        break;
                    case (3):
                        $(this).html(obj.wastesId);
                        break;
                    case (4):
                        if (obj.formType != null)
                            $(this).html(obj.formType.name);
                        break;
                    case (5):
                        if (obj.packageType != null)
                            $(this).html(obj.packageType.name);
                        break;
                    case (6):
                        $(this).html(obj.calorific);
                        break;
                    case (7):
                        $(this).html(obj.ph);
                        break;
                    case (8):
                        $(this).html(obj.ashPercentage);
                        break;
                    case (9):
                        $(this).html(obj.wetPercentage);
                        break;
                    case (10):
                        $(this).html(obj.chlorinePercentage);
                        break;
                    case (11):
                        $(this).html(obj.sulfurPercentage);
                        break;
                    case (12):
                        $(this).html(obj.phosphorusPercentage);
                        break;
                    case (13):
                        $(this).html(obj.fluorinePercentage);
                        break;
                    case (14):
                        $(this).html(obj.id);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
        tr.first().remove();
    }
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
            if (result != undefined && result.status == "success") {
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
function getCheckState() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
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
 * 确认
 */
function setConfirm() {
    var r = confirm("确认该运输计划单吗？");
    if (r) {
        var id = $("#id").val();
        $.ajax({
            type: "POST",
            url: "setTransportPlanConfirm",
            async: false,
            dataType: "json",
            data: {
                id: id
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
}

/**
 * 作废
 */
function setInvalid() {    //已作废
    var r = confirm("确认作废该运输计划单吗？");
    if (r) {
        var id = $("#id").val();
        $.ajax({
            type: "POST",
            url: "setTransportPlanInvalid",
            async: false,
            dataType: "json",
            data: {
                id: id
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
}

/**
 * 提交
 */
function setSubmit() {    //已作废
    var r = confirm("确认提交该运输计划单吗？");
    if (r) {
        var id = $("#id").val();
        $.ajax({
            type: "POST",
            url: "setTransportPlanSubmit",
            async: false,
            dataType: "json",
            data: {
                id: id
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
}

/**
 * 审批
 */
function setExamined() {    //已作废
    var r = confirm("确认审批该运输计划单吗？");
    if (r) {
        var id = $("#id").val();
        $.ajax({
            type: "POST",
            url: "setTransportPlanExamined",
            async: false,
            dataType: "json",
            data: {
                id: id
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
}

/**
 * 编辑数据
 */
function editData() {
    if ($("#editBtnGrp").hasClass("hidden")) {
        $("#editBtnGrp").removeClass("hidden");
        $("#editBtnGrp").addClass("show");
        $("#mainData").find("[id^='transportPlanItemList']").each(function () {
            var id = $(this).prop('id');
            var content = $(this).text();
            if (id.search("id2") != -1) {
                // 编号不要修改
            } else if (id.search("approachTime2") != -1) {
                $(this).prop('id', '');
                $(this).html("<input type='text' style='width: 100px;' value='" + content + "' id='" + id + "'>");
            } else if (id.search("processWay2") != -1) {
                $(this).prop('id', '');
                if (content == "焚烧")
                    $(this).html("<select id='" + id + "'><option value='Burning' selected>焚烧</option><option value='Landfill'>填埋</option></select>");
                if (content == "填埋")
                    $(this).html("<select id='" + id + "'><option value='Burning'>焚烧</option><option value='Landfill' selected>填埋</option></select>");
            } else {
                $(this).prop('id', '');
                $(this).html("<input type='text' style='width: 50px;' value='" + content + "' id='" + id + "'>");
            }
        });

        $("#editBtnCancel").unbind();
        $("#editBtnCancel").click(function () {
            window.location.reload();
        });

        $("#editBtnSave").unbind();
        $("#editBtnSave").click(function () {
            var data = {};
            data.id = $("#id").val();
            data['transportPlanItemList'] = [];
            var count = $("input[id$='approachTime2']").length;
            for (var i = 1; i < count; i++) {
                var $i = i;
                var transportPlanItem = {};
                transportPlanItem.id = $("td[id='transportPlanItemList[" + $i + "].id2']").text();
                transportPlanItem.approachTime = $("input[id='transportPlanItemList[" + $i + "].approachTime2']").val();
                var wastes = {};
                wastes.wasteAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount2']").val();
                wastes.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit2']").val();
                wastes.processWay = $("select[id='transportPlanItemList[" + $i + "].wastes.processWay2']").val();
                transportPlanItem.wastes = wastes;
                data.transportPlanItemList.push(transportPlanItem);
            }

            $.ajax({
                type: "POST",
                url: "updateTransportPlan",
                async: false,
                dataType: "json",
                data: JSON.stringify(data),
                contentType: 'application/json;charset=utf-8',
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
        });
    } else {
        window.location.reload();
    }
}

/**
 * 生成接运单
 */
function generateWayBill() {
    var r = confirm("确认生成接运单吗？");
    if (r) {
        // 获取运输计划编号
        var id = $("#id").val();
        $.ajax({
            type: "POST",
            url: "generateWayBill",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    var r2 = confirm(result.message + ", 是否查看？");
                    if (r2) $(location).attr('href', 'wayBill1.html');
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

function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}
function view1() {
    // 设置物料需求表的数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewMaterialRequire",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setMaterialList(result.materialRequire.materialRequireItemList);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    $('#appointModal2').modal('show');
    $("#saveBtn1").unbind('click');
    $("#saveBtn1").click(function () {
        // 制作上传数据
        var data = {};
        data['transportPlanItemList'] = [];
        var count = $("td[id$='handleCategory']").length;
        for (var i = 1; i < count; i++) {
            var $i = i;
            var transportPlanItem = {};
            var produceCompany = {};
            var wastes = {};
            produceCompany.companyName = $("td[id='transportPlanItemList[" + $i + "].produceCompany.companyName']").text();
            wastes.name = $("td[id='transportPlanItemList[" + $i + "].wastes.name']").text();
            wastes.wastesId = $("td[id='transportPlanItemList[" + $i + "].wastes.wastesId']").text();
            wastes.wasteAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount']").val();
            wastes.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit']").val();
            wastes.formType = getFormTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.formType']").text());
            wastes.packageType = getPackageTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.packageType']").text());
            wastes.calorific = $("td[id='transportPlanItemList[" + $i + "].wastes.calorific']").text();
            wastes.ph = $("td[id='transportPlanItemList[" + $i + "].wastes.ph']").text();
            wastes.ashPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.ashPercentage']").text();
            wastes.wetPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.wetPercentage']").text();
            wastes.chlorinePercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.chlorinePercentage']").text();
            wastes.sulfurPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.sulfurPercentage']").text();
            wastes.phosphorusPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.phosphorusPercentage']").text();
            wastes.fluorinePercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.fluorinePercentage']").text();
            wastes.processWay = parseInt($("select[id='transportPlanItemList[" + $i + "].wastes.processWay']").val())-1;
            wastes.id = $("td[id='transportPlanItemList[" + $i + "].wastes.id']").text();
            transportPlanItem.handleCategory = getHandleCategoryFromStr($("td[id='transportPlanItemList[" + $i + "].handleCategory']").text());
            transportPlanItem.approachTime = $("input[id='transportPlanItemList[" + $i + "].approachTime']").val();
            transportPlanItem.wastes = wastes;
            transportPlanItem.produceCompany = produceCompany;
            data.transportPlanItemList.push(transportPlanItem);
        }
        console.log(data);
        $.ajax({
            type: "POST",
            url: "addTransportPlan",
            async: false,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
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
    });

    /**
     * 设置物料需求的数据
     */
    function setMaterialList(obj) {
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

            // tr.hide();


        });
        // 隐藏无数据的tr
        tr.hide();
        //赋值
        $("#dailyProportionsTotal").text(weeklyDemandTotal.toFixed(1));
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
}
function view2(e) {
    // 获取处置类别
    var handleType = getHandleType(e);
    // 设置危废明细数据
    setWastesData();
    $("input[type='checkbox']:checked").prop('checked', false);
    // 显示
    $('#appointModal1').modal('show');
    // 取消绑定
    $("#saveBtn2").unbind('click');
    // 重新绑定
    $("#saveBtn2").click(function () {
        saveData(handleType);
    });


}
/**
 * 获取年月周 返回格式：2018年8月第1周
 */
function getWeekDate() {
    var getMonthWeek = function getMonthWeek(a, b, c) {
        var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
        return Math.ceil(
            (d + 6 - w) / 7
        );
    };
    var d;
    var getYearWeek = function(a, b, c)
    {
        /*
        date1是当前日期
        date2是当年第一天
        d是当前日期是今年第多少天
        用d + 当前年的第一天的周差距的和在除以7就是本年第几周
        */
        var date1 = new Date(a, parseInt(b) - 1, c),
            date2 = new Date(a, 0, 1);
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };
    var today = new Date(); //获取当前时间
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    //获取时间
    // var obj = new Date();
    // var year = obj.getFullYear();
    // var month = obj.getMonth()+1;
    // var day = obj.getDate();
    // if(day % 7 > 0)  var a = 1; else a = 0;
    // var week = parseInt(day / 7) + a;
    return year + "年" + month + "月第" + getMonthWeek(year,month,day) + "周";
}

function loadPageTransportPlan() {
    $("#week").text(getWeekDate());
}

function getHandleType(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

function saveData(handleType) {
    // 获取选中的复选框
    var items = $("input[name='select']:checked");
    var count = items.length;
    // 获取选中的危废列表信息
    var wastesList = [];
    $.each(items, function (index) {
        if (index < count) {
            var wastes = {};
            var params = [];
            var param_0 = $(this).parent().parent();
            params.push(param_0);
            for (var i = 0; i < 14; i++) {
                var param = param_0.next();
                param_0 = param;
                params.push(param.text());
            }
            wastes.companyName = params[1];
            wastes.name = params[2];
            wastes.wastesId = params[3];
            wastes.formType = params[4];
            wastes.packageType = params[5];
            wastes.heat = params[6];
            wastes.ph = params[7];
            wastes.ash = params[8];
            wastes.water = params[9];
            wastes.chlorine = params[10];
            wastes.sulfur = params[11];
            wastes.phosphorus = params[12];
            wastes.fluorine = params[13];
            wastes.id = params[14];
            wastes.handleType = handleType;
            wastesList.push(wastes);
        }
    });
    // 将捕获到的信息载入到计划中
    setWastesData2(wastesList);
    $('#appointModal1').modal('hide');
    $('#appointModal2').modal('show');
}

function setWastesData2(wastesList) {
    // console.log(wastesList.length);
    // 获取id为cloneTr的tr元素
    var tr = $("#wastesClonedTr2");
    var id = tr.siblings().length;
    for (var i = 0; i < wastesList.length; i++) {
        var obj = wastesList[i];
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        changeId(clonedTr, id);
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(id++);
                    break;
                case (1):
                    $(this).html(obj.companyName);
                    break;
                case (2):
                    $(this).html(obj.handleType);
                    break;
                case (4):
                    $(this).html(obj.name);
                    break;
                case (5):
                    $(this).html(obj.wastesId);
                    break;
                case (8):
                    $(this).html(obj.formType);
                    break;
                case (9):
                    $(this).html(obj.packageType);
                    break;
                case (10):
                    $(this).html(obj.heat);
                    break;
                case (11):
                    $(this).html(obj.ph);
                case (12):
                    $(this).html(obj.ash);
                    break;
                case (13):
                    $(this).html(obj.water);
                    break;
                case (14):
                    $(this).html(obj.chlorine);
                    break;
                case (15):
                    $(this).html(obj.sulfur);
                    break;
                case (16):
                    $(this).html(obj.phosphorus);
                    break;
                case (17):
                    $(this).html(obj.fluorine);
                    break;
                case (19):
                    $(this).html(obj.id);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
    // 隐藏无数据的tr
    tr.hide();
    // 设置时间格式
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
    });
    /**
     * 改变id
     * @param element
     */
    function changeId(element, index) {
        element.find("td[id*='transportPlanItemList'],input[id*='transportPlanItemList'],select[id*='transportPlanItemList']").each(function () {
            var oldId = $(this).prop("id");
            var newId = oldId.replace(/[0-9]\d*/, index);
            $(this).prop('id', newId);
        });
    }
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
