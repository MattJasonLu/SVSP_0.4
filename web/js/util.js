/**
 * Created by matt on 2018/7/20.
 */
/**
 * 更新版本号
 * @param versionId
 * @returns {*}
 */
function updateVersion(versionId) {
    if (versionId == "") return "V1.0";
    var id = versionId.split(/[vV]/)[1];
    var num = parseFloat(id);
    console.log(num);
    num = (num + 0.1).toFixed(1);
    console.log(num);
    if (isNaN(num)) return "V1.0";
    return "V" + num;
}

/////////////显示登陆日志（分页）//////////////////////
var currentPage = 1;                          //当前页数
var isSearch = false;
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "totalLogRecord",                  // url
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
    setDataList(result);
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
        url: "getLog",         // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined) {
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
            url: "getLog",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
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
    }
}

/**
 * 分页 获取登陆日志首页内容
 * */
function showLog() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
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
        url: "getLog",                      // url
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

function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var id = 1;
    var tr = $("#clonedTr2");
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

/////////////////////////////////////////////
/**
 * 通过字符串获取处置类别
 * @param handleCategory
 * @returns {*}
 */
function getHandleCategoryFromStr(handleCategory) {
    var res;
    switch (handleCategory) {
        case "污泥":
            res = "Sludge";
            break;
        case "废液":
            res = "WasteLiquid";
            break;
        case "散装料":
            res = "Bulk";
            break;
        case "破碎料":
            res = "Crushing";
            break;
        case "精馏残渣":
            res = "Distillation";
            break;
        case "悬挂连":
            res = "Suspension";
            break;
        default:
            res = "";
            break;
    }
    return res;
}

/**
 * 通过字符串获取物质形态
 * @param formType
 * @returns {*}
 */
function getFormTypeFromStr(formType) {
    var res;
    switch (formType) {
        case "气体":
            res = "Gas";
            break;
        case "液体":
            res = "Liquid";
            break;
        case "固体":
            res = "Solid";
            break;
        case "半固态":
            res = "HalfSolid";
            break;
        default:
            res = "";
            break;
    }
    return res;
}

/**
 * 通过字符串获取包装方式
 * @param packageType
 * @returns {*}
 */
function getPackageTypeFromStr(packageType) {
    var res;
    switch (packageType) {
        case "吨袋":
            res = "Bag";
            break;
        case "标准箱":
            res = "Box";
            break;
        case "吨箱":
            res = "Ton";
            break;
        case "小袋":
            res = "Pouch";
            break;
        case "铁桶":
            res = "Iron";
            break;
        default:
            res = "";
            break;
    }
    return res;
}

/**
 * 通过字符串获取处理方式
 * @param formType
 * @returns {*}
 */
function getProcessWayFromStr(formType) {
    var res;
    switch (formType) {
        case "焚烧":
            res = "Burning";
            break;
        case "填埋":
            res = "Landfill";
            break;
        default:
            res = "";
            break;
    }
    return res;
}

/**
 * 全选功能
 */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}

/**
 * 校验权限
 * @param e 要进入的功能
 */
function checkAuthority(e) {
    var flag = false;
    // 获取功能编号
    var functionId = e.prop('id').split('_')[1];
    $.ajax({
        type: "POST",                            // 方法类型
        url: "checkAuthority",                           // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            functionId: functionId
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined && result.status == "success") {
                var data = eval(result);
                // 进入功能
                flag = true;
            } else {
                // 提示没有权限进入
                if (result.message == undefined) alert("未正确登录！");
                else alert(result.message);
                e.prop('href', '#');
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    return flag;
}

/**
 * 将危废英文名转换成中文
 * @param str
 * @returns {*}
 */
function convertStrToWastesName(str) {
    var name;
    switch (str) {
        case 'slag':
            name = '炉渣';
            break;
        case 'ash':
            name = '飞灰';
            break;
        case 'bucket':
            name = '桶';
            break;
        default:
            name = '';
            break;
    }
    return name;
}