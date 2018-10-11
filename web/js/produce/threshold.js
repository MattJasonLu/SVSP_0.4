/**
 *
 * 加载基础数据阈值表数据
 */
function loadThresholdList() {
//通过ajax从后台获取
    $.ajax({
        type: "POST",
        url: "thresholdList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setThresholdList(result);
            }
            else {

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
                    if (obj.handleCategory != null) {
                        $(this).html(obj.handleCategory.name);
                    }
                    break;
                //物质形态
                case (2):
                    if (obj.formType != null) {
                        $(this).html(obj.formType.name);
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
    var sqlWords = "select * from t_pr_threshold";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

////////////////////////编辑页面//////////////////////////
/**
 *
 * 加载基础数据阈值表数据
 */
function loadThresholdList1() {
//通过ajax从后台获取
    setSelectedList();    // 设置下拉框数据
    $.ajax({
        type: "POST",
        url: "thresholdList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setThresholdList1(result);
            }
            else {
                console.log(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    $("#weekDate").text(getWeekDate());
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
                    if (obj.handleCategory != null) {
                        $(this).find("select").val(obj.handleCategory.index);
                        selectAuto( $(this).find("select"));             // 自动匹配物质形态
                    }
                    break;
                //物质形态
                case (2):
                    if (obj.formType != null) {
                        $(this).find("select").val(obj.formType.index);
                    }
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
                var handleCategoryList = $("select[name='handleCategory']");
                // 清空遗留元素
                handleCategoryList.children().first().siblings().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    handleCategoryList.append(option);
                });
                handleCategoryList.get(0).selectedIndex = -1; // 初始化
                var formTypeList = $("select[name='formType']");
                // 清空遗留元素
                formTypeList.children().first().siblings().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    formTypeList.append(option);
                });
                formTypeList.get(0).selectedIndex = -1; // 初始化
            } else {
//                    console.log(result);
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
        switch (parseInt(handleCategory)) {
            case(1):
                handleCategory = 'Sludge';
                break;
            case(2):
                handleCategory = 'WasteLiquid';
                break;
            case(3):
                handleCategory = 'Bulk';
                break;
            case(4):
                handleCategory = 'Crushing';
                break;
            case(5):
                handleCategory = 'Distillation';
                break;
            case(6):
                handleCategory = 'Suspension';
                break;
        }
        switch (parseInt(formType)) {
            case(1):
                formType = 'Gas';
                break;
            case(2):
                formType = 'Liquid';
                break;
            case(3):
                formType = 'Solid';
                break;
            case(4):
                formType = 'HalfSolid';
                break;
        }
        threshold.thresholdId = $("#thresholdId" + $i).text();
        threshold.handleCategory = handleCategory;
        threshold.formType = formType;
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
    $.ajax({
        type: "POST",
        url: "saveThresholdList",
        async: false, // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(thresholdList),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                if (confirm("保存成功，是否返回主页？"))
                    window.location.href = "thresholdTable.html";
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
            item.empty();
            option.val(4);
            option.text('半固态');
            item.append(option);
        }
            break; // 污泥--半固体
        case(2): {
            item.empty();
            option.val(2);
            option.text('液体');
            item.append(option);
        }
            break; // 废液--液体
        case(3): {
            item.empty();
            option.val(3);
            option.text('固体');
            item.append(option);
        }
        break;  // 散装料--固体
        case(4): {
            item.empty();
            option.val(4);
            option.text('半固态');
            item.append(option);
        }
            break;  // 破碎料--半固体
        case(5): {
            item.find("option[value='1']").remove();
            item.get(0).selectedIndex = -1; // 初始化
            break;  // 精馏残渣--半固体/固体/液体
        }
        case(6): break;  // 悬挂连--全部
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