/**
* Created by matt on 2018/8/6.
* DoubleClickTo 666
*/

/**
 * 全局变量
 * @type {boolean}
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
            url: "totalLaboratoryTestRecord",                  // url
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
            url: "searchLaboratoryTestTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
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
        window.alert("总记录数为0，请检查！");
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
            url: "loadPageLaboratoryTestList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
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
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchLaboratoryTest",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setDataList(result.data);
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
                url: "loadPageLaboratoryTestList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
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
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchLaboratoryTest",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        // console.log(result);
                        setDataList(result.data);
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
        url: "loadPageLaboratoryTestList",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
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
}

/**
 * 设置化验单数据
 * @param result
 */
function setDataList(result) {
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
                // 化验单号
                case (1):
                    $(this).html(obj.laboratoryTestNumber);
                    break;
                // 查询号
                case (2):
                    $(this).html(obj.queryNumber);
                    break;
                // 企业名称
                case (3):
                    if (obj.client != null)
                        $(this).html(obj.client.companyName);
                    break;
                // 填报人
                case (4):
                    $(this).html(obj.record);
                    break;
                // 化验人
                case (5):
                    $(this).html(obj.laboratory);
                    break;
                // 化验日期
                case (6):
                    $(this).html(getDateStr(obj.laboratoryDate));
                    break;
                // 化验公司
                case (7):
                    $(this).html(obj.laboratorycompany);
                    break;
                // 审核状态
                case (8):
                    if (obj.checkState != null)
                        $(this).html(obj.checkState.name);
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
 * 全选复选框
 */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}

/**
 * 查看模态框
 * */
function view(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type:"POST",
        url:"getLaboratoryTest",
        async:false,
        dataType:"json",
        data:{"laboratoryTestNumber":id},
        success:function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result.data);
                // console.log(data);
                if(data.client != null){
                    $('#modal1_companyName').text(data.client.companyName);
                    $('#modal1_address').text(data.client.location);
                    $('#modal1_contacts').text(data.client.contactName);
                    $('#modal1_phone').text(data.client.phone);
                    $('#modal1_industry').text(data.client.industry);
                    $('#modal1_product').text(data.client.product);
                }
                $('#modal1_record').text(data.record);
                $('#modal1_recordDate').text(getDateStr(data.recordDate));
                // 设置危废列表
                if (data.sampleInformationList.length > 0) {
                    for (var i = 0; i < data.sampleInformationList.length; i++) {
                        var $i = i;
                        $("span[id='sampleInformationList[" + $i + "].samplingDate']").text(getDateStr(data.sampleInformationList[i].samplingDate));
                        $("span[id='sampleInformationList[" + $i + "].wastesName']").text(data.sampleInformationList[i].wastesName);
                        $("span[id='sampleInformationList[" + $i + "].samplingNumber_1']").text(data.sampleInformationList[i].samplingNumber);
                        $("input[id='sampleInformationList[" + $i + "].isProductionLine']").prop("checked", data.sampleInformationList[i].isProductionLine);
                        $("input[id='sampleInformationList[" + $i + "].isStorageArea']").prop("checked", data.sampleInformationList[i].isStorageArea);
                        $("span[id='sampleInformationList[" + $i + "].samplingNumber_2']").text(data.sampleInformationList[i].samplingNumber);
                        $("span[id='sampleInformationList[" + $i + "].testDate']").text(getDateStr(data.sampleInformationList[i].testDate));
                        if (data.sampleInformationList[i].parameterList.length > 0) {
                            for (var j = 0; j < data.sampleInformationList[i].parameterList.length; j++) {
                                if (data.sampleInformationList[i].parameterList[j].parameter != null) {
                                    var $j = data.sampleInformationList[i].parameterList[j].parameter.index-1;
                                    $("input[id='sampleInformationList[" + $i + "].parameterList[" + $j + "].parameter']").prop("checked", true);
                                    $("span[id='sampleInformationList[" + $i + "].parameterList[" + $j + "].minimum']").text(data.sampleInformationList[i].parameterList[j].minimum);
                                    $("span[id='sampleInformationList[" + $i + "].parameterList[" + $j + "].average']").text(data.sampleInformationList[i].parameterList[j].average);
                                    $("span[id='sampleInformationList[" + $i + "].parameterList[" + $j + "].maximum']").text(data.sampleInformationList[i].parameterList[j].maximum);
                                }
                            }
                        }
                        if (data.sampleInformationList[i].heavyMetalList.length > 0) {
                            for (var j = 0; j < data.sampleInformationList[i].heavyMetalList.length; j++) {
                                if (data.sampleInformationList[i].heavyMetalList[j].heavyMetal != null) {
                                    var $j = data.sampleInformationList[i].heavyMetalList[j].heavyMetal.index-1;
                                    $("input[id='sampleInformationList[" + $i + "].heavyMetalList[" + $j + "].heavyMetal']").prop("checked", true);
                                    $("span[id='sampleInformationList[" + $i + "].heavyMetalList[" + $j + "].minimum']").text(data.sampleInformationList[i].heavyMetalList[j].minimum);
                                    $("span[id='sampleInformationList[" + $i + "].heavyMetalList[" + $j + "].average']").text(data.sampleInformationList[i].heavyMetalList[j].average);
                                    $("span[id='sampleInformationList[" + $i + "].heavyMetalList[" + $j + "].maximum']").text(data.sampleInformationList[i].heavyMetalList[j].maximum);
                                }
                            }
                        }
                    }
                }
            }
        },
        error:function (result) {

        }
    });
    $("#viewExcelModal").modal('show');
}

/**
 * 已作废
 */
function setInvalid(e) {
    var r = confirm("确认作废该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setLaboratoryTestInvalid",
            async: false,
            dataType: "json",
            data: {"laboratoryTestNumber": id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 已化验
 */
function setTested(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type:"POST",
        url:"setLaboratoryTestTested",
        async:false,
        dataType:"json",
        data:{"laboratoryTestNumber":id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}

/**
 * 已提交
 */
function setSubmit(e) {
    var r = confirm("确认提交该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "submit",
            async: false,
            dataType: "json",
            data: {"laboratoryTestNumber": id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 已确认
 */
function setConfirm(e) {
    var r = confirm("确认签收该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "confirm",
            async: false,
            dataType: "json",
            data: {"laboratoryTestNumber": id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}