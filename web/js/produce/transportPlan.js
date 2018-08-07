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