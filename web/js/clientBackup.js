function approval1() {
    $('#contractInfoForm2').modal('show');
}

function approval2() {
    $('#contractInfoForm3').modal('show');
}

var clientId;

/**
 * 导航问题
 * */
$(function () {
    autoNav();
});

//解决底部自动导航的问题
function autoNav() {
    //获取内容的高度
    var bodyHeight = $("body").height();
    //获取底部导航的高度
    var navHeight = $(".navbar").height();
    //获取显示屏的高度
    var iHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //如果内容的高度大于（窗口的高度 - 导航的高度）,z则需要添加一个div，设置其高度
    if (bodyHeight > (iHeight - navHeight)) {
        $("body").append('<div style="height: ' + navHeight + 'px"></div>');
    }
}

/**
 * 获取用户的编号
 * @param item
 * @returns {string}
 */
function getClientId(item) {
    return item.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
}

/**
 * 审核用户
 * @param item 客户
 */
function examineClient(item) {
    var id = getClientId(item);
    // 添加客户信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClient",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'id': id
        },
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                $("#modal4_companyName").text(data.companyName);
                $("#modal4_organizationCode").text(data.organizationCode);
                $("#modal4_representative").text(data.representative);
                $("#modal4_industry").text(data.industry);
                if (data.enterpriseType != null)
                    $("#modal4_enterpriseType").text(data.enterpriseType.name);
                if (data.operationType != null)
                    $("#modal4_operationType").text(data.operationType.name);
                if (data.operationRecord != null)
                    $("#modal4_operationRecord").text(data.operationRecord.name);
                $("#modal4_street").text(data.street);
                $("#modal4_clientId").text(data.clientId);
                $("#modal4_licenseCode").text(data.licenseCode);
                $("#modal4_postCode").text(data.postCode);
                $("#modal4_product").text(data.product);
                if (data.operationMode != null)
                    $("#modal4_operationMode").text(data.operationMode.name);
                if (data.contingencyPlan != null)
                    $("#modal4_contingencyPlan").text(data.contingencyPlan.name);
                if (data.applicationStatus != null)
                    $("#modal4_applicationStatus").text(data.applicationStatus.name);
                $("#modal4_location").text(data.location);
                $("#modal4_processDesp").text(data.processDesp);
                $("#modal4_contactName").text(data.contactName);
                $("#modal4_mobile").text(data.mobile);
                $("#modal4_phone").text(data.phone);
                $("#modal4_email").text(data.email);
                $("#modal4_bankName").text(data.bankName);
                $("#modal4_bankAccount").text(data.bankAccount);
                $("#modal4_taxNumber").text(data.taxNumber);
                $("#modal4_ticketType").text(data.ticketType);
                $("#advice").text(data.advice);
                $("#advice1").val(data.advice)
                $("#backContent").val(data.advice);
                $("#modal4_approvalState").text(data.checkState.name);
                $("#modal4_approvalDate").text(getTimeStr(data.nowTime));
            } else {
                $("#modal4_companyName").text("");
                $("#modal4_organizationCode").text("");
                $("#modal4_representative").text("");
                $("#modal4_industry").text("");
                $("#modal4_enterpriseType").text("");
                $("#modal4_operationType").text("");
                $("#modal4_operationRecord").text("");
                $("#modal4_street").text("");
                $("#modal4_clientId").text("");
                $("#modal4_licenseCode").text("");
                $("#modal4_postCode").text("");
                $("#modal4_product").text("");
                $("#modal4_operationMode").text("");
                $("#modal4_contingencyPlan").text("");
                $("#modal4_applicationStatus").text("");
                $("#modal4_location").text("");
                $("#modal4_processDesp").text("");
                $("#modal4_contactName").text("");
                $("#modal4_mobile").text("");
                $("#modal4_phone").text("");
                $("#modal4_email").text("");
                $("#modal4_bankName").text("");
                $("#modal4_bankAccount").text("");
                $("#modal4_taxNumber").text("");
                $("#modal4_ticketType").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#examineModal').modal('show');
}

/**
 * 查看用户
 * @param item 客户
 */
