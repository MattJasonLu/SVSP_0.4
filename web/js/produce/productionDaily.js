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
            url: "searchProductionDailyCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result > 0) {
                    totalRecord = result;
                } else {
                    console.log(result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log(result);
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
            url: "searchProductionDaily",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
                console.log(result);
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
                        console.log(result);
                    }
                },
                error: function (result) {
                    console.log(result);
                }
            });
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchProductionDaily",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
                        // console.log(result);
                        setDataList(result.data);
                    } else {
                        console.log(result);
                    }
                },
                error: function (result) {
                    console.log(result);
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
    getSelectedInfo();
}

/**
 * 设置高级查询的审核状态数据
 */
function getSelectedInfo() {
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
                    if (item.index == 13 || item.index == 7 || item.index == 21) {
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
        clonedTr.find("td[name='index']").text(index + 1);
        clonedTr.find("td[name='id']").text(obj.id);
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
            parkingReason: $("#beginTime").val(),
            otherIssue: $("#endTime").val(),
            checkState: $("#search-checkState").val(),
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
        url: "searchProductionDaily",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
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
        $("#date").text(getDateStr(obj.date));
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
        $("#monthInboundMedicalWastes").text(obj.monthInboundMedicalWastes);
        $("#yearInboundMedicalWastes").text(obj.yearInboundMedicalWastes);
        $("#monthOutboundMedicalWastes").text(obj.monthOutboundMedicalWastes);
        $("#yearOutboundMedicalWastes").text(obj.yearOutboundMedicalWastes);
        $("#monthBalanceMedicalWastes").text(obj.monthBalanceMedicalWastes);
        $("#monthInboundMedicalWastesDirectDisposal").text(obj.monthInboundMedicalWastesDirectDisposal);
        $("#yearInboundMedicalWastesDirectDisposal").text(obj.yearInboundMedicalWastesDirectDisposal);
        $("#monthOutboundMedicalWastesDirectDisposal").text(obj.monthOutboundMedicalWastesDirectDisposal);
        $("#yearOutboundMedicalWastesDirectDisposal").text(obj.yearOutboundMedicalWastesDirectDisposal);
        $("#monthBalanceMedicalWastesDirectDisposal").text(obj.monthBalanceMedicalWastesDirectDisposal);
        $("#monthInboundMedicalWastesCooking").text(obj.monthInboundMedicalWastesCooking);
        $("#yearInboundMedicalWastesCooking").text(obj.yearInboundMedicalWastesCooking);
        $("#monthOutboundMedicalWastesCooking").text(obj.monthOutboundMedicalWastesCooking);
        $("#yearOutboundMedicalWastesCooking").text(obj.yearOutboundMedicalWastesCooking);
        $("#monthBalanceMedicalWastesCooking").text(obj.monthBalanceMedicalWastesCooking);
        $("#monthInboundMedicalWastesErrorNumber").text(obj.monthInboundMedicalWastesErrorNumber);
        $("#yearInboundMedicalWastesErrorNumber").text(obj.yearInboundMedicalWastesErrorNumber);
        $("#monthOutboundMedicalWastesErrorNumber").text(obj.monthOutboundMedicalWastesErrorNumber);
        $("#yearOutboundMedicalWastesErrorNumber").text(obj.yearOutboundMedicalWastesErrorNumber);
        $("#monthBalanceMedicalWastesErrorNumber").text(obj.monthBalanceMedicalWastesErrorNumber);
        $("#monthInboundMedicalWastesAfterCooking").text(obj.monthInboundMedicalWastesAfterCooking);
        $("#yearInboundMedicalWastesAfterCooking").text(obj.yearInboundMedicalWastesAfterCooking);
        $("#monthOutboundMedicalWastesAfterCooking").text(obj.monthOutboundMedicalWastesAfterCooking);
        $("#yearOutboundMedicalWastesAfterCooking").text(obj.yearOutboundMedicalWastesAfterCooking);
        $("#monthBalanceMedicalWastesAfterCooking").text(obj.monthBalanceMedicalWastesAfterCooking);
        $("#monthInboundMedicalWastesAfterCookingSend").text(obj.monthInboundMedicalWastesAfterCookingSend);
        $("#yearInboundMedicalWastesAfterCookingSend").text(obj.yearInboundMedicalWastesAfterCookingSend);
        $("#monthOutboundMedicalWastesAfterCookingSend").text(obj.monthOutboundMedicalWastesAfterCookingSend);
        $("#yearOutboundMedicalWastesAfterCookingSend").text(obj.yearOutboundMedicalWastesAfterCookingSend);
        $("#monthBalanceMedicalWastesAfterCookingSend").text(obj.monthBalanceMedicalWastesAfterCookingSend);
        $("#monthInboundMedicalWastesAfterCookingInbound").text(obj.monthInboundMedicalWastesAfterCookingInbound);
        $("#yearInboundMedicalWastesAfterCookingInbound").text(obj.yearInboundMedicalWastesAfterCookingInbound);
        $("#monthOutboundMedicalWastesAfterCookingInbound").text(obj.monthOutboundMedicalWastesAfterCookingInbound);
        $("#yearOutboundMedicalWastesAfterCookingInbound").text(obj.yearOutboundMedicalWastesAfterCookingInbound);
        $("#monthBalanceMedicalWastesAfterCookingInbound").text(obj.monthBalanceMedicalWastesAfterCookingInbound);
        $("#monthInboundMedicalWastesWetNumber").text(obj.monthInboundMedicalWastesWetNumber);
        $("#yearInboundMedicalWastesWetNumber").text(obj.yearInboundMedicalWastesWetNumber);
        $("#monthOutboundMedicalWastesWetNumber").text(obj.monthOutboundMedicalWastesWetNumber);
        $("#yearOutboundMedicalWastesWetNumber").text(obj.yearOutboundMedicalWastesWetNumber);
        $("#monthBalanceMedicalWastesWetNumber").text(obj.monthBalanceMedicalWastesWetNumber);
        $("#monthInboundWastesBulk").text(obj.monthInboundWastesBulk);
        $("#yearInboundWastesBulk").text(obj.yearInboundWastesBulk);
        $("#monthOutboundWastesBulk").text(obj.monthOutboundWastesBulk);
        $("#yearOutboundWastesBulk").text(obj.yearOutboundWastesBulk);
        $("#monthBalanceWastesBulk").text(obj.monthBalanceWastesBulk);
        $("#monthInboundWastesCrushing").text(obj.monthInboundWastesCrushing);
        $("#yearInboundWastesCrushing").text(obj.yearInboundWastesCrushing);
        $("#monthOutboundWastesCrushing").text(obj.monthOutboundWastesCrushing);
        $("#yearOutboundWastesCrushing").text(obj.yearOutboundWastesCrushing);
        $("#monthBalanceWastesCrushing").text(obj.monthBalanceWastesCrushing);
        $("#monthInboundWastesSludge").text(obj.monthInboundWastesSludge);
        $("#yearInboundWastesSludge").text(obj.yearInboundWastesSludge);
        $("#monthOutboundWastesSludge").text(obj.monthOutboundWastesSludge);
        $("#yearOutboundWastesSludge").text(obj.yearOutboundWastesSludge);
        $("#monthBalanceWastesSludge").text(obj.monthBalanceWastesSludge);
        $("#monthInboundWastesDistillation").text(obj.monthInboundWastesDistillation);
        $("#yearInboundWastesDistillation").text(obj.yearInboundWastesDistillation);
        $("#monthOutboundWastesDistillation").text(obj.monthOutboundWastesDistillation);
        $("#yearOutboundWastesDistillation").text(obj.yearOutboundWastesDistillation);
        $("#monthBalanceWastesDistillation").text(obj.monthBalanceWastesDistillation);
        $("#monthInboundWastesSuspension").text(obj.monthInboundWastesSuspension);
        $("#yearInboundWastesSuspension").text(obj.yearInboundWastesSuspension);
        $("#monthOutboundWastesSuspension").text(obj.monthOutboundWastesSuspension);
        $("#yearOutboundWastesSuspension").text(obj.yearOutboundWastesSuspension);
        $("#monthBalanceWastesSuspension").text(obj.monthBalanceWastesSuspension);
        $("#monthInboundWastesWasteLiquid").text(obj.monthInboundWastesWasteLiquid);
        $("#yearInboundWastesWasteLiquid").text(obj.yearInboundWastesWasteLiquid);
        $("#monthOutboundWastesWasteLiquid").text(obj.monthOutboundWastesWasteLiquid);
        $("#yearOutboundWastesWasteLiquid").text(obj.yearOutboundWastesWasteLiquid);
        $("#monthBalanceWastesWasteLiquid").text(obj.monthBalanceWastesWasteLiquid);
        $("#monthInboundWastesTotal").text(obj.monthInboundWastesTotal);
        $("#yearInboundWastesTotal").text(obj.yearInboundWastesTotal);
        $("#monthOutboundWastesTotal").text(obj.monthOutboundWastesTotal);
        $("#yearOutboundWastesTotal").text(obj.yearOutboundWastesTotal);
        $("#monthBalanceWastesTotal").text(obj.monthBalanceWastesTotal);
        $("#monthInboundSecondWastesSlag").text(obj.monthInboundSecondWastesSlag);
        $("#yearInboundSecondWastesSlag").text(obj.yearInboundSecondWastesSlag);
        $("#monthOutboundSecondWastesSlag").text(obj.monthOutboundSecondWastesSlag);
        $("#yearOutboundSecondWastesSlag").text(obj.yearOutboundSecondWastesSlag);
        $("#monthBalanceSecondWastesSlag").text(obj.monthBalanceSecondWastesSlag);
        $("#monthInboundSecondWastesAsh").text(obj.monthInboundSecondWastesAsh);
        $("#yearInboundSecondWastesAsh").text(obj.yearInboundSecondWastesAsh);
        $("#monthOutboundSecondWastesAsh").text(obj.monthOutboundSecondWastesAsh);
        $("#yearOutboundSecondWastesAsh").text(obj.yearOutboundSecondWastesAsh);
        $("#monthBalanceSecondWastesAsh").text(obj.monthBalanceSecondWastesAsh);
        $("#monthInboundSecondWastesBucket").text(obj.monthInboundSecondWastesBucket);
        $("#yearInboundSecondWastesBucket").text(obj.yearInboundSecondWastesBucket);
        $("#monthOutboundSecondWastesBucket").text(obj.monthOutboundSecondWastesBucket);
        $("#yearOutboundSecondWastesBucket").text(obj.yearOutboundSecondWastesBucket);
        $("#monthBalanceSecondWastesBucket").text(obj.monthBalanceSecondWastesBucket);
        $("#monthDisposalMedicalAuxiliaryNaclo").text(obj.monthDisposalMedicalAuxiliaryNaclo);
        $("#yearDisposalMedicalAuxiliaryNaclo").text(obj.yearDisposalMedicalAuxiliaryNaclo);
        $("#todayAverageDisposalMedicalAuxiliaryNaclo").text(obj.todayAverageDisposalMedicalAuxiliaryNaclo);
        $("#monthAverageDisposalMedicalAuxiliaryNaclo").text(obj.monthAverageDisposalMedicalAuxiliaryNaclo);
        $("#monthDisposalMedicalAuxiliaryDeodorant").text(obj.monthDisposalMedicalAuxiliaryDeodorant);
        $("#yearDisposalMedicalAuxiliaryDeodorant").text(obj.yearDisposalMedicalAuxiliaryDeodorant);
        $("#todayAverageDisposalMedicalAuxiliaryDeodorant").text(obj.todayAverageDisposalMedicalAuxiliaryDeodorant);
        $("#monthAverageDisposalMedicalAuxiliaryDeodorant").text(obj.monthAverageDisposalMedicalAuxiliaryDeodorant);
        $("#monthDisposalMedicalAuxiliaryMedicalWastesBag").text(obj.monthDisposalMedicalAuxiliaryMedicalWastesBag);
        $("#yearDisposalMedicalAuxiliaryMedicalWastesBag").text(obj.yearDisposalMedicalAuxiliaryMedicalWastesBag);
        $("#todayAverageDisposalMedicalAuxiliaryMedicalWastesBag").text(obj.todayAverageDisposalMedicalAuxiliaryMedicalWastesBag);
        $("#monthAverageDisposalMedicalAuxiliaryMedicalWastesBag").text(obj.monthAverageDisposalMedicalAuxiliaryMedicalWastesBag);
        $("#monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(obj.monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        $("#yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(obj.yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        $("#todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(obj.todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        $("#monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(obj.monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag);
        $("#monthDisposalMedicalAuxiliaryCollectionBox").text(obj.monthDisposalMedicalAuxiliaryCollectionBox);
        $("#yearDisposalMedicalAuxiliaryCollectionBox").text(obj.yearDisposalMedicalAuxiliaryCollectionBox);
        $("#todayAverageDisposalMedicalAuxiliaryCollectionBox").text(obj.todayAverageDisposalMedicalAuxiliaryCollectionBox);
        $("#monthAverageDisposalMedicalAuxiliaryCollectionBox").text(obj.monthAverageDisposalMedicalAuxiliaryCollectionBox);
        $("#monthDisposalMedicalAuxiliarySteam").text(obj.monthDisposalMedicalAuxiliarySteam);
        $("#yearDisposalMedicalAuxiliarySteam").text(obj.yearDisposalMedicalAuxiliarySteam);
        $("#todayAverageDisposalMedicalAuxiliarySteam").text(obj.todayAverageDisposalMedicalAuxiliarySteam);
        $("#monthAverageDisposalMedicalAuxiliarySteam").text(obj.monthAverageDisposalMedicalAuxiliarySteam);
        $("#monthDisposalMedicalAuxiliaryIndustrialWater").text(obj.monthDisposalMedicalAuxiliaryIndustrialWater);
        $("#yearDisposalMedicalAuxiliaryIndustrialWater").text(obj.yearDisposalMedicalAuxiliaryIndustrialWater);
        $("#todayAverageDisposalMedicalAuxiliaryIndustrialWater").text(obj.todayAverageDisposalMedicalAuxiliaryIndustrialWater);
        $("#monthAverageDisposalMedicalAuxiliaryIndustrialWater").text(obj.monthAverageDisposalMedicalAuxiliaryIndustrialWater);
        $("#monthDisposalMedicalAuxiliaryElectricQuantity").text(obj.monthDisposalMedicalAuxiliaryElectricQuantity);
        $("#yearDisposalMedicalAuxiliaryElectricQuantity").text(obj.yearDisposalMedicalAuxiliaryElectricQuantity);
        $("#todayAverageDisposalMedicalAuxiliaryElectricQuantity").text(obj.todayAverageDisposalMedicalAuxiliaryElectricQuantity);
        $("#monthAverageDisposalMedicalAuxiliaryElectricQuantity").text(obj.monthAverageDisposalMedicalAuxiliaryElectricQuantity);
        $("#monthDisposalSecondaryAuxiliaryCalcareousLime").text(obj.monthDisposalSecondaryAuxiliaryCalcareousLime);
        $("#yearDisposalSecondaryAuxiliaryCalcareousLime").text(obj.yearDisposalSecondaryAuxiliaryCalcareousLime);
        $("#todayAverageDisposalSecondaryAuxiliaryCalcareousLime").text(obj.todayAverageDisposalSecondaryAuxiliaryCalcareousLime);
        $("#monthAverageDisposalSecondaryAuxiliaryCalcareousLime").text(obj.monthAverageDisposalSecondaryAuxiliaryCalcareousLime);
        $("#monthDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(obj.monthDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        $("#yearDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(obj.yearDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        $("#todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(obj.todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        $("#monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(obj.monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon);
        $("#monthDisposalSecondaryAuxiliaryActivatedCarbon").text(obj.monthDisposalSecondaryAuxiliaryActivatedCarbon);
        $("#yearDisposalSecondaryAuxiliaryActivatedCarbon").text(obj.yearDisposalSecondaryAuxiliaryActivatedCarbon);
        $("#todayAverageDisposalSecondaryAuxiliaryActivatedCarbon").text(obj.todayAverageDisposalSecondaryAuxiliaryActivatedCarbon);
        $("#monthAverageDisposalSecondaryAuxiliaryActivatedCarbon").text(obj.monthAverageDisposalSecondaryAuxiliaryActivatedCarbon);
        $("#monthDisposalSecondaryAuxiliaryLye").text(obj.monthDisposalSecondaryAuxiliaryLye);
        $("#yearDisposalSecondaryAuxiliaryLye").text(obj.yearDisposalSecondaryAuxiliaryLye);
        $("#todayAverageDisposalSecondaryAuxiliaryLye").text(obj.todayAverageDisposalSecondaryAuxiliaryLye);
        $("#monthAverageDisposalSecondaryAuxiliaryLye").text(obj.monthAverageDisposalSecondaryAuxiliaryLye);
        $("#monthDisposalSecondaryAuxiliarySalt").text(obj.monthDisposalSecondaryAuxiliarySalt);
        $("#yearDisposalSecondaryAuxiliarySalt").text(obj.yearDisposalSecondaryAuxiliarySalt);
        $("#todayAverageDisposalSecondaryAuxiliarySalt").text(obj.todayAverageDisposalSecondaryAuxiliarySalt);
        $("#monthAverageDisposalSecondaryAuxiliarySalt").text(obj.monthAverageDisposalSecondaryAuxiliarySalt);
        $("#monthDisposalSecondaryAuxiliarySlagBag").text(obj.monthDisposalSecondaryAuxiliarySlagBag);
        $("#yearDisposalSecondaryAuxiliarySlagBag").text(obj.yearDisposalSecondaryAuxiliarySlagBag);
        $("#todayAverageDisposalSecondaryAuxiliarySlagBag").text(obj.todayAverageDisposalSecondaryAuxiliarySlagBag);
        $("#monthAverageDisposalSecondaryAuxiliarySlagBag").text(obj.monthAverageDisposalSecondaryAuxiliarySlagBag);
        $("#monthDisposalSecondaryAuxiliaryFlyAshBag").text(obj.monthDisposalSecondaryAuxiliaryFlyAshBag);
        $("#yearDisposalSecondaryAuxiliaryFlyAshBag").text(obj.yearDisposalSecondaryAuxiliaryFlyAshBag);
        $("#todayAverageDisposalSecondaryAuxiliaryFlyAshBag").text(obj.todayAverageDisposalSecondaryAuxiliaryFlyAshBag);
        $("#monthAverageDisposalSecondaryAuxiliaryFlyAshBag").text(obj.monthAverageDisposalSecondaryAuxiliaryFlyAshBag);
        $("#monthDisposalSecondaryAuxiliaryDieselOil").text(obj.monthDisposalSecondaryAuxiliaryDieselOil);
        $("#yearDisposalSecondaryAuxiliaryDieselOil").text(obj.yearDisposalSecondaryAuxiliaryDieselOil);
        $("#todayAverageDisposalSecondaryAuxiliaryDieselOil").text(obj.todayAverageDisposalSecondaryAuxiliaryDieselOil);
        $("#monthAverageDisposalSecondaryAuxiliaryDieselOil").text(obj.monthAverageDisposalSecondaryAuxiliaryDieselOil);
        $("#monthDisposalSecondaryAuxiliaryElectricQuantity").text(obj.monthDisposalSecondaryAuxiliaryElectricQuantity);
        $("#yearDisposalSecondaryAuxiliaryElectricQuantity").text(obj.yearDisposalSecondaryAuxiliaryElectricQuantity);
        $("#todayAverageDisposalSecondaryAuxiliaryElectricQuantity").text(obj.todayAverageDisposalSecondaryAuxiliaryElectricQuantity);
        $("#monthAverageDisposalSecondaryAuxiliaryElectricQuantity").text(obj.monthAverageDisposalSecondaryAuxiliaryElectricQuantity);
        $("#monthDisposalSecondaryAuxiliaryIndustrialWater").text(obj.monthDisposalSecondaryAuxiliaryIndustrialWater);
        $("#yearDisposalSecondaryAuxiliaryIndustrialWater").text(obj.yearDisposalSecondaryAuxiliaryIndustrialWater);
        $("#todayAverageDisposalSecondaryAuxiliaryIndustrialWater").text(obj.todayAverageDisposalSecondaryAuxiliaryIndustrialWater);
        $("#monthAverageDisposalSecondaryAuxiliaryIndustrialWater").text(obj.monthAverageDisposalSecondaryAuxiliaryIndustrialWater);
        $("#limitDisposalSecondaryAuxiliaryIndustrialWater").text(obj.limitDisposalSecondaryAuxiliaryIndustrialWater);
        $("#monthDisposalSecondaryAuxiliaryWoodenPallets").text(obj.monthDisposalSecondaryAuxiliaryWoodenPallets);
        $("#yearDisposalSecondaryAuxiliaryWoodenPallets").text(obj.yearDisposalSecondaryAuxiliaryWoodenPallets);
        $("#todayAverageDisposalSecondaryAuxiliaryWoodenPallets").text(obj.todayAverageDisposalSecondaryAuxiliaryWoodenPallets);
        $("#monthAverageDisposalSecondaryAuxiliaryWoodenPallets").text(obj.monthAverageDisposalSecondaryAuxiliaryWoodenPallets);
        $("#monthDisposalThirdAuxiliaryCalcareousLime").text(obj.monthDisposalThirdAuxiliaryCalcareousLime);
        $("#yearDisposalThirdAuxiliaryCalcareousLime").text(obj.yearDisposalThirdAuxiliaryCalcareousLime);
        $("#todayAverageDisposalThirdAuxiliaryCalcareousLime").text(obj.todayAverageDisposalThirdAuxiliaryCalcareousLime);
        $("#monthAverageDisposalThirdAuxiliaryCalcareousLime").text(obj.monthAverageDisposalThirdAuxiliaryCalcareousLime);
        $("#monthDisposalThirdAuxiliaryCommonActivatedCarbon").text(obj.monthDisposalThirdAuxiliaryCommonActivatedCarbon);
        $("#yearDisposalThirdAuxiliaryCommonActivatedCarbon").text(obj.yearDisposalThirdAuxiliaryCommonActivatedCarbon);
        $("#todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon").text(obj.todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon);
        $("#monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon").text(obj.monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon);
        $("#monthDisposalThirdAuxiliaryActivatedCarbon").text(obj.monthDisposalThirdAuxiliaryActivatedCarbon);
        $("#yearDisposalThirdAuxiliaryActivatedCarbon").text(obj.yearDisposalThirdAuxiliaryActivatedCarbon);
        $("#todayAverageDisposalThirdAuxiliaryActivatedCarbon").text(obj.todayAverageDisposalThirdAuxiliaryActivatedCarbon);
        $("#monthAverageDisposalThirdAuxiliaryActivatedCarbon").text(obj.monthAverageDisposalThirdAuxiliaryActivatedCarbon);
        $("#monthDisposalThirdAuxiliaryActivatedCarbonParticles").text(obj.monthDisposalThirdAuxiliaryActivatedCarbonParticles);
        $("#yearDisposalThirdAuxiliaryActivatedCarbonParticles").text(obj.yearDisposalThirdAuxiliaryActivatedCarbonParticles);
        $("#todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles").text(obj.todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles);
        $("#monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles").text(obj.monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles);
        $("#monthDisposalThirdAuxiliaryLye").text(obj.monthDisposalThirdAuxiliaryLye);
        $("#yearDisposalThirdAuxiliaryLye").text(obj.yearDisposalThirdAuxiliaryLye);
        $("#todayAverageDisposalThirdAuxiliaryLye").text(obj.todayAverageDisposalThirdAuxiliaryLye);
        $("#monthAverageDisposalThirdAuxiliaryLye").text(obj.monthAverageDisposalThirdAuxiliaryLye);
        $("#monthDisposalThirdAuxiliaryCausticSoda").text(obj.monthDisposalThirdAuxiliaryCausticSoda);
        $("#yearDisposalThirdAuxiliaryCausticSoda").text(obj.yearDisposalThirdAuxiliaryCausticSoda);
        $("#todayAverageDisposalThirdAuxiliaryCausticSoda").text(obj.todayAverageDisposalThirdAuxiliaryCausticSoda);
        $("#monthAverageDisposalThirdAuxiliaryCausticSoda").text(obj.monthAverageDisposalThirdAuxiliaryCausticSoda);
        $("#monthDisposalThirdAuxiliaryUrea").text(obj.monthDisposalThirdAuxiliaryUrea);
        $("#yearDisposalThirdAuxiliaryUrea").text(obj.yearDisposalThirdAuxiliaryUrea);
        $("#todayAverageDisposalThirdAuxiliaryUrea").text(obj.todayAverageDisposalThirdAuxiliaryUrea);
        $("#monthAverageDisposalThirdAuxiliaryUrea").text(obj.monthAverageDisposalThirdAuxiliaryUrea);
        $("#monthDisposalThirdAuxiliaryHydrochloricAcid").text(obj.monthDisposalThirdAuxiliaryHydrochloricAcid);
        $("#yearDisposalThirdAuxiliaryHydrochloricAcid").text(obj.yearDisposalThirdAuxiliaryHydrochloricAcid);
        $("#todayAverageDisposalThirdAuxiliaryHydrochloricAcid").text(obj.todayAverageDisposalThirdAuxiliaryHydrochloricAcid);
        $("#monthAverageDisposalThirdAuxiliaryHydrochloricAcid").text(obj.monthAverageDisposalThirdAuxiliaryHydrochloricAcid);
        $("#monthDisposalThirdAuxiliaryNahco3").text(obj.monthDisposalThirdAuxiliaryNahco3);
        $("#yearDisposalThirdAuxiliaryNahco3").text(obj.yearDisposalThirdAuxiliaryNahco3);
        $("#todayAverageDisposalThirdAuxiliaryNahco3").text(obj.todayAverageDisposalThirdAuxiliaryNahco3);
        $("#monthAverageDisposalThirdAuxiliaryNahco3").text(obj.monthAverageDisposalThirdAuxiliaryNahco3);
        $("#monthDisposalThirdAuxiliaryFlour").text(obj.monthDisposalThirdAuxiliaryFlour);
        $("#yearDisposalThirdAuxiliaryFlour").text(obj.yearDisposalThirdAuxiliaryFlour);
        $("#todayAverageDisposalThirdAuxiliaryFlour").text(obj.todayAverageDisposalThirdAuxiliaryFlour);
        $("#monthAverageDisposalThirdAuxiliaryFlour").text(obj.monthAverageDisposalThirdAuxiliaryFlour);
        $("#monthDisposalThirdAuxiliaryDefoamer").text(obj.monthDisposalThirdAuxiliaryDefoamer);
        $("#yearDisposalThirdAuxiliaryDefoamer").text(obj.yearDisposalThirdAuxiliaryDefoamer);
        $("#todayAverageDisposalThirdAuxiliaryDefoamer").text(obj.todayAverageDisposalThirdAuxiliaryDefoamer);
        $("#monthAverageDisposalThirdAuxiliaryDefoamer").text(obj.monthAverageDisposalThirdAuxiliaryDefoamer);
        $("#monthDisposalThirdAuxiliaryFlocculant").text(obj.monthDisposalThirdAuxiliaryFlocculant);
        $("#yearDisposalThirdAuxiliaryFlocculant").text(obj.yearDisposalThirdAuxiliaryFlocculant);
        $("#todayAverageDisposalThirdAuxiliaryFlocculant").text(obj.todayAverageDisposalThirdAuxiliaryFlocculant);
        $("#monthAverageDisposalThirdAuxiliaryFlocculant").text(obj.monthAverageDisposalThirdAuxiliaryFlocculant);
        $("#monthDisposalThirdAuxiliarySoftWaterReducingAgent").text(obj.monthDisposalThirdAuxiliarySoftWaterReducingAgent);
        $("#yearDisposalThirdAuxiliarySoftWaterReducingAgent").text(obj.yearDisposalThirdAuxiliarySoftWaterReducingAgent);
        $("#todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent").text(obj.todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent);
        $("#monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent").text(obj.monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent);
        $("#monthDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(obj.monthDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        $("#yearDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(obj.yearDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        $("#todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(obj.todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        $("#monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(obj.monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor);
        $("#monthDisposalThirdAuxiliaryAmmonia").text(obj.monthDisposalThirdAuxiliaryAmmonia);
        $("#yearDisposalThirdAuxiliaryAmmonia").text(obj.yearDisposalThirdAuxiliaryAmmonia);
        $("#todayAverageDisposalThirdAuxiliaryAmmonia").text(obj.todayAverageDisposalThirdAuxiliaryAmmonia);
        $("#monthAverageDisposalThirdAuxiliaryAmmonia").text(obj.monthAverageDisposalThirdAuxiliaryAmmonia);
        $("#monthDisposalThirdAuxiliaryWaterReducingAgent").text(obj.monthDisposalThirdAuxiliaryWaterReducingAgent);
        $("#yearDisposalThirdAuxiliaryWaterReducingAgent").text(obj.yearDisposalThirdAuxiliaryWaterReducingAgent);
        $("#todayAverageDisposalThirdAuxiliaryWaterReducingAgent").text(obj.todayAverageDisposalThirdAuxiliaryWaterReducingAgent);
        $("#monthAverageDisposalThirdAuxiliaryWaterReducingAgent").text(obj.monthAverageDisposalThirdAuxiliaryWaterReducingAgent);
        $("#monthDisposalThirdAuxiliaryNaclo").text(obj.monthDisposalThirdAuxiliaryNaclo);
        $("#yearDisposalThirdAuxiliaryNaclo").text(obj.yearDisposalThirdAuxiliaryNaclo);
        $("#todayAverageDisposalThirdAuxiliaryNaclo").text(obj.todayAverageDisposalThirdAuxiliaryNaclo);
        $("#monthAverageDisposalThirdAuxiliaryNaclo").text(obj.monthAverageDisposalThirdAuxiliaryNaclo);
        $("#monthDisposalThirdAuxiliaryStandardBox").text(obj.monthDisposalThirdAuxiliaryStandardBox);
        $("#yearDisposalThirdAuxiliaryStandardBox").text(obj.yearDisposalThirdAuxiliaryStandardBox);
        $("#todayAverageDisposalThirdAuxiliaryStandardBox").text(obj.todayAverageDisposalThirdAuxiliaryStandardBox);
        $("#monthAverageDisposalThirdAuxiliaryStandardBox").text(obj.monthAverageDisposalThirdAuxiliaryStandardBox);
        $("#monthDisposalThirdAuxiliaryWoodenPallets").text(obj.monthDisposalThirdAuxiliaryWoodenPallets);
        $("#yearDisposalThirdAuxiliaryWoodenPallets").text(obj.yearDisposalThirdAuxiliaryWoodenPallets);
        $("#todayAverageDisposalThirdAuxiliaryWoodenPallets").text(obj.todayAverageDisposalThirdAuxiliaryWoodenPallets);
        $("#monthAverageDisposalThirdAuxiliaryWoodenPallets").text(obj.monthAverageDisposalThirdAuxiliaryWoodenPallets);
        $("#monthDisposalThirdAuxiliaryStandardTray_1m").text(obj.monthDisposalThirdAuxiliaryStandardTray_1m);
        $("#yearDisposalThirdAuxiliaryStandardTray_1m").text(obj.yearDisposalThirdAuxiliaryStandardTray_1m);
        $("#todayAverageDisposalThirdAuxiliaryStandardTray_1m").text(obj.todayAverageDisposalThirdAuxiliaryStandardTray_1m);
        $("#monthAverageDisposalThirdAuxiliaryStandardTray_1m").text(obj.monthAverageDisposalThirdAuxiliaryStandardTray_1m);
        $("#monthDisposalThirdAuxiliaryStandardTray_1_2m").text(obj.monthDisposalThirdAuxiliaryStandardTray_1_2m);
        $("#yearDisposalThirdAuxiliaryStandardTray_1_2m").text(obj.yearDisposalThirdAuxiliaryStandardTray_1_2m);
        $("#todayAverageDisposalThirdAuxiliaryStandardTray_1_2m").text(obj.todayAverageDisposalThirdAuxiliaryStandardTray_1_2m);
        $("#monthAverageDisposalThirdAuxiliaryStandardTray_1_2m").text(obj.monthAverageDisposalThirdAuxiliaryStandardTray_1_2m);
        $("#monthDisposalThirdAuxiliarySlagBag").text(obj.monthDisposalThirdAuxiliarySlagBag);
        $("#yearDisposalThirdAuxiliarySlagBag").text(obj.yearDisposalThirdAuxiliarySlagBag);
        $("#todayAverageDisposalThirdAuxiliarySlagBag").text(obj.todayAverageDisposalThirdAuxiliarySlagBag);
        $("#monthAverageDisposalThirdAuxiliarySlagBag").text(obj.monthAverageDisposalThirdAuxiliarySlagBag);
        $("#monthDisposalThirdAuxiliaryFlyAshBag").text(obj.monthDisposalThirdAuxiliaryFlyAshBag);
        $("#yearDisposalThirdAuxiliaryFlyAshBag").text(obj.yearDisposalThirdAuxiliaryFlyAshBag);
        $("#todayAverageDisposalThirdAuxiliaryFlyAshBag").text(obj.todayAverageDisposalThirdAuxiliaryFlyAshBag);
        $("#monthAverageDisposalThirdAuxiliaryFlyAshBag").text(obj.monthAverageDisposalThirdAuxiliaryFlyAshBag);
        $("#monthDisposalThirdAuxiliaryTonBox").text(obj.monthDisposalThirdAuxiliaryTonBox);
        $("#yearDisposalThirdAuxiliaryTonBox").text(obj.yearDisposalThirdAuxiliaryTonBox);
        $("#todayAverageDisposalThirdAuxiliaryTonBox").text(obj.todayAverageDisposalThirdAuxiliaryTonBox);
        $("#monthAverageDisposalThirdAuxiliaryTonBox").text(obj.monthAverageDisposalThirdAuxiliaryTonBox);
        $("#monthDisposalThirdAuxiliarySteam").text(obj.monthDisposalThirdAuxiliarySteam);
        $("#yearDisposalThirdAuxiliarySteam").text(obj.yearDisposalThirdAuxiliarySteam);
        $("#todayAverageDisposalThirdAuxiliarySteam").text(obj.todayAverageDisposalThirdAuxiliarySteam);
        $("#monthAverageDisposalThirdAuxiliarySteam").text(obj.monthAverageDisposalThirdAuxiliarySteam);
        $("#monthDisposalThirdAuxiliaryDieselOil").text(obj.monthDisposalThirdAuxiliaryDieselOil);
        $("#yearDisposalThirdAuxiliaryDieselOil").text(obj.yearDisposalThirdAuxiliaryDieselOil);
        $("#todayAverageDisposalThirdAuxiliaryDieselOil").text(obj.todayAverageDisposalThirdAuxiliaryDieselOil);
        $("#monthAverageDisposalThirdAuxiliaryDieselOil").text(obj.monthAverageDisposalThirdAuxiliaryDieselOil);
        $("#monthDisposalThirdAuxiliaryNaturalGas").text(obj.monthDisposalThirdAuxiliaryNaturalGas);
        $("#yearDisposalThirdAuxiliaryNaturalGas").text(obj.yearDisposalThirdAuxiliaryNaturalGas);
        $("#todayAverageDisposalThirdAuxiliaryNaturalGas").text(obj.todayAverageDisposalThirdAuxiliaryNaturalGas);
        $("#monthAverageDisposalThirdAuxiliaryNaturalGas").text(obj.monthAverageDisposalThirdAuxiliaryNaturalGas);
        $("#monthDisposalThirdAuxiliaryElectricQuantity").text(obj.monthDisposalThirdAuxiliaryElectricQuantity);
        $("#yearDisposalThirdAuxiliaryElectricQuantity").text(obj.yearDisposalThirdAuxiliaryElectricQuantity);
        $("#todayAverageDisposalThirdAuxiliaryElectricQuantity").text(obj.todayAverageDisposalThirdAuxiliaryElectricQuantity);
        $("#monthAverageDisposalThirdAuxiliaryElectricQuantity").text(obj.monthAverageDisposalThirdAuxiliaryElectricQuantity);
        $("#monthDisposalThirdAuxiliaryIndustrialWater").text(obj.monthDisposalThirdAuxiliaryIndustrialWater);
        $("#yearDisposalThirdAuxiliaryIndustrialWater").text(obj.yearDisposalThirdAuxiliaryIndustrialWater);
        $("#todayAverageDisposalThirdAuxiliaryIndustrialWater").text(obj.todayAverageDisposalThirdAuxiliaryIndustrialWater);
        $("#monthAverageDisposalThirdAuxiliaryIndustrialWater").text(obj.monthAverageDisposalThirdAuxiliaryIndustrialWater);
        $("#monthDisposalThirdAuxiliaryTapWaterQuantity").text(obj.monthDisposalThirdAuxiliaryTapWaterQuantity);
        $("#yearDisposalThirdAuxiliaryTapWaterQuantity").text(obj.yearDisposalThirdAuxiliaryTapWaterQuantity);
        $("#todayAverageDisposalThirdAuxiliaryTapWaterQuantity").text(obj.todayAverageDisposalThirdAuxiliaryTapWaterQuantity);
        $("#monthAverageDisposalThirdAuxiliaryTapWaterQuantity").text(obj.monthAverageDisposalThirdAuxiliaryTapWaterQuantity);
        $("#monthDisposalTowerElectricQuantity").text(obj.monthDisposalTowerElectricQuantity);
        $("#yearDisposalTowerElectricQuantity").text(obj.yearDisposalTowerElectricQuantity);
        $("#todayAverageDisposalTowerElectricQuantity").text(obj.todayAverageDisposalTowerElectricQuantity);
        $("#monthAverageDisposalTowerElectricQuantity").text(obj.monthAverageDisposalTowerElectricQuantity);
        $("#monthInboundAuxiliaryCalcareousLime").text(obj.monthInboundAuxiliaryCalcareousLime);
        $("#yearInboundAuxiliaryCalcareousLime").text(obj.yearInboundAuxiliaryCalcareousLime);
        $("#monthOutboundAuxiliaryCalcareousLime").text(obj.monthOutboundAuxiliaryCalcareousLime);
        $("#yearOutboundAuxiliaryCalcareousLime").text(obj.yearOutboundAuxiliaryCalcareousLime);
        $("#monthInboundAuxiliaryCommonActivatedCarbon").text(obj.monthInboundAuxiliaryCommonActivatedCarbon);
        $("#yearInboundAuxiliaryCommonActivatedCarbon").text(obj.yearInboundAuxiliaryCommonActivatedCarbon);
        $("#monthOutboundAuxiliaryCommonActivatedCarbon").text(obj.monthOutboundAuxiliaryCommonActivatedCarbon);
        $("#yearOutboundAuxiliaryCommonActivatedCarbon").text(obj.yearOutboundAuxiliaryCommonActivatedCarbon);
        $("#monthInboundAuxiliaryActivatedCarbon").text(obj.monthInboundAuxiliaryActivatedCarbon);
        $("#yearInboundAuxiliaryActivatedCarbon").text(obj.yearInboundAuxiliaryActivatedCarbon);
        $("#monthOutboundAuxiliaryActivatedCarbon").text(obj.monthOutboundAuxiliaryActivatedCarbon);
        $("#yearOutboundAuxiliaryActivatedCarbon").text(obj.yearOutboundAuxiliaryActivatedCarbon);
        $("#monthInboundAuxiliaryActivatedCarbonParticles").text(obj.monthInboundAuxiliaryActivatedCarbonParticles);
        $("#yearInboundAuxiliaryActivatedCarbonParticles").text(obj.yearInboundAuxiliaryActivatedCarbonParticles);
        $("#monthOutboundAuxiliaryActivatedCarbonParticles").text(obj.monthOutboundAuxiliaryActivatedCarbonParticles);
        $("#yearOutboundAuxiliaryActivatedCarbonParticles").text(obj.yearOutboundAuxiliaryActivatedCarbonParticles);
        $("#monthInboundAuxiliaryLye").text(obj.monthInboundAuxiliaryLye);
        $("#yearInboundAuxiliaryLye").text(obj.yearInboundAuxiliaryLye);
        $("#monthOutboundAuxiliaryLye").text(obj.monthOutboundAuxiliaryLye);
        $("#yearOutboundAuxiliaryLye").text(obj.yearOutboundAuxiliaryLye);
        $("#monthInboundAuxiliaryCausticSoda").text(obj.monthInboundAuxiliaryCausticSoda);
        $("#yearInboundAuxiliaryCausticSoda").text(obj.yearInboundAuxiliaryCausticSoda);
        $("#monthOutboundAuxiliaryCausticSoda").text(obj.monthOutboundAuxiliaryCausticSoda);
        $("#yearOutboundAuxiliaryCausticSoda").text(obj.yearOutboundAuxiliaryCausticSoda);
        $("#monthInboundAuxiliaryUrea").text(obj.monthInboundAuxiliaryUrea);
        $("#yearInboundAuxiliaryUrea").text(obj.yearInboundAuxiliaryUrea);
        $("#monthOutboundAuxiliaryUrea").text(obj.monthOutboundAuxiliaryUrea);
        $("#yearOutboundAuxiliaryUrea").text(obj.yearOutboundAuxiliaryUrea);
        $("#monthInboundAuxiliaryHydrochloricAcid").text(obj.monthInboundAuxiliaryHydrochloricAcid);
        $("#yearInboundAuxiliaryHydrochloricAcid").text(obj.yearInboundAuxiliaryHydrochloricAcid);
        $("#monthOutboundAuxiliaryHydrochloricAcid").text(obj.monthOutboundAuxiliaryHydrochloricAcid);
        $("#yearOutboundAuxiliaryHydrochloricAcid").text(obj.yearOutboundAuxiliaryHydrochloricAcid);
        $("#monthInboundAuxiliaryNahco3").text(obj.monthInboundAuxiliaryNahco3);
        $("#yearInboundAuxiliaryNahco3").text(obj.yearInboundAuxiliaryNahco3);
        $("#monthOutboundAuxiliaryNahco3").text(obj.monthOutboundAuxiliaryNahco3);
        $("#yearOutboundAuxiliaryNahco3").text(obj.yearOutboundAuxiliaryNahco3);
        $("#monthInboundAuxiliaryFlour").text(obj.monthInboundAuxiliaryFlour);
        $("#yearInboundAuxiliaryFlour").text(obj.yearInboundAuxiliaryFlour);
        $("#monthOutboundAuxiliaryFlour").text(obj.monthOutboundAuxiliaryFlour);
        $("#yearOutboundAuxiliaryFlour").text(obj.yearOutboundAuxiliaryFlour);
        $("#monthInboundAuxiliaryDefoamer").text(obj.monthInboundAuxiliaryDefoamer);
        $("#yearInboundAuxiliaryDefoamer").text(obj.yearInboundAuxiliaryDefoamer);
        $("#monthOutboundAuxiliaryDefoamer").text(obj.monthOutboundAuxiliaryDefoamer);
        $("#yearOutboundAuxiliaryDefoamer").text(obj.yearOutboundAuxiliaryDefoamer);
        $("#monthInboundAuxiliaryFlocculant").text(obj.monthInboundAuxiliaryFlocculant);
        $("#yearInboundAuxiliaryFlocculant").text(obj.yearInboundAuxiliaryFlocculant);
        $("#monthOutboundAuxiliaryFlocculant").text(obj.monthOutboundAuxiliaryFlocculant);
        $("#yearOutboundAuxiliaryFlocculant").text(obj.yearOutboundAuxiliaryFlocculant);
        $("#monthInboundAuxiliarySoftWaterReducingAgent").text(obj.monthInboundAuxiliarySoftWaterReducingAgent);
        $("#yearInboundAuxiliarySoftWaterReducingAgent").text(obj.yearInboundAuxiliarySoftWaterReducingAgent);
        $("#monthOutboundAuxiliarySoftWaterReducingAgent").text(obj.monthOutboundAuxiliarySoftWaterReducingAgent);
        $("#yearOutboundAuxiliarySoftWaterReducingAgent").text(obj.yearOutboundAuxiliarySoftWaterReducingAgent);
        $("#monthInboundAuxiliarySoftWaterScaleInhibitor").text(obj.monthInboundAuxiliarySoftWaterScaleInhibitor);
        $("#yearInboundAuxiliarySoftWaterScaleInhibitor").text(obj.yearInboundAuxiliarySoftWaterScaleInhibitor);
        $("#monthOutboundAuxiliarySoftWaterScaleInhibitor").text(obj.monthOutboundAuxiliarySoftWaterScaleInhibitor);
        $("#yearOutboundAuxiliarySoftWaterScaleInhibitor").text(obj.yearOutboundAuxiliarySoftWaterScaleInhibitor);
        $("#monthInboundAuxiliaryAmmonia").text(obj.monthInboundAuxiliaryAmmonia);
        $("#yearInboundAuxiliaryAmmonia").text(obj.yearInboundAuxiliaryAmmonia);
        $("#monthOutboundAuxiliaryAmmonia").text(obj.monthOutboundAuxiliaryAmmonia);
        $("#yearOutboundAuxiliaryAmmonia").text(obj.yearOutboundAuxiliaryAmmonia);
        $("#monthInboundAuxiliaryWaterReducingAgent").text(obj.monthInboundAuxiliaryWaterReducingAgent);
        $("#yearInboundAuxiliaryWaterReducingAgent").text(obj.yearInboundAuxiliaryWaterReducingAgent);
        $("#monthOutboundAuxiliaryWaterReducingAgent").text(obj.monthOutboundAuxiliaryWaterReducingAgent);
        $("#yearOutboundAuxiliaryWaterReducingAgent").text(obj.yearOutboundAuxiliaryWaterReducingAgent);
        $("#monthInboundAuxiliaryWaterScaleInhibitor").text(obj.monthInboundAuxiliaryWaterScaleInhibitor);
        $("#yearInboundAuxiliaryWaterScaleInhibitor").text(obj.yearInboundAuxiliaryWaterScaleInhibitor);
        $("#monthOutboundAuxiliaryWaterScaleInhibitor").text(obj.monthOutboundAuxiliaryWaterScaleInhibitor);
        $("#yearOutboundAuxiliaryWaterScaleInhibitor").text(obj.yearOutboundAuxiliaryWaterScaleInhibitor);
        $("#monthInboundAuxiliaryNaclo").text(obj.monthInboundAuxiliaryNaclo);
        $("#yearInboundAuxiliaryNaclo").text(obj.yearInboundAuxiliaryNaclo);
        $("#monthOutboundAuxiliaryNaclo").text(obj.monthOutboundAuxiliaryNaclo);
        $("#yearOutboundAuxiliaryNaclo").text(obj.yearOutboundAuxiliaryNaclo);
        $("#monthInboundAuxiliaryDeodorant").text(obj.monthInboundAuxiliaryDeodorant);
        $("#yearInboundAuxiliaryDeodorant").text(obj.yearInboundAuxiliaryDeodorant);
        $("#monthOutboundAuxiliaryDeodorant").text(obj.monthOutboundAuxiliaryDeodorant);
        $("#yearOutboundAuxiliaryDeodorant").text(obj.yearOutboundAuxiliaryDeodorant);
        $("#monthInboundAuxiliarySalt").text(obj.monthInboundAuxiliarySalt);
        $("#yearInboundAuxiliarySalt").text(obj.yearInboundAuxiliarySalt);
        $("#monthOutboundAuxiliarySalt").text(obj.monthOutboundAuxiliarySalt);
        $("#yearOutboundAuxiliarySalt").text(obj.yearOutboundAuxiliarySalt);
        $("#monthInboundAuxiliarySlagBag").text(obj.monthInboundAuxiliarySlagBag);
        $("#yearInboundAuxiliarySlagBag").text(obj.yearInboundAuxiliarySlagBag);
        $("#monthOutboundAuxiliarySlagBag").text(obj.monthOutboundAuxiliarySlagBag);
        $("#yearOutboundAuxiliarySlagBag").text(obj.yearOutboundAuxiliarySlagBag);
        $("#monthInboundAuxiliaryFlyAshBag").text(obj.monthInboundAuxiliaryFlyAshBag);
        $("#yearInboundAuxiliaryFlyAshBag").text(obj.yearInboundAuxiliaryFlyAshBag);
        $("#monthOutboundAuxiliaryFlyAshBag").text(obj.monthOutboundAuxiliaryFlyAshBag);
        $("#yearOutboundAuxiliaryFlyAshBag").text(obj.yearOutboundAuxiliaryFlyAshBag);
        $("#monthInboundAuxiliaryMedicalWastesBag").text(obj.monthInboundAuxiliaryMedicalWastesBag);
        $("#yearInboundAuxiliaryMedicalWastesBag").text(obj.yearInboundAuxiliaryMedicalWastesBag);
        $("#monthOutboundAuxiliaryMedicalWastesBag").text(obj.monthOutboundAuxiliaryMedicalWastesBag);
        $("#yearOutboundAuxiliaryMedicalWastesBag").text(obj.yearOutboundAuxiliaryMedicalWastesBag);
        $("#monthInboundAuxiliaryMedicalPackingPlasticBag").text(obj.monthInboundAuxiliaryMedicalPackingPlasticBag);
        $("#yearInboundAuxiliaryMedicalPackingPlasticBag").text(obj.yearInboundAuxiliaryMedicalPackingPlasticBag);
        $("#monthOutboundAuxiliaryMedicalPackingPlasticBag").text(obj.monthOutboundAuxiliaryMedicalPackingPlasticBag);
        $("#yearOutboundAuxiliaryMedicalPackingPlasticBag").text(obj.yearOutboundAuxiliaryMedicalPackingPlasticBag);
        $("#monthInboundAuxiliaryCollectionBox").text(obj.monthInboundAuxiliaryCollectionBox);
        $("#yearInboundAuxiliaryCollectionBox").text(obj.yearInboundAuxiliaryCollectionBox);
        $("#monthOutboundAuxiliaryCollectionBox").text(obj.monthOutboundAuxiliaryCollectionBox);
        $("#yearOutboundAuxiliaryCollectionBox").text(obj.yearOutboundAuxiliaryCollectionBox);
        $("#monthInboundAuxiliaryStandardBox").text(obj.monthInboundAuxiliaryStandardBox);
        $("#yearInboundAuxiliaryStandardBox").text(obj.yearInboundAuxiliaryStandardBox);
        $("#monthOutboundAuxiliaryStandardBox").text(obj.monthOutboundAuxiliaryStandardBox);
        $("#yearOutboundAuxiliaryStandardBox").text(obj.yearOutboundAuxiliaryStandardBox);
        $("#monthInboundAuxiliaryWoodenPallets").text(obj.monthInboundAuxiliaryWoodenPallets);
        $("#yearInboundAuxiliaryWoodenPallets").text(obj.yearInboundAuxiliaryWoodenPallets);
        $("#monthOutboundAuxiliaryWoodenPallets").text(obj.monthOutboundAuxiliaryWoodenPallets);
        $("#yearOutboundAuxiliaryWoodenPallets").text(obj.yearOutboundAuxiliaryWoodenPallets);
        $("#monthInboundAuxiliaryStandardTray_1m").text(obj.monthInboundAuxiliaryStandardTray_1m);
        $("#yearInboundAuxiliaryStandardTray_1m").text(obj.yearInboundAuxiliaryStandardTray_1m);
        $("#monthOutboundAuxiliaryStandardTray_1m").text(obj.monthOutboundAuxiliaryStandardTray_1m);
        $("#yearOutboundAuxiliaryStandardTray_1m").text(obj.yearOutboundAuxiliaryStandardTray_1m);
        $("#monthInboundAuxiliaryStandardTray_1_2m").text(obj.monthInboundAuxiliaryStandardTray_1_2m);
        $("#yearInboundAuxiliaryStandardTray_1_2m").text(obj.yearInboundAuxiliaryStandardTray_1_2m);
        $("#monthOutboundAuxiliaryStandardTray_1_2m").text(obj.monthOutboundAuxiliaryStandardTray_1_2m);
        $("#yearOutboundAuxiliaryStandardTray_1_2m").text(obj.yearOutboundAuxiliaryStandardTray_1_2m);
        $("#monthInboundAuxiliaryTonBox").text(obj.monthInboundAuxiliaryTonBox);
        $("#yearInboundAuxiliaryTonBox").text(obj.yearInboundAuxiliaryTonBox);
        $("#monthOutboundAuxiliaryTonBox").text(obj.monthOutboundAuxiliaryTonBox);
        $("#yearOutboundAuxiliaryTonBox").text(obj.yearOutboundAuxiliaryTonBox);
        $("#monthInboundAuxiliarySteam").text(obj.monthInboundAuxiliarySteam);
        $("#yearInboundAuxiliarySteam").text(obj.yearInboundAuxiliarySteam);
        $("#monthOutboundAuxiliarySteam").text(obj.monthOutboundAuxiliarySteam);
        $("#yearOutboundAuxiliarySteam").text(obj.yearOutboundAuxiliarySteam);
        $("#monthInboundAuxiliaryDieselOil").text(obj.monthInboundAuxiliaryDieselOil);
        $("#yearInboundAuxiliaryDieselOil").text(obj.yearInboundAuxiliaryDieselOil);
        $("#monthOutboundAuxiliaryDieselOil").text(obj.monthOutboundAuxiliaryDieselOil);
        $("#yearOutboundAuxiliaryDieselOil").text(obj.yearOutboundAuxiliaryDieselOil);
        $("#monthInboundAuxiliaryNaturalGas").text(obj.monthInboundAuxiliaryNaturalGas);
        $("#yearInboundAuxiliaryNaturalGas").text(obj.yearInboundAuxiliaryNaturalGas);
        $("#monthOutboundAuxiliaryNaturalGas").text(obj.monthOutboundAuxiliaryNaturalGas);
        $("#yearOutboundAuxiliaryNaturalGas").text(obj.yearOutboundAuxiliaryNaturalGas);
        $("#monthInboundAuxiliaryElectricQuantity").text(obj.monthInboundAuxiliaryElectricQuantity);
        $("#yearInboundAuxiliaryElectricQuantity").text(obj.yearInboundAuxiliaryElectricQuantity);
        $("#monthOutboundAuxiliaryElectricQuantity").text(obj.monthOutboundAuxiliaryElectricQuantity);
        $("#yearOutboundAuxiliaryElectricQuantity").text(obj.yearOutboundAuxiliaryElectricQuantity);
        $("#monthInboundAuxiliaryIndustrialWater").text(obj.monthInboundAuxiliaryIndustrialWater);
        $("#yearInboundAuxiliaryIndustrialWater").text(obj.yearInboundAuxiliaryIndustrialWater);
        $("#monthOutboundAuxiliaryIndustrialWater").text(obj.monthOutboundAuxiliaryIndustrialWater);
        $("#yearOutboundAuxiliaryIndustrialWater").text(obj.yearOutboundAuxiliaryIndustrialWater);
        $("#monthInboundAuxiliaryTapWaterQuantity").text(obj.monthInboundAuxiliaryTapWaterQuantity);
        $("#yearInboundAuxiliaryTapWaterQuantity").text(obj.yearInboundAuxiliaryTapWaterQuantity);
        $("#monthOutboundAuxiliaryTapWaterQuantity").text(obj.monthOutboundAuxiliaryTapWaterQuantity);
        $("#yearOutboundAuxiliaryTapWaterQuantity").text(obj.yearOutboundAuxiliaryTapWaterQuantity);
        $("#monthOutboundA2WastesBulk").text(obj.monthOutboundA2WastesBulk);
        $("#yearOutboundA2WastesBulk").text(obj.yearOutboundA2WastesBulk);
        $("#monthOutboundB2WastesBulk").text(obj.monthOutboundB2WastesBulk);
        $("#yearOutboundB2WastesBulk").text(obj.yearOutboundB2WastesBulk);
        $("#todayOutboundB2RateWastesBulk").text(obj.todayOutboundB2RateWastesBulk);
        $("#monthOutboundA2WastesCrushing").text(obj.monthOutboundA2WastesCrushing);
        $("#yearOutboundA2WastesCrushing").text(obj.yearOutboundA2WastesCrushing);
        $("#monthOutboundB2WastesCrushing").text(obj.monthOutboundB2WastesCrushing);
        $("#yearOutboundB2WastesCrushing").text(obj.yearOutboundB2WastesCrushing);
        $("#todayOutboundB2RateWastesCrushing").text(obj.todayOutboundB2RateWastesCrushing);
        $("#monthOutboundA2WastesSludge").text(obj.monthOutboundA2WastesSludge);
        $("#yearOutboundA2WastesSludge").text(obj.yearOutboundA2WastesSludge);
        $("#monthOutboundB2WastesSludge").text(obj.monthOutboundB2WastesSludge);
        $("#yearOutboundB2WastesSludge").text(obj.yearOutboundB2WastesSludge);
        $("#todayOutboundB2RateWastesSludge").text(obj.todayOutboundB2RateWastesSludge);
        $("#monthOutboundA2WastesDistillation").text(obj.monthOutboundA2WastesDistillation);
        $("#yearOutboundA2WastesDistillation").text(obj.yearOutboundA2WastesDistillation);
        $("#monthOutboundB2WastesDistillation").text(obj.monthOutboundB2WastesDistillation);
        $("#yearOutboundB2WastesDistillation").text(obj.yearOutboundB2WastesDistillation);
        $("#todayOutboundB2RateWastesDistillation").text(obj.todayOutboundB2RateWastesDistillation);
        $("#monthOutboundA2WastesSuspension").text(obj.monthOutboundA2WastesSuspension);
        $("#yearOutboundA2WastesSuspension").text(obj.yearOutboundA2WastesSuspension);
        $("#monthOutboundB2WastesSuspension").text(obj.monthOutboundB2WastesSuspension);
        $("#yearOutboundB2WastesSuspension").text(obj.yearOutboundB2WastesSuspension);
        $("#todayOutboundB2RateWastesSuspension").text(obj.todayOutboundB2RateWastesSuspension);
        $("#monthOutboundA2WastesWasteLiquid").text(obj.monthOutboundA2WastesWasteLiquid);
        $("#yearOutboundA2WastesWasteLiquid").text(obj.yearOutboundA2WastesWasteLiquid);
        $("#monthOutboundB2WastesWasteLiquid").text(obj.monthOutboundB2WastesWasteLiquid);
        $("#yearOutboundB2WastesWasteLiquid").text(obj.yearOutboundB2WastesWasteLiquid);
        $("#todayOutboundB2RateWastesWasteLiquid").text(obj.todayOutboundB2RateWastesWasteLiquid);
        $("#monthOutboundA2MedicalWastes").text(obj.monthOutboundA2MedicalWastes);
        $("#yearOutboundA2MedicalWastes").text(obj.yearOutboundA2MedicalWastes);
        $("#monthOutboundB2MedicalWastes").text(obj.monthOutboundB2MedicalWastes);
        $("#yearOutboundB2MedicalWastes").text(obj.yearOutboundB2MedicalWastes);
        $("#todayOutboundB2RateMedicalWastes").text(obj.todayOutboundB2RateMedicalWastes);
        $("#monthOutboundPrepare2WastesBulk").text(obj.monthOutboundPrepare2WastesBulk);
        $("#yearOutboundPrepare2WastesBulk").text(obj.yearOutboundPrepare2WastesBulk);
        $("#monthOutboundPrepare2WastesCrushing").text(obj.monthOutboundPrepare2WastesCrushing);
        $("#yearOutboundPrepare2WastesCrushing").text(obj.yearOutboundPrepare2WastesCrushing);
        $("#monthOutboundThirdPretreatmentSystemWastesBulk").text(obj.monthOutboundThirdPretreatmentSystemWastesBulk);
        $("#yearOutboundThirdPretreatmentSystemWastesBulk").text(obj.yearOutboundThirdPretreatmentSystemWastesBulk);
        $("#todayOutboundThirdPretreatmentSystemRateWastesBulk").text(obj.todayOutboundThirdPretreatmentSystemRateWastesBulk);
        $("#monthOutboundThirdPretreatmentSystemRateWastesBulk").text(obj.monthOutboundThirdPretreatmentSystemRateWastesBulk);
        $("#yearOutboundThirdPretreatmentSystemRateWastesBulk").text(obj.yearOutboundThirdPretreatmentSystemRateWastesBulk);
        $("#monthOutboundPrepare2WastesSludge").text(obj.monthOutboundPrepare2WastesSludge);
        $("#yearOutboundPrepare2WastesSludge").text(obj.yearOutboundPrepare2WastesSludge);
        $("#monthOutboundThirdPretreatmentSystemWastesCrushing").text(obj.monthOutboundThirdPretreatmentSystemWastesCrushing);
        $("#yearOutboundThirdPretreatmentSystemWastesCrushing").text(obj.yearOutboundThirdPretreatmentSystemWastesCrushing);
        $("#todayOutboundThirdPretreatmentSystemRateWastesCrushing").text(obj.todayOutboundThirdPretreatmentSystemRateWastesCrushing);
        $("#monthOutboundThirdPretreatmentSystemRateWastesCrushing").text(obj.monthOutboundThirdPretreatmentSystemRateWastesCrushing);
        $("#yearOutboundThirdPretreatmentSystemRateWastesCrushing").text(obj.yearOutboundThirdPretreatmentSystemRateWastesCrushing);
        $("#monthOutboundPrepare2WastesDistillation").text(obj.monthOutboundPrepare2WastesDistillation);
        $("#yearOutboundPrepare2WastesDistillation").text(obj.yearOutboundPrepare2WastesDistillation);
        $("#monthOutboundThirdPretreatmentSystemWastesSludge").text(obj.monthOutboundThirdPretreatmentSystemWastesSludge);
        $("#yearOutboundThirdPretreatmentSystemWastesSludge").text(obj.yearOutboundThirdPretreatmentSystemWastesSludge);
        $("#todayOutboundThirdPretreatmentSystemRateWastesSludge").text(obj.todayOutboundThirdPretreatmentSystemRateWastesSludge);
        $("#monthOutboundThirdPretreatmentSystemRateWastesSludge").text(obj.monthOutboundThirdPretreatmentSystemRateWastesSludge);
        $("#yearOutboundThirdPretreatmentSystemRateWastesSludge").text(obj.yearOutboundThirdPretreatmentSystemRateWastesSludge);
        $("#monthOutboundPrepare2WastesSuspension").text(obj.monthOutboundPrepare2WastesSuspension);
        $("#yearOutboundPrepare2WastesSuspension").text(obj.yearOutboundPrepare2WastesSuspension);
        $("#monthOutboundThirdPretreatmentSystemWastesDistillation").text(obj.monthOutboundThirdPretreatmentSystemWastesDistillation);
        $("#yearOutboundThirdPretreatmentSystemWastesDistillation").text(obj.yearOutboundThirdPretreatmentSystemWastesDistillation);
        $("#todayOutboundThirdPretreatmentSystemRateWastesDistillation").text(obj.todayOutboundThirdPretreatmentSystemRateWastesDistillation);
        $("#monthOutboundThirdPretreatmentSystemRateWastesDistillation").text(obj.monthOutboundThirdPretreatmentSystemRateWastesDistillation);
        $("#yearOutboundThirdPretreatmentSystemRateWastesDistillation").text(obj.yearOutboundThirdPretreatmentSystemRateWastesDistillation);
        $("#monthOutboundPrepare2WastesWasteLiquid").text(obj.monthOutboundPrepare2WastesWasteLiquid);
        $("#yearOutboundPrepare2WastesWasteLiquid").text(obj.yearOutboundPrepare2WastesWasteLiquid);
        $("#monthOutboundThirdPretreatmentSystemWastesSuspension").text(obj.monthOutboundThirdPretreatmentSystemWastesSuspension);
        $("#yearOutboundThirdPretreatmentSystemWastesSuspension").text(obj.yearOutboundThirdPretreatmentSystemWastesSuspension);
        $("#todayOutboundThirdPretreatmentSystemRateWastesSuspension").text(obj.todayOutboundThirdPretreatmentSystemRateWastesSuspension);
        $("#monthOutboundThirdPretreatmentSystemRateWastesSuspension").text(obj.monthOutboundThirdPretreatmentSystemRateWastesSuspension);
        $("#yearOutboundThirdPretreatmentSystemRateWastesSuspension").text(obj.yearOutboundThirdPretreatmentSystemRateWastesSuspension);
        $("#monthOutboundPrepare2MedicalWastes").text(obj.monthOutboundPrepare2MedicalWastes);
        $("#yearOutboundPrepare2MedicalWastes").text(obj.yearOutboundPrepare2MedicalWastes);
        $("#monthOutboundThirdPretreatmentSystemWastesWasteLiquid").text(obj.monthOutboundThirdPretreatmentSystemWastesWasteLiquid);
        $("#yearOutboundThirdPretreatmentSystemWastesWasteLiquid").text(obj.yearOutboundThirdPretreatmentSystemWastesWasteLiquid);
        $("#todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid").text(obj.todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid);
        $("#monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid").text(obj.monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid);
        $("#yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid").text(obj.yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid);
        $("#monthOutboundSecondPretreatmentWastes").text(obj.monthOutboundSecondPretreatmentWastes);
        $("#yearOutboundSecondPretreatmentWastes").text(obj.yearOutboundSecondPretreatmentWastes);
        $("#monthOutboundThirdPretreatmentSystemMedicalWastes").text(obj.monthOutboundThirdPretreatmentSystemMedicalWastes);
        $("#yearOutboundThirdPretreatmentSystemMedicalWastes").text(obj.yearOutboundThirdPretreatmentSystemMedicalWastes);
        $("#todayOutboundThirdPretreatmentSystemRateMedicalWastes").text(obj.todayOutboundThirdPretreatmentSystemRateMedicalWastes);
        $("#monthOutboundThirdPretreatmentSystemRateMedicalWastes").text(obj.monthOutboundThirdPretreatmentSystemRateMedicalWastes);
        $("#yearOutboundThirdPretreatmentSystemRateMedicalWastes").text(obj.yearOutboundThirdPretreatmentSystemRateMedicalWastes);
        $("#monthEquipmentA2StopTime").text(obj.monthEquipmentA2StopTime);
        $("#yearEquipmentA2StopTime").text(obj.yearEquipmentA2StopTime);
        $("#monthEquipmentB2StopTime").text(obj.monthEquipmentB2StopTime);
        $("#yearEquipmentB2StopTime").text(obj.yearEquipmentB2StopTime);
        $("#monthEquipmentPrepare2StopTime").text(obj.monthEquipmentPrepare2StopTime);
        $("#yearEquipmentPrepare2StopTime").text(obj.yearEquipmentPrepare2StopTime);
        $("#monthEquipmentSecondaryStopTime").text(obj.monthEquipmentSecondaryStopTime);
        $("#yearEquipmentSecondaryStopTime").text(obj.yearEquipmentSecondaryStopTime);
        $("#monthEquipmentThirdStopTime").text(obj.monthEquipmentThirdStopTime);
        $("#yearEquipmentThirdStopTime").text(obj.yearEquipmentThirdStopTime);
        $("#monthEquipmentA2RunningTime").text(obj.monthEquipmentA2RunningTime);
        $("#yearEquipmentA2RunningTime").text(obj.yearEquipmentA2RunningTime);
        $("#monthEquipmentB2RunningTime").text(obj.monthEquipmentB2RunningTime);
        $("#yearEquipmentB2RunningTime").text(obj.yearEquipmentB2RunningTime);
        $("#monthEquipmentPrepare2RunningTime").text(obj.monthEquipmentPrepare2RunningTime);
        $("#yearEquipmentPrepare2RunningTime").text(obj.yearEquipmentPrepare2RunningTime);
        $("#monthEquipmentSecondaryRunningTime").text(obj.monthEquipmentSecondaryRunningTime);
        $("#yearEquipmentSecondaryRunningTime").text(obj.yearEquipmentSecondaryRunningTime);
        $("#monthEquipmentThirdRunningTime").text(obj.monthEquipmentThirdRunningTime);
        $("#yearEquipmentThirdRunningTime").text(obj.yearEquipmentThirdRunningTime);
        $("#monthEquipmentA2RunningRate").text(obj.monthEquipmentA2RunningRate);
        $("#yearEquipmentA2RunningRate").text(obj.yearEquipmentA2RunningRate);
        $("#monthEquipmentB2RunningRate").text(obj.monthEquipmentB2RunningRate);
        $("#yearEquipmentB2RunningRate").text(obj.yearEquipmentB2RunningRate);
        $("#monthEquipmentPrepare2RunningRate").text(obj.monthEquipmentPrepare2RunningRate);
        $("#yearEquipmentPrepare2RunningRate").text(obj.yearEquipmentPrepare2RunningRate);
        $("#monthEquipmentSecondaryRunningRate").text(obj.monthEquipmentSecondaryRunningRate);
        $("#yearEquipmentSecondaryRunningRate").text(obj.yearEquipmentSecondaryRunningRate);
        $("#monthEquipmentThirdRunningRate").text(obj.monthEquipmentThirdRunningRate);
        $("#monthDisposalSecondarySlag").text(obj.monthDisposalSecondarySlag);
        $("#yearDisposalSecondarySlag").text(obj.yearDisposalSecondarySlag);
        $("#monthDisposalSecondaryAsh").text(obj.monthDisposalSecondaryAsh);
        $("#yearDisposalSecondaryAsh").text(obj.yearDisposalSecondaryAsh);
        $("#monthDisposalThirdSlag").text(obj.monthDisposalThirdSlag);
        $("#yearDisposalThirdSlag").text(obj.yearDisposalThirdSlag);
        $("#monthDisposalThirdAsh").text(obj.monthDisposalThirdAsh);
        $("#yearDisposalThirdAsh").text(obj.yearDisposalThirdAsh);

        // 设置四个列表
        // 入库单列表
        for (var i = 0; i < obj.inboundOrderItemList.length; i++) {
            var $i = i;
            if (obj.inboundOrderItemList[i].wastes != null) $("td[id='inboundOrderItemList_" + $i + "_wastesName']").text(obj.inboundOrderItemList[i].wastes.name);
            if (obj.inboundOrderItemList[i].produceCompany != null) $("td[id='inboundOrderItemList_" + $i + "_client']").text(obj.inboundOrderItemList[i].produceCompany.companyName);
            $("td[id='inboundOrderItemList_" + $i + "_wastesAmount']").text(obj.inboundOrderItemList[i].wastesAmount);
            if (obj.inboundOrderItemList[i].handleCategory != null) $("td[id='inboundOrderItemList_" + $i + "_handleCategory']").text(obj.inboundOrderItemList[i].handleCategory.name);
        }
        // 出库单A2列表
        for (var i = 0; i < obj.outboundOrderA2List.length; i++) {
            var $i = i;
            if (obj.outboundOrderA2List[i].laboratoryTest != null) $("td[id='outboundOrderA2List_" + $i + "_wastesName']").text(obj.outboundOrderA2List[i].laboratoryTest.wastesName);
            if (obj.outboundOrderA2List[i].client != null) $("td[id='outboundOrderA2List_" + $i + "_client']").text(obj.outboundOrderA2List[i].client.companyName);
            $("td[id='outboundOrderA2List_" + $i + "_wastesAmount']").text(obj.outboundOrderA2List[i].outboundNumber);
            if (obj.outboundOrderA2List[i].handelCategory != null) $("td[id='outboundOrderA2List_" + $i + "_handleCategory']").text(obj.outboundOrderA2List[i].handelCategory.name);
        }
        // 出库单B2列表
        for (var i = 0; i < obj.outboundOrderB2List.length; i++) {
            var $i = i;
            if (obj.outboundOrderB2List[i].laboratoryTest != null) $("td[id='outboundOrderB2List_" + $i + "_wastesName']").text(obj.outboundOrderB2List[i].laboratoryTest.wastesName);
            if (obj.outboundOrderB2List[i].client != null) $("td[id='outboundOrderB2List_" + $i + "_client']").text(obj.outboundOrderB2List[i].client.companyName);
            $("td[id='outboundOrderB2List_" + $i + "_wastesAmount']").text(obj.outboundOrderB2List[i].outboundNumber);
            if (obj.outboundOrderB2List[i].handelCategory != null) $("td[id='outboundOrderB2List_" + $i + "_handleCategory']").text(obj.outboundOrderB2List[i].handelCategory.name);
        }
        // 出库单Prepare2列表
        for (var i = 0; i < obj.outboundOrderB2List.length; i++) {
            var $i = i;
            if (obj.outboundOrderPrepare2List[i].laboratoryTest != null) $("td[id='outboundOrderPrepare2List_" + $i + "_wastesName']").text(obj.outboundOrderPrepare2List[i].laboratoryTest.wastesName);
            if (obj.outboundOrderPrepare2List[i].client != null) $("td[id='outboundOrderPrepare2List_" + $i + "_client']").text(obj.outboundOrderPrepare2List[i].client.companyName);
            $("td[id='outboundOrderPrepare2List_" + $i + "_wastesAmount']").text(obj.outboundOrderB2List[i].outboundNumber);
            if (obj.outboundOrderPrepare2List[i].handelCategory != null) $("td[id='outboundOrderPrepare2List_" + $i + "_handleCategory']").text(obj.outboundOrderPrepare2List[i].handelCategory.name);
        }
        // 出库单三期列表
        for (var i = 0; i < obj.outboundOrderThirdList.length; i++) {
            var $i = i;
            if (obj.outboundOrderThirdList[i].laboratoryTest != null) $("td[id='outboundOrderThirdList_" + $i + "_wastesName']").text(obj.outboundOrderThirdList[i].laboratoryTest.wastesName);
            if (obj.outboundOrderThirdList[i].client != null) $("td[id='outboundOrderThirdList_" + $i + "_client']").text(obj.outboundOrderThirdList[i].client.companyName);
            $("td[id='outboundOrderThirdList_" + $i + "_wastesAmount']").text(obj.outboundOrderThirdList[i].outboundNumber);
            if (obj.outboundOrderThirdList[i].handelCategory != null) $("td[id='outboundOrderThirdList_" + $i + "_handleCategory']").text(obj.outboundOrderThirdList[i].handelCategory.name);
        }
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
 * 计算日报
 * @param e 菜单
 */
function calculate(e) {
    var r = confirm("重新计算该日报吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "calculateProductionDaily",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
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
 * 设置状态失效
 * @param e
 */
function setInvalid(e) {
    var r = confirm("确认作废该日报？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProductionDailyState",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                id: id,
                checkState: 'Invalid'
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
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
 * 设置状态失效
 * @param e
 */
function setLocked(e) {
    var r = confirm("确认锁定该日报？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProductionDailyState",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                id: id,
                checkState: 'Locked'
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
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
 * 通过菜单获取编号
 * @param e
 * @returns {*}
 */
function getIdByMenu(e) {
    return e.parent().parent().find("td[name='id']").text();
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
            }else if (event.keyCode == 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },400);
    });
});


