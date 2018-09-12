/**
 * Created by matt on 2018/9/7.
 */

function addData() {
    var date = new Date();
    // generateProductionDaily
    $.ajax({
        type: "POST",                       // 方法类型
        url: "generateProductionDaily",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (!isUndefined(result) && result.status == "success") {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}
