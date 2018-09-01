var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**
/**
 * 查询问卷
 */
function searchQuestionnaire() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            questionnaireId: $("#search-questionnaireId").val(),//
            client:{
                companyName:$("#search-companyName").val(),
                industry:$("#search-industry").val(),
                product:$("#search-product").val(),
            } ,
            applyState: $("#search-state").val(),
            author: $("#search-author").val(),
            time:$("#search-time").val(),
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
        url: "searchQuestionnaireManage",                  // url
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


    // var keyword = $("#searchContent").val();
    // $.ajax({
    //     type: "POST",                       // 方法类型
    //     url: "searchQuestionnaire",                  // url
    //     async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
    //     data: {
    //         'keyword': keyword
    //     },
    //     dataType: "json",
    //     success: function (result) {
    //         console.log(result);
    //         if (result != undefined) {
    //             setQuestionnaireList(result);
    //         } else { }
    //     },
    //     error:function (result) {
    //         console.log(result);
    //     }
    // });
}
/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setQuestionnaireList(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = new Array();
    for (var i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i + 1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }

}
function setQuestionnaireList(result) {
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
                // 调查表编号
                case (1):
                    $(this).html(obj.questionnaireId);
                    break;
                // 企业名称
                case (2):
                    $(this).html(obj.client.companyName);
                    break;
                // 所属行业
                case (3):
                    $(this).html(obj.client.industry);
                    break;
                // 主要产品
                case (4):
                    $(this).html(obj.client.product);
                    break;
                // 审批状态
                case (5):
                    if (obj.applyState != null)
                        $(this).html(obj.applyState.name);
                    break;
                // 填报人
                case (6):
                    $(this).html(obj.author);
                    break;
                // 填报日期
                case (7):
                    $(this).html(getTimeStr(obj.time));
                    break;
//                    case (8):
//                        if(obj.applyState.name == "已退回"){
//                            $(this).children().eq(1).attr("class","disabled");
//                            $(this).children().eq(1).removeAttr("onclick");
//                            $(this).children().eq(2).attr("class","disabled");
//                            $(this).children().eq(2).removeAttr("onclick");
//                            $(this).children().eq(4).attr("class","disabled");
//                            $(this).children().eq(4).removeAttr("onclick");
//                            $(this).children().eq(5).attr("class","disabled");
//                            $(this).children().eq(5).removeAttr("onclick");
//                        }else if(obj.applyState.name == "已签收"){
//                            $(this).children().eq(1).attr("class","disabled");
//                            $(this).children().eq(1).removeAttr("onclick");
//                            $(this).children().eq(2).attr("class","disabled");
//                            $(this).children().eq(2).removeAttr("onclick");
//                            $(this).children().eq(3).attr("class","disabled");
//                            $(this).children().eq(3).removeAttr("onclick");
//                            $(this).children().eq(4).attr("class","disabled");
//                            $(this).children().eq(4).removeAttr("onclick");
//                            $(this).children().eq(5).attr("class","disabled");
//                            $(this).children().eq(5).removeAttr("onclick");
//                        }else{
//                            $(this).children().eq(0).attr("class","disabled");
//                            $(this).children().eq(0).removeAttr("onclick");
//                            $(this).children().eq(1).attr("class","disabled");
//                            $(this).children().eq(1).removeAttr("onclick");
//                            $(this).children().eq(2).attr("class","disabled");
//                            $(this).children().eq(2).removeAttr("onclick");
//                            $(this).children().eq(3).attr("class","disabled");
//                            $(this).children().eq(3).removeAttr("onclick");
//                            $(this).children().eq(4).attr("class","disabled");
//                            $(this).children().eq(4).removeAttr("onclick");
//                        }
//                        break;
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
        url: "applyStateList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var applyState = $("#search-state");
                applyState.children().remove();
                $.each(data.ApplyStateList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    applyState.append(option);
                });
                applyState.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}
