
//获取switch对象
NewUI.prototype.getSwitch=function(){
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
	if(me.domName && me.domName.indexOf("#")>=0){
		return new _switch(document.querySelector(me.domName));
	}
	else{
		var _switchArry=[];
		var switchs;
		if(!me.domName){
			switchs=me.getByClassName('switch');
		}else{
			switchs=document.querySelectorAll(me.domName);
		}
		switchs.forEach(function(item,index){
			_switchArry.push(new _switch(item))
		})
		return _switchArry;
	}
}