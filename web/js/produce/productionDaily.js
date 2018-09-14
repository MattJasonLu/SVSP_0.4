/**
 * Created by matt on 2018/9/7.
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
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
            url: "getProductionDailyCount",                  // url
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
            url: "listProductionDailyByPage",         // url
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
                url: "listProductionDailyByPage",         // url
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
        url: "listProductionDailyByPage",   // url
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
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='date']").text(getDateStr(obj.date));
        if (obj.checkState != null) clonedTr.find("td[name='checkState']").text(obj.checkState.name);
        clonedTr.find("td[name='author']").text(obj.author);
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
 * 生成日报并添加
 */
function addData() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "generateProductionDaily",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // 询问是否查看
                var r = confirm(result.message + "，是否查看?");
                // 如果查看则跳转页面
                if (r) {
                    // 数据存放
                    window.localStorage.productionDailyId = result.data.id;
                    $(location).prop('href', 'productionDaily1.html');
                } else {
                    // 否则刷新页面
                    window.location.reload();
                }

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
 * 读取数据
 */
function loadData() {
    var id = window.localStorage.productionDailyId;
    if (id != null) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getProductionDailyById",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result.data);
                    setData(result.data);
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
     * 设置数据
     * @param data 数据
     */
    function setData(data) {
        var obj = eval(data);
        $("#todayInboundMedicalWastes").text(obj.todayInboundMedicalWastes);
        $("#todayOutboundMedicalWastes").text(obj.todayOutboundMedicalWastes);
        $("#todayInventoryMedicalWastes").text(obj.todayInventoryMedicalWastes);
        $("#todayDisposalMedicalAuxiliaryNaclo").text(obj.todayDisposalMedicalAuxiliaryNaclo);
        $("#limitDisposalMedicalAuxiliaryNaclo").text(obj.limitDisposalMedicalAuxiliaryNaclo);
        $("#todayInboundMedicalWastesDirectDisposal").text(obj.todayInboundMedicalWastesDirectDisposal);
        $("#todayOutboundMedicalWastesDirectDisposal").text(obj.todayOutboundMedicalWastesDirectDisposal);
        $("#todayInventoryMedicalWastesDirectDisposal").text(obj.todayInventoryMedicalWastesDirectDisposal);
        $("#todayDisposalMedicalAuxiliaryDeodorant").text(obj.todayDisposalMedicalAuxiliaryDeodorant);
        $("#limitDisposalMedicalAuxiliaryDeodorant").text(obj.limitDisposalMedicalAuxiliaryDeodorant);
        $("#todayInboundMedicalWastesCooking").text(obj.todayInboundMedicalWastesCooking);
        $("#todayOutboundMedicalWastesCooking").text(obj.todayOutboundMedicalWastesCooking);
        $("#todayInventoryMedicalWastesCooking").text(obj.todayInventoryMedicalWastesCooking);
        $("#todayDisposalMedicalAuxiliaryMedicalWastesBag").text(obj.todayDisposalMedicalAuxiliaryMedicalWastesBag);
        $("#limitDisposalMedicalAuxiliaryMedicalWastesBag").text(obj.limitDisposalMedicalAuxiliaryMedicalWastesBag);
        $("#todayInboundMedicalWastesErrorNumber").text(obj.todayInboundMedicalWastesErrorNumber);
        $("#todayOutboundMedicalWastesErrorNumber").text(obj.todayOutboundMedicalWastesErrorNumber);
        $("#todayInventoryMedicalWastesErrorNumber").text(obj.todayInventoryMedicalWastesErrorNumber);
        $("#todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(obj.todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        $("#limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(obj.limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        $("#todayInboundMedicalWastesAfterCooking").text(obj.todayInboundMedicalWastesAfterCooking);
        $("#todayOutboundMedicalWastesAfterCooking").text(obj.todayOutboundMedicalWastesAfterCooking);
        $("#todayInventoryMedicalWastesAfterCooking").text(obj.todayInventoryMedicalWastesAfterCooking);
        $("#todayDisposalMedicalAuxiliaryCollectionBox").text(obj.todayDisposalMedicalAuxiliaryCollectionBox);
        $("#limitDisposalMedicalAuxiliaryCollectionBox").text(obj.limitDisposalMedicalAuxiliaryCollectionBox);
        $("#todayInboundMedicalWastesAfterCookingSend").text(obj.todayInboundMedicalWastesAfterCookingSend);
        $("#todayOutboundMedicalWastesAfterCookingSend").text(obj.todayOutboundMedicalWastesAfterCookingSend);
        $("#todayInventoryMedicalWastesAfterCookingSend").text(obj.todayInventoryMedicalWastesAfterCookingSend);
        $("#todayDisposalMedicalAuxiliarySteam").text(obj.todayDisposalMedicalAuxiliarySteam);
        $("#limitDisposalMedicalAuxiliarySteam").text(obj.limitDisposalMedicalAuxiliarySteam);
        $("#todayInboundMedicalWastesAfterCookingInbound").text(obj.todayInboundMedicalWastesAfterCookingInbound);
        $("#todayOutboundMedicalWastesAfterCookingInbound").text(obj.todayOutboundMedicalWastesAfterCookingInbound);
        $("#todayInventoryMedicalWastesAfterCookingInbound").text(obj.todayInventoryMedicalWastesAfterCookingInbound);
        $("#todayDisposalMedicalAuxiliaryIndustrialWater").text(obj.todayDisposalMedicalAuxiliaryIndustrialWater);
        $("#limitDisposalMedicalAuxiliaryIndustrialWater").text(obj.limitDisposalMedicalAuxiliaryIndustrialWater);
        $("#todayInboundMedicalWastesWetNumber").text(obj.todayInboundMedicalWastesWetNumber);
        $("#todayOutboundMedicalWastesWetNumber").text(obj.todayOutboundMedicalWastesWetNumber);
        $("#todayInventoryMedicalWastesWetNumber").text(obj.todayInventoryMedicalWastesWetNumber);
        $("#todayDisposalMedicalAuxiliaryElectricQuantity").text(obj.todayDisposalMedicalAuxiliaryElectricQuantity);
        $("#limitDisposalMedicalAuxiliaryElectricQuantity").text(obj.limitDisposalMedicalAuxiliaryElectricQuantity);
        $("#todayInboundWastesBulk").text(obj.todayInboundWastesBulk);
        $("#todayOutboundWastesBulk").text(obj.todayOutboundWastesBulk);
        $("#todayInventoryWastesBulk").text(obj.todayInventoryWastesBulk);
        $("#todayDisposalSecondaryAuxiliaryCalcareousLime").text(obj.todayDisposalSecondaryAuxiliaryCalcareousLime);
        $("#limitDisposalSecondaryAuxiliaryCalcareousLime").text(obj.limitDisposalSecondaryAuxiliaryCalcareousLime);
        $("#todayInboundWastesCrushing").text(obj.todayInboundWastesCrushing);
        $("#todayOutboundWastesCrushing").text(obj.todayOutboundWastesCrushing);
        $("#todayInventoryWastesCrushing").text(obj.todayInventoryWastesCrushing);
        $("#todayDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(obj.todayDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        $("#limitDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(obj.limitDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        $("#todayInboundWastesSludge").text(obj.todayInboundWastesSludge);
        $("#todayOutboundWastesSludge").text(obj.todayOutboundWastesSludge);
        $("#todayInventoryWastesSludge").text(obj.todayInventoryWastesSludge);
        $("#todayDisposalSecondaryAuxiliaryActivatedCarbon").text(obj.todayDisposalSecondaryAuxiliaryActivatedCarbon);
        $("#limitDisposalSecondaryAuxiliaryActivatedCarbon").text(obj.limitDisposalSecondaryAuxiliaryActivatedCarbon);
        $("#todayInboundWastesDistillation").text(obj.todayInboundWastesDistillation);
        $("#todayOutboundWastesDistillation").text(obj.todayOutboundWastesDistillation);
        $("#todayInventoryWastesDistillation").text(obj.todayInventoryWastesDistillation);
        $("#todayDisposalSecondaryAuxiliaryLye").text(obj.todayDisposalSecondaryAuxiliaryLye);
        $("#limitDisposalSecondaryAuxiliaryLye").text(obj.limitDisposalSecondaryAuxiliaryLye);
        $("#todayInboundWastesSuspension").text(obj.todayInboundWastesSuspension);
        $("#todayOutboundWastesSuspension").text(obj.todayOutboundWastesSuspension);
        $("#todayInventoryWastesSuspension").text(obj.todayInventoryWastesSuspension);
        $("#todayDisposalSecondaryAuxiliarySalt").text(obj.todayDisposalSecondaryAuxiliarySalt);
        $("#limitDisposalSecondaryAuxiliarySalt").text(obj.limitDisposalSecondaryAuxiliarySalt);
        $("#todayInboundWastesWasteLiquid").text(obj.todayInboundWastesWasteLiquid);
        $("#todayOutboundWastesWasteLiquid").text(obj.todayOutboundWastesWasteLiquid);
        $("#todayInventoryWastesWasteLiquid").text(obj.todayInventoryWastesWasteLiquid);
        $("#todayDisposalSecondaryAuxiliarySlagBag").text(obj.todayDisposalSecondaryAuxiliarySlagBag);
        $("#limitDisposalSecondaryAuxiliarySlagBag").text(obj.limitDisposalSecondaryAuxiliarySlagBag);
        $("#todayInboundWastesTotal").text(obj.todayInboundWastesTotal);
        $("#todayOutboundWastesTotal").text(obj.todayOutboundWastesTotal);
        $("#todayInventoryWastesTotal").text(obj.todayInventoryWastesTotal);
        $("#todayDisposalSecondaryAuxiliaryFlyAshBag").text(obj.todayDisposalSecondaryAuxiliaryFlyAshBag);
        $("#limitDisposalSecondaryAuxiliaryFlyAshBag").text(obj.limitDisposalSecondaryAuxiliaryFlyAshBag);
        $("#todayInboundSecondWastesSlag").text(obj.todayInboundSecondWastesSlag);
        $("#todayOutboundSecondWastesSlag").text(obj.todayOutboundSecondWastesSlag);
        $("#todayInventorySecondWastesSlag").text(obj.todayInventorySecondWastesSlag);
        $("#todayDisposalSecondaryAuxiliaryDieselOil").text(obj.todayDisposalSecondaryAuxiliaryDieselOil);
        $("#limitDisposalSecondaryAuxiliaryDieselOil").text(obj.limitDisposalSecondaryAuxiliaryDieselOil);
        $("#todayInboundSecondWastesAsh").text(obj.todayInboundSecondWastesAsh);
        $("#todayOutboundSecondWastesAsh").text(obj.todayOutboundSecondWastesAsh);
        $("#todayInventorySecondWastesAsh").text(obj.todayInventorySecondWastesAsh);
        $("#todayDisposalSecondaryAuxiliaryElectricQuantity").text(obj.todayDisposalSecondaryAuxiliaryElectricQuantity);
        $("#limitDisposalSecondaryAuxiliaryElectricQuantity").text(obj.limitDisposalSecondaryAuxiliaryElectricQuantity);
        $("#todayInboundSecondWastesBucket").text(obj.todayInboundSecondWastesBucket);
        $("#todayOutboundSecondWastesBucket").text(obj.todayOutboundSecondWastesBucket);
        $("#todayInventorySecondWastesBucket").text(obj.todayInventorySecondWastesBucket);
        $("#todayDisposalSecondaryAuxiliaryIndustrialWater").text(obj.todayDisposalSecondaryAuxiliaryIndustrialWater);
        $("#limitDisposalSecondaryAuxiliaryIndustrialWater").text(obj.limitDisposalSecondaryAuxiliaryIndustrialWater);
        $("#todayDisposalSecondaryAuxiliaryWoodenPallets").text(obj.todayDisposalSecondaryAuxiliaryWoodenPallets);
        $("#limitDisposalSecondaryAuxiliaryWoodenPallets").text(obj.limitDisposalSecondaryAuxiliaryWoodenPallets);
        $("#todayDisposalThirdAuxiliaryCalcareousLime").text(obj.todayDisposalThirdAuxiliaryCalcareousLime);
        $("#todayInboundAuxiliaryCalcareousLime").text(obj.todayInboundAuxiliaryCalcareousLime);
        $("#todayOutboundAuxiliaryCalcareousLime").text(obj.todayOutboundAuxiliaryCalcareousLime);
        $("#todayInventoryAuxiliaryCalcareousLime").text(obj.todayInventoryAuxiliaryCalcareousLime);
        $("#todayDisposalThirdAuxiliaryCommonActivatedCarbon").text(obj.todayDisposalThirdAuxiliaryCommonActivatedCarbon);
        $("#limitDisposalThirdAuxiliaryCalcareousLime").text(obj.limitDisposalThirdAuxiliaryCalcareousLime);
        $("#todayInboundAuxiliaryCommonActivatedCarbon").text(obj.todayInboundAuxiliaryCommonActivatedCarbon);
        $("#todayOutboundAuxiliaryCommonActivatedCarbon").text(obj.todayOutboundAuxiliaryCommonActivatedCarbon);
        $("#todayInventoryAuxiliaryCommonActivatedCarbon").text(obj.todayInventoryAuxiliaryCommonActivatedCarbon);
        $("#todayDisposalThirdAuxiliaryActivatedCarbon").text(obj.todayDisposalThirdAuxiliaryActivatedCarbon);
        $("#limitDisposalThirdAuxiliaryCommonActivatedCarbon").text(obj.limitDisposalThirdAuxiliaryCommonActivatedCarbon);
        $("#todayInboundAuxiliaryActivatedCarbon").text(obj.todayInboundAuxiliaryActivatedCarbon);
        $("#todayOutboundAuxiliaryActivatedCarbon").text(obj.todayOutboundAuxiliaryActivatedCarbon);
        $("#todayInventoryAuxiliaryActivatedCarbon").text(obj.todayInventoryAuxiliaryActivatedCarbon);
        $("#todayDisposalThirdAuxiliaryActivatedCarbonParticles").text(obj.todayDisposalThirdAuxiliaryActivatedCarbonParticles);
        $("#limitDisposalThirdAuxiliaryActivatedCarbonParticles").text(obj.limitDisposalThirdAuxiliaryActivatedCarbonParticles);
        $("#todayInboundAuxiliaryActivatedCarbonParticles").text(obj.todayInboundAuxiliaryActivatedCarbonParticles);
        $("#todayOutboundAuxiliaryActivatedCarbonParticles").text(obj.todayOutboundAuxiliaryActivatedCarbonParticles);
        $("#todayInventoryAuxiliaryActivatedCarbonParticles").text(obj.todayInventoryAuxiliaryActivatedCarbonParticles);
        $("#todayDisposalThirdAuxiliaryLye").text(obj.todayDisposalThirdAuxiliaryLye);
        $("#limitDisposalThirdAuxiliaryLye").text(obj.limitDisposalThirdAuxiliaryLye);
        $("#todayInboundAuxiliaryLye").text(obj.todayInboundAuxiliaryLye);
        $("#todayOutboundAuxiliaryLye").text(obj.todayOutboundAuxiliaryLye);
        $("#todayInventoryAuxiliaryLye").text(obj.todayInventoryAuxiliaryLye);
        $("#todayDisposalThirdAuxiliaryCausticSoda").text(obj.todayDisposalThirdAuxiliaryCausticSoda);
        $("#limitDisposalThirdAuxiliaryCausticSoda").text(obj.limitDisposalThirdAuxiliaryCausticSoda);
        $("#todayInboundAuxiliaryCausticSoda").text(obj.todayInboundAuxiliaryCausticSoda);
        $("#todayOutboundAuxiliaryCausticSoda").text(obj.todayOutboundAuxiliaryCausticSoda);
        $("#todayInventoryAuxiliaryCausticSoda").text(obj.todayInventoryAuxiliaryCausticSoda);
        $("#todayDisposalThirdAuxiliaryUrea").text(obj.todayDisposalThirdAuxiliaryUrea);
        $("#limitDisposalThirdAuxiliaryUrea").text(obj.limitDisposalThirdAuxiliaryUrea);
        $("#todayInboundAuxiliaryUrea").text(obj.todayInboundAuxiliaryUrea);
        $("#todayOutboundAuxiliaryUrea").text(obj.todayOutboundAuxiliaryUrea);
        $("#todayInventoryAuxiliaryUrea").text(obj.todayInventoryAuxiliaryUrea);
        $("#todayDisposalThirdAuxiliaryHydrochloricAcid").text(obj.todayDisposalThirdAuxiliaryHydrochloricAcid);
        $("#limitDisposalThirdAuxiliaryHydrochloricAcid").text(obj.limitDisposalThirdAuxiliaryHydrochloricAcid);
        $("#todayInboundAuxiliaryHydrochloricAcid").text(obj.todayInboundAuxiliaryHydrochloricAcid);
        $("#todayOutboundAuxiliaryHydrochloricAcid").text(obj.todayOutboundAuxiliaryHydrochloricAcid);
        $("#todayInventoryAuxiliaryHydrochloricAcid").text(obj.todayInventoryAuxiliaryHydrochloricAcid);
        $("#todayDisposalThirdAuxiliaryNahco3").text(obj.todayDisposalThirdAuxiliaryNahco3);
        $("#limitDisposalThirdAuxiliaryNahco3").text(obj.limitDisposalThirdAuxiliaryNahco3);
        $("#todayInboundAuxiliaryNahco3").text(obj.todayInboundAuxiliaryNahco3);
        $("#todayOutboundAuxiliaryNahco3").text(obj.todayOutboundAuxiliaryNahco3);
        $("#todayInventoryAuxiliaryNahco3").text(obj.todayInventoryAuxiliaryNahco3);
        $("#todayDisposalThirdAuxiliaryFlour").text(obj.todayDisposalThirdAuxiliaryFlour);
        $("#limitDisposalThirdAuxiliaryFlour").text(obj.limitDisposalThirdAuxiliaryFlour);
        $("#todayInboundAuxiliaryFlour").text(obj.todayInboundAuxiliaryFlour);
        $("#todayOutboundAuxiliaryFlour").text(obj.todayOutboundAuxiliaryFlour);
        $("#todayInventoryAuxiliaryFlour").text(obj.todayInventoryAuxiliaryFlour);
        $("#todayDisposalThirdAuxiliaryDefoamer").text(obj.todayDisposalThirdAuxiliaryDefoamer);
        $("#limitDisposalThirdAuxiliaryDefoamer").text(obj.limitDisposalThirdAuxiliaryDefoamer);
        $("#todayInboundAuxiliaryDefoamer").text(obj.todayInboundAuxiliaryDefoamer);
        $("#todayOutboundAuxiliaryDefoamer").text(obj.todayOutboundAuxiliaryDefoamer);
        $("#todayInventoryAuxiliaryDefoamer").text(obj.todayInventoryAuxiliaryDefoamer);
        $("#todayDisposalThirdAuxiliaryFlocculant").text(obj.todayDisposalThirdAuxiliaryFlocculant);
        $("#limitDisposalThirdAuxiliaryFlocculant").text(obj.limitDisposalThirdAuxiliaryFlocculant);
        $("#todayInboundAuxiliaryFlocculant").text(obj.todayInboundAuxiliaryFlocculant);
        $("#todayOutboundAuxiliaryFlocculant").text(obj.todayOutboundAuxiliaryFlocculant);
        $("#todayInventoryAuxiliaryFlocculant").text(obj.todayInventoryAuxiliaryFlocculant);
        $("#todayDisposalThirdAuxiliarySoftWaterReducingAgent").text(obj.todayDisposalThirdAuxiliarySoftWaterReducingAgent);
        $("#limitDisposalThirdAuxiliarySoftWaterReducingAgent").text(obj.limitDisposalThirdAuxiliarySoftWaterReducingAgent);
        $("#todayInboundAuxiliarySoftWaterReducingAgent").text(obj.todayInboundAuxiliarySoftWaterReducingAgent);
        $("#todayOutboundAuxiliarySoftWaterReducingAgent").text(obj.todayOutboundAuxiliarySoftWaterReducingAgent);
        $("#todayInventoryAuxiliarySoftWaterReducingAgent").text(obj.todayInventoryAuxiliarySoftWaterReducingAgent);
        $("#todayDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(obj.todayDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        $("#limitDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(obj.limitDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        $("#todayInboundAuxiliarySoftWaterScaleInhibitor").text(obj.todayInboundAuxiliarySoftWaterScaleInhibitor);
        $("#todayOutboundAuxiliarySoftWaterScaleInhibitor").text(obj.todayOutboundAuxiliarySoftWaterScaleInhibitor);
        $("#todayInventoryAuxiliarySoftWaterScaleInhibitor").text(obj.todayInventoryAuxiliarySoftWaterScaleInhibitor);
        $("#todayDisposalThirdAuxiliaryAmmonia").text(obj.todayDisposalThirdAuxiliaryAmmonia);
        $("#limitDisposalThirdAuxiliaryAmmonia").text(obj.limitDisposalThirdAuxiliaryAmmonia);
        $("#todayInboundAuxiliaryAmmonia").text(obj.todayInboundAuxiliaryAmmonia);
        $("#todayOutboundAuxiliaryAmmonia").text(obj.todayOutboundAuxiliaryAmmonia);
        $("#todayInventoryAuxiliaryAmmonia").text(obj.todayInventoryAuxiliaryAmmonia);
        $("#todayDisposalThirdAuxiliaryWaterReducingAgent").text(obj.todayDisposalThirdAuxiliaryWaterReducingAgent);
        $("#limitDisposalThirdAuxiliaryWaterReducingAgent").text(obj.limitDisposalThirdAuxiliaryWaterReducingAgent);
        $("#todayInboundAuxiliaryWaterReducingAgent").text(obj.todayInboundAuxiliaryWaterReducingAgent);
        $("#todayOutboundAuxiliaryWaterReducingAgent").text(obj.todayOutboundAuxiliaryWaterReducingAgent);
        $("#todayInventoryAuxiliaryWaterReducingAgent").text(obj.todayInventoryAuxiliaryWaterReducingAgent);
        $("#todayDisposalThirdAuxiliaryNaclo").text(obj.todayDisposalThirdAuxiliaryNaclo);
        $("#limitDisposalThirdAuxiliaryNaclo").text(obj.limitDisposalThirdAuxiliaryNaclo);
        $("#todayInboundAuxiliaryWaterScaleInhibitor").text(obj.todayInboundAuxiliaryWaterScaleInhibitor);
        $("#todayOutboundAuxiliaryWaterScaleInhibitor").text(obj.todayOutboundAuxiliaryWaterScaleInhibitor);
        $("#todayInventoryAuxiliaryWaterScaleInhibitor").text(obj.todayInventoryAuxiliaryWaterScaleInhibitor);
        $("#todayDisposalThirdAuxiliaryStandardBox").text(obj.todayDisposalThirdAuxiliaryStandardBox);
        $("#limitDisposalThirdAuxiliaryStandardBox").text(obj.limitDisposalThirdAuxiliaryStandardBox);
        $("#todayInboundAuxiliaryNaclo").text(obj.todayInboundAuxiliaryNaclo);
        $("#todayOutboundAuxiliaryNaclo").text(obj.todayOutboundAuxiliaryNaclo);
        $("#todayInventoryAuxiliaryNaclo").text(obj.todayInventoryAuxiliaryNaclo);
        $("#todayDisposalThirdAuxiliaryWoodenPallets").text(obj.todayDisposalThirdAuxiliaryWoodenPallets);
        $("#limitDisposalThirdAuxiliaryWoodenPallets").text(obj.limitDisposalThirdAuxiliaryWoodenPallets);
        $("#todayInboundAuxiliaryDeodorant").text(obj.todayInboundAuxiliaryDeodorant);
        $("#todayOutboundAuxiliaryDeodorant").text(obj.todayOutboundAuxiliaryDeodorant);
        $("#todayInventoryAuxiliaryDeodorant").text(obj.todayInventoryAuxiliaryDeodorant);
        $("#todayDisposalThirdAuxiliaryStandardTray_1m").text(obj.todayDisposalThirdAuxiliaryStandardTray_1m);
        $("#limitDisposalThirdAuxiliaryStandardTray_1m").text(obj.limitDisposalThirdAuxiliaryStandardTray_1m);
        $("#todayInboundAuxiliarySalt").text(obj.todayInboundAuxiliarySalt);
        $("#todayOutboundAuxiliarySalt").text(obj.todayOutboundAuxiliarySalt);
        $("#todayInventoryAuxiliarySalt").text(obj.todayInventoryAuxiliarySalt);
        $("#todayDisposalThirdAuxiliaryStandardTray_1_2m").text(obj.todayDisposalThirdAuxiliaryStandardTray_1_2m);
        $("#limitDisposalThirdAuxiliaryStandardTray_1_2m").text(obj.limitDisposalThirdAuxiliaryStandardTray_1_2m);
        $("#todayInboundAuxiliarySlagBag").text(obj.todayInboundAuxiliarySlagBag);
        $("#todayOutboundAuxiliarySlagBag").text(obj.todayOutboundAuxiliarySlagBag);
        $("#todayInventoryAuxiliarySlagBag").text(obj.todayInventoryAuxiliarySlagBag);
        $("#todayDisposalThirdAuxiliarySlagBag").text(obj.todayDisposalThirdAuxiliarySlagBag);
        $("#limitDisposalThirdSecondaryAuxiliarySlagBag").text(obj.limitDisposalThirdSecondaryAuxiliarySlagBag);
        $("#todayInboundAuxiliaryFlyAshBag").text(obj.todayInboundAuxiliaryFlyAshBag);
        $("#todayOutboundAuxiliaryFlyAshBag").text(obj.todayOutboundAuxiliaryFlyAshBag);
        $("#todayInventoryAuxiliaryFlyAshBag").text(obj.todayInventoryAuxiliaryFlyAshBag);
        $("#todayDisposalThirdAuxiliaryFlyAshBag").text(obj.todayDisposalThirdAuxiliaryFlyAshBag);
        $("#limitDisposalThirdAuxiliaryFlyAshBag").text(obj.limitDisposalThirdAuxiliaryFlyAshBag);
        $("#todayInboundAuxiliaryMedicalWastesBag").text(obj.todayInboundAuxiliaryMedicalWastesBag);
        $("#todayOutboundAuxiliaryMedicalWastesBag").text(obj.todayOutboundAuxiliaryMedicalWastesBag);
        $("#todayInventoryAuxiliaryMedicalWastesBag").text(obj.todayInventoryAuxiliaryMedicalWastesBag);
        $("#todayDisposalThirdAuxiliaryTonBox").text(obj.todayDisposalThirdAuxiliaryTonBox);
        $("#limitDisposalThirdAuxiliaryTonBox").text(obj.limitDisposalThirdAuxiliaryTonBox);
        $("#todayInboundAuxiliaryMedicalPackingPlasticBag").text(obj.todayInboundAuxiliaryMedicalPackingPlasticBag);
        $("#todayOutboundAuxiliaryMedicalPackingPlasticBag").text(obj.todayOutboundAuxiliaryMedicalPackingPlasticBag);
        $("#todayInventoryAuxiliaryMedicalPackingPlasticBag").text(obj.todayInventoryAuxiliaryMedicalPackingPlasticBag);
        $("#todayDisposalThirdAuxiliarySteam").text(obj.todayDisposalThirdAuxiliarySteam);
        $("#limitDisposalThirdAuxiliarySteam").text(obj.limitDisposalThirdAuxiliarySteam);
        $("#todayInboundAuxiliaryCollectionBox").text(obj.todayInboundAuxiliaryCollectionBox);
        $("#todayOutboundAuxiliaryCollectionBox").text(obj.todayOutboundAuxiliaryCollectionBox);
        $("#todayInventoryAuxiliaryCollectionBox").text(obj.todayInventoryAuxiliaryCollectionBox);
        $("#todayDisposalThirdAuxiliaryDieselOil").text(obj.todayDisposalThirdAuxiliaryDieselOil);
        $("#limitDisposalThirdAuxiliaryDieselOil").text(obj.limitDisposalThirdAuxiliaryDieselOil);
        $("#todayInboundAuxiliaryStandardBox").text(obj.todayInboundAuxiliaryStandardBox);
        $("#todayOutboundAuxiliaryStandardBox").text(obj.todayOutboundAuxiliaryStandardBox);
        $("#todayInventoryAuxiliaryStandardBox").text(obj.todayInventoryAuxiliaryStandardBox);
        $("#todayDisposalThirdAuxiliaryNaturalGas").text(obj.todayDisposalThirdAuxiliaryNaturalGas);
        $("#limitDisposalThirdAuxiliaryNaturalGas").text(obj.limitDisposalThirdAuxiliaryNaturalGas);
        $("#todayInboundAuxiliaryWoodenPallets").text(obj.todayInboundAuxiliaryWoodenPallets);
        $("#todayOutboundAuxiliaryWoodenPallets").text(obj.todayOutboundAuxiliaryWoodenPallets);
        $("#todayInventoryAuxiliaryWoodenPallets").text(obj.todayInventoryAuxiliaryWoodenPallets);
        $("#todayDisposalThirdAuxiliaryElectricQuantity").text(obj.todayDisposalThirdAuxiliaryElectricQuantity);
        $("#limitDisposalThirdAuxiliaryElectricQuantity").text(obj.limitDisposalThirdAuxiliaryElectricQuantity);
        $("#todayInboundAuxiliaryStandardTray_1m").text(obj.todayInboundAuxiliaryStandardTray_1m);
        $("#todayOutboundAuxiliaryStandardTray_1m").text(obj.todayOutboundAuxiliaryStandardTray_1m);
        $("#todayInventoryAuxiliaryStandardTray_1m").text(obj.todayInventoryAuxiliaryStandardTray_1m);
        $("#todayDisposalThirdAuxiliaryIndustrialWater").text(obj.todayDisposalThirdAuxiliaryIndustrialWater);
        $("#limitDisposalThirdAuxiliaryIndustrialWater").text(obj.limitDisposalThirdAuxiliaryIndustrialWater);
        $("#todayInboundAuxiliaryStandardTray_1_2m").text(obj.todayInboundAuxiliaryStandardTray_1_2m);
        $("#todayOutboundAuxiliaryStandardTray_1_2m").text(obj.todayOutboundAuxiliaryStandardTray_1_2m);
        $("#todayInventoryAuxiliaryStandardTray_1_2m").text(obj.todayInventoryAuxiliaryStandardTray_1_2m);
        $("#todayDisposalThirdAuxiliaryTapWaterQuantity").text(obj.todayDisposalThirdAuxiliaryTapWaterQuantity);
        $("#limitDisposalThirdAuxiliaryTapWaterQuantity").text(obj.limitDisposalThirdAuxiliaryTapWaterQuantity);
        $("#todayInboundAuxiliaryTonBox").text(obj.todayInboundAuxiliaryTonBox);
        $("#todayOutboundAuxiliaryTonBox").text(obj.todayOutboundAuxiliaryTonBox);
        $("#todayInventoryAuxiliaryTonBox").text(obj.todayInventoryAuxiliaryTonBox);
        $("#todayDisposalTowerElectricQuantity").text(obj.todayDisposalTowerElectricQuantity);
        $("#limitDisposalTowerElectricQuantity").text(obj.limitDisposalTowerElectricQuantity);
        $("#todayInboundAuxiliarySteam").text(obj.todayInboundAuxiliarySteam);
        $("#todayOutboundAuxiliarySteam").text(obj.todayOutboundAuxiliarySteam);
        $("#todayInventoryAuxiliarySteam").text(obj.todayInventoryAuxiliarySteam);
        $("#todayInboundAuxiliaryDieselOil").text(obj.todayInboundAuxiliaryDieselOil);
        $("#todayOutboundAuxiliaryDieselOil").text(obj.todayOutboundAuxiliaryDieselOil);
        $("#todayInventoryAuxiliaryDieselOil").text(obj.todayInventoryAuxiliaryDieselOil);
        $("#todayInboundAuxiliaryNaturalGas").text(obj.todayInboundAuxiliaryNaturalGas);
        $("#todayOutboundAuxiliaryNaturalGas").text(obj.todayOutboundAuxiliaryNaturalGas);
        $("#todayInventoryAuxiliaryNaturalGas").text(obj.todayInventoryAuxiliaryNaturalGas);
        $("#todayInboundAuxiliaryElectricQuantity").text(obj.todayInboundAuxiliaryElectricQuantity);
        $("#todayOutboundAuxiliaryElectricQuantity").text(obj.todayOutboundAuxiliaryElectricQuantity);
        $("#todayInventoryAuxiliaryElectricQuantity").text(obj.todayInventoryAuxiliaryElectricQuantity);
        $("#todayInboundAuxiliaryIndustrialWater").text(obj.todayInboundAuxiliaryIndustrialWater);
        $("#todayOutboundAuxiliaryIndustrialWater").text(obj.todayOutboundAuxiliaryIndustrialWater);
        $("#todayInventoryAuxiliaryIndustrialWater").text(obj.todayInventoryAuxiliaryIndustrialWater);
        $("#todayEquipmentA2StopTime").text(obj.todayEquipmentA2StopTime);
        $("#todayEquipmentA2RunningTime").text(obj.todayEquipmentA2RunningTime);
        $("#todayInboundAuxiliaryTapWaterQuantity").text(obj.todayInboundAuxiliaryTapWaterQuantity);
        $("#todayOutboundAuxiliaryTapWaterQuantity").text(obj.todayOutboundAuxiliaryTapWaterQuantity);
        $("#todayInventoryAuxiliaryTapWaterQuantity").text(obj.todayInventoryAuxiliaryTapWaterQuantity);
        $("#todayEquipmentB2StopTime").text(obj.todayEquipmentB2StopTime);
        $("#todayEquipmentB2RunningTime").text(obj.todayEquipmentB2RunningTime);
        $("#todayEquipmentPrepare2StopTime").text(obj.todayEquipmentPrepare2StopTime);
        $("#todayEquipmentPrepare2RunningTime").text(obj.todayEquipmentPrepare2RunningTime);
        $("#todayDisposalMedicalWastes").text(obj.todayDisposalMedicalWastes);
        $("#todayDisposalMedicalWastesDisposalDirect").text(obj.todayDisposalMedicalWastesDisposalDirect);
        $("#todayDisposalMedicalWastesCooking").text(obj.todayDisposalMedicalWastesCooking);
        $("#todayDisposalMedicalWastesErrorNumber").text(obj.todayDisposalMedicalWastesErrorNumber);
        $("#todayDisposalMedicalWastesAfterCooking").text(obj.todayDisposalMedicalWastesAfterCooking);
        $("#todayDisposalMedicalWastesAfterCookingSend").text(obj.todayDisposalMedicalWastesAfterCookingSend);
        $("#todayDisposalMedicalWastesAfterCookingInbound").text(obj.todayDisposalMedicalWastesAfterCookingInbound);
        $("#todayDisposalMedicalWastesWetNumber").text(obj.todayDisposalMedicalWastesWetNumber);
        $("#todayEquipmentSecondaryStopTime").text(obj.todayEquipmentSecondaryStopTime);
        $("#todayEquipmentSecondaryRunningTime").text(obj.todayEquipmentSecondaryRunningTime);
        $("#todayEquipmentThirdStopTime").text(obj.todayEquipmentThirdStopTime);
        $("#todayEquipmentThirdRunningTime").text(obj.todayEquipmentThirdRunningTime);
        $("#todayOutboundA2WastesBulk").text(obj.todayOutboundA2WastesBulk);
        $("#todayOutboundB2WastesBulk").text(obj.todayOutboundB2WastesBulk);
        $("#todayOutboundA2WastesCrushing").text(obj.todayOutboundA2WastesCrushing);
        $("#todayOutboundB2WastesCrushing").text(obj.todayOutboundB2WastesCrushing);
        $("#todayOutboundA2WastesSludge").text(obj.todayOutboundA2WastesSludge);
        $("#todayOutboundB2WastesSludge").text(obj.todayOutboundB2WastesSludge);
        $("#todayOutboundA2WastesDistillation").text(obj.todayOutboundA2WastesDistillation);
        $("#todayOutboundB2WastesDistillation").text(obj.todayOutboundB2WastesDistillation);
        $("#todayEquipmentA2RunningRate").text(obj.todayEquipmentA2RunningRate);
        $("#todayOutboundA2WastesSuspension").text(obj.todayOutboundA2WastesSuspension);
        $("#todayOutboundB2WastesSuspension").text(obj.todayOutboundB2WastesSuspension);
        $("#todayEquipmentB2RunningRate").text(obj.todayEquipmentB2RunningRate);
        $("#todayOutboundA2WastesWasteLiquid").text(obj.todayOutboundA2WastesWasteLiquid);
        $("#todayOutboundB2WastesWasteLiquid").text(obj.todayOutboundB2WastesWasteLiquid);
        $("#todayEquipmentPrepare2RunningRate").text(obj.todayEquipmentPrepare2RunningRate);
        $("#todayOutboundA2MedicalWastes").text(obj.todayOutboundA2MedicalWastes);
        $("#todayOutboundB2MedicalWastes").text(obj.todayOutboundB2MedicalWastes);
        $("#todayEquipmentSecondaryRunningRate").text(obj.todayEquipmentSecondaryRunningRate);
        $("#todayOutboundPrepare2WastesBulk").text(obj.todayOutboundPrepare2WastesBulk);
        $("#todayEquipmentThirdRunningRate").text(obj.todayEquipmentThirdRunningRate);
        $("#todayOutboundPrepare2WastesCrushing").text(obj.todayOutboundPrepare2WastesCrushing);
        $("#todayOutboundThirdPretreatmentSystemWastesBulk").text(obj.todayOutboundThirdPretreatmentSystemWastesBulk);
        $("#todayOutboundPrepare2WastesSludge").text(obj.todayOutboundPrepare2WastesSludge);
        $("#todayOutboundThirdPretreatmentSystemWastesCrushing").text(obj.todayOutboundThirdPretreatmentSystemWastesCrushing);
        $("#todayOutboundPrepare2WastesDistillation").text(obj.todayOutboundPrepare2WastesDistillation);
        $("#todayOutboundThirdPretreatmentSystemWastesSludge").text(obj.todayOutboundThirdPretreatmentSystemWastesSludge);
        $("#todayOutboundPrepare2WastesSuspension").text(obj.todayOutboundPrepare2WastesSuspension);
        $("#todayOutboundThirdPretreatmentSystemWastesDistillation").text(obj.todayOutboundThirdPretreatmentSystemWastesDistillation);
        $("#todayDisposalSecondarySlag").text(obj.todayDisposalSecondarySlag);
        $("#todayOutboundPrepare2WastesWasteLiquid").text(obj.todayOutboundPrepare2WastesWasteLiquid);
        $("#todayOutboundThirdPretreatmentSystemWastesSuspension").text(obj.todayOutboundThirdPretreatmentSystemWastesSuspension);
        $("#todayDisposalSecondaryAsh").text(obj.todayDisposalSecondaryAsh);
        $("#todayOutboundPrepare2MedicalWastes").text(obj.todayOutboundPrepare2MedicalWastes);
        $("#todayOutboundThirdPretreatmentSystemWastesWasteLiquid").text(obj.todayOutboundThirdPretreatmentSystemWastesWasteLiquid);
        $("#todayDisposalThirdSlag").text(obj.todayDisposalThirdSlag);
        $("#todayOutboundThirdPretreatmentSystemMedicalWastes").text(obj.todayOutboundThirdPretreatmentSystemMedicalWastes);
        $("#todayDisposalThirdAsh").text(obj.todayDisposalThirdAsh);
    }
}

/**
 * 查看数据
 * @param e
 */
function viewData(e) {
    // 获取编号并存储内存，页面跳转
    window.localStorage.productionDailyId = getIdByMenu(e);
    $(location).prop('href', 'productionDaily1.html');
}

/**
 * 通过菜单获取编号
 * @param e
 * @returns {*}
 */
function getIdByMenu(e) {
    return e.parent().parent().find("td[name='id']").text();
}


