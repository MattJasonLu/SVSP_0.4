array=[]//用来存放循环出来的领料单信息
MaterialRequisitionList=[];
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
    if(confirm("确定领用?")){
        //点击确定后操作
        var items = $("input[name='select']:checked");//判断复选框是否选中
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
             wastes:{client:{companyName:companyName},
                     name:name,
                     wastesId:wastesId,
                     unit:unit,
                     remarks:remarks,
             },
               batchingOrder:{
                   batchingNumber:batchingNumber,
                   deputyGeneral:deputyGeneral,
                   warehouseManager:warehouseManager,
                   guardian:guardian,
                   materialManager:materialManager,
                   picker:picker
               },
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
//加载出库增加页面的领料单
function loadRequisitionList() {
    var array=new Array(localStorage['array']);
    //console.log(array[0]);
    if(array[0]!=undefined){
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
        //console.log(MaterialRequisitionList);
        setRequisitionList(MaterialRequisitionList);
    }
    else {
        alert("还未领料，请领料！");
        if(confirm("是否跳转至领料页面?")){
          window.location.href="materialRequisition.html";
        }
    }



    localStorage.removeItem('array');
}
//设置出库增加页面的领料单数据
function setRequisitionList(result) {
    var tr = $("#cloneTr");
    //console.log(result);
    //tr.siblings().remove();
    tr.attr('class','myclass');
    $.each(result, function (index, item) {
        console.log(item);
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
                        $(this).html(obj.wastes.name);
                        break;
                    // 危废代码
                    case (4):
                        $(this).html(obj.wastes.wastesId);
                        break;
                    // 危废类别
                    case (5):
                        $(this).html("");
                        break;
                    // 单位
                    case (6):
                        $(this).html(obj.wastes.unit);
                        break;
                    // 配料数量
                    case (7):
                        $(this).html(obj.batchingOrder.batchingNumber);
                        break;
                    //领用数量
                    case (8):
                        $(this).html(obj.batchingOrder.batchingNumber);
                        break;
                    //附注
                    case (9):
                        $(this).html(obj.wastes.remarks);
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