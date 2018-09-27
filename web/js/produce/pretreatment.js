function loadThresholdList() {
    $("#week").text(getWeekDate());
}

function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    var week = parseInt(day / 7) + a;
    return year + "年" + month + "月" + day + "日";
}

/**
 * 全选复选框
 * */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1 = null;
var pretreatmentId = '';

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
            url: "totalPretreatmentRecord",                  // url
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
            url: "searchPretreatmentTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
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
    setPretreatmentList(result);
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
            url: "loadPagePretreatmentList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setPretreatmentList(result.data);
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
            url: "searchPretreatment",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setPretreatmentList(result.data);
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
                url: "loadPagePretreatmentList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPretreatmentList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchPretreatment",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setPretreatmentList(result.data);
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
function loadPagePretreatmentList() {
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
        url: "loadPagePretreatmentList",          // url
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

function setPretreatmentList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
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
                    // 预处理单号
                    $(this).html(obj.id);
                    break;
                case (1):
                    // 状态
                    $(this).html(obj.state.name);
                    break;
                case (2):
                    // 创建日期
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                case (3):
                    // 重量合计
                    $(this).html(obj.weightTotal);
                    break;
                case (4):
                    // 备注
                    $(this).html(obj.remarks);
                    break;
                case (5):
                    // 散装比例
                    $(this).html(obj.bulkProportion);
                    break;
                case (6):
                    // 残渣比例
                    $(this).html(obj.distillationProportion);
                    break;
                case (7):
                    // 废液比例
                    $(this).html(obj.wasteLiquidProportion);
                    break;
                case (8):
                    // 污泥比例
                    $(this).html(obj.sludgeProportion);
                    break;
                case (9):
                    // 破碎料比例
                    $(this).html(obj.crushingProportion);
                    break;
                case (10):
                    // 悬挂连比例
                    $(this).html(obj.suspensionProportion);
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
    //设置状态下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPretreatmentStateList",                  // url
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
    var name = 't_pr_pretreatment';
    var sqlWords = "select * from t_pr_pretreatment join t_pr_pretreatmentitem where pretreatmentId = id;";
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
    var filePath = 'Files/Templates/预处理单模板.xlsx';
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
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importPretreatmentExcel",              // url
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
function enterSearch(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchPretreatment();      //
    }
}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    // 主页
    $('#searchContent1').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchPretreatment();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchPretreatment();      //
            }
        },600);
    });
    // 新增页面
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchOutBoundOrder();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchOutBoundOrder();      //
            }
        },600);
    });
});

/**
 * 查询功能
 */
function searchPretreatment() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-state").val() == 0) state = "NewBuild";//新建
    if ($("#search-state").val() == 1) state = "Confirm";//已确认
    if ($("#search-state").val() == 2) state = "Invalid";//已作废
    if ($("#senior").is(':visible')) {
        data1 = {
            id: $.trim($("#search-id").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            state: state,
            page: page
        };
    }else{
        var keywords = $.trim($("#searchContent1").val());
        switch (keywords){
            case("新建"): keywords = "NewBuild";break;
            case("待审批"): keywords = "ToExamine";break;
            case("审批中"): keywords = "Examining";break;
            case("审批通过"): keywords = "Approval";break;
            case("已驳回"): keywords = "Backed";break;
            case("驳回"): keywords = "Backed";break;
            case("已作废"): keywords = "Invalid";break;
            case("作废"): keywords = "Invalid";break;
            case("已确认"): keywords = "Confirm";break;
            case("确认"): keywords = "Confirm";break;
        }
        data1={
            page:page,
            keywords: keywords
        }
    }
    console.log(data1);
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchPretreatment",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
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
                alert("服务器错误！");
            }
        });
    }
}


///////////////////////////
/**
 * 获取预处理单号
 * @param item
 * @returns {string}
 */
