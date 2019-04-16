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
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    console.log(page);
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
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
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchData();
        window.localStorage.removeItem('approvalId');
    }else {
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
    }
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
                    if (obj.checkStateItem != null)
                        $(this).html(obj.checkStateItem.dictionaryItemName);
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
            id: $("#search-id").val(),
            checkStateItem: {
                dataDictionaryItemId: $("#search-checkState").val()
            },
            departmentDirector: $("#beginTime").val(),
            productionDirector: $("#endTime").val(),
            author: $("#search-author").val(),
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
    // 设置审批状态
    $.ajax({
        type: "POST",
        url: "getCheckStateDataByDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    if (item.dataDictionaryItemId == 73 ||
                        item.dataDictionaryItemId == 74 ||
                        item.dataDictionaryItemId == 76 ||
                        item.dataDictionaryItemId == 69 ||
                        item.dataDictionaryItemId == 75) {
                        var option = $('<option />');
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        checkState.append(option);
                    }
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
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
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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
    initSubmitFName(setTransportPlanSubmit.name);
    var r = confirm("确认提交该运输计划单吗？");

    if (r) {
        var id = getIdByMenu(e);
        publicSubmit(id,getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
        // $.ajax({
        //     type: "POST",
        //     url: "setTransportPlanSubmit",
        //     async: false,
        //     dataType: "json",
        //     data: {
        //         id: id
        //     },
        //     success: function (result) {
        //         if (result != undefined && result.status == "success") {
        //             console.log(result);
        //             alert(result.message);
        //             window.location.reload();
        //         } else {
        //             alert(result.message);
        //         }
        //     },
        //     error: function (result) {
        //         console.log(result);
        //         alert("服务器异常");
        //     }
        // });
    }
}

function setTransportPlanSubmit(id) {
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
/**
 * 审批
 */
function setExamined(id) {    //已作废



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

/*驳回*/
function setTransportPlanBack(id) {    //已作废



    $.ajax({
        type: "POST",
        url: "setTransportPlanBack",
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                // alert(result.message);
                // window.location.reload();
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
    $("#viewModal").find('input:text').val('');
    $("#viewModal").find('input:checkbox').prop('checked', false);
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
    if (!$("#viewBtnGrp").hasClass("hidden")) $("#viewBtnGrp").addClass("hidden");
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
                transportPlanItem.wastesAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount2']").val();
                transportPlanItem.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit2']").val();
                transportPlanItem.processWay = $("select[id='transportPlanItemList[" + $i + "].wastes.processWay2']").val();
                data.transportPlanItemList.push(transportPlanItem);
            }
            console.log(data);

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
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
                        $('#viewModal').modal('hide');
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
                        $(this).html(obj.wastesName);
                        break;
                    case (6):
                        $(this).html(obj.wastesCode);
                        break;
                    case (7):
                        $(this).html(obj.wastesAmount);
                        break;
                    case (8):
                        $(this).html(obj.unit);
                        break;
                    case (9):
                        if (obj.formType != null)
                            $(this).html(obj.formType.name);
                        break;
                    case (10):
                        if (obj.packageType != null)
                            $(this).html(obj.packageType.name);
                        break;
                    case (11):
                        $(this).html(obj.heat);
                        break;
                    case (12):
                        $(this).html(obj.ph);
                        break;
                    case (13):
                        $(this).html(obj.ash);
                        break;
                    case (14):
                        $(this).html(obj.waterContent);
                        break;
                    case (15):
                        $(this).html(obj.chlorineContent);
                        break;
                    case (16):
                        $(this).html(obj.sulfurContent);
                        break;
                    case (17):
                        $(this).html(obj.phosphorusContent);
                        break;
                    case (18):
                        $(this).html(obj.fluorineContent);
                        break;
                    case (19):
                        if (obj.processWay != null)
                            $(this).html(obj.processWay.name);
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
 * 使页面
 */
function setEditHidden() {
    if (!$("#viewBtnGrp").hasClass("hidden")) $("#viewBtnGrp").addClass("hidden");
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
        url: "getNewMaterialRequire",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setMaterialList(result.materialRequire.materialRequireItemList);
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
            // wastes.name = $("td[id='transportPlanItemList[" + $i + "].wastes.name']").text();
            // wastes.wastesId = $("td[id='transportPlanItemList[" + $i + "].wastes.wastesId']").text();
            // wastes.wasteAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount']").val();
            // wastes.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit']").val();
            // wastes.formType = getFormTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.formType']").text());
            // wastes.packageType = getPackageTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.packageType']").text());
            // wastes.calorific = $("td[id='transportPlanItemList[" + $i + "].wastes.calorific']").text();
            // wastes.ph = $("td[id='transportPlanItemList[" + $i + "].wastes.ph']").text();
            // wastes.ashPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.ashPercentage']").text();
            // wastes.wetPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.wetPercentage']").text();
            // wastes.chlorinePercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.chlorinePercentage']").text();
            // wastes.sulfurPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.sulfurPercentage']").text();
            // wastes.phosphorusPercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.phosphorusPercentage']").text();
            // wastes.fluorinePercentage = $("td[id='transportPlanItemList[" + $i + "].wastes.fluorinePercentage']").text();
            // wastes.processWay = parseInt($("select[id='transportPlanItemList[" + $i + "].wastes.processWay']").val())-1;
            // wastes.id = $("td[id='transportPlanItemList[" + $i + "].wastes.id']").text();
            transportPlanItem.handleCategory = getHandleCategoryFromStr($("td[id='transportPlanItemList[" + $i + "].handleCategory']").text());
            transportPlanItem.approachTime = $("input[id='transportPlanItemList[" + $i + "].approachTime']").val();
            transportPlanItem.wastesName = $("td[id='transportPlanItemList[" + $i + "].wastes.name']").text();
            transportPlanItem.wastesCode = $("td[id='transportPlanItemList[" + $i + "].wastes.wastesId']").text();
            transportPlanItem.wastesAmount = $("input[id='transportPlanItemList[" + $i + "].wastes.wasteAmount']").val();
            transportPlanItem.unit = $("input[id='transportPlanItemList[" + $i + "].wastes.unit']").val();
            // transportPlanItem.formType = getFormTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.formType']").text());
            transportPlanItem.packageType = getPackageTypeFromStr($("td[id='transportPlanItemList[" + $i + "].wastes.packageType']").text());
            transportPlanItem.heat = $("td[id='transportPlanItemList[" + $i + "].wastes.calorific']").text();
            transportPlanItem.ph = $("td[id='transportPlanItemList[" + $i + "].wastes.ph']").text();
            transportPlanItem.ash = $("td[id='transportPlanItemList[" + $i + "].wastes.ashPercentage']").text();
            transportPlanItem.waterContent = $("td[id='transportPlanItemList[" + $i + "].wastes.wetPercentage']").text();
            transportPlanItem.chlorineContent = $("td[id='transportPlanItemList[" + $i + "].wastes.chlorinePercentage']").text();
            transportPlanItem.sulfurContent = $("td[id='transportPlanItemList[" + $i + "].wastes.sulfurPercentage']").text();
            transportPlanItem.phosphorusContent = $("td[id='transportPlanItemList[" + $i + "].wastes.phosphorusPercentage']").text();
            transportPlanItem.fluorineContent = $("td[id='transportPlanItemList[" + $i + "].wastes.fluorinePercentage']").text();
            transportPlanItem.processWay = parseInt($("select[id='transportPlanItemList[" + $i + "].wastes.processWay']").val())-1;
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
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                    $('#appointModal2').modal('hide');
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
    function setMaterialList(result) {
        var tr = $("#cloneTr1");//克隆一行
        //tr.siblings().remove();
        //每日配比量合计
        // tr.siblings().remove();
        tr.siblings().remove();
        var weeklyDemandTotal=0;
        var currentInventoryTotal=0;
        var safetyTotal=0;
        var marketPurchasesTotal=0;
        var calorificMaxTotal=0;
        var calorificMinTotal=0;
        var ashMaxTotal=0;
        var ashMinTotal=0;
        var waterMaxTotal=0;
        var waterMinTotal=0;
        var clMaxTotal=0;
        var clMinTotal=0;
        var sMaxTotal=0;
        var sMinTotal=0;
        var pMaxTotal=0;
        var pMinTotal=0;
        var fMaxTotal=0;
        var fMinTotal=0;
        var phMaxTotal=0;
        var phMinTotal=0;
        $.each(result,function (index,item) {
            var obj = eval(item);

            var clonedTr = tr.clone();

            clonedTr.show();

            clonedTr.children('td').each(function (inner_index) {

                switch (inner_index) {
                    //序号
                    case (1):
                        $(this).html(index + 1);
                        break;

                    //进料方式
                    case (2):
                        if (obj.handleCategoryItem != null) {
                            $(this).html(obj.handleCategoryItem.dictionaryItemName);
                        }
                        break;

                    //物质形态
                    case (3):
                        if (obj.formTypeItem != null) {
                            $(this).html(obj.formTypeItem.dictionaryItemName);
                        }
                        break;
                    //包装方式
                    case (4):
                        if(obj.packageTypeItem!=null){
                            $(this).html(obj.packageTypeItem.dictionaryItemName);
                        }

                        break;
                    //周生产计划量
                    case (5):
                        $(this).html(obj.weeklyDemand.toFixed(1));
                        weeklyDemandTotal+=parseFloat(obj.weeklyDemand)
                        break;
                    //目前库存量
                    case (6):
                        $(this).html(obj.currentInventory.toFixed(1));
                        currentInventoryTotal+=parseFloat(obj.currentInventory)
                        break;
                    //安全库存量
                    case (7):
                        $(this).html(obj.safety.toFixed(1));
                        safetyTotal+=parseFloat(obj.safety)
                        break;
                    //市场采购量
                    case (8):
                        $(this).html(obj.marketPurchases.toFixed(1));
                        marketPurchasesTotal+=parseFloat(obj.marketPurchases)
                        break;
                    //热值Max
                    case (9):
                        $(this).html(obj.calorificMax.toFixed(1));
                        calorificMaxTotal+=parseFloat(obj.calorificMax)
                        break;
                    //热值Min
                    case (10):
                        $(this).html(obj.calorificMin.toFixed(1));
                        calorificMinTotal+=parseFloat(obj.calorificMin)
                        break;
                    //灰分Max
                    case (11):
                        $(this).html(obj.ashMax.toFixed(1));
                        ashMaxTotal+=parseFloat(obj.ashMax)
                        break;
                    //灰分Min
                    case (12):
                        $(this).html(obj.ashMin.toFixed(1));
                        ashMinTotal+=parseFloat(obj.ashMin)
                        break;
                    //水分Max
                    case (13):
                        $(this).html(obj.waterMax.toFixed(1));
                        waterMaxTotal+=parseFloat(obj.waterMax)
                        break;
                    //水分Min
                    case (14):
                        $(this).html(obj.waterMin.toFixed(1));
                        waterMinTotal+=parseFloat(obj.waterMin)
                        break;
                    //氯Max
                    case (15):
                        $(this).html(obj.clMax.toFixed(1));
                        clMaxTotal+=parseFloat(obj.clMax)
                        break;
                    //氯Min
                    case (16):
                        $(this).html(obj.clMin.toFixed(1));
                        clMinTotal+=parseFloat(obj.clMin)
                        break;
                    //硫Max
                    case (17):
                        $(this).html(obj.sMax.toFixed(1));
                        sMaxTotal+=parseFloat(obj.sMax)
                        break;
                    //硫Min
                    case (18):
                        $(this).html(obj.sMin.toFixed(1));
                        sMinTotal+=parseFloat(obj.sMin)
                        break;
                    //磷Max
                    case (19):
                        $(this).html(obj.pMax.toFixed(1));
                        pMaxTotal+=parseFloat(obj.pMax)
                        break;
                    //磷Min
                    case (20):
                        $(this).html(obj.pMin.toFixed(1));
                        pMinTotal+=parseFloat(obj.pMin)
                        break;
                    //氟Max
                    case (21):
                        $(this).html(obj.fMax.toFixed(1));
                        fMaxTotal+=parseFloat(obj.fMax)
                        break;
                    //氟Min
                    case (22):
                        $(this).html(obj.fMin.toFixed(1));
                        fMinTotal+=parseFloat(obj.fMin)
                        break;
                    //酸碱度Max
                    case (23):
                        $(this).html(obj.phMax.toFixed(1));
                        phMaxTotal+=parseFloat(obj.phMax)
                        break;
                    //酸碱度MaxMin
                    case (24):
                        $(this).html(obj.phMin.toFixed(1));
                        phMinTotal+=parseFloat(obj.phMin);
                        break;

                }
                clonedTr.removeAttr('id');
                clonedTr.insertBefore(tr);

            })

            // tr.hide();


        });
        // 隐藏无数据的tr
        tr.hide();
        //赋值
        // update 2018年11月12日 by matt 下面一行报错 暂时注释
        // $("#dailyProportionsTotal").text(dailyProportionsTotal.toFixed(1));
        $("#currentInventoryTotal").html(currentInventoryTotal.toFixed(1));
        $("#safetyTotal").html(safetyTotal.toFixed(1));
        $("#marketPurchasesTotal").html(marketPurchasesTotal.toFixed(1));
        $("#calorificMaxTotal").html(calorificMaxTotal.toFixed(1));
        $("#calorificMinTotal").html(calorificMinTotal.toFixed(1));
        $("#ashMaxTotal").html(ashMaxTotal.toFixed(1));
        $("#ashMinTotal").html(ashMinTotal.toFixed(1));
        $("#waterMaxTotal").html(waterMaxTotal.toFixed(1));
        $("#waterMinTotal").html(waterMinTotal.toFixed(1));
        $("#clMaxTotal").html(clMaxTotal.toFixed(1));
        $("#clMinTotal").html(clMinTotal.toFixed(1));
        $("#sMaxTotal").html(sMaxTotal.toFixed(1));
        $("#sMinTotal").html(sMinTotal.toFixed(1));
        $("#pMaxTotal").html(pMaxTotal.toFixed(1));
        $("#pMinTotal").html(pMinTotal.toFixed(1));
        $("#fMaxTotal").html(fMaxTotal.toFixed(1));
        $("#fMinTotal").html(fMinTotal.toFixed(1));
        $("#phMaxTotal").html(phMaxTotal.toFixed(1));
        $("#phMinTotal").html(phMinTotal.toFixed(1));

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


}
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
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (2):
                    $(this).html(obj.wastesName);
                    break;
                case (3):
                    $(this).html(obj.wastesCode);
                    break;
                case (4):
                    $(this).html(obj.wastesAmount.toFixed(2));
                    break;
                case (5):
                    if (obj.packageTypeItem != null)
                        $(this).html(obj.packageTypeItem.dictionaryItemName);
                    break;
                case (6):
                    $(this).html(setNumber2Line(parseFloat(obj.heat).toFixed(0)));
                    break;
                case (7):
                    $(this).html(setNumber2Line(parseFloat(obj.ph).toFixed(0)));
                    break;
                case (8):
                    $(this).html(setNumber2Line(parseFloat(obj.ash).toFixed(2)));
                    break;
                case (9):
                    $(this).html(setNumber2Line(parseFloat(obj.waterContent).toFixed(2)));
                    break;
                case (10):
                    $(this).html(setNumber2Line(parseFloat(obj.chlorineContent).toFixed(2)));
                    break;
                case (11):
                    $(this).html(setNumber2Line(parseFloat(obj.sulfurContent).toFixed(2)));
                    break;
                case (12):
                    $(this).html(setNumber2Line(parseFloat(obj.phosphorusContent).toFixed(2)));
                    break;
                case (13):
                    $(this).html(setNumber2Line(parseFloat(obj.fluorineContent).toFixed(2)));
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
    // tr.first().remove();
}

/**
 * 查询危废数据
 */
function searchWastesData() {
    var data = {
        produceCompany: {
            companyName: $("#search-produceCompanyName").val()
        },
        wastesName: $("#search-wastesName").val(),
        wastesCode: $("#search-wastesCode").val(),
        // packageTypeItem: {
        //     dataDictionaryItemId: $("#search-packageTypeItem").val()
        // },
        heat: $("#search-heat").val(),
        ph: $("#search-ph").val(),
        ash: $("#search-ash").val(),
        waterContent: $("#search-waterContent").val(),
        chlorineContent: $("#search-chlorineContent").val(),
        sulfurContent: $("#search-sulfurContent").val(),
        phosphorusContent: $("#search-phosphorusContent").val(),
        fluorineContent: $("#search-fluorineContent").val()
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchTransportPlanWastesList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
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
            wastes.wastesAmount = params[4];
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
                case (3):
                    $(this).find("input").val(getNowDate());
                    break;
                case (4):
                    $(this).html(obj.name);
                    break;
                case (5):
                    $(this).html(obj.wastesId);
                    break;
                case (6):
                    console.log(parseFloat(obj.wastesAmount).toFixed(2));
                    $(this).find("input").val(parseFloat(obj.wastesAmount).toFixed(2));
                    break;
                // case (8):
                //     $(this).html(obj.formType);
                //     break;
                case (8):
                    $(this).html(obj.packageType);
                    break;
                case (9):
                    $(this).html(obj.heat);
                    break;
                case (10):
                    $(this).html(obj.ph);
                    break;
                case (11):
                    $(this).html(obj.ash);
                    break;
                case (12):
                    $(this).html(obj.water);
                    break;
                case (13):
                    $(this).html(obj.chlorine);
                    break;
                case (14):
                    $(this).html(obj.sulfur);
                    break;
                case (15):
                    $(this).html(obj.phosphorus);
                    break;
                case (16):
                    $(this).html(obj.fluorine);
                    break;
                case (18):
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
            $("#weekDate").text(getWeekDate(result.createDate));
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                changeId(clonedTr, index+1);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (0):
                        $(this).html(index+1);
                        break;
                    case (1):
                        $(this).html(obj.transportDraftId);
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
                        $(this).html(obj.wastesName);
                        break;
                    case (6):
                        $(this).html(obj.wastesCode);
                        break;
                    case (7):
                        $(this).html(parseFloat(obj.wastesAmount).toFixed(2));
                        break;
                    case (8):
                        $(this).html(obj.unit);
                        break;
                    case (9):
                        if (obj.formType != null)
                            $(this).html(obj.formType.name);
                        break;
                    case (10):
                        if (obj.packageType != null)
                            $(this).html(obj.packageType.name);
                        break;
                    case (11):
                        $(this).html(obj.heat);
                        break;
                    case (12):
                        $(this).html(obj.ph);
                        break;
                    case (13):
                        $(this).html(obj.ash);
                        break;
                    case (14):
                        $(this).html(obj.waterContent);
                        break;
                    case (15):
                        $(this).html(obj.chlorineContent);
                        break;
                    case (16):
                        $(this).html(obj.sulfurContent);
                        break;
                    case (17):
                        $(this).html(obj.phosphorusContent);
                        break;
                    case (18):
                        $(this).html(obj.fluorineContent);
                        break;
                    case (19):
                        if (obj.processWay != null)
                            $(this).html(obj.processWay.name);
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
        $("#author").text(result.author);
        $("#departmentDirector").text(result.departmentDirector);
        $("#group").text(result.group);
        $("#productionDirector").text(result.productionDirector);

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
    var name = 'transportplan';
    var sqlWords = "select t_pr_transportplan.id, t_pr_transportplanitem.approachTime, t_pr_transportplanitem.handleCategory, t_wastes.name, t_wastes.wastesId, t_wastes.formType, t_wastes.calorific, t_wastes.ph, t_wastes.wetPercentage, t_wastes.sulfurPercentage, t_wastes.chlorinePercentage, t_wastes.phosphorusPercentage, t_wastes.fluorinePercentage, t_wastes.wasteAmount, t_wastes.unit, t_wastes.packageType from t_pr_transportplan join t_pr_transportplanitem, t_wastes where t_pr_transportplanitem.transportPlanId=t_pr_transportplan.id and t_wastes.transportPlanItemId=t_pr_transportplanitem.id order by transportPlanId;";
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
    var filePath = 'Files/Templates/运输计划单模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r) {
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
            url: "importTransportPlan",              // url
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

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(setTransportPlanSubmit.name);
    initApprovalFName(setExamined.name);
    initBakcFName(setTransportPlanBack.name);
    var id=$(item).parent().parent().children("td").eq(1).html();
    $('#ApprovalOrderId').text(id);
    $.ajax({
        type: "POST",
        url: "getAllChildNode",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'orderId': id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                if(result.data!=null){
                    setApprovalModal(result.data);
                    $("#approval").modal('show');
                }

            }
            else {
                alert('未提交，无法审批！')
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    });

}