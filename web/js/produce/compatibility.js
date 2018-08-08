/*********************
 * jackYang
 */

//导入数据
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var id = '0000';
        console.log("change");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentCompatibilityId",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: false,
            success: function (result) {
                if (result != undefined || result != NaN) {
                    id = result.compatibilityId;
                } else {
                    alert("数据获取失败！ " + result);
                }
            },
            error: function (result) {
                alert("导入失败，请检查后重试！")
                console.log("error" + result);
            }
        });
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("tableName", 't_pr_pw');
        formFile.append("id", id);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importCompatibilityExcel",              // url
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
 * 加载配伍周计划数据
 */
function getList1() {
    $.ajax({
        type:"POST",
        url:"getList1",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                var obj=result.compatibilityList;
                var n=result.length;
                //console.log(n);
                setCompatibility(obj,n);
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
/*加载表格数据
* 
*/
function setCompatibility(obj,n) {
    var tr = $("#cloneTr1");//克隆一行
    //tr.siblings().remove();
    //每日配比量合计
    dailyProportionsTotal=0;
    //每周需求总量
    weeklyDemandTotal=0;
    //热值总量
    calorificTotal=0;
    $.each(obj,function (index,item) {
        var data=eval(item);
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    var num=parseInt(data.pwId)
                    $(this).html(num);
                    break;
                //处理类别
                case (1):
                    // $(this).html();
                    //判断是否是物流合同
                    if (data.handleCategory!=null) {
                        $(this).html(data.handleCategory.name);
                    }
                    else {
                        $(this).html("");
                    }
                    break;
                // 形态
                case (2):
                    if (data.formType != null)
                        $(this).html(data.formType.name);
                    else {
                        $(this).html("");
                    }
                    break;
                  //比例
                case (3):
                    //num = num.toFixed(2); // 输出结果为 2.45
                    $(this).html(data.proportion.toFixed(1));
                    break;
                // 每日配比量
                case (4):
                    $(this).html(data.dailyProportions);
                    dailyProportionsTotal+=data.dailyProportions;
                    break;
                //周需求总量
                case (5):
                    $(this).html(data.weeklyDemand);
                    weeklyDemandTotal+=data.weeklyDemand;
                    break;
                // 热值
                case (6):
                        $(this).html(data.calorific);
                    calorificTotal+=data.calorific;
                    break;
                   // 灰分
                case (7):
                        $(this).html(data.ash);
                    break;
                    //水分
                case (8):
                    $(this).html(data.water);
                    break;
                //CL
                case (9):
                    $(this).html(data.CL);
                    break;
                //S
                case (10):
                    $(this).html(data.s);
                    break;
                //P
                case (11):
                    $(this).html(data.p);
                    break;
                //F
                case (12):
                    $(this).html(data.f);
                    break;
                //PH
                case (13):
                    $(this).html(data.PH);
                    break;
                //状态
                case (14):
                    if (data.checkState != null) {
                        $(this).html(data.checkState.name);
                    }
                    else {
                        $(this).html("");
                    }
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    console.log(dailyProportionsTotal);
    //赋值每日配比量合计
    $("#dailyProportionsTotal").text(dailyProportionsTotal);
    //赋值每日配比量合计
    $("#weeklyDemandTotal").text(weeklyDemandTotal);
    //计算热值平均
    $("#calorific").text((calorificTotal/n).toFixed(1));
}
/*
* 每日配比量之和*/
function ProportionsTotal(dailyProportions) {
    var dailyProportionsTotal=dailyProportionsTotal+dailyProportions;
    return dailyProportionsTotal
}