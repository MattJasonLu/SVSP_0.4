var currentPage = 1;                          //当前页数
var isSearch = false;
var data;
var poundsId = "0000000000";

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
            url: "totalPoundsRecord",                  // url
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
            url: "searchPoundsTotal",                  // url
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
    setPoundsList(result);
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
    //addClass("active");
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPagePoundsList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setPoundsList(result.data);
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
            url: "searchPounds",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setPoundsList(result.data);
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
                url: "loadPagePoundsList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPoundsList(result.data);
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
                url: "searchPounds",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setPoundsList(result.data);
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
function loadPagePoundsList() {
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
        type: "POST",                       // 方法类型
        url: "loadPagePoundsList",          // url
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
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function setPoundsList(result) {
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
                case(1):
                    //磅单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    //转移联单号
                    $(this).html(obj.transferId);
                    break;
                case (3):
                    // 入厂车号
                    $(this).html(obj.enterLicencePlate);
                    break;
                case (4):
                    $(this).html(obj.founder);
                    break;
                case (5):
                    //创建日期
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                case (6):
                    // 货物名称
                    $(this).html(obj.goodsName);
                    break;
                case (7):
                    //发货单位
                    if (obj.deliveryCompany != null)
                        $(this).html(obj.deliveryCompany.companyName);
                    break;
                case (8):
                    //收货单位
                    if (obj.receiveCompany != null)
                        $(this).html(obj.receiveCompany.companyName);
                    break;
                case (9):
                    //业务类型
                    $(this).html(obj.businessType);
                    break;
                case (10):
                    //司机
                    $(this).html(obj.driver);
                    break;
                case(11):
                    //状态
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                        break;
                    }
                case(12):
                    //备注
                    $(this).html(obj.remarks);
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
        url: "getCheckStateDataByDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search-state");
                state.children().remove();
                $.each(data.data, function (index, item) {
                    if (item.dataDictionaryItemId == 69 ||
                        item.dataDictionaryItemId == 75) {
                        var option = $('<option />');
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        state.append(option);
                    }
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
    var name = 't_pr_pounds';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += idArry[i] + ",";
            else if (i == idArry.length - 1) sql += idArry[i] + ");"
        }
        sqlWords = "select id as '磅单号',transferId as '转移联单号',enterLicencePlate as '入厂车号',goodsName as '货物名',grossWeight as '毛重',netWeight as '净重',tare as '皮重',(select companyName from client where clientId = deliveryCompanyId) as '发货公司',receiveCompanyName as '收货公司',businessType as '业务类型',enterTime as '入厂时间',outTime as '出厂时间',driver as '司机',weighman as '司磅员',remarks as '备注',outLicencePlate as '出厂车号',state as '状态',founder as '磅单创建人',creationDate as '创建时间' from t_pr_pounds where id" + sql;
    } else {
        sqlWords = "select id as '磅单号',transferId as '转移联单号',enterLicencePlate as '入厂车号',goodsName as '货物名',grossWeight as '毛重',netWeight as '净重',tare as '皮重',(select companyName from client where clientId = deliveryCompanyId) as '发货公司',receiveCompanyName as '收货公司',businessType as '业务类型',enterTime as '入厂时间',outTime as '出厂时间',driver as '司机',weighman as '司磅员',remarks as '备注',outLicencePlate as '出厂车号',state as '状态',founder as '磅单创建人',creationDate as '创建时间' from t_pr_pounds;";
    }
    window.open('exportExcelPounds?name=' + name + '&sqlWords=' + sqlWords);
}

// /**
//  * 导出excel  对象形式（暂不可用，待完善）
//  * @param e
//  */
// function exportExcel() {
//     // var name = 't_pr_pounds';
//     // var sqlWords = "select * from t_pr_pounds ";
//     // window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
//     $.ajax({
//         type: "POST",                       // 方法类型
//         url: "exportPoundsExcel",                  // url
//         async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//         dataType: "json",
//         success: function (result) {
//             if (result != undefined || result.status == 'success') {
//                 alert("导出成功！");
//             }
//             else {
//                 alert(result.message);
//             }
//         },
//         error: function (result){
//             alert("导出失败！");
//         }
//         });
// }

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
    var filePath = 'Files/Templates/磅单模板.xlsx';
    if (confirm("是否下载模板?")) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

