

//生成rgb 减少红色
export const rgb_del_red = ()=> {//rgb颜色随机
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var rgb = 'rgb('+r+','+g+','+b+')';
    return rgb;
}


export const colors = [
    '#F8FCF8',
    '#00FC00',
    '#0000F8',
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
    '#2074E8'
]