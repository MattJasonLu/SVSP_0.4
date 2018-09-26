//关闭等待窗口
function closeWaiting() {
    var bgDiv = document.getElementById("bgDiv");
    var msgDiv = document.getElementById("msgDiv");
    //移除背景遮罩层div
    if(bgDiv != null){
        document.body.removeChild(bgDiv);
    }
    //移除中间信息提示层div
    if(msgDiv != null){
        document.body.removeChild(msgDiv);
    }
}
//显示等待窗口
function showWaiting() {
    var msgw, msgh, bordercolor;
    msgw = 300; //提示窗口的宽度
    msgh = 100; //提示窗口的高度
    bordercolor = "#336699"; //提示窗口的边框颜色
    titlecolor = "#99CCFF"; //提示窗口的标题颜色

    var sWidth, sHeight;
    sWidth = document.body.clientWidth;
    sHeight = document.body.clientHeight;

    //背景遮罩层div
    var bgObj = document.createElement("div");
    bgObj.setAttribute('id', 'bgDiv');
    bgObj.style.position = "absolute";
    bgObj.style.top = "0px";
    bgObj.style.background = "#888";
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity = "0.6";
    bgObj.style.left = "0px";
    bgObj.style.width = sWidth + "px";
    bgObj.style.height = sHeight + "px";
    document.body.appendChild(bgObj);

    //信息提示层div
    var msgObj = document.createElement("div");
    msgObj.setAttribute("id", "msgDiv");
    msgObj.setAttribute("align", "center");
    msgObj.style.position = "absolute";
    msgObj.style.background = "white";
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
    msgObj.style.border = "1px solid " + bordercolor;
    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.top = (document.documentElement.scrollTop + (sHeight - msgh) / 2) + "px";
    msgObj.style.left = (sWidth - msgw) / 2 + "px";
    document.body.appendChild(msgObj);

    //标题栏
    var title = document.createElement("h4");
    title.setAttribute("id", "msgTitle");
    title.setAttribute("align", "left");
    title.style.margin = "0px";
    title.style.padding = "3px";
    title.style.background = bordercolor;
    title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity = "0.75";
    title.style.border = "1px solid " + bordercolor;
    title.style.height = "14px";
    title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color = "white";
    title.innerHTML = "正在加载中，请稍候......";
    document.getElementById("msgDiv").appendChild(title);

    //中间等待图标
    var img = document.createElement("img");
    img.style.margin = "10px 0px 10px 0px";
    img.style.width = "48px";
    img.style.height = "48px";
    img.setAttribute("src", "../../image/loading.gif");
    document.getElementById("msgDiv").appendChild(img);
}
function submitForm(flag){
    switch(flag){
        case 1:
            //等待提示
            showWaiting();
            break;
        //do something else
    }
    document.forms[0].submit();
}