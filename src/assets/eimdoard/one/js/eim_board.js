// 1、一个js文件表示一个模块
let eim_board = {
    // 左侧第一个、bar
    left_bar(){
        var myChart = echarts.init(document.querySelector('.bar .chart'));
        var option = {
            // 颜色
            color: ['#2f89cf'],
            // 图表的提示框
            tooltip: {
                // 触发方式 item 数据项图形触发 axis坐标轴触发
                trigger: 'axis',
                // 坐标轴指示器，坐标轴触发有效
                axisPointer:{
                    type: "shadow" // 默认为直线，可选 shadow
                }
            },
            // 图例组件
            // legend:{
            //     // data: ['销量'] // series里面有name则 legend里面的data可不要
            // },
            // 网格配置，可以控制 直角坐标系的图表大小
            grid: [
                // {x: '', y: '-20%', width: '100%', height: '100%'},
                {
                    left: '0',
                    right: '0',
                    top: '10px',
                    bottom: '4%',
                    // 显示刻度
                    containLabel: true,
        
    
                }
            ],
            // 工具箱组件
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
        
            // x轴的相关配置
            xAxis: {
                // 轴的类型，catrgory 类目
                type:'category',
                axisTick: {
                    alignWithLabel: true
                },
                // 修改文字大小 即刻度标签
                axisLabel:{
                    color: 'rgba(225, 225, 225, .6)',
                    fontSize: '12px',
                },
                // x 轴样式
                axisLine: {
                    show: false,
                    // 如果想要设置单独的线条样式
                    // lineStyle:{
                    //     color: 'rgba(225, 255, 255, 1)',
                    //     width: 1,
                    //     type: "solid"
                    // }
                },
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            // y轴的相关配置
            yAxis: {
                type: 'value',
                axisTick: {
                    alignWithLabel: true
                },
    
                // 修改文字大小 即刻度标签
                axisLabel:{
                    color: 'rgba(225, 225, 225, .6)',
                    fontSize: 12,
                },
                // y 轴样式
                axisLine: {
                    // show: false,
                    // 如果想要设置单独的线条样式
                    lineStyle:{
                        color: 'rgba(225, 255, 255, .1)',
                        // width: 1,
                        // type: "solid"
                    }
                },
                // y 轴分割线样式
                splitLine:{
                    lineStyle: {
                        color: "rgba(255, 255, 255,0.1)"
                    }
                }
            },
            // 系列列表，绝对显示那种类型图表
            series: [{
                name: '销量',
                type: 'bar',
                // 修改柱子宽度
                barWidth: '35%',
                data: [5, 20, 36, 10, 10, 200],
                // 修改柱子圆角
                itemStyle:{
                    barBorderRadius: 2
                }
            }]
        }
        
        myChart.setOption(option);
    
        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },
    // 左侧第二个、line
    left_line(){
        var myChart = echarts.init(document.querySelector('.line .chart'));
        option = {
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
                textStyle:{
                    color: '#4c9bfd' // 图例文字颜色
                },
                right: '10%',
                top: '5%'
            },
    
            grid: {
                top: '15%',
                left: 0,
                right: '4%',
                bottom: '3%',
                containLabel: true,
                containLabel: true, // 包含刻度线的文字在内
                show: true, // 显示边框
                borderColor: '#012f4a', // 边框颜色
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
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
                }
            ],
            yAxis: [
                {
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
                }
            ],
            // 2 条折现颜色
            color: ['#57ba196b',  '#65dae24a'],
            series: [
                {
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
                            1,
                            [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
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
                    itemStyle:{
                        color: '#0184d5',
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    },
                    data: [ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
    
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
                              1,
                              [
                                {
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
                    itemStyle:{
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
                    data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20],
                },
    
    
            ]
        };
    
        // 配置给实例化对象
        myChart.setOption(option);
        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        });
    },
    // 左侧第三个、pie
    left_pie(){
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.pei .chart'));

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
            color:[
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab"
            ],
            series: [
                {
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
                        {value: 335, name: '0岁以下'},
                        {value: 310, name: '20-29岁'},
                        {value: 234, name: '30-39岁'},
                        {value: 135, name: '40-49岁'},
                        {value: 1548, name: '50岁以下'}
                    ]
                }
            ]
        };
        // 配置给实例化对象
        myChart.setOption(option);

        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },

    // 右侧第一个、bar
    right_bar(){
        var myChart = echarts.init(document.querySelector('.bar2 .chart'));
        var myColor = ['#1089E7', "#F57474", "#F88448", "#8878F6"]
        option = {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            
            grid: {
                top: '10%',
                left: '2%',
                right: '4%',
                bottom: '10%',
                containLabel: true,
                // height: '100%'
            },

            xAxis: {
                // 不显示x轴相关信息
                show: false,
            },
            yAxis: [
                {
                    type: 'category',
                    inverse: true,
                    data: ['Sunny', 'Cloudy', 'Showers'],
        
                    // 不显示y轴线条
                    axisLine: {
                        show: false,
                    },
                    // 不显示y轴刻度
                    axisTick: {
                        show: false,
                    },
                    // y轴字体文字的颜色
                    axisLabel: {
                        color: "#fff"
                    },
                },
                {
                    type: 'category',
                    inverse: true,
                    data: [702, 350, 664],
        
                    // 不显示y轴线条
                    axisLine: {
                        show: false,
                    },
                    // 不显示y轴刻度
                    axisTick: {
                        show: false,
                    },
                    // y轴字体文字的颜色
                    axisLabel: {
                        color: "#fff",
                        textSize: 12
                    },
                }

            ],
            series: [
                {
                    name: '条',
                    // 柱子之间的的距离
                    barCategoryGap: 60,
                    // 柱子间宽度
                    barWidth: 10,
                    // 柱子设为圆
                    itemStyle: {
                        barBorderRadius: 20,
                        color: function(params){
                            return myColor[params.dataIndex]
                        },
                    },
                    type: 'bar',
                    data: [65, 70, 30],
                    // 图形上的数字标签
                    label: {
                        show: true,
                        // 图形内显示
                        position: "inside",
                        // 文字的显示格式
                        formatter: "{c}%",
                        fontSize: 8,
                    },
                    // 类似css z-index
                    yAxisIndex: 0,

                },
                {
                    name: '框',
                    type: 'bar',
                    // 柱子之间的的距离
                    barCategoryGap: 60,
                    // 柱子间宽度
                    barWidth: 11,
                    // 柱子样式
                    itemStyle: {
                        color: "none",
                        barBorderRadius: 12,
                        borderColor: '#00c1de',
                        borderWidth: 2,
                    },
                    data: [100, 100, 100],
                    // 类似css z-index
                    yAxisIndex: 1,
    },
            ]
        };
        
        myChart.setOption(option);
        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },
    // 右侧第二个、line
    right_line(){
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.line2 .chart'));
        option = {
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
                textStyle:{
                    color: '#4c9bfd' // 图例文字颜色
                },
                right: '10%',
                top: '5%'
            },

            grid: {
                top: '20%',
                left: 0,
                right: '4%',
                bottom: '3%',
                containLabel: true,
                containLabel: true, // 包含刻度线的文字在内
                show: true, // 显示边框
                borderColor: '#012f4a', // 边框颜色
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
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
                }
            ],
            yAxis: [
                {
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
                }
            ],
            // 2 条折现颜色
            color: ['#57ba196b',  '#65dae24a'],
            series: [
                {
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
                            1,
                            [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
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
                    itemStyle:{
                        color: '#0184d5',
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    },
                    data: [ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],

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
                            1,
                            [
                                {
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
                    itemStyle:{
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
                    data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20],
                },


            ]
        };

        // 配置给实例化对象
        myChart.setOption(option);
        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },
    // 右侧第三个、pie
    right_pie(){
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.pei2 .chart'));

        // 配置
        option = {

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // left: 'center',
                // top: 'bottom',
                bottom: "-1%",
                // 小图标的宽度和高度
                itemWidth: 5,
                itemHeight: 5,
                // 文字 12px
                textStyle: {
                    color: "rgba(255, 255, 255, .5)",
                    fontSize: "8"
                },

            },
        
            // 颜色
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    // 大小
                    radius: ['10%', '55%'],
                    // 位置-垂直居中
                    center: ['50%', '50%'],
                    // area 这是面积模式、radius这是半径模式
                    roseType: 'radius',
                    // 文本标签的大小
                    label: {
                        fontSize: 10
                    },
                    // 连接图形和文字的线
                    labelLine: {
                        // length连接图形的线， length2连接文字的线条！
                        length: 10,
                        length: 5
                    }, 
                    data: [
                        {value: 10, name: '云南'},
                        {value: 5, name: '北京'},
                        {value: 15, name: '河北'},
                        {value: 25, name: '江苏'},
                        {value: 20, name: '浙江'},
                        {value: 35, name: '山东'},
                        {value: 30, name: '四川'},
                        {value: 40, name: '河南'}
                    ]
                }
            ]
        };
        // 配置给实例化对象
        myChart.setOption(option);

        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },


    // map 中国map
    center_map2(){
        // 实例化对象
        var mymap = echarts.init(document.querySelector('.map .map-chart'));
        // 配置

        var option = {
            title : {
                text: 'iphone销量',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip : {
                trigger: 'item'
            },
           grid: {
               right: '0%',
               left: '20%',
               width: '100%',
           },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['iphone3','iphone4','iphone5']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text:['高','低'],           // 文本，默认为数值文本
                calculable : true
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                left: 'right',
                top: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name: 'iphone3',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '河南',value: Math.round(Math.random()*1000)},
                        {name: '云南',value: Math.round(Math.random()*1000)},
                        {name: '辽宁',value: Math.round(Math.random()*1000)},
                        {name: '黑龙江',value: Math.round(Math.random()*1000)},
                        {name: '湖南',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '山东',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '江苏',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '湖北',value: Math.round(Math.random()*1000)},
                        {name: '广西',value: Math.round(Math.random()*1000)},
                        {name: '甘肃',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '陕西',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '贵州',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '青海',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '海南',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'iphone4',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '重庆',value: Math.round(Math.random()*1000)},
                        {name: '河北',value: Math.round(Math.random()*1000)},
                        {name: '安徽',value: Math.round(Math.random()*1000)},
                        {name: '新疆',value: Math.round(Math.random()*1000)},
                        {name: '浙江',value: Math.round(Math.random()*1000)},
                        {name: '江西',value: Math.round(Math.random()*1000)},
                        {name: '山西',value: Math.round(Math.random()*1000)},
                        {name: '内蒙古',value: Math.round(Math.random()*1000)},
                        {name: '吉林',value: Math.round(Math.random()*1000)},
                        {name: '福建',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '西藏',value: Math.round(Math.random()*1000)},
                        {name: '四川',value: Math.round(Math.random()*1000)},
                        {name: '宁夏',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                },
                {
                    name: 'iphone5',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: Math.round(Math.random()*1000)},
                        {name: '天津',value: Math.round(Math.random()*1000)},
                        {name: '上海',value: Math.round(Math.random()*1000)},
                        {name: '广东',value: Math.round(Math.random()*1000)},
                        {name: '台湾',value: Math.round(Math.random()*1000)},
                        {name: '香港',value: Math.round(Math.random()*1000)},
                        {name: '澳门',value: Math.round(Math.random()*1000)}
                    ]
                }
            ]
        };
        // 渲染
        mymap.setOption(option);
        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            mymap.resize();
        })
    },
    // map 中国2
    center_map(){
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.map .map-chart'));
        // 配置
        var geoCoordMap = {
            '上海': [121.4648, 31.2891],
            '东莞': [113.8953, 22.901],
            '东营': [118.7073, 37.5513],
            '中山': [113.4229, 22.478],
            '临汾': [111.4783, 36.1615],
            '临沂': [118.3118, 35.2936],
            '丹东': [124.541, 40.4242],
            '丽水': [119.5642, 28.1854],
            '乌鲁木齐': [87.9236, 43.5883],
            '佛山': [112.8955, 23.1097],
            '保定': [115.0488, 39.0948],
            '兰州': [103.5901, 36.3043],
            '包头': [110.3467, 41.4899],
            '北京': [116.4551, 40.2539],
            '北海': [109.314, 21.6211],
            '南京': [118.8062, 31.9208],
            '南宁': [108.479, 23.1152],
            '南昌': [116.0046, 28.6633],
            '南通': [121.1023, 32.1625],
            '厦门': [118.1689, 24.6478],
            '台州': [121.1353, 28.6688],
            '合肥': [117.29, 32.0581],
            '呼和浩特': [111.4124, 40.4901],
            '咸阳': [108.4131, 34.8706],
            '哈尔滨': [127.9688, 45.368],
            '唐山': [118.4766, 39.6826],
            '嘉兴': [120.9155, 30.6354],
            '大同': [113.7854, 39.8035],
            '大连': [122.2229, 39.4409],
            '天津': [117.4219, 39.4189],
            '太原': [112.3352, 37.9413],
            '威海': [121.9482, 37.1393],
            '宁波': [121.5967, 29.6466],
            '宝鸡': [107.1826, 34.3433],
            '宿迁': [118.5535, 33.7775],
            '常州': [119.4543, 31.5582],
            '广州': [113.5107, 23.2196],
            '廊坊': [116.521, 39.0509],
            '延安': [109.1052, 36.4252],
            '张家口': [115.1477, 40.8527],
            '徐州': [117.5208, 34.3268],
            '德州': [116.6858, 37.2107],
            '惠州': [114.6204, 23.1647],
            '成都': [103.9526, 30.7617],
            '扬州': [119.4653, 32.8162],
            '承德': [117.5757, 41.4075],
            '拉萨': [91.1865, 30.1465],
            '无锡': [120.3442, 31.5527],
            '日照': [119.2786, 35.5023],
            '昆明': [102.9199, 25.4663],
            '杭州': [119.5313, 29.8773],
            '枣庄': [117.323, 34.8926],
            '柳州': [109.3799, 24.9774],
            '株洲': [113.5327, 27.0319],
            '武汉': [114.3896, 30.6628],
            '汕头': [117.1692, 23.3405],
            '江门': [112.6318, 22.1484],
            '沈阳': [123.1238, 42.1216],
            '沧州': [116.8286, 38.2104],
            '河源': [114.917, 23.9722],
            '泉州': [118.3228, 25.1147],
            '泰安': [117.0264, 36.0516],
            '泰州': [120.0586, 32.5525],
            '济南': [117.1582, 36.8701],
            '济宁': [116.8286, 35.3375],
            '海口': [110.3893, 19.8516],
            '淄博': [118.0371, 36.6064],
            '淮安': [118.927, 33.4039],
            '深圳': [114.5435, 22.5439],
            '清远': [112.9175, 24.3292],
            '温州': [120.498, 27.8119],
            '渭南': [109.7864, 35.0299],
            '湖州': [119.8608, 30.7782],
            '湘潭': [112.5439, 27.7075],
            '滨州': [117.8174, 37.4963],
            '潍坊': [119.0918, 36.524],
            '烟台': [120.7397, 37.5128],
            '玉溪': [101.9312, 23.8898],
            '珠海': [113.7305, 22.1155],
            '盐城': [120.2234, 33.5577],
            '盘锦': [121.9482, 41.0449],
            '石家庄': [114.4995, 38.1006],
            '福州': [119.4543, 25.9222],
            '秦皇岛': [119.2126, 40.0232],
            '绍兴': [120.564, 29.7565],
            '聊城': [115.9167, 36.4032],
            '肇庆': [112.1265, 23.5822],
            '舟山': [122.2559, 30.2234],
            '苏州': [120.6519, 31.3989],
            '莱芜': [117.6526, 36.2714],
            '菏泽': [115.6201, 35.2057],
            '营口': [122.4316, 40.4297],
            '葫芦岛': [120.1575, 40.578],
            '衡水': [115.8838, 37.7161],
            '衢州': [118.6853, 28.8666],
            '西宁': [101.4038, 36.8207],
            '西安': [109.1162, 34.2004],
            '贵阳': [106.6992, 26.7682],
            '连云港': [119.1248, 34.552],
            '邢台': [114.8071, 37.2821],
            '邯郸': [114.4775, 36.535],
            '郑州': [113.4668, 34.6234],
            '鄂尔多斯': [108.9734, 39.2487],
            '重庆': [107.7539, 30.1904],
            '金华': [120.0037, 29.1028],
            '铜川': [109.0393, 35.1947],
            '银川': [106.3586, 38.1775],
            '镇江': [119.4763, 31.9702],
            '长春': [125.8154, 44.2584],
            '长沙': [113.0823, 28.2568],
            '长治': [112.8625, 36.4746],
            '阳泉': [113.4778, 38.0951],
            '青岛': [120.4651, 36.3373],
            '韶关': [113.7964, 24.7028]
        };
        
        var XAData = [
            [{
                name: '西安'
            }, {
                name: '北京',
                value: 100
            }],
            [{
                name: '西安'
            }, {
                name: '上海',
                value: 100
            }],
            [{
                name: '西安'
            }, {
                name: '广州',
                value: 100
            }],
            [{
                name: '西安'
            }, {
                name: '西宁',
                value: 100
            }],
            [{
                name: '西安'
            }, {
                name: '银川',
                value: 100
            }]
        ];
        
        var XNData = [
            [{
                name: '西宁'
            }, {
                name: '北京',
                value: 100
            }],
            [{
                name: '西宁'
            }, {
                name: '上海',
                value: 100
            }],
            [{
                name: '西宁'
            }, {
                name: '广州',
                value: 100
            }],
            [{
                name: '西宁'
            }, {
                name: '西安',
                value: 100
            }],
            [{
                name: '西宁'
            }, {
                name: '银川',
                value: 100
            }]
        ];

        // 杭州- 宁波
        var JPData = [
            [{
                name: '宁波'
            }, {
                name: '北京',
                value: 100
            }],
            [{
                name: '宁波'
            }, {
                name: '广州',
                value: 100
            }],
            [{
                name: '宁波'
            }, {
                name: '西安',
                value: 100
            }],
            [{
                name: '宁波'
            }, {
                name: '西宁',
                value: 100
            }],
        ];
        

        
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        //var planePath = 'arrow';
        var convertData = function(data) {
        
            var res = [];
            for (var i = 0; i < data.length; i++) {
        
                var dataItem = data[i];
        
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value
                    });
                }
            }
            return res;
        
        };
        
        var color = ['#a6c84c', '#ffa022', '#46bee9', '#8878F6']; //航线的颜色
        var series = [];
        [
            ['西安', XAData],
            ['西宁', XNData],
            // ['银川', YCData]
            ['宁波', JPData]
        ].forEach(function(item, i) {
            series.push(
                {
                    name: item[0] + ' Top3',
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: 'red', //arrow箭头的颜色
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                }, 
                {
                    name: item[0] + ' Top3',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                }, 
                {
                    name: item[0] + ' Top3',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function(val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: color[i],
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                }
            );
        });
        var option = {

            layoutCenter: ['60%', '55%'],
            layoutSize: 300,
            tooltip: {
                trigger: 'item',
                formatter: function(params, ticket, callback) {
                    if (params.seriesType == "effectScatter") {
                        return "线路：" + params.data.name + "" + params.data.value[2];
                    } else if (params.seriesType == "lines") {
                        return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
                    } else {
                        return params.name;
                    }
                }
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                // data: ['西安 Top3', '西宁 Top3', '银川 Top3', '宁波 Top1'],
                data: ['西安 Top3', '西宁 Top3', '宁波 Top3'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'multiple'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: true,
                        color: '#fff'
                    }
                },
                // map 大小, 放大了1.2倍
                zoom: 1.2,
                roam: true,
                itemStyle: {
                    normal: {
                        // 地图省份背景颜色
                        areaColor: 'rgba(20, 41,87, 0.5)',
                        borderColor: '#195BB9',
                        borderWidth: 1,
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                }
            },
            series: series
        };
        // 渲染
        myChart.setOption(option);
        // 单击
        myChart.on('click', function(params){
            console.log("Params: ", params)
        }.bind(this));
        
        // 双击
        myChart.on('dblclick', function(params){
            console.log("这是双击！")
        }.bind(this));
        
        // 让图标跟随屏幕自适应
        window.addEventListener('resize', function(){
            myChart.resize();
        })
    }

};

// 2、导出这个模块
module.exports = eim_board;