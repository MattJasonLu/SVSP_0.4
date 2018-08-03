/**
 * Created by matt on 2018/7/30.
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
/**********************客户部分**********************/
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
            url: "searchStockTotal",                  // url
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
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setStockList(result);
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
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageClientList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setClientList(result);
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
    } else {
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchClient",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setClientList(result.data);
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
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        if (!isSearch) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "loadPageClientList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setClientList(result);
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
                url: "searchClient",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setClientList(result.data);
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
    }
}

/**
 * 分页 获取首页内容
 * */
function loadPageStocktList() {
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageStocktList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined&&result.status=='success') {
                console.log(result);
                setPageClone(result.stocktList);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    // 设置高级检索的下拉框数据
    setSeniorSelectedList();
    isSearch = false;
}

/**
 * 设置库存数据
 * @param result
 */
function setStockList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        var _index = index;
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 库存编号
                case (1):
                    $(this).html(obj.stockId);
                    break;
                // 产废单位联系人
                case (2):
                    $(this).html(obj.proContactName);
                    break;
                // 产废单位联系电话
                case (3):
                        $(this).html(obj.proTelephone);
                    break;
                // 申报状态
                case (4):
                    if (obj.checkState != null) {
                        $(this).html(obj.checkState.name);
                    }
                    break;
                // 运输公司
                case (5):
                    if(obj.selfEmployed==false){
                        $(this).html(obj.transport);
                    }
                    else
                        $(this).html("");
                    break;
                // 公司联系电话
                case (6):
                    if(obj.selfEmployed==false){
                        $(this).html(obj.transportTelephone);
                    }
                    else
                        $(this).html("");
                    break;
                // 运输车车牌号
                case (7):
                    if(obj.selfEmployed==false){
                        $(this).html(obj.plateNumber);
                    }
                else $(this).html("");
                    break;
                // case (8):
                //     if (obj.clientType != null)
                //         $(this).html(obj.clientType.name);
                //     break;
                // 操作
//                    case (9):
//                        if(obj.clientState.name == "已启用"){
//                            if(obj.checkState.name == "已完成"){
//                                $(this).children().eq(1).attr("class","disabled");
//                                $(this).children().eq(1).removeAttr("onclick");
//                                $(this).children().eq(2).attr("class","disabled");
//                                $(this).children().eq(2).removeAttr("onclick");
//                                $(this).children().eq(3).attr("class","disabled");
//                                $(this).children().eq(3).removeAttr("onclick");
//                                $(this).children().eq(4).attr("class","disabled");
//                                $(this).children().eq(4).removeAttr("onclick");
//                                $(this).children().eq(6).attr("class","disabled");
//                                $(this).children().eq(6).removeAttr("onclick");
//                            }else if(obj.checkState.name == "审批中"){
//                                $(this).children().eq(1).attr("class","disabled");
//                                $(this).children().eq(1).removeAttr("onclick");
//                                $(this).children().eq(2).attr("class","disabled");
//                                $(this).children().eq(2).removeAttr("onclick");
//                                $(this).children().eq(4).attr("class","disabled");
//                                $(this).children().eq(4).removeAttr("onclick");
//                            }else{
//                                $(this).children().eq(1).attr("class","disabled");
//                                $(this).children().eq(1).removeAttr("onclick");
//                                $(this).children().eq(4).attr("class","disabled");
//                                $(this).children().eq(4).removeAttr("onclick");
//                                $(this).children().eq(6).attr("class","disabled");
//                                $(this).children().eq(6).removeAttr("onclick");
//                            }
//                        }else{
//                            $(this).children().eq(0).attr("class","disabled");
//                            $(this).children().eq(0).removeAttr("onclick");
//                            $(this).children().eq(4).attr("class","disabled");
//                            $(this).children().eq(4).removeAttr("onclick");
//                            $(this).children().eq(6).attr("class","disabled");
//                            $(this).children().eq(6).removeAttr("onclick");
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

