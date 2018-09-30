/*********************
 * jackYang
 */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

//导入数据
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
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
// function importExcel() {
//     document.getElementById("idExcel").click();
//     document.getElementById("idExcel").addEventListener("change", function () {
//         var id = '0000';
//         console.log("change");
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "getCurrentCompatibilityId",              // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             dataType: "json",
//             contentType: false,
//             success: function (result) {
//                 if (result != undefined || result != NaN) {
//                     id = result.compatibilityId;
//                 } else {
//                     alert("数据获取失败！ " + result);
//                 }
//             },
//             error: function (result) {
//                 alert("导入失败，请检查后重试！")
//                 console.log("error" + result);
//             }
//         });
//         var eFile = document.getElementById("idExcel").files[0];
//         var formFile = new FormData();
//         formFile.append("excelFile", eFile);
//         formFile.append("tableName", 't_pr_pw');
//         formFile.append("id", id);
//         $.ajax({
//             type: "POST",                       // 方法类型
//             url: "importCompatibilityExcel",              // url
//             async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
//             dataType: "json",
//             data: formFile,
//             processData: false,
//             contentType: false,
//             success: function (result) {
//                 if (result != undefined) {
//                     console.log(result);
//                     if (result.status == "success") {
//                         alert(result.message);
//                         window.location.reload();         //刷新
//                     } else {
//                         alert(result.message);
//                     }
//                 }
//             },
//             error: function (result) {
//                 console.log(result);
//             }
//         });
//     });
//
// }
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
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalBurnOrderRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                if (result > 0) {
                    totalRecord = result;
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchBurnOrderTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setCompatibility(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = new Array();
    for (var i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            addAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");

}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber == totalPage()) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage()) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageBurnOrderList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setBurnOrderList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchBurnOrder",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setBurnOrderList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");

            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageBurnOrderList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setBurnOrderList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchBurnOrder",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setBurnOrderList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
    }
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

/**
 * 加载配伍周计划数据
 */
function getList1() {
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type:"POST",
        url:"getList1",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result !== undefined && result.status === "success"){
                console.log(result)
             setPageClone(result);
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
function setCompatibility(result) {

    var tr=$('#cloneTr1');

    tr.siblings().remove();

    $.each(result.compatibilityList,function (index,item) {
        var data=eval(item);
       // console.log(obj)


        var clonedTr = tr.clone();

        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {

            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (1):
                    $(this).html(index+1);
                    break;

                //配伍计划单号
                case (2):
                        $(this).html(data.compatibilityId);
                    break;

                // 小计日配比量
                case (3):
                        $(this).html(data.totalDailyAmount);
                    break;

                  //周需求总量
                case (4):
                    $(this).html(data.weeklyDemandTotalAggregate);
                    break;

                // 平均热值
                case (5):
                    $(this).html((data.calorificAvg).toFixed(1));
                    break;

                //平均灰分
                case (6):
                    $(this).html(data.ashAvg.toFixed(1));
                    break;

                // 平均水分
                case (7):
                        $(this).html(data.waterAvg.toFixed(1));
                    break;

                   // 平均CL
                case (8):
                        $(this).html(data.clAvg.toFixed(1));
                    break;

                    //平均S
                case (9):
                    $(this).html(data.sAvg.toFixed(1));
                    break;

                //平均P
                case (10):
                    $(this).html(data.pAvg.toFixed(1));
                    break;

                //平均F
                case (11):
                    $(this).html(data.fAvg.toFixed(1));
                    break;

                //平均PH
                case (12):
                    $(this).html(data.phAvg.toFixed(1));
                    break;

                //状态
                case (13):
                    if(data.checkState!=null){
                        $(this).html(data.checkState.name);
                    }
                    break;
            }
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        //把克隆好的tr追加到原来的tr前面
        // 隐藏无数据的tr
        tr.hide();
    });

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

//双击查看
function view(item) {
    var compatibilityId=$(item).children('td').eq(2).text();

    $.ajax({
        type:"POST",
        url: "getWeekById",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'compatibilityId':compatibilityId},
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //赋值配伍单号
                $('#compatibilityId1').text(compatibilityId);
                setCompatibilityItemModal(result);


            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    });


    $('#appointModal2').modal('show');
}

//设置配伍明细模态框

function setCompatibilityItemModal(result) {
    var tr=$('#cloneTr');

    tr.siblings().remove();

$.each(result.array,function (index,item) {
    var obj=eval(item);

    var clonedTr = tr.clone();

    clonedTr.show();


    clonedTr.children('td').each(function (inner_index) {

        switch (inner_index){
            //序号
            case (0):
                $(this).html(index+1);
                break;

                //处理类别
            case (1):
                if(obj.handleCategory!=null){
                    $(this).html(obj.handleCategory.name);
                }
                break;

            //物质形态
            case (2):
                if(obj.formType!=null){
                    $(this).html(obj.formType.name);
                }
                break;
                //比例
            case (3):
                    $(this).html(obj.proportion.toFixed(2));
                break;
               //每日配置量
            case (4):
                $(this).html(obj.dailyRatio);
                break;
                //周需求总理
            case (5):
                $(this).html(obj.weeklyDemandTotal);
                break;
                //热值
            case (6):
                $(this).html(obj.calorific);
                break;
                //灰分
            case (7):
                $(this).html(obj.ash);
                break;
                //水分
            case (8):
                $(this).html(obj.water);
                break;
                //CL
            case (9):
                $(this).html(obj.cl);
                break;
                //S
            case (10):
                $(this).html(obj.s);
                break;
                //P
            case (11):
                $(this).html(obj.p);
                break;
                //F
            case (12):
                $(this).html(obj.f);
                break;
                //PH
            case (13):
                $(this).html(obj.ph);
                break;
        }
        clonedTr.removeAttr('id');
        clonedTr.insertBefore(tr);

    })

   tr.hide();


})


}