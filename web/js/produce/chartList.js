var monthInAndOutList = [50.19,510,13.16,19.1,202.0,5.1];   // 月份出入库数（本月出入数）
var cityOfProduceCompanyNumberList = [['常州',435],['苏州',552],['溧阳',20],['江阴',20],['其他',101]];   // 产废单位城市分布数量（产废城市分布）
var newCityOfProduceCompanyNumberList = [];   // 城市分布饼状图数据
var cityList = [];  // 城市数组
var outAndInPercentList = [['危废',0.8],['次生',0.52],['辅料',0.34]];              // 危废/次生/辅料 出入库百分比：库存/入库
var wastesAmountList = [[3.70,2.20,1.50],[4.20,1.82,2.32],[3.92,1.91,2.01],[3.88,2.34,1.54],[4.80,2.90,1.90],[6.60,3.30,3.30],[7.20,3.10,4.10]];   // 危废入库量，出库量，处置量数据数组
var secondaryAmountList = [[8,2.20,1.50],[4.20,1.82,2.32],[3.92,1.91,2.01],[3.88,2.34,1.54],[4.80,2.90,1.90],[6.60,3.30,3.30],[7.20,3.10,4.10]];   // 次生入库量，出库量，处置量数据数组
var ingredientAmountList = [[8,2.20,1.50],[4.20,1.82,2.32],[3.92,1.91,2.01],[3.88,2.34,1.54],[4.80,2.90,1.90],[6.60,3.30,3.30],[7.20,3.10,4.10]];   // 辅料入库量，出库量，处置量数据数组
var wastesContractAmountList = [3949.76, 94.00, 146.40, 20.00, 180.00, 3.50];   // 危废合同签约量数组
var yearAndMonthList = [201801, 201802, 201803, 201804, 201805, 201806];             // 折线图年月份数组
var colorList = ['#0175EE',
    '#D89446','#06B5C6','#25AE4F','#373693','#009E9A','#AC266F'];   // 颜色数组
var colorNewList = [];    // 城市分布颜色数组


/**
 * 加载图表数据
 */
function loadChartList() {
    loadNavigationList();   // 动态菜单部署
    cityList = [];   // 清空旧数据
    getCityData();   // 获取并设置产废单位城市分布数据
    for(var i = 0; i < cityOfProduceCompanyNumberList.length; i++) {  // 将城市数据插入到城市数组中
        cityList.push(cityOfProduceCompanyNumberList[i].cityName);
        colorNewList.push(colorList[i]);
        var data = {};
        data.value = cityOfProduceCompanyNumberList[i].number;
        data.name = cityOfProduceCompanyNumberList[i].cityName;
        newCityOfProduceCompanyNumberList.push(data);
    }
    loadData();   //
}

/**
 * 加载表图
 */
function loadData() {
    drawLayer02Label($("#layer02_01 canvas").get(0), "本月危废入库数", 60, 200);  // 第三参数：，第四参数：折线长度
    drawLayer02Label($("#layer02_02 canvas").get(0), "本月辅料入库数", 60, 200);
    drawLayer02Label($("#layer02_03 canvas").get(0), "本月次生入库数", 60, 200);
    drawLayer02Label($("#layer02_04 canvas").get(0), "本月危废出库数", 30, 200);
    drawLayer02Label($("#layer02_05 canvas").get(0), "本月辅料出库数", 30, 200);
    drawLayer02Label($("#layer02_06 canvas").get(0), "本月次生出库数", 30, 200);
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
    renderLayer04Right(myChart1,wastesAmountList);
    renderLayer04Right(myChart2,secondaryAmountList);
    renderLayer04Right(myChart3,ingredientAmountList);
    setBarConfig(myChart5);    // 设置条形图
}

/**
 * 设置本月出入库数据
 */
function setMonthOutAndInData(){
    $("#in1").text(monthInAndOutList[0]);  // 危废入库
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
    for(var i=0; i < cityOfProduceCompanyNumberList.length; i++) {
        drawLegend(colorList[i%7], 20*(i+1), cityOfProduceCompanyNumberList[i].cityName);   // 第二参数：Y坐标
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
    for(var i = 0; i < outAndInPercentList.length; i++) {
        var div = "<div id='layer03_right_chart"+(i+1)+"' class=\"layer03-right-chart\">\n" +
            "<canvas width=\"130\" height=\"150\" style=\"margin:40px 0 0 20px;\"></canvas>\n" +
            "<div class=\"layer03-right-chart-label\">"+outAndInPercentList[i][0]+"</div>\n" +
            "</div>";                           // 定义环状图标签
        $("#layer03_right_label").after(div);   // 将标签插入
        var $i = i+1;
        drawLayer03Right($("#layer03_right_chart"+ $i +" canvas").get(0), colorList[i%7], outAndInPercentList[i][1]);   // 赋值
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
    ctx.arc(circle.x, circle.y, circle.r, 1.5 * Math.PI, (1.5 + rate * 2) * Math.PI)
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
function renderLayer04Right(myChart,list) {
    var yInList = [];
    var yOutList = [];
    var yInventoryList = [];
    for(var i = 0; i < list.length; i++) {
        yInList.push(list[i][0]);
        yOutList.push(list[i][1]);
        yInventoryList.push(list[i][2]);
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
                    color: 'white'
                },
                orient: 'vertical',
                data: [
                    {name: '入库量', icon: 'circle'},
                    {name: '处置量', icon: 'circle'},
                    {name: '库存量', icon: 'circle'}
                ]
            },
            grid: {
                left: '3%',
                right: '16%',
                bottom: '3%',
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
                data: yearAndMonthList  // 设置折线图x轴数据
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
                    name: '库存量',
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
    var xData = yearAndMonthList;  // X轴数据
    // var yData1 = [3,9,1,2,8,3];                                // Y轴第一个条形图数据
    var yData1 = wastesContractAmountList;                                // Y轴第一个条形图数据
    var option = {
        //--------------    标题 title  ----------------
        title: {
            text: '危废合同签约量条形图',
            textStyle: {                 //---主标题内容样式
                color: 'black'
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
                        color: 'black',
                    }
                },
                data: xData,
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
                            fontSize: 20,
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
        data: data = {
            startDate: $("#search-startDate").val(),
            endDate: $("#search-endDate").val(),
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            if (result.data != undefined || result.status == "success") {
                setData(result.data);
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
 * 获取并设置产废单位城市分布数据
 */
function getCityData(){
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