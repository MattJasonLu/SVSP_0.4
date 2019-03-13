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
        case "悬挂链":
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
        case "塑料桶":
            res = "Plastic";
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

/**
 * 全选功能2
 */
function allSelect1() {
    var isChecked = $('#allSel1').prop('checked');
    if (isChecked) $("input[name='select1']").prop('checked', true);
    else $("input[name='select1']").prop('checked', false);
}

///
/**
 * 校验权限
 * @param e 要进入的功能
 //  */
function checkAuthority(e) {
    var flag = false;
    // 获取功能编号
    var functionId = e.attr('id').split('_')[1];
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
                flag = false;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    return flag;
}

/**
 * 根据ID校验权限
 * @param functionId
 //  */
function checkAuthorityById(functionId) {
    var flag = false;
    // 获取功能编号
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
                flag = false;
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

function convertSecondWastesNameEngToChn(str) {
    var name;
    switch (str) {
        case '炉渣':
            name = 'slag';
            break;
        case '飞灰':
            name = 'ash';
            break;
        case '桶':
            name = 'bucket';
            break;
        case '活性炭':
            name = 'activated_carbon';
            break;
        case '耐火材料':
            name = 'refractory';
            break;
        case '滤芯':
            name = 'filter';
            break;
        case '污泥':
            name = 'sludge';
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
function enterSwitchPage() {
    if (event.keyCode === 13) {
        inputSwitchPage();
    }
}

/**
 * 分页：设置选中页页码标蓝
 * @param item
 */
function addAndRemoveClass(item) {
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
function addPageClass(pageNumber) {
    $(".oldPageClass").removeClass("active");                 // 移除上一次页码标蓝
    $(".oldPageClass").removeClass("oldPageClass");
    $.each($("#previous").next().nextAll(), function (index, item) {
        if ($(item).find("a").text() == pageNumber) {
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
        if (currentPageNumber <= (parseInt(pageNumber / 2) + 1)) {   // 如果pageNumber = 5,当前页小于3显示前五页
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
        } else if (currentPageNumber <= total - parseInt(pageNumber / 2)) {  // 如果pageNumber = 5,大于3时显示其前后两页
            for (var i = currentPage - parseInt(pageNumber / 2); i <= parseInt(currentPage) + parseInt(pageNumber / 2); i++) {
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
        } else if (currentPageNumber > total - parseInt(pageNumber / 2)) {    // 如果pageNumber = 5,显示最后五页
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
    if (currentPageNumber == 1) {
        $("#previous").next().next().eq(0).addClass("oldPageClass");
        $("#previous").next().next().eq(0).addClass("active");       // 将首页页码标蓝
    }
}

/**
 * 返回上一页
 */
function backLastPage() {
    history.back();
}

/**
 * 获取当前登陆用户数据
 */
function getCurrentUserData() {
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

/**
 * 数组去重
 * */
function unique1(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
            hash.push(arr[i]);
        }
    }
    return hash;
}

function getCurrentUserInfo() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentUserInfo",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.status == "fail") {
                if (data == null || result.message == "用户未正常登陆") {
                    window.location.href = "admin.html";
                }
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
 * 判断数字是否为-9999，若为-9999，则变为--
 * @param number 数字
 * @returns {*}
 */
function setNumber2Line(number) {
    if (number == null || number == -9999 || number == '' || number == '-9999' || number == 'null')
        return "--";
    else return number;
}

/**
 * 单位转化为枚举
 * **/
function getFormTypeByFromStr(str) {
    var name;
    switch (str) {
        case ('公斤'):
            name = 'Kg'
            break;
        case ('吨'):
            name = 'T'
            break;
        case ('斤'):
            name = 'Catty'
            break;
        case ('套'):
            name = 'Set'
            break;
        case ('台'):
            name = 'Platform'
            break;
        case ('只'):
            name = 'Only'
            break;
        case ('根'):
            name = 'Root'
            break;
        case ('盒'):
            name = 'Box'
            break;
        case ('箱'):
            name = 'Chest'
            break;
        case ('张'):
            name = 'Spread'
            break;
        case ('把'):
            name = 'Hold'
            break;
        case ('米'):
            name = 'Metre'
            break;
        case ('桶'):
            name = 'Bucket'
            break;
        case ('包'):
            name = 'Package'
            break;
        case ('个'):
            name = 'Individual'
            break;
        case ('卷'):
            name = 'Volume'
            break;
        case ('平方'):
            name = 'Square'
            break;
        case ('盘'):
            name = 'Disc'
            break;
    }

    return name;
}


/*
 * 进料方式转化为数据字典编号
 */
function getIdFromHandleCategory(HandleCategory) {
    var res;
    switch (HandleCategory) {
        case "污泥":
            res = 28;
            break;
        case "废液":
            res = 29;
            break;
        case "散装料":
            res = 30;
            break;
        case "破碎料":
            res = 31;
            break;
        case "精馏残渣":
            res = 32;
            break;
        case "悬挂链":
            res = 33;
            break;
        default:
            res = "";
            break;
    }
    return res;
}


/*
 * 处置方式转化为数据字典编号
 */
function getIdFromProcessWay(ProcessWay) {
    var res;
    switch (ProcessWay) {
        case "焚烧":
            res = 44;
            break;
        case "填埋":
            res = 45;
            break;
        case "清洗":
            res = 46;
            break;
        default:
            res = "";
            break;
    }
    return res;
}

/*
 * 处置设备转化为数据字典编号
 */
function getIdFromEquipment(Equipment) {
    var res;
    switch (Equipment) {
        case "医疗蒸煮系统":
            res = 22;
            break;
        case "A2":
            res = 23;
            break;
        case "B2":
            res = 24;
            break;
        case "二期二燃室":
            res = 25;
            break;
        case "三期预处理系统":
            res = 26;
            break;
        case "备2":
            res = 27;
            break;
        default:
            res = "";
            break;
    }
    return res;
}

//////////////////动态菜单///////////////////////
/**
 * 加载导航条
 */
function loadNavigationList() {
    console.log("旧动态菜单数据");
    console.log(JSON.parse(localStorage.getItem("menuOrganization")));
    toDoThingRemind();   // 设置代办事项提醒
    if (JSON.parse(localStorage.getItem("menuOrganization")) == null) {  // 如果数据为空则进行查询
        // 获取动态菜单数据
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getMenuTree",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result != null && result.status === "success") {
                    var obj = JSON.stringify(result.data);
                    localStorage.setItem("menuOrganization", obj);
                }
            },
            error: function (result) {
                console.log(result.message);
            }
        });
    }
    if (JSON.parse(localStorage.getItem("menuOrganization")) != null) { // 如果获取到数据就直接用
        $(".fadeInUp").children().remove();   // 删除之前一级菜单
        var result = JSON.parse(localStorage.getItem("menuOrganization"));
        var data = result.organizationList;
        console.log("动态菜单数据：");
        console.log(result);
        // 设置以及菜单
        var j = 0;
        var secondMenuList = [];  // 存放需要设置的二级菜单列表
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id; // 设置节点数据
                var pId = data[i].pId;
                var name = data[i].name;
                var url = data[i].url;
                var icon = data[i].icon;
                // 设置一级菜单
                if (0 < data[i].pId && data[i].pId < 10) {
                    j++;
                    // 设置需要插入的标签
                    var li = "<li ><a class='withripple' href='#' id='function_" + id + "'" +
                        "onclick='check(this); function check(e){if(checkAuthority($(e))){toMenuUrl(e);}} '><span class='" + icon + "'" +
                        "aria-hidden='true'></span><span class='sidespan' name='" + name + "'>&nbsp;&nbsp;" + name + "</span><span class='iright pull-right'>" +
                        "&gt;</span><span class='sr-only'>(current)</span></a></li>";
                    // $("#end").before(li);
                    $(".fadeInUp").append(li); // 插入到内部的最后
                    if (localStorage.name != "" && localStorage.name != null) {
                        if (localStorage.name === data[i].name) {
                            secondMenuList = data[i].organizationList;  // 将一级菜单的二级菜单列表设置给一级菜单
                        }
                    }
                }
            }
        }
        // 设置二级菜单
        if (secondMenuList != null && secondMenuList.length > 0) {    //设置二级菜单
            $("#navbar").children().eq(0).children().remove();  // 删除之前二级菜单数据
            setMenuTwo(secondMenuList);//递归设置二级菜单导航条
            var href = window.location.href.toString();
            if (href.substring(href.length - 14) === "firstPage.html") { // 判断是否为板块首页
                setProcessIcon(secondMenuList); // 首页设置流程节点图标
            }
            // 如果是网页则设置历史记录抬头导航
            if ($("ol[class='breadcrumb']").length > 0) {  // 有历史导航栏的判定为网页
                var url = window.location.href.toString();
                url = (url.substring(url.lastIndexOf("/") + 1)).replace("#", "");        // 获取当前url
                // 在secondMenuList中查找路径
                var organizationA = {};
                organizationA.url = url;
                organizationA.name = localStorage.name;
                organizationA.organizationList = secondMenuList;
                if (organizationA.organizationList != null && organizationA.organizationList.length > 0) {
                    var orga = findWayTree(organizationA);
                    organizationA.organizationList = orga.organizationList;
                }
                $("ol[class='breadcrumb']").children().remove();  // 删除历史数据
                setOLMenu(organizationA); // 动态递归设置历史导航栏
                // 设置二级菜单选中
                if ($("ol[class='breadcrumb']").find("li").eq(1).length > 0)  // 更新二级菜单名
                    localStorage.secondMenuName = $("ol[class='breadcrumb']").find("li").eq(1).text();  // 获取二级菜单名
                $("#navbar").find("a:contains('" + localStorage.secondMenuName + "')").parent().addClass("active");  // 设置二级菜单标蓝
            }
        }
        // 设置一级菜单选中标蓝
        $("ul[class='sidenav animated fadeInUp']").children().find("span[name='" + localStorage.name + "']").parent().parent().addClass("active");
    }
    // 设置代办事项提示

}

/**
 * 根据URL寻找在一级菜单树中的路径
 * @param organization1
 */
function findWayTree(organization1) {
    var organization2 = {};// 初始化
    organization2.name = "";
    var organizationList = [];
    for (var i = 0; i < organization1.organizationList.length; i++) {
        var organization = organization1.organizationList[i];
        if (organization.url !== "" && organization.url === organization1.url) {
            organization2.name = organization1.name;
            organizationList.push(organization);
            organization2.organizationList = organizationList;
        } else {
            if (organization.organizationList != null && organization.organizationList.length > 0) {
                organization.url = organization1.url;// 将url 传递给孩子用于查找
                var organization3 = findWayTree(organization);
                if (organization3 != null && organization3.name !== "") {
                    organization2.name = organization1.name;
                    organizationList.push(organization3);
                    organization2.organizationList = organizationList;
                }
            }
        }
    }
    return organization2;
}

/**
 * 设置历史导航栏
 * @param organization
 */
function setOLMenu(organization) {
    var ol = $("ol[class='breadcrumb']");
    var li = "";
    if (organization.organizationList != null && organization.organizationList.length > 0) { // 如果不是最后一页
        if (organization.url === "") organization.url = "#";
        li = "<li><a href='" + organization.url + "'>" + organization.name + "</a></li>"; // 设置插入对象
        ol.append(li);  // 插入
        setOLMenu(organization.organizationList[0]);  // 递归设置,一直到最后一页
    } else { // 如果是最后一页
        li = "<li class='active'>" + organization.name + "</li>"; // 设置插入对象
        ol.append(li);  // 插入
    }
}

/**
 * 根据名字获取一级菜单的子节点并设置二级菜单
 * @param item
 */
function toMenuUrl(item) {
    localStorage.name = $.trim($(item).find("span").eq(1).text());
    window.location.href = "firstPage.html"; //根据一级菜单名跳转首页
}

/**
 * 递归设置导航条
 * @param organizationList
 */
function setMenuTwo(organizationList) {
    if (organizationList != null) {
        for (var i = 0; i < organizationList.length; i++) {
            var organization = organizationList[i];
            if (organization.organizationList != null && organization.organizationList.length > 0) { //菜单存在子节点
                var li = "";
                if (9 < organization.pId && organization.pId < 100) {  // 二级菜单设置下拉框为下垂
                    if (i > 0) {
                        li = "<li role='separator' class='divider'></li>" +
                            "<li name='dropdown' class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' " +
                            "aria-haspopup='true' aria-expanded='false'>" + organization.name + "<span class='caret'></span>" +
                            "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                            "</ul></li>";
                    } else if (i === 0) { // 第一个子节点不设置分割线
                        li = "<li name='dropdown' class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' " +
                            "aria-haspopup='true' aria-expanded='false'>" + organization.name + "<span class='caret'></span>" +
                            "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                            "</ul></li>";
                    }
                } else if (organization.pId > 99) {     // 三级菜单及以后设置为右开
                    if (i > 0) {
                        li = "<li role='separator' class='divider'></li>" +
                            "<li name='dropdown' class='dropdown-submenu'><a href=''>" + organization.name +
                            "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                            "</ul></li>";
                    } else if (i === 0) {// 第一个子节点不设置分割线
                        li = "<li name='dropdown' class='dropdown-submenu'><a href=''>" + organization.name +
                            "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                            "</ul></li>";
                    }
                }
                var drop = null;
                for (var j = 0; j < $("#navbar").children().eq(0).find(".dropdown-menu").length; j++) { // 在所有drop中查找父级的最后一个
                    if ($("#navbar").children().eq(0).find(".dropdown-menu").eq(j).attr("name") === (organization.level - 1).toString()) { // 插入到父辈
                        drop = $("#navbar").children().eq(0).find(".dropdown-menu").eq(j);
                    }
                }
                if (drop != null) {
                    //  $("#navbar").children().eq(0).find(".dropdown-menu:last").append(li); // 将其插入到新建的下拉框之中
                    drop.append(li);
                } else {
                    $("#navbar").children().eq(0).append(li); // 插入到二级菜单内最后
                }
                setMenuTwo(organization.organizationList);  // 递归设置
            } else { // 菜单不存在子节点
                if (9 < organization.pId && organization.pId < 100) { // 二级菜单没有子类直接设置导航条
                    var li3 = "<li><a href='" + organization.url + "' id='function_" + organization.id + "' " +
                        "onclick='checkAuthority($(this))'> " + organization.name + "</a></li>";  // 赋值
                    $("#navbar").children().eq(0).append(li3);      //插入
                } else { // 非二级菜单的页面需要将其插入到下拉菜单中
                    var dropdown = null;
                    for (var j = 0; j < $("#navbar").children().eq(0).find("li[name='dropdown']").length; j++) { // 在所有drop中查找父级的最后一个
                        if ($("#navbar").children().eq(0).find("li[name='dropdown']").eq(j).find("ul").attr("name") === (organization.level - 1).toString()) { // 插入到父辈
                            dropdown = $("#navbar").children().eq(0).find("li[name='dropdown']").eq(j); // 获取最后一个菜单下拉框(即最近添加的一个)
                        }
                    }
                    var li2 = "";
                    if (i > 0) {
                        li2 = "<li role='separator' class='divider'></li>" +
                            "<li><a href='" + organization.url + "' id='function_" + organization.id + "' " +
                            "onclick='checkAuthority($(this))'>" + organization.name + "</a></li>";
                    } else if (i === 0) { // 第一个子节点不设置分割线
                        li2 = "<li><a href='" + organization.url + "' id='function_" + organization.id + "' " +
                            "onclick='checkAuthority($(this))'>" + organization.name + "</a></li>";
                    }
                    dropdown.find("ul[name='" + (organization.level - 1).toString() + "']").append(li2);
                }
            }
        }
    }
}

var name = "";  // 暂存二级菜单名

/**
 * 设置流程节点图标
 * @param result
 */
function setProcessIcon(organizationList) {
    $("ul[class='nav navbar-nav']").find("li").eq(0).addClass("active");   // 设置首页二级菜单导航栏标蓝
    for (var i = 0; i < organizationList.length; i++) {  // 首页排除
        // if(i == 0){
        //     var br = "<div class='row'></div>";
        //     $(".page-header").append(br);  // 在首行插入空行调节样式
        // }
        var organization = organizationList[i];
        name = organization.name;
        if (organization.name != "首页") {
            var div = "<div class='row placeholders'></div>";
            if ((i - 1) % 3 === 0) { // 三个设置为一行
                $(".page-header").append(div); // 插入新行
            }
            if (organization.icon != null && organization.icon != "" && organization.url != null && organization.url != "") {
                var div1 = "<div class='col-xs-4 col-sm-4 placeholder'>" +
                    "<a href='" + organization.url + "' id='function_" + organization.id + "' onclick='checkAuthority($(this));'><img src='" + organization.icon + "' style='width: 80px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
                    "<h4>" + organization.name + "</h4></div>";
                $(".page-header").find("div[class='row placeholders']:last").append(div1);  // 将节点插入到最新行
            } else {
                if (organization.organizationList != null && organization.organizationList.length > 0) {
                    setProcessIcon1(organization.organizationList);  // 如果二级菜单不是网页，则用它的第一个网页节点代替
                }
            }
        }
    }
}

/**
 * 将二级菜单的第一个网页节点图标设置为流程节点图标
 * @param organizationList
 */
function setProcessIcon1(organizationList) {
    var organization1 = organizationList[0];     // 如果二级菜单不是网页，则用它的第一个节点代替
    if (organization1 != null && organization1.organizationList != null && organization1.organizationList.length > 0) {
        setProcessIcon1(organization1.organizationList);
    } else {
        var div2 = "<div class='col-xs-4 col-sm-4 placeholder'>" +
            "<a href='" + organization1.url + "'><img src='" + organization1.icon + "' style='width: 80px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
            "<h4>" + name + "</h4></div>";
        $(".page-header").find("div[class='row placeholders']:last").append(div2);  // 将节点插入到最新行
    }
}

//////////////////////////////////////////
/*审批方法
* 订单编号orderId
* 角色编号roleId
* */
function publicApproval(orderId, roleId) {
       $.ajax({
        type: "POST",                       // 方法类型
        url: "publicApproval",              // url
        data: {"orderId": orderId, "roleId": roleId},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                console.log(data);
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
 * 将字符串转化为固定个数，不足位数用0填充
 * @param str  需要转化的字符串
 * @param number  需要转化的位数
 */
function getFormatNumber(str, number) {
    if (str.length > number) {  // 超过位数截取前number位
        str = str.substring(0, number);
    } else if (str.length < number) {  // 不足位数用0补足
        for (var i = 0; i <= number - str.length; i++) {  // 获取需要填充的位数
            str = "0" + str;
        }
    }
    return str;
}


/*提交方法
* 订单编号orderId
* 角色编号roleId
* */
function publicSubmit(orderId, url,userName,roleId) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "publicSubmit",              // url
        data: {"url": url, "userName": userName,"orderId":orderId,"roleId":roleId},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
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

/*获取当前url*/
function getUrl() {
    return window.location.pathname.replace("/","");
}

/**
 * 代办事项提醒
 */
function toDoThingRemind() {
    console.log("代办事项："+localStorage.toDoThingCount);
    var count = parseInt(localStorage.toDoThingCount);   // 代办事项总数
    var user = getCurrentUserData();
    if(user == null || user === {}) {  // 如果未登陆则进行登陆
        window.location.href="admin.html";
    }else {
        if(count > 0) {  // 如果存在代办事项则提醒
            console.log("count:"+count);
            $(".wrap").removeClass("wrap");  // 删除历史提醒
            $(".wrap1").removeClass("wrap1");
            $(".notice1").remove();
            var div = "<div class=\"notice1\">"+count+"</div>";
            $(".navbar-right").children().eq(0).children().children().after(div);
            $(".navbar-right").children().eq(0).children().eq(0).addClass("wrap1");
        }else{  // 不存在则删除历史提醒
            $(".wrap").removeClass("wrap");
            $(".wrap1").removeClass("wrap1");
            $(".notice1").remove();
        }
    }
}

/**
 * 获取并设置代办事项总数
 */
function setToDoThingCount() {
    var approvalProcess= {};
    var page = {};
    page.start = 0;
    page.count = 15;
    approvalProcess.page = page;
    localStorage.toDoThingCount = 0;
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getOrderIdAndUrlByRoleIdCount",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(approvalProcess),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            localStorage.toDoThingCount = result;   // 代办事项总数
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}