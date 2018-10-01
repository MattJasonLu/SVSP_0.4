/**
 * Created by matt on 2018/8/2.
 */
var isSearch = false;
var currentPage = 1;                          //当前页数
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
            url: "transportPlanCount",                  // url
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
            url: "searchTransportPlanCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
    if (totalRecord === 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count === 0)
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
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    if (pageNumber === 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber === -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber === undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber === 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber === totalPage()) {
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
            url: "listTransportPlanByPage",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    setDataList(result.data);
                } else {
                    console.log(result);
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
            url: "searchTransportPlan",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
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
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber === undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber === 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber === totalPage()) {
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
                url: "listTransportPlanByPage",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
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
                url: "searchTransportPlan",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
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
 * 分页 获取首页内容
 * */
function loadPageList() {
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listTransportPlanByPage",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
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
    getCheckState();
}

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
                case (1):
                    $(this).html(obj.id);
                    break;
                case (2):
                    $(this).html(getDateStr(obj.createDate));
                    break;
                case (3):
                    $(this).html(obj.author);
                    break;
                case (4):
                    if (obj.checkState != null)
                        $(this).html(obj.checkState.name);
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
 * 查找
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            id: $("#search-draftId").val(),
            checkState: $("#search-checkState").val(),
            produceCompany: {
                companyName: $("#search-produceCompanyName").val()
            },
            transportCompany: {
                companyName: $("#search-transportCompanyName").val()
            },
            acceptCompany: {
                companyName: $("#search-acceptCompanyName").val()
            },
            dispatcher: $("#search-dispatcher").val(),
            destination: $("#search-destination").val(),
            transferTime: $("#search-transferTime").val(),
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchTransportPlan",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;
}

/**
 * 设置高级查询的审核状态数据
 */
function getCheckState() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    if (item.index >= 1 && item.index <= 5) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        checkState.append(option);
                    }
                });
                checkState.get(0).selectedIndex = -1;
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
 * 确认
 */
