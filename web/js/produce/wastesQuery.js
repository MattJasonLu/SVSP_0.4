/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

/**
 * 
 *加载危废数据
 */
function loadWasteInventoryList() {
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "getOutBoundOrderList",                  // url
    //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     dataType: "json",
    //     success:function (result) {
    //         if (result != undefined && result.status == "success"){
    //             console.log(result);
    //         }
    //         else {
    //             alert(result.message);
    //
    //         }
    //     },
    //     error:function (result) {
    //   alert("服务器异常！")
    //     }
    // });
    //查询危废仓库信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteInventoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
            if(result != undefined && result.status == "success"){
                console.log(result);
                //设置危废查询列表
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
//设置危废查询列表
function setWasteInventoryList(result) {
    var tr=$('#cloneTr');
    tr.siblings().remove();
    tr.attr('class','myclass')
    $.each(result,function (index,item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 入库单号
                case (1):
                    $(this).html(obj.inboundOrderId);
                    break;
                // 入库日期
                case (2):
                    $(this).html(getDateStr(obj.inboundDate));
                    break;
                //产废单位
                case (3):
                    $(this).html(obj.produceCompany.companyName);
                    break;
                // 仓库名称
                case (4):
                    $(this).html("");
                    break;
                // 入库类别
                case (5):
                    $(this).html("正常出库");
                    break;
                // 进料方式
                case (6):
                    $(this).html(obj.handleCategory.name);
                    break;
                // 危废名称
                case (7):
                    $(this).html(obj.laboratoryTest.wastesName);
                    break;
                //危废类型
                case (8):
                    $(this).html(obj.wastesCategory);
                    break;
                //数量
                case (9):
                    $(this).html(obj.actualCount);
                    break;
                    //单价
                case (10):
                    $(this).html(obj.quotationItem.unitPriceTax);
                    break;
                    //总价
                case (11):
                    $(this).html(parseInt(obj.actualCount)*(obj.quotationItem.unitPriceTax).toFixed(2)  );
                    break;
                    //创建时间
                case (12):
                    $(this).html(getDateStr(obj.creatorDate));
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    })
    tr.hide();
    tr.removeAttr('class');
}