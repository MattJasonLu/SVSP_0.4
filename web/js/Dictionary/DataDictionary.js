/**
 * 数据字典脚本文件
 */

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
            url: "totalDataDictionaryCount",                  // url
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
            url: "searchDictionaryCount",                  // url
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

/*加载页面数据*/
function load() {
    loadNavigationList();  // 动态菜单设置
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
    console.log(page)
    $.ajax({
        type: "POST",
        url: "getDictionariesDataList",
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
      
    $.ajax({
        type: "POST",
        url: "getFormTypeByDataDictionary",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8', 
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
            }
        },
        error:function (result) {
            
        }
    })

    isSearch = false;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setDataDictionary(result);
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
 * 设置数据
 */
function setDataDictionary(result) {
    var tr = $('#clonedTr1');

    tr.siblings().remove();

    $.each(result.data,function (index,item) {
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

                //字典类型编码
                case (2):
                    $(this).html(data.dictionaryType);
                    break;

                // 字典类型名称
                case (3):
                    $(this).html(data.dictionaryName);
                    break;

                //创建时间
                case (4):
                    $(this).html(getDateStr(data.dateTime));
                    break;
                //主键
                case (5):
                    $(this).html(data.dataDictionaryId);
                    break;
            }
            clonedTr.removeAttr("id");
            if (clonedTr.children('td').eq(13).html() == '已作废') {
                $(clonedTr).hide();
            }
            clonedTr.insertBefore(tr);
        });
        tr.hide();
    })

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
            url: "getDictionariesDataList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setDataDictionary(result);
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchDictionaryCount",                  // url
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
                url: "getDictionariesDataList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setDataDictionary(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchDictionaryCount",                  // url
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
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}


//新增
function addNewData() {
    // //首先是主键获取
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getIdCount",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     contentType: "application/json; charset=utf-8",
    //     success:function (result) {
    //         if(result != undefined && result.status == "success"){
    //             console.log(result);
    //         }
    //         else {
    //             console.log(result.message);
    //         }
    //     },
    //     error:function (result) {
    //         alert("服务器异常！")
    //     }
    //
    // })
    $('#addModal').find('input').val('');
    $('#addModal').modal('show')

}

/**
 * =>新增
 */
function addNewLine(item) {

    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide()
    clonedTr.attr('class', 'myclass2');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";


    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn)


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}

//修改
function addNewLine1(item) {

    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide()
    clonedTr.attr('class', 'myclass3');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";


    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn)


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}

/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    tr.parentNode.removeChild(tr);

}

//保存
function save() {
    var data = {
        dictionaryType: $('#dictionaryType').val(),
        dictionaryName: $('#dictionaryName').val(),

    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if(result != undefined && result.status == "success"){
                     $('.myclass2').each(function () {
                         var  dataItem={
                             dictionaryItemType:$(this).children('td').eq(0).find('input').val(),
                             dictionaryItemName:$(this).children('td').eq(1).find('input').val(),
                         };
                         $.ajax({
                             type: "POST",                       // 方法类型
                             url: "addDataDictionaryItem",                  // url
                             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                             dataType: "json",
                             data: JSON.stringify(dataItem),
                             contentType: "application/json; charset=utf-8",
                             success:function (result) {
                                 if(result != undefined && result.status == "success"){

                                 }
                             },
                             error:function (result) {

                             }
                         })
                     })
                alert("添加成功")
                window.location.reload()
            }
        },
        error:function (result) {

        }
    })

}

//查看
function toView(item) {

    var dataDictionaryId=$(item).parent().prev().html();
    console.log(dataDictionaryId)

    $('#addModa2').modal('show')
    //根据编号查看
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getDataDictionaryById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{"dataDictionaryId":dataDictionaryId},
       // contentType: "application/json; charset=utf-8",
         success:function (result) {
             if (result != undefined && result.status == "success"){
                 console.log(result)
                 $('#dictionaryType1').val(result.data.dictionaryType)
                 $('#dictionaryName1').val(result.data.dictionaryName)
                 var tr=$('#cloneTr');
                 tr.siblings().remove();
               $.each(result.data.dataDictionaryItemList,function (index,item) {
                   var data=eval(item);


                 var clonedTr=  tr.clone();

                   clonedTr.show();
                   clonedTr.children('td').eq(0).html(data.dictionaryItemType)
                   clonedTr.children('td').eq(1).html(data.dictionaryItemName)
                   clonedTr.insertBefore(tr);



               })
                 tr.hide();
             }
         },
        error:function (result) {
            
        }
    })

}


//编辑模态框
function edit(item) {

       $('#cloneTr2').siblings().not($('#plus')).remove();
    var dataDictionaryId=$(item).parent().prev().html();


    $('#addModa3').modal('show');
    //根据编号查看
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getDataDictionaryById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{"dataDictionaryId":dataDictionaryId},
        // contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                $('#dictionaryType2').val(result.data.dictionaryType)
                $('#dictionaryName2').val(result.data.dictionaryName)
                $('#dataDictionaryId2').val(result.data.dataDictionaryId)
                var tr=$('#cloneTr2');
                $.each(result.data.dataDictionaryItemList,function (index,item) {
                    var data=eval(item);

                    var clonedTr=  tr.clone();

                    clonedTr.show();


                    clonedTr.children('td').eq(0).find('input').val(data.dictionaryItemType)

                    if(index>=1){
                        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";
                        clonedTr.children('td').eq(0).append(delBtn)
                    }
                    clonedTr.children('td').eq(1).find('input').val(data.dictionaryItemName)
                    clonedTr.children('td').eq(2).html(data.dataDictionaryItemId)
                    clonedTr.insertBefore(tr);



                })
                tr.hide();
                tr.removeAttr('class')
            }
        },
        error:function (result) {

        }
    })

}


//确认修改
function adjust() {
    var data={
        dataDictionaryId:$('#dataDictionaryId2').val(),
        dictionaryType:$('#dictionaryType2').val(),
        dictionaryName:$('#dictionaryName2').val(),
    }
    //更新主表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                $('.myclass3').each(function () {
                    var dataItem={
                        dataDictionaryItemId:$(this).children('td').eq(2).html(),
                        dataDictionaryId:$('#dataDictionaryId2').val(),
                        dictionaryItemType:$(this).children('td').eq(0).find('input').val(),
                        dictionaryItemName:$(this).children('td').eq(1).find('input').val(),
                    };
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "updateDataDictionaryItem",                  // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data:JSON.stringify(dataItem),
                        contentType: "application/json; charset=utf-8",
                    })
                    console.log(dataItem)

                })
                alert("修改成功！")
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $('#addModa3').modal('hide');
            }
        },
        error:function (result) {

        }
    })
    console.log(data)



}


/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    // 主页
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },600);
    });
    // 新增页面
    $('#searchContent1').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp=== 0){
                search1();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                search1();      //
            }
        },600);
    });
});

/**
 * 查询功能
 */
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var keywords = $.trim($("#searchContent").val());

    if ($("#senior").is(':visible')) {
        data1 = {
            dictionaryType:$('#search-id').val(),
            dictionaryName:$('#search-name').val(),
            page: page
        };
    } else {
        data1 = {
            keywords: keywords,
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchDictionary",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}


//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

//导入数据
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importDictionaryExcel",              // url
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

//下载模板
$(function () {
    $('#download').click(function () {
        console.log("form提交")
        var filePath = 'Files/Templates/数据字典模板.xlsx';
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