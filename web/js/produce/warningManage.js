/*****
 *
 * 预警模块脚本
 */

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

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
            url: "totalWarningRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
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
    }
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchWaringCount",                  // url
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
    setWarning(result);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadWarningList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setWarning(result);
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
            type: "POST",                            // 方法类型
            url: "searchWaring",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setWarning(result);
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
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
                url: "loadWarningList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWarning(result);
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
                url: "searchWaring",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWarning(result);
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
 * 加载页面
 */
function loadWarningList() {
    $('#btn').hide();
    $('#plusBtn').hide();
    loadNavigationList();   // 设置动态菜单
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
        type: "POST",
        url: "loadWarningList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result);
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


}


/**
 * 设置数据
 */

function setWarning(result) {
    var tr = $('#clonedTr');

    tr.siblings().not($("#plusBtn")).remove();

    $.each(result.warningList, function (index, item) {
        var data = eval(item);
        // console.log(data)
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass');
        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index + 1);
                    break;
                //名称
                case (1):
                    $(this).html(data.warningName);
                    break;
                // 阈值
                case (2):
                    $(this).html(data.warningThreshold);
                    break;
                //单位
                case (3):
                    $(this).html(data.warningUnit);
                    break;
                //编号
                case (4):
                    $(this).html(data.id);
                    break;
                //状态
                case (5):
                    if (data.useable === 1) {
                        $(this).html('启用中');
                    } else {
                        $(this).html('已失效');
                    }
                    break;
            }
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        //把克隆好的tr追加到原来的tr前面
        // 隐藏无数据的tr


    });
    tr.hide();
}

/**
 * 新增
 */
function addNewLine(item) {


    var tr = $(item).parent().parent().prev();

    //获取前一个行的序号,然后+1
    var id = $('.myclass').length + 1;

    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide();
    clonedTr.attr('class', 'myclass');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";


    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).html(id);
    if (id != 1) {
        clonedTr.children('td').eq(0).append(delBtn)
    }


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}

/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    tr.parentNode.removeChild(tr);

    // $('.myclass').each(function (index,item) {
    //  $(this).children('td').eq(0).html(index+1);
    //     if((index+1)!=1){
    //         var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";
    //         $(this).children('td').eq(0).append(delBtn)
    //     }
    //
    // })


}

/***
 * 编辑按钮
 */
function edit() {
    $("#btn").show();
    $('#plusBtn').show();
    var tr = $('#clonedTr');
    var input1 = "<input type='text' class='form-control'>";
    var input2 = "<input  type='number'  class='form-control' style='width: 100%;height: 100%'/>";
    var input3 = " <input type='text' class='form-control'>";
    tr.children('td').eq(1).html(input1);
    tr.children('td').eq(2).html(input2);
    tr.children('td').eq(3).html(input3);

    if ($('.myclass').length == 0) {

        var tr = $('#clonedTr');
        var cloneTr = tr.clone();
        cloneTr.attr('class', 'myclass');
        cloneTr.removeAttr("id")
        cloneTr.children('td').eq(0).html(1);

        var input1 = "<input type='text' class='form-control'>";
        var input2 = "<input  type='number'  class='form-control' style='width: 100%;height: 100%'/>";
        var input3 = " <input type='text' class='form-control'>";
        cloneTr.children('td').eq(1).html(input1);
        cloneTr.children('td').eq(2).html(input2);
        cloneTr.children('td').eq(3).html(input3);

        cloneTr.show();
        cloneTr.insertBefore(tr);


    }


    $('.myclass').each(function () {
        $(this).children('td').eq(0).find('a').show();
        if ($(this).children('td').eq(1).children('input').length <= 0) {
            var value1 = $(this).children('td').eq(1).html();
            var input1 = "<input type='text' class='form-control' value=" + value1 + ">";
            $(this).children('td').eq(1).html(input1)
        }

        if ($(this).children('td').eq(2).children('input').length <= 0) {
            var value2 = $(this).children('td').eq(2).html();
            var input2 = "<input  type='number'  class='form-control' style='width: 100%;height: 100%' value=" + value2 + ">";
            $(this).children('td').eq(2).html(input2)
        }

        if ($(this).children('td').eq(3).children('input').length <= 0) {
            var value3 = $(this).children('td').eq(3).html();
            var input3 = "<input type='text' class='form-control' value=" + value3 + ">";
            $(this).children('td').eq(3).html(input3)
        }

        // if($(this).children('td').eq(0).html()!=1){
        //     var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";
        //
        //     $(this).children('td').eq(0).append(delBtn)
        // }

    });
}

/***
 * 取消按钮
 *
 * */
function cancel() {
    // //1div隐藏
    // $('#btn').hide();
    // //2加行减行隐藏
    // $('#plusBtn').hide();
    // $('.myclass').each(function () {
    //     $(this).children('td').eq(0).find('a').hide();
    // })

    //直接刷新
    window.location.reload();


}

/***
 * 保存按钮
 */
