sizeChange();//初次调用设置
function sizeChange(){
    //获取当前布局视口
    let viewWidth = document.documentElement.clientWidth;
    //计算根字体大小
    let rootFontSize = viewWidth / 10;
    //设置根字体大小
    document.documentElement.style.fontSize =  rootFontSize + "px";
}

window.onresize = sizeChange;