/**
 * 次生入场分析日报
 * */
function reset() {
    window.location.reload();
}

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalSecIntoRecord",                  // url
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
            url: "searchSecondaryCount",                  // url
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
    setSecIntoList(result);
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
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
}

/**
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
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
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSecondIntoList",                  // url
            data: JSON.stringify(page),
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    setSecIntoList(result.data);
                }
                else {
                    alert(result.message);

                }
            },
            error: function (result) {
                alert("服务器异常！")
            }
        });
    }
    else {
        data1['page'] = page;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchSecondary",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setSecIntoList(result.data);
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getSecondIntoList",                  // url
                data: JSON.stringify(page),// url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setSecIntoList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if (isSearch) {
            data1['page'] = page;
            $.ajax({
                type: "POST",                            // 方法类型
                url: "searchSecondary",                 // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    console.log(result);
                    if (result.data != undefined || result.status == "success") {
                        setSecIntoList(result.data);
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

//加载次生入场分析日报数据列表
function secondaryAnalysis() {
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondIntoList",                  // url
        data: JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            }
            else {
                alert(result.message);

            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });

    isSearch = false;

    //次生采样点下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryPointByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var address = $('#search-address');
                address.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    address.append(option);
                });
                address.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

}

//设置次生入场日报数据
//
function setSecIntoList(result) {
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
                case (1):
                    //预约单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 危废名称
                    wastesName = "";
                    var array = [];
                    if (obj.secondarySampleItemList != null) {
                        $.each(obj.secondarySampleItemList, function (index, item) {
                            array.push(item.wastesName);
                        })
                    }
                    var hash = unique1(array).join(" ");
                    $(this).html(hash.toString());
                    break;
                case (3):
                    // 检测项目
                    project = "";
                    if (obj.secondarySampleItemList != null) {
                        $.each(obj.secondarySampleItemList, function (index, item) {

                            if (item.cod == 1) {
                                project += "COD ";
                            }
                            if (item.bod5 == 1) {
                                project += "BOD5 ";
                            }
                            if (item.ph == 1) {
                                project += "PH ";
                            }
                            if (item.electricalConductivity == 1) {
                                project += "电导率 ";
                            }
                            if (item.hardness == 1) {
                                project += "硬度 ";
                            }
                            if (item.lye == 1) {
                                project += "碱度 ";
                            }
                            if (item.n2 == 1) {
                                project += "氮气 ";
                            }
                            if (item.scorchingRate == 1) {
                                project += "热灼减率 ";
                            }
                            if (item.water == 1) {
                                project += "水分 ";
                            }
                        })

                    }
                    var projectArray = project.split(" ");

                    // console.log(projectArray)
                    var array = unique1(projectArray).join(" ")
                    $(this).html(array.toString());
                    break;
                case (4):
                    // 送样人
                    $(this).html(obj.sendingPerson);
                    break;
                case (5):
                    // 签收人
                    $(this).html(obj.laboratorySignatory);
                    break;
                case (6):
                    // 采样点
                    if (obj.secondaryPointItem != null) {
                        $(this).html(obj.secondaryPointItem.dictionaryItemName);
                    }

                    break;
                case (7):
                    // 状态
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                    }

                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
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
                searchSecInto();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchSecInto();      //
            }
        }, 600);
    });
});


//次生入场高级查询
function searchSecInto() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        var water;
        if ($('#water').prop('checked') == true) {
            water = 1;
        }
        else
            water = 0;
        var scorchingRate;
        if ($('#scorchingRate').prop('checked') == true) {
            scorchingRate = 1;
        }
        else
            scorchingRate = 0;


        var state = $('#search-checkState').val()
        if (state == '') {
            state = null
        }
        data1 = {

            secondaryPointItem: {dataDictionaryItemId: $.trim($("#search-address").val())},
            sendingPerson: $.trim($("#search-remarks").val()),
            laboratorySignatory: $.trim($("#search-laboratorySignatory").val()),
            //remarks: $.trim($("#search-remarks").val()),
            checkStateItem: {dataDictionaryItemId: state},
            secondarySampleItemList: [{
                water: water,
                scorchingRate: scorchingRate,
                wastesName: $.trim($("#search-wastesName").val()),
            }],
            page: page
        };
    }
    else {
        var keywords = $.trim($("#searchContent").val());


        var scorchingRate;

        if (keywords == '热灼减率') {
            scorchingRate = 1;
            keywords = '';
        }
        var water;
        if (keywords == '水分') {
            water = 1;
            keywords = '';
        }

        // else
        //     keywords= $.trim($("#searchContent").val());


        data1 = {
            keywords: keywords,
            page: page,
            secondarySampleItemList: [{water: water, scorchingRate: scorchingRate}],
        };
        console.log(data1)
    }
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchSecondary",                 // url
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchSecInto();      //
    }
}


/**
 *
 * 导出
 * @returns {string}
 */
