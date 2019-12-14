var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**
 *查询报价单
 * */
function searchQuotation() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
                quotationId: $("#search-quotationId").val(),//报价单编号
                client:{
                    contactName:$("#search-client").val(),
                    phone:$("#search-state").val(),
                    location: $("#search-author").val(),
                    companyName:$("#search-time").val()
                } ,//联系人//联系方式
                endDate: $("#search-endDate").val(),//产废单位联系电话
                name: $("#search-name").val(),//报价单名称
                version: $("#search-version").val(),//版本号
                checkState: $("#search-checkState").val(),//审核状态
                page: page

        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
        console.log(data);
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchQuotation",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
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
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setQuotationList(result);
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

/**
 * 返回count值
 * */
function countValue(){
    var mySelect=document.getElementById("count");
    var index=mySelect.selectedIndex;
    return mySelect.options[index].text;
}
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "totalQuotationRecord",                  // url
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
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
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
    $("#current").find("a").text("当前页："+pageNumber);
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
    if(pageNumber > 1){
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if(pageNumber < totalPage()){
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageQuotationList",         // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined) {
                setQuotationList(result);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页："+pageNumber);
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
        if(pageNumber > 1){
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if(pageNumber < totalPage()){
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageQuotationList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    setQuotationList(result);
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

/**
 * 分页 获取首页内容
 * */
function loadPageQuotationList() {
    loadNavigationList();   // 动态菜单加载
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageQuotationList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSeniorSelectedList();
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function setQuotationList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 报价单编号
                case (1):
                    $(this).html(obj.quotationId);
                    break;
                case (2):
                    $(this).html(obj.name);
                    break;
                // 联系人
                case (3):
                    $(this).html(obj.version);
                    break;
                // 客户名称
                case (4):
                    $(this).html(obj.client.companyName);
                    break;
                // 联系人
                case (5):
                    $(this).html(obj.client.contactName);
                    break;
                // 联系方式
                case (6):
                    $(this).html(obj.client.phone);
                    break;
                // 所属区域
                case (7):
                    $(this).html(obj.client.location);
                    break;
                // 报价单状态
                case (8):
                    if (obj.checkState != null)
                        $(this).html(obj.checkState.name);
                    break;
                // 到期日期
                case (9):
                    $(this).html(getTimeStr(obj.endDate));
                    break;
                case (11):
                    $(this).html(obj.id);
                    break;
                case (12):
                // if(obj.checkState.name == "待审批"){
                //     $(this).children().eq(1).attr("class","disabled");
                //     $(this).children().eq(1).removeAttr("onclick");
                //     $(this).children().eq(2).attr("class","disabled");
                //     $(this).children().eq(2).removeAttr("onclick");
                // }else if(obj.checkState.name == "审批中"){
                //     $(this).children().eq(1).attr("class","disabled");
                //     $(this).children().eq(1).removeAttr("onclick");
                //     $(this).children().eq(2).attr("class","disabled");
                //     $(this).children().eq(2).removeAttr("onclick");
                //     $(this).children().eq(3).attr("class","disabled");
                //     $(this).children().eq(3).removeAttr("onclick");
                // }else if(obj.checkState.name == "生效中"){
                //     $(this).children().eq(3).attr("class","disabled");
                //     $(this).children().eq(3).removeAttr("onclick");
                // }else if(obj.checkState.name == "已失效"){
                //     $(this).children().eq(1).attr("class","disabled");
                //     $(this).children().eq(1).removeAttr("onclick");
                //     $(this).children().eq(3).attr("class","disabled");
                //     $(this).children().eq(3).removeAttr("onclick");
                // }else if(obj.checkState.name == "已作废"){
                //     $(this).children().eq(1).attr("class","disabled");
                //     $(this).children().eq(1).removeAttr("onclick");
                //     $(this).children().eq(2).attr("class","disabled");
                //     $(this).children().eq(2).removeAttr("onclick");
                //     $(this).children().eq(3).attr("class","disabled");
                //     $(this).children().eq(3).removeAttr("onclick");
                //     $(this).children().eq(4).attr("class","disabled");
                //     $(this).children().eq(4).removeAttr("onclick");
                // }
                // break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}
function loadQuotationList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listQuotation",           // url
        cache: false,
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            state: 'NotInvalid'
        },
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                setQuotationList(result);
            } else { }
        },
        error:function (result) {
            console.log(result);
        }
    });
}
//获取时间
function getTimeStr(obj) {
    if (obj == null) return "";
    var year=(parseInt(obj.year)+1900).toString();
    var mouth=parseInt((obj.month)+1).toString();
    if(mouth.length!=2){
        mouth=0+mouth;
    }
    //  dataLeftCompleting(2, "0", mouth.toString()).toString();
    var  day=parseInt((obj.date)).toString();
    //ataLeftCompleting(2, "0", day.toString()).toString();
    if(day.length!=2){
        day=0+day;
    }
    var time1=year+"-"+mouth+"-"+day;
    return time1;
}
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}
function setState() {
    var state = $("#state").val();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listQuotation",           // url
        cache: false,
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            state: state
        },
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                setQuotationList(result);
            } else { }
        },
        error:function (result) {
            console.log(result);
        }
    });
}