function setConfirm(e) {
    var r = confirm("确认该运输计划单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransportPlanConfirm",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 作废转移联单
 */
function setInvalid(e) {    //已作废
    var r = confirm("确认作废该运输计划单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransportPlanInvalid",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 提交转移联单
 */
function setSubmit(e) {    //已提交
    var r = confirm("确认提交该运输计划单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransportPlanSubmit",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 审批
 */
function setExamined(e) {    //已作废
    var r = confirm("确认审批该运输计划单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setTransportPlanExamined",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 生成接运单
 */
function generateWayBill(e) {
    var r = confirm("确认生成接运单吗？");
    if (r) {
        // 获取运输计划编号
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "generateWayBill",
            async: false,
            dataType: "json",
            data: {
                id: id
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    var r2 = confirm(result.message + ", 是否查看？");
                    if (r2) $(location).attr('href', 'wayBill1.html');
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 修改数据
 * @param e
 */
function adjustData(e) {
    var id = getIdByMenu(e);
    viewData(e);
    if ($("#editBtnGrp").hasClass("hidden")) {
        $("#editBtnGrp").removeClass("hidden");
        $("#editBtnGrp").addClass("show");
        $("#viewModal").find("[id^='transportPlanItemList']").each(function () {
            var id = $(this).prop('id');
            var content = $(this).text();
            if (id.search("id2") != -1) {
                // 编号不要修改
            } else if (id.search("approachTime2") != -1) {
                $(this).prop('id', '');
                $(this).html("<input type='text' style='width: 100px;' value='" + content + "' id='" + id + "'>");
            } else if (id.search("processWay2") != -1) {
                $(this).prop('id', '');
                if (content == "焚烧")
                    $(this).html("<select id='" + id + "'><option value='Burning' selected>焚烧</option><option value='Landfill'>填埋</option></select>");
                if (content == "填埋")
                    $(this).html("<select id='" + id + "'><option value='Burning'>焚烧</option><option value='Landfill' selected>填埋</option></select>");
            } else {
                $(this).prop('id', '');
                $(this).html("<input type='text' style='width: 50px;' value='" + content + "' id='" + id + "'>");
            }
        });

        $("#editBtnCancel").unbind();
        $("#editBtnCancel").click(function () {
            window.location.reload();
        });

        $("#editBtnSave").unbind();
        $("#editBtnSave").click(function () {
            var data = {};
            data.id = id;
            data['transportPlanItemList'] = [];
            var count = $("input[id$='approachTime2']").length;
            for (var i = 1; i < count; i++) {
                var $i = i;
                var transportPlanItem = {};
                transportPlanItem.id = $("td[id='transportPlanItemList[" + $i + "].id2']").text();
                transportPlanItem.approachTime = $("input[id='transportPlanItemList[" + $i + "].approachTime2']").val();
                var wastes = {};
                wastes.wasteAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount2']").val();
                wastes.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit2']").val();
                wastes.processWay = $("select[id='transportPlanItemList[" + $i + "].wastes.processWay2']").val();
                transportPlanItem.wastes = wastes;
                data.transportPlanItemList.push(transportPlanItem);
            }

            $.ajax({
                type: "POST",
                url: "updateTransportPlan",
                async: false,
                dataType: "json",
                data: JSON.stringify(data),
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        alert(result.message);
                        window.location.reload();
                    } else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    console.log(result);
                    alert("服务器异常");
                }
            });
        });
    }
}

function getSelectedInfo() {
    // 生产单位和接收单位的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listClient",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var produceCompany = $("#produceCompany");
                produceCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    produceCompany.append(option);
                });
                produceCompany.get(0).selectedIndex = -1;

                var acceptCompany = $("#acceptCompany");
                acceptCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    acceptCompany.append(option);
                });
                acceptCompany.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 运输单位的信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSupplier",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var transportCompany = $("#transportCompany");
                transportCompany.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    transportCompany.append(option);
                });
                transportCompany.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 设置物质形态和包装方式的枚举信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesFormType = $("#wastesFormType");
                wastesFormType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastesFormType.append(option);
                });
                wastesFormType.get(0).selectedIndex = -1;
                var wastespackagetype = $("#wastesPackageType");
                wastespackagetype.children().remove();
                $.each(data.packageTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastespackagetype.append(option);
                });
                wastespackagetype.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 进料方式
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategory",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var wastesCategory = $("#wastesCategory");
                wastesCategory.children().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    wastesCategory.append(option);
                });
                wastesCategory.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 八位码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result.data);
                // 各下拉框数据填充
                var wastesInfoList = $("#wastesCode");
                // 清空遗留元素
                wastesInfoList.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesInfoList.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
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
 * 增加数据
 */
