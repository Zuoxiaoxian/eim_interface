let first_level = {
    // key-index 关键指标
    key_index() {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.key-index'));

        // 配置
        option = {

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
                radius: ['0%', '70%'],
                // 并状态的位置
                center: ["50%", "45%"],
                itemStyle: {
                    shadowBlur: 13,
                    shadowOffsetX: -7.5,
                    shadowOffsetY: 1.5,
                    shadowColor: 'rgba(87, 149, 156, 1)',
                },

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
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
    },

    // chian_map map 地图
    chian_map() {
        var data = [
                { name: "天津", value: [117.4219, 39.4189, 42] },
                { name: "河北", value: [114.4995, 38.1006, 102] },
                { name: "山西", value: [112.3352, 37.9413, 81] },
                { name: "内蒙古", value: [110.3467, 41.4899, 47] },
                { name: "辽宁", value: [123.1238, 42.1216, 67] },
                { name: "吉林", value: [125.8154, 44.2584, 82] },
                { name: "黑龙江", value: [127.9688, 45.368, 123] },
                { name: "上海", value: [121.4648, 31.2891, 24] },
                { name: "江苏", value: [118.8062, 31.9208, 92] },
                { name: "浙江", value: [119.5313, 29.8773, 114] },
                { name: "安徽", value: [117.29, 32.0581, 109] },
                { name: "福建", value: [119.4543, 25.9222, 116] },
                { name: "江西", value: [116.0046, 28.6633, 91] },
                { name: "山东", value: [117.1582, 36.8701, 119] },
                { name: "河南", value: [113.4668, 34.6234, 137] },
                { name: "湖北", value: [114.3896, 30.6628, 116] },
                { name: "湖南", value: [113.0823, 28.2568, 114] },
                { name: "重庆", value: [108.384366, 30.439702, 91] },
                { name: "四川", value: [103.9526, 30.7617, 125] },
                { name: "贵州", value: [106.6992, 26.7682, 62] },
                { name: "云南", value: [102.9199, 25.4663, 83] },
                { name: "西藏", value: [91.11, 29.97, 9] },
                { name: "陕西", value: [109.1162, 34.2004, 80] },
                { name: "甘肃", value: [103.5901, 36.3043, 56] },
                { name: "青海", value: [101.4038, 36.8207, 10] },
                { name: "宁夏", value: [106.3586, 38.1775, 18] },
                { name: "新疆", value: [87.9236, 43.5883, 0] },
                { name: "广东", value: [113.12244, 23.009505, 123] },
                { name: "广西", value: [108.479, 23.1152, 59] },
                { name: "海南", value: [110.3893, 19.8516, 14] },

            ]
            // 实例化对象
        var myChart = echarts.init(document.querySelector('.chian_map'));

        var option = {
            title: {
                top: 10,
                text: 'Geely 设备在线 设备全国分部',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (typeof(params.value)[2] == "undefined") {
                        return params.name + ' : ' + params.value;
                    } else {
                        return params.name + ' : ' + params.value[2];
                    }
                }
            },
            backgroundColor: 'rgba(0, 10, 52, 0)',
            geo: {
                map: 'china',
                aspectScale: 0.75,
                layoutCenter: ["50%", "51.5%"], //地图位置
                layoutSize: '118%',
                zoom: 0.6,
                roam: true,
                label: {
                    show: false,
                    color: '#FFFFFF',
                    fontSize: 16
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(254,174,33, 1)',
                        borderWidth: 0.5,
                        color: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 1500,
                            x2: 2500,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: '#009DA1' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#005B9E' // 50% 处的颜色
                            }],
                            global: true // 缺省为 false
                        },
                        opacity: 0.5,
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                },
                regions: [{
                    name: '南海诸岛',
                    itemStyle: {
                        areaColor: 'rgba(0, 10, 52, 1)',
                        borderColor: 'rgba(0, 10, 52, 1)'
                    },
                    emphasis: {
                        areaColor: 'rgba(0, 10, 52, 1)',
                        borderColor: 'rgba(0, 10, 52, 1)'
                    }
                }],
                // z: 0.8
            },
            series: [
                // 点
                {
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    },
                    name: 'light',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: data,
                    zlevel: 1
                },
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
                // 最上层地图
                {
                    type: 'map',
                    map: 'china',
                    zoom: 0.6,
                    tooltip: {
                        show: false
                    },
                    label: {
                        show: false,
                        color: '#FFFFFF',
                        fontSize: 16
                    },
                    aspectScale: 0.75,
                    layoutCenter: ["50%", "50%"], //地图位置
                    layoutSize: '118%',
                    roam: true,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 0.6)',
                            borderWidth: 0.8,
                            areaColor: {
                                type: 'linear-gradient',
                                x: 0,
                                y: 1200,
                                x2: 1000,
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: '#009DA1' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#005B9E' // 50% 处的颜色
                                }],
                                global: true // 缺省为 false
                            },
                        },
                        emphasis: {
                            areaColor: 'rgba(147, 235, 248, 0)'
                        }
                    },
                    zlevel: 1
                },
            ]
        };

        // 渲染
        myChart.setOption(option);

        //echarts 设置地图外边框以及多个geo实现缩放拖曳同步
        myChart.on('georoam', function(params) {
            var option = myChart.getOption(); //获得option对象
            if (params.zoom !== null && params.zoom !== undefined) { //捕捉到缩放时
                option.geo[0].zoom = option.series[2].zoom; //下层geo的缩放等级跟着上层的geo一起改变
                option.geo[0].center = option.series[2].center; //下层的geo的中心位置随着上层geo一起改变
            } else { //捕捉到拖曳时
                option.geo[0].center = option.series[2].center; //下层的geo的中心位置随着上层geo一起改变
            }
            myChart.setOption(option); //设置option
        });

        // 点击散点图上的点

        function eclick(params) {
            if (params.seriesType === 'scatter') {
                console.log("点击执行： ", params);
                console.log("点击执行： ", params.seriesType);
                var store = require('store');
                // 将得到的数据存入local store中以便于angular得到它
                // store.set("first_level", params)
                console.log("***********************", JSON.stringify(params.data))
                store.set('first_level', JSON.stringify(params.data));
                // 跳转页面 _parent:在当前页面打开，_blank、默认：在新的窗口打开
                window.open('/pages/deviceinline/second-level', "_parent");
            }
        }

        myChart.on('click', eclick);


        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }

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
        var option = {
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
        myChart.setOption(option);

        // 让图标跟随屏幕自适应
        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
    },


}

module.exports = first_level;