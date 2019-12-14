/*原辅材料送样脚本*/
var currentPage = 1;                          //当前页数
var isSearch = false;
var data;

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
            url: "searchRawSampleTotal",                  // url
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
            url: "searchRawSampleCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
    setRawSampleList(result);
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

/*原辅材料送样页面设置*/
function setRawSampleList(result) {
    // 获取id为cloneTr的tr元素

    var tr = $("#clone");
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr//
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (1):
                        //预约单号
                        $(this).html(obj.id);
                        break;
                    case (2):
                        // 材料类别
                        if(obj.rawMaterialsItem!=null){
                            $(this).html(obj.rawMaterialsItem.dictionaryItemName);
                        }

                        break;
                    case (3):
                        // 检测项目
                        project="";
                        var array=[];
                        if(obj.rawSampleItemList!=null){
                            $.each(obj.rawSampleItemList,function (index,item) {
                                if (item.adsorption == true) {
                                    array.push("碘吸附值");
                                }
                                if (item.ash == true) {
                                    array.push("灰分");
                                    // project += "";
                                }
                                if (item.calcium == true) {
                                    array.push("氢氧化钙")
                                    // project += "";
                                }
                                if (item.density == true) {
                                    array.push("表观密度")
                                    // project += "溶解固形物";
                                }
                                if (item.dry == true) {
                                    array.push("干燥减量")
                                    // project += "电导率";
                                }
                                if (item.particle == true) {
                                    array.push("粒度分布")
                                    //project += "硬度";
                                }
                                if (item.ph == true) {
                                    array.push("PH")
                                    // project += "碱度";
                                }
                                if (item.sodium == true) {
                                    array.push("氢氧化钠")
                                    // project += "相对碱度";
                                }

                                if (item.water == true) {
                                    array.push("水分")
                                    // project += '氨氮';
                                }
                            })

                        }
                        var hash=unique1(array).join(" ");
                        $(this).html(hash);
                        break;
                    case (4):
                        // 送样人
                        $(this).html(obj.sendingPerson);
                        break;
                    case (5):
                        // 签收人
                        $(this).html(obj.laboratorySignatory);
                        break;
                    case (6):
                        // 状态
                        if(obj.checkStateItem!=null){
                            $(this).html(obj.checkStateItem.dictionaryItemName);
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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if(pageNumber > totalPage()){
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
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadRawSampleList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setRawSampleList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchRawSample",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setRawSampleList(result);
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
    if(pageNumber > totalPage()){
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadRawSampleList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setRawSampleList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchRawSample",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setRawSampleList(result);
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
 * 分页 获取首页内容
 * */
function loadRawSampleList() {
    loadNavigationList();   // 设置动态菜单
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
        url: "loadRawSampleList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
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

    //为原辅类别做下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRawMaterialsByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var rawMaterialsItem = $('#search-rawMaterialsItem');
                rawMaterialsItem.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    rawMaterialsItem.append(option);
                });
                rawMaterialsItem.get(0).selectedIndex =-1;
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
 * 预约登记-显示预约框
 */
function appointModal() {
    $('#pass').hide();
    $('#break').hide();
    // 显示框体
    setSelectList();
    $("#reservationId").trigger('keyup')
    $('#appointModal').modal('show');

}


/**
 * 为原辅类别做下拉框
 */
function setSelectList() {


    //为原辅类别做下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRawMaterialsByDataDictionary",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //处理类别
                var rawMaterialsItem = $('#rawMaterialsItem');
                rawMaterialsItem.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    rawMaterialsItem.append(option);
                });
                rawMaterialsItem.get(0).selectedIndex = 0;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    //根据不同的原辅类别选择不同的检测项目(初始为液碱)

    var rawMaterialsItemName=$('#rawMaterialsItem option:selected').text();
    console.log(rawMaterialsItemName)

    //所有的勾选隐藏
    $('#addClone').children('td').eq(1).find('input').prop("checked", false);
    $('#addClone').children('td').eq(1).find('label').hide();
    if(rawMaterialsItemName=='液碱'){
    $('#sodium').show()
    }

}

/*根据材料类别选择检测项目==>新增*/
function Choice() {

    var rawMaterialsItemName=$('#rawMaterialsItem option:selected').text();
    //所有的勾选隐藏
    $('#addClone').children('td').eq(1).find('input').prop("checked", false);
    $('#addClone').children('td').eq(1).find('label').hide();
    if(rawMaterialsItemName=='液碱'){
        $('#sodium').show();
    }
    if(rawMaterialsItemName=='消石灰'){
        $('#calcium').show();
        $('#dry').show();
    }
    if(rawMaterialsItemName=='活性炭'){
        $('#adsorption').show();
        $('#ph').show();
        $('#water').show();
        $('#ash').show();
        $('#particle').show();
        $('#density').show();
    }
    if(rawMaterialsItemName=='木屑'){
        $('#water').show();
    }

}

/*根据材料类别选择检测项目==>修改*/
function Choice2() {

    var rawMaterialsItemName=$('#rawMaterialsItem2 option:selected').text();
    //所有的勾选隐藏
    $('#addClone1').children('td').eq(1).find('input').prop("checked", false);
    $('#addClone1').children('td').eq(1).find('label').hide();
    if(rawMaterialsItemName=='液碱'){
        $('#sodium2').show();
    }
    if(rawMaterialsItemName=='消石灰'){
        $('#calcium2').show();
        $('#dry2').show();
    }
    if(rawMaterialsItemName=='活性炭'){
        $('#adsorption2').show();
        $('#ph2').show();
        $('#water2').show();
        $('#ash2').show();
        $('#particle2').show();
        $('#density2').show();
    }
    if(rawMaterialsItemName=='木屑'){
        $('#water2').show();
    }

}

//预约单号检测==>新增
function testing(item) {
    $('#pass').hide();
    $('#break').hide();

    var id=$.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingRawSampleId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'id':id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                if(result.data==true){
                    $('#break').show();
                }
                if(result.data==false){
                    $('#pass').show();
                }
                if($.trim(id).length<=0){
                    $('#pass').hide();
                    $('#break').hide();
                }
            }
        },
        error:function (result) {

        }
    })
}


