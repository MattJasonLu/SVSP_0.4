var array=[]//用来存放循环出来的领料单信息
//加载领料单列表
function LoadMaterialRequisitionOrder() {
    //1通过ajax获取领料单数据
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getMaterialRequisitionList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //设置领料单新增列表
                //赋值配料单
                //1重新做一个方法用来生成领料单号
                setMaterialRequisitionList(result.jsonArray);
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
//
//设置领料单列表
function setMaterialRequisitionList(result) {
    var tr = $("#cloneTr4");
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
                        if(obj.batchingOrder.wasteInventory.wastes.client!=null){
                            $(this).html(obj.batchingOrder.wasteInventory.wastes.client.companyName);
                        }
                        break;
                    // 危废名称
                    case (4):
                        $(this).html(obj.batchingOrder.wasteInventory.wastes.name);
                        break;
                    // 危废代码
                    case (5):
                        $(this).html(obj.batchingOrder.wasteInventory.wastes.wastesId);
                        break;
                    // 危废类别
                    case (6):
                        $(this).html("");
                        break;
                    // 单位
                    case (7):
                        $(this).html(obj.batchingOrder.wasteInventory.wastes.unit);
                        break;
                    //配料数量
                    case (8):
                        $(this).html(obj.batchingOrder.batchingNumber);
                        break;
                    //领用数量
                    case (9):
                        $(this).html(obj.batchingOrder.batchingNumber);
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
    items.each(function () {
       //1获得领料单的编号
        var materialRequisitionId=$(this).parent().parent().next().next().html();
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getByMaterialRequisitionId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {"materialRequisitionId":materialRequisitionId},
            dataType: "json",
            //contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    array.push(result.materialRequisitionOrder);
                    //console.log(result);
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
    console.log(array);
}