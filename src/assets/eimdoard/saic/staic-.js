let staic = {
    create_pie(data, mychart) {
        let option_pie_1 = {
            color: data.color,
            tooltip: {
                trigger: 'item',
                formatter: function(f) {
                    return data.data[f.dataIndex].name + '<br/>' + data.data[f.dataIndex].value
                },
                textStyle: {
                    fontSize: 16,
                },
            },
            legend: {
                orient: 'vertical',
                right: 40,
                top: 10,
                itemGap: 10,
                textStyle: {
                    color: '#',
                    fontSize: 12,
                },
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 100,
                        width: 0,
                        padding: [3, 3, 0, -16],
                        shadowColor: '#1c1b3a',
                        shadowBlur: 1,
                        shadowOffsetX: '0',
                        shadowOffsetY: '2',
                    },
                    a: {
                        padding: [-35, 15, -20, 5],
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 0,
                    length2: 0,
                    lineStyle: {
                        width: 1,
                    }
                }
            },
            series: [{
                name: 'TITLE',
                type: 'pie',
                clockwise: false,
                startAngle: 90,
                radius: '60%',
                center: ['39%', '55%'],
                hoverAnimation: false,
                roseType: 'radius', //area
                data: data.data,
                itemStyle: {
                    normal: {
                        borderColor: '#273454',
                    },
                },
                label: {
                    show: true,
                },

            }],
        }
        mychart.setOption(option_pie_1);
        mychart.resize();
    },
    create_line_bar(data, mychart) {
        var xData_month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ]

        let option_l_b = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                    textStyle: {
                        color: "#fff"
                    }

                },
            },
            grid: {
                top: '3%',
                buttom: '35',
                "borderWidth": 0,
                textStyle: {
                    color: "#fff"
                }
            },
            calculable: true,
            xAxis: [{
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.5)'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 12
                },
                data: xData_month,
            }],
            yAxis: [{
                type: "value",
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 12

                },
                splitArea: {
                    show: false
                },

            }],
            series: [{
                    name: "完成",
                    type: "bar",
                    stack: "总量",
                    barMaxWidth: 20,
                    barGap: "10%",
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(35, 157, 250, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(35, 157, 250, 0)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: data.ready,
                },

                {
                    name: "运行",
                    type: "bar",
                    stack: "总量",
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(35, 250, 187, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(35, 250, 187, 0)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            },
                            barBorderRadius: 0
                        }
                    },
                    data: data.move
                }, {
                    name: "利用率",
                    type: "line",
                    symbolSize: 10,
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 196, 53, 1)',
                            barBorderRadius: 0,
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(255, 67, 2, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 196, 53, 1)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: data.utilizationRate
                },
            ]
        }
        mychart.setOption(option_l_b);
        mychart.resize();
    },
    create_category(data, mychart) {
        let option_cate = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0, 255, 233,0)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(255, 255, 255,1)',
                            }, {
                                offset: 1,
                                color: 'rgba(0, 255, 233,0)'
                            }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '15%',
                left: '5%',
                right: '5%',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true
                },
                splitArea: {
                    // show: true,
                    color: '#f00',
                    lineStyle: {
                        color: '#f00'
                    },
                },
                axisLabel: {
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                data: data.xData,

            }],

            yAxis: [{
                type: 'value',
                min: 0,
                // max: 140,
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    margin: 20,
                    textStyle: {
                        color: '#d1e6eb',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                    name: '',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 25,
                    lineStyle: {
                        normal: {
                            color: "#6c50f3",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#6c50f3',
                        }
                    },
                    itemStyle: {
                        color: "#6c50f3",
                        borderColor: "#fff",
                        borderWidth: 3,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    tooltip: {
                        show: false
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(108,80,243,0)'
                                }
                            ], false),
                            shadowColor: 'rgba(108,80,243, 0.9)',
                            shadowBlur: 20
                        }
                    },
                    data: data.data_1,
                },
                {
                    name: '',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 25,
                    lineStyle: {
                        normal: {
                            color: "#00ca95",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#00ca95',
                        }
                    },

                    itemStyle: {
                        color: "#00ca95",
                        borderColor: "#fff",
                        borderWidth: 3,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    tooltip: {
                        show: false
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,202,149,0.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0,202,149,0)'
                                }
                            ], false),
                            shadowColor: 'rgba(0,202,149, 0.9)',
                            shadowBlur: 20
                        }
                    },
                    data: data.data_2,
                },
            ]
        };
        mychart.setOption(option_cate);
        mychart.resize();

    },
    //仪表盘三个
    create_gauge_pie_3(data, mychart) {


        option_g_p_3 = {
            series: [{
                type: "gauge",
                center: ["50%", "65%"],
                radius: "90%",
                splitNumber: data[1].splitNumber,
                min: 0,
                max: data[1].max,
                startAngle: 200,
                endAngle: -20,
                clockwise: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: data[1].YS
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#1b8586",
                        width: 1
                    },
                    length: -5,
                    splitNumber: 8
                },
                splitLine: {
                    show: true,
                    length: -10,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisLabel: {
                    distance: -15,
                    textStyle: {
                        color: "white",
                        fontSize: "8"
                    }
                },
                pointer: {
                    show: 0
                },
                detail: {
                    show: false
                },
                data: []
            }, {
                startAngle: 200,
                endAngle: -20,
                type: "gauge",
                center: ["50%", "65%"],
                radius: "85%",
                min: 0,
                max: data[1].max,
                splitNumber: 0,
                axisLine: {
                    lineStyle: {
                        color: data[1].YS,
                        width: 2
                    }
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                }
            }, {
                type: "gauge",
                startAngle: 200,
                endAngle: -20,
                radius: "85%",
                center: ["50%", "65%"],
                min: 0,
                max: data[1].max,
                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 10,
                        shadowBlur: 0,
                        color: data[1].YS
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    length: 20
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: true
                },
                detail: {
                    formatter: data[1].value + "\n" + data[1].title,
                    fontSize: 14
                },
                data: [{
                    value: data[1].value
                }]
            }, {
                type: "gauge",
                center: ["28%", "60%"],
                radius: "75%",
                splitNumber: data[0].splitNumber,
                min: 0,
                max: data[0].max,
                endAngle: 45,
                clockwise: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: data[0].YS
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#1b8586",
                        width: 1
                    },
                    length: -5,
                    splitNumber: 8
                },
                splitLine: {
                    show: true,
                    length: -10,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisLabel: {
                    distance: -15,
                    textStyle: {
                        color: "white",
                        fontSize: "8"
                    }
                },
                pointer: {
                    show: 0
                },
                detail: {
                    show: false,
                    textStyle: {
                        color: "#f00",
                        fontSize: 14
                    }
                },
                data: []
            }, {
                type: "gauge",
                center: ["28%", "60%"],
                radius: "70%",
                min: 0,
                max: data[0].max,
                endAngle: 45,
                splitNumber: 0,
                axisLine: {
                    lineStyle: {
                        color: data[0].YS,
                        width: 2
                    }
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    length: 10,
                    lineStyle: {
                        width: 0,
                        color: "#444"
                    }
                },
                detail: {
                    show: false
                }
            }, {
                type: "gauge",
                endAngle: 45,
                radius: "65%",
                center: ["28%", "60%"],
                min: 0,
                max: data[0].max,
                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 10,
                        shadowBlur: 0,
                        color: data[0].YS
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    length: 20
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: true,
                    width: 5
                },
                detail: {
                    formatter: data[0].value + "\n" + data[0].title,
                    fontSize: 14
                },
                data: [{
                    value: data[0].value
                }]
            }, {
                type: "gauge",
                center: ["72%", "60%"],
                radius: "65%",
                splitNumber: data[2].splitNumber,
                min: 0,
                max: data[2].max,
                startAngle: 140,
                endAngle: -45,
                clockwise: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: data[2].YS
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#1b8586",
                        width: 1
                    },
                    length: -5,
                    splitNumber: 8
                },
                splitLine: {
                    show: true,
                    length: -10,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisLabel: {
                    distance: -15,
                    textStyle: {
                        color: "white",
                        fontSize: "8"
                    }
                },
                pointer: {
                    show: 0
                },
                detail: {
                    show: false
                },
                data: []
            }, {
                type: "gauge",
                center: ["72%", "60%"],
                radius: "57%",
                min: 0,
                max: data[2].max,
                startAngle: 140,
                endAngle: -45,
                splitNumber: 0,
                axisLine: {
                    lineStyle: {
                        color: data[2].YS,
                        width: 2
                    }
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                pointer: {
                    color: "#666666",
                    width: 0,
                    length: 230
                },
                detail: {
                    show: false
                }
            }, {
                type: "gauge",
                startAngle: 140,
                endAngle: -45,
                radius: "65%",
                center: ["72%", "60%"],
                min: 0,
                max: data[2].max,
                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 10,
                        shadowBlur: 0,
                        color: data[2].YS
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    length: 20
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: true,
                    width: 5
                },
                detail: {
                    formatter: data[2].value + "\n" + data[2].title,
                    fontSize: 14
                },
                data: [{
                    value: data[2].value
                }]
            }]
        }
        mychart.setOption(option_g_p_3);
        mychart.resize();

    },
    //仪表盘两个
    create_gauage_pie_2(data, mychart) {

        var placeHolderStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                color: "rgba(0,0,0,0)",
                borderWidth: 0
            },
            emphasis: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0
            }
        };

        //非本人所创,借鉴各位前辈项目改善完成,仅供参考
        var highlight = '#03b7c9';

        var demoData = [{
                name: data[0].title,
                value: data[0].value,
                unit: data[0].unit,
                pos: ['25%', '50%'],
                range: [-40, 100],
                YS: [
                    [0.4, '#119eff'],
                    [0.5, '#30da74'],
                    [1, '#f3390d']
                ]
            },
            {
                name: data[1].title,
                value: data[1].value,
                unit: data[1].unit,
                pos: ['75%', '50%'],
                range: [0, 100],
                splitNum: 10,
                YS: [
                    [0.4, '#119eff'],
                    [0.5, '#30da74'],
                    [1, '#f3390d']
                ]
            }
        ];

        let option_g_p_2 = {
            series: (function() {
                var result = [];

                demoData.forEach((item) => {
                    result.push(
                        // 外围刻度
                        {
                            type: 'gauge',
                            center: item.pos,
                            radius: '50%', // 1行2个
                            splitNumber: item.splitNum || 10,
                            min: item.range[0],
                            max: item.range[1],
                            startAngle: 225,
                            endAngle: -45,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 0,
                                    color: [
                                        [1, highlight]
                                    ]
                                }
                            },
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: highlight,
                                    width: 1
                                },
                                length: -5,
                                splitNumber: 10
                            },
                            splitLine: {
                                show: true,
                                length: -10,
                                lineStyle: {
                                    color: highlight,
                                }
                            },
                            axisLabel: {
                                distance: -30,
                                textStyle: {
                                    color: highlight,
                                    fontSize: '18',

                                }
                            },
                            pointer: {
                                show: 0
                            },
                            detail: {
                                show: 0
                            }
                        }, {
                            name: '速度',
                            type: 'gauge',
                            center: item.pos,
                            splitNumber: item.splitNum || 10,
                            min: item.range[0],
                            max: item.range[1],
                            radius: '70%',
                            axisLine: { // 坐标轴线
                                show: false,
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: item.YS,
                                    shadowColor: "#ccc",
                                    shadowBlur: 12,
                                    width: 0
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            axisTick: { // 坐标轴小标记
                                // show: false,
                                length: 12, // 属性length控制线长
                                lineStyle: { // 属性lineStyle控制线条样式
                                    color: 'auto',
                                    width: 2
                                }
                            },
                            splitLine: { // 分隔线
                                show: false,
                                length: 12, // 属性length控制线长
                                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            title: {
                                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    fontSize: 12,
                                    fontStyle: 'italic'
                                }
                            },
                            detail: {
                                show: true,
                                offsetCenter: [0, '100%'],
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: [
                                    '{value} ' + (item.unit || ''),
                                    '{name|' + item.name + '}'
                                ].join('\n'),
                                rich: {
                                    name: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#4be4de'
                                    }
                                }
                            },
                            data: [{
                                value: item.value
                            }],
                            pointer: {
                                width: 5
                            }
                        },
                        // 内侧指针、数值显示
                        {
                            name: item.name,
                            type: 'gauge',
                            center: item.pos,
                            radius: '40%',
                            startAngle: 225,
                            endAngle: -45,
                            min: item.range[0],
                            max: item.range[1],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 16,
                                    color: [
                                        [1, 'rgba(75,228,255,.1)']
                                    ]
                                }
                            },
                            axisTick: {
                                show: 0,
                            },
                            splitLine: {
                                show: 0,
                            },
                            axisLabel: {
                                show: 0
                            },
                            pointer: {
                                show: true,
                                length: '90%',
                                width: 3,
                            },
                            itemStyle: { //表盘指针的颜色
                                color: 'rgba(255, 153, 0, 0.31)',
                                borderColor: '#ff9900',
                                borderWidth: 1
                            },
                            detail: {
                                show: false,
                                offsetCenter: [0, '100%'],
                                textStyle: {
                                    fontSize: 20,
                                    color: '#00eff2'
                                },
                                formatter: [
                                    '{value} ' + (item.unit || ''),
                                    '{name|' + item.name + '}'
                                ].join('\n'),
                                rich: {
                                    name: {
                                        fontSize: 14,
                                        lineHeight: 30,
                                        color: '#00eff2'
                                    }
                                }
                            },

                            data: [{
                                value: item.value
                            }]
                        }, {
                            type: 'pie',
                            radius: [item.range[0], '50%'],
                            center: [item.pos[0], item.pos[1]],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 1,
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [{
                                    value: 100,
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.RadialGradient(.5, .5, .8, [{
                                                    offset: 0,
                                                    color: item.dangerous ? 'red' : 'rgba(1,1,1,0)'
                                                },
                                                {
                                                    offset: .5,
                                                    color: item.dangerous ? 'red' : 'rgba(1,1,1,0)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: item.dangerous ? 'red' : 'rgba(1,1,1,0)'
                                                }
                                            ], false)
                                        }
                                    },
                                }, {
                                    value: 33,
                                    itemStyle: placeHolderStyle,
                                },

                            ]
                        }
                    );
                });
                return result;
            })()
        };
        mychart.setOption(option_g_p_2);
        mychart.resize();

    }
}

module.exports = staic;