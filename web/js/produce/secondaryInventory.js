/***次生库存脚本文件****/
function reset() {
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
    loadWasteInventoryList();
}
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
var array=[];
var array1=[];
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
            url: "totalSecondaryInventory",                  // url
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
            url: "searchOutBoundTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
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
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count == 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}

/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSecondaryInventoryList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setPageClone1(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchSewage",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setSewageList(result.data);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage()  {
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "getSecondaryInventoryList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setPageClone1(result.data);
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
                url: "searchSewage",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setSewageList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
    }
}

// /**
//  * 克隆页码
//  * @param result
//  */
// function setPageClone(result) {
//     $(".beforeClone").remove();
//     setOutBoundList(result);
//     var total = totalPage();
//     $("#next").prev().hide();
//     var st = "共" + total + "页";
//     $("#totalPage").text(st);
//     var myArray = new Array();
//     for (var i = 0; i < total; i++) {
//         var li = $("#next").prev();
//         myArray[i] = i + 1;
//         var clonedLi = li.clone();
//         clonedLi.show();
//         clonedLi.find('a:first-child').text(myArray[i]);
//         clonedLi.find('a:first-child').click(function () {
//             var num = $(this).text();
//             switchPage(num);
//         });
//         clonedLi.addClass("beforeClone");
//         clonedLi.removeAttr("id");
//         clonedLi.insertAfter(li);
//     }
// }

//加载次生数据==>次生库存查询输首页
function loadWasteInventoryList(){
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    if (totalPage() == 1) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
    }
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    //查询次生仓库信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSecondaryInventoryList", // url
        data: JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if(result != undefined && result.status == "success"){
                console.log(result);
                //设置危废查询列表
                setPageClone1(result.data);
                //setWasteInventoryList(result.data);
            }
            else {
                console.log(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }

    });
    isSearch = false;
    //加载进料方式列表
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getHandelCategoryList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
                var type=$('#search-type');
                type.children().remove();
                $.each(result.array1,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    type.append(option);
                })
                type.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);

            }
        },
        error:function (result) {
            alert("服务器异常！")
        },

    });
}

//危废库存查看，点击查看按钮==>次生库存
function setByInboundOrderItemId(result) {
    var tr=$('#cloneTr3');
    tr.siblings().remove();
    $.each(result.wasteInventoryList,function (index,item) {
        var clonedTr=tr.clone();
        clonedTr.show();
        clonedTr.children('td').each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                case (0):
                    $(this).html(getDateStr(obj.inboundDate));
                    break;
                case (1):
                    $(this).html(obj.produceCompany.companyName);
                    break;
                case (2):
                    if(obj.laboratoryTest.wastesName=='slag'){
                        $(this).html('炉渣');
                    }
                    if(obj.laboratoryTest.wastesName=='ash'){
                        $(this).html('飞灰');
                    }
                    if(obj.laboratoryTest.wastesName=='bucket'){
                        $(this).html('桶');
                    }
                    break;
                case (3):
                    $(this).html(obj.laboratoryTest.wastesCode);
                    break;
                case (4):
                    $(this).html(obj.actualCount);
                    break;
                case (5):
                    $(this).html(obj.handleCategory.name);
                    break;
            }
        })
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);

    })
    tr.hide();
}

//实时筛选，不用点击按钮==>次生库存
function search1(){
    switchPage(1);
    $('.myclass').each(function () {
        $(this).show();
    })
    //1分页模糊查询
    //1分页模糊查询
    array.length=0;//清空数组

    array1.length=0;

    for(var i=1;i<=totalPage();i++){
        switchPage(parseInt(i))
        array.push($('.myclass'));
    }

     var text = $('#search').val();//获取文本框输入

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(!($(this).children('td').text().indexOf(text)!=-1)){
                $(this).hide();
            }
            if($(this).children('td').text().indexOf(text)==-1){
                array1.push($(this));
            }


        });
    }

    for(var i=0;i<array1.length;i++){
        $.each(array1[i],function () {
            $('#tbody1').append(this) ;
        });
    }

    if(text.length<=0){
        switchPage(1);
        $('.myclass').each(function () {
            $(this).show();
        })
    }

}