function getPretreatmentId(item) {
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

function getPretreatmentId1(item) {
    return item.firstElementChild.innerHTML;
}

/**
 * 双击查看
 * @param item
 */
function toView1(item) {
    var id = getPretreatmentId1(item);
    showViewModal(id);
}

/**
 * 单击查看
 * @param item
 */
function toView(item) {
    var id = getPretreatmentId(item);
    showViewModal(id);
}

/**
 * 显示查看模态框
 * @param id
 */
function showViewModal(id) {
    $(".newLine").remove();
    $.ajax({
        type: "POST",
        url: "getPretreatmentById",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                //设置数据
                var data = eval(result.data);
                console.log(result);
                setViewDataClone(result.data);
                $("#view-pretreatmentId").text(data.id);
                $("#view-remarks").text(data.remarks);
                $("#view-weightTotal").text(data.weightTotal);
                $("#view-calorificTotal").text(data.calorificTotal);
                $("#view-ashPercentageTotal").text(data.ashPercentageTotal);
                $("#view-wetPercentageTotal").text(data.wetPercentageTotal);
                $("#view-volatileNumberTotal").text(data.volatileNumberTotal);
                $("#view-chlorinePercentageTotal").text(data.chlorinePercentageTotal);
                $("#view-sulfurPercentageTotal").text(data.sulfurPercentageTotal);
                $("#view-phTotal").text(data.phTotal);
                $("#view-phosphorusPercentageTotal").text(data.phosphorusPercentageTotal);
                $("#view-fluorinePercentageTotal").text(data.fluorinePercentageTotal);
                $("#view-distillationProportion").text(data.distillationProportion);
                $("#view-wasteLiquidProportion").text(data.wasteLiquidProportion);
                $("#view-sludgeProportion").text(data.sludgeProportion);
                $("#view-bulkProportion").text(data.bulkProportion);
                $("#view-crushingProportion").text(data.crushingProportion);
                $("#view-suspensionProportion").text(data.suspensionProportion);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#viewModal").modal('show');
}

/**
 * 为查看模态框设置克隆数据
 * @param result
 */
function setViewDataClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone");
    $.each(result.pretreatmentItemList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 序号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 产废单位
                    $(this).html(obj.produceCompanyName);
                    break;
                case (2):
                    // 指标要求及来源
                    $(this).html(obj.requirements);
                    break;
                case (3):
                    // 危废名称
                    $(this).html(obj.wastes.name);
                    break;
                case (4):
                    // 比例
                    $(this).html(obj.proportion);
                    break;
                case (5):
                    // 重量（吨）
                    $(this).html(obj.wastes.weight);
                    break;
                case (6):
                    // 危废热值
                    $(this).html(obj.wastes.calorific);
                    break;
                case (7):
                    // 灰分
                    $(this).html(obj.wastes.ashPercentage);
                    break;
                case (8):
                    // 水分
                    $(this).html(obj.wastes.wetPercentage);
                    break;
                case (9):
                    // 挥发份
                    $(this).html(obj.wastes.volatileNumber);
                    break;
                case (10):
                    // 氯
                    $(this).html(obj.wastes.chlorinePercentage);
                    break;
                case (11):
                    // 硫
                    $(this).html(obj.wastes.sulfurPercentage);
                    break;
                case (12):
                    // PH
                    $(this).html(obj.wastes.ph);
                    break;
                case (13):
                    // P
                    $(this).html(obj.wastes.phosphorusPercentage);
                    break;
                case (14):
                    // F
                    $(this).html(obj.wastes.fluorinePercentage);
                    break;
                case (15):
                    // 备注
                    $(this).html(obj.wastes.remarks);
                    break;
                case (16):
                    // 处置方式
                    $(this).html(obj.wastes.processWay.name);
                    break;
                case (17):
                    // 进料方式
                    $(this).html(obj.wastes.handleCategory.name);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.addClass("newLine");
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 作废功能
 * @param item
 */
function invalid(item) {
    var id = getPretreatmentId(item);
    if (confirm("确认作废？")) {
        $.ajax({
            type: "POST",
            url: "invalidPretreatment",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("作废成功!");
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
 * 设置属性调整下拉框数据
 */
function setAdjustSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPretreatmentSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 下拉框数据填充
                var state = $(".adjust-processWay");
                state.children().remove();
                $.each(data.processWayList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
                var state1 = $(".adjust-handleCategory");
                state1.children().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state1.append(option);
                });
                state1.get(0).selectedIndex = -1;
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
 * 属性调整模态框显示
 * @param item
 */
function showAdjustModal(item) {
    //清楚之前克隆行
    $(".newAjust").remove();
    pretreatmentId = getPretreatmentId(item);
    //填充数据
    $.ajax({
        type: "POST",
        url: "getPretreatmentById",
        async: false,
        data: {
            id: pretreatmentId
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                //设置数据
                var data = eval(result.data);
                length = data.pretreatmentItemList.length;
                //填充下拉数据框数据
                setAdjustSelectedList();
                setAdjustClone(data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#adjustModal").modal('show');
}

function setAdjustClone(result) {
    var tr = $("#adjustClone").find("tr:first");
    //tr.siblings().remove();
    var num = 0;
    $.each(result.pretreatmentItemList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 序号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 预处理编号
                    $(this).html(result.id);
                    break;
                case (2):
                    // 产废单位
                    $(this).html(obj.produceCompanyName);
                    break;
                case (3):
                    // 指标要求及来源
                    $(this).html(obj.requirements);
                    break;
                case (4):
                    // 危废名称
                    $(this).html(obj.wastes.name);
                    break;
                case (5):
                    // 比例
                    $(this).html(obj.proportion);
                    break;
                case (6):
                    // 备注
                    $(this).html(obj.wastes.remarks);
                    break;
                case (7):
                    // 处置方式
                    $(this).find("select").val(obj.wastes.processWay.index - 1);
                    break;
                case (8):
                    // 进料方式
                    $(this).find("select").val(obj.wastes.handleCategory.index - 1);
                    break;
            }
        });
        clonedTr.children().find("select").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num + 1);
            $(this).prop('id', newId);
        });
        num++;
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.addClass("newAjust");
        clonedTr.insertBefore(tr);
        // 隐藏无数据的tr
        tr.hide();
    });
}

/**
 * 属性调整功能
 */
function adjust() {
    var pretreatment = {};
    $.ajax({
        type: "POST",
        url: "getPretreatmentById",
        async: false,
        data: {
            id: pretreatmentId
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                var data = eval(result.data);
                pretreatment['pretreatmentItemList'] = [];
                pretreatment.id = pretreatmentId;
                for (var i = 0; i < data.pretreatmentItemList.length; i++) {
                    var $i = i + 1;
                    var wastes = {};
                    wastes.processWay = $("#adjust" + $i + "-processWay").find("option:selected").val();
                    wastes.handleCategory = $("#adjust" + $i + "-handleCategory").find("option:selected").val();
                    var pretreatmentItem = {};
                    pretreatmentItem.itemId = data.pretreatmentItemList[i].itemId;
                    pretreatmentItem.wastes = wastes;
                    pretreatmentItem.proportion = data.pretreatmentItemList[i].proportion;
                    pretreatment.pretreatmentItemList.push(pretreatmentItem);
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
    $.ajax({
        type: "POST",
        url: "adjustPretreatment",
        async: false,
        data: JSON.stringify(pretreatment),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.status == "success") {
                alert("属性调整成功!");
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

//////////////////////////////新增页面//////////////////////////
//
var pretreatment = {};        //新增预处理单
var num = 0;               //克隆行数
var i1 = 0;           //焚烧工单序号
/**
 * 设置预处理单列表数据
 */
function loadOutBoundOrderList() {
    $("#createDate").val(getWeekDate());
    i1 = 0;                         //刷新页面时重新计数
    //获取数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadOutBoundList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setOutBoundOrderList(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSeniorSelectedList1();
}

/**
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList1() {
    //设置状态下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "setOutBoundOrderSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search1-checkState");
                state.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
                var state1 = $("#search1-recordState");
                state1.children().remove();
                $.each(data.recordStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state1.append(option);
                });
                state1.get(0).selectedIndex = -1;
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
 * 设置出库单数据
 * @param result
 */
function setOutBoundOrderList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone1");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        //已作废的数据不显示
        if(item.checkState.name === '已作废' || item.checkState.name === "已处理"){
            return true;
        }
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case(1):
                    // 出库单号
                    $(this).html(obj.outboundOrderId);
                    break;
                case (2):
                    // 部门
                    $(this).html(obj.departmentName);
                    break;
                case (3):
                    // 出库日期
                    $(this).html(getDateStr(obj.outboundDate));
                    break;
                case (4):
                    // 仓库号
                    if(obj.wareHouse != null)
                    $(this).html(obj.wareHouse.wareHouseId);
                    break;
                case (5):
                    // 记录状态
                    if(obj.recordState != null)
                    $(this).html(obj.recordState.name);
                    break;
                case (6):
                    // 单据状态
                    if(obj.checkState != null)
                        $(this).html(obj.checkState.name);
                    break;
                case (7):
                    // 转移联单号
                    $(this).html(obj.transferDraftId);
                    break;
                case (8):
                    // 产废单位
                    if(obj.client != null)
                    $(this).html(obj.client.companyName);
                    break;
                case (9):
                    // 危废名称
                    if(obj.laboratoryTest != null)
                    $(this).html(obj.laboratoryTest.wastesName);
                    break;
                case(10):
                    // 危废重量
                    $(this).html(obj.outboundNumber);
                    break;
                case(11):
                    // 备注
                    $(this).html(obj.remarks);
                    break;
                case(12):
                    // 处置方式
                    if(obj.processWay != null)
                     $(this).html(obj.processWay.name);
                    break;
                case(13):
                    // 进料方式
                    if(obj.handelCategory != null)
                    $(this).html(obj.handelCategory.name);
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
 * 获取当前预处理单号
 * @returns {string}
 */
function getCurrentPretreatmentId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentPretreatmentId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前预处理单号失败！");
        }
    });
    return id;
}

var outBoundOrderIdArray = [];

/**
 * 添加预处理单
 */
function confirmInsert() {
// 定义预处理单，存储勾选出库单
    $(".newLine").remove();
    pretreatment = {};
    outBoundOrderIdArray = [];
    var pretreatmentItemList = [];
    var weightTotal = 0;
    var nameList = [];                // 用于存放处置方式、进料方式的name
    pretreatment.id = getCurrentPretreatmentId();
    var i = 0;  //序号
    // 遍历计划单表格行，获取勾选的计划列表
    $("#outBoundOrderData").children().not("#clone1").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var outBoundOrderId1 = $(this).find("td[name='outBoundOrderId']").text();
            console.log(outBoundOrderId1);
            if ($.inArray(outBoundOrderId1, outBoundOrderIdArray) == -1) {
                i++;
                outBoundOrderIdArray.push(outBoundOrderId1);
                //根据Id查找数据并进行赋值
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getByOutBoundOrderId",          // url
                    async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: {
                        outboundOrderId: outBoundOrderId1
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            var data = eval(result.data[0]);
                            //将数据存到数组中，然后统一赋值
                            console.log("数据为：");
                            console.log(data);
                            var pretreatmentItem = {};
                            pretreatmentItem.serialNumber = i;
                            pretreatmentItem.pretreatmentId = pretreatment.id;
                            pretreatmentItem.outboundOrderId = outBoundOrderId1;
                            pretreatmentItem.produceCompanyName = data.client.companyName;
                            weightTotal += data.outboundNumber;          // 总重量累加
                            var wastes = {};
                            wastes.name = data.laboratoryTest.wastesName;
                            wastes.weight = data.outboundNumber;
                            wastes.calorific = data.laboratoryTest.heatAverage;
                            wastes.ashPercentage = data.laboratoryTest.ashAverage;
                            wastes.wetPercentage = data.laboratoryTest.waterContentAverage;
                            wastes.volatileNumber = data.laboratoryTest.volatileNumber;
                            wastes.chlorinePercentage = data.laboratoryTest.chlorineContentAverage;
                            wastes.sulfurPercentage = data.laboratoryTest.sulfurContentAverage;
                            wastes.ph = data.laboratoryTest.phAverage;
                            wastes.phosphorusPercentage = data.laboratoryTest.phosphorusContentAverage;
                            wastes.fluorinePercentage = data.laboratoryTest.fluorineContentAverage;
                            wastes.remarks = data.remarks;
                            wastes.handleCategory = data.handelCategory.index;
                            wastes.processWay = data.processWay.index - 1;
                            nameList.push(data.handelCategory.name);
                            nameList.push(data.processWay.name);
                            pretreatmentItem.wastes = wastes;
                            pretreatmentItemList.push(pretreatmentItem);
                        } else {
                            console.log(result.message);
                        }
                    },
                    error: function (result) {
                        console.log("error: " + result);
                        console.log("获取当前预处理单号失败！");
                    }
                });
            }
        }
    });
    ///////分段
    // 遍历js对象数组列表，循环增加预处理单条目列表
    //计算总重量
    num = 0;
    pretreatment.weightTotal = weightTotal;
    pretreatment.outBoundOrderIdList = outBoundOrderIdArray;
    var volatileNumberTotal = 0;
    var calorificTotal = 0;
    var ashPercentageTotal = 0;
    var wetPercentageTotal = 0;
    var chlorinePercentageTotal = 0;
    var sulfurPercentageTotal = 0;
    var phTotal = 0;
    var phosphorusPercentageTotal = 0;
    var fluorinePercentageTotal = 0;
    var distillationProportion = 0;
    var wasteLiquidProportion = 0;
    var sludgeProportion = 0;
    var bulkProportion = 0;
    var crushingProportion = 0;
    var suspensionProportion = 0;
    var j1 = 0;
    for (var j = 0; j < pretreatmentItemList.length; j++) {
        //计算比例、总计等数值
        pretreatmentItemList[j].proportion = pretreatmentItemList[j].wastes.weight / pretreatment.weightTotal;
        volatileNumberTotal += pretreatmentItemList[j].wastes.volatileNumber;
        calorificTotal += pretreatmentItemList[j].wastes.calorific;
        ashPercentageTotal += pretreatmentItemList[j].wastes.ashPercentage;
        wetPercentageTotal += pretreatmentItemList[j].wastes.wetPercentage;
        chlorinePercentageTotal += pretreatmentItemList[j].wastes.chlorinePercentage;
        sulfurPercentageTotal += pretreatmentItemList[j].wastes.sulfurPercentage;
        phTotal += pretreatmentItemList[j].wastes.ph;
        phosphorusPercentageTotal += pretreatmentItemList[j].wastes.phosphorusPercentage;
        fluorinePercentageTotal += pretreatmentItemList[j].wastes.fluorinePercentage;
        //计算进料方式比例
        if (nameList[j1] === "污泥" || pretreatmentItemList[j].wastes.handleCategory === 1)
            sludgeProportion += pretreatmentItemList[j].proportion;
        if (nameList[j1] === "废液" || pretreatmentItemList[j].wastes.handleCategory === 2)
            wasteLiquidProportion += pretreatmentItemList[j].proportion;
        if (nameList[j1] === "散装料" || pretreatmentItemList[j].wastes.handleCategory === 3)
            bulkProportion += pretreatmentItemList[j].proportion;
        if (nameList[j1] === "破碎料" || pretreatmentItemList[j].wastes.handleCategory === 4)
            crushingProportion += pretreatmentItemList[j].proportion;
        if (nameList[j1] === "精馏残渣" || pretreatmentItemList[j].wastes.handleCategory === 5)
            distillationProportion += pretreatmentItemList[j].proportion;
        if (nameList[j1] === "悬挂连" || pretreatmentItemList[j].wastes.handleCategory === 6)
            suspensionProportion += pretreatmentItemList[j].proportion;
        //将数据赋值到预处理单
        var tr = $("#pretreatmentClonrTr");
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        //更新id
        clonedTr.children().find("input").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num + 1);
            $(this).prop('id', newId);
        });
        num++;
        // 循环遍历cloneTr的每一个td元素，并赋值
        var obj = eval(pretreatmentItemList[j]);
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    //序号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    //产废单位
                    $(this).html(obj.produceCompanyName);
                    break;
                case(2):
                    //指标要求及来源
                    break;
                case (3):
                    //危废名称
                    $(this).html(obj.wastes.name);
                    break;
                case (4):
                    //比例
                    $(this).html(obj.proportion);
                    break;
                case (5):
                    //重量
                    $(this).html(obj.wastes.weight);
                    break;
                case (6):
                    //危废热值
                    $(this).html(obj.wastes.calorific);
                    break;
                case (7):
                    //灰分
                    $(this).html(obj.wastes.ashPercentage);
                    break;
                case (8):
                    //水分
                    $(this).html(obj.wastes.wetPercentage);
                    break;
                case (9):
                    //挥发份
                    $(this).html(obj.wastes.volatileNumber);
                    break;
                case (10):
                    //氯
                    $(this).html(obj.wastes.chlorinePercentage);
                    break;
                case (11):
                    //硫
                    $(this).html(obj.wastes.sulfurPercentage);
                    break;
                case (12):
                    //PH
                    $(this).html(obj.wastes.ph);
                    break;
                case (13):
                    //P
                    $(this).html(obj.wastes.phosphorusPercentage);
                    break;
                case (14):
                    //F
                    $(this).html(obj.wastes.fluorinePercentage);
                    break;
                case (15):
                    //备注
                    $(this).html(obj.wastes.remarks);
                    break;
                case (16):
                    //处置方式
                    $(this).html(nameList[j1 + 1]);
                    break;
                case (17):
                    //进料方式
                    $(this).html(nameList[j1]);
                    j1 += 2;
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.addClass("newLine");
        clonedTr.insertBefore(tr);
        //隐藏无数据的tr
        tr.hide();
    }
    pretreatment.volatileNumberTotal = volatileNumberTotal;
    pretreatment.calorificTotal = calorificTotal;
    pretreatment.ashPercentageTotal = ashPercentageTotal;
    pretreatment.wetPercentageTotal = wetPercentageTotal;
    pretreatment.chlorinePercentageTotal = chlorinePercentageTotal;
    pretreatment.sulfurPercentageTotal = sulfurPercentageTotal;
    pretreatment.phTotal = phTotal;
    pretreatment.phosphorusPercentageTotal = phosphorusPercentageTotal;
    pretreatment.fluorinePercentageTotal = fluorinePercentageTotal;
    pretreatment.distillationProportion = distillationProportion;
    pretreatment.wasteLiquidProportion = wasteLiquidProportion;
    pretreatment.sludgeProportion = sludgeProportion;
    pretreatment.bulkProportion = bulkProportion;
    pretreatment.crushingProportion = crushingProportion;
    pretreatment.suspensionProportion = suspensionProportion;
    pretreatment.pretreatmentItemList = pretreatmentItemList;
    $("#pretreatmentId").text(pretreatment.id);
    $("#weightTotal").text(pretreatment.weightTotal);
    $("#calorificTotal").text(pretreatment.calorificTotal);
    $("#ashPercentageTotal").text(pretreatment.ashPercentageTotal);
    $("#wetPercentageTotal").text(pretreatment.wetPercentageTotal);
    $("#volatileNumberTotal").text(pretreatment.volatileNumberTotal);
    $("#chlorinePercentageTotal").text(pretreatment.chlorinePercentageTotal);
    $("#sulfurPercentageTotal").text(pretreatment.sulfurPercentageTotal);
    $("#phTotal").text(pretreatment.phTotal);
    $("#phosphorusPercentageTotal").text(pretreatment.phosphorusPercentageTotal);
    $("#fluorinePercentageTotal").text(pretreatment.fluorinePercentageTotal);
    $("#distillationProportion").text(pretreatment.distillationProportion);
    $("#wasteLiquidProportion").text(pretreatment.wasteLiquidProportion);
    $("#sludgeProportion").text(pretreatment.sludgeProportion);
    $("#bulkProportion").text(pretreatment.bulkProportion);
    $("#crushingProportion").text(pretreatment.crushingProportion);
    $("#suspensionProportion").text(pretreatment.suspensionProportion);
}