/**
 * 添加预约登记单
 */
function addAppoint() {

//主表
    var  data={
        sendingPerson:$('#sendingPerson').val(),
        id:$('#reservationId').val(),
        rawMaterialsItem:{dataDictionaryItemId:$('#rawMaterialsItem').val()},
    };
    console.log(data);
    //添加主表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addRawSample",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        processData: false,
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success"){
                $('.myclass').each(function () {
                    var sodium;
                    if($(this).children('td').eq(1).find('label').eq(0).find("input").prop('checked')==true){
                        sodium=1;
                    }
                    else
                        sodium=0;
                    var calcium;
                    if($(this).children('td').eq(1).find('label').eq(1).find("input").prop('checked')==true){
                        calcium=1;
                    }
                    else
                        calcium=0;
                    var dry;
                    if($(this).children('td').eq(1).find('label').eq(2).find("input").prop('checked')==true){
                        dry=1;
                    }
                    else
                        dry=0;

                    var adsorption;
                    if($(this).children('td').eq(1).find('label').eq(3).find("input").prop('checked')==true){
                        adsorption=1;
                    }
                    else
                        adsorption=0;

                    var ph;
                    if($(this).children('td').eq(1).find('label').eq(4).find("input").prop('checked')==true){
                        ph=1;
                    }
                    else
                        ph=0;
                    var water;
                    if($(this).children('td').eq(1).find('label').eq(5).find("input").prop('checked')==true){
                        water=1;
                    }
                    else
                        water=0;

                    var  ash;
                    if($(this).children('td').eq(1).find('label').eq(6).find("input").prop('checked')==true){
                        ash=1;
                    }
                    else
                        ash=0;
                    var  particle;
                    if($(this).children('td').eq(1).find('label').eq(7).find("input").prop('checked')==true){
                        particle=1;
                    }
                    else
                        particle=0;
                    var  density;
                    if($(this).children('td').eq(1).find('label').eq(8).find("input").prop('checked')==true){
                        density=1;
                    }
                    else
                        density=0;

                    var   dataItem={
                        sodium:sodium,
                        calcium:calcium,
                        dry:dry,
                        adsorption:adsorption,
                        ph:ph,
                        water:water,
                        ash:ash,
                        particle:particle,
                        density:density,
                        sampleinformationId:$('#reservationId').val(),
                    };
                    console.log(dataItem)
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "addRawSampleItem",              // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data: JSON.stringify(dataItem),
                        processData: false,
                        contentType: 'application/json;charset=utf-8',
                    })


                })
                alert("预约登记成功！")
                window.location.reload();
            }
        },
        error: function (result) {
            console.log(result);
        }
    });





}

