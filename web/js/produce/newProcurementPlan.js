/**
 * 采购计划单新增脚本文件
 * */

//加载月度采购申请表数据列表
function getProcurement() {
    loadNavigationList();   // 设置动态菜单
    var page = {};
    $('#tbody1').find("input[name='select']").prop('checked', true);
    $("input[name='allSel']").prop('checked', true);

    //获取采购计划单号
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewestProcurementPlanId",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            console.log(result)
            $('#procurementPlanId').val(result)
        },
        error: function (result) {

        }
    })

    //获取等路人信息
    var data = getCurrentUserData();
    if (data != null) {
        $('#createName').val(data.username)
    }

    $('#createDate').val(dateToString(new Date()))

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurement",
        data: JSON.stringify(page),
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                //设置月度采购申请表数据
                setPageClone(result);
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")

        }
    });

    //设置物资类别下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialCategoryByDataDictionary",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var materialCategoryItem = $("#search-materialCategoryItem");
                materialCategoryItem.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    materialCategoryItem.append(option);
                });
                materialCategoryItem.get(0).selectedIndex = -1;
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {

    setMonthProcurementList(result);

}

//设置月度采购申请表数据
function setMonthProcurementList(result) {
    //$('.myclass').hide();
    var tr = $("#cloneTr");
    tr.siblings().remove();
    tr.attr('class', 'myclass');
    $.each(result.data, function (index, item) {
        //console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            //1生成领料单号
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (1):
                    $(this).html(index + 1);
                    break;
                // 物资名称
                case (2):
                    $(this).html(obj.suppliesName);
                    break;
                // 规格型号
                case (3):
                    $(this).html((obj.specifications));
                    break;
                // 单位
                case (4):
                    if (obj.unitDataItem) {
                        $(this).html(obj.unitDataItem.dictionaryItemName);
                    }

                    break;
                // 库存量
                case (5):
                    $(this).html(obj.inventory);
                    break;
                // 需求数量
                case (6):
                    $(this).html(obj.demandQuantity);
                    break;
                // 备注
                case (7):
                    $(this).html(obj.note);
                    break;
                //创建时间
                case (8):
                    $(this).html(getDateStr(obj.createDate));
                    break;
                //物资类别
                case (9):
                    if(obj.materialCategoryItem!=null){
                        $(this).html((obj.materialCategoryItem.dictionaryItemName));
                    }
                    break;
                //存放采购主键
                case (10):
                    $(this).html((obj.receiptNumber));
                    break;
                    //存放物资主键
                case (11):
                    $(this).html((obj.id));
                    break;


            }
        });
        // 把克隆好的tr追加到原来的tr前面
        // clonedTr.removeAttr("class");
        clonedTr.removeAttr('id');
        clonedTr.insertBefore(tr);


    });


    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}


function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}

//按照时间查询
function searchData() {
    var createDateStart = $('#search-inDate').val();
    var createDateEnd = $('#search-endDate').val();
    var data = {
        createDateStart: createDateStart,
        createDateEnd: createDateEnd,
        materialCategoryItem:{'dataDictionaryItemId':$('#search-materialCategoryItem').val()},
    }
    console.log(data)
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchNewProcurementPlan",
        data: JSON.stringify(data),
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                setPageClone(result);

            }
        },
        error: function (result) {

        }
    })

}


//添加采购计划单
function add() {




    if(confirm("确定添加?")){

        //点击确定后操作
        var data={
            procurementPlanId:$('#procurementPlanId').val(),
            createName:$('#createName').val(),
        }
        //添加主表
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addProcurementPlan",
            data:JSON.stringify(data),
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){


                    var items = $("input[name='select']:checked");//判断复选框是否选中


                    $.each(items, function () {
                        if ($(this).parent().parent().parent().children('td').eq(1).html().length > 0) {
                            var dataItem = {

                                wareHouseName: $('#procurementPlanId').val(),
                                receiptNumber: $(this).parent().parent().parent().children('td').eq(10).html(),
                                suppliesName: $(this).parent().parent().parent().children('td').eq(2).html(),
                                specifications: $(this).parent().parent().parent().children('td').eq(3).html(),
                                unitDataItem:{dictionaryItemName:($(this).parent().parent().parent().children('td').eq(4).html())} ,
                                demandQuantity: $(this).parent().parent().parent().children('td').eq(6).html(),
                                note: $(this).parent().parent().parent().children('td').eq(7).html(),
                                id:$(this).parent().parent().parent().children('td').eq(11).html(),
                                materialCategoryItem:{dictionaryItemName:$(this).parent().parent().parent().children('td').eq(9).html()}
                            }
                            $.ajax({
                                type: "POST",                       // 方法类型
                                url: "addProcurementPlanItem",
                                data:JSON.stringify(dataItem),
                                async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                                dataType: "json",
                                contentType: 'application/json;charset=utf-8',
                                success:function (result) {
                                    if (result != undefined && result.status == "success"){


                                    }
                                },
                                error:function (result) {

                                }
                            })
                            console.log(dataItem)


                        }

                    })





                  alert("添加成功！")
                    window.location.href='procurementPlan.html';

                }
            },
            error:function (result) {

            }
        })
    }


}