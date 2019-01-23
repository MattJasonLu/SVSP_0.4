var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
/**
 * 返回count值
 * */
function countValue1() {
    var mySelect = document.getElementById("count1");
    var index = mySelect.selectedIndex;
    var text = mySelect.options[index].text;
    if (text == "全部") {
        text = "0";
    }
    return text;
}

/**
 * 计算总页数
 * */
function totalPage1() {
    var totalRecord = 0;
    if (!isSearch) {
        var data2 = {};
        var page = {};
        page.count = countValue1();                                 // 可选
        page.pageNumber = currentPage;
        page.start = (currentPage - 1) * page.count;
        data2.page = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countOfficeSuppliesInboundItem",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data2),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.data > 0) {
                    totalRecord = result.data;
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
            url: "countOfficeSuppliesInboundItem",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.data > 0) {
                    totalRecord = result.data;
                    console.log("总记录数为:" + result.data);
                } else {
                    console.log("fail: " + result.data);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }
    var count = countValue1();                         // 可选
    var total = loadPages1(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone1(result) {
    $(".beforeClone").remove();
    setInventoryList(result);
    var total = totalPage1();
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
            switchPage1(num);
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
function switchPage1(pageNumber) {
    if (pageNumber > totalPage1()) {
        pageNumber = totalPage1();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage1();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").attr("disabled", "true");
        $("#firstPage").attr("disabled", "true");
        // $('#previous').removeAttr('href');//去掉a标签中的href属性
        // $('#firstPage').removeAttr('onclick');//去掉a标签中的onclick事件
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
        // $("#next").addAttr("href");

    }
    if (pageNumber == totalPage1()) {
        $("#next").attr("disabled", "true");
        $("#endPage").attr("disabled", "true");
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeAttr("disabled");
        $("#firstPage").removeAttr("disabled");
    }
    if (pageNumber < totalPage1()) {
        $("#next").removeAttr("disabled");
        $("#endPage").removeAttr("disabled");
    }
    var page = {};
    page.count = countValue1();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter1(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    var data2 = {};
    data2.page = page;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listOfficeSuppliesInbound",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data2),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setInventoryList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        data1['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listOfficeSuppliesInbound",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setInventoryList(result);
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
 * 回车跳转（输入页数回车跳转页面）
 */
function enterSwitchPage1() {
    if (event.keyCode === 13) {
        inputSwitchPage1();
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage1() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if (pageNumber > totalPage1()) {
        pageNumber = totalPage1();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").attr("disabled", "true");
            $("#firstPage").attr("disabled", "true");
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        if (pageNumber == totalPage1()) {
            $("#next").attr("disabled", "true");
            $("#endPage").attr("disabled", "true");

            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeAttr("disabled");
            $("#firstPage").removeAttr("disabled");
        }
        if (pageNumber < totalPage1()) {
            $("#next").removeAttr("disabled");
            $("#endPage").removeAttr("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter1(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue1();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        var data2 = {};
        data2.page = page;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listOfficeSuppliesInbound",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data2),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setInventoryList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listOfficeSuppliesInbound",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        setInventoryList(result);
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
 * 省略显示页码
 */
function setPageCloneAfter1(currentPageNumber) {
    var total = totalPage1();
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
                    switchPage1(num);        // 跳转页面
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
                    switchPage1(num);        // 跳转页面
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
                    switchPage1(num);        // 跳转页面
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
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages1(totalRecord, count) {
    if (count == 0) count = totalRecord;
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

var ingredientsReceive1 = {}; // 暂存出库单数据
var oldId = "";   // 领料单原始编号
/**
 * 设置首页数据
 */
function loadInventoryListData() {
    loadNavigationList();   // 动态菜单部署
    ingredientsReceive.ingredientsList = [];  // 初始化
    $(".newLine").remove();
    $("#view-id").text(getCurrentIngredientsReceiveId());
    // $("#creationDate").val(getDayDate(new Date()));
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").attr("disabled", "true");
    $("#firstPage").attr("disabled", "true");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage1() == 1) {
        $("#next").attr("disabled", "true");
        $("#endPage").attr("disabled", "true");
    }
    var page = {};
    page.count = countValue1();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    var data2 = {};
    data2.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listOfficeSuppliesInbound",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data2),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result.data);
                setPageClone1(result);
                setPageCloneAfter1(pageNumber);        // 重新设置页码
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取失败");
        }
    });
    setfileId();
    if (localStorage.id != null && localStorage.id != "null") { // 如果ID非空，加载需要修改的数据
        $("#save").text("修改");   // 修改按钮名称
        $("#head").text("辅料/备件领料单修改");
        var delBtn = "<a class='btn btn-default btn-xs' name='delete' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'\"></span></a>&nbsp;";
        $.ajax({   // 获取原数据
            type: "POST",
            url: "getIngredientsReceiveById",
            async: false,
            data: {
                id: localStorage.id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    //设置数据
                    var data = eval(result.data);
                    console.log(result);
                    var tr = $("#clone3");
                    var num = 0;
                    console.log(result);
                    // 设置外部数据
                    $("#view-id").text(data.id);
                    $("#department").val(data.department);
                    $("#creationDate").val(getDateStr(data.creationDate));
                    $("#fileId").val(data.fileId);
                    $("#vicePresident").val(data.vicePresident);
                    $("#warehouseSupervisor").val(data.warehouseSupervisor);
                    $("#keeper").val(data.keeper);
                    $("#pickingSupervisor").val(data.pickingSupervisor);
                    $("#pickingMan").val(data.pickingMan);
                    // 设置物品明细数据
                    var totalReceiveAmount = 0; // 总领料数
                    var totalAmount = 0;        // 总库存量
                    var totalPrice = 0;         // 总金额
                    ingredientsReceive1 = {};
                    ingredientsReceive1.ingredientsList = [];
                    $.each(data.ingredientsList, function (index, item) {
                        num++;
                        var obj = eval(item);
                        var clonedTr = tr.clone();
                        //更新id/name
                        clonedTr.children().find("input,span").each(function () {
                            var id = $(this).prop('id');
                            var newId = id.replace(/[0-9]\d*/, num);
                            $(this).prop('id', newId);
                        });
                        clonedTr.show();
                        // 储存数据
                        var ingredients = {};
                        ingredients.serialNumber = num;   // 序号
                        ingredients.name = obj.name;                  // 物品名称
                        ingredients.specification = obj.specification; // 规格
                        ingredients.unit = obj.unit;                  // 单位
                        ingredients.receiveAmount = obj.receiveAmount.toFixed(2); // 领料数
                        ingredients.oldReceiveAmount = obj.receiveAmount.toFixed(2);
                        ingredients.wareHouseName = obj.wareHouseName;
                        ingredients.receiveId = localStorage.id;  // 领料单号
                        ingredients.unitPrice = obj.unitPrice;  //
                        ingredients.totalPrice = obj.totalPrice;  //
                        ingredients.remarks = obj.remarks;  //
                        ingredients.post = obj.post;  //
                        ingredients.id = localStorage.id;  //
                        //获取库存量
                        $.ajax({
                            type: "POST",
                            url: "getInventoryByNameAndWare",
                            async: false,
                            data: JSON.stringify(ingredients),
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                if (result != null) {
                                    console.log(result);
                                    ingredients.amount = result;     // 库存量
                                }
                            },
                            error: function (result) {
                                console.log("库存获取失败");
                            }
                        });
                        //ingredients.amount = obj.amount.toFixed(2);     // 库存量
                        ingredients.remarks = obj.remarks;             // 备注
                        ingredients.id = obj.id;
                        ingredients.serialNumberA = "update";
                        ingredients.itemId = obj.itemId;
                        ingredientsReceive1.ingredientsList.push(ingredients);
                        totalReceiveAmount += parseFloat(obj.receiveAmount);  // 计算总领料数
                        totalAmount += parseFloat(ingredients.amount);
                        totalPrice += parseFloat(obj.receiveAmount) * parseFloat(ingredients.unitPrice);
                        clonedTr.find("span[name='serialNumber']").text(num);
                        clonedTr.children("td:eq(0)").prepend(delBtn);   // 添加减行按钮
                        clonedTr.find("span[name='name']").text(obj.name);
                        clonedTr.find("span[name='specification']").text(obj.specification);
                        clonedTr.find("span[name='unit']").text(obj.unit);
                        clonedTr.find("input[name='receiveAmount']").val(obj.receiveAmount.toFixed(2));
                        clonedTr.find("span[name='amount']").text(ingredients.amount.toFixed(2));
                        clonedTr.find("input[name='unitPrice']").val(ingredients.unitPrice.toFixed(2));
                        clonedTr.find("input[name='totalPrice']").val(ingredients.totalPrice.toFixed(2));
                        clonedTr.find("input[name='remarks']").val(ingredients.remarks);
                        clonedTr.find("input[name='post']").val(ingredients.post);
                        clonedTr.find("input[name='totalPrice']").text(ingredients.totalPrice.toFixed(2));
                        clonedTr.find("span[name='wareHouseName']").text(obj.wareHouseName);
                        // 把克隆好的tr追加到原来的tr前面
                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);
                        clonedTr.addClass("newLine1");
                    });
                    tr.hide();
                    $("#totalReceiveAmount").text(totalReceiveAmount.toFixed(2));
                    $("#totalPrice").text(totalPrice.toFixed(2));
                    $("#totalAmount").text(totalAmount.toFixed(2));
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常!");
            }
        });
    }
    oldId = $("#view-id").text();
}

/**
 * 设置文件编号
 */
function setfileId() {
    var id = "3"; // 领料单为3
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getDocumentControl",          // url
        async: false, // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            ID: id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                if (result.data != null)
                    $("#fileId").val(result.data.fileNO); // 赋值
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 减行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    var j = $(tr).find("span[name='serialNumber']").text();  // 获取编号，据此获取ID
    ingredientsReceive1.ingredientsList[j - 1].serialNumberA = "del";
    var length = $(tr.parentNode).children().length - 3;         // 行数
    console.log("length:" + length);
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    for (var i = 1; i < length; i++) {             // 更新ID和NAME
        tBody.children().eq(i).find("input,select,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
        tBody.children().eq(i).find("span[name='serialNumber']").text(i);// 更新序号
    }
    if (length === 3) {
        $("a[name='delete']").remove();   // 最后一行不允许删除
    }
}

/**
 * 设置库存量列表数据
 * @param result
 */
function setInventoryList(result) {
    var tr = $("#cloneTr1");
    $(".newLine2").remove();  // 删除旧数据
    $.each(result.data, function (index, item) {
        // console.log(item);
        // 克隆tr，每次遍历都可以 产生新的tr
        var obj = eval(item);
        // if (item.amount > 0) {  // 只显示库存量大于0的
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.find("td[name='inboundId']").text(obj.inboundId);
            if (obj.supplier != null) clonedTr.find("td[name='supplierName']").text(obj.supplier.companyName);
            clonedTr.find("td[name='itemCode']").text(obj.itemCode);
            clonedTr.find("td[name='itemName']").text(obj.itemName);
            clonedTr.find("td[name='itemSpecifications']").text(obj.itemSpecifications);
            if (obj.unitDataItem != null) clonedTr.find("td[name='unitDataItem']").text(obj.unitDataItem.dictionaryItemName);
            clonedTr.find("td[name='itemAmount']").text(parseFloat(obj.itemAmount).toFixed(3));
            clonedTr.find("td[name='taxUnitPrice']").text(parseFloat(obj.taxUnitPrice).toFixed(2));
            clonedTr.find("td[name='totalTaxPrice']").text(parseFloat(obj.totalTaxPrice).toFixed(2));
            clonedTr.find("td[name='inboundDate']").text(getDateStr(obj.inboundDate));
            if (obj.ticketRateItem != null) clonedTr.find("td[name='ticketRateItem']").text(obj.ticketRateItem.dictionaryItemName);
            clonedTr.find("td[name='remark']").text(obj.remark);
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.insertBefore(tr);
            clonedTr.addClass("newLine2");
            clonedTr.removeAttr('id');
        // }
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 获取当前领料单号
 * @returns {string}
 */
function getCurrentIngredientsReceiveId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentIngredientsReceiveId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前领料单号失败！");
        }
    });
    return id;
}

var ingredientsIdArray = [];   // 勾选的库存ID
var ingredientsReceive = {};
var totalReceiveAmount = 0;

/**
 * 添加领料单
 */
function confirmInsert() {
    totalReceiveAmount = 0;
    var ingredientsList = [];
    if (ingredientsReceive1 != null && ingredientsReceive1.ingredientsList != null && ingredientsReceive1.ingredientsList.length > 0) {
        ingredientsReceive.ingredientsList = ingredientsReceive1.ingredientsList; // 将更新的数据赋给对象
    }
    var i = $("span[name='serialNumber']").length - 1;  //序号
    // 遍历库存列表，生成领料单
    var wareHouseName = "";
    $("#ingredientsInventoryData").children().not("#cloneTr1").each(function () {
        var isCheck = $(this).find("input[name='select']").prop('checked');
        if (isCheck) {
            var ingredientsId1 = $(this).find("td[name='itemId']").text();
            if ($.inArray(ingredientsId1, ingredientsIdArray) == -1) {
                i++;
                ingredientsIdArray.push(ingredientsId1);
                var ingredients = {};
                ingredients.name = $(this).find("td[name='name']").text();
                ingredients.serialNumber = i;
                ingredients.specification = $(this).find("td[name='specification']").text();
                ingredients.wareHouseName = $(this).find("td[name='wareHouseName']").text();
                wareHouseName = ingredients.wareHouseName;
                ingredients.amount = parseFloat($(this).find("td[name='amount']").text());
                ingredients.unit = $(this).find("td[name='unit']").text();
                ingredients.id = $("#view-id").text();
                ingredients.code = $(this).find("td[name='code']").text();
                ingredients.inId = $(this).find("td[name='inId']").text();
                ingredients.inAmount = $(this).find("td[name='inAmount']").text();
                ingredients.inPrice = $(this).find("td[name='inPrice']").text();
                ingredients.receiveAmount = 0;  //领料数默认为0，防止错误操作
                ingredients.serialNumberA = "add";
                ingredients.itemId = $(this).find("td[name='itemId']").text();
                ingredientsList.push(ingredients);
                var receiveAmount = parseFloat(ingredients.receiveAmount);
                totalReceiveAmount += receiveAmount;
            }
        }
    });
    /**
     * 根据仓库名更新单号
     */
    $.ajax({
        type: "POST",
        url: "getWareHouseByName",
        async: false,
        data: {
            name: wareHouseName
        },
        dataType: "json",
        success: function (result) {
            if (result != null && result.status === "success") {
                $("#view-id").text(result.data.prefix + oldId);   // 赋值新ID
            } else console.log(result.message);
        },
        error: function (result) {
            console.log(result.message);
        }
    });
    ingredientsReceive.id = $("#view-id").text();   // 更新最新的单据ID
    for(var i = 0; i < ingredientsReceive.ingredientsList.length; i++){
        ingredientsReceive.ingredientsList[i].id = ingredientsReceive.id;
    }
    //将数据遍历赋值到领料单中
    ingredientsReceive.totalAmount = totalReceiveAmount;
    var tr = $("#clone3");
    var num = $("span[name='serialNumber']").length - 1;  // 获取当前物品数
    $.each(ingredientsList, function (index, item) {
        console.log(ingredientsList);
        num++;
        ingredientsList[index].serialNumber = num;
        var obj = eval(item);
        var clonedTr = tr.clone();
        //更新id/name
        clonedTr.children().find("input,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, num);
            $(this).prop('id', newId);
        });
        clonedTr.show();
        clonedTr.find("span[name='serialNumber']").text(obj.serialNumber);
        clonedTr.find("span[name='code']").text(obj.code);
        clonedTr.find("span[name='name']").text(obj.name);
        clonedTr.find("span[name='specification']").text(obj.specification);
        clonedTr.find("span[name='unit']").text(obj.unit);
        clonedTr.find("input[name='receiveAmount']").val(obj.receiveAmount);
        clonedTr.find("span[name='amount']").text(obj.amount);
        clonedTr.find("input[name='unitPrice']").val(obj.inPrice);
        clonedTr.find("input[name='totalPrice']").val(0);
        clonedTr.find("span[name='wareHouseName']").text(obj.wareHouseName);
        clonedTr.find("span[name='inId']").text(obj.inId);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
        ingredientsReceive.ingredientsList.push(item);// 将数据装到对象中
    });
    $("#total-Amount").text(totalReceiveAmount);
    tr.hide();
}

/**
 * 即时计算总量
 */
function calculateTotalReceiveAmount(item) {
    if (parseFloat($(item).val()) < 0) {
        alert("请输入大于0的领料数");
        $(item).val(0);
    } else {
        totalReceiveAmount = 0;
        var totalAmount = 0;
        var allTotalPrice = 0;
        var serialNumber = parseInt($(item).parent().parent().children().find("span[name='serialNumber']").text());
        var ListCount = $("input[name^='receiveAmount']").length;
        for (var i = 1; i < ListCount; i++) {
            var $i = i;
            var receiveAmount1 = parseFloat($("#receiveAmount" + $i).val());
            totalReceiveAmount += receiveAmount1;
            var amount1 = parseFloat($("#amount" + $i).val());
            totalAmount += amount1;
            var totalPrice = parseFloat($("#unitPrice" + $i).val()) * receiveAmount1;
            allTotalPrice += totalPrice;
            $("#totalPrice" + $i).val(totalPrice.toFixed(2));
        }
        var $i1 = serialNumber;
        var receiveAmount = parseFloat($("#receiveAmount" + $i1).val());
        var amount = parseFloat($("#amount" + $i1).text());
        if (receiveAmount > amount) {
            alert("领料数大于库存量，请重新输入！");
            $("#receiveAmount" + $i1).val(amount);
        }
        $("#totalReceiveAmount").text(totalReceiveAmount.toFixed(2));
        $("#totalAmount").text(totalReceiveAmount.toFixed(2));
        $("#totalPrice").text(allTotalPrice.toFixed(2));
    }
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var receiveAmount = $("#receiveAmount" + $i).val();
        var unitPrice = $("#unitPrice" + $i).val();
        var totalPrice = (parseFloat(receiveAmount) * parseFloat(unitPrice)).toFixed(2);
        $("#totalPrice" + $i).val(totalPrice);
        allTotalPrice += parseFloat(totalPrice);
    }
    $("#totalPrice").text(allTotalPrice.toFixed(2));
}

/**
 * 输入总额计算并设置单价
 * @param item
 */
function setUnitPrice(item) {
    var id = $(item).attr("id");   // 获取ID
    var serialNumber = id.charAt(id.length - 1);   // 获取序号
    var receiveAmount = parseFloat($("#receiveAmount" + serialNumber).val());
    var totalPrice = parseFloat($(item).val());
    $("#unitPrice" + serialNumber).val((totalPrice / receiveAmount).toFixed(2));
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        allTotalPrice += parseFloat($("#totalPrice" + $i).val());
    }
    $("#totalPrice").text(allTotalPrice.toFixed(2));
}

/**
 * 保存
 */
function save() {
    //获取输入的数据
    if (ingredientsReceive == null || ingredientsReceive.ingredientsList == null) {
        ingredientsReceive.ingredientsList = ingredientsReceive1.ingredientsList; // 没有新增数据时将修改的数据赋给ingredientsOut
    }
    ingredientsReceive.department = $("#department").val();
    ingredientsReceive.fileId = $("#fileId").val();
    ingredientsReceive.vicePresident = $("#vicePresident").val();
    ingredientsReceive.warehouseSupervisor = $("#warehouseSupervisor").val();
    ingredientsReceive.keeper = $("#keeper").val();
    ingredientsReceive.pickingSupervisor = $("#pickingSupervisor").val();
    ingredientsReceive.pickingMan = $("#pickingMan").val();
    ingredientsReceive.id = $("#view-id").text();
    ingredientsReceive.creationDate = $("#creationDate").val();
    totalReceiveAmount = 0;  // 总领料数
    var totalPrice = 0;
    if (ingredientsReceive != null && ingredientsReceive.ingredientsList != null)//如果有新添的数据则获取最新的输入数据
        for (var i = 0; i < ingredientsReceive.ingredientsList.length; i++) {
            var $i = i + 1;
            ingredientsReceive.ingredientsList[i].remarks = $("#remarks" + $i).val();
            ingredientsReceive.ingredientsList[i].receiveAmount = $("#receiveAmount" + $i).val();
            ingredientsReceive.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
            ingredientsReceive.ingredientsList[i].totalPrice = $("#totalPrice" + $i).val();
            ingredientsReceive.ingredientsList[i].id = $("#view-id").text();
            ingredientsReceive.ingredientsList[i].post = $("#post" + $i).val();
            totalPrice += parseFloat(ingredientsReceive.ingredientsList[i].totalPrice);
            if (ingredientsReceive.ingredientsList[i].receiveAmount == ingredientsReceive.ingredientsList[i].amount) {
                ingredientsReceive.ingredientsList[i].notReceiveAmount = 0;
            } else {
                ingredientsReceive.ingredientsList[i].notReceiveAmount = 1;
            }
            totalReceiveAmount += parseInt(ingredientsReceive.ingredientsList[i].receiveAmount);
        }
    ingredientsReceive.totalAmount = totalReceiveAmount; // 设置总领料数
    ingredientsReceive.totalPrice = totalPrice; // 设置总金额
    console.log("数据为：");
    console.log(ingredientsReceive);
    if (confirm("确认保存？")) {
        if ($("#save").text() === "领料") {
            //将领料单数据插入到数据库
            $.ajax({
                type: "POST",
                url: "addIngredientsReceive",
                async: false,
                data: JSON.stringify(ingredientsReceive),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.status == "success") {
                        console.log(result.message);
                        if (confirm("领料单添加成功，是否返回主页面？"))
                            window.location.href = "ingredientsReceiveDetail.html";
                        else window.location.reload();
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("领料单添加失败！");
                }
            });
        } else if ($("#save").text() == "修改") {
            // 修改领料单数据
            $.ajax({
                type: "POST",
                url: "updateIngredientsReceive",
                async: false,
                data: JSON.stringify(ingredientsReceive),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.status == "success") {
                        console.log(result.message);
                        if (confirm("领料单修改成功，是否返回上一页？"))
                        // window.location.href = "ingredientsReceive.html";
                            history.back();
                        else window.location.reload();
                    } else alert(result.message);
                },
                error: function (result) {
                    console.log(result.message);
                    alert("领料单修改失败！");
                }
            });
        }
    }
}

