//////////////////领料单////////////////////
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

function getDayDate(date) {
    //获取时间
    var obj = date;
    if (obj == null) return "";
    var year = (parseInt(obj.year) + 1900).toString();
    var mouth = parseInt((obj.month) + 1).toString();
    if (mouth.length != 2) {
        mouth = 0 + mouth;
    }
    var day = parseInt((obj.date)).toString();
    if (day.length != 2) {
        day = 0 + day;
    }
    var time1 = year + "年" + mouth + "月" + day + "日";
    return time1;
}

/**
 * 重置功能
 */
function reset() {
    // $("#senior").find("input").val("");
    // $("#senior").find("select").get(0).selectedIndex = -1;
    // $("#searchContent").val("");
    window.location.reload();
}

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
            url: "totalIngredientsReceiveRecord",                  // url
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
            url: "searchIngredientsReceiveTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
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
    setList(result);
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
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageIngredientsReceiveList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setList(result.data);
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
            url: "searchIngredientsReceive",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setList(result.data);
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
                url: "loadPageIngredientsReceiveList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setList(result.data);
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
                url: "searchIngredientsReceive",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setList(result.data);
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
        url: "loadPageIngredientsReceiveList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
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
    isSearch = false;
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

function setList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    var serialNumber = 0;    // 序号
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 领料单号
                    $(this).html(obj.id);
                    break;
                case (1):
                    // 部门
                    $(this).html(obj.department);
                    break;
                case (2):
                    // 领料单状态
                    $(this).html(obj.state.name);
                    break;
                case (3):
                    // 总数量
                    $(this).html(obj.totalAmount);
                    break;
                case (4):
                    // 主管副总经理
                    $(this).html(obj.vicePresident);
                    break;
                case (5):
                    // 仓库部门主管
                    $(this).html(obj.warehouseSupervisor);
                    break;
                case (6):
                    // 保管员
                    $(this).html(obj.keeper);
                    break;
                case (7):
                    // 领料部门主管
                    $(this).html(obj.pickingSupervisor);
                    break;
                case (8):
                    // 领料人
                    $(this).html(obj.pickingMan);
                    break;
                case (9):
                    // 创建日期
                    $(this).html(getDateStr(obj.creationDate));
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
        url: "getIngredientsInSeniorSelectedList",                  // url
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
    var name = 't_pr_ingredients_receive';
    var sqlWords = "select * from t_pr_ingredients_receive as a join t_pr_ingredients as b where receiveId = id;";
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
    var filePath = 'Files/Templates/辅料备件领料单模板.xls';
    var r = confirm("是否下载模板?");
    if (r === true) {
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
            url: "importIngredientsReceiveExcel",              // url
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
        searchData();      //
    }
}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    // 主页
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },600);
    });
    // 新增页面
    $('#searchContent1').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                search1();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search1();      //
            }
        },600);
    });
});

