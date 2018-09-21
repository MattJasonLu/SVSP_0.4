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
 * 回车跳转
 */
function enterSwitchPage(){
    if(event.keyCode === 13){
        inputSwitchPage();
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
                    //接运单号
                    $(this).html(obj.id);
                    break;
                case (1):
                    // 废物生产单位
                    $(this).html(obj.produceCompanyName);
                    break;
                case (2):
                    //总额
                // {
                //     var total = 0;
                //     for (var i = 0; i < obj.wayBillItemList.length; i++) {
                //         total += obj.wayBillItemList[i].wastesTotalPrice;
                //     }
                //     //减去总运费
                //     obj.total = total - obj.freight;
                // }
                    $(this).html(obj.total);
                    break;
                case (3):
                    //总运费
                    $(this).html(obj.freight);
                    break;
                case (4):
                    // 创建人
                    $(this).html(obj.founder);
                    break;
                case (5):
                    //接运单创建日期
                    $(this).html(getDateStr(obj.wayBillDate));
                    break;
                case (6):
                    //备注
                    $(this).html(obj.remarks);
                    break;
                case (7):
                    //危废产生单位经手人
                    $(this).html(obj.produceCompanyOperator);
                    break;
                case (8):
                    //接运单状态
                    if (obj.state != null) {
                        $(this).html(obj.state.name);
                        break;
                    }
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
    var sqlWords = "select id,produceCompanyName,total,freight,founder,wayBillDate,remarks,produceCompanyOperator,state from t_pr_waybill ";
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
    var filePath = 'Files/Templates/接运单模板.xlsx';
    window.open('downloadFile?filePath=' + filePath);
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
    $("#searchContent").val("");
}

/**
 * 回车查询
 */
function enterSearch(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchWayBill();      //
    }
}

$("#senior").find("input").keydown(function (event) {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchWayBill();      //
    }
});

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
        data = {
            id: $("#search-id").val(),
            produceCompanyName:  $("#search-companyName").val(),
            total: $("#search-total").val(),
            freight: $("#search-freight").val(),
            founder: $("#search-founder").val(),
            remarks: $("#search-wayBillDate").val(),                  // 代替wayBillDate 设置成字符型
            produceCompanyOperator: $("#search-operator").val(),
            state: state,
            page: page
        };
    }else{
        var keywords = $("#searchContent").val();
        switch (keywords){
            case("新建"): keywords = "NewBuild";break;
            case("待审批"): keywords = "ToExamine";break;
            case("审批中"): keywords = "Examining";break;
            case("审批通过"): keywords = "Approval";break;
            case("已驳回"): keywords = "Backed";break;
            case("驳回"): keywords = "Backed";break;
            case("已作废"): keywords = "Invalid";break;
            case("作废"): keywords = "Invalid";break;
        }
        data={
            page:page,
            keywords: keywords
        }
    }
    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
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
                alert("服务器错误！");
            }
        });
    }
}

