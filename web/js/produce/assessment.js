//-----------------月份列表页面---------------------
/**
 * 搜索重置功能
 */
function reset() {
    $("#senior").find("input").val("");
}

/**
 * 加载列表数据
 */
function loadMonthData() {
    $(".newLine").remove();
    $.ajax({
        type: "POST",                       // 方法类型
        url: "loadMonthData",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
           if(result != null ){
               console.log(result);
               if(result.status == "success")
                   setMonthDataList(result);
           }
        },
        error: function (result) {
            console.log("error: " + result);

        }
    });
}

function setMonthDataList(result){
    // 获取id为cloneTr的tr元素
    var tr = $("#clone");
    $.each(result.data, function (index, item) {
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 月份
                    $(this).html(parseInt(index) + '月');
                    break;
                case (1):
                    // 接运单总金额
                    $(this).html(obj.wayBillTotalPrice);
                    break;
                case (2):
                    // 到账总金额
                    break;
                case (3):
                    // 有效总金额
                    break;
                case (4):
                    // 总提成
                    $(this).html(obj.totalCommission);
                    break;
                case (5):
                    // 当月发放总金额
                    break;
                case (6):
                    // 未发放总金额
                    break;
                case (7):
                    // 备注
                    break;
            }
        });
        // 把克隆好的tr追加到原来的tr前面
        clonedTr.removeAttr("id");
        clonedTr.insertBefore(tr);
        clonedTr.addClass("newLine");
    });
    // 隐藏无数据的tr
    tr.hide();
}

/**
 * 获取月份-单击
 * @param item
 * @returns {string}
 */
function getMounth(item){
   return item.parentElement.parentElement.firstElementChild.innerHTML;
}

/**
 * 获取月份-双击
 * @returns {string}
 */
function getMounth1(item){
    return item.firstElementChild.innerHTML;
}

/**
 * 单击查看
 * @param item
 */
function toView(item){
    //获取月份
    localStorage.mounth = parseInt(getMounth(item).replace(/[^0-9]/ig,""));//截取数字
    location.href = "assessment1.html";
}
/**
 * 双击查看
 * @param item
 */
function toView1(item){
    //获取月份
    localStorage.mounth = parseInt(getMounth1(item).replace(/[^0-9]/ig,""));//截取数字
    location.href = "assessment1.html";
}

//-----------------------业务员列表页面-----------------
function reset1(){
    $("#senior1").find("input").val("");
}

function loadMounthSalesmanData(){

}

function getSalesmanId(item){
    return item.parentElement.parentElement.firstElementChild.innerHTML;
}

function getSalesmanId1(item){
   return item.firstElementChild.innerHTML;
}

function toViewSalesman(item){
    localStorage.salesmanId = getSalesmanId(item);//获取业务员ID

    location.href = "assessment2.html";
}
function toViewSalesman1(item){
    localStorage.salesmanId = getSalesmanId1(item);//获取业务员ID
    location.href = "assessment2.html";
}

//---------------------------合同明细页面---------------
function reset2() {
    $("#senior2").find("input").val("");
}

function loadContractData(){
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getContractBySalesman",                  // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        data:{
            salesmanId: localStorage.salesmanId
        },
        dataType: "json",
        success: function (result) {
            if(result != null ){
               setContractClone(result);
            }
        },
        error: function (result) {
            console.log("error: " + result);

        }
    });
}

function setContractClone(result){
    // 获取id为cloneTr的tr元素
    var tr = $("#clone2");
    tr.siblings().remove();
    var serialNumber = 0;    // 序号
    $.each(result, function (index, item) {
        serialNumber++;
        // 克隆tr，每次遍历都可以产生新的tr
        var clonedTr = tr.clone();
        clonedTr.show();
        // 循环遍历cloneTr的每一个td元素，并赋值
        clonedTr.children("td").each(function (inner_index) {
            var obj = eval(item);
            // 根据索引为部分td赋值
            switch (inner_index) {
                case (0):
                    // 入库单号
                    $(this).html(obj.id);
                    break;
                case (1):
                    // 单位名称
                    $(this).html(obj.companyName);
                    break;
                case (2):
                    // 入库单状态
                    $(this).html(obj.state.name);
                    break;
                case (3):
                    // 总金额
                    $(this).html(obj.totalPrice);
                    break;
                case (4):
                    // 记账人
                    $(this).html(obj.bookkeeper);
                    break;
                case (5):
                    // 审批人
                    $(this).html(obj.approver);
                    break;
                case (6):
                    // 保管人
                    $(this).html(obj.keeper);
                    break;
                case (7):
                    // 验收人
                    $(this).html(obj.acceptor);
                    break;
                case (8):
                    // 经手人
                    $(this).html(obj.handlers);
                    break;
                case (9):
                    // 创建日期
                    $(this).html(getDateStr(obj.creationDate));
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
