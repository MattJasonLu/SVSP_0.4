var currentPage = 1;                          //当前页数
var isSearch = false;
var data;
var productionPlanId;
var btn = '';                      // 控制新增或修改
$('#embed').load('embed/loginLogModal.html');

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    console.log(mySelect.options[index].text);
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
            url: "totalProductionPlanRecord",                  // url
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
            url: "searchProductionPlanTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
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
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setProductionPlanList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = new Array();
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
    console.log("当前页：" + pageNumber);
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber == totalPage()) {
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
            url: "loadPageProductionPlanList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setProductionPlanList(result.data);
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
            url: "searchProductionPlan",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setProductionPlanList(result.data);
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
    if (pageNumber == null || pageNumber == undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber == totalPage()) {
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
                url: "loadPageProductionPlanList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setProductionPlanList(result.data);
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
                url: "searchProductionPlan",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setProductionPlanList(result.data);
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
function loadPageProductionPlanList() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageProductionPlanList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
    isSearch = false;
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function setProductionPlanList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
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
                //计划单编号
                case (1):
                    $(this).html(obj.id);
                    break;
                // 创建时间
                case (2):
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                //创建人
                case (3):
                    $(this).html(obj.founder);
                    break;
                // 状态
                case (4):
                    $(this).html(obj.state.name);
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
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProductionPlanSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search-state");
                state.children().remove();
                $.each(data.stateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
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
 * 导出excel
 * @param e
 */
function exportExcel() {
    var name = 't_pr_productionplan';
    var sqlWords = "select * from t_pr_productionplan ";
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
    var filePath = 'Files/Templates/产量计划单模板.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importProductionPlanExcel",              // url
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchProductionPlan();      //
    }
}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchProductionPlan();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchProductionPlan();      //
            }
        },600);
    });
});

/**
 * 查询功能
 */
function searchProductionPlan() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-state").val() == 0) state = "NewBuild";    // 新建
    if ($("#search-state").val() == 1) state = "ToExamine";  // 待审批
    if ($("#search-state").val() == 2) state = "Examining";   // 审批中
    if ($("#search-state").val() == 3) state = "Approval";   // 审批通过
    if ($("#search-state").val() == 4) state = "Backed";    // 驳回
    if ($("#search-state").val() == 5) state = "Invalid";    // 作废
    if ($("#senior").is(':visible')) {
        data = {
            id: $.trim($("#search-id").val()),
            founder: $.trim($("#search-founder").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            state: state,
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
        switch (keywords) {
            case("新建"):
                keywords = "NewBuild";
                break;
            case("待审批"):
                keywords = "ToExamine";
                break;
            case("审批中"):
                keywords = "Examining";
                break;
            case("审批通过"):
                keywords = "Approval";
                break;
            case("已驳回"):
                keywords = "Backed";
                break;
            case("驳回"):
                keywords = "Backed";
                break;
            case("已作废"):
                keywords = "Invalid";
                break;
            case("作废"):
                keywords = "Invalid";
                break;
        }
        data = {
            page: page,
            keywords: keywords
        }
    }
    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchProductionPlan",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result.data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }
}

/**
 * 获取ID
 * @param item
 * @returns {string}
 */
function getProductionPlanId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

function getProductionPlanId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 查看功能
 * @param item
 */
function view(item) {
    if (btn === 'click') productionPlanId = getProductionPlanId(item);
    else productionPlanId = getProductionPlanId1(item);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProductionPlan",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: productionPlanId
        },
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success" || result.data != null) {
                var data = eval(result.data);
                console.log(data);
                $("#view-transportRate").text(data.transportRate);
                $("#view-planQuantity").text(data.planQuantity);
                $("#view-calcareousLime").text(data.auxiliaryConsumption.calcareousLime);
                $("#view-waterScaleInhibitor").text(data.auxiliaryConsumption.waterScaleInhibitor);
                $("#view-commonActivatedCarbon").text(data.auxiliaryConsumption.commonActivatedCarbon);
                $("#view-naclo").text(data.auxiliaryConsumption.naclo);
                $("#view-activatedCarbon").text(data.auxiliaryConsumption.activatedCarbon);
                $("#view-standardBox").text(data.auxiliaryConsumption.standardBox);
                $("#view-activatedCarbonParticles").text(data.auxiliaryConsumption.activatedCarbonParticles);
                $("#view-woodenPallets").text(data.auxiliaryConsumption.woodenPallets);
                $("#view-lye").text(data.auxiliaryConsumption.lye);
                $("#view-standardTray_1m").text(data.auxiliaryConsumption.standardTray_1m);
                $("#view-causticSoda").text(data.auxiliaryConsumption.causticSoda);
                $("#view-standardTray_1_2m").text(data.auxiliaryConsumption.standardTray_1_2m);
                $("#view-urea").text(data.auxiliaryConsumption.urea);
                $("#view-slagBag").text(data.auxiliaryConsumption.slagBag);
                $("#view-hydrochloricAcid").text(data.auxiliaryConsumption.hydrochloricAcid);
                $("#view-flyAshBag").text(data.auxiliaryConsumption.flyAshBag);
                $("#view-nahco3").text(data.auxiliaryConsumption.nahco3);
                $("#view-TonBox").text(data.auxiliaryConsumption.tonBox);
                $("#view-flour").text(data.auxiliaryConsumption.flour);
                $("#view-steam").text(data.auxiliaryConsumption.steam);
                $("#view-defoamer").text(data.auxiliaryConsumption.defoamer);
                $("#view-dieselOil").text(data.auxiliaryConsumption.dieselOil);
                $("#view-flocculant").text(data.auxiliaryConsumption.flocculant);
                $("#view-naturalGas").text(data.auxiliaryConsumption.naturalGas);
                $("#view-softWaterReducingAgent").text(data.auxiliaryConsumption.softWaterReducingAgent);
                $("#view-electricQuantity").text(data.auxiliaryConsumption.electricQuantity);
                $("#view-softWaterScaleInhibitor").text(data.auxiliaryConsumption.softWaterScaleInhibitor);
                $("#view-industrialWater").text(data.auxiliaryConsumption.industrialWater);
                $("#view-pH").text(data.auxiliaryConsumption.pH);
                $("#view-tapWaterQuantity").text(data.auxiliaryConsumption.tapWaterQuantity);
                $("#view-waterReducingAgent").text(data.auxiliaryConsumption.waterReducingAgent);
                $("#viewModal").modal('show');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });

}

