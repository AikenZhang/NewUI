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