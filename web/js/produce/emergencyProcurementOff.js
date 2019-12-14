/****
 *
 * 应急非物资采购脚本
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array=[];//存放所有的tr
array1=[];//存放目标的tr
array0=[];


/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalEmcOffRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
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
    } else {
        totalRecord=array1.length;
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
    setEmProcurementOffList(result);
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

function setEmProcurementOffList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    // console.log(result.data);
    tr.attr('class','myclass');
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
                    // 申请单编号
                    case (1):
                        $(this).html(obj.receiptNumber);
                        break;
                    // 物资类别
                    case (2):
                        if(obj.nonMaterialItem!=null){
                            $(this).html(obj.nonMaterialItem.dictionaryItemName);
                        }

                        break;
                    // 需用时间
                    case (3):
                        $(this).html(getDateStr(obj.demandTime));
                        break;
                    // 申请部门
                    case (4):
                        $(this).html(obj.applyDepartment);
                        break;
                    // 申购部门负责人
                    case (5):
                        $(this).html(obj.proposer);
                        break;
                    // 生产部门主管
                    case (6):
                        $(this).html(obj.divisionHead);
                        break;
                    // 采购部门主管
                    case (7):
                        $(this).html(obj.purchasingDirector);
                        break;
                    //总经理
                    case (8):
                        $(this).html(obj.generalManager);
                        break;
                    //申请日期
                    case (9):
                        $(this).html(getDateStr(obj.applyDate));
                        break;
                    //单据状态
                    case (10):
                        if(obj.checkStateItem!=null){
                            $(this).html((obj.checkStateItem.dictionaryItemName));
                            // if((obj.checkStateItem.dictionaryItemName)=='已作废'){
                            //     $(this).parent().hide()
                            // }
                        }

                        break;
                    //附件地址
                    case (11):
                        $(this).html(obj.procurementFileURL);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            // clonedTr.removeAttr("class");
            clonedTr.insertBefore(tr);
            clonedTr.removeAttr('id')


    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
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
    // addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) { //分页用的
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getEmergencyProcurementOffList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setEmProcurementOffList(result);
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
    if(pageNumber > totalPage()){
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getEmergencyProcurementOffList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setEmProcurementOffList(result);
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
        }   if (isSearch) {//查询用的
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


//加载应急非物资采购列表
function getEmergencyProcurementOffList() {
    $('.loader').show();
    loadNavigationList();   // 设置动态菜单
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
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    if(array0.length==0){
        for (var i = 1; i <= totalPage(); i++) {
            switchPage(parseInt(i));

            array0.push($('.myclass'));
        }
    }
    page.start = (pageNumber - 1) * page.count;
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchEmOff();
        $('.loader').hide();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getEmergencyProcurementOffList",          // url
            data: JSON.stringify(page),
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    $('.loader').hide();
                    console.log(result)
                    //设置月度采购申请表数据
                    setPageClone(result);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                }
                else {

                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！")

            }
        });
    }


    //设置非物资类别下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNonMaterialItemByDataDictionary",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var materialCategoryItem = $("#search-suppliesCategory");
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

    isSearch=false;
}


//加载辅料列表
function getIngredientsList() {
    loadNavigationList();   // 设置动态菜单
    $('.loader').show();
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });
    var page={};
    page.count=0;//解决加载慢
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageIngredientList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:JSON.stringify(page),
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                // console.log(result);
                $('.loader').hide();
                var suppliesName=$('#suppliesName');
                suppliesName.children().remove();
                $.each(result.data,function (index,item) {
                    var option = $('<option />');
                    option.val(item.id);
                    if(item.specification!=null&&item.specification!=""){
                        option.text(item.name+" "+item.specification);
                    }
                    else {
                        option.text(item.name);
                    }
                    suppliesName.append(option);

                });
                $('.selectpicker').selectpicker('refresh');

            }

            else {
                alert(result.message);
            }
        },

        error:function (result) {
            alert("服务器异常！");
        }
    });

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
                var unit=$('#unit');
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
    $('#applyDate').val(dateToString(new Date()));



    var data=getCurrentUserData();

    //非物资类别
    $.ajax({
        type:'POST',
        url:"getNonMaterialItemByDataDictionary",
        //data:JSON.stringify(data),
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                console.log(result);
                var nonMaterial=$('#nonMaterial');
                nonMaterial.children().remove();
                $.each(result.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
                    nonMaterial.append(option);
                });
                nonMaterial.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });

    //根据辅料备件id获取规格
    var id=($('.myclass').children('td').eq(1).find("select").selectpicker('val'));
    $.ajax({
        type:'POST',
        url:"getSpecificationById",
        data:{"id":id},
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                $('.myclass').children('td').eq(2).find("input").val(result.data)
            }
            else {

                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })
}


//根据编号查询规格
function findSpecification(item) {
    var id=$(item).selectpicker('val');
    console.log(id)
    $.ajax({
        type:'POST',
        url:"getSpecificationById",
        data:{"id":id},
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                if(result.data!=null){
                    $(item).parents('.myclass').children('td').eq(2).find('input').val(result.data.specification);
                    if(result.data.unitDataItem!=null){
                        $(item).parents('.myclass').children('td').eq(3).find('select').val(result.data.unitDataItem.dataDictionaryItemId)
                    }
                }
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })

}

//克隆行方法
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
    clonedTr.children("td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7)").find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1=(id.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num-1);
        //console.log(newName);
        $(this).prop('name', newName);
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

    //根据辅料备件id获取规格
    var id=$(item).parent().parent().prev().children('td').eq(1).find('select').selectpicker('val');
    console.log(id)
    $.ajax({
        type:'POST',
        url:"getSpecificationById",
        data:{"id":id},
        dataType: "json",
        async: false,
        // contentType: "application/json;charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                $(item).parent().parent().prev().children('td').eq(2).find('input').val(result.data)
            }
            else {

                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })
}


//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
    var i=0
    //2018/10/11更新 请勿修改！
    $('.myclass').each(function (index,item) {
        if((index+1)!=1){
            $(this).children('td').eq(0).html("<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;"+(parseInt(index)+1).toString());

        }

    })

}

//应急非物资新增
function saveEmOFF() {

    if($('#applyDate').val().length>0){
        //先添加到采购表中，再添加到物资表中
        data={
            // suppliesCategory:$('#suppliesCategory').val(),
            applyDate:$('#applyDate').val(),
            demandTime:$('#demandTime').val(),
            applyDepartment:$('#applyDepartment option:selected').text(),
            proposer:$('#proposer').val(),
            divisionHead:$('#divisionHead').val(),
            purchasingDirector:$('#purchasingDirector').val(),
            generalManager:$('#generalManager').val(),
            procurementCategory:0,//代表是应急采购
            nonMaterialItem:{dataDictionaryItemId:$('#nonMaterial').val()},
            nonMaterial:true,//代表非物资
        }
        //执行添加到后台的ajax
        $.ajax({
            type: "POST",                       // 方法类型
            url: "addProcurement",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    //上传附件
                    var receiptNumber=result.receiptNumber;
                    var formFile = new FormData();
                    formFile.append("receiptNumber",receiptNumber)
                    if ($('#file').prop('type') != 'text') {
                        var procurementFile = $('#file')[0].files[0];
                        formFile.append("procurementFile", procurementFile);
                        if(procurementFile!=undefined){
                            //保存采购附件
                            $.ajax({
                                type: "POST",                            // 方法类型
                                url: "saveProcurementFile",                     // url
                                cache: false,
                                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: formFile,
                                dataType: "json",
                                processData: false,
                                contentType: false,
                                success: function (result) {
                                    if (result != undefined && result.status == "success") {

                                    }
                                    else {

                                    }
                                },
                                error: function (result) {
                                    console.log("error: " + result);
                                    alert("服务器异常!");
                                }
                            });
                        }

                    }
                }
                else {

                    alert(result.message);
                }
            },error:function (result) {
                alert("服务器异常！")
            }
        });




        $('.myclass').each(function () {
            var specifications=$(this).children('td').eq(2).children('input').val();
            var suppliesName=$(this).children('td').eq(1).children('div').find('button').attr('title').replace(specifications,"");
            var unitId=$(this).children('td').eq(3).children('select').val();
            var inventory=$(this).children('td').eq(4).children('input').val();
            var demandQuantity=$(this).children('td').eq(5).children('input').val();
            var purchaseQuantity=$(this).children('td').eq(6).children('input').val();
            var note=$(this).children('td').eq(7).children('input').val();
            var materialdata={
                suppliesName:suppliesName,
                specifications:specifications,
                unitDataItem:{dataDictionaryItemId:unitId},
                inventory:inventory,
                demandQuantity:demandQuantity,
                purchaseQuantity:purchaseQuantity,
                note:note,
                materialCategoryItem:{dataDictionaryItemId:$('#materialCategoryItem').val()},

            }
            $.ajax({
                type: "POST",                       // 方法类型
                url: "addMaterial",          // url
                async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(materialdata),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success:function (result) {
                    if (result != undefined && result.status == "success"){
                        console.log(result);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error:function (result) {
                    alert(result.message);
                }

            });

        });
        alert("添加成功！")
        window.location.href="emergencyProcurementOff.html"
    }
    else {
        $('#applyDate').next('span').remove();
        var span=$('<span>');
        span.text("请输入日期！");
        span.css('color','red');
        $('#applyDate').after($(span));

    }
}


//点击图标查询
function view(item) {
    var receiptNumber=$(item).parent().parent().children('td').eq(1).text();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'receiptNumber':receiptNumber},
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setEmProcurementListModal(result.data[0].materialList);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常!");
        }
    });
    $('#appointModal2').modal('show');
}

//设置月度采购申请表数据模态框数据==>查看
function setEmProcurementListModal(result) {
    //$('.myclass1').hide();
    var tr = $("#cloneTr2");
    tr.siblings().remove();
    tr.attr('class','myclass1');
    $.each(result, function (index, item) {
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
                // 物资名称
                case (0):
                    $(this).html(obj.suppliesName);
                    break;
                // 规格型号
                case (1):
                    $(this).html(obj.specifications);
                    break;
                // 单位
                case (2):
                    if(obj.unitDataItem!=null){
                        $(this).html(obj.unitDataItem.dictionaryItemName);
                    }

                    break;
                // 库存量
                case (3):
                    $(this).html(obj.inventory.toFixed(2));
                    break;
                // 需求数量
                case (4):
                    $(this).html(obj.demandQuantity.toFixed(2));
                    break;
                //采购数量
                case (5):
                    $(this).html(obj.purchaseQuantity.toFixed(2));
                    break;
                // 备注
                case (6):
                    $(this).html(obj.note);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);


    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}

//提交
function submit(item) {
    initSubmitFName(submitProcurementListById.name);
    if(confirm("确定提交?")) {
        //点击确定后操作
        var receiptNumber = $(item).parent().parent().children('td').eq(1).text();
        publicSubmit(receiptNumber,getUrl(),getCurrentUserData().name,getCurrentUserData().role.id)
        // $.ajax({
        //     type: "POST",                       // 方法类型
        //     url: "submitProcurementListById",          // url
        //     async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        //     dataType: "json",
        //     data: {'receiptNumber': receiptNumber},
        //     success: function (result) {
        //         if (result != undefined && result.status == "success") {
        //             alert(result.message);
        //             // window.location.reload();
        //         }
        //         else {
        //             alert(result.message);
        //         }
        //     },
        //     error: function (result) {
        //         alert("服务器异常!");
        //     }
        // });
    }
}

function submitProcurementListById(id) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "submitProcurementListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'receiptNumber': id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                // window.location.reload();
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常!");
        }
    });
}

/**
 * 新审批
 */
