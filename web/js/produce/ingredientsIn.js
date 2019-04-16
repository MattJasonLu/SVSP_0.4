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

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
var oldId = "";   // 新增页面入库单ID

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
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
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalIngredientsInRecord",                  // url
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
            url: "searchIngredientsInTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
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
    setIngredientsInList(result);
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
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageIngredientsInList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setIngredientsInList(result.data);
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
            url: "searchIngredientsIn",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setIngredientsInList(result.data);
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
        setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageIngredientsInList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setIngredientsInList(result.data);
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
                url: "searchIngredientsIn",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setIngredientsInList(result.data);
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
function loadPageIngredientsInList() {
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
        url: "loadPageIngredientsInList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
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

function setIngredientsInList(result) {
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
                    // 入库单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 单位名称
                    $(this).html(obj.companyName);
                    break;
                case (3):
                    // 入库单状态
                    if (obj.checkStateItem != null)
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                    break;
                case (4):
                    // 总金额
                    $(this).html(obj.totalPrice.toFixed(2));
                    break;
                case (5):
                    // 记账人
                    $(this).html(obj.bookkeeper);
                    break;
                case (6):
                    // 审批人
                    $(this).html(obj.approver);
                    break;
                case (7):
                    // 保管人
                    $(this).html(obj.keeper);
                    break;
                case (8):
                    // 验收人
                    $(this).html(obj.acceptor);
                    break;
                case (9):
                    // 经手人
                    $(this).html(obj.handlers);
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
function exportInExcel() {
    var name = 't_pr_ingredients_in';
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
        sqlWords = "select id,companyName as '单位名称',creationDate as '入库单创建日期',state as '入库单状态',serialNumberIn as '序号',\n" +
            "name as '物品名称',specification as '规格',unitPrice as '单价',amount as '入库数',unit as '计量单位',\n" +
            "b.totalPrice as '物品总额',wareHouseName as '仓库',post as '过账',remarks as '附注',fileId as '文件编号',\n" +
            "bookkeeper as '记账人',approver as '审批人',keeper as '保管人',acceptor as '验收人',handlers as '经手人' \n" +
            "from t_pr_ingredients_in as a join t_pr_ingredients as b where inId = id and id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select id,companyName as '单位名称',creationDate as '入库单创建日期',state as '入库单状态',serialNumberIn as '序号',\n" +
            "name as '物品名称',specification as '规格',unitPrice as '单价',amount as '入库数',unit as '计量单位',\n" +
            "b.totalPrice as '物品总额',wareHouseName as '仓库',post as '过账',remarks as '附注',fileId as '文件编号',\n" +
            "bookkeeper as '记账人',approver as '审批人',keeper as '保管人',acceptor as '验收人',handlers as '经手人' \n" +
            "from t_pr_ingredients_in as a join t_pr_ingredients as b on inId = id;";
    }
    console.log("sql:" + sqlWords);
    window.open('exportExcelIngredientsIn?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 导入模态框
 * */
function importInExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadInModal() {
    var filePath = 'Files/Templates/辅料备件入库单模板.xls';
    var r = confirm("是否下载模板?");
    if (r === true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importInExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importIngredientsInExcel",              // url
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
        searchIngredientIn();      //
    }
}

/**
 * 查询功能
 */
function searchIngredientIn() {
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
    //模糊查询状态字段转换
    // switch (keywords) {
    //     case "新建":
    //         keywords = "NewBuild";
    //         break;
    //     case "已作废":
    //         keywords = "Invalid";
    //         break;
    //     case "作废":
    //         keywords = "Invalid";
    //         break;
    //     case "已出库":
    //         keywords = "OutBounded";
    //         break;
    //     case "出库":
    //         keywords = "OutBounded";
    //         break;
    // }
    if ($("#senior").is(':visible')) {
        data1 = {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            id: $.trim($("#search-Id").val()),
            companyName: $.trim($("#search-companyName").val()),
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
            url: "searchIngredientsIn",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result.data);
                    setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
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
 * 获取入库单号(双击)
 * @param item
 * @returns {string}
 */
function getIngredientsInId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 获取入库单号（单击）
 * @param item
 * @returns {*}
 */
function getIngredientsInId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 单击查看功能
 * @param item
 */
function toViewIngredientsIn(item) {
    var id = getIngredientsInId(item);
    showViewModal(id);
}

/**
 * 双击查看功能
 * @param item
 */
function toViewIngredientsIn1(item) {
    var id = getIngredientsInId1(item);
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
        url: "getIngredientsInById",
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
                setViewIngredientsClone(result.data);
                $("#view-id").text(data.id);
                $("#view-companyName").text(data.companyName);
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
                $("#view-bookkeeper").text(data.bookkeeper);
                $("#view-approver").text(data.approver);
                $("#view-keeper").text(data.keeper);
                $("#view-acceptor").text(data.acceptor);
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
function setViewIngredientsClone(result) {
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
                    $(this).html(obj.amount.toFixed(2));
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
function invalidIngredientsIn(item) {
    var id = getIngredientsInId(item);
    if ($(item).parent().parent().children().eq(3).text() == '新建') {
        if (confirm("是否作废？")) {
            $.ajax({
                type: "POST",
                url: "invalidIngredientsIn",
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

///////////////////新增页面///////////////////////////
function getDaydate(date) {
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
function countValue1() {
    var mySelect = document.getElementById("count1");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage1() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countProcurementPlanItemList",                  // url
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
            url: "searchProcurementPlanItemTotal",                  // url
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
    setProcurementItemList(result);
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
        var data = {
            page: page
        };
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getProcurementPlanItemList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setProcurementItemList(result);
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
            url: "searchProcurementPlanItem",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setProcurementItemList(result);
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
                url: "getProcurementItemList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setProcurementItemList(result);
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
                url: "searchProcurementPlanItem",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setProcurementItemList(result);
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
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function loadProcurementItemList() {
    loadNavigationList();   // 动态菜单部署
    ingredientsIn.ingredientsList = [];
    $("#save").text("入库");   // 修改按钮名称
    $("#head").text("辅料/备件入库单新增");  // 标题修改
    $("#view-id").text(getCurrentIngredientsInId());
    $("#creationDate").val(getDaydate(new Date()));
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
    $(".newLine2").remove();  // 删除历史数据
    // $(".newLine").remove();  // 删除历史数据
    var page = {};
    page.count = countValue1();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    var data = {
        page: page
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementPlanItemList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log("采购计划数据");
                console.log(result);
                setPageClone1(result);
                setPageCloneAfter1(pageNumber);        // 重新设置页码
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSelectedList();
    setfileId();  // 设置文件编号
    if (localStorage.id != null && localStorage.id != "null") { // 如果ID非空，加载需要修改的数据
        $("#save").text("修改");   // 修改按钮名称
        $("#head").text("辅料/备件入库单修改");
        var delBtn = "<a class='btn btn-default btn-xs' name='delbtn' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'\"></span></a>&nbsp;";
        $.ajax({   // 获取原数据
            type: "POST",
            url: "getIngredientsInById",
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
                    $("#companyName").val(data.companyName);
                    $("#creationDate").val(getDateStr(data.creationDate));
                    //console.log("日期："+getDateStr(data.creationDate));
                    $("#fileId").val(data.fileId);
                    $("#bookkeeper").val(data.bookkeeper);
                    $("#approver").val(data.approver);
                    $("#keeper").val(data.keeper);
                    $("#acceptor").val(data.acceptor);
                    $("#handlers").val(data.handlers);
                    // 设置物品明细数据
                    var allTotalPrice = 0; // 总金额
                    ingredientsIn1 = {};  // 初始化
                    ingredientsIn1.ingredientsList = [];
                    $.each(data.ingredientsList, function (index, item) {
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
                        clonedTr.find("span[name='serialNumber']").text(obj.serialNumber);
                        clonedTr.children("td:eq(0)").prepend(delBtn);   // 添加减行按钮
                        clonedTr.find("span[name='code']").text(obj.code);
                        clonedTr.find("span[name='name']").text(obj.name);
                        clonedTr.find("span[name='specification']").text(obj.specification);
                        // if (obj.unit != null)
                        clonedTr.find("span[name='unit']").text(obj.unit);
                        clonedTr.find("input[name='amount']").val(obj.amount.toFixed(2));
                        clonedTr.find("input[name='unitPrice']").val(obj.unitPrice.toFixed(2));
                        clonedTr.find("input[name='post']").val(obj.post);
                        clonedTr.find("select[name='wareHouseName']").val(obj.wareHouseName);
                        clonedTr.find("span[name='remarks']").text(obj.remarks);
                        clonedTr.find("span[name='procurementId']").text(obj.procurementId);
                        // if (obj.equipmentDataItem != null)
                        //     clonedTr.find("select[name='equipment']").val(obj.equipmentDataItem.dataDictionaryItemId);
                        var amount = obj.amount;
                        var unitPrice = obj.unitPrice;
                        var totalPrice = parseFloat(amount) * parseFloat(unitPrice);
                        allTotalPrice += totalPrice;
                        clonedTr.find("input[name='totalPrice']").val(totalPrice.toFixed(2));
                        // if (amount != null && unitPrice != null && amount != "" && unitPrice != "") {
                        //     clonedTr.find("span[id^='hundredThousand']").text(Math.floor(totalPrice / 100000));
                        //     clonedTr.find("span[id^='tenThousand']").text(Math.floor(totalPrice % 100000 / 10000));
                        //     clonedTr.find("span[id^='thousand']").text(Math.floor((totalPrice % 100000) % 10000 / 1000));
                        //     clonedTr.find("span[id^='hundred']").text(Math.floor((totalPrice % 100000) % 10000 % 1000 / 100));
                        //     clonedTr.find("span[id^='ten']").text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                        //     clonedTr.find("span[id^='yuan']").text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                        //     var jiao1 = totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
                        //     clonedTr.find("span[id^='jiao']").text(Math.floor(jiao1));
                        //     clonedTr.find("span[id^='fen']").text(Math.floor(jiao1 % 1 * 10));
                        // }
                        // 把克隆好的tr追加到原来的tr前面
                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);
                        clonedTr.addClass("newLine1");
                        var ingredients = {};
                        ingredients.serialNumber = obj.serialNumber;                    // 序号
                        ingredients.code = obj.code;                    // 编码
                        ingredients.name = obj.name;            // 物品名称
                        ingredients.specification = obj.specification; // 规格
                        ingredients.unit = obj.unit;                  // 单位
                        ingredients.amount = obj.amount;         // 入库数量
                        ingredients.totalPrice = obj.totalPrice;
                        ingredients.remarks = obj.remarks;                  // 备注
                        ingredients.id = obj.id;
                        ingredients.procurementId = obj.procurementId;   // 采购申请单编号
                        ingredients.procurementItemId = obj.procurementItemId;    // 物资主键
                        ingredients.serialNumberA = "update";
                        ingredients.itemId = obj.itemId;
                        ingredients.wareHouseName = obj.wareHouseName;
                        ingredients.oldWareHouseName = obj.wareHouseName; // 记录旧仓库
                        ingredientsIn1.ingredientsList.push(ingredients);
                    });
                    tr.hide();
                    $("#totalPrice").text(allTotalPrice.toFixed(2));
                    // if (allTotalPrice != null && allTotalPrice != undefined && allTotalPrice != NaN && allTotalPrice != "") {
                    //     $("#total-hundredThousand").text(Math.floor(allTotalPrice / 100000));
                    //     $("#total-tenThousand").text(Math.floor(allTotalPrice % 100000 / 10000));
                    //     $("#total-thousand").text(Math.floor((allTotalPrice % 100000) % 10000 / 1000));
                    //     $("#total-hundred").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 / 100));
                    //     $("#total-ten").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 / 10));
                    //     $("#total-yuan").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 % 10));
                    //     var jiao = allTotalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
                    //     $("#total-jiao").text(Math.floor(jiao));
                    //     $("#total-fen").text(Math.floor(jiao % 1 * 10));
                    // }
                    console.log("要修改的数据");
                    console.log(ingredientsIn1);
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
    oldId = $("#view-id").text();    // 入库单编号
}

var ingredientsListDel = []; // 存储删除的数据

/**
 * 减行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var j = $(tr).find("span[name='serialNumber']").text();  // 获取编号，据此获取ID
    ingredientsIn1.ingredientsList[j - 1].serialNumberA = "del";
    ingredientsListDel.push(ingredientsIn1.ingredientsList[j - 1]);  // 将删除的数据暂存到数组中
    ingredientsIn1.ingredientsList.splice(j - 1, 1);  // 将数据中对象中删除
    var length = $(tr.parentNode).children().length - 3;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 2; i < length; i++) {             // 更新ID
        tBody.children().eq(i - 1).find("input,select,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i - 1);
            $(this).prop('id', newId);
        });
        tBody.children().eq(i - 1).find("span[name='serialNumber']").text(i - 1);// 更新序号
    }
    totalCalculate(); // 减行后重新计算金额
    if ($("span[name='serialNumber']").length == 2) {  // 如果只有一行则不允许删除
        $("a[name='delbtn']").remove();
    }
}

/**
 * 为处置设备设置下拉框数据
 */
function setSelectedList() {
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getEquipmentByDataDictionary",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined) {
    //             var data = eval(result);
    //             // 高级检索下拉框数据填充
    //             var state = $("select[name='equipment']");
    //             state.children().remove();
    //             $.each(data.data, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(item.dataDictionaryItemId);
    //                 option.text(item.dictionaryItemName);
    //                 state.append(option);
    //             });
    //             state.get(0).selectedIndex = -1;
    //         } else {
    //             console.log("fail: " + result);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });
    // 设置物料状态下拉框数据
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getProcurementCheckStateList",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success: function (result) {
    //         if (result != undefined) {
    //             var data = eval(result);
    //             // 高级检索下拉框数据填充
    //             var state = $("#search1-state");
    //             state.children().remove();
    //             $.each(data.stateList, function (index, item) {
    //                 var option = $('<option />');
    //                 option.val(index);
    //                 option.text(item.name);
    //                 state.append(option);
    //             });
    //             state.get(0).selectedIndex = -1;
    //         } else {
    //             console.log("fail: " + result);
    //         }
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //     }
    // });
    //设置仓库下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWareHouseListByCurrentUser",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === "success") {
                console.log(result);
                var data = eval(result.data);
                // 高级检索下拉框数据填充
                var state = $("select[name='wareHouseName']");
                state.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.wareHouseName);
                    option.text(item.wareHouseName);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 设置文件编号
 */
function setfileId() {
    var id = "1"; // 入库单ID为1
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

//设置月度采购申请表数据
function setProcurementItemList(result) {
    var tr = $("#cloneTr1");
    $(".newLine3").remove();   // 删除旧数据
    var totalDemandQuantity = 0;
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        var obj = eval(item);
        totalDemandQuantity += parseFloat(obj.demandQuantity.toFixed(3));
        clonedTr.find("td[name='procurementPlanId']").text(obj.procurementPlanId);
        clonedTr.find("td[name='code']").text(obj.code);
        clonedTr.find("td[name='suppliesName']").text(obj.suppliesName);
        clonedTr.find("td[name='specifications']").text(obj.specifications);
        if (obj.unitDataItem != null){
            clonedTr.find("td[name='unit']").text(obj.unitDataItem.dictionaryItemName);
            if(obj.unitDataItem.dictionaryItemNam === "吨"){
                clonedTr.find("td[name='demandQuantity']").text(obj.demandQuantity.toFixed(3));
            }else {
                clonedTr.find("td[name='demandQuantity']").text(obj.demandQuantity.toFixed(0));
            }
        } else {
            clonedTr.find("td[name='demandQuantity']").text(obj.demandQuantity.toFixed(3));
        }
        clonedTr.find("td[name='note']").text(obj.remarks);
        clonedTr.find("td[name='id']").text(obj.id);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine3");
        clonedTr.removeAttr('id');
    });
    // 隐藏无数据的tr
    tr.hide();
    $("#totalDemandQuantity").text(totalDemandQuantity.toFixed(3));
}

/**
 * 获取当前入库单号
 * @returns {string}
 */
function getCurrentIngredientsInId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentIngredientsInId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前入库单号失败！");
        }
    });
    return id;
}

var procurementItemIdArray = [];
var ingredientsIn = {};  // 勾选的数据
var ingredientsIn1 = {};  // 要修改的数据

/**
 * 添加入库单
 */
function confirmInsert1() {
// 定义预处理单，存储勾选出库单
    //$(".newLine").remove();
    // ingredientsIn = {};// 初始化
    //
    var ingredientsList = [];
    if (ingredientsIn1 != null && ingredientsIn1.ingredientsList != null && ingredientsIn1.ingredientsList.length > 0) {
        ingredientsIn.ingredientsList = ingredientsIn1.ingredientsList;  // 将更新数据赋给对象
    }
    //ingredientsIn.id = $("#view-id").text();
    // 检测是否有修改数据，若有添加进去
    var i = $("span[name='serialNumber']").length - 1;  //序号
    // ingredientsList = ingredientsIn1.ingredientsList;  // 将之前数据赋值给数组
    // 遍历采购单表格行，获取勾选的计划列表
    $("#ingredientsInData").children().not("#cloneTr1").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var procurementItemId1 = $(this).find("td[name='id']").text();
            if ($.inArray(procurementItemId1, procurementItemIdArray) == -1) {
                //根据Id查找数据并进行赋值
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getProcurementPlanItemById",          // url
                    async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: {
                        id: procurementItemId1
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            // console.log(result)
                            //遍历存储物品数组
                            var data = result.data;
                            i++;
                            //将数据存到数组中，然后统一赋值
                            var ingredients = {};
                            ingredients.serialNumber = i;                    // 序号
                            ingredients.code = data.code;                    // 编码
                            ingredients.name = data.suppliesName;            // 物品名称
                            ingredients.specification = data.specifications; // 规格
                            if (data.unitDataItem != null) {
                                var unitDataItem = {};
                                unitDataItem.dictionaryItemName = data.unitDataItem.dictionaryItemName;
                                ingredients.unit = data.unitDataItem.dictionaryItemName;
                            }
                            ingredients.unitDataItem = unitDataItem;            // 单位
                            ingredients.amount = data.demandQuantity;         // 入库数量
                            ingredients.remarks = data.note;                  // 备注
                            ingredients.id = ingredientsIn.id;
                            ingredients.procurementId = data.receiptNumber;   // 采购申请单编号
                            ingredients.procurementItemId = data.id;    // 物资主键
                            ingredients.serialNumberA = "add";
                            ingredientsList.push(ingredients);
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
    //将数据遍历赋值到入库单中
    var tr = $("#clone3");
    var num = $("span[name='serialNumber']").length - 1;
    $.each(ingredientsList, function (index, item) {
        num++;
        ingredientsList[index].serialNumber = num;                    // 更新序号
        var obj = eval(item);
        var clonedTr = tr.clone();
        //更新id
        clonedTr.children().find("input,span,select").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.find("span[name='serialNumber']").text(obj.serialNumber);
        clonedTr.find("span[name='code']").text(obj.code);
        clonedTr.find("span[name='name']").text(obj.name);
        clonedTr.find("span[name='specification']").text(obj.specification);
        if (obj.unitDataItem != null)
            clonedTr.find("span[name='unit']").text(obj.unitDataItem.dictionaryItemName);
        clonedTr.find("input[name='amount']").val(obj.amount);
        clonedTr.find("span[name='remarks']").text(obj.remarks);
        clonedTr.find("select[name='wareHouseName']").get(0).selectedIndex = -1;
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine2");
        ingredientsIn.ingredientsList.push(item);    // 将新增的数据添到对象中
    });
    tr.hide();
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var amount = $("#amount" + $i).val();
        var unitPrice = $("#unitPrice" + $i).val();
        var totalPrice = (parseFloat(amount) * parseFloat(unitPrice)).toFixed(2);
        // $("#hundredThousand" + $i).text(Math.floor(totalPrice / 100000));
        // $("#tenThousand" + $i).text(Math.floor(totalPrice % 100000 / 10000));
        // $("#thousand" + $i).text(Math.floor((totalPrice % 100000) % 10000 / 1000));
        // $("#hundred" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 / 100));
        // $("#ten" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 / 10));
        // $("#yuan" + $i).text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 % 10));
        // var jiao1 = totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
        // $("#jiao" + $i).text(Math.floor(jiao1));
        // $("#fen" + $i).text(Math.floor(jiao1 % 1 * 10));
        $("#totalPrice" + $i).val(totalPrice);
        allTotalPrice += parseFloat(totalPrice);
    }
    // $("#total-hundredThousand").text(Math.floor(allTotalPrice / 100000));
    // $("#total-tenThousand").text(Math.floor(allTotalPrice % 100000 / 10000));
    // $("#total-thousand").text(Math.floor((allTotalPrice % 100000) % 10000 / 1000));
    // $("#total-hundred").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 / 100));
    // $("#total-ten").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 / 10));
    // $("#total-yuan").text(Math.floor((allTotalPrice % 100000) % 10000 % 1000 % 100 % 10));
    // var jiao = allTotalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
    // $("#total-jiao").text(Math.floor(jiao));
    // $("#total-fen").text(Math.floor(jiao % 1 * 10));
    $("#totalPrice").text(allTotalPrice.toFixed(2));
}

/**
 * 输入总额计算并设置单价
 * @param item
 */
function setUnitPrice(item) {
    var id = $(item).attr("id");   // 获取ID
    var serialNumber = id.charAt(id.length - 1);   // 获取序号
    var amount = parseFloat($("#amount" + serialNumber).val());
    var totalPrice = parseFloat($(item).val());
    $("#unitPrice" + serialNumber).val((totalPrice / amount).toFixed(3));
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
    var wareHouseState = false;
    var unitPriceState = false;
    if (ingredientsIn == null || ingredientsIn.ingredientsList.length == 0) {
        ingredientsIn.ingredientsList = ingredientsIn1.ingredientsList; // 没有新增数据时将修改的数据赋给ingredientsIn
    }
    if (ingredientsIn != null && ingredientsIn.ingredientsList != null)//如果有新添的数据则获取最新的输入数据
        for (var i = 0; i < ingredientsIn.ingredientsList.length; i++) {
            var $i = i + 1;
            if (ingredientsIn.ingredientsList[i].serialNumberA != 'del') {
                ingredientsIn.ingredientsList[i].id = $("#view-id").text();
                ingredientsIn.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
                ingredientsIn.ingredientsList[i].amount = $("#amount" + $i).val();
                ingredientsIn.ingredientsList[i].post = $("#post" + $i).val();
                ingredientsIn.ingredientsList[i].wareHouseName = $("#wareHouseName" + $i).find("option:selected").text();
                ingredientsIn.ingredientsList[i].totalPrice = $("#totalPrice" + $i).val();
                // update 2018年12月28日 by ljc 去除处置设备
                // var equitment = parseInt($("#equipment" + $i).find("option:selected").val());
                // var equipmentDataItem={};
                // equipmentDataItem.dataDictionaryItemId=equitment;
                // ingredientsIn.ingredientsList[i].equipmentDataItem=equipmentDataItem;
                if (ingredientsIn.ingredientsList[i].wareHouseName == null || ingredientsIn.ingredientsList[i].wareHouseName == "") wareHouseState = true;
                if (ingredientsIn.ingredientsList[i].unitPrice == null || ingredientsIn.ingredientsList[i].unitPrice == "") unitPriceState = true;
                // if (ingredientsIn.ingredientsList[i].serialNumberA == "add") {
                //     // 判断物料存在与否
                //     var ingredients = ingredientsIn.ingredientsList[i];
                //     $.ajax({
                //         type: "POST",
                //         url: "getItemsAmountsExist",
                //         async: false,
                //         data: JSON.stringify(ingredients),
                //         dataType: "json",
                //         contentType: "application/json; charset=utf-8",
                //         success: function (result) {
                //             if (result.status == "success") {
                //                 if (result.data != 0) ingredientsIn.ingredientsList[i].aid = "exist";
                //                 else ingredientsIn.ingredientsList[i].aid = "notExist";
                //             } else alert(result.message);
                //         },
                //         error: function (result) {
                //             console.log(result.message);
                //             alert("服务器错误！");
                //         }
                //     });
                // }
            }
        }
    if (ingredientsListDel != null && ingredientsListDel.length > 0) {
        for (var i = 0; i < ingredientsListDel.length; i++)
            ingredientsIn.ingredientsList.push(ingredientsListDel[i]);// 将删除的数据重新置于对象末尾
    }
    if (unitPriceState) {
        alert("单价不能为空，请完善数据！");
        return;
    }
    if (wareHouseState) {
        alert("仓库不能为空，请完善数据！");
        return;
    }
    ingredientsIn.totalPrice = $("#totalPrice").text();
    ingredientsIn.companyName = $("#companyName").val();
    ingredientsIn.fileId = $("#fileId").val();
    ingredientsIn.bookkeeper = $("#bookkeeper").val();
    ingredientsIn.approver = $("#approver").val();
    ingredientsIn.keeper = $("#keeper").val();
    ingredientsIn.acceptor = $("#acceptor").val();
    ingredientsIn.handlers = $("#handlers").val();
    ingredientsIn.creationDate = $("#creationDate").val();
    ingredientsIn.id = $("#view-id").text();
    console.log("数据为:");
    console.log(ingredientsIn);
    if (confirm("确认保存？")) {
        if ($("#save").text() == "入库") {
            //将入库单数据插入到数据库
            $.ajax({
                type: "POST",
                url: "addIngredientsIn",
                async: false,
                data: JSON.stringify(ingredientsIn),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.status == "success") {
                        console.log(result.message);
                        if (confirm("入库单添加成功，是否返回主页面？"))
                            window.location.href = "ingredientsInDetial.html";
                        else window.location.reload();
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("入库单添加失败！");
                }
            });
        } else if ($("#save").text() == "修改") {
            $.ajax({
                type: "POST",
                url: "updateIngredientsIn",
                async: false,
                data: JSON.stringify(ingredientsIn),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.status == "success") {
                        console.log(result.message);
                        if (confirm("入库单修改成功，是否返回上一页？"))
                        //window.location.href = "ingredientsIn.html";
                            history.back();
                        else window.location.reload();
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("入库单修改失败！");
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
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
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
    // 主页
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp === 0) {
                searchIngredientIn();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchIngredientIn();      //
            }
        }, 600);
    });
});

/**
 * 新增页面查询功能
 */
function search1() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue1();   // 获取每页显示数
    page.start = (pageNumber - 1) * page.count;
    var keywords = $.trim($("#searchContent1").val());
    if ($("#senior1").is(':visible')) {
        data1 = {           // 获取数据并设置搜索条件
            suppliesName: $.trim($("#search1-suppliesName").val()),
            specifications: $.trim($("#search1-specifications").val()),
            procurementPlanId: $.trim($("#search1-procurementPlanId").val()),
            page: page
        };
    } else {
        data1 = {   // 模糊查询
            keywords: keywords,
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        console.log("查询条件：");
        console.log(data1);
        $.ajax({
            type: "POST",
            url: "searchProcurementPlanItem",
            async: false,
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    setPageClone1(result);               // 设置分页页码并克隆数据
                    setPageCloneAfter1(pageNumber);      // 大于5页时页码省略显示
                } else console.log(result.message);
            },
            error: function (result) {
                console.log(result.message);
            }
        });
    }
}

//新增页面重置
function reset1() {
    $('#searchContent1').val("");
    $('#senior1').find("input").val("");
    $("#senior1").find("select").get(0).selectedIndex = -1;
}

/**
 * 显示修改模态框
 * @param item
 */
function ingredientsInModify(item) {
    if ($(item).parent().parent().children().eq(3).text() == '新建') {
        localStorage.id = getIngredientsInId(item);
        window.location.href = "newIngredientsIn.html";
    } else {
        alert("单据不可修改！");
    }
}

/**
 * 点击新增页面时将ID清空
 */
function addIngredientsIn() {
    localStorage.id = null;
    window.location.href = "newIngredientsIn.html";
}

/**
 * 自动设置仓库
 * @param item
 */
function setWareHouse(item) {
    // 获取选中的仓库
    var wareHosue = $(item).find("option:selected").text();
    // 设置其余行的仓库
    $("select[name='wareHouseName']").val(wareHosue);
    /**
     * 根据仓库名更新入库单号
     */
    $.ajax({
        type: "POST",
        url: "getWareHouseByName",
        async: false,
        data: {
            name: wareHosue
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