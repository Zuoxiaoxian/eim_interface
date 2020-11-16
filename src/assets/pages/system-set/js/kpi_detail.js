// let left_one_chart;
// let right_one_chart;
let kpi_detail = {

    // left_one 设备时间统计 参考： https://gallery.echartsjs.com/editor.html?c=xHyoiv-D-e
    left_one(element, afterdata) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));


        // 配置
        var option = {
                // backgroundColor: "#344b58",
                backgroundColor: "#ffffff",

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    // formatter: '{b0}: {c0}<br />{b1}: {c1}'
                },
                "grid": {
                    "borderWidth": 0,
                    "top": 20,
                    "bottom": 70,
                    "right": 10,
                    textStyle: {
                        color: "#fff"
                    }
                },

                "legend": {
                    //x: '4%',
                    bottom: "4%",
                    textStyle: {
                        color: '#90979c',
                    },
                    // "data": ['running', 'stop', 'placeout', "warning"]
                    "data": ['运行', '停止', '非占位', "故障"]
                },

                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                        "rotate": 20
                    },
                    "data": afterdata.xData,
                }],
                "yAxis": [{
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                        "formatter": '{value} h'
                    },
                    "splitArea": {
                        "show": false
                    },

                }],

                "series": [{
                        // "name": "running",
                        "name": "运行",
                        "type": "bar",
                        "stack": "总量",
                        "barMaxWidth": 35,
                        "barGap": "10%",
                        "itemStyle": {
                            "normal": {
                                "color": '#9fe6b8',
                                "label": {
                                    "show": true,
                                    "textStyle": {
                                        "color": "#fff"
                                    },
                                    "position": "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": afterdata.running,
                    },

                    {
                        // "name": "stop",
                        "name": "停止",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": '#fb7293',
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": afterdata.stop
                    },
                    {
                        // "name": "placeout",
                        "name": "非占位",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": '#37a2da',
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": afterdata.placeon
                    },
                    {
                        // "name": "warning",
                        "name": "故障",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": '#ffdb5c',
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": afterdata.warning
                    }
                ]
            }
            // 配置给实例化对象
        mychart.setOption(option);

        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
    },

    // right_one  运行/停止/故障/非占位 百分比
    // 参考 https://gallery.echartsjs.com/editor.html?c=xBjZTmZvaA
    right_one(element, afterdatas) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));

        // 配置
        var option = {

            //color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
            color: ['#37a2da', '#9fe6b8', '#ffdb5c', '#fb7293'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                show: true,

            },
            legend: {
                type: "plain",
                orient: 'vertical',
                left: 0,
                align: 'left',
                top: 'bottom',
                textStyle: {
                    color: '#8C8C8C'
                },
            },
            series: [{
                name: '状态百分比',
                type: 'pie',
                radius: [0, 150],
                data: afterdatas
                    // data:[
                    //     {value:20, name:'placeout'},
                    //     {value:25, name:'runing'},
                    //     {value:25, name:'warning'},
                    //     {value:35, name:'stop'},
                    // ]
            }]
        };
        // 配置给实例化对象
        mychart.setOption(option);

        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }


    },

    // left_two 月份运行时间
    left_two(element, afterdatas) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        // 配置
        var option = {

            // backgroundColor: "#041730",
            tooltip: {
                trigger: 'axis',
                // formatter: "{b} : {c}",
                formatter: function(params, encode, callback) {
                    return `${params[0]["name"]}:${params[0]["value"] - 0.5}`;
                },
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            "grid": {
                "borderWidth": 0,
                "top": 20,
                "bottom": 40,
                "right": 10,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: {
                data: afterdatas.xData,
                //坐标轴
                axisLine: {

                    lineStyle: {
                        color: '#90979c'
                    }
                },
                axisTick: {
                    show: false
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    // textStyle: {
                    //     color: '#fff',
                    // }
                }
            },
            yAxis: {
                //坐标轴
                axisLine: {
                    show: true
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    "formatter": '{value} h'
                        // textStyle: {
                        //     color: '#fff',
                        // }
                },
                axisTick: {
                    show: false
                },
                //分格线
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#4784e8'
                    }
                }
            },
            series: [{
                name: 'a',
                tooltip: {
                    show: false
                },
                type: 'bar',
                barWidth: 24.5,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            // color: "#0B4EC3" // 0% 处的颜色
                            color: '#5e886d'
                        }, {
                            offset: 0.6,
                            // color: "#138CEB" // 60% 处的颜色
                            color: "#7baf8d"
                        }, {
                            offset: 1,
                            // color: "#17AAFE" // 100% 处的颜色
                            color: "#a0deb5"
                        }], false)
                    }
                },
                data: afterdatas.yData,
                barGap: 0
            }, {
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            // color: "#09337C" // 0% 处的颜色
                            color: '#8fd0a6'
                        }, {
                            offset: 0.6,
                            // color: "#0761C0" // 60% 处的颜色
                            color: "#9FE6B8"
                        }, {
                            offset: 1,
                            // color: "#0575DE" // 100% 处的颜色
                            color: "#a8f1c2"
                        }], false)
                    }
                },
                barGap: 0,
                data: afterdatas.yData2
            }, {
                name: 'b',
                tooltip: {
                    show: false
                },
                type: 'pictorialBar',
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#508261',
                    color: '#557d63'
                },
                symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
                symbolSize: ['30', '12'],
                symbolOffset: ['0', '-11'],
                //symbolRotate: -5,
                symbolPosition: 'end',
                data: afterdatas.yData,
                z: 3
            }]
        }

        // 配置给实例化对象
        mychart.setOption(option);

        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
    },

    // right_two 年份运行时间
    right_two(element, afterdatas) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        // 配置
        var option = {

            // backgroundColor: "#041730",
            tooltip: {
                trigger: 'axis',
                // formatter: "{b} : {c}",
                formatter: function(params, encode, callback) {
                    return `${params[0]["name"]}:${params[0]["value"] - 0.5}`;
                },

                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            "grid": {
                "borderWidth": 0,
                "top": 20,
                "bottom": 40,
                "right": 10,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: {
                data: afterdatas.xData,
                //坐标轴
                axisLine: {

                    lineStyle: {
                        color: '#90979c'
                    }
                },
                axisTick: {
                    show: false
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    "rotate": 20
                        // textStyle: {
                        //     color: '#fff',
                        // }
                }
            },
            yAxis: {
                //坐标轴
                axisLine: {
                    show: true
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    "formatter": '{value} h'
                        // textStyle: {
                        //     color: '#fff',
                        // }
                },
                axisTick: {
                    show: false
                },
                //分格线
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#4784e8'
                    }
                }
            },
            series: [{
                name: 'a',
                tooltip: {
                    show: false
                },
                type: 'bar',
                barWidth: 24.5,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            // color: "#0B4EC3" // 0% 处的颜色
                            color: '#5e886d'
                        }, {
                            offset: 0.6,
                            // color: "#138CEB" // 60% 处的颜色
                            color: "#7baf8d"
                        }, {
                            offset: 1,
                            // color: "#17AAFE" // 100% 处的颜色
                            color: "#a0deb5"
                        }], false)
                    }
                },
                data: afterdatas.yData,
                barGap: 0
            }, {
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            // color: "#09337C" // 0% 处的颜色
                            color: '#8fd0a6'
                        }, {
                            offset: 0.6,
                            // color: "#0761C0" // 60% 处的颜色
                            color: "#9FE6B8"
                        }, {
                            offset: 1,
                            // color: "#0575DE" // 100% 处的颜色
                            color: "#a8f1c2"
                        }], false)
                    }
                },
                barGap: 0,
                data: afterdatas.yData2
            }, {
                name: 'b',
                tooltip: {
                    show: false
                },
                type: 'pictorialBar',
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#508261',
                    color: '#557d63'
                },
                symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
                symbolSize: ['30', '12'],
                symbolOffset: ['0', '-11'],
                //symbolRotate: -5,
                symbolPosition: 'end',
                data: afterdatas.yData,
                z: 3
            }]
        }

        // 配置给实例化对象
        mychart.setOption(option);

        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
    },

    // 这是 重置echart
    resize() {
        console.log("这是 重置echart");
        left_one_chart.resize();
        right_one_chart.resize();
    }
};

module.exports = kpi_detail;