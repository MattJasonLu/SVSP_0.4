array = []//用来存放循环出来的领料单信息
MaterialRequisitionList = [];
var currentPage = 1;                          //当前页数
var data1;
var isSearch = false;
array = [];
array1 = [];
array0=[];

/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalMaterialRecord",                  // url
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
        // $.ajax({
        //     type: "POST",                       // 方法类型
        //     url: "searchMaterialTotal",                  // url
        //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        //     data: JSON.stringify(data1),
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success: function (result) {
        //         // console.log(result);
        //         if (result > 0) {
        //             totalRecord = result;
        //             console.log("总记录数为:" + result);
        //         } else {
        //             console.log("fail: " + result);
        //             totalRecord = 0;
        //         }
        //     },
        //     error: function (result) {
        //         console.log("error: " + result);
        //         totalRecord = 0;
        //     }
        // });
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchMaterialRequisitionOrderCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
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
    }
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
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

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getMaterialByToOut",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setMaterialRequisitionList(result.jsonArray);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (isSearch) {//查询用的
        data1['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchMaterialRequisitionOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setMaterialRequisitionList(result);
                } else {
                    console.log("fail: " + result);
                    // setClientList(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                // setClientList(result);
            }
        });
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == undefined) {
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getMaterialByToOut",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setMaterialRequisitionList(result.jsonArray);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if (isSearch) {//查询用的
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchMaterialRequisitionOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setMaterialRequisitionList(result);
                    } else {
                        console.log("fail: " + result);
                        // setClientList(result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                    // setClientList(result);
                }
            });
        }
    }
}

//加载领料单列表
function LoadMaterialRequisitionOrder() {
    $('.loader').show();
    loadNavigationList();    // 设置动态菜单
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    console.log(page);
    // if(array0.length==0){
    //     for (var i = 1; i <= totalPage(); i++) {
    //         switchPage(parseInt(i));
    //
    //         array0.push($('.myclass'));
    //     }
    // }
    //1通过ajax获取领料单数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialRequisitionOrderList",                  // url
        data: JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                $('.loader').hide()
                console.log(result);
                //设置领料单新增列表
                //赋值配料单
                //1重新做一个方法用来生成领料单号
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            }
            else {

                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
    //2加载高级搜索下拉框
    //setSenierList();
    isSearch = false;
    loadSelect();
}

function loadSelect() {
    // 设置状态
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCheckStateDataByDictionary",                  // url
        async: false,
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    if(item.dictionaryItemName=='已出库'||item.dictionaryItemName=='已作废'||item.dictionaryItemName=='待出库'){
                        option.val(item.dataDictionaryItemId);
                        option.text(item.dictionaryItemName);
                        checkState.append(option);
                    }

                });
                checkState.get(0).selectedIndex = -1;
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setMaterialRequisitionList(result.data);
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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
}

