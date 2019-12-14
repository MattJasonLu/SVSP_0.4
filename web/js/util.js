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
                // console.log(data);
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

/**
 * 获取当前登陆用户信息
 */
function getCurrentUserInfo() {
    var data = null;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentUserInfo",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.status == "fail") {
                if (result.data == null || result.message == "用户未正常登陆") {
                    window.location.href = "admin.html";
                }
            } else {
                data = result.data;
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
    // loadNavigationList();   // 动态菜单加载
    // console.log("旧动态菜单数据");
    // console.log(JSON.parse(localStorage.getItem("menuOrganization")));
    setToDoThingCount(); // 获取并设置待办事项总数
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
                    var arr = JSON.stringify(result.firstMenuConfiguration);
                    localStorage.setItem("menuOrganization", obj);
                    localStorage.setItem("firstMenuConfiguration", arr);
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
                    if (localStorage.firstMuneName != null && localStorage.firstMuneName != "") {
                        if (localStorage.firstMuneName === data[i].name) {
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
                var firstMenuConfiguration = JSON.parse(localStorage.getItem("firstMenuConfiguration"));
                var newSecondMenuList = [];   // 新二级菜单数据（首页显示节点）
                if(firstMenuConfiguration != null) {
                    var firstMenuConfigurationList = firstMenuConfiguration.organizationList;
                    if(firstMenuConfigurationList != null) {  // 自定义首页数据
                        $.each(firstMenuConfigurationList,function(index, item) {
                            if(item.name === localStorage.firstMuneName) {  // 查询到匹配的一级菜单名
                                if(item.organizationList != null && item.organizationList.length > 0) {  // 自定义首页有数据
                                    newSecondMenuList = item.organizationList;
                                    console.log("二级菜单数据更新");
                                    console.log(newSecondMenuList);
                                }
                            }
                        });
                    }
                }
                if(newSecondMenuList != null && newSecondMenuList.length > 0){
                    setProcessIcon(newSecondMenuList);
                }else {
                    setProcessIcon(secondMenuList); // 首页设置流程节点图标
                }

            }
            // 如果是网页则设置历史记录抬头导航
            if ($("ol[class='breadcrumb']").length > 0) {  // 有历史导航栏的判定为网页
                var url = window.location.href.toString();
                url = (url.substring(url.lastIndexOf("/") + 1)).replace("#", "");        // 获取当前url
                // 在secondMenuList中查找路径
                var organizationA = {};
                organizationA.url = url;
                organizationA.name = localStorage.firstMuneName;
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
                $.each($("#navbar").find("a"), function(index,item){
                    if($.trim($(item).text()) === localStorage.secondMenuName) {    // 精确匹配
                        $(item).parent().addClass("active");  // 设置二级菜单标蓝
                    }
                });
                // $("#navbar").find("a:contains('" + localStorage.secondMenuName + "')").parent().addClass("active");  // 设置二级菜单标蓝
            }
        }
        // 设置一级菜单选中标蓝
        $("ul[class='sidenav animated fadeInUp']").children().find("span[name='" + localStorage.firstMuneName + "']").parent().parent().addClass("active");
    }
    // 设置代办事项提示
}

/**
 * 获取首页节点自定义页面数据
 */
