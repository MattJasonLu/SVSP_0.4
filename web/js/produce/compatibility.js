//导入数据
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var id = '0000';
        console.log("change");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentCompatibilityId",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: false,
            success: function (result) {
                if (result != undefined || result != NaN) {
                    id = result.compatibilityId;
                } else {
                    alert("数据获取失败！ " + result);
                }
            },
            error: function (result) {
                alert("导入失败，请检查后重试！")
                console.log("error" + result);
            }
        });
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("tableName", 't_pr_pw');
        formFile.append("id", id);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importClientExcel",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: formFile,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    if (result.status == "success") {
                        alert(result.message);
                        window.location.reload();         //刷新
                    } else {
                        alert(result.message);
                    }
                }
            },
            error: function (result) {
                console.log(result);
            }
        });
    });

}