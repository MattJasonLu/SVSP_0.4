function edit() {
    var input = document.createElement('input');  //创建input节点
    input.setAttribute('type', 'text');  //定义类型是文本输入
    document.getElementsByClassName('billDate').appendChild(input); //添加到form中显示
    document.getElementsByClassName('billNumber').appendChild(input); //添加到form中显示
}

/**
 * 获取首页内容
 * */
function loadPageWayBillDetailList() {
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWayBill",          // url
        async: false,                       // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            id: localStorage.id
        },
        dataType: "json",
        success: function (result) {
            if (result != undefined && result.status == "success") {
                console.log(result);
                setWayBillList(result.data);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("error: " + result);
            console.log("首页获取失败");
        }
    });
}

/**
 * 克隆数据
 * @param result
 */
function setWayBillList(result) {
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    tr.siblings().remove();
    $.each(result.wastesList, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    //接运单号
                    $(this).html(result.id);
                    break;
                case (1):
                    // 委托单位/危废生产单位
                    $(this).html(result.produceCompany.companyName);
                    break;
                case (2):
                    //接收单位
                    $(this).html(result.receiveCompany.companyName);
                    break;
                case (3):
                    //创建人
                    $(this).html(result.founder);
                    break;
                case (4):
                    // 接运单创建日期
                    $(this).html(getDateStr(result.wayBillDate));
                    break;
                case (5):
                    //业务员
                    $(this).html(result.salesman.name);
                    break;
                case (6):
                    //危废名称
                    $(this).html(obj.name);
                    break;
                case (7):
                    //危废数量
                    $(this).html(obj.wasteAmount);
                    break;
                case(8):
                    //危废含税单价
                    $(this).html(obj.unitPriceTax);
                    break;
                case(9):
                    //危废运费
                    $(this).html(obj.freight);
                    break;
                case(10):
                    //危废单个合计
                    $(this).html(obj.wastesTotal);
                    break;
                case(11):
                    //开票日期
                    $(this).html(getDateStr(result.invoiceDate));
                    break;
                case(12):
                    //发票号码
                    $(this).html(result.invoiceNumber);
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