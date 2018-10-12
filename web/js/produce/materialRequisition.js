array=[]//用来存放循环出来的领料单信息
MaterialRequisitionList=[];
var currentPage = 1;                          //当前页数
var data1;
var isSearch = false;

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
        totalRecord=array1.length;
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
        for(var i=0;i<array1.length;i++){
            $(array1[i]).hide();
        }
        var i=parseInt((pageNumber-1)*countValue());
        var j=parseInt((pageNumber-1)*countValue())+parseInt(countValue()-1);
        for(var i=i;i<=j;i++){
            $('#tbody1').append(array1[i]);
            $(array1[i]).show();
        }
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
            for(var i=0;i<array1.length;i++){
                $(array1[i]).hide();
            }
            var i=parseInt((pageNumber-1)*countValue());
            var j=parseInt((pageNumber-1)*countValue())+parseInt(countValue()-1);
            for(var i=i;i<=j;i++){
                $('#tbody1').append(array1[i]);
                $(array1[i]).show();
            }
        }
    }
}

//加载领料单列表
function LoadMaterialRequisitionOrder() {
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
    //1通过ajax获取领料单数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialByToOut",                  // url
        data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //设置领料单新增列表
                //赋值配料单
                //1重新做一个方法用来生成领料单号
                setPageClone(result);
            }
            else {

                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });
    //2加载高级搜索下拉框
    //setSenierList();
      isSearch = false;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setMaterialRequisitionList(result.jsonArray);
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
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if(item.checkState.name=='待出库'){
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 编号
                    case (1):
                        $(this).html(parseInt(index)+1);
                        break;
                    // 领料单号
                    case (2):
                        $(this).html(obj.materialRequisitionId);
                        break;
                    // 产废单位
                    case (3):
                        if(obj.client!=null){
                            $(this).html(obj.client.companyName);
                        }

                        break;
                    // 危废名称
                    case (4):
                        if(obj.laboratoryTest!=null){
                            $(this).html(obj.laboratoryTest.wastesName);
                        }

                        break;
                    // 危废代码
                    case (5):
                        if(obj.laboratoryTest!=null) {
                            $(this).html(obj.laboratoryTest.wastesCode);
                        }
                        break;
                    // 危废类别
                    case (6):
                        $(this).html(obj.wasteCategory);
                        break;
                    // 单位
                    case (7):
                        $(this).html("");
                        break;
                    //配料数量
                    case (8):
                        $(this).html(obj.recipientsNumber);
                        break;
                    //领用数量
                    case (9):
                        $(this).html(obj.recipientsNumber);
                        break;
                        //附注
                    case (10):
                        $(this).html(obj.remarks);
                        break;
                        //主管副总经理
                    case (11):
                        $(this).html(obj.deputyGeneral);
                        break;
                        //部门仓库主管
                    case (12):
                    $(this).html(obj.warehouseManager);
                    break;
                    //保管员
                    case (13):
                    $(this).html(obj.guardian);
                    break;
                    //领料部门主管
                    case (14):
                    $(this).html(obj.materialManager);
                    break;
                    //领料人
                    case (15):
                        $(this).html(obj.picker);
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
    if(items.length>0){
        if(confirm("确定领用?")){
            //点击确定后操作
            items.each(function () {
                //1获得领料单的编号
                var materialRequisitionId=$(this).parent().parent().next().next().html();
                //console.log(materialRequisitionId);
                //2获得厂家
                var companyName=$(this).parent().parent().next().next().next().html();
                //3获得危废名称
                var name=$(this).parent().parent().next().next().next().next().html();
                //4获得危废代码
                var wastesId=$(this).parent().parent().next().next().next().next().next().html();
                //危废类别
                var category=$(this).parent().parent().next().next().next().next().next().next().html();
                //单位
                var unit=$(this).parent().parent().next().next().next().next().next().next().next().html();
                //配料数量
                var batchingNumber=$(this).parent().parent().next().next().next().next().next().next().next().next().html();
                //领用数量
                var recipientsNumber=$(this).parent().parent().next().next().next().next().next().next().next().next().next().html();
                //附注
                var remarks=$(this).parent().parent().next().next().next().next().next().next().next().next().next().next().html();
                //主管副总经理
                var deputyGeneral=$(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().html();
                //部门仓库主管
                var warehouseManager=$(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().html();
                //保管员
                var guardian=$(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().next().html();
                //领料部门主管
                var materialManager=$(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().next().next().html();
                //领料人
                var picker=$(this).parent().parent().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().html();
                data={
                    materialRequisitionId:materialRequisitionId,
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
                    recipientsNumber:recipientsNumber,
                },
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getByMaterialRequisitionId",                  // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        data: {'materialRequisitionId':materialRequisitionId},
                        dataType: "json",
                        //contentType: "application/json; charset=utf-8",
                        success:function (result) {
                            if (result != undefined && result.status == "success"){
                            }
                            else {
                                alert(result.message);
                            }
                        },
                        error:function (result) {
                            alert("服务器异常！");
                        }
                    });
                if(materialRequisitionId.length>0){
                    array.push(materialRequisitionId);
                }
            });
            window.localStorage.array=array;
            location.href="newWarehouseOut.html";
        }
    }
    else {
        alert("请勾选数据!")
    }

}

//加载出库增加页面的领料单
function loadRequisitionList() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getOutBoundList",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     contentType: "application/json; charset=utf-8",
    //     success:function (result ) {
    //         if (result != undefined && result.status == "success"){
    //            // console.log(result);
    //             //1获得下拉列表
    //             var outboundType=$("#outboundType");
    //             //2清除子元素
    //             outboundType.children().remove();
    //             //3遍历获得项来赋值
    //             $.each(result.array,function (index,item) {
    //               //4创建选项元素
    //                 var option = $('<option />');
    //                 //5给option赋值
    //                 option.val(index);
    //                 option.text(item.name);
    //                 //6添加到父节点
    //                 outboundType.append(option);
    //             });
    //             //7初始化选项
    //             outboundType.get(0).selectedIndex=-1;
    //
    //         }
    //         else {
    //             alert(result.message);
    //         }
    //     },
    //     error:function (result) {
    //         alert("服务器异常！")
    //     }
    // });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentNameList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                var equipment=$("#equipment");
                equipment.children().remove();
                $.each(result.equipmentList,function (index,item) {
                var option=$('<option/>')
                    option.val(item.index);
                    option.text(item.name);
                     equipment.append(option);
                    $('.selectpicker').selectpicker('refresh');
                });
            }
            else {
                alert(result.message)
            }
        },
        error:function (result) {
            alert("服务器异常")
        }

    });
    var array=new Array(localStorage['array']);
   // console.log(array[0].length);
    if(array[0]!=undefined&&array[0].length>0){
        var array1=array[0].split(",");//获得配料编号的数组
        $.each(array1,function (index,item) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getByMaterialRequisitionId",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: {'materialRequisitionId':item},
                dataType: "json",
                //contentType: "application/json; charset=utf-8",
                success:function (result) {
                    if (result != undefined && result.status == "success"){
                        console.log(result);
                        MaterialRequisitionList.push(result.materialRequisitionOrder);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error:function (result) {
                    alert("服务器异常！");
                }
            });
        });
        // console.log(MaterialRequisitionList.length);
        setRequisitionList(MaterialRequisitionList);
    }
    else {
        alert("还未领料，请领料！");
        if(confirm("是否跳转至领料页面?")){
          window.location.href="materialRequisition.html";
        }
    }
    /*加载出库类别下拉框
     */
    var data=getCurrentUserData();
    console.log(data)
    if(data!=null){
     $('#creator').val(data.username)
    }

    localStorage.clear();
}

