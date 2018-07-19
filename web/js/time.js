/**
 * Created by matt on 2018/7/18.
 */

/**
 * 获取日期yyyy-MM-dd
 * @param obj
 * @returns {*}
 */
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
/**
 * 获取时间 yyyy-MM-dd HH:mm
 * @param obj
 * @returns {*}
 */
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
    var seconds = parseInt(obj.seconds).toString();
    if (seconds.length!=2){
        seconds=0+seconds;
    }
    //  dataLeftCompleting(2, "0", mouth.toString()).toString();
    var  day=parseInt((obj.date)).toString();
    //ataLeftCompleting(2, "0", day.toString()).toString();
    if(day.length!=2){
        day=0+day;
    }
    var time1 = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    return time1;
}
/**
 * 通过字符串获取标准时间格式 yyyy-MM-dd'T'HH:mm:ss.SSSZ
 * @param time
 * @returns {string|*}
 */
function getStdTimeStr(time) {
    if (time == '') return "";
    var timeArr = time.split(' ');
    time = timeArr[0]+'T'+timeArr[1]+'.000Z';
    return time;
}
