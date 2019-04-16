//////////////////领料单////////////////////
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

function getDayDate(date) {
    //获取时间
    var obj = date;
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    return year + "-" + month + "-" + day;
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
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientsReceiveList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
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
                case (1):
                    // 领料单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 部门
                    $(this).html(obj.department);
                    break;
                case (3):
                    // 领料单状态
                    $(this).html(obj.state.name);
                    break;
                case (4):
                    // 总数量
                    $(this).html(obj.totalAmount);
                    break;
                case (5):
                    // 主管副总经理
                    $(this).html(obj.vicePresident);
                    break;
                case (6):
                    // 仓库部门主管
                    $(this).html(obj.warehouseSupervisor);
                    break;
                case (7):
                    // 保管员
                    $(this).html(obj.keeper);
                    break;
                case (8):
                    // 领料部门主管
                    $(this).html(obj.pickingSupervisor);
                    break;
                case (9):
                    // 领料人
                    $(this).html(obj.pickingMan);
                    break;
                case (10):
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
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select a.id,a.department,c.dictionaryItemName,a.creationDate,b.serialNumberReceive,b.name,b.specification,\n" +
            "b.receiveAmount,b.unit,b.remarks,b.wareHouseName,a.vicePresident,a.warehouseSupervisor,\n" +
            "a.keeper,a.pickingSupervisor,a.pickingMan from t_pr_ingredients_receive as a join t_pr_ingredients as b \n" +
            "on receiveId = id  join datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId where id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select a.id,a.department,c.dictionaryItemName,a.creationDate,b.serialNumberReceive,b.name,b.specification,\n" +
            "b.receiveAmount,b.unit,b.remarks,b.wareHouseName,a.vicePresident,a.warehouseSupervisor,\n" +
            "a.keeper,a.pickingSupervisor,a.pickingMan from t_pr_ingredients_receive as a join t_pr_ingredients as b \n" +
            "on receiveId = id  join datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId ";
    }
    console.log("sql:" + sqlWords);
    window.open('exportExcelIngredientsReceive?name=' + name + '&sqlWords=' + sqlWords);
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
                        window.location.reload();
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
            if (last - event.timeStamp === 0) {
                searchData();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        }, 600);
    });
    // 新增页面
    $('#searchContent1').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp === 0) {
                search1();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search1();      //
            }
        }, 600);
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
    if ($("#search-state").val() == 0) state = "新建";//新建
    if ($("#search-state").val() == 1) state = "已作废";//已作废
    if ($("#search-state").val() == 2) state = "已出库";//已出库
    var keywords = $.trim($("#searchContent").val());
    // switch (keywords) {
    //     case("新建"):
    //         keywords = "NewBuild";
    //         break;
    //     case("待审批"):
    //         keywords = "ToExamine";
    //         break;
    //     case("审批中"):
    //         keywords = "Examining";
    //         break;
    //     case("审批通过"):
    //         keywords = "Approval";
    //         break;
    //     case("已驳回"):
    //         keywords = "Backed";
    //         break;
    //     case("驳回"):
    //         keywords = "Backed";
    //         break;
    //     case("已作废"):
    //         keywords = "Invalid";
    //         break;
    //     case("作废"):
    //         keywords = "Invalid";
    //         break;
    //     case("已确认"):
    //         keywords = "Confirm";
    //         break;
    //     case("确认"):
    //         keywords = "Confirm";
    //         break;
    //     case ("已出库"):
    //         keywords = "OutBounded";
    //         break;
    //     case ("出库"):
    //         keywords = "OutBounded";
    //         break;
    // }
    if ($("#senior").is(':visible')) {
        data1 = {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            id: $.trim($("#search-Id").val()),
            department: $.trim($("#search-department").val()),
            checkStateItem: {dictionaryItemName: state},
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
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 获取单号（单击）
 * @param item
 * @returns {*}
 */
function getIngredientsId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
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
                $("#view-department").text(data.companyName);
                $("#view-creationDate").text(getDayDate(data.creationDate));
                $("#view-fileId").text(data.fileId);
                $("#view-hundredThousand").text(Math.floor(data.totalPrice / 100000));
                $("#view-tenThousand").text(Math.floor(data.totalPrice % 100000 / 10000));
                $("#view-thousand").text(Math.floor((data.totalPrice % 100000) % 10000 / 1000));
                $("#view-hundred").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 / 100));
                $("#view-ten").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                $("#view-yuan").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                var jiao = data.totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
                $("#view-jiao").text(Math.floor(jiao));
                $("#view-fen").text(Math.floor(jiao % 1 * 10));
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
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            var jiao1 = obj.totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 编号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 物品编码
                    $(this).html(obj.code);
                    break;
                case (2):
                    // 物品名称
                    $(this).html(obj.name);
                    break;
                case (3):
                    // 规格
                    $(this).html(obj.specification);
                    break;
                case (4):
                    // 单位（KG）
                    $(this).html(obj.unit);
                    break;
                case (5):
                    // 数量
                    $(this).html(obj.receiveAmount.toFixed(2));
                    break;
                case (6):
                    // 单价
                    $(this).html(obj.unitPrice.toFixed(2));
                    break;
                case (7):
                    // 金额 十万
                    $(this).html(Math.floor(obj.totalPrice / 100000));
                    break;
                case (8):
                    // 金额 万
                    $(this).html(Math.floor(obj.totalPrice % 100000 / 10000));
                    break;
                case (9):
                    // 金额 千
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 / 1000));
                    break;
                case (10):
                    // 金额 百
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 / 100));
                    break;
                case (11):
                    // 金额 十
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                    break;
                case (12):
                    // 金额 元
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                    break;
                case (13):
                    // 金额 角
                    $(this).html(Math.floor(jiao1));
                    break;
                case (14):
                    // 金额 分
                    $(this).html(Math.floor(jiao1 % 1 * 10));
                    break;
                case (15):
                    // 过账
                    $(this).html(obj.post);
                    break;
                case (16):
                    // 附注
                    $(this).html(obj.remarks);
                    break;
                case (17):
                    // 仓库
                    $(this).html(obj.wareHouseName);
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
    if ($(item).parent().parent().children().eq(3).text() == '新建') {
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
    } else {
        alert("单据不可作废！");
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


/**
 * 返回count值
 * */
function countValue1() {
    var mySelect = document.getElementById("count1");
    var index = mySelect.selectedIndex;
    var text = mySelect.options[index].text;
    if (text == "全部") {
        text = "0";
    }
    return text;
}

/**
 * 计算总页数
 * */
function totalPage1() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalIngredientInventoryRecord",                  // url
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
            url: "searchIngredientInventoryTotal",                  // url
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
    var count = countValue1();                         // 可选
    var total = loadPages1(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone1(result) {
    $(".beforeClone").remove();
    setInventoryList(result);
    var total = totalPage1();
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
            switchPage1(num);
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
function switchPage1(pageNumber) {
    if (pageNumber > totalPage1()) {
        pageNumber = totalPage1();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage1();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").attr("disabled", "true");
        $("#firstPage").attr("disabled", "true");
        // $('#previous').removeAttr('href');//去掉a标签中的href属性
        // $('#firstPage').removeAttr('onclick');//去掉a标签中的onclick事件
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
        // $("#next").addAttr("href");

    }
    if (pageNumber == totalPage1()) {
        $("#next").attr("disabled", "true");
        $("#endPage").attr("disabled", "true");
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber < totalPage1()) {
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
    }
    var page = {};
    page.count = countValue1();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter1(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "LoadPageIngredientsInventoryList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setInventoryList(result);
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
            url: "searchIngredientsInventory",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setInventoryList(result);
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
 * 回车跳转（输入页数回车跳转页面）
 */
function enterSwitchPage1() {
    if (event.keyCode === 13) {
        inputSwitchPage1();
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage1() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if (pageNumber > totalPage1()) {
        pageNumber = totalPage1();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").attr("disabled", "true");
            $("#firstPage").attr("disabled", "true");
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        if (pageNumber == totalPage1()) {
            $("#next").attr("disabled", "true");
            $("#endPage").attr("disabled", "true");

            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber < totalPage1()) {
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter1(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue1();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "LoadPageIngredientsInventoryList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setInventoryList(result);
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
                url: "searchIngredientsInventory",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setInventoryList(result);
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
 * 省略显示页码
 */
function setPageCloneAfter1(currentPageNumber) {
    var total = totalPage1();
    var pageNumber = 5;         // 页码数
    if (total > pageNumber) { // 大于5页时省略显示
        $(".beforeClone").remove();          // 删除之前克隆页码
        $("#next").prev().hide();            // 将页码克隆模板隐藏
        if (currentPageNumber <= (parseInt(pageNumber / 2) + 1)) {   // 如果pageNumber = 5,当前页小于3显示前五页
            for (var i = 0; i < pageNumber; i++) {
                var li = $("#next").prev();
                var clonedLi = li.clone();
                clonedLi.show();
                clonedLi.find('a:first-child').text(i + 1);          // 页数赋值
                clonedLi.find('a:first-child').click(function () {    // 设置点击事件
                    var num = $(this).text();
                    switchPage1(num);        // 跳转页面
                });
                clonedLi.addClass("beforeClone");
                clonedLi.removeAttr("id");
                clonedLi.insertAfter(li);
            }
        } else if (currentPageNumber <= total - parseInt(pageNumber / 2)) {  // 如果pageNumber = 5,大于3时显示其前后两页
            for (var i = currentPage - parseInt(pageNumber / 2); i <= parseInt(currentPage) + parseInt(pageNumber / 2); i++) {
                var li = $("#next").prev();
                var clonedLi = li.clone();
                clonedLi.show();
                clonedLi.find('a:first-child').text(i);          // 页数赋值
                clonedLi.find('a:first-child').click(function () {    // 设置点击事件
                    var num = $(this).text();
                    switchPage1(num);        // 跳转页面
                });
                clonedLi.addClass("beforeClone");
                clonedLi.removeAttr("id");
                clonedLi.insertAfter(li);
            }
        } else if (currentPageNumber > total - parseInt(pageNumber / 2)) {    // 如果pageNumber = 5,显示最后五页
            for (var i = total - pageNumber + 1; i <= total; i++) {
                var li = $("#next").prev();
                var clonedLi = li.clone();
                clonedLi.show();
                clonedLi.find('a:first-child').text(i);          // 页数赋值
                clonedLi.find('a:first-child').click(function () {    // 设置点击事件
                    var num = $(this).text();
                    switchPage1(num);        // 跳转页面
                });
                clonedLi.addClass("beforeClone");
                clonedLi.removeAttr("id");
                clonedLi.insertAfter(li);
            }
        }
    }
    if (currentPageNumber == 1) {
        $("#previous").next().next().eq(0).addClass("oldPageClass");
        $("#previous").next().next().eq(0).addClass("active");       // 将首页页码标蓝
    }
}


/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages1(totalRecord, count) {
    if (count == 0) count = totalRecord;
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

var ingredientsReceive1 = {}; // 暂存出库单数据
var oldId = "";   // 领料单原始编号
/**
 * 设置首页数据
 */
function loadInventoryListData() {
    loadNavigationList();   // 动态菜单部署
    ingredientsReceive.ingredientsList = [];  // 初始化
    $(".newLine").remove();
    $("#save").text("领料");   // 修改按钮名称
    $("#head").text("辅料/备件领料单新增");  // 标题修改
    $("#view-id").text(getCurrentIngredientsReceiveId());
    $("#creationDate").val(getDayDate(new Date()));
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").attr("disabled", "true");
    $("#firstPage").attr("disabled", "true");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage1() == 1) {
        $("#next").attr("disabled", "true");
        $("#endPage").attr("disabled", "true");
    }
    var page = {};
    page.count = countValue1();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "LoadPageIngredientsInventoryList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setPageClone1(result);
                setPageCloneAfter1(pageNumber);        // 重新设置页码
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取失败");
        }
    });
    setfileId();
    if (localStorage.id != null && localStorage.id != "null") { // 如果ID非空，加载需要修改的数据
        $("#save").text("修改");   // 修改按钮名称
        $("#head").text("辅料/备件领料单修改");
        var delBtn = "<a class='btn btn-default btn-xs' name='delete' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'\"></span></a>&nbsp;";
        $.ajax({   // 获取原数据
            type: "POST",
            url: "getIngredientsReceiveById",
            async: false,
            data: {
                id: localStorage.id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    //设置数据
                    var data = eval(result.data);
                    console.log(result);
                    var tr = $("#clone3");
                    var num = 0;
                    console.log(result);
                    // 设置外部数据
                    $("#view-id").text(data.id);
                    $("#department").val(data.department);
                    $("#creationDate").val(getDateStr(data.creationDate));
                    $("#fileId").val(data.fileId);
                    $("#vicePresident").val(data.vicePresident);
                    $("#warehouseSupervisor").val(data.warehouseSupervisor);
                    $("#keeper").val(data.keeper);
                    $("#pickingSupervisor").val(data.pickingSupervisor);
                    $("#pickingMan").val(data.pickingMan);
                    // 设置物品明细数据
                    var totalReceiveAmount = 0; // 总领料数
                    var totalAmount = 0;        // 总库存量
                    var totalPrice = 0;         // 总金额
                    ingredientsReceive1 = {};
                    ingredientsReceive1.ingredientsList = [];
                    $.each(data.ingredientsList, function (index, item) {
                        num++;
                        var obj = eval(item);
                        var clonedTr = tr.clone();
                        //更新id/name
                        clonedTr.children().find("input,span").each(function () {
                            var id = $(this).prop('id');
                            var newId = id.replace(/[0-9]\d*/, num);
                            $(this).prop('id', newId);
                        });
                        clonedTr.show();
                        // 储存数据
                        var ingredients = {};
                        ingredients.serialNumber = num;   // 序号
                        ingredients.name = obj.name;                  // 物品名称
                        ingredients.specification = obj.specification; // 规格
                        ingredients.unit = obj.unit;                  // 单位
                        ingredients.receiveAmount = obj.receiveAmount.toFixed(2); // 领料数
                        ingredients.oldReceiveAmount = obj.receiveAmount.toFixed(2);
                        ingredients.wareHouseName = obj.wareHouseName;
                        ingredients.receiveId = localStorage.id;  // 领料单号
                        ingredients.unitPrice = obj.unitPrice;  //
                        ingredients.totalPrice = obj.totalPrice;  //
                        ingredients.remarks = obj.remarks;  //
                        ingredients.post = obj.post;  //
                        ingredients.id = localStorage.id;  //
                        //获取库存量
                        $.ajax({
                            type: "POST",
                            url: "getInventoryByNameAndWare",
                            async: false,
                            data: JSON.stringify(ingredients),
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                if (result != null) {
                                    console.log(result);
                                    ingredients.amount = result;     // 库存量
                                }
                            },
                            error: function (result) {
                                console.log("库存获取失败");
                            }
                        });
                        //ingredients.amount = obj.amount.toFixed(2);     // 库存量
                        ingredients.remarks = obj.remarks;             // 备注
                        ingredients.id = obj.id;
                        ingredients.serialNumberA = "update";
                        ingredients.itemId = obj.itemId;
                        ingredientsReceive1.ingredientsList.push(ingredients);
                        totalReceiveAmount += parseFloat(obj.receiveAmount);  // 计算总领料数
                        totalAmount += parseFloat(ingredients.amount);
                        totalPrice += parseFloat(obj.receiveAmount) * parseFloat(ingredients.unitPrice);
                        clonedTr.find("span[name='serialNumber']").text(num);
                        clonedTr.children("td:eq(0)").prepend(delBtn);   // 添加减行按钮
                        clonedTr.find("span[name='name']").text(obj.name);
                        clonedTr.find("span[name='specification']").text(obj.specification);
                        clonedTr.find("span[name='unit']").text(obj.unit);
                        clonedTr.find("input[name='receiveAmount']").val(obj.receiveAmount.toFixed(2));
                        clonedTr.find("span[name='amount']").text(ingredients.amount.toFixed(2));
                        clonedTr.find("input[name='unitPrice']").val(ingredients.unitPrice.toFixed(2));
                        clonedTr.find("input[name='totalPrice']").val(ingredients.totalPrice.toFixed(2));
                        clonedTr.find("input[name='remarks']").val(ingredients.remarks);
                        clonedTr.find("input[name='post']").val(ingredients.post);
                        clonedTr.find("input[name='totalPrice']").text(ingredients.totalPrice.toFixed(2));
                        clonedTr.find("span[name='wareHouseName']").text(obj.wareHouseName);
                        // 把克隆好的tr追加到原来的tr前面
                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);
                        clonedTr.addClass("newLine1");
                    });
                    tr.hide();
                    $("#totalReceiveAmount").text(totalReceiveAmount.toFixed(2));
                    $("#totalPrice").text(totalPrice.toFixed(2));
                    $("#totalAmount").text(totalAmount.toFixed(2));
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
    oldId = $("#view-id").text();
}

/**
 * 设置文件编号
 */
function setfileId() {
    var id = "3"; // 领料单为3
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getDocumentControl",          // url
        async: false, // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            ID: id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                if (result.data != null)
                    $("#fileId").val(result.data.fileNO); // 赋值
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 减行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var j = $(tr).find("span[name='serialNumber']").text();  // 获取编号，据此获取ID
    ingredientsReceive1.ingredientsList[j - 1].serialNumberA = "del";
    var length = $(tr.parentNode).children().length - 3;         // 行数
    console.log("length:" + length);
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 1; i < length; i++) {             // 更新ID和NAME
        tBody.children().eq(i).find("input,select,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
        tBody.children().eq(i).find("span[name='serialNumber']").text(i);// 更新序号
    }
    if (length === 3) {
        $("a[name='delete']").remove();   // 最后一行不允许删除
    }
}

/**
 * 设置库存量列表数据
 * @param result
 */
function setInventoryList(result) {
    var tr = $("#cloneTr1");
    $(".newLine2").remove();  // 删除旧数据
    var totalWareHouseAmount = 0;  // 总库存量
    var totalInAmount = 0;             // 总入库数
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var obj = eval(item);
        if (item.amount > 0) {  // 只显示库存量大于0的
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.find("td[name='itemId']").text(obj.itemId);
            clonedTr.find("td[name='code']").text(obj.code);
            clonedTr.find("td[name='name']").text(obj.name);
            clonedTr.find("td[name='specification']").text(obj.specification);
            clonedTr.find("td[name='unit']").text(obj.unit);
            clonedTr.find("td[name='amount']").text(obj.amount.toFixed(3));
            totalWareHouseAmount += parseFloat(obj.amount.toFixed(3));
            clonedTr.find("td[name='wareHouseName']").text(obj.wareHouseName);
            clonedTr.find("td[name='inId']").text(obj.inId);
            clonedTr.find("td[name='inAmount']").text(obj.inAmount.toFixed(3));
            totalInAmount += parseFloat(obj.inAmount.toFixed(3));
            clonedTr.find("td[name='inPrice']").text(obj.inPrice.toFixed(2));
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.insertBefore(tr);
            clonedTr.addClass("newLine2");
            clonedTr.removeAttr('id');
        }
    });
    // 隐藏无数据的tr
    tr.hide();
    $("#totalWareHouseAmount").text(totalWareHouseAmount.toFixed(3));
    $("#totalInAmount").text(totalInAmount.toFixed(3));
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

var ingredientsIdArray = [];   // 勾选的库存ID
var ingredientsReceive = {};
var totalReceiveAmount = 0;

/**
 * 添加领料单
 */
function confirmInsert() {
    totalReceiveAmount = 0;
    var ingredientsList = [];
    if (ingredientsReceive1 != null && ingredientsReceive1.ingredientsList != null && ingredientsReceive1.ingredientsList.length > 0) {
        ingredientsReceive.ingredientsList = ingredientsReceive1.ingredientsList; // 将更新的数据赋给对象
    }
    var i = $("span[name='serialNumber']").length - 1;  //序号
    // 遍历库存列表，生成领料单
    var wareHouseName = "";
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
                wareHouseName = ingredients.wareHouseName;
                ingredients.amount = parseFloat($(this).find("td[name='amount']").text());
                ingredients.unit = $(this).find("td[name='unit']").text();
                ingredients.id = $("#view-id").text();
                ingredients.code = $(this).find("td[name='code']").text();
                ingredients.inId = $(this).find("td[name='inId']").text();
                ingredients.inAmount = $(this).find("td[name='inAmount']").text();
                ingredients.inPrice = $(this).find("td[name='inPrice']").text();
                ingredients.receiveAmount = 0;  //领料数默认为0，防止错误操作
                ingredients.serialNumberA = "add";
                ingredients.itemId = $(this).find("td[name='itemId']").text();
                ingredientsList.push(ingredients);
                var receiveAmount = parseFloat(ingredients.receiveAmount);
                totalReceiveAmount += receiveAmount;
            }
        }
    });
    /**
     * 根据仓库名更新单号
     */
    $.ajax({
        type: "POST",
        url: "getWareHouseByName",
        async: false,
        data: {
            name: wareHouseName
        },
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === "success") {
                $("#view-id").text(result.data.prefix + oldId);   // 赋值新ID
            } else console.log(result.message);
        },
        error: function (result) {
            console.log(result.message);
        }
    });
    ingredientsReceive.id = $("#view-id").text();   // 更新最新的单据ID
    for(var i = 0; i < ingredientsReceive.ingredientsList.length; i++){
        ingredientsReceive.ingredientsList[i].id = ingredientsReceive.id;
    }
    //将数据遍历赋值到领料单中
    ingredientsReceive.totalAmount = totalReceiveAmount;
    var tr = $("#clone3");
    var num = $("span[name='serialNumber']").length - 1;  // 获取当前物品数
    $.each(ingredientsList, function (index, item) {
        console.log(ingredientsList);
        num++;
        ingredientsList[index].serialNumber = num;
        var obj = eval(item);
        var clonedTr = tr.clone();
        //更新id/name
        clonedTr.children().find("input,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.find("span[name='serialNumber']").text(obj.serialNumber);
        clonedTr.find("span[name='code']").text(obj.code);
        clonedTr.find("span[name='name']").text(obj.name);
        clonedTr.find("span[name='specification']").text(obj.specification);
        clonedTr.find("span[name='unit']").text(obj.unit);
        clonedTr.find("input[name='receiveAmount']").val(obj.receiveAmount);
        clonedTr.find("span[name='amount']").text(obj.amount);
        clonedTr.find("input[name='unitPrice']").val(obj.inPrice);
        clonedTr.find("input[name='totalPrice']").val(0);
        clonedTr.find("span[name='wareHouseName']").text(obj.wareHouseName);
        clonedTr.find("span[name='inId']").text(obj.inId);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
        ingredientsReceive.ingredientsList.push(item);// 将数据装到对象中
    });
    $("#total-Amount").text(totalReceiveAmount);
    tr.hide();
}

/**
 * 即时计算总量
 */
function calculateTotalReceiveAmount(item) {
    if (parseFloat($(item).val()) < 0) {
        alert("请输入大于0的领料数");
        $(item).val(0);
    } else {
        totalReceiveAmount = 0;
        var totalAmount = 0;
        var allTotalPrice = 0;
        var serialNumber = parseInt($(item).parent().parent().children().find("span[name='serialNumber']").text());
        var ListCount = $("input[name^='receiveAmount']").length;
        for (var i = 1; i < ListCount; i++) {
            var $i = i;
            var receiveAmount1 = parseFloat($("#receiveAmount" + $i).val());
            totalReceiveAmount += receiveAmount1;
            var amount1 = parseFloat($("#amount" + $i).val());
            totalAmount += amount1;
            var totalPrice = parseFloat($("#unitPrice" + $i).val()) * receiveAmount1;
            allTotalPrice += totalPrice;
            $("#totalPrice" + $i).val(totalPrice.toFixed(2));
        }
        var $i1 = serialNumber;
        var receiveAmount = parseFloat($("#receiveAmount" + $i1).val());
        var amount = parseFloat($("#amount" + $i1).text());
        if (receiveAmount > amount) {
            alert("领料数大于库存量，请重新输入！");
            $("#receiveAmount" + $i1).val(amount);
        }
        $("#totalReceiveAmount").text(totalReceiveAmount.toFixed(2));
        $("#totalAmount").text(totalReceiveAmount.toFixed(2));
        $("#totalPrice").text(allTotalPrice.toFixed(2));
    }
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var receiveAmount = $("#receiveAmount" + $i).val();
        var unitPrice = $("#unitPrice" + $i).val();
        var totalPrice = (parseFloat(receiveAmount) * parseFloat(unitPrice)).toFixed(2);
        $("#totalPrice" + $i).val(totalPrice);
        allTotalPrice += parseFloat(totalPrice);
    }
    $("#totalPrice").text(allTotalPrice.toFixed(2));
}

/**
 * 输入总额计算并设置单价
 * @param item
 */
function setUnitPrice(item) {
    var id = $(item).attr("id");   // 获取ID
    var serialNumber = id.charAt(id.length - 1);   // 获取序号
    var receiveAmount = parseFloat($("#receiveAmount" + serialNumber).val());
    var totalPrice = parseFloat($(item).val());
    $("#unitPrice" + serialNumber).val((totalPrice / receiveAmount).toFixed(2));
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        allTotalPrice += parseFloat($("#totalPrice" + $i).val());
    }
    $("#totalPrice").text(allTotalPrice.toFixed(2));
}

/**
 * 保存
 */
function save() {
    //获取输入的数据
    if (ingredientsReceive == null || ingredientsReceive.ingredientsList == null) {
        ingredientsReceive.ingredientsList = ingredientsReceive1.ingredientsList; // 没有新增数据时将修改的数据赋给ingredientsOut
    }
    ingredientsReceive.department = $("#department").val();
    ingredientsReceive.fileId = $("#fileId").val();
    ingredientsReceive.vicePresident = $("#vicePresident").val();
    ingredientsReceive.warehouseSupervisor = $("#warehouseSupervisor").val();
    ingredientsReceive.keeper = $("#keeper").val();
    ingredientsReceive.pickingSupervisor = $("#pickingSupervisor").val();
    ingredientsReceive.pickingMan = $("#pickingMan").val();
    ingredientsReceive.id = $("#view-id").text();
    ingredientsReceive.creationDate = $("#creationDate").val();
    totalReceiveAmount = 0;  // 总领料数
    var totalPrice = 0;
    if (ingredientsReceive != null && ingredientsReceive.ingredientsList != null)//如果有新添的数据则获取最新的输入数据
        for (var i = 0; i < ingredientsReceive.ingredientsList.length; i++) {
            var $i = i + 1;
            ingredientsReceive.ingredientsList[i].remarks = $("#remarks" + $i).val();
            ingredientsReceive.ingredientsList[i].receiveAmount = $("#receiveAmount" + $i).val();
            ingredientsReceive.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
            ingredientsReceive.ingredientsList[i].totalPrice = $("#totalPrice" + $i).val();
            ingredientsReceive.ingredientsList[i].id = $("#view-id").text();
            ingredientsReceive.ingredientsList[i].post = $("#post" + $i).val();
            totalPrice += parseFloat(ingredientsReceive.ingredientsList[i].totalPrice);
            if (ingredientsReceive.ingredientsList[i].receiveAmount == ingredientsReceive.ingredientsList[i].amount) {
                ingredientsReceive.ingredientsList[i].notReceiveAmount = 0;
            } else {
                ingredientsReceive.ingredientsList[i].notReceiveAmount = 1;
            }
            totalReceiveAmount += parseInt(ingredientsReceive.ingredientsList[i].receiveAmount);
        }
    ingredientsReceive.totalAmount = totalReceiveAmount; // 设置总领料数
    ingredientsReceive.totalPrice = totalPrice; // 设置总金额
    console.log("数据为：");
    console.log(ingredientsReceive);
    if (confirm("确认保存？")) {
        if ($("#save").text() === "领料") {
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
                            window.location.href = "ingredientsReceiveDetail.html";
                        else window.location.reload();
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("领料单添加失败！");
                }
            });
        } else if ($("#save").text() == "修改") {
            // 修改领料单数据
            $.ajax({
                type: "POST",
                url: "updateIngredientsReceive",
                async: false,
                data: JSON.stringify(ingredientsReceive),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.status == "success") {
                        console.log(result.message);
                        if (confirm("领料单修改成功，是否返回上一页？"))
                        // window.location.href = "ingredientsReceive.html";
                            history.back();
                        else window.location.reload();
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("领料单修改失败！");
                }
            });
        }
    }
}

