/**
 * Created by matt on 2018/6/14.
 */
// 获取当前时间为'yyyy-MM-dd'
function getNowDate() {
    var now = new Date();
    return now.format('yyyy-MM-dd');
}

/**
 * 获取日报范围起始日期
 */
function getReportStart() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var start = new Date();
    start.setFullYear(year, month, 23);
    return start.format('yyyy-MM-dd')
}
/**
 * 获取日报范围结束日期
 */
function getReportEnd() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var start = new Date();
    start.setFullYear(year, month, 22);
    return start.format('yyyy-MM-dd')
}
function getFormatDate(date) {
    var date1 = new Date(date);
    return date1.format('yyyy-MM-dd');
}
// 对Date原型进行改造，增加方法format
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}