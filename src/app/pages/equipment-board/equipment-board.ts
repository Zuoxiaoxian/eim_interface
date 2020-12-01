// 引入jquery
declare var $:any;

//生成rgb 减少红色
export const rgb_del_red = ()=> {//rgb颜色随机
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var rgb = 'rgb('+r+','+g+','+b+')';
    return rgb;
}


export const colors = [
    '#2074E8',
    '#F8FC00',
    '#00FCF8',
    '#F800F8',
    '#C8CCC8',
    '#40C040',
    '#C8CC40',
    '#40CCC8',
    '#286428',
    '#18F818',
    '#F8FC00',
    '#00FCF8',
    '#70B8B8',
    '#3870A0',
    '#D87058',
    '#987858',
    '#7878B8',
    '#D09848',
    '#804878',
    '#90AC58',
    '#9060B8',
    '#90AC58',
    '#5050A8',
    '#90AC58',
    '#7030A0',
    '#202420',
    '#F8FCF8',
    '#0000F8',
    '#00FC00',
]


export const dateformat=(date:Date,format:string)=>{
    let timer = {
        'M+':date.getMonth()+1,//月
        'd+':date.getDate(),//日
        'h+':date.getHours(),//小时
        'm+':date.getMinutes(),//分钟
        's+':date.getSeconds(),//秒
        'S+':date.getMilliseconds(),//毫秒
    }
    if((/(y+)/i.test(format))){
        format = format.replace(RegExp.$1,(date.getFullYear()+ '').substr(4-RegExp.$1.length));
    }
    for(let k in timer){
        if(RegExp('('+k+')').test(format)){
            format = format.replace(RegExp.$1,RegExp.$1.length === 1?timer[k]:('00'+timer[k]).substr(('' + timer[k]).length));
        }
    }

    return format;
}


export const  getMessage=(f,data)=>{
    let arr:any = [];
    var aee = [];
    var i = 0;
    f.result.message[0].message.forEach(m => {
      aee = m[2].split(' ');
      i = aee.findIndex(f => f && f !=' ');
      arr = [
          m[0],
          aee[i],
          aee.splice(i+1).join(' '),
          m[1],
        ]
      if(!data.find(g => g[0] == arr[0] && g[1] == arr[1] && g[2] == arr[2])){
        data.push(
          arr
        )
      }
    });
    //锁定滚动条最下面
    var showContent = $(".overflow_height_85");
    showContent[0].scrollTop = showContent[0].scrollHeight;
}

export const copy=(d)=>{
  return JSON.parse(JSON.stringify(d));
}


/**
 * http请求中拿到的数据 调用子组件内部方法
 * time 目前是 1 或者 10 
 */
export const painting_time = (f,time,isthis,arr) =>{
  let timest = new Date().getTime();
  let data = {};
  let x = {};
  if(!f.result.message || !f.result.message[0].message)return;
  //拿接口请求到达的数据
  f.result.message[0].message.forEach((el,i) => {
    for(let key in el){
      //将y轴数据打包成key string  value数组
      time == 1?(data[key] = [], data[key].push(el[key][0][0])):data[key] = el[key].map(m => (m[0]?m[0]:0));
      let arr = el[key];
      //将x轴数据打包成key string  value数组
      time == 1?(x[key] = [],x[key].push(dateformat(new Date(arr[0][1]),'dd:hh:ss')))
      :x[key] =  arr.map(m =>( dateformat(new Date(m[1]),'dd:hh:ss')));
    }
  });
  //进行匹配赋值
  isthis.click_list.forEach((f,i)=>{
      isthis[`attrs_${i+1}`][f].forEach((el,j) => {
      // if(isthis[`attrs_${i+1}`].xData.length != el.value.length)
      //     el.value.splice(isthis[`attrs_${i+1}`].xData.length);

      //判断当前参数是否本次请求内是否有拿到值
      if(data[el.nameEn.replace(".","").toLocaleLowerCase()]){
        //将y轴的值放到组装好的对象中
        time == 1?el.value.push(data[el.nameEn.replace(".","").toLocaleLowerCase()][0]):
        (el.value = [],el.value =  data[el.nameEn.replace(".","").toLocaleLowerCase()]);

        //将x轴的值放到组装好的对象中
        if(!isthis[`attrs_${i+1}`].xData)isthis[`attrs_${i+1}`].xData = [];
        if(j==0)time == 1?isthis[`attrs_${i+1}`].xData.push(x[el.nameEn.replace(".","").toLocaleLowerCase()][0]):
        (isthis[`attrs_${i+1}`].xData = [],isthis[`attrs_${i+1}`].xData = x[el.nameEn.replace(".","").toLocaleLowerCase()]);
        
      }
      

      //判断当前的x轴数组的值是否大于10 减去过长会导致显示拥挤
      if(isthis[`attrs_${i+1}`].xData.length > 10 && time == 1)
        isthis[`attrs_${i+1}`].xData.splice(0,isthis[`attrs_${i+1}`].xData.length-10);
      
      
      //echart 数值显示是以数组下标做对应    判断x轴和数据是否是相同的数量
      if(el.value.length > 10 && time == 1)
          el.value.splice(0,el.value.length-10);
    })

  })

  //吧当前所有的全部更新
  arr.forEach((f,i)=>{
    isthis[`chart_${i+1}`].painting({attrs:isthis[`attrs_${i+1}`][isthis.click_list[i]],xData:isthis[`attrs_${i+1}`].xData,index:1});
  })
  console.log('本次时长',new Date().getTime()-timest)
}


