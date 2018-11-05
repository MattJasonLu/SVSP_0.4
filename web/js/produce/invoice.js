/**
 * 显示信息
 */
function viewClient() {
    $.ajax({
        type: "POST",                // 方法类型
        url: "getClient",            // url
        async: false,
        dataType: "json",
        data:{
            id: "0168"
        },
        success: function (result) {
            if (result != undefined) {
                if(result.companyName != null)
                $("#companyName").val(result.companyName);//index + 1
                if(result.organizationCode != null)
                $("#organizationCode").val(result.organizationCode);
                if(result.representative != null)
                $("#representative").val(result.representative);
                if(result.industry != null)
                $("#industry").val(result.industry);
                if(result.enterpriseType != null)
                $("#enterpriseType").val(result.enterpriseType.name);
                if(result.operationType != null)
                $("#operationType").val(result.operationType.name);
                if(result.operationRecord != null)
                $("#operationRecord").val(result.operationRecord.name);
                if(result.street != null)
                $("#street").val(result.street);
                if(result.clientId != null)
                $("#clientId").val(result.clientId);
                if(result.licenseCode != null)
                $("#licenseCode").val(result.licenseCode);
                if(result.postCode != null)
                $("#postCode").val(result.postCode);
                if(result.product != null)
                $("#product").val(result.product);
                if(result.operationMode != null)
                $("#operationMode").val(result.operationMode.name);
                if(result.contingencyPlan != null)
                $("#contingencyPlan").val(result.contingencyPlan.name);
                if(result.applicationStatus != null)
                $("#applicationStatus").val(result.applicationStatus.name);
                if(result.location != null)
                $("#location").val(result.location);
            } else {
                console.log(result.message);
            }

        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setInvoicedList();
}

/**
 * 更新信息
 */
function updateClient() {
    // $.ajax({
    //     type: "POST",                // 方法类型
    //     url: "getClient",            // url
    //     async: false,
    //     dataType: "json",
    //     data:{
    //         id: "0168"
    //     },
    //     success: function (result) {
    //         if (result != undefined) {
    //             $("#companyName").val(result.companyName);//index + 1
    //             $("#organizationCode").val(result.organizationCode);
    //             $("#representative").val(result.representative);
    //             $("#industry").val(result.industry);
    //             $("#enterpriseType").val(result.enterpriseType.name);
    //             $("#operationType").val(result.operationType.name);
    //             $("#operationRecord").val(result.operationRecord.name);
    //             $("#street").val(result.street);
    //             $("#clientId").val(result.clientId);
    //             $("#licenseCode").val(result.licenseCode);
    //             $("#postCode").val(result.postCode);
    //             $("#product").val(result.product);
    //             $("#operationMode").val(result.operationMode.name);
    //             $("#contingencyPlan").val(result.contingencyPlan.name);
    //             $("#applicationStatus").val(result.applicationStatus.name);
    //             $("#location").val(result.location);
    //         } else {
    //             console.log(result.message);
    //         }
    //
    //     },
    //     error: function (result) {
    //         console.log("error: " + result);
    //         console.log("失败");
    //     }
    // });
    var data;
    // $('.myclass2').each(function () {
    //     index++;
    //     data = {
    //         companyName: $(this).children('td').eq(1).children('input').val(),
    //         organizationCode: $(this).children('td').eq(3).children('input').val(),
    //         representative: $(this).children('td').eq(1).html(),
    //         industry: $(this).children('td').eq(3).children('input').val(),
    //         enterpriseType: $(this).children('td').eq(1).children('input').val(),
    //         operationType: $(this).children('td').eq(3).children('input').val(),
    //         operationRecord: $(this).children('td').eq(1).children('input').val(),
    //         street: $(this).children('td').eq(3).children('input').val(),
    //         clientId: $(this).children('td').eq(1).children('input').val(),
    //         licenseCode: $(this).children('td').eq(3).children('input').val(),
    //         postCode: $(this).children('td').eq(1).children('input').val(),
    //         product: $(this).children('td').eq(3).children('input').val(),
    //         operationMode: $(this).children('td').eq(1).children('input').val(),
    //         contingencyPlan: $(this).children('td').eq(3).children('input').val(),
    //         applicationStatus: $(this).children('td').eq(1).children('input').val(),
    //         location: $(this).children('td').eq(3).children('input').val()
    //     };
    // });
    data = {
        clientId: '0168',
        companyName: $("#companyName").val(),
        organizationCode: $("#organizationCode").val(),
        representative: $("#representative").val(),
        industry: $("#industry").val(),
        enterpriseType: $("#enterpriseType").val(),
        operationType: $("#operationType").val(),
        operationRecord: $("#operationRecord").val(),
        street: $("#street").val(),
        licenseCode: $("#licenseCode").val(),
        postCode: $("#postCode").val(),
        product: $("#product").val(),
        operationMode: $("#operationMode").val(),
        contingencyPlan: $("#contingencyPlan").val(),
        // applicationStatus: $("#applicationStatus").val(),
        location: $("#location").val()
    };
    console.log(data);
    //更新字表数据
    $.ajax({
        type: "POST",
        url: "saveClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            } else {
                console.log(result)
            }
        },
        error: function (result) {
            console.log("服务器异常！")
        }
    });
}
function readyForUpdate() {
    $("#table").find("input").removeAttr("readonly");
    // $("#save").className="hidden";
    // $("#close").className="hidden";
    $("#save").removeAttr("class","hidden");
    $("#close").removeAttr("class","hidden");
    $("#print").setAttribute("class","hidden");
}

/**
 * 设置下拉框数据
 */
function setInvoicedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 下拉框数据填充
                var enterpriseType = $("#enterpriseType");
                enterpriseType.children().remove();
                $.each(data.enterpriseTypeStrList, function (index, item) {
                    if (item.index >= 1 && item.index <= 3) {
                        var option = $('<option />');
                        option.val(item.index);
                        option.text(item.name);
                        enterpriseType.append(option);
                    }
                });
                enterpriseType.get(0).selectedIndex = -1;
                //
                var operationMode = $("#operationMode");
                operationMode.children().remove();
                $.each(data.operationModeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    operationMode.append(option);
                });
                operationMode.get(0).selectedIndex = -1;
                //
                var operationType = $("#operationType");
                operationType.children().remove();
                $.each(data.operationTypeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    operationType.append(option);
                });
                operationType.get(0).selectedIndex = -1;
                //
                var contingencyPlan = $("#contingencyPlan");
                contingencyPlan.children().remove();
                $.each(data.contingencyPlanStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    contingencyPlan.append(option);
                });
                contingencyPlan.get(0).selectedIndex = -1;
                //
                var operationRecord = $("#operationRecord");
                operationRecord.children().remove();
                $.each(data.operationRecordStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    operationRecord.append(option);
                });
                operationRecord.get(0).selectedIndex = -1;
                //
                var applicationStatus = $("#applicationStatus");
                applicationStatus.children().remove();
                $.each(data.applicationStatusStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index);
                    option.text(item.name);
                    applicationStatus.append(option);
                });
                applicationStatus.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}


