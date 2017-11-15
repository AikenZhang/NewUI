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