function approval(item) {
    initSubmitFName(submitProcurementListById.name);
    initApprovalFName(approval1.name);
    initBakcFName(back.name);
    var id=$(item).parent().parent().children("td").eq(1).html();
    $('#ApprovalOrderId').text(id);
    $.ajax({
        type: "POST",
        url: "getAllChildNode",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'orderId': id},
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                if(result.data!=null){
                    setApprovalModal(result.data);
                    $("#approval").modal('show');
                }

            }
            else {
                alert('未提交，无法审批！')
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    });

}

//审批
function approval1(id) {

    //点击确定后操作

    $.ajax({
        type: "POST",                       // 方法类型
        url: "setProcurementListSubmit",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'receiptNumber': id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
                window.location.reload();
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常!");
        }
    });


}

/*驳回*/
function back(id) {

    //点击确定后操作

    $.ajax({
        type: "POST",                       // 方法类型
        url: "setProcurementListBack",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'receiptNumber': id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                // alert(result.message);
                // window.location.reload();
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常!");
        }
    });


}

//作废
function cancel(item) {
    if(confirm("确定作废?")){
        //点击确定后操作
        var receiptNumber=$(item).parent().parent().children('td').eq(1).text();

        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProcurementListCancel",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{'receiptNumber':receiptNumber},
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message);
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }
            },
            error:function (result) {

            }
        })
    }


}


