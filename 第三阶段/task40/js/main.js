function addEvent(ele, event, handler) {
	if (ele.addEventlistener) {
		ele.addEventlistener(event, handler, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, handler);
	} else {
		ele['on' + event] = handler;
	}
}
function CreatDate() {
	this.date = new Date();
}
CreatDate.prototype = {
	constructor : CreatDate,
	dateToString : function(date) {
		return date.toJSON().slice(0,10);
	},
	showDate : function() {
		let container = document.getElementById('container');
		let self = this;
		//添加日历的头
		let calendarHeader = '<p class="header"><span id="arrow1" class="arrow1"></span>' + self.date.getFullYear() +'年' + (self.date.getMonth()+1) + '月<span id="arrow2" class="arrow2"></span></p>';
		//添加日历的星期
		let calendarWeek = '<p class="calendarWeek"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></p>';
		let last = new Date(self.date.getFullYear(), self.date.getMonth(), 0);
		//获取上月最大日期
		let lastDate = last.getDate();
		//获取上月最后一天星期几
		let lastWeek = last.getDay();
		//获取日历中第一个日期
		let firstDay = lastDate - lastWeek;
		let firstDate = new Date(self.date.getFullYear(), self.date.getMonth() - 1, firstDay);
		let calendarDay = '';
		let dateString = '';
        
        //添加日历中的日期
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 7; j++) {
				//判断第一个日期是不是本月的日期
				let dateData = new Date(firstDate);
				dateData.setDate(dateData.getDate() + 1);
				dateData = self.dateToString(dateData);
				if (firstDate.getMonth() !== self.date.getMonth()) {
					dateString += '<span class="otherMonth" data-num="' + (dateData) + '">'+ firstDate.getDate() +'</span>';
				//判断是不是今天
				} else if (firstDate.getDate() === self.date.getDate()) {
					dateString += '<span class="thisMonth today" data-num="' +(dateData)  + '">'+ firstDate.getDate() +'</span>';
					
				//本月的日期
				} else {
					dateString += '<span class="thisMonth" data-num="' + (dateData) + '">'+ firstDate.getDate() +'</span>';
				}
				firstDate.setDate(firstDate.getDate() + 1);
			}
			calendarDay += '<p class="calendarDay">'+ dateString +'</p>';
			dateString = '';
		}
		calendarDay = '<div id="calendarDayBox">' + calendarDay +'</div>'
		let details = calendarHeader + calendarWeek + calendarDay;		
		container.innerHTML = details;		
		let input = document.getElementById('dateShow');
		
		calendar.chooseEvent();
	},
	chooseEvent : function() {
		let self = this;
		//添加点击向左改变月份
		let leftArrow = document.getElementById('arrow1');
		addEvent(leftArrow, 'click', function() {			
			let newDate = new Date(self.date.getFullYear(), self.date.getMonth() - 1, self.date.getDate());
			self.date = newDate;
			self.showDate();	
			self.arrowShow();		
		});
		//添加点击向右改变月份
		let rightArrow = document.getElementById('arrow2');
		addEvent(rightArrow, 'click', function() {			
			let newDate = new Date(self.date.getFullYear(), self.date.getMonth() + 1, self.date.getDate());
			self.date = newDate;
			self.showDate();
			self.arrowShow();			
		});
		//添加选中日期
		let calendarDayBox = document.getElementById('calendarDayBox');
		addEvent(calendarDayBox, 'click', function(e) {			
			if (e.target.nodeName === 'SPAN') {		
				let tar = e.target;
				let newDate = new Date(tar.dataset.num);				
				self.date = newDate;
				self.showDate();
				self.inputShow();
			}
		});
	},
	arrowShow : function() {
		let dateData = new Date(this.date);
		dateData.setDate(dateData.getDate() + 1);
		dateShow.value = this.dateToString(dateData);
	},
	inputShow : function() {
		let input = document.getElementById('dateShow');
		dateShow.value = this.dateToString(this.date);		
		addEvent(input, 'click', function() {
			if (container.style.display === '') {
				container.style.display = 'block';
			} else if (container.style.display === 'none') {
				container.style.display = 'block';
			} else {
				container.style.display = 'none';
			}			
		});
	}
}
let calendar = new CreatDate();

function init() {	
	calendar.showDate();
	calendar.inputShow();	
}
init();
