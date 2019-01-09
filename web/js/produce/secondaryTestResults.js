/******
 * 次生化验
 ******/

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;

array = [];//存放所有的tr
array1 = [];//存放目标的tr
array0=[];
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
            url: "totalSecondaryTestRecord",                  // url
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
    }  else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchSecondaryTestCount",                  // url
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
    return loadPages(totalRecord, count);
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setDataList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = [];
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageSecondaryTestResultsList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setDataList(result.data);
                } else {
                    console.log(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (isSearch) {//查询用的
        data1['page'] = page;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchSecondaryTest",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setDataList(result)
                } else {
                    alert(result.message);

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
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageSecondaryTestResultsList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        setDataList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchSecondaryTest",                  // url
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
    }
}


/**
 * 分页 获取首页内容
 * */
function loadPageList() {
    $('.loader').show();
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    // if(array0.length==0){
    //     for (var i = 1; i <= totalPage(); i++) {
    //         switchPage(parseInt(i));
    //
    //         array0.push($('.myclass'));
    //     }
    // }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageSecondaryTestResultsList",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide();
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    // getCheckState();
}

/**
 * 设置化验单数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass')
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 化验单号
                case (1):
                    $(this).html(obj.id);
                    break;
                // 废物名称
                case (2):
                    $(this).html(obj.wastesName);
                    break;
                // 热灼减率%
                case (3):
                    $(this).html(setNumber2Line(parseFloat(obj.scorchingRate).toFixed(2)));
                    break;
                // 水分%
                case (4):

                    $(this).html(setNumber2Line(parseFloat(obj.water).toFixed(2)));
                    break;
                // 备注
                case (5):
                    $(this).html((obj.remarks));
                    break;
                // 单据状态
                case (6):
                    if (obj.checkStateItem != null) {
                        $(this).html((obj.checkStateItem.dictionaryItemName));
                    }
                    break;
                    //采样点
                case (7):
                        $(this).html(obj.address);
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
 * 导入excel文件
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importSecondaryTestResultsExcel",              // url
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
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/次生化验模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导出excel
 */
function exportExcel() {
    var checkedItems = $("input[type='checkbox']:checked");
    checkedItems.each(function () {
        var id = $(this).parent().parent().parent().find("td[name='id']").text();
        window.open('exportLaboratoryTestExcel?id=' + id);
    });
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


//查询
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {

        data1 = {
            id:$.trim($('#search-id').val()),
            address:$.trim($('#search-address').val()),
            remarks:$.trim($('#search-remarks').val()),
            page: page,
            checkStateItem:{dataDictionaryItemId:$('#search-checkState').val()}

        };
    }
    else {
        var keyword = $.trim($("#searchContent").val());
        data1 = {
            page: page,
            keyword: keyword
        }
    }


    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchSecondaryTest",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setPageClone(result)
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    alert(result.message);

                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
    console.log(data1)


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
 * 增加数据
 */
function addData() {
    $('#pass').hide();
    $('#break').hide();
    $('#addModal').find('input').val('');
    $("#addModal").modal("show");
    $('#addTable').siblings().not($("#plusBtn")).remove();
}

/**
 * 预约登记==>新增
 */
function addNewLine(item) {
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide()
    clonedTr.attr('class', 'myclass3');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";


    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn)


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}


/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    tr.parentNode.removeChild(tr);

}

//添加方法
function save() {

    $('.myclass3').each(function () {
        var data = {
            id: $(this).children('td').eq(0).find('input').val(),
            wastesName: $(this).children('td').eq(1).find('input').val(),
            scorchingRate: $(this).children('td').eq(2).find('input').val(),
            water: $(this).children('td').eq(3).find('input').val(),
            remarks: $(this).children('td').eq(4).find('input').val(),
        };
        console.log(data)
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addSecondaryTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {

                }
            },
            error: function (result) {

            }
        })

    })

    alert("添加成功")
    window.location.reload();
}


//提交
function setSubmit(item) {

    var id = $(item).parent().parent().children('td').eq(1).html();

    console.log(id)

    if (confirm("确认提交?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "submitSecondaryTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    window.location.reload();
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }

}

//签收
function setConfirm(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    if (confirm("确认签收?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "confirmSecondaryTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    window.location.reload();
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }
}

//作废
function setCancel(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    if (confirm("确认作废?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelSecondaryTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    window.location.reload();
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }

}

//修改
function setAdjust(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    //根据编号获取信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryTestById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'id': id},
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //赋值
                var obj = eval(result.data);
                console.log(obj)
                $('#id').val(obj.id);
                $('#dateTime').val(getDateStr(obj.dateTime));
                $('#wastesName').val(obj.wastesName);
                $('#scorchingRate').val(obj.scorchingRate.toFixed(2));
                $('#water').val(obj.water.toFixed(2));
                $('#remarks').val(obj.remarks);
            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })

    $('#addModa2').modal('show');
}


//
//次生化验单修改
function adjustSecondaryTest() {
    var data = {
        id: $('#id').val(),
        dateTime: $('#dateTime').val(),
        wastesName: $('#wastesName').val(),
        scorchingRate: $('#scorchingRate').val(),
        water: $('#water').val(),
        remarks: $('#remarks').val()
    }


    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateSecondaryTestById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //赋值
                alert(result.message)
                window.location.reload();

            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })


}

//污水化验校验
function testing(item) {
    $(item).parent().children('p').eq(0).hide()
    $(item).parent().children('p').eq(1).hide()

    var id=$.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingSecondaryTestId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'id':id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                if(result.data==true){
                    $(item).parent().children('p').eq(1).show()
                    $(item).parent().children('p').eq(0).hide()
                }
                if(result.data==false){
                    $(item).parent().children('p').eq(0).show()
                    $(item).parent().children('p').eq(1).hide()
                }
                if($.trim(id).length<=0){
                    $('#pass').hide();
                    $('#break').hide();
                }
            }
        },
        error:function (result) {

        }
    })
}