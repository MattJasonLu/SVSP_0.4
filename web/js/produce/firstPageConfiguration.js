var roleId = "";    // 角色ID

/**
 * 加载首页数据
 */
function loadData(){
    loadNavigationList();   // 加
    // 载动态菜单
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listRole",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setDataList(result.data);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

    /**
     * 设置数据
     * @param result
     */
    function setDataList(result) {
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
                    // 编号
                    case (1):
                        $(this).html(obj.id);
                        break;
                    case (2):
                        $(this).html(obj.roleName);
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
}


function firstModalShow(e) {
    roleId = $(e).parent().parent().next().text();   // 获取角色ID
    $("#firstModal").modal('show')
}


$(function () {
    $("#first").mouseover(
        function () {
            $("#first").click();
        }
    )
});

/**
 * 保存勾选数据
 */
function save() {
    alert("功能开发中，，，");
}