/**
 * 将预处理单数据添加到数据库
 */
function save() {
    //获取输入的指标要求及来源数据、预处理单备注数据,重新定义进料方式、处置方式
    for (var i = 0; i < pretreatment.pretreatmentItemList.length; i++) {
        var $i = i + 1;
        pretreatment.pretreatmentItemList[i].requirements = $("#pretreatment" + $i + "-requirements").val();
    }
    pretreatment.remarks = $("#remarks").val();
    console.log("要添加的数据为:");
    console.log(pretreatment);
    //将预处理单数据插入到数据库
    $.ajax({
        type: "POST",
        url: "addPretreatment",
        async: false,
        data: JSON.stringify(pretreatment),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.status == "success") {
                console.log(result.message);
                if(confirm("预处理单添加成功，是否返回主页？"))
                   window.location.href = "pretreatmentList.html";
                // else window.location.reload();
            } else alert(result.message);
        },
        error: function (result) {
            console.log(result.message);
            alert("预处理单添加失败！");
        }
    });
}

/**
 * 回车查询
 */
function enterSearchItem(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchOutBoundOrder();      //
    }
}

/**
 * 新增页面查找出库单功能
 */
function searchOutBoundOrder() {
    var data = {};
    isSearch = true;
    var recordState = null;
    if ($("#search1-recordState").val() === 0) recordState = "Delete";//删除
    if ($("#search1-recordState").val() === 1) recordState = "Usable";//可用
    if ($("#search1-recordState").val() === 2) recordState = "Disabled";//不可用
    var checkState = null;
    if ($("#search1-checkState").val() === 0) checkState = "NewBuild";//新建
    if ($("#search1-checkState").val() === 1) checkState = "ToPick";//带领料
    if ($("#search1-checkState").val() === 2) checkState = "Picked";//已领料
    if ($("#search1-checkState").val() === 3) checkState = "OutBounded";//已出库
    if ($("#search1-checkState").val() === 4) checkState = "Invalid";//作废
    var client = {};
    client.companyName = $.trim($("#search1-client").val());
    var wareHouse = {};
    wareHouse.wareHouseId = $.trim($("#search1-wareHouseId").val());
    if ($("#senior1").is(':visible')) {
        data = {
            wareHouse: wareHouse,
            departmentName: $.trim($("#search1-departmentName").val()),
            startDate: $("#search1-startDate").val(),
            endDate: $("#search1-endDate").val(),
            outboundOrderId: $.trim($("#search1-outboundOrderId").val()),
            recordState: recordState,
            checkState: checkState,
            transferDraftId: $.trim($("#search1-transferDraftId").val()),
            client: client
        };
    }else {
        var keywords = $.trim($("#searchContent").val());
        switch (keywords){
            case("删除"): keywords = "Delete";break;
            case("可用"): keywords = "Usable";break;
            case("不可用"): keywords = "Disabled";break;
            case("新建"): keywords = "NewBuild";break;
            case("待领料"): keywords = "ToPick";break;
            case("已领料"): keywords = "Picked";break;
            case("已出库"): keywords = "OutBounded";break;
            case("出库"): keywords = "OutBounded";break;
            case("已作废"): keywords = "Invalid";break;
            case("作废"): keywords = "Invalid";break;
            case("污泥"): keywords = "Sludge";break;
            case("废液"): keywords = "WasteLiquid";break;
            case("散装料"): keywords = "Bulk";break;
            case("破碎料"): keywords = "Crushing";break;
            case("精馏残渣"): keywords = "Distillation";break;
            case("悬挂连"): keywords = "Suspension";break;
            case("焚烧"): keywords = "Burning";break;
            case("填埋"): keywords = "Landfill";break;
        }
        data={
            keywords: keywords
        }
    }
    console.log("data:");
    console.log(data);
    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchOutBoundOrder",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setOutBoundOrderList(result.data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
}
