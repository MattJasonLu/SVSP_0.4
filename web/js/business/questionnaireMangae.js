var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
var currentPage = 1;

//当前页数

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
        url: "totalQuestionnaireRecord",                  // url
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
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageQuestionnaireList",         // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined) {
                setQuestionnaireList(result);
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageQuestionnaireList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    setQuestionnaireList(result);
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
function loadPageQuestionnaireList() {
    loadNavigationList();   // 设置动态菜单
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
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchQuestionnaire();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageQuestionnaireList",          // url
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
    }
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
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}


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
var validator;
// 校验表单信息
$().ready(function () {
    validator = $("#model-appoint").validate({
        // 在失去焦点时验证
        onfocusout: function (element) {
            $(element).valid();
        },

        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        submitHandler: function (form) { //通过之后回调
            alert('通过');
        }
    });
});


function loadQuestionnaireList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listQuestionnaire",           // url
        cache: false,
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined && result.status == "success") {
                setQuestionnaireList(result);
            } else {
                // alert
                console.log(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
}

function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
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
/**
 * 增加原材料新行
 */
function addRawWasteNewLine() {
    var tr = $("#raw1").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    var temp = num-2+"";
    var temp2 = num-1+"";
    clonedTr.find("input[name='rawWastes[" + temp + "].mainMaterial']").attr('name', "rawWastes[" + temp2 + "].mainMaterial");
    clonedTr.find("input[name='rawWastes[" + temp + "].auxMaterial']").attr('name', "rawWastes[" + temp2 + "].auxMaterial");
    clonedTr.find("input[name='rawWastes[" + temp + "].draginMaterial']").attr('name', "rawWastes[" + temp2 + "].draginMaterial");
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}
/**
 * 增加原材料新行
 */
function addRawWasteNewLine2() {
    var tr = $("#raw2").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    var temp = num-1+"";
    var temp2 = num+"";
    clonedTr.find("input[name='rawWastes[" + temp + "].mainMaterial']").attr('name', "rawWastes[" + temp2 + "].mainMaterial");
    clonedTr.find("input[name='rawWastes[" + temp + "].auxMaterial']").attr('name', "rawWastes[" + temp2 + "].auxMaterial");
    clonedTr.find("input[name='rawWastes[" + temp + "].draginMaterial']").attr('name', "rawWastes[" + temp2 + "].draginMaterial");
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}
/**
 * 增加处理过程新行
 */
function addWasteProcessNewLine() {
    var tr = $("#body1").children().last();
//        console.log(tr);
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    var temp = num-1+"";
    var temp2 = num+"";
    clonedTr.find("input[name='wasteProcess[" + temp + "].code']").attr('name', "wasteProcess[" + temp2 + "].code");
    clonedTr.find("input[name='wasteProcess[" + temp + "].description']").attr('name', "wasteProcess[" + temp2 + "].description");
    clonedTr.find("input[name='wasteProcess[" + temp + "].quantity']").attr('name', "wasteProcess[" + temp2 + "].quantity");
    clonedTr.find("input[name='wasteProcess[" + temp + "].lastProcessTime']").attr('name', "wasteProcess[" + temp2 + "].lastProcessTime");
    clonedTr.find("input[name='wasteProcess[" + temp + "].yearQuantity']").attr('name', "wasteProcess[" + temp2 + "].yearQuantity");
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}
/**
 * 增加处理过程新行
 */
function addWasteProcessNewLine2() {
    var tr = $("#body2").children().last();
    console.log(tr);
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    var temp = num-2+"";
    var temp2 = num-1+"";
    clonedTr.find("input[name='wasteProcess[" + temp + "].code']").attr('name', "wasteProcess[" + temp2 + "].code");
    clonedTr.find("input[name='wasteProcess[" + temp + "].description']").attr('name', "wasteProcess[" + temp2 + "].description");
    clonedTr.find("input[name='wasteProcess[" + temp + "].quantity']").attr('name', "wasteProcess[" + temp2 + "].quantity");
    clonedTr.find("input[name='wasteProcess[" + temp + "].lastProcessTime']").attr('name', "wasteProcess[" + temp2 + "].lastProcessTime");
    clonedTr.find("input[name='wasteProcess[" + temp + "].yearQuantity']").attr('name', "wasteProcess[" + temp2 + "].yearQuantity");
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}
function addRow3() {
    var tr11 = $("#row3");
    var tr10 = tr11.prev();
    var tr9 = tr10.prev();
    var tr8 = tr9.prev();
    var tr7 = tr8.prev();
    var tr6 = tr7.prev();
    var tr5 = tr6.prev();
    var tr4 = tr5.prev();
    var tr3 = tr4.prev();
    var tr2 = tr3.prev();
    var tr1 = tr2.prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr1 = tr1.clone();
    var clonedTr2 = tr2.clone();
    var clonedTr3 = tr3.clone();
    var clonedTr4 = tr4.clone();
    var clonedTr5 = tr5.clone();
    var clonedTr6 = tr6.clone();
    var clonedTr7 = tr7.clone();
    var clonedTr8 = tr8.clone();
    var clonedTr9 = tr9.clone();
    var clonedTr10 = tr10.clone();
    var clonedTr11 = tr11.clone();
    // 获取编号
    var id = tr1.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr1.children().get(0).innerHTML = num;
    clonedTr1.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr2.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr3.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr4.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr5.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr6.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr7.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr8.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr9.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr10.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr11.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr1.addClass("newLine");
    clonedTr2.addClass("newLine");
    clonedTr3.addClass("newLine");
    clonedTr4.addClass("newLine");
    clonedTr5.addClass("newLine");
    clonedTr6.addClass("newLine");
    clonedTr7.addClass("newLine");
    clonedTr8.addClass("newLine");
    clonedTr9.addClass("newLine");
    clonedTr10.addClass("newLine");
    clonedTr11.addClass("newLine");
    clonedTr1.insertAfter(tr11);
    clonedTr2.insertAfter(clonedTr1);
    clonedTr3.insertAfter(clonedTr2);
    clonedTr4.insertAfter(clonedTr3);
    clonedTr5.insertAfter(clonedTr4);
    clonedTr6.insertAfter(clonedTr5);
    clonedTr7.insertAfter(clonedTr6);
    clonedTr8.insertAfter(clonedTr7);
    clonedTr9.insertAfter(clonedTr8);
    clonedTr10.insertAfter(clonedTr9);
    clonedTr11.insertAfter(clonedTr10);
    tr11.removeProp("id");
}
function addRow4() {
    var tr6 = $("#row4");
    var tr5 = tr6.prev();
    var tr4 = tr5.prev();
    var tr3 = tr4.prev();
    var tr2 = tr3.prev();
    var tr1 = tr2.prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr1 = tr1.clone();
    var clonedTr2 = tr2.clone();
    var clonedTr3 = tr3.clone();
    var clonedTr4 = tr4.clone();
    var clonedTr5 = tr5.clone();
    var clonedTr6 = tr6.clone();
    // 获取编号
    var id = tr1.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr1.children().get(0).innerHTML = num;
    clonedTr1.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr2.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr3.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr4.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr5.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr6.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr1.addClass("newLine");
    clonedTr2.addClass("newLine");
    clonedTr3.addClass("newLine");
    clonedTr4.addClass("newLine");
    clonedTr5.addClass("newLine");
    clonedTr6.addClass("newLine");
    clonedTr1.insertAfter(tr6);
    clonedTr2.insertAfter(clonedTr1);
    clonedTr3.insertAfter(clonedTr2);
    clonedTr4.insertAfter(clonedTr3);
    clonedTr5.insertAfter(clonedTr4);
    clonedTr6.insertAfter(clonedTr5);
    tr6.removeProp("id");
}
function addRow5() {
    var tr11 = $("#row5");
    var tr10 = tr11.prev();
    var tr9 = tr10.prev();
    var tr8 = tr9.prev();
    var tr7 = tr8.prev();
    var tr6 = tr7.prev();
    var tr5 = tr6.prev();
    var tr4 = tr5.prev();
    var tr3 = tr4.prev();
    var tr2 = tr3.prev();
    var tr1 = tr2.prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr1 = tr1.clone();
    var clonedTr2 = tr2.clone();
    var clonedTr3 = tr3.clone();
    var clonedTr4 = tr4.clone();
    var clonedTr5 = tr5.clone();
    var clonedTr6 = tr6.clone();
    var clonedTr7 = tr7.clone();
    var clonedTr8 = tr8.clone();
    var clonedTr9 = tr9.clone();
    var clonedTr10 = tr10.clone();
    var clonedTr11 = tr11.clone();
    // 获取编号
    var id = tr1.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr1.children().get(0).innerHTML = num;
    clonedTr1.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr2.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr3.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr4.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr5.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr6.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr7.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr8.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr9.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr10.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr11.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr1.addClass("newLine");
    clonedTr2.addClass("newLine");
    clonedTr3.addClass("newLine");
    clonedTr4.addClass("newLine");
    clonedTr5.addClass("newLine");
    clonedTr6.addClass("newLine");
    clonedTr7.addClass("newLine");
    clonedTr8.addClass("newLine");
    clonedTr9.addClass("newLine");
    clonedTr10.addClass("newLine");
    clonedTr11.addClass("newLine");
    clonedTr1.insertAfter(tr11);
    clonedTr2.insertAfter(clonedTr1);
    clonedTr3.insertAfter(clonedTr2);
    clonedTr4.insertAfter(clonedTr3);
    clonedTr5.insertAfter(clonedTr4);
    clonedTr6.insertAfter(clonedTr5);
    clonedTr7.insertAfter(clonedTr6);
    clonedTr8.insertAfter(clonedTr7);
    clonedTr9.insertAfter(clonedTr8);
    clonedTr10.insertAfter(clonedTr9);
    clonedTr11.insertAfter(clonedTr10);
    tr11.removeProp("id");
}
function addRow6() {
    var tr6 = $("#row6");
    var tr5 = tr6.prev();
    var tr4 = tr5.prev();
    var tr3 = tr4.prev();
    var tr2 = tr3.prev();
    var tr1 = tr2.prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr1 = tr1.clone();
    var clonedTr2 = tr2.clone();
    var clonedTr3 = tr3.clone();
    var clonedTr4 = tr4.clone();
    var clonedTr5 = tr5.clone();
    var clonedTr6 = tr6.clone();
    // 获取编号
    var id = tr1.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr1.children().get(0).innerHTML = num;
    clonedTr1.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr2.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr3.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr4.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr5.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr6.find("input[name^='deriveWastesList'],select[name^='deriveWastesList']").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/deriveWastesList\[[0-9]\d*/, "deriveWastesList[" + id);
        $(this).attr('name', newName);
    });
    clonedTr1.addClass("newLine");
    clonedTr2.addClass("newLine");
    clonedTr3.addClass("newLine");
    clonedTr4.addClass("newLine");
    clonedTr5.addClass("newLine");
    clonedTr6.addClass("newLine");
    clonedTr1.insertAfter(tr6);
    clonedTr2.insertAfter(clonedTr1);
    clonedTr3.insertAfter(clonedTr2);
    clonedTr4.insertAfter(clonedTr3);
    clonedTr5.insertAfter(clonedTr4);
    clonedTr6.insertAfter(clonedTr5);
    tr6.removeProp("id");
}
/**
/**
 * 查询问卷
 */