export const guid2=()=> {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export const list_jion =(list,name,isthis)=>{
  list.forEach((f,i)=>{
    isthis[name][f].forEach(element => {
      element.value.push(parseInt((Math.random()*100).toString()))
      if(element.value.length > 10)element.value.splice(0,1)
    });
  })
}
export const list_copy=(list,name,isthis)=>{
  list.forEach((f,i)=>{
    isthis[name][f] = JSON.parse(JSON.stringify(isthis.attrs));
  })
}
export const list_copy_new = (list,attr,name,isthis)=>{
  list.forEach(element => {
    isthis[name][element] = copy(attr);
  });
  isthis[name].xData = [];
}

export const list_jion_new = (list,name,isthis)=>{
  list.forEach((f,i)=>{
    isthis[name][f].forEach(element => {
      element.value.push(parseInt((Math.random()*100).toString()));
      if(element.value.length > 10)element.value.splice(0,1)
    });
  });
  isthis[name].xData.push(dateformat(new Date(),'mm:ss'));
  if(isthis[name].xData.length>10)isthis[name].xData.splice(0,1)
}

export const create_third_chart_line=(rtm3a,isthis)=>{
  if(!document.getElementById('third_second'))return;
  if(echarts.init(document.getElementById('third_second')).getOption()){
    echarts.init(document.getElementById('third_second')).resize();
    return;
  }
  var yearPlanData=[],yearOrderData = [],differenceData = [],visibityData = [],xAxisData = [];
  // for (var i = 0; i < 12; i++) {
  //   yearPlanData.push(Math.round(Math.random() * 900) + 100);//温度
  //   yearOrderData.push(Math.round(Math.random() * yearPlanData[i]));//湿度
  //   differenceData.push(yearPlanData[i] - yearOrderData[i]);
  //   visibityData.push(yearOrderData[i]);
  //   xAxisData.push((i + 1).toString() + "月");
  // }
  
  // data.tempreal.forEach(element => {
  //   xAxisData.push(element[1]);//x轴时间
  //   yearPlanData.push();
  //   yearOrderData.push();
  // });
  rtm3a.create_third_chart_line({
    yearPlanData:yearPlanData,
    yearOrderData:yearOrderData,
    differenceData:differenceData,
    visibityData:visibityData,
    xAxisData:xAxisData,
    title:isthis.language?'MonthlyChartOfTemperatureAndHumidity':'温湿度月度图线'
  }, 'third_second');
}

//液压伺服设备介绍
export const hydraulic_htmlstr = [
  `1.主要功能用途：底盘结构件台架试验如：副车架、摆臂、稳定杆、后桥等<br>
  2.使用标准\规范 <br>
  &emsp;Q/JLY J7110489B-2016  乘用车前、后副车架总成技术条件 <br>
  &emsp;Q/JLY J7110439D-2016 J05204 悬架摆臂总成类技术条件 <br>
  &emsp;Q/JLY J7110490B-2016 J05204 后桥总成（扭力梁）技术条件<br>
  &emsp;Q/JLY J7110371C-2016 J05204 前、后稳定杆总成技术条件等<br>
  <div class="equipments_table">
    <div class="equipments_table_title" style="padding-right: 10px">3.设备构成及参数</div>
    <div  class="column_20 border_1px">
      <div>名称</div>
      <div class="border_top_1px">MTS直线缸</div>
    </div>
    <div  class="column_42 border_1px">
      <div>基本参数</div>
      <div class="border_top_1px">载荷：±25kN；位移：±125mm</div>
      <div class="border_top_1px">载荷：±50kN；位移：±125mm</div>
    </div>
    <div  class="column_20 border_1px">
      <div>数量</div>
      <div class="border_top_1px">4</div>
      <div class="border_top_1px">2</div>
    </div>
  </div>
  `
]

  //四立柱设备介绍
export const  four_road_htmlstr = [
  `1、主要功能用途<br>
  &emsp;验证车身内外饰在振动加高低温及光照条件结构的耐久性能<br>
  2、使用标准\规范<br>
  &emsp;Q/JLY J7210680A-2017<br>
  &emsp;带环境条件的四立柱耐久试验规范<br>
  &emsp;Q/JLY J7210624A-2016<br>
  &emsp;整车四通道轮耦合道路模拟试验规范<br>

`,

` <div class="equipments_table height_99">
  <div class="column_65 border_1px">
    <div class="border_top_1px height_10">名称 name</div>
    <div class="border_top_1px height_11">最大整车重量 Max.GVW	Up to</div>
    <div class="border_top_1px height_11">轴距 Wheel base</div>
    <div class="border_top_1px height_11">轮距 Track width</div>
    <div class="border_top_1px height_11">轮胎宽度 Tire width</div>
    <div class="border_top_1px height_11">作动器最大承载
         Actuator Max. Forc</div>
    <div class="border_top_1px height_11">作动器最大行程
          Actuator Max. stroke</div>
    <div class="border_top_1px height_11">作动器最大速度
         Actuator Max. Velocity</div>
    <div class="border_top_1px height_11">轮盘最大加速度
         Max Acceleration</div>
  </div>
  <div class="column_35 border_1px">
    <div class="border_top_1px height_10">基本参数 specifications</div>
    <div class="border_top_1px height_11">3500kg</div>
    <div class="border_top_1px height_11">2m-3.5m</div>
    <div class="border_top_1px height_11">1.2m-1.8m</div>
    <div class="border_top_1px height_11">13 to 20 inches</div>
    <div class="border_top_1px height_11">50kN</div>
    <div class="border_top_1px height_11">±150 mm</div>
    <div class="border_top_1px height_11">3.0  m/s </div>
    <div class="border_top_1px height_11">21g</div>
  </div>
</div>
`,
];


  //六自由度设备介绍
export const shock_htmlStr = [
  `
  1.主要功能用途<br>
  &emsp;主要验证发动机悬置系统的耐久性能，以及其它车辆子系统耐久性能验证如：前端冷却模块、座椅系统、天窗系统等<br>
  2.使用标准\规范<br>
  &emsp;Q/JLY J7111070B-2018<br>
  &emsp;悬置系统六自由度道路模拟试验规范<br>
  &emsp;Q/JLY J7210623A-2016<br>
  &emsp;六自由度振动台道路模拟试验规范 <br>
  `,
  `
  <div class="equipments_table height_99">
  <div class="column_31 border_1px">
    <div class="border_top_1px height_10">名称 name</div>
    <div class="border_top_1px height_29">速度 
    Velocities</div>
    <div class="border_top_1px height_30">频率
    Frequency
    </div>
    <div class="border_top_1px height_30">位移Displacement </div>
  </div>
  <div class="column_69 border_1px">
    <div  class="border_top_1px height_10">基本参数  Specifications
    </div>
    <div class="border_top_1px height_29">垂向1.2m/s、横向0.9m/s、纵向1.0m/s
    Vertica1.2m/s、Lateral0.9m/s、Longitudinal1.0m/s
    </div>
    <div class="border_top_1px height_30">0-80Hz
    </div>
    <div class="border_top_1px height_30">垂向±140mm、横向   110mm、纵向  125mm
    Vertical ±140mm、Lateral  110mm、Longitudinal  125mm
    </div>
  </div>
</div>
`,`
<div class="equipments_table height_99">
<div class="column_31 border_1px">
  <div class="border_top_1px height_10">名称 name</div>
  <div class="border_top_1px height_50">旋转角
  Rotations</div>
  <div class="border_top_1px height_20">台面尺寸 
  Table Size 
  </div>
  <div class="border_top_1px height_20">承载范围Payload
  </div>
</div>
<div class="column_69 border_1px">
  <div  class="border_top_1px height_10">基本参数  Specifications
  </div>
  <div class="border_top_1px height_49">滚动 – 绕X轴 8.0 deg、俯仰 – 绕Y轴 7.0 deg、偏航 – 绕Z轴 5.5 deg
  Roll - (X) axis 8.0 deg、Pitch - (Y) axis 7.0 deg、Yaw- (Z) axis 5.5 deg
  </div>
  <div class="border_top_1px height_20">约为2.2 米 x 2.2米 方台面
  approximately 2.2 m x 2.2m square
  </div>
  <div class="border_top_1px height_20">最大负载    1000千克
  Max Payload   1000kg
  </div>
</div>
</div>
`
]