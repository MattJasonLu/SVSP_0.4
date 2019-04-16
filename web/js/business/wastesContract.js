/**危险废物处置合同脚本文件
 * **/

var isSearch = false;
var currentPage = 1;                          //当前页数
var data1;


/**
 * 返回count值
 * */
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}

function keyLogin(){
    if (event.keyCode==13)  //回车键的键值为13
        document.getElementById("input1").click(); //调用登录按钮的登录事件
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalStockRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            success: function (result) {
                // console.log(result);
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchDisposalContractCount",                  // url
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
    return loadPages(totalRecord, count);
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setWastesContractList(result);
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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
}

/**
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {

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
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) { //分页用的
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageStockList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setStockList(result);
                } else {
                    console.log("fail: " + result);
                    // setClientList(result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
                // setClientList(result);
            }
        });
    }
    if (isSearch) {//查询用的
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchDisposalContractCount",                  // url
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

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    $("#current").find("a").text("当前页：" + pageNumber);
    if (pageNumber == null || pageNumber == undefined) {
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
                url: "loadPageStockList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setStockList(result);
                    } else {
                        console.log("fail: " + result);
                        // setClientList(result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                    // setClientList(result);
                }
            });
        }
        if (isSearch) {//查询用的
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchDisposalContractCount",                  // url
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


/*页面加载*/
function loadWastesContractList() {
    loadNavigationList();   // 设置动态菜单
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadWastesContractList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == 'success') {
                console.log(result);
                 setPageClone(result);
                setPageCloneAfter(pageNumber);        // 重新设置页码
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
}

function setWastesContractList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data,function (index,item) {
        var clonedTr = tr.clone();
        clonedTr.attr('class', 'myclass');
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (1):
                    $(this).html(index+1);
                    break;
                // 创建日期
                case (2):
                    $(this).html(getDateStr(obj.nowTime));
                    break;
                case (3):
                    if(obj.checkStateItem){
                        $(this).html((obj.checkStateItem.dictionaryItemName));
                    }
                    break;
                case (4):
                    $(this).html(obj.id);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);

    })

    // 隐藏无数据的tr
    tr.hide();
}

//查看
function view(item) {

    var id=$(item).parent().prev().html();

    localStorage.id=id;
    location.href='viewWastesContract.html'



}

//查看页面接收编号
function receptionId() {
    loadNavigationList();   // 动态菜单加载
    var id=localStorage['id'];
    console.log(id)
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesContractListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'id':id},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                var obj=eval(result.data)
                //赋值
              $('#area').val(obj.address);

                $('#H1').val(obj.hw1);

                $('#H2').val(obj.hw2);

                $('#H3').val(obj.hw3);

                $('#N1').val(obj.n1.toFixed(2));

                $('#N2').val(obj.n2.toFixed(2));

                $('#N3').val(obj.n2.toFixed(2));

                $('#N4').val(obj.totalPrice);

                localStorage.clear();
            }
        },
        error:function (result) {
        }
    })

}


//修改

function adjust(item) {

     if($(item).parent().prev().prev().html()=='已签订'){
          alert('已签订的合同无法修改!')
     }
     else {
         var id=$(item).parent().prev().html();
         localStorage.id=id;
         location.href='adjustWastesContract.html'
     }


}
//修改页面
function receptionIdAdjust() {
    loadNavigationList();   // 动态菜单加载

    var id=localStorage['id'];
    $('#id').val(id)
    console.log(id)
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesContractListById",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{'id':id},
        dataType: "json",
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result)
                var obj=eval(result.data)
                //赋值
                $('#area').val(obj.address);

                $('#H1').val(obj.hw1);

                $('#H2').val(obj.hw2);

                $('#H3').val(obj.hw3);

                $('#N1').val(obj.n1.toFixed(2));

                $('#N2').val(obj.n2.toFixed(2));

                $('#N3').val(obj.n2.toFixed(2));

                $('#N4').val(obj.totalPrice);

                localStorage.clear();
            }
        },
        error:function (result) {
        }
    })


}

//确认修改
function confirmAdjust() {

    var data={
        id:$('#id').val(),
        address:$('#area').val(),
        hw1:$("#H1").val(),
        hw2:$("#H2").val(),
        hw3:$("#H3").val(),
        n1:$("#N1").val(),
        n2:$("#N2").val(),
        n3:$("#N3").val(),
        totalPrice:$("#N4").val(),
    };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateWastesContract",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert("修改成功！")
                window.location.href="wastesContractList.html";
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    })
}







//添加处置合同
function save() {

    var data={
        address:$('#area').val(),
        hw1:$("#H1").val(),
        hw2:$("#H2").val(),
        hw3:$("#H3").val(),
        n1:$("#N1").val(),
        n2:$("#N2").val(),
        n3:$("#N3").val(),
        totalPrice:$("#N4").val(),
    };

    $.ajax({
        type: "POST",                       // 方法类型
        url: "addWastesContract",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                alert("危险废物处置合同添加成功！")
                window.location.href="wastesContractList.html";
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
        
    })



}

//签订合同
function signed(item) {

    var id=$(item).parent().prev().html();

    if(confirm('确认签订合同?')){
        $.ajax({
            type: "POST",
            url: "signDisposalContract",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message)
                    window.location.reload()
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
}

//作废合同
function cancel(item) {
    var id=$(item).parent().prev().html();

    if(confirm('确认作废合同?')){
        $.ajax({
            type: "POST",
            url: "cancelDisposalContract",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {'id': id},
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    alert(result.message)
                    window.location.reload()
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
}


$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if (last - event.timeStamp == 0) {
                searchDisposalContract();
            } else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchDisposalContract();      //
            }
        }, 600);
    });
});
//查询
function searchDisposalContract() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        var checkState = $('#search-checkState').val()

        if (checkState.length <= 0) {
            checkState = null;
        }
        data1 = {
            beginTime:$('#search-beginTime').val(),
            endTime:$('#search-endTime').val(),
            page: page,
            checkStateItem:{dataDictionaryItemId:checkState}

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
            url: "searchDisposalContract",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result)
                    setPageClone(result)
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
        searchDisposalContract();      //
    }
}