function searchQuestionnaire() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            questionnaireId: $("#search-questionnaireId").val(),//
            client:{
                companyName:$("#search-companyName").val(),
                industry:$("#search-industry").val(),
                product:$("#search-product").val(),
            } ,
            applyState: $("#search-state").val(),
            author: $("#search-author").val(),
            time:$("#search-time").val(),
            page: page,

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
        url: "searchQuestionnaireManage",                  // url
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


    // var keyword = $("#searchContent").val();
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "searchQuestionnaire",                  // url
    //     async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     data: {
    //         'keyword': keyword
    //     },
    //     dataType: "json",
    //     success: function (result) {
    //         console.log(result);
    //         if (result != undefined) {
    //             setQuestionnaireList(result);
    //         } else { }
    //     },
    //     error:function (result) {
    //         console.log(result);
    //     }
    // });
}
/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setQuestionnaireList(result);
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
function setQuestionnaireList(result) {
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
                // 调查表编号
                case (1):
                    $(this).html(obj.questionnaireId);
                    break;
                // 企业名称
                case (2):
                    if (obj.client != null) $(this).html(obj.client.companyName);
                    break;
                // 所属行业
                case (3):
                    if (obj.client != null) $(this).html(obj.client.industry);
                    break;
                // 主要产品
                case (4):
                    if (obj.client != null) $(this).html(obj.client.product);
                    break;
                // 审批状态
                case (5):
                    if (obj.checkStateItem != null)
                        $(this).html(obj.checkStateItem.dictionaryItemName);
                    break;
                // 填报人
                case (6):
                    $(this).html(obj.author);
                    break;
                // 填报日期
                case (7):
                    $(this).html(getTimeStr(obj.time));
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "applyStateList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var applyState = $("#search-state");
                applyState.children().remove();
                $.each(data.ApplyStateList, function (index, item) {
                    if (item.index >= 1 && item.index <=3 || item.index == 8) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        applyState.append(option);
                    }
                });
                applyState.get(0).selectedIndex = -1;
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
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchQuestionnaire();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchQuestionnaire();      //
            }
        },400);
    });
});


