var currentPage = 1;                          //当前页数
var isSearch = false;
var data;
var sampleId;
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
            url: "totalSampleInformationItemRecord",                  // url
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
            url: "searchSampleInfoItemTotal",                  // url
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
            url: "loadPageSampleInformationItemList",         // url
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
            url: "searchSampleItemInfo",         // url
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

function enterSwitchPage() {
    if (event.keyCode === 13) {
        inputSwitchPage();
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
    if (pageNumber == null || pageNumber == undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber > totalPage()) {
            alert("跳转页数超出总页数！");
            pageNumber = 1;
        }
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
        $("#current").find("a").text("当前页：" + pageNumber);
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageSampleInformationItemList",         // url
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
                url: "searchSampleInfoItem",         // url
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
function loadPageSampleInformationItemList() {
    loadNavigationList();   // 动态菜单加载
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
        url: "loadPageSampleInformationItemList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
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
        console.log("总记录数为0，请检查！");
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
                    $(this).html(obj.sampleId);
                    break;
                // 公司名称
                case (2):
                    $(this).html(obj.companyName);
                    break;
                // 危废代码
                case(3):
                    $(this).html(obj.code);
                    break;
                //危废名称
                case (4):
                    $(this).html(obj.name);
                    break;
                //危废类别
                case(5):
                    $(this).html(obj.category);
                    break;
                // 危废形态
                case (6):
                    if (obj.formType != null)
                        $(this).html(obj.formType.name);
                    break;
                case (7):
                    //检测项目
                {
                    var list = [];
                    if (obj.isPH === true) list.push("PH");
                    if (obj.isAsh === true) list.push("灰");
                    if (obj.isWater === true) list.push("水");
                    if (obj.isHeat === true) list.push("热值");
                    if (obj.isSulfur === true) list.push("硫");
                    if (obj.isChlorine === true) list.push("氯");
                    if (obj.isFluorine === true) list.push("氟");
                    if (obj.isPhosphorus === true) list.push("磷");
                    if (obj.isFlashPoint === true) list.push("闪点");
                    if (obj.isViscosity === true) list.push("黏度");
                    if (obj.isHotMelt === true) list.push("热融");
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
                    obj.items = r.toString();
                }
                    $(this).html(obj.items);
                    break;
                // 增加检测项目
                case (8):
                    // 送样人
                    $(this).html(obj.sendingPerson);
                    break;
                case (9):
                    // 签收人
                    $(this).html(obj.laboratorySigner);
                    break;
                case (10):
                    // 状态
                    if (obj.applyState != null) {
                        var name = obj.applyState.name;
                    }
                    $(this).html(name);
                    break;
                case(11):
                    // 编号
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
    if (data.isHotMelt === true) list1.push("热融");
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
 * 单击获取Id
 * @param menu
 * @returns {string}
 */
function getSampleIdByMenu(menu) {
    return menu.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 双击获取ID
 * @param menu
 * @returns {string}
 */
function getSampleIdByMenu1(menu) {
    return menu.firstElementChild.nextElementSibling.innerHTML;
}

function addLine() {
    num++;
    // 获取id为plusBtn的tr元素
    var tr = $("#addClone1");
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("span").text("");
    clonedTr.children().find("span").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertBefore($("#end"));
}

/**
 * 确认收样
 */
function confirmCheck() {
    if ($(menu).parent().prev().text() == "已预约") {
        var laboratorySigner = $("#checkModel0-signer").val();      // 获取签收人
        $.ajax({
            type: "POST",                             // 方法类型
            url: "confirmSampleInformationCheck",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'sampleId': sampleId,
                'laboratorySigner': laboratorySigner
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
    }else if ($(menu).parent().prev().text() == "已拒收") {
        alert("单据已拒收，不可收样！");
    }else if ($(menu).parent().prev().text() == "已作废") {
        alert("单据已作废，不可收样！");
    }
}

/**
 * 为公司代码和危废代码、类别下拉框填充数据1
 */
function setSelectList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClientAndWastesCodeSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status === "success") {
                var data = eval(result);
                console.log("下拉数据为：");
                console.log(data);
                // 下拉框数据填充
                var companyName = $("select[name='model-companyName']");
                $.each(data.companyCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val((item.clientId));
                    option.text(item.companyName);
                    companyName.append(option);
                });
                companyName.get(0).selectedIndex = 0;
                //刷新下拉数据
                $('.selectpicker').selectpicker('refresh');
                // 下拉框数据填充
                var companyCode1 = $("#model3-companyName");
                $.each(data.companyCodeList, function (index, item) {
                    var option = $('<option />');
                    option.val(parseInt(item.clientId));
                    option.text(item.clientId);
                    companyCode1.append(option);
                });
                var wastesCode1 = $("#wastes0-wastesCode");
                $.each(data.wastesCodeList, function (index, item) {
                    var option = $('<option />');
                    if (item != null) {
                        option.val(item.code);
                        option.text(item.code);
                    }
                    wastesCode1.append(option);
                });
                //刷新下拉数据
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSampleFormType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log("下拉数据为：");
                console.log(data);
                // 下拉框数据填充
                var wastesFormType = $("select[name='modal-wastesFormType']");
                wastesFormType.children().remove();   //清空之前数据
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val((item.index));
                    option.text(item.name);
                    wastesFormType.append(option);
                });
                wastesFormType.get(0).selectedIndex = 0;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

var num = 1;

/**
 * 预约登记/修改-新增样品
 */
function addNewLine(item) {
    num++;
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = null;
    if (item != null)
        tr = $(item).parent().parent().prev();
    else tr = $("#addBtn3").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    //clonedTr.children().find("input:first-child").prop('name').charAt(11);
    clonedTr.children().find("input").val("");
    clonedTr.children().find("input:checkbox").prop('checked', false);
    //clonedTr.children().find("select").selectpicker('val', '');
    clonedTr.children().get(0).innerHTML = num;    // 设置序号
    clonedTr.children().find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num - 1);
        $(this).prop('name', newName);
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
    //清空数据为重新初始化selectpicker
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();
    if (clonedTr.children().get(0).innerHTML != 1) {     // 将非第一行的所有行加上减行号
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        clonedTr.children("td:eq(0)").prepend(delBtn);
    }
}

/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 2;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    console.log(tr);
    console.log("length:" + length);
    for (var i = 1; i < length; i++) {             // 更新序号
        tBody.children().eq(i).children().eq(0).get(0).innerHTML = i + 1;     // 更新序号
        // 重新加上减行按钮
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        tBody.children().eq(i).children("td:eq(0)").prepend(delBtn);
        tBody.children().eq(i).children().find("input,select").each(function () {
            var name = $(this).prop('name');
            var newName = name.replace(/[0-9]\d*/, i);
            $(this).prop('name', newName);
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
    }
    num--;
}

/**
 * 显示确认收样框
 */
function checkModal(menu) {
    if ($(menu).parent().prev().prev().text() == "已预约") {
        $(".newLine").remove();
        sampleId = getSampleIdByMenu(menu);
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
                        console.log(data.wastesList);
                        num = 1;
                        for (var i = 0; i < data.wastesList.length; i++) {
                            if (i > 0) addNextLine();
                            var $i = i;
                            $("span[id='checkModel" + $i + "-wastesCode']").text(data.wastesList[i].code);
                            $("span[id='checkModel" + $i + "-wastesName']").text(data.wastesList[i].name);
                            if (data.wastesList[i].formType != null)
                                $("span[id='checkModel" + $i + "-wastesFormType']").text(data.wastesList[i].formType.name);
                            $("span[id='checkModel" + $i + "-wastesHandleCategory']").text(data.wastesList[i].category);
                            $("span[id='checkModel" + $i + "-basicItems']").text(basicItems(data.wastesList[i]));
                            $("span[id='checkModel" + $i + "-addItems']").text(addItems(data.wastesList[i]));
                        }
                        $("#checkModel0-companyName").text(data.companyName);
                        $("#checkModel0-sendingPerson").text(data.sendingPerson);
                        if (data != null && data.laboratorySigner != null)
                            $("#checkModel0-signer").val(data.laboratorySigner);
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
    }else if ($(menu).parent().prev().prev().text() == "已拒收") {
        alert("单据已拒收，不可收样！");
    }else if ($(menu).parent().prev().prev().text() == "已作废") {
        alert("单据已作废，不可收样！");
    }
}

/**
 * 显示确认收样 克隆样品数据
 */
function addNextLine() {
    num++;
    // 获取id为plusBtn的tr元素
    var tr = $("#addClone2");
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("span").text("");
    clonedTr.children().find("span").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertBefore($("#end1"));
}


/**
 * 修改信息功能
 */
function adjustSample(menu) {
    var state = $(menu).parent().prev().text();
    if (state == "已预约" || state == "已收样" || state == "已拒收") {
        num = 0;
        setSelectList();        // 设置危废代码和公司名下拉框数据
        $(".newLine").remove();
        sampleId = getSampleIdByMenu(menu);
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
                        $("#model3-companyName").selectpicker('val', data.companyCode);
                        $("#model3-sendingPerson").val(data.sendingPerson);
                        $("#model3-id").val(sampleId);
                        num = 1; // 重新计数
                        for (var i = 0; i < data.wastesList.length; i++) {
                            if (i > 0) addNewLine(null);
                            var $i = i;
                            $("select[name='wastes[" + $i + "].wastesCode']").selectpicker('val', data.wastesList[i].code);
                            $("input[name='wastes[" + $i + "].wastesName']").val(data.wastesList[i].name);
                            if (data.wastesList[i].formType != null)
                                $("select[id='wastes[" + $i + "].wastesFormType']").val(data.wastesList[i].formType.index);
                            $("input[id='wastes[" + $i + "].wastesHandleCategory']").val(data.wastesList[i].category);
                            $("input[name='wastes[" + $i + "].isPH']").prop('checked', data.wastesList[i].isPH);
                            $("input[name='wastes[" + $i + "].isAsh']").prop('checked', data.wastesList[i].isAsh);
                            $("input[name='wastes[" + $i + "].isWater']").prop('checked', data.wastesList[i].isWater);
                            $("input[name='wastes[" + $i + "].isHeat']").prop('checked', data.wastesList[i].isHeat);
                            $("input[name='wastes[" + $i + "].isS']").prop('checked', data.wastesList[i].isSulfur);
                            $("input[name='wastes[" + $i + "].isCl']").prop('checked', data.wastesList[i].isChlorine);
                            $("input[name='wastes[" + $i + "].isF']").prop('checked', data.wastesList[i].isFluorine);
                            $("input[name='wastes[" + $i + "].isP']").prop('checked', data.wastesList[i].isPhosphorus);
                            $("input[name='wastes[" + $i + "].isFlashPoint']").prop('checked', data.wastesList[i].isFlashPoint);
                            $("input[name='wastes[" + $i + "].isViscosity']").prop('checked', data.wastesList[i].isViscosity);
                            $("input[name='wastes[" + $i + "].isHotMelt']").prop('checked', data.wastesList[i].isHotMelt);
                        }
                        // 显示框体
                        $('#adjustModal').modal('show');
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
    }else if(state == '已作废'){
        alert("单据已作废，不可修改！");
    }else {
        alert("单据不可修改！");
    }
}

/**
 * 通过预约单号对预约单进行修改
 */
function updateAppointBySampleId() {
    var sampleInformation = {};
    if ($("#model3-id").val() != "" || $("#model3-id").val() != null) {
        sampleInformation.id = $("#model3-id").val();
    } else {
        sampleInformation.id = sampleId;
    }
    sampleInformation.companyName = $("#model3-companyName").find("option:selected").text();
    sampleInformation.companyCode = $("#model3-companyName").find("option:selected").val();
    sampleInformation.sendingPerson = $("#model3-sendingPerson").val();
    sampleInformation['wastesList'] = [];
    var lineCount = $("select[name^='wastes'][name$='wastesCode']").length;
    var wastesId = null;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCurrentWastesId",                 // url
        data: {
            'sampleId': sampleId
        },
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
    var data = {};
    //获取wastesId
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            sampleId: sampleId
        },
        success: function (result) {
            console.log("获取的数据为：");
            console.log(result);
            data = result.data;
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    for (var i = 0; i < lineCount; i++) {
        console.log(lineCount);
        var wastes = {};
        var $i = i;
        if (data.wastesList[i] != null) {
            wastes.id = data.wastesList[i].id;
            wastes.unit = "yes";
        } else {
            wastes.id = wastesId;
            wastes.unit = "no";
            var num1 = parseInt(wastesId) + 1;
            wastesId = num1 + "";
        }
        wastes.code = $("select[name='wastes[" + $i + "].wastesCode']").find("option:selected").text();
        wastes.name = $("input[name='wastes[" + $i + "].wastesName']").val();
        var formType = $("select[id='wastes[" + $i + "].wastesFormType']").find("option:selected").val();
        switch (parseInt(formType)) {
            case 4 :
                formType = "HalfSolid";
                break;
            case 2 :
                formType = "Liquid";
                break;
            case 3 :
                formType = "Solid";
                break;
            case 5 :
                formType = "Solid1AndHalfSolid";
                break;
            case 6 :
                formType = "HalfSolidAndLiquid";
                break;
            case 7 :
                formType = "Solid1AndLiquid";
                break;
        }
        wastes.formType = formType;
        //wastes.formType = $("select[id='wastes[" + $i + "].wastesFormType']").find("option:selected").val();
        wastes.category = $("input[id='wastes[" + $i + "].wastesHandleCategory']").val();
        wastes.isPH = $("input[name='wastes[" + $i + "].isPH']").prop('checked');
        wastes.isAsh = $("input[name='wastes[" + $i + "].isAsh']").prop('checked');
        wastes.isWater = $("input[name='wastes[" + $i + "].isWater']").prop('checked');
        wastes.isHeat = $("input[name='wastes[" + $i + "].isHeat']").prop('checked');
        wastes.isSulfur = $("input[name='wastes[" + $i + "].isS']").prop('checked');
        wastes.isChlorine = $("input[name='wastes[" + $i + "].isCl']").prop('checked');
        wastes.isFluorine = $("input[name='wastes[" + $i + "].isF']").prop('checked');
        wastes.isPhosphorus = $("input[name='wastes[" + $i + "].isP']").prop('checked');
        wastes.isFlashPoint = $("input[name='wastes[" + $i + "].isFlashPoint']").prop('checked');
        wastes.isViscosity = $("input[name='wastes[" + $i + "].isViscosity']").prop('checked');
        wastes.isHotMelt = $("input[name='wastes[" + $i + "].isHotMelt']").prop('checked');
        sampleInformation.wastesList.push(wastes);
    }
    console.log("要更新的数据为:");
    console.log(sampleInformation);
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchSampleInfo();      //
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
            if (last - event.timeStamp === 0) {
                searchSampleInfo();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchSampleInfo();      //
            }
        }, 600);
    });
});

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
    var applyState = null;
    console.log($("#search-state").val());
    if ($("#search-state").val() == 0) applyState = "Appointed";
    if ($("#search-state").val() == 1) applyState = "Received";
    if ($("#search-state").val() == 2) applyState = "Rejected";
    if ($("#search-state").val() == 3) applyState = "Invalid";
    if ($("#senior").is(':visible')) {
        data = {
            id: $.trim($("#search-id").val()),
            companyName: $.trim($("#search-companyName").val()),
            code: $.trim($("#search-wastesCode").val()),
            sendingPerson: $.trim($("#search-sendPerson").val()),
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
            isHotMelt: $("#isHotMelt1").prop("checked"),
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        var keywords = $.trim($("#searchContent").val());
        switch (keywords) {
            case "闪点":
                var isFlashPoint = true;
                keywords = "";
                break;
            case "黏度":
                var isViscosity = true;
                keywords = "";
                break;
            case "PH":
                var isPH = true;
                keywords = "";
                break;
            case "灰分":
                var isAsh = true;
                keywords = "";
                break;
            case "灰":
                var isAsh = true;
                keywords = "";
                break;
            case "水分":
                var isWater = true;
                keywords = "";
                break;
            case "水":
                var isWater = true;
                keywords = "";
                break;
            case "热值":
                var isHeat = true;
                keywords = "";
                break;
            case "热":
                var isHeat = true;
                var isHotMelt = true;
                keywords = "";
                break;
            case "硫":
                var isSulfur = true;
                keywords = "";
                break;
            case "氯":
                var isChlorine = true;
                keywords = "";
                break;
            case "氟":
                var isFluorine = true;
                keywords = "";
                break;
            case "磷":
                var isPhosphorus = true;
                keywords = "";
                break;
            case "热融":
                var isHotMelt = true;
                keywords = "";
                break;
            case "已预约":
                keywords = "Appointed";
                break;
            case "预约":
                keywords = "Appointed";
                break;
            case "已收样":
                keywords = "Received";
                break;
            case "收样":
                keywords = "Received";
                break;
            case "已拒收":
                keywords = "Rejected";
                break;
            case "拒收":
                keywords = "Rejected";
                break;
            case "已作废":
                keywords = "Invalid";
                break;
            case "作废":
                keywords = "Invalid";
                break;
            case "液态":
                keywords = "Liquid";
                break;
            case "固态":
                keywords = "Solid";
                break;
            case "半固态":
                keywords = "HalfSolid";
                break;
            case "固态+半固态":
                keywords = "Solid1AndHalfSolid";
                break;
            case "半固态+液态":
                keywords = "HalfSolidAndLiquid";
                break;
            case "固态+液态":
                keywords = "Solid1AndLiquid";
                break;

        }
        data = {
            page: page,
            keywords: keywords,
            isFlashPoint: isFlashPoint,
            isViscosity: isViscosity,
            isPH: isPH,
            isAsh: isAsh,
            isWater: isWater,
            isHeat: isHeat,
            isSulfur: isSulfur,
            isChlorine: isChlorine,
            isFluorine: isFluorine,
            isPhosphorus: isPhosphorus,
            isHotMelt: isHotMelt
        }
    }
    $.ajax({
        type: "POST",                            // 方法类型
        url: "searchSampleInfoItem",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                setPageClone(result.data);
            } else {
                console.log(result.message);
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
 * 删除预约单----->改作废
 */
function deleteSample(menu) {
    var state = $(menu).parent().prev().text();
    if (state == "已预约" || state == "已拒收") {
        sampleId = getSampleIdByMenu(menu);
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
    }else if(state == "已收样"){
        alert("单据已收样，不可作废！");
    }else if(state == "已作废"){
        alert("单据已作废！");
    }else {
        alert("单据不可作废！");
    }
}

/**
 * 导出excel
 * @param e
 */
function exportExcel(e) {
    var name = 't_pr_sampleinformationitem';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push($(item).parent().parent().nextAll().eq(10).text());        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = 'in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {       // 设置sql条件语句
            if (i < idArry.length - 1) sql += idArry[i] + ",";
            else if (i == idArry.length - 1) sql += idArry[i] + ");"
        }
        sqlWords = "select b.id,a.companyName,b.name,b.code,b.formType,a.sendingPerson,b.isPH,b.isHeat,b.isAsh,b.isWater,b.isFluorine,b.isChlorine,b.isSulfur,b.isPhosphorus,b.isFlashPoint,b.isViscosity,b.isHotMelt from t_pr_sampleinformation as a join t_pr_sampleinformationitem as b where a.id=b.sampleId and b.id " + sql;
    } else {
        sqlWords = "select b.id,a.companyName,b.name,b.code,b.formType,a.sendingPerson,b.isPH,b.isHeat,b.isAsh,b.isWater,b.isFluorine,b.isChlorine,b.isSulfur,b.isPhosphorus,b.isFlashPoint,b.isViscosity,b.isHotMelt from t_pr_sampleinformation as a join t_pr_sampleinformationitem as b where a.id=b.sampleId;";
    }
    console.log(sqlWords);
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 打印功能
 */
function print() {
    //打印模态框
    $("#footer").hide();
    $("#viewAppointModal").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: true
    });

}

