/**
* Created by matt on 2018/8/6.
* DoubleClickTo 666
*/

/**
 * 全局变量
 * @type {boolean}
 */
var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
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
            url: "totalLaboratoryTestRecord",                  // url
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
            url: "searchLaboratoryTestTotal",                  // url
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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    if(pageNumber > totalPage()){
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
            url: "loadPageLaboratoryTestList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
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
        data['page'] = page;
        $.ajax({
            type: "POST",                       // 方法类型
            url: "searchLaboratoryTest",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    setDataList(result.data);
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
                url: "loadPageLaboratoryTestList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
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
            data['page'] = page;
            $.ajax({
                type: "POST",                       // 方法类型
                url: "searchLaboratoryTest",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined && result.status == "success") {
                        // console.log(result);
                        setDataList(result.data);
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
 * 分页 获取首页内容
 * */
function loadPageList() {
    loadNavigationList();   // 动态菜单加载
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
        url: "loadPageLaboratoryTestList",   // url
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
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("失败");
        }
    });
    isSearch = false;
    getCheckState();
}

/**
 * 设置化验单数据
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
                // 化验单号
                case (1):
                    $(this).html(obj.laboratoryTestNumber);
                    break;
                // 查询号
                case (2):
                    $(this).html(obj.queryNumber);
                    break;
                // 企业名称
                case (3):
                    if (obj.client != null)
                        $(this).html(obj.client.companyName);
                    break;
                // 填报人
                case (4):
                    $(this).html(obj.record);
                    break;
                // 化验人
                case (5):
                    $(this).html(obj.laboratory);
                    break;
                // 化验日期
                case (6):
                    $(this).html(getDateStr(obj.laboratoryDate));
                    break;
                // 化验公司
                case (7):
                    $(this).html(obj.laboratoryCompany);
                    break;
                // 审核状态
                case (8):
                    if (obj.checkState != null)
                        $(this).html(obj.checkState.name);
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
 * 查找
 */
function searchData() {
    var page = {};
    var pageNumber = 1;                       // 显示首页
    page.pageNumber = pageNumber;
    page.count = countValue();
    page.start = (pageNumber - 1) * page.count;
    // 精确查询
    if ($("#senior").is(':visible')) {
        data = {
            laboratoryTestNumber: $("#search-laboratoryTestNumber").val(),
            queryNumber: $("#search-queryNumber").val(),
            client: {
                companyName: $("#search-companyName").val()
            },
            record: $("#search-record").val(),
            laboratory: $("#search-laboratory").val(),
            laboratoryDate: $("#search-laboratoryDate").val(),
            laboratoryCompany: $("#search-laboratoryCompany").val(),
            checkState: $("#search-checkState").val(),
            page: page
        };
        console.log(data);
        // 模糊查询
    } else {
        data = {
            keyword: $("#searchContent").val(),
            page: page
        };
    }
    $.ajax({
        type: "POST",                       // 方法类型
        url: "searchLaboratoryTest",                  // url
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
 * 全选复选框
 */
function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}

/**
 * 查看模态框
 * */
function view(e) {
    var id = getIdByMenu(e);
    // 清除上一次增加的行
    $(".newLine").remove();
    $.ajax({
        type:"POST",
        url:"getLaboratoryTest",
        async:false,
        dataType:"json",
        data:{"laboratoryTestNumber":id},
        success:function (result) {
            if (result != undefined && result.status == "success") {
                var data = eval(result.data);
                // console.log(data);
                if(data.client != null){
                    $('#modal1_companyName').text(data.client.companyName);
                    $('#modal1_address').text(data.client.location);
                    $('#modal1_contacts').text(data.client.contactName);
                    $('#modal1_phone').text(data.client.phone);
                    $('#modal1_industry').text(data.client.industry);
                    $('#modal1_product').text(data.client.product);
                }
                $('#modal1_record').text(data.record);
                $('#modal1_recordDate').text(getDateStr(data.recordDate));
                $('#modal1_laboratory').text(data.laboratory);
                $('#modal1_laboratoryDate').text(getDateStr(data.laboratoryDate));
                $('#modal1_laboratoryCompany').text(data.laboratoryCompany);

                $('#samplingDate').text(getDateStr(data.samplingDate));
                $('#wastesName').text(data.wastesName);
                $('#wastesCode').text(data.wastesCode);
                $('#samplingNumber_1').text(data.samplingNumber);
                $('#isProductionLine').prop('checked', data.isProductionLine);
                $('#isStorageArea').prop('checked', data.isStorageArea);
                $('#samplingNumber_2').text(data.samplingNumber);

                // 化学性质
                $('#testDate').text(getDateStr(data.laboratoryDate));
                $('#isViscosity').prop('checked', data.isViscosity);
                $('#viscosityMinimum').text(data.viscosityMinimum);
                $('#viscosityAverage').text(data.viscosityAverage);
                $('#viscosityMaximum').text(data.viscosityMaximum);

                $('#isWaterContent').prop('checked', data.isWaterContent);
                $('#waterContentMinimum').text(data.waterContentMinimum);
                $('#waterContentAverage').text(data.waterContentAverage);
                $('#waterContentMaximum').text(data.waterContentMaximum);

                $('#isDensity').prop('checked', data.isDensity);
                $('#densityMinimum').text(data.densityMinimum);
                $('#densityAverage').text(data.densityAverage);
                $('#densityMaximum').text(data.densityMaximum);

                $('#isSolidSubstanceContent').prop('checked', data.isSolidSubstanceContent);
                $('#solidSubstanceContentMinimum').text(data.solidSubstanceContentMinimum);
                $('#solidSubstanceContentAverage').text(data.solidSubstanceContentAverage);
                $('#solidSubstanceContentMaximum').text(data.solidSubstanceContentMaximum);

                $('#isPH').prop('checked', data.isPH);
                $('#phMinimum').text(data.phMinimum);
                $('#phAverage').text(data.phAverage);
                $('#phMaximum').text(data.phMaximum);

                $('#isSulfurContent').prop('checked', data.isSulfurContent);
                $('#sulfurContentMinimum').text(data.sulfurContentMinimum);
                $('#sulfurContentAverage').text(data.sulfurContentAverage);
                $('#sulfurContentMaximum').text(data.sulfurContentMaximum);

                $('#isHeat').prop('checked', data.isHeat);
                $('#heatMinimum').text(data.heatMinimum);
                $('#heatAverage').text(data.heatAverage);
                $('#heatMaximum').text(data.heatMaximum);

                $('#isChlorineContent').prop('checked', data.isChlorineContent);
                $('#chlorineContentMinimum').text(data.chlorineContentMinimum);
                $('#chlorineContentAverage').text(data.chlorineContentAverage);
                $('#chlorineContentMaximum').text(data.chlorineContentMaximum);

                $('#isAsh').prop('checked', data.isAsh);
                $('#ashMinimum').text(data.ashMinimum);
                $('#ashAverage').text(data.ashAverage);
                $('#ashMaximum').text(data.ashMaximum);

                $('#isFluorineContent').prop('checked', data.isFluorineContent);
                $('#fluorineContentMinimum').text(data.fluorineContentMinimum);
                $('#fluorineContentAverage').text(data.fluorineContentAverage);
                $('#fluorineContentMaximum').text(data.fluorineContentMaximum);

                $('#isFlashPoint').prop('checked', data.isFlashPoint);
                $('#flashPointMinimum').text(data.flashPointMinimum);
                $('#flashPointAverage').text(data.flashPointAverage);
                $('#flashPointMaximum').text(data.flashPointMaximum);

                $('#otherParameter1').val(data.otherParameter1);
                $('#parameter1Minimum').text(data.parameter1Minimum);
                $('#parameter1Average').text(data.parameter1Average);
                $('#parameter1Maximum').text(data.parameter1Maximum);

                $('#isMeltingPoint').prop('checked', data.isMeltingPoint);
                $('#meltingPointMinimum').text(data.meltingPointMinimum);
                $('#meltingPointAverage').text(data.meltingPointAverage);
                $('#meltingPointMaximum').text(data.meltingPointMaximum);

                $('#otherParameter2').val(data.otherParameter2);
                $('#parameter2Minimum').text(data.parameter2Minimum);
                $('#parameter2Average').text(data.parameter2Average);
                $('#parameter2Maximum').text(data.parameter2Maximum);

                $('#isBoilingPoint').prop('checked', data.isBoilingPoint);
                $('#boilingPointMinimum').text(data.boilingPointMinimum);
                $('#boilingPointAverage').text(data.boilingPointAverage);
                $('#boilingPointMaximum').text(data.boilingPointMaximum);

                $('#otherParameter3').val(data.otherParameter3);
                $('#parameter3Minimum').text(data.parameter3Minimum);
                $('#parameter3Average').text(data.parameter3Average);
                $('#parameter3Maximum').text(data.parameter3Maximum);

                // 金属物质
                $('#isHg').prop('checked', data.isHg);
                $('#HgMinimum').text(data.hgMinimum);
                $('#HgAverage').text(data.hgAverage);
                $('#HgMaximum').text(data.hgMaximum);

                $('#isK').prop('checked', data.isK);
                $('#KMinimum').text(data.KMinimum);
                $('#KAverage').text(data.KAverage);
                $('#KMaximum').text(data.KMaximum);

                $('#isNa').prop('checked', data.isNa);
                $('#NaMinimum').text(data.naMinimum);
                $('#NaAverage').text(data.naAverage);
                $('#NaMaximum').text(data.naMaximum);

                $('#isMn').prop('checked', data.isMn);
                $('#MnMinimum').text(data.mnMinimum);
                $('#MnAverage').text(data.mnAverage);
                $('#MnMaximum').text(data.mnMaximum);

                $('#isCu').prop('checked', data.isCu);
                $('#CuMinimum').text(data.cuMinimum);
                $('#CuAverage').text(data.cuAverage);
                $('#CuMaximum').text(data.cuMaximum);

                $('#isCo').prop('checked', data.isCo);
                $('#CoMinimum').text(data.coMinimum);
                $('#CoAverage').text(data.coAverage);
                $('#CoMaximum').text(data.coMaximum);

                $('#isTi').prop('checked', data.isTi);
                $('#TiMinimum').text(data.tiMinimum);
                $('#TiAverage').text(data.tiAverage);
                $('#TiMaximum').text(data.tiMaximum);

                $('#isMg').prop('checked', data.isMg);
                $('#MgMinimum').text(data.mgMinimum);
                $('#MgAverage').text(data.mgAverage);
                $('#MgMaximum').text(data.mgMaximum);

                $('#isLi').prop('checked', data.isLi);
                $('#LiMinimum').text(data.liMinimum);
                $('#LiAverage').text(data.liAverage);
                $('#LiMaximum').text(data.liMaximum);

                $('#isAl').prop('checked', data.isAl);
                $('#AlMinimum').text(data.alMinimum);
                $('#AlAverage').text(data.alAverage);
                $('#AlMaximum').text(data.alMaximum);

                $('#isSe').prop('checked', data.isSe);
                $('#SeMinimum').text(data.seMinimum);
                $('#SeAverage').text(data.seAverage);
                $('#SeMaximum').text(data.seMaximum);

                $('#isAs').prop('checked', data.isAs);
                $('#AsMinimum').text(data.asMinimum);
                $('#AsAverage').text(data.asAverage);
                $('#AsMaximum').text(data.asMaximum);

                $('#isSb').prop('checked', data.isSb);
                $('#SbMinimum').text(data.sbMinimum);
                $('#SbAverage').text(data.sbAverage);
                $('#SbMaximum').text(data.sbMaximum);

                $('#isSi').prop('checked', data.isSi);
                $('#SiMinimum').text(data.siMinimum);
                $('#SiAverage').text(data.siAverage);
                $('#SiMaximum').text(data.siMaximum);

                $('#isCa').prop('checked', data.isCa);
                $('#CaMinimum').text(data.caMinimum);
                $('#CaAverage').text(data.caAverage);
                $('#CaMaximum').text(data.caMaximum);

                $('#isTu').prop('checked', data.isTu);
                $('#TuMinimum').text(data.tuMinimum);
                $('#TuAverage').text(data.tuAverage);
                $('#TuMaximum').text(data.tuMaximum);

                $('#isFe').prop('checked', data.isFe);
                $('#FeMinimum').text(data.feMinimum);
                $('#FeAverage').text(data.feAverage);
                $('#FeMaximum').text(data.feMaximum);

                $('#isNi').prop('checked', data.isNi);
                $('#NiMinimum').text(data.niMinimum);
                $('#NiAverage').text(data.niAverage);
                $('#NiMaximum').text(data.niMaximum);

                $('#isPb').prop('checked', data.isPb);
                $('#PbMinimum').text(data.pbMinimum);
                $('#PbAverage').text(data.pbAverage);
                $('#PbMaximum').text(data.pbMaximum);

                $('#isSn').prop('checked', data.isSn);
                $('#SnMinimum').text(data.snMinimum);
                $('#SnAverage').text(data.snAverage);
                $('#SnMaximum').text(data.snMaximum);

                $('#isCr').prop('checked', data.isCr);
                $('#CrMinimum').text(data.crMinimum);
                $('#CrAverage').text(data.crAverage);
                $('#CrMaximum').text(data.crMaximum);

                $('#isTl').prop('checked', data.isTl);
                $('#TlMinimum').text(data.tlMinimum);
                $('#TlAverage').text(data.tlAverage);
                $('#TlMaximum').text(data.tlMaximum);

                $('#isV').prop('checked', data.isV);
                $('#VMinimum').text(data.VMinimum);
                $('#VAverage').text(data.VAverage);
                $('#VMaximum').text(data.VMaximum);

                $('#otherMetal1').val(data.otherMetal1);
                $('#metal1Minimum').text(data.metal1Minimum);
                $('#metal1Average').text(data.metal1Average);
                $('#metal1Maximum').text(data.metal1Maximum);

                $('#isTe').prop('checked', data.isTe);
                $('#TeMinimum').text(data.teMinimum);
                $('#TeAverage').text(data.teAverage);
                $('#TeMaximum').text(data.teMaximum);

                $('#otherMetal2').val(data.otherMetal2);
                $('#metal2Minimum').text(data.metal2Minimum);
                $('#metal2Average').text(data.metal2Average);
                $('#metal2Maximum').text(data.metal2Maximum);

                $('#isZn').prop('checked', data.isZn);
                $('#ZnMinimum').text(data.znMinimum);
                $('#ZnAverage').text(data.znAverage);
                $('#ZnMaximum').text(data.znMaximum);

                $('#otherMetal3').val(data.otherMetal3);
                $('#metal3Minimum').text(data.metal3Minimum);
                $('#metal3Average').text(data.metal3Average);
                $('#metal3Maximum').text(data.metal3Maximum);

                $('#isCd').prop('checked', data.isCd);
                $('#CdMinimum').text(data.cdMinimum);
                $('#CdAverage').text(data.cdAverage);
                $('#CdMaximum').text(data.cdMaximum);

                $('#otherMetal4').val(data.otherMetal4);
                $('#metal4Minimum').text(data.metal4Minimum);
                $('#metal4Average').text(data.metal4Average);
                $('#metal4Maximum').text(data.metal4Maximum);

                // 设置危废列表
                // if (data.wastesList.length > 0) {
                //     for (var i = 0; i < data.wastesList.length; i++) {
                //         var $i = i;
                //         if (i > 0) addNewLine();
                //         $("span[id='wastesList[" + $i + "].samplingDate']").text(getDateStr(data.wastesList[i].samplingDate));
                //         $("span[id='wastesList[" + $i + "].wastesName']").text(data.wastesList[i].name);
                //         $("span[id='wastesList[" + $i + "].samplingNumber_1']").text(data.wastesList[i].samplingNumber);
                //         $("input[id='wastesList[" + $i + "].isProductionLine']").prop("checked", data.wastesList[i].isProductionLine);
                //         $("input[id='wastesList[" + $i + "].isStorageArea']").prop("checked", data.wastesList[i].isStorageArea);
                //         $("span[id='wastesList[" + $i + "].samplingNumber_2']").text(data.wastesList[i].samplingNumber);
                //         $("span[id='wastesList[" + $i + "].testDate']").text(getDateStr(data.wastesList[i].testDate));
                //         if (data.wastesList[i].parameterList.length > 0) {
                //             for (var j = 0; j < data.wastesList[i].parameterList.length; j++) {
                //                 if (data.wastesList[i].parameterList[j].parameter != null) {
                //                     var $j = data.wastesList[i].parameterList[j].parameter.index-1;
                //                     $("input[id='wastesList[" + $i + "].parameterList[" + $j + "].parameter']").prop("checked", true);
                //                     $("span[id='wastesList[" + $i + "].parameterList[" + $j + "].minimum']").text(data.wastesList[i].parameterList[j].minimum);
                //                     $("span[id='wastesList[" + $i + "].parameterList[" + $j + "].average']").text(data.wastesList[i].parameterList[j].average);
                //                     $("span[id='wastesList[" + $i + "].parameterList[" + $j + "].maximum']").text(data.wastesList[i].parameterList[j].maximum);
                //                 }
                //             }
                //         }
                //         if (data.wastesList[i].heavyMetalList.length > 0) {
                //             for (var j = 0; j < data.wastesList[i].heavyMetalList.length; j++) {
                //                 if (data.wastesList[i].heavyMetalList[j].heavyMetal != null) {
                //                     var $j = data.wastesList[i].heavyMetalList[j].heavyMetal.index-1;
                //                     $("input[id='wastesList[" + $i + "].heavyMetalList[" + $j + "].heavyMetal']").prop("checked", true);
                //                     $("span[id='wastesList[" + $i + "].heavyMetalList[" + $j + "].minimum']").text(data.wastesList[i].heavyMetalList[j].minimum);
                //                     $("span[id='wastesList[" + $i + "].heavyMetalList[" + $j + "].average']").text(data.wastesList[i].heavyMetalList[j].average);
                //                     $("span[id='wastesList[" + $i + "].heavyMetalList[" + $j + "].maximum']").text(data.wastesList[i].heavyMetalList[j].maximum);
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        },
        error:function (result) {

        }
    });
    $("#viewExcelModal").modal('show');
}

/**
 * 已作废
 */
function setInvalid(e) {
    var r = confirm("确认作废该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setLaboratoryTestInvalid",
            async: false,
            dataType: "json",
            data: {"laboratoryTestNumber": id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 多选作废
 */
function setInvalidMulti() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length > 0) {
        var r = confirm("确认作废选中化验单吗？");
        if (r) {
            for (var i = 0; i < items.length; i++) {
                var id = getIdByCheckBox(items[i]);
                $.ajax({
                    type: "POST",
                    url: "setLaboratoryTestInvalid",
                    async: false,
                    dataType: "json",
                    data: {"laboratoryTestNumber": id},
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            console.log(result);
                        } else {
                            alert(result.message);
                            return null;
                        }
                    },
                    error: function (result) {
                        console.log(result);
                        alert("服务器异常");
                    }
                });
            }
            alert("作废成功");
            window.location.reload();
        }
    } else {
        alert("未选中任何化验单！");
    }
}

/**
 * 已化验
 */
function setTested(e) {
    var id = getIdByMenu(e);
    $.ajax({
        type:"POST",
        url:"setLaboratoryTestTested",
        async:false,
        dataType:"json",
        data:{"laboratoryTestNumber":id},
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                alert(result.message);
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}

/**
 * 已提交
 */
function setSubmit(e) {
    var r = confirm("确认提交该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setLaboratoryTestSubmit",
            async: false,
            dataType: "json",
            data: {"laboratoryTestNumber": id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 多选提交
 */
function setSubmitMulti() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length > 0) {
        var r = confirm("确认作废选中化验单吗？");
        if (r) {
            for (var i = 0; i < items.length; i++) {
                var id = getIdByCheckBox(items[i]);
                $.ajax({
                    type: "POST",
                    url: "setLaboratoryTestSubmit",
                    async: false,
                    dataType: "json",
                    data: {"laboratoryTestNumber": id},
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            console.log(result);
                        } else {
                            alert(result.message);
                            return null;
                        }
                    },
                    error: function (result) {
                        console.log(result);
                        alert("服务器异常");
                    }
                });
            }
            alert("提交成功");
            window.location.reload();
        }
    } else {
        alert("未选中任何化验单！");
    }
}

/**
 * 已确认
 */
function setConfirm(e) {
    var r = confirm("确认签收该化验单吗？");
    if (r) {
        var id = getIdByMenu(e);
        $.ajax({
            type: "POST",
            url: "setLaboratoryTestConfirm",
            async: false,
            dataType: "json",
            data: {"laboratoryTestNumber": id},
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    alert(result.message);
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    }
}

/**
 * 多选签收
 */
function setConfirmMulti() {
    var items = $("input[name='select']:checked");//判断复选框是否选中
    if (items.length > 0) {
        var r = confirm("确认签收选中化验单吗？");
        if (r) {
            for (var i = 0; i < items.length; i++) {
                var id = getIdByCheckBox(items[i]);
                $.ajax({
                    type: "POST",
                    url: "setLaboratoryTestConfirm",
                    async: false,
                    dataType: "json",
                    data: {"laboratoryTestNumber": id},
                    success: function (result) {
                        if (result != undefined && result.status == "success") {
                            console.log(result);
                        } else {
                            alert(result.message);
                            return null;
                        }
                    },
                    error: function (result) {
                        console.log(result);
                        alert("服务器异常");
                    }
                });
            }
            alert("签收成功");
            window.location.reload();
        }
    } else {
        alert("未选中任何化验单！");
    }
}

/**
 * 通过操作菜单来获取编号
 * @param e 点击的按钮
 * @returns {string} 联单编号
 */
function getIdByMenu(e) {
    return e.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 通过复选框来获取id
 * @param e
 * @returns {string}
 */
function getIdByCheckBox(e) {
    return e.parentElement.parentElement.nextElementSibling.innerHTML;
}

/**
 * 设置高级查询的审核状态数据
 */
function getCheckState() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getCheckState",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                var data = eval(result);
                // 高级检索下拉框数据填充
                var checkState = $("#search-checkState");
                checkState.children().remove();
                $.each(data.checkStateList, function (index, item) {
                    if (item.index >= 1 && item.index <= 5 || item.index == 12) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        checkState.append(option);
                    }
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
 * 增加新行
 */
function addNewLine() {
    // 获取id为cloneTr的tr元素
    var tr = $("#hiddenTr").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr = tr.clone();
    // 清除数据
    clonedTr.find('span').text('');
    clonedTr.find('input').prop('checked', false);
    // 获取编号
    var id = tr.children().get(0).innerHTML;
    var num = parseInt(id);
    // 改变克隆行的输入框name
    changeId(clonedTr);
    clonedTr.addClass("newLine");
    clonedTr.children().get(0).innerHTML = ++num;
    clonedTr.insertAfter(tr);

    // 克隆化验结果
    // 获取id为cloneTr的tr元素
    var tr2 = $("#hiddenTr2").prev();
    // 克隆tr，每次遍历都可以产生新的tr
    var clonedTr2 = tr2.clone();
    // 清除数据
    clonedTr2.find('span').text('');
    clonedTr2.find('input').prop('checked', false);
    // 改变克隆行的输入框name
    changeId(clonedTr2);
    clonedTr2.addClass("newLine");
    clonedTr2.insertAfter(tr2);

    /**
     * 改变id
     * @param element
     */
    function changeId(element) {
        element.find("span[id*='wastesList'],input[id*='wastesList']").each(function () {
            var oldId = $(this).prop("id");
            var newId = oldId.replace(/[0-9]\d*/, id);
            $(this).prop('id', newId);
        });
    }
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
            url: "importLaboratoryTestExcel",              // url
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
    var filePath = 'Files/Templates/化验单导入模板.xlsx';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**
 * 导出excel
 */
function exportExcel() {
    var checkedItems = $("input[type='checkbox']:checked");
    checkedItems.each(function () {
        var id = $(this).parent().parent().parent().find("td[name='id']").text();
        window.open('exportLaboratoryTestExcel?id=' + id);
    });
}

/**
 * 延时搜索及回车搜索功能
 */
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp == 0){
                searchData();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchData();      //
            }
        },400);
    });
});