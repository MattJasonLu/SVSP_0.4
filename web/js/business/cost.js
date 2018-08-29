var isSearch = false;
var currentPage = 1;                          //当前页数
var data;

/**
 *查询成本单
 * */
function searchCost() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            costId: $("#search-costId").val(),//成本编号
            supplier: {
                contactName: $("#search-supplier").val(),
                phone: $("#search-state").val(),
                location: $("#search-author").val(),
                companyName: $("#search-companyName").val()
            },
            endDate: $("#search-endDate").val(),//产废单位联系电话
            name: $("#search-name").val(),//报价单名称
            version: $("#search-version").val(),//版本号
            checkState: $("#search-checkState").val(),//审核状态
            page: page,
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
        console.log(data);
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchCost",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
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
function setCostList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 报价单编号
                case (1):
                    $(this).html(obj.costId);
                    break;
                case (2):
                    $(this).html(obj.supplier.companyName);
                    break;
                // 联系人
                case (3):
                    $(this).html(obj.name);
                    break;
                // 客户名称
                case (4):
                    $(this).html(obj.version);
                    break;
                // 联系人
                case (5):
                    $(this).html(obj.supplier.contactName);
                    break;
                // 联系方式
                case (6):
                    $(this).html(obj.supplier.phone);
                    break;
                // 所属区域
                case (7):
                    $(this).html(obj.supplier.location);
                    break;
                // 状态
                case (8):
                    if(obj.checkState != null)
                        $(this).html(obj.checkState.name);
                    break;
                // 到期日期
                case (9):
                    $(this).html(getTimeStr(obj.endDate));
                    break;
                case (11):
                    $(this).html(obj.id);
                // case (10):
                //     if(obj.checkState.name == "待审批"){
                //         $(this).children().eq(1).attr("class","disabled");
                //         $(this).children().eq(1).removeAttr("onclick");
                //         $(this).children().eq(2).attr("class","disabled");
                //         $(this).children().eq(2).removeAttr("onclick");
                //         $(this).children().eq(3).attr("class","disabled");
                //         $(this).children().eq(3).removeAttr("onclick");
                //     }else if(obj.checkState.name == "审批中"){
                //         $(this).children().eq(1).attr("class","disabled");
                //         $(this).children().eq(1).removeAttr("onclick");
                //         $(this).children().eq(2).attr("class","disabled");
                //         $(this).children().eq(2).removeAttr("onclick");
                //         $(this).children().eq(3).attr("class","disabled");
                //         $(this).children().eq(3).removeAttr("onclick");
                //         $(this).children().eq(4).attr("class","disabled");
                //         $(this).children().eq(4).removeAttr("onclick");
                //     }else if(obj.checkState.name == "已作废"){
                //         $(this).children().eq(1).attr("class","disabled");
                //         $(this).children().eq(1).removeAttr("onclick");
                //         $(this).children().eq(2).attr("class","disabled");
                //         $(this).children().eq(2).removeAttr("onclick");
                //         $(this).children().eq(3).attr("class","disabled");
                //         $(this).children().eq(3).removeAttr("onclick");
                //         $(this).children().eq(4).attr("class","disabled");
                //         $(this).children().eq(4).removeAttr("onclick");
                //         $(this).children().eq(5).attr("class","disabled");
                //         $(this).children().eq(5).removeAttr("onclick");
                //     }
                //     break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}
/**
 * 设置高级检索的下拉框数据
 */
function setSeniorSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckStateList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
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