$("#examineBtn1").click(
    function () {
        $("#approval").modal('show');
    }
);

$('#embed').load('embed/loginLogModal.html');
/**
 * 聚焦输入框
 * @param e
 */
function focusInput(e) {
    // console.log("you click the td!");
    e.firstChild.focus();
}
function clearQuestionnaire() {
    $.ajax({
        type: 'POST',
        url: 'client/clearCurrentQuestionnaire',
        async: false,
        dataType: 'json',
        success: function (result) {
            console.log("信息清空");
        },
        error: function (result) {
            console.log("清空失败");
        }
    });
}
/**
 * 获取编号
 * @param item
 * @returns {string}
 */
function getQuestionnaireId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
function getCompanyName(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
}
// function viewQuestionnaire(item) {
//     var id = getQuestionnaireId(item);
//     $(location).attr('href', 'questionnaire1.html?questionnaireId='+id+'&type=view');
// }
function resetViewInfo() {
    $("#appointModal1").find("input:text").val("");
    $("#appointModal1").find("input:radio").removeAttr("checked");
    $("#appointModal1").find("input:checkbox:checked").removeAttr("checked");
    $("#appointModal2").find("input:text").val("");
    $("#appointModal2").find("input:radio").removeAttr("checked");
    $("#appointModal2").find("input:checkbox:checked").removeAttr("checked");
    $("#Opinion").find("input:text").val("");
    $("#Opinion").find("input:radio").removeAttr("checked");
    $(".newLine").remove();
}
function viewQuestion(item){
    var id = getQuestionnaireId(item);
    resetViewInfo();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getQuestionnaireById",               // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'questionnaireId': id
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                $("#model-questionnaireId2").val(id);
                $("#model-companyName2").val(data.data.client.companyName);
                $("#model-contactName2").val(data.data.client.contactName);
                $("#model-industry2").val(data.data.client.industry);
                $("#model-author2").val(data.data.author);
                $("#model-location2").val(data.data.client.location);
                $("#model-phone2").val(data.data.client.phone);
                $("#model-product2").val(data.data.client.product);
                $("#model-time2").val(getTimeStr(data.data.time));
                for (var i = 0; i < data.data.rawWastesList.length; i++) {
                    if (i > 0) addRawWasteNewLine();
                    var $i = i;
                    $("input[name='rawWastes[" + $i + "].mainMaterial']").val(data.data.rawWastesList[i].mainMaterial);
                    $("input[name='rawWastes[" + $i + "].auxMaterial']").val(data.data.rawWastesList[i].auxMaterial);
                    $("input[name='rawWastes[" + $i + "].draginMaterial']").val(data.data.rawWastesList[i].draginMaterial);
                }
                for (var i = 0; i < data.data.wasteInclusionTypeList.length; i++) {
                    var $i = data.data.wasteInclusionTypeList[i].index;
                    $("input[name='wasteInclusionTypeList'][value='" + $i + "']").prop("checked", true);
                }
                for (var i = 0; i < data.data.wasteProcessList.length; i++) {
                    if (i > 0) addWasteProcessNewLine();
                    var $i = i;
                    $("input[name='wasteProcess[" + $i + "].code']").val(data.data.wasteProcessList[i].code);
                    $("input[name='wasteProcess[" + $i + "].description']").val(data.data.wasteProcessList[i].description);
                    $("input[name='wasteProcess[" + $i + "].quantity']").val(data.data.wasteProcessList[i].quantity);
                    $("input[name='wasteProcess[" + $i + "].lastProcessTime']").val(getTimeStr(data.data.wasteProcessList[i].lastProcessTime));
                    $("input[name='wasteProcess[" + $i + "].yearQuantity']").val(data.data.wasteProcessList[i].yearQuantity);
                }
                for (var i = 0; i < data.data.deriveWastesList.length; i++) {
                    if (i > 0) {
                        addRow5();
                        addRow6();
                    }
                    var $i = i;
                    $("input[name='deriveWastesList[" + $i + "].name']").val(data.data.deriveWastesList[i].name);
                    $("input[name='deriveWastesList[" + $i + "].code']").val(data.data.deriveWastesList[i].code);
                    $("input[name='deriveWastesList[" + $i + "].formType']").val(data.data.deriveWastesList[i].formType != null ? data.data.deriveWastesList[i].formType.name : "");
                    $("input[name='deriveWastesList[" + $i + "].isMixture'][value='" + data.data.deriveWastesList[i].isMixture + "']").prop("checked", true);
                    $("input[name='deriveWastesList[" + $i + "].formTypeDetail']").val(data.data.deriveWastesList[i].formTypeDetail);
                    $("input[name='deriveWastesList[" + $i + "].smellType']").val(data.data.deriveWastesList[i].smellType != null ? data.data.deriveWastesList[i].smellType.name : "");
                    $("input[name='deriveWastesList[" + $i + "].smellTypeDetail']").val(data.data.deriveWastesList[i].smellTypeDetail);
                    $("input[name='deriveWastesList[" + $i + "].solubility']").val(data.data.deriveWastesList[i].solubility != null ? data.data.deriveWastesList[i].solubility.name : "");
                    $("input[name='deriveWastesList[" + $i + "].solubilityDetail']").val(data.data.deriveWastesList[i].solubilityDetail);
                    $("input[name='deriveWastesList[" + $i + "].isLowTemp'][value='" + data.data.deriveWastesList[i].isLowTemp + "']").prop("checked", true);
                    $("input[name='deriveWastesList[" + $i + "].lowTemp']").val(data.data.deriveWastesList[i].lowTemp);
                    $("input[name='deriveWastesList[" + $i + "].solubleTemp']").val(data.data.deriveWastesList[i].solubleTemp);
                    for (var j = 0; j < data.data.deriveWastesList[i].mixingElementList.length; j++) {
                        var $j = j;
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].name']").val(data.data.deriveWastesList[i].mixingElementList[j].name);
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].minimum']").val(data.data.deriveWastesList[i].mixingElementList[j].minimum);
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].average']").val(data.data.deriveWastesList[i].mixingElementList[j].average);
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].maximum']").val(data.data.deriveWastesList[i].mixingElementList[j].maximum);
                    }
                    for (var j = 0; j < data.data.deriveWastesList[i].sensitiveElementList.length; j++) {
                        var $j = data.data.deriveWastesList[i].sensitiveElementList[j].chemicalType.index-1;
                        $("input[name='deriveWastesList[" + $i + "].sensitiveElementList[" + $j + "].chemicalType']").prop("checked", true);
                        $("input[name='deriveWastesList[" + $i + "].sensitiveElementList[" + $j + "].isOrganic'][value='" + data.data.deriveWastesList[i].sensitiveElementList[j].isOrganic + "']").prop("checked", true);
                    }
                    for (var j = 0; j < data.data.deriveWastesList[i].wasteCharacterList.length; j++) {
                        var $j = data.data.deriveWastesList[i].wasteCharacterList[j].index-1;
                        $("input[name='deriveWastesList[" + $i + "].wasteCharacterList[" + $j + "]']").prop("checked", true);
                    }
                    for (var j = 0; j < data.data.deriveWastesList[i].wasteProtectList.length; j++) {
                        var $j = data.data.deriveWastesList[i].wasteProtectList[j].index-1;
                        $("input[name='deriveWastesList[" + $i + "].wasteProtectList[" + $j + "]']").prop("checked", true);
                    }
                    $("input[name='deriveWastesList[" + $i + "].eyeMeasures']").val(data.data.deriveWastesList[i].eyeMeasures);
                    $("input[name='deriveWastesList[" + $i + "].skinMeasures']").val(data.data.deriveWastesList[i].skinMeasures);
                    $("input[name='deriveWastesList[" + $i + "].swallowMeasures']").val(data.data.deriveWastesList[i].swallowMeasures);
                    $("input[name='deriveWastesList[" + $i + "].suctionMeasures']").val(data.data.deriveWastesList[i].suctionMeasures);
                    $("input[name='deriveWastesList[" + $i + "].putOutFireMeasures']").val(data.data.deriveWastesList[i].putOutFireMeasures);
                    $("input[name='deriveWastesList[" + $i + "].leakMeasures']").val(data.data.deriveWastesList[i].leakMeasures);
                }
