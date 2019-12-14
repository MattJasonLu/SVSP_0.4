var isSearch = false;
var currentPage = 1;                          //当前页数
var data;
array=[];//存放所有的tr
array1=[];//存放目标的tr

/**
 * 返回count值
 * */
function countValue(){
    var mySelect=document.getElementById("count");
    var index=mySelect.selectedIndex;
    //console.log(mySelect.options[index].text);
    return mySelect.options[index].text;

}

/**
 * 回车查询
 */
function keyLogin(){
    if (event.keyCode==13)  //回车键的键值为13
        document.getElementById("input1").click(); //调用登录按钮的登录事件
}

/**
 * 计算总页数
 * */
function totalPage() {
    var totalRecord = 0;
    if (!isSearch)   $.ajax({
        type: "POST",                       // 方法类型
        url: "totalContractTemplateRecord",                  // url
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
    else {
        totalRecord=array1.length;
    }
    var count = countValue();                         // 可选
    var total = loadPages(totalRecord, count);
    return total;
}

/**
 * 输入页数跳转页面
 * */
function inputSwitchPage() {
    var pageNumber = $("#pageNumber").val();    // 获取输入框的值
    if(pageNumber > totalPage()){
        pageNumber = totalPage();
    }
    $("#current").find("a").text("当前页："+pageNumber);
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
        if(pageNumber > 1){
            $("#previous").removeClass("disabled");
            $("#firstPage").removeClass("disabled");
        }
        if(pageNumber < totalPage()){
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
                url: "loadPageContractTemplateList",         // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: JSON.stringify(page),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: function (result) {
                    if (result != undefined) {
                        // console.log(result);
                        setContractModelList(result);
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
        }   if (isSearch) {//查询用的
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
 * 点击页数跳转页面
 * @param pageNumber 跳转页数
 * */
function switchPage(pageNumber) {
    console.log("当前页：" + pageNumber);
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
    $("#current").find("a").text("当前页："+pageNumber);
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
    if(pageNumber > 1){
        $("#previous").removeClass("disabled");
        $("#firstPage").removeClass("disabled");
    }
    if(pageNumber < totalPage()){
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
            url: "loadPageContractTemplateList",         // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined) {
                    // console.log(result);
                    setContractModelList(result);
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
    }   if (isSearch) {//查询用的
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
 * 设置选中页页码标蓝
 */
function AddAndRemoveClass(item) {
    $('.oldPageClass').removeClass("active");
    $('.oldPageClass').removeClass("oldPageClass");
    $(item).parent().addClass("active");
    $(item).parent().addClass("oldPageClass");
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
function loadPageContractTemplateList() {
    loadNavigationList();   // 设置动态菜单
    var pageNumber = 1;               // 显示首页
    $('#contractId').hide();
    $('#cId').hide();
    $("#current").find("a").text("当前页：1");
    $("#previous").addClass("disabled");
    $("#firstPage").addClass("disabled");
    $("#next").removeClass("disabled");            // 移除上一次设置的按钮禁用
    $("#endPage").removeClass("disabled");
    var page = {};
    page.count = countValue();                                 // 可选
    page.pageNumber = pageNumber;
    page.start = (pageNumber - 1) * page.count;
   // console.log(page);
    if(getApprovalId()!=undefined){ //存在
        $.trim($("#searchContent").val(getApprovalId()));
        searchModel();
        window.localStorage.removeItem('approvalId');
    }else {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "loadPageContractTemplateList",          // url
            async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(page),
            dataType: "json",
            contentType: 'application/json;charset=utf-8',
            success: function (result) {
                if (result != undefined && result.status == "success") {
                    console.log(result);
                    setPageClone(result);
                    setPageCloneAfter(pageNumber);        // 重新设置页码
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
    setModelSelectedList();
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
               // console.log(result);
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

/**
 * 设置克隆页码
 * */
function setPageClone(result) {
    $(".beforeClone").remove();
    setContractModelList(result);
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

function loadContract() {
    $('#contractId').hide();
    $('#cId').hide();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listContract",                  // url
        async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                //alert(result);
                //console.log(result);
                setContractList(result);
            } else {
                console.log("fail: " + result);
            }
        },
        error:function (result) {
            console.log("error: " + result);
        }
    });
}

function setContractModelList(result){
    //console.log(eval(result));//可以取到
    // 获取id为cloneTr的tr元素
    //判断字段是否存在
    var tr = $("#cloneTr1");//克隆一行
    tr.siblings().remove();
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var obj = eval(item);
        //console.log(obj);
        if(obj.modelName!=""&&obj.year!="") {
            // console.log(obj);
            var clonedTr = tr.clone();
            clonedTr.show();
            clonedTr.attr('class','myclass');
            // 循环遍历cloneTr的每一个td元素，并赋值
            clonedTr.children("td").each(function (inner_index) {
                // 根据索引为部分td赋值
                // console.log(obj);
                switch (inner_index) {
                    // 合同类型
                    case (2):
                        if (obj.contractType != null)
                            $(this).html(  obj.contractType.name);
                        break;
                    // 模板名称
                    case (1):
                        $(this).html(obj.modelName);
                        break;
                    // 合同状态
                    case (3):
                    if(obj.checkStateItem!=null){
                          $(this).html(obj.checkStateItem.dictionaryItemName)
                    }
                        break;
                    // 合同版本号
                    case (4):
                        $(this).html(obj.modelVersion);
                        break;
                    // 年份
                    case (5):
                        $(this).html(obj.year);
                        break;
                    case (6):
                        $(this).html(obj.contractId);
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

function adjust(item) {
    // var modelName=item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
    var contractId=item.parentElement.previousElementSibling.innerHTML;
    localStorage.contractId=contractId;
    location.href="model.html";
    // window.location.href ="showModel?contractId="+contractId;
    //  window.location.href =searchUrl;
    //console.log(modelName+"123")
    //window.location.href="jsp/model.jsp?modelName="+modelName;
}

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


function allSelect() {
    var isChecked = $('#allSel').prop('checked');
    if (isChecked) $("input[name='select']").prop('checked',true);
    else $("input[name='select']").prop('checked',false);
}

function check1(item) {
    //模板名称
    var contractId=item.parentElement.previousElementSibling.innerHTML;

    // console.log(modelName);
    $.ajax({
        type:"POST",
        url:"getContractBymodelName",
        async: false,
        dataType: "json",
        data: {
            'contractId': contractId
        },
        success:function (result) {
            if(result!=undefined){
                var obj=eval(result);
                //console.log(obj);
                //$('input').prop("readonly",true);
                // $('textarea').prop("readonly",true);
                $('#modal3_modelName').val(obj.modelName);
                $('#modal3_contractType').val(obj.contractType.name);
                $('#modal3_year').val(obj.year);
                $('#modal3_period').val(obj.period);
                $('#modelVersion').val(obj.modelVersion);
                var text=obj.contractContent;
                //console.log(text);
                //$('#modal3_contractContent').val($(text).text());//有换行的格式
                CKEDITOR.instances.modal3_contractContent.setData(text);//获取值
            }
        },
        error:function (result) {

        }
    });
    $('#btn').text();
    $('#btn').text('打印');
    $('#contractInfoForm').modal('show');
}

function cancel(item) {
    var modelName=item.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
    var contractId=item.parentElement.previousElementSibling.innerHTML;
    //console.log(modelName);
    var r = confirm("是否作废该模板？");
    if(r==true){
        $.ajax({
            type:"POST",
            url:"cancelModel",
            async: false,
            dataType: "json",
            data: {
                'contractId': contractId
            },
            success:function (result) {
                var obj=eval(result);
                if(obj.state=="success"){
                    alert("作废成功！");
                    window.location.reload();
                }
                else {
                    alert("作废失败！")
                }
            },
            error:function (result) {
                alert("服务器异常！")
            }
        });
    }
    else {

    }


}

function checkclone(item) {
    var contractId=  item.lastElementChild.previousElementSibling.innerHTML;
    //console.log(contractId);
    $.ajax({
        type:"POST",
        url:"getContractBymodelName",
        async: false,
        dataType: "json",
        data: {
            'contractId': contractId
        },
        success:function (result) {
            if(result!=undefined){
                var obj=eval(result);
                //console.log(obj);
                //$('input').prop("readonly",true);
                // $('textarea').prop("readonly",true);
                $('#modal3_modelName').val(obj.modelName);
                $('#modal3_contractType').val(obj.contractType.name);
                $('#modal3_year').val(obj.year);
                $('#modal3_period').val(obj.period);
                $('#modelVersion').val(obj.modelVersion);
                var text=obj.contractContent;
                //console.log(text);
                //$('#modal3_contractContent').val($(text).text());//有换行的格式
                CKEDITOR.instances.modal3_contractContent.setData(text);//获取值
            }
        },
        error:function (result) {

        }
    });
    $('#btn').text();
    $('#btn').text('打印');
    $('#contractInfoForm').modal('show');
}

function matchStringByIndexOf(parent,child,str)//总字符串 要找的字符串
{
    index = 0;
    if( ( index = parent.indexOf(child,index)) != -1 )
    {
        index = index+child.length;
        console.log(index);
        //console.log(parent.substring(index+1,index+10));
        // target=parent.substring(index+1,index+10);//改变后的字符
        text1=(changeStr(text1,index+2,index+10,"</strong>","</strong>"+str));

    }
    //结果输出
}

function changeStr(allstr,start,end,str,changeStr){ //allstr:原始字符串，start,开始位置,end：结束位  置,str：要改变的字，changeStr:改变后的字
    if(allstr.substring(start-1,end) == str){
        return allstr.substring(0,start-1)+changeStr+allstr.substring(end,allstr.length);
    }else{
        return allstr;
    }
}

//粗查询
$(document).ready(function () {//页面载入是就会进行加载里面的内容
    var last;
    $('#searchContent').keyup(function (event) { //给Input赋予onkeyup事件
        last = event.timeStamp;//利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
        setTimeout(function () {
            if(last-event.timeStamp==0){
                searchStock1();
            }else if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
                searchStock1();      //
            }
        },400);
    });
});

//粗查询
function  searchStock1() {

    isSearch=false;

    array.length=0;//清空数组

    array1.length=0;

    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    console.log(array);
    isSearch = true;

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
            AddAndRemoveClass(this);
        });
        clonedLi.addClass("beforeClone");
        clonedLi.removeAttr("id");
        clonedLi.insertAfter(li);
    }

    for(var i=0;i<array1.length;i++){
        $(array1[i]).hide();
    }

    //首页展示
    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    if(text.length<=0){
        loadPageContractTemplateList();
    }

}

//合同模板高级查询
function searchModel() {

    isSearch=false;
    array.length=0;//清空数组
    array1.length=0;//清空数组
    //1分页模糊查询
    for(var i=totalPage();i>0;i--){
        switchPage(parseInt(i));
        array.push($('.myclass'));
    }
    isSearch=true;

    var text=$.trim($('#searchContent').val());

    var modelName=$.trim($('#search-modelName').val());

    var contractType=$.trim($('#search-contractType option:selected').text());

    var beginTime =$.trim($('#search-beginTime').val());

    var endTime=$.trim($('#search-endTime').val());

    var arraydate=[];

    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            arraydate.push(($(this).children('td').eq(5).text()))
        });
    }
    var dateMin=(arraydate[0]);
    var dateMax=(arraydate[0]);
    for(var i=0;i<arraydate.length;i++){
        if(parseInt(arraydate[i])<parseInt(dateMin)||dateMin.length==0){
            dateMin=(arraydate[i]);
        }
        if(parseInt(arraydate[i])>parseInt(dateMax)||dateMax.length==0){
            dateMax=(arraydate[i]);
        }
    }
    for(var j=0;j<array.length;j++){
        $.each(array[j],function () {
            if(beginTime.length==0){
                beginTime=dateMin;
            }
            if(endTime.length==0){
                endTime=dateMax;
            }
            if(!($(this).children('td').eq(1).text().indexOf(modelName)!=-1
               &&$(this).children('td').eq(2).text().indexOf(contractType)!=-1
                &&(parseInt($(this).children('td').eq(5).text())>=beginTime)
                &&(parseInt($(this).children('td').eq(5).text())<=endTime)
                &&$(this).children('td').text().indexOf(text)!=-1
                )){
                $(this).hide();
            }

              if(($(this).children('td').eq(1).text().indexOf(modelName)!=-1
                  &&$(this).children('td').eq(2).text().indexOf(contractType)!=-1
                  &&(parseInt($(this).children('td').eq(5).text())>=beginTime)
                  &&(parseInt($(this).children('td').eq(5).text())<=endTime)
                  &&$(this).children('td').text().indexOf(text)!=-1
              )){
                  array1.push($(this));

              }






        })
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
    for(var i=0;i<array1.length;i++){
        array1[i].hide();
    }

    for(var i=0;i<countValue();i++){
        $(array1[i]).show();
        $('#tbody1').append((array1[i]));
    }

    isSearch=false;




}

function dataLeftCompleting(bits, identifier, value) {
    value = Array(bits + 1).join(identifier) + value;
    return value.slice(-bits);
}

//合同模板升级的载入方法
function getContractList() {
    loadNavigationList();   // 动态菜单加载
    var contractId=localStorage["contractId"];
    //console.log(contractId);
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getContractBymodelName",                  // url
        dataType: "json",
        data:{"contractId":contractId},
        async: false,
        success: function (result) {
            var data=eval(result);
            console.log(data);
            //赋值模板名称
            $('#modelName').prop("value",data.modelName);
            //赋值模板版本
            $('#modelVersion').prop("value",data.modelVersion);
            //赋值模板编号
            $('#contractId').prop("value",data.contractId);
            //赋值合同内容
            CKEDITOR.instances.TextArea1.setData(data.contractContent);//获取值
            //$('#TextArea1').val(text);
            if (result != undefined) {
                var data = eval(result);
                // 各下拉框数据填充
                var contractType = $("#contractType");
                index1=""
                contractType.children().remove();
                $.each(data.contractNameStrList, function (index, item) {
                    var option = $('<option />');
                    option.val(index);
                    option.text(item.name);
                    if(data.contractType.name==item.name){
                        index1=index;
                    }
                    contractType.append(option);
                });
                contractType.get(0).selectedIndex=index1;
                // var s='${model.year}'+"";
                // console.log(s);
                var year=$('#year');
                year.find("option[value="+data.year+"]").attr("selected",true);
                var period=$('#period');
                // var s1='${model.period}'+"";
                // console.log(s1);
                period.find("option[value="+data.period+"]").attr("selected",true);
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

//升级合同模板
function contractAdjustSave() {
    contractId='${contract.contractId}';
    var text='${contract.contractContent}';
    var CText=CKEDITOR.instances.TextArea1.getData(); //取得纯文本
    //var des =CText.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
    $('#TextArea1').prop("value",CText);
    console.log( JSON.stringify($('#page1Info').serializeJSON()));
    $.ajax({
        type: "POST",                            // 方法类型
        url: "upgradeContractModel",                       // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: JSON.stringify($('#page1Info').serializeJSON()),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                // console.log(eval(result));
                console.log("success: " + result);
                alert("保存修改成功!");
                $(location).attr('href', 'contractTemplate.html');//跳转
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

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        searchModel();      //
    }
}

function approval(item) {
    //
    // var contractId=item.parentElement.previousElementSibling.innerHTML;
    //
    // if(confirm("确认审批通过?")){
    //     //点击确定后操作
    //  $.ajax({
    //      type: "POST",                            // 方法类型
    //      url: "approvalModel",                  // url
    //      dataType: "json",
    //      data:{"contractId":contractId},
    //      async: false,
    //      success:function (result) {
    //          if (result != undefined && result.status == "success"){
    //              alert(result.message)
    //              window.location.reload()
    //          }
    //          else {
    //
    //              alert(result.message);
    //
    //          }
    //      },
    //      error:function (result) {
    //          alert('服务器异常!')
    //      }
    //
    //  })
    // }
    $("#approval").modal('show')
}