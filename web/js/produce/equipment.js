/**
 * 全选复选框
 */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}

/**
 * 重置搜索数据
 */
function reset() {
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    window.location.reload();
    //$("#senior").find("select").get(0).selectedIndex = -1;
}

function getDocNumber(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}
/**
 * 模态框数据填充
 */
function viewEquipment(item) {
    var number = getDocNumber(item);   //number为单据号
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipment",            // url
        async: false,
        dataType: "json",
        data: {
            documentNumber: number
        },
        success: function (result) {
            if (result != undefined ) {//&& result.status == "success"
                console.log(result);
                viewEquipment1(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 模态框及数据
 */
function viewEquipment1(data) {
    var tr = $("#cloneTr2");//克隆一行
    //tr.siblings().remove();
    tr.siblings().remove();
    $.each(data, function (index,item) {
        var obj = eval(item);
        console.log(obj);
        var clonedTr = tr.clone();
        // 赋值
        clonedTr.find("td[name='documentNumber']").text(index+1);//index + 1
        clonedTr.find("td[name='equipment']").text(obj.equipment.name);
        clonedTr.find("td[name='runningTime']").text(obj.runningTime);
        clonedTr.find("td[name='stopTime']").text(obj.stopTime);
        clonedTr.find("td[name='stopResult']").text(obj.stopResult);
        clonedTr.find("td[name='note']").text(obj.note);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
    $('#view1Modal').modal('show');
}

/**
 * 页面数据填充
 */
function listEquipment() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listEquipment",            // url
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setEquipment(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
}

/**
 * 加载表格数据
 * */
function setEquipment(data) {
    var tr = $("#cloneTr1");//克隆一行
    //tr.siblings().remove();
    tr.siblings().remove();
    $.each(data, function (index,item) {
        var obj = eval(item);
        var clonedTr = tr.clone();
        // 赋值
        clonedTr.find("td[name='documentNumber']").text(obj.documentNumber);//index + 1
        clonedTr.find("td[name='creator']").text(obj.creator);
        clonedTr.find("td[name='dayTime']").text(getTimeStr(obj.dayTime));
        clonedTr.find("td[name='createDept']").text(obj.createDept);
        clonedTr.find("td[name='editor']").text(obj.editor);
        clonedTr.find("td[name='editTime']").text(getTimeStr(obj.editTime));
        clonedTr.find("td[name='note']").text(obj.note);
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
}

// var validator = $("")
// /**
//  * 新增数据
//  */
// function addEquipment() {
//     var addType = $("input[name='checkbox1']:checked").val();
//     if (validator.form()) {
//         var data = {
//             id: $("#id").val(),
//             equipment: $("#equipment").val(),
//             runningTime: $("#runningTime").val(),
//             stopTime: $("#stopTime").val(),
//             reason: $("#reason").val(),
//             creator: $("#creator").val(),
//             dayTime: $("#dayTime").val(),
//             createDept: $("#createDept").val(),
//             editor: $("#editor").val(),
//             editTime: $("#editTime").val(),
//             note: $("#note").val()
//         };
//         // 上传用户数据
//         $.ajax({
//             type: "POST",                            // 方法类型
//             url: "addEquipment",                     // url
//             async: false,                            // 同步：意思是当有返回值以后才会进行后面的js程序
//             data: JSON.stringify(data),
//             dataType: "json",
//             contentType: "application/json; charset=utf-8",
//             success: function (result) {
//                 if (result != undefined) {
//                     if (result.status == "success") {
//                         alert(result.message);
//                         if (addType == "continue") window.location.reload();
//                         else $(location).attr('href', 'equipment.html');//跳转
//                     } else {
//                         console.log(result);
//                         alert(result.message);
//                     }
//                 }
//             },
//             error: function (result) {
//                 console.log("error: " + result);
//                 alert("服务器异常!");
//             }
//         });
//     }
// }

//克隆行方法
function addNewLine() {
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7)").find("input").val("");
    // 获取编号
    var id = $("#plusBtn").prev().children().get(0).innerHTML;
    //console.log(id);
    var id1=(id.replace(/[^0-9]/ig,""));
    var num = parseInt(id1);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    clonedTr.children("td:not(0)").find("input,select").each(function () {
        var name = $(this).prop('name');
        var newName = name.replace(/[0-9]\d*/, num-1);
        //console.log(newName);
        $(this).prop('name', newName);
    });
    clonedTr.insertAfter(tr);
    var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
    clonedTr.children("td:eq(0)").prepend(delBtn);

}

//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
}

//保存功能
function addEquipment() {
    var data = {
            documentNumber: $("#documentNumber").val(),
            creator: $("#creator").val(),
            dayTime: $("#dayTime").val(),
            createDept: $("#createDept").val(),
            editor: $("#editor").val(),
            editTime: $("#editTime").val(),
            note: $("#note").val(),

        };
    $.ajax({
        type: "POST",                       // 方法类型
        url: "addEquipment",            // url
        async: false,
        data:JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    console.log(data);
   $('.myclass').each(function () {
       var dataItem={
           equipment: $('#equipment').selectpicker('val'),
           runningTime:$(this).children('td').eq(2).children('input').val(),
           stopTime:$(this).children('td').eq(3).children('input').val(),
           stopResult: $(this).children('td').eq(4).children('input').val()
       };
       console.log(dataItem);
       $.ajax({
           type: "POST",                       // 方法类型
           url: "addEquipmentItem",            // url
           async: false,
           data:JSON.stringify(dataItem),
           dataType: "json",
           contentType: 'application/json;charset=utf-8',
           success: function (result) {
               if (result != undefined && result.status == "success") {
                   console.log(result);
                   window.location.href = "equipment.html";
               } else {
                   console.log(result.message);
               }
           },
           error: function (result) {
               console.log("error: " + result);
               console.log("失败");
           }
       });
   });
}

//生成单据号
function createDocNumber() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "createDocNumber",            // url
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                $('#documentNumber').val(result.DocNumberId);

            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSeniorSelectList();
}
function stopping() {
    var key = parseFloat($("#runningTime0").val());
    if(key <= 24){
        $("#stopTime0").val(String(24-key));
    }else{
        alert("请输入小于24的小时数！")
    }
}
var isSearch = false;
function countValue() {
    var mySelect = document.getElementById("count");
    var index = mySelect.selectedIndex;
    return mySelect.options[index].text;
}
//查询功能(精确查询)
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    var data;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            documentNumber: $("#search-documentNumber").val(),//单据号
            creator: $("#search-creator").val(),//创建人
            createDept: $("#search-createDept").val(),//创建部门
            editor: $("#search-editor").val(),//修改人
            page: page
        };
        //console.log(data);
    }
    // 模糊查询
    else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
        console.log(data);
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchEquipment",             // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var obj=eval(result.data);
                //var n=result.length;
                setDataList(result.data);
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
//填充下拉框数据
function setSeniorSelectList() {
    //设置状态下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentNameList",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var state = $("#equipment");
                state.children().remove();
                $.each(data.equipmentList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    state.append(option);
                });
                state.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}
/**
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    if(pageNumber>totalPage()){
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "equipmentListPage",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    setEquipment(result.data);
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
            url: "searchEquipment",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setEquipment(result.data);
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
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页：" + pageNumber);
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
        addPageClass(pageNumber);           // 设置页码标蓝
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "equipmentListPage",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setBurnOrderList(result.data);
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
                url: "searchEquipment",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setBurnOrderList(result.data);
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
                case (1):
                    $(this).html(obj.documentNumber);
                    break;
                case (2):
                    $(this).html(obj.creator);
                    break;
                case (3):
                    $(this).html(getTimeStr(obj.dayTime));
                    break;
                case (4):
                    $(this).html(obj.createDept);
                    break;
                case (5):
                    $(this).html(obj.editor);
                    break;
                case (6):
                    $(this).html(getTimeStr(obj.editTime));
                    break;
                case (7):
                    $(this).html(obj.note);
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
/**
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setDataList(result);
    console.log(result);
    var total = totalPage();
    $("#next").prev().hide();
    var st = "共" + total + "页";
    $("#totalPage").text(st);
    var myArray = [];
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
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalEquipmentRecord",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
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
    } else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchEquipmentTotal",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
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
    var count = countValue();                         // 可选
    return loadPages(totalRecord, count);
}
/**
 * 分页 获取首页内容
 * */
function loadPageList() {
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "equipmentListPage",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
            console.log("失败");
        }
    });
    isSearch = false;
}
var currentPage = 1;

/**
 * 计算分页总页数
 * @param totalRecord
 * @param count
 * @returns {number}
 */
function loadPages(totalRecord, count) {
    if (totalRecord === 0) {
        window.alert("总记录数为0，请检查！");
        return 0;
    }
    else if (totalRecord % count === 0)
        return totalRecord / count;
    else
        return parseInt(totalRecord / count) + 1;
}