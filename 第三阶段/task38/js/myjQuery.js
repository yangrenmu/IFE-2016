// "use strict";
//添加给元素事件
function addEvent(element, event, handler) {
	if (element.addEventListener) {
		element.addEventListener(event, handler, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, handler);
	} else {
		element["on" + event] = handler;
	}
}
//获取元素的className
function getByClassName(ClassName) {
	if (document.getElementsByClassName) {
		return document.getElementsByClassName(ClassName);
	} else {
		let ele = document.getElementsByTagName('*');
		let arr = [];
		for (let i = 0; i < ele.length; i++) {
			if (ele[i] === ClassName) {
				arr.push(ele[i]);
			}
		}
		return arr;
	}
}