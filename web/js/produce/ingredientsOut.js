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
            url: "totalIngredientsOutRecord",                  // url
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
            url: "searchIngredientsOutTotal",                  // url
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
        $("#previous").attr("disabled", "true");
        $("#firstPage").attr("disabled", "true");
        // $('#previous').removeAttr('href');//去掉a标签中的href属性
        // $('#firstPage').removeAttr('onclick');//去掉a标签中的onclick事件
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
        // $("#next").addAttr("href");

    }
    if (pageNumber == totalPage()) {
        $("#next").attr("disabled", "true");
        $("#endPage").attr("disabled", "true");
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
            url: "loadPageIngredientsOutList",         // url
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
            url: "searchIngredientsOut",         // url
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
            $("#previous").attr("disabled", "true");
            $("#firstPage").attr("disabled", "true");
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").attr("disabled", "true");
            $("#endPage").attr("disabled", "true");

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
                url: "loadPageIngredientsOutList",         // url
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
                url: "searchIngredientsOut",         // url
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
    loadNavigationList();   // 动态菜单部署
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").attr("disabled", "true");
    $("#firstPage").attr("disabled", "true");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").attr("disabled", "true");
        $("#endPage").attr("disabled", "true");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientsOutList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
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
                    // 总数量
                    $(this).html(obj.totalAmount.toFixed(0));
                    break;
                case (5):
                    // 总金额
                    $(this).html(obj.totalPrice.toFixed(2));
                    break;
                case (6):
                    // 记账人
                    $(this).html(obj.bookkeeper);
                    break;
                case (7):
                    // 审批人
                    $(this).html(obj.approver);
                    break;
                case (8):
                    // 保管人
                    $(this).html(obj.keeper);
                    break;
                case (9):
                    // 经手人
                    $(this).html(obj.handlers);
                    break;
                case (10):
                    // 出库日期
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
    var name = 't_pr_ingredients_out';
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
        sqlWords = "select id,department as '部门',creationDate as '单据创建日期',c.dictionaryItemName,serialNumberOut as '序号',\n" +
            "name as '物品名称',specification as '规格',unitPrice as '单价',receiveAmount as '出库数',unit as '计量单位',\n" +
            "b.totalPrice as '物品总额',wareHouseName as '仓库',post as '过账',remarks as '附注',fileId as '文件编号',\n" +
            "bookkeeper as '记账人',approver as '审批人',keeper as '保管人',handlers as '经手人' \n" +
            "from t_pr_ingredients_out as a join t_pr_ingredients as b on outId = id  join datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId  where id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select id,department as '部门',creationDate as '单据创建日期',c.dictionaryItemName,serialNumberOut as '序号',\n" +
            "name as '物品名称',specification as '规格',unitPrice as '单价',receiveAmount as '出库数',unit as '计量单位',\n" +
            "b.totalPrice as '物品总额',wareHouseName as '仓库',post as '过账',remarks as '附注',fileId as '文件编号',\n" +
            "bookkeeper as '记账人',approver as '审批人',keeper as '保管人',handlers as '经手人' \n" +
            "from t_pr_ingredients_out as a join t_pr_ingredients as b on outId = id  join datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId   " ;
    }
    console.log("sql:" + sqlWords);
    window.open('exportExcelIngredientsOut?name=' + name + '&sqlWords=' + sqlWords);
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
            url: "importIngredientsOutExcel",              // url
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
 * 回车查询
 */
function enterSearch1(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData1();      //
    }
}

/**
 * 查询功能
 */
