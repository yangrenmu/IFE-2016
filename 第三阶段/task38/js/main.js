"use strict";
let data = {
	tbody : [["火枪", "16", "21", "15"], 
			 ["蓝猫", "19", "22", "23"],
			 ["小黑", "17", "26", "15"],
			 ["老树", "25", "15", "17"],
			 ["风行", "15", "17", "22"]]
};
let table = document.getElementById('my-table');
let th = document.getElementsByClassName('th');
let k = 0;

//入口程序
init();

function init() {
	//添加表格元素	
	addTbody();
	//点击第一行,排列元素
	for (let i = 0; i < th.length; i++) {
		th[i].addEventListener('click', function() {
			if (k % 2 === 0) {
				ascend(data, i + 1);
			} else {
				descend(data, i + 1);
			}
			k++;
			table.removeChild(document.getElementsByTagName('tbody')[0]);
			addTbody();
		});
	}
	//冻结第一行
	// window.onscroll = frozen;
	window.onscroll = document.onscroll = frozen;
	// console.log(document);
}

//升序
function ascend(data, i) {
	data.tbody.sort(function(a, b) {	
		return a[i] - b[i];
	})
}
//降序
function descend(data, i) {
	data.tbody.sort(function(a, b) {	
		return -(a[i] - b[i]);
	})
}
//添加表格元素
function addTbody() {
	let tbody = document.createElement("tbody");
	table.appendChild(tbody);
	for (let i = 0; i < data.tbody.length; i++) {
		let tr = document.createElement("tr");

		for (let j = 0; j < data.tbody[0].length; j++) {
			let td = document.createElement("td");
			td.innerHTML = data.tbody[i][j];
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
}

//冻结第一行
function frozen() {
	//滚动条垂直偏移高度
	let trHead = document.getElementById('tr-head');
	let screenHeight =  document.documentElement.scrollTop || document.body.scrollTop;
	//表格离顶部的高度
	let top = table.offsetTop;
	let tableHeight = table.clientHeight + trHead.clientHeight;

	if (top - screenHeight <= 0) {
		trHead.style.position = "fixed";
		trHead.style.top = 0;
		if (tableHeight <= screenHeight ) {
			trHead.style.position = "relative";
		}
	} else {
		trHead.style.position = "relative";
	}
	console.log(tableHeight);
}
