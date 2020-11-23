let second_level = {
    // key-index 关键指标
    key_index() {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.key-index'));

        // 配置
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                // orient: 'vertical', 垂直显示
                // 距离底部为 0% 
                bottom: "0%",
                // 小图标的宽度和高度
                itemWidth: 5,
                itemHeight: 5,
                // 文字 12px
                textStyle: {
                    color: "rgba(255, 255, 255, .5)",
                    fontSize: "8"
                },
                // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },

            // 颜色
            color: [
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab"
            ],
            series: [{
                name: '年龄分布',
                type: 'pie',
                // 饼形图的大小,第一个内圆半径-第2个外圆半径
                radius: ['50%', '70%'],
                // 并状态的位置
                center: ["50%", "45%"],

                avoidLabelOverlap: false,
                // 图形上文字
                label: {
                    show: false,
                    position: 'center'
                },
                // 饼形图中间的提示文字
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                // 不显示连接线 图形和文字
                labelLine: {
                    show: false
                },
                data: [
                    { value: 335, name: '0岁以下' },
                    { value: 310, name: '20-29岁' },
                    { value: 234, name: '30-39岁' },
                    { value: 135, name: '40-49岁' },
                    { value: 1548, name: '50岁以下' }
                ]
            }]
        };
        // 配置给实例化对象
        myChart.setOption(option);

        // 让图标跟随屏幕自适应
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },

    // chian_map map 地图
    nibo_map() {
        var ningboJson = "assets/pages/device-inline/fonts/nibo.json"
        var data = [
            { name: "慈溪市", value: [121.23, 30.17, 42] },
            { name: "奉化市", value: [121.40, 29.65, 42] },
        ]
        $.get(ningboJson, function(niboJson) {
            echarts.registerMap('nibo', niboJson);
            // 实例化对象
            var myChart = echarts.init(document.querySelector('.nibo_map'));
            // 渲染
            myChart.setOption({
                geo: {
                    type: 'map',
                    map: 'nibo',
                    zoom: 0.6,
                    label: {
                        show: true,
                        color: '#FFFFFF',
                        fontSize: 16
                    },
                    // ====缩放、拖动
                    layoutCenter: ["50%", "50%"], //地图位置
                    layoutSize: '90%',
                    roam: true,
                    // ====缩放、拖动
                    itemStyle: {
                        normal: {
                            areaColor: '#3a7fd5',
                            borderColor: '#0a53e9', //线
                            shadowColor: '#092f8f', //外发光
                            shadowBlur: 20
                        },
                        emphasis: {
                            areaColor: '#0a2dae', //悬浮区背景
                        }
                    },
                    zlevel: 1
                },
                series: [
                    // 气球 、scatter 散点图
                    {
                        zoom: 0.6,
                        name: 'Top 5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin',
                        symbolSize: [50, 50],
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 9,
                                },
                                formatter(value) {
                                    return value.data.value[2]
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#D8BC37', //标志颜色
                            }
                        },
                        data: data,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        zlevel: 1
                    },
                    // {
                    //     type: 'map',
                    //     map: 'nibo',
                    //     zoom: 0.6,
                    //     label: {
                    //         show: true,
                    //         color: '#FFFFFF',
                    //         fontSize: 16
                    //     },
                    //     // ====缩放、拖动
                    //     layoutCenter: ["50%", "50%"], //地图位置
                    //     layoutSize: '90%',
                    //     roam: true,
                    //     // ====缩放、拖动
                    //     itemStyle: {
                    //         normal: {
                    //             areaColor: '#3a7fd5',
                    //             borderColor: '#0a53e9', //线
                    //             shadowColor: '#092f8f', //外发光
                    //             shadowBlur: 20
                    //         },
                    //         emphasis: {
                    //             areaColor: '#0a2dae', //悬浮区背景
                    //         }
                    //     },
                    //     zlevel: 1
                    // },
                ]
            });
            console.log("-------------------->chinaJson: ", niboJson)
                // 点击散点图上的点

            function eclick(params) {
                if (params.seriesType === 'scatter') {
                    console.log("点击执行： ", params);
                    console.log("点击执行： ", params.seriesType);
                    var store = require('store');
                    // 将得到的数据存入local store中以便于angular得到它
                    console.log("************second-level***********", JSON.stringify(params.data))
                    store.set('second_level', JSON.stringify(params.data));
                    // 跳转页面 _parent:在当前页面打开，_blank、默认：在新的窗口打开
                    window.open('/pages/deviceinline/third-level', "_parent");
                }
            }

            myChart.on('click', eclick);

            // 让图标跟随屏幕自适应
            window.addEventListener('resize', function() {
                myChart.resize();
            })
        });

    },

    // device-rate 设备xx率
    // 参考 https://gallery.echartsjs.com/editor.html?c=x8UGFy_Nb
    device_rate(value) {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.device-rate'));

        // 配置

        var datas = {
            name: '设备开动率',
            company: "%",
            ringColor: [{
                offset: 0,
                color: '#02d6fc' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#367bec' // 100% 处的颜色
            }]
        }
        var option_device_rate = {
            // backgroundColor:"#000",
            title: {
                text: value + datas.company,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '60'
                }
            },

            color: ['#282c40'],
            legend: {
                show: false,
                data: []
            },

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['50%', '60%'],
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
                    value: value,
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
                    value: 100 - value
                }]
            }]
        };
        // 配置给实例化对象
        myChart.setOption(option_device_rate);

        // 让图标跟随屏幕自适应
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },
};

module.exports = second_level;