/*********************
 * jackYang
 */
var isSearch = false;
//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}
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
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/配伍周导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 
 * 导出
 * @returns {string}
 */
  function exportExcel() {
    console.log("export");
    var name = 't_pr_pw';
    var sqlWords = "select * from t_pr_pw;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var days = new Date();
    days.setFullYear(year);
    days.setMonth(month);
    days.setDate(1);
    if(obj.getDay() <= days.getDay()){
        var week = parseInt(day / 7) + a + 1;
    }else {
        week = parseInt(day / 7) + a;
    }
    return year + "年" + month + "月第" + week + "周";

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
            if (result !== undefined && result.status === "success"){
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
    // 设置高级检索的下拉框数据
    setPwList();
    isSearch = false;
   $("#week").text(getWeekDate());
}
/*加载表格数据
* 
*/
function setCompatibility(obj,n) {
    arrayId=[];
    var tr = $("#cloneTr1");//克隆一行
    //tr.siblings().remove();
    //每日配比量合计
    tr.siblings().remove();
    dailyProportionsTotal=0;
    //每周需求总量
    weeklyDemandTotal=0;
    //热值总量
    calorificTotal=0;
    //灰分总量
    ashTotal=0;
    //水分总量
    waterTotal=0;
    //氯总量
    clTotal=0;
    //硫总量
    sTotal=0;
    //磷总量
    pTotal=0;
    //弗总量
    fTotal=0;
    //PH总量
    phTotal=0;
    $.each(obj,function (index,item) {
        var data=eval(item);
        var clonedTr = tr.clone();
        clonedTr.attr('class','myclass')
        var wastes=eval(item.wastesList);
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
                    //$(this).html(data.proportion.toFixed(1));
                    $(this).html(((data.dailyProportions/data.weeklyDemand)*100).toFixed(1));
                    break;
                // 每日配比量
                case (4):
                    $(this).html(data.dailyProportions.toFixed(1));
                    dailyProportionsTotal+=data.dailyProportions;
                    break;
                //周需求总量
                case (5):
                    $(this).html(data.weeklyDemand.toFixed(1));
                    weeklyDemandTotal+=data.weeklyDemand;
                    break;
                // 热值
                case (6):
                        $(this).html(data.wastesList[index].calorific.toFixed(1));
                    calorificTotal+=data.wastesList[index].calorific;
                    break;
                   // 灰分
                case (7):
                        $(this).html(data.wastesList[index].ashPercentage.toFixed(1));
                        ashTotal+=data.wastesList[index].ashPercentage;
                    break;
                    //水分
                case (8):
                    $(this).html(data.wastesList[index].wetPercentage.toFixed(1));
                    waterTotal+=data.wastesList[index].wetPercentage;
                    break;
                //CL
                case (9):
                    $(this).html(data.wastesList[index].chlorinePercentage.toFixed(1));
                    clTotal+=data.wastesList[index].chlorinePercentage;
                    break;
                //S
                case (10):
                    $(this).html(data.wastesList[index].sulfurPercentage.toFixed(1));
                    sTotal+=data.wastesList[index].sulfurPercentage;
                    break;
                //P
                case (11):
                    $(this).html(data.wastesList[index].phosphorusPercentage.toFixed(1));
                    pTotal+=data.wastesList[index].phosphorusPercentage;
                    break;
                //F
                case (12):
                    $(this).html(data.wastesList[index].fluorinePercentage.toFixed(1));
                    fTotal+=data.wastesList[index].fluorinePercentage;
                    break;
                //PH
                case (13):
                    $(this).html(data.wastesList[index].ph.toFixed(1));
                    phTotal+=data.wastesList[index].ph;
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
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    console.log(dailyProportionsTotal);
    //赋值每日配比量合计
    $("#dailyProportionsTotal").text(dailyProportionsTotal.toFixed(1));
    //赋值周需求总量合计
    $("#weeklyDemandTotal").text(weeklyDemandTotal.toFixed(1));
    //计算热值平均
    $("#calorific").text((calorificTotal/n).toFixed(1));
    //灰分平均
    $('#ash1').text((ashTotal/n).toFixed(1));
    //水分平均
    $('#water1').text((waterTotal/n).toFixed(1));
    //氯平均
    $('#Cl1').text((clTotal/n).toFixed(1));
    //硫平均
    $('#S1').text((sTotal/n).toFixed(1));
    //磷平均
    $('#P1').text((pTotal/n).toFixed(1));
    //弗平均
    $('#F1').text((fTotal/n).toFixed(1));
    //PH平均
    $('#PH1').text((phTotal/n).toFixed(1));
}
/*
* 每日配比量之和*/
function ProportionsTotal(dailyProportions) {
    var dailyProportionsTotal=dailyProportionsTotal+dailyProportions;
    return dailyProportionsTotal
}
/*
* 操作行选定*/
 function selected1(item){
     //1获得表单编号
       var pwId=item.firstElementChild.innerHTML;
           if($(item).css('background-color')=='rgb(127, 255, 212)'){
               $(item).css('background-color',"");
               //删除所选Id
               arrayId.pop(pwId);
           }
        else
           {
               if(arrayId.length==0){
                   arrayId.push(pwId);
               }
              if(arrayId.length==1) {
                  $(item).css("background",'Aquamarine').siblings().css("background","");
                  arrayId.length=0;
                  arrayId.push(pwId);
               }
         }

 }
 //审批
function approval3() {
   //1获得所选编号的数组进行遍历
      var pwId1=arrayId[0];
      if(arrayId.length==1){
           pwId= getFour(pwId1);
           //console.log(pwId);
          //approvalPw(pwId);
          //弹出一个模态框
          $.ajax({
              type: "POST",                       // 方法类型
              url: "getByPwId2",         // url
              // 同步：意思是当有返回值以后才会进行后面的js程序
              data: {"pwId":pwId.toString()},
              dataType: "json",
              //contentType: 'application/json;charset=utf-8',
              success:function (result) {
                  if (result != undefined && result.status == "success"){
                      console.log(result);
                      var obj=result.data;
                      console.log(obj);
                      //开始赋值
                      //配伍编号
                      $("#compatibilityId").text(obj.compatibilityId);
                      //处理类别
                      if(obj.handleCategory!=null){
                          $("#handleCategory").text(obj.handleCategory.name);
                      }
                      else {
                          $("#compatibilityId").text("");
                      }
                      //形态
                      if(obj.formType!=null){
                          $("#formType").text(obj.formType.name);
                      }
                      else {
                          ("#formType").text("");
                      }
                      //每日配比量
                      $("#dailyProportions").text(obj.dailyProportions);
                      //周需求总量
                      $("#weeklyDemand").text(obj.weeklyDemand);
                      //热值
                      $("#calorific1").text(obj.calorific);
                      //状态
                      if(obj.checkState!=null){
                          $("#checkState").text(obj.checkState.name);
                      }
                      else {
                          $("#checkState").text("");
                      }
                      //序号
                      $("#pwId").text(obj.pwId);
                      //灰分
                      $("#ash").text(obj.ash);
                      //水分
                      $("#water").text(obj.water);
                      //氯
                      $("#CL").text(obj.CL);
                      //硫
                      $("#S").text(obj.s);
                      //磷
                      $("#P").text(obj.p);
                      //弗
                      $("#F").text(obj.f);
                      //酸碱度
                      $("#PH").text(obj.PH);
                      //比例
                      $("#proportion").text(obj.proportion);
                      //审批意见
                      $('#advice').text(obj.approvalContent);
                      //驳回意见
                      $("#backContent").text(obj.backContent);

                  }
                  else {
                      alert(result.message);
                  }
              },
              error:function (result) {
                  alert("服务器异常！")
              }
          });
          //审批按钮显示
          $('#approval').show();
          //驳回按钮显示
          $('#back').show();
          $("#contractInfoForm").modal('show');
      }
  else {
          alert("请选择数据！")
      }
}
/**
 * 出现具体审批的模态框
 */
function approvalModal() {
    $('#contractInfoForm2').modal('show');
}
/**
 * 出现具体驳回的模态框
 */
function backModal() {
$("#contractInfoForm3").modal('show');
}
//把按钮功能分出来做这个是审批
function confirm1() {
    opinion = $('#advice').val();
    //console.log(opinion);
    //1获取文本框的值
    $.ajax({
        type: "POST",
        url: "approvalPw",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'pwId': pwId, 'opinion': opinion,},
        success: function (result) {
           if(result != undefined && result.status == "success"){
               alert(result.message);
               console.log(result);
               window.location.reload();
           }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}
//把按钮功能分出来做这个是驳回
function back1() {
    backContent = $('#backContent').val();
    //设置状态驳回
    $.ajax({
        type: "POST",
        url: "backPw",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'pwId': pwId, 'backContent': backContent},
        success: function (result) {
            if(result != undefined && result.status == "success"){
                alert(result.message);
                console.log(result);
                window.location.reload();
            }
            else {
                alert(result.message)
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}
//审批具体方法
// function approvalPw(pwId) {
//     $.ajax({
//         type: "POST",                       // 方法类型
//         url: "approvalPw",         // url
//         async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//         data: {"pwId":pwId},
//         dataType: "json",
//         contentType: 'application/json;charset=utf-8',
//         success:function (result) {
//
//         },
//         error:function (result) {
//
//         }
//     });
//
//
// }
//序号变成四位
function getFour(pwId) {
    var pwld1=""+pwId;
    while (pwld1.length!=4) {
        pwld1="0"+pwld1;
    }
    return pwld1;
}

/**
 * 作废方法
 */
function cancelPw() {
    var pwId1=arrayId[0];
    if(arrayId.length==1){
        pwId= getFour(pwId1);
        //根据id信息
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getByPwId2",         // url
            // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {"pwId":pwId.toString()},
            dataType: "json",
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    var obj=result.data;
                  //状态判断
                    if(obj.checkState.name=='履约中'){
                        if(confirm("确定作废该数据?")){
                            //点击确定后操作
                            $.ajax({
                                type: "POST",                       // 方法类型
                                url: "cancelPw",         // url
                                // 同步：意思是当有返回值以后才会进行后面的js程序
                                data: {"pwId":pwId.toString()},
                                dataType: "json",
                                success:function (result) {
                                    if(result != undefined && result.status == "success"){
                                        alert(result.message);
                                        window.location.reload();
                                    }
                                    else {
                                        alert(result.message)
                                    }
                                },
                                error:function (result) {
                                    alert("服务器异常！")
                                }

                            });

                        }
                    }
                    else {
                        alert("无法作废，仅在履约状态下可操作")
                    }
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
    else {
        alert("请选择数据！")
    }
}

/**
 * 查看
 */
function  viewPw(){
    var pwId1=arrayId[0];
    if(arrayId.length==1){
        pwId= getFour(pwId1);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getByPwId2",         // url
            // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {"pwId":pwId.toString()},
            dataType: "json",
            //contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    var obj=result.data;
                    console.log(obj);
                    //开始赋值
                    //配伍编号
                    $("#compatibilityId").text(obj.compatibilityId);
                    //处理类别
                    if(obj.handleCategory==null){
                        $("#handleCategory").text(" ");
                    }
                    else
                    $("#handleCategory").text(obj.handleCategory.name);
                    //形态
                    if(obj.formType==null){
                        $("#formType").text(" ");
                    }
                    else
                    $("#formType").text(obj.formType.name);
                    //每日配比量
                    $("#dailyProportions").text(obj.dailyProportions);
                    //周需求总量
                    $("#weeklyDemand").text(obj.weeklyDemand);
                    //热值
                    $("#calorific1").text(obj.calorific);
                    //状态
                    if(obj.checkState!=null){
                        $("#checkState").text(obj.checkState.name);
                    }
                    //序号
                    $("#pwId").text(obj.pwId);
                    //灰分
                    $("#ash").text(obj.ash);
                    //水分
                    $("#water").text(obj.water);
                    //氯
                    $("#CL").text(obj.CL);
                    //硫
                    $("#S").text(obj.s);
                    //磷
                    $("#P").text(obj.p);
                    //弗
                    $("#F").text(obj.f);
                    //酸碱度
                    $("#PH").text(obj.PH);
                    //比例
                    $("#proportion").text(obj.proportion);
                    //审批意见
                    $('#advice').text(obj.approvalContent);
                    //驳回意见
                    $("#backContent").text(obj.backContent);

                }
                else {
                    alert(result.message);
                }
                //审批按钮隐藏
                $('#approval').hide();
                //驳回按钮隐藏
                $('#back').hide();
                $("#contractInfoForm").modal('show');
            },
            error:function (result) {
                alert("服务器异常！")
            }
        });
    }
    else {
        alert("请选择数据！")
    }


}

/**
 * 设置高级检索的下拉框数据
 */
function setPwList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSelectList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
                //处理类别
                var handleCategory=$('#search-handleCategory');
                handleCategory.children().remove();
                $.each(data.handleCategoryList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    handleCategory.append(option);
                });
                handleCategory.get(0).selectedIndex = -1;
                //形态
                var formType=$('#search-formType');
                formType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;

            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

}
array=[];
array1=[];
/**
 * 查询配伍信息
 */
function searchPw() {
    //找到最新的配伍编号
//     compatibilityId="";
// // $.ajax({
// //     type:"POST",
// //     url:"getList1",
// //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
// //     dataType: "json",
// //     contentType: "application/json; charset=utf-8",
// //     success:function (result) {
// //    if(result != undefined && result.status == "success"){
// //        compatibilityId=result.theNewestId;
// //    }
// //     },
// //     error:function (result) {
// //
// //     }
// //
// //
// // });
// //
// //     // 精确查询
// //     if ($("#senior").is(':visible')) {
// //         data = {
// //             pwId: $("#search-pwId").val(),//序号
// //             handleCategory: $("#search-handleCategory").val(),//处理类别
// //             formType: $("#search-formType").val(),//形态
// //            // proportion: $("#search-proportion").val(),//比例
// //             dailyProportions: $("#search-dailyProportions").val(),//每日配比量
// //             weeklyDemand: $("#search-weeklyDemand").val(),//每周需求总量
// //             calorific: $("#search-calorific").val(),//热值
// //             ash: $("#search-ash").val(),//灰分
// //             water: $("#search-water").val(),//水分
// //             cl: $("#search-CL").val(),//氯
// //             s: $("#search-S").val(),//硫
// //             p: $("#search-P").val(),//磷
// //             f: $("#search-F").val(),//弗
// //             ph: $("#search-PH").val(),//PH
// //             checkState:$("#search-checkState").val(),//状态
// //             compatibilityId:compatibilityId,//配伍编号
// //         };
// //         console.log(data);
// //         // 模糊查询
// //     } else {
// //             data = {
// //                 keyword: $("#searchContent").val(),
// //                 compatibilityId:compatibilityId,//配伍编号
// //             };
// //         console.log(data);
// //     }
// //     $.ajax({
// //         type: "POST",                       // 方法类型
// //         url: "searchPw",                  // url
// //         async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
// //         data: JSON.stringify(data),
// //         dataType: "json",
// //         contentType: "application/json; charset=utf-8",
// //         success: function (result) {
// //             if (result != undefined && result.status == "success") {
// //                 console.log(result);
// //                 var obj=result.data;
// //                 var n=result.length;
// //                 setCompatibility(obj,n);
// //             } else {
// //                 alert(result.message);
// //             }
// //         },
// //         error: function (result) {
// //             console.log(result);
// //         }
// //     });
// //     isSearch = true;
    //1分页模糊查询
    array.length=0;//清空数组
    $('.myclass').each(function () {
        $(this).show();
    });
    array.push($('.myclass'));
   //1序号
    var id=$('#search-pwId').val();
    //2形态
    var package=$('#search-formType option:selected').text();
   //进料方式
    var hangdeCategory=$('#search-handleCategory option:selected').text();
    //状态
    var checkState=$('#search-checkState option:selected').text();
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(!($(this).children('td').eq(4).text().indexOf(id)!=-1&&$(this).children('td').eq(8).text().indexOf(hangdeCategory)!=-1
                &&$(this).children('td').eq(9).text().indexOf(package)!=-1&&$(this).children('td').eq(5).text().indexOf(checkState)!=-1
            )){
                $(this).hide();
            }
        });
    }
    if(id.length<=0&&package.length<=0&&hangdeCategory.length<=0&&checkState.length<=0){
        switchPage(1);
        $('.myclass').each(function () {
            $(this).show();
        })
    }

}
/**
 * 生成物料需求单
 */
function  generate() {
    if(confirm("是否生成物料需求?")){
        //点击确定后操作
        $.ajax({
            type:"POST",
            url: "generateSheet",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    if(confirm("是否跳转到物料需求页面?")){
                        window.location.href="materialDemand.html";
                    }

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

}