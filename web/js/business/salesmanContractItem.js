/**
 * Created by matt on 2018/8/21.
 */


function loadSalesmanAllContract() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getAllContractBySalesmanId",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            salesmanId: localStorage.salesmanId
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != null) {
                setContractList(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}

var serialNumber = 0;   // 序号
function setContractList(result) {
    serialNumber = 0;
    // 获取id为clone2的tr元素
    var tr = $("#clone2");
    tr.siblings().remove();
    $.each(result.contractInfo, function (index, item) {
        for (var i = 0; i < result.contractInfo[index].quotationItemList.length; i++) {
            // 克隆tr，每次遍历都可以产生新的tr
            var clonedTr = tr.clone();
            serialNumber++;
            clonedTr.show();
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                // 根据索引为部分td赋值
                switch (inner_index) {
                    case (0):
                        // 序号
                        $(this).html(serialNumber);
                        break;
                    case (1):
                        // 单位名称
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].companyName);
                        break;
                    case (2):
                        // 所属区域
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].area);
                        break;
                    case (3):
                        // 签订日期
                        if (result.contractInfo[index] != null)
                            $(this).html(getDateStr(result.contractInfo[index].beginTime));
                        break;
                    case (4):
                        // 预处理费
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].order1);
                        break;
                    case (5):
                        // 联系人/联系电话
                        if (result.contactInfo[index] != null)
                            $(this).html(result.contactInfo[index]);
                        break;
                    case (6):
                        // 危废名称
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].quotationItemList[i].wastesName);
                        break;
                    case (7):
                        // 状态
                        if (result.contractInfo[index] != null && result.contractInfo[index].checkState != null)
                            $(this).html(result.contractInfo[index].checkState.name);
                        break;
                    case (8):
                        // 危废代码
                        if (result.contractInfo[index] != null)
                            $(this).html(result.contractInfo[index].quotationItemList[i].wastesCode);
                        break;
                    case (9):
                        // 合约量(t)
                        if (result.contractInfo[index] != null){
                            var contractAmount = result.contractInfo[index].quotationItemList[i].contractAmount;
                            $(this).html(contractAmount);
                        }
                        break;
                    case (10):
                        // 单价
                        if (result.contractInfo[index] != null){
                            var unitPriceTax = result.contractInfo[index].quotationItemList[i].unitPriceTax;
                            $(this).html(unitPriceTax);
                        }
                        break;
                    case (11):
                        // 总价
                        if (result.contractInfo[index] != null)
                            $(this).html(parseFloat(contractAmount) * parseFloat(unitPriceTax));
                        break;
                    case (12):
                        // PH
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].phAverage);
                        break;
                    case (13):
                        // 灰分
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].ashAverage);
                        break;
                    case (14):
                        // 水分
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].waterContentAverage);
                        break;
                    case (15):
                        // 热值
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].heatAverage);
                        break;
                    case (16):
                        // 氯
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].chlorineContentAverage);
                        break;
                    case (17):
                        // 硫
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].sulfurContentAverage);
                        break;
                    case (18):
                        // 闪点
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].flashPointAverage);
                        break;
                    case (19):
                        // 粘度
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].viscosityAverage);
                        break;
                    case (20):
                        // 熔点
                        if (result.laboratoryTestInfo[index] != null && result.laboratoryTestInfo[index][i] !=null)
                            $(this).html(result.laboratoryTestInfo[index][i].meltingPointAverage);
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
}