//                    setTimeout("$('#appointModal2').modal('show');", 3000);
                // 显示框体
                $('#appointModal2').modal('show');
            } else { }
        },
        error:function (result) {
            console.log(result);
        }
    });
}


var queId;
/**
 * 审批
 */
function viewQuestionnaire(item) {
    var id = getQuestionnaireId(item);
    queId = id;
    resetViewInfo();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getQuestionnaireById",               // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'questionnaireId': id
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                $("#model-questionnaireId3").val(id);
                $("#model-companyName3").val(data.data.client.companyName);
                $("#model-contactName3").val(data.data.client.contactName);
                $("#model-industry3").val(data.data.client.industry);
                $("#model-author3").val(data.data.author);
                $("#model-location3").val(data.data.client.location);
                $("#model-phone3").val(data.data.client.phone);
                $("#model-product3").val(data.data.client.product);
                $("#model-time3").val(getTimeStr(data.data.time));

                for (var i = 0; i < data.data.rawWastesList.length; i++) {
                    if (i > 0) addRawWasteNewLine2();
                    var $i = i;
                    $("input[name='rawWastes[" + $i + "].mainMaterial']").val(data.data.rawWastesList[i].mainMaterial);
                    $("input[name='rawWastes[" + $i + "].auxMaterial']").val(data.data.rawWastesList[i].auxMaterial);
                    $("input[name='rawWastes[" + $i + "].draginMaterial']").val(data.data.rawWastesList[i].draginMaterial);
                }
                for (var i = 0; i < data.data.wasteInclusionTypeList.length; i++) {
                    var $i = data.data.wasteInclusionTypeList[i].index;
                    $("input[name='wasteInclusionTypeList2'][value='" + $i + "']").prop("checked", true);
                }
                for (var i = 0; i < data.data.wasteProcessList.length; i++) {
                    if (i > 0) addWasteProcessNewLine2();
                    var $i = i;
                    $("input[name='wasteProcess[" + $i + "].code']").val(data.data.wasteProcessList[i].code);
                    $("input[name='wasteProcess[" + $i + "].description']").val(data.data.wasteProcessList[i].description);
                    $("input[name='wasteProcess[" + $i + "].quantity']").val(data.data.wasteProcessList[i].quantity);
                    $("input[name='wasteProcess[" + $i + "].lastProcessTime']").val(getTimeStr(data.data.wasteProcessList[i].lastProcessTime));
                    $("input[name='wasteProcess[" + $i + "].yearQuantity']").val(data.data.wasteProcessList[i].yearQuantity);
                }
                for (var i = 0; i < data.data.deriveWastesList.length; i++) {
                    if (i > 0) {
                        addRow3();
                        addRow4();
                    }
                    var $i = i;
                    $("input[name='deriveWastesList[" + $i + "].name']").val(data.data.deriveWastesList[i].name);
                    $("input[name='deriveWastesList[" + $i + "].code']").val(data.data.deriveWastesList[i].code);
                    $("input[name='deriveWastesList[" + $i + "].formType']").val(data.data.deriveWastesList[i].formType != null ? data.data.deriveWastesList[i].formType.name : "");
                    $("input[name='deriveWastesList[" + $i + "].isMixture'][value='" + data.data.deriveWastesList[i].isMixture + "']").prop("checked", true);
                    $("input[name='deriveWastesList[" + $i + "].formTypeDetail']").val(data.data.deriveWastesList[i].formTypeDetail);
                    $("input[name='deriveWastesList[" + $i + "].smellType']").val(data.data.deriveWastesList[i].smellType != null ? data.data.deriveWastesList[i].smellType.name : "");
                    $("input[name='deriveWastesList[" + $i + "].smellTypeDetail']").val(data.data.deriveWastesList[i].smellTypeDetail);
                    $("input[name='deriveWastesList[" + $i + "].solubility']").val(data.data.deriveWastesList[i].solubility != null ? data.data.deriveWastesList[i].solubility.name : "");
                    $("input[name='deriveWastesList[" + $i + "].solubilityDetail']").val(data.data.deriveWastesList[i].solubilityDetail);
                    $("input[name='deriveWastesList[" + $i + "].isLowTemp'][value='" + data.data.deriveWastesList[i].isLowTemp + "']").prop("checked", true);
                    $("input[name='deriveWastesList[" + $i + "].lowTemp']").val(data.data.deriveWastesList[i].lowTemp);
                    $("input[name='deriveWastesList[" + $i + "].solubleTemp']").val(data.data.deriveWastesList[i].solubleTemp);
                    for (var j = 0; j < data.data.deriveWastesList[i].mixingElementList.length; j++) {
                        var $j = j;
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].name']").val(data.data.deriveWastesList[i].mixingElementList[j].name);
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].minimum']").val(data.data.deriveWastesList[i].mixingElementList[j].minimum);
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].average']").val(data.data.deriveWastesList[i].mixingElementList[j].average);
                        $("input[name='deriveWastesList[" + $i + "].mixingElementList[" + $j + "].maximum']").val(data.data.deriveWastesList[i].mixingElementList[j].maximum);
                    }
                    for (var j = 0; j < data.data.deriveWastesList[i].sensitiveElementList.length; j++) {
                        var $j = data.data.deriveWastesList[i].sensitiveElementList[j].chemicalType.index-1;
                        $("input[name='deriveWastesList[" + $i + "].sensitiveElementList[" + $j + "].chemicalType']").prop("checked", true);
                        $("input[name='deriveWastesList[" + $i + "].sensitiveElementList[" + $j + "].isOrganic'][value='" + data.data.deriveWastesList[i].sensitiveElementList[j].isOrganic + "']").attr("checked", true);
                    }
                    for (var j = 0; j < data.data.deriveWastesList[i].wasteCharacterList.length; j++) {
                        var $j = data.data.deriveWastesList[i].wasteCharacterList[j].index-1;
                        $("input[name='deriveWastesList[" + $i + "].wasteCharacterList[" + $j + "]']").prop("checked", true);
                    }
                    for (var j = 0; j < data.data.deriveWastesList[i].wasteProtectList.length; j++) {
                        var $j = data.data.deriveWastesList[i].wasteProtectList[j].index-1;
                        $("input[name='deriveWastesList[" + $i + "].wasteProtectList[" + $j + "]']").prop("checked", true);
                    }
                    $("input[name='deriveWastesList[" + $i + "].eyeMeasures']").val(data.data.deriveWastesList[i].eyeMeasures);
                    $("input[name='deriveWastesList[" + $i + "].skinMeasures']").val(data.data.deriveWastesList[i].skinMeasures);
                    $("input[name='deriveWastesList[" + $i + "].swallowMeasures']").val(data.data.deriveWastesList[i].swallowMeasures);
                    $("input[name='deriveWastesList[" + $i + "].suctionMeasures']").val(data.data.deriveWastesList[i].suctionMeasures);
                    $("input[name='deriveWastesList[" + $i + "].putOutFireMeasures']").val(data.data.deriveWastesList[i].putOutFireMeasures);
                    $("input[name='deriveWastesList[" + $i + "].leakMeasures']").val(data.data.deriveWastesList[i].leakMeasures);
                }
                if (data.data.isExamined) {
                    $("input[name='isMaterialComplete'][value='" + data.data.isMaterialComplete + "']").prop('checked', true);
                    $("#notCompleteReason").val(data.data.notCompleteReason);
                    $("input[name='isMeetRequire'][value='" + data.data.isMeetRequire + "']").prop('checked', true);
                    $("input[name='isCooperate'][value='" + data.data.isCooperate + "']").prop('checked', true);
                    $("input[name='isDedicate'][value='" + data.data.isDedicate + "']").prop('checked', true);
                    $("input[name='acceptIntend1'][value='" + data.data.acceptIntend1 + "']").prop('checked', true);
                    $("input[name='acceptIntend2'][value='" + data.data.acceptIntend2 + "']").prop('checked', true);
                    $("input[name='acceptIntend3'][value='" + data.data.acceptIntend3 + "']").prop('checked', true);
                    $("#wasteName1").val(data.data.wasteName1);
                    $("#wasteName2").val(data.data.wasteName2);
                    $("#wasteName3").val(data.data.wasteName3);
                    $("#wasteName4").val(data.data.wasteName4);
                    $("#wasteName5").val(data.data.wasteName5);
                    $("#wasteName6").val(data.data.wasteName6);
                    $("#otherRisk").val(data.data.otherRisk);
                    $("#unacceptReason2").val(data.data.unacceptReason2);
                    $("#conditionReason2").val(data.data.conditionReason2);
                    $("#unacceptReason3").val(data.data.unacceptReason3);
                    $("#conditionReason3").val(data.data.conditionReason3);
                    $("#storeReason").val(data.data.storeReason);
                    $("#processReason").val(data.data.processReason);
                    $("input[name='isStore'][value='" + data.data.isStore + "']").prop('checked', true);
                    $("input[name='isProcess'][value='" + data.data.isProcess + "']").prop('checked', true);
                }
            } else { }
        },
        error:function (result) {
            console.log(result);
        }
    });

    // 显示框体
    $('#appointModal1').modal('show');

}
function adjustQuestionnaire(item) {
    var id = getQuestionnaireId(item);
    $(location).attr('href', 'questionnaire1.html?questionnaireId='+id);
}
// 审批通过
$('#examineBtn').click(function () {
    examineQuestionnaire(queId);
});
// 驳回问卷
$('#backBtn').click(function () {
    backQuestionnaireById(queId);
});
/**
 * 审批问卷
 */
