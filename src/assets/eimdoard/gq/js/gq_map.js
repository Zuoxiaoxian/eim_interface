// 1、一个js文件表示一个模块
let gq_map = {
    // 实例1 参考 https://gallery.echartsjs.com/editor.html?c=xSJJXiE1Wx
    demo1(w_m_total) {
        console.log("--w_m_total---", w_m_total)
        var myChart = echarts.init(document.querySelector('.demo1'));

        var xData = function() {
            var data = [];
            for (var i = 1; i < 13; i++) {
                data.push(i + "月份");
            }
            return data;
        }();

        let option_demo1 = {
            // backgroundColor: "#344b58",
            title: {
                text: "本年商场顾客男女人数统计",
                subtext: "BY Wang Dingding",
                x: "4%",

                textStyle: {
                    color: '#fff',
                    fontSize: '11'
                },
                subtextStyle: {
                    color: '#90979c',
                    fontSize: '8',

                },
            },
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
                borderWidth: 0,
                top: 70,
                bottom: 80,
                height: '50%',
                left: '15%',
                right: '5%',

                textStyle: {
                    color: "#fff"
                }
            },
            legend: {
                x: '4%',
                top: '12%',
                itemHeight: 13,
                itemWidth: 13,
                textStyle: {
                    color: '#90979c',
                },
                data: ['女', '男', '平均']
            },
            calculable: true,
            xAxis: [{
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
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
                    fontSize: 6, // x 轴字体大小
                },
                data: xData,
            }],
            yAxis: [{
                type: "value",
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    fontSize: 9, // y 字体大小
                },
                splitArea: {
                    show: false
                },

            }],
            dataZoom: [{
                show: true,
                height: 20,
                xAxisIndex: [
                    0
                ],
                bottom: 20,
                start: 10,
                end: 80,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#d3dee5",

                },
                textStyle: {
                    color: "#fff"
                },
                borderColor: "#90979c"


            }, {
                type: "inside",
                show: true,
                height: 15,
                start: 1,
                end: 35
            }],
            series: [{
                    name: "女",
                    type: "bar",
                    stack: "总量",
                    barMaxWidth: 35,
                    barGap: "10%",
                    itemStyle: {
                        barMinWidth: 5,
                        normal: {
                            color: "rgba(255,144,128,1)",
                            label: {
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 7,
                                },
                                position: "inside",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    data: w_m_total.woman,
                },

                {
                    name: "男",
                    type: "bar",
                    stack: "总量",
                    itemStyle: {
                        normal: {
                            color: "rgba(0,191,183,1)",
                            barBorderRadius: 0,
                            label: {
                                show: true,
                                position: "inside",
                                textStyle: {
                                    "fontSize": 6,
                                },
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    data: w_m_total.male
                }, {
                    name: "总数",
                    type: "line",
                    symbolSize: 10,
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: "rgba(252,230,48,1)",
                            barBorderRadius: 0,
                            label: {
                                show: true,
                                position: "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    data: w_m_total.total
                },
            ]
        }
        myChart.setOption(option_demo1);
        window.addEventListener('resize', f => {
            myChart.resize();
        })

    },
    // 实例2 参考 https://gallery.echartsjs.com/editor.html?c=xryWGlyEYe
    demo2(demo2_data) {
        var myChart = echarts.init(document.querySelector('.demo2'));
        let option_demo2 = {
            backgroundColor: '#222b4533',
            title: {
                text: '请求数',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: ['移动', '电信', '联通'],
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: '3%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                data: demo2_data.xdata
            }],
            yAxis: [{
                type: 'value',
                name: '单位（%）',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 0, 0, 0)'
                    }
                }
            }],
            series: [{
                name: '移动',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12

                    }
                },
                data: demo2_data.yd
            }, {
                name: '电信',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(0,136,212)',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: demo2_data.dx
            }, {
                name: '联通',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(219, 50, 51, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(219, 50, 51, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {

                        color: 'rgb(219,50,51)',
                        borderColor: 'rgba(219,50,51,0.2)',
                        borderWidth: 12
                    }
                },
                data: demo2_data.lt
            }, ]
        };
        myChart.setOption(option_demo2);
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },

    // 实例3 参考 https://gallery.echartsjs.com/editor.html?c=xH1vxib94f
    demo3(demo3_data) {
        var myChart = echarts.init(document.querySelector('.demo3'));
        let option_demo3 = {
            // backgroundColor: "#ffffff",
            color: ["#37A2DA", "#32C5E9", "#67E0E3"],
            series: [{
                name: '业务指标',
                type: 'gauge',
                radius: '80%',
                detail: {
                    formatter: '{value}%',
                    fontSize: 14
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 30,
                        shadowBlur: 0,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ]
                    }
                },
                itemStyle: {
                    borderColor: 'rgba(198, 56, 27, 1)',
                    borderWidth: 2
                },
                data: [{
                    value: 50,
                    name: '完成率',
                }]

            }]
        };
        myChart.setOption(option_demo3);
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })
        option_demo3.series[0].data[0].value = demo3_data;
        myChart.setOption(option_demo3);
        // 定时任务
        // timer = setInterval(function(){
        //     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        //     console.log("-------------定时任务---------", (Math.random() * 100).toFixed(2) - 0);
        //     myChart.setOption(option);
        // }, 2000);

    },

    // 实例4 参考 https://gallery.echartsjs.com/editor.html?c=candlestick-sh
    demo4() {
        var myChart = echarts.init(document.querySelector('.demo4'));
        var data0 = splitData([
            ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
            ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
            ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
            ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
            ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
            ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
            ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
            ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
            ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
            ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
            ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
            ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
            ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
            ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
            ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
            ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
            ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
            ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
            ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
            ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
            ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
            ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
            ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
            ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
            ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
            ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
            ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
            ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
            ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
            ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
            ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
            ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
            ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
            ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
            ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
            ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
            ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
            ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
            ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
            ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
            ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
            ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
            ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
            ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
            ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
            ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
            ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
            ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
            ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
            ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
            ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
            ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
            ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
            ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
            ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
            ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
            ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
            ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
            ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
            ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
            ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
            ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
            ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
            ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
            ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
            ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
            ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
            ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
            ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
            ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
            ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
            ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
            ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
            ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
            ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
            ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
            ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
            ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
            ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
            ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
            ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
            ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
            ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
            ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
            ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
            ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
            ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
            ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
        ]);


        function splitData(rawData) {
            var categoryData = [];
            var values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i])
            }
            return {
                categoryData: categoryData,
                values: values
            };
        }

        function calculateMA(dayCount) {
            var result = [];
            for (var i = 0, len = data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data0.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        }



        let option_demo4 = {
            title: {
                text: '上证指数',
                left: 0,
                textStyle: {
                    color: 'rgba(244, 222, 222, 1)',
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
                padding: [
                    20, // 上
                    10, // 右
                    20, // 下
                    10, // 左
                ],
                itemHeight: 10,
                itemWidth: 10,
                top: '3%',
                textStyle: {
                    color: 'rgba(163, 177, 241, 1)'
                }
            },
            grid: {
                left: '15%',
                right: '3%',
                bottom: '20%',
                backgroundColor: 'rgba(255, 0, 0, 0)'
            },
            xAxis: {
                type: 'category',
                data: data0.categoryData,
                scale: true,
                boundaryGap: false,
                // axisLine: { onZero: false },
                splitLine: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
            },
            dataZoom: [{
                    "height": 20,
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    "height": 20,
                    show: true,
                    type: 'slider',
                    y: '90%',
                    start: 50,
                    end: 100
                }
            ],
            series: [{
                    name: '日K',
                    type: 'candlestick',
                    data: data0.values,
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function(param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        data: [{
                                name: 'XX标点',
                                coord: ['2013/5/31', 2300],
                                value: 2300,
                                itemStyle: {
                                    normal: { color: 'rgb(41,60,85)' }
                                }
                            },
                            {
                                name: 'highest value',
                                type: 'max',
                                valueDim: 'highest'
                            },
                            {
                                name: 'lowest value',
                                type: 'min',
                                valueDim: 'lowest'
                            },
                            {
                                name: 'average value on close',
                                type: 'average',
                                valueDim: 'close'
                            }
                        ],
                        tooltip: {
                            formatter: function(param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        }
                    },

                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: calculateMA(30),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },

            ]
        };


        myChart.setOption(option_demo4);
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })


    },

};



// 2、导出这个模块
module.exports = gq_map;