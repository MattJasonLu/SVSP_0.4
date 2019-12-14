/*********************
 * jackYang
 */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importCompatibilityExcel",              // url
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

// function importExcel() {
//     document.getElementById("idExcel").click();
//     document.getElementById("idExcel").addEventListener("change", function () {
//         var id = '0000';
//         console.log("change");
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "getCurrentCompatibilityId",              // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             dataType: "json",
//             contentType: false,
//             success: function (result) {
//                 if (result != undefined || result != NaN) {
//                     id = result.compatibilityId;
//                 } else {
//                     alert("数据获取失败！ " + result);
//                 }
//             },
//             error: function (result) {
//                 alert("导入失败，请检查后重试！")
//                 console.log("error" + result);
//             }
//         });
//         var eFile = document.getElementById("idExcel").files[0];
//         var formFile = new FormData();
//         formFile.append("excelFile", eFile);
//         formFile.append("tableName", 't_pr_pw');
//         formFile.append("id", id);
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "importCompatibilityExcel",              // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             dataType: "json",
//             data: formFile,
//             processData: false,
//             contentType: false,
//             success: function (result) {
//                 if (result != undefined) {
//                     console.log(result);
//                     if (result.status == "success") {
//                         alert(result.message);
//                         window.location.reload();         //刷新
//                     } else {
//                         alert(result.message);
//                     }
//                 }
//             },
//             error: function (result) {
//                 console.log(result);
//             }
//         });
//     });
//
// }
/**
 * 下载模板
 * */
// function downloadModal() {
//
//
//
// }
//下载按钮绑定事件
$(function () {
    $('#download').click(function () {
        console.log("form提交")
        var filePath = 'Files/Templates/配伍计划导入模板.xlsx';
        var r = confirm("是否下载模板?");

        if (r == true) {
            $('#vform').submit();


            //e.preventDefault();
            // var newTab = window.open('about:blank')
            // console.log("打开了空白页面")
            // newTab.location.href='downloadFile?filePath='+filePath;
            // console.log("打开了下载页面")
            //window.open('downloadFile?filePath=' + newTab);

        }


    })
})


$(".canModify").click(function () {

    var test01 = window.open();  //此处不会拦截

    ajaxInSameDomain(url, "regStatus=06&supplierInfoId=" + _this.attr("cz"), 'POST', function (data) {
        if (data.mark == "success") {


            //path=需要弹出的页面URL；


            test01.location = path;//此处会将弹出的页面内容刷新为原先需要弹出页面的内容，从而绕过拦截


        } else if (data.mark == "hasStop") {

            return;
        }
    }, null);
});


/**
 *
 * 导出
 * @returns {string}
 */
function exportExcel() {
    var name = '配伍周计划';
    var idArry = [];//存放主键
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select a.compatibilityId,c.dictionaryItemName,d.dictionaryItemName , b.proportion,b.dailyRatio,b.weeklyDemandTotal,b.calorific,b.ash,b.water,b.cl,b.s,b.p,b.f,b.ph from t_pr_pw a join t_pr_pwitem b on a.compatibilityId=b.compatibilityId join datadictionaryitem c on c.dataDictionaryItemId=b.handleCategoryId join datadictionaryitem d on d.dataDictionaryItemId=b.formTypeId   " ;
        window.open('exportExcelWeekPlan?name=' + name + '&sqlWords=' + sqlWords);
    }
    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().next().html());        // 将选中项的编号存到集合中
            }
        });
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += idArry[i] + ",";
                else if (i == idArry.length - 1) sql += idArry[i] + ");"
            }
            var sqlWords = "select a.compatibilityId,c.dictionaryItemName,d.dictionaryItemName , b.proportion,b.dailyRatio,b.weeklyDemandTotal,b.calorific,b.ash,b.water,b.cl,b.s,b.p,b.f,b.ph from t_pr_pw a join t_pr_pwitem b on a.compatibilityId=b.compatibilityId join datadictionaryitem c on c.dataDictionaryItemId=b.handleCategoryId join datadictionaryitem d on d.dataDictionaryItemId=b.formTypeId  and a.compatibilityId " + sql;

        }
        console.log(sqlWords)
        window.open('exportExcelWeekPlan?name=' + name + '&sqlWords=' + sqlWords);
    }
}

function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth() + 1;
    var day = obj.getDate();
    if (day % 7 > 0) var a = 1; else a = 0;
    var days = new Date();
    days.setFullYear(year);
    days.setMonth(month);
    days.setDate(1);
    if (obj.getDay() <= days.getDay()) {
        var week = parseInt(day / 7) + a + 1;
    } else {
        week = parseInt(day / 7) + a;
    }
    return year + "年" + month + "月第" + week + "周";

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
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalCompatibilityRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
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
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchCompatibilityTotal",                  // url
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
    setCompatibility(result);
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
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getList1",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setCompatibility(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    else {
        data1['page'] = page;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchCompatibility",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setCompatibility(result)
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

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
                url: "getList1",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setCompatibility(result);
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
                url: "searchCompatibilityTotal",                  // url
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
    }
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
 * 加载配伍周计划数据
 */
function getList1() {
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

      if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()))
        searchPw();
        window.localStorage.removeItem('approvalId');
    }

      else {
        $.ajax({
            type: "POST",
            url: "getList1",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    console.log(result);
                    setPageClone(result);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                }
                else {
                    alert(result.message);
                }
            },
            error: function (result) {
                alert("服务器异常！")
            }
        });
        // 设置高级检索的下拉框数据
        setPwList();
        isSearch = false;
    }


    getCurrentUserData();
}

