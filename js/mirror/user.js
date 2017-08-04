/**
 * Created by dell on 2017/6/23.
 */
/**
 * Created by dell on 2017/6/23.
 */
var user = {
    label: {
        "tenSuccess": '10分钟',
        "twentySuccess": '20分钟',
        "thirtySuccess": '30分钟',
        "fortySuccess": '40分钟',
        "fiftySuccess": '50分钟',
        "sixtySuccess": '60分钟'
    },
    get: function() {
        var self = user;
        //console.log(self);
        var dom = $('#user');
        //dom.height($(window).height() * .26);
        var box = dom.parent().parent().addClass('animated zoomIn');
        setTimeout(function() {
            box.removeClass('animated zoomIn');
            box = null;
        }, 1000);
        $.get('http://172.16.100.65/mockjsdata/1/screen/user_activation?preview=' + preview).success(
            /*{
             "msg": "success",
             "data": {
             "fortySuccess": 0,
             "thirtySuccess": 0.5,
             "sixtySuccess": 0.4,
             "twentySuccess": 0,
             "tenSuccess": 0.5,
             "fiftySuccess": 0
             },
             "code": 0
             }*/
            function(json) {
                var rs = [
                    [self.label['tenSuccess'], 0],
                    [self.label['twentySuccess'], 0],
                    [self.label['thirtySuccess'], 0],
                    [self.label['fortySuccess'], 0],
                    [self.label['fiftySuccess'], 0],
                    [self.label['sixtySuccess'], 0]
                ];
                if (json && json['code'] == 0 && json['data']) {
                    rs = [];
                    for (var n in json['data']) {
                        rs.push([self.label[n], json['data'][n] * 100]);
                    }
                }
                if (!self.ec) {
                    self.ec = echarts.init(dom.get(0));
                }
                var placeHolderStyle = {
                    normal: {
                        color: 'rgba(32,34,48,1)',//背景灰色
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: 'rgba(0,0,0,0)'
                    }
                };
                var option = {
                    // title: {
                    // x: 'center',
                    // y: 'center',
                    // //itemGap: 20,
                    // textStyle: {
                    // color: 'rgba(30,144,255,0.8)',
                    // fontFamily: '微软雅黑',
                    // fontSize: 35,
                    // fontWeight: 'bolder'
                    // }
                    // },
                    grid: {
                        top: '10%',
                        left: 0,
                        right: '0%',
                        bottom: '10%',
                        show: true, // 表示开启
                        borderColor: "rgba(0, 0, 0, 0.0)", // 折线图的边宽颜色
                        containLabel: true
                    },
                    tooltip: {
                        show: true,
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#46B5EB', '#DFB932', '#16D9E0', '#EB6F46', '#0EB373', '#607EB9'],
                    legend: {
                        data: ['10分钟', '20分钟', '30分钟', '40分钟', '50分钟', '60分钟'],
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'lighter',
                            fontSize: 8
                        },
                        orient: 'vertical',
                        x: '83%',
                       // y: '-3%',
                        itemWidth: 8,
                        itemHeight: 8,
                        itemGap: 7
                    },

                    // legend: {
                    // orient: 'vertical',
                    // x: 140,
                    // y: -5,
                    // itemGap: 0,
                    // data: ['10', '20', '30', '40', '50', '60'],
                    // itemWidth: '10',
                    // itemHeight: '6',
                    // textStyle: {
                    // fontWeight: 'lighter',
                    // fontSize: '12',
                    // height: '20',
                    // color: '#fff',
                    // }
                    // },
                    series: [{
                        name: '用户激活',
                        type: 'pie',
                        clockWise: false,
                        radius: ['80%', '96%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: '#030617',
                                //shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //shadowBlur: 10,
                                label: {
                                   position: 'inner',
                                    show: true,
                                    formatter: function(param) {
                                        return param['percent'];
                                    },
                                    textStyle:{
                                        //fontSize: 19,
                                        //fontWeight:100
                                    }
                                },
                                labelLine: {
                                    show: false,
                                    length:4
                                }
                            }
                        },
                        data: [{
                            value: rs[0][1],
                            name: rs[0][0]
                        }, {
                            value: 100 - rs[0][1],
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }]
                    }, {
                        name: '用户激活',
                        type: 'pie',
                        clockWise: false,
                        radius: ['64%', '80%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: '#030617',
                                //shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //shadowBlur: 10,
                                label: {
                                    position: 'inner',
                                    show: true,
                                    formatter: function(param) {
                                        return param['percent'];
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: [{
                            value: rs[1][1],
                            name: rs[1][0]
                        }, {
                            value: 100 - rs[1][1],
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }]
                    }, {
                        name: '用户激活',
                        type: 'pie',
                        clockWise: false,
                        radius: ['48%', '64%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: '#030617',
                                //shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //shadowBlur: 10,
                                label: {
                                    position: 'inner',
                                    show: true,
                                    formatter: function(param) {
                                        return param['percent'];
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: [{
                            value: rs[2][1],
                            name: rs[2][0]
                        }, {
                            value: 100 - rs[2][1],
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }]
                    }, {
                        name: '用户激活',
                        type: 'pie',
                        clockWise: false,
                        radius: ['32%', '48%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: '#030617',
                                //shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //shadowBlur: 10,
                                label: {
                                    position: 'inner',
                                    show: true,
                                    formatter: function(param) {
                                        return param['percent'];
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: [{
                            value: rs[3][1],
                            name: rs[3][0]
                        }, {
                            value: 100 - rs[3][1],
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }]
                    }, {
                        name: '用户激活',
                        type: 'pie',
                        clockWise: false,
                        radius: ['16%', '32%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: '#030617',
                                //shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //shadowBlur: 10,
                                label: {
                                    position: 'inner',
                                    show: true,
                                    formatter: function(param) {
                                        return param['percent'];
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: [{
                            value: rs[4][1],
                            name: rs[4][0]
                        }, {
                            value: 100 - rs[4][1],
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }]
                    }, {
                        name: '用户激活',
                        type: 'pie',
                        clockWise: false,
                        radius: ['0%', '16%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                borderColor: '#030617',
                                //shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //shadowBlur: 10,
                                label: {
                                    position: 'inner',
                                    show: true,
                                    formatter: function(param) {
                                        return param['percent'];
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        data: [{
                            value: rs[5][1],
                            name: rs[5][0]
                        }, {
                            value: 100 - rs[5][1],
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }]
                    }]
                };
                self.ec.setOption(option);
            }).error(function(json) {
            var json = {
                "msg": "success",
                "data": {
                    "fortySuccess": 0,
                    "thirtySuccess": 0.5,
                    "sixtySuccess": 0.4,
                    "twentySuccess": 0,
                    "tenSuccess": 0.5,
                    "fiftySuccess": 0
                },
                "code": 0
            };
            var rs = [
                [self.label['tenSuccess'], 0],
                [self.label['twentySuccess'], 0],
                [self.label['thirtySuccess'], 0],
                [self.label['fortySuccess'], 0],
                [self.label['fiftySuccess'], 0],
                [self.label['sixtySuccess'], 0]
            ];
            if (json && json['code'] == 0 && json['data']) {
                rs = [];
                for (var n in json['data']) {
                    rs.push([self.label[n], json['data'][n] * 100]);
                }
            }
            if (!self.ec) {
                self.ec = echarts.init(dom.get(0));
            }
            var placeHolderStyle = {
                normal: {
                    color: 'rgba(32,34,48,1)',//背景灰色
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)'
                }
            };
            var option = {
                // title: {
                // x: 'center',
                // y: 'center',
                // //itemGap: 20,
                // textStyle: {
                // color: 'rgba(30,144,255,0.8)',
                // fontFamily: '微软雅黑',
                // fontSize: 35,
                // fontWeight: 'bolder'
                // }
                // },
                grid: {
                    top: '10%',
                    left: 0,
                    right: '0%',
                    bottom: '10%',
                    show: true, // 表示开启
                    borderColor: "rgba(0, 0, 0, 0.0)", // 折线图的边宽颜色
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#46B5EB', '#DFB932', '#16D9E0', '#EB6F46', '#0EB373', '#607EB9'],
                legend: {
                    data: ['10分钟', '20分钟', '30分钟', '40分钟', '50分钟', '60分钟'],
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'lighter',
                        fontSize: 8
                    },
                    orient: 'vertical',
                    x: '83%',
                    // y: '-3%',
                    itemWidth: 8,
                    itemHeight: 8,
                    itemGap: 7
                },

                // legend: {
                // orient: 'vertical',
                // x: 140,
                // y: -5,
                // itemGap: 0,
                // data: ['10', '20', '30', '40', '50', '60'],
                // itemWidth: '10',
                // itemHeight: '6',
                // textStyle: {
                // fontWeight: 'lighter',
                // fontSize: '12',
                // height: '20',
                // color: '#fff',
                // }
                // },
                series: [{
                    name: '用户激活',
                    type: 'pie',
                    clockWise: false,
                    radius: ['80%', '96%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#030617',
                            //shadowColor: 'rgba(0, 0, 0, 0.6)',
                            //shadowBlur: 10,
                            label: {
                                position: 'inner',
                                show: true,
                                formatter: function(param) {
                                    return param['percent'];
                                },
                                textStyle:{
                                    //fontSize: 19,
                                    //fontWeight:100
                                }
                            },
                            labelLine: {
                                show: false,
                                length:4
                            }
                        }
                    },
                    data: [{
                        value: rs[0][1],
                        name: rs[0][0]
                    }, {
                        value: 100 - rs[0][1],
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '用户激活',
                    type: 'pie',
                    clockWise: false,
                    radius: ['64%', '80%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#030617',
                            //shadowColor: 'rgba(0, 0, 0, 0.6)',
                            //shadowBlur: 10,
                            label: {
                                position: 'inner',
                                show: true,
                                formatter: function(param) {
                                    return param['percent'];
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [{
                        value: rs[1][1],
                        name: rs[1][0]
                    }, {
                        value: 100 - rs[1][1],
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '用户激活',
                    type: 'pie',
                    clockWise: false,
                    radius: ['48%', '64%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#030617',
                            //shadowColor: 'rgba(0, 0, 0, 0.6)',
                            //shadowBlur: 10,
                            label: {
                                position: 'inner',
                                show: true,
                                formatter: function(param) {
                                    return param['percent'];
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [{
                        value: rs[2][1],
                        name: rs[2][0]
                    }, {
                        value: 100 - rs[2][1],
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '用户激活',
                    type: 'pie',
                    clockWise: false,
                    radius: ['32%', '48%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#030617',
                            //shadowColor: 'rgba(0, 0, 0, 0.6)',
                            //shadowBlur: 10,
                            label: {
                                position: 'inner',
                                show: true,
                                formatter: function(param) {
                                    return param['percent'];
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [{
                        value: rs[3][1],
                        name: rs[3][0]
                    }, {
                        value: 100 - rs[3][1],
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '用户激活',
                    type: 'pie',
                    clockWise: false,
                    radius: ['16%', '32%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#030617',
                            //shadowColor: 'rgba(0, 0, 0, 0.6)',
                            //shadowBlur: 10,
                            label: {
                                position: 'inner',
                                show: true,
                                formatter: function(param) {
                                    return param['percent'];
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [{
                        value: rs[4][1],
                        name: rs[4][0]
                    }, {
                        value: 100 - rs[4][1],
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }]
                }, {
                    name: '用户激活',
                    type: 'pie',
                    clockWise: false,
                    radius: ['0%', '16%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            borderColor: '#030617',
                            //shadowColor: 'rgba(0, 0, 0, 0.6)',
                            //shadowBlur: 10,
                            label: {
                                position: 'inner',
                                show: true,
                                formatter: function(param) {
                                    return param['percent'];
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [{
                        value: rs[5][1],
                        name: rs[5][0]
                    }, {
                        value: 100 - rs[5][1],
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }]
                }]
            };
            self.ec.setOption(option);
        })
    }
};