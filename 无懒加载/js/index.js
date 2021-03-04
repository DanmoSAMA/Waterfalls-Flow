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
window.onload = function(){
    waterFall();
}