//预约单号检测==>修改
function testing1(item) {
    $('#pass1').hide();
    $('#break1').hide();

    var id=$.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingSewageId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'id':id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                if(result.data==true){
                    $('#break1').show();
                }
                if(result.data==false){
                    $('#pass1').show();
                }
                if($.trim(id).length<=0){
                    $('#pass1').hide();
                    $('#break1').hide();
                }
            }
        },
        error:function (result) {

        }
    })
}

//查看
function view(item) {
    $("#appointModa2").modal('show');
    var id=$(item).parent().parent().children('td').eq(1).html();
    console.log(id)
    $("#reservationId1").text(id)
    $('#confirm').hide();
    //根据编号查找
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRawSampleById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{"id":id},
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)

                //化验室签收人
                $('#laboratorySignatory').val(result.data.laboratorySignatory);

                //送样人
                $('#sendingPerson1').text(result.data.sendingPerson);

                //材料类别
                if(result.data.rawMaterialsItem!=null){
                    $('#rawMaterialsItem1').text(result.data.rawMaterialsItem.dictionaryItemName);
                }



                if(result.data.rawSampleItemList!=null){

                    var tr=$('#clonrTr');
                    tr.siblings().remove();

                    $.each(result.data.rawSampleItemList,function (index,item) {

                        var clonedTr = tr.clone();

                        clonedTr.show();

                        var obj = eval(item);


                        clonedTr.children('td').eq(0).html(index + 1);
                        clonedTr.children('td').eq(1).html(obj.identifie);
                        // clonedTr.children('td').eq(2).html(obj.wastesName);
                        project = "";
                        if (obj.sodium == true) {
                            project += "氢氧化钠 ";
                        }
                        if (obj.calcium == true) {
                            project += "氢氧化钙 ";
                        }
                        if (obj.dry == true) {
                            project += "干燥减量 ";
                        }
                        if (obj.adsorption == true) {
                            project += "碘吸附值 ";
                        }
                        if (obj.ph == true) {
                            project += "PH ";
                        }
                        if (obj.water == true) {
                            project += "水分 ";
                        }
                        if (obj.ash == true) {
                            project += "灰分 ";
                        }
                        if (obj.particle == true) {
                            project += '粒度分布 ';
                        }
                        if (obj.density == true) {
                            project += "表观密度 ";
                        }
                        clonedTr.children('td').eq(1).html(project);

                        clonedTr.removeAttr("id");
                        clonedTr.insertBefore(tr);

                    });

                    // 隐藏无数据的tr
                    tr.hide();
                    tr.removeAttr('class');



                }







            }
            else {

            }
        },
        error:function (result) {

        }
    });

}

