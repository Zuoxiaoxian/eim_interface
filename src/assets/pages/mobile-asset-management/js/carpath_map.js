// // 1、一个js文件表示一个模块

// var map;


// let carpath = {
//     // 初始化map地图 map_canvas
//     initmap(map_canvas) {
//         console.log("初始化map！", map_canvas)
//         map = new BMap.Map(map_canvas); //创建地图实例
//         const point = new BMap.Point(121.3229007700, 30.3322026400); //创建点坐标
//         map.centerAndZoom(point, 40); //初始化地图，设置中心点坐标和地图级别， 11表示地图的展示级别
//         map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
//     },
//     // 轨迹控件
//     addpathcontrol() {
//         // ====================================
//         var start = new BMap.Point(121.316987, 30.336775); // 起点
//         var end = new BMap.Point(121.324748, 30.326676); // 终点 
//         var lushu;
//         var driving = new BMap.DrivingRoute(map, {
//             // renderOptions:{map: map, autoViewport: true},  // 绘制起点-终点的路线
//             onSearchComplete: (results) => {
//                 if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
//                     // 获取第一条方案
//                     var plan = results.getPlan(0);
//                     // 获取方案的驾车路线
//                     var route = plan.getRoute(0);
//                     // 获取路线的地理坐标点数组
//                     var points = route.getPath();

//                     // var plan = results.getPlan(0);
//                     // var points = [];
//                     // for(var j=0;j<plan.getNumRoutes();j++){
//                     //     var route = plan.getRoute(j);
//                     //     points= points.concat(route.getPath());
//                     // }


//                     // 根据数组，创建折线
//                     var polyline = new BMap.Polyline(points, { strokeColor: '#111' });
//                     // 添加折线
//                     map.addOverlay(polyline);

//                     map.setViewport(points);
//                     // 路数
//                     lushu = new BMapLib.LuShu(map, points, {
//                         defaultContent: "路线规划！", //"从天安门到百度大厦"
//                         autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
//                         icon: new BMap.Icon('assets/gps/car.png', new BMap.Size(52, 26), {
//                             anchor: new BMap.Size(13, 13),
//                         }),
//                         speed: 450, // 路书速度
//                         // autoView: true,//自动调整路线视野
//                         enableRotation: true, //是否设置marker随着道路的走向进行旋转

//                         // 经过点
//                         landmarkPois: [
//                             { lng: points[4].lng, lat: points[4].lat, html: '任意一点', pauseTime: 0.1 },
//                             // {lng:121.314846,lat:30.334474,html:'加油站',pauseTime:1},
//                             // {lng:116.315391,lat:39.964429,html:'高速公路收费<div><img src="//map.baidu.com/img/logo-map.gif"/></div>',pauseTime:3},
//                             // {lng:116.381476,lat:39.974073,html:'肯德基早餐',pauseTime:2}
//                         ]
//                     })
//                     console.log(lushu)


//                     console.log("获取路线的地理坐标点数值:  ", points, points.length);
//                 }

//             }
//         }); //驾车实例
//         driving.search(start, end); //显示一条公交线路
//         // ====================================
//         // 通过JavaScript的prototype属性继承于BMap.Control
//         PathControl.prototype = new BMap.Control();
//         PathControl.prototype.initialize = function(map_data) {
//                 // 创建一个DOM元素
//                 var div = document.createElement("div");
//                 var div_row1 = document.createElement("div");
//                 var div_col1 = document.createElement("div");
//                 var col1_button = document.createElement("button");
//                 col1_button.innerHTML = "播放"
//                 div_col1.appendChild(col1_button);

//                 var div_col2 = document.createElement("div");
//                 var col2_button = document.createElement("button");
//                 col2_button.innerHTML = "停止"
//                 div_col2.appendChild(col2_button);

//                 var div_col3 = document.createElement("div");
//                 var col3_button = document.createElement("button");
//                 col3_button.innerHTML = "暂停"
//                     // div_row1 style
//                 div_row1.setAttribute("class", "row");
//                 div_col1.setAttribute("class", "col-md-4");
//                 div_col2.setAttribute("class", "col-md-4");
//                 div_col3.setAttribute("class", "col-md-4");

//                 div_col3.appendChild(col3_button);
//                 div_row1.appendChild(div_col1);
//                 div_row1.appendChild(div_col2);
//                 div_row1.appendChild(div_col3);


//                 var div_row2 = document.createElement("div");
//                 var row2_col1 = document.createElement("div");
//                 var row2_col1_button = document.createElement("button");
//                 row2_col1_button.innerHTML = "隐藏信息窗口"

//                 var row2_col2 = document.createElement("div");
//                 var row2_col2_button = document.createElement("button");
//                 row2_col2_button.innerHTML = "展示信息窗口"

