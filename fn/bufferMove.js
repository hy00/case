
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
// el 元素，attr(元素),target(目标值),AC(系数)
function bufferMove(el,attr,target,AC){
	clearInterval(el.timer);
	el.timer = setInterval(function(){
		var now = css(el,attr);
		var speed = (target - css(el,attr))*AC;	
		if( Math.abs(target - now) < 2){
			clearInterval(el.timer);
			now = target;
			css(el,attr,now);
		} else {
			now += speed;
			css(el,attr,now);
		}
	},20);
}