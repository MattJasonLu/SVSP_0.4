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
                        option.text(item.name + ":" + item.specification);
                    }else {
                        option.text(item.name+":");
                    }
                    suppliesName.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                $('.selectpicker').selectpicker('val',"");
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
    $("#view-id").text(getCurrentIngredientsInId());
    setfileId();    // 设置文件编号
    // var data=getCurrentUserData();
}


/**
 * 获取当前入库单号
 * @returns {string}
 */
function getCurrentIngredientsInId() {
    var id = "";
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentIngredientsInId",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined)
                id = result.id;
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("获取当前入库单号失败！");
        }
    });
    return id;
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
                    console.log(result.data);
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
    var ListCount = $("input[name='unitPrice']").length;
    var allTotalPrice = 0;
    for (var i = 0; i < ListCount; i++) {
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
    for (var i = 0; i < ListCount; i++) {
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
        size:4 //显示条目
    });
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children().find("input").val("");
    clonedTr.children().find("select").val("");
    clonedTr.children().find("a[name='delbtn']").remove();
    //clonedTr.children().find("select[name='name']").selectpicker('val',"");
    clonedTr.children().find("input[name='number']").val('0.000');  // 数量初始为0
    // clonedTr.children().find("input[name='warehouseArea']").val('0.00');  // 单价初始为0
    // clonedTr.children().find("input[name='totalPrice']").val('0.00');  // 金额初始为0
    // 获取编号
    var id = $("#plusBtn").prev().children().find("span[name='serialNumber']").text();   // 获取最后一行序号
    var id1=(id.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().find("span[name='serialNumber']").text(num);   // 更新序号
    clonedTr.children("td:not(0)").find("span,input,select").each(function () {
        var id = $(this).prop('id');
        var newId = id.replace(/[0-9]\d*/, num - 1);
        $(this).prop('id', newId);
    });
    clonedTr.children().eq(0).find("span[name='serialNumber']").text(num);
    clonedTr.insertAfter(tr);
    var delBtn = "<a name='delbtn' class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);
    if($("span[name='serialNumber']").length === 2) {  // 给第一行增加减行按钮
       $("#serialNumber0").before(delBtn);
    }
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
    var length = $(tr.parentNode).children().length - 4;         // 行数
    var tBody = $("#tbody1");                                  // 删除前获取父节点
    tr.parentNode.removeChild(tr);
    console.log("行数:"+length);
    for (var i = 1; i < length; i++) {             // 更新ID
        tBody.children().eq(i).find("input,select,span").each(function () {
            var id = $(this).prop('id');
            var newId = id.replace(/[0-9]\d*/, i - 1);
            $(this).prop('id', newId);
        });
        tBody.children().eq(i).find("span[name='serialNumber']").text(i);// 更新序号
    }
    totalCalculate(); // 减行后重新计算金额
    console.log("length:"+$("span[name='serialNumber']").length);
    if($("span[name='serialNumber']").length === 1){  // 如果只有一行则不允许删除
        $("a[name='delbtn']").remove();
    }
}

/**
 * 自动设置仓库
 * @param item
 */
function setWareHouse(item) {
    // 获取选中的仓库
    var wareHosue = $(item).find("option:selected").text();
    // 设置其余行的仓库
    $("select[name='wareHouseName']").val(wareHosue);
}

/**
 * 保存红字入库单
 */
function save() {
    //获取输入的数据
    var wareHouseState = false;
    var unitPriceState = false;
    var lineLength = $("span[name='serialNumber']").length;   // 获取数据行数
    var ingredientsIn = {};  // 初始化对象
    ingredientsIn.ingredientsList = [];
    for (var i = 0; i < lineLength; i++) {
        var $i = i;
        ingredientsIn.ingredientsList[i] = {};
        ingredientsIn.ingredientsList[i].serialNumber = i + 1;
        var name = $("#name" + $i).find("option:selected").text();
        var index = name.lastIndexOf(":");
        name=name.substring(0,index);
        ingredientsIn.ingredientsList[i].id = $("#view-id").text();
        ingredientsIn.ingredientsList[i].name = name;
        ingredientsIn.ingredientsList[i].code = $("#code" + $i).text();
        ingredientsIn.ingredientsList[i].specification = $("#specification" + $i).text();
        ingredientsIn.ingredientsList[i].unit = $("#unit" + $i).find("option:selected").text();
        var unitDataItem= {};
        unitDataItem.dataDictionaryItemId = $("#unit" + $i).find("option:selected").val();
        unitDataItem.dictionaryItemName = ingredientsIn.ingredientsList[i].unit;
        ingredientsIn.ingredientsList[i].unitDataItem = unitDataItem;
        ingredientsIn.ingredientsList[i].amount = $("#amount" + $i).val();
        ingredientsIn.ingredientsList[i].unitPrice = $("#unitPrice" + $i).val();
        ingredientsIn.ingredientsList[i].post = $("#post" + $i).val();
        ingredientsIn.ingredientsList[i].remarks = $("#remarks" + $i).val();
        ingredientsIn.ingredientsList[i].wareHouseName = $("#wareHouseName" + $i).val();
        ingredientsIn.ingredientsList[i].totalPrice = $("#totalPrice" + $i).val();
        if ($("#wareHouseName" + $i).val() == null || $("#wareHouseName" + $i).val() == "") wareHouseState = true;
        if ($("#unitPrice" + $i).val() == null || $("#unitPrice" + $i).val() == "") unitPriceState = true;
    }
    if (unitPriceState) {
        alert("单价不能为空，请完善数据！");
        return;
    }
    if (wareHouseState) {
        alert("仓库不能为空，请完善数据！");
        return;
    }
    var totalPrice = $("#totalPrice").text();
    if(totalPrice !== ""){
        ingredientsIn.totalPrice = totalPrice;
    }else{
        ingredientsIn.totalPrice = 0;
    }
    ingredientsIn.id = $("#view-id").text();
    ingredientsIn.creationDate = $("#creationDate").val();
    ingredientsIn.companyName = $("#companyName").val();
    ingredientsIn.fileId = $("#fileId").val();
    ingredientsIn.bookkeeper = $("#bookkeeper").val();
    ingredientsIn.approver = $("#approver").val();
    ingredientsIn.keeper = $("#keeper").val();
    ingredientsIn.acceptor = $("#acceptor").val();
    ingredientsIn.handlers = $("#handlers").val();
    console.log("添加的数据为:");
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
                        window.location.href = "ingredientsInDetial.html";
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
