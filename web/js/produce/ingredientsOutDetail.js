//////////////////出库单s////////////////////
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
    var text = mySelect.options[index].text;
    if(text == "全部"){
        text = "0";
    }
    return text;
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalIngredientsOutItemRecord",                  // url
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
            url: "searchIngredientsOutItemTotal",                  // url
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
    if(pageNumber > totalPage()){
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
        $("#previous").attr("disabled","true");
        $("#firstPage").attr("disabled","true");
        // $('#previous').removeAttr('href');//去掉a标签中的href属性
        // $('#firstPage').removeAttr('onclick');//去掉a标签中的onclick事件
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
        // $("#next").addAttr("href");

    }
    if (pageNumber == totalPage()) {
        $("#next").attr("disabled","true");
        $("#endPage").attr("disabled","true");
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber < totalPage()) {
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
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
            url: "loadPageIngredientsOutItemList",         // url
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
            url: "searchIngredientsOutItem",         // url
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
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").attr("disabled","true");
            $("#firstPage").attr("disabled","true");
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").attr("disabled","true");
            $("#endPage").attr("disabled","true");

            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
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
                url: "loadPageIngredientsOutItemList",         // url
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
                url: "searchIngredientsOutItem",         // url
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
function loadPageOutList() {
    loadNavigationList(); // 设置动态菜单
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").attr("disabled","true");
    $("#firstPage").attr("disabled","true");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").attr("disabled","true");
        $("#endPage").attr("disabled","true");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientsOutItemList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log("数据为");
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
    if(count == 0)count = totalRecord;
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
    var totalAmount = 0;   // 总数量
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var obj = eval(item);
        totalAmount += parseFloat(obj.receiveAmount.toFixed(2));
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    // 出库单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 部门
                    $(this).html(obj.department);
                    break;
                case (3):
                    //出库单状态
                    if (obj.checkStateItem != null)
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                    break;
                case (4):
                    // 物品编码
                    $(this).html(obj.code);
                    break;
                case (5):
                    // 物品名称
                    $(this).html(obj.name);
                    break;
                case (6):
                    // 规格
                    $(this).html(obj.specification);
                    break;
                case (7):
                    // 计量单位
                    $(this).html(obj.unit);
                    break;
                case (8):
                    // 数量
                    $(this).html(obj.receiveAmount.toFixed(2));
                    break;
                case (9):
                    // 单价
                    $(this).html(obj.unitPrice.toFixed(2));
                    break;
                case (10):
                    // 过账
                    $(this).html(obj.post);
                    break;
                case (11):
                    // 附注
                    $(this).html(obj.remarks);
                    break;
                case (12):
                    // 仓库
                    $(this).html(obj.wareHouseName);
                    break;
                case (13):
                    // 处置设备
                    if(obj.equipmentDataItem != null)
                        $(this).html(obj.equipmentDataItem.dictionaryItemName);
                    break;
                case (14):
                    // 出库日期
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                case (15):
                    // 编号
                    $(this).html(obj.itemId);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    var clonedTr = tr.clone();
    clonedTr.show();
    clonedTr.children("td").each(function (inner_index) {
        // 根据索引为部分td赋值
        switch (inner_index) {
            case (7):
                // 合计
                $(this).html("合计");
                break;
            case (8):
                // 数量
                $(this).html(totalAmount.toFixed(2));
                break;
            case (16):
                // 操作
                $(this).html("");
                break;
        }
    });
    // 把克隆好的tr追加到原来的tr前面
    clonedTr.removeAttr("id");
    clonedTr.insertBefore(tr);
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
            if (result != undefined) {
                var data = eval(result.data);
                // 高级检索下拉框数据填充
                var state = $("#search-state");
                state.children().remove();
                $.each(data, function (index, item) {
                    if(item.dataDictionaryItemId === 75 || item.dataDictionaryItemId === 69){
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
    var name = 't_pr_ingredients_out';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push($(item).parent().parent().nextAll().eq(13).text());        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select * from t_pr_ingredients_out as a join t_pr_ingredients as b where outId = id and itemId" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select * from t_pr_ingredients_out as a join t_pr_ingredients as b where outId = id;";
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
    var filePath = 'Files/Templates/辅料备件出库单模板.xls';
    var r = confirm("是否下载模板?");
    if (r === true) {
        window.open('downloadFile?filePath=' + filePath);
    }
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
    var checkStateItem = {};
    checkStateItem.dataDictionaryItemId = parseInt($("#search-state").val());
    var keywords = $.trim($("#searchContent").val());
    if ($("#senior").is(':visible')) {
        data1 = {
            id: $.trim($("#search-Id").val()),
            department: $.trim($("#search-department").val()),
            name: $.trim($("#search-name").val()),
            specification: $.trim($("#search-specification").val()),
            wareHouseName: $.trim($("#search-wareHouseName").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            checkStateItem: checkStateItem,
            page: page,
            code:$("#search-code").val(),
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
            url: "searchIngredientsOutItem",                 // url
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
        url: "getIngredientsOutById",
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
                // $("#view-hundredThousand").text(Math.floor(data.totalPrice / 100000));
                // $("#view-tenThousand").text(Math.floor(data.totalPrice % 100000 / 10000));
                // $("#view-thousand").text(Math.floor((data.totalPrice % 100000) % 10000 / 1000));
                // $("#view-hundred").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 / 100));
                // $("#view-ten").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                // $("#view-yuan").text(Math.floor((data.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                // var jiao = data.totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
                // $("#view-jiao").text(Math.floor(jiao));
                // $("#view-fen").text(Math.floor(jiao % 1 * 10));
                $("#view-totalAmount").text(data.totalAmount);
                $("#view-bookkeeper").text(data.bookkeeper);
                $("#view-approver").text(data.approver);
                $("#view-keeper").text(data.keeper);
                $("#view-handlers").text(data.handlers);
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
                    // 单位
                    $(this).html(obj.unit);
                    break;
                case (5):
                    // 数量
                    $(this).html(obj.receiveAmount.toFixed(2));
                    break;
                // case (5):
                //     // 单价
                //     $(this).html(obj.unitPrice.toFixed(2));
                //     break;
                // case (6):
                //     // 金额 十万
                //     $(this).html(Math.floor(obj.totalPrice / 100000));
                //     break;
                // case (7):
                //     // 金额 万
                //     $(this).html(Math.floor(obj.totalPrice % 100000 / 10000));
                //     break;
                // case (8):
                //     // 金额 千
                //     $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 / 1000));
                //     break;
                // case (9):
                //     // 金额 百
                //     $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 / 100));
                //     break;
                // case (10):
                //     // 金额 十
                //     $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                //     break;
                // case (11):
                //     // 金额 元
                //     $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                //     break;
                // case (12):
                //     // 金额 角
                //     $(this).html(Math.floor(jiao1));
                //     break;
                // case (13):
                //     // 金额 分
                //     $(this).html(Math.floor(jiao1 % 1 * 10));
                //     break;
                case (6):
                    // 过账
                    $(this).html(obj.post);
                    break;
                case (7):
                    // 附注
                    $(this).html(obj.remarks);
                    break;
                case (8):
                    // 仓库
                    $(this).html(obj.wareHouseName);
                    break;
                case (9):
                    // 处置设备
                    if(obj.equipmentDataItem != null)
                        $(this).html(obj.equipmentDataItem.dictionaryItemName);
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
                url: "invalidIngredientsOut",
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
    }else{
        alert("单据不可作废！");
    }
}

/**
 * 提示框自动关闭,待完善提示框
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

////////////////////出库单新增页面////////////////////////
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
 * 设置领料单列表
 * */
function loadIngredientsReceiveList() {
    $("#view-id").text(getCurrentIngredientsOutId());
    $("#creationDate").text(getcurrentDaydate());
    var page = {};
    page.start = null;
    page.count = null;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientsReceiveList",          // url
        data: JSON.stringify(page),
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setReceiveList(result.data);
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
    setSeniorSelectedList1();
    setSelectedList();
}

/**
 * 为处置设备设置下拉框数据
 */
function setSelectedList(){
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentNameList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("select[name='equipment']");
                state.children().remove();
                $.each(data.equipmentList, function (index, item) {
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

function setReceiveList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone1");
    tr.siblings().remove();
    var serialNumber = 0;    // 序号
    $.each(result, function (index, item) {
        if (item.state.name !== "已作废" && item.state.name !== "已出库") {
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
        }
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList1() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getIngredientsInSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state1 = $("#search1-state");
                state1.children().remove();
                $.each(data.stateList, function (index, item) {
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
    var state = null;
    if ($("#search1-state").val() == 0) state = "NewBuild";//新建
    if ($("#search1-state").val() == 1) state = "Invalid";//已作废
    if ($("#search-state").val() == 2) state = "OutBounded";//已出库
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
        case ("已出库"): keywords = "OutBounded";break;
        case ("出库"): keywords = "OutBounded";break;
    }
    if ($("#senior1").is(':visible')) {
        data1 = {
            startDate: $("#search1-startDate").val(),
            endDate: $("#search1-endDate").val(),
            id: $.trim($("#search1-Id").val()),
            department: $.trim($("#search1-department").val()),
            state: state
        };
    } else {
        data1 = {
            keywords: keywords
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
                    setReceiveList(result.data);
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
function getIngredientsReiceveId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 获取单号（单击）
 * @param item
 * @returns {*}
 */
function getIngredientsReiceveId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 单击查看功能
 * @param item
 */
function toViewReiceve(item) {
    var id = getIngredientsReiceveId(item);
    showViewModalReceive(id);
}

/**
 * 双击查看功能
 * @param item
 */
function toViewReiceve1(item) {
    var id = getIngredientsReiceveId1(item);
    showViewModalReceive(id);
}

/**
 * 显示查看模态框
 * @param id
 */
function showViewModalReceive(id) {
    $(".newLine1").remove();
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
                setReiceveViewClone(result.data);
                $("#view1-id").text(data.id);
                $("#view1-department").text(data.department);
                $("#view1-creationDate").text(getDayDate(data.creationDate));
                $("#view1-fileId").text(data.fileId);
                $("#view1-totalAmount").text(data.totalAmount);
                $("#view1-vicePresident").text(data.vicePresident);
                $("#view1-warehouseSupervisor").text(data.warehouseSupervisor);
                $("#view1-keeper").text(data.keeper);
                $("#view1-pickingSupervisor").text(data.pickingSupervisor);
                $("#view1-pickingMan").text(data.pickingMan);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#viewModal1").modal('show');
}

/**
 * 为查看模态框设置克隆数据
 * @param result
 */
function setReiceveViewClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone1");
    $.each(result.ingredientsList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        $("#view1-unit").text(item.unit);
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
                case (8):
                    // 处置设备
                    $(this).html(obj.equipment.name);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.addClass("newLine1");
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 获取当前出库单号
 * @returns {string}
 */
function getCurrentIngredientsOutId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentIngredientsOutId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前出库单号失败！");
        }
    });
    return id;
}

var ingredientsReceiveIdArray = [];
var ingredientsOut = {};

/**
 * 添加入库单
 */
function confirmInsert() {
// 定义预处理单，存储勾选出库单
    $(".newLine").remove();
    ingredientsOut = {};
    ingredientsReceiveIdArray = [];
    var ingredientsList = [];
    ingredientsOut.id = getCurrentIngredientsOutId();
    var i = 0;  //序号
    // 遍历领料单表格行，获取勾选的计划列表
    $("#ingredientsReceiveData").children().not("#clone1").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var ingredientsReceiveId1 = $(this).find("td[name='receiveId']").text();
            if ($.inArray(ingredientsReceiveId1, ingredientsReceiveIdArray) == -1) {
                ingredientsReceiveIdArray.push(ingredientsReceiveId1);
                //根据Id查找数据并进行赋值
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getIngredientsReceiveById",          // url
                    async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: {
                        id: ingredientsReceiveId1
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            //遍历存储物品数组
                            $.each(result.data.ingredientsList, function (index, item) {
                                i++;
                                //将数据存到数组中，然后统一赋值
                                var ingredients = {};
                                ingredients.serialNumber = i;                    // 序号
                                ingredients.name = item.name;                     // 物品名称
                                ingredients.specification = item.specification; // 规格
                                ingredients.unit = item.unit;                     // 单位
                                ingredients.receiveAmount = item.receiveAmount;         // 出库数量/领料数
                                ingredients.remarks = item.remarks;                  // 备注
                                ingredients.id = ingredientsOut.id;
                                ingredients.wareHouseName = item.wareHouseName;
                                if(item.ingredientState.name === "部分领用")ingredients.notReceiveAmount = 1;  // 未领用数为1，表示还有余量
                                else if(item.ingredientState.name === "已领用")ingredients.notReceiveAmount = 0;   // 未领用数为0，表示没有余量
                                ingredients.notReceiveAmount = 1;
                                ingredientsList.push(ingredients);
                            });
                        } else {
                            console.log(result.message);
                        }
                    },
                    error: function (result) {
                        console.log("获取数据失败！");
                    }
                });
            }
        }
    });
    //将数据遍历赋值到出库单中
    var num = 0;
    var tr = $("#clone3");
    $.each(ingredientsList, function (index, item) {
        num++;
        var obj = eval(item);
        var clonedTr = tr.clone();
        //更新id
        clonedTr.children().find("input,span,select").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.find("td[name='serialNumber']").text(obj.serialNumber);
        clonedTr.find("td[name='name']").text(obj.name);
        clonedTr.find("td[name='specification']").text(obj.specification);
        clonedTr.find("td[name='unit']").text(obj.unit);
        clonedTr.find("td[name='remarks']").text(obj.remarks);
        clonedTr.find("td[name='wareHouseName']").text(obj.wareHouseName);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    tr.hide();
    for(var j = 0; j < ingredientsList.length;j++){
        var $j = j+1;
        $("#out-receiveAmount" + $j).text(ingredientsList[j].receiveAmount);
    }
    ingredientsOut.ingredientsList = ingredientsList;
    ingredientsOut.receiveIdList = ingredientsReceiveIdArray;
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = null;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var receiveAmount = $("#out-receiveAmount" + $i).text();
        var unitPrice = $("#out-unitPrice" + $i).val();
        if (receiveAmount != null && unitPrice != null && receiveAmount != "" &&　unitPrice　!= ""){
            var totalPrice = parseFloat(receiveAmount) * parseFloat(unitPrice);
            $("#out-hundredThousand" + $i).text(Math.floor(totalPrice / 100000));
            $("#out-tenThousand" + $i).text(Math.floor(totalPrice % 100000 / 10000));
            $("#out-thousand" + $i).text(Math.floor((totalPrice % 100000) % 10000 / 1000));
            $("#out-hundred" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 / 100));
            $("#out-ten" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 / 10));
            $("#out-yuan" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 % 10));
            var jiao1 = totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
            $("#out-jiao" + $i).text(Math.floor(jiao1));
            $("#out-fen" + $i).text(Math.floor(jiao1 % 1 * 10));
            allTotalPrice += totalPrice;
        }
    }
    if (allTotalPrice != null && allTotalPrice != undefined && allTotalPrice != NaN && allTotalPrice != "") {
        $("#total-hundredThousand").text(Math.floor(allTotalPrice / 100000));
        $("#total-tenThousand").text(Math.floor(allTotalPrice % 100000 / 10000));
        $("#total-thousand").text(Math.floor((allTotalPrice % 100000) % 10000 / 1000));
        $("#total-hundred").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 / 100));
        $("#total-ten").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 / 10));
        $("#total-yuan").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 % 10));
        var jiao = allTotalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
        $("#total-jiao").text(Math.floor(jiao));
        $("#total-fen").text(Math.floor(jiao % 1 * 10));
    }
}

