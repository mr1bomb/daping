var order = echarts.init(document.getElementById('order'));

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#fff'
            }
        }
    },
    grid: {
        x: 0,
        left: 0,
        y: 0,
        right: 0
    },
    legend: {
        data: ['按次', '按月', '成功率']
    },
    xAxis: [{
        type: 'category',
        name: '时间／分钟',
        data: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
        axisPointer: {
            type: 'shadow'
        }
    }],
    yAxis: [{
            type: 'value',
            name: '水量',
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
                formatter: '{value} %'
            }
        },
        {
            type: 'value',
            name: '数量／次',
            min: 0,
            max: 200,
            interval: 50,
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [{
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 50.6, 62.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 13.3, 54.5, 86.3, 170.2, 160.3, 163.4, 93.0, 56.5, 12.0, 6.2]
        }
    ]
};
order.setOption(option);