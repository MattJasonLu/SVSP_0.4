
var currentPage = 1;                          //当前页数
var isSearch = false;
var data;
var wayBillId = "0000000000";

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
            url: "totalWayBillRecord",                  // url
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
            url: "searchWayBillTotal",                  // url
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
    setWayBillList(result);
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
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }

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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageWayBillList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setWayBillList(result.data);
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
            url: "searchWayBill",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setWayBillList(result.data);
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageWayBillList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWayBillList(result.data);
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
                url: "searchWayBill",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setWayBillList(result.data);
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
function loadPageWayBillList() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if(totalPage() == 1){
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageWayBillList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
    isSearch = false;
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function setWayBillList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
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
                    //序列号
                    $(this).html(obj.id);
                    break;
                case (1):
                    // 废物生产单位
                    $(this).html(obj.produceCompany.companyName);
                    break;
                case (2):
                    //总额
                {
                    var total = 0;
                    for(var i = 0;i < obj.wayBillItemList.length;i++){
                        total += obj.wayBillItemList[i].wastes.wastesTotal;
                    }
                    obj.total = total;
                }
                    $(this).html(obj.total);
                    break;
                case (3):
                    // 创建人
                    $(this).html(obj.founder);
                    break;
                case (4):
                    //接运单创建日期
                    $(this).html(getDateStr(obj.wayBillDate));
                    break;
                case (5):
                    //备注
                    $(this).html(obj.remarks);
                    break;
                case (6):
                    //危废产生单位经手人
                    $(this).html(obj.produceCompanyOperator);
                    break;
                case (7):
                    //接运单状态
                    if (obj.state != null) {
                        obj.name = obj.state.name;
                    }
                    $(this).html(obj.name);
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
        url: "getWayBillSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search-wayBillState");
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
    var name = 't_pr_waybill';
    var sqlWords = "select id,produceCompanyName,total,founder,wayBillDate,remarks,produceCompanyOperator,state from t_pr_waybill ";
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
    var filePath = 'Files/EIA/Material/client模板.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importWayBillExcel",              // url
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
 * 重置功能
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

/**
 * 查询功能
 */
function searchWayBill() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var state = null;
    if ($("#search-wayBillState").val() == 0) state = "NewBuild";//新建
    if ($("#search-wayBillState").val() == 1) state = "ToExamine";//待审批
    if ($("#search-wayBillState").val() == 2) state = "Examining";//审批中
    if ($("#search-wayBillState").val() == 3) state = "Approval";//审批通过
    if ($("#search-wayBillState").val() == 4) state = "Backed";//驳回
    if ($("#senior").is(':visible')) {
        var produceCompany = {};
        produceCompany.companyName = $("#search-companyName").val();
        var receiveCompany = {};
        receiveCompany.companyName = $("#search-companyName").val();
        data = {
            id: $("#search-id").val(),
            produceCompany: produceCompany,
            total: $("#search-total").val(),
            founder: $("#search-founder").val(),
            wayBillDate: $("#search-wayBillDate").val,
            produceCompanyOperator: $("#search-operator").val(),
            state: state,
            page: page
        };
        //console.log(data);
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "searchWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                setPageClone(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("请点击'查询设置'输入查询内容!");
        }
    });
}

function getWayBillId(item) {
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

/**
 * 双击编辑
 * @param item
 */
function editWayBill1(item){
    var id = item.firstElementChild.innerHTML;
    localStorage.id = id;
    localStorage.add = 1;
    location.href = "wayBill.html";
}
/**
 * 查看功能
 */
function toView(item) {
    var id = getWayBillId(item);
    localStorage.id = id;
    localStorage.add = 0;
    location.href = "wayBill.html";
}

/**
 * 编辑功能
 */
function editWayBill(item) {
    var id = getWayBillId(item);
    localStorage.id = id;
    localStorage.add = 1;
    location.href = "wayBill.html";
}

/**
 * 提交功能
 */
function submit(item) {
    var id = getWayBillId(item);
    $.ajax({
        type: "POST",
        url: "submitWayBill",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                alert("提交成功！");
                window.location.reload();
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

/**
 * 审批
 */
function examination(item) {
    wayBillId = getWayBillId(item);
    console.log(wayBillId);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: wayBillId
        },
        dataType: "json",
        success: function (result) {
            if (result.data != undefined || result.status == "success" || result.data  != null) {
                var data = eval(result.data);
                console.log(data.state);
                if (data.state.name != '审批中') alert("请提交后再进行审批操作！");
                else $('#examinationModal').modal('show');//手动触发模态框弹出
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

function approval() {
    $('#contractInfoForm2').modal('show');
    $("#passContent").val($("#advice").val());
}

function reject() {
    $('#contractInfoForm3').modal('show');
    $("#backContent").val($("#advice").val());
}

/**
 * 审批通过
 *
 * */
function approval1() {
    console.log($("#advice").val());
    console.log($("#passContent").val());
    var advice = $("#passContent").val();
    var wayBill = {};
    wayBill.id = wayBillId;
    wayBill.advice = advice;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "approvalWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var data = eval(result);
            console.log(data.message);
            alert("服务器异常!");
        }
    });
}

/**
 * 审批驳回
 * */
function reject1() {
    var advice = $("#backContent").val();
    var wayBill = {};
    wayBill.id = wayBillId;
    wayBill.advice = advice;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "rejectWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var data = eval(result);
            console.log(data.message);
            alert("服务器异常!");
        }
    });
}

/**
 * 作废功能
 */
function invalidWayBill(item) {
    var id = getWayBillId(item);
    $.ajax({
        type: "POST",
        url: "invalidWayBill",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success") {
                alert("作废成功！");
                window.location.reload();
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

function addWayBillModal(){
    $("#wayBillModal").modal('show');
}

/**
 * 新增详细项数据
 */
function addNewItemLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#addBtn1").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    var num = clonedTr.children().find("span:first").prop('id').charAt(6);
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").selectpicker('val', '');
    clonedTr.children().find("button:eq(0)").remove();
    clonedTr.children().find("button:eq(1)").remove();
    $('.selectpicker').selectpicker();
    $()
    clonedTr.children().find("input,select,span").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, parseInt(num) + 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);

}