function exportExcel() {
    console.log("export");
    var name = 't_pl_secondaryinto';
    var idArry = [];//存放主键
    var items = $("input[name='select']:checked");//判断复选框是否选中

    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select id 序号 ,wastesCode 危废编码,handleCategory 进料方式,processWay 处置方式,packageType 包装类型,remarks 备注,wastesCategory 危废类别 from  t_pl_secondaryinto;";
        window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
    }

    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().html());        // 将选中项的编号存到集合中
            }
        });
        console.log(idArry)
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
                else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
            }
            var sqlWords = "select a.id,b.wastesName,a.sendingPerson,a.laboratorySignatory,a.address, c.dictionaryItemName ,b.water,b.scorchingRate from t_pr_secondarysample a join t_pr_secondarysampleitem b on b.sampleinformationId=a.id join  datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId  and  a.id " + sql;
            console.log(sqlWords)
        }
        window.open('exportSecondarySample?name=' + name + '&sqlWords=' + sqlWords);
    }


}

/**
 *
 * ***************************************************************次生废物送样
 *
 */
/**
 * 预约登记-显示预约框
 */
function appointModal() {

    $('#pass').hide();
    $('#break').hide();
    // 显示框体
    // setSelectList();
    $('#appointModal').modal('show');
    $("#reservationId").trigger('keyup')
    setSelectList()
}

/**
 * 为公司代码和危废代码下拉框填充数据
 */
function setSelectList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientAndWastesCodeSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status === "success") {
                var data = eval(result);
                console.log("下拉数据为：");
                console.log(data);
                // 下拉框数据填充
                var companyCode = $("#model-companyCode");
                $.each(data.companyCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val((item.clientId));
                    option.text(item.companyName);
                    companyCode.append(option);
                });

                var wastesCode = $("#wastesCode");
                $.each(data.wastesCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                //刷新下拉数据
                $('.selectpicker').selectpicker('refresh');


            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    $('#addClone').siblings().not($('#plusBtn')).remove();

    //次生采样点下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryPointByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var address = $('#address');
                address.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    address.append(option);
                });
                address.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });


}

function setSelectList1() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientAndWastesCodeSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status === "success") {
                var data = eval(result);
                console.log("下拉数据为：");
                console.log(data);


                var wastesCode = $("#wastesCode1");
                $.each(data.wastesCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                //刷新下拉数据
                $('.selectpicker').selectpicker('refresh');

                $('#addClone1').siblings().not($('#plusBtn1')).remove();

            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });


}


var num = 1;

/**
 * 预约登记/修改-新增样品1
 */