//修改
function emergencyProcurementOffModify(item) {
    var receiptNumber=$(item).parent().parent().children('td').eq(1).text();
    $('#receiptNumber').text(receiptNumber)
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
                var unit=$('#unitItem');
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


    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'receiptNumber':receiptNumber},
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setEmProcurementListModal1(result.data[0].materialList);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常!");
        }
    });
    $('#appointModal3').modal('show');
}

//设置月度采购申请表数据模态框数据==>修改
function setEmProcurementListModal1(result) {
    //$('.myclass1').hide();
    var tr = $("#cloneTr3");
    tr.siblings().not($('#plusBtn')).remove();
    tr.attr('class','myclass2');
    $.each(result, function (index, item) {
        //console.log(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.attr('class','myclass2');
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            //1生成领料单号
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 物资名称
                case (0):
                    $(this).find('input').val(obj.suppliesName);
                    break;
                // 规格型号
                case (1):
                    $(this).find('input').val(obj.specifications);
                    break;
                // 单位
                case (2):
                    if(obj.unitDataItem!=null){
                        $(this).find('select').val(obj.unitDataItem.dataDictionaryItemId);
                    }

                    break;
                // 库存量
                case (3):
                    $(this).find('input').val(obj.inventory);
                    break;
                // 需求数量
                case (4):
                    $(this).find('input').val(obj.demandQuantity);
                    break;
                //采购数量
                case (5):
                    $(this).find('input').val(obj.purchaseQuantity);
                    break;
                // 备注
                case (6):
                    $(this).find('input').val(obj.note);
                    break;

                //隐藏域
                case (7):
                    $(this).html(obj.id);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);


    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}

//确认修改
function confirmAdjust() {



    $('.myclass2').each(function () {
        var data={
            suppliesName:$(this).children('td').eq(0).find('input').val(),
            specifications:$(this).children('td').eq(1).find('input').val(),
            unitDataItem:{dataDictionaryItemId:$(this).children('td').eq(2).find('select').val()},
            inventory:$(this).children('td').eq(3).find('input').val(),
            purchaseQuantity:$(this).children('td').eq(4).find('input').val(),
            demandQuantity:$(this).children('td').eq(5).find('input').val(),
            id:$(this).children('td').eq(7).html(),
            note:$(this).children('td').eq(6).find('input').val(),
            receiptNumber:$("#receiptNumber").text(),
        }
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updateMaterial",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:JSON.stringify(data),
            contentType: 'application/json;charset=utf-8',
            success:function (result) {

            },
            error:function (result) {

            }
        })
        console.log(data)
    })
    alert("修改成功")
    // window.location.reload()
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'receiptNumber':    $('#receiptNumber').text()},
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setEmProcurementListModal1(result.data[0].materialList);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常!");
        }
    });
}

