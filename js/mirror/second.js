/*var refresh = {
    totalInfo: 1000 * 60,
    access: 1000 * 60 * 3,
    chart: 1000 * 60 * 5
};
var param = {
    timeType: "hour",
    timeNum: "24",
    domain: "ALL"
};
var Access = {
    init: function() {
        var w = this;
        w.json = Data.access;
        w.totalInfo();
        w.accessGrid();
        w.initChart();
        _fun.scroll('access-grid');

        $(window).resize(function() {
            w.accessGrid();
            w.initChart();
        });
        clearInterval(totalInfoTime);
        var totalInfoTime = setInterval(function() {
            w.totalInfo();
        }, refresh.totalInfo);
        clearInterval(accessTime);
        var accessTime = setInterval(function() {
            w.accessGrid();
        }, refresh.access);
        clearInterval(chartTime);
        var chartTime = setInterval(function() {
            w.initChart();
        }, refresh.chart);
    },
    initChart: function() {
        var w = this;
        $('#order,#play,#ident').height($(window).height() * .26);
        $('#ident').height($(window).height() * .2);
        $('#user').height($(window).height() * .26);
        w.terminal = echarts.init(document.getElementById('user'));
        w.orders = echarts.init(document.getElementById('order'));
       // w.plays = echarts.init(document.getElementById('play'));
        w.identify = echarts.init(document.getElementById('ident'));
        w.drawPie();
    },
    totalInfo: function() {
        var w = this;
        if (w.json.code) {
            var count = w.json.data.count || 0;
            _fun.numChange.call(w, '.j-count', count);
        }
    },
    accessGrid: function() {
        var w = this;
        $('.real-access').height($(window).height() * .35);
        $('.access-body').height($(window).height() * .3);
        $('#access-grid tbody').html('');
        var param = { domain: 'all', interval: '0d', isSingleDay: true }
        $.post('/api/attack?url=realtime/visit', param).success(function(json) {
            if (json.code == 0) {
                var data = json.data;
                $.each(data, function(k, v) {
                    var v = v._source;
                    var time = v.collectorReceiptTime.substring(11, 19);
                    var el = ' <tr>' +
                        '<td>' + time + '</td>' +
                        '<td>' + v.srcGeoRegion + '</td>' +
                        '<td>' + v.srcAddress + '</td>' +
                        '<td>' + (v.requestUrl ? v.requestUrl.replace("<", "&lt;").replace(">", "&gt;").replace("'", "") : '-') + '</td> ' +
                        '<td>' + v.responseCode + '</td> ' +
                        '</tr>';
                    $('#access-grid tbody').append(el);

                });
            }
        })
    },
    drawPie: function() {
        var w = this;
        w.terminalPie();
        w.codePie();
        w.playPie();
        w.pie();
    },
    terminalPie: function() {
        var w = this;
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                top: 30,
                left: 0,
                bottom: 0,
                right: 15,
                show: true, //表示开启
                borderColor: "#5f7db9", //折线图的边宽颜色
                containLabel: true,

            },
            legend: {
                data: ['按次', '按月', '按次成功率', '按月成功率'],
                textStyle: {
                    color: '#fff',
                    fontWeight: 'lighter',
                },
            },
            splitLine: { //背景图的内置表格中“边框”的颜色线条  这个是x跟y轴轴的线      
                show: true,
                lineStyle: {
                    color: "#5f7db9",
                    type: "solid"
                }
            },
            xAxis: [{
                type: 'category',
                name: '分钟',
                nameTextStyle: {
                    color: '#fff'
                },
                bottom: '20',
                nameGap: '20',
                nameLocation: 'end',
                data: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        // fontSize: "3",
                        fontWeight: 'lighter',
                    },
                },
                nameTextStyle: {
                    color: '#fff'
                },
                axisLine: { //x轴、y轴的深色轴线，如图2
                    show: true,
                    lineStyle: {
                        color: "#162962",
                    }
                },
                axisTick: { //图3所示
                    show: false,
                },
                splitLine: { //背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
                    show: false,
                }
            }],
            yAxis: [{
                    type: 'value',
                    name: '成功率／%',
                    nameTextStyle: {
                        color: '#fff',
                        fontWeight: 'lighter',
                    },
                    min: 0,
                    max: 100,
                    interval: 25,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            // fontSize: "3",
                            fontWeight: 'lighter',
                        },
                        formatter: '{value}%'
                    },
                    splitLine: { //背景图的内置表格中“边框”的颜色线条   这个是y轴的横线
                        show: true,
                        lineStyle: {
                            color: "#162962",
                            type: "solid",
                        }
                    }
                },
                {
                    type: 'value',
                    name: '数量／次',
                    nameTextStyle: {
                        color: '#fff',
                        fontWeight: 'lighter',
                    },
                    min: 0,
                    max: 200,
                    interval: 50,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            // fontSize: "3",
                            fontWeight: 'lighter',
                        },
                        formatter: '{value}'
                    },
                    splitLine: { //终于找到了，背景图的内置表格中“边框”的颜色线条   这个是y轴的横线
                        show: true,
                        lineStyle: {
                            color: "#162962",
                            type: "solid",
                        }
                    }
                },

            ],
            series: [{
                    name: '按次',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3],
                    itemStyle: {
                        normal: { color: '#5f7db9' }
                    }
                },
                {
                    name: '按月',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                    itemStyle: {
                        normal: { color: '#ebca45' }
                    }
                },
                {
                    name: '按次成功率',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 7,
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 36.3, 90.2, 80.3, 83.4, 73.0, 66.5, 52.0, 36.2],
                    itemStyle: {
                        normal: { color: '#16d7e0' }
                    }
                },
                {
                    name: '按月成功率',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 7,
                    yAxisIndex: 1,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                    itemStyle: {
                        normal: { color: '#af4bcc' }
                    }
                }
            ]
        };
        w.orders.setOption(option);
    },
    codePie: function() {
        var w = this;
        var category = [];
        var dottedBase = +new Date();
        var lineData = [];
        var barData = [];

        for (var i = 0; i < 24; i++) {
            var date = new Date(dottedBase += 3600 * 24 * 1000);
            category.push([
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            ].join('-'));
            var b = Math.random() * 200;
            var d = Math.random() * 200;
            barData.push(b);
            lineData.push(d + b);
        }
        option = {
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 30,
                left: 0,
                bottom: 15,
                right: 40,
                show: true, //表示开启
                borderColor: "rgba(0, 0, 0, 0.0)", //折线图的边宽颜色
                containLabel: true,

            },
            legend: {
                data: ['成功', '失败'],
                textStyle: {
                    color: '#fff',
                    fontWeight: 'lighter',
                },
                z: 999,
                top: 0,
                right: 0,
            },
            xAxis: [{
                name: '小时',
                nameTextStyle: {
                    color: '#fff',
                    // fontSize: "1",
                    fontWeight: 'lighter',
                },
                data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        // fontSize: "1",
                        fontWeight: 'lighter',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: '#162962'
                    }
                },
                splitLine: {
                    show: false,
                }
            }],
            yAxis: [{
                type: 'value',
                name: '所占%',
                nameTextStyle: {
                    color: '#fff',
                    fontWeight: 'lighter',
                },
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        // fontSize: "1",
                        fontWeight: 'lighter',
                    },
                    formatter: '{value}%'
                },
                axisLine: {
                    lineStyle: {
                        color: '#162962'
                    }
                },
                splitLine: {
                    show: false,
                }
            }],
            series: [{
                    name: '成功',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color: '#efca45'
                        }
                    },
                    data: [40, 50, 63, 64, 62, 72, 43, 54, 82, 91, 22, 44, 51, 55, 45, 53, 62, 72, 81, 71, 81, 83, 62, 62]
                }, {
                    name: '失败',
                    type: 'bar',
                    barWidth: 4,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: '#00e4ff',

                        }
                    },
                    data: [20, 10, 23, 24, 32, 22, 43, 54, 22, 11, 22, 24, 21, 65, 65, 43, 32, 22, 11, 21, 11, 23, 32, 32]
                },
                {
                    name: 'dotted',
                    type: 'pictorialBar',
                    symbol: 'rect',
                    itemStyle: {
                        normal: {
                            color: '#0f375f'
                        }
                    },
                    symbolRepeat: true,
                    symbolSize: [3, 2],
                    symbolMargin: 1,
                    z: -12,
                    data: [40, 50, 63, 64, 62, 72, 43, 54, 82, 91, 22, 44, 51, 55, 45, 53, 62, 72, 81, 71, 81, 83, 62, 62]
                }
            ]
        };
        w.identify.setOption(option);
    },
    playPie: function() {
        var w = this;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '15%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                nameGap: 15,
                nameTextStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#162962'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "3"
                    }
                },
                splitLine: {
                    show: false
                },
                type: 'value',
                position: 'top',
                boundaryGap: [0, 0.01],
                name: '成功率/%',
                max: 100,
                min: 0
            },
            yAxis: [{
                    axisTick: {
                        alignWithLabel: true,
                        length: 10
                    },
                    nameGap: 25,
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#162962'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: "3"
                        }
                    },
                    type: 'category',
                    data: ['60', '50', '40', '30', '20', '10'],
                    name: '时间/分钟'
                },
                {
                    axisTick: {
                        alignWithLabel: true,
                        length: 10
                    },
                    nameGap: 25,
                    offset: 25,
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#162962'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: "3"
                        }
                    },
                    type: 'category',
                    data: ['30', '45', '90', '70', '64', '30'],
                    name: '时间/分钟'
                }
            ],
            series: [{
                    barCategoryGap: '50%',
                    type: 'bar',
                    data: [30, 45, 90, 70, 64, 30],
                    itemStyle: {
                        normal: {
                            color: '#5c80bc'
                        }
                    }
                },
                {
                    barCategoryGap: '50%',
                    type: 'bar',
                    data: [100, 100, 100, 100, 100, 100],
                    barGap: '-100%',
                    itemStyle: {
                        normal: {
                            color: '#c9c9c9',
                            opacity: 0.15
                        }
                    }
                }
            ]
        };
        w.plays.setOption(option);
    },
    pie: function() {
        var w = this;
        var dataStyle = {
            normal: {
                label: { show: true },
                labelLine: { show: true }
            }
        };
        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: { show: false },
                labelLine: { show: false }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        option = {
            // title: {
            //     x: 'center',
            //     y: 'center',
            //     //itemGap: 20,
            //     textStyle: {
            //         color: 'rgba(30,144,255,0.8)',
            //         fontFamily: '微软雅黑',
            //         fontSize: 35,
            //         fontWeight: 'bolder'
            //     }
            // },
            grid: {
                top: 10,
                left: 0,
                right: 0,
                bottom: 0,
                show: true, //表示开启
                borderColor: "rgba(0, 0, 0, 0.0)", //折线图的边宽颜色
                containLabel: true,

            },
            tooltip: {
                show: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: ['10', '20', '30', '40', '50', '60'],
                textStyle: {
                    color: '#fff',
                    fontWeight: 'lighter',
                },
                orient: 'vertical',
                x: 140,
                y: -5,
                // itemWidth: '30',
                itemHeight: '6',
                itemGap: 0,
            },

            // legend: {
            //     orient: 'vertical',
            //     x: 140,
            //     y: -5,
            //     itemGap: 0,
            //     data: ['10', '20', '30', '40', '50', '60'],
            //     itemWidth: '10',
            //     itemHeight: '6',
            //     textStyle: {
            //         fontWeight: 'lighter',
            //         fontSize: '12',
            //         height: '20',
            //         color: '#fff',
            //     }
            // },
            series: [{
                    name: '1',
                    type: 'pie',
                    clockWise: false,
                    radius: [70, 80],
                    itemStyle: dataStyle,
                    data: [{
                            value: 68,
                            name: '10'
                        },
                        {
                            value: 32,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: '2',
                    type: 'pie',
                    clockWise: false,
                    radius: [60, 70],
                    itemStyle: dataStyle,
                    data: [{
                            value: 69,
                            name: '20'
                        },
                        {
                            value: 71,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: '3',
                    type: 'pie',
                    clockWise: false,
                    radius: [50, 60],
                    itemStyle: dataStyle,
                    data: [{
                            value: 55,
                            name: '30'
                        },
                        {
                            value: 97,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                }, {
                    name: '4',
                    type: 'pie',
                    clockWise: false,
                    radius: [40, 50],
                    itemStyle: dataStyle,
                    data: [{
                            value: 49,
                            name: '40'
                        },
                        {
                            value: 71,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: '5',
                    type: 'pie',
                    clockWise: false,
                    radius: [30, 40],
                    itemStyle: dataStyle,
                    data: [{
                            value: 39,
                            name: '50'
                        },
                        {
                            value: 71,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: '6',
                    type: 'pie',
                    clockWise: false,
                    radius: [20, 30],
                    itemStyle: dataStyle,
                    data: [{
                            value: 19,
                            name: '60'
                        },
                        {
                            value: 71,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
            ]
        };

        w.terminal.setOption(option);
    }


};
$(function() {
    Access.init();
});
*/
