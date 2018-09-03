/**
 * 全选复选框
 */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}

/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}


function getId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 模态框数据填充
 */
function viewEquipment(item) {
    var id = getId(item);
    console.log(id);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipment",            // url
        async: false,
        dataType: "json",
        data: {
            id: id
        },
        success: function (result) {
            if (result != undefined ) {//&& result.status == "success"
                console.log(result);
                viewEquipment1(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 模态框及数据
 */
function viewEquipment1(data) {
    var tr = $("#cloneTr2");//克隆一行
    //tr.siblings().remove();
    tr.siblings().remove();
    $.each(data, function (index,item) {
        var obj = eval(item);
        var clonedTr = tr.clone();
        // 赋值
        clonedTr.find("td[name='id']").text(obj.id);//index + 1
        clonedTr.find("td[name='documentNumber']").text(obj.documentNumber);//index + 1
        clonedTr.find("td[name='equipment']").text(obj.Equipment);
        clonedTr.find("td[name='runningTime']").text(obj.runningTime);
        clonedTr.find("td[name='stopTime']").text(obj.stopTime);
        clonedTr.find("td[name='stopResult']").text(obj.stopResult);
        clonedTr.find("td[name='note']").text(obj.note);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    $('#view1Modal').modal('show');
}

/**
 * 页面数据填充
 */
function listEquipment() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listEquipment",            // url
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setEquipment(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 加载表格数据
 * */
function setEquipment(data) {
    var tr = $("#cloneTr1");//克隆一行
    //tr.siblings().remove();
    tr.siblings().remove();
    $.each(data, function (index,item) {
        var obj = eval(item);
        var clonedTr = tr.clone();
        // 赋值
        clonedTr.find("td[name='id']").text(obj.id);//index + 1
        clonedTr.find("td[name='documentNumber']").text(obj.documentNumber);//index + 1
        clonedTr.find("td[name='creator']").text(obj.creator);
        clonedTr.find("td[name='dayTime']").text(getTimeStr(obj.dayTime));
        clonedTr.find("td[name='createDept']").text(obj.createDept);
        clonedTr.find("td[name='editor']").text(obj.editor);
        clonedTr.find("td[name='editTime']").text(getTimeStr(obj.editTime));
        clonedTr.find("td[name='note']").text(obj.note);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}


