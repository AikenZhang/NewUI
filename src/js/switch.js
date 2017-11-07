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