function getFirstMenuPageConfigurationList() {

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
    localStorage.firstMuneName = $.trim($(item).find("span").eq(1).text());
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
    // console.log("二级菜单数据");
    // console.log(organizationList);
    var j = 1;   // 计数器
    for (var i = 0; i < organizationList.length; i++) {  // 首页排除
        // if(i == 0){
        //     var br = "<div class='row'></div>";
        //     $(".page-header").append(br);  // 在首行插入空行调节样式
        // }
        var organization = organizationList[i];
        name = organization.name;
        if (organization.name !== "首页") {
            var div = "<div class='row placeholders'></div>";
            if ((j - 1) % 3 === 0) { // 三个设置为一行
                $(".page-header").append(div); // 插入新行
            }
            j++;
            if (organization.icon != null && organization.icon !== "" && organization.url != null && organization.url !== "") {
                var div1 = "<div class='col-xs-3 col-sm-3 col-md-3 placeholder'>" +
                    "<a href='" + organization.url + "' id='function_" + organization.id + "' onclick='checkAuthority($(this));'><img src='" + organization.icon + "' style='width: 80px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
                    "<h4>" + organization.name + "</h4></div>";
                $(".page-header").find("div[class='row placeholders']:last").append(div1);  // 将节点插入到最新行
            } else {
                if (organization.organizationList != null && organization.organizationList.length > 0) {
                    setProcessIcon1(organization.organizationList);  // 如果二级菜单不是网页，则用它的第一个网页节点代替
                }
            }
            if(i < organizationList.length - 1) {   // 设置向右箭头图标
                var div1 = "<div class='col-xs-1 col-sm-1 col-md-1 placeholder'>" +
                    "<a ><img src='image/page/arrow_right.png' style='width: 40px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
                    "</div>";
                $(".page-header").find("div[class='row placeholders']:last").append(div1);  // 将节点插入到最新行
            }else {  // 首行插入空图表排版
                var div1 = "<div class='col-xs-1 col-sm-1 col-md-1 placeholder'>" +
                    "<a ></a>" +
                    "</div>";
                $(".page-header").find("div[class='row placeholders']:last").append(div1);  // 将节点插入到最新行
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
        var div2 = "<div class='col-xs-3 col-sm-3 col-md-3 placeholder'>" +
            "<a href='" + organization1.url + "'><img src='" + organization1.icon + "' style='width: 80px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
            "<h4>" + name + "</h4></div>";
        $(".page-header").find("div[class='row placeholders']:last").append(div2);  // 将节点插入到最新行
    }
}

//字符串中返回字符的位置
function getStrIndex(str,target) {
    return str.indexOf(target);
}

//////////////////////////////////////////


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

/**
 * 代办事项提醒
 */
function toDoThingRemind() {
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

var submitFName;

/*传给提交方法名*/
function initSubmitFName(functionName) {
    submitFName = functionName;
}

/*审批方法
* 订单编号orderId
* 角色编号roleId
* */
function publicApproval(orderId, roleId,approvalAdvice) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "publicApproval",              // url
        data: {"orderId": orderId, "roleId": roleId,"approvalAdvice":approvalAdvice},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success"&&result.message=='审批通过') {
                alert(result.message);
                //具体的提交方法
                if(submitFName!=undefined&&submitFName!=null&&submitFName.length>=0){
                    window[submitFName](orderId);
                    var url=getUrl();
                    var storage=window.localStorage;
                    storage['approvalId']=orderId;
                    window.location.href=url;
                    if(selectSupremeNodeByOrderId(orderId)){//做订单的审批即可
                        //订单审批

                        if(approvalFName!=undefined&&approvalFName!=null&&approvalFName.length>=0){
                            window[approvalFName](orderId);//以方法名调用改方法
                            var url=getUrl();
                            var storage=window.localStorage;
                            storage['approvalId']=orderId;
                            window.location.href=url;
                        }
                        alert('单据审批完成，通过')

                    }
                }
                // console.log(data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

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
            if (result != undefined && result.status == "success" && result.message == '提交成功') {
                alert(result.message);
                // console.log(result.message)
                if(submitFName!=undefined&&submitFName!=null&&submitFName.length>=0){
                    window[submitFName](orderId);
                    window.location.reload()
                    var url=getUrl();
                    var storage=window.localStorage;
                    storage['approvalId']=orderId;
                    window.location.href=url;
                }

            }
            else {
               alert(result.message);
            }
        },
        error: function (result) {
            alert(result.message);
        }
    });

}

/*获取当前url*/
function getUrl() {
    // console.log(window.location.pathname) //相对路径
    // // console.log(window.location.port)
    // console.log(window.location.host)
    // console.log(window.location.host+window.location.pathname)
    // return window.location.host+window.location.pathname
    // console.log(window.location.pathname.replace("/","").replace("SVSP","").replace("/",""))
   console.log(window.location.href+"123")

    // return window.location.href
    return window.location.pathname.replace("/","").replace("SVSP","").replace("Test","").replace("/","");
    //主机:端口+网址

}



