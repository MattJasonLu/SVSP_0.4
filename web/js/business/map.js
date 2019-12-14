/**
 * 读取客户的数据
 */
function loadClientData() {
    $.ajax({
        type: "POST",
        url: "getClientList",
        async: false,
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            // console.log(result);
            if (result != undefined) {
                var obj = eval(result);
                var div = $("#cloneContent");
                // 遍历客户
                for (var i = 0; i < obj.length; i++) {
                    // 创建条目
                    var clonedDiv = div.clone();
                    // 赋值
                    clonedDiv.find("span[name='client']").text(obj[i].companyName);
                    // 显示
                    clonedDiv.show();
                    // 移除编号
                    clonedDiv.removeAttr("id");
                    clonedDiv.insertBefore(div);
                }
                initMap(obj);
                // 隐藏原来的div
                div.hide();
            }
        },
        error: function (result) {
            console.log("获取信息失败");
        }
    });
}

//创建地图函数：
function createMap(obj){
     // console.log(obj);
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    $.each(obj,function (index,item) {
        // console.log(item.latitudeAndLongitude)
         if($.trim(item.latitudeAndLongitude).length>0){
          //   console.log(item.latitudeAndLongitude);
            var strIndex=getStrIndex(item.latitudeAndLongitude,",");
            // console.log(strIndex);
            var latitude=item.latitudeAndLongitude.substring(0,strIndex);
            // console.log(latitude);
            var longitude=item.latitudeAndLongitude.substring(strIndex+1,item.latitudeAndLongitude.length);
             // console.log(longitude);
             //标注点一
             var point = new BMap.Point(Number(latitude),Number(longitude));//定义一个中心点坐标
             map.centerAndZoom(point,11);//设定地图的中心点和坐标并将地图显示在地图容器中
             var marker = new BMap.Marker(point);//新建标注点
             map.addOverlay(marker);//向地图中添加标记点
             var opts = {
                 width : 250,       //信息框宽度
                 height : 150,      //信息框高度
                 title : "企业信息"   //信息框标题
             };
             var phone;
             if($.trim(item.mobile).length>0){
                 phone=item.mobile;
             }
             else {
                 phone=item.mobile;
             }
             var infoWindow2 = new BMap.InfoWindow("<p id='info' style='display: inline'>"+item.companyName+"</p >(<a style='display: inline' onclick='viewStock()'>详情</ a>)"+
                 "<p>联系人："+item.contactName+"</p >"+
                 "<p>库容:"+parseFloat(item.capacity).toFixed(3)+"</p >"+
                 "<p>联系电话："+phone+"</p >",opts); //创建信息窗口对象
             marker.addEventListener("mouseover", function(){
                 map.openInfoWindow(infoWindow2,point); //开启信息窗口
             });
             if(CalculateProportion(item.currentInventory,item.capacity)<new Number(item.warningLower.warningThreshold)){
                 var color = "#22cb41";
                 var radio = 3000;
             }else if(CalculateProportion(item.currentInventory,item.capacity)>new Number(item.warningUpper.warningThreshold)){
                 color = "#cb2f2a";
                 radio = 2000
             }else {
                 color = "#c4cb1f";
                 radio = 1000
             }
             var circle = new BMap.Circle(point,parseFloat(item.capacity));         //radio为半径大小，point为标注点
             circle.setFillColor(color);                        //设置圆形区域填充颜色
             circle.setStrokeColor("transparent");              //设置圆形区域边框颜色
         }

         map.addOverlay(circle);                            //将圆形区域添加到地图中
    });
    //进入全景图标位置
    var stCtrl = new BMap.PanoramaControl();
    stCtrl.setOffset(new BMap.Size(20,20)); //设置全景地图的级别及中心点
    map.addControl(stCtrl);    //向地图中添加该控件
    //浏览器定位
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r){
    //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //         var mk = new BMap.Marker(r.point);             //标注点经纬度
    //         map.addOverlay(mk);                            //添加控件
    //         map.panTo(r.point);                            //确定中心坐标
    //         alert('您的位置：'+r.point.lng+','+r.point.lat); //显示当前浏览器所处位置
    //     }
    //     else {
    //         alert('failed'+this.getStatus());
    //     }
    // });
    //ip定位
    // function myFun(result){
    //     var cityName = result.name; //城市名称
    //     map.setCenter(cityName);    //设置城市中心
    //     alert("当前定位城市:"+cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
    // //定位SDK辅助定位
    // function myFun(result){
    //     var cityName = result.name;
    //     map.setCenter(cityName);
    //     alert("当前定位城市:"+cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
   //将map变量存储在全局
    window.map = map;
}

//计算库存占比
function  CalculateProportion(inventory,capacity) {
   //  console.log(parseFloat(inventory)/parseFloat(capacity).toFixed(2)*100)
     return  (parseFloat(inventory)/parseFloat(capacity).toFixed(2)*100);
}

/**
 * 显示预警信息
 */
function showWarningInfoByRole() {
    var state = 0;
    $.ajax({
        type: "POST",                       // 方法类型
        url: "getWarningInfoByRole",              // url
        async: false,                      // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            if (result !== undefined && result.status === "success") {
                $.each(result.data, function (index, item){
                    if(index < 1) {  // 存在数据则第一次克隆时清除旧数据
                        $("#dataList").children().remove();  // 清空旧数据
                    }
                    state = 1;
                    var div = "<div >\n" +
                        "                        <p style=\"font-size: 15px;\">\n" +
                        "                            <a>\n" +
                        "                                <span class=\"glyphicon glyphicon-alert\" aria-hidden=\"true\"></span>\n" +
                        "                                <span name=\"warning\"> "+item+"</span>\n" +
                        "                            </a>\n" +
                        "                        </p><br>\n" +
                        "                    </div>";
                    $("#dataList").append(div);
                });
            }else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log("获取预警信息失败");
        }
    });
    return state;
}