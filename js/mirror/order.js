var order = {
    get: function() {
        var w = order;
        var dom = $('#order');
        //dom.height($(window).height() * .28);
        var box = dom.parent().parent().addClass('newanimated');
        setTimeout(function() {
            box.removeClass('newanimated');
            box = null;
        }, 1000);
        // var orders = echarts.init(document.getElementById('order'));
        $.get('http://172.16.100.65/mockjsdata/1/screen/bussiness_order?preview=' + preview).success(function(json) {
            var timesSuccess = [];
            var monthNum = [];
            var monthSuccess = [];
            var timesNum = [];
            if (json.code == 0) {
                for (var i = 0; i < json.data.timesSuccess.length; i++) {
                    // console.log(timesSuccess);
                    timesSuccess.push(json.data.timesSuccess[i] * 100);
                }
                for (var i = 0; i < json.data.monthSuccess.length; i++) {
                    // console.log(timesSuccess);
                    monthSuccess.push(json.data.monthSuccess[i] * 100);
                }
                // console.log(timesSuccess);
                w.timesSuccess = timesSuccess;
                w.monthNum = json.data.monthNum;
                w.monthSuccess = monthSuccess;
                w.timesNum = json.data.timesNum;
                //console.log(w.timesSuccess);
                //console.log(w.monthSuccess);
            }
            if (!w.ec) {
                w.ec = echarts.init(dom.get(0));
            }
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            // color: 'pink'
                        }
                    }
                },
                grid: {
                    top: '18%',
                    left: '3%',
                    bottom: '5%',
                    right: '3%',
                    show: true,
                    borderColor: "#5f7db9",
                    containLabel: true,

                },
                legend: {
                    data: ['按次', '按月', '按次成功率', '按月成功率'],
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'lighter',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#5f7db9",
                        type: "solid"
                    }
                },
                xAxis: [{
                    type: 'category',
                    name: '小时',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    bottom: '20',
                    nameGap: '20',
                    nameLocation: 'end',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: 'lighter',
                        },
                    },
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#162962",
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
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
                        // min: 0,
                        // max: 100,
                        // interval: 25,
                        axisLabel: {
                            textStyle: {
                                color: "#fff",
                                fontWeight: 'lighter',
                            },
                            formatter: '{value}%'
                        },
                        splitLine: {
                            show: false,
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
                        // min: 0,
                        // max: 200,
                        // interval: 50,
                        axisLabel: {
                            textStyle: {
                                color: "#fff",
                                // fontSize: "3",
                                fontWeight: 'lighter',
                            },
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#162962",
                                type: "solid",
                            }
                        }
                    },

                ],
                series: [{
                        name: '按月成功率',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 7,

                        data: w.monthSuccess,
                        itemStyle: {
                            normal: { color: '#af4bcc' }
                        }
                    },
                    {
                        name: '按次成功率',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 7,

                        data: w.timesSuccess,
                        itemStyle: {
                            normal: { color: '#16d7e0' }
                        }
                    },
                    {
                        name: '按次',
                        type: 'bar',
                        data: w.timesNum,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: { color: '#5f7db9' }
                        }
                    },
                    {
                        name: '按月',
                        type: 'bar',
                        data: w.monthNum,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: { color: '#ebca45' }
                        }
                    },
                ]
            };
            w.ec.setOption(option);
        }).error(function(json){
            var json = {
                "data": {
                    "timesSuccess": [
                        0.8,
                        0.5,
                        0.7,
                        0.3,
                        1,
                        0,
                        0.1,
                        0.6,
                        0.2,
                        0.8,
                        0.9,
                        0.4
                    ],
                    "monthSuccess": [
                        0.4,
                        0.3,
                        1,
                        0,
                        0.2,
                        0.1,
                        0.6,
                        0.7,
                        0.8,
                        0.8,
                        0.5,
                        0.9
                    ],
                    "monthNum": [
                        120,
                        100,
                        50,
                        90,
                        180,
                        140,
                        160,
                        70,
                        80,
                        120,
                        30,
                        160
                    ],
                    "showTime": [
                        2017070501,
                        2017070502,
                        2017070503,
                        2017070504,
                        2017070505,
                        2017070506,
                        2017070507,
                        2017070508,
                        2017070509,
                        2017070510,
                        2017070511,
                        2017070512
                    ],
                    "timesNum": [
                        120,
                        70,
                        80,
                        180,
                        30,
                        120,
                        100,
                        50,
                        90,
                        140,
                        160
                    ]
                },
                "msg": "success",
                "code": 0
            };
            var timesSuccess = [];
            var monthNum = [];
            var monthSuccess = [];
            var timesNum = [];
            if (json.code == 0) {
                for (var i = 0; i < json.data.timesSuccess.length; i++) {
                    // console.log(timesSuccess);
                    timesSuccess.push(json.data.timesSuccess[i] * 100);
                }
                for (var i = 0; i < json.data.monthSuccess.length; i++) {
                    // console.log(timesSuccess);
                    monthSuccess.push(json.data.monthSuccess[i] * 100);
                }
                // console.log(timesSuccess);
                w.timesSuccess = timesSuccess;
                w.monthNum = json.data.monthNum;
                w.monthSuccess = monthSuccess;
                w.timesNum = json.data.timesNum;
                //console.log(w.timesSuccess);
                //console.log(w.monthSuccess);
            }
            if (!w.ec) {
                w.ec = echarts.init(dom.get(0));
            }
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            // color: 'pink'
                        }
                    }
                },
                grid: {
                    top: '18%',
                    left: '3%',
                    bottom: '5%',
                    right: '3%',
                    show: true,
                    borderColor: "#5f7db9",
                    containLabel: true,

                },
                legend: {
                    data: ['按次', '按月', '按次成功率', '按月成功率'],
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'lighter',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#5f7db9",
                        type: "solid"
                    }
                },
                xAxis: [{
                    type: 'category',
                    name: '小时',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    bottom: '20',
                    nameGap: '20',
                    nameLocation: 'end',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: 'lighter',
                        },
                    },
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#162962",
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
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
                    // min: 0,
                    // max: 100,
                    // interval: 25,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: 'lighter',
                        },
                        formatter: '{value}%'
                    },
                    splitLine: {
                        show: false,
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
                        // min: 0,
                        // max: 200,
                        // interval: 50,
                        axisLabel: {
                            textStyle: {
                                color: "#fff",
                                // fontSize: "3",
                                fontWeight: 'lighter',
                            },
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#162962",
                                type: "solid",
                            }
                        }
                    },

                ],
                series: [{
                    name: '按月成功率',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 7,

                    data: w.monthSuccess,
                    itemStyle: {
                        normal: { color: '#af4bcc' }
                    }
                },
                    {
                        name: '按次成功率',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 7,

                        data: w.timesSuccess,
                        itemStyle: {
                            normal: { color: '#16d7e0' }
                        }
                    },
                    {
                        name: '按次',
                        type: 'bar',
                        data: w.timesNum,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: { color: '#5f7db9' }
                        }
                    },
                    {
                        name: '按月',
                        type: 'bar',
                        data: w.monthNum,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: { color: '#ebca45' }
                        }
                    },
                ]
            };
            w.ec.setOption(option);
        });
    }
}