//
//设置领料单列表
function setMaterialRequisitionList(result) {
    var tr = $("#cloneTr4");
    tr.siblings().remove();
    tr.attr('class', 'myclass');
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if (item.checkState.name == '待出库') {
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 编号
                    case (1):
                        $(this).html(parseInt(index) + 1);
                        break;
                    // 领料单号
                    case (2):
                        $(this).html(obj.materialRequisitionId);
                        break;
                    // 产废单位
                    case (3):
                        if (obj.client != null) {
                            $(this).html(obj.client.companyName);
                        }

                        break;
                    // 危废名称
                    case (4):
                        $(this).html(obj.wastesName);
                        break;
                    // 危废类别
                    case (5):
                        $(this).html(obj.wasteCategory);
                        break;
                    //配料数量
                    case (6):
                        $(this).html(obj.recipientsNumber.toFixed(3));
                        break;
                    //领用数量
                    case (7):
                        $(this).html(obj.recipientsNumber.toFixed(3));
                        break;
                    //主管副总经理
                    case (8):
                        $(this).html(obj.deputyGeneral);
                        break;
                    //部门仓库主管
                    case (9):
                        $(this).html(obj.warehouseManager);
                        break;
                    //保管员
                    case (10):
                        $(this).html(obj.guardian);
                        break;
                    //领料部门主管
                    case (11):
                        $(this).html(obj.materialManager);
                        break;
                    //领料人
                    case (12):
                        $(this).html(obj.picker);
                        break;
                    //状态
                    case (13):
                        if (obj.checkStateItem != null) {
                            $(this).html(obj.checkStateItem.dictionaryItemName);
                        }
                        break;

                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');

}

//领料单领用
function receive() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    var flag=false;
    if (items.length > 0) {
        if (confirm("确定出库?")) {
            //点击确定后操作

            items.each(function () {
                if($(this).parent().parent().parent().children('td').eq(13).html()=="待出库") {

                    flag=true;
                    //1获得领料单的编号
                    var materialRequisitionId = $(this).parent().parent().next().next().html();
                    //console.log(materialRequisitionId);
                    //2获得厂家
                    var companyName = $(this).parent().parent().next().next().next().html();
                    //3获得危废名称
                    var name = $(this).parent().parent().next().next().next().next().html();
                    //4获得危废代码
                    var wastesId = $(this).parent().parent().next().next().next().next().next().html();
                    //危废类别
                    var category = $(this).parent().parent().next().next().next().next().next().next().html();
                    //单位
                    var unit = $(this).parent().parent().next().next().next().next().next().next().next().html();
                    //配料数量
                    var batchingNumber = $(this).parent().parent().next().next().next().next().next().next().next().next().html();
                    //领用数量
                    var recipientsNumber = $(this).parent().parent().next().next().next().next().next().next().next().next().next().html();
                    //附注
                    var remarks = $(this).parent().parent().next().next().next().next().next().next().next().next().next().next().html();
                    //主管副总经理
                    var deputyGeneral = $(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().html();
                    //部门仓库主管
                    var warehouseManager = $(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().html();
                    //保管员
                    var guardian = $(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().next().html();
                    //领料部门主管
                    var materialManager = $(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().next().next().html();
                    //领料人
                    var picker = $(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().html();
                    data = {
                        materialRequisitionId: materialRequisitionId,
                        //   wastes:{client:{companyName:companyName},
                        //         name:name,
                        //         wastesId:wastesId,
                        //         unit:unit,
                        //         remarks:remarks,
                        // },
                        //   batchingOrder:{
                        //       batchingNumber:batchingNumber,
                        //       deputyGeneral:deputyGeneral,
                        //       warehouseManager:warehouseManager,
                        //       guardian:guardian,
                        //       materialManager:materialManager,
                        //       picker:picker
                        //   },
                        recipientsNumber: recipientsNumber,
                    },
                        $.ajax({
                            type: "POST",                       // 方法类型
                            url: "getByMaterialRequisitionId",                  // url
                            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                            data: {'materialRequisitionId': materialRequisitionId},
                            dataType: "json",
                            //contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                if (result != undefined && result.status == "success") {
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error: function (result) {
                                alert("服务器异常！");
                            }
                        });
                    if (materialRequisitionId.length > 0) {
                        array.push(materialRequisitionId);
                    }
                }
                else {
                    flag=false;
                }

            });
            if(flag){
                window.localStorage.array = array;
                location.href = "newWarehouseOut.html";
            }
           else {
                alert("只可勾选待出库的数据！")
            }
        }
    }
    else {
        alert("请勾选数据!")
    }

}

//加载出库增加页面的领料单
function loadRequisitionList() {
    loadNavigationList();   // 设置动态菜单
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                var equipment = $("#equipment");
                equipment.children().remove();
                $.each(result.data, function (index, item) {
                    var option = $('<option/>')
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    equipment.append(option);
                    $('.selectpicker').selectpicker('refresh');
                });
            }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常")
        }

    });
    var array = new Array(localStorage['array']);
    // console.log(array[0].length);
    if (array[0] != undefined && array[0].length > 0) {
        var array1 = array[0].split(",");//获得配料编号的数组
        $.each(array1, function (index, item) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getByMaterialRequisitionId",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: {'materialRequisitionId': item},
                dataType: "json",
                //contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        MaterialRequisitionList.push(result.materialRequisitionOrder);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                }
            });
        });
        // console.log(MaterialRequisitionList.length);
        setRequisitionList(MaterialRequisitionList);
    }
    else {
        alert("还未领料，请领料！");
        if (confirm("是否跳转至领料页面?")) {
            window.location.href = "materialRequisition.html";
        }
    }
    /*加载出库类别下拉框
     */
    $('#outBoundDate').val(dateToString(new Date()))
    var data = getCurrentUserData();
    console.log(data)
    if (data != null) {
        $('#creator').val(data.username)
    }

  //  localStorage.clear();
}

