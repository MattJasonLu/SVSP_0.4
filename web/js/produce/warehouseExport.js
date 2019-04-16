function getDayDate(date) {
    //获取时间
    var obj = date;
    if (obj == null) return "";
    var year = (parseInt(obj.year) + 1900).toString();
    var mouth = parseInt((obj.month) + 1).toString();
    if (mouth.length != 2) {
        mouth = 0 + mouth;
    }
    var day = parseInt((obj.date)).toString();
    if (day.length != 2) {
        day = 0 + day;
    }
    var time1 = year + "年" + mouth + "月" + day + "日";
    return time1;
}

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
var oldId = "";   // 新增页面入库单ID

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
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
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        var data2 = {};
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countOfficeSuppliesOutboundItem",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data2),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    if (result.data > 0) {
                        totalRecord = result.data;
                    } else {
                        console.log("fail: " + result.data);
                        totalRecord = 0;
                    }
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
            url: "countOfficeSuppliesOutboundItem",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result.data > 0) {
                    totalRecord = result.data;
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
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setIngredientsInList(result);
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
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
    setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
    addPageClass(pageNumber);           // 设置页码标蓝
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listOfficeSuppliesOutbound",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setIngredientsInList(result.data);
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
            url: "listOfficeSuppliesOutbound",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setIngredientsInList(result.data);
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
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == "") {
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
        setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "listOfficeSuppliesOutbound",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setIngredientsInList(result.data);
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
                url: "listOfficeSuppliesOutbound",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setIngredientsInList(result.data);
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
function loadPageContent() {
    loadNavigationList();   // 动态菜单部署
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    var data1 = {};
    data1.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listOfficeSuppliesOutbound",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data1),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
                setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
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

function setIngredientsInList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    var serialNumber = 0;    // 序号
    $.each(result, function (index, item) {
        serialNumber++;
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='outboundId']").text(obj.outboundId);
        if (obj.supplier != null)
            clonedTr.find("td[name='supplierName']").text(obj.supplier.companyName);
        clonedTr.find("td[name='itemCode']").text(obj.itemCode);
        clonedTr.find("td[name='itemName']").text(obj.itemName);
        clonedTr.find("td[name='itemSpecifications']").text(obj.itemSpecifications);
        if (obj.unitDataItem != null)
            clonedTr.find("td[name='unitDataItem']").text(obj.unitDataItem.dictionaryItemName);
        clonedTr.find("td[name='itemAmount']").text(parseFloat(obj.itemAmount).toFixed(2));
        clonedTr.find("td[name='taxUnitPrice']").text(parseFloat(obj.taxUnitPrice).toFixed(2));
        clonedTr.find("td[name='totalTaxPrice']").text(parseFloat(obj.totalTaxPrice).toFixed(2));
        clonedTr.find("td[name='outboundDate']").text(getDateStr(obj.outboundDate));
        if (obj.ticketRateItem != null)
            clonedTr.find("td[name='ticketRateItem']").text(obj.ticketRateItem.dictionaryItemName);
        clonedTr.find("td[name='remark']").text(obj.remark);
        if (obj.checkStateItem != null)
            clonedTr.find("td[name='checkState']").text(obj.checkStateItem.dictionaryItemName);
        clonedTr.find("td[name='itemId']").text(obj.itemId);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckStateDataByDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("#search_checkState");
                state.children().remove();
                $.each(data.data, function (index, item) {
                    if (item.dataDictionaryItemId == 69 ||
                        item.dataDictionaryItemId == 75) {
                        var option = $('<option />');
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        state.append(option);
                    }
                });
                state.get(0).selectedIndex = -1;
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

/**
 * 查询功能
 */
function searchData() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var keywords = $.trim($("#searchContent").val());
    if ($("#senior").is(':visible')) {
        data1 = {
            outboundId: $("#search_outboundId").val(),
            supplier: {
                companyName: $("#search_supplierName").val()
            },
            itemCode: $("#search_itemCode").val(),
            itemName: $("#search_itemName").val(),
            itemSpecifications: $("#search_itemSpecifications").val(),
            checkStateItem: {
                dataDictionaryItemId: $("#search_checkState").val()
            },
            // 起始时间
            author: $("#search_startDate").val(),
            // 结束时间
            remark: $("#search_endDate").val(),
            page: page
        };
    } else {
        data1 = {
            keywords: keywords,
            page: page
        };
    }
    if (data1 == null) alert("请输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "listOfficeSuppliesOutbound",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.data != undefined || result.status == "success") {
                    setPageClone(result.data);
                    setPageCloneAfter(pageNumber);      // 大于5页时页码省略显示
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
 * 获取入库单号(双击)
 * @param item
 * @returns {string}
 */
function getIngredientsInId1(item) {
    return item.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 获取入库单号（单击）
 * @param item
 * @returns {*}
 */
function getIngredientsInId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 单击查看功能
 * @param item
 */
function toViewIngredientsIn(item) {
    var id = getIngredientsInId(item);
    showViewModal(id);
}

/**
 * 双击查看功能
 * @param item
 */
function toViewIngredientsIn1(item) {
    var id = getIngredientsInId1(item);
    showViewModal(id);
}

/**
 * 显示查看模态框
 * @param id
 */
function showViewModal(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type: "POST",
        url: "getOfficeSuppliesOutboundItemById",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // 设置数据
                var obj = eval(result.data);
                console.log(result);
                $("#outboundId").val(obj.outboundId);
                if (obj.supplier != null) $("#supplierName").val(obj.supplier.companyName);
                $("#itemCode").val(obj.itemCode);
                $("#itemName").val(obj.itemName);
                $("#itemSpecifications").val(obj.itemSpecifications);
                if (obj.ticketRateItem != null) $("#ticketRateItem").val(obj.ticketRateItem.dictionaryItemName);
                if (obj.unitDataItem != null) $("#unitDataItem").val(obj.unitDataItem.dictionaryItemName);
                $("#itemAmount").val(parseFloat(obj.itemAmount).toFixed(3));
                $("#taxUnitPrice").val(parseFloat(obj.taxUnitPrice).toFixed(2));
                $("#totalTaxPrice").val(parseFloat(obj.totalTaxPrice).toFixed(2));
                $("#outboundDate").val(getDateStr(obj.outboundDate));
                $("#remark").val(obj.remark);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#viewModal").modal('show');
}

var editId = '';
/**
 * 显示编辑模态框
 * @param e
 */
function showEditModal(e) {
    var id = getIdByMenu(e);
    editId = id;
    // 设置供应商
    $.ajax({
        type: "POST",                            // 方法类型
        url: "listSupplier",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var supplier = $("#edit_supplierName");
                supplier.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    supplier.append(option);
                });
                supplier.selectpicker('val', '');
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 中文重写select 查询为空提示信息
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    $('.selectpicker').selectpicker('refresh');
    // 设置税率
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getTicketRate1ByDataDictionary",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var rate = $("#edit_ticketRateItem");
                rate.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    rate.append(option);
                });
                rate.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 设置计量单位
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getUnitByDataDictionary",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var unitDataItem = $("#edit_unitDataItem");
                unitDataItem.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unitDataItem.append(option);
                });
                unitDataItem.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // 通过编号获取办公用品入库单条目
    $.ajax({
        type: "POST",
        url: "getOfficeSuppliesOutboundItemById",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // 设置数据
                var obj = eval(result.data);
                console.log(result);
                $("#edit_outboundId").val(obj.outboundId);
                if (obj.supplier != null) $("#edit_supplierName").selectpicker('val', obj.supplier.supplierId);
                $("#edit_itemCode").val(obj.itemCode);
                $("#edit_itemName").val(obj.itemName);
                $("#edit_itemSpecifications").val(obj.itemSpecifications);
                if (obj.ticketRateItem != null) $("#edit_ticketRateItem").val(obj.ticketRateItem.dataDictionaryItemId);
                if (obj.unitDataItem != null) $("#edit_unitDataItem").val(obj.unitDataItem.dataDictionaryItemId);
                $("#edit_itemAmount").val(parseFloat(obj.itemAmount).toFixed(3));
                $("#edit_taxUnitPrice").val(parseFloat(obj.taxUnitPrice).toFixed(2));
                $("#edit_totalTaxPrice").val(parseFloat(obj.totalTaxPrice).toFixed(2));
                $("#edit_outboundDate").val(getDateStr(obj.outboundDate));
                $("#edit_remark").val(obj.remark);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常!");
        }
    });
    $("#editModal").modal('show');

}

