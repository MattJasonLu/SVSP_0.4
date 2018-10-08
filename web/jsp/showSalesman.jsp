<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>业务员新增</title>
    <script src="js/jquery/2.0.0/jquery.min.js"></script>
    <script src="js/jquery/2.0.0/jquery.serializejson.js"></script>
    <link href="css/bootstrap/3.3.6/bootstrap.min.css" rel="stylesheet">
    <script src="js/bootstrap/3.3.6/bootstrap.min.js"></script>
    <link href="css/dashboard.css" rel="stylesheet">
    <link href="css/bootstrap/navbar.css" rel="stylesheet">
    <script src="js/bootstrap/navbar.js"></script>
</head>
<style>
    .middle {
        margin-top: 10%;
    }
</style>
<script type="text/javascript">
    function updateSalesman() {
        console.log(JSON.stringify($('#salesmanInfoForm').serializeJSON()));
        $.ajax({
            type: "POST",                       // 方法类型
            url: "updateSalesman",               // url
            async : false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: JSON.stringify($('#salesmanInfoForm').serializeJSON()),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result != undefined) {
                    console.log("success: " + result);
                    alert("修改成功");
                    $(location).attr('href',"salesManage.html");
                } else {
                    console.log("fail: " + result);
                    alert("修改失败");
                }
            },
            error:function (result) {
                console.log("error: " + result.message);
                alert("服务器异常");
            }
        });
    }

</script>
<body>
    <!--导航条-->
    <nav class="navbar navbar-inverse navbar-fixed-top float" id="navbar1" style="height: 50px;">
        <div class="main-title">
            <ul class="nav navbar-nav navbar-left navbar-side">
                <li>
                    <a href="#" onclick="$('body').toggleClass('sidebar-collapse');" style="width: 50px">
                        <span class="glyphicon glyphicon-menu-hamburger"></span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="container navbar-left" style="width: 900px;">
            <div class="navbar-header">
                <a class="navbar-brand" href="#"><img src="image/logo2.png"></a>
            </div>
            <div id="navbar" class="collapse navbar-collapse" style="margin-left: 150px;">
                <ul class="nav navbar-nav">
                    <li><a href="businessModel.html">首页</a></li>
                    <li class="dropdown active">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">产废单位管理<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="clientBackup.html" id="function_48" onclick="checkAuthority($(this))">产废单位备案</a></li>
                            <li role="separator" class="divider"></li>
                            <li class="dropdown-submenu">
                                <a href="#">业务员分配管理</a>
                                <ul class="dropdown-menu">
                                    <li><a href="salesManage.html" id="function_80" onclick="checkAuthority($(this))">业务员管理</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="clientSalesManage.html" id="function_81" onclick="checkAuthority($(this))">产废单位分配管理</a></li>
                                </ul>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li><a href="questionnaireManage.html" id="function_50" onclick="checkAuthority($(this))">危废数据调查表管理</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="sampleInfo.html" id="function_51" onclick="checkAuthority($(this))">产废单位样品登记</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="wayBill1.html" id="function_52" onclick="checkAuthority($(this))">接运单管理</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">处置单位管理<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="supplierBackup.html" id="function_15" onclick="checkAuthority($(this))">处置单位备案</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">合同管理<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="contractManage.html" id="function_54" onclick="checkAuthority($(this))">合同列表</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="contractTemplate.html" id="function_55" onclick="checkAuthority($(this))">合同模板</a></li>
                        </ul>
                    </li>
                    <!--<li class="dropdown">-->
                    <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">价格管理<span class="caret"></span></a>-->
                    <!--<ul class="dropdown-menu">-->
                    <!--<li><a href="quotation.html" id="function_57" onclick="checkAuthority($(this))">报价管理</a></li>-->
                    <!--<li role="separator" class="divider"></li>-->
                    <!--<li><a href="cost.html" id="function_58" onclick="checkAuthority($(this));">成本管理</a></li>-->
                    <!--</ul>-->
                    <!--</li>-->
                    <li><a href="archivesManage.html" id="function_18" onclick="checkAuthority($(this));">一企一档</a></li>
                    <li><a href="stockManage.html" id="function_19" onclick="checkAuthority($(this));">库存申报</a></li>
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
                    <li><a href="#" onclick="showLog();">登录日志</a></li>
                    <li><a href="index.html">注销</a></li>
                </ul>
            </li>
        </ul>

    </nav>

    <div class="container-fluid">
        <div class="row">
            <div class="sidebar">
                <ul class="sidenav animated fadeInUp">
                    <!--<li><a href="#"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></a></li>-->
                    <li><a class="withripple" href="wastesPlatform.html"id="function_1" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-list" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;系统概览 </span><span class="iright pull-right">&gt;</span><span class="sr-only">(current)</span></a></li>
                    <li class="active"><a class="withripple" href="businessModel.html"id="function_2" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-user" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;商务管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="compatibilityPlan.html"id="function_3" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-list" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;配伍计划 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="receiveManagement.html"id="function_4" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;接收管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="storageManagement.html"id="function_5" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-save" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;贮存管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="preprocessingManagement.html"id="function_6" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;预备管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="dispositionManagement.html"id="function_7" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;处置管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="secondaryManagement.html"id="function_8" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-tags" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;次生管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="procurementManagement.html"id="function_9" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-indent-right" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;采购管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="reportManagement.html"id="function_10" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;报表管理 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="basicData.html" id="function_11" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-signal" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;基础数据 </span><span class="iright pull-right">&gt;</span></a></li>
                    <li><a class="withripple" href="#" id="function_12" onclick="checkAuthority($(this))"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span><span class="sidespan">&nbsp;&nbsp;系统设置 </span><span class="iright pull-right">&gt;</span></a></li>
                </ul>
            </div>
        </div>

        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div>
                <ol class="breadcrumb">
                    <li><a href="businessModel.html">商务管理</a></li>
                    <li><a href="#">客户管理</a></li>
                    <li><a href="salesManage.html">业务员管理</a></li>
                    <li class="active">业务员新增</li>
                </ol>
            </div>
            <h4 class="sub-header">业务员新增</h4>
            <form method="post" id="salesmanInfoForm" class="">
                <h4 class="text-info">基本信息</h4>
                <div class="row middle">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="salesmanId" class="col-sm-4 control-label">业务员编号</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" id="salesmanId" name="salesmanId" placeholder="" value="${salesman.salesmanId}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name" class="col-sm-4 control-label">姓名</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" id="name" name="name" placeholder="" value="${salesman.name}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sex" class="col-sm-4 control-label">性别</label>
                            <div class="col-xs-4">
                                <select id="sex" name="sex" class="form-control">
                                    <option value="true">男</option>
                                    <option value="false">女</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="age" class="col-sm-4 control-label">年龄</label>
                            <div class="col-xs-4">
                                <input type="text" class="form-control" id="age" name="age" placeholder="" value="${salesman.age}">
                            </div>
                        </div>
                    </div>
                    <div class="text-center middle">
                        <a class="btn btn-primary" href="#" onclick="updateSalesman();">修改</a>
                        <a class="btn btn-danger" href="salesManage.html">返回</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
<script type="text/javascript">
    $("#sex").val("${salesman.sex}");
</script>
</html>