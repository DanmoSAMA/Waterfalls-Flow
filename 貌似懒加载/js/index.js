let items = document.getElementsByClassName("item");
let gap = 12;

//瀑布流
function waterFall(){
    let pageWidth = getClient().width;
    let itemWidth = items[0].offsetWidth;
    //列数 = 页面的宽度 / 图片的宽度
    let columns = parseInt(pageWidth/(itemWidth + gap));
    //定义一个数组，用来存储元素的高度
    let arr = [];
    for(let i = 0; i < items.length; i++){
        if(i < columns){
            //满足这个条件则说明在第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);
        }
        else{
            //其他行，先找出最小高度列，和索引
            let minHeight = arr[0];
            let index = 0;
            for(let j = 0; j < arr.length; j++){
                if(minHeight > arr[j]){
                    minHeight = arr[j];
                    index = j;
                } 
            }
            items[i].style.top = arr[index] + gap + 'px';
            items[i].style.left = items[index].offsetLeft + 'px';
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
}
//clientWidth 兼容性处理
function getClient(){
    return{
        width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        Height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
//scrollTop兼容性处理
function getScrollTop(){
    return window.pageYOffset || document.documentElement.scrollTop;
}
//当页面尺寸发生变化时，触发函数，实现响应式
window.onresize = function () {
    waterFall();
}

//懒加载

//num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
let num = 0;
let limit = 10;
function lazyLoad(){
    if(limit < items.length){
        limit += 10;
        //每次只加载出一部分图片
    }
    let viewHeight = getClient().Height;
    for (let i = num; i < limit; i++) {
        //用可视区域高度减去元素顶部距离可视区域顶部的高度
        let distance = viewHeight - items[i].getBoundingClientRect().top;
        //如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
        if (distance >= 0) {  
            items[i].className = "item item-loaded"
            setTimeout(function(){
                waterFall();
            },10)
            //每次加载出图片时重新设置waterFall函数，防止图片重叠在一起
          //前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
        }
        num = i + 1;
    }
}
function debounce(fn, delay = 500) {
    //防抖函数
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args);
      }, delay);
    };
}
window.onload = function(){
    waterFall();
}
window.addEventListener("scroll", debounce(lazyLoad, 500), false);

