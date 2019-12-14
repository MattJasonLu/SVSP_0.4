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
            url: "totalTransferDraftRecord",                  // url
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
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
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
            url: "loadPageTransferDraftList",         // url
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
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
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
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageTransferDraftList",         // url
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
    loadNavigationList();   // 动态菜单加载
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
            url: "loadPageTransferDraftList",   // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
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

    getCheckState();
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
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='transferTime']").text(getDateStr(obj.transferTime));
        clonedTr.find("td[name='inboundTime']").text(obj.inboundTime);
        clonedTr.find("td[name='outboundTime']").text(obj.outboundTime);
        clonedTr.find("td[name='transferId']").text(obj.transferId);
        if (obj.produceCompany != null) {
            clonedTr.find("td[name='produceCompany']").text(obj.produceCompany.companyName);
        }
        if (obj.wastes != null) {
            clonedTr.find("td[name='wastesName']").text(obj.wastes.name);
            clonedTr.find("td[name='wastesCode']").text(obj.wastes.wastesId);
            clonedTr.find("td[name='transferCount']").text(parseFloat(obj.wastes.transferCount).toFixed(2));
        }
        clonedTr.find("td[name='count1H']").text(parseFloat(obj.count1H).toFixed(2));
        clonedTr.find("td[name='count2H']").text(parseFloat(obj.count2H).toFixed(2));
        clonedTr.find("td[name='countZN']").text(parseFloat(obj.countZN).toFixed(2));
        clonedTr.find("td[name='firstBrand']").text(obj.firstBrand);
        clonedTr.find("td[name='firstCarrier']").text(obj.firstCarrier);
        clonedTr.find("td[name='recipient']").text(obj.recipient);
        clonedTr.find("td[name='remark']").text(obj.remark);
        clonedTr.find("td[name='id']").text(obj.id);
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
            // checkState: $("#search-checkState").val(),
            checkStateItem: {
                dataDictionaryItemId: $("#search-checkState").val()
            },
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
                setPageCloneAfter(pageNumber);        // 重新设置页码
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
            clientId: $("#produceCompany").val(),
            companyName: $("#produceCompany  option:selected").text(),
            phone: $("#produceCompanyPhone").val(),
            location: $("#produceCompanyLocation").val(),
            postCode: $("#produceCompanyPostcode").val()
        },
        transportCompany: {
            supplierId: $("#transportCompany").val(),
            companyName: $("#transportCompany  option:selected").text(),
            phone: $("#transportCompanyPhone").val(),
            location: $("#transportCompanyLocation").val(),
            postCode: $("#transportCompanyPostcode").val()
        },
        acceptCompany: {
            clientId: $("#acceptCompany").val(),
            companyName: $("#acceptCompany  option:selected").text(),
            phone: $("#acceptCompanyPhone").val(),
            location: $("#acceptCompanyLocation").val(),
            postCode: $("#acceptCompanyPostcode").val()
        },
        wastes: {
            name: $("#wastesName").val(),
            prepareTransferCount: $("#wastesPrepareTransferCount").val(),
            wastesCharacter: $("#wastesCharacter").val(),
            handleCategoryItem: {
                dataDictionaryItemId: $("#wastesCategory").val()
            },
            transferCount: $("#wastesTransferCount").val(),
            formTypeItem: {
                dataDictionaryItemId: $("#wastesFormType").val()
            },
            wastesId: $('#wastesCode').selectpicker('val'),
            signCount: $("#wastesSignCount").val(),
            packageTypeItem: {
                dataDictionaryItemId: $("#wastesPackageType").val()
            }
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
 * 设置高级查询的审核状态数据
 */
function getCheckState() {
    // 设置审批状态
    $.ajax({
        type: "POST",
        url: "getCheckStateDataByDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    if (item.dataDictionaryItemId == 87 ||
                        item.dataDictionaryItemId == 69 ||
                        item.dataDictionaryItemId == 67 ||
                        item.dataDictionaryItemId == 75) {
                        var option = $('<option />');
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        checkState.append(option);
                    }
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
}

function setSignIn(e) {
    var r = confirm("确认验收该联单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransferDraftSignIn",
            async: false,
            dataType: "json",
            data: {
                id: id
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
/*审批*/
function setApproval(id) {
    $.ajax({
        type: "POST",
        url: "setTransferDraftToApproval",
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
/*驳回*/
function setBack(id) {
    $.ajax({
        type: "POST",
        url: "setTransferDraftToBack",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                // console.log(result);
                // alert(result.message);
                // window.location.reload();
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
 * 新审批
 */
function approval(item) {
    initSubmitFName(setTransferDraftToExamine.name);
    initApprovalFName(setApproval.name);
    initBakcFName(setBack.name);
    var id=$(item).parent().parent().children("td").eq(4).html();
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



/**
 * 提交转移联单
 */
function setSubmit(e) {    //已提交
    initSubmitFName(setTransferDraftToExamine.name);
    var r = confirm("确认提交该联单吗？");
    if (r) {
        var id = $(e).parent().parent().children('td').eq(4).html();
        publicSubmit(id,getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
        // $.ajax({
        //     type: "POST",
        //     url: "setTransferDraftToExamine",
        //     async: false,
        //     dataType: "json",
        //     data: {
        //         id: id
        //     },
        //     success: function (result) {
        //         if (result !== undefined && result.status === "success") {
        //             console.log(result);
        //             // alert(result.message);
        //             // window.location.reload();
        //         } else {
        //             alert(result.message);
        //         }
        //     },
        //     error: function (result) {
        //         console.log(result);
        //         alert("服务器异常");
        //     }
        // });
    }
}
function setTransferDraftToExamine(id) {
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
    loadNavigationList();   // 动态菜单加载
    // 设置下拉框数据
    getSelectedInfo();
    loadNavigationList();   // 动态菜单加载
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
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    var data = eval(result.data);
                    if (data.produceCompany != null) {
                        $("#produceCompany").val(data.produceCompany.clientId);
                        $("#produceCompanyPhone").val(data.produceCompany.phone);
                        $("#produceCompanyLocation").val(data.produceCompany.location);
                        $("#produceCompanyPostcode").val(data.produceCompany.postCode);
                    }
                    if (data.transportCompany != null) {
                        $("#transportCompany").val(data.transportCompany.supplierId);
                        $("#transportCompanyPhone").val(data.transportCompany.phone);
                        $("#transportCompanyLocation").val(data.transportCompany.location);
                        $("#transportCompanyPostcode").val(data.transportCompany.postCode);
                    }
                    if (data.acceptCompany != null) {
                        $("#acceptCompany").val(data.acceptCompany.clientId);
                        $("#acceptCompanyPhone").val(data.acceptCompany.phone);
                        $("#acceptCompanyLocation").val(data.acceptCompany.location);
                        $("#acceptCompanyPostcode").val(data.acceptCompany.postCode);
                    }
                    if (data.wastes != null) {
                        $("#wastesName").val(data.wastes.name);
                        $("#wastesPrepareTransferCount").val(data.wastes.prepareTransferCount.toFixed(3));
                        $("#wastesCharacter").val(data.wastes.wastesCharacter);
                        if (data.wastes.handleCategoryItem != null)
                        $("#wastesCategory").val(data.wastes.handleCategoryItem.dataDictionaryItemId);
                        $("#wastesTransferCount").val(data.wastes.transferCount.toFixed(3));
                        $("#wastesCode").val(data.wastes.wastesId);
                        $("#wastesSignCount").val(data.wastes.signCount.toFixed(3));
                        if (data.wastes.formTypeItem != null)
                        $("#wastesFormType").val(data.wastes.formTypeItem.dataDictionaryItemId);
                        if (data.wastes.packageTypeItem != null)
                        $("#wastesPackageType").val(data.wastes.packageTypeItem.dataDictionaryItemId);
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

function getSelectedInfo() {
    // 生产单位和接收单位的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var produceCompany = $("#produceCompany");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.get(0).selectedIndex = -1;

                var acceptCompany = $("#acceptCompany");
                acceptCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    acceptCompany.append(option);
                });
                acceptCompany.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 运输单位的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSupplier",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var transportCompany = $("#transportCompany");
                transportCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    transportCompany.append(option);
                });
                transportCompany.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    // 设置物质形态
    $.ajax({
        type: "POST",
        url: "getFormTypeByDataDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#wastesFormType");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
    // 设置包装方式
    $.ajax({
        type: "POST",
        url: "getPackageTypeByDataDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#wastesPackageType");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });

    // 进料方式
    $.ajax({
        type: "POST",
        url: "getHandleCategoryByDataDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#wastesCategory");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
    // 八位码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result.data);
                // 各下拉框数据填充
                var wastesInfoList = $("#wastesCode");
                // 清空遗留元素
                wastesInfoList.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesInfoList.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
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
 * 查看数据
 * @param e
 */
function viewData(e) {
    $("#appointModal2").find('input:text').val('');
    $("#appointModal2").find('input:checkbox').prop('checked', false);
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getTransferDraftById",
        async: false,
        dataType: "json",
        data: {
            "id": id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
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
                    $("#transportCompanyLocation").val(data.transportCompany.location);
                    $("#transportCompanyPhone").val(data.transportCompany.phone);
                    $("#transportCompanyPostcode").val(data.transportCompany.postCode);
                }
                if (data.acceptCompany != null) {
                    $("#acceptCompanyName").val(data.acceptCompany.companyName);
                    $("#acceptCompanyLocation").val(data.acceptCompany.location);
                    $("#acceptCompanyPhone").val(data.acceptCompany.phone);
                    $("#acceptCompanyPostcode").val(data.acceptCompany.postCode);
                }
                if (data.wastes != null) {
                    $("#wastesName").val(data.wastes.name);
                    $("#wastesPrepareTransferCount").val(data.wastes.prepareTransferCount.toFixed(4));
                    $("#wastesCharacter").val(data.wastes.wastesCharacter);
                    if (data.wastes.handleCategoryItem != null) $("#wastesCategory").val(data.wastes.handleCategoryItem.dictionaryItemName);
                    $("#wastesTransferCount").val(data.wastes.transferCount.toFixed(4));
                    if (data.wastes.formTypeItem != null) $("#wastesFormType").val(data.wastes.formTypeItem.dictionaryItemName);
                    $("#wastesCode").val(data.wastes.wastesId);
                    $("#wastesSignCount").val(data.wastes.signCount.toFixed(4));
                    if (data.wastes.packageTypeItem != null) $("#wastesPackageType").val(data.wastes.packageTypeItem.dictionaryItemName);
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
                $("#secondCarrier").val(data.secondCarrier);
                $("#secondCarryTime").val(getTimeStr(data.secondCarryTime));
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
    $("#appointModal2").modal("show");
}

/**
 * 查看数据
 * @param e
 */
function viewData2(e) {
    $("#viewModal").find('input:text').val('');
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getTransferDraftById",
        async: false,
        dataType: "json",
        data: {
            "id": id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var obj = eval(result.data);
                $("#view_transferTime").val(getDateStr(obj.transferTime));
                $("#view_inboundTime").val(obj.inboundTime);
                $("#view_outboundTime").val(obj.outboundTime);
                $("#view_transferId").val(obj.transferId);
                if (obj.produceCompany != null) {
                    $("#view_produceCompany").val(obj.produceCompany.companyName);
                }
                if (obj.wastes != null) {
                    $("#view_wastesName").val(obj.wastes.name);
                    $("#view_wastesCode").val(obj.wastes.wastesId);
                    $("#view_transferCount").val(parseFloat(obj.wastes.transferCount).toFixed(2));
                }
                $("#view_count1H").val(parseFloat(obj.count1H).toFixed(2));
                $("#view_count2H").val(parseFloat(obj.count2H).toFixed(2));
                $("#view_countZN").val(parseFloat(obj.countZN).toFixed(2));
                $("#view_firstBrand").val(obj.firstBrand);
                $("#view_firstCarrier").val(obj.firstCarrier);
                $("#view_recipient").val(obj.recipient);
                $("#view_remark").val(obj.remark);
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
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return $(e).parent().parent().find("td[name='id']").text();
}

/**
 * 显示生产单位的信息
 */
function showProduceCompanyInfo(e) {
    var produceCompanyId = e.children('option:selected').val();//这就是selected的值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            id: produceCompanyId
        },
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                $("#produceCompanyPhone").val(data.phone);
                $("#produceCompanyLocation").val(data.location);
                $("#produceCompanyPostcode").val(data.postCode);
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
 * 显示运输单位的信息
 */
function showTransportCompanyInfo(e) {
    var transportCompanyId = e.children('option:selected').val();//这就是selected的值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSupplierById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            id: transportCompanyId
        },
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                $("#transportCompanyPhone").val(data.phone);
                $("#transportCompanyLocation").val(data.location);
                $("#transportCompanyPostcode").val(data.postCode);
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
 * 显示接受单位的信息
 */
function showAcceptCompanyInfo(e) {
    var acceptCompanyId = e.children('option:selected').val();//这就是selected的值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            id: acceptCompanyId
        },
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                $("#acceptCompanyPhone").val(data.phone);
                $("#acceptCompanyLocation").val(data.location);
                $("#acceptCompanyPostcode").val(data.postCode);
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
 * 导出excel
 * @param e
 */
function exportExcel() {
    var name = 't_pr_transferdraft';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select * from t_pr_transferdraft where id" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select * from t_pr_transferdraft;";
    }
    console.log("sql:"+sqlWords);
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
    var filePath = 'Files/Templates/转移联单_320046201703310001(模板).pdf';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入pdf
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("pdfFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importTransferDraft",              // url
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
 * 导入模态框
 */
function importExcel2Choose() {
    $("#importExcel2Modal").modal('show');
}

/**
 * 下载模板
 */
function downloadModal2() {
    var filePath = 'Files/Templates/转移联单模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importExcel2() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importTransferDraftExcel",              // url
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