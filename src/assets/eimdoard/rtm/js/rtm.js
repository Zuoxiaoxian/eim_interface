// 1、一个js文件表示一个模块

let rtm = {
    // 实例1 参考 https://gallery.echartsjs.com/editor.html?c=xH1vxib94f
    gauge1(gauge1_data) {
        var myChart = echarts.init(document.querySelector('.gauge1'));
        let option_gauge1 = {
            // backgroundColor: "#ffffff",
            color: ["#37A2DA", "#32C5E9", "#67E0E3"],
            series: [{
                name: '业务指标',
                type: 'gauge',
                radius: '100%',
                detail: {
                    formatter: '{value}%',
                    fontSize: 8,
                    offsetCenter: ['0', '70%']
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 5,
                        shadowBlur: 0,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ]
                    }
                },
                axisLabel: {
                    distance: 2,
                    fontSize: 5,
                },
                itemStyle: {
                    borderColor: 'rgba(198, 56, 27, 1)',
                    borderWidth: 2
                },
                splitLine: {
                    length: 9,
                },
                // 指针
                pointer: {
                    length: '100%',
                    width: 3,
                },
                title: {
                    show: false,
                },
                axisTick: {
                    length: 3
                },
                data: [{
                    value: 50,
                    name: '完成率',
                }]

            }]
        };
        myChart.setOption(option_gauge1);
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
        option_gauge1.series[0].data[0].value = gauge1_data;
        myChart.setOption(option_gauge1);
        // 定时任务
        // timer = setInterval(function(){
        //     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        //     console.log("-------------定时任务---------", (Math.random() * 100).toFixed(2) - 0);
        //     myChart.setOption(option);
        // }, 2000);

    },
    // 实例2 参考 https://gallery.echartsjs.com/editor.html?c=xH1vxib94f
    gauge2(gauge2_data) {
        var myChart = echarts.init(document.querySelector('.gauge2'));
        let option_gauge2 = {
            // backgroundColor: "#ffffff",
            color: ["#37A2DA", "#32C5E9", "#67E0E3"],
            series: [{
                name: '业务指标',
                type: 'gauge',
                radius: '100%',
                detail: {
                    formatter: '{value}%',
                    fontSize: 8,
                    offsetCenter: ['0', '70%']
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 5,
                        shadowBlur: 0,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ]
                    }
                },
                axisLabel: {
                    distance: 2,
                    fontSize: 5,
                },
                itemStyle: {
                    borderColor: 'rgba(198, 56, 27, 1)',
                    borderWidth: 2
                },
                splitLine: {
                    length: 9,
                },
                // 指针
                pointer: {
                    length: '100%',
                    width: 3,
                },
                title: {
                    show: false,
                },
                axisTick: {
                    length: 3
                },
                data: [{
                    value: 50,
                    name: '完成率',
                }]

            }]
        };
        myChart.setOption(option_gauge2);
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
        option_gauge2.series[0].data[0].value = gauge2_data;
        myChart.setOption(option_gauge2);
        // 定时任务
        // timer = setInterval(function(){
        //     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        //     console.log("-------------定时任务---------", (Math.random() * 100).toFixed(2) - 0);
        //     myChart.setOption(option);
        // }, 2000);

    },

    line_date() {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.echart_line'));
        let option = {
            tooltip: {
                trigger: 'axis',
                // 鼠标放到坐标轴上触发，双轴显示
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                // series中的数据有name，那么这个就可以省略data
                textStyle: {
                    color: '#4c9bfd', // 图例文字颜色
                    fontSize: 6,
                },
                right: '10%',
                left: '2%',
                top: '5%',
                width: '90%',
                itemWidth: 10,
                itemHeight: 10,

            },

            grid: {
                top: '20%',
                left: 0,
                right: '4%',
                bottom: '3%',
                // containLabel: true,
                containLabel: true, // 包含刻度线的文字在内
                show: true, // 显示边框
                borderColor: '#012f4a', // 边框颜色
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"],
                // 去除x轴的刻度
                axisTick: {
                    show: false
                },
                // x轴文本颜色
                axisLabel: {
                    color: 'rgba(225, 225, 225, .6)',
                    fontSize: '12px',
                },
                // 去除轴线
                axisLine: {
                    show: false
                },
            }],
            yAxis: [{
                type: 'value',
                // 去除x轴的刻度
                axisTick: {
                    show: false
                },
                // x轴文本颜色
                axisLabel: {
                    color: 'rgba(225, 225, 225, .6)',
                    fontSize: '12px',
                },
                // 去除轴线
                axisLine: {
                    show: false
                },
                // y轴分割线
                splitLine: {
                    lineStyle: {
                        color: "#012f4a"
                    }
                }
            }],
            // 2 条折现颜色
            color: ['#57ba196b', '#65dae24a'],
            series: [{
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    // 填充区域--可设置渐变
                    areaStyle: {
                        // 渐变色，只需要复制即可
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1, [{
                                    offset: 0,
                                    color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    },
                    // 把折现改为圆滑
                    smooth: true,
                    // 单独修改 当前线条 修改线的样式
                    lineStyle: {
                        color: '#0184d5',
                        width: 2,
                    },
                    // 设置拐点形状
                    symbol: 'circle',
                    // 设置拐点的大小
                    symbolSize: 8,
                    // 开始不显示拐点，鼠标经过显示
                    showSymbol: false,
                    // 设置拐点的样式
                    itemStyle: {
                        color: '#0184d5',
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    },
                    data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],

                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    // 填充区域--可设置渐变
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1, [{
                                        offset: 0,
                                        color: "rgba(0, 216, 135, 0.4)"
                                    },
                                    {
                                        offset: 0.8,
                                        color: "rgba(0, 216, 135, 0.1)"
                                    }
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)"
                        }

                    },
                    // 设置拐点形状
                    symbol: 'circle',
                    // 设置拐点的大小
                    symbolSize: 12,
                    // 开始不显示拐点，鼠标经过显示
                    showSymbol: false,
                    // 设置拐点的样式
                    itemStyle: {
                        color: 'green',
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    },

                    // 把折现改为圆滑
                    smooth: true,
                    // 单独修改 当前线条 修改线的样式
                    lineStyle: {
                        color: '#00d887',
                        width: 3,
                    },
                    data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20],
                },


            ]
        };

        // 配置给实例化对象
        myChart.setOption(option);
        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
    },
};


// 2、导出这个模块
module.exports = rtm;