/**
 * 分页 获取首页内容
 * */
function loadData() {
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
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(inner_index+1);
                    break;
                case (1):
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (2):
                    if (obj.handleCategory != null)
                        $(this).html(obj.handleCategory.name);
                    break;
                case (3):
                    $(this).html(getDateStr(obj.approachTime));
                    break;
                case (4):
                    $(this).html(obj.wastes.name);
                    break;
                case (5):
                    $(this).html(obj.wastes.wastesId);
                    break;
                case (6):
                    $(this).html(obj.wastes.wasteAmount);
                    break;
                case (7):
                    $(this).html(obj.wastes.unit);
                    break;
                case (8):
                    if (obj.wastes.formType != null)
                        $(this).html(obj.wastes.formType.name);
                    break;
                case (9):
                    if (obj.wastes.packageType != null)
                        $(this).html(obj.wastes.packageType.name);
                    break;
                case (10):
                    $(this).html(obj.wastes.calorific);
                    break;
                case (11):
                    $(this).html(obj.wastes.ph);
                    break;
                case (12):
                    $(this).html(obj.wastes.ashPercentage);
                    break;
                case (13):
                    $(this).html(obj.wastes.wetPercentage);
                    break;
                case (14):
                    $(this).html(obj.wastes.chlorinePercentage);
                    break;
                case (15):
                    $(this).html(obj.wastes.sulfurPercentage);
                    break;
                case (16):
                    $(this).html(obj.wastes.phosphorusPercentage);
                    break;
                case (17):
                    $(this).html(obj.wastes.fluorinePercentage);
                    break;
                case (18):
                    if (obj.wastes.processWay != null)
                        $(this).html(obj.wastes.processWay.name);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    $("#author").val(result.author);
    $("#departmentDirector").val(result.departmentDirector);
    $("#group").val(result.group);
    $("#productionDirector").val(result.productionDirector);
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
 * 增加数据
 */
function addData(state) {
    var transferId;
    if (localStorage.transferDraftId == null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentTransferDraftId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    transferId = result.transferDraftId;
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        transferId = localStorage.transferDraftId;
    }
    var data = {
        id: transferId,
        produceCompany: {
            companyName: $("#produceCompanyName").val(),
            phone: $("#produceCompanyPhone").val(),
            location: $("#produceCompanyLocation").val(),
            postCode: $("#produceCompanyPostcode").val()
        },
        transportCompany: {
            companyName: $("#transportCompanyName").val(),
            phone: $("#transportCompanyPhone").val(),
            location: $("#transportCompanyLocation").val(),
            postCode: $("#transportCompanyPostcode").val()
        },
        acceptCompany: {
            companyName: $("#acceptCompanyName").val(),
            phone: $("#acceptCompanyPhone").val(),
            location: $("#acceptCompanyLocation").val(),
            postCode: $("#acceptCompanyPostcode").val()
        },
        wastes: {
            name: $("#wastesName").val(),
            prepareTransferCount: $("#wastesPrepareTransferCount").val(),
            wastesCharacter: $("#wastesCharacter").val(),
            category: $("#wastesCategory").val(),
            transferCount: $("#wastesTransferCount").val(),
            formType: $("#wastesFormType").val(),
            code: $("#wastesCode").val(),
            signCount: $("#wastesSignCount").val(),
            packageType: $("#wastesPackageType").val()
        },
        outwardIsTransit: $("#outwardIsTransit").prop("checked"),
        outwardIsUse: $("#outwardIsUse").prop("checked"),
        outwardIsDeal: $("#outwardIsDeal").prop("checked"),
        outwardIsDispose: $("#outwardIsDispose").prop("checked"),
        mainDangerComponent: $("#mainDangerComponent").val(),
        dangerCharacter: $("#dangerCharacter").val(),
        emergencyMeasure: $("#emergencyMeasure").val(),
        emergencyEquipment: $("#emergencyEquipment").val(),
        dispatcher: $("#dispatcher").val(),
        destination: $("#destination").val(),
        transferTime: getStdTimeStr($("#transferTime").val()),
        // 运输单位填写
        firstCarrier: $("#firstCarrier").val(),
        firstCarryTime: getStdTimeStr($("#firstCarryTime").val()),
        firstModel: $("#firstModel").val(),
        firstBrand: $("#firstBrand").val(),
        firstTransportNumber: $("#firstTransportNumber").val(),
        firstOrigin: $("#firstOrigin").val(),
        firstStation: $("#firstStation").val(),
        firstDestination: $("#firstDestination").val(),
        firstCarrierSign: $("#firstCarrierSign").val(),
        secondCarrier: $("#secondCarrier").val(),
        secondCarryTime: getStdTimeStr($("#secondCarryTime").val()),
        secondModel: $("#secondModel").val(),
        secondBrand: $("#secondBrand").val(),
        secondTransportNumber: $("#secondTransportNumber").val(),
        secondOrigin: $("#secondOrigin").val(),
        secondStation: $("#secondStation").val(),
        secondDestination: $("#secondDestination").val(),
        secondCarrierSign: $("#secondCarrierSign").val(),
        acceptCompanyLicense: $("#acceptCompanyLicense").val(),
        recipient: $("#recipient").val(),
        acceptDate: $("#acceptDate").val(),
        disposeIsUse: $("#disposeIsUse").prop("checked"),
        disposeIsStore: $("#disposeIsStore").prop("checked"),
        disposeIsBurn: $("#disposeIsBurn").prop("checked"),
        disposeIsLandFill: $("#disposeIsLandFill").prop("checked"),
        disposeIsOther: $("#disposeIsOther").prop("checked"),
        headSign: $("#headSign").val(),
        signDate: $("#signDate").val(),
        checkState: state == 'save' ? 'ToSubmit' : 'ToExamine'
    };
    // 上传用户数据
    $.ajax({
        type: "POST",                           // 方法类型
        url: "addTransferDraft",                // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                if (result.status == "success") {
                    alert(result.message);
                    // if (addType == "continue") window.location.reload();
                    // else $(location).attr('href', 'transferDraft.html');//跳转

                    $(location).attr('href', 'transferDraft.html');
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
 * 设置物质形态和包装方式的枚举信息
 */
function getSelectedInfo() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
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
 * 作废转移联单
 */
function setSubmit(e) {    //已作废
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
 * 修改数据
 * @param e
 */
function adjustData(e) {
    var id = getIdByMenu(e);
    localStorage.transferDraftId = id;
    location.href = "transferDraftInfo.html";
}

/**
 * 查看数据
 * @param e
 */
function viewData(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);

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
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}
function view1() {
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
function getDateOfWeek() {
    var e;
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    var day = new Date().getDate();
    if(month == 1||month == 3||month == 5||month == 7||month == 8||month == 10||month == 12){
        e = 31;
    }else if (month == 2){
        if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) e = 29;
        else e = 28;
    }else {
        e = 30;
    }
    var f1;       //f为当前日期的下周一日期，f+7为当前日期的下周日日期
    var f7;
    var monday;
    var sunday;
    var g = day; //当前日期
    var h = new Date().getDay();
    if(h == 0){
        f1 = g+1;
        f7 = g+7;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
    else if(h == 1){
        f1 = g+7;
        f7 = g+13;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
    else if(h == 2){
        f1 = g+6;
        f7 = g+12;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
    else if(h == 3){
        f1 = g+5;
        f7 = g+11;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
    else if(h == 4){
        f1 = g+4;
        f7 = g+10;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
    else if(h == 5){
        f1 = g+3;
        f7 = g+9;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
    else if(h == 6){
        f1 = g+2;
        f7 = g+8;
        if(e == 28&&f1 > 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f1 < 28&&f7>28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 28&&f7 < 28){
            monday = f1 - 28;
            sunday = f7 - 21;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 29&&f1 > 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f1 < 29&&f7>29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 29&&f7 < 29){
            monday = f1 - 29;
            sunday = f7 - 22;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 30&&f1 > 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f1 < 30&&f7>30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 30&&f7 < 30){
            monday = f1 - 30;
            sunday = f7 - 23;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }else if(e == 31&&f1 > 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month+1)+"月"+monday+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f1 < 31&&f7>31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month+1)+"月"+sunday+"日";
        }else if(e == 31&&f7 < 31){
            monday = f1 - 31;
            sunday = f7 - 24;
            return year+"年"+(month)+"月"+f1+"日"-year+"年"+(month)+"月"+f7+"日";
        }
    }
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
            // console.log(index);
            var wastes = {};
            var params = [];
            var param_0 = $(this).parent().parent();
            params.push(param_0);
            for (var i = 0; i < 13; i++) {
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
                    $(this).html(obj.ash);
                    break;
                case (12):
                    $(this).html(obj.water);
                    break;
                case (13):
                    $(this).html(obj.chlorine);
                    break;
                case (14):
                    $(this).html(obj.sulfur);
                    break;
                case (15):
                    $(this).html(obj.phosphorus);
                    break;
                case (16):
                    $(this).html(obj.fluorine);
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
        endDate:new Date()
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