// function ordera() {
//     var w = this;
//     $('#order').height($(window).height() * .26);
//     var orders = echarts.init(document.getElementById('order'));
//     $.get('http://172.16.100.65/mockjsdata/1/monitor/bussiness_order?apikey=123456').success(function(json) {
//         var timesSuccess = [];
//         var monthNum = [];
//         var monthSuccess = [];
//         var timesNum = [];
//         if (json.code == 0) {
//             for (var i = 0; i < json.data.timesSuccess.length; i++) {
//                 // console.log(timesSuccess);
//                 timesSuccess.push(json.data.timesSuccess[i] * 100);
//             }
//             for (var i = 0; i < json.data.monthSuccess.length; i++) {
//                 // console.log(timesSuccess);
//                 monthSuccess.push(json.data.monthSuccess[i] * 100);
//             }
//             // console.log(timesSuccess);
//             w.timesSuccess = timesSuccess;
//             w.monthNum = json.data.monthNum;
//             w.monthSuccess = monthSuccess;
//             w.timesNum = json.data.timesNum;
//             console.log(w.timesSuccess);
//             console.log(w.monthSuccess);
//         }
//         var option = {
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'cross',
//                     crossStyle: {
//                         // color: 'pink'
//                     }
//                 }
//             },
//             grid: {
//                 top: 30,
//                 left: 0,
//                 bottom: 0,
//                 right: 15,
//                 show: true,
//                 borderColor: "#5f7db9",
//                 containLabel: true,