//克隆行方法编辑
function addNewLineAdjust(item) {
    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide()
    clonedTr.attr('class', 'myclass2');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";


    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn)


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}

//删除明细
function removeEmerProcumentOff(item) {
    if(confirm("确认删除该条明细?")){
        var id=$(item).parent().prev().html();
        $.ajax({
            type:'POST',
            url:"deleteMonthProcurementById",
            data:{"id":id},
            dataType: "json",
            async: false,
            // contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message)
                    $.ajax({
                        type: "POST",                       // 方法类型
                        url: "getProcurementListById",          // url
                        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
                        dataType: "json",
                        data:{'receiptNumber':    $('#receiptNumber').text()},
                        //contentType: 'application/json;charset=utf-8',
                        success:function (result) {
                            if (result != undefined && result.status == "success"){
                                console.log(result);
                                setEmProcurementListModal1(result.data[0].materialList);
                            }
                            else {
                                alert(result.message);
                            }
                        },
                        error:function (result) {
                            alert("服务器异常!");
                        }
                    });
                }
            }
            ,error:function (result) {

            }
        })
    }


}

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchRough();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchRough();      //
            }
        }, 600);
    });
});

function searchRough() {
    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);
    isSearch = true;
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
    console.log(array1)
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
    setPageCloneAfter(1);
    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        getEmergencyProcurementOffList();
    }




}