/**
 * 查找申报信息
 */
function searchStock() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            stockId: $("#search-stockId").val(),//库存编号
            proContactName: $("#search-proContactName").val(),//产废单位联系人
            proTelephone: $("#search-proTelephone").val(),//产废单位联系电话
            transport: $("#search-transport").val(),//运输公司
            transportTelephone: $("#search-transportTelephone").val(),//运输公司电话
            plateNumber: $("#search-plateNumber").val(),//车牌号
            checkState: $("#search-checkState").val(),//审核状态
            page: page
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
        url: "searchStock",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result.data);
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

/**
 * 8位危废代码获取
 */
function init1() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        style: 'btn-info',
        size: 4
    });//下拉框样式
    $("#transport1").show();//三个文本框隐藏
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWastesInfoList",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result.data);
                // 各下拉框数据填充
                var wastesInfoList = $("#code");
                // 清空遗留元素
                wastesInfoList.children().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.code);
                    option.text(item.code);
                    wastesInfoList.append(option);
                });
                wastesInfoList.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.log(result);
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//判断是否是自运单位
function judge() {
    var s= $('input[type=checkbox]:checked').val();
    if(s=='on'){
        $("#transport1").hide(1000);
    }
    else {
        $("#transport1").show(1000);

    }
}
//判断是否是自运单位修改
function judge1() {
    var s = $('#selfEmployed').prop('checked');
    if(s==true){
        $("#transport1").hide(1000);
    }
    else {
        $("#transport1").show(1000);
    }
}
//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
}
//保存库存信息
function save() {
    //收集数据
    var data={
        'proContactName':$("#proContactName").val(),//产废单位联系人
        'proTelephone':$("#proTelephone").val(),//产废联系人电话
        'transport':$("#transport").val(),//运输公司
        'transportTelephone':$("#transportTelephone").val(),//运输公司联系电话
        'plateNumber':$("#plateNumber").val(),//车牌号
        'selfEmployed':$('#selfEmployed').prop('checked')
    };
    data['wastesList']=[];
    // 危废的数量
    var wastesListCount = $("input[name^='wastesList'][name$='name']").length;
    for (var i = 0; i < wastesListCount; i++) {
        var $i = i;
        var wastes = {};
        wastes.name = $("input[name='wastesList[" + $i + "].name']").val();
        wastes.code=$("select[name='wastesList[" + $i + "].code']").selectpicker('val');
        wastes.wasteAmount=$("input[name='wastesList[" + $i + "].wasteAmount']").val();
        wastes.component=$("input[name='wastesList[" + $i + "].component']").val();
        wastes.remarks=$("input[name='wastesList[" + $i + "].remarks']").val();
        data['wastesList'].push(wastes);
    }
    $.ajax({
        type:'POST',
        url:"addStock",
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        success:function (result) {

            if(result!=null){
                alert("添加成功!");
               location.href="stockManage.html";

            }
            else{
                alert("添加失败")
            }
        },
        error:function (result) {

        }
    });


}
//克隆行方法
function addNewLine() {
    // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(3),td:eq(4),td:eq(5)").find("input").val("");
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
//修改库存信息页面跳转
function adjustStock(item){
   var stockId= item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    //1页面跳转到修改页面
    localStorage.stockId=stockId;
    console.log(localStorage.stockId);
    location.href="adjustStock.html";
}
//修改页面的初始
function loadAdjustStock() {
    //获取申报编号
   var stockId =localStorage['stockId'];
   $('#stockId').prop("value",stockId);
   console.log("here");
  //通过ajax 根据id获取信息
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getStockById",                  // url
        dataType: "json",
        data:{'stockId':stockId},
        success:function (result) {
      if(result!=undefined&&result.status=='success'){
          var obj=eval(result.stock);
          var data=eval(result.data);
          console.log(obj);
          //1开始赋值
          //产废单位联系人
          $('#proContactName').prop('value',obj.proContactName);
          //产废联系人电话
          $('#proTelephone').prop('value',obj.proTelephone);
          //运输公司
          $('#transport').prop('value',obj.transport);
          //运输公司联系电话
          $('#transportTelephone').prop('value',obj.transportTelephone);
          //车牌号
          $('#plateNumber').prop('value',obj.plateNumber);
          //赋值是否自运单位
          $('#selfEmployed').prop('checked',obj.selfEmployed);
          //各下拉框数据填充
          var wastesInfoList = $("#code");
          // 清空遗留元素
          wastesInfoList.children().remove();
          $.each(data, function (index, item) {
              var option = $('<option />');
              option.val(item.code);
              option.text(item.code);
              wastesInfoList.append(option);
          });
          wastesInfoList.removeAttr('id');
          $('.selectpicker').selectpicker('refresh');
          for(var i=0;i<obj.wastesList.length;i++){
              if (i > 0)
                  addNewLine();
              var $i = i;
              $("input[name='wastesList[" + $i + "].name']").val(obj.wastesList[i].name);//危险废物的名称
              $("input[name='wastesList[" + $i + "].wasteAmount']").val(obj.wastesList[i].wasteAmount);//危废数量
              $("input[name='wastesList[" + $i + "].component']").val(obj.wastesList[i].component);//成分
              $("input[name='wastesList[" + $i + "].remarks']").val(obj.wastesList[i].remarks);//备注
          }
      }
      else
      {
          alert(result.message);
      }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });



}
//修改页面方法
function adjustStock1() {
    var data={
        'proContactName':$("#proContactName").val(),//产废单位联系人
        'proTelephone':$("#proTelephone").val(),//产废联系人电话
        'transport':$("#transport").val(),//运输公司
        'transportTelephone':$("#transportTelephone").val(),//运输公司联系电话
        'plateNumber':$("#plateNumber").val(),//车牌号
        'stockId':$("#stockId").val(),//库存编号
       'selfEmployed':$('#selfEmployed').prop('checked'),
    };
    data['wastesList']=[];
    var wastesListCount = $("input[name^='wastesList'][name$='name']").length;
    for (var i = 0; i < wastesListCount; i++) {
        var $i = i;
        var wastes = {};
        wastes.name = $("input[name='wastesList[" + $i + "].name']").val();
        wastes.code=$("select[name='wastesList[" + $i + "].code']").selectpicker('val');
        wastes.wasteAmount=$("input[name='wastesList[" + $i + "].wasteAmount']").val();
        wastes.component=$("input[name='wastesList[" + $i + "].component']").val();
        wastes.remarks=$("input[name='wastesList[" + $i + "].remarks']").val();
        data['wastesList'].push(wastes);
    }
    $.ajax({
        type:'POST',
        url:"adjust1Stock",
        data:JSON.stringify(data),
        async: false,
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if(result!=null){
                alert("修改成功!");
                location.href="stockManage.html";

            }
            else{
                alert("添加失败")
            }
        },
        error:function (result) {

        }
    });
}
function allSelect1() {
        var isChecked = $('#allSel1').prop('checked');
        console.log(isChecked);
        if (isChecked) $("input[name='blankCheckbox1']").prop('checked', true);
        else $("input[name='blankCheckbox1']").prop('checked', false);
    }//提交
