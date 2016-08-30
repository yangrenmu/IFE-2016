/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById('aqi-city-input').value.trim(),
		num=document.getElementById('aqi-value-input').value.trim();
	/*a1.正则表达式：
	^:开始匹配；
	[A-z\u4e00-\u9fff]：查找[]之间任何字符；
	A-z:查找任何从大写 A 到小写 z 的字符；
	\u4e00-\u9fff：查找中文字符；
	n+:匹配任何包含至少一个 n 的字符串。
	*/
	/*a2.return:终止函数的执行并返回函数的值。
	此处作用是弹出城市名必须为中英文后，不再弹出下面的alert*/
	if(!city.match(/^[A-z\u4e00-\u9fff]+$/)){
		alert("城市名必须为中英文");
		return;
	}
	if(!num.match(/^\d+$/)){
		alert("空气质量指数必须为整数");
		return;	
	}
	aqiData[city]=num;/*a3.为aqiData对象添加值为num的city属性*/	
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	var flag=false;
	for(var p in aqiData){
		items=items+"<tr><td>"+p+"</td>"+"<td>"+aqiData[p]+"</td>"+
		"<td><button>删除</button></td>";
		flag=true;
	}
	if(flag){
		document.getElementById('aqi-table').innerHTML=items;
	}else{
		document.getElementById('aqi-table').innerHTML="";
	}
	
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
  	var tr=city.parentNode.parentNode;
  	delete aqiData[tr.childNodes[0].innerHTML];
  	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  /*a3.addEventListener:给元素绑定事件*/
  	document.getElementById('add-btn').addEventListener('click',addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	document.getElementById('aqi-table').addEventListener('click',function(e){
  		if(e.target.nodeName==="BUTTON"){
  			delBtnHandle(e.target);
  		}
  	});
}

init();

