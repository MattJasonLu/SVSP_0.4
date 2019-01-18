var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array = [];
array1 = [];
array0=[];



/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

//重置
function reset() {
    window.location.reload();
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalMedicalWasteRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
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
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchMedicalWastesCount",                  // url
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
    return loadPages(totalRecord, count);
}

/**
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setMedicalWastesList(result);
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
            AddAndRemoveClass(this)
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
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) { //分页用的
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadMedicalWastesList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log("走到这了！");
                    setMedicalWastesList(result);
                    calculationTotal();
                } else {
                    console.log("fail: " + result);
                    // setClientList(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                // setClientList(result);
            }
        });
    }
    if (isSearch) {//查询用的
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchMedicalWastes",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setMedicalWastesList(result);
                    calculationTotal();
                } else {
                    console.log("fail: " + result);
                    // setClientList(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                // setClientList(result);
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadMedicalWastesList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setMedicalWastesList(result);
                        calculationTotal();
                    } else {
                        console.log("fail: " + result);
                        // setClientList(result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                    // setClientList(result);
                }
            });
        }
        if (isSearch) {//查询用的
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchMedicalWastes",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setMedicalWastesList(result);
                        calculationTotal();
                    } else {
                        console.log("fail: " + result);
                        // setClientList(result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                    // setClientList(result);
                }
            });
        }
    }
}

//加载医危废数据
function loadMedicalWastesList() {
    $('.loader').show();
    loadNavigationList();    // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    // if(array0.length==0){
    //     for (var i = 1; i <= totalPage(); i++) {
    //         switchPage(parseInt(i));
    //
    //         array0.push($('.myclass'));
    //     }
    // }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "loadMedicalWastesList",                  // url
        dataType: "json",
        async: false,
        data: JSON.stringify(page),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide();
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
                //setMedicalWastesList(result);
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
    calculationTotal();
   //获取现有库存
    getCurrentWastesAmount();
}

//获取现有库存
function getCurrentWastesAmount() {

    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentWastesAmount",                  // url
        dataType: "json",
        async: false,
        // data: JSON.stringify(page),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                if(result.data!=null){
                    $("#wastesAmount").text(result.data.wastesAmount.toFixed(3))
                }

            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")

        }
    });


}
//设置医危废数据
function setMedicalWastesList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.medicalWastesList, function (index, item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class', 'myclass');
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 登记单号
                case (1):
                    $(this).html(obj.medicalWastesId);
                    break;
                // 登记日期
                case (2):
                    $(this).html(getDateStr(obj.dateTime));
                    break;
                //本月进厂危废
                case (3):
                    $(this).html(obj.thisMonthWastes.toFixed(3));
                    break;
                //本日直接转外处置量
                case (4):
                    $(this).html(obj.directDisposal.toFixed(3));
                    break;
                //本日蒸煮医废(过磅)
                case (5):
                    $(this).html(obj.cookingWastes.toFixed(3));
                    break;
                //蒸煮后重量
                case (6):
                    $(this).html(obj.afterCookingNumber.toFixed(3));
                    break;
                //蒸煮后入库量
                case (7):
                    $(this).html(obj.afterCookingInbound.toFixed(3));
                    break;
                //本月蒸煮后外送量
                case (8):
                    $(this).html(obj.thisMonthSendCooking.toFixed(3));
                    break;
                //误差量
                case (9):
                    $(this).html(obj.errorNumber.toFixed(3));
                    break;
                //水分含量
                case (10):
                    $(this).html(obj.wetNumber.toFixed(3));
                    break;
                    //期初量
                case (11):
                    $(this).html(obj.earlyNumber.toFixed(3));
                    break;

            }
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
            tr.removeAttr('class');
        });
        // 把克隆好的tr追加到原来的tr前面

    });
    // 隐藏无数据的tr
    tr.hide();

}



function calculationTotal() {

    var thisMonthWastesTotal=0;

    var directDisposalTotal=0;

    var cookingWastesTotal=0;

    var afterCookingNumberTotal=0;

    var afterCookingInboundTotal=0;

    var thisMonthSendCookingTotal=0;

    var errorNumberTotal=0;

    var wetNumberTotal=0;

    var earlyNumberTotal=0;

    $('.myclass').each(function () {
        thisMonthWastesTotal+=parseFloat($(this).children('td').eq(3).html());
        directDisposalTotal+=parseFloat($(this).children('td').eq(4).html());
        cookingWastesTotal+=parseFloat($(this).children('td').eq(5).html());
        afterCookingNumberTotal+=parseFloat($(this).children('td').eq(6).html());
        afterCookingInboundTotal+=parseFloat($(this).children('td').eq(7).html());
        thisMonthSendCookingTotal+=parseFloat($(this).children('td').eq(8).html());
        errorNumberTotal+=parseFloat($(this).children('td').eq(9).html());
        wetNumberTotal+=parseFloat($(this).children('td').eq(10).html());
        earlyNumberTotal+=parseFloat($(this).children('td').eq(11).html());
    })
    console.log(thisMonthWastesTotal)
    $("#tbody2").find('tr').children("td").eq(2).html(thisMonthWastesTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(3).html(directDisposalTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(4).html(cookingWastesTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(5).html(afterCookingNumberTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(6).html(afterCookingInboundTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(7).html(thisMonthSendCookingTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(8).html(errorNumberTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(9).html(wetNumberTotal.toFixed(3))
    $("#tbody2").find('tr').children("td").eq(10).html(earlyNumberTotal.toFixed(3))
}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) {
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchMedicalWastes();
            }
            else if (event.keyCode == '13') {
                searchMedicalWastes();
            }
        }, 600);

    });
});

//查询
function searchMedicalWastes() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            beginTime:$("#search-storageDate").val(),
            endTime:$("#search-endDate").val(),
            page: page,
            checkStateItem:{dataDictionaryItemId:$("#search-checkState").val()}
        };
        console.log(data);
        // 模糊查询
    } else {
        var keyword=$.trim($("#searchContent").val());
        data = {
            keyword: keyword,
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchMedicalWastes",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
                calculationTotal();
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchMedicalWastes();      //
    }
}