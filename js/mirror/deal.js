var attackLevel = {
    0: { text: '低', color: 'yellow' },
    1: { text: '低', color: 'yellow' },
    2: { text: '低', color: 'yellow' },
    3: { text: '低', color: 'yellow' },
    4: { text: '中', color: 'orange' },
    5: { text: '中', color: 'orange' },
    6: { text: '中', color: 'orange' },
    7: { text: '中', color: 'orange' },
    8: { text: '高', color: 'red' },
    9: { text: '高', color: 'red' },
    10: { text: '高', color: 'red' },
    11: { text: '高', color: 'red' },
    12: { text: '高', color: 'red' }

}
var Deal = {
    init: function() {
        var w = this;
        w.json = Data.deal;
        w.initHtml();
        w.initChart()
    },
    initHtml: function() {
        var w = this;
        // w.title();
        w.totalInfo();
        w.gridAct();
        w.gridTotal()
    },
    title: function() {
        var w = this;
        _fun.editText(__ROOT__ + '/Home/MirrorDeal/title', 'p7title');

    },
    //第一图
    totalInfo: function() {
        var w = this;
        // $.post('./data/mirror/deal.json').success(function(json){
        if (w.json.code) {
            var data = w.json.data.totalInfo;
            var dayDeal = _fun.num(data.validAttack.count);
            var perDeal = data.validAttack.ratio;
            var dayWarning = _fun.num(data.warningTime.count);
            var perWarning = data.warningTime.ratio;
            $('.dayDeal').text(dayDeal);
            $('.dayWarning').text(dayWarning);
            $('.perDeal').text(perDeal);
            $('.perWarning').text(perWarning)
        }
        // })
    },
    // 第一行中间滚动表格：最新有效攻击
    gridAct: function() {
        var w = this;
        // $.post('./data/mirror/deal.json').success(function(json) {
        if (w.json.code) {
            var data = w.json.data.effectiveAttack;
            $('#deal-info tbody').html('');
            $.each(data, function(k, v) {
                var el = ' <tr>' +
                    '<td>' + v.collectorReceiptTime + '</td>' +
                    '<td>' + v.ips + '</td>' +
                    '<td>' + v.attackType + '</td>' +
                    '<td>' + "--" + '</td>' +
                    '</tr>';
                $('#deal-info tbody').append(el)

            });

        }
        // });
        _fun.scroll('deal-info')
    },
    // 右下角滚动列表：最新告警信息汇总
    gridTotal: function() {
        var w = this;
        // $.post('./data/mirror/deal.json').success(function(json) {
        if (w.json.code) {
            var data = w.json.data.totalAttack;
            $('#info-total tbody').html('');
            $.each(data, function(k, v) {
                if (v.state == "OK")
                    v.state = "是";
                if (v.state == "PROBLEM")
                    v.state = "否";
                var el = ' <tr>' +
                    '<td>' + v.collectorReceiptTime + '</td>' +
                    '<td>' + v.srcGeoRegion + '</td>' +
                    '<td>' + v.collectorReceiptTime + '</td>' +
                    '<td>' + v.collectorReceiptTime + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + attackLevel[v.severity].text + '</td>' +
                    '<td>' + v.state + '</td>' +
                    '<td>' + v.state + '</td>' +
                    '</tr>';
                $('#info-total tbody').append(el)

            });
            _fun.scroll('info-total')
        }
        // })
    },
    initChart: function() {
        var w = this;


        function winHtml() {
            $('.box-m,#ident').height($(window).height() * .17);
            $('#user,#order,#play,.box').height($(window).height() * .26);
            $('#info-roll').height($(window).height() * .17);
        }
        winHtml();
        w.actTop = echarts.init(document.getElementById('act-top5'));
        w.tendDay = echarts.init(document.getElementById('tend-day'));
        w.tendWeek = echarts.init(document.getElementById('tend-week'));
        w.act();
        w.day();
        w.week();

        $(window).resize(function() {
            winHtml();
        })
    },


    act: function() {
        var w = this;
        // $.post('./data/mirror/deal.json').success(function(json) {
        if (w.json.code) {
            var data = w.json.data.types;
            var name = [],
                value = [];
            $.each(data, function(k, v) {
                name.push(k);
                value.push(v);
            });
            var dataMax = Math.max.apply(null, value);
            var indicator = [];
            $.each(name, function(k, v) {
                indicator.push({
                    name: v,
                    Max: dataMax
                })
            })
            w.actTop.setOption(w.actInfo(indicator, value));
        }
        // })
    },
    // 雷达图：有效攻击类型TOP5
    actInfo: function(data, dataX) {
        var w = this;
        var option = {
            radar: {
                center: ['50%', '52%'],
                name: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'normal',
                        fontFamily: 'SimSun',
                        fontSize: 14
                    }
                },
                splitNumber: 5,
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(89,61,67,0.1)', 'rgba(89,61,67,0.2)',
                            'rgba(89,61,67,0.4)', 'rgba(89,61,67,0.6)',
                            'rgba(89,61,67,0.8)', 'rgba(89,61,67,1)'
                        ]
                    }
                },
                axisLine: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: [
                            'rgba(130,57,53,0.8)', 'rgba(130,57,53,0.6)',
                            'rgba(130,57,53,0.4)', 'rgba(130,57,53,0.3)',
                            'rgba(130,57,53,0.1)', 'rgba(130,57,53,0.1)'
                        ]
                    }
                },
                /*indicator: [{
                    name: name[0],
                    max: Max
                }, {
                    name: name[1],
                    max: Max
                }, {
                    name: name[2],
                    max: Max
                }, {
                    name: name[3],
                    max: Max
                }, {
                    name: name[4],
                    max: Max
                }]*/
                indicator: data
            },
            series: [{
                type: 'radar',
                itemStyle: {
                    normal: {
                        color: 'rgba(230,179,61,0.4)'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.3
                    }
                },
                symbol: 'diamond',
                symbolSize: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'insideTopRight',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontFamily: 'SimSun',
                            fontSize: 14
                        }
                    }
                },

                data: [{
                    value: dataX

                }]
            }]
        };
        return option;
    },

    day: function() {
        var w = this;
        // $.post('./data/mirror/deal.json').success(function (json) {
        if (w.json.code) {
            var data = w.json.data.warningTimes;
            var data1 = [],
                data2 = [];
            $.each(data, function(k, v) {
                data1.push(k.substring(11, 19));
                data2.push(v)
            });
            w.tendDay.setOption(w.dayInfo(data1, data2))
        }
        // })
    },
    // 面积图：24小时告警趋势
    dayInfo: function(dataX, dataY) {
        var w = this;
        var option = {
            grid: {
                left: '20px',
                right: '40px',
                top: '10px',
                bottom: '20px',
                containLabel: true
            },
            xAxis: {
                data: dataX,
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#15275d'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                axisLabel: {
                    margin: 14,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                min: '0',
                axisLine: {
                    lineStyle: {
                        color: '#15275d'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },

            series: [
                /* {
                     type: 'bar',
                     animation:false,
                     barWidth:3,
                     hoverAnimation:false,
                     data:dataY,
                     itemStyle:{
                         normal:{
                             color: new echarts.graphic.LinearGradient(0.4, 0.4, 0.4, 1, [{
                                 offset: 0, color: '#0AC2F2' // 0% 处的颜色
                             }, {
                                 offset: 1, color: '#102542' // 100% 处的颜色
                             }], false),
                             opacity:0.6,
                             label:{
                                 show:false
                             }
                         }
                     }
                 },*/
                {
                    type: 'line',
                    smooth: true,
                    symbolSize: 0, //圈的大小
                    animation: false,
                    lineWidth: 0,
                    hoverAnimation: false,
                    data: dataY,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#0AC2F2',
                            shadowBlur: 5,
                            shadowColor: '#fff'
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: new echarts.graphic.LinearGradient(1, 1, 1, 0.3, [{
                                offset: 0,
                                color: '#0F3B5B' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#0AC2F2' // 100% 处的颜色
                            }], false)
                        }
                    },
                    areaStyle: {
                        normal: {
                            // color:'#0AC2F2',
                            color: new echarts.graphic.LinearGradient(0.4, 0.4, 0.4, 1, [{
                                offset: 0,
                                color: '#0AC2F2' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#102542' // 100% 处的颜色
                            }], false),
                            opacity: 0.9
                        }
                    }
                }
            ]
        };
        return option;
    },

    week: function() {
        var w = this;
        // $.post('./data/mirror/deal.json').success(function (json) {
        if (w.json.code) {
            var data = w.json.data.weekAlert;
            var date = [],
                data1 = [],
                data2 = [];
            $.each(data.valid, function(k, v) {
                date.push(k);
                data1.push(v);
            });
            $.each(data.warn, function(k, v) {
                data2.push(v);
            });
            w.tendWeek.setOption(w.weekInfo(date, data1, data2))
            console.info(data, data1, data2);
        }
        // })
    },
    // 左下折线图：近7天告警/有效攻击趋势分析
    weekInfo: function(dataX, data1, data2) {
        var w = this;
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            textStyle: {
                color: '#fff',
                fontFamily: 'SimSun',
                fontWeight: 'normal',
                fontSize: '12'
            },
            legend: {
                top: '-5',
                itemGap: 80,
                itemWidth: 14,
                itemHeight: 14,
                data: [{
                    name: '告警趋势',
                    // icon:'image://./../../../img/mirror/deal/l.png',
                    // icon: 'none',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'SimSun',
                        fontWeight: 'normal',
                        fontSize: '12'
                    }
                }, {
                    name: '有效攻击',
                    // icon:'image://../../../img/mirror/deal/r.png',
                    // icon: 'none',
                    // icon:'image:/totalAttack/url'
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'SimSun',
                        fontWeight: 'normal',
                        fontSize: '12'
                    }
                }]
            },
            grid: {
                show: true,
                borderWidth: '1',
                borderColor: '#15275d',
                left: '3px',
                right: '30px',
                top: '15%',
                bottom: '18%',
                containLabel: true
            },
            xAxis: [{
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#15275d'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0
                },
                type: 'category',
                boundaryGap: false,
                data: dataX

            }],
            yAxis: [{
                name: '/次',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#15275d'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#15275d'
                    }
                },
                splitNumber: '5',
                min: '0',
                type: 'value'
            }],
            series: [{
                showSymbol: true,
                hoverAnimation: false,
                name: '告警趋势',
                type: 'line',
                // symbol:'image://../../../img/mirror/deal/l-small.png',
                symbol: 'none',
                symbolSize: '10',
                label: {
                    normal: {
                        position: 'top'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#D6A137'
                    }
                },
                data: data1
            }, {
                showSymbol: true,
                hoverAnimation: false,
                name: '有效攻击',
                type: 'line',
                // symbol:'image://../../../img/mirror/deal/r-small.png',
                symbol: 'none',
                symbolSize: '10',
                label: {
                    normal: {
                        position: 'top'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#22BBB9'
                    }
                },
                data: data2
            }]
        };
        return option;
    }

};



$(function() {
    Deal.init()
});