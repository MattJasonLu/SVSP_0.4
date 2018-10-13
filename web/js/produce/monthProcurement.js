
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array=[];//存放所有的tr
array1=[];//存放目标的tr

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
            url: "totalMouthProcumentRecord",                  // url
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
    setMonthProcurementList(result);
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
    if (!isSearch) { //分页用的
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getProcurementList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setMonthProcurementList(result);
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
        addPageClass(pageNumber);
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getProcurementList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setMonthProcurementList(result);
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


function reset() {
    window.location.reload();
}



//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}
//克隆行方法
function addNewLine() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
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
}
//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
    var i=0
    //2018/10/11更新 请勿修改！
 $('.myclass').each(function (index,item) {

     $(this).children('td').eq(0).html("<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;"+(parseInt(index)+1).toString());

 })

}
//保存月季采购方法
function saveMonth() {
    //思路先添加
    //1获取除物料需求外的数据
    //在添加物料表
    data={
        suppliesCategory:$('#suppliesCategory').val(),
        applyMouth:$('#applyMonth option:selected').text()+"月份",
        demandTime:($('#demandTime').val()).toString(),
        applyDepartment:$('#applyDepartment').val(),
        proposer:$('#proposer').val(),
        divisionHead:$('#divisionHead').val(),
        purchasingDirector:$('#purchasingDirector').val(),
        purchasingHead:$('#purchasingHead').val(),
        generalManager:$('#generalManager').val(),
        procurementCategory:1//代表是月季采购
    }
    console.log(data)
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
            }
            else {

                alert(result.message);
            }
        },error:function (result) {
         alert("服务器异常！")
        }
    });
    $('.myclass').each(function () {
   var suppliesName=$(this).children('td').eq(1).children('div').find('button').attr('title');
   var specifications=$(this).children('td').eq(2).children('input').val();
   var unit=$(this).children('td').eq(3).children('select').get(0).selectedIndex;
   var inventory=$(this).children('td').eq(4).children('input').val();
   var demandQuantity=$(this).children('td').eq(5).children('input').val();
   var note=$(this).children('td').eq(6).children('input').val();
   var materialdata={
        suppliesName:suppliesName,
        specifications:specifications,
        unit:unit,
        inventory:inventory,
        demandQuantity:demandQuantity,
        note:note,
    }
    console.log(materialdata);
        $('.selectpicker').selectpicker('refresh');
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
    if(confirm("是否跳转到主页？")){
    window.location.href="monthProcurement.html";
    }
}
//加载月度采购申请表数据列表
function getMontnProcurement() {
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurementList",
        data: JSON.stringify(page),// url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
               // console.log(result)
                //设置月度采购申请表数据
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
    isSearch = false;
}
//设置月度采购申请表数据
function setMonthProcurementList(result) {
    //$('.myclass').hide();
    var tr = $("#cloneTr");
    tr.siblings().remove();
    console.log(result.data);
    tr.attr('class','myclass');
        $.each(result.data, function (index, item) {
            //console.log(item);
            // 克隆tr，每次遍历都可以产生新的tr
            if(item.procurementCategory==true) {
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
                        // 申请月份
                        case (2):
                            $(this).html(obj.applyMouth);
                            break;
                        // 需求时间
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
                        // 申购部门分管领导
                        case (6):
                            $(this).html(obj.divisionHead);
                            break;
                        // 采购部门负责人
                        case (7):
                            $(this).html(obj.purchasingDirector);
                            break;
                        //采购部门分管领导
                        case (8):
                            $(this).html(obj.purchasingHead);
                            break;
                        //总经理
                        case (9):
                            $(this).html(obj.generalManager);
                            break;
                        //状态
                        case (10):
                            if(obj.state!=null){
                                $(this).html(obj.state.name);
                            }
                            break;
                            //创建日期
                        case (11):
                            if(obj.createDate!=null){
                                $(this).html(getDateStr(obj.createDate));
                            }
                            break;
                    }
                });
                // 把克隆好的tr追加到原来的tr前面
                // clonedTr.removeAttr("class");
               clonedTr.removeAttr('id');
                clonedTr.insertBefore(tr);
            }

        });


    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}
