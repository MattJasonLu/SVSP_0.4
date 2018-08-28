/**
 * Created by JackYang on 2018/8/27.
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
//设置高级查询下拉框数据
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSeniorSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    checkState.append(option);
                });
                checkState.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

}
//高级查询
function searchContract() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var keyword = $("#search").val();
    //判断当前合同类型
    //console.log(nameBykey.substring(0, 2));
    // console.log(keyword);
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            contractId: $("#search-contractId").val(),//库存编号
            companyName: $("#search-companyName").val(),//客户名称
            contractName: $("#search-contractName").val(),//合同名称
            telephone: $("#search-telephone").val(),//联系方式
            checkState: $("#search-checkState").val(),//审核状态
            suppierName: $("#search-suppierName").val(),//供应商名称
            beginTime: $("#search-beginTime").val(),//签订日期
            page: page,
            nameBykey:nameBykey,
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#search").val(),
            page: page,
            nameBykey:nameBykey
        };
        console.log(data);
    }
    $.ajax({
            type: "POST",                       // 方法类型
            url: "searchContract",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data:  JSON.stringify(data),
            dataType: "json",
        contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    isSearch = true;
}