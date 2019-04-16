/**
 * Created by JackYang on 2018/7/30.
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array0=[]
array = [];//存放所有的tr
array1 = [];//存放目标的tr

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

function keyLogin(){
    if (event.keyCode==13)  //回车键的键值为13
        document.getElementById("input1").click(); //调用登录按钮的登录事件
}

//重置
function reset() {
    isSearch = false;
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
    loadPageStocktList();
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalStockRecord",                  // url
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchStockTotal",                  // url
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
    setStockList(result);
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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
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
            url: "loadPageStockList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setStockList(result);
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
    else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchStock",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setStockList(result.stocktList);
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
                url: "loadPageStockList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setStockList(result);
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
        else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchStock",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setStockList(result.stocktList);
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
 * 分页 获取首页内容
 * */
function loadPageStocktList() {
    $('.loader').show();
    loadNavigationList();   // 设置动态菜单
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
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchStock();
        window.localStorage.removeItem('approvalId');
        $('.loader').hide();
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageStocktList",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == 'success') {
                    $('.loader').hide();
                    console.log(result);
                    setPageClone(result.stocktList);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                console.log("失败");
            }
        });
        // 设置高级检索的下拉框数据
        //setSeniorSelectedList();
        isSearch = false;
    }

}

/**
 * 设置库存数据
 * @param result
 */
function setStockList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass');
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 库存编号
                case (1):
                    $(this).html(obj.stockId);
                    break;
                // 产废单位联系人
                case (2):
                    if (obj.client != null) {
                        $(this).html(obj.client.contactName);
                    }
                    break;
                // 产废单位联系电话
                case (3):
                    if (obj.client != null) {
                        if (obj.client.phone != "") {
                            $(this).html(obj.client.phone);
                        }
                        else {
                            $(this).html(obj.client.mobile);
                        }
                    }
                    ;
                    break;
                // 申报状态
                case (4):
                    if (obj.checkStateItem != null) {
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                        // if(obj.checkStateItem.dictionaryItemName=='已作废'){
                        //     $(this).parent().hide()
                        // }
                    }
                    break;
                // 运输公司
                case (5):
                    if (obj.selfEmployed == false) {
                        if (obj.supplier != null) {
                            $(this).html(obj.supplier.companyName);
                        }
                    }
                    else
                        $(this).html("");
                    break;
                // 公司联系电话
                case (6):
                    if (obj.selfEmployed == false) {
                        $(this).html(obj.transportTelephone);
                    }
                    else
                        $(this).html("");
                    break;
                // 运输车车牌号
                case (7):
                    if (obj.selfEmployed == false) {
                        $(this).html(obj.plateNumber);
                    }
                    else $(this).html("");
                    break;

                case (9):
                    if(obj.client!=null){
                        $(this).html(obj.client.capacity.toFixed(2));
                    }
                    break;
                // case (8):
                //     if (obj.clientType != null)
                //         $(this).html(obj.clientType.name);
                //     break;
                // 操作
//                    case (9):
//                        if(obj.clientState.name == "已启用"){
//                            if(obj.checkState.name == "已完成"){
//                                $(this).children().eq(1).attr("class","disabled");
//                                $(this).children().eq(1).removeAttr("onclick");
//                                $(this).children().eq(2).attr("class","disabled");
//                                $(this).children().eq(2).removeAttr("onclick");
//                                $(this).children().eq(3).attr("class","disabled");
//                                $(this).children().eq(3).removeAttr("onclick");
//                                $(this).children().eq(4).attr("class","disabled");
//                                $(this).children().eq(4).removeAttr("onclick");
//                                $(this).children().eq(6).attr("class","disabled");
//                                $(this).children().eq(6).removeAttr("onclick");
//                            }else if(obj.checkState.name == "审批中"){
//                                $(this).children().eq(1).attr("class","disabled");
//                                $(this).children().eq(1).removeAttr("onclick");
//                                $(this).children().eq(2).attr("class","disabled");
//                                $(this).children().eq(2).removeAttr("onclick");
//                                $(this).children().eq(4).attr("class","disabled");
//                                $(this).children().eq(4).removeAttr("onclick");
//                            }else{
//                                $(this).children().eq(1).attr("class","disabled");
//                                $(this).children().eq(1).removeAttr("onclick");
//                                $(this).children().eq(4).attr("class","disabled");
//                                $(this).children().eq(4).removeAttr("onclick");
//                                $(this).children().eq(6).attr("class","disabled");
//                                $(this).children().eq(6).removeAttr("onclick");
//                            }
//                        }else{
//                            $(this).children().eq(0).attr("class","disabled");
//                            $(this).children().eq(0).removeAttr("onclick");
//                            $(this).children().eq(4).attr("class","disabled");
//                            $(this).children().eq(4).removeAttr("onclick");
//                            $(this).children().eq(6).attr("class","disabled");
//                            $(this).children().eq(6).removeAttr("onclick");
//                        }
//                        break;
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
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckStateList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

//危废出库查询
/**
 * 查找申报信息
 */

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchStock();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchStock();      //
            }
        }, 600);
    });
});

//高级查询
function searchStock() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            supplier:{companyName:$.trim($("#search-transport").val()),phone:$.trim($("#search-proTelephone").val())} ,
            checkStateItem:{dataDictionaryItemId:$("#search-checkState").val()},
            client:{contactName:$("#search-proContactName").val()},
            page: page,
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
        url: "searchStock",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.stocktList);
                setPageCloneAfter(pageNumber);        // 重新设置页码
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
        searchStock();      //
    }
}