function add(){
    localStorage.id = null;// 新增页面清除ID
    window.location.href="singlePoundsManageAdd.html";
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("excelFile").click();
    document.getElementById("excelFile").addEventListener("change", function () {
        var eFile = document.getElementById("excelFile").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importPoundsExcel",              // url
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
    console.log("after");
}

/**
 * 重置功能
 */
function reset() {
    // $("#senior").find("input").val("");
    // $("#senior").find("select").get(0).selectedIndex = -1;
    // $("#searchContent").val("");
    window.location.reload();
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchPounds();      //
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
                searchPounds();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchPounds();      //
            }
        }, 600);
    });
});

/**
 * 查询功能
 */
function searchPounds() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        var deliveryCompany = {};
        deliveryCompany.companyName = $.trim($("#search-deliveryCompany").val());
        data = {
            transferId: $.trim($("#search-transferId").val()),
            deliveryCompany: deliveryCompany,
            receiveCompanyName: $.trim($("#search-receiveCompany").val()),
            goodsName: $.trim($("#search-goods").val()),
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
            checkStateItem: {
                dataDictionaryItemId: $("#search-state").val()
            },
            page: page
        };
    } else {
        var keywords = $.trim($("#searchContent").val());
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
            url: "searchPounds",                 // url
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

function getPoundsId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

function getPoundsId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 查看功能
 */
function toView(item) {
    var id = getPoundsId(item);
    localStorage.id = id;
    location.href = "singlePoundsManage.html";
}

/**
 * 双击查看
 * @param item
 */
function toView1(item) {
    var id = getPoundsId1(item);
    localStorage.id = id;
    location.href = "singlePoundsManage.html";
}

/**
 * 编辑功能
 * @param item
 */
function toEdit(item){
    var id = getPoundsId(item);
    localStorage.id = id;
    location.href = "singlePoundsManageAdd.html";
}

/**
 * 作废功能
 */
function invalid(item) {
    var id = getPoundsId(item);
    if (confirm("确认作废？")) {
        $.ajax({
            type: "POST",
            url: "invalidPounds",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("作废成功！");
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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
}

//----------------------查看页面-----------------------
function loadPoundsItems() {
    loadNavigationList();   // 设置动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPounds",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result.data);
                var data = eval(result.data);
                $("#Id").text(data.transferId);
                $("#modal1_outTime").text(getTimeStr(data.outTime));
                $("#modal1_enterLicencePlate").text(data.enterLicencePlate);
                $("#modal1_outLicencePlate").text(data.outLicencePlate);
                $("#modal1_goodsName").text(data.goodsName);
                $("#modal1_grossWeight").text(data.grossWeight);
                if (data.deliveryCompany != null)
                $("#modal1_deliveryCompany").text(data.deliveryCompany.companyName);
                $("#modal1_tare").text(data.tare);
                $("#modal1_receiveCompany").text(data.receiveCompanyName);
                $("#modal1_netWeight").text(data.netWeight);
                $("#modal1_businessType").text(data.businessType);
                $("#modal1_enterTime").text(getTimeStr(data.enterTime));
                $("#modal1_weighman").text(data.weighman);
                $("#modal1_driver").text(data.driver);
                $("#modal1_remarks").text(data.remarks);
                $("#modal1_wastesCode").text(data.wastesCode);
                //  $("#modal1_printTime").text(getTimeStr(data.printTime));
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("首页获取失败");
        }
    });
}

function showPrintModal() {
    //更新打印时间
    $.ajax({
        type: "POST",                       // 方法类型
        url: "printTime",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined || result.status == "success") {
                //window.location.reload();
                console.log("打印时间已更新");
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("服务器错误！");
        }
    });
    //获取模态框数据
    // console.log(localStorage.id);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getPounds",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data1 = eval(result.data);
                console.log(data1);
                $("#modal2_outTime").text(getTimeStr(data1.outTime));
                $("#modal2_enterLicencePlate").text(data1.enterLicencePlate);
                $("#modal2_outLicencePlate").text(data1.outLicencePlate);
                $("#modal2_goodsName").text(data1.goodsName);
                $("#modal2_grossWeight").text(data1.grossWeight);
                if (data1.deliveryCompany != null)
                    $("#modal2_deliveryCompany").text(data1.deliveryCompany.companyName);
                $("#modal2_tare").text(data1.tare);
                if (data1.receiveCompany != null)
                    $("#modal2_receiveCompany").text(data1.receiveCompany.companyName);
                $("#modal2_netWeight").text(data1.netWeight);
                $("#modal2_businessType").text(data1.businessType);
                $("#modal2_enterTime").text(getTimeStr(data1.enterTime));
                $("#modal2_weighman").text(data1.weighman);
                $("#modal2_driver").text(data1.driver);
                $("#modal2_remarks").text(data1.remarks);
                $("#modal2_printTime").text(getTimeStr(data1.printTime));
                $("#modal2_wastesCode").text(data1.wastesCode);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("模态框数据获取失败");
        }
    });
    $("#footer").show();
    $("#printModal").modal("show");
}

