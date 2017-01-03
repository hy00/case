
//obj (要在哪个元素上面滚动) callBack(滚动后要执行的函数  要传一个参数down)
function myWheel(obj,callBack) {
	//如果是火狐浏览器
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
		obj.addEventListener('DOMMouseScroll',fn);  //使用
	} else {  //否则   chrem IE
		obj.addEventListener('mousewheel',fn);//使用
	}
	function fn(ev) {
		var down = true;
		if(ev.detail) {  //火狐中
			down = ev.detail < 0 ? true : false;  //ev.detail < 向上
		} else {  //chrem IE中
			down = ev.wheelDelta > 0 ? true : false; //ev.wheelDelta > 向上
		}
		//如果有这个函数
		if(callBack && typeof(callBack) === 'function') {
			callBack(down);  //执行这个函数  并把down(true/false)传进来
		}
		ev.preventDefault();
	};
};