//高级查询
function searchEmOff() {

    $('#tbody1').find('.myclass').hide();
    array.length=0;//清空数组
    array1.length=0;//清空数组
    array=[].concat(array0);
    var date;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewestOffEm",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        //data:{'outboundOrderId':outboundOrderId},
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                date=getDateStr(result.dateList[0]);
                console.log(result);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！");
        }

    });

    isSearch=true;



    var text=$.trim($('#searchContent').val());

    var startTime=$("#search-inDate").val();
    var endTime=$('#search-endDate').val();
    var startDate=getDateByStr(startTime);
    var endDate=getDateByStr(endTime);
    data = {
        applyDepartment: $.trim($("#search-applyDepartment").val()),
        proposer: $.trim($("#search-proposer").val()),
        divisionHead: $.trim($("#search-divisionHead").val()),
        purchasingDirector: $.trim($("#search-purchasingDirector").val()),
        generalManager:$.trim($("#search-generalManager").val()),
        suppliesCategory:$.trim($("#search-suppliesCategory option:selected").text()),
        checkState:$("#search-checkState option:selected").text(),

    };
    console.log(data)
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(startDate.toString()=='Invalid Date'){
                startDate=getDateByStr(date);
                console.log(startDate)
            }
            if(endDate.toString()=='Invalid Date'){
                endDate=new Date();
                console.log(endDate)
            }



            if(!($(this).children('td').eq(2).text().indexOf(data.suppliesCategory)!=-1&&$(this).children('td').eq(4).text().indexOf(data.applyDepartment)!=-1
                &&$(this).children('td').eq(5).text().indexOf(data.proposer)!=-1&&$(this).children('td').eq(6).text().indexOf(data.divisionHead)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(7).text().indexOf(data.purchasingDirector)!=-1
                &&$(this).children('td').eq(8).text().indexOf(data.generalManager)!=-1&&$(this).children('td').eq(10).text().indexOf(data.checkState)!=-1
                &&(getDateByStr($(this).children('td').eq(9).text())<=endDate&&getDateByStr($(this).children('td').eq(9).text())>=startDate)
            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(2).text().indexOf(data.suppliesCategory)!=-1&&$(this).children('td').eq(4).text().indexOf(data.applyDepartment)!=-1
                &&$(this).children('td').eq(5).text().indexOf(data.proposer)!=-1&&$(this).children('td').eq(6).text().indexOf(data.divisionHead)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(7).text().indexOf(data.purchasingDirector)!=-1&&$(this).children('td').eq(10).text().indexOf(data.checkState)!=-1
                &&$(this).children('td').eq(8).text().indexOf(data.generalManager)!=-1
                &&(getDateByStr($(this).children('td').eq(9).text())<=endDate&&getDateByStr($(this).children('td').eq(9).text())>=startDate)
            )

            ){
                array1.push($(this));
            }
        });
    }
    console.log(array1)
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
    setPageCloneAfter(1);
    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }



}

//打印
function print() {
    //打印模态框
    $("#footer").hide();
    $("#appointModal2").printThis({
        // debug: false,             // 调试模式下打印文本的渲染状态
        // importCSS: false,       // 为打印文本引入外部样式link标签 ["<link rel='stylesheet' href='/static/jquery/forieprint.css' media='print'>","",""]
        // importStyle: false,      // 为打印把文本书写内部样式 ["<style>#ceshi{}</style>","",""]
        // printDelay: 333,      // 布局完打印页面之后与真正执行打印功能中间的间隔
        // copyTagClasses: true
    });
}



/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchEmOff();      //
    }
}

//附件下载
function downLoadFile(item) {
    var contractAppendicesUrl=$(item).parent().prev().html();
    if (contractAppendicesUrl != null && contractAppendicesUrl != "") {
        window.open('downloadFile?filePath=' + contractAppendicesUrl);
        window.location.reload()
    } else {
        alert("未上传文件");
        // window.location.reload()
    }
}