NewUI.prototype.getInput=function(){
	var me=this;
	var input=function(){
		this.password=null;
	}
	input.prototype.init=function(){
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
			
	}
	return new input;
}