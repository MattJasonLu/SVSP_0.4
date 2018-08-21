function reset() {
    $("#search-Id").val("");
    $("#search-wastesCode").val("");
    $("#search-wastesType").val("");
    $("#search-company").val("");
}
//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}