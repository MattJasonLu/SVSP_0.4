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
    console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
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
    loadNavigationList();   // 动态菜单部署
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchProductionPlan();
        window.localStorage.removeItem('approvalId');
    }else {
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
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                console.log("失败");
            }
        });
        isSearch = false;
    }
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
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
                //计划运转率
                case(4):
                    $(this).html(obj.transportRate);
                    break;
                //计划数量
                case(5):
                    $(this).html(obj.planQuantity);
                    break;
                // 状态
                case (6):
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                        break;
                    }
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
        url: "getCheckStateDataByDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search-state");
                state.children().remove();
                $.each(data.data, function (index, item) {
                    if (item.dataDictionaryItemId == 76 ||
                        item.dataDictionaryItemId == 63 ||
                        item.dataDictionaryItemId == 67 ||
                        item.dataDictionaryItemId == 66 ||
                        item.dataDictionaryItemId == 69 ||
                        item.dataDictionaryItemId == 75) {
                        var option = $('<option />');
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        state.append(option);
                    }
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
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += idArry[i] + ",";
            else if (i == idArry.length - 1) sql += idArry[i] + ");"
        }
        sqlWords = "select id,creationDate,founder,state,transportRate,planQuantity,calcareousLime,waterScaleInhibitor,\n" +
            "commonActivatedCarbon,naclo,activatedCarbon,standardBox,activatedCarbonParticles,woodenPallets,lye,standardTray_1m,\n" +
            "causticSoda,standardTray_1_2m,urea,slagBag,hydrochloricAcid,flyAshBag,nahco3,tonBox,flour,steam,defoamer,dieselOil,\n" +
            "flocculant,naturalGas,softWaterReducingAgent,electricQuantity,softWaterScaleInhibitor,industrialWater,pH,tapWaterQuantity,waterReducingAgent \n" +
            "from t_pr_productionplan where id" + sql;
    } else {
        sqlWords = "select id,creationDate,founder,state,transportRate,planQuantity,calcareousLime,waterScaleInhibitor,\n" +
            "commonActivatedCarbon,naclo,activatedCarbon,standardBox,activatedCarbonParticles,woodenPallets,lye,standardTray_1m,\n" +
            "causticSoda,standardTray_1_2m,urea,slagBag,hydrochloricAcid,flyAshBag,nahco3,tonBox,flour,steam,defoamer,dieselOil,\n" +
            "flocculant,naturalGas,softWaterReducingAgent,electricQuantity,softWaterScaleInhibitor,industrialWater,pH,tapWaterQuantity,waterReducingAgent \n" +
            "from t_pr_productionplan;";
    }
    window.open('exportExcelProductionPlan?name=' + name + '&sqlWords=' + sqlWords);
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
            if (last - event.timeStamp === 0) {
                searchProductionPlan();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchProductionPlan();      //
            }
        }, 600);
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
    if ($("#senior").is(':visible')) {
        data = {
            id: $.trim($("#search-id").val()),
            founder: $.trim($("#search-founder").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            checkStateItem: {
                dataDictionaryItemId: $("#search-state").val()
            },
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
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
                if (data.auxiliaryConsumption != null) {
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
                }
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
    var state = $(item).parent().prev().text();
    if (state == '新建' || state == '已驳回') {
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
                    if (data.auxiliaryConsumption != null) {
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
                    }
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
    }else if(state == "待审批" || state == "审批中"){
        alert("单据审批中，不可修改！");
    } else if(state == "审批通过"){
        alert("单据已审批，不可修改！");
    }else if(state == "已作废"){
        alert("单据已作废，不可修改！");
    }else{
        alert("单据不可修改！");
    }
}

/**
 * 提交功能
 */
function submit(item) {
    initSubmitFName(submitProductionPlan.name);
    var state = $(item).parent().prev().text();
    if (state == '待审批') {
        productionPlanId = getProductionPlanId(item);
        submit1(productionPlanId);
    } else if (state == '新建' || state == '已驳回') {
        alert("请确认后再进行提交操作！");
    } else {
        alert("单据不可提交！");
    }
}

function submit1(id) {
    publicSubmit(id,getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
    // $.ajax({
    //     type: "POST",
    //     url: "submitProductionPlan",
    //     async: false,
    //     data: {
    //         id: id
    //     },
    //     dataType: "json",
    //     success: function (result) {
    //         if (result.status == "success") {
    //             alert("提交成功！");
    //             window.location.reload();
    //         } else {
    //             alert(result.message);
    //         }
    //     },
    //     error: function (result) {
    //         console.log(result);
    //         alert("服务器异常!");
    //     }
    // });
}

function submitProductionPlan(id) {
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
    // var state = $(item).parent().prev().text();
    // productionPlanId = getProductionPlanId(item);
    // if (state == '审批中' || state == "已驳回" || state == "审批通过" ) {
    //     $.ajax({
    //         type: "POST",                            // 方法类型
    //         url: "getProductionPlan",                 // url
    //         async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
    //         data: {
    //             id: productionPlanId
    //         },
    //         dataType: "json",
    //         success: function (result) {
    //             if (result.data != undefined || result.status == "success" || result.data != null) {
    //                 var data = eval(result.data);
    //                 $("#advice").val(data.advice);
    //                 $('#examinationModal').modal('show');//手动触发模态框弹出
    //             } else {
    //                 alert(result.message);
    //             }
    //         },
    //         error: function (result) {
    //             console.log(result);
    //             alert("服务器异常!");
    //         }
    //     });
    // } else if (state == "新建" || state == "待审批") {
    //     alert("请提交后再进行审批操作！");
    // } else {
    //     alert("单据不可审批！");
    // }
    $("#approval").modal('show')
}

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(submitProductionPlan.name);
    initApprovalFName(approval1.name);
    initBakcFName(reject1.name);
    var id=$(item).parent().parent().children("td").eq(1).html();
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

function reject() {
    $('#rejectForm3').modal('show');
    $("#backContent").val($("#advice").val());
}

/**
 * 审批通过
 *
 * */
function approval1(id) {
    console.log($("#advice").val());
    console.log($("#passContent").val());
    var advice = $("#passContent").val();
    var productionPlan = {};
    productionPlan.id = id;
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
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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
function reject1(id) {
    var advice = $("#backContent").val();
    var productionPlan = {};
    productionPlan.id = id;
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
                    // alert(data.message);
                    // window.location.reload();
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
    var state = $(item).parent().prev().text();
    if (state == "新建" || state == "已驳回") {
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
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
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
    } else if(state == "待审批" || state == "审批中"){
        alert("单据审批中，不可作废！");
    } else if(state == "审批通过"){
        alert("单据已审批，不可作废！");
    }else {
        alert("单据不可作废！");
    }
}

/**
 * 删除
 * @param item
 */
function delete1(item) {
    var state = $(item).parent().prev().text();
    if (state == "新建" || state == "已驳回") {
        if (confirm("删除后不可恢复，确认删除？")) {
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
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
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
    } else if(state == "待审批" || state == "审批中"){
        alert("单据审批中，不可删除！");
    } else if(state == "审批通过"){
        alert("单据已审批，不可删除！");
    }else {
        alert("单据不可删除！");
    }
}

/**
 * 确认
 * @param item
 */
function confirm1(item) {
    var state = $(item).parent().prev().text();
    if(state == '新建' || state == '已驳回') {
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
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
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
    }else if(state == "待审批" || state == "审批中" || state == "审批通过"){
        alert("单据已确认！");
    } else if(state == "已作废"){
        alert("单据已作废，不可确认！");
    }
}

/**
 * 新增
 */
function addModal() {
    btn = 'add';
    var data = getCurrentUserData();
    console.log("data:");
    console.log(data);
    if (data != null)
        $("#modal-founder").val(data.username);  // 将创建人设置为当前登陆用户
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getCurrentUserInfo",              // url
    //     cache: false,
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined && result.status == "success") {
    //             var data = eval(result.data);
    //             console.log(data);
    //             // 各下拉框数据填充
    //             $("#modal-founder").val(data.username);  // 将创建人设置为当前登陆用户
    //         } else {
    //             console.log(result.message);
    //         }
    //     },
    //     error: function (result) {
    //         console.log(result);
    //     }
    // });
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
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
                        $("#addModal").modal("hide");  // 关闭打开的模态框
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
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
                        $("#addModal").modal("hide");  // 关闭打开的模态框
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
