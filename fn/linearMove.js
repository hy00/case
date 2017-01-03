
function css(el,attr,val) {
	if(arguments.length < 3) {
		var val  = 0;
		if(el.currentStyle) {
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity") {
			val*=100;
		}
		return parseFloat(val);
	}
	if(attr == "opacity") {
		el.style.opacity = val/100;
		el.style.filter = "alpha(opacity = "+val+")";
	} else {
		el.style[attr] = val + "px";
	}
}

// el 元素，target(是对象例如：{width: 300,height: 300}),speed(速度 数字)，callBack(是个函数，需要执行完一个动画之后，再执行一个动画的内容，  如果不写就是同时执行几个动画)
function linearMove(el,target,speed,callBack){
	clearInterval(el.timer); 
	var d = 0;
	var t = 0;
	var speeds = {};
	for(var s in target){
		var now = css(el,s);
		var dis = target[s] - now;
		var sD = Math.ceil(Math.abs(dis/speed));
		d = Math.max(d,sD);
	}
	for(var s in target){
		var now = css(el,s);
		var dis = target[s] - now;
		speeds[s] = dis/d;
	}
	el.timer = setInterval(function(){
		t++;
		if(t >= d){
			clearInterval(el.timer);
			callBack&&callBack();
		}
		for(var s in target){
			var now = css(el,s);
			now += speeds[s];
			css(el,s,now);
		}
	},20);
}