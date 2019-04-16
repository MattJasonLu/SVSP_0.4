/**
 * 全选复选框
 */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}

/**
 * 删除设备
 */
/**
 * 删除用户
 * @param item
 */
function deleteEquipment(item) {
    var r = confirm("是否删除该设备？");
    if (r == true) {
        var documentNumber = getDocNumber(item);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "deleteEquipment",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'documentNumber': documentNumber
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    console.log("success: " + result);
                    alert("删除成功");
                    $("#pageNumber").val(currentPage);   // 设置当前页页数
                    inputSwitchPage();  // 跳转当前页
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
    }
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
        if (obj.equipmentDataItem != null)
        clonedTr.find("td[name='equipment']").text(obj.equipmentDataItem.dictionaryItemName);
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
           equipmentDataItem: {dataDictionaryItemId:$(this).children('td').eq(1).find('select').val()},
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
                   alert(result.message);
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
    loadNavigationList();    // 设置动态菜单
    // 设置单据号
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
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCurrentUserInfo",            // url
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var user = eval(result.data);
                $('#editor').val(user.name);
                $('#creator').val(user.name);

            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    // 设置创建日期
    $("#dayTime").val(getNowDate());
    $("#editTime").val(getNowDate());
    // 设置编辑日期
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
            documentNumber: $.trim($("#search-documentNumber").val()),//单据号
            creator: $.trim($("#search-creator").val()),//创建人
            createDept: $.trim($("#search-createDept").val()),//创建部门
            editor: $.trim($("#search-editor").val()),//修改人
            page: page
        };
    }
    // 模糊查询
    else {
        data = {
            keyword: $.trim($("#searchContent").val()),
            page: page
        };
    }
    console.log(data);
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
        url: "getEquipmentByDataDictionary",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var state = $("#equipment");
                state.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
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
    setPageCloneAfter(pageNumber);        // 重新设置页码
    addPageClass(pageNumber);           // 设置页码标蓝
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
        setPageCloneAfter(pageNumber);        // 重新设置页码
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
                    $(this).html(getDateStr(obj.dayTime));
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
        clonedLi.find('a:first-child').click(function
            () {
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
    loadNavigationList();   // 动态菜单部署
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
                setPageCloneAfter(pageNumber);        // 重新设置页码
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

/**
 * 导入excel文件
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importEquipmentExcel",              // url
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

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/设备管理导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导出excel
 */
function exportExcel() {
    var name = 't_rp_equipment';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"),function(index,item){
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select a.documentNumber,a.creator,a.dayTime,a.createDept,a.editor,a.editTime,a.note,c.dictionaryItemName,b.runningTime,b.stopTime,b.stopResult from  t_rp_equipment a join t_rp_equipmentchild b  on a.documentNumber=b.documentNumber join datadictionaryitem c on c.dataDictionaryItemId=b.equipmentId and    a.documentNumber" + sql;
    }else {          // 若无勾选项则导出全部
        sqlWords = "select a.documentNumber,a.creator,a.dayTime,a.createDept,a.editor,a.editTime,a.note,c.dictionaryItemName,b.runningTime,b.stopTime,b.stopResult from  t_rp_equipment a join t_rp_equipmentchild b  on a.documentNumber=b.documentNumber join datadictionaryitem c on c.dataDictionaryItemId=b.equipmentId ";
    }
    console.log("sql:"+sqlWords);
    window.open('exportExcelEquipment?name=' + name + '&sqlWords=' + sqlWords);
}

/**
 * 显示编辑框
 * @param e
 */
function showEditModal(e) {
    // 清楚残留行
    $(".addTr").remove();
    var number = getDocNumber(e);   //number为单据号
    //设置状态下拉框
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getEquipmentByDataDictionary",        // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                console.log(result);
                // 高级检索下拉框数据填充
                var state = $("#editTr").find("select[name='equipment']");
                state.children().remove();
                $.each(data.data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.dataDictionaryItemId);
                    option.text(item.dictionaryItemName);
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
                var obj = eval(result.data);
                var editTr = $("#editTr");
                for (var i = 0; i < obj.length; i++) {
                    var clonedTr = editTr.clone();
                    clonedTr.find("td[name='index']").text(i+1);
                    clonedTr.find("td[name='itemID']").text(obj[i].itemID);
                    clonedTr.find("select[name='equipment']").val(obj[i].equipmentDataItem.dataDictionaryItemId);
                    clonedTr.find("input[name='runningTime']").val(parseFloat(obj[i].runningTime).toFixed(2));
                    clonedTr.find("input[name='stopTime']").val(parseFloat(obj[i].stopTime).toFixed(2));
                    clonedTr.find("input[name='stopResult']").val(obj[i].stopResult);
                    editTr.parent().append(clonedTr);
                    clonedTr.addClass("addTr");
                    clonedTr.show();
                    clonedTr.removeAttr('id');
                }
                editTr.hide();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            alert("服务器异常");
        }
    });
    $("#editModal").modal("show");
}

/**
 * 修改数据
 */
function editData() {
    var data = [];
    var editTrs = $("tr[name='editTr']");
    editTrs.each(function () {
        if ($(this).attr('id') != 'editTr') {
            var item = {};
            item.itemID = $(this).find("td[name='itemID']").text();
            var equipmentDataItem={};
            equipmentDataItem.dataDictionaryItemId=$(this).find("select[name='equipment']").val();
            item.equipmentDataItem=equipmentDataItem;
            // item.equipment = $(this).find("select[name='equipment']").val();
            item.runningTime = $(this).find("input[name='runningTime']").val();
            item.stopTime = $(this).find("input[name='stopTime']").val();
            item.stopResult = $(this).find("input[name='stopResult']").val();
            data.push(item);
        }
    });
    $.ajax({
        type: "POST",                       // 方法类型
        url: "updateEquipmentItem",            // url
        async: false,
        dataType: "json",
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success" ) {
                console.log(result);
                alert(result.message);
                $("#pageNumber").val(currentPage);   // 设置当前页页数
                inputSwitchPage();  // 跳转当前页
                $("#editModal").modal("hide");
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            alert("服务器异常");
        }
    });
}