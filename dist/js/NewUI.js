var NewUI=function(config){
	//NewUI默认属性
	this.namaspace='NewUI';
	this.className=this.namaspace+'-';
}
NewUI.prototype.extend=function(){ //from jquery2
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			if (typeof target === "boolean") {
				deep = target;

				target = arguments[i] || {};
				i++;
			}

			if (typeof target !== "object" && !$.isFunction(target)) {
				target = {};
			}

			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				if ((options = arguments[i]) != null) {
					for (name in options) {
						src = target[name];
						copy = options[name];

						if (target === copy) {
							continue;
						}

						if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && $.isArray(src) ? src : [];

							} else {
								clone = src && $.isPlainObject(src) ? src : {};
							}

							target[name] = $.extend(deep, clone, copy);

						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;
}
NewUI.prototype.getById=function(name){
	return document.querySelector(name);
}
NewUI.prototype.getByClassName=function(className){
	return document.querySelectorAll("."+this.className+className);
}
NewUI.prototype.init=function (config) {
	//初始化NewUI
	//默认初始化属性
	var defaultConfig={
		switch:true
	}
	var me=this;
	//继承客户传递到配置
	me.extend(defaultConfig,config);
	//判断是否渲染switch
	if(defaultConfig.switch){
		me.switch(me.getSwitch()).init();
	}
}
NewUI.prototype.switch=function(element){
	var me=this;
	var _switch=function(){
		this.element=element;
	}
	_switch.prototype.init=function () {
		this.element.forEach(function(item,index){
			if(item.getAttribute("class").indexOf(me.className+"switch-active")>0){
				item.setAttribute("data-active","1")
			}
		})
	}
	_switch.prototype.mousedown=function(element){
		element.chi
	}
	_switch.prototype.initEvent=function(){
		this.element.addEventListener("onmousedown",function(){

		});
	}
	return new _switch();
}
NewUI.prototype.getSwitch=function(name){
	if(name){
		return document.querySelector(name);
	}
	else{
		return this.getByClassName('switch');
	}
}