function examineQuestionnaire(id) {


        var data = {
            questionnaireId: id,
            isMaterialComplete: $("input[name='isMaterialComplete']:checked").val(),
            notCompleteReason: $("#notCompleteReason").val(),
            isMeetRequire: $("input[name='isMeetRequire']:checked").val(),
            isCooperate: $("input[name='isCooperate']:checked").val(),
            isDedicate: $("input[name='isDedicate']:checked").val(),
            acceptIntend1: $("input[name='acceptIntend1']:checked").val(),
            wasteName1: $("#wasteName1").val(),
            wasteName2: $("#wasteName2").val(),
            wasteName3: $("#wasteName3").val(),
            wasteName4: $("#wasteName4").val(),
            wasteName5: $("#wasteName5").val(),
            wasteName6: $("#wasteName6").val(),
            otherRisk: $("#otherRisk").val(),
            acceptIntend2: $("input[name='acceptIntend2']:checked").val(),
            unacceptReason2: $("#unacceptReason2").val(),
            conditionReason2: $("#conditionReason2").val(),
            isStore: $("input[name='isStore']:checked").val(),
            storeReason: $("#storeReason").val(),
            isProcess: $("input[name='isProcess']:checked").val(),
            processReason: $("#processReason").val(),
            acceptIntend3: $("input[name='acceptIntend3']:checked").val(),
            unacceptReason3: $("#unacceptReason3").val(),
            conditionReason3: $("#conditionReason3").val(),
        };
        console.log(data);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "examineQuestionnaire",               // url
            async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    // alert(result.message);
                    // window.location.reload();
                } else { }
            },
            error:function (result) {
                console.log(result);
            }
        });

}

