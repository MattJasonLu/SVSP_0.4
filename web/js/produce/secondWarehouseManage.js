/**
 * Created by matt on 2018/8/2.
 */
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
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}


/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countSecondInboundOrder",                  // url
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listSecondInboundOrder",         // url
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listSecondInboundOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
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
        url: "listSecondInboundOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
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
                companyName: tr.find("input[name='produceCompanyName']").val()
            },
            wastes: {
                name: tr.find("select[name='wastesName']").val(),
                wastesId: tr.find("input[name='wastesCode']").val()
            },
            wastesAmount: tr.find("input[name='wastesAmount']").val(),
            unitPriceTax: tr.find("input[name='unitPriceTax']").val(),
            totalPrice: tr.find("input[name='totalPrice']").val(),
            processWay: tr.find("select[name='processWay']").val(),
            handleCategory: tr.find("input[select='handleCategory']").val(),
            formType: tr.find("input[select='formType']").val(),
            packageType: tr.find("input[select='packageType']").val(),
            laboratoryTest: {
                heatAverage: tr.find("input[name='heat']").val(),
                phAverage: tr.find("input[name='ph']").val(),
                ashAverage: tr.find("input[name='ash']").val(),
                waterContentAverage: tr.find("input[name='waterContent']").val(),
                chlorineContentAverage: tr.find("input[name='chlorineContent']").val(),
                sulfurContentAverage: tr.find("input[name='sulfurContentAverage']").val(),
                phosphorusContentAverage: tr.find("input[name='phosphorusContentAverage']").val(),
                fluorineContentAverage: tr.find("input[name='fluorineContent']").val()
            },
            remarks: tr.find("input[name='remarks']").val(),
            warehouseArea: tr.find("input[name='warehouseArea']").val()
        };
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
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getHandleCategory",                  // url
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var handleCategory = $("select[name='handleCategory']");
                handleCategory.children().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {

        }
    });
    $("select[name='wastesName']").get(0).selectedIndex = -1;
}