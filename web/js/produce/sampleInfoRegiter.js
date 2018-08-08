var currentPage = 1;                          //当前页数
var isSearch = false;
var data;
var id = 10;                                   //sampleInformation id
var wastesId = 1;
$('#embed').load('embed/loginLogModal.html');

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
            url: "totalSampleInformationRecord",                  // url
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
            url: "searchSampleInfoTotal",                  // url
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
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setSampleList(result);
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
    console.log("当前页：" + pageNumber);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageSampleInformationList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setSampleList(result.data);
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
            url: "searchSampleInfo",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setSampleList(result.data);
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageSampleInformationList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setSampleList(result.data);
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
                url: "searchSampleInfo",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setSampleList(result.data);
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
}

/**
 * 分页 获取首页内容
 * */
function loadPageSampleInformationList() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageSampleInformationList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
    isSearch = false;
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

function setSampleList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                //预约单号
                case (1):
                    $(this).html(obj.id);
                    break;
                // 公司代码
                case (2):
                    $(this).html(obj.companyCode);
                    break;
                //危废代码
                case (3):
                    $(this).html(obj.wastesCode);
                    break;
                // 样品状态
                case (4):
                    if (obj.applyState != null) {
                        obj.name = obj.applyState.name;
                    }
                    $(this).html(obj.name);
                    break;
                //基础检测项目
                case (5): {
                    var list = [];
                    if (obj.isPH === true) list.push("PH");
                    if (obj.isAsh === true) list.push("灰");
                    if (obj.isWater === true) list.push("水");
                    if (obj.isHeat === true) list.push("热");
                    if (obj.isSulfur === true) list.push("硫");
                    if (obj.isChlorine === true) list.push("氯");
                    if (obj.isFluorine === true) list.push("氟");
                    if (obj.isPhosphorus === true) list.push("磷");
                    var flag = false;
                    var r = "";
                    //遍历分隔字符串,以逗号隔开
                    for (var i = 0; i < list.length; i++) {
                        if (flag) {
                            r += ",";
                        } else {
                            flag = true;
                        }
                        r += list[i];  //在r末尾插入s
                    }
                    obj.basicItems = r.toString();
                }
                    $(this).html(obj.basicItems);
                    break;
                // 增加检测项目
                case (6): {
                    var list1 = [];
                    if (obj.isFlashPoint === true) list1.push("闪点");
                    if (obj.isViscosity === true) list1.push("黏度");
                    var flag = false;
                    var r = "";
                    for (var i = 0; i < list1.length; i++) {
                        if (flag) {
                            r += ",";
                        } else {
                            flag = true;
                        }
                        r += list1[i];
                    }
                    obj.addItems = r.toString();
                }
                    $(this).html(obj.addItems);
                    break;
                // 签收人
                case (7):
                    $(this).html(obj.laboratorySigner);
                    break;
                case (8):
                   // console.log(getDateStr(obj.samplingDate));
                    $(this).html(getDateStr(obj.samplingDate));
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
        url: "getSampleInfoSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var applyState = $("#search-state");
                applyState.children().remove();
                $.each(data.applyStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    applyState.append(option);
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
 * 日期格式
 */
$('.form_datetime').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    showMeridian: 1
});

/**
 * 显示预约框
 */
function appointModal() {
    //$('.selectpicker').selectpicker('val', '');
    $("#appointBtn").text("预约");
    $("#appointBtn").unbind();
    $("#appointBtn").click(function () {
        addAppoint();
    });
    // 显示框体
    $('#appointModal').modal('show');
}

/**
 * 转化基础项目
 * @param data
 * @returns {string}
 */
function basicItems(data) {
    var list = [];
    //只显示第一组数据
    if (data.isPH === true) list.push("PH");
    if (data.isAsh === true) list.push("灰");
    if (data.isWater === true) list.push("水");
    if (data.isHeat === true) list.push("热");
    if (data.isSulfur === true) list.push("硫");
    if (data.isChlorine === true) list.push("氯");
    if (data.isFluorine === true) list.push("氟");
    if (data.isPhosphorus === true) list.push("磷");

    var flag = false;
    var r = "";
    //遍历分隔字符串,以逗号隔开
    for (var i = 0; i < list.length; i++) {
        if (flag) {
            r += ",";
        } else {
            flag = true;
        }
        r += list[i];  //在r末尾插入s
    }
    return r.toString();
}

/**
 * 转化增加项目
 * @param data
 * @returns {string}
 */
