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