/**
 * 单击查看
 * @param item
 */
function view1(item) {
    btn = 'click';
    view(item);
}

/**
 * 双击查看
 * @param item
 */
function view2(item) {
    btn = 'dbclick';
    view(item);
}

/**
 * 修改、编辑功能
 */
function edit(item) {
    btn = 'edit';
    productionPlanId = getProductionPlanId(item);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProductionPlan",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: productionPlanId
        },
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success" || result.data != null) {
                var data = eval(result.data);
                $("#modal-founder").val(data.founder);
                $("#modal-transportRate").val(data.transportRate);
                $("#modal-planQuantity").val(data.planQuantity);
                $("#modal-calcareousLime").val(data.auxiliaryConsumption.calcareousLime);
                $("#modal-waterScaleInhibitor").val(data.auxiliaryConsumption.waterScaleInhibitor);
                $("#modal-commonActivatedCarbon").val(data.auxiliaryConsumption.commonActivatedCarbon);
                $("#modal-naclo").val(data.auxiliaryConsumption.naclo);
                $("#modal-activatedCarbon").val(data.auxiliaryConsumption.activatedCarbon);
                $("#modal-standardBox").val(data.auxiliaryConsumption.standardBox);
                $("#modal-activatedCarbonParticles").val(data.auxiliaryConsumption.activatedCarbonParticles);
                $("#modal-woodenPallets").val(data.auxiliaryConsumption.woodenPallets);
                $("#modal-lye").val(data.auxiliaryConsumption.lye);
                $("#modal-standardTray_1m").val(data.auxiliaryConsumption.standardTray_1m);
                $("#modal-causticSoda").val(data.auxiliaryConsumption.causticSoda);
                $("#modal-standardTray_1_2m").val(data.auxiliaryConsumption.standardTray_1_2m);
                $("#modal-urea").val(data.auxiliaryConsumption.urea);
                $("#modal-slagBag").val(data.auxiliaryConsumption.slagBag);
                $("#modal-hydrochloricAcid").val(data.auxiliaryConsumption.hydrochloricAcid);
                $("#modal-flyAshBag").val(data.auxiliaryConsumption.flyAshBag);
                $("#modal-nahco3").val(data.auxiliaryConsumption.nahco3);
                $("#modal-tonBox").val(data.auxiliaryConsumption.tonBox);
                $("#modal-flour").val(data.auxiliaryConsumption.flour);
                $("#modal-steam").val(data.auxiliaryConsumption.steam);
                $("#modal-defoamer").val(data.auxiliaryConsumption.defoamer);
                $("#modal-dieselOil").val(data.auxiliaryConsumption.dieselOil);
                $("#modal-flocculant").val(data.auxiliaryConsumption.flocculant);
                $("#modal-naturalGas").val(data.auxiliaryConsumption.naturalGas);
                $("#modal-softWaterReducingAgent").val(data.auxiliaryConsumption.softWaterReducingAgent);
                $("#modal-electricQuantity").val(data.auxiliaryConsumption.electricQuantity);
                $("#modal-softWaterScaleInhibitor").val(data.auxiliaryConsumption.softWaterScaleInhibitor);
                $("#modal-industrialWater").val(data.auxiliaryConsumption.industrialWater);
                $("#modal-pH").val(data.auxiliaryConsumption.pH);
                $("#modal-tapWaterQuantity").val(data.auxiliaryConsumption.tapWaterQuantity);
                $("#modal-waterReducingAgent").val(data.auxiliaryConsumption.waterReducingAgent);
                $("#addModal").modal('show');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 提交功能
 */
