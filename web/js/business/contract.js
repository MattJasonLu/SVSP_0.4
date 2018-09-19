/**
 * Created by JackYang on 2018/8/27.
 */

var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
//合同索引值
var contractIndex = 0;
//重置
function reset() {
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    $("#senior").find("select").get(0).selectedIndex = -1;
}
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
function totalPage(contractIndex) {
    var totalRecord = 0;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "totalContractManageRecord",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'contractIndex': contractIndex
        },
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
    //console.log(totalRecord);
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setContractList(result);
    var total = totalPage(contractIndex);
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
    console.log("当前页：" + pageNumber);
    if (pageNumber == 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber == -2) {
        pageNumber = totalPage(contractIndex);        //尾页
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
    if (pageNumber == totalPage(contractIndex)) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber > 1) {
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if (pageNumber < totalPage(contractIndex)) {
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;                   //当前页面
    page.contractIndex = contractIndex;
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageContractManageList",         // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
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
        if (pageNumber == totalPage(contractIndex)) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber > 1) {
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if (pageNumber < totalPage(contractIndex)) {
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    console.log(result);
                    setContractList(result);
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
 * 分页 获取首页内容
 * */
function loadPageContractManageList() {
    //让修改操作提交后页面刷新仍然停留在当前页面而不是刷新到首页
    var state = $("#state").find("option:selected").text();
    $('#back').hide();
    var name = localStorage['name'];
    // console.log(name);
    if (name == 'undefined' || name == "Wastes" || name == undefined) {
        $('#Wa').click();
        localStorage.clear();
        $('#toggleName').text("产废单位名称");
    }
    if (name == "Emergency") {
        $('#Em').click();
        localStorage.clear();
        //如果是物流就改为处置单位
        $('#toggleName').text("产废单位名称");
    }
    if (name == "Logistics") {
        $('#Lo').click();
        localStorage.clear();
    }
    if (name == "Derive") {
        $('#De').click();
        localStorage.clear();
    }
    if (name == "Purchase") {

    }
    //分页
    var pageNumber = 1;               // 显示首页
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
    page.contractIndex = contractIndex;
    //page.contractIndex = 0;                                    //首页默认为危废合同
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageContractManageList",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setPageClone(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    setSeniorSelectedList();
}

function  ContractListByName(item) {
    currentPage = 1;                   //在onload之后执行
    $('#state').get(0).selectedIndex = 0;
    nameBykey = item.innerHTML;
    if (nameBykey == '危废合同') {
        contractIndex = 0;
        var page = {};
        var pageNumber = 1;
        page.count = countValue();                                 // 可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        $('#toggleName').text("产废单位名称");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=gbk",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    setPageClone(result);
                    //setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (nameBykey == "应急处置合同") {
        contractIndex = 1;
        var page = {};
        var pageNumber = 1;
        page.count = countValue();                                 // 可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        $('#toggleName').text("产废单位名称");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: "application/json; charset=gbk",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (nameBykey == "物流合同") {
        //列表切换
        contractIndex = 2;
        var page = {};
        var pageNumber = 1;
        page.count = countValue();                                 // 可选
        page.pageNumber = 1;
        page.start = (pageNumber - 1) * page.count;
        page.contractIndex = contractIndex;
        $('#toggleName').text("处置单位名称");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractManageList",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(page),
            contentType: "application/json; charset=gbk",
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (item.innerHTML == "次生合同") {
        //console.log(name);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listContractByName",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: JSON.stringify(page),
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    setContractList(result);
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    }
    if (item.innerHTML == "采购合同") {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "listContractByName",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {"name": "Purchase"},
            success: function (result) {
                if (result != undefined) {
                    //alert(result);
                    //console.log(result);
                    setContractList(result);
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
//设置合同列表高级查询下拉框数据
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
//合同列表高级查询

function searchContract() {
    array.length=0;//清空数组
    array1.length=0;

    var contractId=$('#search-contractId').val();

    var companyName=$('#search-companyName').val();

    var contractName=$('#search-contractName').val();

    var telephone=$('#search-telephone').val();

    var checkState=$('#search-checkState option:selected').text();

    var suppierName=$('#search-suppierName').val();

    var contactName=$('#search-contactName').val();

    var beginTime=$('#search-beginTime').val();

    if (nameBykey == '危废合同' || nameBykey == "Wastes" || nameBykey == undefined) {
        $('#Wa').click();
        localStorage.clear();
        $('#toggleName').text("产废单位名称");
        switchPage(1);
        $('.myclass1').each(function () {
            $(this).show();
        });
        for(var i=1;i<=totalPage(contractIndex);i++){
            switchPage(parseInt(i))
            array.push($('.myclass1'));
        }
        for(var j=0;j<array.length;j++){
            $.each(array[j],function () {
                //console.log(this);
                if(!($(this).children('td').eq(1).text().indexOf(contractId)!=-1&&$(this).children('td').eq(2).text().indexOf(companyName)!=-1
                    &&$(this).children('td').eq(3).text().indexOf(contractName)!=-1&&$(this).children('td').eq(7).text().indexOf(telephone)!=-1&&
                    $(this).children('td').eq(4).text().indexOf(checkState)!=-1&&$(this).children('td').eq(8).text().indexOf(beginTime)!=-1
                    &&$(this).children('td').eq(6).text().indexOf(contactName)!=-1&&$(this).children('td').eq(2).text().indexOf(suppierName)!=-1)){
                    $(this).hide();
                }
                if(($(this).children('td').eq(1).text().indexOf(contractId)!=-1&&$(this).children('td').eq(2).text().indexOf(companyName)!=-1
                    &&$(this).children('td').eq(3).text().indexOf(contractName)!=-1&&$(this).children('td').eq(7).text().indexOf(telephone)!=-1&&
                    $(this).children('td').eq(4).text().indexOf(checkState)!=-1&&$(this).children('td').eq(8).text().indexOf(beginTime)!=-1
                    &&$(this).children('td').eq(6).text().indexOf(contactName)!=-1&&$(this).children('td').eq(2).text().indexOf(suppierName)!=-1)){
                    array1.push($(this));
                }
            });
        }
        for(var i=0;i<array1.length;i++){
            $.each(array1[i],function () {
                $('#tbody1').append(this) ;
            });
        }
        if(contractId.length<=0&&contractName.length<=0&&checkState.length<0&&contactName.length<0&&companyName.length<0&&telephone.length<0&&beginTime.length<0){
            switchPage(1);
            $('.myclass').each(function () {
                $(this).show();
            })
        }
    }

    if (nameBykey == "应急处置合同") {
        $('#Em').click();
        localStorage.clear();
        //如果是物流就改为处置单位
        $('#toggleName').text("产废单位名称");
        switchPage(1);
        $('.myclass1').each(function () {
            $(this).show();
        });
        for(var i=1;i<=totalPage(contractIndex);i++){
            switchPage(parseInt(i))
            array.push($('.myclass1'));
        }
        for(var j=0;j<array.length;j++){
            $.each(array[j],function () {
                //console.log(this);
                if(!($(this).children('td').eq(1).text().indexOf(contractId)!=-1&&$(this).children('td').eq(2).text().indexOf(companyName)!=-1
                    &&$(this).children('td').eq(3).text().indexOf(contractName)!=-1&&$(this).children('td').eq(7).text().indexOf(telephone)!=-1&&
                    $(this).children('td').eq(4).text().indexOf(checkState)!=-1&&$(this).children('td').eq(8).text().indexOf(beginTime)!=-1
                    &&$(this).children('td').eq(6).text().indexOf(contactName)!=-1&&$(this).children('td').eq(2).text().indexOf(suppierName)!=-1)){
                    $(this).hide();
                }
                if(($(this).children('td').eq(1).text().indexOf(contractId)!=-1&&$(this).children('td').eq(2).text().indexOf(companyName)!=-1
                    &&$(this).children('td').eq(3).text().indexOf(contractName)!=-1&&$(this).children('td').eq(7).text().indexOf(telephone)!=-1&&
                    $(this).children('td').eq(4).text().indexOf(checkState)!=-1&&$(this).children('td').eq(8).text().indexOf(beginTime)!=-1
                    &&$(this).children('td').eq(6).text().indexOf(contactName)!=-1&&$(this).children('td').eq(2).text().indexOf(suppierName)!=-1)){
                    array1.push($(this));
                }
            });
        }
        for(var i=0;i<array1.length;i++){
            $.each(array1[i],function () {
                $('#tbody1').append(this) ;
            });
        }
        if(contractId.length<=0&&contractName.length<=0&&checkState.length<0&&contactName.length<0&&companyName.length<0&&telephone.length<0&&beginTime.length<0){
            switchPage(1);
            $('.myclass').each(function () {
                $(this).show();
            })
        }





    }

    if (nameBykey == "物流合同") {
        $('#Lo').click();
        localStorage.clear();
        switchPage(1);
        $('.myclass1').each(function () {
            $(this).show();
        });
        for(var i=1;i<=totalPage(contractIndex);i++){
            switchPage(parseInt(i))
            array.push($('.myclass1'));
        }
        for(var j=0;j<array.length;j++){
            $.each(array[j],function () {
                //console.log(this);
                if(!($(this).children('td').eq(1).text().indexOf(contractId)!=-1&&$(this).children('td').eq(2).text().indexOf(suppierName)!=-1
                    &&$(this).children('td').eq(3).text().indexOf(contractName)!=-1&&$(this).children('td').eq(7).text().indexOf(telephone)!=-1&&
                    $(this).children('td').eq(4).text().indexOf(checkState)!=-1&&$(this).children('td').eq(8).text().indexOf(beginTime)!=-1
                    &&$(this).children('td').eq(6).text().indexOf(contactName)!=-1&&$(this).children('td').eq(2).text().indexOf(companyName)!=-1)){
                    $(this).hide();
                }
                if(($(this).children('td').eq(1).text().indexOf(contractId)!=-1&&$(this).children('td').eq(2).text().indexOf(suppierName)!=-1
                    &&$(this).children('td').eq(3).text().indexOf(contractName)!=-1&&$(this).children('td').eq(7).text().indexOf(telephone)!=-1&&
                    $(this).children('td').eq(4).text().indexOf(checkState)!=-1&&$(this).children('td').eq(8).text().indexOf(beginTime)!=-1
                    &&$(this).children('td').eq(6).text().indexOf(contactName)!=-1&&$(this).children('td').eq(2).text().indexOf(companyName)!=-1)){
                    array1.push($(this));
                }
            });
        }
        for(var i=0;i<array1.length;i++){
            $.each(array1[i],function () {
                $('#tbody1').append(this) ;
            });
        }
        if(contractId.length<=0&&contractName.length<=0&&checkState.length<0&&contactName.length<0&&suppierName.length<0&&telephone.length<0&&beginTime.length<0){
            switchPage(1);
            $('.myclass').each(function () {
                $(this).show();
            })
        }
    }
}
//设置合同模板高级查询下拉框数据
function setModelSelectedList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getModelSelectedList",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                var data = eval(result);
                // 高级检索下拉框数据填充
                // var checkState = $("#search-checkState");
                // checkState.children().remove();
                // $.each(data.checkStateList, function (index, item) {
                //     var option = $('<option />');
                //     option.val(index);
                //     option.text(item.name);
                //     checkState.append(option);
                // });
                // checkState.get(0).selectedIndex = -1;
                var contractType=$('#search-contractType');
                contractType.children().remove();
                $.each(data.contractTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    contractType.append(option);
                });
                contractType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}
//合同模板高级查询
function searchModel() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    if ($("#senior").is(':visible')) {
        data = {
            modelName: $("#search-modelName").val(),//模板名称
            contractType: $("#search-contractType").val(),//合同类型
            checkState: $("#search-checkState").val(),//年份
            year: $("#search-year").val(),//联系方式
            page: page,
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#search").val(),
            page: page,
        };
        console.log(data);
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchModel",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:  JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                setContractModelList(result);
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

//模糊查询
array=[];//存放所有的tr
array1=[];//存放目标的tr
//危废出库查询
function searchFuzzy() {
    //分页模糊查询
    array.length=0;//清空数组
    array1.length=0;
    var text=$('#searchContent').val();
    if (nameBykey == '危废合同' || nameBykey == "Wastes" || nameBykey == undefined) {
        $('#Wa').click();
        localStorage.clear();
        $('#toggleName').text("产废单位名称");
        switchPage(1);
        $('.myclass1').each(function () {
            $(this).show();
        });
        for(var i=1;i<=totalPage(contractIndex);i++){
            switchPage(parseInt(i))
            array.push($('.myclass1'));
        }
        for(var j=0;j<array.length;j++){
            $.each(array[j],function () {
                //console.log(this);
                if(($(this).children('td').text().indexOf(text)==-1)){
                    $(this).hide();
                }
                if($(this).children('td').text().indexOf(text)!=-1){
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
    if (nameBykey == "应急处置合同") {
        $('#Em').click();
        localStorage.clear();
        //如果是物流就改为处置单位
        $('#toggleName').text("产废单位名称");
        switchPage(1);
        $('.myclass1').each(function () {
            $(this).show();
        });
        for(var i=1;i<=totalPage(contractIndex);i++){
            switchPage(parseInt(i))
            array.push($('.myclass1'));
        }
        for(var j=0;j<array.length;j++){
            $.each(array[j],function () {
                //console.log(this);
                if(($(this).children('td').text().indexOf(text)==-1)){
                    $(this).hide();
                }
                if($(this).children('td').text().indexOf(text)!=-1){
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
    if (nameBykey == "物流合同") {
        $('#Lo').click();
        localStorage.clear();
        switchPage(1);
        $('.myclass1').each(function () {
            $(this).show();
        });
        for(var i=1;i<=totalPage(contractIndex);i++){
            switchPage(parseInt(i))
            array.push($('.myclass1'));
        }
        for(var j=0;j<array.length;j++){
            $.each(array[j],function () {
                //console.log(this);
                if(($(this).children('td').text().indexOf(text)==-1)){
                    $(this).hide();
                }
                if($(this).children('td').text().indexOf(text)!=-1){
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

}
function setContractList(result) {
    //console.log(eval(result));//可以取到
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr1");//克隆一行
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var obj = eval(item);
        // console.log(obj);
        // 循环遍历cloneTr的每一个td元素，并赋值
        if (obj.contractId == "") {
            obj.contractId = ""
        }
        if (obj.contractType == null) {
            obj.contractType.name = "";
        }
        if (obj.companyName == "") {
            obj.companyName = "";
        }
        if (obj.province == null) {
            obj.province = "";
        }
        if (obj.city == "") {
            obj.city = "";
        }
        if (obj.contactName == "") {
            obj.contactName = "";
        }
        if (obj.telephone == "") {
            obj.telephone = "";
        }
        if (obj.contractContent == "") {
            var clonedTr = tr.clone();
            clonedTr.show();
            clonedTr.attr('class','myclass1');
            clonedTr.children("td").each(function (inner_index) {
                // 根据索引为部分td赋值
                switch (inner_index) {
                    // 合同编号
                    case (1):
                        $(this).html(obj.contractId);
                        break;
                    //处置单位名称
                    case (2):
                        // $(this).html();
                        //判断是否是物流合同
                        if (obj.contractType.name == '物流合同') {
                            if(obj.supplier!=null){
                                $(this).html(obj.supplier.companyName);
                            }
                        }
                        else {
                            if(obj.client!=null){
                                $(this).html(obj.client.companyName);
                            }

                        }
                        break;
                    // 合同名称
                    case (3):
                        if (obj.contractVersion != null) {
                            if (obj.contractVersion.name == "公司合同") {
                                $(this).html(obj.contractName);
                            }
                            if (obj.contractVersion.name == "产废单位合同") {
                                $(this).html(obj.contractName + obj.contractType.name);
                            }
                        }
                        else {
                            $(this).html("");
                        }
                        break;
                    // 状态
                    case (4):
                        if (obj.checkState != null)
                            $(this).html(obj.checkState.name);
                        break;
                    // 公司名称
                    // case (5):
                    //     $(this).html(obj.companyName);
                    //     break;
                    // 所属区域
                    // case (6):
                    //     if (obj.province != null) {
                    //         $(this).html(obj.province.name + obj.city);
                    //     }
                    //     else {
                    //         $(this).html("");
                    //     }
                    //     break;
                    // 合约量
                    case (5):
                        $(this).html(obj.agreedQuantity.toFixed(2));
                        break;
                    // 联系人
                    case (6):
                        $(this).html(obj.contactName);
                        break;
                    // 联系方式
                    case (7):
                        $(this).html(obj.telephone);
                        break;
                    // 签订日期
                    case (8):
                        if (obj.beginTime != null) {
                            var time = gettime(obj.beginTime);
                            $(this).html(time);
                        }
                        else {
                            $(this).html("");
                        }
                        break;
                    // case (10):
                    //     if(obj.checkState.name == "已作废"){
                    //         $(".glyphicon3").removeAttr("onclick");
                    //         document.getElementById("glyphicon3").style.color="#9d9d9d";
                    //     }
                    //     if(obj.checkState.name == "待审批"){
                    //
                    //     }else if(obj.checkState.name == "审批中"){
                    //         $(this).children().eq(1).attr("class","disabled");
                    //         $(this).children().eq(1).removeAttr("onclick");
                    //     }else if(obj.checkState.name == "履约中"){
                    //         $(this).children().eq(1).attr("class","disabled");
                    //         $(this).children().eq(1).removeAttr("onclick");
                    //         $(this).children().eq(2).attr("class","disabled");
                    //         $(this).children().eq(2).removeAttr("onclick");
                    //         $(this).children().eq(3).attr("class","disabled");
                    //         $(this).children().eq(3).removeAttr("onclick");
                    //     }else{
                    //         $(this).children().eq(1).attr("class","disabled");
                    //         $(this).children().eq(1).removeAttr("onclick");
                    //         $(this).children().eq(2).attr("class","disabled");
                    //         $(this).children().eq(2).removeAttr("onclick");
                    //         $(this).children().eq(3).attr("class","disabled");
                    //         $(this).children().eq(3).removeAttr("onclick");
                    //     }
                    //     break;
                    //截止日期

                    //截止日期
                    // 截至日期
                    case (9):
                        if (obj.endTime != null) {
                            var time = gettime(obj.endTime);
                            $(this).html(time);
                        }
                        else {
                            $(this).html("");
                        }
                        break;
                }
            });

            // 把克隆好的tr追加到原来的tr前面
            clonedTr.removeAttr("id");
            clonedTr.insertBefore(tr);
        }
    });
    // 隐藏无数据的tr
    tr.hide();
}

//获取时间
function gettime(obj) {
    var year = (parseInt(obj.year) + 1900).toString();
    var mouth = parseInt((obj.month) + 1).toString();
    if (mouth.length != 2) {
        mouth = 0 + mouth;
    }
    //  dataLeftCompleting(2, "0", mouth.toString()).toString();
    var day = parseInt((obj.date)).toString();
    //ataLeftCompleting(2, "0", day.toString()).toString();
    if (day.length != 2) {
        day = 0 + day;
    }
    var time1 = year + "-" + mouth + "-" + day;
    return time1;
}

function dataLeftCompleting(bits, identifier, value) {
    value = Array(bits + 1).join(identifier) + value;
    return value.slice(-bits);
}

function contractSubmit() {
    //在此提交
    var items = $("input[name='blankCheckbox']:checked");//判断复选框是否选中
    if (items.length > 0) {
        var name1 = items[0].parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
        // console.log(name1);
        if (name1.indexOf("物流") != -1) {
            var name2 = "Logistics";
        }
        if (name1.indexOf("危废") != -1) {
            var name2 = "Wastes";
        }
        if (name1.indexOf("次生") != -1) {
            var name2 = "Derive";
        }
        if (name1.indexOf("采购") != -1) {
            var name2 = "Purchase";
        }
        if (name1.indexOf("应急") != -1) {
            var name2 = "Emergency";
        }

        function getContractById(id) {
            $.ajax({
                type: "POST",                       // 方法类型
                url: "submitContract1",              // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                data: {
                    'id': id
                },
                success: function (result) {
                    if (result != undefined) {
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
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
        // window.location.reload();
        $(location).attr('href', 'contractManage.html');
        localStorage.name = name2;
        location.href = "contractManage.html";
    }
    else {
        alert("请勾选要提交的合同！")
    }
}

function getContractId1(item) {
    return item.parentElement.parentElement.nextElementSibling.innerHTML;
}

/***
 * 查看合同
 */
function viewContract(item) {
    contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var contractType = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
    // console.log(contractId+contractType);
    $('#close').show();
    $('#btn').text();
    $('#back').text('');
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getContractId",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'contractId': contractId
        },
        success: function (result) {
            //console.log(result);
            if (result != undefined) {
                var data = eval(result);
                //开始日期
                if (data.beginTime != null) {
                    var begin = gettime(data.beginTime);
                }
                else {
                    var begin = "";
                }
                //截止日期
                if (data.endTime != null) {
                    var end = gettime(data.endTime);
                }
                else {
                    var end = "";
                }
                //合同状态
                if (data.checkState != null) {
                    $("#modal3_contractState").text(data.checkState.name);
                }
                else {
                    $("#modal3_contractState").text("");
                }

                //合同版本
                $("#modal3_contractVersion").text(data.contractVersion.name);//合同版本
                // $("#modal3_companyName").text(data.companyName);
                if (data.contractVersion.name == "公司合同") {
                    $("#modal3_contractName").text(data.modelName);//合同名称
                }
                if (data.contractVersion.name == "产废单位合同") {
                    $("#modal3_contractName").text(data.contractName + data.contractType.name);//合同名称
                }
                //联系人
                $("#modal3_contactName").text(data.contactName);
                //合同编号
                $("#modal3_contractId").text(data.contractId);
                $("#modal3_beginTime").text(begin);
                $("#modal3_endTime").text(end);
                //  $("#modal3_area").text(data.province.name+""+data.city);
                //联系方式
                $("#modal3_telephone").text(data.telephone);
                //预计处置费
                $("#modal3_order").text(data.order1);
                if (data.contractType.name == '物流合同') {
                    $('#name1').html("处置单位名称&nbsp;&nbsp;");
                    //$("#modal3_suppierName").text(data.suppierName);
                    //供用商姓名
                    $('#modal3_suppierName').text(data.suppierName);
                }
                if (data.contractType.name != '物流合同') {
                    $('#name1').html("产废单位名称&nbsp;&nbsp;");
                    $("#modal3_suppierName").text(data.company1);//公司名称

                }

                //开票税率1
                if (data.ticketRate1 == null) {
                    $('#modal3_ticketRate1').text(" ");
                }
                else {
                    $('#modal3_ticketRate1').text(data.ticketRate1.name);
                }
                //开票税率2
                // if(data.ticketRate2==null){
                //     $('#modal3_ticketRate2').text(" ");
                // }
                // else {
                //     $('#modal3_ticketRate2').text(data.ticketRate2.name);
                // }
                //资质开始日期
                // if(data.beginQualification==null){
                //     $('#modal3_beginQualification').text(" ");
                // }
                // else {
                //     var begin1=gettime(data.beginQualification);
                //     $('#modal3_beginQualification').text(begin1);
                // }
                //资质结束日期
                // if(data.endQualification==null){
                //     $('#modal3_endQualification').text(" ");
                // }
                // else {
                //     var end1=gettime(data.endQualification);
                //     $('#modal3_endQualification').text(end1);
                // }
                //物流公司资质
                //  $('#modal3_logisticsQualification').text(data.logisticsQualification);
                //开户行名称
                $('#modal3_bankName').text(data.bankName);
                //开户行账号
                $('#modal3_bankAccout').text(data.bankAccount);
                if (data.freight == true) {//需要运费
                    $('#modal3_freight').removeAttr("checked");
                    $('#modal3_freight').prop("checked", true);
                }
                if (data.freight == false) {//不需要运费
                    $('#modal3_freight').removeAttr("checked");
                }







                $('#search').prop("readonly", false);
            } else {
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
    $('#contractInfoForm').modal('show');
    $('#btn').hide();//审批隐藏
    $('#back').hide();//驳回隐藏
    $('#print').show();//打印显示
    $('#print').show();//打印显示
}

/***
 * 查看合同2
 */
function viewContract1(item) {
    var contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    var contractType = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
    if (contractType.indexOf('应急处置合同') != -1) {
        //做跳转
        //window.location.href = "emergency?contractId="+contractId;
        //转到html便于操作
        localStorage.name1 = contractId;
        location.href = "showemergency.html";
    }
    else {
        $('#btn').text();
        $('#back').text('');
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getContractId",                   // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            data: {
                'contractId': contractId
            },
            success: function (result) {
                // console.log(result);
                if (result != undefined) {
                    var data = eval(result);
                    if (data.beginTime != null) {
                        var begin = gettime(data.beginTime);
                    }
                    else {
                        var begin = "";
                    }
                    if (data.endTime != null) {
                        var end = gettime(data.endTime);
                    }
                    else {
                        var end = "";
                    }
                    $("#modal3_contractState").text(data.checkState.name);
                    $("#modal3_contractVersion").text(data.contractVersion.name);
                    $("#modal3_companyName").text(data.companyName);
                    if (data.contractVersion.name == "公司合同") {
                        $("#modal3_contractName").text(data.modelName);//合同名称
                    }
                    if (data.contractVersion.name == "产废单位合同") {
                        $("#modal3_contractName").text(data.contractName + data.contractType.name);//合同名称
                    }
                    $("#modal3_contactName").text(data.contactName);
                    $("#modal3_contractId").text(data.contractId);
                    $("#modal3_beginTime").text(begin);
                    $("#modal3_endTime").text(end);
                    $("#modal3_area").text(data.province.name + "" + data.city);
                    $("#modal3_telephone").text(data.telephone);
                    $("#modal3_order").text(data.order1);
                    //开票税率1
                    if (data.ticketRate1 == null) {
                        $('#modal3_ticketRate1').text(" ");
                    }
                    else {
                        $('#modal3_ticketRate1').text(data.ticketRate1.name);
                    }
                    //开票税率2
                    // if(data.ticketRate2==null){
                    //     $('#modal3_ticketRate2').text(" ");
                    // }
                    // else {
                    //     $('#modal3_ticketRate2').text(data.ticketRate2.name);
                    // }
                    //资质开始日期
                    if (data.beginQualification == null) {
                        $('#modal3_beginQualification').text(" ");
                    }
                    else {
                        var begin1 = gettime(data.beginQualification);
                        $('#modal3_beginQualification').text(begin1);
                    }
                    //资质结束日期
                    if (data.endQualification == null) {
                        $('#modal3_endQualification').text(" ");
                    }
                    else {
                        var end1 = gettime(data.endQualification);
                        $('#modal3_endQualification').text(end1);
                    }
                    //物流公司资质
                    $('#modal3_logisticsQualification').text(data.logisticsQualification);
                    //开户行名称
                    $('#modal3_bankName').text(data.bankName);
                    //开户行账号
                    $('#modal3_bankAccout').text(data.bankAccount);
                    if (data.freight == true) {//需要运费
                        $('#modal3_freight').removeAttr("checked");
                        $('#modal3_freight').prop("checked", true);
                    }
                    if (data.freight == false) {//不需要运费
                        $('#modal3_freight').removeAttr("checked");
                    }
                    $('#search').prop("readonly", false);
                } else {
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
        $('#contractInfoForm').modal('show');
        $('#btn').hide();//审批隐藏
        $('#back').hide();//驳回隐藏
        $('#print').show();//打印显示
        $('#print').show();//打印显示
    }

}

/***
 * 修改合同
 */
function adjustContract(item) {
    //1获取合同id
    var contractId = item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
    // console.log(contractId);
    //2判断合同的名字然后跳转到相应的jsp页面做修改
    var contractName = item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
    // console.log(contractName);
    if (contractName.indexOf('危废') != -1) {
        //使用html便于操作
        localStorage.contractId = contractId;
        location.href = "adjustWaste.html";
        //window.location.href = "showContract?contractId=" + contractId;
    }
    if (contractName.indexOf('次生') != -1) {
        window.location.href = "Secondary?contractId=" + contractId;
    }
    if (contractName.indexOf('物流') != -1) {
        localStorage.contractId = contractId;
        location.href = "adjustLogistics.html";
        //window.location.href = "logistics?contractId=" + contractId;
    }
    if (contractName == '采购') {
        //window.location.href = "showContract?contractId="+contractId;
    }
    if (contractName.indexOf('应急') != -1) {
        // window.location.href = "emergency1?contractId="+contractId;
        //换到html页面，便于操作
        localStorage.contractId = contractId;
        location.href = "adjustUrgent.html";
    }

}

//危废合同页面新增
function loadWastesContractSelectList() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
//取得下拉菜单的选项
    var contractType=$('#contractType');
    contractType.hide();
    var contractName1=$('#contractName1');
    contractName1.hide();
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        dataType: "json",
        data:{"key":"危废"},
        success: function (result) {
            if (result != undefined) {
               // console.log(result);
                var data = eval(result);
                // 各下拉框数据填充
                var contractType1 = $("#contractType1");//模板名称下拉框
                contractType1.children().remove();
                $.each(data.modelNameList, function (index, item) {
                    if(item!=null&&item.modelName!=""){
                        //console.log(item);
                        var option = $('<option />');
                        option.val(item.modelName);
                        option.text(item.modelName);
                        contractType1.append(option);}
                });
                contractType1.get(0).selectedIndex = -1;
                var province = $("#province");
                province.children().remove();
                $.each(data.provinceStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    province.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                //获取相应的市级
                $.ajax({
                    type: "POST",                            // 方法类型
                    url: "getCityList",                  // url
                    dataType: "json",
                    data:{
                        'provinceId': 1
                    },
                    success: function (result) {
                        if (result != undefined) {
                            var data = eval(result);
                            //console.log(data);
                            //var contractName = $("#contractName");
                            //下拉框填充
                            var city=$("#city");
                            city.children().remove();
                            cityIndex="";
                            $.each(data, function (index, item) {
                                //  console.log(item);
                                var option1 = $('<option />');
                                option1.val(item.cityname);
                                option1.text(item.cityname);
                                if(item.cityname=='${contract.city}'){
                                    cityIndex=index;
                                }
                                city.append(option1);
                            });
                            $('.selectpicker').selectpicker('refresh');


                        } else {
                            //console.log(result);
                        }
                    },
                    error:function (result) {
                        console.log(result);
                    }
                });
                var clientName=$('#companyName');
                clientName.children().remove();
                $.each(data.companyNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientName.append(option);
                });
                //clientName.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
                var options1=$("#companyName option:selected").val(); //获取选中的项
                //console.log(options1);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getClientListById",                  // url
                    data:{'clientId':$("#companyName option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success:function (result) {
                        if (result != undefined && result.status == "success") {
                           // console.log(result);
                            var company=result.client;//取得被选中处置单位的信息
                            //console.log(company);
                            var taxRate1=$('#taxRate1');
                            i="";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if(company.ticketType!=null){
                                    if(company.ticketType.name==item.name){
                                        i=index;
                                    }
                                }
                                else {
                                    i=-1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value",company.contactName);
                            //赋值联系方式
                            if(company.mobile!=""&&company.phone==""){
                                $('#telephone').prop("value",company.mobile);
                            }
                            if(company.mobile==""&&company.phone!=""){
                                $('#telephone').prop("value",company.phone);
                            }
                            if(company.mobile==""&&company.phone==""){
                                $('#telephone').prop("value","");
                            }
                            if(company.mobile!=""&&company.phone!="") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            $('#bankName').prop("value",company.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value",company.bankAccount);
                            $('#company1').prop("value",company.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error:function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //危废编码赋值
    $.ajax({
        type:'POST',
        url:"getWastesInfoList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
               // console.log(result);
                var obj=eval(result);
              var wastesCode=$('#wastesCode');
              wastesCode.children().remove();
              $.each(obj.data,function (index,item) {
                  var option=$('<option/>');
                  option.val(item.code);
                  option.text(item.code);
                  wastesCode.append(option);
              });
                wastesCode.removeAttr('id');
              $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //运输方式
    $.ajax({
        type:'POST',
        url:"getTransportTypeList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
               // console.log(result);
                var transportType=$('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //包装类型
    $.ajax({
        type:'POST',
        url:"getFormTypeAndPackageType",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
               // console.log(result);
                var packageType=$('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
}
//计算总价
function calculateTotalPrice(item) {
    var unitPrice=$(item).parent().parent().children('td').eq(5).children('input').val();
    var contractAmount=$(item).parent().parent().children('td').eq(6).children('input').val();
    //console.log(unitPrice+"=="+contractAmount);
    $(item).parent().parent().children('td').eq(7).children('input').val((parseFloat(unitPrice)*parseInt(contractAmount)).toFixed(2));

}
//保存危废合同
function contractWastesSave() {
    var addType = $("input[name='addType']:checked").val();
    //console.log(addType);
    //console.log($('input[name="contractVersion"]:checked').val())
    if($('input[name="contractVersion"]:checked').val()=='customerContract'){
        var data={
            client:{clientId:$('#companyName').selectpicker('val')},
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractName').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        //console.log(data);
        $.ajax({
                type: "POST",                            // 方法类型
                url: "saveContract",                       // url
                async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success:function (result) {
                    if (result != undefined && result.status == "success"){
                        //console.log(result);
                    }
                    else {
                        alert(result.message);
                    }
                },
                error:function (result) {
                    alert("服务器异常！");
                }
        });
    }
    if($('input[name="contractVersion"]:checked').val()=='companyContract'){
        var data={
            client:{clientId:$('#companyName').selectpicker('val')},
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractType1').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        //(data);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                   // console.log(result);
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });

    }

    $('.myclass').each(function(){
        var quotationItemData={
             client:{clientId:$('#companyName').selectpicker('val')} ,
            wastesCode:$(this).children('td').eq(1).children('div').find('button').attr('title'),
            wastesName:$(this).children('td').eq(2).children('input').val(),
             packageType:$(this).children('td').eq(3).children('select').val(),
            transport:$(this).children('td').eq(8).children('select').val(),
            util:$(this).children('td').eq(4).children('input').val(),
            unitPriceTax:$(this).children('td').eq(5).children('input').val(),
            contractAmount:$(this).children('td').eq(6).children('input').val(),
            totalPrice:$(this).children('td').eq(7).children('input').val(),
        };
        //console.log(quotationItemData);
       //1添加报价单明细
        $.ajax({
            type:'POST',
            url:"addQuotationItem",
            data:JSON.stringify(quotationItemData),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                   // console.log(result);
                }
                else {
                    alert(result.message);

                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });
    });
    alert("添加成功！")
    if(addType=='continue'){
        $(location).attr('href', 'wastesContractInfo.html');
    }
    if(addType=='break'){
        localStorage.clear();
        $(location).attr('href', 'contractManage.html');
        localStorage.name="Wastes";
        location.href="contractManage.html";

    }


}
//产废单位列表下拉框
function findClient() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        dataType: "json",
        data:{"key":"危废"},
        success: function (result) {
            if (result != undefined) {
               // console.log(result);
                var data = eval(result);
                var options1=$("#companyName option:selected").val(); //获取选中的项
               // console.log(options1);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getClientListById",                  // url
                    data:{'clientId':$("#companyName option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success:function (result) {
                        if (result != undefined && result.status == "success") {
                           // console.log(result);
                            var company=result.client;//取得被选中处置单位的信息
                            //console.log(company);
                            var taxRate1=$('#taxRate1');
                            i="";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if(company.ticketType!=null){
                                    if(company.ticketType.name==item.name){
                                        i=index;
                                    }
                                }
                                else {
                                    i=-1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value",company.contactName);
                            //赋值联系方式
                            if(company.mobile!=""&&company.phone==""){
                                $('#telephone').prop("value",company.mobile);
                            }
                            if(company.mobile==""&&company.phone!=""){
                                $('#telephone').prop("value",company.phone);
                            }
                            if(company.mobile==""&&company.phone==""){
                                $('#telephone').prop("value","");
                            }
                            if(company.mobile!=""&&company.phone!="") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            $('#bankName').prop("value",company.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value",company.bankAccount);
                            $('#company1').prop("value",company.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error:function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
}
//提交危废合同
function contractWastesSubmit(){
    var s=($('#contractInfoForm').serializeJSON());
    var addType = $("input[name='addType']:checked").val();
    //console.log(s);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "submitContract",                       // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify($('#contractInfoForm').serializeJSON()),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                //(eval(result));
                console.log("success: " + result);
                alert("提交成功!");
                if (addType == "continue") $(location).attr('href', 'wastesContractInfo.html');
                else{localStorage.clear();
                    $(location).attr('href', 'contractManage.html');
                    localStorage.name="Wastes";
                    location.href="contractManage.html";}

                //$(location).attr('href', 'contractManage.html');//跳转
                //$(location).attr('href', 'contractManage.html');//跳转
            } else {
                console.log("fail: " + result);
                alert("保存失败!");
            }
        },
        error: function (result) {
            console.log("error: " + result);
            alert("服务器异常!");
        }
    });
}

//克隆行方法
function addNewLine() {
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        //style: 'btn-info',
        size: 4
    });//下拉框样式
    // // 获取id为cloneTr的tr元素
    var tr = $("#plusBtn").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 克隆后清空新克隆出的行数据
    clonedTr.children("td:eq(1),td:eq(2),td:eq(3),td:eq(4),td:eq(5),td:eq(6),td:eq(7),td:eq(8)").find("input").val("");
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
    $('.selectpicker').data('selectpicker', null);
    $('.bootstrap-select').find("button:first").remove();
    $('.selectpicker').selectpicker();

}

//删除行方法
function delLine(e) {
    var tr = e.parentElement.parentElement;
    tr.parentNode.removeChild(tr);
}

//应急合同新增页面加载
function loadEmSelectList() {
    CKEDITOR.editorConfig = function( config ) {
        config.toolbarGroups = [
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'others', groups: [ 'others' ] },
            '/',
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'about', groups: [ 'about' ] }
        ];
        config.removeButtons = 'Underline,Subscript,Superscript';
        config.pasteFromWordRemoveFontStyles = false;
        config.pasteFromWordRemoveStyles = false;
        config.removePlugins='elementspath';
    };
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
  //取得下拉菜单的选项
    var contractType=$('#contractType');
    contractType.hide();
    var contractName1=$('#contractName1');
    contractName1.hide();
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        dataType: "json",
        data:{"key":"应急"},
        success: function (result) {
            if (result != undefined) {
                //console.log(result);
                var data = eval(result);
                // 各下拉框数据填充
                var contractType1 = $("#contractType1");//模板名称下拉框
                contractType1.children().remove();
                $.each(data.modelNameList, function (index, item) {
                    if(item!=null&&item.modelName!=""){
                        //console.log(item);
                        var option = $('<option />');
                        option.val(item.modelName);
                        option.text(item.modelName);
                        contractType1.append(option);}
                });
                contractType1.get(0).selectedIndex = -1;
                var province = $("#province");
                province.children().remove();
                $.each(data.provinceStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    province.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                //获取相应的市级
                $.ajax({
                    type: "POST",                            // 方法类型
                    url: "getCityList",                  // url
                    dataType: "json",
                    data:{
                        'provinceId': 1
                    },
                    success: function (result) {
                        if (result != undefined) {
                            var data = eval(result);
                            //console.log(data);
                            //var contractName = $("#contractName");
                            //下拉框填充
                            var city=$("#city");
                            city.children().remove();
                            cityIndex="";
                            $.each(data, function (index, item) {
                                //  console.log(item);
                                var option1 = $('<option />');
                                option1.val(item.cityname);
                                option1.text(item.cityname);
                                if(item.cityname=='${contract.city}'){
                                    cityIndex=index;
                                }
                                city.append(option1);
                            });
                            $('.selectpicker').selectpicker('refresh');


                        } else {
                            //console.log(result);
                        }
                    },
                    error:function (result) {
                        console.log(result);
                    }
                });
                var clientName=$('#companyName');
                clientName.children().remove();
                $.each(data.companyNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    clientName.append(option);
                });
                //clientName.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
                var options1=$("#companyName option:selected").val(); //获取选中的项
                //console.log(options1);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getClientListById",                  // url
                    data:{'clientId':$("#companyName option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success:function (result) {
                        if (result != undefined && result.status == "success") {
                           // console.log(result);
                            var company=result.client;//取得被选中处置单位的信息
                            //console.log(company);
                            var taxRate1=$('#taxRate1');
                            i="";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if(company.ticketType!=null){
                                    if(company.ticketType.name==item.name){
                                        i=index;
                                    }
                                }
                                else {
                                    i=-1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value",company.contactName);
                            //赋值联系方式
                            if(company.mobile!=""&&company.phone==""){
                                $('#telephone').prop("value",company.mobile);
                            }
                            if(company.mobile==""&&company.phone!=""){
                                $('#telephone').prop("value",company.phone);
                            }
                            if(company.mobile==""&&company.phone==""){
                                $('#telephone').prop("value","");
                            }
                            if(company.mobile!=""&&company.phone!="") {
                                $('#telephone').prop("value", company.mobile);
                            }
                            $('#bankName').prop("value",company.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value",company.bankAccount);
                            $('#company1').prop("value",company.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error:function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //危废编码赋值
    $.ajax({
        type:'POST',
        url:"getWastesInfoList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
               // console.log(result);
                var obj=eval(result);
                var wastesCode=$('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //运输方式
    $.ajax({
        type:'POST',
        url:"getTransportTypeList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
               // console.log(result);
                var transportType=$('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //包装类型
    $.ajax({
        type:'POST',
        url:"getFormTypeAndPackageType",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                //console.log(result);
                var packageType=$('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
}


/**
 * 保存应急合同
 */
function contractEmSave() {
    var addType = $("input[name='addType']:checked").val();
    //console.log(addType);
    console.log($('input[name="contractVersion"]:checked').val())
    if($('input[name="contractVersion"]:checked').val()=='customerContract'){
        var data={
            client:{clientId:$('#companyName').selectpicker('val')} ,
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractName').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
       // console.log(data);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });
    }
    if($('input[name="contractVersion"]:checked').val()=='companyContract'){
        var data={
            client:{clientId:$('#companyName').selectpicker('val')},
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractType1').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        //console.log(data);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //console.log(result);
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });

    }

    $('.myclass').each(function(){
        var quotationItemData={
            client:{clientId:$('#companyName').selectpicker('val')} ,
            wastesCode:$(this).children('td').eq(1).children('div').find('button').attr('title'),
            wastesName:$(this).children('td').eq(2).children('input').val(),
            packageType:$(this).children('td').eq(3).children('select').val(),
            transport:$(this).children('td').eq(8).children('select').val(),
            util:$(this).children('td').eq(4).children('input').val(),
            unitPriceTax:$(this).children('td').eq(5).children('input').val(),
            contractAmount:$(this).children('td').eq(6).children('input').val(),
            totalPrice:$(this).children('td').eq(7).children('input').val(),
        };
        //console.log(quotationItemData);
        //1添加报价单明细
        $.ajax({
            type:'POST',
            url:"addQuotationItem",
            data:JSON.stringify(quotationItemData),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //console.log(result);
                }
                else {
                    alert(result.message);

                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });
    });
    alert("添加成功！")
    if(addType=='continue'){
        $(location).attr('href', 'urgentContractInfo.html');
    }
    if(addType=='break'){
        localStorage.clear();
        $(location).attr('href', 'contractManage.html');
        localStorage.name="Emergency";
        location.href="contractManage.html";

    }

}

//物流合同新增页面初始化
function loadLogicContractSelectList() {
    var contractType=$('#contractType');
    contractType.hide();//合同类型隐藏不需要显示
    var contractName1=$('#contractName1');
    contractName1.hide();
    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });
//取得下拉菜单的选项
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        dataType: "json",
        data:{"key":"物流"},
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                //console.log(data);
                //1赋值
                // $('#contacts').prop("value",obj.contactName);//联系人
                // $('#telephone').prop("value",obj.phone);//联系电话
                // 各下拉框数据填充
                var contractType1 = $("#contractType1");
                contractType1.children().remove();
                $.each(data.modelNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.modelName);
                    option.text(item.modelName);
                    contractType1.append(option);
                });
                contractType1.get(0).selectedIndex = -1;
                // var province = $("#province");
                // province.children().remove();
                // $.each(data.provinceStrList, function (index, item) {
                //     var option = $('<option />');
                //     option.val(index);
                //     option.text(item.name);
                //     province.append(option);
                // });
                // province.get(0).selectedIndex = -1;
                $('.selectpicker').selectpicker('refresh');
                //获取相应的市级
                // $.ajax({
                //     type: "POST",                            // 方法类型
                //     url: "getCityList",                  // url
                //     dataType: "json",
                //     data:{
                //         'provinceId': 1
                //     },
                //     success: function (result) {
                //         if (result != undefined) {
                //             var data = eval(result);
                //             //console.log(data);
                //             //var contractName = $("#contractName");
                //             //下拉框填充
                //             var city=$("#city");
                //             city.children().remove();
                //             cityIndex="";
                //             $.each(data, function (index, item) {
                //                 //  console.log(item);
                //                 var option1 = $('<option />');
                //                 option1.val(item.cityname);
                //                 option1.text(item.cityname);
                //                 if(item.cityname=='${contract.city}'){
                //                     cityIndex=index;
                //                 }
                //                 city.append(option1);
                //             });
                //             $('.selectpicker').selectpicker('refresh');
                //
                //
                //         } else {
                //             console.log(result);
                //         }
                //     },
                //     error:function (result) {
                //         console.log(result);
                //     }
                // });
                var suppier=$('#suppier');
                suppier.children().remove();
                $.each(data.supplierNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.supplierId);
                    option.text(item.companyName);
                    suppier.append(option);
                });
                $('.selectpicker').selectpicker('refresh');
                //2赋值
                //开票税率下拉框
                //开票税率1下拉框
                var options1=$("#suppier option:selected").val(); //获取选中的项
                //根据供应商编号查询信息
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getSupplierListById",                  // url
                    data:{'supplierId':$("#suppier option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success:function (result) {
                        if (result != undefined && result.status == "success") {
                           // console.log(result);
                            var suppier=result.supplier;//取得被选中处置单位的信息
                            var taxRate1=$('#taxRate1');
                            i="";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if(suppier.ticketType!=null){
                                    if(suppier.ticketType.name==item.name){
                                        i=index;
                                    }
                                }
                                else {
                                    i=-1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value",suppier.contactName);
                            //赋值联系方式
                            $("#telephone").prop("value",suppier.phone);//赋值联系电话
                            $("#contactName").prop("value",suppier.contactName);//赋值联系人
                            //console.log(suppier.companyName);
                            $("#suppierName").val(suppier.companyName);//赋值处置单位名称
                            $('#bankName').prop("value",suppier.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value",suppier.bankAccount);
                            $('#company1').prop("value",suppier.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error:function (result) {
                        alert("服务器异常！");
                    }
                });
                // var suppier=data.supplierNameList[options1];//取得被选中处置单位的信息
                // var taxRate1=$('#taxRate1');
                // index1=""
                // taxRate1.children().remove();
                // $.each(data.ticketRateStrList1, function (index, item) {
                //     console.log(data.ticketRateStrList1);
                //     var option = $('<option />');
                //     if(suppier.ticketRate!=null){
                //         if(suppier.ticketRate.name==item.name){
                //             index1=index;
                //         }
                //     }
                //     else {
                //         index1=-1;
                //     }
                //     option.val(index);
                //     option.text(item.name);
                //     taxRate1.append(option);
                // });
                // taxRate1.get(0).selectedIndex = index1;
                // //开票税率2下拉框
                // // var taxRate2=$('#taxRate2');
                // // taxRate2.children().remove();
                // // $.each(data.ticketRateStrList2, function (index, item) {
                // //    // console.log(item);
                // //     var option = $('<option />');
                // //     option.val(index);
                // //     option.text(item.name);
                // //     taxRate2.append(option);
                // // });
                // // taxRate2.get(0).selectedIndex = -1;
                // $("#telephone").prop("value",suppier.phone);//赋值联系电话
                // $("#contactName").prop("value",suppier.contactName);//赋值联系人
                // //console.log(suppier.companyName);
                // $("#suppierName").val(suppier.companyName);//赋值处置单位名称
            } else {
                //console.log(result);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //危废编码赋值
    $.ajax({
        type:'POST',
        url:"getWastesInfoList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
                //console.log(result);
                var obj=eval(result);
                var wastesCode=$('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //运输方式
    $.ajax({
        type:'POST',
        url:"getTransportTypeList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
                //console.log(result);
                var transportType=$('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
    //包装类型
    $.ajax({
        type:'POST',
        url:"getFormTypeAndPackageType",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
               // console.log(result);
                var packageType=$('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(index+1);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex=-1;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
}
//点击查询供应商信息
function findSuppier() {

    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractList",                  // url
        dataType: "json",
        data:{"key":"物流"},
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                $.ajax({
                    type: "POST",                       // 方法类型
                    url: "getSupplierListById",                  // url
                    data:{'supplierId':$("#suppier option:selected").val()},
                    async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                    dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    success:function (result) {
                        if (result != undefined && result.status == "success") {
                           // console.log(result);
                            var suppier=result.supplier;//取得被选中处置单位的信息
                            var taxRate1=$('#taxRate1');
                            i="";
                            taxRate1.children().remove();
                            $.each(data.ticketRateStrList1, function (index, item) {
                                // console.log(item);
                                var option = $('<option />');
                                option.val(index);
                                option.text(item.name);
                                if(suppier.ticketType!=null){
                                    if(suppier.ticketType.name==item.name){
                                        i=index;
                                    }
                                }
                                else {
                                    i=-1;
                                }
                                taxRate1.append(option);
                            });
                            taxRate1.get(0).selectedIndex = i;
                            $('#contactName').prop("value",suppier.contactName);
                            //赋值联系方式
                            $("#telephone").prop("value",suppier.phone);//赋值联系电话
                            $("#contactName").prop("value",suppier.contactName);//赋值联系人
                            //console.log(suppier.companyName);
                            $("#suppierName").val(suppier.companyName);//赋值处置单位名称
                            $('#bankName').prop("value",suppier.bankName);
                            //赋值开户行账号
                            $('#bankAccount').prop("value",suppier.bankAccount);
                            $('#company1').prop("value",suppier.companyName);
                        }
                        else {
                            alert(result.message);
                        }
                    },
                    error:function (result) {
                        alert("服务器异常！");
                    }
                });
            } else {
                //console.log(result);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });
}

//保存物流合同
function contractLogicSave() {
    var addType = $("input[name='addType']:checked").val();
    //console.log(addType);
    //console.log($('input[name="contractVersion"]:checked').val())
    if($('input[name="contractVersion"]:checked').val()=='customerContract'){
        var data={
            supplier:{supplierId:$('#suppier').selectpicker('val')},
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractName').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        //console.log(data);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //console.log(result);
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });
    }
    if($('input[name="contractVersion"]:checked').val()=='companyContract'){
        var data={
            supplier:{supplierId:$('#suppier').selectpicker('val')},
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractType1').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        //console.log(data);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //console.log(result);
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });

    }

    $('.myclass').each(function(){
        var quotationItemData={
            supplier:{supplierId:$('#suppier').selectpicker('val')} ,
            wastesCode:$(this).children('td').eq(1).children('div').find('button').attr('title'),
            wastesName:$(this).children('td').eq(2).children('input').val(),
            packageType:$(this).children('td').eq(3).children('select').val(),
            transport:$(this).children('td').eq(8).children('select').val(),
            util:$(this).children('td').eq(4).children('input').val(),
            unitPriceTax:$(this).children('td').eq(5).children('input').val(),
            contractAmount:$(this).children('td').eq(6).children('input').val(),
            totalPrice:$(this).children('td').eq(7).children('input').val(),
        };
        //console.log(quotationItemData);
        //1添加报价单明细
        $.ajax({
            type:'POST',
            url:"addQuotationItem",
            data:JSON.stringify(quotationItemData),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    //console.log(result);
                }
                else {
                    alert(result.message);

                }
            },
            error:function (result) {
                alert("服务器异常！");
            }
        });
    });
    alert("添加成功！")
    if(addType=='continue'){
        $(location).attr('href', 'logisticsContractInfo.html');
    }
    if(addType=='break'){
        localStorage.clear();
        $(location).attr('href', 'contractManage.html');
        localStorage.name="Logistics";
        location.href="contractManage.html";

    }

}



/*************合同修改部分****************/

/**危废合同修改*/
/**
 * 装载危废合同修改下拉框列表
 */
function loadContractSelectList() {

    //危废编码赋值
    $.ajax({
        type:'POST',
        url:"getWastesInfoList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
                // console.log(result);
                var obj=eval(result);
                var wastesCode=$('#wastesCode');
                wastesCode.children().remove();
                $.each(obj.data,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.code);
                    option.text(item.code);
                    wastesCode.append(option);
                });
                wastesCode.removeAttr('id');
                $('.selectpicker').selectpicker('refresh');
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });

    //运输方式
    $.ajax({
        type:'POST',
        url:"getTransportTypeList",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined && result.status == "success"){
                // console.log(result);
                var transportType=$('#transportType');
                transportType.children().remove();
                $.each(result.transportTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    transportType.append(option);
                });
                transportType.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });

    //包装类型
    $.ajax({
        type:'POST',
        url:"getFormTypeAndPackageType",
        //data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result){
            if (result != undefined){
                // console.log(result);
                var packageType=$('#packageType');
                packageType.children().remove();
                $.each(result.packageTypeList,function (index,item) {
                    var option=$('<option/>');
                    option.val(item.index);
                    option.text(item.name);
                    packageType.append(option);
                });
                packageType.get(0).selectedIndex=0;
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            console.log(result);
        }

    });
    var contractType=$('#contractType');

    contractType.hide();//隐藏合同类别

    $('.selectpicker').selectpicker({
        language: 'zh_CN',
        size: 4
    });

    //接收传过来的合同编号
    var contractId=localStorage['contractId'];

    //取得下拉菜单的选项
    $('#contractId').prop("value",contractId);

    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractId1",                  // url
        dataType: "json",
        data:{'contractId':contractId,"key":'危废'},//key是查询危废类别的模板
        success: function (result) {
            var data=eval(result);
            var contract= data.contract;
            console.log(contract);
            $.ajax({
                type: "POST",                            // 方法类型
                url: "getContractBymodelName1",                  // url
                dataType: "json",
                data:{'modelName':contract.modelName},//如果是公司合同就会有合同模板名称作为合同名称
                success:function (result) {
                    var obj=eval(result);
                    if(obj!=null){
                        $('#content').val(obj.contractContent);//获得模板的内容
                    }

                },
                error:function (result) {
                    alert("服务器异常！")

                }
            });
            if(contract.beginTime!=null){
                $("#beginTime").prop("value",getTime(contract.beginTime));
            }
            else {
                $("#beginTime").prop("value","");
            }
            //赋值截止时间
            if(contract.endTime!=null){
                $("#endTime").prop("value",getTime(contract.endTime));
            }
            else {
                $("#endTime").prop("value","");
            }
            //赋值是否包含运费
            var freight=contract.freight;
            if(freight=="false"||freight==false){
                $('#isFreight').removeAttr("checked");
                $('#isFreight').prop("checked",false);
                $('#isFreight').prop("value",false);
            }
            if(freight==true||freight=="true"){
                $('#isFreight').removeAttr("checked");
                $('#isFreight').prop("checked",true);
                $('#isFreight').prop("value",true);
            }
            //赋值合同版本
            var contractVersion=contract.contractVersion.name;
            if(contractVersion=='公司合同'){
                contractVersion='companyContract'
                //赋值合同名称
                $('#contractName').prop("value",contract.contractName);
            }
            if(contractVersion=='产废单位合同'){
                contractVersion='customerContract'
                $('#contractName').prop("value",contract.contractName);
            }
            $(":radio[name='contractVersion'][value='" +contractVersion+"']").prop("checked", "checked");
            if(contractVersion=="companyContract"){
                //执行方法
                $('#contractVersion').click();
            }
            if(contractVersion=="customerContract"){
                //执行方法
                $('#contractVersion2').click();
            }

            //赋值联系人
            $('#contactName').prop("value",contract.contactName);
            //赋值开户行名称
            $('#bankName').prop("value",contract.bankName);
            //赋值开户行账号
            $('#bankAccount').prop("value",contract.bankAccount);
            //联系电话
            $('#telephone').prop("value",contract.telephone);
            if (result != undefined) {
                // 各下拉框数据填充
                //省级填充
                // index1="";
                // var province = $("#province");
                // province.children().remove();
                // $.each(data.provinceStrList, function (index, item) {
                //     var option = $('<option />');
                //     option.val(index);
                //     option.text(item.name);
                //     if(data.province!=null){
                //         if(item.name==contract.province.name){
                //             index1=index;
                //         }
                //     }else {
                //         index1=-1;
                //     }
                //
                //     province.append(option);
                // });
                // province.get().selectedIndex=index1;
                // $('.selectpicker').selectpicker('refresh');
                // console.log(provinceId);//省市ID
                //获取相应的市级
                // provinceId=contract.province.index;
                // $.ajax({
                //     type: "POST",                            // 方法类型
                //     url: "getCityList",                  // url
                //     dataType: "json",
                //     data:{
                //         'provinceId': provinceId
                //     },
                //     success: function (result) {
                //         if (result != undefined) {
                //             var data = eval(result);
                //             //console.log(data);
                //             //var contractName = $("#contractName");
                //             //下拉框填充
                //             var city=$("#city");
                //             city.children().remove();
                //             cityIndex="";
                //             $.each(data, function (index, item) {
                //                 //  console.log(item);
                //                 var option1 = $('<option />');
                //                 option1.val(item.cityname);
                //                 option1.text(item.cityname);
                //                 if(data.city==item.cityname){
                //                     cityIndex=index;
                //                 }
                //                 city.append(option1);
                //             });
                //             $('.selectpicker').selectpicker('refresh');
                //             city.get(0).selectedIndex = cityIndex;
                //         } else {
                //             console.log(result);
                //         }
                //     },
                //     error:function (result) {
                //         console.log(result);
                //     }
                // });
                //产废单位名称下拉框
                //赋值产废单位名称
                //处置单位名称
                var clientName=$('#companyName');
                clientName.children().remove();
                index2="";
                $.each(data.companyNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.clientId);
                    option.text(item.companyName);
                    if(item.companyName==contract.client.companyName){
                        index2=index;
                    }
                    clientName.append(option);
                });
                clientName.get(0).selectedIndex =index2;
                $('.selectpicker').selectpicker('refresh');
                // $.ajax({
                //     type: "POST",                       // 方法类型
                //     url: "getClientListById",                  // url
                //     data:{'clientId':$("#companyName option:selected").val()},
                //     async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                //     dataType: "json",
                //     //contentType: "application/json; charset=utf-8",
                //     success:function (result) {
                //         if (result != undefined && result.status == "success") {
                //             // console.log(result);
                //             var company=result.client;//取得被选中处置单位的信息
                //             //console.log(company);
                //             var taxRate1=$('#taxRate1');
                //             i="";
                //             taxRate1.children().remove();
                //             $.each(data.ticketRateStrList1, function (index, item) {
                //                 // console.log(item);
                //                 var option = $('<option />');
                //                 option.val(index);
                //                 option.text(item.name);
                //                 if(company.ticketType!=null){
                //                     if(company.ticketType.name==item.name){
                //                         i=index;
                //                     }
                //                 }
                //                 else {
                //                     i=-1;
                //                 }
                //                 taxRate1.append(option);
                //             });
                //             taxRate1.get(0).selectedIndex = i;
                //             $('#contactName').prop("value",company.contactName);
                //             //赋值联系方式
                //             if(company.mobile!=""&&company.phone==""){
                //                 $('#telephone').prop("value",company.mobile);
                //             }
                //             if(company.mobile==""&&company.phone!=""){
                //                 $('#telephone').prop("value",company.phone);
                //             }
                //             if(company.mobile==""&&company.phone==""){
                //                 $('#telephone').prop("value","");
                //             }
                //             if(company.mobile!=""&&company.phone!="") {
                //                 $('#telephone').prop("value", company.mobile);
                //             }
                //             $('#bankName').prop("value",company.bankName);
                //             //赋值开户行账号
                //             $('#bankAccount').prop("value",company.bankAccount);
                //             $('#company1').prop("value",company.companyName);
                //         }
                //         else {
                //             alert(result.message);
                //         }
                //     },
                //     error:function (result) {
                //         alert("服务器异常！");
                //     }
                // });

                // if(contract.company1!=""){
                //     $('#company1').prop("value",contract.company1);
                // }
                // else {
                //     var options1=$("#companyName option:selected").val(); //获取选中的项
                //     //  console.log(options1);
                //     var company=data.companyNameList[options1];//取得被选中处置单位的信息
                //     $('#company1').prop("value",company.companyName);
                // }
                //赋值模板列表
                var contractType1=$('#contractType1');
                contractType1.children().remove();
                index3="";
                $.each(data.modelNameList, function (index, item) {
                    var option = $('<option />');
                    option.val(item.modelName);
                    option.text(item.modelName);
                    if(item.modelName==contract.modelName){
                        index3=index;
                    }
                    contractType1.append(option);
                });
                contractType1.get(0).selectedIndex =index3;
                //开票税率1下拉框
                var ticketRate1=$('#taxRate1');
                ticketRate1.children().remove();
                index4="";
                $.each(data.ticketRateStrList1, function (index, item) {
                    //看具体的item 在指定val
                    //console.log(item);
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    if(contract.ticketRate1!=null){
                        if(contract.ticketRate1.name==item.name){
                            index4=index;
                        }
                    }
                    else index4=-1;
                    ticketRate1.append(option);
                });
                ticketRate1.get(0).selectedIndex=index4;
                //开票税率2下拉框
           $.each(contract.quotationItemList,function (index,item) {
               $('.selectpicker').selectpicker( {
                   language: 'zh_CN',
                   // style: 'btn-info',
                   size: 4
               });//下拉框样式
                  var tr=$('#cloneTr1');
                  // tr.siblings().remove();
                   var cloneTr=tr.clone();
                   cloneTr.attr('class','myclass');
                   cloneTr.show();
                  var delBtn = "<a class='btn btn-default btn-xs' onclick='delLine(this);'><span class='glyphicon glyphicon-minus' aria-hidden='true'></span></a>&nbsp;";
                   cloneTr.children('td').eq(0).html(parseInt(contract.quotationItemList.length)-index);
                    cloneTr.children("td:eq(0)").append(delBtn);
                   cloneTr.children('td').eq(2).children('input').val(item.wastesName);
                   cloneTr.children('td').eq(4).children('input').val(item.util);
                   cloneTr.children('td').eq(5).children('input').val(item.unitPriceTax);
                   cloneTr.children('td').eq(6).children('input').val(item.contractAmount);
                   cloneTr.children('td').eq(7).children('input').val(item.totalPrice);
                   if(item.packageType!=null){
                       cloneTr.children('td').eq(3).children('select').val(item.packageType.index);
                   }
                   if(item.transport!=null){
                       cloneTr.children('td').eq(8).children('select').val(item.transport.index);
                   }
                   cloneTr.children('td').eq(1).find('select').selectpicker('val',item.wastesCode);
                   cloneTr.removeAttr('id');
                   cloneTr.insertAfter(tr);
                   $('.selectpicker').data('selectpicker', null);
                   $('.bootstrap-select').find("button:first").remove();
                   $('.selectpicker').selectpicker();
                   $('.selectpicker').selectpicker('refresh');
                   tr.hide();
                   tr.removeAttr('class');

           });



            }
            else {
                console.log(result);
            }
        },
        error:function (result) {
            console.log(result);
        }
    });


}


/**
 * 危废合同修改
 */
function contractAdjustSave() {
    if($('input[name="contractVersion"]:checked').val()=='customerContract'){
        var data={
            contractId:$('#contractId').val(),
            client:{clientId:$('#companyName').selectpicker('val')} ,
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractName').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        console.log(data);
        $.ajax({
            type:'POST',
            url:"updateContract",
            data:JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    $('.myclass').each(function(){
                        var quotationItemData={
                            contractId:$('#contractId').val(),
                            client:{clientId:$('#companyName').selectpicker('val')} ,
                            wastesCode:$(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName:$(this).children('td').eq(2).children('input').val(),
                            packageType: $(this).children('td').eq(3).children('select').get(0).selectedIndex,
                            transport:$(this).children('td').eq(8).children('select').get(0).selectedIndex,
                            util:$(this).children('td').eq(4).children('input').val(),
                            unitPriceTax:$(this).children('td').eq(5).children('input').val(),
                            contractAmount:$(this).children('td').eq(6).children('input').val(),
                            totalPrice:$(this).children('td').eq(7).children('input').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type:'POST',
                            url:"updateQuotationItem",
                            data:JSON.stringify(quotationItemData),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success:function (result) {
                                if (result != undefined && result.status == "success"){
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error:function (result) {
                                alert("服务器异常");

                            }
                        });
                    });
                    alert("修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    //location.href="contractManage.html";
                    localStorage.name="Wastes";
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常");

            }
        });
    }
    if($('input[name="contractVersion"]:checked').val()=='companyContract'){
        var data={
            contractId:$('#contractId').val(),
            client:{clientId:$('#companyName').selectpicker('val')},
            contractVersion:$('input[name="contractVersion"]:checked').val(),
            beginTime:$('#beginTime').val(),
            endTime:$('#endTime').val(),
            contractName:$('#contractType1').val(),
            bankName:$('#bankName').val(),
            bankAccount:$('#bankAccount').val(),
            freight:$('#isFreight').prop('checked'),
            telephone:$('#telephone').val(),
            contactName:$('#contactName').val(),
            ticketRate1:$('#taxRate1').val(),
            contractType:$('#contractType').val(),
        };
        console.log(data);
        $.ajax({
            type:'POST',
            url:"updateContract",
            data:JSON.stringify(data),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    $('.myclass').each(function(){
                        var quotationItemData={
                            contractId:$('#contractId').val(),
                            client:{clientId:$('#companyName').selectpicker('val')} ,
                            wastesCode:$(this).children('td').eq(1).children('div').find('button').attr('title'),
                            wastesName:$(this).children('td').eq(2).children('input').val(),
                            packageType:$(this).children('td').eq(3).children('select').val(),
                            transport:$(this).children('td').eq(8).children('select').val(),
                            util:$(this).children('td').eq(4).children('input').val(),
                            unitPriceTax:$(this).children('td').eq(5).children('input').val(),
                            contractAmount:$(this).children('td').eq(6).children('input').val(),
                            totalPrice:$(this).children('td').eq(7).children('input').val(),
                        };
                        console.log(quotationItemData);
                        //1添加报价单明细
                        $.ajax({
                            type:'POST',
                            url:"updateQuotationItem",
                            data:JSON.stringify(quotationItemData),
                            dataType: "json",
                            contentType: "application/json;charset=utf-8",
                            success:function (result) {
                                if (result != undefined && result.status == "success"){
                                    console.log(result)
                                }
                                else {
                                    alert(result.message);
                                }
                            },
                            error:function (result) {
                                alert("服务器异常");

                            }
                        });
                    });
                    console.log(result)
                    alert("修改成功!");
                    $(location).attr('href', 'contractManage.html');
                    //location.href="contractManage.html";
                    localStorage.name="Wastes";
                }
                else {
                    alert(result.message);
                }
            },
            error:function (result) {
                alert("服务器异常");

            }
        });

    }
}