/*加载表格数据
*
*/
function setCompatibility(result) {

    var tr = $('#cloneTr1');

    tr.siblings().remove();

    $.each(result.compatibilityList, function (index, item) {
        var data = eval(item);
        // console.log(data)
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass1');
        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {

            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (1):
                    $(this).html(index + 1);
                    break;

                //配伍计划单号
                case (2):
                    $(this).html(data.compatibilityId);
                    break;

                // 小计日配比量
                case (3):
                    $(this).html(data.totalDailyAmount);
                    break;

                //周需求总量
                case (4):
                    $(this).html(data.weeklyDemandTotalAggregate.toFixed(1));
                    break;

                // 平均热值
                case (5):
                    $(this).html((data.calorificAvg).toFixed(1));
                    break;

                //平均灰分
                case (6):
                    $(this).html(data.ashAvg.toFixed(1));
                    break;

                // 平均水分
                case (7):
                    $(this).html(data.waterAvg.toFixed(1));
                    break;

                // 平均CL
                case (8):
                    $(this).html(data.clAvg.toFixed(1));
                    break;

                //平均S
                case (9):
                    $(this).html(data.sAvg.toFixed(1));
                    break;

                //平均P
                case (10):
                    $(this).html(data.pAvg.toFixed(1));
                    break;

                //平均F
                case (11):
                    $(this).html(data.fAvg.toFixed(1));
                    break;

                //平均PH
                case (12):
                    $(this).html(data.phAvg.toFixed(1));
                    break;

                //状态
                case (13):
                    if (data.checkStateItem != null) {
                        $(this).html(data.checkStateItem.dictionaryItemName);
                    }
                    break;
            }
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        //把克隆好的tr追加到原来的tr前面
        // 隐藏无数据的tr

        tr.hide();


    });

}


/*
* 操作行选定*/
function selected1(item) {
    //1获得表单编号
    var pwId = item.firstElementChild.innerHTML;
    if ($(item).css('background-color') == 'rgb(127, 255, 212)') {
        $(item).css('background-color', "");
        //删除所选Id
        arrayId.pop(pwId);
    }
    else {
        if (arrayId.length == 0) {
            arrayId.push(pwId);
        }
        if (arrayId.length == 1) {
            $(item).css("background", 'Aquamarine').siblings().css("background", "");
            arrayId.length = 0;
            arrayId.push(pwId);
        }
    }

}


/**
 * 出现具体审批的模态框
 */
function approvalModal() {
    $('#contractInfoForm2').modal('show');
}

/**
 * 出现具体驳回的模态框
 */
function back(item) {
    var compatibilityId = $(item).parent().parent().children('td').eq(2).text();

    $.ajax({
        type: "POST",
        url: "getByCompatibilityId",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': compatibilityId},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //赋值配伍单号
                $("#backContent").val(result.data.backContent);
                $('#compatibilityId3').text(result.data.compatibilityId)
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });


    $('#contractInfoForm3').modal('show');


}