function backQuestionnaireById(id) {
    var r = confirm("驳回该调查表吗？");
    if (r) {
        var data = {
            questionnaireId: id,
            isMaterialComplete: $("input[name='isMaterialComplete']:checked").val(),
            notCompleteReason: $("#notCompleteReason").val(),
            isMeetRequire: $("input[name='isMeetRequire']:checked").val(),
            isCooperate: $("input[name='isCooperate']:checked").val(),
            isDedicate: $("input[name='isDedicate']:checked").val(),
            acceptIntend1: $("input[name='acceptIntend1']:checked").val(),
            wasteName1: $("#wasteName1").val(),
            wasteName2: $("#wasteName2").val(),
            wasteName3: $("#wasteName3").val(),
            wasteName4: $("#wasteName4").val(),
            wasteName5: $("#wasteName5").val(),
            wasteName6: $("#wasteName6").val(),
            otherRisk: $("#otherRisk").val(),
            acceptIntend2: $("input[name='acceptIntend2']:checked").val(),
            unacceptReason2: $("#unacceptReason2").val(),
            conditionReason2: $("#conditionReason2").val(),
            isStore: $("input[name='isStore']:checked").val(),
            storeReason: $("#storeReason").val(),
            isProcess: $("input[name='isProcess']:checked").val(),
            processReason: $("#processReason").val(),
            acceptIntend3: $("input[name='acceptIntend3']:checked").val(),
            unacceptReason3: $("#unacceptReason3").val(),
            conditionReason3: $("#conditionReason3").val(),
        };
        console.log(data);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "backQuestionnaire",               // url
            async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    alert(result.message);
                    window.location.reload();
                } else { }
            },
            error:function (result) {
                console.log(result);
            }
        });
    }
}