function addData() {
    // 设置物料需求表的数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialList",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setMaterialList(result.array);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    $('#appointModal2').modal('show');
    $("#saveBtn1").unbind('click');
    $("#saveBtn1").click(function () {
        // 制作上传数据
        var data = {};
        data['transportPlanItemList'] = [];
        var count = $("td[id$='handleCategory']").length;
        for (var i = 1; i < count; i++) {
            var $i = i;
            var transportPlanItem = {};
            var produceCompany = {};
            var wastes = {};
            produceCompany.companyName = $("td[id='transportPlanItemList[" + $i + "].produceCompany.companyName']").text();
            wastes.name = $("td[id='transportPlanItemList[" + $i + "].wastes.name']").text();
            wastes.wastesId = $("td[id='transportPlanItemList[" + $i + "].wastes.wastesId']").text();
            wastes.wasteAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount']").val();
            wastes.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit']").val();
            wastes.formType = getFormTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.formType']").text());
            wastes.packageType = getPackageTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.packageType']").text());
            wastes.calorific = $("td[id='transportPlanItemList[" + $i + "].wastes.calorific']").text();
            wastes.ph = $("td[id='transportPlanItemList[" + $i + "].wastes.ph']").text();
            wastes.ashPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.ashPercentage']").text();
            wastes.wetPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.wetPercentage']").text();
            wastes.chlorinePercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.chlorinePercentage']").text();
            wastes.sulfurPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.sulfurPercentage']").text();
            wastes.phosphorusPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.phosphorusPercentage']").text();
            wastes.fluorinePercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.fluorinePercentage']").text();
            wastes.processWay = parseInt($("select[id='transportPlanItemList[" + $i + "].wastes.processWay']").val())-1;
            wastes.id = $("td[id='transportPlanItemList[" + $i + "].wastes.id']").text();
            transportPlanItem.handleCategory = getHandleCategoryFromStr($("td[id='transportPlanItemList[" + $i + "].handleCategory']").text());
            transportPlanItem.approachTime = $("input[id='transportPlanItemList[" + $i + "].approachTime']").val();
            transportPlanItem.wastes = wastes;
            transportPlanItem.produceCompany = produceCompany;
            data.transportPlanItemList.push(transportPlanItem);
        }
        console.log(data);
        $.ajax({
            type: "POST",
            url: "addTransportPlan",
            async: false,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    });

    /**
     * 设置物料需求的数据
     */
    function setMaterialList(obj) {
        arrayId = [];
        var tr = $("#cloneTr1");//克隆一行
        //tr.siblings().remove();
        //每日配比量合计
        // tr.siblings().remove();
        dailyProportionsTotal=0;
        //每周需求总量
        weeklyDemandTotal=0;
        //热值最大总量
        calorificmaxTotal=0;
        //热值最小总量
        calorificminTotal=0;
        //灰分最大总量
        ashmaxTotal=0;
        //灰分最小总量
        ashminTotal=0;
        //水分最大总量
        watermaxTotal=0;
        //水分最小总量
        waterminTotal=0;
        //氯最大总量
        clmaxTotal=0;
        //氯最大总量
        clminTotal=0;
        //硫最大总量
        smaxTotal=0;
        //硫最小总量
        sminTotal=0;
        //磷最大总量
        pmaxTotal=0;
        //磷最小总量
        pminTotal=0;
        //弗最大总量
        fmaxTotal=0;
        //弗最小总量
        fminTotal=0;
        //PH最大总量
        phmaxTotal=0;
        //PH最小总量
        phminTotal=0;
        //目前库存总量
        currentInventoryTotal=0;
        //安全库存总和
        safetyTotal=0;
        //市场采购量总和
        marketPurchasesTotal=0;
        // console.log(obj);
        $.each(obj, function (index, item) {
            var data = eval(item);
            // console.log(data);
            //console.log(index);
            var clonedTr = tr.clone();
            clonedTr.children("td").each(function (inner_index) {
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 序号
                    case (0):
                        $(this).html(index+1);
                        break;
                    //处理类别
                    case (1):
                        // $(this).html();
                        //判断是否是物流合同
                        if (data.handleCategory != null) {
                            $(this).html(data.handleCategory.name);
                        }
                        else {
                            $(this).html("");
                        }
                        break;
                    // 包装方式
                    case (2):
                        if (data.packageType != null)
                            $(this).html(data.packageType.name);
                        else {
                            $(this).html("");
                        }
                        break;
                    //形态
                    case (3):
                        if (data.formType != null) {
                            $(this).html(data.formType.name);
                        }
                        else { $(this).html("");}

                        break;
                    // 周生产计划量(T)
                    case (4):
                        $(this).html(data.weeklyDemand);
                        dailyProportionsTotal+=data.weeklyDemand;
                        break;
                    //目前库存量(T)
                    case (5):
                        $(this).html(data.currentInventory);
                        currentInventoryTotal+=data.currentInventory;
                        break;
                    // 安全库存量(T)
                    case (6):
                        $(this).html(data.safety);
                        safetyTotal+=data.safety;
                        break;
                    // 市场采购量
                    case (7):
                        $(this).html(data.marketPurchases);
                        marketPurchasesTotal+=data.marketPurchases;
                        break;
                    //热值max
                    case (8):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1=eval(item);
                            if (obj1.parameter.name =="热值") {
                                calorificmax=obj1.maximum;
                                calorificmaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(calorificmax);
                        break;
                    //热值min
                    case (9):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="热值") {
                                calorificmix= obj1.minimum;
                                calorificminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(calorificmix);
                        break;
                    //灰分max
                    case (10):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="灰分") {
                                ascmax= obj1.maximum;
                                ashmaxTotal+=obj1.maximum;

                            }
                        });
                        $(this).html(ascmax);
                        break;
                    //灰分min
                    case (11):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="灰分") {
                                ascmix= obj1.minimum;
                                ashminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(ascmix);
                        break;
                    //水分max
                    case (12):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="含水率") {
                                watermax= obj1.maximum;
                                watermaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(watermax);
                        break;
                    //水分min
                    case (13):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="含水率") {
                                watermin= obj1.minimum;
                                waterminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(watermin);
                        break;
                    //硫max
                    case (14):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="硫含量") {
                                smax= obj1.maximum;
                                smaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(smax);
                        break;
                    //硫min
                    case (15):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="硫含量") {
                                smin= obj1.minimum;
                                sminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(smin);
                        break;
                    //氯max
                    case (16):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="氯含量") {
                                clmax= obj1.maximum;
                                clmaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(clmax);
                        break;
                    //氯min
                    case (17):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="氯含量") {
                                clmin= obj1.minimum;
                                clminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(clmin);
                        break;
                    //磷max
                    case (18):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="磷含量") {
                                pmax= obj1.maximum;
                                pmaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(pmax);
                        break;
                    //磷min
                    case (19):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="磷含量") {
                                pmin= obj1.minimum;
                                pminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(pmin);
                        break;
                    //氟max
                    case (20):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="氟含量") {
                                fmax= obj1.maximum;
                                fmaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(fmax);
                        break;
                    //氟min
                    case (21):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="氟含量") {
                                fmin= obj1.minimum;
                                fminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(fmin);
                        break;
                    //phmax
                    case (22):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="酸碱度") {
                                phmax= obj1.maximum;
                                phmaxTotal+=obj1.maximum;
                            }
                        });
                        $(this).html(phmax);
                        break;
                    //phmin
                    case (23):
                        $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                            var obj1 = eval(item);
                            if (obj1.parameter.name =="酸碱度") {
                                phmin= obj1.minimum;
                                phminTotal+=obj1.minimum;
                            }
                        });
                        $(this).html(phmin);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.removeAttr("style");
            clonedTr.insertBefore(tr);

        });
        // 隐藏无数据的tr
        tr.hide();
        //赋值
        $("#dailyProportionsTotal").text(dailyProportionsTotal);
        $("#currentInventoryTotal").text(currentInventoryTotal);
        $("#safetyTotal").text(safetyTotal);
        $("#marketPurchasesTotal").text(marketPurchasesTotal);
        $("#calorificmaxTotal").text(calorificmaxTotal);
        $("#calorificminTotal").text(calorificminTotal);
        $("#ashmaxTotal").text(ashmaxTotal);
        $("#ashminTotal").text(ashminTotal);
        $("#watermaxTotal").text(watermaxTotal);
        $("#waterminTotal").text(waterminTotal);
        $("#smaxTotal").text(smaxTotal);
        $("#sminTotal").text(sminTotal);
        $("#clmaxTotal").text(clmaxTotal);
        $("#clminTotal").text(clminTotal);
        $("#pmaxTotal").text(pmaxTotal);
        $("#pminTotal").text(pminTotal);
        $("#fmaxTotal").text(fmaxTotal);
        $("#fminTotal").text(fminTotal);
        $("#phmaxTotal").text(phmaxTotal);
        $("#phminTotal").text(phminTotal);
    }
}
function view2(e) {
    // 获取处置类别
    var handleType = getHandleType(e);
    // 设置危废明细数据
    setWastesData();
    $("input[type='checkbox']:checked").prop('checked', false);
    // 显示
    $('#appointModal1').modal('show');
    // 取消绑定
    $("#saveBtn2").unbind('click');
    // 重新绑定
    $("#saveBtn2").click(function () {
        saveData(handleType);
    });
}

