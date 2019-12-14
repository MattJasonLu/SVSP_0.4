var monthInAndOutList = [50.19, 510, 13.16, 19.1, 202.0, 5.1];   // 月份出入库数（本月出入数）
var cityOfProduceCompanyNumberList = [['常州', 435], ['苏州', 552], ['溧阳', 20], ['江阴', 20], ['其他', 101]];   // 产废单位城市分布数量（产废城市分布）
var newCityOfProduceCompanyNumberList = [];   // 城市分布饼状图数据
var cityList = [];  // 城市数组
var outAndInPercentList = [['危废', 0.8], ['次生', 0.52], ['辅料', 0.34]];              // 危废/次生/辅料 出入库百分比：库存/入库
var wastesAmountList = [[3.70, 2.20, 1.50], [4.20, 1.82, 2.32], [3.92, 1.91, 2.01], [3.88, 2.34, 1.54], [4.80, 2.90, 1.90], [6.60, 3.30, 3.30], [7.20, 3.10, 4.10]];   // 危废入库量，出库量，处置量数据数组
var secondaryAmountList = [[8, 2.20, 1.50], [4.20, 1.82, 2.32], [3.92, 1.91, 2.01], [3.88, 2.34, 1.54], [4.80, 2.90, 1.90], [6.60, 3.30, 3.30], [7.20, 3.10, 4.10]];   // 次生入库量，出库量，处置量数据数组
var ingredientAmountList = [[8, 2.20, 1.50], [4.20, 1.82, 2.32], [3.92, 1.91, 2.01], [3.88, 2.34, 1.54], [4.80, 2.90, 1.90], [6.60, 3.30, 3.30], [7.20, 3.10, 4.10]];   // 辅料入库量，出库量，处置量数据数组
var wastesContractAmountList = [3949.76, 94.00, 146.40, 20.00, 180.00, 3.50];   // 危废合同签约量数组
// var wastesAmountYearAndMonthList = [];
// var secondaryAmountYearAndMonthList = [];
// var ingredientAmountYearAndMonthList = [];
var wastesContractAmountYearAndMonthList = [];
// var yearAndMonthList = [201801, 201802, 201803, 201804, 201805, 201806];             // 折线图年月份数组
var colorList = ['#0175EE',
    '#D89446', '#06B5C6', '#25AE4F', '#373693', '#009E9A', '#AC266F'];   // 颜色数组
var colorNewList = [];    // 城市分布颜色数组


/**
 * 加载图表数据
 */
function loadChartList() {
    loadNavigationList();   // 动态菜单部署
    cityList = [];   // 清空旧数据
    getCityData();   // 获取并设置产废单位城市分布饼图数据
    for (var i = 0; i < cityOfProduceCompanyNumberList.length; i++) {  // 将城市数据插入到城市数组中
        cityList.push(cityOfProduceCompanyNumberList[i].cityName);
        colorNewList.push(colorList[i % 7]);
        var data = {};
        data.value = cityOfProduceCompanyNumberList[i].number;
        data.name = cityOfProduceCompanyNumberList[i].cityName;
        newCityOfProduceCompanyNumberList.push(data);
    }
    search();   // 获取并设置最新数据
    loadData();   // 根据最新数据加载图表
}

/**
 * 加载表图
 */