/**
 * 回车查询
 */
function enterSearch1() {
    if (event.keyCode === 13) {
        search1();
    }
}

/**
 * 查询功能
 */
function search1() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue1();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior1").is(':visible')) {
        data1 = {
            code: $.trim($("#search1-code").val()),
            name: $.trim($("#search1-name").val()),
            wareHouseName: $.trim($("#search1-wareHouseName").val()),
            specification: $.trim($("#search1-specification").val()),
            inId: $.trim($("#search1-inId").val()),
            unit: $.trim($("#search1-unit").val()),
            amount: parseFloat($.trim($("#search1-amount").val())),
            inAmount: parseFloat($.trim($("#search1-inAmount").val())),
            page: page
        };
    } else {
        data1 = {
            keywords: $.trim($("#searchContent1").val()),
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchIngredientsInventory",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone1(result);
                    setPageCloneAfter1(pageNumber);      // 大于5页时页码省略显示
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
 * 修改功能
 * @param item
 */
function ingredientsReceiveModify(item) {
    if ($(item).parent().parent().children().eq(3).text() == '新建') {
        localStorage.id = getIngredientsId(item);
        window.location.href = "newIngredientsReceive.html";
    } else {
        alert("单据不可修改！");
    }
}

/**
 * 点击新增页面时将ID清空
 */
function addIngredientsReceive() {
    localStorage.id = null;
    window.location.href = "newIngredientsReceive.html";
}

/**
 * 打印功能
 */
function print() {
    //打印模态框
    $("#footer").hide();
    $("#viewModal").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: true
    });
}

/**
 * 自动设置库存数据
 */
function setInventory() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "setInventory",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function () {
            alert("设置成功")
        },
        error: function () {
            console.log(result);
            alert("服务器错误！");
        }
    });
}
