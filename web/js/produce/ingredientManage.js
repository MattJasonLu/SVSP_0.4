var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

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
            url: "totalIngredientRecord",                  // url
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
            url: "searchIngredientTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
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
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setIngredientList(result);
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
            url: "loadPageIngredientList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setIngredientList(result.data);
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
            url: "searchIngredient",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setIngredientList(result.data);
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
                url: "loadPageIngredientList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setIngredientList(result.data);
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
                url: "searchIngredient",         // url
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
function loadPageIngredientList() {
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
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
    setSeniorSelectedList();
}

/*高级查询下拉框设置*/

function setSeniorSelectedList() {
    //运输方式
    $.ajax({
        type: 'POST',
        url: "getMaterialCategoryByDataDictionary",
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                var materialCategoryItem = $('#search-materialCategoryItem');
                materialCategoryItem.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    materialCategoryItem.append(option);
                });
                materialCategoryItem.get(0).selectedIndex = -1;
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
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
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

function setIngredientList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    var serialNumber = 0;    // 序号
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 编号
                    $(this).html(obj.id);
                    break;
                case (1):
                    // 物品名称
                    $(this).html(obj.name);
                    break;
                case (2):
                    // 物品编码
                    $(this).html(obj.code);
                    break;
                case (3):
                    // 规格型号
                    $(this).html(obj.specification);
                    break;
                    //单位
                case (4):
                    if(obj.unitDataItem!=null){
                        $(this).html(obj.unitDataItem.dictionaryItemName);
                    }
                    break;
                    //物资类别
                case (5):
                    if(obj.materialCategoryItem!=null){
                        $(this).html(obj.materialCategoryItem.dictionaryItemName);
                    }
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
 * 打开导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadInModal() {
    var filePath = 'Files/Templates/辅料备件物品导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r === true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导入excel
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importIngredientExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result.status == "success") {
                        alert(result.message);
                        window.location.reload();         //刷新
                    } else {
                        alert(result.message);
                        window.location.reload();
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
}

/**
 * 导出excel
 * @param e
 */
function exportExcel() {
    var name = 't_pl_ingredients_list_tree';
    var sqlWords = 'select id,name,specification,(select dictionaryItemName from datadictionaryitem where dataDictionaryItemId=unitId) as unit,(select dictionaryItemName from datadictionaryitem where dataDictionaryItemId=materialCategoryId) as category from t_pl_ingredients_list_tree as a ORDER BY id asc;';
    window.open('exportExcelIngredient?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 单击获取ID
 * @param e
 * @returns {jQuery}
 */
function getIngredientId(e) {
    return $(e).parent().parent().children().eq(0).text();
}

/**
 * 删除功能
 * @param e
 */
function deleteIngredient(e) {
    if (confirm("是否删除？")) {
        var id = parseInt(getIngredientId(e));  // 获取ID
        $.ajax({
            type: "POST",
            url: "deleteIngredient",
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                if (result.status == "success") {
                    alert("删除成功！");
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
}

/**
 * 打开编辑模态框
 * @param e
 */
function edit(e) {

    //单位
    $.ajax({
        type:'POST',
        url:"getUnitByDataDictionary",
        //data:JSON.stringify(data),
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                console.log(result);
                var unit=$('#modify_unit');
                unit.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unit.append(option);
                });
                unit.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
    //物资类别
    $.ajax({
        type:'POST',
        url:"getMaterialCategoryByDataDictionary",
        //data:JSON.stringify(data),
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                console.log(result);
                var materialCategoryItem=$('#modify_materialCategoryItem');
                materialCategoryItem.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    materialCategoryItem.append(option);
                });
                materialCategoryItem.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
    var id = parseInt(getIngredientId(e));  // 获取ID
    $.ajax({
        type: "POST",
        url: "getIngredientById",
        async: false,
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == "success" && result.data != null) {
                var data = result.data;
                console.log(data)
                // 设置数据
                $("#modify_id").text(data.id);
                $("#modify_name").val(data.name);
                $("#modify_code").val(data.code);
                $("#modify_specification").val(data.specification);
                if(data.materialCategoryItem!=null){
                    $("#modify_materialCategoryItem").val(data.materialCategoryItem.dataDictionaryItemId);
                }
                if(data.unitDataItem!=null){
                    $("#modify_unit").val(data.unitDataItem.dataDictionaryItemId);
                }
                $("#modifyModal").modal('show');
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
 * 保存编辑信息
 */
function modify() {
    var ingredient = {};
    ingredient.id = $("#modify_id").text();
    ingredient.name = $("#modify_name").val();
    ingredient.code = $("#modify_code").val();
    ingredient.specification = $("#modify_specification").val();
    var materialCategoryItem={};
    materialCategoryItem.dataDictionaryItemId=$("#modify_materialCategoryItem").val();
    ingredient.materialCategoryItem=materialCategoryItem;
    var unitDataItem={};
    unitDataItem.dataDictionaryItemId=$("#modify_unit").val();
    ingredient.unitDataItem=unitDataItem;
    $.ajax({
        type: "POST",
        url: "updateIngredient",
        async: false,
        data: JSON.stringify(ingredient),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            alert(result.message);
            $("#pageNumber").val(currentPage);   // 设置当前页页数
            inputSwitchPage();  // 跳转当前页
            $("#modifyModal").modal('hide');
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    // 新增页面
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp === 0) {
                searchIngredient();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchIngredient();      //
            }
        }, 600);
    });
});

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchIngredient();      //
    }
}

/**
 * 查询功能
 */
function searchIngredient() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var keywords = $.trim($("#searchContent").val());
    if ($("#senior").is(':visible')) {
        data1 = {
            id: $("#search-id").val(),
            name: $("#search-name").val(),
            code: $.trim($("#search-code").val()),
            specification: $.trim($("#search-specification").val()),
            page: page,
            materialCategoryItem:{dataDictionaryItemId:$('#search-materialCategoryItem').val()}
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
            url: "searchIngredient",                 // url
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
 * 打开新增模态框
 */
function add() {
    $("#modalId").modal('show');
    /*下拉框设置*/
//单位
    $.ajax({
        type:'POST',
        url:"getUnitByDataDictionary",
        //data:JSON.stringify(data),
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                console.log(result);
                var unit=$('#add_unitDataItem0');
                unit.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unit.append(option);
                });
                unit.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
    //物资类别
    $.ajax({
        type:'POST',
        url:"getMaterialCategoryByDataDictionary",
        //data:JSON.stringify(data),
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                console.log(result);
                var materialCategoryItem=$('#add_materialCategoryItem0');
                materialCategoryItem.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    materialCategoryItem.append(option);
                });
                materialCategoryItem.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });

}

/**
 * 保存新增数据
 */
function save() {
    var length = $("#plusBtn").prevAll().length;   // 获取总行数
    var ingredientsIn = {};
    ingredientsIn.ingredientsList = [];
    for (var i = 0; i < length; i++) {
        var $i = i;
        var ingredient = {};
        ingredient.name = $("#add_name" + $i).val();
        ingredient.code = $("#add_code" + $i).val();
        ingredient.specification = $("#add_specification" + $i).val();
        var unitDataItem={};
        unitDataItem.dataDictionaryItemId=$("#add_unitDataItem" + $i).val();
        ingredient.unitDataItem=unitDataItem;
        var materialCategoryItem={};
        materialCategoryItem.dataDictionaryItemId=$("#add_materialCategoryItem" + $i).val();
        ingredient.materialCategoryItem=materialCategoryItem;
        ingredientsIn.ingredientsList.push(ingredient);
    }
    $.ajax({
        type: "POST",
        url: "addIngredient",
        async: false,
        data: JSON.stringify(ingredientsIn),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            alert(result.message);
            window.location.reload();
        },
        error: function (result) {
            console.log(result.message);
            alert("服务器错误！");
        }
    });
}


var num = 1;

/**
 * 新增功能-新增行
 */
function addNewLine(item) {
    num++;
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = null;
    if (item != null) {
        tr = $(item).parent().parent().prev();
    } else tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    clonedTr.children().get(0).innerHTML = num;    // 设置序号
    clonedTr.children().find("input").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
    clonedTr.find("p[name='test']").hide();
    //清空数据为重新初始化selectpicker
    if (clonedTr.children().get(0).innerHTML != 1) {     // 将非第一行的所有行加上减行号
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        clonedTr.children("td:eq(0)").prepend(delBtn);
    }
}

/**
 * 删除行
 */
function delLine(item) {
    var tr = item.parentElement.parentElement;
    var length = $(tr.parentNode).children().length - 2;         // 行数
    var tBody = $(tr.parentNode);                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    console.log(tr);
    console.log("length:" + length);
    for (var i = 1; i < length; i++) {             // 更新序号
        tBody.children().eq(i).children().eq(0).get(0).innerHTML = i + 1;     // 更新序号
        // 重新加上减行按钮
        var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
        tBody.children().eq(i).children("td:eq(0)").prepend(delBtn);
        tBody.children().eq(i).children().find("input").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i);
            $(this).prop('id', newId);
        });
    }
    num--;
}