/**
 * 获取进料方式
 * @param e 操作按钮
 */
function getHandleType(e) {
    $(e).parent().parent().find("td[name='handleCategory']").text();
}

function setWastesData() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getTransportPlanWastesList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setWastesDataList(result.data);
            } else {
                alert(result.message);
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
    function setWastesDataList(result) {
        // 获取id为cloneTr的tr元素
        var tr = $("#wastesClonedTr");
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
                        if (obj.client != null)
                            $(this).html(obj.client.companyName);
                        break;
                    case (2):
                        $(this).html(obj.name);
                        break;
                    case (3):
                        $(this).html(obj.wastesId);
                        break;
                    case (4):
                        if (obj.formType != null)
                            $(this).html(obj.formType.name);
                        break;
                    case (5):
                        if (obj.packageType != null)
                            $(this).html(obj.packageType.name);
                        break;
                    case (6):
                        $(this).html(obj.calorific);
                        break;
                    case (7):
                        $(this).html(obj.ph);
                        break;
                    case (8):
                        $(this).html(obj.ashPercentage);
                        break;
                    case (9):
                        $(this).html(obj.wetPercentage);
                        break;
                    case (10):
                        $(this).html(obj.chlorinePercentage);
                        break;
                    case (11):
                        $(this).html(obj.sulfurPercentage);
                        break;
                    case (12):
                        $(this).html(obj.phosphorusPercentage);
                        break;
                    case (13):
                        $(this).html(obj.fluorinePercentage);
                        break;
                    case (14):
                        $(this).html(obj.id);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
        tr.first().remove();
    }
}