//把按钮功能分出来做这个是审批
function confirm1(id) {
    opinion = $('#advice').val();
    //console.log(opinion);
    //1获取文本框的值
    $.ajax({
        type: "POST",
        url: "approvalPw",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'pwId': id, 'opinion': opinion,},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // alert(result.message);
                console.log(result);
                // window.location.reload();
            }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

//把按钮功能分出来做这个是驳回
function back1(id) {
    var compatibilityId = $('#compatibilityId3').text();
    var opinion = $('#backContent').val();
    $.ajax({
        type: "POST",
        url: "backPw",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': id, "opinion": opinion},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // alert(result.message);
                // window.location.reload();
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

//序号变成四位
function getFour(pwId) {
    var pwld1 = "" + pwId;
    while (pwld1.length != 4) {
        pwld1 = "0" + pwld1;
    }
    return pwld1;
}

/**
 * 作废方法
 */
function cancelPw(item) {
    var compatibilityId = $(item).parent().parent().children('td').eq(2).text();
    if (confirm("确认作废?")) {
        $.ajax({
            type: "POST",
            url: "cancelPw",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'compatibilityId': compatibilityId},
            //contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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


}

/**
 * 提交方法
 */
function submit(item) {
    initSubmitFName(submitPw.name);
  var state= $(item).parent().parent().children('td').eq(13).text();//订单号
    if(state=='待提交'||state=='已驳回'){
        if (confirm("确认提交?")) {
            var compatibilityId = $(item).parent().parent().children('td').eq(2).text();//订单号
            //用户角色ID
            var user=getCurrentUserData();
            console.log(user);
            var url=getUrl();
            publicSubmit(compatibilityId,url,user.name,user.role.id)
            // $.ajax({
            //     type: "POST",
            //     url: "submitPw",                  // url
            //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            //     dataType: "json",
            //     data: {'compatibilityId': compatibilityId},
            //     //contentType: "application/json; charset=utf-8",
            //     success: function (result) {
            //         if (result != undefined && result.status == "success") {
            //             // alert(result.message);
            //             // window.location.reload();
            //         }
            //         else {
            //             alert(result.message);
            //         }
            //     },
            //     error: function (result) {
            //         alert("服务器异常！")
            //     }
            //
            // });
        }
    }

    // if(state=='待提交'){
    // }
    // else {
    //     alert('仅待提交状态时提交')
    // }

}

function submitPw(compatibilityId) {
    $.ajax({
        type: "POST",
        url: "submitPw",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': compatibilityId},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // alert(result.message);
                // window.location.reload();
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

//把按钮功能分出来做这个是审批
function confirmCompatibilityId() {
    var compatibilityId = $('#compatibilityId').text();
    var opinion = $('#remarks').val();
    $.ajax({
        type: "POST",
        url: "approvalCompatibility",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': compatibilityId, "opinion": opinion},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
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

/**
 * 设置高级检索的下拉框数据
 */
function setPwList() {

    //进料方式
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandleCategoryByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var handleCategory = $('#search-handleCategory');
                handleCategory.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

   //物质形态
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var formType = $('#search-formType');
                formType.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

array = [];
array1 = [];

/**
 * 生成物料需求单==》勾选生成
 */
function generate() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length > 0) {
        if (confirm("是否生成物料需求?")) {
            var Array = [];
            $.each(items, function (index) {
                Array.push($(this).parent().parent().parent().children('td').eq(13).html())
            });
            if (Array.indexOf("生效中") != -1) {
                alert("请勿勾选生成过的数据！请重新勾选")
            }
            if (Array.indexOf("生效中") == -1) {
                var checkState = [];
                $.each(items, function (index) {
                    checkState.push($(this).parent().parent().parent().children('td').eq(13).html())
                });
                console.log(checkState)
                if (!(checkState.indexOf("审批通过") == -1)) {
                    $.each(items, function (index) {
                        if ($(this).parent().parent().next().next().html().length > 0 && $(this).parent().parent().parent().children('td').eq(13).html() == '审批通过') {
                            var compatibilityId = $(this).parent().parent().next().next().html();//配伍单号
                            $.ajax({
                                type: "POST",
                                url: "generateSheet",                  // url
                                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: {"compatibilityId": compatibilityId},
                                dataType: "json",
                                // contentType: "application/json; charset=utf-8",
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {
                                        alert(result.message);

                                    }
                                },
                                error: function (result) {
                                    alert("服务器异常！");
                                },


                            });

                        }
                    });
                    alert("生成物料需求单成功！")
                    if (confirm("是否跳转到物料需求页面?")) {
                        window.location.href = "materialDemand.html"
                    }
                }
                else {
                    alert("不能勾选审批未通过的数据！")
                }


            }


        }

    }
    else {
        alert("请勾选数据！")
    }
}

//双击查看
function view(item) {
    var compatibilityId = $(item).children('td').eq(2).text();

    $.ajax({
        type: "POST",
        url: "getWeekById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': compatibilityId},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //赋值配伍单号
                $('#compatibilityId1').text(compatibilityId);
                setCompatibilityItemModal(result);


            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });


    $('#appointModal2').modal('show');
}

//点击图标查看
function view1(item) {
    var compatibilityId = $(item).parent().parent().children('td').eq(2).text();

    $.ajax({
        type: "POST",
        url: "getWeekById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': compatibilityId},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //赋值配伍单号
                $('#compatibilityId1').text(compatibilityId);
                setCompatibilityItemModal(result);


            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });


        $('#appointModal2').modal('show');


}

//设置配伍明细模态框

function setCompatibilityItemModal(result) {
    var tr = $('#cloneTr');

    tr.siblings().remove();

    var proportionTotal = 0;

    var dailyRatioTotal = 0;

    var weeklyDemandTotalAdd = 0;

    var calorificTotal = 0;

    var ashTotal = 0;

    var waterTotal = 0;

    var clTotal = 0;

    var sTotal = 0;

    var pTotal = 0;

    var fTotal = 0;

    var phTotal = 0;


    $.each(result.array, function (index, item) {
        var obj = eval(item);

        var clonedTr = tr.clone();

        clonedTr.show();


        clonedTr.children('td').each(function (inner_index) {

            switch (inner_index) {
                //序号
                case (0):
                    $(this).html(index + 1);
                    break;

                //处理类别
                case (1):
                    if (obj.handleCategoryItem != null) {
                        $(this).html(obj.handleCategoryItem.dictionaryItemName);
                    }
                    break;

                //物质形态
                case (2):
                    if (obj.formTypeItem != null) {
                        $(this).html(obj.formTypeItem.dictionaryItemName);
                    }
                    break;
                //比例
                case (3):
                    $(this).html(obj.proportion.toFixed(2));
                    proportionTotal += parseFloat(obj.proportion.toFixed(2));
                    break;
                //每日配置量
                case (4):
                    $(this).html(obj.dailyRatio.toFixed(2));
                    dailyRatioTotal += parseFloat(obj.dailyRatio.toFixed(2));
                    break;
                //周需求总理
                case (5):
                    $(this).html(obj.weeklyDemandTotal.toFixed(2));
                    weeklyDemandTotalAdd += parseFloat(obj.weeklyDemandTotal.toFixed(2));
                    break;
                //热值
                case (6):
                    $(this).html(obj.calorific.toFixed(2));
                    calorificTotal += parseFloat(obj.calorific.toFixed(2));
                    break;
                //热值阈值
                case (7):
                    $(this).html(obj.calorificThreshold);
                    break;
                //灰分
                case (8):
                    $(this).html(obj.ash.toFixed(2));
                    ashTotal += parseFloat(obj.ash.toFixed(2));
                    break;
                //灰分阈值
                case (9):
                    $(this).html(obj.ashThreshold);
                    break;
                //水分
                case (10):
                    $(this).html(obj.water.toFixed(2));
                    waterTotal += parseFloat(obj.water.toFixed(2))
                    break;
                //水分阈值
                //灰分阈值
                case (11):
                    $(this).html(obj.waterThreshold);
                    break;
                //CL
                case (12):
                    $(this).html(obj.cl.toFixed(2));
                    clTotal += parseFloat(obj.cl.toFixed(2))
                    break;
                //CL阈值
                case (13):
                    $(this).html(obj.clThreshold);
                    break;
                //S
                case (14):
                    $(this).html(obj.s.toFixed(2));
                    sTotal += parseFloat(obj.s.toFixed(2));
                    break;
                //s阈值
                case (15):
                    $(this).html(obj.sThreshold);
                    break;
                //P
                case (16):
                    $(this).html(obj.p.toFixed(2));
                    pTotal += parseFloat(obj.p.toFixed(2));
                    break;
                //p阈值
                case (17):
                    $(this).html(obj.phThreshold);
                    break;
                //F
                case (18):
                    $(this).html(obj.f.toFixed(2));
                    fTotal += parseFloat(obj.f.toFixed(2));
                    break;
                //f阈值
                case (19):
                    $(this).html(obj.fThreshold);
                    break;
                //PH
                case (20):
                    $(this).html(obj.ph.toFixed(2));
                    phTotal += parseFloat(obj.ph.toFixed(2));
                    break;
                //ph阈值
                case (21):
                    $(this).html(obj.phThreshold);
                    break;
            }
            clonedTr.removeAttr('id');
            clonedTr.insertBefore(tr);

        })

        tr.hide();


    })


    $('#proportionTotal').html(proportionTotal.toFixed(2));

    $('#dailyRatioTotal').html(dailyRatioTotal.toFixed(2));

    $('#weeklyDemandTotalAdd').html(weeklyDemandTotalAdd.toFixed(2));

    $('#calorificTotal').html(calorificTotal.toFixed(2));

    $('#ashTotal').html(ashTotal.toFixed(2));

    $('#waterTotal').html(waterTotal.toFixed(2));

    $('#clTotal').html(clTotal.toFixed(2));

    $('#sTotal').html(sTotal.toFixed(2));

    $('#pTotal').html(pTotal.toFixed(2));

    $('#fTotal').html(fTotal.toFixed(2));

    $('#phTotal').html(phTotal.toFixed(2));

}

//修改模态框

function adjust(item) {

    if ($(item).parent().parent().children('td').eq(13).text() != "审批通过") {
        var compatibilityId = $(item).parent().parent().children('td').eq(2).text();

        localStorage.compatibilityId = compatibilityId;
        window.location.href = "adjustCompatibility.html";
    }
    if ($(item).parent().parent().children('td').eq(13).text() == "审批通过") {
        alert("审批通过，无法修改,请驳回后修改！")
    }


}

//修改页面初始化
function adjustCom() {
    loadNavigationList();   // 动态菜单加载
    var compatibilityId = localStorage['compatibilityId'];

    $("#compatibilityId2").text(compatibilityId);





    //找出物料明细
    $.ajax({
        type: "POST",
        url: "getWeekById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'compatibilityId': compatibilityId},
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var tr = $('#cloneTr2');
                $("#cloneTr2").siblings().not($("#plusBtn")).remove();
                //$('#cloneTr2').siblings().remove();
                $.each(result.array, function (index, item) {


                    var obj = eval(item);

                    // console.log(obj)

                    var cloneTr = tr.clone();

                    cloneTr.attr('class', 'myclass2');
                    cloneTr.show();

                    cloneTr.children('td').eq(0).html(index + 1);

                    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine1(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";

                    if ((index + 1) != 1) {
                        cloneTr.children('td').eq(0).append(delBtn)
                    }

                    cloneTr.children('td').eq(3).children('input').val(obj.weeklyDemandTotal.toFixed(2));

                    cloneTr.children('td').eq(4).html(obj.dailyRatio.toFixed(2));

                    cloneTr.children('td').eq(5).html(obj.proportion.toFixed(2));

                    cloneTr.children('td').eq(6).children('input').val(obj.calorific.toFixed(2));

                    cloneTr.children('td').eq(7).children('input').val(obj.calorificThreshold);

                    cloneTr.children('td').eq(8).children('input').val(obj.ash.toFixed(2));

                    cloneTr.children('td').eq(9).children('input').val(obj.ashThreshold);

                    cloneTr.children('td').eq(10).children('input').val(obj.water.toFixed(2));

                    cloneTr.children('td').eq(11).children('input').val(obj.waterThreshold);

                    cloneTr.children('td').eq(12).children('input').val(obj.cl.toFixed(2));

                    cloneTr.children('td').eq(13).children('input').val(obj.clThreshold);

                    cloneTr.children('td').eq(14).children('input').val(obj.s.toFixed(2));

                    cloneTr.children('td').eq(15).children('input').val(obj.sThreshold);

                    cloneTr.children('td').eq(16).children('input').val(obj.p.toFixed(2));

                    cloneTr.children('td').eq(17).children('input').val(obj.pThreshold);


                    cloneTr.children('td').eq(18).children('input').val(obj.f.toFixed(2));

                    cloneTr.children('td').eq(19).children('input').val(obj.fThreshold);


                    cloneTr.children('td').eq(20).children('input').val(obj.ph.toFixed(2));

                    cloneTr.children('td').eq(21).children('input').val(obj.phThreshold);

                    cloneTr.children('td').eq(22).html(obj.id);


                    if (obj.handleCategoryItem != null) {
                        //进料方式
                        $.ajax({
                            type: 'POST',
                            url: "getHandleCategoryByDataDictionary",
                            async: false,
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined) {
                                    // console.log(result);
                                    var handelCategory = cloneTr.children('td').eq(1).children('select');
                                    handelCategory.children().remove();
                                    $.each(result.data, function (index, item) {
                                        var option = $('<option/>');
                                        option.val(item.dataDictionaryItemId);
                                        option.text(item.dictionaryItemName);
                                        handelCategory.append(option);
                                    });
                                    handelCategory.val(obj.handleCategoryItem.dataDictionaryItemId);
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                console.log(result);
                            }

                        });


                    }
                    if (item.formTypeItem != null) {
                        //物质形态
                        $.ajax({
                            type: 'POST',
                            url: "getFormTypeByDataDictionary",
                            async: false,
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success: function (result) {
                                if (result != undefined) {
                                    // console.log(result);
                                    var formType = cloneTr.children('td').eq(2).children('select');
                                    formType.children().remove();
                                    $.each(result.data, function (index, item) {
                                        var option = $('<option/>');
                                        option.val(item.dataDictionaryItemId);
                                        option.text(item.dictionaryItemName);
                                        formType.append(option);
                                    });
                                    formType.val(obj.formTypeItem.dataDictionaryItemId)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                console.log(result);
                            }

                        });

                    }
                    // cloneTr.removeAttr('id');
                    cloneTr.insertBefore(tr);
                    tr.removeAttr('class');

                })
                tr.hide();


            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });

    //合计赋值
    var weeklyDemandTotalAggregate = 0;

    var totalDailyAmount = 0;

    $('.myclass2').each(function () {
        var weeklyDemandTotal = parseFloat($(this).children('td').eq(3).find('input').val()).toFixed(2);
        var DailyAmount = parseFloat($(this).children('td').eq(4).html()).toFixed(2);
        weeklyDemandTotalAggregate += parseFloat(weeklyDemandTotal);
        totalDailyAmount += parseFloat(DailyAmount);
    })
    // console.log(weeklyDemandTotalAggregate.toFixed(2)+" "+totalDailyAmount.toFixed(2));
    $('#weeklyDemandTotalAdd4').html(weeklyDemandTotalAggregate.toFixed(2));
    $('#dailyRatioTota4').html(totalDailyAmount.toFixed(2))
}

//确认修改
function adjustConfirmPw() {

    var calorificSum = 0;

    var ashSum = 0;

    var waterSum = 0;

    var clSum = 0;

    var sSum = 0;

    var pSum = 0;

    var fSum = 0;

    var phSum = 0;

    var index = 0;
    var weeklyDemandTotalAggregate = 0;
    var totalDailyAmount = 0;

    $('.myclass2').each(function () {
        index++;
        calorificSum += parseFloat($(this).children('td').eq(6).children('input').val());
        ashSum += parseFloat($(this).children('td').eq(8).children('input').val());
        waterSum += parseFloat($(this).children('td').eq(10).children('input').val());
        clSum += parseFloat($(this).children('td').eq(12).children('input').val());
        sSum += parseFloat($(this).children('td').eq(14).children('input').val());
        pSum += parseFloat($(this).children('td').eq(16).children('input').val());
        fSum += parseFloat($(this).children('td').eq(18).children('input').val());
        phSum += parseFloat($(this).children('td').eq(20).children('input').val());
        // weeklyDemandTotalAggregate=$('#weeklyDemandTotalAdd4').html();
        // totalDailyAmount = $('#dailyRatioTota4').html();
    })
    //主表数据

    var data1 = {
        compatibilityId: $('#compatibilityId2').text(),
        calorificAvg: (calorificSum / index).toFixed(2),
        ashAvg: (ashSum / index).toFixed(2),
        waterAvg: (waterSum / index).toFixed(2),
        clAvg: (clSum / index).toFixed(2),
        sAvg: (sSum / index).toFixed(2),
        pAvg: (pSum / index).toFixed(2),
        fAvg: (fSum / index).toFixed(2),
        phAvg: (phSum / index).toFixed(2),
        weeklyDemandTotalAggregate: $('#weeklyDemandTotalAdd4').html(),
        totalDailyAmount: $('#dailyRatioTota4').html(),
    };
    console.log(data1)
    //更新主表数据
    $.ajax({
        type: "POST",
        url: "updateCompatibility",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data1),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                $('.myclass2').each(function () {
                    var data = {
                        compatibilityId: $('#compatibilityId2').text(),
                        handleCategoryItem: {dataDictionaryItemId:$(this).children('td').eq(1).children('select').val()},
                        formTypeItem: {dataDictionaryItemId:$(this).children('td').eq(2).children('select').val()},
                        // id: $(this).children('td').eq(14).html(),
                        weeklyDemandTotal: $(this).children('td').eq(3).children('input').val(),
                        dailyRatio: $(this).children('td').eq(4).html(),
                        proportion: $(this).children('td').eq(5).html(),
                        calorific: $(this).children('td').eq(6).children('input').val(),
                        calorificThreshold: $(this).children('td').eq(7).children('input').val(),
                        ash: $(this).children('td').eq(8).children('input').val(),
                        ashThreshold: $(this).children('td').eq(9).children('input').val(),
                        water: $(this).children('td').eq(10).children('input').val(),
                        waterThreshold: $(this).children('td').eq(11).children('input').val(),
                        cl: $(this).children('td').eq(12).children('input').val(),
                        clThreshold: $(this).children('td').eq(13).children('input').val(),
                        s: $(this).children('td').eq(14).children('input').val(),
                        sThreshold: $(this).children('td').eq(15).children('input').val(),
                        p: $(this).children('td').eq(16).children('input').val(),
                        pThreshold: $(this).children('td').eq(17).children('input').val(),
                        f: $(this).children('td').eq(18).children('input').val(),
                        fThreshold: $(this).children('td').eq(19).children('input').val(),
                        ph: $(this).children('td').eq(20).children('input').val(),
                        phThreshold: $(this).children('td').eq(21).children('input').val(),
                    };//字表数据
                    //更新字表数据
                    $.ajax({
                        type: "POST",
                        url: "addCompatibilityItemNew",                  // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {
                                console.log(result)
                            }
                            else {
                                console.log(result)
                            }
                        },
                        error: function (result) {
                            console.log("服务器异常！")
                        }


                    });
                })
            }
            else {
                console.log(result)
            }
        },
        error: function (result) {
            console.log("服务器异常！")
        }


    });
    alert("修改成功!");
    window.location.href = "weekPlan.html";

}

//修改页面计算比例==》每日配置量
function Calproportion(item) {

    var dailyRatio = $(item).val();//每日配置量

    var weeklyDemandTotal = $(item).parent().next().children('input').val();//周需求总量

    var proportion = ((dailyRatio / weeklyDemandTotal).toFixed(2)) * 100;

    $(item).parent().prev().children('input').val(proportion);

}

//修改页面计算比例==》周需求总量
function Calproportion1(item) {

    var weeklyDemandTotal = $(item).val();//周需求总量

    var dailyRatio = $(item).parent().prev().children('input').val();//每日配置量

    var proportion = (((dailyRatio / weeklyDemandTotal).toFixed(2)) * 100).toFixed(2);

    $(item).parent().prev().prev().children('input').val(proportion);

}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchPw();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchPw();      //
            }
        }, 600);
    });
});