//审批
function approval(item) {
    if(confirm("确定审批?")) {
        //点击确定后操作
        var receiptNumber = $(item).parent().parent().children('td').eq(0).text();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProcurementListSubmit",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'receiptNumber': receiptNumber},
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

}
//提交
function submit(item) {
    if(confirm("确定提交?")) {
        //点击确定后操作
        var receiptNumber = $(item).parent().parent().children('td').eq(0).text();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProcurementListSubmit",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'receiptNumber': receiptNumber},
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
    }
//作废
function cancel(item) {
    if(confirm("确定作废?")){
        //点击确定后操作
        var receiptNumber=$(item).parent().parent().children('td').eq(0).text();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "setProcurementListCancel",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{'receiptNumber':receiptNumber},
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message);
                    window.location.reload();
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
//查询
function view1(item) {
    var receiptNumber=$(item).parent().parent().children('td').eq(1).text();
    //console.log(receiptNumber);
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
                setMonthProcurementListModal(result.data[0].materialList);
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
//双击查询
function view(item) {
    var receiptNumber=$(item).children().get(1).innerHTML;
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
                setMonthProcurementListModal(result.data[0].materialList);
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
//设置月度采购申请表数据模态框数据
function setMonthProcurementListModal(result) {
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
                        if(obj.unit!=null){
                            $(this).html(obj.unit.name);
                        }
                        break;
                    // 库存量
                    case (3):
                        $(this).html(obj.inventory);
                        break;
                    // 需求数量
                    case (4):
                        $(this).html(obj.demandQuantity);
                        break;
                    // 备注
                    case (5):
                        $(this).html(obj.note);
                        break;
                    // 采购部门负责人
                }
            });
            // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr('id');
            clonedTr.insertBefore(tr);


    });
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');
}
//高级查询
function searchProcurement() {
    isSearch=false;
    array.length=0;//清空数组
    array1.length=0;//清空数组
    //1分页模糊查询
    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    var date;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewestMouth",                  // url
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
    var startTime=$.trim($("#search-inDate").val());
    var endTime=$.trim($("#search-endDate").val());
    var startDate=getDateByStr(startTime);
    var endDate=getDateByStr(endTime);

    var text=$.trim($('#searchContent').val());
        data = {
            //receiptNumber: $.trim($("#search-receiptNumber").val()),
            applyMouth: $.trim($("#search-applyMouth").val()),
            //demandTime: $.trim($("#search-demandTime").val()),
            applyDepartment: $.trim($("#search-applyDepartment").val()),
            proposer: $.trim($("#search-proposer").val()),
            divisionHead: $.trim($("#search-divisionHead").val()),
            purchasingDirector: $.trim($("#search-purchasingDirector").val()),
            purchasingHead:$.trim($("#search-purchasingHead").val()),
            generalManager:$.trim($("#search-generalManager").val()),
        };


    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(startDate.toString()=='Invalid Date'){
                startDate=getDateByStr(date);
            }
            if(endDate.toString()=='Invalid Date'){
                endDate=new Date();
            }
            if(!($(this).children('td').eq(2).text().indexOf(data.applyMouth)!=-1&&$(this).children('td').eq(4).text().indexOf(data.applyDepartment)!=-1
                &&$(this).children('td').eq(5).text().indexOf(data.proposer)!=-1&&$(this).children('td').eq(6).text().indexOf(data.divisionHead)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(7).text().indexOf(data.purchasingDirector)!=-1 &&$(this).children('td').eq(8).text().indexOf(data.purchasingHead)!=-1
                &&$(this).children('td').eq(9).text().indexOf(data.generalManager)!=-1
                &&(getDateByStr($(this).children('td').eq(11).text())<=endDate&&getDateByStr($(this).children('td').eq(11).text())>=startDate)

            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(2).text().indexOf(data.applyMouth)!=-1&&$(this).children('td').eq(4).text().indexOf(data.applyDepartment)!=-1
                &&$(this).children('td').eq(5).text().indexOf(data.proposer)!=-1&&$(this).children('td').eq(6).text().indexOf(data.divisionHead)!=-1&&$(this).children('td').text().indexOf(text)!=-1
                &&$(this).children('td').eq(7).text().indexOf(data.purchasingDirector)!=-1 &&$(this).children('td').eq(8).text().indexOf(data.purchasingHead)!=-1
                &&$(this).children('td').eq(9).text().indexOf(data.generalManager)!=-1
                &&(getDateByStr($(this).children('td').eq(11).text())<=endDate&&getDateByStr($(this).children('td').eq(11).text())>=startDate)
            )){
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
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }


}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchProcurement();      //
    }
}
//加载辅料列表
function getIngredientsList() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getIngredientsList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        // data:{'receiptNumber':receiptNumber},
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
               var suppliesName=$('#suppliesName');
               suppliesName.children().remove();
               $.each(result.stringList,function (index,item) {
                   var option = $('<option />');
                   option.val(item);
                   option.text(item);
                   suppliesName.append(option);
                   $('.selectpicker').selectpicker('refresh');
               });


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
        url:"getUnitList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                // console.log(result);
                var unit=$('#unit');
                unit.children().remove();
                $.each(result.unitList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
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


    //单位
    $.ajax({
        type:'POST',
        url:"getUnitList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                // console.log(result);
                var unit=$('#unit');
                unit.children().remove();
                $.each(result.unitList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
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
    var data=getCurrentUserData();
}


//粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchWastesAnalysis();
            }
            else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchWastesAnalysis();      //
            }
        },600);
    });
});

//粗查询
function searchWastesAnalysis() {
    isSearch=false;

    //getMontnProcurement();


    //1分页模糊查询
    array.length=0;//清空数组
    array1.length=0;
    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
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
    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
       $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        getMontnProcurement();
    }

}


/**
 *
 * 导出
 * @returns {string}
 */
function exportExcel() {
    console.log("export");
    var name = 't_pl_procurement';
    var sqlWords = "select t_pl_procurement.*,t_pl_material.* from t_pl_procurement left join t_pl_material on t_pl_procurement.receiptNumber=t_pl_material.receiptNumber and t_pl_procurement.procurementCategory!='0';";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}
/**
 *
 * 导入
 * @returns {string}
 */

function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/*导入月季采购需求*/
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importMonthProcurementExcel",              // url
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
 * 下载模板
 * */

function downloadModal() {
    var filePath = 'Files/Templates/2018年月度采购申请单03.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}