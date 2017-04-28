/*
*********************
(function(){
	//这里是块级作用域
})();
使用匿名函数可以用来模仿块级作用域，
可以避免多次声明同一个变量（导致JavaScript只执行后续声明中的变量初始化）。
避免命名冲突。
因为没有指向匿名函数的引用，可以减少闭包占用的内存问题。
只要函数执行完毕，就可以立即销毁其作用域链。
*********************
*/
;(function(){
	//返回浏览器可视区位置
	function getClient(){
		var l,t,w,h;
		l = document.documentElement.scrollLeft || document.body.scrollLeft;
		t = document.documentElement.scrollTop || document.body.scrollTop;
		w = document.documentElement.clientWidth;
		h = document.documentElement.clientHeight;

		return {'left':l,'top':t,'width':w,'height':h};
	}
	//返回待加载资源位置
	function getSubClient(p){
		var l = 0, t = 0,w,h;
		w = p.offsetWidth;
		h = p.offsetHeight;

		while(p.offsetParent){
			l += p.offsetLeft;
			t += p.offsetTop;
			p = p.offsetParent;
		}
		return {'left':l,'top':t,'width':w,'height':h};
	}
	//判断两个矩形是否相交,返回一个布尔值---确定目标区域(待加载资源模块)是否出现在客户区
	function intersectLine(rect1,rect2){
		var lc1,lc2,tc1,tc2,w1,h1;
		lc1 = rect1.left + rect1.width/2;
		lc2 = rect2.left + rect2.width/2;
		tc1 = rect1.top + rect1.height/2;
		tc2 = rect2.top + rect2.height/2;
		w1 = (rect1.width + rect2.width)/2;
		h1 = (rect1.height + rect2.height)/2;

		return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1-tc2) < h1;
	}

	var red = document.getElementById('red');
	window.onscroll = function(){
		var part1 = getClient();
		console.log("part1",part1);
		var part2 = getSubClient(red);
		console.log("part2",part2);
		if (intersectLine(part1,part2)) {
			console.log('Hello,You are here!');
		}
	}


})();

