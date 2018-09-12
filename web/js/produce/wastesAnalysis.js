/**
 * 危废入场分析日报
 * */
///////////污水分析日报//
function reset() {
    $("#senior").find("input").val("");
    $("#searchContent").val("");
}

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalWasteIntoRecord",                  // url
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
            url: "searchSewageTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
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
    setWasteIntoList(result);
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
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
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
            url: "getWasteIntoList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    setWasteIntoList(result);
                }
                else {
                    alert(result.message);

                }
            },
            error:function (result) {
                alert("服务器异常！")
            }
        });
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchSewage",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setSewageList(result.data);
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
//加载危废入场分析日报数据列表
function loadWasteIntoList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteIntoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setWasteIntoList(result);
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
             alert("服务器异常！")
        }
    });
}
//设置危废入场分析日报数据
function setWasteIntoList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data,function (index,item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index+1);
                    break;
                // 收样日期
                case (1):
                    $(this).html(getDateStr(obj.laboratoryTest.samplingDate));
                    break;
                // 联单号码
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                // 产废单位
                case (3):
                        $(this).html(obj.client.companyName);
                    break;
                // 废物名称
                case (4):
                        $(this).html(obj.laboratoryTest.wastesName);
                    break;
                // 废物类别
                case (5):
                        $(this).html(obj.wastesCategory);
                    break;
                // 废物形态
                case (6):
                   $(this).html(obj.handleCategory.name);
                    break;
                    //PH
                case (7):
                        $(this).html(obj.laboratoryTest.phAverage);
                    break;
                    //热值
                case (8):
                    $(this).html(obj.laboratoryTest.heatAverage);
                    break;
                    //水分
                case (9):
                    $(this).html(obj.laboratoryTest.waterContentAverage);
                    break;
                    //灰分
                case (10):
                    $(this).html(obj.laboratoryTest.ashAverage);
                    break;
                    //氟含量
                case (11):
                    $(this).html(obj.laboratoryTest.fluorineContentAverage);
                    break;
                    //氯含量
                case (12):
                    $(this).html(obj.laboratoryTest.chlorineContentAverage);
                    break;
                    //硫含量
                case (13):
                    $(this).html(obj.laboratoryTest.sulfurContentAverage);
                    break;
                    //磷含量
                case (14):
                    $(this).html(obj.laboratoryTest.phosphorusContentAverage);
                    break;
                    //闪点
                case (15):
                    $(this).html(obj.laboratoryTest.flashPointAverage);
                    break;
                    //粘度
                case (16):
                    $(this).html(obj.laboratoryTest.viscosityAverage);
                    break;
                    //熔融温度
                case (17):
                    $(this).html(obj.laboratoryTest.meltingPointAverage);
                    break;
                    //备注
                case (18):
                    $(this).html(obj.remarks);
                    break;
            }
        })
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
}
//加载次生入场分析日报数据列表
function secondaryAnalysis() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondIntoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setSecIntoList(result);
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });
}
//设置次生入场日报数据
//
function setSecIntoList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data,function (index,item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index+1);
                    break;
                // 收样日期
                case (1):
                    if(obj.laboratoryTest!=null){
                        $(this).html(getDateStr(obj.laboratoryTest.samplingDate));
                    }
                    break;
                // 废物名称
                case (2):
                    if(obj.laboratoryTest!=null){
                        if(obj.laboratoryTest.wastesName=='slag'){
                            $(this).html('炉渣');
                        }
                        if(obj.laboratoryTest.wastesName=='ash'){
                            $(this).html('飞灰');
                        }
                        if(obj.laboratoryTest.wastesName=='bucket'){
                            $(this).html('桶');
                        }
                    }

                    break;
                // 热灼减率%
                case (3):
                    $(this).html("");
                    break;
                // 水分%
                case (4):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.waterContentAverage);
                    }

                    break;
                // 备注
                case (5):
                    $(this).html(obj.remarks);
                    break;
            }
        })
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        tr.hide();
    });

}