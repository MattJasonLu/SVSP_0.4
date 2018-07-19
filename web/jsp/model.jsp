<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>新建模板</title>
    <script src="js/jquery/2.0.0/jquery.min.js"></script>
    <script src="js/jquery/2.0.0/jquery.serializejson.js"></script>
    <link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap/bootstrap-select.min.css" type="text/css" rel="stylesheet">
    <script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
    <script src="js/data-format.js"></script>
    <script src="js/bootstrap/bootstrap-select.min.js"></script>
    <script src="js/bootstrap/defaults-zh_CN.min.js"></script>
    <link href="css/dashboard.css" rel="stylesheet">
    <script src="js/ckeditor/ckeditor.js"></script>
    <link href="css/bootstrap/navbar.css" rel="stylesheet">
    <script src="js/bootstrap/navbar.js"></script>
</head>
<script>
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
    };

</script>
<body onload="getContractList();">
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
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">客户管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">客户备案</a></li>
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
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">供应商管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="supplierBackup.html">供应商备案</a></li>
                    </ul>
                </li>
                <li class="dropdown active">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">合同管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="contractManage.html">合同列表</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="contractTemplate.html">合同模板</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">价格管理<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="quotation.html">报价管理</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="cost.html">成本管理</a></li>
                    </ul>
                </li>
                <li><a href="archives.html">一企一档</a></li>
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
                <li><a href="#">合同管理</a></li>
                <li class="active">新建模板</li>
            </ol>
        </div>
        <h4 class="sub-header">新建模板</h4>
        <form method="post" id="page1Info" enctype="multipart/form-data">
            <div class="row">
                <div class="form-horizontal col-md-4">
                    <div class="form-group">
                        <label class="col-sm-4 control-label">模板名称：</label>
                        <div class="col-xs-5">
                            <input type="text" class="form-control" name="modelName" value="${model.modelName}">
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4"></div>
                <div class="form-horizontal col-md-4">
                    <div class="form-group" >
                        <label for="contractId" class="col-sm-3 control-label">编号</label>
                        <div class="col-xs-5" >
                            <input type="text" class="form-control" id="contractId" name="contractId"  value="${model.contractId}" readonly >
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-horizontal col-md-4">
                    <div class="form-group">
                        <label for="contractType" class="col-sm-4 control-label">合同类型：</label>
                        <div class="col-xs-5">
                            <select class="form-control" id="contractType" name="contractType"></select>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4">
                    <div class="form-group">
                        <label for="year" class="col-sm-4 control-label">年份：</label>
                        <div class="col-xs-5">
                            <select class="form-control"  id="year" name="year">
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-horizontal col-md-4">
                    <div class="form-group">
                        <label for="period" class="col-sm-4 control-label">适用期限：</label>
                        <div class="col-xs-6">
                            <select class="form-control" id="period" name="period">
                                <option value="1年">1年</option>
                                <option value="2年">2年</option>
                                <option value="3年">3年</option>
                                <option value="4年">4年</option>
                                <option value="5年">5年</option>
                                <option value="6年">6年</option>
                                <option value="7年">7年</option>
                                <option value="无固定期限">无固定期限</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-horizontal col-md-12">
                    合同正文：<br>
                    <textarea id="TextArea1" cols="20" rows="2"  name="contractContent"  class="CKEDITOR"></textarea>
                </div>
            </div>
            <div class="row text-center">
                <a class="btn btn-primary" onclick="contractAdjustSave()">修改</a>
                <a class="btn btn-danger" href="contractTemplate.html">返回</a>
            </div>
        </form>
    </div>
</div>
</body>
<script type="text/javascript">
    // 页面准备完成后载入客户信息
    function getContractList() {
        var modelName=Request["modelName"];
        console.log(modelName);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "getContractList",                  // url
            dataType: "json",
            success: function (result) {
                var text='${model.contractContent}';
               // var text="<p>12312312";
                console.log(text);
                CKEDITOR.instances.TextArea1.setData(text);//获取值
                //$('#TextArea1').val(text);
                if (result != undefined) {
                    var data = eval(result);
                    // 各下拉框数据填充
                    var contractType = $("#contractType");
                    contractType.children().remove();
                    $.each(data.contractNameStrList, function (index, item) {
                        var option = $('<option />');
                        option.val(index);
                        option.text(item.name);
                        contractType.append(option);
                    });
                    contractType.get(0).selectedIndex = ${model.contractType.index}-1;
                    var s='${model.year}'+"";
                   // console.log(s);
                    var year=$('#year');
                  year.find("option[value="+s+"]").attr("selected",true);
                  var period=$('#period');
                  var s1='${model.period}'+"";
                   // console.log(s1);
                  period.find("option[value="+s1+"]").attr("selected",true);
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
    function contractAdjustSave() {
        contractId='${contract.contractId}';
        var text='${contract.contractContent}';
        var CText=CKEDITOR.instances.TextArea1.getData(); //取得纯文本
        //var des =CText.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
        $('#TextArea1').prop("value",CText);
        $.ajax({
            type: "POST",                            // 方法类型
            url: "saveAdjustContract",                       // url
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
    CKEDITOR.replace('TextArea1');
</script>
</html>
