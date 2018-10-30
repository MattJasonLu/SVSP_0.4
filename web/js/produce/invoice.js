function viewClient() {
    $.ajax({
        type: "POST",                // 方法类型
        url: "getClient",            // url
        async: false,
        dataType: "json",
        data:{
            id: "0038"
        },
        success: function (result) {
            if (result != undefined) {
                // var data = eval(result.data);
                $("#companyName").text(result.companyName);//index + 1
                $("#organizationCode").text(result.organizationCode);
                $("#representative").text(result.representative);
                $("#industry").text(result.industry);
                $("#enterpriseType").text(result.enterpriseType.name);
                $("#operationType").text(result.operationType.name);
                $("#operationRecord").text(result.operationRecord.name);
                $("#street").text(result.street);
                $("#clientId").text(result.clientId);
                $("#licenseCode").text(result.licenseCode);
                $("#postCode").text(result.postCode);
                $("#product").text(result.product);
                $("#operationMode").text(result.operationMode.name);
                $("#contingencyPlan").text(result.contingencyPlan.name);
                $("#applicationStatus").text(result.applicationStatus.name);
                $("#location").text(result.location);
            } else {
                // console.log(result.message);
            }
            // console.log($("#companyName").text(result.companyName));
            // console.log($("#industry").text(result.industry));
            // console.log($("#organizationCode").text(result.organizationCode));
            // console.log($("#representative").text(result.representative));
            // console.log($("#enterpriseType").text(result.enterpriseType.name));
            // console.log($("#operationType").text(result.operationType.name));
            // console.log($("#operationRecord").text(result.operationRecord.name));
            // console.log($("#street").text(result.street));
            // console.log($("#clientId").text(result.clientId));
            // console.log($("#licenseCode").text(result.licenseCode));
            // console.log($("#postCode").text(result.postCode));
            // console.log($("#product").text(result.product));
            // console.log($("#operationMode").text(result.operationMode.name));
            // console.log($("#contingencyPlan").text(result.contingencyPlan.name));
            // console.log($("#applicationStatus").text(result.applicationStatus.name));
            // console.log($("#location").text(result.location));
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}
/**
 * 加载表格数据
 * */
function setInvoice(obj) {
    // 赋值
    $("#companyName").text(obj.companyName);//index + 1
    $("#organizationCode").text(obj.organizationCode);
    $("#representative").text(obj.representative);
    $("#industry").text(obj.industry);
    $("#enterpriseType").text(obj.enterpriseType.name);
    $("#operationType").text(obj.operationType);
    $("#operationRecord").text(obj.operationRecord);
    $("#street").text(obj.street);
    $("#clientId").text(obj.clientId);
    $("#licenseCode").text(obj.licenseCode);
    $("#postCode").text(obj.postCode);
    $("#product").text(obj.product);
    $("#operationMode").text(obj.operationMode);
    $("#contingencyPlan").text(obj.contingencyPlan);
    $("#applicationStatus").text(obj.applicationStatus);
    $("#location").text(obj.location);
}

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

/////////////显示登陆日志（分页）//////////////////////
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
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setDataList(result);
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
    if(pageNumber > totalPage()){
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
    console.log(page);
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
    }
}

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
                // 样品预约号
                case (1):
                    $(this).html(obj.username);
                    break;
                //样品状态
                case (2):
                    $(this).html(obj.ip);
                    break;
                // 公司名称
                case (3):
                    $(this).html(getTimeStr(obj.time));
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
}