//设置出库增加页面的领料单数据
function setRequisitionList(result) {
    var tr = $("#cloneTr");
    //console.log(result);
    //tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if(item.checkState.name=='待出库'){
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
                        if(obj.client!=null){
                            $(this).html(obj.client.companyName);
                        }

                        break;
                    // 危废名称
                    case (3):
                        if(obj.laboratoryTest!=null){
                            $(this).html(obj.laboratoryTest.wastesName);
                        }
                        break;
                    // 危废代码
                    case (4):
                        if(obj.laboratoryTest!=null){
                            $(this).html(obj.laboratoryTest.wastesCode);
                        }
                        break;
                    // 危废类别
                    case (5):
                        $(this).html(obj.wasteCategory);
                        break;
                    // 单位
                    case (6):
                        $(this).html("");
                        break;
                    // 配料数量
                    case (7):
                        $(this).html(obj.recipientsNumber);
                        break;
                    //领用数量
                    case (8):
                        $(this).html(obj.recipientsNumber);
                        break;
                    //附注
                    case (9):
                        $(this).html(obj.remarks);
                        break;
                        //主管副总经理
                    case (10):
                        $(this).html(obj.guardian);
                        break;
                        //部门仓库主管
                    case (11):
                        $(this).html(obj.warehouseManager);
                        break;
                        //领料部门主管
                    case (12):
                        $(this).html(obj.materialManager);
                        break;
                        //领料人
                    case (13):
                        $(this).html(obj.picker);
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

$('#number').on('blur','[contenteditable="true"]',function(){
    //var data = getData();
    var index = $(this).parent().attr('index');
    var val = $(this).html();
    var attr = $(this).attr('data-role');
    data[index][attr] = val;
    //saveData(data);

})

array=[];
array1=[];
//领料单高级查询

function searchMaterial() {
    isSearch = false;
    //1分页模糊查询
    array.length = 0;//清空数组
    array1.length = 0;
    $('.myclass').each(function () {
        $(this).show();
    });
    for (var i = totalPage(); i > 0; i--) {
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    isSearch = true;
    var text = $.trim($('#searchContent').val());
    //1厂家
    var companyName = $.trim($('#search-Id').val());
    //2危废代码
    var wastesCode = $.trim($('#search-wastesCode').val());
    //危废类别
    var wastesCategory = $.trim($('#search-wastesType').val());
    //领用数量
    var number = $.trim($('#search-company').val());

    for (var j = 0; j < array.length; j++) {
        $.each(array[j], function () {
            //console.log(this);
            if (!($(this).children('td').eq(3).text().indexOf(companyName) != -1 && $(this).children('td').eq(5).text().indexOf(wastesCode) != -1
                && $(this).children('td').eq(6).text().indexOf(wastesCategory) != -1 && $(this).children('td').eq(8).text().indexOf(number) != -1 && $(this).children('td').text().indexOf(text) != -1
            )) {
                $(this).hide();
            }
            if (($(this).children('td').eq(3).text().indexOf(companyName) != -1 && $(this).children('td').eq(5).text().indexOf(wastesCode) != -1
                && $(this).children('td').eq(6).text().indexOf(wastesCategory) != -1 && $(this).children('td').eq(8).text().indexOf(number) != -1 && $(this).children('td').text().indexOf(text) != -1)) {
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
    for (var i = 0; i < array1.length; i++) {
        array1[i].hide();
    }

    for (var i = 0; i < countValue(); i++) {
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


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
            if(last-event.timeStamp==0){
                searchMaterialRequisition();
            }
        },400);
    });
});

//粗查询
function searchMaterialRequisition() {

    isSearch=false;

    //LoadMaterialRequisitionOrder();
    //1分页模糊查询
    array.length=0;//清空数组
    array1.length=0;

    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }

    isSearch=true;

    var text=$.trim($('#searchContent').val());

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(($(this).children('td').text().indexOf(text)==-1)){
                $(this).hide();
            }
            if($(this).children('td').text().indexOf(text)!=-1){
                array1.push($(this));
            }
        });
    }

    var total;

    if(array1.length%countValue()==0){
        total=array1.length/countValue()
    }

    if(array1.length%countValue()>0){
        total=Math.ceil(array1.length/countValue());
    }

    if(array1.length/countValue()<1){
        total=1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for ( i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i+1;
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

    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        LoadMaterialRequisitionOrder();
    }


}

//重置
function reset() {
    isSearch=false;
    $("#senior").find("input").val("");
    $("#searchContent").val("");
  //  $("#senior").find("select").get(0).selectedIndex = -1;
    LoadMaterialRequisitionOrder();
}

//导出
function exportExcel() {
    console.log("export");
    var name = 't_pl_materialrequisitionorder';
    var sqlWords = "select * from t_pl_materialrequisitionorder;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}