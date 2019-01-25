
var isSearch = false;
var currentPage = 1;                          //当前页数
var data1;
/**
 * 模态框
 */
function showModal(item) {
    $("#cloneTr2").siblings().remove();
    var id=$(item).parent().prev().prev().html();

    var clientId=$(item).parent().prev().html();
    var wastesName=$(item).parent().parent().children('td').eq(3).html();
    var wastesCode=$(item).parent().parent().children('td').eq(4).html();

    var data={
        id: id,
        produceCompany: { clientId:clientId },
        wastesName: wastesName,
        wastesCode: wastesCode
    };

    console.log(id);
    
    $.ajax({
        type: "POST",                       // 方法类型
        url: "comparison",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success:function (result) {
            if (result != undefined && result.status == "success"){
            // console.log(result)
            setCompareList(result);
            }
        },
        error:function (result) {
            
        }
    });

    $("#comparison").modal('show');
}

function setCompareList(result) {
    console.log(result);
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr2");

    var sampleInfoAnalysis=result.sampleInfoAnalysis;


    var clonedTr = tr.clone();

    clonedTr.show();
 if(sampleInfoAnalysis.produceCompany !=null){
     clonedTr.children('td').eq(1).html(sampleInfoAnalysis.produceCompany.companyName)
 }
    clonedTr.children('td').eq(2).html(sampleInfoAnalysis.wastesName);
    clonedTr.children('td').eq(3).html(sampleInfoAnalysis.wastesCode);
    if(sampleInfoAnalysis.formType!=null){
        clonedTr.children('td').eq(4).html(sampleInfoAnalysis.formType.name);
    }
    clonedTr.children('td').eq(5).html(setNumber2Line(sampleInfoAnalysis.PH.toFixed(2)));
    clonedTr.children('td').eq(6).html(setNumber2Line(sampleInfoAnalysis.ash.toFixed(2)));
    clonedTr.children('td').eq(7).html(setNumber2Line(sampleInfoAnalysis.chlorine.toFixed(2)));
    clonedTr.children('td').eq(8).html(setNumber2Line(sampleInfoAnalysis.sulfur.toFixed(2)));
    clonedTr.children('td').eq(9).html(setNumber2Line(sampleInfoAnalysis.chlorine.toFixed(2)));
    clonedTr.children('td').eq(10).html(setNumber2Line(sampleInfoAnalysis.fluorine.toFixed(2)));
    clonedTr.children('td').eq(11).html(setNumber2Line(sampleInfoAnalysis.phosphorus.toFixed(2)));
    clonedTr.children('td').eq(12).html(setNumber2Line(sampleInfoAnalysis.flashPoint.toFixed(2)));
    clonedTr.children('td').eq(13).html(setNumber2Line(sampleInfoAnalysis.viscosity));
    clonedTr.children('td').eq(14).html(setNumber2Line(sampleInfoAnalysis.hotMelt));
    clonedTr.removeAttr("id");
    clonedTr.insertBefore(tr);
    // tr.siblings().remove();
    $.each(result.receiveSampleAnalysisList, function (index, item) {
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        if(obj.produceCompany !=null){
            clonedTr.children('td').eq(1).html(obj.produceCompany.companyName)
        }
        clonedTr.children('td').eq(2).html(obj.wastesName);
        clonedTr.children('td').eq(3).html(obj.wastesCode);
        if(obj.formType!=null){
            clonedTr.children('td').eq(4).html(obj.formType.name);
        }
        clonedTr.children('td').eq(5).html(setNumber2Line(obj.PH.toFixed(2)));
        clonedTr.children('td').eq(6).html(setNumber2Line(obj.ash.toFixed(2)));
        clonedTr.children('td').eq(7).html(setNumber2Line(obj.chlorine.toFixed(2)));
        clonedTr.children('td').eq(8).html(setNumber2Line(obj.sulfur.toFixed(2)));
        clonedTr.children('td').eq(9).html(setNumber2Line(obj.chlorine.toFixed(2)));
        clonedTr.children('td').eq(10).html(setNumber2Line(obj.fluorine.toFixed(2)));
        clonedTr.children('td').eq(11).html(setNumber2Line(obj.phosphorus.toFixed(2)));
        clonedTr.children('td').eq(12).html(setNumber2Line(obj.flashPoint.toFixed(2)));
        clonedTr.children('td').eq(13).html(setNumber2Line(obj.viscosity));
        clonedTr.children('td').eq(14).html(setNumber2Line(obj.hotMelt));
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();

}

/**
 * 危废入场分析日报
 * */
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    console.log("查询条件");
    console.log(data1);
    if (!isSearch) {
        data1 = {};
        $.ajax({
            type: "POST",                       // 方法类型
            url: "countSampleInfoAnalysis",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    if (result.data > 0) {
                        totalRecord = result.data;
                        console.log("总记录数为:"+result.data);
                    } else {
                        console.log("fail: " + result.data);
                        totalRecord = 0;
                    }
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
            url: "countSampleInfoAnalysis",                  // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    if (result.data > 0) {
                        totalRecord = result.data;
                        console.log("总记录数为:"+result.data);
                    } else {
                        console.log("fail: " + result.data);
                        totalRecord = 0;
                    }
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
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
}

/**
 * 克隆页码
 * @param result
 */
function setPageClone(result) {
    $(".beforeClone").remove();
    setDataList(result);
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
 * 设置数据
 * @param result
 */
function setDataList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result, function (index, item) {
        var obj = eval(item);
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.find("td[name='id']").text(obj.id);
        clonedTr.find("td[name='transferDraftId']").text(obj.transferDraftId);
        if (obj.produceCompany != null) clonedTr.find("td[name='produceCompanyName']").text(obj.produceCompany.companyName);
        clonedTr.find("td[name='clientId']").html(obj.produceCompany.clientId);
        clonedTr.find("td[name='wastesName']").text(obj.wastesName);
        clonedTr.find("td[name='wastesCode']").text(obj.wastesCode);
        if(obj.formType != null)
            clonedTr.find("td[name='formType']").text(obj.formType.name);
        clonedTr.find("td[name='PH']").text(setNumber2Line(parseFloat(obj.PH).toFixed(0)));
        clonedTr.find("td[name='ash']").text(setNumber2Line(parseFloat(obj.ash).toFixed(2)));
        clonedTr.find("td[name='water']").text(setNumber2Line(parseFloat(obj.water).toFixed(2)));
        clonedTr.find("td[name='heat']").text(setNumber2Line(parseFloat(obj.heat).toFixed(2)));
        clonedTr.find("td[name='sulfur']").text(setNumber2Line(parseFloat(obj.sulfur).toFixed(2)));
        clonedTr.find("td[name='chlorine']").text(setNumber2Line(parseFloat(obj.chlorine).toFixed(2)));
        clonedTr.find("td[name='fluorine']").text(setNumber2Line(parseFloat(obj.fluorine).toFixed(2)));
        clonedTr.find("td[name='phosphorus']").text(setNumber2Line(parseFloat(obj.phosphorus).toFixed(2)));
        clonedTr.find("td[name='flashPoint']").text(setNumber2Line(parseFloat(obj.flashPoint).toFixed(2)));
        clonedTr.find("td[name='viscosity']").text(setNumber2Line(obj.viscosity));
        clonedTr.find("td[name='hotMelt']").text(setNumber2Line(obj.hotMelt));
        clonedTr.find("td[name='signer']").text(obj.signer);
        clonedTr.find("td[name='remark']").text(obj.remark);
        clonedTr.find("td[name='id']").text(obj.id);

        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
    });
    // 隐藏无数据的tr
    tr.hide();
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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
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
    $("#current").find("a").text("当前页：" + pageNumber);
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
        var data1 = {};
        data1.page = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getSampleInfoAnalysis",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    setDataList(result.data);
                } else {
                    console.log(result);
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
            url: "searchWastesDailyCount",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result !== undefined && result.status === "success") {
                    if (result.data > 0) {
                        totalRecord = result;
                        console.log("总记录数为:" + result);
                    } else {
                        console.log("fail: " + result);
                        totalRecord = 0;
                    }
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
    if (pageNumber == null || pageNumber === undefined) {
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
                url: "getSampleInfoAnalysis",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: page,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        console.log(result);
                        setDataList(result.data);
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
                url: "searchWastesDailyCount",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data1),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        // console.log(result);
                        if (result.data > 0) {
                            totalRecord = result;
                            console.log("总记录数为:" + result);
                        } else {
                            console.log("fail: " + result);
                            totalRecord = 0;
                        }
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
 * 分页 获取首页内容
 * */
function loadPageList() {
    loadNavigationList(); // 设置动态菜单
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
    var data1 = {};
    data1.page = page;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getSampleInfoAnalysis",   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify(data1),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                console.log(result);
                setPageClone(result.data);
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
    //加载高级查询的废物形态

    $.ajax({
        type: "POST",                       // 方法类型
        url: "getFormTypeAndPackageType",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var formType = $("#search-type");
                formType.children().remove();
                $.each(data.formTypeList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    formType.append(option);
                });
                formType.get(0).selectedIndex = -1;
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
}





$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchWasteInto();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchWasteInto();      //
            }
        },600);
    });
});