function contractSubmit() {
    //在此提交
    var items = $("input[name='blankCheckbox1']:checked");//判断复选框是否选中
    if (items.length > 0) {
        function getContractById(id) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "submitStock",              // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {
                    'stockId': id
                },
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                    } else {
                        alert(result.message)
                    }
                },
                error: function (result) {
                    alert("服务器异常！");
                    console.log("error: " + result);
                }
            });
        }

        items.each(function () {//遍历
            var id = getContractId1(this);//获得合同编号
            //console.log(id);
            getContractById(id);

        });
        alert("提交成功!");
        location.reload();
    }
    else {
        alert("请勾选要提交的合同！")
    }
}
//获取编号
function getContractId1(item) {
    return item.parentElement.parentElement.nextElementSibling.innerHTML;
}
//作废
function cancel(item) {
    //查看合同编号
    var stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var r = confirm("是否作废该合同？");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "cancelStock",
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"stockId": stockId},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    alert("作废成功！");
                    location.reload();
                }
                else {
                    alert("作废失败")
                    location.reload();
                }
            },
            error: function (result) {
                alert("服务器异常！")
            }
        });
    }
    else {
        alert("取消作废")
    }
}
//查看
function viewStock(item) {
    //查看页面 审批隐藏 打印显示 驳回隐藏
    $('#btn').hide();//审批隐藏
    $('#print').show();//打印显示
    $('#back').hide();
    //申报编号
   var stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getStockById",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'stockId': stockId
        },
        success: function (result)  {
            if (result != undefined && result.status == "success") {
          console.log(result.stock);
          var obj=result.stock;
           //1赋值
                //产废单位联系人
                if(obj.selfEmployed==false){//说明不是自运单位
                    $('#transport').text(obj.transport);//运输公司
                    $('#plateNumber').text(obj.plateNumber);//车牌号
                    $('#transportTelephone').text(obj.transportTelephone);//运输公司联系方式
                }
                if(obj.selfEmployed==true){//说明不是自运单位
                    $('#transport').text("");//运输公司
                    $('#plateNumber').text("");//车牌号
                    $('#transportTelephone').text("");//运输公司联系方式
                }
                //赋值产废单位联系人
                $('#proContactName').text(obj.proContactName);
                //赋值产废单位电话
                $('#proTelephone').text(obj.proTelephone);
                //赋值是否自运单位
                $('#selfEmployed').prop('checked',obj.selfEmployed);
                for(var i=0;i<obj.wastesList.length;i++){
                    if (i > 0) addWastesNewLine();
                    var $i = i;
                    $("input[name='wastesList[" + $i + "].name']").val(obj.wastesList[i].name);//废物名称
                    $("input[name='wastesList[" + $i + "].code']").val(obj.wastesList[i].code);//废物编码
                    $("input[name='wastesList[" + $i + "].wasteAmount']").val(obj.wastesList[i].wasteAmount);//废物数量
                    $("input[name='wastesList[" + $i + "].component']").val(obj.wastesList[i].component);//成分
                    $("input[name='wastesList[" + $i + "].remarks']").val(obj.wastesList[i].remarks);//备注
                }


            } else {
               alert(result.message);
                $("#modal3_contactName").text("");
                $("#modal3_contractState").text("");
                $("#modal3_contractVersion").text("");
                $("#modal3_companyName").text("");
                $("#modal3_contactName").text("");
                $("#modal3_contractId").text("");
                $("#modal3_beginTime").text("");
                $("#modal3_endTime").text("");
                $("#modal3_area").text("");
                $("#modal3_telephone").text("");
                $("#modal3_order").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#stockInfoForm').modal('show');

}
//添加危废列表新行
function addWastesNewLine() {
var tr=$('#cloneTr1');
    // 克隆tr，每次遍历都可以产生新的tr
   var clonedTr=tr.clone();
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    var num = parseInt(id);
    num++;
    clonedTr.children().get(0).innerHTML = num;
    var temp = num-2+"";
    var temp2 = num-1+"";
    clonedTr.find("input[name='wastesList[" + temp + "].name']").attr('name', "rawWastes[" + temp2 + "].name");
    clonedTr.find("input[name='wastesList[" + temp + "].code']").attr('name', "rawWastes[" + temp2 + "].code");
    clonedTr.find("input[name='wastesList[" + temp + "].wasteAmount']").attr('name', "rawWastes[" + temp2 + "].wasteAmount");
    clonedTr.find("input[name='wastesList[" + temp + "].component']").attr('name', "rawWastes[" + temp2 + "].component");
    clonedTr.find("input[name='wastesList[" + temp + "].remarks']").attr('name', "rawWastes[" + temp2 + "].remarks");
    clonedTr.addClass("newLine");
    clonedTr.insertAfter(tr);
    
}
//审批
function approval(item) {
    //出现模态框和查看一个效果
    //审批显示 打印隐藏 驳回显示
    $('#btn').show();//审批显示
    $('#print').hide();//打印隐藏
    $('#back').show();
     stockId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getStockById",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'stockId': stockId
        },
        success: function (result)  {
            if (result != undefined && result.status == "success") {
                console.log(result.stock);
                var obj=result.stock;
                //1赋值
                //产废单位联系人
                if(obj.selfEmployed==false){//说明不是自运单位
                    $('#transport').text(obj.transport);//运输公司
                    $('#plateNumber').text(obj.plateNumber);//车牌号
                    $('#transportTelephone').text(obj.transportTelephone);//运输公司联系方式
                }
                if(obj.selfEmployed==true){//说明不是自运单位
                    $('#transport').text("");//运输公司
                    $('#plateNumber').text("");//车牌号
                    $('#transportTelephone').text("");//运输公司联系方式
                }
                //赋值产废单位联系人
                $('#proContactName').text(obj.proContactName);
                //赋值产废单位电话
                $('#proTelephone').text(obj.proTelephone);
                //赋值是否自运单位
                $('#selfEmployed').prop('checked',obj.selfEmployed);
                //赋值审批意见
                $('#opinion').val(obj.opinion);
                //赋值驳回意见
                $('#backContent').val(obj.backContent);
                for(var i=0;i<obj.wastesList.length;i++){
                    if (i > 0) addWastesNewLine();
                    var $i = i;
                    $("input[name='wastesList[" + $i + "].name']").val(obj.wastesList[i].name);//废物名称
                    $("input[name='wastesList[" + $i + "].code']").val(obj.wastesList[i].code);//废物编码
                    $("input[name='wastesList[" + $i + "].wasteAmount']").val(obj.wastesList[i].wasteAmount);//废物数量
                    $("input[name='wastesList[" + $i + "].component']").val(obj.wastesList[i].component);//成分
                    $("input[name='wastesList[" + $i + "].remarks']").val(obj.wastesList[i].remarks);//备注
                }


            } else {
                alert(result.message);
                $("#modal3_contactName").text("");
                $("#modal3_contractState").text("");
                $("#modal3_contractVersion").text("");
                $("#modal3_companyName").text("");
                $("#modal3_contactName").text("");
                $("#modal3_contractId").text("");
                $("#modal3_beginTime").text("");
                $("#modal3_endTime").text("");
                $("#modal3_area").text("");
                $("#modal3_telephone").text("");
                $("#modal3_order").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#stockInfoForm').modal('show');//出现第一个模态框
}
//审批界面和驳回界面
function showApproval(){
    $('#contractInfoForm3').modal('show');
}
function showBack(){
    $('#contractInfoForm4').modal('show');
}
//把按钮功能分出来做这个是审批
function confirm1() {
    opinion = $('#opinion').val();
    //console.log(opinion);
    //1获取文本框的值
    $.ajax({
        type: "POST",
        url: "approvalStock",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'stockId': stockId, 'opinion': opinion},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
            }
            else {
                alert("审批失败")
            }
            location.reload();
        },
        error: function (result) {
            alert("服务器异常！")
        }

});
}
//把按钮功能分出来做这个是驳回
function back1() {
    backContent = $('#backContent').val();
    //设置状态驳回
    $.ajax({
        type: "POST",
        url: "backStock",
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {'stockId': stockId, 'backContent': backContent},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                alert(result.message);
            }
            else {
                alert(result.message)
            }
            location.reload();
        },
        error: function (result) {
            alert("服务器异常！")
        }
    });
}