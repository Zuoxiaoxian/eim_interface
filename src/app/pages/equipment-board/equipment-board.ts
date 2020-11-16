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
    '#00FC00',
    
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
    f.result.message[0].message.forEach(m => {
    arr = [
          m[0],
          m[2].split(' ')[0],
          m[2].split(' ').splice(1).join(' '),
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



  /**
   * http请求中拿到的数据 调用子组件内部方法
   * time 目前是 1 或者 10 
   */
  export const painting_time = (f,time,isthis,arr) =>{
    let data = {};
    let x = {};
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
        //判断当前参数是否本次请求内是否有拿到值
        if(data[el.nameEn.replace(".","").toLocaleLowerCase()]){
          //将y轴的值放到组装好的对象中
          time == 1?el.value.push(data[el.nameEn.replace(".","").toLocaleLowerCase()][0]):
          el.value =  data[el.nameEn.replace(".","").toLocaleLowerCase()];

          //将x轴的值放到组装好的对象中
          if(!isthis[`attrs_${i+1}`].xData)isthis[`attrs_${i+1}`].xData = [];
          if(j==0)time == 1?isthis[`attrs_${i+1}`].xData.push(x[el.nameEn.replace(".","").toLocaleLowerCase()][0]):
          isthis[`attrs_${i+1}`].xData = x[el.nameEn.replace(".","").toLocaleLowerCase()];
          
        }
        //判断当前的x轴数组的值是否大于10 减去过长会导致显示拥挤
        if(isthis[`attrs_${i+1}`].xData.length > 10)isthis[`attrs_${i+1}`].xData.splice(0,1);
        
        //echart 数值显示是以数组下标做对应
        if(el.value.length > 10) el.value.splice(0,1);

      })

    })

    //吧当前所有的全部更新
    arr.forEach((f,i)=>{
      isthis[`chart_${i+1}`].painting({attrs:isthis[`attrs_${i+1}`][isthis.click_list[i]],xData:isthis[`attrs_${i+1}`].xData,index:1});
    })
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

export const create_third_chart_line=(rtm3a,isthis)=>{
  if(!document.getElementById('third_second'))return;
  if(echarts.init(document.getElementById('third_second')).getOption()){
    echarts.init(document.getElementById('third_second')).resize();
    return;
  }
  var yearPlanData=[],yearOrderData = [],differenceData = [],visibityData = [],xAxisData = [];
  for (var i = 0; i < 12; i++) {
    yearPlanData.push(Math.round(Math.random() * 900) + 100);
    yearOrderData.push(Math.round(Math.random() * yearPlanData[i]));
    differenceData.push(yearPlanData[i] - yearOrderData[i]);
    visibityData.push(yearOrderData[i]);
    xAxisData.push((i + 1).toString() + "月");
  }
  rtm3a.create_third_chart_line({
    yearPlanData:yearPlanData,
    yearOrderData:yearOrderData,
    differenceData:differenceData,
    visibityData:visibityData,
    xAxisData:xAxisData,
    title:isthis.language?'MonthlyChartOfTemperatureAndHumidity':'温湿度月度图线'
  }, 'third_second');
}