/**
 * 查询功能
 */
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-state").val() == 0) state = "NewBuild";//新建
    if ($("#search-state").val() == 1) state = "Invalid";//已作废
    if ($("#search-state").val() == 2) state = "OutBounded";//已出库
    var keywords = $.trim($("#searchContent").val());
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
        case ("已出库"): keywords = "OutBounded";break;
        case ("出库"): keywords = "OutBounded";break;
    }
    if ($("#senior").is(':visible')) {
        data1 = {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            id: $.trim($("#search-Id").val()),
            department: $.trim($("#search-department").val()),
            state: state,
            page: page
        };
    } else {
        data1 = {
            keywords: keywords,
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchIngredientsReceive",                 // url
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

/**
 * 获取单号(双击)
 * @param item
 * @returns {string}
 */
function getIngredientsId1(item) {
    return item.firstElementChild.innerHTML;
}

/**
 * 获取单号（单击）
 * @param item
 * @returns {*}
 */
function getIngredientsId(item) {
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

/**
 * 单击查看功能
 * @param item
 */
function toView(item) {
    var id = getIngredientsId(item);
    showViewModal(id);
}

/**
 * 双击查看功能
 * @param item
 */
function toView1(item) {
    var id = getIngredientsId1(item);
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
        url: "getIngredientsReceiveById",
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
                setViewClone(result.data);
                $("#view-id").text(data.id);
                $("#view-department").text(data.department);
                $("#view-creationDate").text(getDayDate(data.creationDate));
                $("#view-fileId").text(data.fileId);
                $("#view-totalAmount").text(data.totalAmount);
                $("#view-vicePresident").text(data.vicePresident);
                $("#view-warehouseSupervisor").text(data.warehouseSupervisor);
                $("#view-keeper").text(data.keeper);
                $("#view-pickingSupervisor").text(data.pickingSupervisor);
                $("#view-pickingMan").text(data.pickingMan);
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
function setViewClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone");
    $.each(result.ingredientsList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        $("#view-unit").text(item.unit);
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 编号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 物品名称
                    $(this).html(obj.name);
                    break;
                case (2):
                    // 规格
                    $(this).html(obj.specification);
                    break;
                case (3):
                    // 单位（KG）
                    $(this).html(obj.unit);
                    break;
                case (4):
                    // 数量
                    $(this).html(obj.receiveAmount);
                    break;
                case (5):
                    // 附注
                    $(this).html(obj.remarks);
                    break;
                case (6):
                    // 仓库
                    $(this).html(obj.wareHouseName);
                    break;
                case (7):
                    // 物品状态
                    $(this).html(obj.ingredientState.name);
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
 */
function invalid(item) {
    var id = getIngredientsId(item);
    if (confirm("是否作废？")) {
        $.ajax({
            type: "POST",
            url: "invalidIngredientsReceive",
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
 * 提示框自动关闭,待完善
 */
function divFadeAlert() {
    console.log("alert!");
    var hidvalue_str = $('#hidvalue').val();
    var divWidth = 100;
    var divHeight = 100;
    var iLeft = ($(window).width() - divWidth) / 2;
    var iTop = ($(window).height() - divHeight) / 2 + $(document).scrollTop();
    var divhtml = $("<div>" + hidvalue_str + "</div>").css({
        position: 'absolute',
        top: iTop + 'px',
        left: iLeft + 'px',
        display: 'none',
        width: divWidth + 'px',
        height: divHeight + 'px'
    });
    divhtml.appendTo('body').fadeIn();
    divhtml.appendTo('body').fadeOut(3000);
}

/////////////领料单新增页面////////////////////////
/**
 * 获取当前时间
 * @returns {string}  xxxx年xx月xx日
 */
function getcurrentDaydate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    return year + "年" + month + "月" + day + "日";
}

function loadInventoryList() {
    $("#view-id").text(getCurrentIngredientsReceiveId());
    $("#creationDate").text(getcurrentDaydate());
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getIngredientsInventoryList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setInventoryList(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取失败");
        }
    });
}

/**
 * 设置库存量列表数据
 * @param result
 */
function setInventoryList(result) {
    var tr = $("#cloneTr1");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if (item.amount > 0) {
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 物品编号
                    case (1):
                        $(this).html(obj.itemId);
                        break;
                    // 物品名称
                    case (2):
                        $(this).html(obj.name);
                        break;
                    // 所在仓库
                    case (3):
                        $(this).html(obj.wareHouseName);
                        break;
                    // 库存量
                    case (4):
                        $(this).html(obj.amount);
                        break;
                    // 单位
                    case (5):
                        $(this).html(obj.unit);
                        break;
                    case(6):
                        //规格
                        $(this).html(obj.specification);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.insertBefore(tr);
            clonedTr.removeAttr('id');
        }
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 获取当前领料单号
 * @returns {string}
 */
function getCurrentIngredientsReceiveId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentIngredientsReceiveId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前领料单号失败！");
        }
    });
    return id;
}

var ingredientsIdArray = [];
var ingredientsReceive;
var totalReceiveAmount = 0;

/**
 * 添加领料单
 */
function confirmInsert() {
    $(".newLine").remove();
    ingredientsReceive = {};
    ingredientsIdArray = [];
    totalReceiveAmount = 0;
    var ingredientsList = [];
    ingredientsReceive.id = getCurrentIngredientsReceiveId();
    var i = 0;  //序号
    // 遍历库存列表，生成领料单
    $("#ingredientsInventoryData").children().not("#cloneTr1").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var ingredientsId1 = $(this).find("td[name='itemId']").text();
            if ($.inArray(ingredientsId1, ingredientsIdArray) == -1) {
                i++;
                ingredientsIdArray.push(ingredientsId1);
                var ingredients = {};
                ingredients.name = $(this).find("td[name='name']").text();
                ingredients.serialNumber = i;
                ingredients.specification = $(this).find("td[name='specification']").text();
                ingredients.wareHouseName = $(this).find("td[name='wareHouseName']").text();
                ingredients.amount = $(this).find("td[name='amount']").text();
                ingredients.unit = $(this).find("td[name='unit']").text();
                ingredients.id = ingredientsReceive.id;
                ingredients.receiveAmount = $(this).find("td[name='amount']").text();
                ingredientsList.push(ingredients);
                var receiveAmount = parseFloat(ingredients.receiveAmount);
                $("#total-unit").text("吨");
                if (ingredients.unit === "千克" || ingredients.unit === "kg" || ingredients.unit === "KG") {
                    receiveAmount = receiveAmount / 1000; // 单位换算
                    totalReceiveAmount += receiveAmount;
                } else if (ingredients.unit === "吨" || ingredients.unit === "t" || ingredients.unit === "T")
                    totalReceiveAmount += receiveAmount;
                }
            }
    });
    //将数据遍历赋值到领料单中
    ingredientsReceive.totalAmount = totalReceiveAmount;
    var tr = $("#clone3");
    var num = 0;
    $.each(ingredientsList, function (index, item) {
        console.log(ingredientsList);
        num++;
        var obj = eval(item);
        var clonedTr = tr.clone();
        //更新id/name
        clonedTr.children().find("input,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
            var name = $(this).prop('name');
            var newName = name.replace(/[0-9]\d*/, num);
            $(this).prop('name', newName);
        });
        clonedTr.show();
        clonedTr.find("td[name='serialNumber']").text(obj.serialNumber);
        clonedTr.find("td[name='name']").text(obj.name);
        clonedTr.find("td[name='specification']").text(obj.specification);
        clonedTr.find("td[name='unit']").text(obj.unit);
        clonedTr.find("input[name='receiveAmount']").val(obj.amount);
        clonedTr.find("td[name='amount']").text(obj.amount);
        clonedTr.find("td[name='wareHouseName']").text(obj.wareHouseName);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    $("#total-Amount").text(totalReceiveAmount);
    tr.hide();
    ingredientsReceive.ingredientsList = ingredientsList;
}

/**
 * 即时计算总量
 */
function calculateTotalReceiveAmount() {
    totalReceiveAmount = 0;
    var ListCount = $("input[name^='receiveAmount']").length;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var receiveAmount = parseFloat($("#receiveAmount" + $i).val());
        ingredientsReceive.ingredientsList[i - 1].receiveAmount = $("#receiveAmount" + $i).val();
        if ($("#receiveAmount" + $i).val() < ingredientsReceive.ingredientsList[i - 1].amount) ingredientsReceive.ingredientsList[i - 1].notReceiveAmount = 1;
        else if ($("#receiveAmount" + $i).val() == ingredientsReceive.ingredientsList[i - 1].amount) ingredientsReceive.ingredientsList[i - 1].notReceiveAmount = 0;
        if (ListCount > 2) {
            if (ingredientsReceive.ingredientsList[i - 1].unit === "千克" || ingredientsReceive.ingredientsList[i - 1].unit === "kg" || ingredientsReceive.ingredientsList[i - 1].unit === "KG") {
                receiveAmount = receiveAmount / 1000; // 单位换算
                totalReceiveAmount += receiveAmount;
            } else if (ingredientsReceive.ingredientsList[i - 1].unit === "吨" || ingredientsReceive.ingredientsList[i - 1].unit === "t" || ingredientsReceive.ingredientsList[i - 1].unit === "T")
                totalReceiveAmount += receiveAmount;
        }else totalReceiveAmount += receiveAmount;
        console.log($("#receiveAmount" + $i).val());
        console.log(ingredientsReceive.ingredientsList[i - 1].amount);
        if (parseFloat($("#receiveAmount" + $i).val()) > parseFloat(ingredientsReceive.ingredientsList[i - 1].amount)) {
            alert("超出库存量，请重新确认领料数！");
            return;
        }
    }
    $("#total-Amount").text(totalReceiveAmount);
    ingredientsReceive.totalAmount = totalReceiveAmount;
}

