/**
 * Created by matt on 2018/8/21.
 */

/**
 * 通过业务员的信息读取对应的合同列表
 */
function loadPageList() {
    // 获取当地存储中的业务员编号
    // 根据业务员编号获取对应的合同列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getContractBySalesman",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            salesmanId: localStorage.salesmanId
            // page: page
        },
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status == "success") {
                // 设置下拉列表
                console.log(result);
                setDataList(result);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    // isSearch = false;
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#contractClonedTr");
    var wastesTr = $("#wastesClonedTr");
    tr.siblings().not("#wastesClonedTr").remove();
    $.each(result.data, function (index, item) {
        var wastesClonedTrArray = [];
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            if (result.map[obj.clientId].length > 0) {
                $(this).prop('rowspan', result.map[obj.clientId].length + 1);
            }
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    $(this).html(index+1);
                    if (result.map[obj.clientId].length > 0) {
                        console.log(result.map[obj.clientId]);
                        $.each(result.map[obj.clientId], function (itemIndex, inner_item) {
                            var wastesClonedTr = wastesTr.clone();
                            wastesClonedTr.show();
                            wastesClonedTr.children("td").each(function (_index) {
                                var itemObj = eval(inner_item);
                                // 根据索引为部分td赋值
                                switch (_index) {
                                    case (0):
                                        $(this).html(itemObj.name);
                                        break;
                                    case (1):
                                        if (itemObj.formType != null)
                                            $(this).html(itemObj.formType.name);
                                        break;
                                    case (2):
                                        $(this).html(itemObj.wastesId);
                                        break;
                                    case (3):
                                        $(this).html(itemObj.contractAmount);
                                        break;
                                    case (4):
                                        $(this).html(itemObj.wasteAmount);
                                        break;
                                    case (5):
                                        $(this).html(itemObj.unitPriceTax);
                                        break;
                                    case (6):
                                        $(this).html(itemObj.unitPriceTax);
                                        break;
                                    case (7):
                                        $(this).html(itemObj.wasteAmount * itemObj.unitPriceTax);
                                        break;
                                }
                            });
                            // 把克隆好的tr追加到原来的tr前面
                            wastesClonedTr.removeAttr("id");
                            wastesClonedTrArray.push(wastesClonedTr);
                        });
                    }
                    break;
                case (1):
                    $(this).html(obj.company1);
                    break;
                case (2):
                    $(this).html(obj.city);
                    break;
                case (3):
                    $(this).html(getDateStr(obj.beginTime));
                    break;
                case (4):
                    $(this).html(obj.order1);
                    break;
                case (5):
                    $(this).html(result.contactInfo[obj.clientId]);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        if (wastesClonedTrArray.length > 0) {
            for (var i = 0; i < wastesClonedTrArray.length; i++) {
                wastesClonedTrArray[i].insertAfter(clonedTr);
            }
        }
    });
    // 隐藏无数据的tr
    tr.hide();
    wastesTr.hide();
}