/**
 * 打印功能
 */
function print() {
    //打印模态框
    $("#footer").hide();
    $("#print1").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: true,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: false
        // debug: false,
        // importCSS: false,
        // importStyle: true,
        // printContainer: true,
        // removeInline: false,
        // printDelay: 333,
        // header: null,
        // formValues: false
    });

}

/**
 * 打印取消
 */
function cancel() {
//更新打印时间
    $.ajax({
        type: "POST",                       // 方法类型
        url: "resetPrintTime",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined || result.status == "success") {
                window.location.reload();
                console.log("打印时间已清零！");
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("服务器错误！");
        }
    });
}


/////////////////新增页面//////////////////////////
/**
 * 初始化数据
 */
function loadPoundsAdd(){
    loadNavigationList();   // 设置动态菜单
    $("#head").text("磅单新增");
    //$("#save").text("新增");
    setSelectedListAdd();  // 填充下拉框数据
    $("#add_receiveCompany").val("北控安耐得环保科技发展常州有限公司");  // 收货单位默认为北控
    if(getCurrentUserData() != null)
    $("#add_founder").val(getCurrentUserData().name);   // 创建人赋值
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        // style: 'btn-info',
        size: 4
    });//下拉框样式
    if(localStorage.id != null && localStorage.id != "null"){
        $("#head").text("磅单修改");
        $("#save").text("修改");
        // 获取数据
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getPounds",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                id: localStorage.id
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result.data);
                    var data = eval(result.data); // 赋值
                    $("#add_enterTime").val(getTimeStr(data.enterTime));
                    $("#add_founder").val(data.founder);
                    $("#add_enterLicencePlate").val(data.enterLicencePlate);
                    $("#add_outLicencePlate").val(data.outLicencePlate);
                    $("#add_goodsName").val(data.goodsName);
                    $("#add_grossWeight").val(data.grossWeight);
                    $("#add_netWeight").val(data.netWeight);
                    $("#add_tare").val(data.tare);
                    $("#add_wastesCode").selectpicker('val',data.wastesCode); // 危废代码
                    if (data.deliveryCompany != null)
                        $("#add_deliveryCompany").selectpicker('val',data.deliveryCompany.clientId);  // 发货公司
                    $("#add_receiveCompany").val(data.receiveCompanyName);
                    $("#add_outTime").val(getTimeStr(data.outTime));
                    $("#add_businessType").val(data.businessType);
                    $("#add_weighman").val(data.weighman);
                    $("#add_driver").val(data.driver);
                    $("#add_remarks").val(data.remarks);
                    $("#add_transferId").val(data.transferId);
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                console.log("首页获取失败");
            }
        });
    }
}

/**
 * 设置下拉框数据
 */