/**
 * 签收问卷
 */
function signInQuestionnaire(item) {
    var r = confirm("确认签收吗?");
    if (r) {
        var id = getQuestionnaireId(item);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "signInQuestionnaire",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'questionnaireId': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                } else {
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }
}

/**
 * 退回问卷
 * @param item
 */
function backQuestionnaire(item) {
    var r = confirm("确认退回吗?");
    if (r) {
        var id = getQuestionnaireId(item);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "backQuestionnaire",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify({
                'questionnaireId': id
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    alert(result.message);
                    window.location.reload();
                } else {
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }
}
/**
 * 签收勾选问卷
 */
function signInQuestionnaireByCheckBox() {
    var items = $("input[type='checkbox']:checked");

    function signInQuestionnaireById(id) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "signInQuestionnaire",               // url
            async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'questionnaireId': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
            },
            error:function (result) {
                console.log(result);
            }
        });
    }
    if (items.length > 0) {
        var r = confirm("确认签收吗?");
        if (r) {
            items.each(function () {
                var id = getIdByCheckBox($(this));
                signInQuestionnaireById(id);
            });
            alert("签收成功");
            window.location.reload();
        }
    } else {
        alert("未选择任何调查表");
    }
}
/**
 * 退回勾选问卷
 */
function backQuestionnaireByCheckBox() {
    var items = $("input[type='checkbox']:checked");

    function backQuestionnaireById(id) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "backQuestionnaire",           // url
            async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify({
                'questionnaireId': id
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
            },
            error:function (result) {
                console.log(result);
            }
        });
    }
    if (items.length > 0) {
        var r = confirm("确认退回吗?");
        if (r) {
            items.each(function () {
                var id = getIdByCheckBox($(this));
                console.log(id);
                backQuestionnaireById(id);
            });
            alert("退回成功");
            window.location.reload();
        }
    } else {
        alert("未选择任何调查表");
    }
}