/**
 * 更新信息
 */
function editData() {
    // 获取数据
    var data = {
        itemId: editId,
        outboundId: $("#edit_outboundId").val(),
        supplier: {
            supplierId: $("#edit_supplierName").selectpicker('val')
        },
        itemCode: $("#edit_itemCode").val(),
        itemName: $("#edit_itemName").val(),
        itemSpecifications: $("#edit_itemSpecifications").val(),
        ticketRateItem: {
            dataDictionaryItemId: $("#edit_ticketRateItem").val()
        },
        unitDataItem: {
            dataDictionaryItemId: $("#edit_unitDataItem").val()
        },
        itemAmount: $("#edit_itemAmount").val(),
        taxUnitPrice: $("#edit_taxUnitPrice").val(),
        totalTaxPrice: $("#edit_totalTaxPrice").val(),
        outboundDate: $("#edit_outboundDate").val(),
        remark: $("#edit_remark").val()
    };
    // 更新
    $.ajax({
        type: "POST",
        url: "updateOfficeSuppliesOutboundItem",
        async: false,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#editModal").modal('hide');
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

/**
 * 为查看模态框设置克隆数据
 * @param result
 */
function setViewIngredientsClone(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#viewClone");
    $.each(result.ingredientsList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            var jiao1 = obj.totalPrice % 100000 % 10000 % 1000 % 100 % 10 % 1 * 10;
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 编号
                    $(this).html(obj.serialNumber);
                    break;
                case (1):
                    // 物品编码
                    $(this).html(obj.code);
                    break;
                case (2):
                    // 物品名称
                    $(this).html(obj.name);
                    break;
                case (3):
                    // 规格
                    $(this).html(obj.specification);
                    break;
                case (4):
                    // 单位（KG）
                    $(this).html(obj.unit);
                    break;
                case (5):
                    // 数量
                    $(this).html(obj.amount.toFixed(2));
                    break;
                case (6):
                    // 单价
                    $(this).html(obj.unitPrice.toFixed(2));
                    break;
                case (7):
                    // 金额 十万
                    $(this).html(Math.floor(obj.totalPrice / 100000));
                    break;
                case (8):
                    // 金额 万
                    $(this).html(Math.floor(obj.totalPrice % 100000 / 10000));
                    break;
                case (9):
                    // 金额 千
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 / 1000));
                    break;
                case (10):
                    // 金额 百
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 / 100));
                    break;
                case (11):
                    // 金额 十
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 / 10));
                    break;
                case (12):
                    // 金额 元
                    $(this).html(Math.floor((obj.totalPrice % 100000) % 10000 % 1000 % 100 % 10));
                    break;
                case (13):
                    // 金额 角
                    $(this).html(Math.floor(jiao1));
                    break;
                case (14):
                    // 金额 分
                    $(this).html(Math.floor(jiao1 % 1 * 10));
                    break;
                case (15):
                    // 过账
                    $(this).html(obj.post);
                    break;
                case (16):
                    // 附注
                    $(this).html(obj.remarks);
                    break;
                case (17):
                    // 仓库
                    $(this).html(obj.wareHouseName);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.addClass("newLine");
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 作废功能
 */
function setInvalid(e) {
    var id = getIdByMenu(e);
    // if ($(e).parent().parent().children().eq(3).text() == '新建') {
    if (confirm("是否作废？")) {
        $.ajax({
            type: "POST",
            url: "setInvalidOfficeSuppliesOutboundItem",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
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
    // } else {
    //     alert("单据不可作废！");
    // }
}

/**
 * 获取条目编号
 * @param e 点击事件
 * @returns {jQuery} 条目编号
 */
function getIdByMenu(e) {
    return $(e).parent().parent().find("td[name='itemId']").text();
}