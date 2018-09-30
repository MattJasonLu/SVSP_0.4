/**
 * 次生入场分析日报
 * */
function reset() {
    isSearch=false;
    $("#senior").find("input").val("");
    $("#searchContent").val("");
    secondaryAnalysis();
}
var currentPage = 1;                          //当前页数
var isSearch = false;
var data1;
/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "totalSecIntoRecord",                  // url
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
        totalRecord=array1.length;
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
    setSecIntoList(result);
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
            AddAndRemoveClass(this)
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
            url: "getSecondIntoList",                  // url
            data:JSON.stringify(page),
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success:function (result) {
                if (result != undefined && result.status == "success"){
                    console.log(result);
                    setSecIntoList(result);
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
    if (isSearch) {//查询用的
        for(var i=0;i<array1.length;i++){
            $(array1[i]).hide();
        }
        var i=parseInt((pageNumber-1)*countValue());
        var j=parseInt((pageNumber-1)*countValue())+parseInt(countValue()-1);
        for(var i=i;i<=j;i++){
            $('#tbody1').append(array1[i]);
            $(array1[i]).show();
        }
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
                url: "getSecondIntoList",                  // url
                data:JSON.stringify(page),// url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                        setSecIntoList(result.data);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }
        if (isSearch) {//查询用的
            for(var i=0;i<array1.length;i++){
                $(array1[i]).hide();
            }
            var i=parseInt((pageNumber-1)*countValue());
            var j=parseInt((pageNumber-1)*countValue())+parseInt(countValue()-1);
            for(var i=i;i<=j;i++){
                $('#tbody1').append(array1[i]);
                $(array1[i]).show();
            }
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

//加载次生入场分析日报数据列表
function secondaryAnalysis() {
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
        url: "getSecondIntoList",                  // url
        data:JSON.stringify(page),
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: 'application/json;charset=utf-8',
        success:function (result) {
            if (result != undefined && result.status == "success"){
                console.log(result);
                setPageClone(result);
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

//设置次生入场日报数据
//
function setSecIntoList(result) {
    var tr = $("#cloneTr");
    tr.siblings().remove();
    $.each(result.data,function (index,item) {
        var clonedTr = tr.clone();
        clonedTr.show();
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            switch (inner_index) {
                // 序号
                case (0):
                    $(this).html(index+1);
                    break;
                // 收样日期
                case (1):
                    if(obj.laboratoryTest!=null){
                        $(this).html(getDateStr(obj.laboratoryTest.samplingDate));
                    }
                    break;
                // 废物名称
                case (2):
                    if(obj.laboratoryTest!=null){
                        if(obj.laboratoryTest.wastesName=='slag'){
                            $(this).html('炉渣');
                        }
                        if(obj.laboratoryTest.wastesName=='ash'){
                            $(this).html('飞灰');
                        }
                        if(obj.laboratoryTest.wastesName=='bucket'){
                            $(this).html('桶');
                        }
                    }

                    break;
                // 热灼减率%
                case (3):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.heatAverage);
                    }
                    break;
                // 水分%
                case (4):
                    if(obj.laboratoryTest!=null){
                        $(this).html(obj.laboratoryTest.waterContentAverage);
                    }

                    break;
                // 备注
                case (5):
                    $(this).html(obj.remarks);
                    break;
            }
        })
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        tr.hide();
    });

}
array=[];//存放所有的tr
array1=[];//存放目标的tr

//次生入场高级查询
function searchSecInto() {
    isSearch=false;

    array.length=0;//清空数组

    array1.length=0;

    $('.myclass').each(function () {
        $(this).show();
    });


    //1分页模糊查询
    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    isSearch=true;
    var text=$.trim($('#searchContent').val());
    //1收样日期
    var beginTime=$.trim($('#search-inDate').val());

    var endTime=$.trim($('#search-endDate').val());

    var startDate=getDateByStr(beginTime);

    var endDate=getDateByStr(endTime);

    //2废物名称
    var wastesName=$.trim($('#search-receiveDate').val());

    var arraydate=[];

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            arraydate.push(($(this).children('td').eq(1).text()))
        });
    }

    var dateMin=(arraydate[0]);
    var dateMax=(arraydate[0]);
    for(var i=1;i<arraydate.length;i++){
        if(new Date(arraydate[i]).getTime()<new Date(dateMin)||dateMin.length==0){
            dateMin=(arraydate[i]);
        }
        if(new Date(arraydate[i]).getTime()>new Date(dateMax)||dateMax.length==0){
            dateMax=(arraydate[i]);
        }
    }
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(startDate.toString()=='Invalid Date'){
                startDate=dateMin;
            }
            if(endDate.toString()=='Invalid Date'){
                endDate=dateMax;
            }
            var date=$(this).children('td').eq(1).text();

            if(date.length==0){
                date=startDate;
            }

            if(!($(this).children('td').eq(2).text().indexOf(wastesName)!=-1
                &&$(this).children('td').text().indexOf(text)!=-1
                &&(new Date(date).getTime()>=new Date(startDate).getTime())&&(new Date(date).getTime()<=new Date(endDate).getTime())
            )){
                $(this).hide();
            }
            if(($(this).children('td').eq(2).text().indexOf(wastesName)!=-1
               &&$(this).children('td').text().indexOf(text)!=-1
                &&(new Date(date).getTime()>=new Date(startDate).getTime())&&(new Date(date).getTime()<=new Date(endDate).getTime())))
            {
                array1.push($(this));
            }
        });
    }

    var total;

    if(array1.length%countValue()==0){
        total=array1.length/countValue()
    }

    if(array1.length%countValue()>0){
        total=Math.ceil(array1.length/countValue());
    }

    if(array1.length/countValue()<1){
        total=1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();
    $('.beforeClone').remove();
    for ( i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i+1;
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
    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }







}

//粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchWastesAnalysis();
            }
        },400);
    });
});

//粗查询
function searchWastesAnalysis() {
    isSearch=false;
   // secondaryAnalysis();
    array.length=0;//清空数组
    array1.length=0;
    $('.myclass').each(function () {
        $(this).show();
    });
    //1分页模糊查询

    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    isSearch=true;
    var text=$.trim($('#searchContent').val());
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

    var total;

    if(array1.length%countValue()==0){
        total=array1.length/countValue()
    }

    if(array1.length%countValue()>0){
        total=Math.ceil(array1.length/countValue());
    }

    if(array1.length/countValue()<1){
        total=1;
    }

    $("#totalPage").text("共" + total + "页");

    var myArray = new Array();

    $('.beforeClone').remove();

    for ( i = 0; i < total; i++) {
        var li = $("#next").prev();
        myArray[i] = i+1;
        var clonedLi = li.clone();
        clonedLi.show();
        clonedLi.find('a:first-child').text(myArray[i]);
        clonedLi.find('a:first-child').click(function () {
            var num = $(this).text();
            switchPage(num);
            AddAndRemoveClass(this)
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }
    $("#previous").next().next().eq(0).addClass("active");       // 将首页页面标蓝
    $("#previous").next().next().eq(0).addClass("oldPageClass");
    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        secondaryAnalysis();
    }



}


/**
 *
 * 导出
 * @returns {string}
 */
function exportExcel() {
    console.log("export");
    var name = 't_pl_secondaryinto';
    var sqlWords = "select * from  t_pl_secondaryinto;";
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);
}