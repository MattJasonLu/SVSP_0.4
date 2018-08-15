function view() {
    $("#appointModal2").modal("show");
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