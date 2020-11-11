// 1、一个js文件表示一个模块

// const { map } = require("core-js/fn/array");

var map;

let mapjs = {

    // 初始化地图
    initmap(map_trace, initpoint){
        map = new BMap.Map(map_trace); //创建地图实例
        const point = new BMap.Point(initpoint[0], initpoint[1]); //创建点坐标
        map.centerAndZoom(point, 40);//初始化地图，设置中心点坐标和地图级别， 11表示地图的展示级别
        map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    },



    // 添加地图控件=地图类型+ 缩放图控件
    addmapCtrlType(){
        var mapType = new BMap.MapTypeControl(
        {
            mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],
            anchor: BMAP_ANCHOR_TOP_LEFT 
        });
        var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT});  //左上角，添加默认缩放平移控件
        map.addControl(mapType);
        map.addControl(top_left_navigation);
    },

    // 测距
    ranging(){
        
        // 通过JavaScript的prototype属性继承于BMap.Control
        RangingControl.prototype = new BMap.Control();
        RangingControl.prototype.initialize = function(map){
            // 创建一个DOM元素
            var div = document.createElement("div");
            // 添加文字说明
            div.appendChild(document.createTextNode("测距"));
            // 设置样式
            div.style.cursor = "pointer";
            div.style.border = "1px solid gray";
            div.style.backgroundColor = "#00d68f36";
            div.style["border-radius"] = "15%";
            

            // 绑定事件,点击一次
            div.onclick = function(e){
                var myDis = new BMapLib.DistanceTool(map);
                myDis.open(); // 开启鼠标测距
                
                // map.addEventListener("load", function() {
                //     myDis.open(); // 开启鼠标测距
                //     //myDis.close();  //关闭鼠标测距
                // });

            }
            // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        }
        // 创建控件
        var myrangingCtrl = new RangingControl();
        // 添加到地图当中
        map.addControl(myrangingCtrl);
    },

    // 点击获取点击的经纬度
    hitgit_lng_lat(){
        //单击获取点击的经纬度
        map.addEventListener("click",function(e){
            alert(e.point.lng + "," + e.point.lat);
        });
    },

    // 报警控件
    alert(){
        // 通过JavaScript的prototype属性继承于BMap.Control
        AlertControl.prototype = new BMap.Control();
        AlertControl.prototype.initialize = function(map){
            // 创建一个DOM元素
            var div = document.createElement("div");
            // 添加文字说明
            // div.appendChild(document.createTextNode("<strong>报警</strong>"));
            var img = document.createElement("img");
            img.setAttribute("id", "my_map_alert");
            img.setAttribute("src", "assets/pages/mobile-asset-management/images/pictures/bell.png");
            img.style.width = "100%";
            img.style.height = "auto";
            
            // div.innerHTML = "<a id= \"alert_a\"><i class=\"fa fa-bell-o\" aria-hidden=\"true\"></i></a>";
            div.appendChild(img);
            // a.innerHTML = "<i class=\"fa fa-bell-o\"></i>";


            
            // div.appendChild(a);
            
            // 设置样式
            div.style.cursor = "pointer";
            div.style.border = "1px solid gray";
            div.style.backgroundColor = "#00d68f36";
            div.style["border-radius"] = "15%";
            div.style["text-align"] = "center";
            div.style.width = "32px"; 
            div.style.height = "auto"; 

            // 绑定事件,点击一次放大两级
            div.onclick = function(e){
                alert("这是报警")
            }
            // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        }
        // 创建控件
        var myalertCtrl = new AlertControl();
        // 添加到地图当中
        map.addControl(myalertCtrl);
    },

    // 创建图标，设备信息
    device_info(user_deviceInfo){
        console.log("js 得到设备信息： ", user_deviceInfo);
        if (user_deviceInfo != undefined){
            var pt = user_deviceInfo.listitem.lng_lat;
            var car_path;
            if (user_deviceInfo.it.search("在线") === 0){
                car_path = "assets/pages/mobile-asset-management/images/car/ico_car_blue.png"
            };
            if (user_deviceInfo.it.search("离线") === 0){
                car_path = "assets/pages/mobile-asset-management/images/car/car_red.png"
            };
            if (user_deviceInfo.it.search("其它") === 0){
                car_path = "assets/pages/mobile-asset-management/images/car/ico_car_blue.png"
            };
            reverse_analysis_address(pt).then(result => {
                var device_conent = 
                "<div>" +
                    "<h4 style='margin: 0 0 5px; padding: 0.2em 0'>" + "设备信息" + "</h4>" +
                    "<ul style=\"padding: 0;\">"+
                        "<li class=\"device_info_li\">设备名称： "+ user_deviceInfo.it +"</li>" +
                        "<li class=\"device_info_li\">设备序号：" + user_deviceInfo.listitem.deviceno + " </li>" +
                        "<li class=\"device_info_li\">定位类型： 卫星定位</li>" +
                        "<li class=\"device_info_li\">经纬度："+ user_deviceInfo.listitem.lng_lat[0] +", "+ user_deviceInfo.listitem.lng_lat[1] + "</li>" +
                        "<li class=\"device_info_li\">更新时间： " + user_deviceInfo.listitem.updatatime + "</li>" +
                        "<li class=\"device_info_li\">定位时间： " + user_deviceInfo.listitem.positiontiome + " </li>" +
                        "<li class=\"device_info_li\">详细地址："+ result +"</li>" +
                    "</ul>"
                "</div>"
                var carIcon = new BMap.Icon(car_path, new BMap.Size(26,52),
                // var carIcon = new BMap.Icon('assets/pages/mobile-asset-management/images/car/car_gray.png', new BMap.Size(26,52),
                    { 
                        anchor: new BMap.Size(13, 13), 
                    }
                );
                // 创建图标marker
                var marker = new BMap.Marker(new BMap.Point(user_deviceInfo.listitem.lng_lat[0], user_deviceInfo.listitem.lng_lat[1]),{
                    icon: carIcon,
                });
                // 创建窗口对象
                var infoWindow = new BMap.InfoWindow(device_conent);
        
                
                // 将 marker 添加到map
                map.addOverlay(marker);

                // 以设备所在坐标位中心显示
                map.setCenter(new BMap.Point(user_deviceInfo.listitem.lng_lat[0], user_deviceInfo.listitem.lng_lat[1]))
        
                marker.openInfoWindow(infoWindow);
        
                // 监听点击事件
                marker.addEventListener('click', function() {
                    this.openInfoWindow(infoWindow);
                })
            })
        }
    },


    // 初始化离线的设备！
    initnoinline(noinlinedatas){
        noinlinedatas.device_info.forEach(element => {
            var pt = element.lng_lat;
            reverse_analysis_address(pt).then(result =>{
                var sContent = 
                "<div>" +
                    "<h4 style='margin: 0 0 5px; padding: 0.2em 0'>" + "设备信息" + "</h4>" +
                    "<ul style=\"padding: 0;\">"+
                        "<li class=\"device_info_li\">设备名称： "+ element.title +"</li>" +
                        "<li class=\"device_info_li\">设备序号：" + element.deviceno + " </li>" +
                        "<li class=\"device_info_li\">定位类型： 卫星定位</li>" +
                        "<li class=\"device_info_li\">经纬度："+ element.lng_lat[0] +", "+ element.lng_lat[1] + "</li>" +
                        "<li class=\"device_info_li\">更新时间： " + element.updatatime + "</li>" +
                        "<li class=\"device_info_li\">定位时间： " + element.positiontiome + " </li>" +
                        "<li class=\"device_info_li\">详细地址："+ result +"</li>" +
                    "</ul>"
                "</div>"

                // 离线设备点
                var noinline_point = new BMap.Point(element.lng_lat[0], element.lng_lat[1]);

                // 离线设备图标
                var noinline_carIcon = new BMap.Icon('assets/pages/mobile-asset-management/images/car/car_red.png', new BMap.Size(26,52),
                    { 
                        anchor: new BMap.Size(13, 13), 
                    }
                );

                // 离线设备图标
                var noinline_marker = new BMap.Marker(noinline_point,{
                    icon: noinline_carIcon,
                });

                
                // 将 marker 添加到map
                map.addOverlay(noinline_marker);


                
                // 监听点击事件
                addClickHandler(sContent,noinline_marker);


            })

            
            
        });
        function addClickHandler(sContent,marker){
            marker.addEventListener("click",function(e){
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var infoWindow = new BMap.InfoWindow(sContent);
                map.openInfoWindow(infoWindow,point); //开启信息窗口

            }
            );
        }
    },

    
    
    
}

// 测距控件类
function RangingControl() { 
    // 设置默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT ;
    // 设置偏移，参数1-左右，参数2-上下
    this.defaultOffset = new BMap.Size(10, 10);
}

// 报警控件类
function AlertControl() { 
    // 设置默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT ;
    // 设置偏移，参数1-左右，参数2-上下
    this.defaultOffset = new BMap.Size(100, 10);
}

// 逆向地址解析
function reverse_analysis_address(pt) {
    return new Promise((resolve, reject) => {
        var add = new BMap.Point(pt[0], pt[1]) 
        var geoc = new BMap.Geocoder();
        geoc.getLocation(add, function(rs){
            var addComp = rs.addressComponents;
            var address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
            resolve(address)
        }); 
    })
}



// 2、导出这个模块
module.exports = mapjs;