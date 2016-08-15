window.onload=function(){	
	showTime();	
}

function showTime(){
	// 	var myDate=new Date(),
	// 	year=myDate.getFullYear(),
	// 	month=myDate.getMonth()+1,
	// 	date=myDate.getDate(),
	//  	weekday= ['天','一','二','三','四','五','六'],
	//     d=myDate.getDay();
	//     hour=myDate.getHours(),
	//     min=myDate.getMinutes(),
	//     sec=myDate.getSeconds();
	// hour=checkTime(hour);
	// min=checkTime(min);
	// sec=checkTime(sec);
	// document.getElementById('show').innerHTML=year+'年'+month+'月'+date+'日 '+'星期'+weekday[d]
	// 						+hour+':'+min+':'+sec;
	// setTimeout(showTime,500);

	var curTime=new Date();
	var endTime=new Date("2016/8/6 07:00");
	var lastTime=endTime.getTime()-curTime.getTime();
	var lastTimeday=Math.floor(lastTime/(24*60*60*1000));

	lastTime=lastTime-lastTimeday*(24*60*60*1000);
	var lastTimehour=Math.floor(lastTime/(60*60*1000));

	lastTime=lastTime-lastTimehour*(60*60*1000);
	var lastTimeminute=Math.floor((lastTime)/(60*1000));

	lastTime=lastTime-lastTimeminute*(60*1000);
	var lastTimesecond=Math.floor(lastTime/(1000));

	document.getElementById('show').innerHTML= "<span class=\"digit\">" +lastTimeday+ "</span> 天"
											  +"<span class=\"digit\">" +lastTimehour+ "</span> 时"
											  +"<span class=\"digit\">"	+lastTimeminute+"</span> 分"
											  +"<span class=\"digit\">" +lastTimesecond+"</span> 秒";

	setTimeout(showTime,500);
}

// function checkTime(i){
// 	if(i<10){
// 		i='0'+i;
// 	}
// 	return i;
// }