//js版本的高级查询==>次生库存
function searchSec() {

    $('.myclass').each(function () {
        $(this).show();
    });
    //1分页模糊查询
    array.length=0;//清空数组
    array1.length=0;
    //array.push($('.myclass'));//首先获得当前页面的所有行
    for(var i=1;i<=totalPage();i++){
        switchPage(parseInt(i))
        array.push($('.myclass'));
    }
    var  inDate=$('#search-inDate').val()+"";
    var  companyName=$('#search-client').val();
    var options=$("#search-type option:selected");
    var handelCategory=options.text();
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            //console.log(this);
            if(!($(this).children('td').eq(2).text().indexOf(inDate)!=-1&&$(this).children('td').eq(3).text().indexOf(companyName)!=-1&&$(this).children('td').eq(6).text().indexOf(handelCategory)!=-1)){
                $(this).hide();
            }
            if(($(this).children('td').eq(2).text().indexOf(inDate)!=-1&&$(this).children('td').eq(3).text().indexOf(companyName)!=-1&&$(this).children('td').eq(6).text().indexOf(handelCategory)!=-1)){
               array1.push($(this));
            }
        });
    }
    for(var i=0;i<array1.length;i++){
        $.each(array1[i],function () {
            $('#tbody1').append(this) ;
        });
    }
    // if(inDate.length<=0&&companyName.length<=0&&handelCategory.length<=0){
    //     switchPage(1);
    //     $('.myclass').each(function () {
    //         $(this).show();
    //     })
    // }

    // $('.myclass').each(function () {
    //     if(!($(this).children('td').eq(2).text().indexOf(inDate)!=-1&&$(this).children('td').eq(3).text().indexOf(companyName)!=-1&&$(this).children('td').eq(6).text().indexOf(handelCategory)!=-1)){
    //         $(this).hide();
    //     }
    // });


}

//查看出库信息==>次生库存
function view(item) {
    var inboundOrderItemId=$(item).parent().prev().html();
    console.log(inboundOrderItemId);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getByInboundOrderItemId",                  // url 计算数据库的总条数
        data:{'inboundOrderItemId':inboundOrderItemId},
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                //危废库存查看，点击查看按钮
                setByInboundOrderItemId(result);
                $("#appointModal2").modal('show');
            }
            else {
                alert(result.message);
            }
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}

//设置克隆页码==>次生出库和库存页面
function setPageClone1(result) {
    $(".beforeClone").remove();
    setWasteInventoryList1(result);
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

//设置危废查询列表
function setWasteInventoryList1(result) {
    var tr=$('#cloneTr');
    tr.siblings().remove();
    tr.attr('class','myclass')
    $.each(result,function (index,item) {
        // 克隆tr，每次遍历都可以产生新的tr
        if(item.boundType.name=='次生入库'){
            var clonedTr = tr.clone();
            clonedTr.show();
            clonedTr.children("td").each(function (inner_index) {
                var obj = eval(item);
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 入库单号
                    case (1):
                        $(this).html(obj.inboundOrderId);
                        break;
                    // 入库日期
                    case (2):
                        $(this).html(getDateStr(obj.inboundDate));
                        break;
                    //产废单位
                    case (3):
                        $(this).html(obj.produceCompany.companyName);
                        break;
                    // 仓库名称
                    case (4):
                        $(this).html("");
                        break;
                    // 入库类别
                    case (5):
                        $(this).html(obj.boundType.name);
                        break;
                    // 进料方式
                    case (6):
                        $(this).html(obj.handleCategory.name);
                        break;
                    // 危废名称
                    case (7):
                        if(obj.laboratoryTest.wastesName=='slag'){
                            $(this).html('炉渣');
                        }
                        if(obj.laboratoryTest.wastesName=='ash'){
                            $(this).html('飞灰');
                        }
                        if(obj.laboratoryTest.wastesName=='bucket'){
                            $(this).html('桶');
                        }


                        break;
                    //危废类型
                    // case (8):
                    //     $(this).html(obj.wastesCategory);
                    //     break;
                    //数量
                    case (8):
                        $(this).html(obj.actualCount);
                        break;
                    //单价
                    case (9):
                        $(this).html(obj.unitPriceTax);
                        break;
                    //总价
                    case (10):
                        $(this).html(parseInt(obj.actualCount)*(obj.unitPriceTax).toFixed(2)  );
                        break;
                    //创建时间
                    case (11):
                        $(this).html(getDateStr(obj.creatorDate));
                        break;
                    case (12):
                        $(this).html(obj.inboundOrderItemId);
                        break;
                }
            });
            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    })
    tr.hide();
    tr.removeAttr('class');
}