function submit(item) {
    productionPlanId = getProductionPlanId(item);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProductionPlan",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: productionPlanId
        },
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success" || result.data != null) {
                var data = eval(result.data);
                if (data.state.name != '待审批') alert("请确认后再进行提交操作！");
                else {
                    if (confirm("确定提交？")) {
                        submit1(productionPlanId);
                    }
                }
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}

function submit1(id) {
    $.ajax({
        type: "POST",
        url: "submitProductionPlan",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                alert("提交成功！");
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 审批
 */
function examination(item) {
    productionPlanId = getProductionPlanId(item);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getProductionPlan",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: productionPlanId
        },
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success" || result.data != null) {
                var data = eval(result.data);
                console.log(data.state);
                if (data.state.name != '审批中') alert("请提交后再进行审批操作！");
                else $('#examinationModal').modal('show');//手动触发模态框弹出
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}

function approval() {
    $('#approvalForm2').modal('show');
    $("#passContent").val($("#advice").val());
}

function reject() {
    $('#rejectForm3').modal('show');
    $("#backContent").val($("#advice").val());
}

/**
 * 审批通过
 *
 * */
function approval1() {
    console.log($("#advice").val());
    console.log($("#passContent").val());
    var advice = $("#passContent").val();
    var productionPlan = {};
    productionPlan.id = productionPlanId;
    productionPlan.advice = advice;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "approvalProductionPlan",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(productionPlan),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var data = eval(result);
            console.log(data.message);
            alert("服务器异常!");
        }
    });
}

/**
 * 审批驳回
 * */
function reject1() {
    var advice = $("#backContent").val();
    var productionPlan = {};
    productionPlan.id = productionPlanId;
    productionPlan.advice = advice;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "rejectProductionPlan",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(productionPlan),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var data = eval(result);
            console.log(data.message);
            alert("服务器异常!");
        }
    });
}

/**
 * 作废功能
 */
function invalid(item) {
    if (confirm("确定作废？")) {
        var id = getProductionPlanId(item);
        $.ajax({
            type: "POST",
            url: "invalidProductionPlan",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("作废成功！");
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常!");
            }
        });
    }
}

/**
 * 删除
 * @param item
 */
function delete1(item) {
    if (confirm("确定删除？")) {
        var id = getProductionPlanId(item);
        $.ajax({
            type: "POST",
            url: "deleteProductionPlan",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("删除成功！");
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常!");
            }
        });
    }
}

/**
 * 确认
 * @param item
 */
function confirm1(item) {

    if (confirm("是否确认？")) {
        var id = getProductionPlanId(item);
        $.ajax({
            type: "POST",
            url: "confirmProductionPlan",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("确认成功！");
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常!");
            }
        });
    }
}

/**
 * 新增
 */