/*获取从待办事项传递过来的id*/
function getApprovalId() {
    var id=window.localStorage['approvalId'];
    return id;
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

/*查看顶级节点的状态是否通过（1）*/
function selectSupremeNodeByOrderId(orderId) {
    var flag=false;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "selectSupremeNodeByOrderId",              // url
        data: {"orderId":orderId},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
                console.log(result)
                flag=result;
        },
        error: function (result) {
           alert('服务器异常')
        }
    });
    return flag;
}


/*驳回公共方法*/
function publicBack(orderId, roleId,approvalAdvice,radio) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "publicBack",              // url
        data: {"orderId": orderId, "roleId": roleId,"approvalAdvice":approvalAdvice,"radio":radio},
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success"&&result.message=='已驳回') {
                alert(result.message);
                if(backFName!=undefined&&backFName!=null&&backFName.length>=0){
                    window[backFName](orderId);//以方法名调用改方法
                    var url=getUrl();
                    var storage=window.localStorage;
                    storage['approvalId']=orderId;
                    window.location.href=url;
                }
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/*审批模态框*/
function setApprovalModal (data) {
    var table=$('#approvalTable');
    table.empty();
    $.each(data,function (index,item) {
        if(index==0){
            var tr="<tr id='"+item.roleId+"' >\n" +
                "                        <td class=\"text-center\" style=\"width: 20%\"><span class=\"glyphicon glyphicon-arrow-down\"></span></td>\n" +
                "                        <td style=\"width: 80%;padding: 10px\">\n" +
                "                            <p class=\"time\" style=\"color: #8ec9ff;\">"+getTimeStr(item.approvalDate)+"</p>\n" +
                "                            <h3>发起人：<span>"+item.userName+"</span></h3>\n" +
                "                            <b>审批意见:</b>\n" +
                "                            <br>\n" +
                "                            <span style=\"display: inline-block;width: 80%\">"+item.approvalAdvice+"</span>\n" +
                "                        </td>\n" +
                "                    </tr>"
        }
        if(index>0) {
            var tr="<tr id='"+item.roleId+"' >\n" +
                "                        <td class=\"text-center\" style=\"width: 20%\"><span class=\"glyphicon glyphicon-arrow-down\"></span></td>\n" +
                "                        <td style=\"width: 80%;padding: 10px\">\n" +
                "                            <p class=\"time\" style=\"color: #8ec9ff;\">"+getTimeStr(item.approvalDate)+"</p>\n" +
                "                            <h3>审批人：<span>"+item.userName+"</span></h3>\n" +
                "                            <b>审批意见:</b>\n" +
                "                            <br>\n" +
                "                            <span style=\"display: inline-block;width: 80%\">"+item.approvalAdvice+"</span>\n" +
                "                        </td>\n" +
                "                    </tr>"
        }

        table.append(tr);
    })

    $("#"+getCurrentUserData().role.id+"").attr('style','color: red');
    $("#"+getCurrentUserData().role.id+"").find('h3').children('span').text(getCurrentUserData().name);

}

/*信息查看*/
function viewInfo() {
    // console.log($('#function_-112'))
    //     // console.log($("a[title='查看']")[0])
    $("a[title='查看']")[0].click();
}


/*点击审批显示审批内容*/
function ApprovalModal() {

  if($("#"+getCurrentUserData().role.id+"").find('h3').text().indexOf('发起人')!=-1){
                         alert('发起人无法审批');
  }
  else {


      var orderId = $('#ApprovalOrderId').text();
      var roleId = getCurrentUserData().role.id;
      //1根据订单号和觉得获取节点信息，然后赋值
      $.ajax({
          type: "POST",
          url: "getApprovalNodeByOrderIdAndRoleId",
          async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
          dataType: "json",
          data: {'orderId': orderId, "roleId": roleId},
          success: function (result) {
              if (result != undefined && result.status == "success") {
                  console.log(result);
                  if (result.data != null) {
                      $('#advice').val(result.data.approvalAdvice);
                  }

              }
              else {

              }
          },
          error: function (result) {
              alert("服务器异常!")
          }
      });

      $('#publicApproval').modal('show');
      //订单号和角色Id
  }





}


var approvalFName;//审批方法名称

var backFName;//审批方法名称