function addItems(data) {
    var list1 = [];
    if (data.isFlashPoint === true) list1.push("闪点");
    if (data.isViscosity === true) list1.push("黏度");
    var flag = false;
    var r1 = "";
    for (var i = 0; i < list1.length; i++) {
        if (flag) {
            r1 += ",";
        } else {
            flag = true;
        }
        r1 += list1[i];
    }
    return r1.toString();
}

/**
 * 根据操作菜单获取公司代码
 * @param menu
 * @returns {string}
 */
function getSampleIdByMenu(menu) {
    return menu.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 通过勾选框获取到公司代码
 * @param checkbox 勾选框
 * @returns {string} 预约单编号
 */
function getSampleIdByCheckbox(checkbox) {
    return checkbox.parentElement.parentElement.nextElementSibling.innerHTML;
}

/**
 * 查看预约登记单
 */
function viewSample(menu) {
    $(".newLine").remove();
    var sampleId = getSampleIdByMenu(menu);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'sampleId': sampleId
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result.data);
                if (result.status == "success") {
                    $("#model1-companyCode").text(data.companyCode);
                    $("#model1-signer").text(data.laboratorySigner);
                    console.log(data.wastesList);
                    for (var i = 0; i < data.wastesList.length; i++) {
                        if (i > 0) addLine();
                        var $i = i;
                        $("span[id='model[" + $i + "].wastesCode']").text(data.wastesList[i].wastesCode);
                        $("span[id='model[" + $i + "].basicItems']").text(basicItems(data.wastesList[i]));
                        $("span[id='model[" + $i + "].addItems']").text(addItems(data.wastesList[i]));
                    }
                    // 显示框体
                    $('#viewAppointModal').modal('show');
                } else {
                    alert(result.message);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

function addLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#cloneBefore").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    var num = clonedTr.children().find("span:first").prop('id').charAt(6);
    clonedTr.children().find("span").text("");
    clonedTr.children().find("span").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, parseInt(num) + 1);
        $(this).prop('id', newId);
        // var name = $(this).prop('name');
        // var newName = name.replace(/[0-9]\d*/, parseInt(id) + 1);
        // $(this).prop('name', newName);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}

/**
 * 确认收样
 */
function confirmCheck() {
    var items = $("input[type='checkbox']:checked");
    if (items.length == 1) {
        var sampleId = getSampleIdByCheckbox(items[0]);
        $.ajax({
            type: "POST",                             // 方法类型
            url: "confirmSampleInformationCheck",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'sampleId': sampleId
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.dir(result);
                alert("服务器异常!");
            }
        });

    } else if (items.length > 1) {
        alert("请勿选中多个登记单！");
    } else {
        alert("未选中登记单！");
    }
}

/**
 * 预约登记-新增样品
 */
function addNewLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#addBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    var id = clonedTr.children().find("input:first-child").prop('name').charAt(11);
    clonedTr.children().find("input").val("");
    clonedTr.children().find("input:checkbox").prop('checked', false);
    clonedTr.children().find("input").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, parseInt(id) + 1);
        $(this).prop('name', newName);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}

/**
 * 显示确认收样框
 */