//             },
//             legend: {
//                 data: ['按次', '按月', '按次成功率', '按月成功率'],
//                 textStyle: {
//                     color: '#fff',
//                     fontWeight: 'lighter',
//                 },
//             },
//             splitLine: {
//                 show: true,
//                 lineStyle: {
//                     color: "#5f7db9",
//                     type: "solid"
//                 }
//             },
//             xAxis: [{
//                 type: 'category',
//                 name: '小时',
//                 nameTextStyle: {
//                     color: '#fff'
//                 },
//                 bottom: '20',
//                 nameGap: '20',
//                 nameLocation: 'end',
//                 data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
//                 axisPointer: {
//                     type: 'shadow'
//                 },
//                 axisLabel: {
//                     textStyle: {
//                         color: "#fff",
//                         fontWeight: 'lighter',
//                     },
//                 },
//                 nameTextStyle: {
//                     color: '#fff'
//                 },
//                 axisLine: {
//                     show: true,
//                     lineStyle: {
//                         color: "#162962",
//                     }
//                 },
//                 axisTick: {
//                     show: false,
//                 },
//                 splitLine: {
//                     show: false,
//                 }
//             }],
//             yAxis: [{
//                     type: 'value',
//                     name: '成功率／%',
//                     nameTextStyle: {
//                         color: '#fff',
//                         fontWeight: 'lighter',
//                     },
//                     // min: 0,
//                     // max: 100,
//                     // interval: 25,
//                     axisLabel: {
//                         textStyle: {
//                             color: "#fff",
//                             fontWeight: 'lighter',
//                         },
//                         formatter: '{value}%'
//                     },
//                     splitLine: {
//                         show: false,
//                         lineStyle: {
//                             color: "#162962",
//                             type: "solid",
//                         }
//                     }
//                 },
//                 {
//                     type: 'value',
//                     name: '数量／次',
//                     nameTextStyle: {
//                         color: '#fff',
//                         fontWeight: 'lighter',
//                     },
//                     // min: 0,
//                     // max: 200,
//                     // interval: 50,
//                     axisLabel: {
//                         textStyle: {
//                             color: "#fff",
//                             // fontSize: "3",
//                             fontWeight: 'lighter',
//                         },
//                         formatter: '{value}'
//                     },
//                     splitLine: {
//                         show: true,
//                         lineStyle: {
//                             color: "#162962",
//                             type: "solid",
//                         }
//                     }
//                 },

//             ],
//             series: [{
//                     name: '按月成功率',
//                     type: 'line',
//                     smooth: true,
//                     showAllSymbol: true,
//                     symbol: 'emptyCircle',
//                     symbolSize: 7,

//                     data: w.monthSuccess,
//                     itemStyle: {
//                         normal: { color: '#af4bcc' }
//                     }
//                 },
//                 {
//                     name: '按次成功率',
//                     type: 'line',
//                     smooth: true,
//                     showAllSymbol: true,
//                     symbol: 'emptyCircle',
//                     symbolSize: 7,

//                     data: w.timesSuccess,
//                     itemStyle: {
//                         normal: { color: '#16d7e0' }
//                     }
//                 },
//                 {
//                     name: '按次',
//                     type: 'bar',
//                     data: w.timesNum,
//                     yAxisIndex: 1,
//                     itemStyle: {
//                         normal: { color: '#5f7db9' }
//                     }
//                 },
//                 {
//                     name: '按月',
//                     type: 'bar',
//                     data: w.monthNum,
//                     yAxisIndex: 1,
//                     itemStyle: {
//                         normal: { color: '#ebca45' }
//                     }
//                 },
//             ]
//         };
//         orders.setOption(option);
//     });
// }