//修改
function adjust(item) {
    $('#pass1').hide();
    $('#break1').hide();

    $("#appointModa3").modal('show');
    var checkState=$(item).parent().parent().children('td').eq(6).html();

    if(checkState=='已收样'){
        alert('单据已收样,不可修改!')
    }

    if(checkState=='已拒收'){
        alert('单据已拒收,不可修改!')
    }
    if(checkState=='已作废'){
        alert('单据已作废,不可修改!')
    }




    if(checkState!='已作废'&&checkState!='已拒收'&&checkState!='已收样'){
        $('#addClone1').siblings().not($('#plusBtn1')).remove();
        var id=$(item).parent().parent().children('td').eq(1).html();
        $("#reservationId2").val(id)
        $("#reservationId3").val(id)
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getRawSampleById",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{"id":id},
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    //赋值


                    //为原辅类别做下拉框
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getRawMaterialsByDataDictionary",                  // url
                        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        success: function (result) {
                            if (result != undefined) {
                                var data = eval(result);
                                //处理类别
                                var rawMaterialsItem = $('#rawMaterialsItem2');
                                rawMaterialsItem.children().remove();
                                $.each(data.data, function (index, item) {
                                    var option = $('<option />');
                                    option.val(item.dataDictionaryItemId);
                                    option.text(item.dictionaryItemName);
                                    rawMaterialsItem.append(option);
                                });
                                rawMaterialsItem.get(0).selectedIndex = -1;
                            } else {
                                console.log("fail: " + result);
                            }
                        },
                        error: function (result) {
                            console.log("error: " + result);
                        }
                    });

                    if(result.data.rawMaterialsItem!=null){
                        $('#rawMaterialsItem2').val(result.data.rawMaterialsItem.dataDictionaryItemId);
                    }



                    var rawMaterialsItemName=$('#rawMaterialsItem2 option:selected').text();
                    $('#addClone1').children('td').eq(1).find('label').hide();
                    //所有的勾选隐藏

                    if(rawMaterialsItemName=='液碱'){
                        $('#sodium2').show();
                    }
                    if(rawMaterialsItemName=='消石灰'){
                        $('#calcium2').show();
                        $('#dry2').show();
                    }
                    if(rawMaterialsItemName=='活性炭'){
                        $('#adsorption2').show();
                        $('#ph2').show();
                        $('#water2').show();
                        $('#ash2').show();
                        $('#particle2').show();
                        $('#density2').show();
                    }
                    if(rawMaterialsItemName=='木屑'){
                        $('#water2').show();
                    }


                    //化验室签收人
                    $('#laboratorySignatory2').val(result.data.laboratorySignatory)

                    //送样人
                    $('#sendingPerson2').val(result.data.sendingPerson)


                    if(result.data.rawSampleItemList!=null){

                        var tr=$('#addClone1');

                        //tr.siblings().not($('#plusBtn1')).remove();

                        $.each(result.data.rawSampleItemList,function (index,item) {

                            // var clonedTr = tr.clone();

                            tr.show();
                            tr.attr("class","myclass2");
                            var obj = eval(item);

                            if((index + 1)!=1){
                                var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                                tr.children('td').eq(0).html(delBtn);
                                tr.children("td:eq(0)").append(index+1);
                            }
                            if((index + 1)==1){
                                tr.children('td').eq(0).html(index + 1);
                            }

                            if(item.sodium==true){
                                tr.children('td').eq(1).children("label").eq(0).find("input").prop('checked',true)
                            }
                            if(item.sodium==false){
                                tr.children('td').eq(1).children("label").eq(0).find("input").prop('checked',false)
                            }

                            if(item.calcium==true){
                                tr.children('td').eq(1).children("label").eq(1).find("input").prop('checked',true)
                            }
                            if(item.calcium==false){
                                tr.children('td').eq(1).children("label").eq(1).find("input").prop('checked',false)
                            }

                            if(item.dry==true){
                                tr.children('td').eq(1).children("label").eq(2).find("input").prop('checked',true)
                            }
                            if(item.dry==false){
                                tr.children('td').eq(1).children("label").eq(2).find("input").prop('checked',false)
                            }

                            if(item.adsorption==true){
                                tr.children('td').eq(1).children("label").eq(3).find("input").prop('checked',true)
                            }
                            if(item.adsorption==false){
                                tr.children('td').eq(1).children("label").eq(3).find("input").prop('checked',false)
                            }

                            if(item.ph==true){
                                tr.children('td').eq(1).children("label").eq(4).find("input").prop('checked',true)
                            }
                            if(item.ph==false){
                                tr.children('td').eq(1).children("label").eq(4).find("input").prop('checked',false)
                            }

                            if(item.water==true){
                                tr.children('td').eq(1).children("label").eq(5).find("input").prop('checked',true)
                            }
                            if(item.water==false){
                                tr.children('td').eq(1).children("label").eq(5).find("input").prop('checked',false)
                            }

                            if(item.ash==true){
                                tr.children('td').eq(1).children("label").eq(6).find("input").prop('checked',true)
                            }
                            if(item.ash==false){
                                tr.children('td').eq(1).children("label").eq(6).find("input").prop('checked',false)
                            }

                            if(item.particle==true){
                                tr.children('td').eq(1).children("label").eq(7).find("input").prop('checked',true)
                            }
                            if(item.particle==false){
                                tr.children('td').eq(1).children("label").eq(7).find("input").prop('checked',false)
                            }

                            if(item.density==true){
                                tr.children('td').eq(1).children("label").eq(8).find("input").prop('checked',true)
                            }
                            if(item.density==false){
                                tr.children('td').eq(1).children("label").eq(8).find("input").prop('checked',false)
                            }
                        });
                    }







                }
                else {

                }
            },
            error:function (result) {

            }
        });

    }





}

