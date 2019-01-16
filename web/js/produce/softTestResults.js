/**
 * 污水化验脚本
 * */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
array = [];//存放所有的tr
array1 = [];//存放目标的tr
array0=[];
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
            url: "totalSoftTestRecord",                  // url
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
            url: "searchSoftTestCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
           data:JSON.stringify(data),
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
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
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
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setSoftTestList(result);
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
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadSoftTestResultsList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setSoftTestList(result);
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
            url: "searchSoftTest",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setSoftTestList(result);
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
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadSoftTestResultsList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setSoftTestList(result);
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
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchSoftTest",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setSoftTestList(result);
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

/**
 * 加载
 */
function loadPageList() {
    $('.loader').show();
    loadNavigationList(); // 设置动态菜单
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
    // if(array0.length==0){
    //     for (var i = 1; i <= totalPage(); i++) {
    //         switchPage(parseInt(i));
    //
    //         array0.push($('.myclass'));
    //     }
    // }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadSoftTestResultsList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide();
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
 * 设置化验单数据
 */
function setSoftTestList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();

    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class','myclass')
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    //化验单号
                    $(this).html(obj.id);
                    break;
                case (2):
                    // 采样点
                    $(this).html((obj.address));
                    break;
                //浊度FTU
                case (3):
                    $(this).html(setNumber2Line(parseFloat(obj.turbidity).toFixed(2)));
                    break;
                case (4):
                    // ph
                    $(this).html(setNumber2Line(parseFloat(obj.PH).toFixed(2)));
                    break;
                case (5):
                    // 硬度
                    $(this).html(setNumber2Line((obj.hardness)));
                    break;
                case (6):
                    // 电导率
                        $(this).html(setNumber2Line(parseFloat(obj.electricalConductivity).toFixed(2)));
                    break;
                case (7):
                    // 酚酞碱度
                    $(this).html(setNumber2Line(parseFloat(obj.phenolphthalein).toFixed(2)));
                    break;
                case (8):
                    // 全碱度
                        $(this).html(setNumber2Line(parseFloat(obj.basicity).toFixed(2)));
                    break;

                case (9):
                    // 备注
                    $(this).html(obj.remarks);
                    break;
                case (10):
                    // 单据状态
                    if(obj.checkStateItem!=null){
                        $(this).html((obj.checkStateItem.dictionaryItemName))
                    }
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
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
}

/**
 * 软水化验结果导出excel
 * @param e
 */
function exportExcel() {
    var name = '1';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select id,address,replace(turbidity,-9999,''),replace(hardness,'-9999',''),replace(PH,-9999,''),\n" +
            "replace(electricalConductivity,'-9999',''),replace(basicity,'-9999',''),replace(phenolphthalein,'-9999',''),remarks\n" +
            " from t_pr_softest where id" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select id,address,replace(turbidity,-9999,''),replace(hardness,'-9999',''),replace(PH,-9999,''),\n" +
            "replace(electricalConductivity,'-9999',''),replace(basicity,'-9999',''),replace(phenolphthalein,'-9999',''),remarks\n" +
            "from t_pr_softest;";
    }
    window.open('exportExcelSoftWater?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 软水日报导出excel
 * @param e
 */
function exportExcel1() {
    var name = '2';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select id,address,replace(turbidity,-9999,''),replace(hardness,'-9999',''),replace(PH,-9999,''),\n" +
            "replace(electricalConductivity,'-9999',''),replace(basicity,'-9999',''),replace(phenolphthalein,'-9999',''),remarks\n" +
            " from t_pr_softest where id" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select id,address,replace(turbidity,-9999,''),replace(hardness,'-9999',''),replace(PH,-9999,''),\n" +
            "replace(electricalConductivity,'-9999',''),replace(basicity,'-9999',''),replace(phenolphthalein,'-9999',''),remarks\n" +
            "from t_pr_softest;";
    }
    window.open('exportExcelSoftWater?name=' + name + '&sqlWords=' + sqlWords);
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
    var filePath = 'Files/Templates/软水化验结果模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importSoftTestExcel",              // url
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
}


/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
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
});

//查询
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            id:$.trim($('#search-id').val()),
            // turbidity:$('#search-turbidity').val(),
            // PH:$('#search-PH').val(),
            // basicity:$('#search-basicity').val(),
            // address:$('#search-address').val(),
            // hardness:$('#search-hardness').val(),
            // electricalConductivity:$('#search-electricalConductivity').val(),
            // phenolphthalein:$('#search-phenolphthalein').val(),
            remarks:$.trim($('#search-remarks').val()),
            checkStateItem:{dataDictionaryItemId:$("#search-checkState").val()},
            page: page,
            keyword:'',
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
        url: "searchSoftTest",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;


}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}


/**
 * 增加数据
 */
function addData() {
    $('#pass').hide();
    $('#break').hide();
    $('#addModal').find('input').val('');
    $("#addModal").modal("show");
    $('#addTable').siblings().not($("#plusBtn")).remove();
}

/**
 * 预约登记==>新增
 */