//设置出库增加页面的领料单数据
function setRequisitionList(result) {
    var tr = $("#cloneTr");
    //console.log(result);
    //tr.siblings().remove();
    tr.attr('class', 'myclass');
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if (item.checkState.name == '待出库') {
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                //1生成领料单号
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 领料单号
                    case (1):
                        $(this).html(obj.materialRequisitionId);
                        break;
                    // 厂家
                    case (2):
                        if (obj.client != null) {
                            $(this).html(obj.client.companyName);
                        }

                        break;
                    // 危废名称
                    case (3):
                        $(this).html(obj.wastesName);
                        break;
                    // 危废类别
                    case (4):
                        $(this).html(obj.wasteCategory);
                        break;
                    // 配料数量
                    case (5):
                        $(this).html(obj.recipientsNumber);
                        break;
                    //领用数量
                    case (6):
                        $(this).html(obj.recipientsNumber.toFixed(2));
                        break;
                    //领料部门主管
                    case (7):
                        $(this).html(obj.materialManager);
                        break;
                    //领料人
                    case (8):
                        $(this).html(obj.picker);
                        break;
                    //进料方式
                    case (9):
                        if (obj.handleCategoryItem != null) {
                            $(this).html(obj.handleCategoryItem.dictionaryItemName);
                        }

                        break;
                    //处置方式
                    case (10):
                        if (obj.processWayItem != null) {
                            $(this).html(obj.processWayItem.dictionaryItemName);
                        }

                        break;
                    //
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');


}

$('#number').on('blur', '[contenteditable="true"]', function () {
    //var data = getData();
    var index = $(this).parent().attr('index');
    var val = $(this).html();
    var attr = $(this).attr('data-role');
    data[index][attr] = val;
    //saveData(data);

})



//领料单高级查询

function searchMaterial() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {

        data1 = {
            client:{companyName:$.trim($("#search-Id").val())} ,
            wastesName:$.trim($("#search-wastesName").val()),
            wasteCategory:$.trim($("#search-wastesType").val()),
            recipientsNumber:$.trim($("#search-company").val()),
            page: page,
            checkStateItem:{dataDictionaryItemId:$('#search-checkState').val()}
        };
        console.log(data1);
        // 模糊查询
    } else {
        var keyword=$.trim($("#searchContent").val());

        data1 = {
            keyword: keyword,
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchMaterialRequisitionOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data1),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });


}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchMaterial();      //
    }
}


//领料单粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchMaterial();
            }
        }, 400);
    });
});

//粗查询
function searchMaterialRequisition() {

    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);

    isSearch = true;

    var text = $.trim($('#searchContent').val());

    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (($(this).children('td').text().indexOf(text) == -1)) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1) {
                array1.push($(this));
            }
        });
    }

    var total;

    if (array1.length % countValue() == 0) {
        total = array1.length / countValue()
    }

    if (array1.length % countValue() > 0) {
        total = Math.ceil(array1.length / countValue());
    }

    if (array1.length / countValue() < 1) {
        total = 1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for (i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    setPageCloneAfter(1);
    for (var i = 0; i < array1.length; i++) {
        $(array1[i]).hide();
    }

    //首页展示
    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if (text.length <= 0) {
        LoadMaterialRequisitionOrder();
    }


}


//导出
function exportExcel() {
    console.log("export");
    var name = 't_pl_materialrequisitionorder';
    var idArry = [];//存放主键

    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length <= 0) { //如果不勾选
        var sqlWords = "select materialRequisitionId,(select  wareHouseName from t_pl_warehouse where wareHouseId =t_pl_materialrequisitionorder.wareHouseId),wasteCategory,wastesName,batchingNumber,recipientsNumber,(select companyName from client where client.clientId=t_pl_materialrequisitionorder.clientId),transferDraftId,(select dictionaryItemName from datadictionaryitem where dataDictionaryItemId=handleCategoryId),(select dictionaryItemName from datadictionaryitem where dataDictionaryItemId=processWayId),guardian,materialManager,picker,pickerDate,departmentName,deputyGeneral,warehouseManager   from t_pl_materialrequisitionorder   " ;
        window.open('exportExcelMaterialRequisitionOrder?name=' + name + '&sqlWords=' + sqlWords);
    }

    if (items.length > 0) {
        $.each(items, function (index, item) {
            if ($(this).parent().parent().next().next().html().length > 0) {
                idArry.push($(this).parent().parent().next().next().html());        // 将选中项的编号存到集合中
            }
        });
        var sql = ' in (';
        if (idArry.length > 0) {
            for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
                if (i < idArry.length - 1) sql += idArry[i] + ",";
                else if (i == idArry.length - 1) sql += idArry[i] + ");"
            }
            var sqlWords = "select materialRequisitionId,(select  wareHouseName from t_pl_warehouse where wareHouseId =t_pl_materialrequisitionorder.wareHouseId),wasteCategory,wastesName,batchingNumber,recipientsNumber,(select companyName from client where client.clientId=t_pl_materialrequisitionorder.clientId),transferDraftId,(select dictionaryItemName from datadictionaryitem where dataDictionaryItemId=handleCategoryId),(select dictionaryItemName from datadictionaryitem where dataDictionaryItemId=processWayId),guardian,materialManager,picker,pickerDate,departmentName,deputyGeneral,warehouseManager   from t_pl_materialrequisitionorder  where  materialRequisitionId" + sql;

        }
        console.log(sqlWords)
        window.open('exportExcelMaterialRequisitionOrder?name=' + name + '&sqlWords=' + sqlWords);
    }

}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContentAdd').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchMaterialRe();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchMaterialRe();      //
            }
        }, 600);
    });
});

