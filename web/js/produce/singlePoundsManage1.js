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
        url: "loadPagePoundsList",          // url
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
                case(0):
                    //磅单号
                    $(this).html(obj.id);
                    break;
                case (1):
                    //转移联单号
                    $(this).html(obj.transferId);
                    break;
                case (2):
                    // 入厂车号
                    $(this).html(obj.enterLicencePlate);
                    break;
                case (3):
                    $(this).html(obj.founder);
                    break;
                case (4):
                    //创建日期
                    $(this).html(getDateStr(obj.creationDate));
                    break;
                case (5):
                    // 货物名称
                    $(this).html(obj.goodsName);
                    break;
                case (6):
                    //发货单位
                    $(this).html(obj.deliveryCompany.companyName);
                    break;
                case (7):
                    //收货单位
                    $(this).html(obj.receiveCompany.companyName);
                    break;
                case (8):
                    //业务类型
                    $(this).html(obj.businessType);
                    break;
                case (9):
                    //司机
                    $(this).html(obj.driver);
                    break;
                case(10):
                    //状态
                    if (obj.state != null) {
                        obj.name = obj.state.name;
                    }
                    $(this).html(obj.name);
                    break;
                case(11):
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
        url: "getPoundsSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search-state");
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
    var name = 't_pr_pounds';
    var sqlWords = "select * from t_pr_pounds ";
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
    var filePath = 'Files/Templates/磅单模板.xls';
    if (confirm("是否下载模板?")) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("excelFile").click();
    console.log("before");
    document.getElementById("excelFile").addEventListener("change", function () {
        console.log("导入运行！");
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
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

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
    var state = null;
    if ($("#search-state").val() == 0) state = "Confirm";//已确认
    if ($("#search-state").val() == 1) state = "Invalid";//已作废

    if ($("#senior").is(':visible')) {
        var deliveryCompany = {};
        deliveryCompany.companyName = $("#search-deliveryCompany").val();
        //deliveryCompany.clientId = getClientIdByName(deliveryCompany.companyName);
        var receiveCompany = {};
        receiveCompany.companyName = $("#search-receiveCompany").val();
        //receiveCompany.clientId = getClientIdByName(receiveCompany.companyName);
        data = {
            transferId: $("#search-transferId").val(),
            deliveryCompany: deliveryCompany,
            receiveCompany: receiveCompany,
            goodsName: $("#search-goodsName").val(),
            wayBillDate: $("#search-wayBillDate").val,
            enterLicencePlate: $("#search-licencePlate").val(),
            state: state,
            page: page
        };
    }
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

function getPoundsId(item) {
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

function getPoundsId1(item) {
    return item.firstElementChild.innerHTML;
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
}

//---------------------------------------------
function loadPoundsItems() {
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
                var data = eval(result.data);
                $("#modal1_outTime").text(getTimeStr(data.outTime));
                $("#modal1_enterLicencePlate").text(data.enterLicencePlate);
                $("#modal1_outLicencePlate").text(data.outLicencePlate);
                $("#modal1_goodsName").text(data.goodsName);
                $("#modal1_grossWeight").text(data.grossWeight);
                $("#modal1_deliveryCompany").text(data.deliveryCompany.companyName);
                $("#modal1_tare").text(data.tare);
                $("#modal1_receiveCompany").text(data.receiveCompany.companyName);
                $("#modal1_netWeight").text(data.netWeight);
                $("#modal1_businessType").text(data.businessType);
                $("#modal1_enterTime").text(getTimeStr(data.enterTime));
                $("#modal1_weighman").text(data.weighman);
                $("#modal1_driver").text(data.driver);
                $("#modal1_remarks").text(data.remarks);
                $("#modal1_printTime").text(getTimeStr(data.printTime));
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

/**
 * 打印功能
 */
function print() {
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
                console.log("打印时间已更新!");
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
                console.log("error: " + result);
                console.log("服务器错误！");
        }
        });
    $('#print').hide();
    $('#pic').show();
    $('#poundsTitle').hide();
    $('title').hide();
    html2canvas(document.querySelector("#poundsForm")).then(function (canvas) {
        $("#pic").css("visibility", "visible");
        var dataUrl = canvas.toDataURL();//获取canvas对象图形的外部url
        var newImg = document.createElement("img");//创建img对象
        newImg.src = dataUrl;//将canvas图形url赋给img对象
        //然后将画布缩放，将图像放大两倍画到画布上
        $('#pic').append(newImg).printThis({
            //保留BASE标记或接受URL
        });//打印img，注意不能直接打印img对象，需要包裹一层div
        $('#print').show();
    });
    $('#pic').html('');//打印完毕释放包裹层内容（图像)
    $('#poundsTitle').show();
}


