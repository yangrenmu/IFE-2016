'use strict';
window.onload = function(){
	let header = document.getElementById('header');
	let close = document.getElementById('close');	
	let popup = new Popup();
	header.addEventListener('click', function() {
		//产生遮罩
		let maskClose = popup.openMask();
		//点击遮罩，关闭浮出层
		maskClose.addEventListener('click', function() {
			popup.closePopup();
		});
		//弹出框框
		popup.openPane();
		//拖动浮出层
		popup.movePopup();
	});
	window.getSelection().removeAllRanges();
	close.addEventListener('click', function() {
		popup.closePopup();
	});	
}
function Popup() {

}
Popup.prototype = {
	constructor : Popup,
	openMask : function() {
		//页面的宽高
		let scrollWidth = document.body.scrollWidth;
		let scrollHeight = document.body.scrollHeight;

		let mask = document.createElement("div");
		mask.id = "mask";
		mask.style.width = scrollWidth + 'px';
		mask.style.height = scrollHeight + 'px';
		document.body.appendChild(mask);
		return mask;
	},
	openPane : function() {
		let login = document.getElementById("login");
		login.style.display = "block";
	},
	movePopup : function() {
		let login = document.getElementById("login");
		let loginTop = document.getElementById("login-top");
		let move = true;
		loginTop.onmousedown = function(e) {
			loginTop.className = 'login-top login-move';
			move = true;
			e = e || window.event;		
			let loginX = e.clientX - login.offsetLeft;
			let loginY = e.clientY - login.offsetTop;
			let loginLeftX = login.clientWidth;
			let loginTopY = login.clientHeight;
			
			document.addEventListener('mousemove', function(event) {
				event = event || window.event;
				if (move) {
					let left = event.clientX - loginX;
					let screenWidth = document.documentElement.clientWidth;
					let top = event.clientY - loginY;
					let screenHeight = document.documentElement.clientHeight;
					console.log(top);
					console.log(screenHeight);
					//禁止移出可视区域右侧
					if (left >= (screenWidth - loginLeftX)) {
						left = screenWidth - loginLeftX;
					}
					//禁止移出可视区域左侧
					if (left <= 0) {
						left = 0;
					}
					//禁止移出可视区域上侧
					if (top >= (screenHeight - loginTopY)) {
						top = screenHeight - loginTopY;
					}
					if (top <= 0) {
						top = 0;
					}
					login.style.left = left + 'px';
					login.style.top = top + 'px';
					
				}	
			})	

			document.onmouseup = function() {
				move = false;
				loginTop.className = 'login-top';
				// loginTop.removeEventListener('mousemove', function(event) {
				// 	event = event || window.event;
				// 	if (move) {
				// 		let left = event.clientX - loginX;
				// 		let screenWidth = document.documentElement.clientWidth;
				// 		console.log(left);
				// 		console.log(screenWidth);
				// 		if (left >= (screenWidth - loginLeftX)) {
				// 			left = screenWidth - loginLeftX;
				// 		}
				// 		login.style.left = left + 'px';
				// 		// login.style.top = event.clientY - loginY + 'px';
						
				// 	}	
				// })	
			}	
		}

	},
	closePopup : function() {
		// console.log("ttt");
		document.body.removeChild(mask);
		login.style.display = "none";
	}
}





