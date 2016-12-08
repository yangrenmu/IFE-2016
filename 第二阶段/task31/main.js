//封装添加事件函数addEvent,兼容各版本游览器
let addEvent = function (e, event, listener) {
	if (e.addEventListener) {
		e.addEventListener(event, listener);
	} else if (e.attachEvent) {
		e.attachEvent("on" + event, listener);
	} else {
		e["on" + event] = listener;
	}
};

let people = document.getElementsByName('people');
let college = document.getElementById('college');
let company = document.getElementById('company');
let city = document.getElementById('city');
let school = document.getElementById('school');
let schoolArray = [["成都七中附属大学","磨子桥街道办事学院","双流折中大学"],
					["赤壁赋","念奴娇.赤壁怀古","水调歌头.明月几时有"],
					["黑色玫瑰","皮城警备","诺克萨斯"]];
let current = {
	value: "在校生"
};

//点击option时对应的option跟着改变	
addEvent(city, 'click', function() {	
	updateSchool();
})
	
function updateSchool() {
	let str = '';
	let arr = schoolArray[city.selectedIndex];
	for (let i = 0; i < arr.length; i++) {
		str = str + '<option>' + arr[i] + '</option>'
	}
	school.innerHTML = str;
}



//点击在校生和非在校生时切换显示内容
for(let i = 0; i < people.length; i++) {
	people[i].checked = false;
	addEvent(people[i], 'click', function(){
		if (people[i].checked) {
			current.value = people[i].value;			
		}
		if (current.value === "在校生") {
			updateSchool()
			college.style.display = "block";
			company.style.display = "none";
		} else {
			college.style.display = "none";
			company.style.display = "block";
		}
	});	
}







