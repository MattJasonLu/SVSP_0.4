<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>合同新增</title>
    <script src="js/jquery/2.0.0/jquery.min.js"></script>
    <script src="js/jquery/2.0.0/jquery.serializejson.js"></script>
    <link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/bootstrap/bootstrap-select.min.css" type="text/css" rel="stylesheet">
    <link href="css/dashboard.css" rel="stylesheet">
    <script type="text/javascript" src="js/bootstrap/bootstrap-datetimepicker.js" charset="UTF-8"></script>
    <script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
    <script src="js/bootstrap/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="js/bootstrap/bootstrap-select.min.js"></script>
    <script src="js/bootstrap/defaults-zh_CN.min.js"></script>
    <link href="css/dropdown-submenu.css" rel="stylesheet">
</head>
<script type="text/javascript">
    function loadContractSelectList() {
        /**
         * 装载下拉框列表
         */
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getContractList",                  // url
            dataType: "json",
            success: function (result) {
                var data=eval(result);
                var begin='${contract.beginTime}';//String类型
                var end='${contract.endTime}';
                var beginTime=getTime(begin);
                var endTime=getTime(end);
                $('#beginTime').prop("value",beginTime);//添加起始日期
                $('#endTime').prop("value",endTime);//添加截止人日期
                var freight='${contract.freight}';
                if(freight=='false'){
                    $('#isFreight').removeAttr("checked");
                    $('#isFreight').prop("checked",false);
                    $('#isFreight').prop("value",false);
                }
                if(freight=='true'){
                    $('#isFreight').removeAttr("checked");
                    $('#isFreight').prop("checked",true);
                    $('#isFreight').prop("value",true);
                }
                var contractVersion='${contract.contractVersion}';
                $(":radio[name='contractVersion'][value='" +contractVersion+"']").prop("checked", "checked");
                if (result != undefined) {
                    var data = eval(result);
                    // 各下拉框数据填充
                   //合同名称
                    var contractName = $("#contractName");
                    contractName.children().remove();
                    $.each(data.contractNameStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        contractName.append(option);
                    });
                    contractName.get(0).selectedIndex = ${contract.contractType.index}-1;
                   //省级下拉
                    var province = $("#province");
                    province.children().remove();
                    $.each(data.provinceStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        province.append(option);
                    });
                    province.get(0).selectedIndex = ${contract.province.index-1};
                    var provinceId=${contract.province.index-1}+1;
                    //城市下拉
                    $.ajax({
                        type: "POST",                            // 方法类型
                        url: "getCityList",                  // url
                        dataType: "json",
                        data:{
                            'provinceId': provinceId
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
                                city.get(0).selectedIndex = cityIndex;
                            } else {
                                console.log(result);
                            }
                        },
                        error:function (result) {
                            console.log(result);
                        }
                    });
                    //公司名称
                    var clientName=$('#companyName');
                    clientName.children().remove();
                    index1="";
                    var s='${contract.companyName}';
                    $.each(data.companyNameList, function (index, item) {
                        var option = $('<option />');
                        option.val(item.companyName);
                        option.text(item.companyName);
                        if(item.companyName==s){
                            index1=index;
                        }
                        clientName.append(option);
                    });
                    clientName.get(0).selectedIndex =index1;
                    //开票税率1下拉框
                    var taxRate1=$('#taxRate1');
                    taxRate1.children().remove();
                    //var s='${contract.ticketRate1}';//Rate3
                    $.each(data.ticketRateStrList1, function (index, item) {
                        //看具体的item 在指定val
                        console.log(item);
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        taxRate1.append(option);
                    });
                    taxRate1.get(0).selectedIndex = ${contract.ticketRate1.index}-1;
                    //开票税率2下拉框
                    var taxRate2=$('#taxRate2');
                    taxRate2.children().remove();
                    var s1='${contract.ticketRate2}';
                    $.each(data.ticketRateStrList2, function (index, item) {
                        console.log(s1)
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        taxRate2.append(option);
                    });
                    taxRate2.get(0).selectedIndex =${contract.ticketRate2.index}-1;

                } else {
                    console.log(result);
                }
            },
            error:function (result) {
                console.log(result);
            }
        });

    }
    function changeSelect(index) {
        var index1=index+1;//获得province_id
        //console.log(index1);
        //调用ajax
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getCityList",                  // url
            dataType: "json",
            data:{
                'provinceId': index1
            },
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    //console.log(data);
                    //var contractName = $("#contractName");
                    //下拉框填充
                    var city=$("#city");
                    city.children().remove();
                    $.each(data, function (index, item) {
                        var option1 = $('<option />');
                        option1.val(item.cityname);
                        option1.text(item.cityname);
                        city.append(option1);
                    });
                    city.get(0).selectedIndex = -1;
                } else {
                    console.log(result);
                }
            },
            error:function (result) {
                console.log(result);
            }
        });

    }
    /**
     * 保存
     */
    function contractSave() {
        var s=($('#contractInfoForm').serializeJSON());
        //console.log(s);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify($('#contractInfoForm').serializeJSON()),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                   // console.log(eval(result));
                    console.log("success: " + result);
                    alert("保存成功!");
                    $(location).attr('href', 'contractManage.html');//跳转
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
    /**/
    function contractSave() {
        var s=($('#contractInfoForm').serializeJSON());
        //console.log(s);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify($('#contractInfoForm').serializeJSON()),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                  //  console.log(eval(result));
                    console.log("success: " + result);
                    alert("保存成功!");
                    $(location).attr('href', 'contractManage.html');//跳转
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
    //获取时间
    function getTime(time) {
        var date=new Date(time);//转成Date
        var year=date.getFullYear();
        var mouth=date.getMonth()+1;
        var day=date.getDate();
        if(mouth.length!=2){
            mouth="0"+mouth;

        }
        if(day.length<2){
            day="0"+day;
        }
        return year+"-"+mouth+"-"+day;
    }
    /**
     * 提交
     */
    function contractSubmit(){
        var s=($('#contractInfoForm').serializeJSON());
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
                   // console.log(eval(result));
                    console.log("success: " + result);
                    alert("提交成功!");
                    $(location).attr('href', 'contractManage.html');//跳转
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
</script>
<body onload="loadContractSelectList();">
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">产废服务平台</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="wastesPlatform.html">首页</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">客户管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="clientBackup.html">客户备案</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="salesManage.html">业务员分配管理</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="questionnaireManage.html">危废数据调查表管理</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="sampleManage.html">客户样品登记</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">供应商管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="supplierBackup.html">供应商备案</a></li>
                    </ul>
                </li>
                <li class="dropdown active">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">合同管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="contractManage.html">合同列表</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="contractTemplate.html">合同模板</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">价格管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="quotation.html">报价管理</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="cost.html">成本管理</a></li>
                    </ul>
                </li>
                <li><a href="archives.html">一企一档</a></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">个人信息</a></li>
                        <li><a href="#">待办事项</a></li>
                        <li><a href="index.html">注销</a></li>
                    </ul>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li><a href="wastesPlatform.html">概览</a></li>
                <li class="active"><a href="#">商务管理 <span class="sr-only">(current)</span></a></li>
                <li><a href="#">接收管理</a></li>
                <li><a href="#">贮存管理</a></li>
                <li><a href="#">预处理管理</a></li>
                <li><a href="#">处置管理</a></li>
                <li><a href="#">次生管理</a></li>
                <li><a href="#">基础数据</a></li>
                <li><a href="#">系统设置</a></li>
            </ul>
        </div>
    </div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <div class="row">
            <ol class="breadcrumb">
                <li><a href="businessModel.html">商务管理</a></li>
                <li><a href="#">合同管理</a></li>
                <li><a href="contractManage.html">合同列表</a></li>
            </ol>
        </div>
        <h2 class="sub-header">次生合同申请表修改</h2>
        <form method="post" id="contractInfoForm" enctype="multipart/form-data" >
            <div class="row">
                <div class="form-horizontal col-md-4">
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="submitName">送审人员</label>
                        <div class="col-xs-6">
                            <input type="text" class="form-control"  name="reviewer" id="submitName" placeholder="***" readonly>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4" >
                    <div class="form-group"  >
                        <label class="col-sm-6 control-label" for="submitDate"> 送审日期</label>
                        <div class="col-xs-6">
                            <input type="text" class="form-control"  name="reviewDate" id="submitDate" placeholder="***" readonly>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4" >
                    <div class="form-group">
                        <label class="col-sm-6 control-label" for="submitDep"> 送审部门</label>
                        <div class="col-xs-6">
                            <input type="text" class="form-control"  name="reviewDepartment" id="submitDep" placeholder="***" readonly>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="form-horizontal col-md-6">
                    <div class="form-group" >
                        <label  class="col-sm-4 control-label" for="companyName">公司名称</label>
                        <div class="col-xs-4">
                            <select class="form-control" id="companyName" name="companyName">
                            </select>
                        </div>
                    </div>
                        <div class="form-group" >
                            <label class="col-sm-4 control-label" for="province">所属区域 </label>
                            <form name="form1" method="post" action="">
                                <div class="form-inline">
                                    <div class="form-group col-xs-3">
                                        <select class="form-control" id="province"  name="province" onchange="changeSelect(this.selectedIndex)">
                                        </select>
                                    </div>
                                    <div class="form-group col-xs-1">
                                        <select class="form-control" id="city" name="city">
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    <div class="form-group" >
                        <label for="contractName" class="col-sm-4 control-label">合同名称</label>
                        <div class="col-xs-5">
                            <select class="form-control" id="contractName" name="contractType">
                            </select>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label  for="bankName" class="col-sm-4 control-label">开户行名称</label>
                        <div class="col-xs-4" >
                            <input type="text" class="form-control" id="bankName" name="bankName" value="${contract.bankName}">
                        </div>
                    </div>
                    <div class="form-group" >
                        <label for="taxRate1" class="col-sm-4 control-label">开票税率1</label>
                        <div class="col-xs-5">
                            <select class="form-control" id="taxRate1" name="ticketRate1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="col-sm-4 control-label sr-only" > 1111111</label>
                        <label class="checkbox-inline col-xs-5" for="isFreight">
                            是否包含运费<input type="checkbox" id="isFreight"  class="col-xs-3" name="freight" onclick="is()">
                        </label>
                    </div>
                </div>

                <div class="form-horizontal col-md-6">
                    <div class="form-group" >
                        <label  class="col-sm-3 control-label" for="contractVersion" >合同版本</label>
                        <div class="col-xs-8" >
                            <label class="radio-inline">
                                <input type="radio" name="contractVersion" id="contractVersion" value="companyContract"  > 公司合同
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="contractVersion" id="contractVersion2" value="customerContract"> 客户合同
                            </label>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label class="col-sm-3 control-label">合同有效期 </label>
                        <div class="input-group date">
                            <input type="text" class="input-sm form-control form_datetime1" name="beginTime" id="beginTime"/>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-minus"></span></span>
                            <input type="text" class="input-sm form-control form_datetime2" name="endTime" id="endTime"/>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label  for="contacts" class="col-sm-3 control-label">联系人</label>
                        <div class="col-md-3" >
                            <input type="text" class="form-control" id="contacts" name="contactName" value="${contract.contactName}">
                        </div>
                        <label for="telephone" class="col-sm-3 control-label">联系电话</label>
                        <div class="col-md-3" >
                            <input type="text" class="form-control" id="telephone" name="telephone" value="${contract.telephone}">
                        </div>
                    </div>
                    <div class="form-group" >
                        <label  for="bankAccount" class="col-sm-4 control-label">开户行账号</label>
                        <div class="col-xs-4" >
                            <input type="text" class="form-control" id="bankAccount" name="bankAccount" value="${contract.bankAccount}">
                        </div>
                    </div>
                    <div class="form-group" >
                        <label for="taxRate2" class="col-sm-4 control-label">开票税率2</label>
                        <div class="col-xs-5">
                            <select class="form-control" id="taxRate2" name="ticketRate2">
                            </select>
                        </div>
                    </div>
                    <div class="form-group" >
                        <label for="contractId" class="col-sm-3 control-label">合同编号</label>
                        <div class="col-xs-5" >
                            <input type="text" class="form-control" id="contractId" name="contractId" value="${contract.contractId}" readonly >
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <a class="btn btn-success" onclick="contractAdjustSave()">保存</a>
                <a class="btn btn-primary" onclick="contractAdjustSave()">提交</a>
                <a class="btn btn-danger" href="wastesContractInfo.html">危废合同申请表</a>
                <a class="btn btn-danger" href="logisticsContractInfo.html">物流合同申请表</a>
                <a class="btn btn-danger" href="#">应急处置意向书</a>
                <a class="btn btn-danger" href="#">采购合同申请表</a>
                <a class="btn btn-danger" href="contractManage.html">返回</a>
            </div>
        </form>






    </div>
</div>

</body>
<script>
    $('.form_datetime1').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_datetime2').datetimepicker({
        format: 'yyyy-mm-dd',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: true,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    /**
     * 保存修改
     */
    function contractAdjustSave() {
        var companyName=$("#companyName option:selected").text();//获取客户名称
        var province=$("#province option:selected").text();//获得省名称
        var city=$('#city option:selected').text();//获得市
        var contractName=$('#contactName option:selected').text();
        var beginTime=$("#beginTime").val();
        var endTime=$("#endTime").val();// 截止日期
        var contactName=$('#contactName').text();//联系人
        var isFreight=$('#isFreight').prop("checked");//是否需要运费
        var order1=$('#order1').val();
        var telephone=$('#telephone').val();
        var contractVersion=$('input:radio:checked').val();
        contractId='${contract.contractId}';
        // console.log("合同编号为"+contractId);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveAdjustContract",                       // url
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify($('#contractInfoForm').serializeJSON()),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    // console.log(eval(result));
                    console.log("success: " + result);
                    alert("保存修改成功!");
                    $(location).attr('href', 'contractManage.html');//跳转
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
    function is() {
        var isFreight= new String($('#isFreight').prop("checked"));//是否需要运费
        var   gettype=Object.prototype.toString
        //console.log(gettype.call(isFreight));
        var id=$("#contractId").val();
       // console.log(isFreight+id);
        $.ajax({
            type: "POST",                     // 方法类型
            url: "isF",                  // url
            dataType: "json",
            data:{
                'isFreight':isFreight,
                'id':id,
            },
            success: function (result) {


            },
            error: function (result) {

            }
        });
    }
</script>
</html>
