/*原辅材料化验单*/

var isSearch = false;
var currentPage = 1;                          //当前页数
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
            url: "rawMaterialsTestTotal",                  // url
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
    }  else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchRawMaterialsTestCount",                  // url
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
    return loadPages(totalRecord, count);
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setDataList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = [];
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
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadRawMaterialsTestList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setDataList(result);
                } else {
                    console.log(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (isSearch) {//查询用的
        data['page'] = page;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchRawMaterialsTest",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setDataList(result)
                } else {
                    alert(result.message);

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
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
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
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadRawMaterialsTestList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        setDataList(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        else {
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchRawMaterialsTest",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setDataList(result);
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


/**
 * 分页 获取首页内容
 * */
function loadRawMaterialsTestList() {
    $('.loader').show();
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchData();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadRawMaterialsTestList",   // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    $('.loader').hide();
                    console.log(result);
                    setPageClone(result);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                console.log("失败");
            }
        });
        isSearch = false;
    }

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
                var rawMaterialsItem = $('#search-rawMaterialsName');
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
 * 设置化验单数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass')
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 化验单号
                case (1):
                    $(this).html(obj.id);
                    break;
                // 材料类别
                case (2):
                    $(this).html(obj.rawMaterialsName);
                    break;
                // 氢氧化钠含量%
                case (3):
                    $(this).html(setNumber2Line(parseFloat(obj.sodium).toFixed(2)));
                    break;
                // 氢氧化钙含量%
                case (4):

                    $(this).html(setNumber2Line(parseFloat(obj.calcium).toFixed(2)));
                    break;
                // 干燥减量%
                case (5):
                    $(this).html(setNumber2Line(parseFloat(obj.dry).toFixed(2)));
                    break;
                // 碘吸附值mg/g
                case (6):
                    $(this).html(setNumber2Line(parseFloat(obj.adsorption).toFixed(2)));
                    break;
                //pH值
                case (7):
                    $(this).html(setNumber2Line(parseFloat(obj.ph).toFixed(2)));
                    break;
                    //水分%
                case (8):
                    $(this).html(setNumber2Line(parseFloat(obj.water).toFixed(2)));
                    break;
                    //灰分%
                case (9):
                    $(this).html(setNumber2Line(parseFloat(obj.ash).toFixed(2)));
                    break;
                //粒度分布%
                case (10):
                    $(this).html(setNumber2Line(parseFloat(obj.particle).toFixed(2)));
                    break;
                //表观密度g/ml
                case (11):
                    $(this).html(setNumber2Line(parseFloat(obj.density).toFixed(2)));
                    break;
                //备注
                case (12):
                    $(this).html(obj.remarks);
                    break;
                //状态
                case (13):
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
 * 导入excel文件
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importRawMaterialsTestResultsExcel",              // url
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
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/原辅材料化验结果模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 化验结果导出excel
 * @param e
 */
function exportExcel() {
    var name = '1';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select id,replace(sodium,-9999,''),replace(calcium,-9999,''),replace(dry,-9999,''),replace(adsorption,-9999,''),\n" +
            "replace(ph,-9999,''),replace(water,-9999,''),replace(ash,-9999,''),replace(particle,-9999,''),\n" +
            "replace(density,-9999,''),remarks \n" +
            "from t_pr_rawmaterialstest " + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select id,replace(sodium,-9999,''),replace(calcium,-9999,''),replace(dry,-9999,''),replace(adsorption,-9999,''),\n" +
            "replace(ph,-9999,''),replace(water,-9999,''),replace(ash,-9999,''),replace(particle,-9999,''),\n" +
            "replace(density,-9999,''),remarks \n" +
            "from t_pr_rawmaterialstest ";
    }
    window.open('exportExcelRawMaterialsTest?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 增加数据
 */
function addData() {

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
                var rawMaterialsItem = $('#rawMaterialsName');
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
    Choice();
    $('#pass').hide();
    $('#break').hide();
    $('#addModal').find('input').val('');
    $("#addModal").modal("show");
    $('#addTable').siblings().not($("#plusBtn")).remove();
}

//原辅材料化校验
function testing(item) {
    $(item).parent().children('p').eq(0).hide()
    $(item).parent().children('p').eq(1).hide()

    var id=$.trim($(item).val());

    $.ajax({
        type: "POST",                       // 方法类型
        url: "testingRawMaterialsTestId",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'id':id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                if(result.data==true){
                    $(item).parent().children('p').eq(1).show()
                    $(item).parent().children('p').eq(0).hide()
                }
                if(result.data==false){
                    $(item).parent().children('p').eq(0).show()
                    $(item).parent().children('p').eq(1).hide()
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


/*根据材料类别选择检测项目==>新增*/
function Choice() {

    var rawMaterialsItemName=$('#rawMaterialsName option:selected').text();
    //所有的勾选隐藏

    $('#addTable').find('input').not($('#remarks')).not($('#id')).attr('readonly','readonly')


    if(rawMaterialsItemName=='液碱'){
        $('#sodium').removeAttr('readonly');
    }
    if(rawMaterialsItemName=='消石灰'){
        $('#calcium').removeAttr('readonly');
        $('#dry').removeAttr('readonly');
    }
    if(rawMaterialsItemName=='活性炭'){
        $('#adsorption').removeAttr('readonly');
        $('#ph').removeAttr('readonly');
        $('#water').removeAttr('readonly');
        $('#ash').removeAttr('readonly');
        $('#particle').removeAttr('readonly');
        $('#density').removeAttr('readonly');
    }
    if(rawMaterialsItemName=='木屑'){
        $('#water').removeAttr('readonly');
    }

}

//添加方法
function save() {

    var sodium=$.trim($('#sodium').val());
    if(sodium.length==0){
        sodium=-9999;
    }
    var calcium=$.trim($('#calcium').val());
    if(calcium.length==0){
        calcium=-9999;
    }
    var dry=$.trim($('#dry').val());
    if(dry.length==0){
        dry=-9999;
    }
    var adsorption=$.trim($('#adsorption').val());
    if(adsorption.length==0){
        adsorption=-9999;
    }
    var ph=$.trim($('#ph').val());
    if(ph.length==0){
        ph=-9999;
    }
    var water=$.trim($('#water').val());
    if(water.length==0){
        water=-9999;
    }
    var ash=$.trim($('#ash').val());
    if(ash.length==0){
        ash=-9999;
    }
    var particle=$.trim($('#particle').val());
    if(particle.length==0){
        particle=-9999;
    }
    var density=$.trim($('#density').val());
    if(density.length==0){
        density=-9999;
    }


    var data={
        id:$.trim($('#id').val()),
        rawMaterialsName:$('#rawMaterialsName option:selected').text(),
        sodium:sodium,
        calcium:calcium,
        dry:dry,
        adsorption:adsorption,
        ph:ph,
        water:water,
        ash:ash,
        particle:particle,
        density:density,
        remarks:$.trim($('#remarks').val()),
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addRawMaterialsTest",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert("添加成功")
                window.location.reload();
            }
        },
        error: function (result) {

        }
    })


}

//修改
function setAdjust(item) {

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
                var rawMaterialsItem = $('#rawMaterialsName2');
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


    var id = $(item).parent().parent().children('td').eq(1).html();
    $('#addModa2').find('input').val('')
    $('#addModa2').find('input').not($('#rawMaterialsName2')).removeAttr('readonly')
    //根据编号获取信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getRawMaterialsTestById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'id': id},
        //contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //赋值
                var obj = eval(result.data);
                $('#id1').val(obj.id);
                if(obj.adsorption!=-9999){
                    $('#adsorption2').val(obj.adsorption.toFixed(2));
                }
                else {
                    $('#adsorption2').attr('readonly','readonly')
                }
                if(obj.ash!=-9999){
                    $('#ash2').val(obj.ash.toFixed(2));
                }
                else {
                    $('#ash2').attr('readonly','readonly')
                }
                if(obj.calcium!=-9999){
                    $('#calcium2').val(obj.calcium.toFixed(2));
                }
                else {
                    $('#calcium2').attr('readonly','readonly')
                }
                if(obj.density!=-9999){
                    $('#density2').val(obj.density.toFixed(2));
                }
                else {
                    $('#density2').attr('readonly','readonly')
                }
                if(obj.dry!=-9999){
                    $('#dry2').val(obj.dry.toFixed(2));
                }
                else {
                    $('#dry2').attr('readonly','readonly')
                }
                if(obj.particle!=-9999){
                    $('#particle2').val(obj.particle.toFixed(2));
                }
                else {
                    $('#particle2').attr('readonly','readonly')
                }
                if(obj.ph!=-9999){
                    $('#ph2').val(obj.ph.toFixed(2));
                }
                else {
                    $('#ph2').attr('readonly','readonly')
                }
                if(obj.sodium!=-9999){
                    $('#sodium2').val(obj.sodium.toFixed(2));
                }
                else {
                    $('#sodium2').attr('readonly','readonly')
                }
                if(obj.water!=-9999){
                    $('#water2').val(obj.water.toFixed(2));
                }
                else {
                    $('#water2').attr('readonly','readonly')
                }
                $('#remarks2').val(obj.remarks);
                $('#rawMaterialsName2').val(obj.rawMaterialsName);
            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })

    $('#addModa2').modal('show');
}


//
//原辅材料化验单修改
function adjustRawMaterialsTest() {
    var sodium=$('#sodium2').val();
    if(sodium.length==0){
        sodium=-9999;
    }
    var calcium=$('#calcium2').val();
    if(calcium.length==0){
        calcium=-9999;
    }
    var dry=$('#dry2').val();
    if(dry.length==0){
        dry=-9999;
    }
    var adsorption=$('#adsorption2').val();
    if(adsorption.length==0){
        adsorption=-9999;
    }
    var ph=$('#ph2').val();
    if(ph.length==0){
        ph=-9999;
    }
    var water=$('#water2').val();
    if(water.length==0){
        water=-9999;
    }
    var ash=$('#ash2').val();
    if(ash.length==0){
        ash=-9999;
    }
    var particle=$('#particle2').val();
    if(particle.length==0){
        particle=-9999;
    }
    var density=$('#density2').val();
    if(density.length==0){
        density=-9999;
    }

    var data = {
        id: $('#id1').val(),
        sodium: sodium,
        calcium: calcium,
        dry: dry,
        adsorption: adsorption,
        ph: ph,
        water: water,
        ash: ash,
        particle: particle,
        density: density,
        remarks: $('#remarks').val()
    }


    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateRawMaterialsTestById",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                //赋值
                alert(result.message)
                window.location.reload();

            }

        },
        error: function (result) {
            alert("服务器异常！")
        }

    })


}

