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
    loadNavigationList(); // 设置动态菜单
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
    //getSelectedInfo();
}

/**
 * 设置高级查询的审核状态数据
 */
function getSelectedInfo(){
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
        if (obj.checkStateItem != null) clonedTr.find("td[name='checkState']").text(obj.checkStateItem.dictionaryItemName);
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
            startDate: $("#beginTime").val(),
            endDate: $("#endTime").val(),
            checkStateItem: {dataDictionaryItemId:$("#search-checkState").val()},
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $.trim($("#searchContent").val()),
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

/**
 * 显示日期选择模态框
 */
function showDateModal() {
    $("#reportDate").val(getNowDate());
    $("#reportDateStart").val(getReportStart());
    $("#reportDateEnd").val(getReportEnd());
    $("#dateChooseModal").modal('show');
}

/**
 * 生成日报并添加
 */
function addData() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "generateProductionDaily",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            dateStr: $("#reportDate").val(),
            dateStrStart: $("#reportDateStart").val(),
            dateStrEnd: $("#reportDateEnd").val()
        },
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
    loadNavigationList(); // 设置动态菜单
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
        $("#todayInboundMedicalWastes").text(parseFloat(obj.todayInboundMedicalWastes).toFixed(3));
        $("#todayOutboundMedicalWastes").text(parseFloat(obj.todayOutboundMedicalWastes).toFixed(3));
        $("#todayInventoryMedicalWastes").text(parseFloat(obj.todayInventoryMedicalWastes).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryNaclo").text(parseFloat(obj.todayDisposalMedicalAuxiliaryNaclo).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryNaclo").text(parseFloat(obj.limitDisposalMedicalAuxiliaryNaclo).toFixed(3));
        $("#todayInboundMedicalWastesDirectDisposal").text(parseFloat(obj.todayInboundMedicalWastesDirectDisposal).toFixed(3));
        $("#todayOutboundMedicalWastesDirectDisposal").text(parseFloat(obj.todayOutboundMedicalWastesDirectDisposal).toFixed(3));
        $("#todayInventoryMedicalWastesDirectDisposal").text(parseFloat(obj.todayInventoryMedicalWastesDirectDisposal).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryDeodorant").text(parseFloat(obj.todayDisposalMedicalAuxiliaryDeodorant).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryDeodorant").text(parseFloat(obj.limitDisposalMedicalAuxiliaryDeodorant).toFixed(3));
        $("#todayInboundMedicalWastesCooking").text(parseFloat(obj.todayInboundMedicalWastesCooking).toFixed(3));
        $("#todayOutboundMedicalWastesCooking").text(parseFloat(obj.todayOutboundMedicalWastesCooking).toFixed(3));
        $("#todayInventoryMedicalWastesCooking").text(parseFloat(obj.todayInventoryMedicalWastesCooking).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryMedicalWastesBag").text(parseFloat(obj.todayDisposalMedicalAuxiliaryMedicalWastesBag).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryMedicalWastesBag").text(parseFloat(obj.limitDisposalMedicalAuxiliaryMedicalWastesBag).toFixed(3));
        $("#todayInboundMedicalWastesErrorNumber").text(parseFloat(obj.todayInboundMedicalWastesErrorNumber).toFixed(3));
        $("#todayOutboundMedicalWastesErrorNumber").text(parseFloat(obj.todayOutboundMedicalWastesErrorNumber).toFixed(3));
        $("#todayInventoryMedicalWastesErrorNumber").text(parseFloat(obj.todayInventoryMedicalWastesErrorNumber).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#todayInboundMedicalWastesAfterCooking").text(parseFloat(obj.todayInboundMedicalWastesAfterCooking).toFixed(3));
        $("#todayOutboundMedicalWastesAfterCooking").text(parseFloat(obj.todayOutboundMedicalWastesAfterCooking).toFixed(3));
        $("#todayInventoryMedicalWastesAfterCooking").text(parseFloat(obj.todayInventoryMedicalWastesAfterCooking).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryCollectionBox").text(parseFloat(obj.todayDisposalMedicalAuxiliaryCollectionBox).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryCollectionBox").text(parseFloat(obj.limitDisposalMedicalAuxiliaryCollectionBox).toFixed(3));
        $("#todayInboundMedicalWastesAfterCookingSend").text(parseFloat(obj.todayInboundMedicalWastesAfterCookingSend).toFixed(3));
        $("#todayOutboundMedicalWastesAfterCookingSend").text(parseFloat(obj.todayOutboundMedicalWastesAfterCookingSend).toFixed(3));
        $("#todayInventoryMedicalWastesAfterCookingSend").text(parseFloat(obj.todayInventoryMedicalWastesAfterCookingSend).toFixed(3));
        $("#todayDisposalMedicalAuxiliarySteam").text(parseFloat(obj.todayDisposalMedicalAuxiliarySteam).toFixed(3));
        $("#limitDisposalMedicalAuxiliarySteam").text(parseFloat(obj.limitDisposalMedicalAuxiliarySteam).toFixed(3));
        $("#todayInboundMedicalWastesAfterCookingInbound").text(parseFloat(obj.todayInboundMedicalWastesAfterCookingInbound).toFixed(3));
        $("#todayOutboundMedicalWastesAfterCookingInbound").text(parseFloat(obj.todayOutboundMedicalWastesAfterCookingInbound).toFixed(3));
        $("#todayInventoryMedicalWastesAfterCookingInbound").text(parseFloat(obj.todayInventoryMedicalWastesAfterCookingInbound).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryIndustrialWater").text(parseFloat(obj.todayDisposalMedicalAuxiliaryIndustrialWater).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryIndustrialWater").text(parseFloat(obj.limitDisposalMedicalAuxiliaryIndustrialWater).toFixed(3));
        $("#todayInboundMedicalWastesWetNumber").text(parseFloat(obj.todayInboundMedicalWastesWetNumber).toFixed(3));
        $("#todayOutboundMedicalWastesWetNumber").text(parseFloat(obj.todayOutboundMedicalWastesWetNumber).toFixed(3));
        $("#todayInventoryMedicalWastesWetNumber").text(parseFloat(obj.todayInventoryMedicalWastesWetNumber).toFixed(3));
        $("#todayDisposalMedicalAuxiliaryElectricQuantity").text(parseFloat(obj.todayDisposalMedicalAuxiliaryElectricQuantity).toFixed(3));
        $("#limitDisposalMedicalAuxiliaryElectricQuantity").text(parseFloat(obj.limitDisposalMedicalAuxiliaryElectricQuantity).toFixed(3));
        $("#todayInboundWastesBulk").text(parseFloat(obj.todayInboundWastesBulk).toFixed(3));
        $("#todayOutboundWastesBulk").text(parseFloat(obj.todayOutboundWastesBulk).toFixed(3));
        $("#todayInventoryWastesBulk").text(parseFloat(obj.todayInventoryWastesBulk).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryCalcareousLime").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryCalcareousLime).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryCalcareousLime").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryCalcareousLime).toFixed(3));
        $("#todayInboundWastesCrushing").text(parseFloat(obj.todayInboundWastesCrushing).toFixed(3));
        $("#todayOutboundWastesCrushing").text(parseFloat(obj.todayOutboundWastesCrushing).toFixed(3));
        $("#todayInventoryWastesCrushing").text(parseFloat(obj.todayInventoryWastesCrushing).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayInboundWastesSludge").text(parseFloat(obj.todayInboundWastesSludge).toFixed(3));
        $("#todayOutboundWastesSludge").text(parseFloat(obj.todayOutboundWastesSludge).toFixed(3));
        $("#todayInventoryWastesSludge").text(parseFloat(obj.todayInventoryWastesSludge).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryActivatedCarbon").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryActivatedCarbon).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryActivatedCarbon").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryActivatedCarbon).toFixed(3));
        $("#todayInboundWastesDistillation").text(parseFloat(obj.todayInboundWastesDistillation).toFixed(3));
        $("#todayOutboundWastesDistillation").text(parseFloat(obj.todayOutboundWastesDistillation).toFixed(3));
        $("#todayInventoryWastesDistillation").text(parseFloat(obj.todayInventoryWastesDistillation).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryLye").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryLye).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryLye").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryLye).toFixed(3));
        $("#todayInboundWastesSuspension").text(parseFloat(obj.todayInboundWastesSuspension).toFixed(3));
        $("#todayOutboundWastesSuspension").text(parseFloat(obj.todayOutboundWastesSuspension).toFixed(3));
        $("#todayInventoryWastesSuspension").text(parseFloat(obj.todayInventoryWastesSuspension).toFixed(3));
        $("#todayDisposalSecondaryAuxiliarySalt").text(parseFloat(obj.todayDisposalSecondaryAuxiliarySalt).toFixed(3));
        $("#limitDisposalSecondaryAuxiliarySalt").text(parseFloat(obj.limitDisposalSecondaryAuxiliarySalt).toFixed(3));
        $("#todayInboundWastesWasteLiquid").text(parseFloat(obj.todayInboundWastesWasteLiquid).toFixed(3));
        $("#todayOutboundWastesWasteLiquid").text(parseFloat(obj.todayOutboundWastesWasteLiquid).toFixed(3));
        $("#todayInventoryWastesWasteLiquid").text(parseFloat(obj.todayInventoryWastesWasteLiquid).toFixed(3));
        $("#todayDisposalSecondaryAuxiliarySlagBag").text(parseFloat(obj.todayDisposalSecondaryAuxiliarySlagBag).toFixed(3));
        $("#limitDisposalSecondaryAuxiliarySlagBag").text(parseFloat(obj.limitDisposalSecondaryAuxiliarySlagBag).toFixed(3));
        $("#todayInboundWastesTotal").text(parseFloat(obj.todayInboundWastesTotal).toFixed(3));
        $("#todayOutboundWastesTotal").text(parseFloat(obj.todayOutboundWastesTotal).toFixed(3));
        $("#todayInventoryWastesTotal").text(parseFloat(obj.todayInventoryWastesTotal).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryFlyAshBag").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryFlyAshBag).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryFlyAshBag").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryFlyAshBag).toFixed(3));
        $("#todayInboundSecondWastesSlag").text(parseFloat(obj.todayInboundSecondWastesSlag).toFixed(3));
        $("#todayOutboundSecondWastesSlag").text(parseFloat(obj.todayOutboundSecondWastesSlag).toFixed(3));
        $("#todayInventorySecondWastesSlag").text(parseFloat(obj.todayInventorySecondWastesSlag).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryDieselOil").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryDieselOil).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryDieselOil").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryDieselOil).toFixed(3));
        $("#todayInboundSecondWastesAsh").text(parseFloat(obj.todayInboundSecondWastesAsh).toFixed(3));
        $("#todayOutboundSecondWastesAsh").text(parseFloat(obj.todayOutboundSecondWastesAsh).toFixed(3));
        $("#todayInventorySecondWastesAsh").text(parseFloat(obj.todayInventorySecondWastesAsh).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryElectricQuantity").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryElectricQuantity).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryElectricQuantity").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryElectricQuantity).toFixed(3));
        $("#todayInboundSecondWastesBucket").text(parseFloat(obj.todayInboundSecondWastesBucket).toFixed(3));
        $("#todayOutboundSecondWastesBucket").text(parseFloat(obj.todayOutboundSecondWastesBucket).toFixed(3));
        $("#todayInventorySecondWastesBucket").text(parseFloat(obj.todayInventorySecondWastesBucket).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#todayDisposalSecondaryAuxiliaryWoodenPallets").text(parseFloat(obj.todayDisposalSecondaryAuxiliaryWoodenPallets).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryWoodenPallets").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryWoodenPallets).toFixed(3));
        $("#todayDisposalThirdAuxiliaryCalcareousLime").text(parseFloat(obj.todayDisposalThirdAuxiliaryCalcareousLime).toFixed(3));
        $("#todayInboundAuxiliaryCalcareousLime").text(parseFloat(obj.todayInboundAuxiliaryCalcareousLime).toFixed(3));
        $("#todayOutboundAuxiliaryCalcareousLime").text(parseFloat(obj.todayOutboundAuxiliaryCalcareousLime).toFixed(3));
        $("#todayInventoryAuxiliaryCalcareousLime").text(parseFloat(obj.todayInventoryAuxiliaryCalcareousLime).toFixed(3));
        $("#todayDisposalThirdAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayDisposalThirdAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#limitDisposalThirdAuxiliaryCalcareousLime").text(parseFloat(obj.limitDisposalThirdAuxiliaryCalcareousLime).toFixed(3));
        $("#todayInboundAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayInboundAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayOutboundAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayOutboundAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayInventoryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayInventoryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayDisposalThirdAuxiliaryActivatedCarbon").text(parseFloat(obj.todayDisposalThirdAuxiliaryActivatedCarbon).toFixed(3));
        $("#limitDisposalThirdAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.limitDisposalThirdAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayInboundAuxiliaryActivatedCarbon").text(parseFloat(obj.todayInboundAuxiliaryActivatedCarbon).toFixed(3));
        $("#todayOutboundAuxiliaryActivatedCarbon").text(parseFloat(obj.todayOutboundAuxiliaryActivatedCarbon).toFixed(3));
        $("#todayInventoryAuxiliaryActivatedCarbon").text(parseFloat(obj.todayInventoryAuxiliaryActivatedCarbon).toFixed(3));
        $("#todayDisposalThirdAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.todayDisposalThirdAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#limitDisposalThirdAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.limitDisposalThirdAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#todayInboundAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.todayInboundAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#todayOutboundAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.todayOutboundAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#todayInventoryAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.todayInventoryAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#todayDisposalThirdAuxiliaryLye").text(parseFloat(obj.todayDisposalThirdAuxiliaryLye).toFixed(3));
        $("#limitDisposalThirdAuxiliaryLye").text(parseFloat(obj.limitDisposalThirdAuxiliaryLye).toFixed(3));
        $("#todayInboundAuxiliaryLye").text(parseFloat(obj.todayInboundAuxiliaryLye).toFixed(3));
        $("#todayOutboundAuxiliaryLye").text(parseFloat(obj.todayOutboundAuxiliaryLye).toFixed(3));
        $("#todayInventoryAuxiliaryLye").text(parseFloat(obj.todayInventoryAuxiliaryLye).toFixed(3));
        $("#todayDisposalThirdAuxiliaryCausticSoda").text(parseFloat(obj.todayDisposalThirdAuxiliaryCausticSoda).toFixed(3));
        $("#limitDisposalThirdAuxiliaryCausticSoda").text(parseFloat(obj.limitDisposalThirdAuxiliaryCausticSoda).toFixed(3));
        $("#todayInboundAuxiliaryCausticSoda").text(parseFloat(obj.todayInboundAuxiliaryCausticSoda).toFixed(3));
        $("#todayOutboundAuxiliaryCausticSoda").text(parseFloat(obj.todayOutboundAuxiliaryCausticSoda).toFixed(3));
        $("#todayInventoryAuxiliaryCausticSoda").text(parseFloat(obj.todayInventoryAuxiliaryCausticSoda).toFixed(3));
        $("#todayDisposalThirdAuxiliaryUrea").text(parseFloat(obj.todayDisposalThirdAuxiliaryUrea).toFixed(3));
        $("#limitDisposalThirdAuxiliaryUrea").text(parseFloat(obj.limitDisposalThirdAuxiliaryUrea).toFixed(3));
        $("#todayInboundAuxiliaryUrea").text(parseFloat(obj.todayInboundAuxiliaryUrea).toFixed(3));
        $("#todayOutboundAuxiliaryUrea").text(parseFloat(obj.todayOutboundAuxiliaryUrea).toFixed(3));
        $("#todayInventoryAuxiliaryUrea").text(parseFloat(obj.todayInventoryAuxiliaryUrea).toFixed(3));
        $("#todayDisposalThirdAuxiliaryHydrochloricAcid").text(parseFloat(obj.todayDisposalThirdAuxiliaryHydrochloricAcid).toFixed(3));
        $("#limitDisposalThirdAuxiliaryHydrochloricAcid").text(parseFloat(obj.limitDisposalThirdAuxiliaryHydrochloricAcid).toFixed(3));
        $("#todayInboundAuxiliaryHydrochloricAcid").text(parseFloat(obj.todayInboundAuxiliaryHydrochloricAcid).toFixed(3));
        $("#todayOutboundAuxiliaryHydrochloricAcid").text(parseFloat(obj.todayOutboundAuxiliaryHydrochloricAcid).toFixed(3));
        $("#todayInventoryAuxiliaryHydrochloricAcid").text(parseFloat(obj.todayInventoryAuxiliaryHydrochloricAcid).toFixed(3));
        $("#todayDisposalThirdAuxiliaryNahco3").text(parseFloat(obj.todayDisposalThirdAuxiliaryNahco3).toFixed(3));
        $("#limitDisposalThirdAuxiliaryNahco3").text(parseFloat(obj.limitDisposalThirdAuxiliaryNahco3).toFixed(3));
        $("#todayInboundAuxiliaryNahco3").text(parseFloat(obj.todayInboundAuxiliaryNahco3).toFixed(3));
        $("#todayOutboundAuxiliaryNahco3").text(parseFloat(obj.todayOutboundAuxiliaryNahco3).toFixed(3));
        $("#todayInventoryAuxiliaryNahco3").text(parseFloat(obj.todayInventoryAuxiliaryNahco3).toFixed(3));
        $("#todayDisposalThirdAuxiliaryFlour").text(parseFloat(obj.todayDisposalThirdAuxiliaryFlour).toFixed(3));
        $("#limitDisposalThirdAuxiliaryFlour").text(parseFloat(obj.limitDisposalThirdAuxiliaryFlour).toFixed(3));
        $("#todayInboundAuxiliaryFlour").text(parseFloat(obj.todayInboundAuxiliaryFlour).toFixed(3));
        $("#todayOutboundAuxiliaryFlour").text(parseFloat(obj.todayOutboundAuxiliaryFlour).toFixed(3));
        $("#todayInventoryAuxiliaryFlour").text(parseFloat(obj.todayInventoryAuxiliaryFlour).toFixed(3));
        $("#todayDisposalThirdAuxiliaryDefoamer").text(parseFloat(obj.todayDisposalThirdAuxiliaryDefoamer).toFixed(3));
        $("#limitDisposalThirdAuxiliaryDefoamer").text(parseFloat(obj.limitDisposalThirdAuxiliaryDefoamer).toFixed(3));
        $("#todayInboundAuxiliaryDefoamer").text(parseFloat(obj.todayInboundAuxiliaryDefoamer).toFixed(3));
        $("#todayOutboundAuxiliaryDefoamer").text(parseFloat(obj.todayOutboundAuxiliaryDefoamer).toFixed(3));
        $("#todayInventoryAuxiliaryDefoamer").text(parseFloat(obj.todayInventoryAuxiliaryDefoamer).toFixed(3));
        $("#todayDisposalThirdAuxiliaryFlocculant").text(parseFloat(obj.todayDisposalThirdAuxiliaryFlocculant).toFixed(3));
        $("#limitDisposalThirdAuxiliaryFlocculant").text(parseFloat(obj.limitDisposalThirdAuxiliaryFlocculant).toFixed(3));
        $("#todayInboundAuxiliaryFlocculant").text(parseFloat(obj.todayInboundAuxiliaryFlocculant).toFixed(3));
        $("#todayOutboundAuxiliaryFlocculant").text(parseFloat(obj.todayOutboundAuxiliaryFlocculant).toFixed(3));
        $("#todayInventoryAuxiliaryFlocculant").text(parseFloat(obj.todayInventoryAuxiliaryFlocculant).toFixed(3));
        $("#todayDisposalThirdAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.todayDisposalThirdAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#limitDisposalThirdAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.limitDisposalThirdAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#todayInboundAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.todayInboundAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#todayOutboundAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.todayOutboundAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#todayInventoryAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.todayInventoryAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#todayDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.todayDisposalThirdAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#limitDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.limitDisposalThirdAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#todayInboundAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.todayInboundAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#todayOutboundAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.todayOutboundAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#todayInventoryAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.todayInventoryAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#todayDisposalThirdAuxiliaryAmmonia").text(parseFloat(obj.todayDisposalThirdAuxiliaryAmmonia).toFixed(3));
        $("#limitDisposalThirdAuxiliaryAmmonia").text(parseFloat(obj.limitDisposalThirdAuxiliaryAmmonia).toFixed(3));
        $("#todayInboundAuxiliaryAmmonia").text(parseFloat(obj.todayInboundAuxiliaryAmmonia).toFixed(3));
        $("#todayOutboundAuxiliaryAmmonia").text(parseFloat(obj.todayOutboundAuxiliaryAmmonia).toFixed(3));
        $("#todayInventoryAuxiliaryAmmonia").text(parseFloat(obj.todayInventoryAuxiliaryAmmonia).toFixed(3));
        $("#todayDisposalThirdAuxiliaryWaterReducingAgent").text(parseFloat(obj.todayDisposalThirdAuxiliaryWaterReducingAgent).toFixed(3));
        $("#limitDisposalThirdAuxiliaryWaterReducingAgent").text(parseFloat(obj.limitDisposalThirdAuxiliaryWaterReducingAgent).toFixed(3));
        $("#todayInboundAuxiliaryWaterReducingAgent").text(parseFloat(obj.todayInboundAuxiliaryWaterReducingAgent).toFixed(3));
        $("#todayOutboundAuxiliaryWaterReducingAgent").text(parseFloat(obj.todayOutboundAuxiliaryWaterReducingAgent).toFixed(3));
        $("#todayInventoryAuxiliaryWaterReducingAgent").text(parseFloat(obj.todayInventoryAuxiliaryWaterReducingAgent).toFixed(3));
        $("#todayDisposalThirdAuxiliaryNaclo").text(parseFloat(obj.todayDisposalThirdAuxiliaryNaclo).toFixed(3));
        $("#limitDisposalThirdAuxiliaryNaclo").text(parseFloat(obj.limitDisposalThirdAuxiliaryNaclo).toFixed(3));
        $("#todayInboundAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.todayInboundAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#todayOutboundAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.todayOutboundAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#todayInventoryAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.todayInventoryAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#todayDisposalThirdAuxiliaryStandardBox").text(parseFloat(obj.todayDisposalThirdAuxiliaryStandardBox).toFixed(3));
        $("#limitDisposalThirdAuxiliaryStandardBox").text(parseFloat(obj.limitDisposalThirdAuxiliaryStandardBox).toFixed(3));
        $("#todayInboundAuxiliaryNaclo").text(parseFloat(obj.todayInboundAuxiliaryNaclo).toFixed(3));
        $("#todayOutboundAuxiliaryNaclo").text(parseFloat(obj.todayOutboundAuxiliaryNaclo).toFixed(3));
        $("#todayInventoryAuxiliaryNaclo").text(parseFloat(obj.todayInventoryAuxiliaryNaclo).toFixed(3));
        $("#todayDisposalThirdAuxiliaryWoodenPallets").text(parseFloat(obj.todayDisposalThirdAuxiliaryWoodenPallets).toFixed(3));
        $("#limitDisposalThirdAuxiliaryWoodenPallets").text(parseFloat(obj.limitDisposalThirdAuxiliaryWoodenPallets).toFixed(3));
        $("#todayInboundAuxiliaryDeodorant").text(parseFloat(obj.todayInboundAuxiliaryDeodorant).toFixed(3));
        $("#todayOutboundAuxiliaryDeodorant").text(parseFloat(obj.todayOutboundAuxiliaryDeodorant).toFixed(3));
        $("#todayInventoryAuxiliaryDeodorant").text(parseFloat(obj.todayInventoryAuxiliaryDeodorant).toFixed(3));
        $("#todayDisposalThirdAuxiliaryStandardTray_1m").text(parseFloat(obj.todayDisposalThirdAuxiliaryStandardTray_1m).toFixed(3));
        $("#limitDisposalThirdAuxiliaryStandardTray_1m").text(parseFloat(obj.limitDisposalThirdAuxiliaryStandardTray_1m).toFixed(3));
        $("#todayInboundAuxiliarySalt").text(parseFloat(obj.todayInboundAuxiliarySalt).toFixed(3));
        $("#todayOutboundAuxiliarySalt").text(parseFloat(obj.todayOutboundAuxiliarySalt).toFixed(3));
        $("#todayInventoryAuxiliarySalt").text(parseFloat(obj.todayInventoryAuxiliarySalt).toFixed(3));
        $("#todayDisposalThirdAuxiliaryStandardTray_1_2m").text(parseFloat(obj.todayDisposalThirdAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#limitDisposalThirdAuxiliaryStandardTray_1_2m").text(parseFloat(obj.limitDisposalThirdAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#todayInboundAuxiliarySlagBag").text(parseFloat(obj.todayInboundAuxiliarySlagBag).toFixed(3));
        $("#todayOutboundAuxiliarySlagBag").text(parseFloat(obj.todayOutboundAuxiliarySlagBag).toFixed(3));
        $("#todayInventoryAuxiliarySlagBag").text(parseFloat(obj.todayInventoryAuxiliarySlagBag).toFixed(3));
        $("#todayDisposalThirdAuxiliarySlagBag").text(parseFloat(obj.todayDisposalThirdAuxiliarySlagBag).toFixed(3));
        $("#limitDisposalThirdAuxiliarySlagBag").text(parseFloat(obj.limitDisposalThirdAuxiliarySlagBag).toFixed(3));
        $("#todayInboundAuxiliaryFlyAshBag").text(parseFloat(obj.todayInboundAuxiliaryFlyAshBag).toFixed(3));
        $("#todayOutboundAuxiliaryFlyAshBag").text(parseFloat(obj.todayOutboundAuxiliaryFlyAshBag).toFixed(3));
        $("#todayInventoryAuxiliaryFlyAshBag").text(parseFloat(obj.todayInventoryAuxiliaryFlyAshBag).toFixed(3));
        $("#todayDisposalThirdAuxiliaryFlyAshBag").text(parseFloat(obj.todayDisposalThirdAuxiliaryFlyAshBag).toFixed(3));
        $("#limitDisposalThirdAuxiliaryFlyAshBag").text(parseFloat(obj.limitDisposalThirdAuxiliaryFlyAshBag).toFixed(3));
        $("#todayInboundAuxiliaryMedicalWastesBag").text(parseFloat(obj.todayInboundAuxiliaryMedicalWastesBag).toFixed(3));
        $("#todayOutboundAuxiliaryMedicalWastesBag").text(parseFloat(obj.todayOutboundAuxiliaryMedicalWastesBag).toFixed(3));
        $("#todayInventoryAuxiliaryMedicalWastesBag").text(parseFloat(obj.todayInventoryAuxiliaryMedicalWastesBag).toFixed(3));
        $("#todayDisposalThirdAuxiliaryTonBox").text(parseFloat(obj.todayDisposalThirdAuxiliaryTonBox).toFixed(3));
        $("#limitDisposalThirdAuxiliaryTonBox").text(parseFloat(obj.limitDisposalThirdAuxiliaryTonBox).toFixed(3));
        $("#todayInboundAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.todayInboundAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#todayOutboundAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.todayOutboundAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#todayInventoryAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.todayInventoryAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#todayDisposalThirdAuxiliarySteam").text(parseFloat(obj.todayDisposalThirdAuxiliarySteam).toFixed(3));
        $("#limitDisposalThirdAuxiliarySteam").text(parseFloat(obj.limitDisposalThirdAuxiliarySteam).toFixed(3));
        $("#todayInboundAuxiliaryCollectionBox").text(parseFloat(obj.todayInboundAuxiliaryCollectionBox).toFixed(3));
        $("#todayOutboundAuxiliaryCollectionBox").text(parseFloat(obj.todayOutboundAuxiliaryCollectionBox).toFixed(3));
        $("#todayInventoryAuxiliaryCollectionBox").text(parseFloat(obj.todayInventoryAuxiliaryCollectionBox).toFixed(3));
        $("#todayDisposalThirdAuxiliaryDieselOil").text(parseFloat(obj.todayDisposalThirdAuxiliaryDieselOil).toFixed(3));
        $("#limitDisposalThirdAuxiliaryDieselOil").text(parseFloat(obj.limitDisposalThirdAuxiliaryDieselOil).toFixed(3));
        $("#todayInboundAuxiliaryStandardBox").text(parseFloat(obj.todayInboundAuxiliaryStandardBox).toFixed(3));
        $("#todayOutboundAuxiliaryStandardBox").text(parseFloat(obj.todayOutboundAuxiliaryStandardBox).toFixed(3));
        $("#todayInventoryAuxiliaryStandardBox").text(parseFloat(obj.todayInventoryAuxiliaryStandardBox).toFixed(3));
        $("#todayDisposalThirdAuxiliaryNaturalGas").text(parseFloat(obj.todayDisposalThirdAuxiliaryNaturalGas).toFixed(3));
        $("#limitDisposalThirdAuxiliaryNaturalGas").text(parseFloat(obj.limitDisposalThirdAuxiliaryNaturalGas).toFixed(3));
        $("#todayInboundAuxiliaryWoodenPallets").text(parseFloat(obj.todayInboundAuxiliaryWoodenPallets).toFixed(3));
        $("#todayOutboundAuxiliaryWoodenPallets").text(parseFloat(obj.todayOutboundAuxiliaryWoodenPallets).toFixed(3));
        $("#todayInventoryAuxiliaryWoodenPallets").text(parseFloat(obj.todayInventoryAuxiliaryWoodenPallets).toFixed(3));
        $("#todayDisposalThirdAuxiliaryElectricQuantity").text(parseFloat(obj.todayDisposalThirdAuxiliaryElectricQuantity).toFixed(3));
        $("#limitDisposalThirdAuxiliaryElectricQuantity").text(parseFloat(obj.limitDisposalThirdAuxiliaryElectricQuantity).toFixed(3));
        $("#todayInboundAuxiliaryStandardTray_1m").text(parseFloat(obj.todayInboundAuxiliaryStandardTray_1m).toFixed(3));
        $("#todayOutboundAuxiliaryStandardTray_1m").text(parseFloat(obj.todayOutboundAuxiliaryStandardTray_1m).toFixed(3));
        $("#todayInventoryAuxiliaryStandardTray_1m").text(parseFloat(obj.todayInventoryAuxiliaryStandardTray_1m).toFixed(3));
        $("#todayDisposalThirdAuxiliaryIndustrialWater").text(parseFloat(obj.todayDisposalThirdAuxiliaryIndustrialWater).toFixed(3));
        $("#limitDisposalThirdAuxiliaryIndustrialWater").text(parseFloat(obj.limitDisposalThirdAuxiliaryIndustrialWater).toFixed(3));
        $("#todayInboundAuxiliaryStandardTray_1_2m").text(parseFloat(obj.todayInboundAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#todayOutboundAuxiliaryStandardTray_1_2m").text(parseFloat(obj.todayOutboundAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#todayInventoryAuxiliaryStandardTray_1_2m").text(parseFloat(obj.todayInventoryAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#todayDisposalThirdAuxiliaryTapWaterQuantity").text(parseFloat(obj.todayDisposalThirdAuxiliaryTapWaterQuantity).toFixed(3));
        $("#limitDisposalThirdAuxiliaryTapWaterQuantity").text(parseFloat(obj.limitDisposalThirdAuxiliaryTapWaterQuantity).toFixed(3));
        $("#todayInboundAuxiliaryTonBox").text(parseFloat(obj.todayInboundAuxiliaryTonBox).toFixed(3));
        $("#todayOutboundAuxiliaryTonBox").text(parseFloat(obj.todayOutboundAuxiliaryTonBox).toFixed(3));
        $("#todayInventoryAuxiliaryTonBox").text(parseFloat(obj.todayInventoryAuxiliaryTonBox).toFixed(3));
        $("#todayDisposalTowerElectricQuantity").text(parseFloat(obj.todayDisposalTowerElectricQuantity).toFixed(3));
        $("#limitDisposalTowerElectricQuantity").text(parseFloat(obj.limitDisposalTowerElectricQuantity).toFixed(3));
        $("#todayInboundAuxiliarySteam").text(parseFloat(obj.todayInboundAuxiliarySteam).toFixed(3));
        $("#todayOutboundAuxiliarySteam").text(parseFloat(obj.todayOutboundAuxiliarySteam).toFixed(3));
        $("#todayInventoryAuxiliarySteam").text(parseFloat(obj.todayInventoryAuxiliarySteam).toFixed(3));
        $("#todayInboundAuxiliaryDieselOil").text(parseFloat(obj.todayInboundAuxiliaryDieselOil).toFixed(3));
        $("#todayOutboundAuxiliaryDieselOil").text(parseFloat(obj.todayOutboundAuxiliaryDieselOil).toFixed(3));
        $("#todayInventoryAuxiliaryDieselOil").text(parseFloat(obj.todayInventoryAuxiliaryDieselOil).toFixed(3));
        $("#todayInboundAuxiliaryNaturalGas").text(parseFloat(obj.todayInboundAuxiliaryNaturalGas).toFixed(3));
        $("#todayOutboundAuxiliaryNaturalGas").text(parseFloat(obj.todayOutboundAuxiliaryNaturalGas).toFixed(3));
        $("#todayInventoryAuxiliaryNaturalGas").text(parseFloat(obj.todayInventoryAuxiliaryNaturalGas).toFixed(3));
        $("#todayInboundAuxiliaryElectricQuantity").text(parseFloat(obj.todayInboundAuxiliaryElectricQuantity).toFixed(3));
        $("#todayOutboundAuxiliaryElectricQuantity").text(parseFloat(obj.todayOutboundAuxiliaryElectricQuantity).toFixed(3));
        $("#todayInventoryAuxiliaryElectricQuantity").text(parseFloat(obj.todayInventoryAuxiliaryElectricQuantity).toFixed(3));
        $("#todayInboundAuxiliaryIndustrialWater").text(parseFloat(obj.todayInboundAuxiliaryIndustrialWater).toFixed(3));
        $("#todayOutboundAuxiliaryIndustrialWater").text(parseFloat(obj.todayOutboundAuxiliaryIndustrialWater).toFixed(3));
        $("#todayInventoryAuxiliaryIndustrialWater").text(parseFloat(obj.todayInventoryAuxiliaryIndustrialWater).toFixed(3));
        $("#todayEquipmentA2StopTime").text(parseFloat(obj.todayEquipmentA2StopTime).toFixed(3));
        $("#todayEquipmentA2RunningTime").text(parseFloat(obj.todayEquipmentA2RunningTime).toFixed(3));
        $("#todayInboundAuxiliaryTapWaterQuantity").text(parseFloat(obj.todayInboundAuxiliaryTapWaterQuantity).toFixed(3));
        $("#todayOutboundAuxiliaryTapWaterQuantity").text(parseFloat(obj.todayOutboundAuxiliaryTapWaterQuantity).toFixed(3));
        $("#todayInventoryAuxiliaryTapWaterQuantity").text(parseFloat(obj.todayInventoryAuxiliaryTapWaterQuantity).toFixed(3));
        $("#todayEquipmentB2StopTime").text(parseFloat(obj.todayEquipmentB2StopTime).toFixed(3));
        $("#todayEquipmentB2RunningTime").text(parseFloat(obj.todayEquipmentB2RunningTime).toFixed(3));
        $("#todayEquipmentPrepare2StopTime").text(parseFloat(obj.todayEquipmentPrepare2StopTime).toFixed(3));
        $("#todayEquipmentPrepare2RunningTime").text(parseFloat(obj.todayEquipmentPrepare2RunningTime).toFixed(3));
        $("#todayDisposalMedicalWastes").text(parseFloat(obj.todayDisposalMedicalWastes).toFixed(3));
        $("#todayDisposalMedicalWastesDisposalDirect").text(parseFloat(obj.todayDisposalMedicalWastesDisposalDirect).toFixed(3));
        $("#todayDisposalMedicalWastesCooking").text(parseFloat(obj.todayDisposalMedicalWastesCooking).toFixed(3));
        $("#todayDisposalMedicalWastesErrorNumber").text(parseFloat(obj.todayDisposalMedicalWastesErrorNumber).toFixed(3));
        $("#todayDisposalMedicalWastesAfterCooking").text(parseFloat(obj.todayDisposalMedicalWastesAfterCooking).toFixed(3));
        $("#todayDisposalMedicalWastesAfterCookingSend").text(parseFloat(obj.todayDisposalMedicalWastesAfterCookingSend).toFixed(3));
        $("#todayDisposalMedicalWastesAfterCookingInbound").text(parseFloat(obj.todayDisposalMedicalWastesAfterCookingInbound).toFixed(3));
        $("#todayDisposalMedicalWastesWetNumber").text(parseFloat(obj.todayDisposalMedicalWastesWetNumber).toFixed(3));
        $("#todayEquipmentSecondaryStopTime").text(parseFloat(obj.todayEquipmentSecondaryStopTime).toFixed(3));
        $("#todayEquipmentSecondaryRunningTime").text(parseFloat(obj.todayEquipmentSecondaryRunningTime).toFixed(3));
        $("#todayEquipmentThirdStopTime").text(parseFloat(obj.todayEquipmentThirdStopTime).toFixed(3));
        $("#todayEquipmentThirdRunningTime").text(parseFloat(obj.todayEquipmentThirdRunningTime).toFixed(3));
        $("#todayOutboundA2WastesBulk").text(parseFloat(obj.todayOutboundA2WastesBulk).toFixed(3));
        $("#todayOutboundB2WastesBulk").text(parseFloat(obj.todayOutboundB2WastesBulk).toFixed(3));
        $("#todayOutboundA2WastesCrushing").text(parseFloat(obj.todayOutboundA2WastesCrushing).toFixed(3));
        $("#todayOutboundB2WastesCrushing").text(parseFloat(obj.todayOutboundB2WastesCrushing).toFixed(3));
        $("#todayOutboundA2WastesSludge").text(parseFloat(obj.todayOutboundA2WastesSludge).toFixed(3));
        $("#todayOutboundB2WastesSludge").text(parseFloat(obj.todayOutboundB2WastesSludge).toFixed(3));
        $("#todayOutboundA2WastesDistillation").text(parseFloat(obj.todayOutboundA2WastesDistillation).toFixed(3));
        $("#todayOutboundB2WastesDistillation").text(parseFloat(obj.todayOutboundB2WastesDistillation).toFixed(3));
        $("#todayEquipmentA2RunningRate").text(parseFloat(obj.todayEquipmentA2RunningRate).toFixed(3));
        $("#todayOutboundA2WastesSuspension").text(parseFloat(obj.todayOutboundA2WastesSuspension).toFixed(3));
        $("#todayOutboundB2WastesSuspension").text(parseFloat(obj.todayOutboundB2WastesSuspension).toFixed(3));
        $("#todayEquipmentB2RunningRate").text(parseFloat(obj.todayEquipmentB2RunningRate).toFixed(3));
        $("#todayOutboundA2WastesWasteLiquid").text(parseFloat(obj.todayOutboundA2WastesWasteLiquid).toFixed(3));
        $("#todayOutboundB2WastesWasteLiquid").text(parseFloat(obj.todayOutboundB2WastesWasteLiquid).toFixed(3));
        $("#todayEquipmentPrepare2RunningRate").text(parseFloat(obj.todayEquipmentPrepare2RunningRate).toFixed(3));
        $("#todayOutboundA2MedicalWastes").text(parseFloat(obj.todayOutboundA2MedicalWastes).toFixed(3));
        $("#todayOutboundB2MedicalWastes").text(parseFloat(obj.todayOutboundB2MedicalWastes).toFixed(3));
        $("#todayEquipmentSecondaryRunningRate").text(parseFloat(obj.todayEquipmentSecondaryRunningRate).toFixed(3));
        $("#todayOutboundPrepare2WastesBulk").text(parseFloat(obj.todayOutboundPrepare2WastesBulk).toFixed(3));
        $("#todayEquipmentThirdRunningRate").text(parseFloat(obj.todayEquipmentThirdRunningRate).toFixed(3));
        $("#todayOutboundPrepare2WastesCrushing").text(parseFloat(obj.todayOutboundPrepare2WastesCrushing).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemWastesBulk").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemWastesBulk).toFixed(3));
        $("#todayOutboundPrepare2WastesSludge").text(parseFloat(obj.todayOutboundPrepare2WastesSludge).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemWastesCrushing").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemWastesCrushing).toFixed(3));
        $("#todayOutboundPrepare2WastesDistillation").text(parseFloat(obj.todayOutboundPrepare2WastesDistillation).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemWastesSludge").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemWastesSludge).toFixed(3));
        $("#todayOutboundPrepare2WastesSuspension").text(parseFloat(obj.todayOutboundPrepare2WastesSuspension).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemWastesDistillation").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemWastesDistillation).toFixed(3));
        $("#todayDisposalSecondarySlag").text(parseFloat(obj.todayDisposalSecondarySlag).toFixed(3));
        $("#todayOutboundPrepare2WastesWasteLiquid").text(parseFloat(obj.todayOutboundPrepare2WastesWasteLiquid).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemWastesSuspension").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemWastesSuspension).toFixed(3));
        $("#todayDisposalSecondaryAsh").text(parseFloat(obj.todayDisposalSecondaryAsh).toFixed(3));
        $("#todayOutboundPrepare2MedicalWastes").text(parseFloat(obj.todayOutboundPrepare2MedicalWastes).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemWastesWasteLiquid").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemWastesWasteLiquid).toFixed(3));
        $("#todayDisposalThirdSlag").text(parseFloat(obj.todayDisposalThirdSlag).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemMedicalWastes").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemMedicalWastes).toFixed(3));
        $("#todayDisposalThirdAsh").text(parseFloat(obj.todayDisposalThirdAsh).toFixed(3));
        $("#monthInboundMedicalWastes").text(parseFloat(obj.monthInboundMedicalWastes).toFixed(3));
        $("#yearInboundMedicalWastes").text(parseFloat(obj.yearInboundMedicalWastes).toFixed(3));
        $("#monthOutboundMedicalWastes").text(parseFloat(obj.monthOutboundMedicalWastes).toFixed(3));
        $("#yearOutboundMedicalWastes").text(parseFloat(obj.yearOutboundMedicalWastes).toFixed(3));
        $("#monthBalanceMedicalWastes").text(parseFloat(obj.monthBalanceMedicalWastes).toFixed(3));
        $("#monthInboundMedicalWastesDirectDisposal").text(parseFloat(obj.monthInboundMedicalWastesDirectDisposal).toFixed(3));
        $("#yearInboundMedicalWastesDirectDisposal").text(parseFloat(obj.yearInboundMedicalWastesDirectDisposal).toFixed(3));
        $("#monthOutboundMedicalWastesDirectDisposal").text(parseFloat(obj.monthOutboundMedicalWastesDirectDisposal).toFixed(3));
        $("#yearOutboundMedicalWastesDirectDisposal").text(parseFloat(obj.yearOutboundMedicalWastesDirectDisposal).toFixed(3));
        $("#monthBalanceMedicalWastesDirectDisposal").text(parseFloat(obj.monthBalanceMedicalWastesDirectDisposal).toFixed(3));
        $("#monthInboundMedicalWastesCooking").text(parseFloat(obj.monthInboundMedicalWastesCooking).toFixed(3));
        $("#yearInboundMedicalWastesCooking").text(parseFloat(obj.yearInboundMedicalWastesCooking).toFixed(3));
        $("#monthOutboundMedicalWastesCooking").text(parseFloat(obj.monthOutboundMedicalWastesCooking).toFixed(3));
        $("#yearOutboundMedicalWastesCooking").text(parseFloat(obj.yearOutboundMedicalWastesCooking).toFixed(3));
        $("#monthBalanceMedicalWastesCooking").text(parseFloat(obj.monthBalanceMedicalWastesCooking).toFixed(3));
        $("#monthInboundMedicalWastesErrorNumber").text(parseFloat(obj.monthInboundMedicalWastesErrorNumber).toFixed(3));
        $("#yearInboundMedicalWastesErrorNumber").text(parseFloat(obj.yearInboundMedicalWastesErrorNumber).toFixed(3));
        $("#monthOutboundMedicalWastesErrorNumber").text(parseFloat(obj.monthOutboundMedicalWastesErrorNumber).toFixed(3));
        $("#yearOutboundMedicalWastesErrorNumber").text(parseFloat(obj.yearOutboundMedicalWastesErrorNumber).toFixed(3));
        $("#monthBalanceMedicalWastesErrorNumber").text(parseFloat(obj.monthBalanceMedicalWastesErrorNumber).toFixed(3));
        $("#monthInboundMedicalWastesAfterCooking").text(parseFloat(obj.monthInboundMedicalWastesAfterCooking).toFixed(3));
        $("#yearInboundMedicalWastesAfterCooking").text(parseFloat(obj.yearInboundMedicalWastesAfterCooking).toFixed(3));
        $("#monthOutboundMedicalWastesAfterCooking").text(parseFloat(obj.monthOutboundMedicalWastesAfterCooking).toFixed(3));
        $("#yearOutboundMedicalWastesAfterCooking").text(parseFloat(obj.yearOutboundMedicalWastesAfterCooking).toFixed(3));
        $("#monthBalanceMedicalWastesAfterCooking").text(parseFloat(obj.monthBalanceMedicalWastesAfterCooking).toFixed(3));
        $("#monthInboundMedicalWastesAfterCookingSend").text(parseFloat(obj.monthInboundMedicalWastesAfterCookingSend).toFixed(3));
        $("#yearInboundMedicalWastesAfterCookingSend").text(parseFloat(obj.yearInboundMedicalWastesAfterCookingSend).toFixed(3));
        $("#monthOutboundMedicalWastesAfterCookingSend").text(parseFloat(obj.monthOutboundMedicalWastesAfterCookingSend).toFixed(3));
        $("#yearOutboundMedicalWastesAfterCookingSend").text(parseFloat(obj.yearOutboundMedicalWastesAfterCookingSend).toFixed(3));
        $("#monthBalanceMedicalWastesAfterCookingSend").text(parseFloat(obj.monthBalanceMedicalWastesAfterCookingSend).toFixed(3));
        $("#monthInboundMedicalWastesAfterCookingInbound").text(parseFloat(obj.monthInboundMedicalWastesAfterCookingInbound).toFixed(3));
        $("#yearInboundMedicalWastesAfterCookingInbound").text(parseFloat(obj.yearInboundMedicalWastesAfterCookingInbound).toFixed(3));
        $("#monthOutboundMedicalWastesAfterCookingInbound").text(parseFloat(obj.monthOutboundMedicalWastesAfterCookingInbound).toFixed(3));
        $("#yearOutboundMedicalWastesAfterCookingInbound").text(parseFloat(obj.yearOutboundMedicalWastesAfterCookingInbound).toFixed(3));
        $("#monthBalanceMedicalWastesAfterCookingInbound").text(parseFloat(obj.monthBalanceMedicalWastesAfterCookingInbound).toFixed(3));
        $("#monthInboundMedicalWastesWetNumber").text(parseFloat(obj.monthInboundMedicalWastesWetNumber).toFixed(3));
        $("#yearInboundMedicalWastesWetNumber").text(parseFloat(obj.yearInboundMedicalWastesWetNumber).toFixed(3));
        $("#monthOutboundMedicalWastesWetNumber").text(parseFloat(obj.monthOutboundMedicalWastesWetNumber).toFixed(3));
        $("#yearOutboundMedicalWastesWetNumber").text(parseFloat(obj.yearOutboundMedicalWastesWetNumber).toFixed(3));
        $("#monthBalanceMedicalWastesWetNumber").text(parseFloat(obj.monthBalanceMedicalWastesWetNumber).toFixed(3));
        $("#monthInboundWastesBulk").text(parseFloat(obj.monthInboundWastesBulk).toFixed(3));
        $("#yearInboundWastesBulk").text(parseFloat(obj.yearInboundWastesBulk).toFixed(3));
        $("#monthOutboundWastesBulk").text(parseFloat(obj.monthOutboundWastesBulk).toFixed(3));
        $("#yearOutboundWastesBulk").text(parseFloat(obj.yearOutboundWastesBulk).toFixed(3));
        $("#monthBalanceWastesBulk").text(parseFloat(obj.monthBalanceWastesBulk).toFixed(3));
        $("#monthInboundWastesCrushing").text(parseFloat(obj.monthInboundWastesCrushing).toFixed(3));
        $("#yearInboundWastesCrushing").text(parseFloat(obj.yearInboundWastesCrushing).toFixed(3));
        $("#monthOutboundWastesCrushing").text(parseFloat(obj.monthOutboundWastesCrushing).toFixed(3));
        $("#yearOutboundWastesCrushing").text(parseFloat(obj.yearOutboundWastesCrushing).toFixed(3));
        $("#monthBalanceWastesCrushing").text(parseFloat(obj.monthBalanceWastesCrushing).toFixed(3));
        $("#monthInboundWastesSludge").text(parseFloat(obj.monthInboundWastesSludge).toFixed(3));
        $("#yearInboundWastesSludge").text(parseFloat(obj.yearInboundWastesSludge).toFixed(3));
        $("#monthOutboundWastesSludge").text(parseFloat(obj.monthOutboundWastesSludge).toFixed(3));
        $("#yearOutboundWastesSludge").text(parseFloat(obj.yearOutboundWastesSludge).toFixed(3));
        $("#monthBalanceWastesSludge").text(parseFloat(obj.monthBalanceWastesSludge).toFixed(3));
        $("#monthInboundWastesDistillation").text(parseFloat(obj.monthInboundWastesDistillation).toFixed(3));
        $("#yearInboundWastesDistillation").text(parseFloat(obj.yearInboundWastesDistillation).toFixed(3));
        $("#monthOutboundWastesDistillation").text(parseFloat(obj.monthOutboundWastesDistillation).toFixed(3));
        $("#yearOutboundWastesDistillation").text(parseFloat(obj.yearOutboundWastesDistillation).toFixed(3));
        $("#monthBalanceWastesDistillation").text(parseFloat(obj.monthBalanceWastesDistillation).toFixed(3));
        $("#monthInboundWastesSuspension").text(parseFloat(obj.monthInboundWastesSuspension).toFixed(3));
        $("#yearInboundWastesSuspension").text(parseFloat(obj.yearInboundWastesSuspension).toFixed(3));
        $("#monthOutboundWastesSuspension").text(parseFloat(obj.monthOutboundWastesSuspension).toFixed(3));
        $("#yearOutboundWastesSuspension").text(parseFloat(obj.yearOutboundWastesSuspension).toFixed(3));
        $("#monthBalanceWastesSuspension").text(parseFloat(obj.monthBalanceWastesSuspension).toFixed(3));
        $("#monthInboundWastesWasteLiquid").text(parseFloat(obj.monthInboundWastesWasteLiquid).toFixed(3));
        $("#yearInboundWastesWasteLiquid").text(parseFloat(obj.yearInboundWastesWasteLiquid).toFixed(3));
        $("#monthOutboundWastesWasteLiquid").text(parseFloat(obj.monthOutboundWastesWasteLiquid).toFixed(3));
        $("#yearOutboundWastesWasteLiquid").text(parseFloat(obj.yearOutboundWastesWasteLiquid).toFixed(3));
        $("#monthBalanceWastesWasteLiquid").text(parseFloat(obj.monthBalanceWastesWasteLiquid).toFixed(3));
        $("#monthInboundWastesTotal").text(parseFloat(obj.monthInboundWastesTotal).toFixed(3));
        $("#yearInboundWastesTotal").text(parseFloat(obj.yearInboundWastesTotal).toFixed(3));
        $("#monthOutboundWastesTotal").text(parseFloat(obj.monthOutboundWastesTotal).toFixed(3));
        $("#yearOutboundWastesTotal").text(parseFloat(obj.yearOutboundWastesTotal).toFixed(3));
        $("#monthBalanceWastesTotal").text(parseFloat(obj.monthBalanceWastesTotal).toFixed(3));
        $("#monthInboundSecondWastesSlag").text(parseFloat(obj.monthInboundSecondWastesSlag).toFixed(3));
        $("#yearInboundSecondWastesSlag").text(parseFloat(obj.yearInboundSecondWastesSlag).toFixed(3));
        $("#monthOutboundSecondWastesSlag").text(parseFloat(obj.monthOutboundSecondWastesSlag).toFixed(3));
        $("#yearOutboundSecondWastesSlag").text(parseFloat(obj.yearOutboundSecondWastesSlag).toFixed(3));
        $("#monthBalanceSecondWastesSlag").text(parseFloat(obj.monthBalanceSecondWastesSlag).toFixed(3));
        $("#monthInboundSecondWastesAsh").text(parseFloat(obj.monthInboundSecondWastesAsh).toFixed(3));
        $("#yearInboundSecondWastesAsh").text(parseFloat(obj.yearInboundSecondWastesAsh).toFixed(3));
        $("#monthOutboundSecondWastesAsh").text(parseFloat(obj.monthOutboundSecondWastesAsh).toFixed(3));
        $("#yearOutboundSecondWastesAsh").text(parseFloat(obj.yearOutboundSecondWastesAsh).toFixed(3));
        $("#monthBalanceSecondWastesAsh").text(parseFloat(obj.monthBalanceSecondWastesAsh).toFixed(3));
        $("#monthInboundSecondWastesBucket").text(parseFloat(obj.monthInboundSecondWastesBucket).toFixed(3));
        $("#yearInboundSecondWastesBucket").text(parseFloat(obj.yearInboundSecondWastesBucket).toFixed(3));
        $("#monthOutboundSecondWastesBucket").text(parseFloat(obj.monthOutboundSecondWastesBucket).toFixed(3));
        $("#yearOutboundSecondWastesBucket").text(parseFloat(obj.yearOutboundSecondWastesBucket).toFixed(3));
        $("#monthBalanceSecondWastesBucket").text(parseFloat(obj.monthBalanceSecondWastesBucket).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryNaclo").text(parseFloat(obj.monthDisposalMedicalAuxiliaryNaclo).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryNaclo").text(parseFloat(obj.yearDisposalMedicalAuxiliaryNaclo).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryNaclo").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryNaclo).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryNaclo").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryNaclo).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryDeodorant").text(parseFloat(obj.monthDisposalMedicalAuxiliaryDeodorant).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryDeodorant").text(parseFloat(obj.yearDisposalMedicalAuxiliaryDeodorant).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryDeodorant").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryDeodorant).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryDeodorant").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryDeodorant).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryMedicalWastesBag").text(parseFloat(obj.monthDisposalMedicalAuxiliaryMedicalWastesBag).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryMedicalWastesBag").text(parseFloat(obj.yearDisposalMedicalAuxiliaryMedicalWastesBag).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryMedicalWastesBag").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryMedicalWastesBag).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryMedicalWastesBag").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryMedicalWastesBag).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryCollectionBox").text(parseFloat(obj.monthDisposalMedicalAuxiliaryCollectionBox).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryCollectionBox").text(parseFloat(obj.yearDisposalMedicalAuxiliaryCollectionBox).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryCollectionBox").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryCollectionBox).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryCollectionBox").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryCollectionBox).toFixed(3));
        $("#monthDisposalMedicalAuxiliarySteam").text(parseFloat(obj.monthDisposalMedicalAuxiliarySteam).toFixed(3));
        $("#yearDisposalMedicalAuxiliarySteam").text(parseFloat(obj.yearDisposalMedicalAuxiliarySteam).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliarySteam").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliarySteam).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliarySteam").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliarySteam).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryIndustrialWater").text(parseFloat(obj.monthDisposalMedicalAuxiliaryIndustrialWater).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryIndustrialWater").text(parseFloat(obj.yearDisposalMedicalAuxiliaryIndustrialWater).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryIndustrialWater").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryIndustrialWater).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryIndustrialWater").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryIndustrialWater).toFixed(3));
        $("#monthDisposalMedicalAuxiliaryElectricQuantity").text(parseFloat(obj.monthDisposalMedicalAuxiliaryElectricQuantity).toFixed(3));
        $("#yearDisposalMedicalAuxiliaryElectricQuantity").text(parseFloat(obj.yearDisposalMedicalAuxiliaryElectricQuantity).toFixed(3));
        $("#todayAverageDisposalMedicalAuxiliaryElectricQuantity").text(parseFloat(obj.todayAverageDisposalMedicalAuxiliaryElectricQuantity).toFixed(3));
        $("#monthAverageDisposalMedicalAuxiliaryElectricQuantity").text(parseFloat(obj.monthAverageDisposalMedicalAuxiliaryElectricQuantity).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryCalcareousLime").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryCalcareousLime).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryCalcareousLime").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryCalcareousLime).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryCalcareousLime").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryCalcareousLime).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryCalcareousLime").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryCalcareousLime).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryActivatedCarbon").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryActivatedCarbon).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryActivatedCarbon").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryActivatedCarbon).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryActivatedCarbon").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryActivatedCarbon).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryActivatedCarbon").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryActivatedCarbon).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryLye").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryLye).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryLye").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryLye).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryLye").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryLye).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryLye").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryLye).toFixed(3));
        $("#monthDisposalSecondaryAuxiliarySalt").text(parseFloat(obj.monthDisposalSecondaryAuxiliarySalt).toFixed(3));
        $("#yearDisposalSecondaryAuxiliarySalt").text(parseFloat(obj.yearDisposalSecondaryAuxiliarySalt).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliarySalt").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliarySalt).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliarySalt").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliarySalt).toFixed(3));
        $("#monthDisposalSecondaryAuxiliarySlagBag").text(parseFloat(obj.monthDisposalSecondaryAuxiliarySlagBag).toFixed(3));
        $("#yearDisposalSecondaryAuxiliarySlagBag").text(parseFloat(obj.yearDisposalSecondaryAuxiliarySlagBag).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliarySlagBag").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliarySlagBag).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliarySlagBag").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliarySlagBag).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryFlyAshBag").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryFlyAshBag).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryFlyAshBag").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryFlyAshBag).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryFlyAshBag").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryFlyAshBag).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryFlyAshBag").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryFlyAshBag).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryDieselOil").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryDieselOil).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryDieselOil").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryDieselOil).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryDieselOil").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryDieselOil).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryDieselOil").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryDieselOil).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryElectricQuantity").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryElectricQuantity).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryElectricQuantity").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryElectricQuantity).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryElectricQuantity").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryElectricQuantity).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryElectricQuantity").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryElectricQuantity).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#limitDisposalSecondaryAuxiliaryIndustrialWater").text(parseFloat(obj.limitDisposalSecondaryAuxiliaryIndustrialWater).toFixed(3));
        $("#monthDisposalSecondaryAuxiliaryWoodenPallets").text(parseFloat(obj.monthDisposalSecondaryAuxiliaryWoodenPallets).toFixed(3));
        $("#yearDisposalSecondaryAuxiliaryWoodenPallets").text(parseFloat(obj.yearDisposalSecondaryAuxiliaryWoodenPallets).toFixed(3));
        $("#todayAverageDisposalSecondaryAuxiliaryWoodenPallets").text(parseFloat(obj.todayAverageDisposalSecondaryAuxiliaryWoodenPallets).toFixed(3));
        $("#monthAverageDisposalSecondaryAuxiliaryWoodenPallets").text(parseFloat(obj.monthAverageDisposalSecondaryAuxiliaryWoodenPallets).toFixed(3));
        $("#monthDisposalThirdAuxiliaryCalcareousLime").text(parseFloat(obj.monthDisposalThirdAuxiliaryCalcareousLime).toFixed(3));
        $("#yearDisposalThirdAuxiliaryCalcareousLime").text(parseFloat(obj.yearDisposalThirdAuxiliaryCalcareousLime).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryCalcareousLime").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryCalcareousLime).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryCalcareousLime").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryCalcareousLime).toFixed(3));
        $("#monthDisposalThirdAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.monthDisposalThirdAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#yearDisposalThirdAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.yearDisposalThirdAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#monthDisposalThirdAuxiliaryActivatedCarbon").text(parseFloat(obj.monthDisposalThirdAuxiliaryActivatedCarbon).toFixed(3));
        $("#yearDisposalThirdAuxiliaryActivatedCarbon").text(parseFloat(obj.yearDisposalThirdAuxiliaryActivatedCarbon).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryActivatedCarbon").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryActivatedCarbon).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryActivatedCarbon").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryActivatedCarbon).toFixed(3));
        $("#monthDisposalThirdAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.monthDisposalThirdAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#yearDisposalThirdAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.yearDisposalThirdAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#monthDisposalThirdAuxiliaryLye").text(parseFloat(obj.monthDisposalThirdAuxiliaryLye).toFixed(3));
        $("#yearDisposalThirdAuxiliaryLye").text(parseFloat(obj.yearDisposalThirdAuxiliaryLye).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryLye").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryLye).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryLye").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryLye).toFixed(3));
        $("#monthDisposalThirdAuxiliaryCausticSoda").text(parseFloat(obj.monthDisposalThirdAuxiliaryCausticSoda).toFixed(3));
        $("#yearDisposalThirdAuxiliaryCausticSoda").text(parseFloat(obj.yearDisposalThirdAuxiliaryCausticSoda).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryCausticSoda").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryCausticSoda).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryCausticSoda").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryCausticSoda).toFixed(3));
        $("#monthDisposalThirdAuxiliaryUrea").text(parseFloat(obj.monthDisposalThirdAuxiliaryUrea).toFixed(3));
        $("#yearDisposalThirdAuxiliaryUrea").text(parseFloat(obj.yearDisposalThirdAuxiliaryUrea).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryUrea").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryUrea).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryUrea").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryUrea).toFixed(3));
        $("#monthDisposalThirdAuxiliaryHydrochloricAcid").text(parseFloat(obj.monthDisposalThirdAuxiliaryHydrochloricAcid).toFixed(3));
        $("#yearDisposalThirdAuxiliaryHydrochloricAcid").text(parseFloat(obj.yearDisposalThirdAuxiliaryHydrochloricAcid).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryHydrochloricAcid").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryHydrochloricAcid).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryHydrochloricAcid").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryHydrochloricAcid).toFixed(3));
        $("#monthDisposalThirdAuxiliaryNahco3").text(parseFloat(obj.monthDisposalThirdAuxiliaryNahco3).toFixed(3));
        $("#yearDisposalThirdAuxiliaryNahco3").text(parseFloat(obj.yearDisposalThirdAuxiliaryNahco3).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryNahco3").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryNahco3).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryNahco3").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryNahco3).toFixed(3));
        $("#monthDisposalThirdAuxiliaryFlour").text(parseFloat(obj.monthDisposalThirdAuxiliaryFlour).toFixed(3));
        $("#yearDisposalThirdAuxiliaryFlour").text(parseFloat(obj.yearDisposalThirdAuxiliaryFlour).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryFlour").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryFlour).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryFlour").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryFlour).toFixed(3));
        $("#monthDisposalThirdAuxiliaryDefoamer").text(parseFloat(obj.monthDisposalThirdAuxiliaryDefoamer).toFixed(3));
        $("#yearDisposalThirdAuxiliaryDefoamer").text(parseFloat(obj.yearDisposalThirdAuxiliaryDefoamer).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryDefoamer").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryDefoamer).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryDefoamer").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryDefoamer).toFixed(3));
        $("#monthDisposalThirdAuxiliaryFlocculant").text(parseFloat(obj.monthDisposalThirdAuxiliaryFlocculant).toFixed(3));
        $("#yearDisposalThirdAuxiliaryFlocculant").text(parseFloat(obj.yearDisposalThirdAuxiliaryFlocculant).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryFlocculant").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryFlocculant).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryFlocculant").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryFlocculant).toFixed(3));
        $("#monthDisposalThirdAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.monthDisposalThirdAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#yearDisposalThirdAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.yearDisposalThirdAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#monthDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.monthDisposalThirdAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#yearDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.yearDisposalThirdAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#monthDisposalThirdAuxiliaryAmmonia").text(parseFloat(obj.monthDisposalThirdAuxiliaryAmmonia).toFixed(3));
        $("#yearDisposalThirdAuxiliaryAmmonia").text(parseFloat(obj.yearDisposalThirdAuxiliaryAmmonia).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryAmmonia").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryAmmonia).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryAmmonia").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryAmmonia).toFixed(3));
        $("#monthDisposalThirdAuxiliaryWaterReducingAgent").text(parseFloat(obj.monthDisposalThirdAuxiliaryWaterReducingAgent).toFixed(3));
        $("#yearDisposalThirdAuxiliaryWaterReducingAgent").text(parseFloat(obj.yearDisposalThirdAuxiliaryWaterReducingAgent).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryWaterReducingAgent").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryWaterReducingAgent).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryWaterReducingAgent").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryWaterReducingAgent).toFixed(3));
        $("#monthDisposalThirdAuxiliaryNaclo").text(parseFloat(obj.monthDisposalThirdAuxiliaryNaclo).toFixed(3));
        $("#yearDisposalThirdAuxiliaryNaclo").text(parseFloat(obj.yearDisposalThirdAuxiliaryNaclo).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryNaclo").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryNaclo).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryNaclo").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryNaclo).toFixed(3));
        $("#monthDisposalThirdAuxiliaryStandardBox").text(parseFloat(obj.monthDisposalThirdAuxiliaryStandardBox).toFixed(3));
        $("#yearDisposalThirdAuxiliaryStandardBox").text(parseFloat(obj.yearDisposalThirdAuxiliaryStandardBox).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryStandardBox").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryStandardBox).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryStandardBox").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryStandardBox).toFixed(3));
        $("#monthDisposalThirdAuxiliaryWoodenPallets").text(parseFloat(obj.monthDisposalThirdAuxiliaryWoodenPallets).toFixed(3));
        $("#yearDisposalThirdAuxiliaryWoodenPallets").text(parseFloat(obj.yearDisposalThirdAuxiliaryWoodenPallets).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryWoodenPallets").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryWoodenPallets).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryWoodenPallets").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryWoodenPallets).toFixed(3));
        $("#monthDisposalThirdAuxiliaryStandardTray_1m").text(parseFloat(obj.monthDisposalThirdAuxiliaryStandardTray_1m).toFixed(3));
        $("#yearDisposalThirdAuxiliaryStandardTray_1m").text(parseFloat(obj.yearDisposalThirdAuxiliaryStandardTray_1m).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryStandardTray_1m").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryStandardTray_1m).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryStandardTray_1m").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryStandardTray_1m).toFixed(3));
        $("#monthDisposalThirdAuxiliaryStandardTray_1_2m").text(parseFloat(obj.monthDisposalThirdAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#yearDisposalThirdAuxiliaryStandardTray_1_2m").text(parseFloat(obj.yearDisposalThirdAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryStandardTray_1_2m").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryStandardTray_1_2m").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#monthDisposalThirdAuxiliarySlagBag").text(parseFloat(obj.monthDisposalThirdAuxiliarySlagBag).toFixed(3));
        $("#yearDisposalThirdAuxiliarySlagBag").text(parseFloat(obj.yearDisposalThirdAuxiliarySlagBag).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliarySlagBag").text(parseFloat(obj.todayAverageDisposalThirdAuxiliarySlagBag).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliarySlagBag").text(parseFloat(obj.monthAverageDisposalThirdAuxiliarySlagBag).toFixed(3));
        $("#monthDisposalThirdAuxiliaryFlyAshBag").text(parseFloat(obj.monthDisposalThirdAuxiliaryFlyAshBag).toFixed(3));
        $("#yearDisposalThirdAuxiliaryFlyAshBag").text(parseFloat(obj.yearDisposalThirdAuxiliaryFlyAshBag).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryFlyAshBag").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryFlyAshBag).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryFlyAshBag").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryFlyAshBag).toFixed(3));
        $("#monthDisposalThirdAuxiliaryTonBox").text(parseFloat(obj.monthDisposalThirdAuxiliaryTonBox).toFixed(3));
        $("#yearDisposalThirdAuxiliaryTonBox").text(parseFloat(obj.yearDisposalThirdAuxiliaryTonBox).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryTonBox").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryTonBox).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryTonBox").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryTonBox).toFixed(3));
        $("#monthDisposalThirdAuxiliarySteam").text(parseFloat(obj.monthDisposalThirdAuxiliarySteam).toFixed(3));
        $("#yearDisposalThirdAuxiliarySteam").text(parseFloat(obj.yearDisposalThirdAuxiliarySteam).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliarySteam").text(parseFloat(obj.todayAverageDisposalThirdAuxiliarySteam).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliarySteam").text(parseFloat(obj.monthAverageDisposalThirdAuxiliarySteam).toFixed(3));
        $("#monthDisposalThirdAuxiliaryDieselOil").text(parseFloat(obj.monthDisposalThirdAuxiliaryDieselOil).toFixed(3));
        $("#yearDisposalThirdAuxiliaryDieselOil").text(parseFloat(obj.yearDisposalThirdAuxiliaryDieselOil).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryDieselOil").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryDieselOil).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryDieselOil").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryDieselOil).toFixed(3));
        $("#monthDisposalThirdAuxiliaryNaturalGas").text(parseFloat(obj.monthDisposalThirdAuxiliaryNaturalGas).toFixed(3));
        $("#yearDisposalThirdAuxiliaryNaturalGas").text(parseFloat(obj.yearDisposalThirdAuxiliaryNaturalGas).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryNaturalGas").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryNaturalGas).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryNaturalGas").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryNaturalGas).toFixed(3));
        $("#monthDisposalThirdAuxiliaryElectricQuantity").text(parseFloat(obj.monthDisposalThirdAuxiliaryElectricQuantity).toFixed(3));
        $("#yearDisposalThirdAuxiliaryElectricQuantity").text(parseFloat(obj.yearDisposalThirdAuxiliaryElectricQuantity).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryElectricQuantity").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryElectricQuantity).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryElectricQuantity").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryElectricQuantity).toFixed(3));
        $("#monthDisposalThirdAuxiliaryIndustrialWater").text(parseFloat(obj.monthDisposalThirdAuxiliaryIndustrialWater).toFixed(3));
        $("#yearDisposalThirdAuxiliaryIndustrialWater").text(parseFloat(obj.yearDisposalThirdAuxiliaryIndustrialWater).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryIndustrialWater").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryIndustrialWater).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryIndustrialWater").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryIndustrialWater).toFixed(3));
        $("#monthDisposalThirdAuxiliaryTapWaterQuantity").text(parseFloat(obj.monthDisposalThirdAuxiliaryTapWaterQuantity).toFixed(3));
        $("#yearDisposalThirdAuxiliaryTapWaterQuantity").text(parseFloat(obj.yearDisposalThirdAuxiliaryTapWaterQuantity).toFixed(3));
        $("#todayAverageDisposalThirdAuxiliaryTapWaterQuantity").text(parseFloat(obj.todayAverageDisposalThirdAuxiliaryTapWaterQuantity).toFixed(3));
        $("#monthAverageDisposalThirdAuxiliaryTapWaterQuantity").text(parseFloat(obj.monthAverageDisposalThirdAuxiliaryTapWaterQuantity).toFixed(3));
        $("#monthDisposalTowerElectricQuantity").text(parseFloat(obj.monthDisposalTowerElectricQuantity).toFixed(3));
        $("#yearDisposalTowerElectricQuantity").text(parseFloat(obj.yearDisposalTowerElectricQuantity).toFixed(3));
        $("#todayAverageDisposalTowerElectricQuantity").text(parseFloat(obj.todayAverageDisposalTowerElectricQuantity).toFixed(3));
        $("#monthAverageDisposalTowerElectricQuantity").text(parseFloat(obj.monthAverageDisposalTowerElectricQuantity).toFixed(3));
        $("#monthInboundAuxiliaryCalcareousLime").text(parseFloat(obj.monthInboundAuxiliaryCalcareousLime).toFixed(3));
        $("#yearInboundAuxiliaryCalcareousLime").text(parseFloat(obj.yearInboundAuxiliaryCalcareousLime).toFixed(3));
        $("#monthOutboundAuxiliaryCalcareousLime").text(parseFloat(obj.monthOutboundAuxiliaryCalcareousLime).toFixed(3));
        $("#yearOutboundAuxiliaryCalcareousLime").text(parseFloat(obj.yearOutboundAuxiliaryCalcareousLime).toFixed(3));
        $("#monthInboundAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.monthInboundAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#yearInboundAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.yearInboundAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#monthOutboundAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.monthOutboundAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#yearOutboundAuxiliaryCommonActivatedCarbon").text(parseFloat(obj.yearOutboundAuxiliaryCommonActivatedCarbon).toFixed(3));
        $("#monthInboundAuxiliaryActivatedCarbon").text(parseFloat(obj.monthInboundAuxiliaryActivatedCarbon).toFixed(3));
        $("#yearInboundAuxiliaryActivatedCarbon").text(parseFloat(obj.yearInboundAuxiliaryActivatedCarbon).toFixed(3));
        $("#monthOutboundAuxiliaryActivatedCarbon").text(parseFloat(obj.monthOutboundAuxiliaryActivatedCarbon).toFixed(3));
        $("#yearOutboundAuxiliaryActivatedCarbon").text(parseFloat(obj.yearOutboundAuxiliaryActivatedCarbon).toFixed(3));
        $("#monthInboundAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.monthInboundAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#yearInboundAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.yearInboundAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#monthOutboundAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.monthOutboundAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#yearOutboundAuxiliaryActivatedCarbonParticles").text(parseFloat(obj.yearOutboundAuxiliaryActivatedCarbonParticles).toFixed(3));
        $("#monthInboundAuxiliaryLye").text(parseFloat(obj.monthInboundAuxiliaryLye).toFixed(3));
        $("#yearInboundAuxiliaryLye").text(parseFloat(obj.yearInboundAuxiliaryLye).toFixed(3));
        $("#monthOutboundAuxiliaryLye").text(parseFloat(obj.monthOutboundAuxiliaryLye).toFixed(3));
        $("#yearOutboundAuxiliaryLye").text(parseFloat(obj.yearOutboundAuxiliaryLye).toFixed(3));
        $("#monthInboundAuxiliaryCausticSoda").text(parseFloat(obj.monthInboundAuxiliaryCausticSoda).toFixed(3));
        $("#yearInboundAuxiliaryCausticSoda").text(parseFloat(obj.yearInboundAuxiliaryCausticSoda).toFixed(3));
        $("#monthOutboundAuxiliaryCausticSoda").text(parseFloat(obj.monthOutboundAuxiliaryCausticSoda).toFixed(3));
        $("#yearOutboundAuxiliaryCausticSoda").text(parseFloat(obj.yearOutboundAuxiliaryCausticSoda).toFixed(3));
        $("#monthInboundAuxiliaryUrea").text(parseFloat(obj.monthInboundAuxiliaryUrea).toFixed(3));
        $("#yearInboundAuxiliaryUrea").text(parseFloat(obj.yearInboundAuxiliaryUrea).toFixed(3));
        $("#monthOutboundAuxiliaryUrea").text(parseFloat(obj.monthOutboundAuxiliaryUrea).toFixed(3));
        $("#yearOutboundAuxiliaryUrea").text(parseFloat(obj.yearOutboundAuxiliaryUrea).toFixed(3));
        $("#monthInboundAuxiliaryHydrochloricAcid").text(parseFloat(obj.monthInboundAuxiliaryHydrochloricAcid).toFixed(3));
        $("#yearInboundAuxiliaryHydrochloricAcid").text(parseFloat(obj.yearInboundAuxiliaryHydrochloricAcid).toFixed(3));
        $("#monthOutboundAuxiliaryHydrochloricAcid").text(parseFloat(obj.monthOutboundAuxiliaryHydrochloricAcid).toFixed(3));
        $("#yearOutboundAuxiliaryHydrochloricAcid").text(parseFloat(obj.yearOutboundAuxiliaryHydrochloricAcid).toFixed(3));
        $("#monthInboundAuxiliaryNahco3").text(parseFloat(obj.monthInboundAuxiliaryNahco3).toFixed(3));
        $("#yearInboundAuxiliaryNahco3").text(parseFloat(obj.yearInboundAuxiliaryNahco3).toFixed(3));
        $("#monthOutboundAuxiliaryNahco3").text(parseFloat(obj.monthOutboundAuxiliaryNahco3).toFixed(3));
        $("#yearOutboundAuxiliaryNahco3").text(parseFloat(obj.yearOutboundAuxiliaryNahco3).toFixed(3));
        $("#monthInboundAuxiliaryFlour").text(parseFloat(obj.monthInboundAuxiliaryFlour).toFixed(3));
        $("#yearInboundAuxiliaryFlour").text(parseFloat(obj.yearInboundAuxiliaryFlour).toFixed(3));
        $("#monthOutboundAuxiliaryFlour").text(parseFloat(obj.monthOutboundAuxiliaryFlour).toFixed(3));
        $("#yearOutboundAuxiliaryFlour").text(parseFloat(obj.yearOutboundAuxiliaryFlour).toFixed(3));
        $("#monthInboundAuxiliaryDefoamer").text(parseFloat(obj.monthInboundAuxiliaryDefoamer).toFixed(3));
        $("#yearInboundAuxiliaryDefoamer").text(parseFloat(obj.yearInboundAuxiliaryDefoamer).toFixed(3));
        $("#monthOutboundAuxiliaryDefoamer").text(parseFloat(obj.monthOutboundAuxiliaryDefoamer).toFixed(3));
        $("#yearOutboundAuxiliaryDefoamer").text(parseFloat(obj.yearOutboundAuxiliaryDefoamer).toFixed(3));
        $("#monthInboundAuxiliaryFlocculant").text(parseFloat(obj.monthInboundAuxiliaryFlocculant).toFixed(3));
        $("#yearInboundAuxiliaryFlocculant").text(parseFloat(obj.yearInboundAuxiliaryFlocculant).toFixed(3));
        $("#monthOutboundAuxiliaryFlocculant").text(parseFloat(obj.monthOutboundAuxiliaryFlocculant).toFixed(3));
        $("#yearOutboundAuxiliaryFlocculant").text(parseFloat(obj.yearOutboundAuxiliaryFlocculant).toFixed(3));
        $("#monthInboundAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.monthInboundAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#yearInboundAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.yearInboundAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#monthOutboundAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.monthOutboundAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#yearOutboundAuxiliarySoftWaterReducingAgent").text(parseFloat(obj.yearOutboundAuxiliarySoftWaterReducingAgent).toFixed(3));
        $("#monthInboundAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.monthInboundAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#yearInboundAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.yearInboundAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#monthOutboundAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.monthOutboundAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#yearOutboundAuxiliarySoftWaterScaleInhibitor").text(parseFloat(obj.yearOutboundAuxiliarySoftWaterScaleInhibitor).toFixed(3));
        $("#monthInboundAuxiliaryAmmonia").text(parseFloat(obj.monthInboundAuxiliaryAmmonia).toFixed(3));
        $("#yearInboundAuxiliaryAmmonia").text(parseFloat(obj.yearInboundAuxiliaryAmmonia).toFixed(3));
        $("#monthOutboundAuxiliaryAmmonia").text(parseFloat(obj.monthOutboundAuxiliaryAmmonia).toFixed(3));
        $("#yearOutboundAuxiliaryAmmonia").text(parseFloat(obj.yearOutboundAuxiliaryAmmonia).toFixed(3));
        $("#monthInboundAuxiliaryWaterReducingAgent").text(parseFloat(obj.monthInboundAuxiliaryWaterReducingAgent).toFixed(3));
        $("#yearInboundAuxiliaryWaterReducingAgent").text(parseFloat(obj.yearInboundAuxiliaryWaterReducingAgent).toFixed(3));
        $("#monthOutboundAuxiliaryWaterReducingAgent").text(parseFloat(obj.monthOutboundAuxiliaryWaterReducingAgent).toFixed(3));
        $("#yearOutboundAuxiliaryWaterReducingAgent").text(parseFloat(obj.yearOutboundAuxiliaryWaterReducingAgent).toFixed(3));
        $("#monthInboundAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.monthInboundAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#yearInboundAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.yearInboundAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#monthOutboundAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.monthOutboundAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#yearOutboundAuxiliaryWaterScaleInhibitor").text(parseFloat(obj.yearOutboundAuxiliaryWaterScaleInhibitor).toFixed(3));
        $("#monthInboundAuxiliaryNaclo").text(parseFloat(obj.monthInboundAuxiliaryNaclo).toFixed(3));
        $("#yearInboundAuxiliaryNaclo").text(parseFloat(obj.yearInboundAuxiliaryNaclo).toFixed(3));
        $("#monthOutboundAuxiliaryNaclo").text(parseFloat(obj.monthOutboundAuxiliaryNaclo).toFixed(3));
        $("#yearOutboundAuxiliaryNaclo").text(parseFloat(obj.yearOutboundAuxiliaryNaclo).toFixed(3));
        $("#monthInboundAuxiliaryDeodorant").text(parseFloat(obj.monthInboundAuxiliaryDeodorant).toFixed(3));
        $("#yearInboundAuxiliaryDeodorant").text(parseFloat(obj.yearInboundAuxiliaryDeodorant).toFixed(3));
        $("#monthOutboundAuxiliaryDeodorant").text(parseFloat(obj.monthOutboundAuxiliaryDeodorant).toFixed(3));
        $("#yearOutboundAuxiliaryDeodorant").text(parseFloat(obj.yearOutboundAuxiliaryDeodorant).toFixed(3));
        $("#monthInboundAuxiliarySalt").text(parseFloat(obj.monthInboundAuxiliarySalt).toFixed(3));
        $("#yearInboundAuxiliarySalt").text(parseFloat(obj.yearInboundAuxiliarySalt).toFixed(3));
        $("#monthOutboundAuxiliarySalt").text(parseFloat(obj.monthOutboundAuxiliarySalt).toFixed(3));
        $("#yearOutboundAuxiliarySalt").text(parseFloat(obj.yearOutboundAuxiliarySalt).toFixed(3));
        $("#monthInboundAuxiliarySlagBag").text(parseFloat(obj.monthInboundAuxiliarySlagBag).toFixed(3));
        $("#yearInboundAuxiliarySlagBag").text(parseFloat(obj.yearInboundAuxiliarySlagBag).toFixed(3));
        $("#monthOutboundAuxiliarySlagBag").text(parseFloat(obj.monthOutboundAuxiliarySlagBag).toFixed(3));
        $("#yearOutboundAuxiliarySlagBag").text(parseFloat(obj.yearOutboundAuxiliarySlagBag).toFixed(3));
        $("#monthInboundAuxiliaryFlyAshBag").text(parseFloat(obj.monthInboundAuxiliaryFlyAshBag).toFixed(3));
        $("#yearInboundAuxiliaryFlyAshBag").text(parseFloat(obj.yearInboundAuxiliaryFlyAshBag).toFixed(3));
        $("#monthOutboundAuxiliaryFlyAshBag").text(parseFloat(obj.monthOutboundAuxiliaryFlyAshBag).toFixed(3));
        $("#yearOutboundAuxiliaryFlyAshBag").text(parseFloat(obj.yearOutboundAuxiliaryFlyAshBag).toFixed(3));
        $("#monthInboundAuxiliaryMedicalWastesBag").text(parseFloat(obj.monthInboundAuxiliaryMedicalWastesBag).toFixed(3));
        $("#yearInboundAuxiliaryMedicalWastesBag").text(parseFloat(obj.yearInboundAuxiliaryMedicalWastesBag).toFixed(3));
        $("#monthOutboundAuxiliaryMedicalWastesBag").text(parseFloat(obj.monthOutboundAuxiliaryMedicalWastesBag).toFixed(3));
        $("#yearOutboundAuxiliaryMedicalWastesBag").text(parseFloat(obj.yearOutboundAuxiliaryMedicalWastesBag).toFixed(3));
        $("#monthInboundAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.monthInboundAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#yearInboundAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.yearInboundAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#monthOutboundAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.monthOutboundAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#yearOutboundAuxiliaryMedicalPackingPlasticBag").text(parseFloat(obj.yearOutboundAuxiliaryMedicalPackingPlasticBag).toFixed(3));
        $("#monthInboundAuxiliaryCollectionBox").text(parseFloat(obj.monthInboundAuxiliaryCollectionBox).toFixed(3));
        $("#yearInboundAuxiliaryCollectionBox").text(parseFloat(obj.yearInboundAuxiliaryCollectionBox).toFixed(3));
        $("#monthOutboundAuxiliaryCollectionBox").text(parseFloat(obj.monthOutboundAuxiliaryCollectionBox).toFixed(3));
        $("#yearOutboundAuxiliaryCollectionBox").text(parseFloat(obj.yearOutboundAuxiliaryCollectionBox).toFixed(3));
        $("#monthInboundAuxiliaryStandardBox").text(parseFloat(obj.monthInboundAuxiliaryStandardBox).toFixed(3));
        $("#yearInboundAuxiliaryStandardBox").text(parseFloat(obj.yearInboundAuxiliaryStandardBox).toFixed(3));
        $("#monthOutboundAuxiliaryStandardBox").text(parseFloat(obj.monthOutboundAuxiliaryStandardBox).toFixed(3));
        $("#yearOutboundAuxiliaryStandardBox").text(parseFloat(obj.yearOutboundAuxiliaryStandardBox).toFixed(3));
        $("#monthInboundAuxiliaryWoodenPallets").text(parseFloat(obj.monthInboundAuxiliaryWoodenPallets).toFixed(3));
        $("#yearInboundAuxiliaryWoodenPallets").text(parseFloat(obj.yearInboundAuxiliaryWoodenPallets).toFixed(3));
        $("#monthOutboundAuxiliaryWoodenPallets").text(parseFloat(obj.monthOutboundAuxiliaryWoodenPallets).toFixed(3));
        $("#yearOutboundAuxiliaryWoodenPallets").text(parseFloat(obj.yearOutboundAuxiliaryWoodenPallets).toFixed(3));
        $("#monthInboundAuxiliaryStandardTray_1m").text(parseFloat(obj.monthInboundAuxiliaryStandardTray_1m).toFixed(3));
        $("#yearInboundAuxiliaryStandardTray_1m").text(parseFloat(obj.yearInboundAuxiliaryStandardTray_1m).toFixed(3));
        $("#monthOutboundAuxiliaryStandardTray_1m").text(parseFloat(obj.monthOutboundAuxiliaryStandardTray_1m).toFixed(3));
        $("#yearOutboundAuxiliaryStandardTray_1m").text(parseFloat(obj.yearOutboundAuxiliaryStandardTray_1m).toFixed(3));
        $("#monthInboundAuxiliaryStandardTray_1_2m").text(parseFloat(obj.monthInboundAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#yearInboundAuxiliaryStandardTray_1_2m").text(parseFloat(obj.yearInboundAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#monthOutboundAuxiliaryStandardTray_1_2m").text(parseFloat(obj.monthOutboundAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#yearOutboundAuxiliaryStandardTray_1_2m").text(parseFloat(obj.yearOutboundAuxiliaryStandardTray_1_2m).toFixed(3));
        $("#monthInboundAuxiliaryTonBox").text(parseFloat(obj.monthInboundAuxiliaryTonBox).toFixed(3));
        $("#yearInboundAuxiliaryTonBox").text(parseFloat(obj.yearInboundAuxiliaryTonBox).toFixed(3));
        $("#monthOutboundAuxiliaryTonBox").text(parseFloat(obj.monthOutboundAuxiliaryTonBox).toFixed(3));
        $("#yearOutboundAuxiliaryTonBox").text(parseFloat(obj.yearOutboundAuxiliaryTonBox).toFixed(3));
        $("#monthInboundAuxiliarySteam").text(parseFloat(obj.monthInboundAuxiliarySteam).toFixed(3));
        $("#yearInboundAuxiliarySteam").text(parseFloat(obj.yearInboundAuxiliarySteam).toFixed(3));
        $("#monthOutboundAuxiliarySteam").text(parseFloat(obj.monthOutboundAuxiliarySteam).toFixed(3));
        $("#yearOutboundAuxiliarySteam").text(parseFloat(obj.yearOutboundAuxiliarySteam).toFixed(3));
        $("#monthInboundAuxiliaryDieselOil").text(parseFloat(obj.monthInboundAuxiliaryDieselOil).toFixed(3));
        $("#yearInboundAuxiliaryDieselOil").text(parseFloat(obj.yearInboundAuxiliaryDieselOil).toFixed(3));
        $("#monthOutboundAuxiliaryDieselOil").text(parseFloat(obj.monthOutboundAuxiliaryDieselOil).toFixed(3));
        $("#yearOutboundAuxiliaryDieselOil").text(parseFloat(obj.yearOutboundAuxiliaryDieselOil).toFixed(3));
        $("#monthInboundAuxiliaryNaturalGas").text(parseFloat(obj.monthInboundAuxiliaryNaturalGas).toFixed(3));
        $("#yearInboundAuxiliaryNaturalGas").text(parseFloat(obj.yearInboundAuxiliaryNaturalGas).toFixed(3));
        $("#monthOutboundAuxiliaryNaturalGas").text(parseFloat(obj.monthOutboundAuxiliaryNaturalGas).toFixed(3));
        $("#yearOutboundAuxiliaryNaturalGas").text(parseFloat(obj.yearOutboundAuxiliaryNaturalGas).toFixed(3));
        $("#monthInboundAuxiliaryElectricQuantity").text(parseFloat(obj.monthInboundAuxiliaryElectricQuantity).toFixed(3));
        $("#yearInboundAuxiliaryElectricQuantity").text(parseFloat(obj.yearInboundAuxiliaryElectricQuantity).toFixed(3));
        $("#monthOutboundAuxiliaryElectricQuantity").text(parseFloat(obj.monthOutboundAuxiliaryElectricQuantity).toFixed(3));
        $("#yearOutboundAuxiliaryElectricQuantity").text(parseFloat(obj.yearOutboundAuxiliaryElectricQuantity).toFixed(3));
        $("#monthInboundAuxiliaryIndustrialWater").text(parseFloat(obj.monthInboundAuxiliaryIndustrialWater).toFixed(3));
        $("#yearInboundAuxiliaryIndustrialWater").text(parseFloat(obj.yearInboundAuxiliaryIndustrialWater).toFixed(3));
        $("#monthOutboundAuxiliaryIndustrialWater").text(parseFloat(obj.monthOutboundAuxiliaryIndustrialWater).toFixed(3));
        $("#yearOutboundAuxiliaryIndustrialWater").text(parseFloat(obj.yearOutboundAuxiliaryIndustrialWater).toFixed(3));
        $("#monthInboundAuxiliaryTapWaterQuantity").text(parseFloat(obj.monthInboundAuxiliaryTapWaterQuantity).toFixed(3));
        $("#yearInboundAuxiliaryTapWaterQuantity").text(parseFloat(obj.yearInboundAuxiliaryTapWaterQuantity).toFixed(3));
        $("#monthOutboundAuxiliaryTapWaterQuantity").text(parseFloat(obj.monthOutboundAuxiliaryTapWaterQuantity).toFixed(3));
        $("#yearOutboundAuxiliaryTapWaterQuantity").text(parseFloat(obj.yearOutboundAuxiliaryTapWaterQuantity).toFixed(3));
        $("#monthOutboundA2WastesBulk").text(parseFloat(obj.monthOutboundA2WastesBulk).toFixed(3));
        $("#yearOutboundA2WastesBulk").text(parseFloat(obj.yearOutboundA2WastesBulk).toFixed(3));
        $("#monthOutboundB2WastesBulk").text(parseFloat(obj.monthOutboundB2WastesBulk).toFixed(3));
        $("#yearOutboundB2WastesBulk").text(parseFloat(obj.yearOutboundB2WastesBulk).toFixed(3));
        $("#todayOutboundB2RateWastesBulk").text(parseFloat(obj.todayOutboundB2RateWastesBulk).toFixed(3));
        $("#monthOutboundA2WastesCrushing").text(parseFloat(obj.monthOutboundA2WastesCrushing).toFixed(3));
        $("#yearOutboundA2WastesCrushing").text(parseFloat(obj.yearOutboundA2WastesCrushing).toFixed(3));
        $("#monthOutboundB2WastesCrushing").text(parseFloat(obj.monthOutboundB2WastesCrushing).toFixed(3));
        $("#yearOutboundB2WastesCrushing").text(parseFloat(obj.yearOutboundB2WastesCrushing).toFixed(3));
        $("#todayOutboundB2RateWastesCrushing").text(parseFloat(obj.todayOutboundB2RateWastesCrushing).toFixed(3));
        $("#monthOutboundA2WastesSludge").text(parseFloat(obj.monthOutboundA2WastesSludge).toFixed(3));
        $("#yearOutboundA2WastesSludge").text(parseFloat(obj.yearOutboundA2WastesSludge).toFixed(3));
        $("#monthOutboundB2WastesSludge").text(parseFloat(obj.monthOutboundB2WastesSludge).toFixed(3));
        $("#yearOutboundB2WastesSludge").text(parseFloat(obj.yearOutboundB2WastesSludge).toFixed(3));
        $("#todayOutboundB2RateWastesSludge").text(parseFloat(obj.todayOutboundB2RateWastesSludge).toFixed(3));
        $("#monthOutboundA2WastesDistillation").text(parseFloat(obj.monthOutboundA2WastesDistillation).toFixed(3));
        $("#yearOutboundA2WastesDistillation").text(parseFloat(obj.yearOutboundA2WastesDistillation).toFixed(3));
        $("#monthOutboundB2WastesDistillation").text(parseFloat(obj.monthOutboundB2WastesDistillation).toFixed(3));
        $("#yearOutboundB2WastesDistillation").text(parseFloat(obj.yearOutboundB2WastesDistillation).toFixed(3));
        $("#todayOutboundB2RateWastesDistillation").text(parseFloat(obj.todayOutboundB2RateWastesDistillation).toFixed(3));
        $("#monthOutboundA2WastesSuspension").text(parseFloat(obj.monthOutboundA2WastesSuspension).toFixed(3));
        $("#yearOutboundA2WastesSuspension").text(parseFloat(obj.yearOutboundA2WastesSuspension).toFixed(3));
        $("#monthOutboundB2WastesSuspension").text(parseFloat(obj.monthOutboundB2WastesSuspension).toFixed(3));
        $("#yearOutboundB2WastesSuspension").text(parseFloat(obj.yearOutboundB2WastesSuspension).toFixed(3));
        $("#todayOutboundB2RateWastesSuspension").text(parseFloat(obj.todayOutboundB2RateWastesSuspension).toFixed(3));
        $("#monthOutboundA2WastesWasteLiquid").text(parseFloat(obj.monthOutboundA2WastesWasteLiquid).toFixed(3));
        $("#yearOutboundA2WastesWasteLiquid").text(parseFloat(obj.yearOutboundA2WastesWasteLiquid).toFixed(3));
        $("#monthOutboundB2WastesWasteLiquid").text(parseFloat(obj.monthOutboundB2WastesWasteLiquid).toFixed(3));
        $("#yearOutboundB2WastesWasteLiquid").text(parseFloat(obj.yearOutboundB2WastesWasteLiquid).toFixed(3));
        $("#todayOutboundB2RateWastesWasteLiquid").text(parseFloat(obj.todayOutboundB2RateWastesWasteLiquid).toFixed(3));
        $("#monthOutboundA2MedicalWastes").text(parseFloat(obj.monthOutboundA2MedicalWastes).toFixed(3));
        $("#yearOutboundA2MedicalWastes").text(parseFloat(obj.yearOutboundA2MedicalWastes).toFixed(3));
        $("#monthOutboundB2MedicalWastes").text(parseFloat(obj.monthOutboundB2MedicalWastes).toFixed(3));
        $("#yearOutboundB2MedicalWastes").text(parseFloat(obj.yearOutboundB2MedicalWastes).toFixed(3));
        $("#todayOutboundB2RateMedicalWastes").text(parseFloat(obj.todayOutboundB2RateMedicalWastes).toFixed(3));
        $("#monthOutboundPrepare2WastesBulk").text(parseFloat(obj.monthOutboundPrepare2WastesBulk).toFixed(3));
        $("#yearOutboundPrepare2WastesBulk").text(parseFloat(obj.yearOutboundPrepare2WastesBulk).toFixed(3));
        $("#monthOutboundPrepare2WastesCrushing").text(parseFloat(obj.monthOutboundPrepare2WastesCrushing).toFixed(3));
        $("#yearOutboundPrepare2WastesCrushing").text(parseFloat(obj.yearOutboundPrepare2WastesCrushing).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemWastesBulk").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemWastesBulk).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemWastesBulk").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemWastesBulk).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateWastesBulk").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateWastesBulk).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateWastesBulk").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateWastesBulk).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateWastesBulk").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateWastesBulk).toFixed(3));
        $("#monthOutboundPrepare2WastesSludge").text(parseFloat(obj.monthOutboundPrepare2WastesSludge).toFixed(3));
        $("#yearOutboundPrepare2WastesSludge").text(parseFloat(obj.yearOutboundPrepare2WastesSludge).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemWastesCrushing").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemWastesCrushing).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemWastesCrushing").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemWastesCrushing).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateWastesCrushing").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateWastesCrushing).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateWastesCrushing").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateWastesCrushing).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateWastesCrushing").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateWastesCrushing).toFixed(3));
        $("#monthOutboundPrepare2WastesDistillation").text(parseFloat(obj.monthOutboundPrepare2WastesDistillation).toFixed(3));
        $("#yearOutboundPrepare2WastesDistillation").text(parseFloat(obj.yearOutboundPrepare2WastesDistillation).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemWastesSludge").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemWastesSludge).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemWastesSludge").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemWastesSludge).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateWastesSludge").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateWastesSludge).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateWastesSludge").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateWastesSludge).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateWastesSludge").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateWastesSludge).toFixed(3));
        $("#monthOutboundPrepare2WastesSuspension").text(parseFloat(obj.monthOutboundPrepare2WastesSuspension).toFixed(3));
        $("#yearOutboundPrepare2WastesSuspension").text(parseFloat(obj.yearOutboundPrepare2WastesSuspension).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemWastesDistillation").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemWastesDistillation).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemWastesDistillation").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemWastesDistillation).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateWastesDistillation").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateWastesDistillation).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateWastesDistillation").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateWastesDistillation).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateWastesDistillation").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateWastesDistillation).toFixed(3));
        $("#monthOutboundPrepare2WastesWasteLiquid").text(parseFloat(obj.monthOutboundPrepare2WastesWasteLiquid).toFixed(3));
        $("#yearOutboundPrepare2WastesWasteLiquid").text(parseFloat(obj.yearOutboundPrepare2WastesWasteLiquid).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemWastesSuspension").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemWastesSuspension).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemWastesSuspension").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemWastesSuspension).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateWastesSuspension").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateWastesSuspension).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateWastesSuspension").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateWastesSuspension).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateWastesSuspension").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateWastesSuspension).toFixed(3));
        $("#monthOutboundPrepare2MedicalWastes").text(parseFloat(obj.monthOutboundPrepare2MedicalWastes).toFixed(3));
        $("#yearOutboundPrepare2MedicalWastes").text(parseFloat(obj.yearOutboundPrepare2MedicalWastes).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemWastesWasteLiquid").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemWastesWasteLiquid).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemWastesWasteLiquid").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemWastesWasteLiquid).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid).toFixed(3));
        $("#monthOutboundSecondPretreatmentWastes").text(parseFloat(obj.monthOutboundSecondPretreatmentWastes).toFixed(3));
        $("#yearOutboundSecondPretreatmentWastes").text(parseFloat(obj.yearOutboundSecondPretreatmentWastes).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemMedicalWastes").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemMedicalWastes).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemMedicalWastes").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemMedicalWastes).toFixed(3));
        $("#todayOutboundThirdPretreatmentSystemRateMedicalWastes").text(parseFloat(obj.todayOutboundThirdPretreatmentSystemRateMedicalWastes).toFixed(3));
        $("#monthOutboundThirdPretreatmentSystemRateMedicalWastes").text(parseFloat(obj.monthOutboundThirdPretreatmentSystemRateMedicalWastes).toFixed(3));
        $("#yearOutboundThirdPretreatmentSystemRateMedicalWastes").text(parseFloat(obj.yearOutboundThirdPretreatmentSystemRateMedicalWastes).toFixed(3));
        $("#monthEquipmentA2StopTime").text(parseFloat(obj.monthEquipmentA2StopTime).toFixed(3));
        $("#yearEquipmentA2StopTime").text(parseFloat(obj.yearEquipmentA2StopTime).toFixed(3));
        $("#monthEquipmentB2StopTime").text(parseFloat(obj.monthEquipmentB2StopTime).toFixed(3));
        $("#yearEquipmentB2StopTime").text(parseFloat(obj.yearEquipmentB2StopTime).toFixed(3));
        $("#monthEquipmentPrepare2StopTime").text(parseFloat(obj.monthEquipmentPrepare2StopTime).toFixed(3));
        $("#yearEquipmentPrepare2StopTime").text(parseFloat(obj.yearEquipmentPrepare2StopTime).toFixed(3));
        $("#monthEquipmentSecondaryStopTime").text(parseFloat(obj.monthEquipmentSecondaryStopTime).toFixed(3));
        $("#yearEquipmentSecondaryStopTime").text(parseFloat(obj.yearEquipmentSecondaryStopTime).toFixed(3));
        $("#monthEquipmentThirdStopTime").text(parseFloat(obj.monthEquipmentThirdStopTime).toFixed(3));
        $("#yearEquipmentThirdStopTime").text(parseFloat(obj.yearEquipmentThirdStopTime).toFixed(3));
        $("#monthEquipmentA2RunningTime").text(parseFloat(obj.monthEquipmentA2RunningTime).toFixed(3));
        $("#yearEquipmentA2RunningTime").text(parseFloat(obj.yearEquipmentA2RunningTime).toFixed(3));
        $("#monthEquipmentB2RunningTime").text(parseFloat(obj.monthEquipmentB2RunningTime).toFixed(3));
        $("#yearEquipmentB2RunningTime").text(parseFloat(obj.yearEquipmentB2RunningTime).toFixed(3));
        $("#monthEquipmentPrepare2RunningTime").text(parseFloat(obj.monthEquipmentPrepare2RunningTime).toFixed(3));
        $("#yearEquipmentPrepare2RunningTime").text(parseFloat(obj.yearEquipmentPrepare2RunningTime).toFixed(3));
        $("#monthEquipmentSecondaryRunningTime").text(parseFloat(obj.monthEquipmentSecondaryRunningTime).toFixed(3));
        $("#yearEquipmentSecondaryRunningTime").text(parseFloat(obj.yearEquipmentSecondaryRunningTime).toFixed(3));
        $("#monthEquipmentThirdRunningTime").text(parseFloat(obj.monthEquipmentThirdRunningTime).toFixed(3));
        $("#yearEquipmentThirdRunningTime").text(parseFloat(obj.yearEquipmentThirdRunningTime).toFixed(3));
        $("#monthEquipmentA2RunningRate").text(parseFloat(obj.monthEquipmentA2RunningRate).toFixed(3));
        $("#yearEquipmentA2RunningRate").text(parseFloat(obj.yearEquipmentA2RunningRate).toFixed(3));
        $("#monthEquipmentB2RunningRate").text(parseFloat(obj.monthEquipmentB2RunningRate).toFixed(3));
        $("#yearEquipmentB2RunningRate").text(parseFloat(obj.yearEquipmentB2RunningRate).toFixed(3));
        $("#monthEquipmentPrepare2RunningRate").text(parseFloat(obj.monthEquipmentPrepare2RunningRate).toFixed(3));
        $("#yearEquipmentPrepare2RunningRate").text(parseFloat(obj.yearEquipmentPrepare2RunningRate).toFixed(3));
        $("#monthEquipmentSecondaryRunningRate").text(parseFloat(obj.monthEquipmentSecondaryRunningRate).toFixed(3));
        $("#yearEquipmentSecondaryRunningRate").text(parseFloat(obj.yearEquipmentSecondaryRunningRate).toFixed(3));
        $("#monthEquipmentThirdRunningRate").text(parseFloat(obj.monthEquipmentThirdRunningRate).toFixed(3));
        $("#monthDisposalSecondarySlag").text(parseFloat(obj.monthDisposalSecondarySlag).toFixed(3));
        $("#yearDisposalSecondarySlag").text(parseFloat(obj.yearDisposalSecondarySlag).toFixed(3));
        $("#monthDisposalSecondaryAsh").text(parseFloat(obj.monthDisposalSecondaryAsh).toFixed(3));
        $("#yearDisposalSecondaryAsh").text(parseFloat(obj.yearDisposalSecondaryAsh).toFixed(3));
        $("#monthDisposalThirdSlag").text(parseFloat(obj.monthDisposalThirdSlag).toFixed(3));
        $("#yearDisposalThirdSlag").text(parseFloat(obj.yearDisposalThirdSlag).toFixed(3));
        $("#monthDisposalThirdAsh").text(parseFloat(obj.monthDisposalThirdAsh).toFixed(3));
        $("#yearDisposalThirdAsh").text(parseFloat(obj.yearDisposalThirdAsh).toFixed(3));

        // 设置四个列表
        // 入库单列表
        for (var i = 0; i < obj.inboundOrderItemList.length; i++) {
            var $i = i;
            if (obj.inboundOrderItemList[i].wastes != null) $("td[id='inboundOrderItemList_" + $i + "_wastesName']").text(obj.inboundOrderItemList[i].wastes.name);
            if (obj.inboundOrderItemList[i].produceCompany != null) $("td[id='inboundOrderItemList_" + $i + "_client']").text(obj.inboundOrderItemList[i].produceCompany.companyName);
            $("td[id='inboundOrderItemList_" + $i + "_wastesAmount']").text(parseFloat(obj.inboundOrderItemList[i].wastesAmount).toFixed(3));
            if (obj.inboundOrderItemList[i].handleCategory != null) $("td[id='inboundOrderItemList_" + $i + "_handleCategory']").text(obj.inboundOrderItemList[i].handleCategory.name);
        }
        // 出库单A2列表
        for (var i = 0; i < obj.outboundOrderA2List.length; i++) {
            var $i = i;
            $("td[id='outboundOrderA2List_" + $i + "_wastesName']").text(obj.outboundOrderA2List[i].wastesName);
            if (obj.outboundOrderA2List[i].client != null) $("td[id='outboundOrderA2List_" + $i + "_client']").text(obj.outboundOrderA2List[i].client.companyName);
            $("td[id='outboundOrderA2List_" + $i + "_wastesAmount']").text(parseFloat(obj.outboundOrderA2List[i].outboundNumber).toFixed(3));
            if (obj.outboundOrderA2List[i].handelCategory != null) $("td[id='outboundOrderA2List_" + $i + "_handleCategory']").text(obj.outboundOrderA2List[i].handelCategory.name);
        }
        // 出库单B2列表
        for (var i = 0; i < obj.outboundOrderB2List.length; i++) {
            var $i = i;
            $("td[id='outboundOrderB2List_" + $i + "_wastesName']").text(obj.outboundOrderB2List[i].wastesName);
            if (obj.outboundOrderB2List[i].client != null) $("td[id='outboundOrderB2List_" + $i + "_client']").text(obj.outboundOrderB2List[i].client.companyName);
            $("td[id='outboundOrderB2List_" + $i + "_wastesAmount']").text(parseFloat(obj.outboundOrderB2List[i].outboundNumber).toFixed(3));
            if (obj.outboundOrderB2List[i].handelCategory != null) $("td[id='outboundOrderB2List_" + $i + "_handleCategory']").text(obj.outboundOrderB2List[i].handelCategory.name);
        }
        // 出库单Prepare2列表
        for (var i = 0; i < obj.outboundOrderB2List.length; i++) {
            var $i = i;
            $("td[id='outboundOrderPrepare2List_" + $i + "_wastesName']").text(obj.outboundOrderPrepare2List[i].wastesName);
            if (obj.outboundOrderPrepare2List[i].client != null) $("td[id='outboundOrderPrepare2List_" + $i + "_client']").text(obj.outboundOrderPrepare2List[i].client.companyName);
            $("td[id='outboundOrderPrepare2List_" + $i + "_wastesAmount']").text(parseFloat(obj.outboundOrderB2List[i].outboundNumber).toFixed(3));
            if (obj.outboundOrderPrepare2List[i].handelCategory != null) $("td[id='outboundOrderPrepare2List_" + $i + "_handleCategory']").text(obj.outboundOrderPrepare2List[i].handelCategory.name);
        }
        // 出库单三期列表
        for (var i = 0; i < obj.outboundOrderThirdList.length; i++) {
            var $i = i;
            $("td[id='outboundOrderThirdList_" + $i + "_wastesName']").text(obj.outboundOrderThirdList[i].wastesName);
            if (obj.outboundOrderThirdList[i].client != null) $("td[id='outboundOrderThirdList_" + $i + "_client']").text(obj.outboundOrderThirdList[i].client.companyName);
            $("td[id='outboundOrderThirdList_" + $i + "_wastesAmount']").text(parseFloat(obj.outboundOrderThirdList[i].outboundNumber).toFixed(3));
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

/**
 * 设置状态失效
 * @param e
 */
function setInvalid(e) {
    var r = confirm("确认作废该日报？");
    if (r) {

        var id = getIdByMenu(e);

        var data={
            id:id,
            checkStateItem:{dataDictionaryItemId:69}
        };
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProductionDailyState",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
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

/**
 * 设置状态失效
 * @param e
 */
function setLocked(e) {
    var r = confirm("确认锁定该日报？");
    if (r) {
        var id = getIdByMenu(e);
        var data={
            id:id,
            checkStateItem:{dataDictionaryItemId:83}
        };
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProductionDailyState",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
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

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    var checkedItems = $("input[type='checkbox']:checked");
    checkedItems.each(function () {
        var id = $(this).parent().parent().parent().find("td[name='id']").text();
        window.open('exportProductionDailyExcel?id=' + id);
    });
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
    var filePath = 'Files/Templates/生产日报模板.xlsx';
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
            url: "importProductionDailyExcel",              // url
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