function addNewLine(item) {
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = null;
    if (item != null)
        tr = $(item).parent().parent().prev();
    else tr = $("#addBtn3").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    clonedTr.children('td').eq(0).html(($('.myclass').length) + 1);
    if (clonedTr.children('td').eq(0).html() != 1) {     // 将非第一行的所有行加上减行号
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        clonedTr.children('td').eq(0).prepend(delBtn);
    }

    // 克隆后清空新克隆出的行数据
    //clonedTr.children().find("input:first-child").prop('name').charAt(11);
    clonedTr.children().find("input").val("");
    clonedTr.children().find("input:checkbox").prop('checked', false);
    clonedTr.children().find("select").selectpicker('val', '');
    // clonedTr.children().find("input,select").each(function () {
    //     var name = $(this).prop('name');
    //     var newName = name.replace(/[0-9]\d*/, num - 1);
    //     $(this).prop('name', newName);
    //     var id = $(this).prop('id');
    //     var newId = id.replace(/[0-9]\d*/, num - 1);
    //     $(this).prop('id', newId);
    // });
    // clonedTr.addClass("newLine");


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
    //清空数据为重新初始化selectpicker
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();

}

/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 2;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    console.log(tr);
    console.log("length:" + length);
    for (var i = 1; i < length; i++) {             // 更新序号
        tBody.children().eq(i).children().eq(0).get(0).innerHTML = i + 1;     // 更新序号
        // 重新加上减行按钮
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        tBody.children().eq(i).children("td:eq(0)").prepend(delBtn);
        tBody.children().eq(i).children().find("input,select").each(function () {
            var name = $(this).prop('name');
            var newName = name.replace(/[0-9]\d*/, i);
            $(this).prop('name', newName);
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
    }
    num--;
}

/**
 * 添加预约登记单
 */
function addAppoint() {

//主表
    var data = {
        // client:{clientId:$('#model-companyCode').selectpicker('val')}
        id: $('#reservationId').val(),
        laboratorySignatory: $('#laboratorySignatory').val(),
        sendingPerson: $('#sendingPerson').val(),
        secondaryPointItem: {dataDictionaryItemId: $('#address').val()},
    };
    console.log(data)
    //添加主表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addSecondarySample",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        processData: false,
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.myclass').each(function () {
                    var water;
                    if ($(this).children('td').eq(4).find('label').eq(0).find("input").prop('checked') == true) {
                        water = 1;
                    }
                    else
                        water = 0;
                    var scorchingRate;
                    if ($(this).children('td').eq(4).find('label').eq(1).find("input").prop('checked') == true) {
                        scorchingRate = 1;
                    }
                    else
                        scorchingRate = 0;

                    var dataItem = {
                        sampleinformationId: $('#reservationId').val(),
                        wastesCode: $(this).children('td').eq(1).find("button").attr('title'),
                        wastesName: $(this).children('td').eq(2).find("select option:selected").text(),
                        water: water,
                        scorchingRate: scorchingRate,
                        identifie: $(this).children('td').eq(3).find("input").val(),
                    };
                    console.log(dataItem)
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "addSecondarySampleItem",              // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data: JSON.stringify(dataItem),
                        processData: false,
                        contentType: 'application/json;charset=utf-8',
                    })


                })
                alert("预约登记成功！")
                window.location.reload();
            }
        },
        error: function (result) {
            console.log(result);
        }
    });


}


/**
 * 预约登记==>修改
 */
function addNewLine1(item) {
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = null;
    if (item != null)
        tr = $(item).parent().parent().prev().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    clonedTr.show();
    clonedTr.children('td').eq(0).html(($('.myclass2 ').length) + 1);
    if (clonedTr.children('td').eq(0).html() != 1) {     // 将非第一行的所有行加上减行号
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        clonedTr.children('td').eq(0).prepend(delBtn);
    }

    // 克隆后清空新克隆出的行数据
    //clonedTr.children().find("input:first-child").prop('name').charAt(11);
    clonedTr.children().find("input").val("");
    clonedTr.children().find("input:checkbox").prop('checked', false);
    clonedTr.children().find("select").selectpicker('val', '');
    // clonedTr.children().find("input,select").each(function () {
    //     var name = $(this).prop('name');
    //     var newName = name.replace(/[0-9]\d*/, num - 1);
    //     $(this).prop('name', newName);
    //     var id = $(this).prop('id');
    //     var newId = id.replace(/[0-9]\d*/, num - 1);
    //     $(this).prop('id', newId);
    // });
    // clonedTr.addClass("newLine");


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
    //清空数据为重新初始化selectpicker
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();

}


