/*********************
 * jackYang
 */
function showClientFiles(e) {
    var clientId = getClientId(e);
    window.location.href = "archives.html?clientId=" + clientId;
}

var currentPage = 1;                          //当前页数

/**
 * 返回count值
 * */
function countValue(){
    var mySelect=document.getElementById("count");
    var index=mySelect.selectedIndex;
    return mySelect.options[index].text;
}
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "totalRecord",                  // url
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
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setClientList(result);
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
    console.log("当前页：" + pageNumber);
    if (pageNumber === 0) {                 //首页
        pageNumber = 1;
    }
    if (pageNumber === -2) {
        pageNumber = totalPage();        //尾页
    }
    if (pageNumber == null || pageNumber === undefined) {
        console.log("参数为空,返回首页!");
        pageNumber = 1;
    }
    $("#current").find("a").text("当前页："+pageNumber);
    if (pageNumber === 1) {
        $("#previous").addClass("disabled");
        $("#firstPage").addClass("disabled");
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    if (pageNumber === totalPage()) {
        $("#next").addClass("disabled");
        $("#endPage").addClass("disabled");
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if(pageNumber > 1){
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if(pageNumber < totalPage()){
        $("#next").removeClass("disabled");
        $("#endPage").removeClass("disabled");
    }
    var page = {};
    page.count = countValue();                        //可选
    page.pageNumber = pageNumber;
    currentPage = pageNumber;          //当前页面
    //addClass("active");
    page.start = (pageNumber - 1) * page.count;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadPageClientList",         // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(page),
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result !== undefined) {
                setClientList(result);
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
    $("#current").find("a").text("当前页："+pageNumber);
    if (pageNumber === null || pageNumber === undefined) {
        window.alert("跳转页数不能为空！")
    } else {
        if (pageNumber === 1) {
            $("#previous").addClass("disabled");
            $("#firstPage").addClass("disabled");
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        if (pageNumber === totalPage()) {
            $("#next").addClass("disabled");
            $("#endPage").addClass("disabled");
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if(pageNumber > 1){
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if(pageNumber < totalPage()){
            $("#next").removeClass("disabled");
            $("#endPage").removeClass("disabled");
        }
        currentPage = pageNumber;
        var page = {};
        page.count = countValue();//可选
        page.pageNumber = pageNumber;
        page.start = (pageNumber - 1) * page.count;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageClientList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result !== undefined) {
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


    }
}
function getWeekDate() {
    //获取时间
    var obj = new Date();
    var year = obj.getFullYear();
    var month = obj.getMonth()+1;
    var day = obj.getDate();
    if(day % 7 > 0)  var a = 1; else a = 0;
    var days = new Date();
    days.setFullYear(year);
    days.setMonth(month);
    days.setDate(1);
    if(day.getDay() <= days.getDay()){
        var week = parseInt(day / 7) + a + 1;
    }else {
        week = parseInt(day / 7) + a;
    }
    return "第" + week + "周";

}
/**
 * 分页 获取首页内容
 * */
/*加载物料需求列表*/
function loadPageMaterialList() {
    $.ajax({
        type:"POST",
        url:"getMaterialList",
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result !== undefined && result.status === "success"){
                console.log(result);
                var obj=result.array;
                var n=result.length;
                //设置下拉框数据
                setMaterialList(obj,n);
            }
            else {
                alert(result.message);
            }
        },
        error:function (result) {
            alert("服务器异常！")
        }
    });
}
/*加载表格数据*/
function setMaterialList(obj,n) {
    arrayId = [];
    var tr = $("#cloneTr1");//克隆一行
    //tr.siblings().remove();
    //每日配比量合计
   // tr.siblings().remove();
    dailyProportionsTotal=0;
    //每周需求总量
    weeklyDemandTotal=0;
    //热值最大总量
    calorificmaxTotal=0;
    //热值最小总量
    calorificminTotal=0;
    //灰分最大总量
    ashmaxTotal=0;
    //灰分最小总量
    ashminTotal=0;
    //水分最大总量
    watermaxTotal=0;
    //水分最小总量
    waterminTotal=0;
    //氯最大总量
    clmaxTotal=0;
    //氯最大总量
    clminTotal=0;
    //硫最大总量
    smaxTotal=0;
    //硫最小总量
    sminTotal=0;
    //磷最大总量
    pmaxTotal=0;
    //磷最小总量
    pminTotal=0;
    //弗最大总量
    fmaxTotal=0;
    //弗最小总量
    fminTotal=0;
    //PH最大总量
    phmaxTotal=0;
    //PH最小总量
    phminTotal=0;
    //目前库存总量
    currentInventoryTotal=0;
    //安全库存总和
    safetyTotal=0;
    //市场采购量总和
    marketPurchasesTotal=0;
    $.each(obj, function (index, item) {
        var data = eval(item);
        var clonedTr = tr.clone();
        clonedTr.children("td").each(function (inner_index) {
            // 根据索引为部分td赋值
            switch (inner_index) {
                // 序号
                case (0):
                    var num = parseInt(data.id)
                    $(this).html(num);
                    break;
                //处理类别
                case (1):
                    // $(this).html();
                    //判断是否是物流合同
                    if (data.handleCategory != null) {
                        $(this).html(data.handleCategory.name);
                    }
                    else {
                        $(this).html("");
                    }
                    break;
                // 包装方式
                case (2):
                    if (data.packageType != null)
                        $(this).html(data.packageType.name);
                    else {
                        $(this).html("");
                    }
                    break;
                //形态
                case (3):
                    if (data.formType != null) {
                        $(this).html(data.formType.name);
                    }
                    else { $(this).html("");}

                    break;
                // 周生产计划量(T)
                case (4):
                    $(this).html(data.weeklyDemand);
                    dailyProportionsTotal+=data.weeklyDemand;
                    break;
                //目前库存量(T)
                case (5):
                    $(this).html(data.currentInventory);
                    currentInventoryTotal+=data.currentInventory;
                    break;
                // 安全库存量(T)
                case (6):
                    $(this).html(data.safety);
                    safetyTotal+=data.safety;
                    break;
                // 市场采购量
                case (7):
                    $(this).html(data.marketPurchases);
                    marketPurchasesTotal+=data.marketPurchases;
                    break;
                //热值max
                case (8):
                    $.each(obj[index].wastesList[index].parameterList, function (index,item) {
                       var obj1=eval(item);
                        if (obj1.parameter.name =="热值") {
                            calorificmax=obj1.maximum;
                           calorificmaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(calorificmax);
                    break;
                //热值min
                case (9):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="热值") {
                            calorificmix= obj1.minimum;
                            calorificminTotal+=obj1.minimum;;
                        }
                    });
                    $(this).html(calorificmix);
                    break;
                //灰分max
                case (10):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="灰分") {
                            ascmax= obj1.maximum;
                            ashmaxTotal+=obj1.maximum;

                        }
                    });
                    $(this).html(ascmax);
                    break;
                //灰分min
                case (11):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="灰分") {
                            ascmix= obj1.minimum;
                            ashminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(ascmix);
                    break;
                //水分max
                case (12):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="含水率") {
                            watermax= obj1.maximum;
                            watermaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(watermax);
                    break;
                //水分min
                case (13):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="含水率") {
                            watermin= obj1.minimum;
                            waterminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(watermin);
                    break;
                   //硫max
                case (14):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="硫含量") {
                            smax= obj1.maximum;
                            smaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(smax);
                    break;
                   //硫min
                case (15):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="硫含量") {
                            smin= obj1.minimum;
                            sminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(smin);
                    break;
                    //氯max
                case (16):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="氯含量") {
                            clmax= obj1.maximum;
                            clmaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(clmax);
                    break;
                    //氯min
                case (17):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="氯含量") {
                            clmin= obj1.minimum;
                            clminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(clmin);
                    break;
                //磷max
                case (18):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="磷含量") {
                            pmax= obj1.maximum;
                            pmaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(pmax);
                    break;
                //磷min
                case (19):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="磷含量") {
                            pmin= obj1.minimum;
                            pminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(pmin);
                    break;
                //氟max
                case (20):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="氟含量") {
                            fmax= obj1.maximum;
                            fmaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(fmax);
                    break;
                //氟min
                case (21):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="氟含量") {
                            fmin= obj1.minimum;
                            fminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(fmin);
                    break;
                //phmax
                case (22):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="酸碱度") {
                            phmax= obj1.maximum;
                            phmaxTotal+=obj1.maximum;
                        }
                    });
                    $(this).html(phmax);
                    break;
                //phmin
                case (23):
                    $.each(obj[index].wastesList[index].parameterList, function (index, item) {
                        var obj1 = eval(item);
                        if (obj1.parameter.name =="酸碱度") {
                            phmin= obj1.minimum;
                            phminTotal+=obj1.minimum;
                        }
                    });
                    $(this).html(phmin);
                    break;
                //状态
                case (24):
                    if(data.checkState!=null){
                        $(this).html(data.checkState.name);
                    }
                    else {
                        $(this).html("");
                    }
                    break;
                //备注
                case (25):
                    $(this).html(data.remarks);
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.removeAttr("style");
        clonedTr.insertBefore(tr);

    });
    // 隐藏无数据的tr
    tr.hide();
    //赋值
    $("#dailyProportionsTotal").text(dailyProportionsTotal);
    $("#currentInventoryTotal").text(currentInventoryTotal);
    $("#safetyTotal").text(safetyTotal);
    $("#marketPurchasesTotal").text(marketPurchasesTotal);
    $("#calorificmaxTotal").text(calorificmaxTotal);
    $("#calorificminTotal").text(calorificminTotal);
    $("#ashmaxTotal").text(ashmaxTotal);
    $("#ashminTotal").text(ashminTotal);
    $("#watermaxTotal").text(watermaxTotal);
    $("#waterminTotal").text(waterminTotal);
    $("#smaxTotal").text(smaxTotal);
    $("#sminTotal").text(sminTotal);
    $("#clmaxTotal").text(clmaxTotal);
    $("#clminTotal").text(clminTotal);
    $("#pmaxTotal").text(pmaxTotal);
    $("#pminTotal").text(pminTotal);
    $("#fmaxTotal").text(fmaxTotal);
    $("#fminTotal").text(fminTotal);
    $("#phmaxTotal").text(phmaxTotal);
    $("#phminTotal").text(clminTotal);
}
/*导入物料需求*/
function importMaExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importMaterialRequireIdExcel",              // url
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