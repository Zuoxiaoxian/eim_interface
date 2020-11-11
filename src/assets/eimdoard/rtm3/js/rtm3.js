let rtm3 = {

    create_first_second(gauge_data) {
        var myChart = echarts.init(document.querySelector('.first_second'));
        option = {
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + params[0].value.toLocaleString() + ' <br/>'
                }
            },
            backgroundColor: 'rgb(8,15,86)',
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                // y轴字体文字的颜色
                axisLabel: {
                    color: "rgba(4, 248, 240, 1)"
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: gauge_data.yAxisData
            }],
            series: [{
                name: '',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(57,89,255,1)'
                        }, {
                            offset: 1,
                            color: 'rgb(46,200,207,1)'
                        }]),
                    },
                },
                barWidth: 20,
                data: gauge_data.seriesData
            }]
        };
        console.log(option)
        window.addEventListener('resize', function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        });
        myChart.setOption(option);
        myChart.resize();
    },

    create_box3_left(gauge_data, myChart) {

        var app = {};
        app.title = '极坐标系下的堆叠柱状图';

        option = {
            textStyle: { //图例文字的样式
                color: '#dbdbdb',
                fontSize: 10
            },
            angleAxis: {},
            radiusAxis: {
                type: 'category',
                data: gauge_data.radiusAxisData,
                z: 10
            },
            polar: {},
            series: gauge_data.seriesData,
            legend: {
                show: true,
                textStyle: { //图例文字的样式
                    color: '#dbdbdb',
                    fontSize: 10
                },
                data: gauge_data.legendData
            }
        };
        window.addEventListener('resize', function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        });
        myChart.setOption(option);
        myChart.resize();
    },

    create_box3_right(gauge_data, myChart) {

        var app = {};
        option = null;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                textStyle: { //图例文字的样式
                    color: '#fff',
                    fontSize: 12
                },
                data: gauge_data.legendData
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            textStyle: { //图例文字的样式
                color: '#fff',
                fontSize: 12
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: gauge_data.xAxisData,
            }],
            yAxis: [{
                type: 'value'
            }],
            series: gauge_data.seriesData
        };
        window.addEventListener('resize', function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        });
        myChart.setOption(option);
        myChart.resize();
    },

    //右边折线图
    create_line_chart(gauge_data) {

        var plan_data1 = gauge_data.plan_data1;
        var plan_data2 = gauge_data.plan_data2;
        var plan_xAxis = gauge_data.plan_xAxis;
        var color = ['#F35331', '#2499F8', '#3DF098', '#33B734'];
        plan_chart_1 = echarts.init(document.getElementById('line_chart_1'));
        plan_chart_2 = echarts.init(document.getElementById('line_chart_2'));
        plan_option = {
            xAxis: {
                data: plan_xAxis,
                axisLabel: {
                    textStyle: {
                        color: '#B7E1FF',
                        fontSize: 24
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#09F'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#09F'
                    }
                }
            },
            yAxis: {
                inverse: false,
                splitArea: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    textStyle: {
                        color: '#B7E1FF',
                        fontSize: 24,
                        fontFamily: 'Arial',
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#09F'
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    color: '#FFF',
                    fontSize: 12
                }
            },
            grid: {
                // left: 100
            },
            legend: {
                show: false,
                top: 'bottom',
                textStyle: {
                    color: '#F00',
                    fontSize: 24
                },
                data: gauge_data.legendData
            },
            series: [{
                    name: '计划完成数',
                    type: 'bar',
                    itemStyle: {
                        normal: { color: color[1] },
                        emphasis: { color: color[2] }
                    },
                    barWidth: 12,
                    data: plan_data1
                },
                {
                    name: '实际完成数',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#F90',
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#CCC',
                                    fontSize: 12
                                }
                            },
                            lineStyle: {
                                color: '#F90',
                                width: 4
                            }
                        },
                        emphasis: {
                            color: '#FF0'
                        }
                    },
                    symbolSize: 4,
                    data: plan_data2
                }
            ]
        };

        window.addEventListener('resize', function() {
            this.console.log("重置的屏幕大小！")
            plan_chart_1.resize();
            plan_chart_2.resize();
        });
        plan_chart_1.setOption(plan_option);
        plan_chart_1.resize();
        plan_chart_2.setOption(plan_option);
        plan_chart_2.resize();
    },

    //警告信息
    create_third_first(gauge_data, id) {
        if (!document.getElementById(id)) return;
        var myChart = echarts.init(document.getElementById(id));
        option = {
            title: {
                text: `${gauge_data.title}\n\n${gauge_data.number}`,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize: 12,
                    color: '#ffffff',
                }
            },
            series: [{
                    type: 'pie',
                    startAngle: 270,
                    center: ['50%', '50%'],
                    radius: ['70%', '80%'],
                    hoverAnimation: false,
                    data: [{
                            name: '',
                            value: 100,
                            label: {
                                position: 'center',
                                // formatter: params => {
                                //     return gauge_data.line +'{score|' + gauge_data.number + ' } '
                                // },
                                rich: {
                                    score: {
                                        fontSize: 12,
                                        color: 'white',
                                        align: 'center',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                    }
                                },
                                color: 'white',
                                fontSize: 12
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                                offset: 0,
                                                color: '#2381F6'
                                            },
                                            {
                                                offset: 1,
                                                color: '#00D7E9'
                                            }
                                        ],
                                        global: false
                                    }
                                }
                            }
                        },
                        {
                            name: '',
                            value: 0,
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#000104'
                                }
                            }
                        }
                    ]
                },
                {
                    type: 'pie',
                    startAngle: 200,
                    center: ['50%', '50%'],
                    radius: ['70%', '60%'],
                    hoverAnimation: false,
                    data: [{
                            name: '',
                            value: 15,
                            label: {
                                position: 'center',
                                // formatter: params => {
                                //     return '{score|' + gauge_data.title + ' } '
                                // },
                                rich: {
                                    score: {
                                        fontSize: 12,
                                        color: '#FFFAFA',
                                        align: 'center',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold'
                                    }
                                },
                                color: '#FFFAFA',
                                fontSize: 12
                            },
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 0,
                                        colorStops: [{
                                                offset: 0,
                                                color: 'rgb(166,12,45)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgb(255,0,255)'
                                            }
                                        ],
                                        global: false
                                    }
                                }
                            }
                        },
                        {
                            name: '',
                            value: 10,
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    opacity: 0
                                }
                            }
                        }
                    ]
                }
            ]
        }

        window.addEventListener('resize', function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        });
        myChart.setOption(option);
        myChart.resize();
    },

    //最下层列表图表
    create_right_buttom(gauge_data, myChart) {
        option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '3%',
                top: '10%',
                bottom: '5%',
                containLabel: true
            },
            color: ['#a4d8cc', '#25f3e6'],
            toolbox: {
                show: false,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },

            calculable: true,
            xAxis: [{
                type: 'category',

                axisTick: { show: false },

                boundaryGap: false,
                axisLabel: {
                    color: '#fff',
                    fontSize: '12',
                    // textStyle:{
                    //   color: '#fff',
                    //   fontSize:'12'
                    // },
                    // lineStyle:{
                    //   color:'white',
                    // },
                    // interval: {default: 0},
                    rotate: 50,
                    formatter: function(params) {
                        var newParamsName = ""; // 最终拼接成的字符串
                        var paramsNameNumber = params.length; // 实际标签的个数
                        var provideNumber = 4; // 每行能显示的字的个数
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            /** 循环每一行,p表示行 */
                            var tempStr = "";
                            tempStr = params.substring(0, 4);
                            newParamsName = tempStr + "..."; // 最终拼成的字符串
                        } else {
                            // 将旧标签的值赋给新标签
                            newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName
                    }

                },
                data: gauge_data.xAxisData
            }],
            yAxis: {

                type: 'value',
                axisLabel: {
                    // textStyle: {
                    //   color: '#fff',
                    //   fontSize:'12',
                    // }
                    color: '#fff',
                    fontSize: '12',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(160,160,160,0.3)',
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(160,160,160,0.3)',
                    }
                },

            },
            series: [{
                // name:'简易程序案件数',
                type: 'line',
                areaStyle: {

                    normal: {
                        type: 'default',
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
                            offset: 0,
                            color: '#25f3e6'
                        }, {
                            offset: 1,
                            color: '#0089ff'
                        }], false)
                    }
                },
                smooth: true,
                itemStyle: {
                    normal: { areaStyle: { type: 'default' } }
                },
                data: gauge_data.seriesData
            }]
        };
        window.addEventListener("resize", function() {
            myChart.resize();
        });
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart.resize();
    }
}






// 2、导出这个模块
module.exports = rtm3;