function loadData() {
    drawLayer02Label($("#layer02_01 canvas").get(0), "危废入库数", 60, 130);  // 第三参数：，第四参数：折线长度
    drawLayer02Label($("#layer02_02 canvas").get(0), "辅料入库数", 60, 130);
    drawLayer02Label($("#layer02_03 canvas").get(0), "次生入库数", 60, 130);
    drawLayer02Label($("#layer02_04 canvas").get(0), "危废出库数", 60, 130);
    drawLayer02Label($("#layer02_05 canvas").get(0), "辅料出库数", 60, 130);
    drawLayer02Label($("#layer02_06 canvas").get(0), "次生出库数", 60, 130);
    setMonthOutAndInData();    // 设置月份出入库数据

    renderLegend();
    //饼状图
    renderChartBar01();
    //renderChartBar02();
    //库存环形图
    renderLayer03Right();
    //曲线图
    //   renderLayer04Left();
    //折线图
    var myChart1 = echarts.init(document.getElementById("layer04_right_chart"));
    var myChart2 = echarts.init(document.getElementById("layer05_right_chart"));
    var myChart3 = echarts.init(document.getElementById("layer06_right_chart"));
    var myChart5 = echarts.init(document.getElementById('layer08_right_bar_graph'));
    renderLayer04Right(myChart1, wastesAmountList);
    renderLayer04Right(myChart2, secondaryAmountList);
    renderLayer04Right(myChart3, ingredientAmountList);
    setBarConfig(myChart5);    // 设置条形图
}

/**
 * 设置本月出入库数据
 */
function setMonthOutAndInData() {
    $("#in1").text(monthInAndOutList[0]);   // 危废入库
    $("#in2").text(monthInAndOutList[1]);   // 辅料入库
    $("#in3").text(monthInAndOutList[2]);   // 次生入库
    $("#out1").text(monthInAndOutList[3]);  // 危废出库
    $("#out2").text(monthInAndOutList[4]);  // 辅料出库
    $("#out3").text(monthInAndOutList[5]);  // 次生出库
}

/**
 * 设置每日出入库数
 * @param canvasObj
 * @param text
 * @param textBeginX
 * @param lineEndX
 */
function drawLayer02Label(canvasObj, text, textBeginX, lineEndX) {
    var colorValue = '#04918B';
    var ctx = canvasObj.getContext("2d");
    ctx.beginPath();
    ctx.arc(35, 55, 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = colorValue;
    ctx.fill();
    ctx.moveTo(35, 55);
    ctx.lineTo(60, 80);
    ctx.lineTo(lineEndX, 80);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colorValue;
    ctx.stroke();

    ctx.font = '12px Georgia';
    ctx.fillStyle = colorValue;
    ctx.fillText(text, textBeginX, 92);
}

//接入机型占比

var COLOR = {
    MACHINE: {
        TYPE_A: '#0175EE',
        TYPE_B: '#D89446',
        TYPE_C: '#373693',
        TYPE_D: '#25AE4F',
        TYPE_E: '#06B5C6',
        TYPE_F: '#009E9A',
        TYPE_G: '#AC266F'
    }
};

/**
 * 设置产废单位城市分布图节点
 */
function renderLegend() {
    for (var i = 0; i < cityOfProduceCompanyNumberList.length; i++) {
        drawLegend(colorList[i % 7], 20 * (i + 1), cityOfProduceCompanyNumberList[i].cityName);   // 第二参数：Y坐标
    }
}

/**
 * 设置产废单位城市分布图节点
 */
function drawLegend(pointColor, pointY, text) {
    var ctx = $("#layer03_left_01 canvas").get(0).getContext("2d");
    ctx.beginPath();
    ctx.arc(20, pointY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = pointColor;
    ctx.fill();
    ctx.font = '200px';
    ctx.fillStyle = 'black';
    ctx.fillText(text, 40, pointY + 3);
}

/**
 * 设置圆形库存量显示图
 */
function renderLayer03Right() {
    $(".layer03-right-chart").remove();  // 删除历史数据
    for (var i = 0; i < outAndInPercentList.length; i++) {
        var div = "<div id='layer03_right_chart" + (i + 1) + "' class=\"layer03-right-chart\">\n" +
            "<canvas width=\"130\" height=\"150\" style=\"margin:40px 0 0 20px;\"></canvas>\n" +
            "<div class=\"layer03-right-chart-label\">" + outAndInPercentList[i].name + "</div>\n" +
            "</div>";                           // 定义环状图标签
        $("#layer03_right_label").after(div);   // 将标签插入
        var $i = i + 1;
        drawLayer03Right($("#layer03_right_chart" + $i + " canvas").get(0), colorList[i % 7], outAndInPercentList[i].number);   // 赋值
    }
}

/**
 * 设置圆形库存量显示图
 */
function drawLayer03Right(canvasObj, colorValue, rate) {
    var ctx = canvasObj.getContext("2d");

    var circle = {
        x: 65,    //圆心的x轴坐标值
        y: 80,    //圆心的y轴坐标值
        r: 60      //圆的半径
    };

    //画扇形
    //ctx.sector(circle.x,circle.y,circle.r,1.5*Math.PI,(1.5+rate*2)*Math.PI);
    //ctx.fillStyle = colorValue;
    //ctx.fill();

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2)
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#052639';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 1.5 * Math.PI, (1.5 + rate * 2) * Math.PI);
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorValue;
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = '200px';
    ctx.fillText(rate * 100 + '%', circle.x - 15, circle.y + 10);

}

/**
 * 设置产废单位城市分布饼图
 */
function renderChartBar01() {
    var myChart = echarts.init(document.getElementById("layer03_left_02"));
    myChart.setOption(
        {
            title: {
                text: '',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                show: false,
                x: 'center',
                y: 'bottom',
                data: cityList
            },
            toolbox: {},
            label: {
                normal: {
                    show: true,
                    formatter: "{b} \n{d}%"
                }
            },
            calculable: true,
            color: colorNewList,
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: [40, 80],
                    center: ['50%', '50%'],
                    //roseType : 'area',
                    // data: [
                    //     {value: 435, name: '常州'},
                    //     {value: 552, name: '苏州'},
                    //     {value: 20, name: '溧阳'},
                    //     {value: 20, name: '江阴'}
                    // ]
                    data: newCityOfProduceCompanyNumberList
                }
            ]
        });
}

