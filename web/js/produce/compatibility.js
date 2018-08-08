/*********************
 * jackYang
 */
var isSearch = false;
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
    // 设置高级检索的下拉框数据
    setPwList();
    isSearch = false;
}
/*加载表格数据
* 
*/
function setCompatibility(obj,n) {
    arrayId=[];
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
                    //$(this).html(data.proportion.toFixed(1));
                    $(this).html((data.dailyProportions/data.weeklyDemand).toFixed(3)*100);
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
/**
 * 查询配伍信息
 */
function searchPw() {
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            pwId: $("#search-pwId").val(),//序号
            handleCategory: $("#search-handleCategory").val(),//处理类别
            formType: $("#search-formType").val(),//形态
            proportion: $("#search-proportion").val(),//比例
            dailyProportions: $("#search-dailyProportions").val(),//每日配比量
            plateNumber: $("#search-plateNumber").val(),//车牌号
            checkState: $("#search-checkState").val(),//审核状态
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
        };
        console.log(data);
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchStock",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;
}