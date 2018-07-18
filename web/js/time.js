/**
 * Created by matt on 2018/7/18.
 */
//获取时间
function getDateStr(obj) {
    if (obj == null) return "";
    var year=(parseInt(obj.year)+1900).toString();
    var mouth=parseInt((obj.month)+1).toString();
    if(mouth.length!=2){
        mouth=0+mouth;
    }
    //  dataLeftCompleting(2, "0", mouth.toString()).toString();
    var  day=parseInt((obj.date)).toString();
    //ataLeftCompleting(2, "0", day.toString()).toString();
    if(day.length!=2){
        day=0+day;
    }
    var time1=year+"-"+mouth+"-"+day;
    return time1;
}

//获取时间
function getTimeStr(obj) {
    if (obj == null) return "";
    var year=(parseInt(obj.year)+1900).toString();
    var month=parseInt((obj.month)+1).toString();
    if(month.length!=2){
        month=0+month;
    }
    var hour = parseInt(obj.hours).toString();
    if (hour.length!=2){
        hour=0+hour;
    }
    var minutes = parseInt(obj.minutes).toString();
    if (minutes.length!=2){
        minutes=0+minutes;
    }
    //  dataLeftCompleting(2, "0", mouth.toString()).toString();
    var  day=parseInt((obj.date)).toString();
    //ataLeftCompleting(2, "0", day.toString()).toString();
    if(day.length!=2){
        day=0+day;
    }
    var time1 = year + "-" + month + "-" + day + " " + hour + ":" + minutes;
    return time1;
}