//查看
function view(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();
    console.log(id)
    $('#reservationId1').text(id)
    $("#appointModa2").modal('show');
    $('#confirm').hide();
    //根据编号查找
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondarysampleById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {"id": id},
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                //赋值
                // 公司名称
                if (result.data.client != null) {
                    $('#companyName').val(result.data.client.companyName);
                }
                //化验室签收人
                $('#laboratorySignatory1').val(result.data.laboratorySignatory)

                //送样人
                $('#sendingPerson1').text(result.data.sendingPerson)

                //采样点
                if (result.data.secondaryPointItem != null) {
                    $('#address1').text(result.data.secondaryPointItem.dictionaryItemName)
                }


                if (result.data.secondarySampleItemList != null) {

                    var tr = $('#clonrTr');
                    tr.siblings().remove();

                    $.each(result.data.secondarySampleItemList, function (index, item) {

                        var clonedTr = tr.clone();

                        clonedTr.show();

                        var obj = eval(item);


                        clonedTr.children('td').eq(0).html(index + 1);
                        clonedTr.children('td').eq(1).html(obj.wastesCode);
                        clonedTr.children('td').eq(2).html(obj.wastesName);
                        project = "";
                        if (obj.cod == 1) {
                            project += "COD ";
                        }
                        if (obj.bod5 == 1) {
                            project += "BOD5 ";
                        }
                        if (obj.ph == 1) {
                            project += "PH ";
                        }
                        if (obj.dissolvedSolidForm == 1) {
                            project += "溶解固形物 ";
                        }
                        if (obj.electricalConductivity == 1) {
                            project += "电导率 ";
                        }
                        if (obj.hardness == 1) {
                            project += "硬度 ";
                        }
                        if (obj.lye == 1) {
                            project += "碱度 ";
                        }
                        if (obj.n2 == 1) {
                            project += "氮气 ";
                        }
                        if (obj.o2 == 1) {
                            project += "氧气 ";
                        }
                        if (obj.relativeAlkalinity == 1) {
                            project += "相对碱度 ";
                        }
                        if (obj.scorchingRate == 1) {
                            project += "热灼减率 ";
                        }
                        if (obj.water == 1) {
                            project += "水分 ";
                        }
                        clonedTr.children('td').eq(4).html(project);
                        clonedTr.children('td').eq(3).html(obj.identifie);


                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);

                    });

                    // 隐藏无数据的tr
                    tr.hide();
                    tr.removeAttr('class');


                }

            }
            else {

            }
        },
        error: function (result) {

        }
    });

}


/**
 * 一键签收
 */
