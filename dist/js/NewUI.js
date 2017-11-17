var NewUI=function(config){
	this.init(config)
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
NewUI.prototype.getById=function(){
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
			if(childName.indexOf(".")>=0){
				if(item.getAttribute("class").indexOf(childName.replace(".",""))>=0){
					childArry.push(item);
				}
			}
			else{
				if(item.tagName.toLowerCase()==childName){
					childArry.push(item)
				}
			}
		}
	})
	return childArry;
}
NewUI.prototype.prev=function(dom){
	while((dom=dom.previousSibling)&& dom.nodeType!==1){}
    return dom;
}
NewUI.prototype.getElement=function(elem){
	if(elem){
		if(elem.indexOf("#")>=0){
			return document.querySelector(elem);
		}else{
			return document.querySelectorAll(elem);
		}
	}
}
NewUI.prototype.getProgres=function(elem){
	var me=this;
	var progres=function(){
		this.element=elem?me.getElement(elem):me.getElement("."+me.className+"Progressbar")[0];
	}
	progres.prototype.setValue=function(val){
		var sp=me.children(this.element,"span")[0];
		if(val>=0 && val<=100){
			sp.style="width:"+val+"%;"
			this.element.setAttribute("data-value",val+"%");
		}
		else{
			console.warn("Progressbar 设置数值在0～100之间");
		}
	}
	return new progres;
}
NewUI.prototype.getRange=function(){
	var me=this;
	var range=function(elem){
		this.element=elem?me.getElement(elem):me.getElement("input[type='range']")[0];
		this.init();
	}
	range.prototype.change=function(fn){
		if(fn){
			this.callBack=fn;
		}
	}
	range.prototype.init=function(){
		var me=this;
		this.element.addEventListener("change",function(){
			me.value=this.value;
			if(me.callBack){
				me.callBack(me)
			}
		})
	}
	range.prototype.getValue=function(){
		return this.value;
	}
	range.prototype.setValue=function(val){
		this.element.value=val;
	}
	range.prototype.setDisable=function(bol){
		if(bol){
			this.element.setAttribute("disabled",'');
		}else{
			var dis=this.element.getAttributeNode("disabled");
			if(dis){
				this.element.removeAttributeNode(dis);
			}
		}
	}
	return new range;
}
NewUI.prototype.init=function (config) {
	//初始化NewUI
	this.defaultConfig={
		//默认初始化属性
	}
	this.extend(this.defaultConfig,config);
	//NewUI默认属性
	this.namaspace='NewUI';
	this.className=this.namaspace+'-';
	//一些组件的默认属性
	this.itemsConfig={};
	this.getInput().init();
}
NewUI.prototype.getInput=function(elem){
	var me=this;
	var input=function(){
		this.password=null;
		this.element=elem?document.querySelectorAll(elem):document.querySelectorAll("input[type='text']");
	}
	input.prototype.init=function(){
		//添加清除和显示密码功能
		var clear=document.querySelectorAll(".fa-times-circle"),
			eye=document.querySelectorAll('.fa-eye');
			clear.forEach(function(item,index){
				item.addEventListener('mousedown',function(){
					var user=me.prev(this);
					if(user.getAttribute("type")=="text"){
						user.value="";
					}
				})
			})
			eye.forEach(function(item,index){
				item.addEventListener('mousedown',function(){
					var pas=me.prev(this);
					if(pas.getAttribute('type')=='password'){
						pas.setAttribute('type','text');
					}else{
						pas.setAttribute('type','password');
					}
					if(me.hasClass(this,'NewUI-active')){
						me.removeClass(this,'NewUI-active')
					}else{
						me.addClass(this,'NewUI-active')
					}
				})
			})
		//添加正则匹配功能
		this.element.forEach(function(item,index){
			item.addEventListener("blur",function(){
				var rex=this.getAttribute("data-Rex"),
			    	rexText=this.getAttribute("data-RexText")||"输入错误",
			    	value=this.value;
			    if(rex && !new RegExp(rex).test(value)){
			    	this.setAttribute("style","background:#f2f2f2;border:1px solid #f00 !important;");
			    }else{
			    	this.setAttribute("style","")
			    }
			})
			
		})
	}
	input.prototype.setDisable=function(b){
		if(!b){
			this.element.forEach(function(item,index){
				item.setAttribute("disabled",false);
				item.setAttribute("style","background:#f2f2f2;");
			})
		}else{
			this.element.forEach(function(item,index){
				item.setAttribute("disabled",true);
				item.setAttribute("style","background:none;");
			})
		}
	}
	return new input;
}

//获取switch对象
NewUI.prototype.getSwitch=function(domName){
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
		this.callBack=function(){};
		this.init();
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
			})
		}
		//执行传递过来的回调函数
		self.callBack(self);
	}
	_switch.prototype.on=function(){
		var self=this;
		if(!me.hasClass(self.element,me.className+"switch-active")){
			//添加active类
			me.addClass(self.element,me.className+"switch-active")
			me.children(self.element,me.className+'switch-handle').forEach(function(item){
				item.setAttribute('style','transform:translate('+(self.width-30)+'px,0);')
				self.active=true;
			})
		}
		//执行传递过来的回调函数
		self.callBack(self);
		
	}
	_switch.prototype.initEvent=function(){
		var self=this;
		this.element.addEventListener("mousedown",function(){
			if(self.active){
				self.off();
			}else{
				self.on()
			}
		})
	}
	//switch状态改变时的回调函数
	_switch.prototype.toggle=function(fn){
		if(fn){
			this.callBack=fn;
		}
	}
	_switch.prototype.getStatus=function(){
		return this.active;
	}
	if(domName && domName.indexOf("#")>=0){
		return new _switch(document.querySelector(domName));
	}
	else{
		var _switchArry=[];
		var switchs;
		if(!domName){
			switchs=me.getByClassName('switch');
		}else{
			switchs=document.querySelectorAll(domName);
		}
		switchs.forEach(function(item,index){
			_switchArry.push(new _switch(item))
		})
		return _switchArry;
	}
}