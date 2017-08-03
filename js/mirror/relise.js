var relise = {
    get: function() {
        var self = relise;
        var dom = $('#relise');
        //dom.height($(window).height() * .26);
        var box = dom.parent().parent().addClass('newanimated');
        setTimeout(function() {
            box.removeClass('newanimated');
            box = null;
        }, 1000);
        $('#relise').height($(window).height() * .2);
        // var relise = echarts.init(document.getElementById('relise'));
        var w = this;
        var category = [];
        var dottedBase = +new Date();
        var lineData = [];
        var barData = [];
        if (!w.ec) {
            w.ec = echarts.init(dom.get(0));
        }
        for (var i = 0; i < 24; i++) {
            var date = new Date(dottedBase += 3600 * 24 * 1000);
            category.push([
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            ].join('-'));
            var b = Math.random() * 200;
            var d = Math.random() * 200;
            barData.push(b)
            lineData.push(d + b);
        }
        var option = {
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '19%',
                left: '2%',
                bottom: '20%',
                right: '4%',
                show: true, //表示开启
                borderColor: "rgba(0, 0, 0, 0.0)", //折线图的边宽颜色
                containLabel: true,
            },
            legend: {
                data: ['成功率'],
                textStyle: {
                    color: '#fff',
                    fontWeight: 'lighter',
                },
                z: 999,
                top: 0,
                right: '360',
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
                interval: 25,
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
                name: '成功率',
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
                        color: function(params) {
                            var v = params.value;
                            if (v <= 5) {
                                return '#00e4ff';
                            } else if (v > 5 && v < 10) {
                                return '#efca45';
                            } else if (v >= 10) {
                                return '#ee1a19';
                            }
                        },
                    }
                },
                data: [20, 3, 23, 24, 32, 22, 2, 54, 22, 7, 22, 24, 21, 65, 8, 43, 32, 22, 11, 4, 6, 23, 32, 100]
            }, {
                name: 'dotted',
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    normal: {
                        color: '#3da3d4'
                    }
                },
                symbolRepeat: true,
                symbolSize: [3, 2],
                symbolMargin: 1,
                z: -12,
                data: [40, 50, 63, 64, 62, 72, 43, 54, 82, 91, 22, 44, 51, 55, 45, 53, 62, 72, 81, 71, 81, 83, 62, 62]
            }]
        };

        function getData(option) {
            function getTime(v) {
                var t = v.substring(8,10);
                return t+':00';
            }
            $.ajax({
              type: 'get',
              url: /*'http://172.16.100.65/mockjsdata/1/screen/bussiness_auth?preview=' + preview,*/'',
              success: function(data) {
                  if (data.code == 0) {
                    for (var i = 0; i < data.data.length; i++) {
                      for (var t in data.data[i]) {
                        option.series[0].data[i] = data.data[i][t] * 100;
                        option.series[1].data[i] = 100 - option.series[0].data[i];
                        option.series[2].data[i] = option.series[0].data[i];
                        option.xAxis[0].data[i] = getTime(t);
                      }
                    }
                  }
                  document.getElementById('rate').style.visibility='visible';
                  w.ec.setOption(option);
                },
              error: function (err) {
                document.getElementById('rate').style.visibility='visible';
                w.ec.setOption(option);
              }
            })
        }
        //relise.setOption(option);
        getData(option);
    }
}