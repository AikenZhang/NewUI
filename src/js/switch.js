NewUI.prototype.switch=function(element){
	var _switch=function(){
		this.element=element;
	}
	//初始化switch
	_switch.prototype.init=function () {
		this.element.forEach(function(item,index){
			if(item.getAttribute("class").indexOf(me.className+"switch-active")>0){
				item.setAttribute("data-active","1")
			}
		})
	}
	//
	_switch.prototype.mousedown=function(element){
		
	}
	_switch.prototype.initEvent=function(){
		this.element.addEventListener("onmousedown",function(){

		});
	}
	return new _switch();
}
//获取switch对象
NewUI.prototype.getSwitch=function(name){
	var me=this;
	var _switch={
		//switch默认属性
	}
	_switch.init=function(){
		_switch.element.forEach(function(item,index){
			if(item.getAttribute("class").indexOf(me.className+"switch-active")>0){
				item.setAttribute("data-active","1")
			}
		})
	}
	_switch.getHeight=function(){
		return this.height;
	}
	_switch.getWidth=function(){
		return this.width;
	}
	_switch.getElement=function(){
		return this.element;
	}
	if(name && name.indexOf("#")>=0){
		_switch.element=document.querySelector(name);
		_switch.width=_switch.element.offsetWidth;
		_switch.height=_switch.element.offsetHeight;
	}
	else{
		_switch.element=me.getByClassName('switch');
	}
	return _switch;
}