function setSelectedListAdd(){
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientAndWastesCodeSelectedList",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data);
                // 各下拉框数据填充
                // 发货单位
                var clientList = $("#add_deliveryCompany");
                // 清空遗留元素
                clientList.children().first().siblings().remove();
                $.each(data.companyCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientList.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                // 收货单位
                var clientList1 = $("#add_receiveCompany");
                // 清空遗留元素
                clientList1.children().first().siblings().remove();
                $.each(data.companyCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientList1.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                // 危废代码
                var wastesCode = $("#add_wastesCode");
                wastesCode.children().first().siblings().remove();
                $.each(data.wastesCodeList, function (index, item) {
                    var option = $('<option />');
                    if (item != null) {
                        option.val(item.code);
                        option.text(item.code);
                        wastesCode.append(option);
                    }
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

function getCurrentPoundsId(){
    var id = null;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentPoundsId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null) {
                id = result.id;
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("服务器错误！");
        }
    });
    return id;
}

/**
 * 新增功能
 */
function addPounds(){
    var pounds = {};
    pounds.id = getCurrentPoundsId();
    pounds.outTime = getStdTimeStr($("#add_outTime").val());
    pounds.transferId = $("#add_transferId").val();
    pounds.enterLicencePlate = $("#add_enterLicencePlate").val();
    pounds.outLicencePlate = pounds.enterLicencePlate;
    pounds.goodsName = $("#add_goodsName").val();
    pounds.wastesCode = $("#add_wastesCode option:selected").text();
    var deliveryCompany = {};
    deliveryCompany.companyName = $("#add_deliveryCompany option:selected").text();
    deliveryCompany.clientId = $("#add_deliveryCompany option:selected").val();
    pounds.deliveryCompany = deliveryCompany;
    pounds.receiveCompanyName = $("#add_receiveCompany").val();
    pounds.netWeight = $("#add_netWeight").val();
    pounds.tare = $("#add_tare").val();
    pounds.grossWeight = $("#add_grossWeight").val();
    pounds.enterTime = getStdTimeStr($("#add_enterTime").val());
    pounds.businessType = $("#add_businessType").val();
    pounds.driver = $("#add_driver").val();
    pounds.weighman = $("#add_weighman").val();
    pounds.remarks = $("#add_remarks").val();
    pounds.founder = $("#add_founder").val();
    console.log(pounds);
    if($("#save").text() == "新增") {
        pounds.creationDate = dateToString(new Date());
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addPounds",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(pounds),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    if (confirm("保存成功，是否返回主页?")) {
                        window.location.href = 'singlePoundsManage1.html';
                    } else {
                        window.location.reload();
                    }
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }else if($("#save").text() == "修改"){
        pounds.id = localStorage.id;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updatePounds",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(pounds),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    if (confirm("修改成功，是否返回主页?")) {
                        window.location.href = 'singlePoundsManage1.html';
                    } else {
                        window.location.reload();
                    }
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
 * 输入毛重
 */
function calculateGrossWeight(item) {

    //毛重
    var grossWeight= $('#add_grossWeight').val();

    //皮重
    var tare = ($("#add_tare").val());

    //净重
    var netWeight = ($("#add_netWeight").val());

    if(!(tare.length==0&&netWeight.length==0)){
        if(tare.length>0){ //有皮重
            netWeight=parseFloat(grossWeight)-parseFloat(tare);
            if(netWeight<0){
                alert("毛重应大于皮重")
            }
            else {
                $("#add_netWeight").val(netWeight.toFixed(3))
            }

        }
        //有净重
        if(netWeight>0){
            tare=parseFloat(grossWeight)-parseFloat(netWeight);
            if(tare<0){
                alert("毛重应大于净重")
            }
            else {
                $("#add_tare").val(tare.toFixed(3));
            }

        }
    }





}

/**
* 输入皮重
*/
function calculateTareWeight() {
    //毛重
    var grossWeight= $('#add_grossWeight').val();

    //皮重
    var tare = ($("#add_tare").val());

    //净重
    var netWeight = ($("#add_netWeight").val());

    if(!(grossWeight.length==0&&netWeight.length==0)){
        if(grossWeight.length>0){
            netWeight=parseFloat(grossWeight)-parseFloat(tare);
            $("#add_netWeight").val(netWeight.toFixed(3))
        }
        if(netWeight.length>0&&grossWeight.length==0){
            grossWeight=  parseFloat(netWeight)+parseFloat(tare);
            $('#add_grossWeight').val(grossWeight.toFixed(3))
        }


    }

}

/**
 * 净重输入计算
 */
function calculateNetWeightWeight(){
    //公式===>毛重=皮重+净重

    //毛重
    var grossWeight= ($("#add_grossWeight").val());

    //皮重
    var tare = ($("#add_tare").val());

    //净重
    var netWeight = ($("#add_netWeight").val());

    if(!(grossWeight.length==0&&tare.length==0)){

        if(grossWeight.length>0){
            tare=parseFloat(grossWeight)-parseFloat(netWeight);
            $("#add_tare").val(tare.toFixed(3))
        }
        if(tare.length>0&&grossWeight.length==0){
            grossWeight=parseFloat(tare)+parseFloat(netWeight);
            $("#add_grossWeight").val(grossWeight.toFixed(3))
        }

    }








    // if (grossWeight != null && grossWeight != '' && tare != null && tare != ''){
    //     $("#add_netWeight").val(parseFloat(grossWeight) - parseFloat(tare));
    // }
}
/**
 * 自动设置出厂车号
 */
function autoSetoutLicencePlate(item){
    $("#add_outLicencePlate").val($(item).val());
}