//粗查询
function searchStock1() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);

    isSearch = true;

    var text = $.trim($('#searchContent').val());

    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (($(this).children('td').text().indexOf(text) == -1)) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1) {
                array1.push($(this));
            }
        });
    }
    console.log(array1);

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
    setPageCloneAfter(1);
    for (var i = 0; i < array1.length; i++) {
        $(array1[i]).hide();
    }

    //首页展示
    for (var i = 0; i < countValue(); i++) {
        // $(array1[i]).children('td').eq(1).html(i+1)
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }
    if (text.length <= 0) {
        loadPageStocktList();
    }

}

/**
 * 8位危废代码获取
 */
function init1() {
    loadNavigationList();   // 设置动态菜单
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        // style: 'btn-info',
        size: 4
    });
    $("#transport1").show();//三个文本框隐藏
    //下拉框样式危废编码
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result.data);
                // 各下拉框数据填充
                var wastesInfoList = $("#code");
                // 清空遗留元素
                wastesInfoList.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesInfoList.append(option);
                });
                wastesInfoList.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //下拉框样式产废公司
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientListFromStock",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var client = $('#proWasteCompany');
                client.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    client.append(option);
                });
                $('.selectpicker').selectpicker('refresh');

            }
            else {
                alert(result.message);

            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    //下拉框运输供应商
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSupplierListFromStock",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var transport = $('#transport');
                transport.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    transport.append(option);
                });
                $('.selectpicker').selectpicker('refresh');

            }
            else {
                alert(result.message);

            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    var clientId = $('#proWasteCompany').selectpicker('val');
    //console.log(clientId);
    //根据客户编号获得客户信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientByClientId",              // url
        data: {'clientId': clientId},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //1赋值产废单位联系人 产废联系人电话
                $('#proContactName').val(result.data.contactName);
                if (result.data.phone != '') {
                    $('#proTelephone').val(result.data.phone);
                }
                else {
                    $('#proTelephone').val(result.data.mobile);
                }
            }
            else {

                alert(result.message);

            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    //自动带入电话
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSupplierListById",                  // url
        data: {'supplierId': $("#transport option:selected").val()},
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //console.log(result);
                var obj = eval(result.supplier);
                console.log(obj);
                if (obj != null) {
                    if (obj.phone != '') {
                        $('#transportTelephone').val(obj.phone);
                    }
                    else if (obj.phone == '') {
                        $('#transportTelephone').val(obj.mobile);
                    }
                    else {
                        $('#transportTelephone').val('');
                    }

                }

            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });

    $('#proWasteCompany').trigger('change');
}

//判断是否是自运单位
function judge() {
    var s = $('input[type=checkbox]:checked').val();
    if (s == 'on') {
        $("#transport1").hide(1000);
    }
    else {
        $("#transport1").show(1000);

    }
}

//判断是否是自运单位修改
function judge1() {
    var s = $('#selfEmployed').prop('checked');
    if (s == true) {
        $("#transport1").hide(1000);
    }
    else {
        $("#transport1").show(1000);
    }
}

//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
    $('.myclass').each(function (index,item) {
        if((parseInt(index)+1)!=1){
            $(this).children('td').eq(0).html((parseInt(index)+1).toString()+"<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>");
        }
        if((parseInt(index)+1)==1){
            $(this).children('td').eq(0).html((parseInt(index)+1).toString());
        }
    });
   //var length = $(tr.parentNode).children().length - 2;         // 行数
    // var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    // tr.parentNode.removeChild(tr);
    // console.log("length:" + length);
    // for (var i = 2; i < length; i++) {             // 更新序号
    //     tBody.children().eq(i).children().eq(0).get(0).innerHTML = i;     // 更新序号
    //     // 重新加上减行按钮
    //     var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    //     tBody.children().eq(i).children("td:eq(0)").prepend(delBtn);
    //     // 更新name
    //     tBody.children().eq(i).children("td:not(0)").find("input,select").each(function () {
    //         var name = $(this).prop('name');
    //         var newName = name.replace(/[0-9]\d*/, i - 1);
    //         //console.log(newName);
    //         $(this).prop('name', newName);
    //     });
    // }

}

//保存库存信息
function save() {
    //收集数据
    var data = {
        'client': {'clientId': $('#proWasteCompany').selectpicker('val'),capacity:$('#capacity').val()},
        'transport': $("#transport").val(),//运输公司
        'transportTelephone': $("#transportTelephone").val(),//运输公司联系电话
        'plateNumber': $("#plateNumber").val(),//车牌号
        'selfEmployed': $('#selfEmployed').prop('checked'),
        supplier: {supplierId: $('#transport').selectpicker('val')}
    };

    $.ajax({
        type: 'POST',
        url: "addStock",
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                console.log(result)
                $('.myclass').each(function () {
                    var stockItem={
                        wastesName:$(this).children('td').eq(1).html(),
                        wastesCode:$(this).children('td').eq(2).html(),
                        number:$(this).children('td').eq(3).html(),
                        content:$(this).children('td').eq(4).html(),
                        remarks:$(this).children('td').eq(5).html(),
                        id:$(this).children('td').eq(6).html(),//用作更新申报状态

                    };
                    $.ajax({
                        type: 'POST',
                        url: "addStockItem",
                        async: false,
                        data: JSON.stringify(stockItem),
                        contentType: "application/json;charset=utf-8",
                        success: function (result) {
                            if (result !=null) {
                                console.log(result)
                            }
                            else {
                                alert("添加失败")
                            }
                        },
                        error: function (result) {
                        }
                    });
                });
                alert("添加成功!");
                var addType = $("input[name='addType']:checked").val();
                console.log(addType)
                if(addType=='continue'){
                    window.location.reload();
                }
                if(addType=='break') {
                    location.href = "stockManage.html";
                }

            }
            else {
                alert("添加失败")
            }
        },
        error: function (result) {

        }
    });





}

