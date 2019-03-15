/*次生合同脚本*/

/***
 * 危废合同页面脚本文件
 * */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**********************客户部分**********************/
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
            url: "loadPageDeriveContractListCount",                  // url
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
            url: "searchDeriveContractCount",                  // url
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
    setDeriveContractList(result);
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
    var page = {};
    addPageClass(pageNumber);           // 设置页码标蓝
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
            url: "loadPageDeriveContractList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setDeriveContractList(result);
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
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchDeriveContract",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setDeriveContractList(result);
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
                url: "loadPageDeriveContractList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setDeriveContractList(result);
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
                url: "searchDeriveContract",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setDeriveContractList(result);
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
function loadPageDeriveContractList() {
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchDeriveContract();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageDeriveContractList",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    setPageClone(result);
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
        isSearch = false;
    }
}

/**设置合同数据
 * @param result
 */
function setDeriveContractList(result) {
    //console.log(eval(result));//可以取到
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr1");//克隆一行
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var obj = eval(item);
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class', 'myclass1');
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 合同编号
                case (1):
                    $(this).html(obj.contractId);
                    break;
                //处置单位名称
                case (2):
                    if(obj.client!=null){
                        $(this).html(obj.client.companyName);
                    }
                    break;
                // 合同名称
                case (3):
                    $(this).html(obj.contractName);
                    break;

                // 联系人
                case (4):
                    $(this).html(obj.contactName);
                    break;
                // 联系方式
                case (5):
                    $(this).html(obj.telephone);
                    break;
                // 签订日期
                case (6):
                    if (obj.beginTime != null) {
                        var time = gettime(obj.beginTime);
                        $(this).html(time);
                    }
                    break;
                // 截至日期
                case (7):
                    if (obj.endTime != null) {
                        var time = gettime(obj.endTime);
                        $(this).html(time);
                    }
                    break;
                case (8):{
                    if(obj.small=="false"||obj.small==false){
                        $(this).html("不是");
                    }
                    if(obj.small=="true"||obj.small==true){
                        $(this).html("是");
                    }

                    break;
                }
                //录入人
                case (9):
                    $(this).html(obj.reviewer);
                    break;
                // 状态
                case (10):
                    if (obj.checkStateItem != null){
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                        // if(obj.checkStateItem.dictionaryItemName=='已作废'){
                        //     $(this).parent().hide();
                        // }
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
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {

    // 设置审批状态
    $.ajax({
        type: "POST",
        url: "getCheckStateDataByDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
    // 设置客户状态
    $.ajax({
        type: "POST",
        url: "getClientStateByDataDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var clientState = $("#search-clientState");
                clientState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    clientState.append(option);
                });
                clientState.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
    // 设置申请状态
    $.ajax({
        type: "POST",
        url: "getApplicationStatusByDataDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var applicationStatus = $("#search-applicationStatus");
                applicationStatus.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    applicationStatus.append(option);
                });
                applicationStatus.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });
    // 设置客户状态
    $.ajax({
        type: "POST",
        url: "getClientTypeDataByDictionary",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var clientType = $("#search-clientType");
                clientType.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    clientType.append(option);
                });
                clientType.get(0).selectedIndex = -1;
            } else {
                console.log(result.message);
            }
        }, error: function (result) {
            console.log(result);
        }
    });

}


/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchDeriveContract();      //
    }
}
/**
 * 查找客户
 */
function searchDeriveContract() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        var small;
        if($('#smallContract').prop("checked")){
            small=1;
        }
        else {
            small=0;
        }
        data = {
            quotationItemList:[{wastesName:$.trim($("#search-wastesName").val())}],
            client:{companyName:$.trim($("#search-companyName").val()),contactName:$.trim($("#search-contactName").val())} ,
            checkStateItem:{dataDictionaryItemId:$("#search-checkState").val()},
            beginTime:$("#beginTime").val(),
            endTime:$("#endTime").val(),
            small:small,
            page: page,
            keyword:'',
        };
        console.log(data);
        // 模糊查询
    } else {
        var keyword=$.trim($("#searchContent").val());
        if(keyword=="是"){
            keyword=true;
        }
        if(keyword=="不是"){
            keyword=false;
        }
        data = {
            keyword: keyword,
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchDeriveContract",                  // url
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

}

/**
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchDeriveContract();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchDeriveContract();      //
            }
        },400);
    });
});






//新增按钮跳转
function addContract() {
    localStorage.contractType="Derive"
    window.location.href="wastesContractInfo.html"

}

/**
 * 新审批
 */
function approval(item) {
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

