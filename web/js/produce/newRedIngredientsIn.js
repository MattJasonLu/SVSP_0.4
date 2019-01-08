/**
 * 加载下拉框数据
 */
function loadRedIngredientsList() {
    loadNavigationList();   // 设置动态菜单
    $('.loader').show();
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
    var page = {};
    page.count = 0;//解决加载慢
    // 辅料备件物品
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(page),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // console.log(result);
                $('.loader').hide();
                var suppliesName = $('#name0');
                suppliesName.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.id);
                    if (item.specification != null && item.specification != "") {
                        option.text(item.name + " " + item.specification);
                    }else {
                        option.text(item.name);
                    }
                    suppliesName.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！");
        }
    });
    //计量单位
    $.ajax({
        type: 'POST',
        url: "getUnitByDataDictionary",
        //data:JSON.stringify(data),
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                console.log(result);
                var unit = $('#unit0');
                unit.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    unit.append(option);
                });
                unit.get(0).selectedIndex = 0;
            }else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }

    });
    //设置仓库下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWareHouseList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var state = $("select[name='wareHouseName']");
                state.children().remove();
                $.each(data.array, function (index, item) {
                    var option = $('<option />');
                    option.val(item.wareHouseName);
                    option.text(item.wareHouseName);
                    state.append(option);
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
    $('#creationDate').val(dateToString(new Date()));  // 设置入库日期为当前日期
    setfileId();    // 设置文件编号
    // var data=getCurrentUserData();
}

/**
 * 设置文件编号
 */
function setfileId() {
    var id = "1"; // 入库单ID为1
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
 * 选择物品后自动填充相应的物品编码和规格
 * @param item
 */
function setIngredient(item){
    var id = $(item).selectpicker('val');   // 物品ID
    var name = $(item).attr('id');
    var $i = parseInt(name.substr(name.length - 1,1));
    console.log("$i:"+$i);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getIngredientAsProcurementPlanItemById",          // url
        async: false, // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                if (result.data != null) {
                    $("#code" + $i).text(result.data.code);   // 物品编码
                    $("#specification" + $i).text(result.data.specifications);   // 规格型号
                }
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

/**
 * 单价输入框输入完成后自动计算总金额并显示
 */
function totalCalculate() {
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        var amount = $("#amount" + $i).val();
        var unitPrice = $("#unitPrice" + $i).val();
        var totalPrice = (parseFloat(amount) * parseFloat(unitPrice)).toFixed(2);
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
    var amount = parseFloat($("#amount" + serialNumber).val());
    var totalPrice = parseFloat($(item).val());
    $("#unitPrice" + serialNumber).val((totalPrice / amount).toFixed(3));
    var ListCount = $("input[name^='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 1; i < ListCount; i++) {
        var $i = i;
        allTotalPrice += parseFloat($("#totalPrice" + $i).val());
    }
    $("#totalPrice").text(allTotalPrice.toFixed(2));
}


/**
 * 加行
 * @param item
 */
function addNewLine(item) {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size:6
    });
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1=(id.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("span,input,select").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        //console.log(newName);
        $(this).prop('id', newId);
    });
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker('refresh');
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
}

/**
 * 删除行
 * @param e
 */
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
    var i = 0;
    //2018/10/11更新 请勿修改！
    $('.myclass').each(function (index,item) {
        if((index+1)!=1){
            $(this).children('td').eq(0).html("<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;"+(parseInt(index)+1).toString());
        }
    })

}

/**
 * 保存红字入库单
 */
function save() {
    //获取输入的数据
    var totalPrice = 0;
    var wareHouseState = false;
    var unitPriceState = false;
    for (var i = 0; i < ingredientsIn.ingredientsList.length; i++) {
        var $i = i;
        ingredientsIn.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
        ingredientsIn.ingredientsList[i].post = $("#post" + $i).val();
        ingredientsIn.ingredientsList[i].wareHouseName = $("#wareHouseName" + $i).val();
        ingredientsIn.ingredientsList[i].totalPrice = ingredientsIn.ingredientsList[i].unitPrice * ingredientsIn.ingredientsList[i].amount;
        ingredientsIn.ingredientsList[i].equipment = $("#equipment" + $i).val();
        if ($("#wareHouseName" + $i).val() == null || $("#wareHouseName" + $i).val() == "") wareHouseState = true;
        if ($("#unitPrice" + $i).val() == null || $("#unitPrice" + $i).val() == "") unitPriceState = true;
        totalPrice += ingredientsIn.ingredientsList[i].totalPrice;
    }
    if (unitPriceState) {
        alert("单价不能为空，请完善数据！");
        return;
    }
    if (wareHouseState) {
        alert("仓库不能为空，请完善数据！");
        return;
    }
    ingredientsIn.totalPrice = totalPrice;
    ingredientsIn.companyName = $("#companyName").val();
    ingredientsIn.fileId = $("#fileId").val();
    ingredientsIn.bookkeeper = $("#bookkeeper").val();
    ingredientsIn.approver = $("#approver").val();
    ingredientsIn.keeper = $("#keeper").val();
    ingredientsIn.acceptor = $("#acceptor").val();
    ingredientsIn.handlers = $("#handlers").val();
    console.log("添加的数据为:");
    console.log(ingredientsIn);
    for (var j = 0; j < ingredientsIn.ingredientsList.length; j++) {
        var ingredients = ingredientsIn.ingredientsList[j];
        $.ajax({
            type: "POST",
            url: "getItemsAmountsExist",
            async: false,
            data: JSON.stringify(ingredients),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    if (result.data != 0) ingredientsIn.ingredientsList[j].aid = "exist";
                    else ingredientsIn.ingredientsList[j].aid = "notExist";
                } else alert(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("服务器错误！");
            }
        });
    }
    console.log(ingredientsIn);
    if (confirm("确认保存？")) {
        //将入库单数据插入到数据库
        $.ajax({
            type: "POST",
            url: "addIngredientsIn",
            async: false,
            data: JSON.stringify(ingredientsIn),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.status == "success") {
                    console.log(result.message);
                    if (confirm("入库单添加成功，是否返回主页面？"))
                        window.location.href = "ingredientsIn.html";
                    else window.location.reload();
                } else alert(result.message);
            },
            error: function (result) {
                console.log(result.message);
                alert("入库单添加失败！");
            }
        });
    }
}