/**
 * 设置危废折线图数据
 */
function renderLayer04Right(myChart, list) {
    var monthList = [];
    var yInList = [];
    var yOutList = [];
    var yInventoryList = [];
    for (var i = 0; i < list.length; i++) {
        if(monthList.indexOf(list[i].date) === -1){  // 不存在即添加,过滤重复数据
            yInList.push(list[i].inNumber.toFixed(3));
            yOutList.push(list[i].outNumber.toFixed(3));
            yInventoryList.push(list[i].number.toFixed(3));
            monthList.push(list[i].date);
        }
    }
    myChart.setOption({
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: 20,
                right: 5,
                textStyle: {
                    color: 'black'
                },
                orient: 'vertical',
                data: [
                    {name: '入库量', icon: 'circle'},
                    {name: '处置量', icon: 'circle'},
                    {name: '差额', icon: 'circle'}
                ]
            },
            grid: {
                left: '5%',
                right: '16%',
                bottom: '10%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {show: false},
                axisLabel: {
                    textStyle: {
                        color: "black", //刻度颜色
                        fontSize: 15  //刻度大小
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#0B3148',
                        width: 1,
                        type: 'solid'
                    }
                },
                data: monthList  // 设置折线图x轴数据
            },
            yAxis: {
                type: 'value',
                axisTick: {show: false},
                axisLabel: {
                    textStyle: {
                        color: "black", //刻度颜色
                        fontSize: 15  //刻度大小
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#0B3148',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [   // 设置折线数据
                {
                    name: '入库量',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#F3891B'
                        },
                        lineStyle: {
                            normal: {
                                color: '#F3891B',
                                opacity: 1
                            }
                        }
                    },
                    data: yInList    // 设置折线图y轴数据
                },
                {
                    name: '处置量',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#006AD4'
                        },
                        lineStyle: {
                            normal: {
                                color: '#F3891B',
                                opacity: 1
                            }
                        }
                    },
                    data: yOutList    // 设置折线图y轴数据
                },
                {
                    name: '差额',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#009895'
                        },
                        lineStyle: {
                            normal: {
                                color: '#009895',
                                opacity: 1
                            }
                        }
                    },
                    data: yInventoryList   // 设置折线图y轴数据
                }
            ]
        }
    );
}

