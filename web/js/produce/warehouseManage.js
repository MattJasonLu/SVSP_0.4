function view1() {
    $("#examineModal").modal("show");
}
function view2() {
    $("#examineModal").modal("show");
}
//全选复选框
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}
/**
 * 获取用户的编号
 * @param item
 * @returns {string}
 */
function getId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 作废计划单
 * @param item 用户
 */
function changeAttribute(item) {
    $("#examineModal").modal("show");
}
/**
 * 作废计划单
 * @param item 用户
 */
function cancel(item) {
    var id = getId(item);
    var r = confirm("确认作废？");
    if (r === true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'model-wastesCode': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result !== undefined) {
                    if (result.status === "success") {
                        alert("作废成功");
                        window.location.reload();
                    } else if (result.status === "fail") {
                        alert("作废失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}
/**
 * 签收计划单
 * @param item 用户
 */
function signIn(item) {
    var id = getId(item);
    var r = confirm("确认签收？");
    if (r === true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'model-wastesCode': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result !== undefined) {
                    if (result.status === "success") {
                        alert("禁用成功");
                        window.location.reload();
                    } else if (result.status === "fail") {
                        alert("禁用失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}


function loadInboundPlanOrder() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listInboundPlanOrder",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setDataList(result.data);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#planClonedTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (1):
                    $(this).html(obj.inboundPlanOrderId);
                    break;
                case (2):
                    $(this).html(obj.transferDraftId);
                    break;
                case (3):
                    $(this).html(getDateStr(obj.planDate));
                    break;
                case (4):
                    if (obj.produceCompany != null)
                        $(this).html(obj.produceCompany.companyName);
                    break;
                case (5):
                    if (obj.acceptCompany != null)
                        $(this).html(obj.acceptCompany.companyName);
                    break;
                case (6):
                    $(this).html(getDateStr(obj.transferDate));
                    break;
                case (7):
                    $(this).html(obj.transferCount);
                    break;
                case (8):
                    $(this).html(obj.poundsCount);
                    break;
                case (9):
                    $(this).html(obj.storageCount);
                    break;
                case (10):
                    $(this).html(obj.leftCount);
                    break;
                case (11):
                    $(this).html(obj.transferCount);
                    break;
                case (12):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.name);
                    break;
                case (13):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.wastesId);
                    break;
                case (14):
                    if (obj.wastes != null)
                        $(this).html(obj.wastes.category);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}