function saveData(handleType) {
    // 获取选中的复选框
    var items = $("input[name='select']:checked");
    var count = items.length;
    // 获取选中的危废列表信息
    var wastesList = [];
    $.each(items, function (index) {
        if (index < count) {
            var wastes = {};
            var params = [];
            var param_0 = $(this).parent().parent();
            params.push(param_0);
            for (var i = 0; i < 14; i++) {
                var param = param_0.next();
                param_0 = param;
                params.push(param.text());
            }
            wastes.companyName = params[1];
            wastes.name = params[2];
            wastes.wastesId = params[3];
            wastes.formType = params[4];
            wastes.packageType = params[5];
            wastes.heat = params[6];
            wastes.ph = params[7];
            wastes.ash = params[8];
            wastes.water = params[9];
            wastes.chlorine = params[10];
            wastes.sulfur = params[11];
            wastes.phosphorus = params[12];
            wastes.fluorine = params[13];
            wastes.id = params[14];
            wastes.handleType = handleType;
            wastesList.push(wastes);
        }
    });
    // 将捕获到的信息载入到计划中
    setWastesData2(wastesList);
    $('#appointModal1').modal('hide');
    $('#appointModal2').modal('show');
}

function setWastesData2(wastesList) {
    // console.log(wastesList.length);
    // 获取id为cloneTr的tr元素
    var tr = $("#wastesClonedTr2");
    var id = tr.siblings().length;
    for (var i = 0; i < wastesList.length; i++) {
        var obj = wastesList[i];
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        changeId(clonedTr, id);
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(id++);
                    break;
                case (1):
                    $(this).html(obj.companyName);
                    break;
                case (2):
                    $(this).html(obj.handleType);
                    break;
                case (4):
                    $(this).html(obj.name);
                    break;
                case (5):
                    $(this).html(obj.wastesId);
                    break;
                case (8):
                    $(this).html(obj.formType);
                    break;
                case (9):
                    $(this).html(obj.packageType);
                    break;
                case (10):
                    $(this).html(obj.heat);
                    break;
                case (11):
                    $(this).html(obj.ph);
                case (12):
                    $(this).html(obj.ash);
                    break;
                case (13):
                    $(this).html(obj.water);
                    break;
                case (14):
                    $(this).html(obj.chlorine);
                    break;
                case (15):
                    $(this).html(obj.sulfur);
                    break;
                case (16):
                    $(this).html(obj.phosphorus);
                    break;
                case (17):
                    $(this).html(obj.fluorine);
                    break;
                case (19):
                    $(this).html(obj.id);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    }
    // 隐藏无数据的tr
    tr.hide();
    // 设置时间格式
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
    });
    /**
     * 改变id
     * @param element
     */
    function changeId(element, index) {
        element.find("td[id*='transportPlanItemList'],input[id*='transportPlanItemList'],select[id*='transportPlanItemList']").each(function () {
            var oldId = $(this).prop("id");
            var newId = oldId.replace(/[0-9]\d*/, index);
            $(this).prop('id', newId);
        });
    }
}

/**
 * 查看数据
 * @param e
 */