//克隆行方法
function addNewLine() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        style: 'btn-info',
        size: 4
    });//下拉框样式
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(3),td:eq(4),td:eq(5)").find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1 = (id.replace(/[^0-9]/ig, ""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num - 1);
        //console.log(newName);
        $(this).prop('name', newName);
    });
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").append(delBtn);
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();

}

//克隆行方法(修改页面)
function addNewLine1() {
    // var wastesInfoList = $("#code");
    // // 清空遗留元素
    // wastesInfoList.children().remove();
    // $.each(data, function (index, item) {
    //     var option = $('<option />');
    //     option.val(item.code);
    //     option.text(item.code);
    //     wastesInfoList.append(option);
    // });
    //wastesInfoList.removeAttr('id');
    //$('.selectpicker').selectpicker('val',obj.wastesList[i].code+"" );//默认选中
    //$('.selectpicker').selectpicker('refresh');
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(3),td:eq(4),td:eq(5)").find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1 = (id.replace(/[^0-9]/ig, ""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num - 1);
        //console.log(newName);
        $(this).prop('name', newName);
    });
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").append(delBtn);
    $('.selectpicker').data('selectpicker', null);//清空
    $('.bootstrap-select').find("button:first").remove();//删除
    $('.selectpicker').selectpicker();//初始化
    $('.selectpicker').selectpicker('refresh');//初始化刷新
}

//修改库存信息页面跳转
function adjustStock(item) {
    var stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    //1页面跳转到修改页面
    localStorage.stockId = stockId;
    //console.log(localStorage.stockId);
    location.href = "adjustStock.html";
}

//修改页面的初始
function loadAdjustStock() {
    loadNavigationList();   // 动态菜单加载
    //获取申报编号
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        // style: 'btn-info',
        size: 4
    });//下拉框样式
    var stockId = localStorage['stockId'];
    $('#stockId').prop("value", stockId);
    //通过ajax 根据id获取信息
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getStockById",                  // url
        async: false,
        dataType: "json",
        data: {'stockId': stockId},
        success: function (result) {
            if (result != undefined && result.status == 'success') {
                console.log(result);
                var obj = eval(result.stock);
                var data = eval(result.data);

                //库容
                if(obj.client!=null){
                    $('#capacity').val((obj.client.capacity).toFixed(2))
                }

                //车牌号
                $('#plateNumber').prop('value', obj.plateNumber);
                //赋值是否自运单位
                $('#selfEmployed').prop('checked', obj.selfEmployed);
                $('#transport1').show();//不是自运公司 显示

                var supplier = $('#transport');
                supplier.children().remove();
                $.each(result.supplierList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    supplier.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                if (obj.selfEmployed == true) {
                    $('#transport1').hide();//是自运公司 隐藏
                }
                if (obj.selfEmployed == false) {
                    $('.selectpicker').selectpicker({
                        language: 'zh_CN',
                        // style: 'btn-info',
                        size: 4
                    });//下拉框样式
                    if (result.stock.supplier != null) {
                        $('#transport').selectpicker('val', result.stock.supplier.supplierId);//默认选中
                        //根据供应商编号获得运输方信息
                        $.ajax({
                            type: "POST",                       // 方法类型
                            url: "listSupplierById",              // url
                            data: {'id': result.stock.supplier.supplierId},
                            cache: false,
                            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                            dataType: "json",
                            //contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                if (result != undefined) {
                                    var obj = eval(result);
                                    if (obj != null) {
                                        if (obj.phone != '') {
                                            $('#transportTelephone').val(obj.phone);
                                        }
                                        else if (obj.phone == '') {
                                            $('#transportTelephone').val(obj.mobile);
                                        }
                                        else {
                                            $('#transportTelephone').val('');
                                        }
                                    }
                                }
                            },
                            error: function (result) {
                                alert("服务器异常！");
                            }
                        });
                    }
                    else {

                        $('#transportTelephone').val(obj.transportTelephone);
                    }


                }
                // 各下拉框数据填充
                var wastesInfoList = $("#code");
                // 清空遗留元素
                wastesInfoList.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesInfoList.append(option);
                });
                // wastesInfoList.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
                var client = $('#proWasteCompany');
                client.children().remove();
                $.each(result.clientList, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    client.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                if (result.stock.client.clientId != null) {
                    $('#proWasteCompany').selectpicker('val', result.stock.client.clientId);//默认选中
                    var clientId = $('#proWasteCompany').selectpicker('val');
                    console.log(clientId);
                    //根据客户编号获得客户信息
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getClientByClientId",              // url
                        data: {'clientId': clientId},
                        cache: false,
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        //contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {
                                //1赋值产废单位联系人 产废联系人电话
                                $('#proContactName').val(result.data.contactName);
                                if (result.data.phone != '') {
                                    $('#proTelephone').val(result.data.phone);
                                }
                                else {
                                    $('#proTelephone').val(result.data.mobile);
                                }
                                console.log(result);
                            }
                            else {

                                alert(result.message);

                            }
                        },
                        error: function (result) {
                            alert("服务器异常！");
                        }
                    });
                }

                //库存明细赋值
                $.each(result.stock.stockItemList,function (index,item) {
                    $('.selectpicker').selectpicker( {
                        language: 'zh_CN',
                        // style: 'btn-info',
                        size: 4
                    });//下拉框样式

                    var tr=$('#cloneTr1');
                    // tr.siblings().remove();
                    var cloneTr=tr.clone();
                    cloneTr.attr('class','myclass');
                    cloneTr.show();
                    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                    cloneTr.children('td').eq(0).html(parseInt(result.stock.stockItemList.length)-index);
                    cloneTr.children("td:eq(0)").append(delBtn);
                    cloneTr.children('td').eq(1).children('input').val(item.wastesName);
                    cloneTr.children('td').eq(2).find('select').selectpicker('val',item.wastesCode);
                    cloneTr.children('td').eq(3).children('input').val(item.number);
                    cloneTr.children('td').eq(4).children('input').val(item.content);
                    cloneTr.children('td').eq(5).children('input').val(item.remarks);
                    cloneTr.children('td').eq(6).html(item.id);
                    cloneTr.removeAttr('id');
                    cloneTr.insertAfter(tr);
                    $('.selectpicker').data('selectpicker', null);
                    $('.bootstrap-select').find("button:first").remove();
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                    tr.hide();
                    tr.removeAttr('class');

                })
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

