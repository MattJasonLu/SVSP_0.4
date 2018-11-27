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
                //if (result.message == undefined)alert("账号过期，请重新登录！");
                //   else alert(result.message);
                //e.prop('href', '#');
                flag = true;
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

//////////////////动态菜单///////////////////////
/**
 * 加载导航条
 */
function loadNavigationList() {
    $(".fadeInUp").children().remove();   // 删除之前旧一级菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMenuList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != null && result.status == 'success') {
                var data = result.data;
                // 设置数组
                var j = 0;
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id; // 设置节点数据
                    var pId = data[i].pId;
                    var name = data[i].name;
                    var url = data[i].url;
                    var icon = data[i].icon;
                    // 设置一级菜单
                    if (0 < data[i].pId && data[i].pId < 10) {
                        j++;
                        // if(j === 1)localStorage.name = name; // 第一次进去加载第一个首页数据  (写在登陆页面中)
                        var li = "<li onclick='toMenuUrl(this)'><a class='withripple' href='#' id='function_" + j + "'><span class='" + icon + "'" +
                            "aria-hidden='true'></span><span class='sidespan' name='" + name + "'>&nbsp;&nbsp;" + name + "</span><span class='iright pull-right'>" +
                            "&gt;</span><span class='sr-only'>(current)</span></a></li>";
                        // $("#end").before(li);
                        $(".fadeInUp").append(li); // 插入到内部的最后
                    }
                }
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
    if (localStorage.name != "" && localStorage.name != null) {    // 根据名字获取一级菜单的子节点并设置二级菜单
        $("#navbar").children().eq(0).children().remove();  // 删除之前二级菜单数据
        console.log(localStorage.name);
        var organization = {};                 // 获取并设置数据
        organization.name = localStorage.name;
        organization.pId = 1;
        $.ajax({                                // 根据名称和父节点获取子节点对象
            type: "POST",                       // 方法类型
            url: "getChildrenMenuByName",       // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(organization),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status == "success" && result.data != null) {
                    var organizationList = result.data;
                    console.log(result);
                    setMenuTwo(organizationList);//递归设置二级菜单导航条
                    var href = window.location.href.toString();
                    if (href.substring(href.length - 14) === "firstPage.html") { // 判断是否为板块首页
                        setProcessIcon(organizationList); // 首页设置流程节点图标
                    }
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });

        // 设置一级菜单选中标蓝
        $("ul[class='sidenav animated fadeInUp']").children().find("span[name='" + localStorage.name + "']").parent().parent().addClass("active");
        // 设置二级菜单选中
        var secondName = $("ol[class='breadcrumb']").find("li").eq(1).text();  // 获取二级菜单名
        $("#navbar").find("a:contains('" + secondName + "')").parent().addClass("active");  // 设置二级菜单标蓝
    }
    if ($("ol[class='breadcrumb']").length > 0) { // 如果是网页则设置历史记录抬头导航
        var url = window.location.href.toString();
        url = (url.substring(url.lastIndexOf("/") + 1)).replace("#", "");        // 获取当前url
        var name1 = $.trim($("ul[class='sidenav animated fadeInUp']").find("li[class='active']").find("span").eq(1).text());    // 获取一级菜单名
        var organization2 = {};
        organization2.name = name1;
        organization2.url = url;
        $.ajax({                                // 根据名称和父节点获取子节点对象
            type: "POST",                       // 方法类型
            url: "getLevelOneMenuByUrlAndPName",       // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(organization2),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result != null && result.status === "success" && result.data != null) {
                    var data = result.data;
                    console.log("导航栏数据");
                    console.log(data);
                    $("ol[class='breadcrumb']").children().remove();  // 删除历史数据
                    localStorage.name = name1;    // 设置一级菜单名，点击首页时方便定位
                    setOLMenu(data); // 动态递归设置历史导航栏
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
    }
}

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
    localStorage.name = $.trim($(item).children().find("span").eq(1).text());
    window.location.href = "firstPage.html"; //跳转首页
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
                    var li3 = "<li><a href='" + organization.url + "'>" + organization.name + "</a></li>";  // 赋值
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
                            "<li><a href='" + organization.url + "'>" + organization.name + "</a></li>";
                    } else if (i === 0) { // 第一个子节点不设置分割线
                        li2 = "<li><a href='" + organization.url + "'>" + organization.name + "</a></li>";
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
                    "<a href='" + organization.url + "'><img src='" + organization.icon + "' style='width: 80px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
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