function save() {
    $('.myclass').each(function () {
        if ($(this).children('td').eq(1).find('input').val().length != 0) {
            var data = {
                warningName: $(this).children('td').eq(1).find('input').val(),
                warningThreshold: $(this).children('td').eq(2).find('input').val(),
                warningUnit: $(this).children('td').eq(3).find('input').val(),
                id: $(this).children('td').eq(4).html(),
            };
            console.log(data);
            //更新或添加
            $.ajax({
                type: "POST",                       // 方法类型
                url: "AddOrUpdateWarning",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {

                    }
                    else {
                        alert(result.message)
                    }
                },
                error: function (result) {
                    alert("服务器异常!")
                }
            })
        }

    })
    alert("编辑成功")
    window.location.reload();
}

/**
 * 删除
 */
function removeWarning(item) {
    if (confirm("确定作废?")) {
        //点击确定后操作
        var id = $(item).parent().prev().prev().html();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "deleteWarning",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'id': id
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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

/*启用*/
function reStart(item) {
    if (confirm("确定启用?")) {
        //点击确定后操作
        var id = $(item).parent().prev().prev().html();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "reStartWarning",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'id': id
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchWarning();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchWarning();      //
            }
        }, 600);
    });
});

//高级查询
function searchWarning() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {

        data1 = {
            page: page,
            warningName: $.trim($('#search-name').val()),
            warningThreshold: $.trim($('#search-warningThreshold').val()),
            warningUnit: $.trim($('#search-warningUnit').val()),
        };
    }
    else {
        var keywords = $.trim($("#searchContent").val());
        data1 = {
            page: page,
            keywords: keywords
        }
    }


    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchWaring",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setPageClone(result)
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
        searchWarning();      //
    }
}

var aId;   // 预警外键ID

/**
 * 角色配置模态框显示
 */
function showChargeModal(e) {
    aId = $(e).parent().prev().prev().html();  // 保存ID
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setDataList(result.data);   // 设置角色数据
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    /**
     * 设置数据
     * @param result
     */
    function setDataList(result) {
        // 获取id为cloneTr的tr元素
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
                    // 编号
                    case (1):
                        $(this).html(obj.id);
                        break;
                    case (2):
                        $(this).html(obj.roleName);
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
    $("#chargeModal").modal('show');
}

/**
 * 设置选中
 */
function selected(e) {
    var isChecked = $(e).find("input[name='select']").prop('checked');
    if (isChecked) {
        $(e).find("input[name='select']").prop('checked', true);
    } else {
        $(e).find("input[name='select']").prop('checked', false);
    }
}

/**
 * 保存角色配置数据
 */
function saveRole() {
    var warning = {};
    warning.id = aId;    // 设置外键
    warning.roleIdList = [];
    $.each($("input[name='select']:checked"), function (index, item) {   //  遍历所有选中的角色
        var roleId = $(item).parent().parent().next().text();  // 获取角色ID
        warning.roleIdList.push(roleId);  // 装到数组中去
    });
    $.ajax({
        type: "POST",                            // 方法类型
        url: "updateWarningRoleIdList",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(warning),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                $("#chargeModal").modal('hide');
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

/**
 * 显示详细配置模态框
 */
function showDetailModal(e) {
    aId = $(e).parent().prev().prev().html();  // 保存ID
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getWarningDetailById",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id : aId
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setDataList(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });

    /**
     * 设置数据
     * @param data
     */
    function setDataList(data) {
        // 获取id为cloneTr的tr元素
        var tr = $("#cloneTr1");
        $(".newLine").remove();
        var serialNumber = 1;
        $.each(data, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            clonedTr.addClass("newLine");
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 编号
                    case (0):
                        $(this).find("span").text(serialNumber);
                        break;
                    case (1):
                        $(this).find("input").val(obj.warningName);
                        break;
                    case (2):
                        $(this).find("input").val(obj.warningThreshold);
                        break;
                    case (3):
                        $(this).find("input").val(obj.warningUnit);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
            serialNumber++;
        });
        // 隐藏无数据的tr
        tr.hide();
    }
    $("#detailModal").modal('show');
}

/**
 * 新增
 */
function addNewDetailLine(item) {
    var tr = $("#cloneTr1");
    //获取前一个行的序号,然后+1
    var serialNumber = $('#tbody').children().length - 1;
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide();
    clonedTr.attr('class', 'newLine');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    clonedTr.children().find("input[name='unit']").val("天");
    clonedTr.find("span[name='serialNumber']").text(serialNumber);
    clonedTr.insertBefore(tr);
    clonedTr.removeAttr("id");
}

/**
 * 删除行
 */
function delDetailLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
    var serialNumber = 1;
    $.each($('#tbody').children(), function (index, item) {  // 更新序号
        $(item).find("span[name='serialNumber']").text(serialNumber);
        serialNumber++;
    });
}

/**
 * 保存详细配置数据
 */
function saveDetail() {
    var warning = {};
    warning.id = aId;   // 设置外键
    warning.warningList = [];
    // 获取最新数据
    $.each($("#cloneTr1").prevAll(), function(index,item){
        var detial = {};
        detial.warningName = $(item).find("input[name='name']").val();
        detial.warningThreshold = $(item).find("input[name='threshold']").val();
        detial.warningUnit = $(item).find("input[name='unit']").val();
        warning.warningList.push(detial);
    });
    $.ajax({
        type: "POST",                            // 方法类型
        url: "updateWarningDetail",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(warning),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                $("#detailModal").modal('hide');
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