//修改页面方法
function adjustStock1() {
    var data = {
        'client': {'clientId': $('#proWasteCompany').selectpicker('val'),capacity:$('#capacity').val()},
        // 'proContactName':$("#proContactName").val(),//产废单位联系人
        // 'proTelephone':$("#proTelephone").val(),//产废联系人电话
        'transport': $("#transport").val(),//运输公司
        'transportTelephone': $("#transportTelephone").val(),//运输公司联系电话
        'plateNumber': $("#plateNumber").val(),//车牌号
        'stockId': $("#stockId").val(),//库存编号
        'selfEmployed': $('#selfEmployed').prop('checked'),
        // 'proWasteCompany':$('#proWasteCompany').val(),
        supplier: {supplierId: $('#transport').selectpicker('val')}
    };
    $.ajax({
        type: 'POST',
        url: "adjust1Stock",
        data: JSON.stringify(data),
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != null) {
                $('.myclass').each(function () {
                    var stockItem = {
                        wastesName: $(this).children('td').eq(1).children('input').val(),
                        wastesCode: $(this).children('td').eq(2).children('div').find('button').attr('title'),
                        number: $(this).children('td').eq(3).children('input').val(),
                        content: $(this).children('td').eq(4).children('input').val(),
                        remarks: $(this).children('td').eq(5).children('input').val(),
                        id: $(this).children('td').eq(6).html(),
                        stockId: $("#stockId").val(),//库存编号
                    };

                    console.log(stockItem)
                    $.ajax({
                        type: 'POST',
                        url: "addStockItem1",
                        async: false,
                        data: JSON.stringify(stockItem),
                        contentType: "application/json;charset=utf-8",
                        success: function (result) {

                            if (result != null) {
                                console.log(result)
                                //  alert("添加成功!");
                                // location.href = "stockManage.html";

                            }
                            else {
                                alert("添加失败")
                            }
                        },
                        error: function (result) {

                        }
                    });


                });
                alert("修改成功!");
                location.href = "stockManage.html";

            }
            else {
                alert("添加失败")
            }
        },
        error: function (result) {

        }
    });






}

function allSelect1() {
    var isChecked = $('#allSel1').prop('checked');
    console.log(isChecked);
    if (isChecked) $("input[name='blankCheckbox1']").prop('checked', true);
    else $("input[name='blankCheckbox1']").prop('checked', false);
}//提交

function submitStock(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "submitStock",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'stockId': id
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
            } else {
                // alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常！");
            console.log("error: " + result);
        }
    });
}
function contractSubmit() {
    initSubmitFName(submitStock.name);
    //在此提交
    var items = $("input[name='blankCheckbox1']:checked");//判断复选框是否选中
    if (items.length > 0) {
        if(confirm("确认提交?")){
            //点击确定后操作
            items.each(function () {//遍历
                var id = getContractId1(this);//获得合同编号
                publicSubmit(id, getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
            });
            // alert("提交成功!");

        }

    }
    else {
        alert("请勾选要提交的数据！")
    }
}

//获取编号
function getContractId1(item) {
    return item.parentElement.parentElement.nextElementSibling.innerHTML;
}

//作废
function cancel(item) {
    //查看合同编号
    var stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var r = confirm("是否作废该合同？");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "cancelStock",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"stockId": stockId},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert("作废成功！");
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }
                else {
                    alert("作废失败")
                    location.reload();
                }
            },
            error: function (result) {
                alert("服务器异常！")
            }
        });
    }
    else {
        alert("取消作废")
    }
}

