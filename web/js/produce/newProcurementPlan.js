/**
 * 采购计划单新增脚本文件
 * */

//加载月度采购申请表数据列表
function getProcurement() {
    var page={}
    $('#tbody1'). find("input[name='select']").prop('checked', true);

    //获取采购计划单号
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getNewestProcurementPlanId",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            console.log(result)
            $('#procurementPlanId').val(result)
        },
        error:function (result) {

        }
    })

  //获取等路人信息
   var data= getCurrentUserData();
    if(data!=null){
        $('#createName').val(data.username)
    }

    $('#createDate').val(dateToString(new Date()))

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getProcurement",
        data:JSON.stringify(page),
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                 console.log(result)
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
                    // 序号
                    case (1):
                        $(this).html(index+1);
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
                        if(obj.unit){
                            $(this).html(obj.unit.name);
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
                    //存放采购主键
                    case (9):
                        $(this).html((obj.receiptNumber));
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
    var createDateStart=$('#search-inDate').val();
    var createDateEnd=$('#search-endDate').val();
    var data={
        createDateStart:createDateStart,
        createDateEnd:createDateEnd
    }
    console.log(data)
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchNewProcurementPlan",
        data:JSON.stringify(data),
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                setPageClone(result);

            }
        },
        error:function (result) {
            
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

                    $('.myclass').each(function () {
                        var dataItem={
                            wareHouseName:$('#procurementPlanId').val(),
                            receiptNumber:$(this).children('td').eq(9).html(),
                            suppliesName:$(this).children('td').eq(2).html(),
                            specifications:$(this).children('td').eq(3).html(),
                            unit:getFormTypeByFromStr($(this).children('td').eq(4).html()),
                            demandQuantity:$(this).children('td').eq(6).html(),
                            note:$(this).children('td').eq(7).html(),
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