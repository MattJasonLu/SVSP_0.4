function reset() {
    $("#search-Id").val("");
    $("#search-name").val("");
    $("#search-specifications").val("");
    $("#search-account").val("");
}
//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}