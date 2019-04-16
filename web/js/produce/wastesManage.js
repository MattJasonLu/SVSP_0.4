/**
 * 危废代码管理脚本
 */

var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;



/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalWastesMangerRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result > 0) {
                    totalRecord = result;
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }
    else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchWastesMangerCount",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // console.log(result);
                if (result > 0) {
                    totalRecord = result;
                    console.log("总记录数为:" + result);
                } else {
                    console.log("fail: " + result);
                    totalRecord = 0;
                }
            },
            error: function (result) {
                console.log("error: " + result);
                totalRecord = 0;
            }
        });
    }


    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setWastesManger(result);
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
            addAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");

}

/*加载表格数据
*
*/
function setWastesManger(result) {

    var tr = $('#cloneTr1');

    tr.siblings().remove();

    $.each(result.data, function (index, item) {
        var data = eval(item);
        // console.log(data)
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass1');
        clonedTr.show();

        clonedTr.children("td").each(function (inner_index) {

            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index + 1);
                    break;

                //危废类别
                case (1):
                    if(data.wastescategory!=null){
                        $(this).html(data.wastescategory.code);
                    }

                    break;

                // 行业来源
                case (2):
                    $(this).html($.trim(data.industry));
                    break;

                //危废代码
                case (3):
                    $(this).html(data.code);
                    break;

                // 描述
                case (4):
                    $(this).html($.trim((data.description)));
                    break;

                //特性
                case (5):
                    if(data.characteristic!=null){
                        $(this).html(data.characteristic.name);
                    }

                    break;

                case (6):

                        $(this).html(data.id);


                    break;
            }
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        });
        //把克隆好的tr追加到原来的tr前面
        // 隐藏无数据的tr

        tr.hide();


    });

}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber == undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber == totalPage()) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage()) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    addPageClass(pageNumber);           // 设置页码标蓝
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getWastesMangerList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setWastesManger(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    else {
        data1['page'] = page;
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchWastesManger",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setWastesManger(result)
                } else {
                    alert(result.message);

                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber > totalPage()) {
        pageNumber = totalPage();
    }
    if (pageNumber == null || pageNumber == "") {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber == 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber == totalPage()) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");

            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage()) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        setPageCloneAfter(pageNumber);        // 重新设置页码
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getWastesMangerList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setWastesManger(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        } else {
            data1['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchWastesMangerCount",                  // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    // console.log(result);
                    if (result > 0) {
                        totalRecord = result;
                        console.log("总记录数为:" + result);
                    } else {
                        console.log("fail: " + result);
                        totalRecord = 0;
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                    totalRecord = 0;
                }
            });
        }
    }
}

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord == 0) {
        console.log("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}


/**
 * 加载函数
 */
function loadWastesManage() {
    loadNavigationList();   // 设置动态菜单
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",
        url: "getWastesMangerList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
    // 设置高级检索的下拉框数据

    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //危废类别 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesCategoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var wastescategory = $('#search-wastescategory');
                wastescategory.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name+"("+item.code+")");
                    wastescategory.append(option);
                });
                wastescategory.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    //危废特性 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesCharacteristicList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var characteristic = $('#search-characteristic');
                characteristic.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name+"("+item.code+")");
                    characteristic.append(option);
                });
                characteristic.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    //危废代码 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var code = $('#search-code');
                code.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    code.append(option);
                });
                code.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    isSearch = false;
}


//新增按钮
function plus() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //危废类别 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesCategoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var wastescategory = $('#wastescategory');
                wastescategory.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name+"("+item.code+")");
                    wastescategory.append(option);
                });
                wastescategory.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    //危废特性 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesCharacteristicList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var characteristic = $('#characteristic');
                characteristic.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name+"("+item.code+")");
                    characteristic.append(option);
                });
                characteristic.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    $("#modalId").modal('show')
}

//保存
function save() {

    if(confirm("确定添加?")){
        //点击确定后操作
        $('.myclass').each(function () {
            var data={
                wastescategory:{code:$(this).children('td').eq(0).find("select").val()},
                industry:$(this).children('td').eq(1).find("input").val(),
                code:$(this).children('td').eq(2).find("input").val(),
                description:$(this).children('td').eq(3).find("input").val(),
                characteristic:{code:$(this).children('td').eq(4).find("select").val()},
            };
            console.log(data)
          $.ajax({
              type: "POST",
              url: "addWastesManger",
              async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
              data: JSON.stringify(data),
              dataType: "json",
              contentType: 'application/json;charset=utf-8',
              success:function (result) {
                  if (result != undefined && result.status == "success"){
                      alert(result.message)
                      window.location.reload()
                  }
                  else {
                      alert(result.message)
                  }
              },
              error:function (result) {
                  alert("服务器异常!")
              }
          })
        })





    }


}

//删除
function removeWastesManger(item) {
    if(confirm("确定删除?")){
        var id=$(item).parent().prev().html();

        $.ajax({
            type: "POST",
            url: "removeWastesManger",
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {"id":id},
            dataType: "json",
            // contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message)
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                }
                else {
                    alert(result.message)
                }
            },
            error:function (result) {
                alert("服务器异常!")
            }
        })


    }



}


//编辑
function edit(item) {


    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 6
    });

    //危废类别 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesCategoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var wastescategory = $('#wastescategory1');
                wastescategory.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name+"("+item.code+")");
                    wastescategory.append(option);
                });
                // wastescategory.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    //危废特性 赋值
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesCharacteristicList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(data)
                //危废类别
                var characteristic = $('#characteristic1');
                characteristic.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.name+"("+item.code+")");
                    characteristic.append(option);
                });
                // characteristic.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });

    $("#modalId2").modal('show');

    var id=$(item).parent().prev().html();

    $.ajax({
        type: "POST",
        url: "getWastesMangerById",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {"id":id},
        dataType: "json",
        // contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //下拉框赋值
                if(result.data.wastescategory!=null){
                    $("#wastescategory1").selectpicker('val',result.data.wastescategory.code)
                }
                if(result.data.characteristic!=null){
                    $("#characteristic1").selectpicker('val',result.data.characteristic.code)
                }

                $("#industry").val(result.data.industry)

                $("#code").val(result.data.code)

                $("#description").val(result.data.description)

                $("#id").html(result.data.id)

            }
            else {

                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常!")
        }
    })
}

//修改
function adjust() {

    var data={
        wastescategory:{code:$("#wastescategory1").selectpicker('val')},
        description:$('#description').val(),
        characteristic:{code:$("#characteristic1").selectpicker('val')},
        industry:$('#industry').val(),
        id:$('#id').html(),
    }
    $.ajax({
        type: "POST",
        url: "updateWastesManger",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#modalId2").modal('hide');
            }
            else {
                alert(result.message)
            }
        },
        error:function (result) {
            alert("服务器异常!")
        }

    })
    console.log(data)

}

$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchWastesManger();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchWastesManger();      //
            }
        }, 600);
    });
});

//高级查询
function searchWastesManger() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {

        data1 = {
            page: page,
            wastescategory:{code:$('#search-wastescategory').selectpicker('val')},
            characteristic:{code:$('#search-characteristic').selectpicker('val')},
            code:$('#search-code').selectpicker('val'),
            industry:$.trim($('#search-industry').val()),
        };
    }
    else {
        var keywords = $.trim($("#searchContent").val());
        data1 = {
            page: page,
            keywords: keywords
        }
    }


    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchWastesManger",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setPageClone(result)
                    setPageCloneAfter(pageNumber);        // 重新设置页码
                } else {
                    alert(result.message);

                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器错误！");
            }
        });
    }
    console.log(data1)
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchWastesManger();      //
    }
}