function addNewLine(item) {
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    clonedTr.attr('class','myclass3');
    $(clonedTr).children('td').eq(0).find('p').hide()
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

//添加方法
function save() {

    $('.myclass3').each(function () {
        var turbidity=$.trim($(this).children('td').eq(2).find('input').val());
        if(turbidity.length==0){
            turbidity=-9999;
        }
        var hardness=$.trim($(this).children('td').eq(3).find('input').val());
        if(hardness.length==0){
            hardness=-9999;
        }

        var ph=$.trim($(this).children('td').eq(4).find('input').val());
        if(ph.length==0){
            ph=-9999;
        }
        var electricalConductivity=$.trim($(this).children('td').eq(5).find('input').val());
        if(electricalConductivity.length==0){
            electricalConductivity=-9999;
        }

        var basicity=$.trim($(this).children('td').eq(6).find('input').val());
        if(basicity.length==0){
            basicity=-9999;
        }
        var phenolphthalein=$.trim($(this).children('td').eq(7).find('input').val());
        if(phenolphthalein.length==0){
            phenolphthalein=-9999;
        }


        var data={
            id:$(this).children('td').eq(0).find('input').val(),
            address:$(this).children('td').eq(1).find('input').val(),
            turbidity:turbidity,
            hardness:hardness,
            ph:ph,
            electricalConductivity:electricalConductivity,
            basicity:basicity,
            phenolphthalein:phenolphthalein,
            remarks:$(this).children('td').eq(8).find('input').val(),
        };
        console.log(data)
        if(data.id!=''){
            $.ajax({
                type: "POST",                       // 方法类型
                url: "addSoftTest",              // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data:JSON.stringify(data),
                contentType: 'application/json;charset=utf-8',
                success:function (result) {
                    if (result != undefined && result.status == "success"){

                    }
                },
                error:function (result) {

                }
            })
        }


    })

    alert("添加成功")
    window.location.reload();
}



//提交
function setSubmit(item) {

    var id = $(item).parent().parent().children('td').eq(1).html();

    console.log(id)

    if (confirm("确认提交?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "submitSoftTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    window.location.reload();
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }

}

//签收
function setConfirm(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    if (confirm("确认签收?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "confirmSoftTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    window.location.reload();
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }
}

//作废
function setCancel(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    if (confirm("确认作废?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelSoftTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    window.location.reload();
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }

}


//修改
function setAdjust(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    //根据编号获取信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSoftTestById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'id': id},
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //赋值
                var obj = eval(result.data);
                console.log(obj)
                $('#id').val(obj.id);
                $('#address').val(obj.address);
                if(obj.turbidity!=-9999){
                    $('#turbidity').val(obj.turbidity.toFixed(2));
                }
                else {
                    $('#turbidity').attr('readonly','readonly')
                }

                if(obj.hardness!=-9999){
                    $('#hardness').val(obj.hardness);
                }
                else {
                    $('#hardness').attr('readonly','readonly')
                }
                if(obj.PH!=-9999){
                    $('#PH').val(obj.PH.toFixed(2));
                }
                else {
                    $('#PH').attr('readonly','readonly')
                }
                if(obj.electricalConductivity!=-9999){
                    $('#electricalConductivity').val(obj.electricalConductivity.toFixed(2));
                }
                else {
                    $('#electricalConductivity').attr('readonly','readonly')
                }
                if(obj.basicity!=-9999){
                    $('#basicity').val(obj.basicity.toFixed(2));
                }
                else {
                    $('#basicity').attr('readonly','readonly')
                }
                if(obj.phenolphthalein!=-9999){
                    $('#phenolphthalein').val(obj.phenolphthalein.toFixed(2));
                }
                else {
                    $('#phenolphthalein').attr('readonly','readonly')
                }
                $('#remarks').val(obj.remarks);

            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })

    $('#addModal2').modal('show');
}

//软水化验单修改
function adjustSoftTest() {

    var turbidity=$.trim($('#turbidity').val());
    if(turbidity.length==0){
        turbidity=-9999;
    }
    var hardness=$.trim($('#hardness').val());
    if(hardness.length==0){
        hardness=-9999;
    }
    var ph=$.trim($('#PH').val());
    if(ph.length==0){
        ph=-9999;
    }
    var electricalConductivity=$.trim($('#electricalConductivity').val());
    if(electricalConductivity.length==0){
        electricalConductivity=-9999;
    }
    var basicity=$.trim($('#basicity').val());
    if(basicity.length==0){
        basicity=-9999;
    }
    var phenolphthalein=$.trim($('#phenolphthalein').val());
    if(phenolphthalein.length==0){
        phenolphthalein=-9999;
    }
    var data={
        id: $('#id').val(),
        address:  $('#address').val(),
        turbidity: turbidity,
        hardness:hardness,
         ph:ph,
        electricalConductivity:electricalConductivity,
        basicity:basicity,
        phenolphthalein:phenolphthalein,
        remarks:$('#remarks').val()
    };


    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateSoftTestById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //赋值
                alert(result.message)
                window.location.reload();

            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })
}


//软水化验校验
function testing(item) {
    $(item).parent().children('p').eq(0).hide()
    $(item).parent().children('p').eq(1).hide()

    var id=$.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingSoftTestId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'id':id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                if(result.data==true){
                    $(item).parent().children('p').eq(1).show()
                    $(item).parent().children('p').eq(0).hide()
                }
                if(result.data==false){
                    $(item).parent().children('p').eq(0).show()
                    $(item).parent().children('p').eq(1).hide()
                }
                if($.trim(id).length<=0){
                    $('#pass').hide();
                    $('#break').hide();
                }
            }
        },
        error:function (result) {

        }
    })
}