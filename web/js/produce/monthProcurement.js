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
//克隆行方法
function addNewLine() {
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6)").find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1=(id.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num-1);
        //console.log(newName);
        $(this).prop('name', newName);
    });
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);

}
//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
}
//保存方法
function save() {
    //思路先添加
    //1获取除物料需求外的数据
    //在添加物料表
    data={
        applyMouth:$('#applyMonth').val(),
        demandTime:$('#demandTime').val(),
        applyDepartment:$('#applyDepartment').val(),
        proposer:$('#proposer').val(),
        divisionHead:$('#divisionHead').val(),
        purchasingDirector:$('#purchasingDirector').val(),
        purchasingHead:$('#purchasingHead').val(),
        generalManager:$('#generalManager').val(),
        procurementCategory:1//代表是月季采购
    }
    //执行添加到后台的ajax
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addProcurement",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
            }
            else {

                alert(result.message);
            }
        },error:function (result) {
         alert("服务器异常！")
        }
    });
    $('.myclass').each(function () {
   var suppliesName=$(this).children('td').eq(1).children('input').val();
   var specifications=$(this).children('td').eq(2).children('input').val();
   var unit=$(this).children('td').eq(3).children('input').val();
   var inventory=$(this).children('td').eq(4).children('input').val();
   var demandQuantity=$(this).children('td').eq(5).children('input').val();
   var note=$(this).children('td').eq(6).children('input').val();
   var materialdata={
        suppliesName:suppliesName,
        specifications:specifications,
        unit:unit,
        inventory:inventory,
        demandQuantity:demandQuantity,
        note:note,
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addMaterial",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(materialdata),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert(result.message);
        }

    });

});


}
