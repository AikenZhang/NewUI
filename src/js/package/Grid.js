NewUI.prototype.getGrid=function(elem){
	var me=this;
	var a=[];
	var grid=function(){
		this.element=elem?me.getElement(elem):me.getElement("."+me.className+"Grid")[0];
		this.config={
			isPage:true,
			pageSize:[50,500,5000],
			firstPage:0,
			refresh:true,
			toolTpl:true
		};
		this.columns=[];
		this._config={
			domId:{},
			pageSize:this.config.pageSize[0],
			url:"",//缓存访问地址
			param:"",//缓存请求参数
			pageNumber:1,
			input:null//缓存input(页数),
			pageAll:0,//缓存总页数
		};
	}
	grid.prototype.init=function(con){
		//继承修改属性
		me.extend(this.config,con.config);
		//写入表头
		me.extend(this.columns,con.columns)
		//渲染表头
		this._thead();
		//渲染主体
		this._tfoot();

		for(var i=0;i<5000;i++){
			a.push({name:"张广华",sex:"男",age:23,index:1})
		}
		this._tbody(a)
		}
	//表头渲染方法
	grid.prototype._thead=function(){
		var self=this;
		var theadId="Grid-thead-"+new Date().getTime();
		self._config.domId.theadId=theadId;
		//添加序号
		this.columns.unshift({width:50,indexName:"序号",index:"index"})
		var thead=document.createElement("div");
		me.attr(thead,{
				class:me.className+"Grid-thead",
				id:theadId
			})
		function trewSpan(width,indexName){
			var span=document.createElement("span");
			me.attr(span,"style","width:"+width+"px;");
			span.innerHTML=indexName || "";
			return span;
		}
		this.columns.forEach(function(item,index){
			thead.append(trewSpan(item.width,item.indexName))
		})
		this.element.append(thead);
	}
	//渲染主体
	grid.prototype._tbody=function(dataLsit){
		var self=this,
		dataLsit=dataLsit || [],
		tbody=null;
		function threwList(data){
			var list=document.createElement("li");
			self.columns.forEach(function(a,b){
				var span=document.createElement("span");
				me.attr(span,"style","width:"+a.width+"px;");
				span.innerHTML=data[a.index] || "";
				//添加toolTpl
				if(self.config.toolTpl){
					var tool=document.createElement("span");
					me.attr(tool,{
						class:"NewUI-Grid-tool"
					})
					span.addEventListener("mouseover",function(e){
						tool.innerHTML=this.innerHTML;
						me.attr(tool,{
							style:"left:"+(e.pageX+10)+"px;top:"+(e.pageY+15)+"px;"
						})
						document.querySelector("body").append(tool);
					})
					span.addEventListener("mouseout",function(e){
						document.querySelector("body").removeChild(tool);
					})
				}
				list.append(span);
				span=null;
			})
			return list;
		}
		
		if(!self._config.domId.tbodyId){
			var	ul=document.createElement("ul");
			tbody=document.createElement("div");
			tbodyId="Grid-tbody-"+new Date().getTime();
			self._config.domId.tbodyId=tbodyId;
			me.attr(tbody,{
				class:me.className+"Grid-tbody",
				id:tbodyId,
				style:self.config.isPage?"":"bottom:0;border:0;"
			})
			this.element.append(tbody);
			
		}else{
			var ul=document.createElement("ul");
			tbody=document.querySelector("#"+self._config.domId.tbodyId);
			tbody.innerHTML="";
		}
		dataLsit.forEach(function(item,index){
			ul.append(threwList(item));
				
		})
		tbody.append(ul);		
	}
	//渲染tfoot
	grid.prototype._tfoot=function(){
		var self=this,
			grid=this.element,
			tfootId="Grid-tfoot-"+new Date().getTime();
			self._config.domId.tfootId=tfootId;
			//渲染模版
			var tpl=new me.template(me.tpl('tfoot'));
			var tfootHtml=tpl.render({
					tfootId:tfootId,
					pageSize:{
						pageSize1:self.config.pageSize[0],
						pageSize2:self.config.pageSize[1],
						pageSize3:self.config.pageSize[2]
					}
				})
			grid.innerHTML+=tfootHtml;
			//依次实现按钮的功能
			var tfoot=document.querySelector("#"+self._config.domId.tfootId),
				firstPage=tfoot.querySelector(".fa-angle-double-left"),
				pre=tfoot.querySelector(".fa-angle-left"),
				next=tfoot.querySelector(".fa-angle-right"),
				lastPage=tfoot.querySelector(".fa-angle-double-right"),
				self._config.input=page=tfoot.querySelector("input[type='text']"),
				num=tfoot.querySelector("."+me.className+"Grid-detail-number"),
				refresh=tfoot.querySelector(".fa-refresh"),
				pageSize=tfoot.querySelector("select");
				//绑定select组件change事件
				pageSize.addEventListener("change",function(){
					self._config.PageSize=this.value;
				})
				//绑定跳转首页事件
				firstPage.addEventListener("mousedown",function(){
					self.firstPage()
				})
				//绑定前一页事件
				pre.addEventListener("mousedown",function(){
					self.pre()
				})
				//绑定下一页事件
				next.addEventListener("mousedown",function(){
					self.next()
				})
				//绑定跳转尾页事件
				lastPage.addEventListener("mouse",function(){
					self.lastPage()
				})
				//绑定跳转具体页数事件
				page.addEventListener("blur",function(){
					self.loadPage(this.value);
					self._config.pageNumber=this.value;
				})
				//绑定刷新事件
				refresh.addEventListener("mousedown",function(){
					self.refresh()
				})

	}
	//首页
	grid.prototype.firstPage=function(){
		this.loadPage(1)
	}
	//上一页
	grid.prototype.pre=function(){
		self._config.input.value=(parseInt(self._config.pageNumber)-1)
	}
	//下一页
	grid.prototype.next=function(){
		self._config.input.value=(parseInt(self._config.pageNumber)+1)
	}
	//尾页
	grid.prototype.lastPage=function(){
		this.loadPage(self._config.lastPage)
	}
	//刷新
	grid.prototype.refresh=function(){
		this._tbody(a);
	}
	//加载
	grid.prototype.load=function(){
		this.loadPage(1)
	}
	//跳转具体页数
	grid.prototype.loadPage=function(page){
		var self=this;
		if(self._config.url){
			me.ajax({
				url:self._config.url,
				data:{
					param:self._config.param,
					pageNumber:page,
					startIndex:(parseInt(page)-1)*self._config.pageSize,
					pageSize:self._config.pageSize
				},
			    beforeSend:function(){
			    	me.loading(me.element).show();
			    }
			    success:function(res){
			    	me.loading(me.element).hide();
			    	if(res.IsSuccess){
			    		self._tbody(res.Result);
			    		self._setListDetail(page,self._config.pageSize)
			    	}
			    }
			})
		}
		else{
			console.warn("没有请求地址")
		}
	}
	//每页显示多少
	grid.prototype._setListDetail=function(page,pageSize){
		var show=document.querySelector("#"+self._config.domId.tfootId).querySelector(".NewUI-Grid-detail-show");
		show.innerHTML=(parseInt(page)-1)*parseInt(pageSize)+1+"-"+(parseInt(page))*parseInt(pageSize)
	}

	return new grid;
}