//确认修改
function adjustConfir() {

    var data={
        newId: $("#reservationId2").val(),
        id:$('#reservationId3').val(),
        sendingPerson:$('#sendingPerson2').val(),
        laboratorySignatory:$('#laboratorySignatory2').val(),
        rawMaterialsItem:{dataDictionaryItemId:$('#rawMaterialsItem2').val()},
    };
    //更新主表后删除字表数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateRawSample",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        processData: false,
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
            }
        },
        error:function (result) {

        }
    })



    console.log(data)
    $('.myclass2').each(function () {

        var sodium;
        if($(this).children('td').eq(1).find('label').eq(0).find("input").prop('checked')==true){
            sodium=1;
        }
        else
            sodium=0;

        var calcium;
        if($(this).children('td').eq(1).find('label').eq(1).find("input").prop('checked')==true){
            calcium=1;
        }
        else
            calcium=0;

        var dry;
        if($(this).children('td').eq(1).find('label').eq(2).find("input").prop('checked')==true){
            dry=1;
        }
        else
            dry=0;

        var adsorption;
        if($(this).children('td').eq(1).find('label').eq(3).find("input").prop('checked')==true){
            adsorption=1;
        }
        else
            adsorption=0;

        var ph;
        if($(this).children('td').eq(1).find('label').eq(4).find("input").prop('checked')==true){
            ph=1;
        }
        else
            ph=0;
        var water;
        if($(this).children('td').eq(1).find('label').eq(5).find("input").prop('checked')==true){
            water=1;
        }
        else
            water=0;

        var  ash;
        if($(this).children('td').eq(1).find('label').eq(6).find("input").prop('checked')==true){
            ash=1;
        }
        else
            ash=0;

        var  particle;
        if($(this).children('td').eq(1).find('label').eq(7).find("input").prop('checked')==true){
            particle=1;
        }
        else
            particle=0;

        var  density;
        if($(this).children('td').eq(1).find('label').eq(8).find("input").prop('checked')==true){
            density=1;
        }
        else
            density=0;

        var dataItem={
            sampleinformationId:$("#reservationId2").val(),
            sodium:sodium,
            calcium:calcium,
            dry:dry,
            adsorption:adsorption,
            ph:ph,
            water:water,
            ash:ash,
            particle:particle,
            density:density,
        };
        console.log(dataItem);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addRawSampleItem",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(dataItem),
            processData: false,
            contentType: 'application/json;charset=utf-8',
        })
    })
    //添加子表数据
    alert("修改成功！");
    $("#pageNumber").val(currentPage);   // 设置当前页页数
    inputSwitchPage();  // 跳转当前页
    $("#appointModa3").modal('hide');

}



//作废
function setInvalid(item) {

    var state=$(item).parent().parent().children('td').eq(6).html();

    if(state=='已收样'){
        alert("单据已收样,无法作废!")
    }
    if(state=='已拒收'){
        alert("单据已拒收,无法作废!")
    }
    if(state=='已作废'){
        alert("单据已作废,无法再次作废!")
    }
    if(state=='待收样') {
        var id=$(item).parent().parent().children('td').eq(1).html();

        if(confirm("确认作废?")){
            //点击确定后操作
            $.ajax({
                type: "POST",                       // 方法类型
                url: "cancelRawSample",              // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {'id':id},
                //processData: false,
                //contentType: 'application/json;charset=utf-8',
                success:function (result) {
                    if (result != undefined && result.status == "success"){
                        alert(result.message)
                        $("#pageNumber").val(currentPage);   // 设置当前页页数
                        inputSwitchPage();  // 跳转当前页
                    }
                },
                error:function (result) {

                }
            })
        }
    }




}




