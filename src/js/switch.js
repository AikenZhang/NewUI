
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