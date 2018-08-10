/**
 *
 * 加载基础数据阈值表数据
 */
function loadThresholdList() {
//通过ajax从后台获取
    $.ajax({
       type:"POST",
        url:"thresholdList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result !== undefined && result.status === "success"){
                 console.log(result);
            setThresholdList(result);
            }
            else {

            }
        },
        error:function (result) {
           alert("服务器异常！");
        }
    });
    $("#weekDate").text(getWeekDate());
}
/*
* 加载数据至克隆表格中
*/
function setThresholdList(result) {
     var tr = $("#clonedTr2");//克隆一行
     //tr.siblings().remove();
   $.each(result.data,function (index, item) {
       var obj=eval(item);
       var clonedTr = tr.clone();
       clonedTr.show();
       clonedTr.children("td").each(function (inner_index) {
           // 根据索引为部分td赋值
           switch (inner_index) {
              //序号
               case (0):
                   $(this).html(obj.thresholdId);
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
                   //最大热值
               case (3):
                   $(this).html(obj.calorificMax);
                   break;
                   //最低热值
               case (4):
                   $(this).html(obj.calorificMin);
                   break;
                   //最高灰分
               case (5):
                   $(this).html(obj.ashMax);
                   break;
                   //最低灰分
               case (6):
                   $(this).html(obj.ashMin);
                   break;
                   //最大水分
               case (7):
                   $(this).html(obj.waterMax);
                   break;
                   //最低水分
               case (8):
                   $(this).html(obj.waterMin);
                   break;
                   //最大硫成分
               case (9):
                   $(this).html(obj.sMax);
                   break;
               //最少硫成分
               case (10):
                   $(this).html(obj.sMin);
                   break;
               //最多氯成分
               case (11):
                   $(this).html(obj.clMax);
                   break;
              //最少氯成分
               case (12):
                   $(this).html(obj.clMin);
                   break;
              //最多磷成分
               case (13):
                   $(this).html(obj.pMax);
                   break;
               //最少磷成分
               case (14):
                   $(this).html(obj.pMin);
                   break;
               //最多弗成分
               case (15):
                   $(this).html(obj.fMax);
                   break;
               //最少弗成分
               case (16):
                   $(this).html(obj.fMin);
                   break;
              //最大酸碱度
               case (17):
                   $(this).html(obj.phMax);
                   break;
               //最小酸碱度
               case (18):
                   $(this).html(obj.phMin);
                   break;
                   //安全库存量
               case (19):
                   $(this).html(obj.safety);
                   break;
                   //起始日期
               case (20):
                   if(obj.beginTime!=null){
                       var time=gettime(obj.beginTime);
                       $(this).html(time);
                   }
                   else {
                       $(this).html("");
                   }
                   break;
               //结束日期
               case (21):
                   if(obj.endTime!=null){
                       var time=gettime(obj.endTime);
                       $(this).html(time);
                   }
                   else {
                       $(this).html("");
                   }
                   break;
           }


       });
       clonedTr.removeAttr("id");
       clonedTr.insertBefore(tr);
   });
    // 隐藏无数据的tr
    tr.hide();
}

// var day = obj.day
function gettime(obj) {
    var month=obj.month;
    if (month.length !== 2) {
        month = "0" + month;
    }
    var day = parseInt((obj.date)).toString();
    if (day.length !== 2) {
        day = "0"+ day;
    }
    var year=obj.year+1900;
    return year+"--"+month+"--"+day;
}

console.log(getWeekDate());

function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var week = parseInt(day / 7) + a;
    return year + "年" + month + "月第" + week + "周";

}
