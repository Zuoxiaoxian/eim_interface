let third_level = {

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
};

module.exports = third_level;