//全选复选框
function allSelect() {
    var isChecked = $('#allSel1').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}

/**
 * 保存
 */
function save() {
    //获取输入的数据
    ingredientsReceive.department = $("#department").val();
    ingredientsReceive.fileId = $("#fileId").val();
    ingredientsReceive.vicePresident = $("#vicePresident").val();
    ingredientsReceive.warehouseSupervisor = $("#warehouseSupervisor").val();
    ingredientsReceive.keeper = $("#keeper").val();
    ingredientsReceive.pickingSupervisor = $("#pickingSupervisor").val();
    ingredientsReceive.pickingMan = $("#pickingMan").val();
    for (var i = 0; i < ingredientsReceive.ingredientsList.length; i++) {
        var $i = i + 1;
        ingredientsReceive.ingredientsList[i].remarks = $("#remarks" + $i).val();
    }
    if (confirm("确认保存？")) {
        //将领料单数据插入到数据库
        $.ajax({
            type: "POST",
            url: "addIngredientsReceive",
            async: false,
            data: JSON.stringify(ingredientsReceive),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    console.log(result.message);
                    if (confirm("领料单添加成功，是否返回主页面？"))
                        window.location.href = "ingredientsReceive.html";
                    else window.location.reload();
                } else alert(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("领料单添加失败！");
            }
        });
    }
}

/**
 * 重置功能
 */
function reset1() {
    // $("#senior1").find("input").val("");
    // // $("#senior1").find("select").get(0).selectedIndex = -1;
    // $("#searchContent1").val("");
    window.location.reload();
}

/**
 * 回车查询
 */
function enterSearch1(){
    if(event.keyCode === 13){
        search1();
    }
}

/**
 * 查询功能
 */
function search1() {
    var ingredients;
    if ($("#senior1").is(':visible')) {
        ingredients = {
            amount: $.trim($("#search1-amount").val()),
            name: $.trim($("#search1-name").val()),
            wareHouseName: $.trim($("#search1-wareHouseName").val())
        };
    } else {
        ingredients = {
            keywords: $.trim($("#searchContent1").val())
        };
    }
    if (ingredients == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchIngredientsInventory",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(ingredients),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setInventoryList(result.data);
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