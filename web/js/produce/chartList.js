/**
 * 加载图表数据
 */
function loadChartList() {
    loadNavigationList();   // 动态菜单部署
}

$(function () {
    drawLayer02Label($("#layer02_01 canvas").get(0), "本月危废入库数", 60, 200);  // 第三参数：，第四参数：折线长度
    drawLayer02Label($("#layer02_02 canvas").get(0), "本月辅料入库数", 60, 200);
    drawLayer02Label($("#layer02_03 canvas").get(0), "本月次生入库数", 60, 200);
    drawLayer02Label($("#layer02_04 canvas").get(0), "本月危废出库数", 30, 200);
    drawLayer02Label($("#layer02_05 canvas").get(0), "本月辅料出库数", 30, 200);
    drawLayer02Label($("#layer02_06 canvas").get(0), "本月次生出库数", 30, 200);

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
    renderLayer04Right(myChart1);
    renderLayer04Right(myChart2);
    renderLayer04Right(myChart3);
    setBarConfig(myChart5);    // 设置条形图
});

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
    drawLegend(COLOR.MACHINE.TYPE_A, 20, '常州');   // 第二参数：Y坐标
    drawLegend(COLOR.MACHINE.TYPE_B, 40, '苏州');
    drawLegend(COLOR.MACHINE.TYPE_C, 60, '溧阳');
    drawLegend(COLOR.MACHINE.TYPE_D, 80, '江阴');
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
    drawLayer03Right($("#layer03_right_chart01 canvas").get(0), "#027825", 0.8);   // 危废
    drawLayer03Right($("#layer03_right_chart02 canvas").get(0), "#006DD6", 0.52);   // 次生
    drawLayer03Right($("#layer03_right_chart03 canvas").get(0), "#238681", 0.34);   // 辅料
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
                data: ['常州', '苏州', '溧阳', '江阴']
            },
            toolbox: {},
            label: {
                normal: {
                    show: true,
                    formatter: "{b} \n{d}%"
                }
            },
            calculable: true,
            color: [COLOR.MACHINE.TYPE_A, COLOR.MACHINE.TYPE_B, COLOR.MACHINE.TYPE_C, COLOR.MACHINE.TYPE_D],
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: [40, 80],
                    center: ['50%', '50%'],
                    //roseType : 'area',
                    data: [
                        {value: 435, name: '常州'},
                        {value: 552, name: '苏州'},
                        {value: 20, name: '溧阳'},
                        {value: 20, name: '江阴'}
                    ]
                }
            ]
        }
    );

}

/**
 * 设置曲线图
 */
function renderLayer04Left() {
    var myChart = echarts.init(document.getElementById("layer04_left_chart"));
    myChart.setOption(
        {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top: '4%',
                containLabel: true
            },
            xAxis:
                {
                    type: 'category',
                    boundaryGap: false,
                    data: getLatestDays(31),
                    axisLabel: {
                        textStyle: {
                            color: "white", //刻度颜色
                            fontSize: 8  //刻度大小
                        },
                        rotate: 45,
                        interval: 2
                    },
                    axisTick: {show: false},
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#0B3148',
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
            yAxis:
                {
                    type: 'value',
                    axisTick: {show: false},
                    axisLabel: {
                        textStyle: {
                            color: "white", //刻度颜色
                            fontSize: 8  //刻度大小
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
            tooltip: {
                formatter: '{c}',
                backgroundColor: '#FE8501'
            },
            series: [
                {
                    name: '',
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#026B6F'
                            }, {offset: 1, color: '#012138'}], false),
                            opacity: 0.2
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#009991'
                        },
                        lineStyle: {
                            normal: {
                                color: '#009895',
                                opacity: 1
                            }
                        }
                    },
                    symbol: 'none',
                    data: [48, 52, 45, 46, 89, 120, 110, 100, 88, 96, 88, 45, 78, 67, 89, 103, 104, 56, 45, 104, 112, 132, 120, 110, 89, 95, 90, 89, 102, 110, 110]
                }
            ]
        }
    );
}

/**
 * 设置危废折线图数据
 */
function renderLayer04Right(myChart) {
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
                data: [201801, 201802, 201803, 201804, 201805, 201806]   // 设置折线图x轴数据
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
                    data: [3.70, 4.20, 3.92, 3.88, 4.80, 6.60, 7.20]    // 设置折线图y轴数据
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
                    data: [2.20, 1.82, 1.91, 2.34, 2.90, 3.30, 3.10]    // 设置折线图y轴数据
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
                    data: [1.50, 2.32, 2.01, 1.54, 1.90, 3.30, 4.10]   // 设置折线图y轴数据
                }
            ]
        }
    );
}

/**
 * 设置条形图
 */
function setBarConfig(myChart) {
    var xData = ['2017年1月','2017年2月','2017年3月','2017年4月','2017年5月','2017年6月'];  // X轴数据
   // var yData1 = [3,9,1,2,8,3];                                // Y轴第一个条形图数据
     var yData1 = [3949.76,94.00,146.40,20.00,180.00,3.50];                                // Y轴第一个条形图数据
    var option = {
        //--------------    标题 title  ----------------
        title: {
            text: '危废合同签约量条形图',
            textStyle:{                 //---主标题内容样式
                color:'black'
            },
            subtext:'',          //---副标题内容样式
            subtextStyle:{
                color:'black'
            },
            padding:[0,0,100,100]               //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        /* 柱状图颜色 */
        // color: ['#06a45f', '#078ed6', '#e3982f'],
        color:  '#078ed6',
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
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                type: 'category',
                //设置轴线的属性
                axisLine: {
                    lineStyle: {
                        color: '#6ab2ec',
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
                        color: '#132a6e'
                    }
                },
                //设置轴线的属性
                axisLine: {
                    lineStyle: {
                        color: '#6ab2ec',
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