//查看
function viewStock(item) {
    //查看页面 审批隐藏 打印显示 驳回隐藏
    $('#btn').hide();//审批隐藏
    $('#print').show();//打印显示
    $('#back').hide();
    //完善隐藏
    $('#perfect').hide();
    //申报编号
    var stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getStockById",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'stockId': stockId
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result.stock);
                var obj = result.stock;
                //1赋值
                //产废单位联系人
                if (obj.selfEmployed == false) {//说明不是自运单位

                    //根据运输供应商赋值
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getSupplierListById",                  // url
                        data: {'supplierId': obj.transport},
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        //contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {
                                //console.log(result);
                                var obj = eval(result.supplier);
                                console.log(obj);
                                if (obj != null) {
                                    $('#transport').text(obj.companyName);//运输公司

                                }

                            }
                            else {
                                alert(result.message);
                            }
                        },
                        error: function (result) {
                            alert("服务器异常！");
                        }
                    });


                    $('#plateNumber').text(obj.plateNumber);//车牌号
                    $('#transportTelephone').text(obj.transportTelephone);//运输公司联系方式
                }
                if (obj.selfEmployed == true) {//说明不是自运单位
                    $('#transport').text("");//运输公司
                    $('#plateNumber').text("");//车牌号
                    $('#transportTelephone').text("");//运输公司联系方式
                }
                //赋值产废单位联系人
                if (obj.client != null) {
                    $('#proContactName').text(obj.client.contactName);
                }
                if (obj.client != null) {
                    if (obj.client.phone != '') {
                        //赋值产废单位电话
                        $('#proTelephone').text(obj.client.phone);
                    }
                    else {
                        $('#proTelephone').text(obj.client.mobile);
                    }

                }

                //赋值是否自运单位
                $('#selfEmployed').prop('checked', obj.selfEmployed);
                //产废公司
                if (obj.client != null) {
                    $('#proWasteCompany').text(obj.client.companyName);
                }
                //库容
                if (obj.client != null) {
                    $('#capacity').text(obj.client.capacity.toFixed(2));
                }
               if(obj.stockItemList!=null){
                   var tr = $("#cloneTr1");

                   tr.children('td').eq(6).html("")
                   tr.children('td').eq(7).html("")
                   tr.siblings().remove();
                   $.each(obj.stockItemList, function (index, item) {
                       var obj=eval(item);
                       // 克隆tr，每次遍历都可以产生新的tr
                       var clonedTr = tr.clone();
                       clonedTr.show();
                       // 循环遍历cloneTr的每一个td元素，并赋值
                       clonedTr.children("td").each(function (inner_index) {
                           //1生成领料单号
                           var obj = eval(item);
                           // 根据索引为部分td赋值
                           switch (inner_index) {
                               // 序号
                               case (0):
                                   $(this).html(index+1);
                                   break;
                               // 危险废物的名称
                               case (1):
                                   $(this).html(obj.wastesName);
                                   break;
                               // 危废编码
                               case (2):
                                   $(this).html(obj.wastesCode);
                                   break;
                               // 数量(公斤)
                               case (3):
                                   $(this).html(obj.number.toFixed(3));
                                   break;
                               // 成分
                               case (4):

                                   $(this).html(obj.content);
                                   break;
                               // 备注
                               case (5):
                                   $(this).html(obj.remarks);
                                   break;
                               //进料方式
                               case (6):

                                       if(obj.handleCategoryItem!=null){
                                           $(this).html(obj.handleCategoryItem.dictionaryItemName)
                                       }


                                   break;
                               //处置意见
                               case (7):
                                   $(this).html(obj.disposalAdvice);
                                   break;
                               //明细编号
                               case (8):
                                   $(this).html(obj.id);
                                   break;
                           }
                       });
                       // 把克隆好的tr追加到原来的tr前面
                       clonedTr.removeAttr("id");
                       clonedTr.insertBefore(tr);


                   });
                   // 隐藏无数据的tr
                   tr.hide();
                   tr.removeAttr('class');

               }

            } else {
                alert(result.message);
                $("#modal3_contactName").text("");
                $("#modal3_contractState").text("");
                $("#modal3_contractVersion").text("");
                $("#modal3_companyName").text("");
                $("#modal3_contactName").text("");
                $("#modal3_contractId").text("");
                $("#modal3_beginTime").text("");
                $("#modal3_endTime").text("");
                $("#modal3_area").text("");
                $("#modal3_telephone").text("");
                $("#modal3_order").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#stockInfoForm').modal('show');
    localStorage.clear();
}

//添加危废列表新行
function addWastesNewLine() {
    // $("#body2").children().last().clone().remove();
    var tr = $("#body2").children('tr').first();
    tr.siblings().remove();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    //console.log(id);
    var num = parseInt(id);
    num++;
    console.log(num);
    clonedTr.children().get(0).innerHTML = num;
    var temp = num - 2;
    var temp2 = num - 1;
    clonedTr.find("input[name='wastesList[" + temp + "].name']").prop('name', "wastesList[" + temp2 + "].name");
    clonedTr.find("input[name='wastesList[" + temp + "].code']").prop('name', "wastesList[" + temp2 + "].code");
    clonedTr.find("input[name='wastesList[" + temp + "].wasteAmount']").prop('name', "wastesList[" + temp2 + "].wasteAmount");
    clonedTr.find("input[name='wastesList[" + temp + "].component']").prop('name', "wastesList[" + temp2 + "].component");
    clonedTr.find("input[name='wastesList[" + temp + "].remarks']").prop('name', "wastesList[" + temp2 + "].remarks");
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}