/*传给审批方法名*/
function initApprovalFName(functionName) {
    approvalFName = functionName;
}

/*传给驳回方法名*/
function initBakcFName(functionName) {
    backFName = functionName;
}

/*确认审批*/
function confirmApproval() {
    var orderId = $('#ApprovalOrderId').text();
    var roleId=getCurrentUserData().role.id;
    var approvalAdvice=$('#advice').val();
    publicApproval(orderId, roleId,approvalAdvice);
    //单据状态为待审批


    // window.location.reload();
    var url=getUrl();
    var storage=window.localStorage;
    storage['approvalId']=orderId;
    window.location.href=url;
}

/*点击驳回显示驳回内容*/
function ApprovalBack() {
    console.log($("#"+getCurrentUserData().role.id+"").find('h3').text())
    if($("#"+getCurrentUserData().role.id+"").find('h3').text().indexOf('发起人')!=-1){
        alert('发起人无法驳回');
    }
    else {
    var orderId=   $('#ApprovalOrderId').text();
    var roleId=getCurrentUserData().role.id;
    //1根据订单号和觉得获取节点信息，然后赋值
    $.ajax({
        type: "POST",
        url: "getApprovalNodeByOrderIdAndRoleId",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'orderId': orderId,"roleId":roleId},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                if(result.data!=null){
                    $('#backContent').val(result.data.approvalAdvice);
                }

            }
            else {

            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    });
    $('#backApproval').modal('show')
}
}
/*确认驳回*/
function confirmBack() {

    var orderId=   $('#ApprovalOrderId').text();
    var roleId = getCurrentUserData().role.id;
    var approvalAdvice=$('#backContent').val();
    var radio=$("input[name='backLevel']:checked").val();
    publicBack(orderId, roleId,approvalAdvice,radio);
    var url=getUrl();
    var storage=window.localStorage;
    storage['approvalId']=orderId;

    window.location.href=url;


}

/**
 * 跳转到指定的邮箱登录页面
 */
function goToEmail() {
    console.log(getCurrentUserData());
    var url = getCurrentUserData().email;
    if (url !== "") {
        url = getEmail(url);
        window.open("http://" + url, "_blank");  // 跳转到相应得邮箱首页
    } else {
        alert("未找到对应的邮箱登录地址，请自己登录邮箱查看邮件！");
    }
}

/**
 * 双击进入邮箱设置
 */
function emailSettings() {
    $("#emailSettingsModal").modal('show')
}

/**
 * 根据用户的Email跳转到相应的电子邮箱首页
 * @param mail
 * @returns {string}
 */
function getEmail(mail) {
    var t = mail.split('@')[1];
    t = t.toLowerCase();
    if (t == '163.com') {
        return 'mail.163.com';
    } else if (t == 'vip.163.com') {
        return 'vip.163.com';
    } else if (t == '126.com') {
        return 'mail.126.com';
    } else if (t == 'qq.com' || t == 'vip.qq.com' || t == 'foxmail.com') {
        return 'mail.qq.com';
    } else if (t == 'gmail.com') {
        return 'mail.google.com';
    } else if (t == 'sohu.com') {
        return 'mail.sohu.com';
    } else if (t == 'tom.com') {
        return 'mail.tom.com';
    } else if (t == 'vip.sina.com') {
        return 'vip.sina.com';
    } else if (t == 'sina.com.cn' || t == 'sina.com') {
        return 'mail.sina.com.cn';
    } else if (t == 'tom.com') {
        return 'mail.tom.com';
    } else if (t == 'yahoo.com.cn' || t == 'yahoo.cn') {
        return 'mail.cn.yahoo.com';
    } else if (t == 'tom.com') {
        return 'mail.tom.com';
    } else if (t == 'yeah.net') {
        return 'www.yeah.net';
    } else if (t == '21cn.com') {
        return 'mail.21cn.com';
    } else if (t == 'hotmail.com') {
        return 'www.hotmail.com';
    } else if (t == 'sogou.com') {
        return 'mail.sogou.com';
    } else if (t == '188.com') {
        return 'www.188.com';
    } else if (t == '139.com') {
        return 'mail.10086.cn';
    } else if (t == '189.cn') {
        return 'webmail15.189.cn/webmail';
    } else if (t == 'wo.com.cn') {
        return 'mail.wo.com.cn/smsmail';
    } else if (t == '139.com') {
        return 'mail.10086.cn';
    } else {
        return '';
    }
}

