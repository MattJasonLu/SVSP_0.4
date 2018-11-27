/**
 * 污水化验单脚本
 *
 */

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
            url: "totalSewageTestRecord",                  // url
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
        totalRecord = array1.length;
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
    setSewageTestList(result);
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
            url: "loadSewageTestResultsList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setSewageTestList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (isSearch) {//查询用的
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
    if (pageNumber > totalPage()) {
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
                url: "loadSewageTestResultsList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setSewageTestList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if (isSearch) {//查询用的
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
        url: "loadSewageTestResultsList",          // url
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
function setSewageTestList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();

    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass')
        clonedTr.show();
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
                //PH
                case (3):

                    $(this).html(setNumber2Line(parseFloat(obj.ph).toFixed(0)));
                    break;
                case (4):
               console.log(obj.COD)
                    $(this).html(setNumber2Line(parseFloat(obj.COD).toFixed(2)));
                    break;
                case (5):
                    // BOD5
                        $(this).html(setNumber2Line(parseFloat(obj.BOD5).toFixed(2)));
                    break;
                case (6):
                    // 氨氮
                        $(this).html(setNumber2Line(parseFloat(obj.n2).toFixed(2)));
                    break;
                case (7):
                    // 碳酸盐碱度(Cao)
                    if(parseFloat(obj.alkalinity)==0){
                        $(this).html('--');
                    }

                    break;
                case (8):

                    if(parseFloat(obj.alkalinityCaCo3)==0){
                        $(this).html('--');
                    }
                    else {
                        $(this).html(parseFloat(obj.alkalinityCaCo3).toFixed(2))
                    }
                    break;
                case (9):

                    // 碳酸盐碱度(HCO3-))
                    if(parseFloat(obj.alkalinityHCO3)==0){
                        $(this).html('--');
                    }
                    else {
                        $(this).html(parseFloat(obj.alkalinityHCO3).toFixed(2))
                    }
                    break;
                case (10):

                    // 重碳酸盐碱度(Cao)
                    if(parseFloat(obj.bicarbonate)==0){
                        $(this).html('--');
                    }
                    else {
                        $(this).html(parseFloat(obj.bicarbonate).toFixed(2))
                    }
                    break;
                case (11):
                    // 重碳酸盐碱度(CaCo3)
                    if(parseFloat(obj.bicarbonateCaCo3)==0){
                        $(this).html('--');
                    }
                    else {
                        $(this).html(parseFloat(obj.bicarbonateCaCo3).toFixed(2))
                    }
                    break;
                case (12):
                    // 重碳酸盐碱度(HCO3-)
                    if(parseFloat(obj.bicarbonateHCO3)==0){
                        $(this).html('--');
                    }
                    else {
                        $(this).html(parseFloat(obj.bicarbonateHCO3).toFixed(2))
                    }
                    break;

                case (13):

                    // 总氮
                        $(this).html(setNumber2Line(parseFloat(obj.nitrogen).toFixed(2)));
                    break;
                case (14):

                    // 总磷
                        $(this).html(setNumber2Line(parseFloat(obj.phosphorus).toFixed(2)));
                    break;
                case (15):
                    // 备注
                    $(this).html(obj.remarks);
                    break;
                case (16):
                    // 状态
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
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
 * 化验结果导出excel
 * @param e
 */
function exportExcel() {
    var name = '1';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select id,address,replace(ph,-9999,''),replace(COD,-9999,''),replace(BOD5,-9999,''),replace(N2,-9999,''),\n" +
            "replace(alkalinity,-9999,''),replace(alkalinityCaCo3,-9999,''),replace(alkalinityHCO3,-9999,''),replace(bicarbonate,-9999,''),\n" +
            "replace(bicarbonateCaCo3,-9999,''),replace(bicarbonateHCO3,-9999,''),replace(nitrogen,-9999,''),replace(phosphorus,-9999,''),remarks \n" +
            "from t_pr_sewagetest where id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select id,address,replace(ph,-9999,''),replace(COD,-9999,''),replace(BOD5,-9999,''),replace(N2,-9999,''),\n" +
            "replace(alkalinity,-9999,''),replace(alkalinityCaCo3,-9999,''),replace(alkalinityHCO3,-9999,''),replace(bicarbonate,-9999,''),\n" +
            "replace(bicarbonateCaCo3,-9999,''),replace(bicarbonateHCO3,-9999,''),replace(nitrogen,-9999,''),replace(phosphorus,-9999,''),remarks \n" +
            "from t_pr_sewagetest;";
    }
    window.open('exportExcelSewage?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 污水日报导出excel
 * @param e
 */
function exportExcel1() {
    var name = '2';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select id,address,replace(ph,-9999,''),replace(COD,-9999,''),replace(BOD5,-9999,''),replace(N2,-9999,''),\n" +
            "replace(alkalinity,-9999,''),replace(alkalinityCaCo3,-9999,''),replace(alkalinityHCO3,-9999,''),replace(bicarbonate,-9999,''),\n" +
            "replace(bicarbonateCaCo3,-9999,''),replace(bicarbonateHCO3,-9999,''),replace(nitrogen,-9999,''),replace(phosphorus,-9999,''),remarks \n" +
            "from t_pr_sewagetest where id" + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select id,address,replace(ph,-9999,''),replace(COD,-9999,''),replace(BOD5,-9999,''),replace(N2,-9999,''),\n" +
            "replace(alkalinity,-9999,''),replace(alkalinityCaCo3,-9999,''),replace(alkalinityHCO3,-9999,''),replace(bicarbonate,-9999,''),\n" +
            "replace(bicarbonateCaCo3,-9999,''),replace(bicarbonateHCO3,-9999,''),replace(nitrogen,-9999,''),replace(phosphorus,-9999,''),remarks \n" +
            "from t_pr_sewagetest;";
    }
    window.open('exportExcelSewage?name=' + name + '&sqlWords=' + sqlWords);
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
    var filePath = 'Files/Templates/污水化验结果模板.xlsx';
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
            url: "importSewageTestExcel",              // url
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
            if (last - event.timeStamp === 0) {
                searchData();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        }, 600);
    });
});

