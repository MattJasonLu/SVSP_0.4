function loadThresholdList() {
    $("#week").text(getWeekDate());
}
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var week = parseInt(day / 7) + a;
    return year + "年" + month + "月";

}