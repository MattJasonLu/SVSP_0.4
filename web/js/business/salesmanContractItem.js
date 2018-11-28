/**
 * Created by matt on 2018/8/21.
 */

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1 = null;
var pretreatmentId = '';

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
            url: "getAllContractCountBySalesmanId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data:{
                salesmanId : localStorage.salesmanId
            },
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
            url: "",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
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
    setContractList(result);
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
    data1.page = page;
    data1.salesmanId = localStorage.salesmanId;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getAllContractBySalesmanId",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setContractList(result);
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
            url: "",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setContractList(result);
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        data1.page = page;
        data1.salesmanId = localStorage.salesmanId;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getAllContractBySalesmanId",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setContractList(result);
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
                url: "",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setContractList(result);
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
function loadSalesmanAllContract() {
    loadNavigationList();   // 动态菜单部署
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
    data1 = {};
    data1.page = page;
    data1.salesmanId = localStorage.salesmanId;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllContractBySalesmanId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data1),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
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

var serialNumber = 0;   // 序号
function setContractList(result) {
    serialNumber = 0;
    // 获取id为clone2的tr元素
    var tr = $("#clone2");
    tr.siblings().remove();
    $.each(result.contractInfo, function (index, item) {
        for (var i = 0; i < result.contractInfo[index].quotationItemList.length; i++) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            serialNumber++;
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (0):
                        // 序号
                        $(this).html(serialNumber);
                        break;
                    case (1):
                        // 单位名称
                        if (result.contractInfo != null && result.contractInfo[index] != null && result.contractInfo[index].client != null)
                            $(this).html(result.contractInfo[index].client.companyName);
                        break;
                    case (2):
                        // 所属区域
                        if (result.contractInfo != null && result.contractInfo[index] != null && result.contractInfo[index].client != null)
                            $(this).html(result.contractInfo[index].client.location);
                        break;
                    case (3):
                        // 签订日期
                        if (result.contractInfo[index] != null)
                            $(this).html(getDateStr(result.contractInfo[index].beginTime));
                        break;
                    case (4):
                        // 预处理费
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].order1);
                        break;
                    case (5):
                        // 联系人/联系电话
                        if (result.contactInfo[index] != null)
                            $(this).html(result.contactInfo[index]);
                        break;
                    case (6):
                        // 危废名称
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].quotationItemList[i].wastesName);
                        break;
                    case (7):
                        // 状态
                        if (result.contractInfo[index] != null && result.contractInfo[index].checkState != null)
                            $(this).html(result.contractInfo[index].checkState.name);
                        break;
                    case (8):
                        // 危废代码
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].quotationItemList[i].wastesCode);
                        break;
                    case (9):
                        // 合约量(t)
                        if (result.contractInfo[index] != null && result.contractInfo[index].quotationItemList != null){
                            $(this).html(result.contractInfo[index].quotationItemList[i].contractAmount.toFixed(2));
                        }
                        break;
                    case (10):
                        // 单价
                        if (result.contractInfo[index] != null){
                            $(this).html(result.contractInfo[index].quotationItemList[i].unitPriceTax.toFixed(2));
                        }
                        break;
                    case (11):
                        // 总价
                        var unitPriceTax = result.contractInfo[index].quotationItemList[i].unitPriceTax;
                        var contractAmount = result.contractInfo[index].quotationItemList[i].contractAmount;
                        if (result.contractInfo[index] != null)
                            $(this).html((parseFloat(contractAmount) * parseFloat(unitPriceTax)).toFixed(2));
                        break;
                    case (12):
                        // PH
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].phAverage);
                        break;
                    case (13):
                        // 灰分
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].ashAverage);
                        break;
                    case (14):
                        // 水分
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].waterContentAverage);
                        break;
                    case (15):
                        // 热值
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].heatAverage);
                        break;
                    case (16):
                        // 氯
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].chlorineContentAverage);
                        break;
                    case (17):
                        // 硫
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].sulfurContentAverage);
                        break;
                    case (18):
                        // 闪点
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].flashPointAverage);
                        break;
                    case (19):
                        // 粘度
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].viscosityAverage);
                        break;
                    case (20):
                        // 熔点
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].meltingPointAverage);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    });
    // 隐藏无数据的tr
    tr.hide();
}



