var currentPage = 1;                          //当前页数
var isSearch = false;
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
            url: "totalThresholdListRecord",                  // url
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
            url: "searchThresholdListTotal",                  // url
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
    setThresholdOutList(result);
    var total = totalPage();
    $("#next").prev().hide();            // 将页码克隆模板隐藏
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
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页码标蓝
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
            url: "thresholdOutList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setThresholdOutList(result.data);
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
            url: "searchThresholdList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setThresholdOutList(result.data);
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
                url: "thresholdOutList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setThresholdOutList(result.data);
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
                url: "searchThresholdList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setThresholdOutList(result.data);
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

/**
 * 加载数据
 */
function loadThresholdOutList() {
    loadNavigationList();  // 设置动态菜单
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
    //通过ajax从后台获取
    $.ajax({
        type: "POST",
        url: "thresholdOutList",
        data: JSON.stringify(page),
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            }
            else {
                console.log(message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
}

/**
 * 设置数据
 */
function setThresholdOutList(result) {
    $(".newLine").remove();    // 删除旧行
    var tr = $("#clonedTr1");//克隆一行
    //tr.siblings().remove();
    $.each(result.data, function (index, item) {
        var obj = eval(item);
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 编号
                case (1):
                    $(this).html(obj.id);
                    break;
                // 创建日期
                case (2):
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                // 状态
                case (3):
                    if (obj.checkStateItem != null)
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                    break;
            }
        });
        clonedTr.removeAttr("id");

        if(obj.state != null && obj.state.name == '生效中'){
            clonedTr.insertBefore($("#clonedTr1").parent().children().eq(0));   // 将生效中的处置类别阈值表置顶
        } else {
            clonedTr.insertBefore(tr);
        }
        clonedTr.addClass('newLine');
    });
    // 隐藏无数据的tr
    tr.hide();

}

/**
 * 获取编号(单击)
 * @param item
 */
function getCurrentThrenholdId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

function getCurrentThrenholdId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 单击查看
 * @param item
 */
function toView(item) {
    localStorage.id = getCurrentThrenholdId(item);
    window.location.href = "thresholdTable.html";
}

/**
 * 双击查看
 * @param item
 */
function toView1(item) {
    localStorage.id = getCurrentThrenholdId1(item);
    window.location.href = "thresholdTable.html";
}

function edit(item){
    localStorage.id = getCurrentThrenholdId(item);
    window.location.href = "thresholdTableAdd.html";
}

/**
 * 启用功能
 * @param item
 */
