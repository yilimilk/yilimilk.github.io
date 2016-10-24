/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city = document.getElementById('aqi-city-input');
var air = document.getElementById('aqi-value-input');
var table = document.getElementById('aqi-table');
var flag=0;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    if(!city.value&&!air.value){
        alert('请输入城市及其空气质量指数');
        return;
    }
    var cityV = city.value.trim();
    var airV = air.value.trim();
    var reg = /^[A-Za-z\u4E00-\u9FA5]+$/;
    if(!cityV.match(reg)){
        alert('城市名必须为中文或英文');
        return;
    }
    if(!airV.match(/^[0-9]*$/)){
        alert('空气质量需为整数');
        return;
    }
    aqiData[cityV] = airV;
    flag=1;
}  
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    if (!flag) {return;}
    var str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for (var key in aqiData){
            str+='<tr><td>'+key+'</td><td>'+aqiData[key]+'</td><td><button city =' +key+'>删除</button></td></tr>'
    }
    table.innerHTML=str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {

    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').onclick = addBtnHandle;
  table.addEventListener('click', function(ev){
    var ev = ev||window.event;
    var target = ev.target||ev.srcElement;
    var node = target.nodeName||target.tagName;
    if(node.toLowerCase() == 'button'){
        delBtnHandle.call(null,target.getAttribute('city'));
    }
  });
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();