/////////////显示登陆日志（分页）//////////////////////
/**
 * 分页 获取登陆日志首页内容
 * */
function showLog() {
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
        url: "getAllLog",                      // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
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
}

function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var id = 1;
    var tr = $("#clonedTr2");
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
                case (0):
                    $(this).html(id++);
                    break;
                // 编号
                case (1):
                    $(this).html(obj.username);
                    break;
                //登录名
                case (2):
                    $(this).html(obj.ip);
                    break;
                // IP
                case (3):
                    $(this).html(getTimeStr(obj.time));
                    break;
                // 时间
                case (4):
                    $(this).html(obj.name);
                    break;
                // 姓名
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
}

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    var name = 't_loginlog';
    var sqlWords = "select * from t_loginlog;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

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
            url: "totalLogRecord",                  // url
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
            url: "searchLogTotal",                  // url
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
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();          // 删除之前克隆页码
    setDataList(result);             // 设置数据
    $("#next").prev().hide();            // 将页码克隆模板隐藏
    var total = totalPage();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    for (var i = 0; i < total; i++) {
        var li = $("#next").prev();
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(i + 1);          // 页数赋值
        clonedLi.find('a:first-child').click(function () {    // 设置点击事件
            var num = $(this).text();
            switchPage(num);        // 跳转页面
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
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(currentPage);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getAllLog",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setDataList(result.data);
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
            url: "searchLog",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
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
        setPageCloneAfter(pageNumber);
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getAllLog",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
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
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchLog",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
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
    }
}


/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        search();      //
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
                search();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search();      //
            }
        }, 600);
    });
});

/**
 * 查询功能
 */
function search() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-wayBillState").val() === 0) state = "NewBuild";//新建
    if ($("#search-wayBillState").val() === 1) state = "ToExamine";//待审批
    if ($("#search-wayBillState").val() === 2) state = "Examining";//审批中
    if ($("#search-wayBillState").val() === 3) state = "Approval";//审批通过
    if ($("#search-wayBillState").val() === 4) state = "Backed";//驳回
    if ($("#senior").is(':visible')) {
        data = {
            username: $.trim($("#search-username").val()),
            ip: $.trim($("#search-ip").val()),
            name: $.trim($("#search-name").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
        data = {
            page: page,
            keywords: keywords
        }
    }
    console.log("data");
    console.log(data);
    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchLog",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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

