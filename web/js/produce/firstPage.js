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
                console.log(data);
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
                            "aria-hidden='true'></span><span class='sidespan'>&nbsp;&nbsp;" + name + " </span><span class='iright pull-right'>" +
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
        console.log("名称为");
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
                }
            },
            error: function (result) {
                alert(result.message);
            }
        });
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
        console.log("设置数据");
        console.log(organizationList);
        for (var i = 0; i < organizationList.length; i++) {
            var organization = organizationList[i];
            if (organization.organizationList != null && organization.organizationList.length > 0) { //菜单存在子节点
                var li = "";
                console.log(organization);
                if (9 < organization.pId && organization.pId < 100) {  // 二级菜单设置下拉框为下垂
                    li = "<li name='dropdown' class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' " +
                        "aria-haspopup='true' aria-expanded='false'>" + organization.name + "<span class='caret'></span>" +
                        "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                        "</ul></li>";
                    console.log("下垂");
                } else if (organization.pId > 99) {     // 三级菜单及以后设置为右开
                    li = "<li name='dropdown' class='dropdown-submenu'><a href=''>" + organization.name + "</a><ul class='dropdown-menu' name='" + organization.level + "'>" +
                        "</ul></li>";
                    console.log("右开");
                }
                var drop = null;
                for (var j = 0; j < $("#navbar").children().eq(0).find(".dropdown-menu").length; j++) { // 在所有drop中查找父级的最后一个
                    if ($("#navbar").children().eq(0).find(".dropdown-menu").eq(j).attr("name") == (organization.level - 1).toString()) // 插入到父辈
                        drop = $("#navbar").children().eq(0).find(".dropdown-menu").eq(j);
                }
                if (drop != null) {
                    //  $("#navbar").children().eq(0).find(".dropdown-menu:last").append(li); // 将其插入到新建的下拉框之中
                    drop.append(li);
                    console.log("存在下拉框");
                    console.log(li);
                } else {
                    console.log("插入二级菜单后");
                    console.log(li);
                    $("#navbar").children().eq(0).append(li); // 插入到二级菜单内最后
                }
                setMenuTwo(organization.organizationList);  // 递归设置
            } else { // 菜单不存在子节点
                if (9 < organization.pId && organization.pId < 100) { // 二级菜单没有子类直接设置导航条
                    var li3 = "<li><a href='" + organization.url + "' >" + organization.name + "</a></li>";  // 赋值
                    $("#navbar").children().eq(0).append(li3);      //插入
                } else { // 非二级菜单的页面需要将其插入到下拉菜单中
                    console.log("插入下拉菜单");
                    var dropdown = null;
                    for (var j = 0; j < $("#navbar").children().eq(0).find("li[name='dropdown']").length; j++) { // 在所有drop中查找父级的最后一个
                        if ($("#navbar").children().eq(0).find("li[name='dropdown']").eq(j).find("ul").attr("name") == (organization.level - 1).toString()) // 插入到父辈
                            dropdown = $("#navbar").children().eq(0).find("li[name='dropdown']").eq(j); // 获取最后一个菜单下拉框(即最近添加的一个)
                    }
                    if (dropdown.attr("class") == "dropdown") { //如果父类是向下的下拉框
                        var li1 = "<li><a href='" + organization.url + "' >" + organization.name + "</a></li>";  // 赋值
                        dropdown.find("ul").append(li1);
                    } else if (dropdown.attr("class") == "dropdown-submenu") {  // 如果父类是向右的下拉框
                        var li2 = "<li><a href='" + organization.url + "'>" + organization.name + "</a></li>" +
                            "<li role='separator' class='divider'></li>";
                        dropdown.find("ul").append(li2);
                    }
                }
            }
        }
    }
}