

const num_to_maxNum=(num)=>{
    var n = parseInt(num);
    var l = 0;
    while(n>1){
        n = n/10;
        l++
    }
    return l < 2?100:Math.pow(10,l);
}

export default num_to_maxNum;