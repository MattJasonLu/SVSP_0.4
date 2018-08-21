/**
 *业务员批量分配客户
 *
 */
function Distribution() {
    //业务员编号
     salesmanId=$('#model-salesmanId').val();
     selectedValues =$("#model-clientList").val();
     console.log(selectedValues);
   $.each(selectedValues,function (index,item) {
       assignClient(salesmanId,item);
   });
   //另做一个ajax来实现此功能
    $.ajax({
        type: "POST",                       // 方法类型
        url: "nearestClient",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        data:{'salesmanId':salesmanId,'selectedValues':JSON.stringify(selectedValues)},
        traditional: true,
        //contentType: 'application/json;charset=utf-8',
        success:function (result) {

        },
        error:function (result) {

        }
    });
    alert("分配成功!");
    window.location.reload();
}