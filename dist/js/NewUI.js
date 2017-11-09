var NewUI=function(config){
	//NewUI默认属性
	this.namaspace='NewUI';
	this.className=this.namaspace+'-';
	//一些组件的默认属性
	this.itemsConfig={};
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
NewUI.prototype.hasClass=function(dom,className) {
	var _class=dom.getAttribute("class");
	if(_class.indexOf(className)>=0){
		return true;
	}
	return false;
}
NewUI.prototype.addClass=function(dom,className){
	var _class=dom.getAttribute("class");
	if(!this.hasClass(dom,className)){
		dom.classList.add(className);
		return true;
	}
	return false;
}
NewUI.prototype.removeClass=function(dom,className){
	var _class=dom.getAttribute("class");
	if(this.hasClass(dom,className)){
		dom.classList.remove(className);
		return true;
	}
	console.warn(dom+"不包含"+className);
	return false;
}
NewUI.prototype.children=function(parent,childName){
	var children=parent.childNodes;
	var childArry=[];
	if(childName.indexOf("#")>=0){
		children.forEach(function(item){
			if(item.nodeType===1){
				if(item.getAttribute("id").indexOf(childName)>=0){
					return item;
				}
			}

		})
	}
	children.forEach(function(item){
		if(item.nodeType===1){
			if(item.getAttribute("class").indexOf(childName)>=0){
				return childArry.push(item);
			}
		}
	})
	return childArry;
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
		me.getSwitch().forEach(function(item,index){
			item.init();
		})
	}
}

//获取switch对象
NewUI.prototype.getSwitch=function(name){
	var me=this;
	var _switch=function(dom){
		if(!dom){
			return;
		}
		//默认属性
		this.element=dom;
		this.width=dom.offsetWidth;
		this.height=dom.offsetHeight;
		this.active=false;
		//回调函数
		this.callBack=null;
	}
	_switch.prototype.init=function(){
		var item=this.element;
		if(item.getAttribute("class").indexOf(me.className+"switch-active")>0){
			item.setAttribute("data-active","1")
			this.active=true;
		}
		this.initEvent();
	}
	_switch.prototype.getHeight=function(){
		return this.height;
	}
	_switch.prototype.getWidth=function(){
		return this.width;
	}
	_switch.prototype.getElement=function(){
		return this.element;
	}
	_switch.prototype.off=function(){
		var self=this;
		if(me.hasClass(self.element,me.className+"switch-active")){
			//移除active 类
			me.removeClass(self.element,me.className+"switch-active")
			//按钮返回原处
			me.children(self.element,me.className+'switch-handle').forEach(function(item){
				item.setAttribute('style','transform:translate(0,0);')
				self.active=false;
				//self.callBack(self);
			})
		}
	}
	_switch.prototype.on=function(){
		var self=this;
		console.log(this)
		if(!me.hasClass(self.element,me.className+"switch-active")){
			//添加active类
			me.addClass(self.element,me.className+"switch-active")
			me.children(self.element,me.className+'switch-handle').forEach(function(item){
				item.setAttribute('style','transform:translate('+(self.width-30)+'px,0);')
				self.active=true;
				//self.callBack(self);
			})
		}
		
	}
	_switch.prototype.initEvent=function(){
		var self=this;
		this.element.addEventListener("mousedown",function(){
			if(self.active){
				self.off();
				//console.log(this)
			}else{
				self.on()
			}
		})
	}
	//switch状态改变回调
	_switch.prototype.toggle=function(fn){
		if(fn){
			console.log(this)
		}
	}
	if(name && name.indexOf("#")>=0){
		return new _switch(document.querySelector(name));
	}
	else{
		var _switchArry=[];
		me.getByClassName('switch').forEach(function(item,index){
			_switchArry.push(new _switch(item))
		})
		return _switchArry;
	}
}