/**
 * 显示拒收模态框
 */
function rejection(menu) {
    if ($(menu).parent().prev().prev().text() == "已预约") {
        sampleId = getSampleIdByMenu(menu);
        //根据编号查找
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSampleInformation",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                "sampleId": sampleId
            },
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    if (result.data != null && result.data.advice != null)
                        $('#advice').val(result.data.advice);
                }
            },
            error: function (result) {
            }
        });
        $("#rejection1").modal('show');
    }else if ($(menu).parent().prev().prev().text() == "已收样") {
        alert("单据已收样，不可拒收！");
    }else if ($(menu).parent().prev().prev().text() == "已作废") {
        alert("单据已作废，不可拒收！");
    }
}

/**
 * 拒收方法
 */
function rejection1() {
    var advice = $('#advice').val();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "rejectSampleInfoById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            "id": sampleId,
            "advice": advice
        },
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    })
}

/**
 * 自动匹配危废类别
 * @param item
 */
function autoSetCategory(item) {
    var code = $(item).find("option:selected").text();
    if (code != "" || code != null) {
        code = "HW" + code.substring(code.length, code.length - 2); //截取最后两位
        $(item).parent().parent().nextAll().find("input[name$='wastesHandleCategory']").val(code);  // 以wastesHandleCategory结尾的
    }
}