function confirmAllCheck() {
    var laboratorySigner = "";
    $.ajax({
        type: "POST",                             // 方法类型
        url: "getCurrentUserInfo",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.status === "success" && result.data != null) {
                laboratorySigner = result.data.name;      // 获取签收人
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    var idList = [];   // 承装需要确认收样的预约单号
    $.each($("input[name='select']:checked"), function (index, item) {
        if ($(item).parent().parent().parent().find("td[name='state']").text() === "待收样") {   // 将待收样的物品
            idList.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
        }
    });
    if (idList.length > 0) {
        var sampleInformation = {};
        sampleInformation.laboratorySignatory = laboratorySigner;
        sampleInformation.sampleIdList = idList;
        console.log(sampleInformation);
        $.ajax({
            type: "POST",                             // 方法类型
            url: "confirmAllSecondAnalysisCheck",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(sampleInformation),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result.status == "success") {
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.dir(result);
                alert("服务器异常!");
            }
        });
    } else {
        alert("请勾选需要收样的单号！");
    }
}

//确认收样
function setSubmit(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();
    var state = $(item).parent().parent().children('td').eq(7).html();
    if (state == '已作废') {
        alert("单据已作废,无法收样")
    }
    if (state == '已拒收') {
        alert("单据已拒收,无法收样")
    }
    if (state == '已收样') {
        alert("单据已收样,无法收样")
    }
    if (state == '待收样') {
        $('#reservationId1').text(id)
        $("#appointModa2").modal('show');
        $('#confirm').show();
        //根据编号查找
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSecondarysampleById",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"id": id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    //赋值
                    // 公司名称
                    if (result.data.client != null) {
                        $('#companyName').val(result.data.client.companyName);
                    }
                    //化验室签收人
                    $('#laboratorySignatory1').val(result.data.laboratorySignatory)

                    //送样人
                    $('#sendingPerson1').text(result.data.sendingPerson)

                    //采样点
                    if (result.data.secondaryPointItem != null) {
                        $('#address1').text(result.data.secondaryPointItem.dictionaryItemName)

                    }


                    if (result.data.secondarySampleItemList != null) {

                        var tr = $('#clonrTr');
                        tr.siblings().remove();

                        $.each(result.data.secondarySampleItemList, function (index, item) {

                            var clonedTr = tr.clone();

                            clonedTr.show();

                            var obj = eval(item);


                            clonedTr.children('td').eq(0).html(index + 1);
                            clonedTr.children('td').eq(1).html(obj.wastesCode);
                            clonedTr.children('td').eq(2).html(obj.wastesName);

                            $('#wastesName').val(obj.wastesName)
                            project = "";
                            if (obj.cod == 1) {
                                project += "COD ";
                            }
                            if (obj.bod5 == 1) {
                                project += "BOD5 ";
                            }
                            if (obj.ph == 1) {
                                project += "PH ";
                            }
                            if (obj.dissolvedSolidForm == 1) {
                                project += "溶解固形物 ";
                            }
                            if (obj.electricalConductivity == 1) {
                                project += "电导率 ";
                            }
                            if (obj.hardness == 1) {
                                project += "硬度 ";
                            }
                            if (obj.lye == 1) {
                                project += "碱度 ";
                            }
                            if (obj.n2 == 1) {
                                project += "氮气 ";
                            }
                            if (obj.o2 == 1) {
                                project += "氧气 ";
                            }
                            if (obj.relativeAlkalinity == 1) {
                                project += "相对碱度 ";
                            }
                            if (obj.scorchingRate == 1) {
                                project += "热灼减率 ";
                            }
                            if (obj.water == 1) {
                                project += "水分 ";
                            }
                            clonedTr.children('td').eq(3).html(obj.identifie);

                            clonedTr.children('td').eq(4).html(project);

                            clonedTr.removeAttr("id");
                            clonedTr.insertBefore(tr);

                        });

                        // 隐藏无数据的tr
                        tr.hide();
                        tr.removeAttr('class');


                    }

                }
                else {

                }
            },
            error: function (result) {

            }
        });
    }


}

//确认送样方法==>真正的方法
function confirmSample() {
    var id = $('#reservationId1').text()

    var laboratorySignatory = $('#laboratorySignatory1').val();

    var wastesName = $('#wastesName').val()

    $.ajax({
        type: "POST",                       // 方法类型
        url: "confirmSecondarySampleById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {"id": id, 'laboratorySignatory': laboratorySignatory, 'wastesName': wastesName},
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#appointModa2").modal('hide');
            }
        },
        error: function (result) {


        }

    });


}


/**
 * 拒收框
 */
function rejection(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();
    var state = $(item).parent().parent().children('td').eq(7).html();
    if (state == '已收样') {
        alert('单据已收样,不可拒收!')
    }
    if (state == '已作废') {
        alert('单据已作废,不可拒收!')
    }
    console.log(id)
    if (state == '待收样' || state == '已拒收') {
        $('#id1').text(id);
        $("#rejection1").modal('show')

        //根据编号查找
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSecondarysampleById",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"id": id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    $('#advice').val(result.data.advice);
                } else {

                }
            },
            error: function (result) {

            }
        });
    }

}

