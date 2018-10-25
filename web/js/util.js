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
        case "吨桶":
            res = "Ibc";
            break;
        default:
            res = "";
            break;
    }
    return res;
}

/*通过字符串获取运输方式*/
function getTransportTypeFromStr(transportType) {
    var res;
    switch (transportType) {
        case "铁路":
            res = "Railway";
            break;
        case "公路":
            res = "Highway";
            break;
        case "水路":
            res = "Waterway";
            break;
        case "航空":
            res = "Aviation";
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
///
/**
 * 校验权限
 * @param e 要进入的功能
//  */
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
                if (result.message == undefined) alert("账号过期，请重新登录！");
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
            name = str;
            break;
    }
    return name;
}

/**
 * 重置页面功能
 */
function reset() {
    window.location.reload();
}

/**
 * 回车跳转（输入页数回车跳转页面）
 */
function enterSwitchPage(){
    if(event.keyCode === 13){
        inputSwitchPage();
    }
}

/**
 * 分页：设置选中页页码标蓝
 * @param item
 */
function addAndRemoveClass(item){
    $(".oldPageClass").removeClass("active");         // 将之前标蓝的页码取消
    $(".oldPageClass").removeClass("oldPageClass");
    console.log($(item).parent());
    $(item).parent().addClass("active");            // 将当前页面标蓝
    $(item).parent().addClass("oldPageClass");
    console.log($(item).parent());
}

/**
 * 分页：点击上下页按钮时页码标蓝
 */
function addPageClass(pageNumber){
    $(".oldPageClass").removeClass("active");                 // 移除上一次页码标蓝
    $(".oldPageClass").removeClass("oldPageClass");
    $.each($("#previous").next().nextAll(),function(index,item){
        if($(item).find("a").text() == pageNumber){
            $(item).addClass("active");
            $(item).addClass("oldPageClass");
        }
    });
}


/**
 * 省略显示页码
 */
function setPageCloneAfter(currentPageNumber) {
    var total = totalPage();
    var pageNumber = 5;         // 页码数
    if (total > pageNumber) { // 大于5页时省略显示
        $(".beforeClone").remove();          // 删除之前克隆页码
        $("#next").prev().hide();            // 将页码克隆模板隐藏
        if (currentPageNumber <= (parseInt(pageNumber/2) + 1)) {   // 如果pageNumber = 5,当前页小于3显示前五页
            for (var i = 0; i < pageNumber; i++) {
                var li = $("#next").prev();
                var clonedLi = li.clone();
                clonedLi.show();
                clonedLi.find('a:first-child').text(i + 1);          // 页数赋值
                clonedLi.find('a:first-child').click(function () {    // 设置点击事件
                    var num = $(this).text();
                    switchPage(num);        // 跳转页面
                });
                clonedLi.addClass("beforeClone");
                clonedLi.removeAttr("id");
                clonedLi.insertAfter(li);
            }
        } else if(currentPageNumber <= total - parseInt(pageNumber/2)){  // 如果pageNumber = 5,大于3时显示其前后两页
            for (var i = currentPage - parseInt(pageNumber/2); i <= parseInt(currentPage) + parseInt(pageNumber/2); i++) {
                var li = $("#next").prev();
                var clonedLi = li.clone();
                clonedLi.show();
                clonedLi.find('a:first-child').text(i);          // 页数赋值
                clonedLi.find('a:first-child').click(function () {    // 设置点击事件
                    var num = $(this).text();
                    switchPage(num);        // 跳转页面
                });
                clonedLi.addClass("beforeClone");
                clonedLi.removeAttr("id");
                clonedLi.insertAfter(li);
            }
        } else if(currentPageNumber > total - parseInt(pageNumber/2)){    // 如果pageNumber = 5,显示最后五页
            for (var i = total - pageNumber + 1; i <= total; i++) {
                var li = $("#next").prev();
                var clonedLi = li.clone();
                clonedLi.show();
                clonedLi.find('a:first-child').text(i);          // 页数赋值
                clonedLi.find('a:first-child').click(function () {    // 设置点击事件
                    var num = $(this).text();
                    switchPage(num);        // 跳转页面
                });
                clonedLi.addClass("beforeClone");
                clonedLi.removeAttr("id");
                clonedLi.insertAfter(li);
            }
        }
    }
    if(currentPageNumber == 1){
        $("#previous").next().next().eq(0).addClass("oldPageClass");
        $("#previous").next().next().eq(0).addClass("active");       // 将首页页码标蓝
    }
}

/**
 * 返回上一页
 */
function backLastPage(){
    history.back();
}

/**
 * 获取当前登陆用户数据
 */
function getCurrentUserData(){
    var data = null;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentUserInfo",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                data = eval(result.data);
                console.log(data);
                // 各下拉框数据填充
        // return result.data;
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    return data;
}