function viewClient(item) {
    var id = getClientId(item);
    // 添加客户信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClient",                   // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'id': id
        },
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                var data = eval(result);
                $("#modal3_companyName").text(data.companyName);
                $("#modal3_organizationCode").text(data.organizationCode);
                $("#modal3_representative").text(data.representative);
                $("#modal3_industry").text(data.industry);
                if (data.enterpriseType != null)
                    $("#modal3_enterpriseType").text(data.enterpriseType.name);
                if (data.operationType != null)
                    $("#modal3_operationType").text(data.operationType.name);
                if (data.operationRecord != null)
                    $("#modal3_operationRecord").text(data.operationRecord.name);
                $("#modal3_street").text(data.street);
                $("#modal3_clientId").text(data.clientId);
                $("#modal3_licenseCode").text(data.licenseCode);
                $("#modal3_postCode").text(data.postCode);
                $("#modal3_product").text(data.product);
                if (data.operationMode != null)
                    $("#modal3_operationMode").text(data.operationMode.name);
                if (data.contingencyPlan != null)
                    $("#modal3_contingencyPlan").text(data.contingencyPlan.name);
                if (data.applicationStatus != null)
                    $("#modal3_applicationStatus").text(data.applicationStatus.name);
                $("#modal3_location").text(data.location);
                $("#modal3_processDesp").text(data.processDesp);
                $("#modal3_contactName").text(data.contactName);
                $("#modal3_mobile").text(data.mobile);
                $("#modal3_phone").text(data.phone);
                $("#modal3_email").text(data.email);
                $("#modal3_materialAttachment").click(function () {
                    if (data.materialAttachmentUrl != null && data.materialAttachmentUrl != "") {
                        window.open('downloadFile?filePath=' + data.materialAttachmentUrl);
                    } else {
                        alert("未上传文件");
                    }
                });
                $("#modal3_processAttachment").click(function () {
                    if (data.processAttachmentUrl != null && data.processAttachmentUrl != "") {
                        window.open('downloadFile?filePath=' + data.processAttachmentUrl);
                    } else {
                        alert("未上传文件");
                    }
                });
                $("#modal4_bankName").text(data.bankName);
                $("#modal4_bankAccount").text(data.bankAccount);
                $("#modal4_taxNumber").text(data.taxNumber);
                $("#modal4_ticketType").text(data.ticketType);
            } else {
                $("#modal3_companyName").text("");
                $("#modal3_organizationCode").text("");
                $("#modal3_representative").text("");
                $("#modal3_industry").text("");
                $("#modal3_enterpriseType").text("");
                $("#modal3_operationType").text("");
                $("#modal3_operationRecord").text("");
                $("#modal3_street").text("");
                $("#modal3_clientId").text("");
                $("#modal3_licenseCode").text("");
                $("#modal3_postCode").text("");
                $("#modal3_product").text("");
                $("#modal3_operationMode").text("");
                $("#modal3_contingencyPlan").text("");
                $("#modal3_applicationStatus").text("");
                $("#modal3_location").text("");
                $("#modal3_processDesp").text("");
                $("#modal3_contactName").text("");
                $("#modal3_mobile").text("");
                $("#modal3_phone").text("");
                $("#modal3_email").text("");
                $("#modal4_bankName").text("");
                $("#modal4_bankAccount").text("");
                $("#modal4_taxNumber").text("");
                $("#modal4_ticketType").text("");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    $('#viewModal').modal('show');
}

/**
 * 审批通过客户
 */
function passClient() {
    var id = $("#modal4_clientId").text();
    console.log(id);
    $.ajax({
        type: "POST",                       // 方法类型
        url: "passClient",               // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'clientId': id,'advice':$("#advice1").val()
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                if (result.status == "success") {
                    alert("审批成功");
                    window.location.reload();
                } else if (result.status == "fail") {
                    alert("审批失败");
                }
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}

/**
 * 驳回客户
 */
function backClient() {
    var id = $("#modal4_clientId").text();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "backClient",               // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            'clientId': id,'advice':$("#backContent").val()
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != undefined) {
                if (result.status == "success") {
                    alert("驳回成功");
                    window.location.reload();
                } else if (result.status == "fail") {
                    alert("驳回失败");
                }
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器异常");
        }
    });
}


/**
 * 提交用户
 * @param item 客户
 */
function commitClient(item) {
    var id = getClientId(item);
    var r = confirm("确认提交？");
    if (r == true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "submitClientById",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序(异步true，实为两个线程同步执行，不需要返回值直接执行后面的语句)
            data: {
                'clientId': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    if (result.status == "success") {
                        alert("提交成功");
                        window.location.reload();
                    } else if (result.status == "fail") {
                        alert("提交失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    } else {
        alert("提交操作取消。")
    }
}


/**
 * 修改用户
 * @param item
 */
function adjustClient(item) {
    // 拿到点击条目的客户编号
    var id = getClientId(item);
    window.location.href = "clientInfo.html?id=" + id;
}

/**
 * 禁用用户
 * @param item 用户
 */
function disableClient(item) {
    var id = getClientId(item);
    var r = confirm("确认禁用？");
    if (r == true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "disableClient",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'clientId': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    if (result.status == "success") {
                        alert("禁用成功");
                        window.location.reload();
                    } else if (result.status == "fail") {
                        alert("禁用失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    } else {
        alert("禁用操作取消。")
    }
}

/**
 * 启用用户
 * @param item 用户
 */
function enableClient(item) {
    var id = getClientId(item);
    var r = confirm("确认启用？");
    if (r == true) {
        $.ajax({
            type: "POST",                       // 方法类型
            url: "enableClient",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'clientId': id
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result != undefined) {
                    if (result.status == "success") {
                        alert("启用成功");
                        window.location.reload();
                    } else if (result.status == "fail") {
                        alert("启用失败");
                    }
                }
            },
            error: function (result) {
                console.log(result);
                alert("服务器异常");
            }
        });
    } else {
        alert("启用操作取消。")
    }
}

/**
 * 分配业务员
 * @param item 用户
 */
function setSales(item) {
    var id = getClientId(item);
    clientId = id;
    // 添加客户信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getClient",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: {
            'id': id
        },
        success: function (result) {
            if (result != undefined) {
                console.log("success: " + result);
                $("#model-clientId").val(result.clientId);
                $("#model-companyName").val(result.companyName);
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    // 添加业务员信息
    $.ajax({
        type: "POST",                       // 方法类型
        url: "listSalesman",              // url
        cache: false,
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != undefined) {
                console.log("success: " + result);
                var data = eval(result);
                // 各下拉框数据填充
                var salesmanList = $("#model-salesmanList");
                // 清空遗留元素
                salesmanList.children().first().siblings().remove();
                $.each(data, function (index, item) {
                    var option = $('<option />');
                    option.val(item.salesmanId);
                    option.text(item.name);
                    salesmanList.append(option);
                });
            } else {
                console.log("fail: " + result);
            }
        },
        error: function (result) {
            console.log("error: " + result);
        }
    });
    $('#myModal').modal('show');

}

/**
 * 分配业务员提交
 */
function assignSales() {
    var salesmanId = $("#model-salesmanList").val();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "assignSalesman",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data: JSON.stringify({
            'salesman': {
                'salesmanId': salesmanId
            },
            'clientId': clientId
        }),
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result != undefined) {
                console.log("success: " + result);
                alert("保存成功!");
                window.location.reload();
            } else {
                console.log("fail: " + result);
                alert("保存失败!");
            }
        },
        error: function (result) {
            var that = this;
            console.log(this.data);
            console.log("error: " + result);
            alert("服务器异常!");
        }
    });
}