/*驳回*/
function back(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "backQuestionnaire",           // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify({
            'questionnaireId': id
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
        },
        error:function (result) {
            console.log(result);
        }
    });
}

/**
 * 通过勾选框获取编号
 * @param item
 * @returns {*}
 */
function getIdByCheckBox(item) {
    return item.parent().parent().next().text();
}
/**
 * 日期格式
 */
$('.form_datetime').datetimepicker({
    language:  'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    showMeridian: 1
});
/**
 * 显示预约框
 */
function appointModal(item) {
    var companyName = getCompanyName(item);
    $("#model-companyName").val(companyName);
    // 显示框体
    $('#appointModal').modal('show');
}
/**
 * 增加预约单
 */
function addAppoint() {
    if (validator.form()) {
        var time = getStdTimeStr($("#model-appointTime").val());
        var data = {
            companyName: $("#model-companyName").val(),
            contactName: $("#model-contactName").val(),
            appointTime: time,
            telephone: $("#model-contactPhone").val(),
            comment: $("#model-comment").val()
        };
        $.ajax({
            type: "POST",                            // 方法类型
            url: "addSampleAppoint",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
//                data: JSON.stringify($('#model-appoint').serializeJSON()),
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    alert("保存成功!");
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                    $("#appointModal").modal("hide");  // 关闭打开的模态框
                } else {
                    alert("保存失败!");
                }
            },
            error: function (data, type, err) {
                var that = this;
                console.log(that.data);
                console.log("ajax错误类型：" + type);
                console.log(err);
                alert("服务器异常!");
            }
        });
    }
}

/**
 * 导出excel
 * @param e
 */
function exportExcel(e) {
    var name='questionnaire';
    // var sqlWords = 'select * from questionnaire';
    var sqlWords = 'select questionnaireId,client.companyName,enterpriseType,product,checkState,author,time from client join questionnaire where client.clientId = questionnaire.clientId';
    window.open('exportExcel?name='+name+'&sqlWords='+sqlWords);

}

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var id = '0000';
        console.log("change");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentQuestionnaireId",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: false,
            success: function (result) {
                if (result != undefined || result != NaN) {
                    id = result.questionnaireId;
                } else {
                    alert("数据获取失败！ " + result);
                }
            },
            error: function (result) {
                alert("导入失败，请检查后重试！")
                console.log("error" + result);
            }
        });
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("tableName", 'questionnaire');
        formFile.append("id", id);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importQuestionnaireExcel",              // url
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

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/questionnaire模板.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}
/*打印*/
$("#print").click(function() {
    /* Act on the event */
    $("#print1").printThis({
        debug:true,
        importCSS: true,
        importStyle:true,
        //importJs:true,
        //printContainer: true,
        //loadCSS: [ "css/a.css"],
        //loadJs:["/js/bootstrap/3.3.6/bootstrap.min.js","js/jquery/2.0.0/jquery.min.js","js/bootstrap/navbar.js"],
        // pageTitle: "二维码",
        //removeInline: false,
        printDelay: 333,
        copyTagClasses: false,
        //header: null,
        //formValues: false,
        //removeScripts:true
    });
//		alert("等待打印");
});

/*状态变为审批中*/
function submitQuestionnaire(orderId) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "submitQuestionnaire",              // url
        data: {"orderId":orderId},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // alert(result.message);
                // console.log(data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/*提交调查表*/
function submit(item) {
    initSubmitFName(submitQuestionnaire.name);
    var id = getQuestionnaireId(item);
    if(confirm("确定提交?")){
        //点击确定后操作
        publicSubmit(id, getUrl(), getCurrentUserData().name, getCurrentUserData().role.id)
    }


}

     /*状态变为待提交*/
    function toSubmitQuestionnaire(id) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "toSubmitQuestionnaire",              // url
            data: {"questionnaireId": id},
            cache: false,
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    // alert(result.message);
                    // // console.log(data);
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }

    /**
     * 新审批
     */
    function approval(item) {
        initSubmitFName(submitQuestionnaire.name);
        initApprovalFName(examineQuestionnaire.name);
        initBakcFName(back.name);
        var id = getQuestionnaireId(item);
        $('#ApprovalOrderId').text(id);
        $.ajax({
            type: "POST",
            url: "getAllChildNode",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'orderId': id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    if (result.data != null) {
                        setApprovalModal(result.data);
                        $("#approval").modal('show');
                    }

                }
                else {
                    alert('未提交，无法审批！')
                }
            },
            error: function (result) {
                alert("服务器异常!")
            }
        });

    }