/**
 * 保存
 */
function save() {
    //获取输入的数据
    var totalPrice = 0;
    var totalAmount = 0;
    var unitPriceState = false;
    for (var i = 0; i < ingredientsOut.ingredientsList.length; i++) {
        var $i = i + 1;
        ingredientsOut.ingredientsList[i].unitPrice = $("#out-unitPrice" + $i).val();
        ingredientsOut.ingredientsList[i].post = $("#post" + $i).val();
        ingredientsOut.ingredientsList[i].wareHouseName = $("#wareHouseName" + $i).val();
        ingredientsOut.ingredientsList[i].totalPrice = parseFloat(ingredientsOut.ingredientsList[i].unitPrice) * parseFloat(ingredientsOut.ingredientsList[i].receiveAmount);
        ingredientsOut.ingredientsList[i].equipment = $("#equipment" + $i).val();
        if($("#out-unitPrice" + $i).val() == null || $("#out-unitPrice" + $i).val() === "")unitPriceState = true;
        totalPrice += ingredientsOut.ingredientsList[i].totalPrice;
        totalAmount += ingredientsOut.ingredientsList[i].receiveAmount;
    }
    ingredientsOut.totalPrice = totalPrice;
    ingredientsOut.totalAmount = totalAmount;
    ingredientsOut.departmentName = $("#departmentName").val();
    ingredientsOut.fileId = $("#fileId").val();
    ingredientsOut.bookkeeper = $("#bookkeeper").val();
    ingredientsOut.approver = $("#approver").val();
    ingredientsOut.keeper = $("#keeper").val();
    ingredientsOut.handlers = $("#handlers").val();
    console.log(ingredientsOut);
    if(unitPriceState){
        if(confirm("单价为空，确定出库？"))
        {//将入库单数据插入到数据库
            $.ajax({
                type: "POST",
                url: "addIngredientsOut",
                async: false,
                data: JSON.stringify(ingredientsOut),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.status == "success") {
                        console.log(result.message);
                        if (confirm("出库单添加成功，是否返回主页面？"))
                            window.location.href = "ingredientsOut.html";
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("出库单添加失败！");
                }
            });
        }
        return;
    }
    if(confirm("确认出库？")) {
        //将入库单数据插入到数据库
        $.ajax({
            type: "POST",
            url: "addIngredientsOut",
            async: false,
            data: JSON.stringify(ingredientsOut),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    console.log(result.message);
                    if (confirm("出库单添加成功，是否返回主页面？"))
                        window.location.href = "ingredientsOut.html";
                    else window.location.reload();
                } else alert(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("出库单添加失败！");
            }
        });
    }
    //更新领料单状态为已出库
    for(var k = 0; k < ingredientsReceiveIdArray.length;k++){
        $.ajax({
            type: "POST",
            url: "updateIngredientsReceiveState",
            async: false,
            data: {
                id: ingredientsReceiveIdArray[k]
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success")
                    console.log(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("领料单状态更新失败！");
            }
        });
    }
}


