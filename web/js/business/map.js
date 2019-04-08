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
    // console.log(1)
     console.log(obj);
    // console.log(2)
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    $.each(obj,function (index,item) {
        // console.log(item.latitudeAndLongitude)
         if($.trim(item.latitudeAndLongitude).length>0){
             console.log(item.latitudeAndLongitude);
            var strIndex=getStrIndex(item.latitudeAndLongitude,",");
            console.log(strIndex);
            var latitude=item.latitudeAndLongitude.substring(0,strIndex);
            console.log(latitude);
            var longitude=item.latitudeAndLongitude.substring(strIndex+1,item.latitudeAndLongitude.length);
             console.log(longitude);
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

         }
         if(parseFloat(item.capacity).toFixed(3) >= 2000.00){
             var color = "#22cb41";
             var radio = 3000;
         }else if(1000 <= parseFloat(item.capacity).toFixed(3) && parseFloat(item.capacity).toFixed(3)< 2000){
             color = "#c4cb1f";
             radio = 2000
         }else {
             color = "#cb2f2a";
             radio = 1000
         }
         var circle = new BMap.Circle(point,radio);         //radio为半径大小，point为标注点
         circle.setFillColor(color);                        //设置圆形区域填充颜色
         circle.setStrokeColor("transparent");              //设置圆形区域边框颜色
         map.addOverlay(circle);                            //将圆形区域添加到地图中
    });




    //标注点二
    // var point1 = new BMap.Point(119.987417,31.843014);//定义一个中心点坐标
    // var marker1 = new BMap.Marker(point1);//新建标注点
    // map.addOverlay(marker1);//向地图中添加标记点
    // map.centerAndZoom(point1,11);//设定地图的中心点和坐标并将地图显示在地图容器中
    // var opts1 = {
    //     width : 250,       //信息框宽度
    //     height : 150,      //信息框高度
    //     title : "企业信息"   //信息框标题
    // };
    // var infoWindow1 = new BMap.InfoWindow("<p id='info' style='display: inline'>常州上通汽车销售服务有限公司</p>(<a style='display: inline' onclick='viewStock()'>详情</a>)"+
    //     "<p>联系人：鲍丹</p>"+
    //     "<p>库容：50T</p>"+
    //     "<p>联系电话：0519-69665550</p>",opts1); //创建信息窗口对象
    // marker1.addEventListener("click", function(){
    //     map.openInfoWindow(infoWindow1,point1); //开启信息窗口
    // });
    // //标注点三
    // var point2 = new BMap.Point(120.010365,31.723407);//定义一个中心点坐标
    // var marker2 = new BMap.Marker(point2);//新建标注点
    // map.addOverlay(marker2);//向地图中添加标记点
    // map.centerAndZoom(point2,11);//设定地图的中心点和坐标并将地图显示在地图容器中
    // var opts2 = {
    //     width : 250,       //信息框宽度
    //     height : 150,      //信息框高度
    //     title : "企业信息"   //信息框标题
    // };
    // var infoWindow2 = new BMap.InfoWindow("<p id='info' style='display: inline'>常州市华荣友佳纺织染整有限公司</p>(<a style='display: inline' onclick='viewStock()'>详情</a>)"+
    //     "<p>联系人：朱华雄</p>"+
    //     "<p>库容：50T</p>"+
    //     "<p>联系电话：0519-8816828</p>",opts2); //创建信息窗口对象
    // marker2.addEventListener("click", function(){
    //     map.openInfoWindow(infoWindow2,point2); //开启信息窗口
    // });
    // // marker1.enableDragging();//允许标注拖拽功能
    // // marker1.addEventListener("dragend",function (e) {
    // //     alert("当前位置: " + e.point.lng + "," + e.point.lat) //alert出当前拖拽位置的经纬度
    // // });
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