function addModal() {
    btn = 'add';
    $("#addModal").modal('show');
}

/**
 * 保存
 */
function save() {
    var productionPlan = {};
    productionPlan.founder = $("#modal-founder").val();
    productionPlan.transportRate = $("#modal-transportRate").val();
    productionPlan.planQuantity = $("#modal-planQuantity").val();
    var auxiliaryConsumption = {};
    auxiliaryConsumption.calcareousLime = $("#modal-calcareousLime").val();
    auxiliaryConsumption.waterScaleInhibitor = $("#modal-waterScaleInhibitor").val();
    auxiliaryConsumption.commonActivatedCarbon = $("#modal-commonActivatedCarbon").val();
    auxiliaryConsumption.naclo = $("#modal-naclo").val();
    auxiliaryConsumption.activatedCarbon = $("#modal-activatedCarbon").val();
    auxiliaryConsumption.standardBox = $("#modal-standardBox").val();
    auxiliaryConsumption.activatedCarbonParticles = $("#modal-activatedCarbonParticles").val();
    auxiliaryConsumption.woodenPallets = $("#modal-woodenPallets").val();
    auxiliaryConsumption.lye = $("#modal-lye").val();
    auxiliaryConsumption.standardTray_1m = $("#modal-standardTray_1m").val();
    auxiliaryConsumption.causticSoda = $("#modal-causticSoda").val();
    auxiliaryConsumption.standardTray_1_2m = $("#modal-standardTray_1_2m").val();
    auxiliaryConsumption.urea = $("#modal-urea").val();
    auxiliaryConsumption.slagBag = $("#modal-slagBag").val();
    auxiliaryConsumption.hydrochloricAcid = $("#modal-hydrochloricAcid").val();
    auxiliaryConsumption.flyAshBag = $("#modal-flyAshBag").val();
    auxiliaryConsumption.nahco3 = $("#modal-nahco3").val();
    auxiliaryConsumption.tonBox = $("#modal-tonBox").val();
    auxiliaryConsumption.flour = $("#modal-flour").val();
    auxiliaryConsumption.steam = $("#modal-steam").val();
    auxiliaryConsumption.defoamer = $("#modal-defoamer").val();
    auxiliaryConsumption.dieselOil = $("#modal-dieselOil").val();
    auxiliaryConsumption.flocculant = $("#modal-flocculant").val();
    auxiliaryConsumption.naturalGas = $("#modal-naturalGas").val();
    auxiliaryConsumption.softWaterReducingAgent = $("#modal-softWaterReducingAgent").val();
    auxiliaryConsumption.electricQuantity = $("#modal-electricQuantity").val();
    auxiliaryConsumption.softWaterScaleInhibitor = $("#modal-softWaterScaleInhibitor").val();
    auxiliaryConsumption.industrialWater = $("#modal-industrialWater").val();
    auxiliaryConsumption.pH = $("#modal-pH").val();
    auxiliaryConsumption.tapWaterQuantity = $("#modal-tapWaterQuantity").val();
    auxiliaryConsumption.waterReducingAgent = $("#modal-waterReducingAgent").val();
    productionPlan.auxiliaryConsumption = auxiliaryConsumption;
    if (btn == 'add') {
        $.ajax({
            type: "POST",
            url: "getCurrentProductionPlanId",
            async: false,
            dataType: "json",
            success: function (result) {
                productionPlan.id = result.id;
            },
            error: function (result) {
                alert("服务器异常!");
            }
        });
        console.log(productionPlan);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "addProductionPlan",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(productionPlan),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    var data = eval(result);
                    if (data.status == "success") {
                        alert(data.message);
                        window.location.reload();
                    } else {
                        alert(data.message);
                    }
                }
            },
            error: function (result) {
                var data = eval(result);
                console.log(data.message);
                alert("服务器异常!");
            }
        });
    } else if (btn == 'edit') {
        productionPlan.id = productionPlanId;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "updateProductionPlan",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(productionPlan),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    var data = eval(result);
                    if (data.status == "success") {
                        alert(data.message);
                        window.location.reload();
                    } else {
                        alert(data.message);
                    }
                }
            },
            error: function (result) {
                var data = eval(result);
                console.log(data.message);
                alert("服务器异常!");
            }
        });

    }


}