/**
 * 删除用户
 * @param item
 */
function deleteClient(item) {
    var r = confirm("是否删除该客户？");
    if (r == true) {
        var id = getClientId(item);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "deleteClient",               // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            data: {
                'clientId': id
            },
            dataType: "json",
            success: function (result) {
                if (result != undefined) {
                    console.log("success: " + result);
                    alert("删除成功");
                    window.location.reload();
                } else {
                    console.log("fail: " + result);
                }
            },
            error: function (result) {
                console.log("error: " + result);
            }
        });
    } else {
    }
}

/**
 * 提交客户的信息
 */
function submitClients() {
    var items = $("input[name='checkbox1']:checked");//判断复选框是否选中
    if (items.length > 0) {
        function submitClientById(id) {//该方法是一个ajax请求
            $.ajax({
                type: "POST",                       // 方法类型
                url: "submitClientById",            // url
                async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
                data: {
                    'clientId': id//数据是json格式的
                },
                dataType: "json",//返回值是json字符串
                success: function (result) {
                    if (result != undefined) {
                        console.log(result);
                    } else {
                        console.log("fail: " + result);
                    }
                },
                error: function (result) {
                    console.log("error: " + result);
                }
            });
        }

        var r = confirm("是否提交客户信息?");
        if (r) {
            items.each(function () {//遍历
                var id = getIdByCheckBox($(this));//获取到了客户编号
                console.log(id)
                console.log(id);
                submitClientById(id);//调用该方法使用ajax
            });
            alert("提交成功!");
            window.location.reload();
        }
    } else {
        alert("未选择任何客户!");
    }
}

function getIdByCheckBox(item) {
    return item.parent().parent().next().text();
}


/**
 * 导出excel
 * @param e
 */
function exportExcel(e) {
    var name = 'client';
    var sqlWords = "select * from client ";
    //  var sqlWords = "select clientId,companyName,applicationStatus,checkState,state,contactName,phone,clientType from jdlink."+name;
    window.open('exportExcel?name=' + name + '&sqlWords=' + sqlWords);

}

/**
 * 导入模态框
 * */
function importExcelChoose() {
    $("#importExcelModal").modal('show');
}

/**
 * 导入excel
 *
 */
function importExcel() {
    document.getElementById("idExcel").click();
    document.getElementById("idExcel").addEventListener("change", function () {
        var id = '0000';
        console.log("change");
        $.ajax({
            type: "POST",                       // 方法类型
            url: "getCurrentClientId",              // url
            async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
            dataType: "json",
            contentType: false,
            success: function (result) {
                if (result != undefined || result != NaN) {
                    id = result.clientId;
                } else {
                    alert("数据获取失败！ " + result);
                }
            },
            error: function (result) {
                alert("导入失败，请检查后重试！")
                console.log("error" + result);
            }
        });
        var eFile = document.getElementById("idExcel").files[0];
        var formFile = new FormData();
        formFile.append("excelFile", eFile);
        formFile.append("tableName", 'client');
        formFile.append("id", id);
        $.ajax({
            type: "POST",                       // 方法类型
            url: "importClientExcel",              // url
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
 * 下载模板
 * */
function downloadModal() {
    var filePath = 'Files/Templates/client模板.xls';
    var r = confirm("是否下载模板?");
    if (r == true) {
        window.open('downloadFile?filePath=' + filePath);
    }
}

/**打印*/
$("#print").click(function () {
    $("#viewModal").printThis({
        importCSS: true,
        importStyle: true,
        printDelay: 333,
        copyTagClasses: false,

    });
//		alert("等待打印");
});
