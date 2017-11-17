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