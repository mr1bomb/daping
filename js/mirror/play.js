/**
 * Created by dell on 2017/6/23.
 */
var play = {
    get: function() {
        var self = play;
        var dom = $('#play');
        //dom.height($(window).height() * .28);
        var box = dom.parent().parent().addClass('animated zoomIn');
       setTimeout(function() {
            box.removeClass('animated zoomIn');
            box = null;
        }, 1000);
        $.ajax({
            type: 'get',
            url: 'http://172.16.100.65/mockjsdata/1/screen/bussiness_play?preview=' + preview,
            // url: '/screen/bussiness_play' + preview,
            /*{
             "code": 0,
             "data": [
             0.4,
             0.1,
             0.2,
             0.8,
             0.5,
             0.3
             ],
             "msg": "success"
             }*/
            data: {},
            //dataType: "json",
            contentType: "application/json",
            success: function(data) {
                // if (!plays) {
                //     var plays = echarts.init(document.getElementById('play'));
                // }
                if (!self.ec) {
                    self.ec = echarts.init(dom.get(0));
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '15%',
                        top: '12%',
                        bottom: '5%',
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
                            data: [],
                            name: ''
                        }
                    ],
                    series: [{
                            barCategoryGap: '50%',
                            type: 'bar',
                            data: [],
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
                if (data && data['code'] == 0 && data['data']) {
                    for (var i = 0; i < data.data.length; i++) {
                        option.series[0].data[data.data.length-1-i] = Math.floor(data.data[i] * 100);
                        option.yAxis[1].data[data.data.length-1-i] = Math.floor(data.data[i] * 100) + "% ";
                    }
                }
                self.ec.setOption(option, false);
            },
            error: function(data) {
                var data = {
                    "code": 0,
                    "data": [
                        0.4,
                        0.1,
                        0.2,
                        0.8,
                        0.5,
                        0.3
                    ],
                    "msg": "success"
                };
                if (!self.ec) {
                    self.ec = echarts.init(dom.get(0));
                }
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '15%',
                        top: '12%',
                        bottom: '5%',
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
                            data: [],
                            name: ''
                        }
                    ],
                    series: [{
                        barCategoryGap: '50%',
                        type: 'bar',
                        data: [],
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
                if (data && data['code'] == 0 && data['data']) {
                    for (var i = 0; i < data.data.length; i++) {
                        option.series[0].data[data.data.length-1-i] = Math.floor(data.data[i] * 100);
                        option.yAxis[1].data[data.data.length-1-i] = Math.floor(data.data[i] * 100) + "% ";
                    }
                }
                self.ec.setOption(option, false);
            }
        });
    }
}