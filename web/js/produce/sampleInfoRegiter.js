var currentPage = 1;                          //当前页数

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

$(window).on('load', function () {
    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        style: 'btn-info',
        size: 4
    });
});


function setSampleList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 公司代码
                case (1):
                    $(this).html(obj.companyCode);
                    break;
                //危废代码
                case (2):
                    $(this).html(obj.wastesCode);
                    break;
                // 样品状态
                case (3):
                    if (obj.applyState != null) {
                        obj.name = obj.applyState.name;
                    }
                    $(this).html(obj.name);
                    break;
                //基础检测项目
                case (4): {
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
                case (5): {
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
                case (6):
                    $(this).html(obj.laboratorySigner);
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


$('#embed').load('embed/loginLogModal.html');

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
    $('.selectpicker').selectpicker('val', '');
    $("#model-contactName").text("");
    $("#model-appointTime").text("");
    $("#model-telephone").text("");
    $("#model-comment").text("");
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
function getcompanyCodeByMenu(menu) {
    return menu.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 通过勾选框获取到公司代码
 * @param checkbox 勾选框
 * @returns {string} 预约单编号
 */
function getCompanyCodeByCheckbox(checkbox) {
    return checkbox.parentElement.parentElement.nextElementSibling.innerHTML;
}

/**
 * 查看预约登记单
 */
function viewSample(menu) {
    var companyCode = getcompanyCodeByMenu(menu);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'companyCode': companyCode
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result.data);
                if (result.status == "success") {
                    $("#model1-companyCode").text(data.companyCode);
                    $("#model1-wastesCode").text(data.wastesCode);
                    $("#model1-basicItems").text(basicItems(data));
                    $("#model1-addItems").text(addItems(data));
                    $("#model1-signer").text(data.laboratorySigner);
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

/**
 * 确认收样 增加登记单
 */
function addCheck() {
    var items = $("input[type='checkbox']:checked");
    if (items.length == 1) {
        var companyCode = getCompanyCodeByCheckbox(items[0]);
        $.ajax({
            type: "POST",                             // 方法类型
            url: "addSampleInformationCheck",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'companyCode': companyCode
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
 * 显示收样框
 */
function checkModal() {
    var items = $("input[type='checkbox']:checked");
    if (items.length == 1) {
        var companyCode = getCompanyCodeByCheckbox(items[0]);
        // 更新数据
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSampleInformation",              // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'companyCode': companyCode
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result.data);
                    if (result.status == "success") {
                        $("#model2-companyCode").text(data.companyCode);
                        $("#model2-wastesCode").text(data.wastesCode);
                        $("#model2-basicItems").text(basicItems(data));
                        $("#model2-addItems").text(addItems(data));
                        $("#model2-signer").text(data.laboratorySigner);
                    } else {
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
 * 修改信息功能
 */
function adjustSample(menu) {
    var companyCode = getcompanyCodeByMenu(menu);
    var appoint = $('#appoint');
    var appointBtn = $("#appointBtn");
    appointBtn.text("修改");
    // 点击后更新
    appointBtn.removeAttr("onclick");
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'companyCode': companyCode
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            appointBtn.hide();
            if (result != undefined) {
                var data = eval(result.data);
                if (result.status == "success") {
                    $("#model-companyCode").val(data.companyCode);
                    $("#model-wastesCode").val(data.wastesCode);
                    $("#model-signer").val(data.laboratorySigner);
                    $("#isPH").prop("checked",Boolean(data.isPH)); //Boolean(data.isPH);
                    $("#isAsh").prop("checked",Boolean(data.isAsh));
                    $("#isWater").prop =("checked",Boolean(data.isWater));
                    $("#isHeat").prop("checked",Boolean(data.isHeat));
                    $("#isS").prop("checked",Boolean(data.isSulfur));
                    $("#isCl").prop("checked",Boolean(data.isChlorine));
                    $("#isF").prop("checked",Boolean(data.isFluorine));
                    $("#isP").prop("checked",Boolean(data.isPhosphorus));
                    $("#isFlashPoint").prop("checked",Boolean(data.isFlashPoint));
                    $("#isViscosity").prop("checked",Boolean(data.isViscosity));
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
        updateAppointByCompanyCode(companyCode);
    });
//       appoint.appendChild(appointBtn);
}

/**
 * 通过公司代码对预约单进行修改
 */
function updateAppointByCompanyCode(companyCode) {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "updateSampleInformation",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'companyCode': companyCode,
            'wastesCode': $("#model-wastesCode").val(),
            'laboratorySigner': $("#model-signer").val(),
            'isPH' : Number($("#isPH").prop("checked")),
            'isAsh' : Number($("#isAsh").prop("checked")),
            'isWater' : Number($("#isWater").prop("checked")),
            'isHeat' : Number($("#isHeat").prop("checked")),
            'isSulfur' : Number($("#isS").prop("checked")),
            'isChlorine' : Number($("#isCl").prop("checked")),
            'isFluorine' : Number($("#isF").prop("checked")),
            'isPhosphorus' : Number($("#isP").prop("checked")),
            'isFlashPoint' : Number($("#isFlashPoint").prop("checked")),
            'isViscosity' : Number($("#isViscosity").prop("checked")),
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
 * 显示操作按钮对应收样框
 */
function checkSample(menu) {
    // 添加下拉框信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSampleSelectList",         // url
        cache: false,
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
//                console.log(result);
            if (result != undefined) {
                var data = eval(result);
                // 各下拉框数据填充
                var formType = $("select[name='sampleList[0].formType']");
                // 清空遗留元素
                formType.children().remove();
                $.each(data.formTypeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index - 1);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;

                var packageType = $("select[name='sampleList[0].packageType']");
                // 清空遗留元素
                packageType.children().remove();
                $.each(data.packageTypeStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.index - 1);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $(".newLine").remove();
    $("#plusBtn").prev().find("input").val("");
    var id = getAppointIdByMenu(menu);
    var checkId = id.concat("R");
    $("#model2-checkId").text(checkId);
    // 更新数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSampleAppoint",              // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'appointId': id
        },
        dataType: "json",
        success: function (result) {
//                console.log(result);
            if (result != undefined) {
                var data = eval(result);
                if (data.status == "success") {
                    $("#model2-companyName").text(data.data.companyName);
                    $("#model2-createTime").text(getTimeStr(data.data.appointTime));
                    $("#model2-contactName").text(data.data.contactName);
                    $("#model2-telephone").text(data.data.telephone);
                }
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    var formTypeIndex, packageTypeIndex;
    // 添加已填写的登记信息
//        console.log(checkId);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSampleCheck",              // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'checkId': checkId
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                console.log(result);
                var data = eval(result);
                if (data.status == "success") {
                    $("#model2-recipient").val(data.data.recipient);
                    $("#model2-mainComponent").val(data.data.mainComponent);
                    for (var i = 0; i < data.data.sampleList.length; i++) {
                        if (i > 0) addNewLine();
                        var $i = i;
                        $("input[name='sampleList[" + $i + "].productName']").val(data.data.sampleList[i].productName);
                        $("input[name='sampleList[" + $i + "].quantity']").val(data.data.sampleList[i].quantity);
                        if (data.data.sampleList[i].formType != null) $("select[name='sampleList[" + $i + "].formType']").get(0).selectedIndex = data.data.sampleList[i].formType.index - 1;
                        if (data.data.sampleList[i].packageType != null) $("select[name='sampleList[" + $i + "].packageType']").get(0).selectedIndex = data.data.sampleList[i].packageType.index - 1;
                        $("input[name='sampleList[" + $i + "].code']").val(data.data.sampleList[i].code);
                        $("input[name='sampleList[" + $i + "].color']").val(data.data.sampleList[i].color);
                    }
                } else {

                }
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 显示框体
    $('#checkModal').modal('show');
}

/**
 * 查询预约单
 */
function searchSample() {
    var keyword = $("#searchContent").val();
    $.ajax({
        type: "POST",                            // 方法类型
        url: "searchSampleAppoint",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'keyword': keyword
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.data != undefined) {
                setSampleList(result.data);
            }
        },
        error: function (result) {
            console.dir(result);
            alert("服务器异常!");
        }
    });
}

/**
 * 添加预约单
 */
function addAppoint() {
//        console.log($("#model-companyName").text())

    var sampleInformation = {};
    sampleInformation.companyCode = $("#model-companyCode").val();
    sampleInformation.wastesCode = $("#model-wastesCode").val();
    sampleInformation.laboratorySigner = $("#model-signer").val();
    sampleInformation.isPH = $("#isPH").prop('checked');
    sampleInformation.isAsh = $("#isAsh").prop('checked');
    sampleInformation.isWater = $("#isWater").prop('checked');
    sampleInformation.isHeat = $("#isHeat").prop('checked');
    sampleInformation.isSulfur = $("#isS").prop('checked');
    sampleInformation.isChlorine = $("#isCl").prop('checked');
    sampleInformation.isFluorine = $("#isF").prop('checked');
    sampleInformation.isPhosphorus = $("#isP").prop('checked');
    sampleInformation.isFlashPoint = $("#isFlashPoint").prop('checked');
    sampleInformation.isViscosity = $("#isViscosity").prop('checked');
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
    var id = getAppointIdByMenu(menu);
    console.log(id);
    var msg = "是否作废该条记录？";
    if (confirm(msg) == true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelSampleAppoint",              // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'appointId': id
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

// 获取当前时间为'yyyy-MM-dd'
function getNowDate() {
    var now = new Date();
    return now.format('yyyy-MM-dd');
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

function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        console.log("change");
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("tableName", 't_sampleappoint');
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

function getStdTimeStr(time) {
    if (time == '') return "";
    var timeArr = time.split(' ');
    time = timeArr[0] + 'T' + timeArr[1] + '.000Z';
    return time;
}
