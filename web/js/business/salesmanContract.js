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
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalContractRecord",                  // url
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
            url: "loadPageContractManageList",         // url
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
                url: "loadPageContractManageList",         // url
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
        url: "loadPageContractManageList",   // url
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
    // getCheckState();
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clonedTr");
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
                case (0):
                    $(this).html(index+1);
                    break;
                case (1):
                    $(this).html("");
                    break;
                case (2):
                    $(this).html(obj.company1);
                    break;
                case (3):
                    $(this).html(obj.city);
                    break;
                case (4):
                    $(this).html(obj.modelName);
                    break;
                case (5):
                    $(this).html("");
                    break;
                case (6):
                    $(this).html("");
                    break;
                case (7):
                    $(this).html(obj.agreedQuantity);
                    break;
                case (8):
                    $(this).html("");
                    break;
                case (9):
                    $(this).html("");
                    break;
                case (10):
                    $(this).html(obj.order1);
                    break;
                case (11):
                    $(this).html(obj.contactName + "-" + obj.telephone);
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
    var transferId;
    if (localStorage.transferDraftId == null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentTransferDraftId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result !== undefined) {
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
        checkState: state === 'save' ? 'ToSubmit' : 'ToExamine'
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
            if (result !== undefined) {
                if (result.status === "success") {
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
        data: {
            id: id
        },
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                var date = eval(result);
                $("#produceCompanyName").text(date.produceCompanyName);
                $("#produceCompanyPhone").text(date.produceCompanyPhone);
                $("#produceCompanyLocation").text(date.produceCompanyLocation);
                $("#transportCompanyName").text(date.transportCompanyName);
                $("#transportCompanyLocation").text(date.transportCompanyLocation);
                $("#acceptCompanyName").text(date.acceptCompanyName);
                $("#acceptCompanyLocation").text(date.acceptCompanyLocation);
                $("#produceCompanyPostcode").text(date.produceCompanyPostcode);
                $("#transportCompanyPhone").text(date.transportCompanyPhone);
                $("#transportCompanyPostcode").text(date.transportCompanyPostcode);
                $("#acceptCompanyPhone").text(date.acceptCompanyPhone);
                $("#acceptCompanyPostcode").text(date.acceptCompanyPostcode);
                $("#wastesName").text(date.wastesName);
                $("#wastesPrepareTransferCount").text(date.wastesPrepareTransferCount);
                $("#wastesCharacter").text(date.wastesCharacter);
                $("#wastesCategory").text(date.wastesCategory);
                $("#wastesTransferCount").text(date.wastesTransferCount);
                if(date.wastesFormType !== null) $("#wastesFormType").text(date.wastesFormType);
                $("#wastesCode").text(date.wastesCode);
                $("#wastesSignCount").text(date.wastesSignCount);
                if(date.wastesPackageType !== null) $("#wastesPackageType").text(date.wastesPackageType);
                $("#outwardIsTransit").text(date.outwardIsTransit);
                $("#outwardIsUse").text(date.outwardIsUse);
                $("#outwardIsDeal").text(date.outwardIsDeal);
                $("#outwardIsDispose").text(date.outwardIsDispose);
                $("#mainDangerComponent").text(date.mainDangerComponent);
                $("#dangerCharacter").text(date.dangerCharacter);
                $("#emergencyMeasure").text(date.emergencyMeasure);
                $("#emergencyEquipment").text(date.emergencyEquipment);
                $("#dispatcher").text(date.dispatcher);
                $("#destination").text(date.destination);
                $("#transferTime").text(date.transferTime);
                $("#firstCarrier").text(date.firstCarrier);
                $("#firstCarryTime").text(date.firstCarryTime);
                $("#firstModel").text(date.firstModel);
                $("#firstBrand").text(date.firstBrand);
                $("#firstTransportNumber").text(date.firstTransportNumber);
                $("#firstOrigin").text(date.firstOrigin);
                $("#firstStation").text(date.firstStation);
                $("#firstDestination").text(date.firstDestination);
                $("#firstCarrierSign").text(date.firstCarrierSign);
                $("#secondCarrier").text(date.secondCarrier);
                $("#secondCarryTime").text(date.secondCarryTime);
                $("#secondModel").text(date.secondModel);
                $("#secondBrand").text(date.secondBrand);
                $("#secondTransportNumber").text(date.secondTransportNumber);
                $("#secondOrigin").text(date.secondOrigin);
                $("#secondStation").text(date.secondStation);
                $("#secondDestination").text(date.secondDestination);
                $("#secondCarrierSign").text(date.secondCarrierSign);
                $("#acceptCompanyLicense").text(date.acceptCompanyLicense);
                $("#recipient").text(date.recipient);
                $("#acceptDate").text(date.acceptDate);
                $("#disposeIsUse").text(date.disposeIsUse);
                $("#disposeIsStore").text(date.disposeIsStore);
                $("#disposeIsBurn").text(date.disposeIsBurn);
                $("#disposeIsLandFill").text(date.disposeIsLandFill);
                $("#disposeIsOther").text(date.disposeIsOther);
                $("#headSign").text(date.headSign);
                $("#signDate").text(date.signDate);
            } else {
                alert(result.message);
                $("#produceCompanyName").text("");
                $("#produceCompanyPhone").text("");
                $("#produceCompanyLocation").text("");
                $("#transportCompanyName").text("");
                $("#transportCompanyLocation").text("");
                $("#acceptCompanyName").text("");
                $("#acceptCompanyLocation").text("");
                $("#produceCompanyPostcode").text("");
                $("#transportCompanyPhone").text("");
                $("#transportCompanyPostcode").text("");
                $("#acceptCompanyPhone").text("");
                $("#acceptCompanyPostcode").text("");
                $("#wastesName").text("");
                $("#wastesPrepareTransferCount").text("");
                $("#wastesCharacter").text("");
                $("#wastesCategory").text("");
                $("#wastesTransferCount").text("");
                $("#wastesFormType").text("");
                $("#wastesCode").text("");
                $("#wastesSignCount").text("");
                $("#wastesPackageType").text("");
                $("#outwardIsTransit").text("");
                $("#outwardIsUse").text("");
                $("#outwardIsDeal").text("");
                $("#outwardIsDispose").text("");
                $("#mainDangerComponent").text("");
                $("#dangerCharacter").text("");
                $("#emergencyMeasure").text("");
                $("#emergencyEquipment").text("");
                $("#dispatcher").text("");
                $("#destination").text("");
                $("#transferTime").text("");
                $("#firstCarrier").text("");
                $("#firstCarryTime").text("");
                $("#firstModel").text("");
                $("#firstBrand").text("");
                $("#firstTransportNumber").text("");
                $("#firstOrigin").text("");
                $("#firstStation").text("");
                $("#firstDestination").text("");
                $("#firstCarrierSign").text("");
                $("#secondCarrier").text("");
                $("#secondCarryTime").text("");
                $("#secondModel").text("");
                $("#secondBrand").text("");
                $("#secondTransportNumber").text("");
                $("#secondOrigin").text("");
                $("#secondStation").text("");
                $("#secondDestination").text("");
                $("#secondCarrierSign").text("");
                $("#acceptCompanyLicense").text("");
                $("#recipient").text("");
                $("#acceptDate").text("");
                $("#disposeIsUse").text("");
                $("#disposeIsStore").text("");
                $("#disposeIsBurn").text("");
                $("#disposeIsLandFill").text("");
                $("#disposeIsOther").text("");
                $("#headSign").text("");
                $("#signDate").text("");
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