//审批
function approval(item) {
  //   //出现模态框和查看一个效果
  //   //审批显示 打印隐藏 驳回显示
  //   $('#btn').show();//审批显示
  //   $('#print').hide();//打印隐藏
  //   $('#back').show();
  //   //完善隐藏
  //   $('#perfect').hide();//打印隐藏
  // var   stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
  //   $.ajax({
  //       type: "POST",                       // 方法类型
  //       url: "getStockById",                   // url
  //       async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
  //       dataType: "json",
  //       data: {
  //           'stockId': stockId
  //       },
  //       success: function (result) {
  //           if (result != undefined && result.status == "success") {
  //               console.log(result.stock);
  //               var obj = result.stock;
  //               //1赋值
  //               //产废单位联系人
  //               if (obj.selfEmployed == false) {//说明不是自运单位
  //
  //                   //根据运输供应商赋值
  //                   $.ajax({
  //                       type: "POST",                       // 方法类型
  //                       url: "getSupplierListById",                  // url
  //                       data: {'supplierId': obj.transport},
  //                       async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
  //                       dataType: "json",
  //                       //contentType: "application/json; charset=utf-8",
  //                       success: function (result) {
  //                           if (result != undefined && result.status == "success") {
  //                               //console.log(result);
  //                               var obj = eval(result.supplier);
  //                               console.log(obj);
  //                               if (obj != null) {
  //                                   $('#transport').text(obj.companyName);//运输公司
  //
  //                               }
  //
  //                           }
  //                           else {
  //                               alert(result.message);
  //                           }
  //                       },
  //                       error: function (result) {
  //                           alert("服务器异常！");
  //                       }
  //                   });
  //
  //
  //                   $('#plateNumber').text(obj.plateNumber);//车牌号
  //                   $('#transportTelephone').text(obj.transportTelephone);//运输公司联系方式
  //               }
  //               if (obj.selfEmployed == true) {//说明不是自运单位
  //                   $('#transport').text("");//运输公司
  //                   $('#plateNumber').text("");//车牌号
  //                   $('#transportTelephone').text("");//运输公司联系方式
  //               }
  //               //赋值产废单位联系人
  //               if (obj.client != null) {
  //                   $('#proContactName').text(obj.client.contactName);
  //               }
  //               if (obj.client != null) {
  //                   if (obj.client.phone != '') {
  //                       //赋值产废单位电话
  //                       $('#proTelephone').text(obj.client.phone);
  //                   }
  //                   else {
  //                       $('#proTelephone').text(obj.client.mobile);
  //                   }
  //
  //               }
  //
  //               //赋值是否自运单位
  //               $('#selfEmployed').prop('checked', obj.selfEmployed);
  //               //产废公司
  //               if (obj.client != null) {
  //                   $('#proWasteCompany').text(obj.client.companyName);
  //               }
  //               //库容
  //               if (obj.client != null) {
  //                   $('#capacity').text(obj.client.capacity.toFixed(2));
  //               }
  //               if(obj.stockItemList!=null){
  //                   var tr = $("#cloneTr1");
  //
  //                   tr.children('td').eq(6).html("")
  //                   tr.children('td').eq(7).html("")
  //                   tr.siblings().remove();
  //                   $.each(obj.stockItemList, function (index, item) {
  //                       var obj=eval(item);
  //                       // 克隆tr，每次遍历都可以产生新的tr
  //                       var clonedTr = tr.clone();
  //                       clonedTr.show();
  //                       // 循环遍历cloneTr的每一个td元素，并赋值
  //                       clonedTr.children("td").each(function (inner_index) {
  //                           //1生成领料单号
  //                           var obj = eval(item);
  //                           // 根据索引为部分td赋值
  //                           switch (inner_index) {
  //                               // 序号
  //                               case (0):
  //                                   $(this).html(index+1);
  //                                   break;
  //                               // 危险废物的名称
  //                               case (1):
  //                                   $(this).html(obj.wastesName);
  //                                   break;
  //                               // 危废编码
  //                               case (2):
  //                                   $(this).html(obj.wastesCode);
  //                                   break;
  //                               // 数量(公斤)
  //                               case (3):
  //                                   $(this).html(obj.number.toFixed(3));
  //                                   break;
  //                               // 成分
  //                               case (4):
  //
  //                                   $(this).html(obj.content);
  //                                   break;
  //                               // 备注
  //                               case (5):
  //                                   $(this).html(obj.remarks);
  //                                   break;
  //                               //进料方式
  //                               case (6):
  //
  //                                   if(obj.handleCategoryItem!=null){
  //                                       $(this).html(obj.handleCategoryItem.dictionaryItemName)
  //                                   }
  //
  //
  //                                   break;
  //                               //处置意见
  //                               case (7):
  //                                   $(this).html(obj.disposalAdvice);
  //                                   break;
  //                               //明细编号
  //                               case (8):
  //                                   $(this).html(obj.id);
  //                                   break;
  //                           }
  //                       });
  //                       // 把克隆好的tr追加到原来的tr前面
  //                       clonedTr.removeAttr("id");
  //                       clonedTr.insertBefore(tr);
  //
  //
  //                   });
  //                   // 隐藏无数据的tr
  //                   tr.hide();
  //                   tr.removeAttr('class');
  //
  //               }
  //
  //           } else {
  //               alert(result.message);
  //               $("#modal3_contactName").text("");
  //               $("#modal3_contractState").text("");
  //               $("#modal3_contractVersion").text("");
  //               $("#modal3_companyName").text("");
  //               $("#modal3_contactName").text("");
  //               $("#modal3_contractId").text("");
  //               $("#modal3_beginTime").text("");
  //               $("#modal3_endTime").text("");
  //               $("#modal3_area").text("");
  //               $("#modal3_telephone").text("");
  //               $("#modal3_order").text("");
  //           }
  //       },
  //       error: function (result) {
  //           console.log(result);
  //       }
  //   });
    $('#approval').modal('show');//出现第一个模态框
}

