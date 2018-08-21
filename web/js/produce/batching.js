/**加载库存的数据
 * 
 */
function  batchingList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
         if(result != undefined && result.status == "success"){
             //console.log(result);
             //设置库存列表
             setWasteInventoryList(result.data);
         }
         else {
             console.log(result.message);
         }
        },
        error:function (result) {
        alert("服务器异常！")
        }

    });
}
/**设置库存列表数据
 *
 */
function setWasteInventoryList(result) {
    var tr = $("#cloneTr");
    //tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 入库编号
                case (1):
                    $(this).html(obj.inboundOrderId);
                    break;
                 // 仓库号
                case (2):
                    if(obj.wareHouse==null){
                        $(this).html("");
                    }
                    else {
                        $(this).html(obj.wareHouse.wareHouseId);
                    }
                    break;
                    //产废单位
                case (3):
                        $(this).html(obj.wastes.client.companyName);
                    break;
                // 危废名称
                case (4):
                        $(this).html(obj.wastes.name);
                    break;
                // 危废代码
                case (5):
                        $(this).html(obj.wastes.wastesId);
                    break;
                // 产废类别
                case (6):
                        $(this).html("");
                    break;
                // 处置类别
                case (7):
                     $(this).html(obj.wastes.processWay.name);
                    break;
                    //数量
                case (8):
                        $(this).html(obj.wastes.wasteAmount);
                    break;
                    case (9):
                    $(this).html(obj.wastes.remarks);
                    break;
                case (10):
                    $(this).html(obj.wasteInventoryId);
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
/*配料*/
function batching() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    items.each(function () {
        //获得库存Id
      var inboundOrderId=  $(this).parent().parent().next().html();
      //根据id获得库存的信息，进行转移放到配料中
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWasteInventoryByInboundOrderId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data:{'inboundOrderId':inboundOrderId},
            success:function (result) {
                if(result != undefined && result.status == "success"){
                   // console.log(result);
                    //设置配料列表
                    setBatchingWList(result.data);
                }
                else {
                    console.log(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！")
            }

        });
    });
}
/**设置配料列表数据
 *
 */
function setBatchingWList(result) {
    var tr = $("#cloneTr2");
    //tr.siblings().remove();
    console.log(result);
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj=eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 入库编号
                case (1):
                    if(obj.inboundOrderId){

                    }
                    $(this).html(obj.inboundOrderId);
                    break;
                // 仓库号
                case (2):
                    if(obj.wareHouse==null){
                        $(this).html("");
                    }
                    else {
                        $(this).html(obj.wareHouse.wareHouseId);
                    }
                    break;
                //产废单位
                case (3):
                    $(this).html(obj.wastes.client.companyName);
                    break;
                // 危废名称
                case (4):
                    $(this).html(obj.wastes.name);
                    break;
                // 危废代码
                case (5):
                    $(this).html(obj.wastes.wastesId);
                    break;
                // 产废类别
                case (6):
                    $(this).html("");
                    break;
                // 处置类别
                case (7):
                    $(this).html(obj.wastes.processWay.name);
                    break;
                //数量
                case (8):
                    $(this).html(obj.wastes.wasteAmount);
                    break;
                case (9):
                    $(this).html(obj.wastes.remarks);
                    break;
                case (10):
                    $(this).html(obj.wasteInventoryId);
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