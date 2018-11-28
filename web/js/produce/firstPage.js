/**
 * 加载导航条
 */
function loadNavigationList() {
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
                        var li = "<li onclick='toUrl(this)'><a class='withripple' href='#' id='function_" + j + "' onclick=''><span class='" + icon + "'" +
                            "aria-hidden='true'></span><span class='sidespan' name='"+name+"'>&nbsp;&nbsp;" + name + " </span><span class='iright pull-right'>" +
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
        var organization = {}; // 获取并设置数据
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
                    console.log("跳转链接:" + href.substring(href.length - 14));  // 截取最后几位即跳转的内部链接
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
        $("ul[class='sidenav animated fadeInUp']").children().find("span[name='"+localStorage.name+"']").parent().parent().addClass("active");
    }
}


/**
 * 根据名字获取一级菜单的子节点并设置二级菜单
 * @param item
 */
function toUrl(item) {
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
                console.log(organization);
                if (9 < organization.pId && organization.pId < 100) {  // 二级菜单设置下拉框为下垂
                   if(i > 0) {
                       li = "<li role='separator' class='divider'></li>" +
                           "<li name='dropdown' class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' " +
                           "aria-haspopup='true' aria-expanded='false'>" + organization.name + "<span class='caret'></span>" +
                           "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                           "</ul></li>";
                   }else if(i === 0){ // 第一个子节点不设置分割线
                       li = "<li name='dropdown' class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' " +
                           "aria-haspopup='true' aria-expanded='false'>" + organization.name + "<span class='caret'></span>" +
                           "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                           "</ul></li>";
                   }
                } else if (organization.pId > 99) {     // 三级菜单及以后设置为右开
                    if(i > 0){
                        li = "<li role='separator' class='divider'></li>"+
                            "<li name='dropdown' class='dropdown-submenu'><a href=''>" + organization.name +
                            "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                            "</ul></li>";
                    }else if(i === 0){// 第一个子节点不设置分割线
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
                    var li3 = "<li><a href='" + organization.url + "' >" + organization.name + "</a></li>";  // 赋值
                    $("#navbar").children().eq(0).append(li3);      //插入
                } else { // 非二级菜单的页面需要将其插入到下拉菜单中
                    var dropdown = null;
                    for (var j = 0; j < $("#navbar").children().eq(0).find("li[name='dropdown']").length; j++) { // 在所有drop中查找父级的最后一个
                        if ($("#navbar").children().eq(0).find("li[name='dropdown']").eq(j).find("ul").attr("name") === (organization.level - 1).toString()) { // 插入到父辈
                            dropdown = $("#navbar").children().eq(0).find("li[name='dropdown']").eq(j); // 获取最后一个菜单下拉框(即最近添加的一个)
                        }
                    }
                    var li2 = "";
                    if(i > 0){
                        li2 = "<li role='separator' class='divider'></li>"+
                            "<li><a href='" + organization.url + "'>" + organization.name + "</a></li>";
                    }else if(i === 0){ // 第一个子节点不设置分割线
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
    for (var i = 0; i < organizationList.length; i++) {  // 首页排除
        var organization = organizationList[i];
        name = organization.name;
        if (organization.name != "首页") {
            var div = "<div class='row placeholders'></div>";
            if ((i - 1) % 3 === 0) { // 三个设置为一行
                console.log($(".page-header"));
                $(".page-header").append(div); // 插入新行
            }
            if (organization.icon != null && organization.icon != "" && organization.url != null && organization.url != "") {
                var div1 = "<div class='col-xs-4 col-sm-4 placeholder'>" +
                    "<a href='" + organization.url + "'><img src='" + organization.icon + "' style='width: 80px;height: 80px;border-radius:1px' alt='Generic placeholder thumbnail'></a>" +
                    "<h4>" + organization.name + "</h4></div>";
                $(".page-header").find("div[class='row placeholders']:last").append(div1);  // 将节点插入到最新行
                console.log($(".page-header").find("div[class='row placeholders']:last"));
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