//真正的拒收方法
function rejection1() {
    var id = $('#id1').text();
    ;
    var advice = $('#advice').val();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "rejectSecondarySampleById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {"id": id, "advice": advice},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message)
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#rejection1").modal('hide');
            }

        },
        error: function (result) {
            alert("服务器异常！")
        }
    })
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
    var filePath = 'Files/Templates/次生送样登记导入模板.xlsx';
    window.open('downloadFile?filePath=' + filePath);
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importSampleSecondaryExcel",              // url
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


//次生修改
function secondaryAnalysisModify(item) {
    $('#pass1').hide();
    $('#break1').hide();
    var checkState = $(item).parent().parent().children('td').eq(7).html();

    if (checkState == '已收样') {
        alert('单据已收样,不可修改!')
    }

    if (checkState == '已拒收') {
        alert('单据已拒收,不可修改!')
    }
    if (checkState == '已作废') {
        alert('单据已作废,不可修改!')
    }


    //次生采样点下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryPointByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var address = $('#address2');
                address.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    address.append(option);
                });
                address.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    if (checkState != '已作废' && checkState != '已拒收' && checkState != '已收样') {
        $('.selectpicker').selectpicker({
            language: 'zh_CN',
            size: 4
        });
        $('.selectpicker').data('selectpicker', null);
        $('.bootstrap-select').find("button:first").remove();
        $('#addClone1').siblings().not($('#plusBtn1')).remove();
        setSelectList1();
        var id = $(item).parent().parent().children('td').eq(1).html();
        console.log(id)
        $('#reservationId2').val(id)
        $('#reservationId3').val(id)
        $("#appointModa3").modal('show');
        $('#confirm').hide();


        //根据编号查找
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSecondarysampleById",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"id": id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    //赋值
                    // 公司名称
                    if (result.data.client != null) {
                        $('#companyName').val(result.data.client.companyName);
                    }
                    //化验室签收人
                    $('#laboratorySignatory2').val(result.data.laboratorySignatory)

                    //送样人
                    $('#sendingPerson2').val(result.data.sendingPerson)

                    //采样点
                    if (result.data.secondaryPointItem != null) {
                        $('#address2').val(result.data.secondaryPointItem.dataDictionaryItemId)
                    }


                    if (result.data.secondarySampleItemList != null) {

                        var tr = $('#addClone1');
                        //tr.siblings().remove();

                        $.each(result.data.secondarySampleItemList, function (index, item) {

                            var clonedTr = tr.clone();

                            clonedTr.attr('class', 'myclass2');

                            clonedTr.show();

                            var obj = eval(item);

                            if ((index + 1) != 1) {
                                var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                                clonedTr.children('td').eq(0).html(delBtn);
                                clonedTr.children("td:eq(0)").append(index + 1);
                            }
                            if ((index + 1) == 1) {
                                clonedTr.children('td').eq(0).html(index + 1);
                            }

                            // clonedTr.children('td').eq(1).find('select').selectpicker('val',obj.wastesCode)
                            //  console.log(clonedTr.children('td').eq(2).find('select').children('option'))
                            clonedTr.children('td').eq(2).find('select').val(obj.wastesName)


                            if (obj.water == 1) {
                                clonedTr.children('td').eq(4).children("label").eq(0).find("input").prop('checked', true)
                            }
                            if (obj.water == 0) {
                                clonedTr.children('td').eq(4).children("label").eq(0).find("input").prop('checked', false)
                            }

                            if (obj.scorchingRate == 1) {
                                clonedTr.children('td').eq(4).children("label").eq(1).find("input").prop('checked', true)
                            }
                            if (obj.scorchingRate == 0) {
                                clonedTr.children('td').eq(4).children("label").eq(1).find("input").prop('checked', false)
                            }

                            clonedTr.children('td').eq(1).find('select').selectpicker('val', obj.wastesCode);

                            clonedTr.removeAttr("id");
                            clonedTr.insertBefore(tr);
                            $('.selectpicker').data('selectpicker', null);
                            $('.bootstrap-select').find("button:first").remove();
                            // $('.selectpicker').selectpicker();
                            $('.selectpicker').selectpicker({
                                language: 'zh_CN',
                                size: 6
                            });
                            $('.selectpicker').selectpicker('refresh');
                        });

                        // 隐藏无数据的tr
                        tr.hide();
                        tr.removeAttr('class');


                    }

                }
                else {

                }
            },
            error: function (result) {

            }
        });
    }


}