/**
 * 双击进入邮箱设置
 */
function emailSettings() {
    $("#emailSettingsModal").modal('show')
}

/**
 *  点击表头排序方法
 *  el  this 当前点击元素
 *   tbodyId  tbody标签的id (可以不填)
 *   compareFun  比较函数  内部定义，无需传值
 * */
function sortTable(el, tbodyId, compareFun) {
    // 添加其它列的状态
    var nowTd = $(el);
    if (!nowTd.is('th')) {   // 如果元素是th标签
        nowTd = nowTd.closest('th');  // 获取第一个为th的父标签
    }
    nowTd.siblings('th').each(function() {
        if ($(this).find('[data-dirct]').length) {  // 如果之前存在排序则删除
            $(this).find('[data-dirct]').attr('data-dirct', '');
        } else {
            $(this).attr('data-dirct', '');
        }
    });
    var nowDirct = $(el).attr('data-dirct');
    var table = $(el).closest('table');
    //var tbody = $('#' + tbodyId);    // 获取tbody
    var tbody = nowTd.parent().parent().next();   // 获取tbody
    if (!nowDirct) {
        nowDirct = 'asc';
        $(el).attr('data-dirct', nowDirct);
    } else {
        $(el).attr('data-dirct', nowDirct === 'asc' ? 'desc' : 'asc');
        reverse();
        //   setSeq();   // 序号重新排序
        return;
    }

    /**
     * 反向排序
     * */
    function reverse() {
        var trs2 = table.find('tr:not(:first)');  // 除去表头，一个数据行
        for ( var i = trs2.length - 2; i >= 0; i--) {  // 反向插入
            trs2.eq(i).appendTo(tbody);
        }
    }

    /**
     * 重新设置序号
     */
    function setSeq() {
        var tsq = table.find('.sequence');   // 需要设置序号的列需提前在该列td上设置class='sequence'
        for ( var i = 0; i < tsq.length; i++) {
            tsq.eq(i).text((i + 1));
        }
    }

    /**
     * 获取td的值
     * @param td
     * @returns {*}
     */
    function getTdVal(td) {
        // var val = td.attr('data-val');   // 获取data-val属性
        // if (!val) {  // 没有按该td排序则获取该td的内容
        //     val = $.trim(td.text());
        // }
        var val = $.trim(td.text());
        if (/^[\d\.]+$/.test(val)) {  // 如果该td的内容是数字 则转化为数值类型
            val = 1 * val;
        }
        return val;
    }

    if (!compareFun) {  // 如果该比较函数未定义则新定义如下：如果str1>str2则返回大于0的数，<则返回小于0的数，=则返回0
        compareFun = function(str1, str2) {
            if (typeof str1 === "number" && typeof str2 === "number") {  // 如果两个值都是数值则返回两值之差
                return str1 - str2;
            } else {  // 否则返回
                str1 = '' + str1;
                str2 = '' + str2;
                return str1.localeCompare(str2);  // 比较字符串
            }
        }
    }
    // 得到所有tr 得到单元格位置
    var trs = $(el).closest('table').find('tr:not(:first)');
    var index = $(el).closest('th').index();    // 返回该td的相对位置index,即获取该列的列数
    for ( var i = 0; i < trs.length - 1; i++) {  // 遍历所有数据行
        for ( var j = 0; j < trs.length - 1 - i; j++) {  // 所有行之间两两进行比较
            var str1 = getTdVal(trs.eq(j).find('td').eq(index));   // 获取该列的值
            var str2 = getTdVal(trs.eq(j + 1).find('td').eq(index));
            if (compareFun(str1, str2) > 0) { // 如果j行比j+1行大
                trs.eq(j + 1).after(trs.eq(j));  // 调换位置
                var tmp = trs[j + 1];   // 并将trs中两行的位置进行调换，方便下次遍历比较
                trs[j + 1] = trs[j];
                trs[j] = tmp;
            }
        }
    }
    //  setSeq();  // 设置序号
}