/**
 * 设置条形图
 */
function setBarConfig(myChart) {
    var xData = wastesContractAmountYearAndMonthList;  // X轴数据
    // var yData1 = [3,9,1,2,8,3];                                // Y轴第一个条形图数据
    var yData1 = wastesContractAmountList;                                // Y轴第一个条形图数据
    var option = {
        //--------------    标题 title  ----------------
        title: {
            text: '危废合同签约量条形图',
            textStyle: {                 //---主标题内容样式
                color: 'black',
                size: 7
            },
            subtext: '',          //---副标题内容样式
            subtextStyle: {
                color: 'black'
            },
            padding: [0, 0, 100, 100]               //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        /* 柱状图颜色 */
        // color: ['#06a45f', '#078ed6', '#e3982f'],
        color: '#078ed6',
        /* 四周边距(单位默认px，可以使用百分比) */
        grid: {
            left: 40,
            top: 40,
            right: 50,
            bottom: 30
        },
        /* 鼠标悬浮显示数据 */
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        /* 图例说明 */
        legend: {
            // 图例排项 vertical-"竖向"; horizontal-"横向"
            orient: 'horizontal',
            // 图例组件离容器左侧的距离
            right: 40,
            top: 0,
            // 图例文字的样式
            textStyle: {
                color: '#6ab2ec',
            },
            // 与series中每个name对应
            data: '合约量'
        },
        toolbox: {
            show: true
        },
        calculable: true,
        // X轴
        xAxis: [
            {
                name: '月份',                 //---轴名称
                show: true,                  //---是否显示
                nameGap: 15,                 //---坐标轴名称与轴线之间的距离
                type: 'category',
                //设置轴线的属性
                axisLine: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                data: xData
            }
        ],
        yAxis: [
            {
                type: 'value',
                // 控制网格线是否显示
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: 'black'
                    }
                },
                //设置轴线的属性
                axisLine: {
                    lineStyle: {
                        color: 'black',
                    }
                }
            }
        ],
        series: [
            {
                name: '合约量',
                type: 'bar',
                /* 柱子的显示宽度 */
                barWidth: '40%',
                data: yData1,
                /* 显示平均线 */
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                /* 显示柱子数据 */
                label: {
                    normal: {
                        show: true,
                        // 数据在柱子头部显示
                        position: 'top',
                        textStyle: {
                            color: '#5475c7',
                            fontSize: 14
                        }
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}

/**
 * 回车查询
 */
function enterSearch() {
    if (event.keyCode === 13) {   // 如果按下键为回车键，即执行搜素
        search();      //
    }
}

/**
 * 查询功能
 */
function search() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "searchChartList",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        data: {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val()
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result != null || result.status === "success") {
                console.log(result);
                setData(result);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}

/**
 * 设置数组数据
 * @param result
 */
function setData(result) {
    // 清空旧数据
    outAndInPercentList = [];
    wastesContractAmountList = [];
    monthInAndOutList = [];
    wastesAmountList = [];
    secondaryAmountList = [];
    ingredientAmountList = [];
    wastesAmountYearAndMonthList = [];
    secondaryAmountYearAndMonthList = [];
    ingredientAmountYearAndMonthList = [];
    wastesContractAmountYearAndMonthList = [];
    var wastesOutboundOrderList = result.wastesOutboundOrderList;
    var secondOutboundOrderList = result.secondOutboundOrderList;
    var inboundOrderItemList = result.inboundOrderItemList;
    var secondInboundOrderItemList = result.secondInboundOrderItemList;
    var ingredientsInList = result.ingredientsInList;
    var ingredientsOutList = result.ingredientsOutList;
    var contractItemList = result.contractItemList;
    var wastesOutboundOrderTotalAmount = 0;   // 危废出库总数
    var secondOutboundOrderTotalAmount = 0;   // 次生出库总数
    var inboundOrderItemTotalAmount = 0;       // 危废入库总数
    var secondInboundOrderItemTotalAmount = 0;   // 次生入库总数
    var ingredientsInTotalAmount = 0;          // 辅料入库总数
    var ingredientsOutTotalAmount = 0;         // 辅料出库总数
    // 获取数组中最长的长度
    var length = Math.max(wastesOutboundOrderList.length, secondOutboundOrderList.length, inboundOrderItemList.length,
        secondInboundOrderItemList.length, ingredientsInList.length, ingredientsOutList.length, contractItemList.length);
    for (var i = 0; i < length; i++) {   // 循环处理数据
        var data = {};
        data.inNumber = 0;  //入库
        data.outNumber = 0;  // 处置
        data.number = 0;    // 库存

        // setWastesInData(i,data);
        // setTimeout(function(i,data){
        //     setWastesOutData(i,data);
        // },100);
        // setSecondInData(i,data);
        // setTimeout(function(i,data){
        //     setSecondOutData(i,data);
        // },100);
        // setIngredientInData(i,data);
        // setTimeout(function(i,data){
        //     setIngredientOutData(i,data);
        // },100);
        setWastesInData(i,data);
        setWastesOutData(i,data);
        setSecondInData(i,data);
        setSecondOutData(i,data);
        setIngredientInData(i,data);
        setIngredientOutData(i,data);
        if (i < contractItemList.length) {
            wastesContractAmountYearAndMonthList.push(getYearAndMonth(contractItemList[i].startDate));   // 设置合同年月份
            wastesContractAmountList.push(contractItemList[i].contractAmount.toFixed(3));
        }
    }
    // 设置辅料入库数据
    function setIngredientInData(i,data) {
        if (i < ingredientsInList.length) {
            var index = getIndexByDate(ingredientAmountList, getYearAndMonth(ingredientsInList[i].creationDate));
            if (index > -1) { // 存在该月份即更新出库数据
                ingredientAmountList[index].inNumber = ingredientsInList[i].amount;
                ingredientAmountList[index].number = ingredientAmountList[index].inNumber - ingredientAmountList[index].outNumber;
            } else {  // 不存在即插入新月份数据,最终根据月份进行升序排序
                data.date = getYearAndMonth(ingredientsInList[i].creationDate);
                data.inNumber = ingredientsInList[i].amount;
                data.number = data.inNumber - data.outNumber;
                ingredientAmountList.push(data);   // 插入数据
            }
            ingredientsInTotalAmount += ingredientsInList[i].amount;
        }
    }
    // 设置次生出库数据
    function setSecondOutData(i,data) {
        if (i < secondOutboundOrderList.length) {
            var index = getIndexByDate(secondaryAmountList, getYearAndMonth(secondOutboundOrderList[i].outboundDate));
            if (index > -1) { // 存在该月份即更新出库数据
                console.log("出库次生日期存在:" + secondaryAmountList[index].date);
                secondaryAmountList[index].outNumber = secondOutboundOrderList[i].outboundNumber;
                secondaryAmountList[index].number = secondaryAmountList[index].inNumber - secondaryAmountList[index].outNumber;
            } else {  // 不存在即插入新月份数据,最终根据月份进行升序排序
                console.log("出库次生日期不存在:" + getYearAndMonth(secondOutboundOrderList[i].outboundDate));
                data.outNumber = secondOutboundOrderList[i].outboundNumber;
                data.date = getYearAndMonth(secondOutboundOrderList[i].outboundDate);
                data.number = data.inNumber - data.outNumber;
                secondaryAmountList.push(data);   // 插入数据
            }
            secondOutboundOrderTotalAmount += secondOutboundOrderList[i].outboundNumber;
        }
    }
    // 设置危废出库数据
    function setWastesOutData(i,data) {
        if (i < wastesOutboundOrderList.length) {
            var index = getIndexByDate(wastesAmountList, getYearAndMonth(wastesOutboundOrderList[i].outboundDate));
            // console.log("出库index:"+index+",月："+getYearAndMonth(wastesOutboundOrderList[i].outboundDate));
            if (index > -1) { // 存在该月份即更新出库数据
                wastesAmountList[index].outNumber = wastesOutboundOrderList[i].outboundNumber;
                wastesAmountList[index].number = wastesAmountList[index].inNumber - wastesAmountList[index].outNumber;
            } else {  // 不存在即插入新月份数据
                data.outNumber = wastesOutboundOrderList[i].outboundNumber;
                data.date = getYearAndMonth(wastesOutboundOrderList[i].outboundDate);
                data.number = data.inNumber - data.outNumber;
                wastesAmountList.push(data);   // 插入数据
            }
            wastesOutboundOrderTotalAmount += wastesOutboundOrderList[i].outboundNumber;
        }
    }
    // 设置辅料出库数据
    function setIngredientOutData(i,data) {
        if (i < ingredientsOutList.length) {
            var index = getIndexByDate(ingredientAmountList, getYearAndMonth(ingredientsOutList[i].creationDate));
            if (index > -1) { // 存在该月份即更新出库数据
                ingredientAmountList[index].outNumber = ingredientsInList[i].receiveAmount;
                ingredientAmountList[index].number = ingredientAmountList[index].inNumber - ingredientAmountList[index].outNumber;
            } else {  // 不存在即插入新月份数据,最终根据月份进行升序排序
                ingredientAmountYearAndMonthList.push(getYearAndMonth(ingredientsInList[i].creationDate));
                data.outNumber = ingredientsOutList[i].amount;
                data.date = getYearAndMonth(ingredientsInList[i].creationDate);
                data.number = data.inNumber - data.outNumber;
                ingredientAmountList.push(data);   // 插入数据
            }
            ingredientsOutTotalAmount += ingredientsOutList[i].receiveAmount;
        }
    }
    // 设置危废入库数据
    function setWastesInData(i,data){
        if (i < inboundOrderItemList.length) {
            var index = getIndexByDate(wastesAmountList, getYearAndMonth(inboundOrderItemList[i].inboundDate));
            //console.log("入库index:"+index+",月："+getYearAndMonth(inboundOrderItemList[i].inboundDate));
            if (index > -1) { // 存在该月份即更新出库数据
                wastesAmountList[index].inNumber = inboundOrderItemList[i].wastesAmount;
                wastesAmountList[index].number = wastesAmountList[index].inNumber - wastesAmountList[index].outNumber;
            } else {  // 不存在即插入新月份数据,最终根据月份进行升序排序
                data.inNumber = inboundOrderItemList[i].wastesAmount;
                data.date = getYearAndMonth(inboundOrderItemList[i].inboundDate);
                data.number = data.inNumber - data.outNumber;
                wastesAmountList.push(data);   // 插入数据
            }
            inboundOrderItemTotalAmount += inboundOrderItemList[i].wastesAmount;
        }
    }
    // 设置次生入库数据
    function setSecondInData(i,data){
        if (i < secondInboundOrderItemList.length) {
            var index = getIndexByDate(secondaryAmountList, getYearAndMonth(secondInboundOrderItemList[i].inboundDate));
            if (index > -1) { // 存在该月份即更新出库数据
                console.log("入库次生日期存在:" + secondaryAmountList[index].date);
                secondaryAmountList[index].inNumber = secondInboundOrderItemList[i].wastesAmount;
                secondaryAmountList[index].number = secondaryAmountList[index].inNumber - secondaryAmountList[index].outNumber;
            } else {  // 不存在即插入新月份数据,最终根据月份进行升序排序
                console.log("入库次生日期不存在:" + getYearAndMonth(secondInboundOrderItemList[i].inboundDate));
                data.inNumber = secondInboundOrderItemList[i].wastesAmount;
                data.date = getYearAndMonth(secondInboundOrderItemList[i].inboundDate);
                data.number = data.inNumber - data.outNumber;
                secondaryAmountList.push(data);   // 插入数据
            }
            secondInboundOrderItemTotalAmount += secondInboundOrderItemList[i].wastesAmount;
        }
    }
    // 将数组按日期进行排序
    wastesAmountList = sortListByDate(wastesAmountList);
    secondaryAmountList = sortListByDate(secondaryAmountList);
    ingredientAmountList = sortListByDate(ingredientAmountList);
    console.log("折线图数据：");
    console.log("危废");
    console.log(wastesAmountList);
    console.log("次生");
    console.log(secondaryAmountList);
    console.log("辅料");
    console.log(ingredientAmountList);
    // 设置出入库百分比数据（环状图）
    var wastesData = {};
    wastesData.name = '危废';
    wastesData.number = (wastesOutboundOrderTotalAmount / inboundOrderItemTotalAmount).toFixed(4);
    var secondData = {};
    secondData.name = '次生';
    secondData.number = (secondOutboundOrderTotalAmount / secondInboundOrderItemTotalAmount).toFixed(4);
    var ingredientData = {};
    ingredientData.name = '辅料';
    ingredientData.number = (ingredientsOutTotalAmount / ingredientsInTotalAmount).toFixed(4);
    outAndInPercentList.push(wastesData);
    outAndInPercentList.push(secondData);
    outAndInPercentList.push(ingredientData);
    monthInAndOutList.push(inboundOrderItemTotalAmount.toFixed(3));
    monthInAndOutList.push(ingredientsInTotalAmount.toFixed(3));
    monthInAndOutList.push(secondInboundOrderItemTotalAmount.toFixed(3));
    monthInAndOutList.push(wastesOutboundOrderTotalAmount.toFixed(3));
    monthInAndOutList.push(ingredientsOutTotalAmount.toFixed(3));
    monthInAndOutList.push(secondOutboundOrderTotalAmount.toFixed(3));
    loadData();   // 根据最新数据加载图表
}

/**
 * 根据日期判断该数据是否存在于数组中，如果存在则返回数组位置，否则返回-1
 * @param list
 * @param date
 */
function getIndexByDate(list, date) {
    var index = -1;
    for (var i = 0; i < list.length; i++) {
        if (list[i].date === date) {
            index = i;
            break;
        }
    }
    return index;
}

/**
 * 根据date将list升序排序(冒泡算法)
 * @param date
 */
function sortListByDate(list) {
    console.log(list);
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = 0; j < list.length - 1 - i; j++) {
            if (parseInt(list[j].date) > parseInt(list[j + 1].date)) {   // 如果小则调换顺序
                var data = {};
                data = list[j];
                list[j] = list[j + 1];
                list[j + 1] = data;
            }
        }
    }
    return list;
}

/**
 * 返回年月份
 * @param obj
 * @returns {string}
 */
function getYearAndMonth(obj) {
    var year = (parseInt(obj.year) + 1900).toString();
    var month = parseInt((obj.month) + 1).toString();
    if (parseInt(month) < 10) {
        month = "0" + month;
    }
    return year + month;
}

/**
 * 获取并设置产废单位城市分布数据
 */
function getCityData() {
    $.ajax({
        type: "POST",                            // 方法类型
        url: "getCityOfProduceCompanyNumber",                 // url
        async: false,                           // 同步：意思是当有返回值以后才会进行后面的js程序
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                cityOfProduceCompanyNumberList = [];
                cityOfProduceCompanyNumberList = result.data;
                console.log(cityOfProduceCompanyNumberList);
            } else {
                console.log(result.message);
            }
        },
        error: function (result) {
            console.log(result);
            alert("服务器错误！");
        }
    });
}