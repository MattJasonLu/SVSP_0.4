function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked', true);
    else $("input[name='select']").prop('checked', false);
}
function view1() {
    $('#appointModal2').modal('show');
}
function view2() {
    $('#appointModal1').modal('show');
}
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var week = parseInt(day / 7) + a;
    return year + "年第" + week + "周";

}
function loadPageTransportPlan() {
    $("#week").text(getWeekDate());
}