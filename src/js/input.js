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