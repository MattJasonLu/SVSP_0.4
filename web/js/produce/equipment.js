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
    //$("#senior").find("select").get(0).selectedIndex = -1;
}

function getDocNumber(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 模态框数据填充
 */
function viewEquipment(item) {
    var number = getDocNumber(item);   //number为单据号
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipment",            // url
        async: false,
        dataType: "json",
        data: {
            documentNumber: number
        },
        success: function (result) {
            if (result != undefined ) {//&& result.status == "success"
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
        console.log(obj);
        var clonedTr = tr.clone();
        // 赋值
        clonedTr.find("td[name='documentNumber']").text(index+1);//index + 1
        clonedTr.find("td[name='equipment']").text(obj.equipment);
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

// var validator = $("")
// /**
//  * 新增数据
//  */
// function addEquipment() {
//     var addType = $("input[name='checkbox1']:checked").val();
//     if (validator.form()) {
//         var data = {
//             id: $("#id").val(),
//             equipment: $("#equipment").val(),
//             runningTime: $("#runningTime").val(),
//             stopTime: $("#stopTime").val(),
//             reason: $("#reason").val(),
//             creator: $("#creator").val(),
//             dayTime: $("#dayTime").val(),
//             createDept: $("#createDept").val(),
//             editor: $("#editor").val(),
//             editTime: $("#editTime").val(),
//             note: $("#note").val()
//         };
//         // 上传用户数据
//         $.ajax({
//             type: "POST",                            // 方法类型
//             url: "addEquipment",                     // url
//             async: false,                            // 同步：意思是当有返回值以后才会进行后面的js程序
//             data: JSON.stringify(data),
//             dataType: "json",
//             contentType: "application/json; charset=utf-8",
//             success: function (result) {
//                 if (result != undefined) {
//                     if (result.status == "success") {
//                         alert(result.message);
//                         if (addType == "continue") window.location.reload();
//                         else $(location).attr('href', 'equipment.html');//跳转
//                     } else {
//                         console.log(result);
//                         alert(result.message);
//                     }
//                 }
//             },
//             error: function (result) {
//                 console.log("error: " + result);
//                 alert("服务器异常!");
//             }
//         });
//     }
// }

//克隆行方法
function addNewLine() {
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7)").find("input").val("");
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

//保存功能
function addEquipment() {
    var data = {
            documentNumber: $("#documentNumber").val(),
            creator: $("#creator").val(),
            dayTime: $("#dayTime").val(),
            createDept: $("#createDept").val(),
            editor: $("#editor").val(),
            editTime: $("#editTime").val(),
            note: $("#note").val(),

        };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addEquipment",            // url
        async: false,
        data:JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    console.log(data);
   $('.myclass').each(function () {
       var dataItem={
           equipment: $('#equipment').selectpicker('val'),
           runningTime:$(this).children('td').eq(2).children('input').val(),
           stopTime:$(this).children('td').eq(3).children('input').val(),
           stopResult: $(this).children('td').eq(4).children('input').val()
       };
       console.log(dataItem);
       $.ajax({
           type: "POST",                       // 方法类型
           url: "addEquipmentItem",            // url
           async: false,
           data:JSON.stringify(dataItem),
           dataType: "json",
           contentType: 'application/json;charset=utf-8',
           success: function (result) {
               if (result != undefined && result.status == "success") {
                   console.log(result);
                   window.location.href = "equipment.html";
               } else {
                   console.log(result.message);
               }
           },
           error: function (result) {
               console.log("error: " + result);
               console.log("失败");
           }
       });
   });
}

//生成单据号
function createDocNumber() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "createDocNumber",            // url
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                $('#documentNumber').val(result.DocNumberId);

            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSeniorSelectList();
}
function stopping() {
    var key = parseFloat($("#runningTime0").val());
    if(key <= 24){
        $("#stopTime0").val(String(24-key));
    }else{
        alert("请输入小于24的小时数！")
    }
}
var isSearch = false;
//查询功能(精确查询)
function searchData() {
    var data;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            documentNumber: $("#search-documentNumber").val(),//单据号
            creator: $("#search-creator").val(),//创建人
            createDept: $("#search-createDept").val(),//创建部门
            editor: $("#search-editor").val()//修改人
        };
        console.log(data);
        // 模糊查询
    }
    // else {
    //     data = {
    //         keyword: $("#searchContent").val(),
    //         compatibilityId:compatibilityId//配伍编号
    //     };
    //     console.log(data);
    // }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchEquipment",                      // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var obj=result.data;
                //var n=result.length;
                setEquipment(obj);
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    isSearch = true;
}
//填充下拉框数据
function setSeniorSelectList() {
    //设置状态下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentNameList",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var state = $("#equipment");
                state.children().remove();
                $.each(data.equipmentList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}