//确认收样
function setSubmit(item) {
    $("#appointModa2").modal('show');
    $('#confirm').show();
    var state=$(item).parent().parent().children('td').eq(6).html();
    if($(item).parent().parent().children('td').eq(6).html()=='待收样'){
        var id=$(item).parent().parent().children('td').eq(1).html();
        console.log(id);
        $("#reservationId1").text(id);


        //根据编号查找
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getRawSampleById",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{"id":id},
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)

                    //化验室签收人
                    $('#laboratorySignatory').val(result.data.laboratorySignatory);

                    //送样人
                    $('#sendingPerson1').text(result.data.sendingPerson);

                    //材料类别
                    if(result.data.rawMaterialsItem!=null){
                        $('#rawMaterialsItem1').text(result.data.rawMaterialsItem.dictionaryItemName);
                    }



                    if(result.data.rawSampleItemList!=null){

                        var tr=$('#clonrTr');
                        tr.siblings().remove();

                        $.each(result.data.rawSampleItemList,function (index,item) {

                            var clonedTr = tr.clone();

                            clonedTr.show();

                            var obj = eval(item);


                            clonedTr.children('td').eq(0).html(index + 1);
                            clonedTr.children('td').eq(1).html(obj.identifie);
                            // clonedTr.children('td').eq(2).html(obj.wastesName);
                            project = "";
                            if (obj.sodium == true) {
                                project += "氢氧化钠 ";
                            }
                            if (obj.calcium == true) {
                                project += "氢氧化钙 ";
                            }
                            if (obj.dry == true) {
                                project += "干燥减量 ";
                            }
                            if (obj.adsorption == true) {
                                project += "碘吸附值 ";
                            }
                            if (obj.ph == true) {
                                project += "PH ";
                            }
                            if (obj.water == true) {
                                project += "水分 ";
                            }
                            if (obj.ash == true) {
                                project += "灰分 ";
                            }
                            if (obj.particle == true) {
                                project += '粒度分布 ';
                            }
                            if (obj.density == true) {
                                project += "表观密度 ";
                            }
                            clonedTr.children('td').eq(1).html(project);

                            clonedTr.removeAttr("id");
                            clonedTr.insertBefore(tr);

                        });

                        // 隐藏无数据的tr
                        tr.hide();
                        tr.removeAttr('class');



                    }







                }
                else {

                }
            },
            error:function (result) {

            }
        });
    }

    if(state=='已作废'){
        alert("单据已作废,无法收样")
    }
    if(state=='已拒收'){
        alert("单据已拒收,无法收样")
    }
    if(state=='已收样'){
        alert("单据已收样,无法收样")
    }
}

//确认送样方法==>真正的方法
function confirmSample() {




    var id=$("#reservationId1").text();

    var laboratorySignatory=$('#laboratorySignatory').val();



    var ph;

    var cod;

    var bod5;

    var n2;

    var phosphorus;

    var nitrogen;

    var lye;



    $.ajax({
        type: "POST",                       // 方法类型
        url: "confirmRawSampleById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{"id":id,'laboratorySignatory':laboratorySignatory},
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert("已收样!")
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
            }
        },
        error:function (result) {


        }

    });


}

/**
 * 拒收框
 */
function rejection(item) {

    var state=$(item).parent().parent().children('td').eq(6).html();
    if(state=='已收样'){
        alert('单据已收样,不可拒收!')
    }
    if(state=='已作废'){
        alert('单据已作废,不可拒收!')
    }

    if(state=='待收样'||state=='已拒收'){
        var id=$(item).parent().parent().children('td').eq(1).html();
        $('#id1').text(id);
        $("#rejection1").modal('show')

        //根据编号查找
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getRawSampleById",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{"id":id},
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    $('#advice').val(result.data.advice);

                }
                else {

                }
            },
            error:function (result) {

            }
        });
    }


}

//真正的拒收方法
function rejection1() {
    var id=  $('#id1').text();;
    var advice=   $('#advice').val();

    $.ajax({
        type: "POST",                       // 方法类型
        url: "rejectRawSampleItemById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{"id":id,"advice":advice},
        success:function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message)
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#rejection1").modal('hide');
            }

        },
        error:function (result) {
            alert("服务器异常！")
        }
    })


}

