'use strict';
function ShowPhoto() {
	this.flag = 1;
	//拼图布局参数
	this.imageShow = document.getElementById('imageShow');
	//瀑布布局参数
	
	this.columnNumber = 5;
	this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	this.distance = 10;
	//木桶布局参数
	this.boxWidth = 1000;
	this.minHeight = 250;
	this.imgRadio = [];
	this.imageNum = 12;
} 
ShowPhoto.prototype = {
	constructor : ShowPhoto,
	//拼图布局
	jointPhoto : function() {
		let self = this;
		let inputValue = document.getElementById('input-box');
		let hint = document.getElementById('hint');
		let buttonBox = document.getElementsByClassName('button-box');
		//默认为800px,显示一张图
		self.imageShow.style.width = '800px';
		self.imageShow.style.height = '500px';
		inputValue.value = '';
		self.onePic();
		addEvent(inputValue, 'blur', function() {
			let test = (/^[123456]$/).test(inputValue.value);
			if (test) {
				hint.innerHTML = '';				
			} else {
				hint.innerHTML = '请输入数字1-6';
			}
		})
		addEvent(buttonBox[0], 'click', function() {	
			let test = (/^[123456]$/).test(inputValue.value);
			if (test) {		
				switch(inputValue.value) {
					case '1':
						self.onePic();
						break;
					case '2':
						self.twoPic();
						break;
					case '3':
						self.threePic();
						break;
					case '4':
						self.fourPic();
						break;
					case '5':
						self.fivePic();
						break;
					case '6':
						self.sixPic();
						break;
				}
			} 
		})		
	},
	onePic : function() {
		this.imageShow.innerHTML = this.addPic(1);
	},
	twoPic : function() {
		this.imageShow.innerHTML = this.addPic(2);
	},
	threePic : function() {
		this.imageShow.innerHTML = this.addPic(3);
	},
	fourPic : function() {
		this.imageShow.innerHTML = this.addPic(4);
	},
	fivePic : function() {
		this.imageShow.innerHTML = this.addPic(5);
	},
	sixPic : function() {
		this.imageShow.innerHTML = this.addPic(6);
	},
	addPic : function(num) {
		let pic = '';
		for (let i = 1; i <= num; i++) {
			pic += '<img class="box' + num + 'Pic' + i + '" src="img/pic' + i + '.jpg" alt="pic' + i + '">'
		}
		return pic;
	},
	//瀑布流布局
	waterPhoto : function() {				
		this.create();
		this.scroll();
		this.control();
	},
	//加载初始页面
	create : function() {
		let columnWidth = 210;
		let self = this;
		self.imageShow.style.width = '90%';
		self.imageShow.style.height = '';
		self.imageShow.style.display = 'flex';
		self.imageShow.style.alignItems = 'flex-start';
		let htmlColumn = '';
		for (let i = 0; i < self.columnNumber; i++) {
			htmlColumn += '<div id="waterfallColumn-'+ i +'" class="column" style="padding-left:'+ self.distance +'px">' +
			(function() {
				let image = '';
				let index = 0;
				for (let j = 0; j < 7; j++) {
					if (index > 14) {
						index = Math.round(Math.random() * 14 + 1);
					} else {
						index =i+j+1;
					}					
					image += '<img class="picture" src="img/'+ index +'.jpg"/>';
				}
				return image;
			})() + '</div>';			
		}
		imageShow.innerHTML = htmlColumn;		
	},
	//滚动载入图片
	scroll : function() {
		let self = this;		
		window.onscroll = function() {
			if (self.flag === 2)  {
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if (Math.abs(scrollTop - self.scrollTop) > 50) {
					self.scrollTop = scrollTop;
					self.appendImage();
				}
			}
		}	
	},
	//滚动到底部时，载入图片
	appendImage : function() {
		let self = this;
		for (let i = 0; i < this.columnNumber; i++) {
			let eleColumn = document.getElementById("waterfallColumn-" + i);
			if (self.imageShow.offsetTop + eleColumn.clientHeight < this.scrollTop + document.documentElement.clientHeight) {
				let imgEle = document.createElement("img");
				imgEle.className = 'picture';
				imgEle.src = 'img/' + Math.round(Math.random() * 14 + 1) + '.jpg';
				eleColumn.appendChild(imgEle);
			}
		}
	},
	control : function() {
		let self = this;
		let columnSpanLeft = document.getElementById('column-span-left');
		let columnSpanMiddle = document.getElementById('column-span-middle');
		let columnSpanRight = document.getElementById('column-span-right');
		let distanceSpanLeft = document.getElementById('distance-span-left');
		let distanceSpanMiddle = document.getElementById('distance-span-middle');
		let distanceSpanRight = document.getElementById('distance-span-right');
		addEvent(columnSpanLeft, 'click', function() {
			if (self.columnNumber > 1) {
				self.columnNumber--;
				columnSpanMiddle.innerHTML = self.columnNumber;
				self.waterPhoto();
			}			
		});
		addEvent(columnSpanRight, 'click', function() {
			if (self.columnNumber < 10) {
				self.columnNumber++;
				columnSpanMiddle.innerHTML = self.columnNumber;
				self.waterPhoto();
			}
		});
		addEvent(distanceSpanLeft, 'click', function() {
			if (self.distance > 0) {
				self.distance--;
				if (self.distance < 10) {
					self.distance = '0' + self.distance;
				}
				distanceSpanMiddle.innerHTML = self.distance + 'px';
				self.waterPhoto();
			}			
		});
		addEvent(distanceSpanRight, 'click', function() {
			if (self.distance < 30) {
				self.distance++;
				if (self.distance < 10) {
					self.distance = '0' + self.distance;
				}
				distanceSpanMiddle.innerHTML = self.distance + 'px';
				self.waterPhoto();
			}			
		});
	},
	//木桶布局
	barrelPhoto : function() {
		//计算图片长宽比
		this.calculateImageRadio();		
		//显示图片
		this.renderImage();
		
	},
	//计算图片长宽比
	calculateImageRadio : function() {
		let self = this;
		self.imageShow.innerHTML = '';
		self.imageShow.style.width = self.boxWidth + 'px';
		//载入图片	
		self.loadImage();			
		
		
	},
	loadImage : function() {
		let imageHtml = '';
		let self = this;
		let radio = 0;
		let imgSize = [];
		for (let i = 1; i < self.imageNum + 1; i++) {
			// imageHtml += '<img class="barrelImg" src="img/'+ i +'.jpg">';
			let img = document.createElement("img");
			img.className = 'barrelImg';
			img.src = 'img/' + i + '.jpg';
			if (img.width > 0 && img.height > 0) {
				imgSize[i - 1] = {
					width : img.width,
					height : img.height
				};
				radio = imgSize[i - 1].width / imgSize[i - 1].height;
				self.imgRadio[i - 1] = {
					radio : radio
					// radio : parseFloat(radio.toFixed(3))
				};	
			}			
		}
	},
	//显示图片
	renderImage : function() {
		let self = this;
		self.imageShow.innerHTML = '';
		self.imageShow.style.display = 'block';
		let minRadio = self.boxWidth / self.minHeight;		
		// minRadio = parseFloat(minRadio.toFixed(3));
		let rowArray = [];
		let count = 0;
		let rowHtml = '';
		let length = self.imgRadio.length;	
		for (let i = 0; i < length; i++) {
			// console.log(count);	
			if ((count + self.imgRadio[i].radio) > minRadio) {				
				rowArray[i] = document.createElement('div');
				rowArray[i].className = 'barrelRow';
				rowArray[i].innerHTML = rowHtml;
				self.imageShow.appendChild(rowArray[i]);
				rowArray[i].style.height = (self.boxWidth / count + 'px');
				// console.log(rowArray[i]);
				count = self.imgRadio[i].radio;
				rowHtml = '<img src="img/'+ (i + 1) +'.jpg">';				
				// console.log(rowArray[i]);
			} else {
				rowHtml += '<img src="img/'+ (i + 1) +'.jpg">';	
				count += self.imgRadio[i].radio;				
			}			
		}
		if (count === self.imgRadio[length - 1].radio) {
			rowArray[length - 1] = document.createElement('div');
			rowArray[length - 1].className = 'barrelRow barrelRow-last';
			rowArray[length - 1].innerHTML = '<img src="img/'+ (length) +'.jpg">';
			self.imageShow.appendChild(rowArray[length - 1]);
			rowArray[length - 1].style.height = self.minHeight + 'px';
		} else {
			rowArray[length - 1] = document.createElement('div');
			rowArray[length - 1].className = 'barrelRow barrelRow-last';
			rowArray[length - 1].innerHTML = rowHtml;
			self.imageShow.appendChild(rowArray[length - 1]);
			rowArray[length - 1].style.height = self.minHeight + 'px';
		}
	}
}
let showPhoto = new ShowPhoto();

