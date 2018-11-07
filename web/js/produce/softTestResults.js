/**
 * 污水化验脚本
 * */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

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
    } if (isSearch) {//查询用的
        for (var i = 0; i < array1.length; i++) {
            $(array1[i]).hide();
        }
        var i = parseInt((pageNumber - 1) * countValue());
        var j = parseInt((pageNumber - 1) * countValue()) + parseInt(countValue() - 1);
        for (var i = i; i <= j; i++) {
            $('#tbody1').append(array1[i]);
            $(array1[i]).show();
        }
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
        } if (isSearch) {//查询用的
            for (var i = 0; i < array1.length; i++) {
                $(array1[i]).hide();
            }
            var i = parseInt((pageNumber - 1) * countValue());
            var j = parseInt((pageNumber - 1) * countValue()) + parseInt(countValue() - 1);
            for (var i = i; i <= j; i++) {
                $('#tbody1').append(array1[i]);
                $(array1[i]).show();
            }
        }
    }
}

/**
 * 加载
 */
function loadPageList() {
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
        url: "loadSoftTestResultsList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
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
                    $(this).html((obj.turbidity).toFixed(2));
                    break;
                case (4):
                    // 硬度
                    $(this).html(obj.hardness.toFixed(2));
                    break;
                case (5):
                    // ph
                    $(this).html(obj.PH.toFixed(2));
                    break;
                case (6):
                    // 电导率
                    $(this).html(obj.electricalConductivity.toFixed(2));
                    break;
                case (7):
                    // 全碱度
                    $(this).html(obj.basicity.toFixed(2));
                    break;
                case (8):
                    // 酚酞碱度
                    $(this).html(obj.phenolphthalein.toFixed(2));
                    break;
                case (9):
                    // 备注
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
 * 导出excel
 * @param e
 */
function exportExcel() {
    var name = 't_pr_sewage';
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
        sqlWords = "select id as '编号', name as '污水名称',receiveDate as '污水接收日期',COD,BOD5,oxygen as '氧',nitrogen as '氮',lye as '碱液',PH,remarks as '备注' from t_pr_sewage where id" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select id as '编号', name as '污水名称',receiveDate as '污水接收日期',COD,BOD5,oxygen as '氧',nitrogen as '氮',lye as '碱液',PH,remarks as '备注' from t_pr_sewage;";
    }
    console.log("sql:"+sqlWords);
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

array = [];//存放所有的tr
array1 = [];//存放目标的tr

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
    isSearch = false;
    array.length = 0;//清空数组
    array1.length = 0;//清空数组
    //1分页模糊查询

    for (var i = totalPage(); i > 0; i--) {
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }

    isSearch = true;

    var text = $.trim($('#searchContent').val());

    var  id= $.trim($('#search-id').val());

    var address= $.trim($('#search-address').val());

    var remarks= $.trim($('#search-remarks').val());

    var turbidity= $.trim($('#search-turbidity').val());

    var hardness= $.trim($('#search-hardness').val());

    var PH= $.trim($('#search-PH').val());

    var electricalConductivity= $.trim($('#search-electricalConductivity').val());

    var basicity= $.trim($('#search-basicity').val());

    var phenolphthalein= $.trim($('#search-phenolphthalein').val());


    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (!($(this).children('td').eq(1).text().indexOf(id) != -1 && $(this).children('td').eq(2).text().indexOf(address) != -1
                && $(this).children('td').eq(3).text().indexOf(turbidity) != -1 && $(this).children('td').eq(4).text().indexOf(hardness) != -1 && $(this).children('td').text().indexOf(text) != -1
                && $(this).children('td').eq(5).text().indexOf(PH) != -1  && $(this).children('td').eq(6).text().indexOf(electricalConductivity) != -1
                && $(this).children('td').eq(7).text().indexOf(basicity) != -1&& $(this).children('td').eq(8).text().indexOf(phenolphthalein) != -1
                && $(this).children('td').eq(9).text().indexOf(remarks) != -1

            )) {
                $(this).hide();
            }
            if (
                ($(this).children('td').eq(1).text().indexOf(id) != -1 && $(this).children('td').eq(2).text().indexOf(address) != -1
                    && $(this).children('td').eq(3).text().indexOf(turbidity) != -1 && $(this).children('td').eq(4).text().indexOf(hardness) != -1 && $(this).children('td').text().indexOf(text) != -1
                    && $(this).children('td').eq(5).text().indexOf(PH) != -1  && $(this).children('td').eq(6).text().indexOf(electricalConductivity) != -1
                    && $(this).children('td').eq(7).text().indexOf(basicity) != -1&& $(this).children('td').eq(8).text().indexOf(phenolphthalein) != -1
                    && $(this).children('td').eq(9).text().indexOf(remarks) != -1

                )

            ) {
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
    clonedTr.attr('class','myclass2');
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

    $('.myclass2').each(function () {
        var data={
            id:$(this).children('td').eq(0).find('input').val(),
            address:$(this).children('td').eq(1).find('input').val(),
            turbidity:$(this).children('td').eq(2).find('input').val(),
            hardness:$(this).children('td').eq(3).find('input').val(),
            ph:$(this).children('td').eq(4).find('input').val(),
            electricalConductivity:$(this).children('td').eq(5).find('input').val(),
            basicity:$(this).children('td').eq(6).find('input').val(),
            phenolphthalein:$(this).children('td').eq(7).find('input').val(),
            remarks:$(this).children('td').eq(8).find('input').val(),
        };
        console.log(data)
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

    })

    alert("添加成功")
    window.location.reload();
}