//粗查询
function searchCompatibility() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var keywords = $.trim($("#searchContent").val());
    if (keywords == '已失效') {
        keywords = 'Disabled'
    }
    if (keywords == '待提交') {
        keywords = 'ToSubmit'
    }
    if (keywords == '审批通过') {
        keywords = 'Approval'
    }
    if (keywords == '待审批') {
        keywords = 'ToExamine'
    }
    data1 = {
        page: page,
        keywords: keywords
    }
    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchCompatibility",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined && result.status == "success") {
                    setPageClone(result)
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
 * 重置页面功能
 */
function reset() {
    window.location.reload();
}

//高级查询
function searchPw() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        var checkState = $('#search-checkState').val()
        var formType=$('#search-formType').val()
        var handleCategory=$('#search-handleCategory').val()
        if (checkState.length <= 0) {
            checkState = null;
        }
        data1 = {
            compatibilityItemList: [{
                compatibilityId: $.trim($("#search-pwId").val()),
                formTypeItem:{dataDictionaryItemId:formType} ,
                handleCategoryItem:{dataDictionaryItemId:handleCategory} ,
                weeklyDemandTotal: $.trim($('#search-weeklyDemandTotalAggregate').val()),
                calorificBeg: $.trim($('#search-calorificBeg').val()),
                calorificEnd: $.trim($('#search-calorificEnd').val()),
                fBeg: $.trim($('#search-fBeg').val()),
                fEnd: $.trim($('#search-fEnd').val()),
                clBeg: $.trim($('#search-clBeg').val()),
                clEnd: $.trim($('#search-clEnd').val()),
                sBeg: $.trim($('#search-sBeg').val()),
                sEnd: $.trim($('#search-sEnd').val()),
            }],
            page: page,
            checkStateItem:{dataDictionaryItemId:checkState}

        };
    }
    else {
        var keywords = $.trim($("#searchContent").val());
        data1 = {
            page: page,
            keywords: keywords
        }
    }


    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchCompatibility",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setPageClone(result)
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
    console.log(data1)
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchPw();      //
    }
}