//审批界面和驳回界面
function showApproval() {
    $('#contractInfoForm3').modal('show');
}

function showBack() {
    $('#contractInfoForm4').modal('show');
}

//把按钮功能分出来做这个是审批
function confirm1(id) {
    opinion = $('#opinion').val();
    //console.log(opinion);
    //1获取文本框的值
    $.ajax({
        type: "POST",
        url: "approvalStock",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'stockId': id, 'opinion': opinion},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
            }
            else {
                alert("审批失败")
            }
            location.reload();
        },
        error: function (result) {
            alert("服务器异常！")
        }

    });
}

//把按钮功能分出来做这个是驳回
function back1(id) {
    backContent = $('#backContent').val();
    //设置状态驳回
    $.ajax({
        type: "POST",
        url: "backStock",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'stockId': id, 'backContent': backContent},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // alert(result.message);
            }
            else {
                alert(result.message)
            }
            location.reload();
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

function re1() {
    $('.newLine').remove();
}

//根据下拉框获取客户信息
function getClentInfo(item) {
    var clientId = $(item).selectpicker('val');
    console.log(clientId);
    //根据客户编号获得客户信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientByClientId",              // url
        data: {'clientId': clientId},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                //1赋值产废单位联系人 产废联系人电话
                $('#proContactName').val(result.data.contactName);
                if (result.data.phone != '') {
                    $('#proTelephone').val(result.data.phone);
                }
                else {
                    $('#proTelephone').val(result.data.mobile);
                }
                //赋值库存明细
                if(result.quotationItemData!=null){
                    // 获取id为cloneTr的tr元素
                    var tr = $("#cloneTr1");
                    tr.siblings().remove();
                    $.each(result.quotationItemData, function (index, item) {
                        // 克隆tr，每次遍历都可以产生新的tr
                        var clonedTr = tr.clone();
                        clonedTr.attr('class', 'myclass');
                        clonedTr.show();
                        var _index = index;
                        // 循环遍历cloneTr的每一个td元素，并赋值
                        clonedTr.children("td").each(function (inner_index) {
                            var obj = eval(item);
                            // 根据索引为部分td赋值
                            switch (inner_index) {
                                // 库存编号
                                case (0):
                                    $(this).html(index+1);
                                    break;
                                // 危险废物的名称
                                case (1):
                                        $(this).html(obj.wastesName);
                                    break;
                                // 危废编码(类别)
                                case (2):

                                            $(this).html(obj.wastesCode);

                                    break;
                                // 数量(公斤)
                                case (3):
                                    $(this).html(obj.contractAmount.toFixed(2));
                                    break;
                                // 成分
                                case (4):

                                    break;
                                // 公司联系电话
                                case (5):
                                        $(this).html(obj.remarks);
                                    break;
                                    //编号
                                case (6):
                                    $(this).html(obj.quotationItemId);
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

            }
            else {

                alert(result.message);

            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
}

/**
 * 根据运输方的下拉框自动带入电话
 */
function findSupplier() {
    //根据供应商编号查询电话
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSupplierListById",                  // url
        data: {'supplierId': $("#transport option:selected").val()},
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //console.log(result);
                var obj = eval(result.supplier);
                console.log(obj);
                if (obj != null) {
                    if (obj.phone != '') {
                        $('#transportTelephone').val(obj.phone);
                    }
                    else if (obj.phone == '') {
                        $('#transportTelephone').val(obj.mobile);
                    }
                    else {
                        $('#transportTelephone').val('');
                    }

                }

            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
}


//完善
function perfect(item) {
    //查看页面 审批隐藏 打印显示 驳回隐藏
    $('#btn').hide();//审批隐藏
    $('#print').hide();//打印隐藏
    //完善显示
    $('#back').hide();
    $('#perfect').show();
    //申报编号
    var stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;

   $('#stockId').html(stockId)

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getStockById",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'stockId': stockId
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result.stock);
                var obj = result.stock;
                //1赋值
                //产废单位联系人
                if (obj.selfEmployed == false) {//说明不是自运单位

                    //根据运输供应商赋值
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getSupplierListById",                  // url
                        data: {'supplierId': obj.transport},
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        //contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            if (result != undefined && result.status == "success") {
                                //console.log(result);
                                var obj = eval(result.supplier);
                                console.log(obj);
                                if (obj != null) {
                                    $('#transport').text(obj.companyName);//运输公司

                                }

                            }
                            else {
                                alert(result.message);
                            }
                        },
                        error: function (result) {
                            alert("服务器异常！");
                        }
                    });


                    $('#plateNumber').text(obj.plateNumber);//车牌号
                    $('#transportTelephone').text(obj.transportTelephone);//运输公司联系方式
                }
                if (obj.selfEmployed == true) {//说明不是自运单位
                    $('#transport').text("");//运输公司
                    $('#plateNumber').text("");//车牌号
                    $('#transportTelephone').text("");//运输公司联系方式
                }
                //赋值产废单位联系人
                if (obj.client != null) {
                    $('#proContactName').text(obj.client.contactName);
                }
                if (obj.client != null) {
                    if (obj.client.phone != '') {
                        //赋值产废单位电话
                        $('#proTelephone').text(obj.client.phone);
                    }
                    else {
                        $('#proTelephone').text(obj.client.mobile);
                    }

                }
                //库容
                if (obj.client != null) {
                    $('#capacity').text(obj.client.capacity.toFixed(2));
                }

                //赋值是否自运单位
                $('#selfEmployed').prop('checked', obj.selfEmployed);
                //产废公司
                if (obj.client != null) {
                    $('#proWasteCompany').text(obj.client.companyName);
                }

                if(obj.stockItemList!=null){
                    var tr = $("#cloneTr1");

                       var input="<input class='form-control'>"
                      tr.children('td').eq(7).html(input);

                    tr.siblings().remove();
                    $.each(obj.stockItemList, function (index, item) {
                        var obj=eval(item);
                        // 克隆tr，每次遍历都可以产生新的tr
                        var clonedTr = tr.clone();
                        clonedTr.show();
                        clonedTr.attr('class','myclass2')
                        // 循环遍历cloneTr的每一个td元素，并赋值
                        clonedTr.children("td").each(function (inner_index) {
                            //1生成领料单号
                            var obj = eval(item);
                            // 根据索引为部分td赋值
                            switch (inner_index) {
                                // 序号
                                case (0):
                                    $(this).html(index+1);
                                    break;
                                // 危险废物的名称
                                case (1):
                                    $(this).html(obj.wastesName);
                                    break;
                                // 危废编码
                                case (2):
                                    $(this).html(obj.wastesCode);
                                    break;
                                // 数量(公斤)
                                case (3):
                                    $(this).html(obj.number.toFixed(3));
                                    break;
                                // 成分
                                case (4):

                                    $(this).html(obj.content);
                                    break;
                                // 备注
                                case (5):
                                    $(this).html(obj.remarks);
                                    break;
                                    //进料方式
                                case (6):
                                    var select="<select class='focus'></select>"
                                    $(this).html(select);
                                    $.ajax({
                                        type: "POST",                       // 方法类型
                                        url: "getHandleCategoryByDataDictionary",         // url
                                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                                        dataType: "json",
                                        contentType: 'application/json;charset=utf-8',
                                        success: function (result) {
                                            if (result != undefined) {
                                                var data = eval(result);
                                                //处理类别
                                                var handleCategory = $(clonedTr).children('td').eq(6).find('select');
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
                                    })

                                        if(obj.handleCategoryItem!=null){
                                            $(this).find('select').val(obj.handleCategoryItem.dataDictionaryItemId)
                                        }
                                        // else {
                                        //     $(this).find('select').get(0).selectedIndex=-1;
                                        // }
                                    break;
                                    //处置意见
                                case (7):
                                    $(this).find('input').val(obj.disposalAdvice);
                                    break;
                                    //明细编号
                                case (8):
                                    $(this).html(obj.id);
                                    break;
                            }
                        });
                        // 把克隆好的tr追加到原来的tr前面
                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);


                    });
                    // 隐藏无数据的tr
                    tr.hide();
                    tr.removeAttr('class');

                }

            } else {
                alert(result.message);
                $("#modal3_contactName").text("");
                $("#modal3_contractState").text("");
                $("#modal3_contractVersion").text("");
                $("#modal3_companyName").text("");
                $("#modal3_contactName").text("");
                $("#modal3_contractId").text("");
                $("#modal3_beginTime").text("");
                $("#modal3_endTime").text("");
                $("#modal3_area").text("");
                $("#modal3_telephone").text("");
                $("#modal3_order").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#stockInfoForm').modal('show');
    localStorage.clear();
}


//确认完善
function showPerfect() {
 var index=0;
    $('.myclass2').each(function () {
        var dataItem={
             handleCategoryItem:{dataDictionaryItemId:$(this).children('td').eq(6).find('select').val()},
             disposalAdvice:$(this).children('td').eq(7).find('input').val(),
            id:$(this).children('td').eq(8).html(),
        }
        console.log(dataItem);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "perfectStockItem",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
           data:JSON.stringify(dataItem),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success") {
                    index++;
                    if(index==$('.myclass2').length){
                        alert(result.message);
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
                        $('#stockInfoForm').modal('hide');
                    }

                }
                else {
                    alert(result.message);
                }

                },
            error:function (result) {
                alert(result.message);

            }
        })
    })




}

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(submitStock.name);
    initApprovalFName(confirm1.name);
    initBakcFName(back1.name);
    var id=$(item).parent().parent().children("td").eq(1).html();
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

//打印
function print() {
    //打印模态框
    $("#footer").hide();
    $("#stockInfoForm").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: true
    });
}