/**
 * 回车查询
 */
function enterSearch1() {
    if (event.keyCode === 13) {
        search1();
    }
}

/**
 * 查询功能
 */
function search1() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue1();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior1").is(':visible')) {
        data1 = {
            code: $.trim($("#search1-code").val()),
            name: $.trim($("#search1-name").val()),
            wareHouseName: $.trim($("#search1-wareHouseName").val()),
            specification: $.trim($("#search1-specification").val()),
            inId: $.trim($("#search1-inId").val()),
            unit: $.trim($("#search1-unit").val()),
            amount: parseFloat($.trim($("#search1-amount").val())),
            inAmount: parseFloat($.trim($("#search1-inAmount").val())),
            page: page
        };
    } else {
        data1 = {
            keywords: $.trim($("#searchContent1").val()),
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchIngredientsInventory",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone1(result);
                    setPageCloneAfter1(pageNumber);      // 大于5页时页码省略显示
                } else {
                    console.log(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
}

/**
 * 修改功能
 * @param item
 */
function ingredientsReceiveModify(item) {
    if ($(item).parent().parent().children().eq(3).text() == '新建') {
        localStorage.id = getIngredientsId(item);
        window.location.href = "newIngredientsReceive.html";
    } else {
        alert("单据不可修改！");
    }
}

/**
 * 点击新增页面时将ID清空
 */
function addIngredientsReceive() {
    localStorage.id = null;
    window.location.href = "newIngredientsReceive.html";
}

/**
 * 打印功能
 */
function print() {
    //打印模态框
    $("#footer").hide();
    $("#viewModal").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: true
    });
}

/**
 * 自动设置库存数据
 */
function setInventory() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "setInventory",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function () {
            alert("设置成功")
        },
        error: function () {
            console.log(result);
            alert("服务器错误！");
        }
    });
}