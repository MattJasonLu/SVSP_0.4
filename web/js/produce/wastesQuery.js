/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}

/**
 * 
 *加载危废数据
 */
function loadWasteInventoryList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getOutBoundOrderList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
      alert("服务器异常！")
        }
    });
}
