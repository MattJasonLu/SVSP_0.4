

/**
 * 打开编辑模态框
 */
function showEditModal() {
    $("#editModal").modal("show");   // 显示编辑模态框

}

function addNewLine(item) {

    // 获取id为plusBtn的tr元素
    //var tr = $("#plusBtn").prev();
    var tr = $(item).parent().parent().prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    $(clonedTr).children('td').eq(0).find('p').hide()
    clonedTr.attr('class', 'myclass3');
    clonedTr.show();
    clonedTr.children().find("input").val("");
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>";


    clonedTr.children('td').eq(0).find("a").remove();
    clonedTr.children('td').eq(0).append(delBtn)


    clonedTr.insertAfter(tr);
    clonedTr.removeAttr("id");
}