//                 // div_row2 style
//                 div_row2.setAttribute("class", "row");
//                 div_row2.style.marginTop = '10px';
//                 row2_col1.setAttribute("class", "col-md-6");
//                 row2_col2.setAttribute("class", "col-md-6");

//                 row2_col1.appendChild(row2_col1_button);
//                 row2_col2.appendChild(row2_col2_button);
//                 div_row2.appendChild(row2_col1);
//                 div_row2.appendChild(row2_col2);

//                 div.appendChild(div_row1);
//                 div.appendChild(div_row2);



//                 // 设置样式
//                 div.style.cursor = "pointer";
//                 div.style.border = "1px solid gray";
//                 div.style.backgroundColor = "#bdbec038";
//                 div.style.padding = "10px";
//                 div.style["border-radius"] = "15px";


//                 col1_button.onclick = function(e) {
//                     // 播放
//                     console.log("播放")
//                     lushu.start();
//                 };
//                 col2_button.onclick = function(e) {
//                     // 开始
//                     console.log("停止");
//                     lushu.stop();
//                 };
//                 col3_button.onclick = function(e) {
//                     // 暂停
//                     console.log("暂停");
//                     lushu.pause();
//                 };
//                 row2_col1_button.onclick = function(e) {
//                     // 隐藏信息窗口
//                     console.log("隐藏信息窗口");
//                     lushu.hideInfoWindow();
//                 };
//                 row2_col2_button.onclick = function(e) {
//                     // 展示信息窗口
//                     console.log("展示信息窗口");
//                     lushu.showInfoWindow();
//                 };


//                 // 添加DOM元素到地图中
//                 map_data.getContainer().appendChild(div);
//                 // 将DOM元素返回
//                 return div;
//             }
//             // 创建控件
//         var mypathCtrl = new PathControl();
//         // 添加到地图当中
//         map.addControl(mypathCtrl);
//         // 播放
//     },

//     // 模拟路线规划
//     test_path() {
//         var start = new BMap.Point(121.316987, 30.336775); // 起点
//         var end = new BMap.Point(121.324748, 30.326676); // 终点 

//         var driving = new BMap.DrivingRoute(map, {
//             // renderOptions:{map: map, autoViewport: true},  // 绘制起点-终点的路线
//             onSearchComplete: function(results) {
//                 if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
//                     // 获取第一条方案
//                     // var plan = results.getPlan(0);
//                     // // 获取方案的驾车路线
//                     // var route = plan.getRoute(0); 
//                     // // 获取路线的地理坐标点数组
//                     // var points = route.getPath();

//                     var plan = results.getPlan(0);
//                     var points = [];
//                     for (var j = 0; j < plan.getNumRoutes(); j++) {
//                         var route = plan.getRoute(j);
//                         points = points.concat(route.getPath());
//                     }


//                     // 根据数组，创建折线
//                     var polyline = new BMap.Polyline(points, { strokeColor: '#111' });
//                     // 添加折线
//                     map.addOverlay(polyline);

//                     map.setViewport(points);
//                     // 路数
//                     lushu = new BMapLib.LuShu(map, points, {
//                         defaultContent: "路线规划！", //"从天安门到百度大厦"
//                         autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
//                         icon: new BMap.Icon('assets/gps/car.png', new BMap.Size(52, 26), {
//                             anchor: new BMap.Size(27, 13),
//                         }),
//                         speed: 4500,
//                         enableRotation: true //是否设置marker随着道路的走向进行旋转

//                         // 经过点
//                         // landmarkPois: [
//                         //     {lng:116.314782,lat:39.913508,html:'加油站',pauseTime:2},
//                         //     {lng:116.315391,lat:39.964429,html:'高速公路收费<div><img src="//map.baidu.com/img/logo-map.gif"/></div>',pauseTime:3},
//                         //     {lng:116.381476,lat:39.974073,html:'肯德基早餐',pauseTime:2}
//                         //  ]
//                     })
//                     console.log(lushu)


//                     console.log("获取路线的地理坐标点数值:  ", points, points.length);
//                 }

//             }
//         }); //驾车实例
//         driving.search(start, end); //显示一条公交线路
//     },

//     // 点击显示坐标
//     hitshowlng_lat() {
//         map.addEventListener('click', function(e) {
//             // alert(e.point.lng + ", " + e.point.lat)
//             console.log(e.point.lng + ", " + e.point.lat)
//         })
//     },



// };

// // 轨迹播放- 开始、停止、暂停、隐藏窗口、展示信息窗口
// function PathControl() {
//     // 设置默认停靠位置和偏移量
//     this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
//     // 设置偏移，参数1-左右，参数2-上下
//     this.defaultOffset = new BMap.Size(10, 10);
// }

// // 得到坐标点数组
// function getpoints(potions) {
//     return new Promise((resolve, reject) => {
//         resolve(potions);
//     });
// }


// // 2、导出这个模块
// module.exports = carpath;