//添加配伍计划单==>添加的是配伍明细
function addPw() {

    $.ajax({
        type: 'POST',
        url: "getNewCompatibilityId",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            console.log(result)
            $('#compatibilityId4').text(result)
        },
        error: function (result) {

        }
    })
    $('#appointModal4').modal('show');

    $('#cloneTr4').siblings().not($('#plusBtn')).remove();
    //下拉框赋值

    //进料方式
    $.ajax({
        type: 'POST',
        url: "getHandleCategoryByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var handleCategory = $('#handleCategory');
                handleCategory.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });

    //物质形态
    $.ajax({
        type: 'POST',
        url: "getFormTypeByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var formType = $('#formType');
                formType.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = 0;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
}

//克隆行方法==>修改
function addNewLine1() {
    // // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td").find("input").val("");
    // 获取编号
    clonedTr.children('td').eq(0).html($('.myclass2').length + 1);
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine1(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").append(delBtn);
}

//克隆行方法
function addNewLine() {
    // // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td").find("input").val("");
    // 获取编号
    clonedTr.children('td').eq(0).html($('.myclass3').length + 1);
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").append(delBtn);
}

//删除行方法==>修改
function delLine1(e) {
    var tr = $(e).parent().parent();
    var ele = $(e).parent().parent().parent().children('tr').eq(0).find("input");
    tr.remove();
    ele.keyup();
    tr.prev().children('td').find("input").trigger('onkeyup');
    $('.myclass2').each(function (index, item) {
        console.log(index);
        if (index + 1 == 1) {
            $(this).children('td').eq(0).html((parseInt(index) + 1));
        }
        if ((index + 1) > 1) {
            $(this).children('td').eq(0).html((parseInt(index) + 1) + "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>");

        }
    });


}

//删除行方法
function delLine(e) {
    var tr = $(e).parent().parent();
    var ele = $(e).parent().parent().parent().children('tr').eq(0).find("input");
    tr.remove();
    ele.keyup();
    tr.prev().children('td').find("input").trigger('onkeyup');
    $('.myclass3').each(function (index, item) {
        console.log(index);
        if (index + 1 == 1) {
            $(this).children('td').eq(0).html((parseInt(index) + 1));
        }
        if ((index + 1) > 1) {
            $(this).children('td').eq(0).html((parseInt(index) + 1) + "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>");

        }
    });


}

//周需求总量的计算(周需求总量合计 每日配置量 比例)
function Cal(item) {
    var weeklyDemandTotal;//周需求总量
    if ($.trim($(item).val().length) > 0) { //如果有输入就默认输入值
        weeklyDemandTotal = $(item).val();
    }
    if ($.trim($(item).val().length) <= 0) { //如果没输入就默认0
        weeklyDemandTotal = 0;
    }
    //1计算每日配置量
    var dailyRatio = (parseFloat(weeklyDemandTotal / 7)).toFixed(2); //每日配置量=周需求总量/7

    //给每日配置量赋值
    $(item).parent().next().html(dailyRatio);

    var weeklyDemandTotalAggregate = 0;
    //2计算周需求总量的合计
    $('.myclass3').each(function () {
        if ($.trim($(this).children('td').eq(3).children('input').val().length) <= 0) {
            $(this).children('td').eq(3).children('input').val(0);
        }
        // console.log('走到这');
        weeklyDemandTotalAggregate += parseFloat($(this).children('td').eq(3).children('input').val());
    });
    //计算周需求总量合计
    $("#weeklyDemandTotalAdd4").text(parseFloat(weeklyDemandTotalAggregate).toFixed(2));

    //计算比例==》周需求总量/计算周需求总量合计
    $('.myclass3').each(function () {
        // console.log('走到这');
        var proportion = (parseFloat($(this).children('td').eq(3).children('input').val()) / parseFloat($("#weeklyDemandTotalAdd4").html())).toFixed(2);
        if (isNaN(proportion)) { //如果输入的不是数字就默认0
            proportion = 0;
        }
        $(this).children('td').eq(5).text(parseFloat(proportion).toFixed(2));
    });


    //计算每日配比量合计
    var totalDailyAmount = 0;

    $('.myclass3').each(function () {
        console.log('走到这')
        var totalDaily1 = parseFloat($(this).children('td').eq(4).text());
        if (isNaN(totalDaily1)) { //如果输入的不是数字就默认0
            totalDaily1 = 0;
        }
        totalDailyAmount += totalDaily1;
    });
    console.log(totalDailyAmount);
    $('#dailyRatioTota4').html(parseFloat(totalDailyAmount).toFixed(2));

}

//周需求总量的计算(周需求总量合计 每日配置量 比例)==》修改
function Cal1(item) {
    var weeklyDemandTotal;
    if ($.trim($(item).val().length) > 0) {
        weeklyDemandTotal = $(item).val();
    }
    if ($.trim($(item).val().length) <= 0) {
        weeklyDemandTotal = 0;
    }
    //1计算每日配置量
    var dailyRatio = (parseFloat(weeklyDemandTotal / 7)).toFixed(2);

    //给每日配置量赋值
    $(item).parent().next().html(dailyRatio);

    var weeklyDemandTotalAggregate = 0;
    //2计算周需求总量的合计
    $('.myclass2').each(function () {
        if ($.trim($(this).children('td').eq(3).children('input').val().length) <= 0) {
            $(this).children('td').eq(3).children('input').val(0);
        }
        console.log('走到这')
        weeklyDemandTotalAggregate += parseFloat($(this).children('td').eq(3).children('input').val());
    })
    //计算周需求总量合计
    $("#weeklyDemandTotalAdd4").html(weeklyDemandTotalAggregate)

    //计算比例==》周需求总量/计算周需求总量合计
    $('.myclass2').each(function () {
        console.log('走到这')
        $(this).children('td').eq(5).html((parseFloat($(this).children('td').eq(3).children('input').val()) / parseFloat($("#weeklyDemandTotalAdd4").html())).toFixed(2))
    })


    //计算每日配比量合计
    var totalDailyAmount = 0;

    $('.myclass2').each(function () {
        console.log('走到这')
        var totalDaily1 = parseFloat($(this).children('td').eq(4).text());
        if (isNaN(totalDaily1)) {
            totalDaily1 = 0;
        }
        totalDailyAmount += totalDaily1;
    });
    console.log(totalDailyAmount)
    $('#dailyRatioTota4').html(parseFloat(totalDailyAmount).toFixed(2));


}

//真正的添加方法
function addCompatibility() {
    //1先列出主表信息
    //算平均值
    var calorificSum = 0;

    var ashAvgSum = 0;

    var waterSum = 0;

    var clSum = 0;

    var sSum = 0;

    var pSum = 0;

    var fSum = 0;

    var phSum = 0;

    var index1 = 0;

    $('.myclass3').each(function (index, item) {
        index1++;
        if ($.trim($(this).children('td').eq(6).find('input').val()).length == 0) {
            $(this).children('td').eq(6).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(8).find('input').val()).length == 0) {
            $(this).children('td').eq(8).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(10).find('input').val()).length == 0) {
            $(this).children('td').eq(10).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(12).find('input').val()).length == 0) {
            $(this).children('td').eq(12).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(14).find('input').val()).length == 0) {
            $(this).children('td').eq(14).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(16).find('input').val()).length == 0) {
            $(this).children('td').eq(16).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(18).find('input').val()).length == 0) {
            $(this).children('td').eq(18).find('input').val(0)
        }
        if ($.trim($(this).children('td').eq(20).find('input').val()).length == 0) {
            $(this).children('td').eq(20).find('input').val(0)
        }

        calorificSum += parseFloat($(this).children('td').eq(6).find('input').val());
        ashAvgSum += parseFloat($(this).children('td').eq(8).find('input').val());
        waterSum += parseFloat($(this).children('td').eq(10).find('input').val());
        clSum += parseFloat($(this).children('td').eq(12).find('input').val());
        sSum += parseFloat($(this).children('td').eq(14).find('input').val());
        pSum += parseFloat($(this).children('td').eq(16).find('input').val());
        fSum += parseFloat($(this).children('td').eq(18).find('input').val());
        phSum += parseFloat($(this).children('td').eq(20).find('input').val());
    })


    var data = {
        compatibilityId: $('#compatibilityId4').text(),
        totalDailyAmount: $("#dailyRatioTota4").html(),
        weeklyDemandTotalAggregate: $("#weeklyDemandTotalAdd4").html(),
        calorificAvg: parseFloat(calorificSum / index1).toFixed(2),
        ashAvg: parseFloat(ashAvgSum / index1).toFixed(2),
        waterAvg: parseFloat(waterSum / index1).toFixed(2),
        clAvg: parseFloat(clSum / index1).toFixed(2),
        sAvg: parseFloat(sSum / index1).toFixed(2),
        pAvg: parseFloat(pSum / index1).toFixed(2),
        fAvg: parseFloat(fSum / index1).toFixed(2),
        phAvg: parseFloat(phSum / index1).toFixed(2),
    };
    console.log(data)
    $.ajax({
        type: 'POST',
        url: "addCompatibilityNew",
        data: JSON.stringify(data),
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //1添加明细
                $('.myclass3').each(function () {
                    var dataItem = {
                        compatibilityId: $('#compatibilityId4').text(),
                        handleCategoryItem: {dataDictionaryItemId:$(this).children('td').eq(1).find('select').val()},
                        formTypeItem:{dataDictionaryItemId:$(this).children('td').eq(2).find('select').val()} ,
                        proportion: $(this).children('td').eq(5).html(),
                        dailyRatio: $(this).children('td').eq(4).html(),
                        weeklyDemandTotal: $(this).children('td').eq(3).find("input").val(),
                        calorific: $(this).children('td').eq(6).find("input").val(),
                        calorificThreshold: $(this).children('td').eq(7).find("input").val(),
                        ash: $(this).children('td').eq(8).find("input").val(),
                        ashThreshold: $(this).children('td').eq(9).find("input").val(),
                        water: $(this).children('td').eq(10).find("input").val(),
                        waterThreshold: $(this).children('td').eq(11).find("input").val(),
                        cl: $(this).children('td').eq(12).find("input").val(),
                        clThreshold: $(this).children('td').eq(13).find("input").val(),
                        s: $(this).children('td').eq(14).find("input").val(),
                        sThreshold: $(this).children('td').eq(15).find("input").val(),
                        p: $(this).children('td').eq(16).find("input").val(),
                        pThreshold: $(this).children('td').eq(17).find("input").val(),
                        f: $(this).children('td').eq(18).find("input").val(),
                        fThreshold: $(this).children('td').eq(19).find("input").val(),
                        ph: $(this).children('td').eq(20).find("input").val(),
                        phThreshold: $(this).children('td').eq(21).find("input").val(),
                    };
                    $.ajax({
                        type: 'POST',
                        async: false,
                        url: "addCompatibilityItemNew",
                        data: JSON.stringify(dataItem),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {

                            }
                        },
                        error: function (result) {

                        }
                    })


                })
            }
        },
        error: function (result) {
            alert("服务器异常!")
        }
    })


    alert("添加成功！")
    window.location.reload();


}

array = [];//存放所有的tr
array1 = [];//存放目标的tr
//状态高价查询
function searchData() {

    isSearch = false;
    array.length = 0;//清空数组
    array1.length = 0;//清空数组
    //1分页模糊查询
    for (var i = totalPage(); i > 0; i--) {
        switchPage(parseInt(i));
        array.push($('.myclass1'));
    }
    isSearch = true;

    //审核状态
    var checkState = $.trim($('#search-checkState option:selected').text());


    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (($(this).children('td').eq(13).text().indexOf(checkState) == -1
            )) {
                $(this).hide();
            }
            if ($(this).children('td').eq(13).text().indexOf(checkState) != -1) {
                array1.push($(this));
            }
        });
    }

    var total;

    if (array1.length % countValue() == 0) {
        total = array1.length / countValue()
    }

    if (array1.length % countValue() > 0) {
        total = Math.ceil(array1.length / countValue());
    }

    if (array1.length / countValue() < 1) {
        total = 1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for (i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    for (var i = 0; i < array1.length; i++) {
        array1[i].hide();
    }

    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


}

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(submitPw.name);
    initApprovalFName(confirm1.name);
    initBakcFName(back1.name);
    var id=$(item).parent().parent().children("td").eq(2).html();
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

