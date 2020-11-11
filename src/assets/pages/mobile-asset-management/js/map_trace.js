// 设备跟踪！

// 1、一个js文件表示一个模块

var map;


let map_trace = {
    // 初始化map地图 map_trace
    initmap(map_trace, initpoint){
        console.log("初始化map！", initpoint);
        map = new BMap.Map(map_trace); //创建地图实例
        const point = new BMap.Point(initpoint[0], initpoint[1]); //创建点坐标
        map.centerAndZoom(point, 40);//初始化地图，设置中心点坐标和地图级别， 11表示地图的展示级别
        map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
    },
    // 右下方的控件 跟踪
    trace(){
        // 通过JavaScript的prototype属性继承于BMap.Control
        TraceControl.prototype = new BMap.Control();
        TraceControl.prototype.initialize = function(map){
            // 创建一个DOM元素
            var card = document.createElement("nb-card");
            var card_body = document.createElement("nb-card-body");

            var div_row1 = document.createElement("div");
            div_row1.setAttribute("class", "row");
            var div_col_1 = document.createElement("div");
            div_col_1.setAttribute("class", "col-md-1");
            var div_col_10 = document.createElement("div");
            div_col_10.setAttribute("class", "col-md-10");

            var div_col_10_row = document.createElement("div");
            div_col_10_row.setAttribute("class", "row");
            div_col_10_row.style.height = "40%";

            var div_col_10_row_col_2 = document.createElement("div");
            div_col_10_row_col_2.setAttribute("class", "col-md-2");
            div_col_10_row_col_2.style.padding = "0px";
            div_col_10_row_col_2.style.textAlign = "right";
            div_col_10_row_col_2.appendChild(document.createTextNode("频率"));
            var div_col_10_row_col_8 = document.createElement("div");
            div_col_10_row_col_8.setAttribute("class", "col-md-8");
            var div_col_10_row_col_8_row = document.createElement("div");
            div_col_10_row_col_8_row.setAttribute("class", "row");

            var div_col_10_row_col_8_row_2 = document.createElement("div");
            div_col_10_row_col_8_row_2.setAttribute("class", "col-md-2");
            div_col_10_row_col_8_row_2.style.border = "#aec3e2 solid 1px";
            div_col_10_row_col_8_row_2.style.cursor = "pointer";
            div_col_10_row_col_8_row_2.style.borderRadius = "15px";
            div_col_10_row_col_8_row_2.setAttribute("id", "less_div");

            var div_col_10_row_col_8_row_8 = document.createElement("div");
            div_col_10_row_col_8_row_8.setAttribute("class", "col-md-8")
            var div_col_10_row_col_8_row_2_2 = document.createElement("div");
            div_col_10_row_col_8_row_2_2.setAttribute("class", "col-md-2")
            div_col_10_row_col_8_row_2_2.style.border = "#aec3e2 solid 1px";
            div_col_10_row_col_8_row_2_2.style.cursor = "pointer";
            div_col_10_row_col_8_row_2_2.style.borderRadius = "15px";
            div_col_10_row_col_8_row_2_2.setAttribute("id", "add_div");

            var less = document.createElement("img");
            less.setAttribute("src", "assets/gps/pictures/minus-outline2.png");
            less.style.width = "100%";
            less.style.height = "auto";
            less.setAttribute("id", "less_div_img");
            var add = document.createElement("img");
            add.setAttribute("src", "assets/gps/pictures/plus-outline2.png");
            add.style.width = "100%";
            add.style.height = "auto";
            add.setAttribute("id", "add_div_img");


            var progress = document.createElement("input");
            progress.setAttribute("value", "9000");
            progress.setAttribute("type", "text");
            progress.setAttribute("id", "trace_value");
            progress.style.width = '100%';
            progress.style.textAlign = "center";

            var div_col_10_row2 = document.createElement("div");
            div_col_10_row2.setAttribute("class", "row");
            div_col_10_row2.style.marginTop = "20px";
            var div_col_10_row2_col1 = document.createElement("div");
            div_col_10_row2_col1.setAttribute("class", "col-md-4");
            var div_col_10_row2_col2 = document.createElement("div");
            div_col_10_row2_col2.setAttribute("class", "col-md-4");
            div_col_10_row2_col2.style.textAlign = "center";
            var div_col_10_row2_col2_button = document.createElement("button");
            div_col_10_row2_col2_button.innerHTML = "播放";
            div_col_10_row2_col2_button.style.borderRadius = "10px";
            div_col_10_row2_col2_button.style.border = "1px green solid";
            div_col_10_row2_col2_button.style.padding = "10px";
            div_col_10_row2_col2_button.style.backgroundColor = "green";

            var div_col_10_row2_col3 = document.createElement("div");
            div_col_10_row2_col3.setAttribute("class", "col-md-4");

            div_col_10_row2_col2.appendChild(div_col_10_row2_col2_button);
            div_col_10_row2.appendChild(div_col_10_row2_col1);
            div_col_10_row2.appendChild(div_col_10_row2_col2);
            div_col_10_row2.appendChild(div_col_10_row2_col3);




            var div_col_10_row_col_2_2 = document.createElement("div");
            div_col_10_row_col_2_2.setAttribute("class", "col-md-2");
            div_col_10_row_col_2_2.style.padding = "3px 7px";
            div_col_10_row_col_2_2.appendChild(document.createTextNode("毫秒"));


            var div_col_1_2 = document.createElement("div");
            div_col_1_2.setAttribute("class", "col-md-1");
            div_row1.appendChild(div_col_1);

            div_col_10_row_col_8_row_2.appendChild(less);
            div_col_10_row_col_8_row_8.appendChild(progress);
            div_col_10_row_col_8_row_2_2.appendChild(add);

            div_col_10_row_col_8_row.appendChild(div_col_10_row_col_8_row_2);
            div_col_10_row_col_8_row.appendChild(div_col_10_row_col_8_row_8);
            div_col_10_row_col_8_row.appendChild(div_col_10_row_col_8_row_2_2);

            div_col_10_row_col_8.appendChild(div_col_10_row_col_8_row);

            
            div_col_10_row.appendChild(div_col_10_row_col_2);
            div_col_10_row.appendChild(div_col_10_row_col_8);
            div_col_10_row.appendChild(div_col_10_row_col_2_2);
            div_col_10.appendChild(div_col_10_row);
            div_col_10.appendChild(div_col_10_row2);
            
            div_row1.appendChild(div_col_10);
            div_row1.appendChild(div_col_1_2);


            card.style.minWidth = "100px";
            card.style.maxWidth = "500px";
            

            // 绑定事件,点击less 按钮
            less.onclick = function(e){
                var less_value = Number(progress.getAttribute("value"));
                if (less_value > 1000){
                    less_value -= 1000;
                    progress.setAttribute("value", String(less_value));
                    console.log("======================: ", less_value)
                }
            }

            // 绑定事件,点击add 按钮
            add.onclick = function(e){
                var add_value = Number(progress.getAttribute("value"));
                if (add_value < 10000){
                    add_value += 1000;
                    progress.setAttribute("value", String(add_value));
                    console.log("======================: ", add_value)
                }
            }

            // 绑定事件,点击放 按钮
            div_col_10_row2_col2_button.onclick = function(e){
                var div_col_10_row2_col2_button_inner = div_col_10_row2_col2_button.innerHTML;
                if (div_col_10_row2_col2_button_inner == "播放"){
                    div_col_10_row2_col2_button.innerHTML = "暂停";
                    div_col_10_row2_col2_button.style.backgroundColor = "yellow";
                }
                else{
                    div_col_10_row2_col2_button.innerHTML = "播放";
                    div_col_10_row2_col2_button.style.backgroundColor = "green";
                }
            }
            // 添加DOM元素到地图中
            card_body.appendChild(div_row1);
            card.appendChild(card_body)
            map.getContainer().appendChild(card);
            // 将DOM元素返回
            return card;
        }
        // 创建控件
        var myrangingCtrl = new TraceControl();
        // 添加到地图当中
        map.addControl(myrangingCtrl);
    },

    // 定位设备位置
    localtion_device(text){
        console.log("定位设备位置", text);
        var car_path;
        if (text.it.search("在线") === 0){
            car_path = "assets/pages/mobile-asset-management/images/car/ico_car_blue.png"
        };
        if (text.it.search("离线") === 0){
            car_path = "assets/pages/mobile-asset-management/images/car/car_red.png"
        };
        if (text.it.search("其它") === 0){
            car_path = "assets/pages/mobile-asset-management/images/car/ico_car_blue.png"
        };
        
        

        text.listitem.device_info.forEach(element => {
            if (element.title === text.it){
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
                    var noinline_carIcon = new BMap.Icon(car_path, new BMap.Size(26,52),
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

                function addClickHandler(sContent,marker){
                    marker.addEventListener("click",function(e){
                        var p = e.target;
                        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                        var infoWindow = new BMap.InfoWindow(sContent);
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
        
                    }
                    );
                }

            }
        });
    },
};

// 跟踪控件类
function TraceControl() { 
    // 设置默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT ;
    // 设置偏移，参数1-左右，参数2-上下
    this.defaultOffset = new BMap.Size(10, 10);
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
module.exports = map_trace;