function searchWasteInto() {
    isSearch = true;
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;

    if ($("#senior").is(':visible')) {
        var formType=null;

        if($("#search-type").val()==0)
            formType="Gas";
        if($("#search-type").val()==1)
            formType="Liquid";
        if($("#search-type").val()==2)
            formType="Solid";
        if($("#search-type").val()==3)
            formType="HalfSolid";
        if($("#search-type").val()==4)
            formType="Solid1AndHalfSolid";
        if($("#search-type").val()==5)
            formType="HalfSolidAndLiquid";
        if($("#search-type").val()==6)
            formType="Solid1AndLiquid";



        data1 = {
            produceCompany:{companyName:$.trim($('#search-receiveDate').val())},
            transferDraftId:$.trim($('#search-remarks').val()),
            formType:formType,
            wastesName:$.trim($('#search-wastesName').val()),
            wastesCode:$.trim($('#search-wastesCategory').val()),
            page: page,

        };
    }
    else{
        var keyword = $.trim($("#searchContent").val());
         if(keyword=='固态'){
             keyword='Solid'
         }
        if(keyword=='液态'){
            keyword='Liquid'
        }
        if(keyword=='半固态'){
            keyword='HalfSolid'
        }



        data1 = {
            page: page,
            keyword: keyword
        }
    }


    if (data1 == null) alert("请点击'查询设置'输入查询内容!");
    else {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "searchWastesDaily",                 // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data1),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result)
                    setPageClone(result.data)
                    setPageCloneAfter(pageNumber)
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
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchWasteInto();      //
    }
}

