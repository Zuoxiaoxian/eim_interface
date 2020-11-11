let expLayouteChart = {
    create_percentage_chart(data, myChart) {
        option = {
            // backgroundColor: 'rgba(1,1,1,0)',
            tooltip: {
                show: false,
                // trigger: 'item',
                // itemSize: 12,
                // formatter: `${data.number}\n占百分比${data.percentage}%`
            },
            legend: {
                show: false
            },
            toolbox: {
                show: false
            },
            title: [{
                text: `${data.number}\n占百分比${data.percentage}%`,
                top: '38%',
                textAlign: "center",
                left: "48%",
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: '400'
                }
            }],
            color: [data.color, 'rgb(106,135,214,0.7)', ],
            series: [{
                type: 'pie',
                startAngle: 90,
                radius: [38, 47],
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                        },
                    }
                },
                data: [{
                        value: data.percentage,
                        itemStyle: {
                            normal: {
                                borderWidth: 5
                            }
                        },
                    }, {
                        value: 100 - data.percentage,
                        itemStyle: {
                            normal: {
                                borderWidth: 5
                            }
                        },
                    }

                ],
                roundCap: 1 //可选项为1和2，不填则采用原有拼接方式
            }]
        }
        window.addEventListener('resize', function() {
            myChart.resize();
        })

        if (option && typeof option === "object") {
            myChart.setOption(option);
            myChart.resize();
        }
    },

    cteate_chart(data, myChart) {
        option = {
            title: {
                show: true,
                text: data.title,
                textStyle: {
                    color: 'white',
                    fontSize: 12,
                }
            },
            gird: {
                left: 0
            },
            tooltip: {
                show: true,
                type: 'line',
                textStyle: {
                    fontSize: 12,
                }
            },
            dataset: {
                source: data.information
            },
            legend: {
                show: false,
                textStyle: {
                    color: 'white',
                }
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "white"
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: "white"
                },
            },
            series: [{
                type: 'line'
            }, {
                type: 'bar',
                itemStyle: {
                    color: 'rgb(144,255,255)'
                }
            }]
        };
        window.addEventListener('resize', function() {
            myChart.resize();
        })

        if (option && typeof option === "object") {
            myChart.setOption(option);
            myChart.resize();
        }
    }
}


module.exports = expLayouteChart;