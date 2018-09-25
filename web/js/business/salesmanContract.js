/**
 * Created by matt on 2018/8/21.
 */
var isSearch = false;
var currentPage = 1;                          //当前页数
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
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countSalesmanByContract",                  // url
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
    return loadPages(totalRecord, count);
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord === 0) {
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count === 0)
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
    setDataList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = [];
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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if (pageNumber === 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber === -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber === undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber === 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber === totalPage()) {
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
            url: "listSalesmanByContract",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    setDataList(result.data);
                } else {
                    console.log(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        for(var i=0;i<array1.length;i++){
            $(array1[i]).hide();
        }
        var i=parseInt((pageNumber - 1) * countValue());
        var j=parseInt((pageNumber - 1) * countValue())+parseInt(countValue() - 1);
        for(var i=i;i<=j;i++){
            $('#tbody2').append(array1[i]);
            $(array1[i]).show();
        }
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber === undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber === 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber === totalPage()) {
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listSalesmanByContract",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result !== undefined && result.status === "success") {
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
        } else {
            for(var i=0;i<array1.length;i++){
                $(array1[i]).hide();
            }
            var i=parseInt((pageNumber - 1) * countValue());
            var j=parseInt((pageNumber - 1) * countValue()) + parseInt(countValue() - 1);
            for(var i=i;i<=j;i++){
                $('#tbody2').append(array1[i]);
                $(array1[i]).show();
            }
        }
    }
}

/**
 * 分页 获取首页内容
 * */
function loadPageList() {
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSalesmanByContract",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    // getCheckState();
    $("#search-sex").get(0).selectedIndex = -1; // 初始化下拉框
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clonedTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.addClass('myClass2');
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(index + 1);
                    break;
                case (1):
                    $(this).html(obj.name);
                    break;
                case (2):
                    $(this).html(obj.salesmanId);
                    break;
                case (3):
                    $(this).html(obj.age);
                    break;
                case (4):
                    if (obj.sex === true) {
                        $(this).html('男');
                    } else $(this).html('女');
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
 * 通过点击的操作按钮来获取销售员的编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return $(e).parent().parent().find("td[name='salesmanId']").text();
}

/**
 * 双击获取销售员编号
 * @param e
 * @returns {jQuery}
 */
function getIdByMenu1(e) {
    return $(e).find("td[name='salesmanId']").text();
}
/**
 * 双击查看业务员名下合同
 * @param e
 */
function toView1(e){
    localStorage.salesmanId = getIdByMenu1(e);
    location.href = "salesmanContract.html";
}
/**
 * 单击查看业务员名下的所有合同
 */
function toView(e){
    localStorage.salesmanId = getIdByMenu(e);
    location.href = "salesmanContract.html";
}

/**
 * 回车查询
 */
function enterSearch(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchTest();      //
    }
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
                searchTest();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchTest();      //
            }
        },600);
    });
});

var array=[];//存放所有的tr
var array1=[];//存放目标的tr
/**
 * 查询功能
 */
function searchTest() {
    isSearch=false;
    $('.myClass2').each(function () {
        $(this).show();
    });
    array = [];                   // 清空数组
    array1 = [];
    //分页模糊查询
    for(var i1=1;i1<=totalPage();i1++){
        switchPage(parseInt(i1));
        array.push($('.myClass2'));
    }
    console.log("array:");
    console.log(array);
    isSearch=true;
    if ($("#senior").is(':visible')) {// 高级查询
        //搜索关键字
        var salesmanName = $.trim($('#search-salesmanName').val());
        var salesmanId = $.trim($('#search-salesmanId').val());
        var age = $.trim($('#search-age').val());
        var sex = $("#search-sex option:selected").text();
        for (var j = 0; j < array.length; j++) {
            $.each(array[j], function () {
                //console.log(this);
                if (!($(this).children('td').eq(1).text().indexOf(salesmanName) != -1 && $(this).children('td').eq(2).text().indexOf(salesmanId) != -1
                    && $(this).children('td').eq(3).text().indexOf(age) != -1 && $(this).children('td').eq(4).text().indexOf(sex) != -1)) {
                   console.log($(this).children('td').eq(3).text());
                    $(this).hide();
                }
                if (($(this).children('td').eq(1).text().indexOf(salesmanName) != -1 && $(this).children('td').eq(2).text().indexOf(salesmanId) != -1
                    && $(this).children('td').eq(3).text().indexOf(age) != -1 && $(this).children('td').eq(4).text().indexOf(sex) != -1)){
                    array1.push($(this));
                }
            });
        }
        //计算总页数
        var total;
        if(array1.length % countValue() === 0){
            total=array1.length / countValue()
        }
        if(array1.length % countValue() > 0){
            total=Math.ceil(array1.length / countValue());
        }

        if(array1.length / countValue() < 1){
            total=1;
        }

        $("#totalPage").text("共" + total + "页");

        var myArray = new Array();

        $('.beforeClone').remove();
        for (var i = 0; i < total; i++) {
            var li = $("#next").prev();
            myArray[i] = i+1;
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
        for(var i=0;i<array1.length;i++){
            array1[i].hide();
        }
        // 将数据显示出来
        for(var i=0;i<countValue();i++){
            $(array1[i]).show();
            $('#tbody2').append((array1[i]));
        }
        // 未输入时全显示
        if (salesmanName.length <= 0 && salesmanId.length <= 0 && age.length < 0 && sex.length <= 0) {
            $('.myClass2').each(function () {
                $(this).show();
            })
        }
    } else {
        // 模糊查询
        var text = $.trim($('#searchContent').val());
        for (var j = 0; j < array.length; j++) {
            $.each(array[j], function () {
                if (($(this).children('td').text().indexOf(text) == -1)) {
                    $(this).hide();
                }
                if ($(this).children('td').text().indexOf(text) != -1) {
                    array1.push($(this));
                }
            });
        }
        var total;

        if(array1.length%countValue()==0){
            total=array1.length/countValue()
        }

        if(array1.length%countValue()>0){
            total=Math.ceil(array1.length/countValue());
        }

        if(array1.length/countValue()<1){
            total=1;
        }

        $("#totalPage").text("共" + total + "页");

        var myArray = new Array();

        $('.beforeClone').remove();

        for ( i = 0; i < total; i++) {
            var li = $("#next").prev();
            myArray[i] = i+1;
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

        for(var i=0;i<array1.length;i++){
            $(array1[i]).hide();
        }

        //首页展示
        for(var i=0;i<countValue();i++){
            $(array1[i]).show();
            $('#tbody1').append((array1[i]));
        }

        if(text.length<=0){
            loadPageList();
        }
    }
}