//确认修改
function adjust() {

    var data = {
        newId: $('#reservationId2').val(),
        id: $('#reservationId3').val(),
        sendingPerson: $('#sendingPerson2').val(),
        secondaryPointItem: {dataDictionaryItemId: $('#address2').val()},
        laboratorySignatory: $('#laboratorySignatory2').val(),
    };

    //更新主表后删除字表数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateSecondarySample",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        processData: false,
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.myclass2').each(function () {
                    var water;
                    if ($(this).children('td').eq(4).find('label').eq(0).find("input").prop('checked') == true) {
                        water = 1;
                    }
                    else
                        water = 0;
                    var scorchingRate;
                    if ($(this).children('td').eq(4).find('label').eq(1).find("input").prop('checked') == true) {
                        scorchingRate = 1;
                    }
                    else
                        scorchingRate = 0;

                    var dataItem = {
                        sampleinformationId: $('#reservationId2').val(),
                        wastesCode: $(this).children('td').eq(1).find("button").attr('title'),
                        wastesName: $(this).children('td').eq(2).find("select option:selected").text(),
                        water: water,
                        scorchingRate: scorchingRate,
                        identifie: $(this).children('td').eq(3).find("input").val(),
                    };
                    console.log(dataItem)
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "addSecondarySampleItem",              // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data: JSON.stringify(dataItem),
                        processData: false,
                        contentType: 'application/json;charset=utf-8',
                    })


                })
                alert("修改成功！");
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#appointModa3").modal('hide');
            }
        },
        error: function (result) {

        }
    })


}

//作废
function setInvalid(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    var state = $(item).parent().parent().children('td').eq(7).html();
    if (state == '已收样') {
        alert("单据已收样,无法作废!")
    }
    if (state == '已拒收') {
        alert("单据已拒收,无法作废!")
    }
    if (state == '已作废') {
        alert("单据已作废,无法再次作废!")
    }
    if (state == '待收样') {
        if (confirm("确认作废?")) {
            //点击确定后操作
            $.ajax({
                type: "POST",                       // 方法类型
                url: "cancelSecondaryGeregistration",              // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {'id': id},
                //processData: false,
                //contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        alert(result.message)
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
                    }
                },
                error: function (result) {

                }
            })
        }
    }


}


//预约单号检测==>新增
function testing(item) {
    $('#pass').hide();
    $('#break').hide();

    var id = $.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingSecondaryId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'id': id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                if (result.data == true) {
                    $('#break').show();
                }
                if (result.data == false) {
                    $('#pass').show();
                }
                if ($.trim(id).length <= 0) {
                    $('#pass').hide();
                    $('#break').hide();
                }
            }
        },
        error: function (result) {

        }
    })
}

//预约单号检测==>检测
function testing1(item) {
    $('#pass1').hide();
    $('#break1').hide();

    var id = $.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingSecondaryId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'id': id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                if (result.data == true) {
                    $('#break1').show();
                }
                if (result.data == false) {
                    $('#pass1').show();
                }
                if ($.trim(id).length <= 0) {
                    $('#pass1').hide();
                    $('#break1').hide();
                }
            }
        },
        error: function (result) {

        }
    })
}