var quotationId;
function showLog() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getLog",                           // url
        async : false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    setDataList(result);
                    $('#logModal').modal('show');
                } else {
                    alert(data.message);
                }
            }
        },
        error:function (result) {
        }
    });
}
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var id = 1;
    var tr = $("#clonedTr2");
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(id++);
                    break;
                // 样品预约号
                case (1):
                    $(this).html(obj.username);
                    break;
                //样品状态
                case (2):
                    $(this).html(obj.ip);
                    break;
                // 公司名称
                case (3):
                    $(this).html(getTimeStr(obj.time));
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
}
/**
 * 查看报价单
 * @param e
 */
function viewQuotation(e) {
    var id = getQuotationId(e);
    window.location.href = "newQuotation.html?id=" + id + "&type=view";
}
/**
 * 修改报价单
 * @param e
 */
function adjustQuotation(e) {
    var id = getQuotationId(e);
    window.location.href = "newQuotation.html?id=" + id + "&type=adjust";
}

function levelUp(e) {
    var id = getQuotationId(e);
    window.location.href = "newQuotation.html?id=" + id + "&type=levelUp";
}

/**
 * 作废报价单
 */
function disabledQuotation(e) {
    var r = confirm("是否作废该报价单？");
    if (r == true) {
        var id = getQuotationId(e);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "setStateDisabled",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    var data = eval(result);
                    if (data.status == "success") {
                        alert(data.message);
                        window.location.reload();
                    } else {
                        alert(data.message);
                    }
                }
            },
            error: function (result) {
                var that = this;
                console.log(that.data);
                alert("服务器异常!");
            }
        });
    }
}
/**
 * 有效期窗口显示
 */
function showEndDate(e) {
    var id = getQuotationId(e);
    quotationId = id;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getQuotation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    $("#model-validity").val(getTimeStr(data.data.endDate));
                }
            }
        },
        error: function (result) {
            var that = this;
            console.log(that.data);
            alert("服务器异常!");
        }
    });
    $('#modalId').modal('show');
}
/**
 * 有效期变更
 */
function changeEndDate() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "changeEndDate",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: quotationId,
            endDate: $("#model-validity").val()
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var that = this;
            console.log(that.data);
            alert("服务器异常!");
        }
    });
}

/**
 * 获取报价单的编号
 * @param item
 * @returns {string}
 */
function getQuotationId(e) {
    return e.parentElement.nextElementSibling.innerHTML;
}

function getAdvice(){
    return document.getElementById("advice").value;
}

/**
 * 送审
 */
function examination(e){
    var id = getQuotationId(e);
    quotationId = id;
    $('#examinationModal').modal('show');//手动触发模态框弹出

}
/**
 * 审批通过
 *
 * */
function approval() {
    var advice=getAdvice();
    $.ajax({
        type: "POST",                            // 方法类型
        url: "approval",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: quotationId,
            advice:advice
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var that = this;
            console.log(that.data);
            alert("服务器异常!");
        }
    });
}
/**
 * 审批驳回
 * */
function reject() {
    var advice=getAdvice();
    $.ajax({
        type: "POST",                            // 方法类型
        url: "reject",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: quotationId,
            advice:advice
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }
        },
        error: function (result) {
            var that = this;
            console.log(that.data);
            alert("服务器异常!");
        }
    });
}

/**
 * 导出excel
 * @param e
 */
function exportExcel(e) {
    var name='t_quotation';
    var sqlWords= "select quotationId,name,version,client.companyName,t_quotation.contactName,t_quotation.phone,t_quotation.location,t_quotation.checkState,endDate FROM t_quotation join client where client.clientId = t_quotation.clientId";
    window.open('exportExcel?name='+name+'&sqlWords='+sqlWords);

}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change",function () {
        console.log("change");
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("tableName", 't_quotation');
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importExcel",              // url
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
                        window.location.reload();
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