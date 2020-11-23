const img = 'data:image/png;base64,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';

let equipment_four_road = {
    //设备状态
    create_device_status(data, myChart, config) {
        if (!data) {
            myChart.resize();
            return;
        }
        var xData = data.xData,
            borderData = [],
            legend = data.title_arr,
            borderHeight = 0,
            normalColor = "rgba(255,255,255,0.5)";
        let seriesData = [];
        this.create_device_status_fun(data, seriesData, legend, borderData, borderHeight);
        // console.log(seriesData);
        let option_s = this.getoption(xData, borderData, legend, borderHeight, normalColor, seriesData);

        window.onresize = function() {
            myChart.setOption(option_s, config ? config : {});
        }
        myChart.setOption(option_s, config ? config : {});
        if (!config) myChart.resize();
    },
    //设备状态
    create_device_status_real(data, myChart, config) {
        var xData = data.xData,
            borderData = [],
            legend = data.title_arr,
            borderHeight = 0,
            normalColor = "rgba(255,255,255,0.5)";
        //   var fontSize = 20;
        let seriesData = [];
        this.create_device_status_fun(data, seriesData, legend, borderData, borderHeight);
        if (seriesData.length == 0)
            seriesData.push({ name: '', type: "line", data: [] });
        // console.log(seriesData);
        let option_q = this.getoption(xData, borderData, legend, borderHeight, normalColor, seriesData);
        // console.log(JSON.stringify(option_s))
        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(option_q);
        myChart.resize();
    },
    getoption(xData, borderData, legend, borderHeight, normalColor, seriesData) {
        return {
            // backgroundColor: "#000",
            grid: {
                left: "3%",
                top: "16%",
                right: "3%",
                bottom: 0,
                containLabel: true
            },
            legend: {
                show: false,
                icon: "rect",
                itemWidth: 20,
                itemHeight: 3,
                right: "15%",
                top: "0%",
                textStyle: {
                    color: "#fff"
                },
                data: legend
            },
            tooltip: {
                trigger: "axis",
                formatter: function(params) {
                    let str = "";
                    for (let i = 0; i < params.length; i++) {
                        if (params[i].seriesName !== "") {
                            str +=
                                params[i].name +
                                ":" +
                                params[i].seriesName +
                                params[i].value +
                                "<br/>";
                        }
                    }
                    return str;
                }
            },
            xAxis: [{
                type: "category",
                data: xData,
                axisPointer: {
                    type: "shadow"
                },
                axisLabel: {
                    textStyle: {
                        color: normalColor,
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: normalColor
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    width: 0.08,
                    lineStyle: {
                        type: "solid",
                        color: "white"
                    }
                }
            }],
            dataZoom: [{
                    show: false,
                    realtime: true,
                    start: 100 - ((10 / (seriesData[0].data.length)) * 100),
                    end: 100,
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 100 - ((10 / (seriesData[0].data.length)) * 100),
                    end: 100,
                }
            ],
            yAxis: [{
                    type: "value",
                    name: "%",
                    nameTextStyle: {
                        color: normalColor,
                        fontSize: 12
                    },
                    // max: 100,
                    axisLabel: {
                        formatter: "{value}",
                        textStyle: {
                            color: normalColor,
                            fontSize: 12
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: normalColor
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            type: "dashed",
                            color: normalColor
                        }
                    }
                },
                {
                    type: "value",
                    name: "%",
                    nameTextStyle: {
                        color: normalColor,
                        fontSize: 12
                    },
                    // min: -100,
                    // max: 100,
                    axisLabel: {
                        formatter: "{value}",
                        textStyle: {
                            color: normalColor,
                            fontSize: 12
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: normalColor
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "rgba(255,255,255,0.2)"
                        }
                    }
                }
            ],
            series: seriesData
        };
    },



    //设备状态表
    create_device_circular(gauge_data, myChart) {
        var trafficWay = [],
            sum = 0;
        if (gauge_data.value) {
            gauge_data.value.forEach(m => {
                sum += m.value ? m.value : 0
            });
            trafficWay = gauge_data.value.map(m => ({
                value: m.value * (170 / sum)
            }));
        } else {
            trafficWay = [{ value: 170 / 4 }, { value: 170 / 4 }, { value: 170 / 4 }, { value: 170 / 4 }];
            sum = 0;
        }



        var data = [];
        var color = ['rgb(74,181,107)', '#faa755', '#006ced', '#d71345', ]
        for (let i = 0; i < trafficWay.length; i++) {
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
            radius: [30, 40],
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
                top: '43%',
                textAlign: "center",
                left: "48.5%",
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: '400'
                }
            },
            graphic: {
                elements: [{
                    type: "image",
                    z: 3,
                    style: {
                        image: img,
                        width: 60,
                        height: 60
                    },
                    left: 'center',
                    top: 'center',
                    position: [100, 100]
                }]
            },
            tooltip: {
                show: true,
                trigger: "item",
                formatter: function(data_dd) {
                    return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${data_dd.data.itemStyle.shadowColor};"></span> ${((data_dd.value / 170)*100).toFixed(2)}%`;
                },
            },

            toolbox: {
                show: false
            },
            series: seriesOption
        };
        if (!gauge_data.value) option_p.tooltip.show = false;
        // console.log(JSON.stringify(option_p))
        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(option_p);
        myChart.resize();
    },
    //日志 警告
    create_warning_chart(data, myChart) {
        let option_o = {
            // backgroundColor: '#001120',
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(value) {
                    console.log(value)
                    let str = '',
                        i = 0;
                    if (value.length == 2) {
                        i = value.findIndex(f => f.seriesIndex != '1');
                        str += value[i].axisValue + '<br />' + value[i].marker + ' ' + value[i].seriesName + ' ' + value[i].value
                    } else if (value.length >= 3)
                        str += value[0].axisValue + '<br />' + value[0].marker + ' ' + value[0].seriesName + ' ' + value[0].value +
                        '<br />' + value[2].marker + ' ' + value[2].seriesName + ' ' + value[2].value;
                    return str
                }
            },
            legend: {
                // data:['一级警告','二级警告'],
                show: true,
                data: data.title,
                textStyle: {
                    color: 'rgba(55,255,249,1)'
                },
                top: "0%",
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                height: '80%'
            },
            xAxis: [{
                type: data.xAxis ? 'category' : 'value',
                data: data.xAxis,
                // data : ['周一','周二','周三','周四','周五','周六','周日'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(55,255,249,1)',
                    }
                },
                axisLabel: {
                    color: 'rgba(55,255,249,1)'
                }
            }],
            yAxis: [{
                type: data.yAxis ? 'category' : 'value',
                data: data.yAxis ? data.yAxis : [],
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(55,255,249,1)',
                    }
                },
                lineHeight: 100,
                inverse: !!data.yAxis, //x y轴颠倒
            }],
            series: [{
                    name: data.title[0],
                    type: 'bar',
                    barWidth: data.yAxis ? 5 : 10,
                    itemStyle: {
                        barBorderRadius: 20,
                        color: 'rgb(44,197,255)'
                    },
                    data: data.firstData
                },
                { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20 
                    type: 'bar',
                    barWidth: data.yAxis ? 5 : 10,
                    barGap: '-100%',
                    stack: data.title[1],
                    itemStyle: {
                        color: 'rgb(1,1,1,0)',
                    },
                    data: data.firstData
                },
                {
                    name: data.title[1],
                    type: 'bar',
                    barWidth: data.yAxis ? 5 : 10,
                    barGap: '-100%',
                    stack: data.title[1],
                    itemStyle: {
                        barBorderRadius: 20,
                        color: 'rgb(230,90,0)',
                    },
                    data: data.secondData
                }

            ]
        };
        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(option_o);
        myChart.resize();
    },
    //实时温湿度
    create_real_temperature(gauge_data, myChart) {
        let angle = 0; //角度，用来做简单的动画效果的
        let value = gauge_data.value;
        let optionInterval = {
            // backgroundColor:"#061740",
            title: {
                text: '{a|' + value + '}{c|%}',
                x: 'center',
                y: 'center',
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 12,
                            color: '#29EEF3'
                        },

                        c: {
                            fontSize: 12,
                            color: '#ffffff',
                            // padding: [5,0]
                        }
                    }
                }
            },
            legend: {
                type: "plain",
                orient: "vertical",
                right: 0,
                top: "10%",
                align: "auto",
                data: [{
                    name: '涨价后没吃过',
                    icon: "circle"
                }, {
                    name: '天天吃',
                    icon: "circle"
                }, {
                    name: '三五天吃一次',
                    icon: "circle"
                }, {
                    name: '半个月吃一次',
                    icon: "circle"
                }],
                textStyle: {
                    color: "white",
                    fontSize: 16,
                    padding: [10, 1, 10, 0]
                },
                selectedMode: false
            },
            series: [{
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function(params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                                startAngle: (0 + angle) * Math.PI / 180,
                                endAngle: (90 + angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                }, {
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function(params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                                startAngle: (180 + angle) * Math.PI / 180,
                                endAngle: (270 + angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                }, {
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function(params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.9,
                                startAngle: (270 + -angle) * Math.PI / 180,
                                endAngle: (40 + -angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                }, {
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function(params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.9,
                                startAngle: (90 + -angle) * Math.PI / 180,
                                endAngle: (220 + -angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                }, {
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function(params, api) {
                        let x0 = api.getWidth() / 2;
                        let y0 = api.getHeight() / 2;
                        let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.9;
                        let point = getCirlPoint(x0, y0, r, (90 + -angle))
                        return {
                            type: 'circle',
                            shape: {
                                cx: point.x,
                                cy: point.y,
                                r: 4
                            },
                            style: {
                                stroke: "#0CD3DB", //粉
                                fill: "#0CD3DB"
                            },
                            silent: true
                        };
                    },
                    data: [0]
                }, {
                    name: "ring5", //绿点
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function(params, api) {
                        let x0 = api.getWidth() / 2;
                        let y0 = api.getHeight() / 2;
                        let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.9;
                        let point = getCirlPoint(x0, y0, r, (270 + -angle))
                        return {
                            type: 'circle',
                            shape: {
                                cx: point.x,
                                cy: point.y,
                                r: 4
                            },
                            style: {
                                stroke: "#0CD3DB", //绿
                                fill: "#0CD3DB"
                            },
                            silent: true
                        };
                    },
                    data: [0]
                }, {
                    name: '吃猪肉频率',
                    type: 'pie',
                    radius: ['80%', '45%'],
                    silent: true,
                    clockwise: true,
                    startAngle: 90,
                    z: 0,
                    zlevel: 0,
                    label: {
                        normal: {
                            position: "center",

                        }
                    },
                    data: [{
                            value: value,
                            name: "",
                            itemStyle: {
                                normal: {
                                    color: { // 完成的圆环的颜色
                                        colorStops: [{
                                            offset: 0,
                                            color: '#4FADFD' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#28E8FA' // 100% 处的颜色
                                        }]
                                    },
                                }
                            }
                        },
                        {
                            value: 100 - value,
                            name: "",
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#173164"
                                }
                            }
                        }
                    ]
                },

                {
                    name: "",
                    type: "gauge",
                    radius: "70%",
                    center: ['50%', '50%'],
                    startAngle: 0,
                    endAngle: 359.9,
                    splitNumber: 8,
                    hoverAnimation: true,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: 12,
                        lineStyle: {
                            width: 1,
                            color: "#061740"
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    detail: {
                        show: false
                    },
                    data: [{
                        value: 0,
                        name: ""
                    }]
                },

            ]
        };

        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        function getCirlPoint(x0, y0, r, angle_args) {
            let x1 = x0 + r * Math.cos(angle_args * Math.PI / 180)
            let y1 = y0 + r * Math.sin(angle_args * Math.PI / 180)
            return {
                x: x1,
                y: y1
            }
        }

        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(optionInterval);
        myChart.resize()
    },
    //实时温湿度 仪表盘 设定+当前
    create_real_temperature_v2(gauge_data, myChart) {
        var datas = {
            value: gauge_data.value,
            title: gauge_data.title,
            type: 1,
            radiusType: 1
        };
        let max = gauge_data.max;
        let nqColor = [
            [gauge_data.setValue / max, "#1e87f0"],
            [1, "#e6e6e6"]
        ]
        let optionInterval_v2 = {
            tooltip: {
                show: false
            },
            series: [{
                name: "",
                type: "gauge",
                radius: "120%",
                center: ["50%", "70%"],
                startAngle: 180,
                endAngle: 0,
                z: 7,
                splitNumber: 5,
                min: 0,
                max: max,
                axisLine: {
                    lineStyle: {
                        color: nqColor,
                        width: 10,
                        opacity: 0.9
                    }
                },
                splitLine: {
                    length: 12,
                },
                axisTick: { // 坐标轴小标记
                    show: true,
                    length: 10,
                    lineStyle: {
                        width: 1,
                    }
                },
                pointer: {
                    show: true,
                    fontSize: 8,
                },
                detail: {
                    show: true,
                    // offsetCenter: [0, '0%'],

                },
                data: [datas]
            }]
        };
        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(optionInterval_v2);
        myChart.resize()
    },
    //avl 出风回风温湿度
    create_real_electric(data, myChart) {
        var datas = {
            value: data.text,
            company: "",
            ringColor: [{
                offset: 0,
                color: '#02d6fc' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#367bec' // 100% 处的颜色
            }]
        }
        var option_i = {
            // backgroundColor: "#000",
            title: [{
                text: datas.value,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '12'
                }
            }, ],
            color: ['#282c40'],
            legend: {
                show: false,
                data: []
            },

            series: [{
                name: '',
                type: 'pie',
                clockWise: true,
                radius: ['70%', '80%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: datas.value,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: datas.ringColor
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '',
                    value: 100 - datas.value
                }]
            }]
        };
        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(option_i, )
        myChart.resize();
    },

    //仪表盘
    create_real_dashboard(data, Chart) {
        let option_u = {
            // backgroundColor: 'rgb(10,69,128)',
            series: [{
                    type: 'gauge',
                    // z: 3,
                    min: 0,
                    max: 100,
                    startAngle: 200,
                    endAngle: -20,
                    radius: '90%',
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 5,
                            shadowColor: '#0092EE',
                            shadowBlur: 1,
                            color: [
                                [0.2, '#0092EE'],
                                [1, '#BECAD8']
                            ],
                        }
                    },
                    axisLabel: {
                        show: false,
                        fontSize: 5,
                    },
                    axisTick: { // 坐标轴小标记
                        show: true,
                        length: 10,
                        lineStyle: {
                            width: 1,
                        }
                    },
                    pointer: {
                        width: 5,
                        length: '70%'
                    },
                    splitLine: { // 分隔线
                        show: true,
                        length: 10,
                        lineStyle: {
                            width: 3,
                        }
                    },
                    title: {
                        offsetCenter: [0, '-20%'], // x, y，单位px
                        fontSize: 12,
                        color: '#fff',
                    },
                    detail: {
                        fontSize: 12,
                        color: '#fff',
                        formatter: function(value) {
                            return '{a|' + value + '}' + data[1].unit;
                        },
                        rich: {
                            a: {
                                fontSize: 12,
                                color: '#0093EE'
                            }
                        }
                    },
                    data: [data[1]]
                },
                {
                    type: 'gauge',
                    center: ['18%', '58%'], // 默认全局居中
                    radius: '80%',
                    min: 0,
                    max: 100,
                    startAngle: 200,
                    endAngle: 50,
                    splitNumber: 8,
                    axisLabel: {
                        show: false,
                        fontSize: 34,
                    },
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 5,
                            shadowColor: '#0092EE',
                            shadowBlur: 50,
                            color: [
                                [0.2, '#0092EE'],
                                [0.8, '#0092EE'],
                                [1, '#BECAD8']
                            ],
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        show: true,
                        length: 7,
                        lineStyle: {
                            width: 1,
                        }
                    },
                    pointer: {
                        width: 5,
                        length: '70%'
                    },
                    splitLine: { // 分隔线
                        show: true,
                        length: 10,
                        lineStyle: {
                            width: 1,
                        }
                    },
                    title: {
                        offsetCenter: [0, '-20%'], // x, y，单位px
                        fontSize: 12,
                        color: '#fff',
                    },
                    detail: {
                        fontSize: 12,
                        color: '#fff',
                        formatter: function(value) {
                            return '{a|' + value + '}' + data[0].unit;
                        },
                        rich: {
                            a: {
                                fontSize: 12,
                                color: '#0093EE'
                            }
                        }
                    },
                    data: [data[0]]
                },
                {
                    type: 'gauge',
                    center: ['82%', '58%'], // 默认全局居中
                    radius: '80%',
                    min: 0,
                    max: 100,
                    startAngle: 130,
                    endAngle: -20,
                    splitNumber: 4,
                    axisLabel: {
                        show: false,
                        fontSize: 34,
                    },
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 3,
                            shadowColor: '#0092EE',
                            shadowBlur: 50,
                            color: [
                                [0.2, '#BECAD8'],
                                [0.8, '#0092EE'],
                                [1, '#25C0C8']
                            ],
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        show: true,
                        length: 7,
                        lineStyle: {
                            width: 1,
                        }
                    },
                    pointer: {
                        width: 5,
                        length: '70%'
                    },
                    splitLine: { // 分隔线
                        show: true,
                        length: 10,
                        lineStyle: {
                            width: 1,
                        }
                    },
                    title: {
                        offsetCenter: [0, '-20%'], // x, y，单位px
                        fontSize: 12,
                        color: '#fff',
                    },
                    detail: {
                        fontSize: 12,
                        color: '#fff',
                        formatter: function(value) {
                            return '{a|' + value + '}' + data[2].unit;
                        },
                        rich: {
                            a: {
                                fontSize: 12,
                                color: '#0093EE'
                            }
                        }
                    },
                    data: [data[2]]
                },

            ]
        };

        window.onresize = function() {
            Chart.resize();
        }
        Chart.setOption(option_u);
        Chart.resize();
    },

    //生成仪表盘单盘 上汽
    create_real_single_dashboard(data, chart) {
        let option_y = {
            // backgroundColor: '#1b1b1b',
            tooltip: {
                formatter: '{a} {c}'
            },
            title: {
                text: data.title + ' ' + data.percentage + '%',
                top: '85%',
                left: 'center',
                textStyle: {
                    color: 'white',
                    fontSize: 12,
                }
            },
            series: [{
                name: data.record.name,
                type: 'gauge',
                min: 0,
                max: data.max,
                splitNumber: data.splitNumber,
                radius: '95%',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.2, 'lime'],
                            [0.4, '#CCCC00'],
                            [0.6, '#1e90ff'],
                            [0.8, '#1e90ff'],
                            [1, '#ff4500']
                        ],
                        width: 3,
                        shadowColor: '#fff', //默认透明
                    }
                },
                axisLabel: { // 坐标轴小标记
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    fontSize: 10
                },
                axisTick: { // 坐标轴小标记
                    length: 0, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 3
                    }
                },
                splitLine: { // 分隔线
                    length: 3, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 3
                    }
                },
                pointer: { // 分隔线
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5,
                    width: 3
                },
                title: {
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 8,
                        fontStyle: 'italic',
                        color: 'white',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 3
                    },
                    color: 'white',
                    fontSize: 8,
                },
                detail: {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5,
                    offsetCenter: [0, '50%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: '10px',
                        color: '#fff'
                    },
                    fontSize: 8,
                },
                data: [data.record]
            }]
        };

        chart.setOption(option_y);
        window.onresize = function() {
            console.log('1111')
            myChart.resize();
        }
        chart.resize();
    },

    //avl  排放分析仪表
    create_real_discharge(data_t, myChart) {
        var series = [];

        data_t.attrs.forEach(f => {
            series.push(this.create_series(f.name, f.value, f.color))
        })

        var option_t = {
            background: 'rgb(10,65,121)',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'none',
                padding: 6,
                formatter: function(param) {
                    var resultTooltip = "";
                    resultTooltip =
                        "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
                        "<div style='text-align:center;'>" + param[0].name + "</div>" +
                        "<div style='padding-top:5px;'>"
                    for (let i = 0; i < param.length; i++) {

                        if (i > 0) {
                            resultTooltip += "<div style='padding-top:2px;'>"
                        }

                        resultTooltip +=
                            "<span style='display: inline-block; width: 4px; height:10px; border-radius: 5px;background-color: " + param[i].color + ";'></span>" +
                            "<span style=''> " + param[i].seriesName + ": </span>" +
                            "<span style='color:" + param[i].color + "'>" + param[i].value + "</span><span>" + data_t.attrs[i].unit + "</span>"

                    }
                    resultTooltip +=
                        "</div>" +
                        "</div>";
                    return resultTooltip
                }

            },
            title: {
                show: false,
                text: '',
            },
            grid: {
                left: '15%',
                top: '13%',
                right: '5%',
                bottom: '15%',
                height: '60%',

            },
            legend: {
                show: true,
                type: 'scroll',
                icon: 'circle',
                orient: 'horizontal',
                top: '87.5%',
                width: '100%',
                right: 'center',
                itemWidth: 16.5,
                itemHeight: 6,
                padding: 1,
                textStyle: {
                    color: 'white',
                    fontSize: 12
                },
                //过滤
                data: series.map(m => (m.name))
                    // formatter:function(data){
                    //   console.log(data);
                    //   return '';
                    // }
            },
            xAxis: [{
                type: 'category',
                data: data_t.xData,
                axisLabel: {
                    show: true,
                    fontSize: 9,
                    color: 'white', //X轴文字颜色
                    formatter: function(value) {
                        let str = "";
                        // str += value.substring(0, 4) + "\n";
                        str += value.substring(5, 10);
                        return str;
                    }
                },
                axisLine: {
                    show: false //不显示x轴
                },
                axisTick: {
                    show: false //不显示刻度
                },
                boundaryGap: false,
                splitLine: {
                    show: true,
                    width: 0.08,
                    lineStyle: {
                        type: "solid",
                        color: "white"
                    }
                },
                axisPointer: { //轴指示器
                    type: 'shadow',
                    z: 1,
                    shadowStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(18,155,249,0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(18,155,249,1)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 5
                    }
                },

            }],
            yAxis: [{
                type: 'value',
                scale: true, //坐标轴起点不限制0
                axisLabel: {
                    show: true,
                    color: 'white', //X轴文字颜色
                    textStyle: {
                        fontSize: 9,
                        // color: "rgb(116,142,171)" //X轴文字颜色s
                    }
                },
                splitLine: {
                    show: false,

                },
                axisTick: {
                    show: false, //不显示刻度
                },
                axisLine: {
                    show: false,
                },
                nameTextStyle: {
                    color: "#FFFFFF"
                },
                splitArea: {
                    show: false
                }
            }],
            series: series
        };

        if (option_t.series[0].data.length > 10)
            option_t.dataZoom = [{
                    show: false,
                    realtime: true,
                    start: 100 - ((10 / (series[0].data.length)) * 100),
                    end: 100
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 100 - ((10 / (series[0].data.length)) * 100),
                    end: 100
                }
            ];

        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(option_t);
        myChart.resize();
    },

    /**
     * avl 环境仓参数实时温湿度仓压力
     * @param {*} data  {text:'',unit:'',value:''}
     * @param {*} myChart 
     */
    create_real_disk(data, myChart) {
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


        var dataStyle = {
            normal: {
                formatter: '{c}' + data.unit,
                position: 'center',
                show: true,
                textStyle: {
                    fontSize: '12',
                    fontWeight: 'normal',
                    color: 'white'
                }
            }
        };


        let option_rg = {
            // backgroundColor: '#fff',
            title: [{
                text: data.text,
                left: '50%',
                top: '55%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '12',
                    color: 'white',
                    textAlign: 'center',
                },
            }],

            //第一个图表
            series: [{
                    type: 'pie',
                    hoverAnimation: false, //鼠标经过的特效
                    radius: ['80%', '90%'],
                    center: ['50%', '50%'],
                    startAngle: 0,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: 100,
                            itemStyle: {
                                normal: {
                                    color: '#E1E8EE'
                                }
                            },
                        }, {
                            value: 0,
                            itemStyle: placeHolderStyle,
                        },

                    ]
                },
                //上层环形配置
                {
                    type: 'pie',
                    hoverAnimation: false, //鼠标经过的特效
                    radius: ['80%', '90%'],
                    center: ['50%', '50%'],
                    startAngle: 90,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                            value: data.value,
                            itemStyle: {
                                normal: {
                                    color: '#6F78CC'
                                }
                            },
                            label: dataStyle,
                        }, {
                            value: 35,
                            itemStyle: placeHolderStyle,
                        },

                    ]
                },

            ]
        };

        window.onresize = function() {
            myChart.resize();
        }
        myChart.setOption(option_rg);
    },


    //ngx-chart-curve-v3 折线
    create_broken_line(data, myChart, config) {
        var series = [];
        data.series.forEach((f, j) => {
            if (j == data.series.length - 1)
                series.push({
                    name: f.name,
                    type: 'line',
                    showSymbol: true,
                    lineStyle: {
                        width: 1
                    },
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: f.color[0]
                        }, {
                            offset: 1,
                            color: f.color[0]
                        }])
                    },
                    data: f.value
                });
            else
                series.push({
                    name: f.name,
                    type: 'line',
                    itemStyle: {
                        color: f.color[0]
                    },
                    lineStyle: {
                        width: 1
                    },
                    data: f.value
                });
        })
        if (series.length == 0) series.push({ type: 'line', name: '', data: [] });
        let option_e = {
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                buttom: '0%',
                top: '5%',
                width: '90%',
                height: '70%'
            },
            dataZoom: [{
                    show: false,
                    realtime: true,
                    start: 100 - ((10 / (series[0].data.length)) * 100),
                    end: 100
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 100 - ((10 / (series[0].data.length)) * 100),
                    end: 100
                }
            ],
            xAxis: {
                data: data.xData,
                axisLabel: {
                    color: "white"
                },
            },
            yAxis: {
                splitLine: { show: false },
                min: 0,
                axisLabel: {
                    color: "white"
                },
            },
            series: series
        };
        myChart.setOption(option_e, config);
        // myChart.resize();
        window.onresize = function() {
            myChart.resize();
        }

    },

    // //进度条
    // create_percentage(percentage, myChart) {
    //     option = {
    //         grid: {
    //             left: '170',
    //             right: '75',
    //             bottom: '3%',
    //             top: '3%',
    //         },
    //         xAxis: {
    //             show: false,
    //             type: 'value'
    //         },
    //         yAxis: [{
    //             type: 'category',
    //             inverse: true,
    //             axisTick: 'none',
    //             axisLine: 'none',
    //             show: false,
    //             data: [percentage]
    //         }],
    //         series: [{
    //                 name: '值',
    //                 type: 'bar',
    //                 zlevel: 1,
    //                 itemStyle: {
    //                     normal: {
    //                         barBorderRadius: 5,
    //                         color: '#4E7BFE'
    //                     },
    //                 },
    //                 barWidth: 15,
    //                 data: [percentage]
    //             },
    //             {
    //                 name: '背景',
    //                 type: 'bar',
    //                 barWidth: 15,
    //                 barGap: '-100%',
    //                 data: [percentage],
    //                 itemStyle: {
    //                     normal: {
    //                         color: 'rgba(103,150,253,0.3)',
    //                         barBorderRadius: 5,
    //                     }
    //                 },
    //             },
    //         ]
    //     };
    //     window.onresize = function() {
    //          myChart.resize();
    //      }
    //     myChart.setOption(option);
    //     myChart.resize();
    // }

    /**
     * 
     * @param name 名字
     * @param lines 具体数据
     * @param colors 颜色数组 长度2
     */
    create_series(name, lines, colors) {
        return {
            name: name,
            type: 'line',
            data: lines,
            lineStyle: {
                normal: {
                    width: 2,
                    // color: '#3374EB',
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: colors[0] // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: colors[1] // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    shadowColor: colors[1],
                    shadowBlur: 4,
                    shadowOffsetY: 3
                }
            },
            symbol: 'emptyCircle',
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: colors[1],
                    shadowColor: colors[1],
                    shadowBlur: 2,
                    borderWidth: 2,
                    borderColor: "#F8F8FF"
                }
            },
            smooth: true
        }
    },
    create_device_status_fun(data, seriesData, legend, borderData, borderHeight) {
        data.xData.forEach(element => {
            borderData.push(borderHeight);
        });
        data.d_arr.forEach((item, index) => {
            var obj1 = {};
            var obj2 = {};
            if (index < data.d_arr.length - 1) {
                obj1 = {
                    name: legend[index],
                    type: "bar",
                    stack: legend[index],
                    data: item,
                    barWidth: "15%",
                    itemStyle: {
                        normal: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0,
                                        color: data.color_arr[index].start
                                    },
                                    {
                                        offset: 0.5,
                                        color: data.color_arr[index].start
                                    },
                                    {
                                        offset: 1,
                                        color: data.color_arr[index].end
                                    }
                                ],
                                globalCoord: false
                            }
                        }
                    }
                };
                obj2 = {
                    name: "",
                    type: "bar",
                    stack: legend[index],
                    itemStyle: {
                        normal: {
                            color: data.color_arr[index].start
                        }
                    },
                    data: borderData
                };
                seriesData.push(obj1);
                seriesData.push(obj2);
            } else {
                var obj3 = {
                    name: legend[index],
                    type: "line",
                    yAxisIndex: 1,
                    smooth: false,
                    symbol: "circle",
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: data.color_arr[index].color,
                            borderColor: "#fff",
                            borderWidth: 1
                        }
                    },
                    data: item,
                    label: {
                        normal: {
                            show: false
                        }
                    }
                };
                seriesData.push(obj3);
            }
        });
    }
}

module.exports = equipment_four_road;