/**
 * 显示修改模态框
 * @param item
 */
function ingredientsOutModify(item) {
    if ($(item).parent().parent().children().eq(3).text() == '新建') {
        localStorage.id = getIngredientsId(item);
        window.location.href = "newIngredientsOut.html";
    }else {
        alert("单据不可修改！");
    }
}

/**
 * 点击新增页面时将ID清空
 */
function addIngredientsOut() {
    localStorage.id = null;
    window.location.href = "newIngredientsOut.html";
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
 * 确认结账功能(锁定)
 * @constructor
 */
function settled() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if(items.length <= 0){
        alert("请勾选需要结账的数据!");
    }else {
        if(confirm("确定结账?")){
            //点击确定后操作
            var outIdList = [];
            $(items).each(function () {
                if($(this).parent().parent().next().html().length > 0){
                    var ingredientsOutId = $(this).parent().parent().next().html();
                    outIdList.push(ingredientsOutId);
                }
            });
            var ingredientsOut1 = {};
            ingredientsOut1.receiveIdList = [];
            ingredientsOut1.receiveIdList = outIdList;
            console.log(ingredientsOut1);
            $.ajax({
                type: "POST",                       // 方法类型
                url: "ingredientOutSettled",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(ingredientsOut1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success:function (result) {
                    if (result !== undefined && result.status === "success"){
                        alert(result.message);
                        window.location.reload();
                    }else {
                        alert(result.message);
                    }
                },
                error:function (result) {
                    alert("服务器错误！");
                }
            });
        }
    }
}
