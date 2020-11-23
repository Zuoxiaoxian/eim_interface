const img = 'data:image/png;base64,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';

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
            // legend: {
            //     orient: 'vertical',
            //     right: 40,
            //     top: 10,
            //     itemGap: 10,
            //     textStyle: {
            //         color: '#',
            //         fontSize: 12,
            //     },
            // },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 10,
                        width: 4,
                        height: 4,
                        padding: [3, 3, 0, -16],
                        shadowColor: '#1c1b3a',
                        shadowBlur: 1,
                        shadowOffsetX: '0',
                        shadowOffsetY: '2',
                    },
                    a: {
                        padding: [-35, 15, -20, 5],
                        width: 10,
                        height: 10,
                        fontSize: 20,
                    }
                },
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
                center: ['50%', '50%'],
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
                top: '1%',
                // buttom: '1%',
                "borderWidth": 0,
                textStyle: {
                    color: "#fff"
                },
                height: '80%'
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
            legend: {
                show: true,
                textStyle: {
                    color: 'white',
                    fontSize: 20
                },
            },
            grid: {
                top: '2%',
                left: '5%',
                right: '5%',
                bottom: '2%',
                height: '80%',
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
                    name: data.title_1,
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
                            shadowBlur: 10
                        }
                    },
                    data: data.data_1,
                },
                {
                    name: data.title_2,
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
                            shadowBlur: 10
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


        let option_g_p_3 = {
            series: [{
                type: "gauge",
                center: ["50%", "65%"],
                radius: "85%",
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
                    length: 10,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisLabel: {
                    distance: 15,
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
                radius: "80%",
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
                radius: "80%",
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
                    fontSize: 14,
                    offsetCenter: ['0%', '60%']
                },
                data: [{
                    value: data[1].value
                }]
            }, {
                type: "gauge",
                center: ["22%", "60%"],
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
                    length: 5,
                    splitNumber: 8
                },
                splitLine: {
                    show: true,
                    length: 10,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisLabel: {
                    distance: 15,
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
                center: ["22%", "60%"],
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
                center: ["22%", "60%"],
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
                    fontSize: 14,
                    offsetCenter: ['0%', '90%']
                },
                data: [{
                    value: data[0].value
                }]
            }, {
                type: "gauge",
                center: ["80%", "60%"],
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
                    length: 10,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisLabel: {
                    distance: 5,
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
                center: ["80%", "60%"],
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
                center: ["80%", "60%"],
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
                    fontSize: 14,
                    offsetCenter: ['0%', '90%']
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
                range: [0, 100],
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
                            radius: '88%', // 1行2个
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
                                length: 5,
                                splitNumber: 10
                            },
                            splitLine: {
                                show: true,
                                length: 5,
                                lineStyle: {
                                    color: highlight,
                                }
                            },
                            axisLabel: {
                                distance: 10,
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
                            radius: '88%',
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
                            radius: '88%',
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

    },
    create_device_circular(gauge_data, mychart) {
        var trafficWay = [{ value: 170 / 4 }, { value: 170 / 4 }, { value: 170 / 4 }, { value: 170 / 4 }];
        // sum = 0;
        var data = [];
        var color = ['rgb(74,181,107)', '#faa755', '#006ced', '#d71345', ]
        for (var i = 0; i < trafficWay.length; i++) {
            data.push({
                value: trafficWay[i].value,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 20,
                        borderColor: color[i],
                        shadowColor: color[i]
                    }
                }
            }, {
                value: 2,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            });
        }
        var seriesOption = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [70, 80],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        length: 30,
                        length2: 100,
                        show: false,
                        color: '#00ffff'
                    }
                }
            },
            data: data
        }];
        let option_p = {
            // backgroundColor: '#0A2E5D',
            color: color,
            title: {
                text: gauge_data.title + '\n' + gauge_data.message,
                top: '40%',
                textAlign: "center",
                left: "48.5%",
                textStyle: {
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: '400'
                }
            },
            graphic: {
                elements: [{
                    type: "image",
                    z: 3,
                    style: {
                        image: img,
                        width: 120,
                        height: 120
                    },
                    left: 'center',
                    top: 'center',
                    position: [100, 100]
                }]
            },
            tooltip: {
                show: false,
                trigger: "item",
                formatter: function(data_) {
                    return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${data_.data.itemStyle.shadowColor};"></span> ${((data_.value / 170)*100).toFixed(2)}%`;
                },
            },

            toolbox: {
                show: false
            },
            series: seriesOption
        };
        // console.log(JSON.stringify(option_p))
        window.onresize = function() {
            mychart.resize();
        }
        mychart.setOption(option_p);
        mychart.resize();
    }
}

module.exports = staic;