function enable(item) {
    // 将表生效
    var id = getCurrentThrenholdId(item);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "enableThresholdList",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                alert("启用成功！");
                // 将之前生效的表格关闭
                var lineCount = $(item.parentElement.parentElement.parentElement).children().length - 1; // 获取总行数
                var tBody = $(item.parentElement.parentElement.parentElement);
                for(var i = 0; i < lineCount; i++){
                    var item1 = tBody.children().eq(i).children();
                    if(item1.eq(3).get(0).innerHTML == '生效中'){
                        var id1 = item1.eq(1).get(0).innerHTML;
                        $.ajax({
                            type: "POST",                            // 方法类型
                            url: "disabledThresholdList",                 // url
                            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                            data: {
                                id: id1
                            },
                            dataType: "json",
                            success: function (result) {
                                console.log(result);
                                if (result.data != undefined || result.status == "success") {
                                    //alert("关闭成功！");
                                   // window.location.reload();
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
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
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

/**
 * 关闭功能
 * @param item
 */
function disabled(item) {
    var id = getCurrentThrenholdId(item);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "disabledThresholdList",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                alert("关闭成功！");
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
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
    if ($("#senior").is(':visible')) {
        data = {
            id: $.trim($("#search-id").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
        switch (keywords) {
            case('生效中'): keywords = 'Enabled';break;
            case('生效'): keywords = 'Enabled';break;
            case('已失效'): keywords = 'Disabled';break;
            case('失效'): keywords = 'Disabled';break;
        }
        data = {
            page: page,
            keywords: keywords
        }
    }
    console.log(data);
    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchThresholdList",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result);
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
 * 获取当前处置类别阈值表编号
 */
function getCurrentThresholdListId() {
    var id = '';
    $.ajax({
        type: "POST",
        url: "getCurrentThresholdListId",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                console.log(result);
                id = result.id;
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    return id;
}

/**
 * 导出excel
 * @param e
 */
function exportExcelList() {
    var name = 't_pr_threshold';
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
        sqlWords = "select a.id,a.thresholdId,b.dictionaryItemName,c.dictionaryItemName,a.calorificmax,a.calorificmin,a.ashmax,a.ashmin,a.watermax,a.watermin,\n" +
            "a.Smax,a.Smin,a.CLmax,a.CLmin,a.Pmax,a.Pmin,a.Fmax,a.Fmin,a.PHmax,a.PHmin,a.Safety,a.beginTime,a.endTime from t_pr_threshold a join   datadictionaryitem b on b.dataDictionaryItemId=a.handleCategoryId join datadictionaryitem c on c.dataDictionaryItemId=a.formTypeId  where id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select a.id,a.thresholdId,b.dictionaryItemName,c.dictionaryItemName,a.calorificmax,a.calorificmin,a.ashmax,a.ashmin,a.watermax,a.watermin,\n" +
            "a.Smax,a.Smin,a.CLmax,a.CLmin,a.Pmax,a.Pmin,a.Fmax,a.Fmin,a.PHmax,a.PHmin,a.Safety,a.beginTime,a.endTime from t_pr_threshold a join   datadictionaryitem b on b.dataDictionaryItemId=a.handleCategoryId join datadictionaryitem c on c.dataDictionaryItemId=a.formTypeId"  ;
    }
    console.log("sql:" + sqlWords);
    window.open('exportExcelThresholdTable?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 新增功能
 */
function addNewData(){      // 新增时将ID清零
    localStorage.id = null;
}

//////////////////////详细数据页面/////////////////////////
/**
 *
 * 加载基础数据阈值表数据
 */
function loadThresholdList() {
    loadNavigationList();  // 设置动态菜单
    var id = localStorage.id;            // 获取编号
    $("#data1-thresholdListId").text(id);
    //通过ajax从后台获取
    $.ajax({
        type: "POST",
        url: "thresholdList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setThresholdList(result);
            }
            else {
                console.log(message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    $("#weekDate").text(getWeekDate());
}

/*
* 加载数据至克隆表格中
*/
function setThresholdList(result) {
    var tr = $("#clonedTr2");//克隆一行
    //tr.siblings().remove();
    $.each(result.data, function (index, item) {
        var obj = eval(item);
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                //序号
                case (0):
                    $(this).html(index+1);
                    break;
                //处理类别
                case (1):
                    if (obj.handleCategoryItem != null) {
                        $(this).html(obj.handleCategoryItem.dictionaryItemName);
                    }
                    break;
                //物质形态
                case (2):
                    if (obj.formTypeItem != null) {
                        $(this).html(obj.formTypeItem.dictionaryItemName);
                    }
                    break;
                //最大热值
                case (3):
                    $(this).html(obj.calorificMax);
                    break;
                //最低热值
                case (4):
                    $(this).html(obj.calorificMin);
                    break;
                //最高灰分
                case (5):
                    $(this).html(obj.ashMax);
                    break;
                //最低灰分
                case (6):
                    $(this).html(obj.ashMin);
                    break;
                //最大水分
                case (7):
                    $(this).html(obj.waterMax);
                    break;
                //最低水分
                case (8):
                    $(this).html(obj.waterMin);
                    break;
                //最大硫成分
                case (9):
                    $(this).html(obj.sMax);
                    break;
                //最少硫成分
                case (10):
                    $(this).html(obj.sMin);
                    break;
                //最多氯成分
                case (11):
                    $(this).html(obj.clMax);
                    break;
                //最少氯成分
                case (12):
                    $(this).html(obj.clMin);
                    break;
                //最多磷成分
                case (13):
                    $(this).html(obj.pMax);
                    break;
                //最少磷成分
                case (14):
                    $(this).html(obj.pMin);
                    break;
                //最多弗成分
                case (15):
                    $(this).html(obj.fMax);
                    break;
                //最少弗成分
                case (16):
                    $(this).html(obj.fMin);
                    break;
                //最大酸碱度
                case (17):
                    $(this).html(obj.phMax);
                    break;
                //最小酸碱度
                case (18):
                    $(this).html(obj.phMin);
                    break;
                //安全库存量
                case (19):
                    $(this).html(obj.safety);
                    break;
                //起始日期
                case (20):
                    if (obj.beginTime != null) {
                        var time = gettime(obj.beginTime);
                        $(this).html(time);
                    }
                    else {
                        $(this).html("");
                    }
                    break;
                //结束日期
                case (21):
                    if (obj.endTime != null) {
                        var time = gettime(obj.endTime);
                        $(this).html(time);
                    }
                    else {
                        $(this).html("");
                    }
                    break;
            }


        });
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

// var day = obj.day
function gettime(obj) {
    var month = obj.month;
    if (month.length !== 2) {
        month = "0" + month;
    }
    var day = parseInt((obj.date)).toString();
    if (day.length !== 2) {
        day = "0" + day;
    }
    var year = obj.year + 1900;
    return year + "-" + month + "-" + day;
}

console.log(getWeekDate());

function getWeekDate() {
    //获取时间
    var obj = new Date();
    var week = null;
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    var days = new Date();
    days.setFullYear(year);
    days.setMonth(month);
    days.setDate(1);
    if (obj.getDay() <= obj.getDay()) {
        week = parseInt(day / 7) + a + 1;
    } else {
        week = parseInt(day / 7) + a;
    }
    return year + "年" + month + "月第" + week + "周";
}

/**
 * 导出功能
 */
function exportExcel() {
    var name = 't_pr_threshold';
    // 获取勾选项
    var sqlWords = "select id,thresholdId,handleCategory,formType,calorificmax,calorificmin,ashmax,ashmin,watermax,watermin,\n" +
        "Smax,Smin,CLmax,CLmin,Pmax,Pmin,Fmax,Fmin,PHmax,PHmin,Safety,beginTime,endTime from t_pr_threshold where id = " + localStorage.id;
    window.open('exportExcelThresholdTable?name=' + name + '&sqlWords=' + sqlWords);
}

////////////////////////编辑/新增页面//////////////////////////
/**
 *
 * 加载基础数据阈值表数据
 */
function loadThresholdList1() {
    loadNavigationList();  // 设置动态菜单
    var id = getCurrentThresholdListId();
    console.log("id:"+id);
    if (localStorage.id != null && localStorage.id != "null") {
        $("#data-thresholdListId").text(localStorage.id); // 设置编号
        //通过ajax从后台获取
       setSelectedList();    // 设置下拉框数据


            $.ajax({
                type: "POST",
                url: "thresholdList",
                data: {
                    id: localStorage.id
                },
                async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                success: function (result) {
                    if (result !== undefined && result.status == "success" && result.data.length > 0) {
                        console.log(result);
                        setThresholdList1(result);
                    }else if (result.data.length == 0){
                        $("#thresholdId0").text(1);      // 设置首行序号
                    }
                    else {
                        console.log(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });


    } else {
        $("#data-thresholdListId").text(id); // 设置编号
        $("#thresholdId0").text(1);      // 设置首行序号
        setSelectedList();
    }
}

/**
 * 加载数据至克隆表格中
 */
function setThresholdList1(result) {
    var tr = $("#cloneTr");//克隆一行
    //tr.siblings().remove();
    var num = $("span[id^='thresholdId']").length - 1;  // 获取总行数
    $.each(result.data, function (index, item) {
        var obj = eval(item);
        var clonedTr = tr.clone();
        clonedTr.show();
        num++;
        if (num > 1) {       // 将非第一行的其他行添加上减行按钮
            var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
            clonedTr.children("td:eq(0)").prepend(delBtn);
        }
        clonedTr.children().find("input,select,span").each(function () {  // 更新ID
            //id更新
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, parseInt(num) - 1);
            $(this).prop('id', newId);
        });
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                //序号
                case (0):
                    $(this).find("span[id^='thresholdId']").text(num);
                    break;
                //处理类别
                case (1):
                    if (obj.handleCategoryItem != null) {
                        $(this).find("select[id^='handleCategory']").val(obj.handleCategoryItem.dataDictionaryItemId);
                       // selectAuto($(this).find("select"));             // 自动匹配物质形态
                    }
                    break;
                //物质形态
                case (2):
                    if (obj.formTypeItem != null) {
                        $(this).find("select").val(obj.formTypeItem.dataDictionaryItemId);
                    }
                    // console.log(obj.formTypeItem.dataDictionaryItemId)
                    break;
                //最大热值
                case (3):
                    $(this).find("input").val(obj.calorificMax);
                    break;
                //最低热值
                case (4):
                    $(this).find("input").val(obj.calorificMin);
                    break;
                //最高灰分
                case (5):
                    $(this).find("input").val(obj.ashMax);
                    break;
                //最低灰分
                case (6):
                    $(this).find("input").val(obj.ashMin);
                    break;
                //最大水分
                case (7):
                    $(this).find("input").val(obj.waterMax);
                    break;
                //最低水分
                case (8):
                    $(this).find("input").val(obj.waterMin);
                    break;
                //最大硫成分
                case (9):
                    $(this).find("input").val(obj.sMax);
                    break;
                //最少硫成分
                case (10):
                    $(this).find("input").val(obj.sMin);
                    break;
                //最多氯成分
                case (11):
                    $(this).find("input").val(obj.clMax);
                    break;
                //最少氯成分
                case (12):
                    $(this).find("input").val(obj.clMin);
                    break;
                //最多磷成分
                case (13):
                    $(this).find("input").val(obj.pMax);
                    break;
                //最少磷成分
                case (14):
                    $(this).find("input").val(obj.pMin);
                    break;
                //最多弗成分
                case (15):
                    $(this).find("input").val(obj.fMax);
                    break;
                //最少弗成分
                case (16):
                    $(this).find("input").val(obj.fMin);
                    break;
                //最大酸碱度
                case (17):
                    $(this).find("input").val(obj.phMax);
                    break;
                //最小酸碱度
                case (18):
                    $(this).find("input").val(obj.phMin);
                    break;
                //安全库存量
                case (19):
                    $(this).find("input").val(obj.safety);
                    break;
                //起始日期
                case (20):
                    if (obj.beginTime != null) {
                        var time = gettime(obj.beginTime);
                        $(this).find("input").val(time);
                    }
                    else {
                        $(this).find("input").val("");
                    }
                    break;
                //结束日期
                case (21):
                    if (obj.endTime != null) {
                        var time = gettime(obj.endTime);
                        $(this).find("input").val(time);
                    }
                    else {
                        $(this).find("input").val("");
                    }
                    break;
            }
        });
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);

    });
    // 隐藏无数据的tr
    tr.remove();
}

/**
 * 新增行
 */
function addNewLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#plusBtn1").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    if(localStorage.id == null || localStorage.id == 'null'){      // 新增功能添加减行按钮
        clonedTr.children("td:eq(0)").find(".btn-default").remove();   // 删除之前的减行按钮
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        clonedTr.children("td:eq(0)").prepend(delBtn);
    }
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").get(0).selectedIndex = -1;
    clonedTr.children().find("select").eq(1).get(0).selectedIndex = -1;
    clonedTr.children().find("span").text("");
    // 获取编号
    var num = $("span[id^='thresholdId']").length;  //获取上一行的编号
    clonedTr.children().eq(0).find("span[id^='thresholdId']").text(num + 1);    // 设置序号
    clonedTr.children().find("input,select,span").each(function () {
        //id更新
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, parseInt(num));
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertBefore($("#plusBtn1"));
}

/**
 * 删除行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 2;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 1; i < length; i++) {             // 更新序号
        tBody.children().eq(i).children().eq(0).find("span[id^='thresholdId']").text(i + 1);     // 更新序号
        tBody.children().eq(i).children().find("input,select,span").each(function () {
            //id更新
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
    }
}

/**
 * 设置下拉框数据
 */
function setSelectedList() {
    //添加产废单位信息
//     $.ajax({
//         type: "POST",                       // 方法类型
//         url: "getThresholdSelectedList",              // url
//         cache: false,
//         async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//         dataType: "json",
//         success: function (result) {
//             if (result != undefined) {
//                 var data = eval(result);
//                 // 各下拉框数据填充
//                 var handleCategoryList = $("select[name='handleCategory']");
//                 // 清空遗留元素
//                 handleCategoryList.children().first().siblings().remove();
//                 $.each(data.handleCategoryList, function (index, item) {
//                     var option = $('<option />');
//                     option.val(item.index);
//                     option.text(item.name);
//                     handleCategoryList.append(option);
//                 });
//                 handleCategoryList.get(0).selectedIndex = -1; // 初始化
//                 var formTypeList = $("select[name='formType']");
//                 // 清空遗留元素
//                 formTypeList.children().first().siblings().remove();
//                 $.each(data.formTypeList, function (index, item) {
//                     var option = $('<option />');
//                     option.val(item.index);
//                     option.text(item.name);
//                     formTypeList.append(option);
//                 });
//                 formTypeList.get(0).selectedIndex = -1; // 初始化
//             } else {
// //                    console.log(result);
//             }
//         },
//         error: function (result) {
//             console.log(result);
//         }
//     });

    //进料方式
    $.ajax({
        type: 'POST',
        url: "getHandleCategoryByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var handleCategoryList = $("select[name='handleCategory']");
                handleCategoryList.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    handleCategoryList.append(option);
                });
                handleCategoryList.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //物质形态
    $.ajax({
        type: 'POST',
        url: "getFormTypeByDataDictionary",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var formTypeList = $("select[name='formType']");
                formTypeList.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    formTypeList.append(option);
                });
                formTypeList.get(0).selectedIndex =-1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
}

/**
 * 保存更改的数据
 */
function saveData() {
    var thresholdList = [];
    var lineCount = $("span[id^=thresholdId]").length;     // 总行数
    for (var i = 0; i < lineCount; i++) {
        var $i = i;
        var threshold = {};
        var handleCategory = $("#handleCategory" + $i).val();
        var formType = $("#formType" + $i).val();
        // switch (parseInt(handleCategory)) {
        //     case(1):
        //         handleCategory = 'Sludge';
        //         break;
        //     case(2):
        //         handleCategory = 'WasteLiquid';
        //         break;
        //     case(3):
        //         handleCategory = 'Bulk';
        //         break;
        //     case(4):
        //         handleCategory = 'Crushing';
        //         break;
        //     case(5):
        //         handleCategory = 'Distillation';
        //         break;
        //     case(6):
        //         handleCategory = 'Suspension';
        //         break;
        // }
        // switch (parseInt(formType)) {
        //     case(1):
        //         formType = 'Gas';
        //         break;
        //     case(2):
        //         formType = 'Liquid';
        //         break;
        //     case(3):
        //         formType = 'Solid';
        //         break;
        //     case(4):
        //         formType = 'HalfSolid';
        //         break;
        //     case(5):
        //         formType = 'Liquid1';
        //         break;
        //     case(6):
        //         formType = 'Solid1';
        //         break;
        // }
        var handleCategoryItem={};
        var formTypeItem={};
        handleCategoryItem.dataDictionaryItemId=handleCategory
        formTypeItem.dataDictionaryItemId=formType;
        threshold.handleCategoryItem=handleCategoryItem;
        threshold.formTypeItem=formTypeItem;
        threshold.thresholdId = $("#thresholdId" + $i).text();
        // threshold.handleCategoryItem.dataDictionaryItemId = handleCategory;
        // threshold.formTypeItem.dataDictionaryItemId = formType;
        threshold.calorificMax = $("#calorificMax" + $i).val();
        threshold.calorificMin = $("#calorificMin" + $i).val();
        threshold.ashMax = $("#ashMax" + $i).val();
        threshold.ashMin = $("#ashMin" + $i).val();
        threshold.waterMax = $("#waterMax" + $i).val();
        threshold.waterMin = $("#waterMin" + $i).val();
        threshold.sMax = $("#sMax" + $i).val();
        threshold.sMin = $("#sMin" + $i).val();
        threshold.clMax = $("#clMax" + $i).val();
        threshold.clMin = $("#clMin" + $i).val();
        threshold.pMax = $("#pMax" + $i).val();
        threshold.pMin = $("#pMin" + $i).val();
        threshold.fMax = $("#fMax" + $i).val();
        threshold.fMin = $("#fMin" + $i).val();
        threshold.phMax = $("#phMax" + $i).val();
        threshold.phMin = $("#phMin" + $i).val();
        threshold.safety = $("#safety" + $i).val();
        threshold.beginTime = $("#beginTime" + $i).val();
        threshold.endTime = $("#endTime" + $i).val();
        thresholdList.push(threshold);         // 将多个对象装到LIST中
    }
    var thresholds = {};
    thresholds.id = $("#data-thresholdListId").text();
    thresholds.thresholdList = thresholdList;
    $.ajax({
        type: "POST",
        url: "saveThresholdList",
        async: false, // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(thresholds),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                if (confirm("保存成功，是否返回上一页？"))
                    history.back();
                else window.location.reload(); // 刷新界面
            }
            else {
                console.log(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
}

/**
 * 选择处置类别自动匹配物质形态
 * @param e
 */
function selectAuto(e) {
    var handleCategory = $(e).val();
    var item = $(e).parent().parent().children().find("select[id^='formType']");
    setSelectedList1(item);          // 填充下拉框
    var option = $('<option />');
    // 设置选中项，删除多余项
    switch (parseInt(handleCategory)) {
        case(1): {
            // item.empty();
            // option.val(4);
            // option.text('半固态');
            // item.append(option);
        }
            break; // 污泥--半固体
        case(2): {
            // item.empty();
            // option.val(2);
            // option.text('液体');
            // item.append(option);
        }
            break; // 废液--液体
        case(3): {
            // item.empty();
            // option.val(3);
            // option.text('固体');
            // item.append(option);
        }
            break;  // 散装料--固体
        case(4): {
            // item.empty();
            // option.val(4);
            // option.text('半固态');
            // item.append(option);
        }
            break;  // 破碎料--半固体
        case(5): {
            // item.find("option[value='1']").remove();
            // item.get(0).selectedIndex = -1; // 初始化
            break;  // 精馏残渣--半固体/固体/液体
        }
        case(6):
            break;  // 悬挂连--全部
    }
}

/**
 * 设置下拉框数据
 */
function setSelectedList1(e) {
    //添加产废单位信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getThresholdSelectedList",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 各下拉框数据填充
                // 清空遗留元素
                e.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    e.append(option);
                });
                e.get(0).selectedIndex = -1; // 初始化
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
 * 填写最大值后自动设置最小值
 * @param item
 */
function autoSetMin(item){
   var max = - parseInt($(item).val()); // 获取最大值的相反数
    $(item).parent().next().find("input").val(max);
}

/**
 * 填写最小值后自动设置最大值
 * @param item
 */
function autoSetMax(item){
    var min = $(item).val().match(/\d+/ig);  // 获取最小值的相反数
    $(item).parent().prev().find("input").val(min);
}
