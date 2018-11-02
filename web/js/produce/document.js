function viewDocument() {
    $("#viewModal").modal('show')
}
function editDocument() {
    $("#editModal").modal('show')
}
function newDocument() {
    $("#newModal").modal('show')
}

/**
 * 获取编号
 * @param e
 * @returns {string}
 */
function getId(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 页面数据填充
 */
function listDocumentControl() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getDocument",            // url
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setDocumentControl(result.data);
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
 * 设置数据
 * @param result
 */
function setDocumentControl(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
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
                    $(this).html(obj.fileNO);
                    break;
                case (2):
                    $(this).html(obj.fileName);
                    break;
                case (3):
                    $(this).html(obj.SYSCode);
                    break;
                case (4):
                    $(this).html(obj.company);
                    break;
                case (5):
                    $(this).html(obj.createdName);
                    break;
                case (6):
                    $(this).html(getTimeStr(obj.createdDate));
                    break;
                case (7):
                    $(this).html(obj.isEffective);
                    break;
                case (8):
                    $(this).html(obj.note);
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