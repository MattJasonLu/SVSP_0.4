/**
 * 危废入场分析日报
 * */
//加载危废入场分析日报数据列表
function loadWasteIntoList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWasteIntoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setWasteIntoList(result);
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
//设置危废入场分析日报数据
function setWasteIntoList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data,function (index,item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index+1);
                    break;
                // 收样日期
                case (1):
                    $(this).html(getDateStr(obj.laboratoryTest.samplingDate));
                    break;
                // 联单号码
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                // 产废单位
                case (3):
                        $(this).html(obj.client.companyName);
                    break;
                // 废物名称
                case (4):
                        $(this).html(obj.laboratoryTest.wastesName);
                    break;
                // 废物类别
                case (5):
                        $(this).html(obj.wastesCategory);
                    break;
                // 废物形态
                case (6):
                   $(this).html(obj.handleCategory.name);
                    break;
                    //PH
                case (7):
                        $(this).html(obj.laboratoryTest.phAverage);
                    break;
                    //热值
                case (8):
                    $(this).html(obj.laboratoryTest.heatAverage);
                    break;
                    //水分
                case (9):
                    $(this).html(obj.laboratoryTest.waterContentAverage);
                    break;
                    //灰分
                case (10):
                    $(this).html(obj.laboratoryTest.ashAverage);
                    break;
                    //氟含量
                case (11):
                    $(this).html(obj.laboratoryTest.fluorineContentAverage);
                    break;
                    //氯含量
                case (12):
                    $(this).html(obj.laboratoryTest.chlorineContentAverage);
                    break;
                    //硫含量
                case (13):
                    $(this).html(obj.laboratoryTest.sulfurContentAverage);
                    break;
                    //磷含量
                case (14):
                    $(this).html(obj.laboratoryTest.phosphorusContentAverage);
                    break;
                    //闪点
                case (15):
                    $(this).html(obj.laboratoryTest.flashPointAverage);
                    break;
                    //粘度
                case (16):
                    $(this).html(obj.laboratoryTest.viscosityAverage);
                    break;
                    //熔融温度
                case (17):
                    $(this).html(obj.laboratoryTest.meltingPointAverage);
                    break;
                    //备注
                case (18):
                    $(this).html(obj.remarks);
                    break;
            }
        })
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    tr.hide();
}