//出库单新增页面粗查询
function searchMaterialRe() {
    $('.myclass').each(function () {
        $(this).show();
    })
    //1分页模糊查询
    array.length = 0;//清空数组
    array1.length = 0;
    array.push($('.myclass'));
    var text = $.trim($('#searchContentAdd').val());
    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (($(this).children('td').text().indexOf(text) == -1)) {
                $(this).hide();
            }
            if ($(this).children('td').text().indexOf(text) != -1) {
                array1.push($(this));
            }
        });
    }
    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tbody1').append(this);
        });
    }

    if (text.length <= 0) {
        $('.myclass').each(function () {
            $(this).show();
        })
    }
}

//出库单新增页面高级查询
function searchMaterialRe1() {
    array.length = 0;//清空数组
    array1.length = 0;//清空数组

    $('.myclass').each(function () {
        $(this).show();
        array.push($(this));
    });

    var text = $.trim($('#searchContentAdd').val());

    var companyName = $.trim($('#search-company').val());

    var wastesName = $.trim($('#search-wastesName').val());

    var wastesCode = $.trim($('#search-wastesCode').val());

    var wastesCategory = $.trim($('#search-wastesCategory').val());

    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            if (!($(this).children('td').eq(2).text().indexOf(companyName) != -1 && $(this).children('td').eq(5).text().indexOf(wastesCategory) != -1
                && $(this).children('td').eq(3).text().indexOf(wastesName) != -1 && $(this).children('td').eq(4).text().indexOf(wastesCode) != -1 && $(this).children('td').text().indexOf(text) != -1

            )) {
                $(this).hide();
            }
            if ($(this).children('td').eq(2).text().indexOf(companyName) != -1 && $(this).children('td').eq(5).text().indexOf(wastesCategory) != -1
                && $(this).children('td').eq(3).text().indexOf(wastesName) != -1 && $(this).children('td').eq(4).text().indexOf(wastesCode) != -1 && $(this).children('td').text().indexOf(text) != -1

            ) {
                array1.push($(this));
            }
        });
    }

    for (var i = 0; i < array1.length; i++) {
        $.each(array1[i], function () {
            $('#tbody1').append(this);
        });
    }

}

//新增页面重置
function reset1() {
    $('#searchContentAdd').val("");
    $('#senior :input').val("");
    $('.myclass').each(function () {
        $(this).show();
    })
}

/**
 * 回车查询
 */
function enterSearch1() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchMaterialRe1();      //
    }
}

//领料单查看
function view(item) {
    var materialRequisitionOrderId = $(item).parent().parent().children('td').eq(2).html();
    console.log(materialRequisitionOrderId)
    $('#addModa1').modal('show')

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialRequisitionOrderById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {'materialRequisitionOrderId': materialRequisitionOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                var obj = eval(result.data);
                $("#materialRequisitionId").val(obj.materialRequisitionId);
                if (obj.client != null) {
                    $("#client").val(obj.client.companyName);
                }

                $("#wastesName").val(obj.wastesName);
                $("#wasteCategory").val(obj.wasteCategory);
                $("#recipientsNumber").val(obj.recipientsNumber.toFixed(3));
                $("#deputyGeneral").val(obj.deputyGeneral);
                $("#warehouseManager").val(obj.warehouseManager);
                $("#guardian").val(obj.guardian);
                $("#materialManager").val(obj.materialManager);
                $("#picker").val(obj.picker);


            }
        },
        error: function (result) {

        }

    })
}

