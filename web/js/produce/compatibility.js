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
function downloadModal() {
    var filePath = 'Files/Templates/配伍周导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 
 * 导出
 * @returns {string}
 */
  function exportExcel() {
    console.log("export");
    var name = 't_pr_pw';
    var sqlWords = "select * from t_pr_pw;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var days = new Date();
    days.setFullYear(year);
    days.setMonth(month);
    days.setDate(1);
    if(obj.getDay() <= days.getDay()){
        var week = parseInt(day / 7) + a + 1;
    }else {
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
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalCompatibilityRecord",                  // url
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
    }
        else {
    console.log(data1)
        if(data1.keywords==undefined){//高级查询
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchCompatibilityItemTotal",                  // url
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
        if(data1.keywords!=undefined){
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
         if(data1.keywords==undefined){ //高级查询
             console.log("进来了")
             $.ajax({
                 type: "POST",                            // 方法类型
                 url: "searchCompatibilityItem",                 // url
                 async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                 data: JSON.stringify(data1),
                 dataType: "json",
                 contentType: "application/json; charset=utf-8",
                 success: function (result) {
                     if (result != undefined && result.status == "success"){
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
            if(data1.keywords!=undefined){
                $.ajax({
                    type: "POST",                            // 方法类型
                    url: "searchCompatibility",                 // url
                    async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                    data: JSON.stringify(data1),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        if (result != undefined && result.status == "success"){
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
                if(data1.keywords==undefined){ //高级查询
                    console.log("进来了")
                    $.ajax({
                        type: "POST",                            // 方法类型
                        url: "searchCompatibilityItem",                 // url
                        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                        data: JSON.stringify(data1),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success"){
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
                if(data1.keywords!=undefined){
                    $.ajax({
                        type: "POST",                            // 方法类型
                        url: "searchCompatibility",                 // url
                        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                        data: JSON.stringify(data1),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success"){
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
            type: "POST",
            url: "getList1",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data:JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    console.log(result)
                    setPageClone(result);
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

    /*加载表格数据
    *
    */
    function setCompatibility(result) {

        var tr = $('#cloneTr1');

        tr.siblings().remove();

        $.each(result.compatibilityList, function (index, item) {
            var data = eval(item);
            // console.log(obj)


            var clonedTr = tr.clone();

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
                        $(this).html(data.weeklyDemandTotalAggregate);
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
                        if (data.checkState != null) {
                            $(this).html(data.checkState.name);
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
    function backModal() {
        $("#contractInfoForm3").modal('show');
    }

//把按钮功能分出来做这个是审批
    function confirm1() {
        opinion = $('#advice').val();
        //console.log(opinion);
        //1获取文本框的值
        $.ajax({
            type: "POST",
            url: "approvalPw",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'pwId': pwId, 'opinion': opinion,},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    console.log(result);
                    window.location.reload();
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
    function back1() {
        backContent = $('#backContent').val();
        //设置状态驳回
        $.ajax({
            type: "POST",
            url: "backPw",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'pwId': pwId, 'backContent': backContent},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message);
                    console.log(result);
                    window.location.reload();
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


    }

    /**
     * 提交方法
     */
    function submit(item) {
        var compatibilityId = $(item).parent().parent().children('td').eq(2).text();
        if (confirm("确认提交?")) {
            $.ajax({
                type: "POST",
                url: "submitPw",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {'compatibilityId': compatibilityId},
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

    }

    /**
     * 审批方法
     */
    function approval(item) {
        var compatibilityId = $(item).parent().parent().children('td').eq(2).text();
        if (confirm("确认审批?")) {
            $.ajax({
                type: "POST",
                url: "approvalCompatibility",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {'compatibilityId': compatibilityId},
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

    }


    /**
     * 设置高级检索的下拉框数据
     */
    function setPwList() {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSelectList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    //处理类别
                    var handleCategory = $('#search-handleCategory');
                    handleCategory.children().remove();
                    $.each(data.handleCategoryList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        handleCategory.append(option);
                    });
                    handleCategory.get(0).selectedIndex = -1;
                    //形态
                    var formType = $('#search-formType');
                    formType.children().remove();
                    $.each(data.formTypeList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
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
        if(items.length>0){
            if(confirm("是否生成物料需求?")){
                $.each(items,function (index) {

                    if  ($(this).parent().parent().next().next().html().length > 0&&$(this).parent().parent().parent().children('td').eq(13).html()!='已失效') {
                        var compatibilityId = $(this).parent().parent().next().next().html();//配伍单号
                        $.ajax({
                            type: "POST",
                            url: "generateSheet",                  // url
                            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                            data: {"compatibilityId": compatibilityId},
                            dataType: "json",
                           // contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success"){

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
                if(confirm("是否跳转到物料需求页面?")){
                    window.location.href="materialDemand.html"
                }



        }

    }
        else
        {
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

        var proportionTotal=0;

        var dailyRatioTotal=0;

        var weeklyDemandTotalAdd=0;

        var calorificTotal=0;

        var ashTotal=0;

        var waterTotal=0;

        var clTotal=0;

        var sTotal=0;

        var pTotal=0;

        var fTotal=0;

        var phTotal=0;


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
                        if (obj.handleCategory != null) {
                            $(this).html(obj.handleCategory.name);
                        }
                        break;

                    //物质形态
                    case (2):
                        if (obj.formType != null) {
                            $(this).html(obj.formType.name);
                        }
                        break;
                    //比例
                    case (3):
                        $(this).html(obj.proportion.toFixed(2));
                        proportionTotal+=parseFloat(obj.proportion);
                        break;
                    //每日配置量
                    case (4):
                        $(this).html(obj.dailyRatio);
                        dailyRatioTotal+=parseFloat(obj.dailyRatio);
                        break;
                    //周需求总理
                    case (5):
                        $(this).html(obj.weeklyDemandTotal);
                        weeklyDemandTotalAdd+=parseFloat(obj.weeklyDemandTotal);
                        break;
                    //热值
                    case (6):
                        $(this).html(obj.calorific);
                        calorificTotal+=parseFloat(obj.calorific);
                        break;
                    //灰分
                    case (7):
                        $(this).html(obj.ash);
                        ashTotal+=parseFloat(obj.ash);
                        break;
                    //水分
                    case (8):
                        $(this).html(obj.water);
                        waterTotal+=parseFloat(obj.water)
                        break;
                    //CL
                    case (9):
                        $(this).html(obj.cl);
                        clTotal+=parseFloat(obj.cl)
                        break;
                    //S
                    case (10):
                        $(this).html(obj.s);
                        sTotal+=parseFloat(obj.s);
                        break;
                    //P
                    case (11):
                        $(this).html(obj.p);
                        pTotal+=parseFloat(obj.p);
                        break;
                    //F
                    case (12):
                        $(this).html(obj.f);
                        fTotal+=parseFloat(obj.f);
                        break;
                    //PH
                    case (13):
                        $(this).html(obj.ph);
                        phTotal+=parseFloat(obj.ph);
                        break;
                }
                clonedTr.removeAttr('id');
                clonedTr.insertBefore(tr);

            })

            tr.hide();


        })


        $('#proportionTotal').html(proportionTotal);

        $('#dailyRatioTotal').html(dailyRatioTotal);

        $('#weeklyDemandTotalAdd').html(weeklyDemandTotalAdd);

        $('#calorificTotal').html(calorificTotal);

        $('#ashTotal').html(ashTotal);

        $('#waterTotal').html(waterTotal);

        $('#clTotal').html(clTotal);

        $('#sTotal').html(sTotal);

        $('#pTotal').html(pTotal);

        $('#fTotal').html(fTotal);

        $('#phTotal').html(phTotal);

    }

//修改模态框

    function adjust(item) {

        var compatibilityId = $(item).parent().parent().children('td').eq(2).text();

        localStorage.compatibilityId = compatibilityId;
        window.location.href = "adjustCompatibility.html";


    }

//修改页面初始化
    function adjustCom() {

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
                    $('#cloneTr2').siblings().remove();
                    $.each(result.array, function (index, item) {


                        var obj = eval(item);

                        // console.log(obj)

                        var cloneTr = tr.clone();

                        cloneTr.attr('class', 'myclass2');
                        cloneTr.show();

                        cloneTr.children('td').eq(0).html(index + 1);


                        cloneTr.children('td').eq(3).children('input').val((obj.dailyRatio / obj.weeklyDemandTotal).toFixed(2) * 100);

                        cloneTr.children('td').eq(4).children('input').val(obj.dailyRatio.toFixed(2));

                        cloneTr.children('td').eq(5).children('input').val(obj.weeklyDemandTotal.toFixed(2));

                        cloneTr.children('td').eq(6).children('input').val(obj.calorific);

                        cloneTr.children('td').eq(7).children('input').val(obj.ash);

                        cloneTr.children('td').eq(8).children('input').val(obj.water);

                        cloneTr.children('td').eq(9).children('input').val(obj.cl);

                        cloneTr.children('td').eq(10).children('input').val(obj.s);

                        cloneTr.children('td').eq(11).children('input').val(obj.p);

                        cloneTr.children('td').eq(12).children('input').val(obj.f);

                        cloneTr.children('td').eq(13).children('input').val(obj.ph);

                        cloneTr.children('td').eq(14).html(obj.id);


                        if (obj.handleCategory != null) {
                            //进料方式
                            $.ajax({
                                type: 'POST',
                                url: "getHandleCategory",
                                //data:JSON.stringify(data),
                                dataType: "json",
                                contentType: "application/json;charset=utf-8",
                                success: function (result) {
                                    if (result != undefined) {
                                        // console.log(result);
                                        var handelCategory = cloneTr.children('td').eq(1).children('select');
                                        handelCategory.children().remove();
                                        $.each(result.handleCategoryList, function (index, item) {
                                            var option = $('<option/>');
                                            option.val(item.index);
                                            option.text(item.name);
                                            handelCategory.append(option);
                                        });
                                        handelCategory.get(0).selectedIndex = item.handleCategory.index - 1;
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
                        if (item.formType != null) {
                            //形态
                            $.ajax({
                                type: 'POST',
                                url: "getFormTypeAndPackageType",
                                //data:JSON.stringify(data),
                                dataType: "json",
                                contentType: "application/json;charset=utf-8",
                                success: function (result) {
                                    if (result != undefined) {
                                        // console.log(result);
                                        var formType = cloneTr.children('td').eq(2).children('select');
                                        formType.children().remove();
                                        $.each(result.formTypeList, function (index, item) {
                                            var option = $('<option/>');
                                            option.val(item.index);
                                            option.text(item.name);
                                            formType.append(option);
                                        });
                                        formType.get(0).selectedIndex = obj.formType.index - 1;
                                    }
                                    else {
                                        alert(result.message);
                                    }
                                },
                                error: function (result) {
                                    console.log(result);
                                }

                            });
                            //cloneTr.children('td').eq(2).children('select').selectedIndex=3;
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

    }

//确认修改
    function adjustConfirm() {

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
            var data = {
                handleCategory: $(this).children('td').eq(1).children('select').get(0).selectedIndex,
                formType: $(this).children('td').eq(2).children('select').get(0).selectedIndex,
                id: $(this).children('td').eq(14).html(),
                proportion: $(this).children('td').eq(3).children('input').val(),
                dailyRatio: $(this).children('td').eq(4).children('input').val(),
                weeklyDemandTotal: $(this).children('td').eq(5).children('input').val(),
                calorific: $(this).children('td').eq(6).children('input').val(),
                ash: $(this).children('td').eq(7).children('input').val(),
                water: $(this).children('td').eq(8).children('input').val(),
                cl: $(this).children('td').eq(9).children('input').val(),
                s: $(this).children('td').eq(10).children('input').val(),
                p: $(this).children('td').eq(11).children('input').val(),
                f: $(this).children('td').eq(12).children('input').val(),
                ph: $(this).children('td').eq(13).children('input').val(),
            };
            calorificSum += parseFloat($(this).children('td').eq(6).children('input').val());
            ashSum += parseFloat($(this).children('td').eq(7).children('input').val());
            waterSum += parseFloat($(this).children('td').eq(8).children('input').val());
            clSum += parseFloat($(this).children('td').eq(9).children('input').val());
            sSum += parseFloat($(this).children('td').eq(10).children('input').val());
            pSum += parseFloat($(this).children('td').eq(11).children('input').val());
            fSum += parseFloat($(this).children('td').eq(12).children('input').val());
            phSum += parseFloat($(this).children('td').eq(13).children('input').val());
            weeklyDemandTotalAggregate += parseFloat($(this).children('td').eq(5).children('input').val());
            totalDailyAmount += parseFloat($(this).children('td').eq(3).children('input').val());
            //更新字表数据
            $.ajax({
                type: "POST",
                url: "updateCompatibilityItem",                  // url
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
            weeklyDemandTotalAggregate: weeklyDemandTotalAggregate,
            totalDailyAmount: totalDailyAmount,
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
                    alert("修改成功!");
                    window.location.href = "weekPlan.html";
                }
                else {
                    console.log(result)
                }
            },
            error: function (result) {
                console.log("服务器异常！")
            }


        });


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

        var proportion = ((dailyRatio / weeklyDemandTotal).toFixed(2)) * 100;

        $(item).parent().prev().prev().children('input').val(proportion);

    }


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchCompatibility();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchCompatibility();      //
            }
        },400);
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
        if(keywords=='已失效'){
            keywords='Disabled'
        }
        if(keywords=='待提交'){
            keywords='ToSubmit'
        }
        if(keywords=='审批通过'){
            keywords='Approval'
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
    var formType=null;
    var handleCategory=null;
    if ($("#senior").is(':visible')) {
        if($("#search-formType").val()==0)
            formType="Gas";
        if($("#search-formType").val()==1)
            formType="Liquid";
        if($("#search-formType").val()==2)
            formType="Solid";
        if($("#search-formType").val()==3)
            formType="HalfSolid";

        if($("#search-handleCategory").val()==0)
            handleCategory="Sludge"

        if($("#search-handleCategory").val()==1)
            handleCategory="WasteLiquid"

        if($("#search-handleCategory").val()==2)
            handleCategory="Bulk"

        if($("#search-handleCategory").val()==3)
            handleCategory="Crushing"

        if($("#search-handleCategory").val()==4)
            handleCategory="Distillation"

        if($("#search-handleCategory").val()==5)
            handleCategory="Suspension"

        data1 = {
             compatibilityId: $.trim($("#search-pwId").val()),
             formType: formType,
             handleCategory:handleCategory,
             weeklyDemandTotal:$.trim( $('#search-weeklyDemandTotalAggregate').val()),
             calorificBeg:$.trim( $('#search-calorificBeg').val()),
             calorificEnd:$.trim( $('#search-calorificEnd').val()),
             fBeg:$.trim( $('#search-fBeg').val()),
             fEnd:$.trim( $('#search-fEnd').val()),
            clBeg:$.trim( $('#search-clBeg').val()),
            clEnd:$.trim( $('#search-clEnd').val()),
            sBeg:$.trim( $('#search-sBeg').val()),
            sEnd:$.trim( $('#search-sEnd').val()),
             page: page
        };
    }

    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchCompatibilityItem",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success"){
                  // setCompatibility(result)
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