function checkModal() {
    $(".newLine").remove();
    var items = $("input[type='checkbox']:checked");
    if (items.length == 1) {
        var sampleId = getSampleIdByCheckbox(items[0]);
        // 更新数据
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSampleInformation",              // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'sampleId': sampleId
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    if (result.status == "success") {
                        var data = eval(result.data);
                        $("#model2-companyCode").text(data.companyCode);
                        $("#model2-signer").text(data.laboratorySigner);
                        console.log(data.wastesList);
                        for (var i = 0; i < data.wastesList.length; i++) {
                            if (i > 0) addNextLine();
                            var $i = i;
                            $("span[id='checkModel[" + $i + "].wastesCode']").text(data.wastesList[i].wastesCode);
                            $("span[id='checkModel[" + $i + "].basicItems']").text(basicItems(data.wastesList[i]));
                            $("span[id='checkModel[" + $i + "].addItems']").text(addItems(data.wastesList[i]));
                        }
                    }
                    else {
                        alert(result.message);
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
        // 显示框体
        $('#checkModal').modal('show');
    } else if (items.length > 1) {
        alert("请勿选择多个预约单");
    } else {
        alert("未选择任何预约单");
    }
}

/**
 * 显示确认收样 克隆样品数据
 */
function addNextLine() {
    // 获取id为plusBtn的tr元素
    var tr = $("#clone").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    var num = clonedTr.children().find("span:first").prop('id').charAt(11);
    clonedTr.children().find("span").text("");
    clonedTr.children().find("span").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, parseInt(num) + 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
}


/**
 * 修改信息功能
 */
function adjustSample(menu) {
    $(".newLine").remove();
    var sampleId = getSampleIdByMenu(menu);
    // var appoint = $('#appoint');
    var appointBtn = $("#appointBtn");
    appointBtn.text("修改");
    // 点击后更新
    appointBtn.removeAttr("onclick");
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'sampleId': sampleId
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            appointBtn.hide();
            if (result != undefined) {
                var data = eval(result.data);
                if (result.status == "success") {
                    $("#model-companyCode").val(data.companyCode);
                    $("#model-signer").val(data.laboratorySigner);
                    for (var i = 0; i < data.wastesList.length; i++) {
                        if (i > 0) addNewLine();
                        var $i = i;
                        $("input[name='wastesList[" + $i + "].wastesCode']").val(data.wastesList[i].wastesCode);
                        $("input[name='wastesList[" + $i + "].isPH']").prop('checked', data.wastesList[i].isPH);
                        $("input[name='wastesList[" + $i + "].isAsh']").prop('checked', data.wastesList[i].isAsh);
                        $("input[name='wastesList[" + $i + "].isWater']").prop('checked', data.wastesList[i].isWater);
                        $("input[name='wastesList[" + $i + "].isHeat']").prop('checked', data.wastesList[i].isHeat);
                        $("input[name='wastesList[" + $i + "].isS']").prop('checked', data.wastesList[i].isSulfur);
                        $("input[name='wastesList[" + $i + "].isCl']").prop('checked', data.wastesList[i].isChlorine);
                        $("input[name='wastesList[" + $i + "].isF']").prop('checked', data.wastesList[i].isFluorine);
                        $("input[name='wastesList[" + $i + "].isP']").prop('checked', data.wastesList[i].isPhosphorus);
                        $("input[name='wastesList[" + $i + "].isFlashPoint']").prop('checked', data.wastesList[i].isFlashPoint);
                        $("input[name='wastesList[" + $i + "].isViscosity']").prop('checked', data.wastesList[i].isViscosity);
                    }
                    // 显示框体
                    $('#appointModal').modal('show');
                    appointBtn.show();
                } else {
                    alert(data.message);
                    console.log(data.exception);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
    appointBtn.unbind();
    appointBtn.click(function () {
        updateAppointBySampleId(sampleId);
    });
//       appoint.appendChild(appointBtn);
}

/**
 * 通过公司代码对预约单进行修改
 */
function updateAppointBySampleId(sampleId) {
    var sampleInformation = {};
    sampleInformation.id = sampleId;
    sampleInformation.companyCode = $("#model-companyCode").val();
    sampleInformation.laboratorySigner = $("#model-signer").val();
    sampleInformation['wastesList'] = [];
    var lineCount = $("input[name^='wastesList'][name$='wastesCode']").length;
    for (var i = 0; i < lineCount; i++) {
        var wastes = {};
        var $i = i;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getSampleInformation",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                sampleId: sampleId
            },
            success: function (result) {
                wastes.id = result.data.wastesList[i].id;
            },
            error: function (result) {
                console.dir(result);
                alert("服务器异常!");
            }
        });
        wastes.wastesCode = $("input[name='wastesList[" + $i + "].wastesCode']").val();
        wastes.isPH = $("input[name='wastesList[" + $i + "].isPH']").prop('checked');
        wastes.isAsh = $("input[name='wastesList[" + $i + "].isAsh']").prop('checked');
        wastes.isWater = $("input[name='wastesList[" + $i + "].isWater']").prop('checked');
        wastes.isHeat = $("input[name='wastesList[" + $i + "].isHeat']").prop('checked');
        wastes.isSulfur = $("input[name='wastesList[" + $i + "].isS']").prop('checked');
        wastes.isChlorine = $("input[name='wastesList[" + $i + "].isCl']").prop('checked');
        wastes.isFluorine = $("input[name='wastesList[" + $i + "].isF']").prop('checked');
        wastes.isPhosphorus = $("input[name='wastesList[" + $i + "].isP']").prop('checked');
        wastes.isFlashPoint = $("input[name='wastesList[" + $i + "].isFlashPoint']").prop('checked');
        wastes.isViscosity = $("input[name='wastesList[" + $i + "].isViscosity']").prop('checked');
        sampleInformation.wastesList.push(wastes);
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "updateSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(sampleInformation),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    alert(data.message);
                    window.location.reload();
                } else {
                    alert(data.message);
                    console.log(data.exception);
                }
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 查询功能
 */
function searchSampleInfo() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    console.log($("#search-state").find("option:selected").text());
    var applyState = null;
    if ($("#search-state").val() == 0) applyState = "Appointed";
    if ($("#search-state").val() == 1) applyState = "Canceld";
    if ($("#search-state").val() == 2) applyState = "SampleTaked";
    if ($("#search-state").val() == 3) applyState = "Invalid";
    if ($("#senior").is(':visible')) {
        data = {
            companyCode: $("#search-companyCode").val(),
            wastesCode: $("#search-wastesCode").val(),
            laboratorySigner: $("#search-signer").val(),
            applyState: applyState,
            isPH: $("#isPH1").prop("checked"),
            isAsh: $("#isAsh1").prop("checked"),
            isWater: $("#isWater1").prop("checked"),
            isHeat: $("#isHeat1").prop("checked"),
            isSulfur: $("#isS1").prop("checked"),
            isChlorine: $("#isCl1").prop("checked"),
            isFluorine: $("#isF1").prop("checked"),
            isPhosphorus: $("#isP1").prop("checked"),
            isFlashPoint: $("#isFlashPoint1").prop("checked"),
            isViscosity: $("#isViscosity1").prop("checked"),
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "searchSampleInfo",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || resulet.status == "success") {
                setPageClone(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    isSearch = true;
}

/**
 * 添加预约登记单
 */
function addAppoint() {
    var sampleInformation = {};
    //获取id
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentSampleInformationId",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("数据获取成功！");
            sampleInformation.id = result.id;
        },
        error: function (result) {
            alert("服务器异常!");
            console.log(result);
        }

    });
    sampleInformation.companyCode = $("#model-companyCode").val();
    sampleInformation.laboratorySigner = $("#model-signer").val();
    sampleInformation['wastesList'] = [];
    var lineCount = $("input[name^='wastesList'][name$='wastesCode']").length;
    var wastesId = null;
    //获取wastesId
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentWastesId",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            //alert("wastesId获取成功!");
            wastesId = result.id;
        },
        error: function (result) {
            //  alert("wastesId获取失败!");
            console.log(result);
        }
    });
    var id1 = parseInt(wastesId);
    for (var i = 0; i < lineCount; i++) {
        var wastes = {};
        var $i = i;
        //id 递增
        var id2 = id1++;
        //wastes.id格式规范化
        $.ajax({
            type: "POST",                            // 方法类型
            url: "normalization",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                number: id2,
            },
            success: function (result) {
                //alert("wastesId获取成功!");
                wastes.id = result.id;
            },
            error: function () {
                console.log("转换8位字符失败！");
            }
        });
        wastes.wastesCode = $("input[name='wastesList[" + $i + "].wastesCode']").val();
        wastes.isPH = $("input[name='wastesList[" + $i + "].isPH']").prop('checked');
        wastes.isAsh = $("input[name='wastesList[" + $i + "].isAsh']").prop('checked');
        wastes.isWater = $("input[name='wastesList[" + $i + "].isWater']").prop('checked');
        wastes.isHeat = $("input[name='wastesList[" + $i + "].isHeat']").prop('checked');
        wastes.isSulfur = $("input[name='wastesList[" + $i + "].isS']").prop('checked');
        wastes.isChlorine = $("input[name='wastesList[" + $i + "].isCl']").prop('checked');
        wastes.isFluorine = $("input[name='wastesList[" + $i + "].isF']").prop('checked');
        wastes.isPhosphorus = $("input[name='wastesList[" + $i + "].isP']").prop('checked');
        wastes.isFlashPoint = $("input[name='wastesList[" + $i + "].isFlashPoint']").prop('checked');
        wastes.isViscosity = $("input[name='wastesList[" + $i + "].isViscosity']").prop('checked');
        sampleInformation.wastesList.push(wastes);
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "addSampleInfo",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(sampleInformation),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 删除预约单----->改作废
 */
function deleteSample(menu) {
    var sampleId = getSampleIdByMenu(menu);
    var msg = "是否作废该条记录？";
    if (confirm(msg) == true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelSampleInformation",              // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'sampleId': sampleId
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload();
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    }
}

function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}

// 对Date原型进行改造，增加方法format
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * 导出excel
 * @param e
 */
function exportExcel(e) {
    var name = 't_pr_sampleinformation';
    var sqlWords = "select companyCode,wastesCode,applyState,laboratorySigner,isPH,isAsh,isWater,isHeat,isSulfur,isChlorine,isFluorine,isPhosphorus,isFlashPoint,isViscosity from t_pr_sampleinformation ";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}