//领料单编辑
function materialRequisitionModify(item) {
    var materialRequisitionOrderId = $(item).parent().parent().children('td').eq(2).html();
    console.log(materialRequisitionOrderId)
    $('#addModa2').modal('show')

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialRequisitionOrderById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {'materialRequisitionOrderId': materialRequisitionOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                var obj = eval(result.data);
                $("#materialRequisitionId1").val(obj.materialRequisitionId);
                if (obj.client != null) {
                    $("#client1").val(obj.client.companyName);
                }
                var batchOrderId= $("#materialRequisitionId1").val().substring(0,$("#materialRequisitionId1").val().length-3);
                 $('#batchOrderId').val(batchOrderId);
                $("#wastesName1").val(obj.wastesName)
                $("#wasteCategory1").val(obj.wasteCategory);
                $("#recipientsNumber1").val(obj.recipientsNumber.toFixed(2));
                $("#deputyGeneral1").val(obj.deputyGeneral);
                $("#warehouseManager1").val(obj.warehouseManager);
                $("#guardian1").val(obj.guardian);
                $("#materialManager1").val(obj.materialManager);
                $("#picker1").val(obj.picker);
                $("#batchingNumber").val(obj.batchingNumber.toFixed(2));


                $("#recipientsNumber2").val(obj.recipientsNumber.toFixed(2));
                $("#batchingNumber2").val(obj.batchingNumber.toFixed(2));

            }
        },
        error: function (result) {

        }

    })

}

//计算领料数和配料数
function CalIngredients() {
    var recipientsNumber = $("#recipientsNumber1").val();

    if (recipientsNumber.length == 0) {
        recipientsNumber = 0;
    }
    if (isNaN(recipientsNumber)) {
        alert("请输入数字!")
    }

    if (!isNaN(recipientsNumber)) {
        var batchingNumber = $('#batchingNumber2').val();//现有配料==》不会变

        var difference = parseFloat(recipientsNumber) - parseFloat($('#recipientsNumber2').val());

        var batchingNumber1 = parseFloat(batchingNumber) - parseFloat(difference);

        if (parseFloat(batchingNumber1) > 0) {
            $('#batchingNumber').val(parseFloat(batchingNumber1).toFixed(2))
        }
        else {
            alert("配料量大于库存量，请重新配料！")
            $('#recipientsNumber1').val($("#recipientsNumber2").val())
        }

    }
}

//修改
function adjustMaterialRequisition() {
    var data = {
        materialRequisitionId: $("#materialRequisitionId1").val(),
        batchingNumber: $("#batchingNumber").val(),
        recipientsNumber: $("#recipientsNumber1").val(),
        deputyGeneral: $("#deputyGeneral1").val(),
        warehouseManager: $("#warehouseManager1").val(),
        guardian: $("#guardian1").val(),
        materialManager: $("#materialManager1").val(),
        picker: $("#picker1").val(),
    }
    console.log(data)

    $.ajax({
        type: "POST",                       // 方法类型
        url: "adjustMaterialRequisitionOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message)
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#addModa2").modal("hide");
            }

        },
        error: function (result) {

        }
    })


}

//领料单作废
function cancel(item) {



    var materialRequisitionOrderId = $(item).parent().parent().children('td').eq(2).html();

   var batchingOrderId=materialRequisitionOrderId.substring(0,materialRequisitionOrderId.length-3);
    $('#appointModal3').modal('show');

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialRequisitionOrderById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {'materialRequisitionOrderId': materialRequisitionOrderId},
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result)
                var obj = eval(result.data);
                $("#materialRequisitionId2").html(obj.materialRequisitionId);

                $("#batchingOrderId2").html(batchingOrderId);

                $("#batchingNumber3").html(parseFloat(obj.batchingNumber).toFixed(2));

                $("#cancelNumber").html(parseFloat(obj.recipientsNumber).toFixed(2));

                $("#batchingNumber4").html((parseFloat(obj.recipientsNumber)+parseFloat(obj.batchingNumber)).toFixed(2));

                $("#inboundOrderItemId2").html(obj.inboundOrderItemId);
            }
        },
        error: function (result) {

        }

    })







}

//作废方法
function confirmCancel() {



        var data={
            materialRequisitionId:  $("#materialRequisitionId2").html(),
            recipientsNumber:$("#cancelNumber").html(),
        };
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelMaterialRequisitionOrder",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message)
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                    $("#appointModal3").modal("hide");
                }
            },
            error:function (result) {

            }
        })

}