function getWayBillId(item) {
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

/**
 * 双击编辑
 * @param item
 */
function editWayBill1(item) {
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
            if (result.data != undefined || result.status == "success" || result.data != null) {
                var data = eval(result.data);
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

/**
 * 获取当前时间
 * @returns {string}
 */
function getcurrentDaydate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    return year + "年" + month + "月" + day + "日";
}

/**
 * 获取接运单id
 */
function getCurrentWayBillId(){
    $.ajax({
        type: "POST",
        url: "getCurrentWayBillId",
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != null) {
                 wayBillId = result.id;
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
}
/**
 * 显示接运单新增页面
 */
function addWayBillModal(){
    window.location.href="wayBillAdd.html";
}

/**
 * 加载接运单新增页面数据
 */
function showAddData() {
    getCurrentWayBillId();
    $("#modal-id").text(wayBillId);
    $("#modal-creationDate").text(getcurrentDaydate());
}

/**
 * 页面准备完成后载入新增模态框下拉框信息
 */
$(document).ready(function () {
    var lineCount = $("select[id^='modal'][id$='receiveCompany']").length;
    //添加产废单位信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllClients",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 各下拉框数据填充
                var clientList = $("#modal-produceCompanyName");
                // 清空遗留元素
                clientList.children().first().siblings().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientList.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
            } else {
//                    console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    for (var i = 0; i < lineCount; i++) {
        var $i = i;
        // 添加单位信息
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getAllClients",              // url
            cache: false,
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    // 各下拉框数据填充
                    var clientList = $("#modal" + $i + "-receiveCompany");
                    // 清空遗留元素
                    clientList.children().first().siblings().remove();
                    $.each(data, function (index, item) {
                        var option = $('<option />');
                        option.val(item.clientId);
                        option.text(item.companyName);
                        clientList.append(option);
                    });
                    $('.selectpicker').selectpicker('refresh');
                } else {
//                    console.log(result);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
        // 添加业务员信息
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getAllSalesman",              // url
            cache: false,
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    // 各下拉框数据填充
                    var clientList = $("#modal" + $i + "-salesman");
                    // 清空遗留元素
                    clientList.children().first().siblings().remove();
                    $.each(data, function (index, item) {
                        var option = $('<option />');
                        option.val(item.salesmanId);
                        option.text(item.name);
                        clientList.append(option);
                    });
                    $('.selectpicker').selectpicker('refresh');
                } else {
//                    console.log(result);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
        // 添加危废代码信息
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
                    var wastesCode = $("#modal" + $i + "-wastesCode");
                    $.each(data.wastesCodeList, function (index, item) {
                        var option = $('<option />');
                        option.val(parseInt(item.code.replace(/[^0-9]/ig,"")));
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
    }
});

/**
 * 接运单新增模态框新增条目按钮
 */
function addNewItemLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").selectpicker('val', '');
    // 获取编号
    var serialNumber = $("#plusBtn").prev().children().get(0).innerHTML;
    var id1=(serialNumber.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;    // 设置序号
    clonedTr.children().find("input,select,span").each(function () {
        //id更新
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num-1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
   // tr.hide();
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker('refresh');
}

/**
 * 删除行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
}

/**
 * 确认新增-将数据存到数据库
 */
function addWayBill(){
    //获取数据
    var wayBill = {};
    wayBill.produceCompanyName = $("#modal-produceCompanyName option:selected").text();
    wayBill.produceCompanyId = getClientIdByName(wayBill.produceCompanyName);
    wayBill.founder = $("#modal-founder").val();
    wayBill.id = $("#modal-id").text();
    wayBill.freight = $("#modal-freight").val();
    wayBill.produceCompanyOperator = $("#modal-produceCompanyOperator").val();
    wayBill.remarks = $("#modal-remarks").val();
    var lineCount = $("select[id^='modal'][id$='receiveCompany']").length;
    var total = 0;
    var wayBillItemList = [];
    var ItemId = getCurrentItemId();
    var wastesId = parseInt(getCurrentWastesId());
    for(var i = 0; i < lineCount; i++){
        var $i = i;
        var wayBillItem = {};
        wayBillItem.salesmanName = $("#modal" + $i + "-salesman option:selected").text();
        wayBillItem.receiveCompanyName = $("#modal" + $i + "-receiveCompany option:selected").text();
        wayBillItem.wastesId = conversionIdFormat(wastesId);
        wayBillItem.wastesName = $("#modal" + $i + "-wastesName").val();
        wayBillItem.wastesAmount = $("#modal" + $i + "-wasteAmount").val();
        wayBillItem.wastesCode = $("#modal" + $i + "-wastesCode option:selected").text();
        wayBillItem.wastesPrice = $("#modal" + $i + "-wastesPrice").val();
        wayBillItem.wastesTotalPrice = parseFloat(wayBillItem.wastesAmount) * parseFloat(wayBillItem.wastesPrice);
        wayBillItem.itemId = ItemId.toString();
        wayBillItem.invoiceDate = $("#modal" + $i + "-invoiceDate").val();
        wayBillItem.receiveDate = $("#modal" + $i + "-receiveDate").val();
        wayBillItem.invoiceNumber = $("#modal" + $i + "-invoiceNumber").val();
        wayBillItem.receiveCompanyOperator = $("#modal" + $i + "-receiveCompanyOperator").val();
        wayBillItem.wayBillId = $("#modal-id").text();
        wayBillItemList.push(wayBillItem);
        wastesId++;
        ItemId++;
        total += wayBillItem.wastesTotalPrice;
    }
    wayBill.total = total - wayBill.freight;
    wayBill.wayBillItemList = wayBillItemList;
    console.log("添加的数据为：");
    console.log(wayBill);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addWayBill",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(wayBill),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    if(confirm("添加成功，是否返回主页?")){
                        window.location.href="wayBill1.html";
                    }else window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 根据公司名获取ID
 * @param name
 * @returns {*}
 */
function getClientIdByName(name) {
    //接收公司名转ID
    var id = null;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getClientIdByName",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            name: name
        },
        dataType: "json",
        success: function (result) {
            id = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return id;
}

/**
 * 获取当前接运单条目ID
 * @returns {number}
 */
function getCurrentItemId() {
    //获取详细项目序列号
    var ItemId = 0;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentItemId",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            ItemId = parseInt(result.id);
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return ItemId;
}

/**
 * 获取当前危废ID
 * @returns {*}
 */
function getCurrentWastesId() {
    //获取当前危废编号
    var id = null;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentItemWastesId",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            id = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return id;
}
/**
* 规范wastesId格式
* @param id
* @returns {string}
*/
function conversionIdFormat(id) {
    var aid = "";
    $.ajax({
        type: "POST",                            // 方法类型
        url: "changeWastesIdFormat",             // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            aid = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }
    });
    return aid;
}