array = [];//存放所有的tr
array1 = [];//存放目标的tr

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

    var id = $.trim($('#search-id').val());

    var address = $.trim($('#search-address').val());

    var remarks = $.trim($('#search-remarks').val());

    var ph = $.trim($('#search-ph').val());

    var cod = $.trim($('#search-COD').val());

    var bod5 = $.trim($('#search-BOD5').val());

    var n2 = $.trim($('#search-N2').val());

    var nitrogen = $.trim($('#search-nitrogen').val());

    var phosphorus = $.trim($('#search-phosphorus').val());

    var checkState=$('#search-checkState option:selected').text();

    console.log(checkState)

    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (!($(this).children('td').eq(1).text().indexOf(id) != -1 && $(this).children('td').eq(2).text().indexOf(address) != -1
                && $(this).children('td').eq(3).text().indexOf(ph) != -1 && $(this).children('td').eq(4).text().indexOf(cod) != -1 && $(this).children('td').text().indexOf(text) != -1
                && $(this).children('td').eq(5).text().indexOf(bod5) != -1 && $(this).children('td').eq(6).text().indexOf(n2) != -1
                && $(this).children('td').eq(13).text().indexOf(nitrogen) != -1 && $(this).children('td').eq(14).text().indexOf(phosphorus) != -1
                && $(this).children('td').eq(15).text().indexOf(remarks) != -1&&$(this).children('td').eq(16).text().indexOf(checkState) != -1

            )) {
                $(this).hide();
            }
            if (
                ($(this).children('td').eq(1).text().indexOf(id) != -1 && $(this).children('td').eq(2).text().indexOf(address) != -1
                    && $(this).children('td').eq(3).text().indexOf(ph) != -1 && $(this).children('td').eq(4).text().indexOf(cod) != -1 && $(this).children('td').text().indexOf(text) != -1
                    && $(this).children('td').eq(5).text().indexOf(bod5) != -1 && $(this).children('td').eq(6).text().indexOf(n2) != -1
                    && $(this).children('td').eq(13).text().indexOf(nitrogen) != -1 && $(this).children('td').eq(14).text().indexOf(phosphorus) != -1
                    && $(this).children('td').eq(15).text().indexOf(remarks) != -1&&$(this).children('td').eq(16).text().indexOf(checkState) != -1

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


/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    tr.parentNode.removeChild(tr);

}

//保存方法
function save() {
    $('.myclass2').each(function () {
        var data = {
            id: $(this).children('td').eq(0).find('input').val(),
            address: $(this).children('td').eq(1).find('input').val(),
            ph: $(this).children('td').eq(2).find('input').val(),
            cod: $(this).children('td').eq(3).find('input').val(),
            bod5: $(this).children('td').eq(4).find('input').val(),
            n2: $(this).children('td').eq(5).find('input').val(),
            alkalinity: $(this).children('td').eq(6).find('input').val(),
            alkalinityCaCo3: $(this).children('td').eq(7).find('input').val(),
            alkalinityHCO3: $(this).children('td').eq(8).find('input').val(),
            bicarbonate: $(this).children('td').eq(9).find('input').val(),
            bicarbonateCaCo3: $(this).children('td').eq(10).find('input').val(),
            bicarbonateHCO3: $(this).children('td').eq(11).find('input').val(),
            nitrogen: $(this).children('td').eq(12).find('input').val(),
            phosphorus: $(this).children('td').eq(13).find('input').val(),
            remarks: $(this).children('td').eq(14).find('input').val(),
        };
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addSewageTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
        })

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
            url: "submitSewageTest",              // url
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
            url: "confirmSewageTest",              // url
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
            url: "cancelSewageTest",              // url
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
        url: "getSewageTestById",              // url
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
                $('#ph').val(obj.ph.toFixed(2));
                $('#COD').val(obj.COD.toFixed(2));
                $('#BOD5').val(obj.BOD5.toFixed(2));
                $('#N2').val(obj.n2.toFixed(2));
                $('#alkalinity').val(obj.alkalinity.toFixed(2));
                $('#alkalinityCaCo3').val(obj.alkalinityCaCo3.toFixed(2));
                $('#alkalinityHCO3').val(obj.alkalinityHCO3.toFixed(2));
                $('#bicarbonate').val(obj.bicarbonate.toFixed(2));
                $('#bicarbonateCaCo3').val(obj.bicarbonateCaCo3.toFixed(2));
                $('#bicarbonateHCO3').val(obj.bicarbonateHCO3.toFixed(2));
                $('#nitrogen').val(obj.nitrogen.toFixed(2));
                $('#phosphorus').val(obj.phosphorus.toFixed(2));
                $('#remarks').val(obj.remarks);


            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })

    $('#addModa2').modal('show');
}

//污水化验单修改
function adjustSewageTest() {
    var data = {
        id: $('#id').val(),
        address: $('#address').val(),
        ph: $('#ph').val(),
        cod: $('#COD').val(),
        bod5: $('#BOD5').val(),
        n2: $('#N2').val(),
        alkalinity: $('#alkalinity').val(),
        alkalinityCaCo3: $('#alkalinityCaCo3').val(),
        alkalinityHCO3: $('#alkalinityHCO3').val(),
        bicarbonate: $('#bicarbonate').val(),
        bicarbonateCaCo3: $('#bicarbonateCaCo3').val(),
        bicarbonateHCO3: $('#bicarbonateHCO3').val(),
        nitrogen: $('#nitrogen').val(),
        phosphorus: $('#phosphorus').val(),
        remarks: $('#remarks').val()
    }


    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateSewageTestById",              // url
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

//污水化验校验
function testing(item) {
    $(item).parent().children('p').eq(0).hide()
    $(item).parent().children('p').eq(1).hide()

    var id=$.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingSewageTestId",              // url
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