function ChoiceMode() {
}
ChoiceMode.prototype = {
	constructor : ChoiceMode,
	init : function() {
		let lis = document.getElementsByClassName('select-li');
		let select = document.getElementById('select');
		let jointBox = document.getElementById('joint-box');
		let waterfall = document.getElementById('waterfall');
		let selectMenu = document.getElementsByClassName('select-menu');
		let selectValue = document.getElementById('select-value');
		//点击出现下拉列表
		addEvent(selectMenu[0], 'click', function() {
			if (select.style.visibility === '') {
				select.style.visibility = 'hidden';
			}
			choiceMode.toggle();
		});
		//失去焦点，隐藏下拉列表
		addEvent(selectMenu[0], 'blur', function() {
			select.style.visibility = 'hidden';
		});
		//选择布局
		for (let i = 0; i < lis.length; i++) {
			addEvent(lis[i], 'click', function() {
				for (let j = 0; j < lis.length; j++) {
					if (j === i) {
						lis[j].dataset.selected = 'selected';
					} else {
						lis[j].dataset.selected = '';
					}
				}
				if (lis[i].dataset.selected === 'selected') {
					selectValue.innerHTML = lis[i].dataset.value;
				}
				//拼图布局
				if (lis[i].dataset.value === '拼图布局') {
					showPhoto.flag = 1;
					jointBox.style.visibility = 'visible';
					showPhoto.jointPhoto();
				} else {
					jointBox.style.visibility = 'hidden';
				}
				//瀑布流布局
				if (lis[i].dataset.value === '瀑布布局') {
					showPhoto.flag = 2;
					waterfall.style.visibility = 'visible';
					showPhoto.waterPhoto();
				} else {
					waterfall.style.visibility = 'hidden';
				}	
				if (lis[i].dataset.value === '木桶布局') {
					showPhoto.flag = 3;
					showPhoto.barrelPhoto();
				}			
			});
			//默认为拼图布局
			if (lis[i].dataset.selected === 'selected') {
				selectValue.innerHTML = lis[i].dataset.value;
				jointBox.style.visibility = 'visible';
				showPhoto.jointPhoto();
			}
			// if (lis[i].dataset.selected === 'selected') {
			// 	showPhoto.flag = 3;
			// 	selectValue.innerHTML = lis[i].dataset.value;
			// 	showPhoto.barrelPhoto();
			// }
		}
		choiceMode.toggle();
	},
	//下拉的显示和隐藏
	toggle : function() {		
		if (select.style.visibility === 'hidden') {
			select.style.visibility = 'visible';
		} else {
			select.style.visibility = 'hidden';
		}
	}
}
let choiceMode = new ChoiceMode();

function init() {
	//初始化布局模式，默认为拼图布局
	choiceMode.init();
	
}
init();

function addEvent(ele, event, handler) {
	if (ele.addEventlistener) {
		ele.addEventlistener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler);
	} else {
		ele['on' + event] = handler;
	}
}