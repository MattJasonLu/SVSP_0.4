<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户修改</title>
    <script src="js/jquery/2.0.0/jquery.min.js"></script>
    <script src="js/jquery/2.0.0/jquery.serializejson.js"></script>
    <link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
    <link href="css/dashboard.css" rel="stylesheet">
    <link href="css/dropdown-submenu.css" rel="stylesheet">
    <link href="css/bootstrap/navbar.css" rel="stylesheet">
    <script src="js/bootstrap/navbar.js"></script>
</head>
<script>
    /**
     * 客户信息保存
     */
    function clientSave() {
        var data = {
            companyName: $("#companyName").val(),
            organizationCode: $("#organizationCode").val(),
            representative: $("#representative").val(),
            industry: $("#industry").val(),
            enterpriseType: $("#enterpriseType").val(),
            operationType: $("#operationType").val(),
            operationRecord: $("#operationRecord").val(),
            street: $("#street").val(),
            clientId: $("#clientId").val(),
            licenseCode: $("#licenseCode").val(),
            postCode: $("#postCode").val(),
            product: $("#product").val(),
            operationMode: $("#operationMode").val(),
            contingencyPlan: $("#contingencyPlan").val(),
            applicationStatus: $("#applicationStatus").val(),
            location: $("#location").val(),
            processDesp: $("#processDesp").val(),
            contactName: $("#contactName").val(),
            mobile: $("#mobile").val(),
            phone: $("#phone").val(),
            email: $("#email").val()
        };
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveClient",                       // url
            async : false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    console.log("success: " + result);
                    alert("保存成功!");
                    $(location).attr('href', 'clientBackup.html');//跳转
                } else {
                    console.log("fail: " + result);
                    alert("保存失败!");
                }
            },
            error:function (result) {
                console.log("error: " + result);
                alert("服务器异常!");
            }
        });
        saveClientFiles();
    }
    /**
     * 客户信息提交
     */
    function clientSubmit() {
        var data = {
            companyName: $("#companyName").val(),
            organizationCode: $("#organizationCode").val(),
            representative: $("#representative").val(),
            industry: $("#industry").val(),
            enterpriseType: $("#enterpriseType").val(),
            operationType: $("#operationType").val(),
            operationRecord: $("#operationRecord").val(),
            street: $("#street").val(),
            clientId: $("#clientId").val(),
            licenseCode: $("#licenseCode").val(),
            postCode: $("#postCode").val(),
            product: $("#product").val(),
            operationMode: $("#operationMode").val(),
            contingencyPlan: $("#contingencyPlan").val(),
            applicationStatus: $("#applicationStatus").val(),
            location: $("#location").val(),
            processDesp: $("#processDesp").val(),
            contactName: $("#contactName").val(),
            mobile: $("#mobile").val(),
            phone: $("#phone").val(),
            email: $("#email").val()
        };
        $.ajax({
            type: "POST",                            // 方法类型
            url: "submitClient",                     // url
            async : false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    console.log("success: " + result);
                    alert("提交成功!");
                    $(location).attr('href', 'clientBackup.html');//跳转
                } else {
                    console.log("fail: " + result);
                    alert("提交失败!");
                }
            },
            error:function (result) {
                console.log("error: " + result);
                alert("服务器异常!");
            }
        });
        saveClientFiles();
    }
    /**
     * 保存客户的文件
     */
    function saveClientFiles() {
        var formFile = new FormData();
        // 客户编码
        var clientId = document.getElementById("clientId").value;
        formFile.append("clientId", clientId);
        // 材料附件
        if (document.getElementById("materialAttachment").files != null) {
            var materialAttachment = document.getElementById("materialAttachment").files[0];
            formFile.append("materialAttachment", materialAttachment);
        }
        // 流程附件
        if (document.getElementById("processAttachment").files != null) {
            var processAttachment = document.getElementById("processAttachment").files[0];
            formFile.append("processAttachment", processAttachment);
        }
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveFiles",                     // url
            cache: false,
            async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
            data: formFile,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != undefined) {
                    console.log("上传成功");
                } else {

                }
            },
            error: function (result) {
                console.log("error: " + result);
                alert("服务器异常!");
            }
        });
    }
    /**
     * 装载下拉框列表
     */
    function loadSelectList() {
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getSelectedList",                  // url
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    var data = eval(result);
                    // 各下拉框数据填充
                    var enterpriseType = $("#enterpriseType");
                    enterpriseType.children().remove();
                    $.each(data.enterpriseTypeStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        enterpriseType.append(option);
                    });
                    enterpriseType.get(0).selectedIndex = ${client.enterpriseType.index}-1;;
                    var operationType = $("#operationType");
                    operationType.children().remove();
                    $.each(data.operationTypeStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        operationType.append(option);
                    });
                    operationType.get(0).selectedIndex = ${client.operationType.index}-1;;
                    var operationRecord = $("#operationRecord");
                    operationRecord.children().remove();
                    $.each(data.operationRecordStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        operationRecord.append(option);
                    });
                    operationRecord.get(0).selectedIndex = ${client.operationRecord.index}-1;
                    var operationMode = $("#operationMode");
                    operationMode.children().remove();
                    $.each(data.operationModeStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        operationMode.append(option);
                    });
                    operationMode.get(0).selectedIndex = ${client.operationMode.index}-1;
                    var contingencyPlan = $("#contingencyPlan");
                    contingencyPlan.children().remove();
                    $.each(data.contingencyPlanStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        contingencyPlan.append(option);
                    });
                    contingencyPlan.get(0).selectedIndex = ${client.contingencyPlan.index}-1;
                    var applicationStatus = $("#applicationStatus");
                    applicationStatus.children().remove();
                    $.each(data.applicationStatusStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        applicationStatus.append(option);
                    });
                    applicationStatus.get(0).selectedIndex = ${client.applicationStatus.index}-1;
                } else {
                    console.log(result);
                }
            },
            error:function (result) {
                console.log(result);
            }
        });
    }