/**
 * 物品编码检测
 * @param item
 */
function test(item) {
    var code = $(item).val();
    $('#pass1').hide();    // 通过
    $('#break1').hide();  // 存在
    if (code.length != 8) {
        $(item).find("p[id='break2']").show();  // 存在
        $(item).find("p[id='pass1']").hide();    // 通过
        $(item).find("p[id='break1']").hide();    //
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCountByIngredientCode",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'code': code
        },
        success: function (result) {
            if (result != undefined) {
                if (result > 0) {  // 存在
                    $(item).nextAll().eq(1).show();
                    $(item).nextAll().eq(0).hide();
                    $(item).nextAll().eq(2).hide();
                } else {
                    $(item).nextAll().eq(0).show();
                    $(item).nextAll().eq(1).hide();
                    $(item).nextAll().eq(2).hide();
                }
                if ($.trim(code).length <= 0) {
                    $(item).nextAll().eq(0).hide();
                    $(item).nextAll().eq(1).hide();
                    $(item).nextAll().eq(2).hide();
                }
            }
        },
        error: function (result) {

        }
    });
    var code1 = "";
    var is = true;
    if (code.length > 1 && code.length < 8) { //根据输入的前两位编码，自动设置全部编码
        var serialNumer = parseInt($(item).parent().prev().prev().text());
        var type = code.substr(0, 2); // 获取输入的编码的前两位
        for(var i = 0; i < serialNumer - 1; i++){
            var $i = i;
            if($("#add_code" + $i).val().substr(0,2) === type) {  // 种类相同且之前存在则不用再走后台
                code1 = $("#add_code" + $i).val();
                var index = parseInt(code1);
                index += 1;
                code1 = index + "";
                $(item).val(code1);  // 设置编码
                is = false;
            }
        }
        if(is){
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getCurrentCodeByType",              // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {
                    'type': type
                },
                success: function (result) {
                    if (result != undefined && result != "") {
                        console.log("code=" + result);
                        code1 = result;
                        $(item).val(code1);  // 设置编码
                        $(item).nextAll().eq(2).hide();
                    }
                },
                error: function (result) {
                    console.log("获取编码失败");
                }
            });
        }
    }
}