/**
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchRawSample();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchRawSample();      //
            }
        },400);
    });
});

/*查询*/
function searchRawSample() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        var sodium;
        var calcium;
        var dry;
        var adsorption;
        var ph;
        var water;
        var ash;
        var particle;
        var density;
        if($('#search-sodium').prop('checked')==true){
            sodium=true;
        }
        else
            sodium=false;

        if($('#search-calcium').prop('checked')==true){
            calcium=true;
        }
        else
            calcium=false;

        if($('#search-dry').prop('checked')==true){
            dry=true;
        }
        else
            dry=false;

        if($('#search-adsorption').prop('checked')==true){
            adsorption=true;
        }
        else
            adsorption=false;

        if($('#search-ph').prop('checked')==true){
            ph=true;
        }
        else
            ph=false;

        if($('#search-water').prop('checked')==true){
            water=true;
        }
        else
            water=false;

        if($('#search-ash').prop('checked')==true){
            ash=true;
        }
        else
            ash=false;

        if($('#search-particle').prop('checked')==true){
            particle=true;
        }
        else
            particle=false;

        if($('#search-density').prop('checked')==true){
            density=true;
        }
        else
            density=false;

        data = {
            sendingPerson:$.trim($('#search-remarks').val()),
            laboratorySignatory:$.trim($('#search-laboratorySignatory').val()),
            rawMaterialsItem:{dataDictionaryItemId:$('#search-rawMaterialsItem').val()},
            rawSampleItemList:[{sodium:sodium,calcium:calcium,dry:dry,adsorption:adsorption,ph:ph,water:water,ash:ash,particle:particle,density:density}],
            checkStateItem:{dataDictionaryItemId:$("#search-checkState").val()},
            page: page,
        };
        console.log(data);
        // 模糊查询
    } else {
        var keywords=$.trim($("#searchContent").val());

        if(keywords=='氢氧化钠'){
            sodium=true;
            keywords='';
        }
        if(keywords=='氢氧化钙'){
            calcium=true;
            keywords='';
        }
        if(keywords=='干燥减量'){
            dry=true;
            keywords='';
        }
        if(keywords=='碘吸附值'){
            adsorption=true;
            keywords='';
        }
        if(keywords=='PH'){
            ph=true;
            keywords='';
        }
        if(keywords=='水分'){
            water=true;
            keywords='';
        }
        if(keywords=='灰分'){
            ash=true;
            keywords='';
        }

        if(keywords=='粒度分布'){
            particle=true;
            keywords='';
        }

        if(keywords=='表观密度'){
            density=true;
            keywords='';
        }

        data = {
            keywords: keywords,
            page: page,
            rawSampleItemList:[{sodium:sodium,calcium:calcium,dry:dry,adsorption:adsorption,ph:ph,water:water,ash:ash,particle:particle,density:density}],
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchRawSample",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
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
function enterSearch(){
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchRawSample();      //
    }
}

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/原辅材料送样登记导入模板.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
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
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importRawSampleExcel",              // url
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
    var name = 't_pr_rawsample';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select  a.id,a.sendingPerson,a.laboratorySignatory,c.dictionaryItemName,b.sodium,b.calcium,b.dry,b.adsorption,b.ph,b.water,b.ash,b.particle,b.density  from  t_pr_rawsample a join  t_pr_rawsampleitem b on b.sampleinformationId=a.id join datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId and a.id" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select  a.id,a.sendingPerson,a.laboratorySignatory,c.dictionaryItemName,b.sodium,b.calcium,b.dry,b.adsorption,b.ph,b.water,b.ash,b.particle,b.density  from  t_pr_rawsample a join  t_pr_rawsampleitem b on b.sampleinformationId=a.id join datadictionaryitem c on c.dataDictionaryItemId=a.checkStateId and a.id";
    }
    console.log("sql:"+sqlWords);
    window.open('exportRawSample?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 一键签收
 */
function confirmAllCheck(){
    var laboratorySigner = "";
    $.ajax({
        type: "POST",                             // 方法类型
        url: "getCurrentUserInfo",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result.status === "success" && result.data != null) {
                laboratorySigner = result.data.name;      // 获取签收人
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    var idList = [];   // 承装需要确认收样的预约单号
    $.each($("input[name='select']:checked"), function (index, item) {
        if($(item).parent().parent().parent().find("td[name='state']").text() === "待收样") {   // 将待收样的物品
            idList.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
        }
    });
    if(idList.length > 0) {
        var sampleInformation = {};
        sampleInformation.laboratorySignatory = laboratorySigner;
        sampleInformation.sampleIdList = idList;
        console.log(sampleInformation);
        $.ajax({
            type: "POST",                             // 方法类型
            url: "confirmAllRawSampleisCheck",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(sampleInformation),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
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
                console.dir(result);
                alert("服务器异常!");
            }
        });
    } else {
        alert("请勾选需要收样的单号！");
    }
}