/**
*
* 导出
* @returns {string}
*/
function exportExcel() {
    var name = 'wastesAnalysis';
    // 获取勾选项
    var idArry = [];
    $.each($("input[name='select']:checked"), function (index, item) {
        idArry.push(item.parentElement.parentElement.nextElementSibling.innerHTML);        // 将选中项的编号存到集合中
    });
    var sqlWords = '';
    var sql = ' in (';
    if (idArry.length > 0) {
        for (var i = 0; i < idArry.length; i++) {          // 设置sql条件语句
            if (i < idArry.length - 1) sql += "'" + idArry[i] + "'" + ",";
            else if (i == idArry.length - 1) sql += "'" + idArry[i] + "'" + ");";
        }
        sqlWords = "select transferDraftId,(select companyName from client where clientId = produceCompanyId),\n" +
            "wastesName,wastesCode,formType,replace(PH,-9999,''),replace(ash,-9999,''),replace(water,-9999,''),\n" +
            "replace(heat,-9999,''),replace(sulfur,-9999,''),replace(fluorine,-9999,''),replace(chlorine,-9999,''),\n" +
            "replace(phosphorus,-9999,''),replace(flashPoint,-9999,''),replace(viscosity,'-9999',''),replace(hotMelt,'-9999','') \n" +
            "from t_pr_sampleinfoanalysis where transferDraftId " + sql;
    } else {          // 若无勾选项则导出全部
        sqlWords = "select transferDraftId,(select companyName from client where clientId = produceCompanyId),\n" +
            "wastesName,wastesCode,formType,replace(PH,-9999,''),replace(ash,-9999,''),replace(water,-9999,''),\n" +
            "replace(heat,-9999,''),replace(sulfur,-9999,''),replace(fluorine,-9999,''),replace(chlorine,-9999,''),\n" +
            "replace(phosphorus,-9999,''),replace(flashPoint,-9999,''),replace(viscosity,'-9999',''),replace(hotMelt,'-9999','') \n" +
            "from t_pr_sampleinfoanalysis;";
    }
    window.open('exportExcelWastesDaily?name=' + name + '&sqlWords=' + sqlWords);
}