function searchData1() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue1();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-state").val() == 0) state = "NewBuild";//新建
    if ($("#search-state").val() == 1) state = "Invalid";//已作废
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
            id: $.trim($("#search1-Id").val()),
            department: $.trim($("#search1-department").val()),
            name: $.trim($("#search1-name").val()),
            specification: $.trim($("#search1-specification").val()),
            wareHouseName: $.trim($("#search1-wareHouseName").val()),
            startDate: $("#search1-startDate").val(),
            endDate: $("#search1-endDate").val(),
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
            url: "searchIngredientsReceiveItem",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone1(result.data);
                    setPageCloneAfter1(pageNumber);        // 重新设置页码
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
                searchData1();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData1();      //
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
        var state = null;
        if ($("#search-state").val() == 0) state = "新建";//新建
        if ($("#search-state").val() == 1) state = "已作废";//已作废
        if ($("#search-state").val() == 2) state = "已出库";//已出库
        data1 = {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            id: $.trim($("#search-Id").val()),
            department: $.trim($("#search-department").val()),
            checkStateItem:{dictionaryItemName:state} ,
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
            url: "searchIngredientsOut",                 // url
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
    } else {
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
function getDayDate(date) {
    //获取时间
    var obj = date;
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    return year + "-" + month + "-" + day;
}

var ingredientsOut1 = {}; // 用于暂存修改的出库单数据


/**
 * 返回count值
 * */
function countValue1() {
    var mySelect = document.getElementById("count1");
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
function totalPage1() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalIngredientsReceiveItemRecord",                  // url
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
            url: "searchIngredientsReceiveItemTotal",                  // url
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
    setReceiveList(result);
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
            url: "loadPageIngredientsReceiveItemList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setReceiveList(result.data);
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
            url: "searchIngredientsReceiveItem",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setReceiveList(result.data);
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
                url: "loadPageIngredientsReceiveItemList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setReceiveList(result.data);
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
                url: "searchIngredientsReceiveItem",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setReceiveList(result.data);
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
var oldId = "";

/**
 * 设置领料单列表
 * */
function loadIngredientsReceiveList() {
    loadNavigationList();   // 动态菜单部署
    $("#head").text("辅料/备件出库单新增");  // 标题修改
    $("#save").text("出库");                  // 按钮名称修改
    $(".newLine").remove();   // 初始化
    ingredientsOut.ingredientsList = [];
    $("#view-id").text(getCurrentIngredientsOutId());
    $("#creationDate").val(getDayDate(new Date()));
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage1() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue1();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientsReceiveItemList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone1(result.data);
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
    isSearch = false;
    setSelectedList();
    setfileId();
    if (localStorage.id != null && localStorage.id != "null") { // 如果ID非空，加载需要修改的数据
        $("#save").text("修改");   // 修改按钮名称
        $("#head").text("辅料/备件出库单修改");  // 修改标题
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'\"></span></a>&nbsp;";
        $.ajax({   // 获取原数据
            type: "POST",
            url: "getIngredientsOutById",
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
                    $("#departmentName").val(data.department);
                    $("#creationDate1").val(getDateStr(data.creationDate));
                    $("#fileId").val(data.fileId);
                    $("#bookkeeper").val(data.bookkeeper);
                    $("#approver").val(data.approver);
                    $("#keeper").val(data.keeper);
                    $("#handlers").val(data.handlers);
                    // 设置物品明细数据
                    var allTotalPrice = 0; // 总金额
                    ingredientsOut1 = {};  // 初始化
                    ingredientsOut1.ingredientsList = [];
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
                        clonedTr.find("span[name='serialNumber']").text(num);
                        // if (index > 0) // 两行及以上才能删除(出库单暂不允许减行,如需删除条目可直接作废出库单)
                        //     clonedTr.children("td:eq(0)").prepend(delBtn);   // 添加减行按钮
                        clonedTr.find("td[name='name']").text(obj.name);
                        clonedTr.find("td[name='specification']").text(obj.specification);
                        clonedTr.find("td[name='unit']").text(obj.unit);
                        clonedTr.find("td[name='remarks']").text(obj.remarks);
                        clonedTr.find("td[name='wareHouseName']").text(obj.wareHouseName);
                        clonedTr.find("span[name='receiveAmount']").text(obj.receiveAmount);
                        clonedTr.find("input[name='unitPrice']").val(obj.unitPrice.toFixed(2));
                        clonedTr.find("input[name='post']").val(obj.post);
                        if (obj.equipmentDataItem != null)
                            clonedTr.find("select[name='equipment']").val(obj.equipmentDataItem.dataDictionaryItemId);
                        var receiveAmount = obj.receiveAmount.toFixed(2);
                        var unitPrice = obj.unitPrice.toFixed(2);
                        var totalPrice = parseFloat(receiveAmount) * parseFloat(unitPrice);
                        allTotalPrice += totalPrice;
                        if (receiveAmount != null && unitPrice != null && receiveAmount != "" && unitPrice != "") {
                            clonedTr.find("span[id^='out-hundredThousand']").text(Math.floor(totalPrice / 100000));
                            clonedTr.find("span[id^='out-tenThousand']").text(Math.floor(totalPrice % 100000 / 10000));
                            clonedTr.find("span[id^='out-thousand']").text(Math.floor((totalPrice % 100000) % 10000 / 1000));
                            clonedTr.find("span[id^='out-hundred']").text(Math.floor((totalPrice % 100000) % 10000 % 1000 / 100));
                            clonedTr.find("span[id^='out-ten']").text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                            clonedTr.find("span[id^='out-yuan']").text(Math.floor((totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                            var jiao1 = totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
                            clonedTr.find("span[id^='out-jiao']").text(Math.floor(jiao1));
                            clonedTr.find("span[id^='out-fen']").text(Math.floor(jiao1 % 1 * 10));
                        }
                        // 把克隆好的tr追加到原来的tr前面
                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);
                        clonedTr.addClass("newLine2");
                        var ingredients = {};
                        console.log("赋值的数据为：");
                        console.log(obj);
                        ingredients.serialNumber = num;     // 序号
                        ingredients.name = obj.name;                    // 物品名称
                        ingredients.specification = obj.specification; // 规格
                        ingredients.unit = obj.unit;                  // 单位
                        ingredients.amount = obj.amount;              // 库存数量
                        ingredients.receiveAmount = obj.receiveAmount;   // 出库数量
                        ingredients.unitPrice = obj.unitPrice;           // 单价
                        ingredients.totalPrice = obj.totalPrice;        // 总价
                        ingredients.remarks = obj.remarks;             // 备注
                        ingredients.post = obj.post;                // 过账信息
                        ingredients.id = obj.id;                    // 出库单号
                        ingredients.serialNumberA = "update";
                        ingredients.itemId = obj.itemId;
                        ingredients.wareHouseName = obj.wareHouseName;
                        if (obj.equipment != null)
                            ingredients.equipment = obj.equipment.index;
                        ingredientsOut1.ingredientsList.push(ingredients);
                    });
                    tr.hide();
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
    var id = "2"; // 出库单为2
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
 * 为处置设备设置下拉框数据
 */
function setSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("select[name='equipment']");
                state.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
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
 * 减行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var j = $(tr).find("span[name='serialNumber']").text();  // 获取编号，据此获取ID
    ingredientsOut1.ingredientsList[j - 1].serialNumberA = "del";
    var length = $(tr.parentNode).children().length - 3;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 2; i < length; i++) {             // 更新ID
        tBody.children().eq(i).find("input,select,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i - 1);
            $(this).prop('id', newId);
        });
        tBody.children().eq(i).find("span[name='serialNumber']").text(i - 1);// 更新序号
    }
}

var serialNumber = 0;

function setReceiveList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    $(".newLine").remove();
    var totalNewReceiveAmount = 0;
    var totalNewReceivePrice = 0;
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var obj = eval(item);
        if(obj.checkStateItem != null && obj.checkStateItem.dictionaryItemName === "已出库"){
        }else {
            totalNewReceiveAmount += parseFloat(obj.receiveAmount.toFixed(3));
            totalNewReceivePrice += parseFloat(obj.totalPrice.toFixed(2));
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
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
                        if(obj.checkStateItem != null)
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
                        // 数量(领料数)
                        $(this).html(obj.receiveAmount.toFixed(3));
                        break;
                    case (9):
                        // 单价
                        $(this).html(obj.unitPrice.toFixed(2));
                        break;
                    case (10):
                        // 金额
                        $(this).html(obj.totalPrice.toFixed(2));
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
                        // 创建日期
                        $(this).html(getDateStr(obj.creationDate));
                        break;
                    case (14):
                        // 物品ID
                        $(this).html(obj.itemId);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.addClass("newLine");
            clonedTr.insertBefore(tr);
        }
    });
    tr.hide();
    $("#totalNewReceiveAmount").text(totalNewReceiveAmount.toFixed(3));
    $("#totalNewReceivePrice").text(totalNewReceivePrice.toFixed(2));
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
 * 添加出库单
 */
function confirmInsert() {
// 定义预处理单，存储勾选出库单
    ingredientsReceiveIdArray = [];
    if(ingredientsOut1 != null && ingredientsOut1.ingredientsList != null && ingredientsOut1.ingredientsList.length > 0){
        ingredientsOut.ingredientsList = ingredientsOut1.ingredientsList; // 将更新的数据赋给对象
    }
    var ingredientsList = [];   // 用于承装勾选的数据
    ingredientsOut.id = getCurrentIngredientsOutId();
    var totalPrice = 0;
    var totalReceiveAmount = 0;
    var wareHouseName = "";
    // 遍历领料单表格行，获取勾选的计划列表
    $("#ingredientsReceiveList").children().not("#clone").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            ingredientsOut.department = $(this).find("td[name='department']").text();
            var ingredients = {};
            ingredients.receiveItemId = $(this).find("td[name='itemId']").text();
            ingredients.name = $(this).find("td[name='name']").text();                 // 物品名称
            ingredients.specification = $(this).find("td[name='specification']").text(); // 规格
            ingredients.unit = $(this).find("td[name='unit']").text();                   // 单位
            ingredients.receiveAmount = $(this).find("td[name='receiveAmount']").text();        // 出库数量/领料数
            ingredients.remarks = $(this).find("td[name='remarks']").text();                  // 备注
            ingredients.totalPrice =  $(this).find("td[name='everyTotalPrice']").text();
            ingredients.unitPrice =  $(this).find("td[name='unitPrice']").text();
            ingredients.receiveId = $(this).find("td[name='receiveId']").text();
            ingredients.wareHouseName = $(this).find("td[name='wareHouseName']").text();
            wareHouseName = ingredients.wareHouseName;
            ingredients.aid = $(this).find("td[name='receiveId']").text();                     //辅料备件领料单号
            ingredients.serialNumberA = "add";
            totalReceiveAmount += parseFloat(ingredients.receiveAmount);
            totalPrice += parseFloat(ingredients.totalPrice);
            var ingredientStateItem = {};
            ingredientStateItem.dictionaryItemId = 42;  // 将物品状态设置为已出库
            ingredientsList.push(ingredients);
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
    ingredientsOut.id = $("#view-id").text();   // 更新最新的单据ID
    for(var i = 0; i < ingredientsOut.ingredientsList.length; i++){
        ingredientsOut.ingredientsList[i].id = ingredientsOut.id;
    }
    //将数据遍历赋值到出库单中
    var num = $("span[name='serialNumber']").length - 1;
    var tr = $("#clone3");
    $("#departmentName").val(ingredientsOut.department);  // 部门赋值
    $("#totalReceiveAmount").text(totalReceiveAmount.toFixed(2));
    $("#totalPrice").text(totalPrice.toFixed(2));
    console.log("勾选的数据：");
    console.log(ingredientsOut);
    $.each(ingredientsList, function (index, item) {
        num++;
        var obj = eval(item);
        ingredientsOut.ingredientsList.push(obj);  // 插入数组
        var clonedTr = tr.clone();
        //更新id
        clonedTr.children().find("input,span,select").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.find("span[name='serialNumber']").text(num);
        clonedTr.find("span[name='name']").text(obj.name);
        clonedTr.find("span[name='specification']").text(obj.specification);
        clonedTr.find("span[name='unit']").text(obj.unit);
        clonedTr.find("span[name='remarks']").text(obj.remarks);
        clonedTr.find("span[name='wareHouseName']").text(obj.wareHouseName);
        clonedTr.find("input[name='amount']").val(obj.receiveAmount);
        clonedTr.find("input[name='unitPrice']").val(obj.unitPrice);
        clonedTr.find("input[name='totalPrice']").val(obj.totalPrice);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    $("select[name='equipment']").get(0).selectedIndex = -1;   // 处置设备默认不选中
    tr.hide();
}

/**
 * 保存
 */
function save() {
    isSettled();   // 是否结账
    if(isC) {
        console.log("save");
        //获取输入的数据
        var totalPrice = 0;
        var totalAmount = 0;
        if(ingredientsOut == null || ingredientsOut.ingredientsList == null){
            ingredientsOut.ingredientsList = ingredientsOut1.ingredientsList; // 没有新增数据时将修改的数据赋给ingredientsOut
        }
        if (ingredientsOut != null && ingredientsOut.ingredientsList != null)//如果有新添的数据则获取最新的输入数据
            for (var i = 0; i < ingredientsOut.ingredientsList.length; i++) {
                var $i = i + 1;
                ingredientsOut.ingredientsList[i].id = $("#view-id").text();
                ingredientsOut.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
                ingredientsOut.ingredientsList[i].receiveAmount = $("#amount" + $i).val();
                ingredientsOut.ingredientsList[i].totalPrice = $("#totalPrice" + $i).val();
                ingredientsOut.ingredientsList[i].post = $("#post" + $i).val();
                ingredientsOut.ingredientsList[i].totalPrice = parseFloat(ingredientsOut.ingredientsList[i].unitPrice) * parseFloat(ingredientsOut.ingredientsList[i].receiveAmount);
                var equipmentDataItem={};
                equipmentDataItem.dataDictionaryItemId= parseInt($("#equipment" + $i).find("option:selected").val());
                ingredientsOut.ingredientsList[i].equipmentDataItem = equipmentDataItem;
                totalPrice += parseFloat(ingredientsOut.ingredientsList[i].totalPrice);
                totalAmount += parseFloat(ingredientsOut.ingredientsList[i].receiveAmount);
            }
        ingredientsOut.id = $("#view-id").text();
        ingredientsOut.totalPrice = totalPrice;
        ingredientsOut.totalAmount = totalAmount;
        ingredientsOut.department = $("#departmentName").val();
        ingredientsOut.fileId = $("#fileId").val();
        ingredientsOut.bookkeeper = $("#bookkeeper").val();
        ingredientsOut.approver = $("#approver").val();
        ingredientsOut.keeper = $("#keeper").val();
        ingredientsOut.handlers = $("#handlers").val();
        ingredientsOut.creationDate = $("#creationDate").val();
        console.log("保存的数据为:");
        console.log(ingredientsOut);
        if (confirm("确认保存？")) {
            if ($("#save").text() == "出库") {
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
                            if (confirm("出库单添加成功，是否返回上一页？"))
                            // window.location.href = "ingredientsOut.html";
                                history.back();
                            else window.location.reload();
                        } else alert(result.message);
                    },
                    error: function (result) {
                        console.log(result.message);
                        alert("出库单添加失败！");
                    }
                });
            } else if ($("#save").text() == "修改") {
                //将入库单数据插入到数据库
                $.ajax({
                    type: "POST",
                    url: "updateIngredientsOut",
                    async: false,
                    data: JSON.stringify(ingredientsOut),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result.status == "success") {
                            console.log(result.message);
                            if (confirm("出库单修改成功，是否返回上一页？"))
                            // window.location.href = "ingredientsOut.html";
                                history.back();
                            else window.location.reload();
                        } else alert(result.message);
                    },
                    error: function (result) {
                        console.log(result.message);
                        alert("出库单修改失败！");
                    }
                });
            }
        }
        //更新领料单状态为已出库
        for (var k = 0; k < ingredientsReceiveIdArray.length; k++) {
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
    }else {

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
    } else {
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

var isC = true;   // 是否继续

/**
 * 判定出库日期内是否结账
 * @param item
 */
function isSettled() {
    var date = $("#creationDate").val();  // 获取出库日期
    if(date === "") {
        date = new Date();
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "ingredientOutIsSettled",       // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            date: date
        },
        dataType: "json",
        success:function (result) {
            if (result !== undefined && result.status === "success"){
                console.log(result.message);
                isC = true;
                 return true;
            }else {
                alert(result.message);
                $("#creationDate").val("");  // 重新输入出库时间
                isC = false;
                return false;
            }
        },
        error:function (result) {
            alert("结账数据获取失败,请重新进入该页面！");
        }
    });
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate(item) {
    if (parseFloat($(item).val()) < 0) {
        alert("输入数不能小于0！");
        $(item).val(0);
    } else {
        var ListCount = $("input[name^='unitPrice']").length;
        var allTotalPrice = 0;
        var allTotalReceiveAmount = 0;
        for (var i = 1; i < ListCount; i++) {
            var $i = i;
            var amount = $("#amount" + $i).val();
            allTotalReceiveAmount += parseFloat(amount);
            var unitPrice = $("#unitPrice" + $i).val();
            var totalPrice = (parseFloat(amount) * parseFloat(unitPrice)).toFixed(2);
            $("#totalPrice" + $i).val(totalPrice);
            allTotalPrice += parseFloat(totalPrice);
        }
        $("#totalPrice").text(allTotalPrice.toFixed(2));
        $("#totalReceiveAmount").text(allTotalReceiveAmount.toFixed(3));
    }
}

/**
 * 输入总额计算并设置单价
 * @param item
 */
function setUnitPrice(item) {
    if (parseFloat($(item).val()) < 0) {
        alert("输入数不能小于0！");
        $(item).val(0);
    } else {
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
}