/**
 * 审批
 * @param item
 */
function approval() {
    $("#approval2").modal('show')
}
//提交
function setSubmit(item) {

    var id = $(item).parent().parent().children('td').eq(1).html();

    console.log(id)

    if (confirm("确认提交?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "submitRawMaterialsTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }

}


//签收
function setConfirm(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    if (confirm("确认签收?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "confirmRawMaterialsTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }
}

//作废
function setCancel(item) {
    var id = $(item).parent().parent().children('td').eq(1).html();

    if (confirm("确认作废?")) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "cancelRawMaterialsTest",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            //contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert(result.message)
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }

            },
            error: function (result) {
                alert("服务器异常！")
            }

        })
    }

}

/**
 * 延时自动查询
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp === 0) {
                searchData();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        }, 600);
    });
});


//查询
function searchData() {

    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {

        data = {
            id:$.trim($('#search-id').val()),
            remarks:$.trim($('#search-remarks').val()),
            page: page,
            checkStateItem:{dataDictionaryItemId:$('#search-checkState').val()},
            rawMaterialsName:$('#search-rawMaterialsName option:selected').text(),
        };
    }
    else {
        var keyword = $.trim($("#searchContent").val());
        data = {
            page: page,
            keyword: keyword
        }
    }


    if (data == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchRawMaterialsTest",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setPageClone(result)
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    alert(result.message);

                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
    console.log(data)

}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchData();      //
    }
}