function viewData(e) {
    $("#viewModal").find('input:text').val('');
    $("#viewModal").find('input:checkbox').prop('checked', false);
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getTransportPlanById",
        async: false,
        dataType: "json",
        data: {
            "id": id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
    $("#viewModal").modal("show");

    /**
     * 设置数据
     * @param result
     */
    function setDataList(result) {
        // 获取id为cloneTr的tr元素
        var tr = $("#cloneTrView");
        tr.siblings().remove();
        $.each(result.transportPlanItemList, function (index, item) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                changeId(clonedTr, index+1);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (0):
                        $(this).html(index+1);
                        break;
                    case (2):
                        if (obj.produceCompany != null)
                            $(this).html(obj.produceCompany.companyName);
                        break;
                    case (3):
                        if (obj.handleCategory != null)
                            $(this).html(obj.handleCategory.name);
                        break;
                    case (4):
                        $(this).html(getDateStr(obj.approachTime));
                        break;
                    case (5):
                        $(this).html(obj.wastes.name);
                        break;
                    case (6):
                        $(this).html(obj.wastes.wastesId);
                        break;
                    case (7):
                        $(this).html(obj.wastes.wasteAmount);
                        break;
                    case (8):
                        $(this).html(obj.wastes.unit);
                        break;
                    case (9):
                        if (obj.wastes.formType != null)
                            $(this).html(obj.wastes.formType.name);
                        break;
                    case (10):
                        if (obj.wastes.packageType != null)
                            $(this).html(obj.wastes.packageType.name);
                        break;
                    case (11):
                        $(this).html(obj.wastes.calorific);
                        break;
                    case (12):
                        $(this).html(obj.wastes.ph);
                        break;
                    case (13):
                        $(this).html(obj.wastes.ashPercentage);
                        break;
                    case (14):
                        $(this).html(obj.wastes.wetPercentage);
                        break;
                    case (15):
                        $(this).html(obj.wastes.chlorinePercentage);
                        break;
                    case (16):
                        $(this).html(obj.wastes.sulfurPercentage);
                        break;
                    case (17):
                        $(this).html(obj.wastes.phosphorusPercentage);
                        break;
                    case (18):
                        $(this).html(obj.wastes.fluorinePercentage);
                        break;
                    case (19):
                        if (obj.wastes.processWay != null)
                            $(this).html(obj.wastes.processWay.name);
                        break;
                    case (20):
                        $(this).html(obj.id);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        // 隐藏无数据的tr
        tr.hide();
        $("#id").val(result.id);
        $("#author").val(result.author);
        $("#departmentDirector").val(result.departmentDirector);
        $("#group").val(result.group);
        $("#productionDirector").val(result.productionDirector);

        /**
         * 改变id
         * @param element
         */
        function changeId(element, index) {
            element.find("td[id*='transportPlanItemList']").each(function () {
                var oldId = $(this).prop("id");
                var newId = oldId.replace(/[0-9]\d*/, index);
                $(this).prop('id', newId);
            });
        }
    }
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return $(e).parent().parent().find("td[name='id']").text();
}

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    alert("功能即将上线");
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
    var filePath = 'Files/Templates/转移联单_320046201703310001(模板).pdf';
    var r = confirm("是否下载模板?");
    if (r == true) {
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
            url: "importTransferDraft",              // url
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
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },400);
    });
});

// 覆盖Modal.prototype的hideModal方法
$.fn.modal.Constructor.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
        //判断当前页面所有的模态框都已经隐藏了之后body移除.modal-open，即body出现滚动条。
        $('.modal.fade.in').length === 0 && that.$body.removeClass('modal-open');
        that.resetAdjustments();
        that.resetScrollbar();
        that.$element.trigger('hidden.bs.modal');
    })
};

// 页面变黑
$(document).on('show.bs.modal', '.modal', function(event) {
    $(this).appendTo($('body'));
}).on('shown.bs.modal', '.modal.in', function(event) {
    setModalsAndBackdropsOrder();
}).on('hidden.bs.modal', '.modal', function(event) {
    setModalsAndBackdropsOrder();
});

function setModalsAndBackdropsOrder() {
    var modalZIndex = 1040;
    $('.modal.in').each(function(index) {
        var $modal = $(this);
        modalZIndex++;
        $modal.css('zIndex', modalZIndex);
        $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
    });
    $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
}