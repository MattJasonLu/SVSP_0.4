
//点击确认进行出库操作
function outBound() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    //获得领料单号
    items.each(function (index) {
        var materialRequisitionId = $(this).parent().parent().next().html();
        //1根据领料单号获取数据
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getByMaterialRequisitionId",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {'materialRequisitionId':materialRequisitionId},
            dataType: "json",
            //contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //设置出库列表
                    if(result.materialRequisitionOrder!=undefined){
                        setOutboutList(result.materialRequisitionOrder,index);
                    }

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


}
//设置出库列表
function setOutboutList(result,index) {
    id="";
    var tr = $("#cloneTr2");
    //tr.siblings().remove();
    tr.attr('class','myclass2');
        // 克隆tr，每次遍历都可以产生新的tr
        if(result.checkState.name=='待出库'){
            var clonedTr = tr.clone();
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                //1生成领料单号
                var obj=eval(result);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 序号
                    case (0):
                        $(this).html(index+1);
                        break;
                    // 产废单位
                    case (1):
                        if(obj.wastes.client!=null){
                            $(this).html(obj.wastes.client.companyName);
                        }
                        break;
                    // 危废名称
                    case (2):
                        $(this).html(obj.wastes.name);
                        break;
                    // 危废代码
                    case (3):
                        $(this).html(obj.wastes.wastesId);
                        break;
                    // 出库数量
                    case (4):
                        $(this).html(obj.batchingOrder.batchingNumber);
                        break;
                    // 单价
                    case (5):
                        $(this).html(0);
                        break;
                    // 金额
                    case (6):
                        $(this).html(0);
                        break;
                    //处置方式
                    case (7):
                        $(this).html(obj.wastes.processWay.name);
                        break;
                    //备注
                    case (8):
                        $(this).html(obj.wastes.remarks);
                        break;
                    //库区
                    case (9):
                        $(this).html(obj.wareHouse.wareHouseName);
                        break;
                    //领料单号
                    case (10):
                        $(this).html(obj.materialRequisitionId);
                        break;
                    //
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    // 隐藏无数据的tr
    tr.hide();
    tr.removeAttr('class');


}
//保存添加至库存
function saveOutBound(){
//获得输入的数据
    $('.myclass2').each(function (index) {
        //1出库日期
        var outboundDate=$("#outBoundDate").val();
        //2出库类别
        var outboundType=$("#outboundType").val();
        //3制单人
        var  creator=$('#creator').val();
        //4审核人
        var auditor=$('#auditor').val();
        //5领料单号
        var materialRequisitionId=$(this).children().get(10).innerHTML;
        data={
            outboundDate:outboundDate,
            creator:creator,
            auditor:auditor,
            materialRequisitionOrder:{materialRequisitionId:materialRequisitionId}
        }
        addOutBoundOrder(data);
    });




}
//添加出库单
function addOutBoundOrder(data) {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addOutBoundOrder",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
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