</script>
<body onload="loadSelectList();">
    <!--导航条-->
    <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar1">
        <div class="main-title">
            <ul class="nav navbar-nav navbar-left navbar-side">
                <li>
                    <a href="#" onclick="$('body').toggleClass('sidebar-collapse');" style="width: 50px">
                        <span class="glyphicon glyphicon-menu-hamburger"></span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="container navbar-left">
            <div class="navbar-header">
                <a class="navbar-brand" href="#"><img src="image/logo2.png"></a>
            </div>
            <div id="navbar" class="collapse navbar-collapse" style="margin-left: 150px;">
                <ul class="nav navbar-nav">
                    <li><a href="wastesPlatform.html">首页</a></li>
                    <li class="dropdown active">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">客户管理<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="clientBackup.html">客户备案</a></li>
                            <li role="separator" class="divider"></li>
                            <li class="dropdown-submenu">
                                <a href="#">业务员分配管理</a>
                                <ul class="dropdown-menu">
                                    <li><a href="salesManage.html">业务员管理</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="clientSalesManage.html">客户分配管理</a></li>
                                </ul>
                            </li>
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
                    <li class="dropdown">
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
                    <li><a href="#">一企一档</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#" title="提醒"><span class="glyphicon glyphicon-bell"></span></a></li>
            <li><a href="#" title="事项"><span class="glyphicon glyphicon-envelope"></span></a></li>
            <li class="dropdown">
                <a href="#" title="我的" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="#">个人信息</a></li>
                    <li><a href="#">待办事项</a></li>
                    <li><a href="index.html">注销</a></li>
                </ul>
            </li>
        </ul>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <div class="sidebar">
                <!--<h4>博客管理系统(四月)</h4>-->
                <!--<div class="cover">-->
                <!--<h2><img class="img-circle" src="image/icons.png"/></h2>-->
                <!--<b>Hi~ 小主</b>-->
                <!--<p>超级管理员</p>-->
                <!--</div>-->
                <ul class="sidenav animated fadeInUp">
                    <!--<li><a href="#"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></a></li>-->
                    <li><a class="withripple" href="wastesPlatform.html"><span class="glyphicon glyphicon-list" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;概览 </span><span class="iright pull-right">&gt;</span><span class="sr-only">(current)</span></a></li>
                    <li class="active"><a class="withripple" href="businessModel.html"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;商务管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;接收管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-save" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;贮存管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;预处理管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;处置管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-tags" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;次生管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-signal" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;基础数据 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;系统设置 </span><span class="iright pull-right">&gt;</span></a></li>
                </ul>
            </div>
        </div>

        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div class="row">
                <ol class="breadcrumb">
                    <li><a href="businessModel.html">商务管理</a></li>
                    <li><a href="#">客户管理</a></li>
                    <li><a href="clientBackup.html">客户备案</a></li>
                    <li class="active">客户新增</li>
                </ol>
            </div>
            <h2 class="sub-header">客户修改</h2>
            <form method="post" id="clientInfoForm" enctype="multipart/form-data">
                <h4 class="text-info">基本信息</h4>
                <div class="row">
                    <div class="form-horizontal col-md-6">
                        <div class="form-group">
                            <label for="companyName" class="col-sm-4 control-label">企业名称</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="companyName" name="companyName" placeholder="" value="${client.companyName}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="organizationCode" class="col-sm-4 control-label">组织机构代码</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="organizationCode" name="organizationCode" placeholder="" value="${client.organizationCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="representative" class="col-sm-4 control-label">法人代表</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="representative" name="representative" placeholder="" value="${client.representative}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="industry" class="col-sm-4 control-label">所属行业</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="industry" name="industry" placeholder="" value="${client.industry}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="enterpriseType" class="col-sm-4 control-label">企业类型</label>
                            <div class="col-xs-5">
                                <select class="form-control" name="enterpriseType" id="enterpriseType"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="operationType" class="col-sm-4 control-label">经营单位类别</label>
                            <div class="col-xs-5">
                                <select class="form-control" name="operationType" id="operationType"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="operationRecord" class="col-sm-4 control-label">建立危废经营记录情况</label>
                            <div class="col-xs-5">
                                <select class="form-control" name="operationRecord" id="operationRecord"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="street" class="col-sm-4 control-label">所属街道</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="street" name="street" placeholder="" value="${client.street}">
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal col-md-6">
                        <div class="form-group">
                            <label for="clientId" class="col-sm-4 control-label">客户编码</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="clientId" name="clientId" placeholder="" value="${client.clientId}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="licenseCode" class="col-sm-4 control-label">营业执照注册号</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="licenseCode" name="licenseCode" placeholder="" value="${client.licenseCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="postCode" class="col-sm-4 control-label">工商注册地邮编</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="postCode" name="postCode" placeholder="" value="${client.postCode}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="product" class="col-sm-4 control-label">主要产品</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="product" name="product" placeholder="" value="${client.product}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="operationMode" class="col-sm-4 control-label">经营方式</label>
                            <div class="col-xs-5">
                                <select class="form-control" name="operationMode" id="operationMode"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="contingencyPlan" class="col-sm-4 control-label">事故防范和应急预案</label>
                            <div class="col-xs-5">
                                <select class="form-control" name="contingencyPlan" id="contingencyPlan"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="applicationStatus" class="col-sm-4 control-label">申报状态</label>
                            <div class="col-xs-5">
                                <select class="form-control" name="applicationStatus" id="applicationStatus"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="location" class="col-sm-4 control-label">工商注册地址</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="location" name="location" placeholder="" value="${client.location}">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="text-info">环评信息</h4>
                <div class="row">
                    <div class="form-horizontal col-md-6">
                        <div class="form-group">
                            <label for="materialAttachment" class="col-sm-4 control-label">原辅材料</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="materialAttachment" name="materialAttachment" placeholder="" value="${client.materialAttachmentUrl}" onclick="changeFileStyle(this);">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="processDesp" class="col-sm-4 control-label">工艺描述</label>
                            <div class="col-xs-5">
                                <textarea class="form-control" id="processDesp" name="processDesp" rows="3">${client.processDesp}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal col-md-6">
                        <div class="form-group">
                            <label for="processAttachment" class="col-sm-4 control-label">工艺流程图</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="processAttachment" name="processAttachment" placeholder="" value="${client.processAttachmentUrl}" onclick="changeFileStyle(this);">
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="text-info">联系方式</h4>
                <div class="row">
                    <div class="form-horizontal col-md-6">
                        <div class="form-group">
                            <label for="contactName" class="col-sm-4 control-label">联系人</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="contactName" name="contactName" placeholder="" value="${client.contactName}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="mobile" class="col-sm-4 control-label">手机号</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="mobile" name="mobile" placeholder="" value="${client.mobile}">
                            </div>
                        </div>
                    </div>
                    <div class="form-horizontal col-md-6">
                        <div class="form-group">
                            <label for="phone" class="col-sm-4 control-label">联系电话</label>
                            <div class="col-xs-5">
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="" value="${client.phone}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-sm-4 control-label">邮箱</label>
                            <div class="col-xs-5">
                                <input type="email" class="form-control" id="email" name="email" placeholder="" value="${client.email}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row text-center">
                    <a class="btn btn-success" onclick="clientSave()">保存信息</a>
                    <a class="btn btn-primary" onclick="clientSubmit()">提交修改</a>
                    <a class="btn btn-danger" href="clientBackup.html">返回</a>
                </div>
            </form>
        </div>

    </div>
</body>
<script type="text/javascript">
    var name1 = $("#materialAttachment").val();
    var arr1 = name1.split("/");
    name1 = arr1[arr1.length-1];
    $("#materialAttachment").val(name1);
    var name2 = $("#processAttachment").val();
    var arr2 = name2.split("/");
    name2 = arr2[arr2.length-1];
    $("#processAttachment").val(name2);
    /**
     * 更改input样式为file
     * @param e
     */
    function changeFileStyle(e) {
        if (e.type == "text") e.type = "file";
    }
</script>
</html>