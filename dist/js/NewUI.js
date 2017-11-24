/** @preserve Foo Bar */
var NewUI=function(config){
	this.init(config)
}
NewUI.prototype.extend=function(){ //from jquery2
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			if (typeof target === "boolean") {
				deep = target;

				target = arguments[i] || {};
				i++;
			}

			if (typeof target !== "object" && !$.isFunction(target)) {
				target = {};
			}

			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				if ((options = arguments[i]) != null) {
					for (name in options) {
						src = target[name];
						copy = options[name];

						if (target === copy) {
							continue;
						}

						if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && $.isArray(src) ? src : [];

							} else {
								clone = src && $.isPlainObject(src) ? src : {};
							}

							target[name] = $.extend(deep, clone, copy);

						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;
}
NewUI.prototype.getById=function(){
	return document.querySelector(name);
}
NewUI.prototype.getByClassName=function(className){
	return document.querySelectorAll("."+this.className+className);
}
NewUI.prototype.hasClass=function(dom,className) {
	var _class=dom.getAttribute("class");
	if(_class.indexOf(className)>=0){
		return true;
	}
	return false;
}
NewUI.prototype.addClass=function(dom,className){
	var _class=dom.getAttribute("class");
	if(!this.hasClass(dom,className)){
		dom.classList.add(className);
		return true;
	}
	return false;
}
NewUI.prototype.removeClass=function(dom,className){
	var _class=dom.getAttribute("class");
	if(this.hasClass(dom,className)){
		dom.classList.remove(className);
		return true;
	}
	console.warn(dom+"不包含"+className);
	return false;
}
NewUI.prototype.children=function(parent,childName){
	var children=parent.childNodes;
	var childArry=[];
	if(childName.indexOf("#")>=0){
		children.forEach(function(item){
			if(item.nodeType===1){
				if(item.getAttribute("id").indexOf(childName)>=0){
					return item;
				}
			}

		})
	}
	children.forEach(function(item){
		if(item.nodeType===1){
			if(childName.indexOf(".")>=0){
				if(item.getAttribute("class").indexOf(childName.replace(".",""))>=0){
					childArry.push(item);
				}
			}
			else{
				if(item.tagName.toLowerCase()==childName){
					childArry.push(item)
				}
			}
		}
	})
	return childArry;
}
NewUI.prototype.prev=function(dom){
	while((dom=dom.previousSibling)&& dom.nodeType!==1){}
    return dom;
}
NewUI.prototype.getElement=function(elem){
	if(elem){
		if(elem.indexOf("#")>=0){
			return document.querySelector(elem);
		}else{
			return document.querySelectorAll(elem);
		}
	}
}
NewUI.prototype.template=function(tpl){
    var
        fn,
        match,
        code = ['var r=[];\nvar _html = function (str) { return str.replace(/&/g, \'&amp;\').replace(/"/g, \'&quot;\').replace(/\'/g, \'&#39;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\'); };'],
        re = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/m,
        addLine = function (text) {
            code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
        };
    while (match = re.exec(tpl)) {
        if (match.index > 0) {
            addLine(tpl.slice(0, match.index));
        }
        if (match[2]) {
            code.push('r.push(String(this.' + match[1] + '));');
        }
        else {
            code.push('r.push(_html(String(this.' + match[1] + ')));');
        }
        tpl = tpl.substring(match.index + match[0].length);
    }
    addLine(tpl);
    code.push('return r.join(\'\');');
    fn = new Function(code.join('\n'));
    this.render = function (model) {
        return fn.apply(model);
    };
}
NewUI.prototype.ajax=function(params){
  params = params || {};   
  params.data = params.data || {};   
  // 判断是ajax请求还是jsonp请求
  var json = params.jsonp ? jsonp(params) : json(params);   
  // ajax请求   
  function json(params) {   
    //  请求方式，默认是GET
    params.type = (params.type || 'GET').toUpperCase(); 
    // 避免有特殊字符，必须格式化传输数据  
    params.data = formatParams(params.data);   
    var xhr = null;    
    // 实例化XMLHttpRequest对象   
    if(window.XMLHttpRequest) {   
      xhr = new XMLHttpRequest();   
    } else {   
      // IE6及其以下版本   
      xhr = new ActiveXObjcet('Microsoft.XMLHTTP');   
    }; 
    // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件 
    xhr.onreadystatechange = function() {  
      //  readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
      if(xhr.readyState == 4) {   
        var status = xhr.status;  
        //  status：响应的HTTP状态码，以2开头的都是成功
        if(status >= 200 && status < 300) {   
          var response = ''; 
          // 判断接受数据的内容类型  
          var type = xhr.getResponseHeader('Content-type');   
          if(type.indexOf('xml') !== -1 && xhr.responseXML) {   
            response = xhr.responseXML; //Document对象响应   
          } else if(type === 'application/json') {   
            response = JSON.parse(xhr.responseText); //JSON响应   
          } else {   
            response = xhr.responseText; //字符串响应   
          };  
          // 成功回调函数 
          params.success && params.success(response);   
       } else {   
          params.error && params.error(status);   
       }   
      };   
    };  
    // 连接和传输数据   
    if(params.type == 'GET') {
      // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
      xhr.open(params.type, params.url + '?' + params.data, true);   
      xhr.send(null);   
    } else {   
      xhr.open(params.type, params.url, true);   
      //必须，设置提交时的内容类型   
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
      // 传输数据  
      xhr.send(params.data);   
    }   
  }  
  //格式化参数   
  function formatParams(data) {   
    var arr = [];   
    for(var name in data) { 
      //   encodeURIComponent() ：用于对 URI 中的某一部分进行编码
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));   
    };   
    // 添加一个随机数参数，防止缓存   
    arr.push('v=' + random());   
    return arr.join('&');   
  }
  // 获取随机数   
  function random() {   
    return Math.floor(Math.random() * 10000 + 500);   
  }
}
NewUI.prototype.tpl=function(tplName){
	var tpl = {
  		tfoot: function () {
    		return '<div class="NewUI-Grid-tfoot" id={tfootId}>'+
                  '<div class="NewUI-Grid-Page">'+
                    '<div class="NewUI-Grid-PageSize">'+
                      '<label>每页</label>'+
                      '<select class="NewUI-Grid-PageSize">'+
                        '<option value="{pageSize.pageSize1}">{pageSize.pageSize1}</option>'+
                        '<option value="{pageSize.pageSize2}">{pageSize.pageSize2}</option>'+
                        '<option value="{pageSize.pageSize3}">{pageSize.pageSize3}</option>'+
                      '</select>'+
                      '<label>条</label>'+
                    '</div>'+
                    '<div class="NewUI-Grid-Goto">'+
                      '<div class="NewUI-Grid-Goto-left">'+
                        '<i class="fa fa-angle-double-left"></i>'+
                        '<i class="fa fa-angle-left"></i>'+
                      '</div>'+
                      '<div class="NewUI-Grid-Goto-content">'+
                        '<label>第</label>'+
                        '<input type="text" name="ts" autocomplete="off" value=1>'+
                        '<label>页</label>'+
                        '<label class="NewUI-Grid-Goto-pageAll">共0页</label>'+
                      '</div>'+
                      '<div class="NewUI-Grid-Goto-right">'+
                        '<i class="fa fa-angle-right"></i>'+
                        '<i class="fa fa-angle-double-right"></i>'+
                      '</div>'+
                    '</div>'+
                    '<div class="NewUI-Grid-refresh">'+
                      '<i class="fa fa-refresh"></i>'+
                    '</div>'+
                  '</div>'+
                  '<div class="NewUI-Grid-detail">'+
                    '<label>显示</label>'+
                    '<label class="NewUI-Grid-detail-show">-</label>'+
                    '<label>共</label>'+
                    '<label class="NewUI-Grid-detail-number">0</label>'+
                    '<label>条</label>'+
                  '</div>'+
                '</div>'
  	},
  	get: function (name) {
    	var me = this;
    	var tplName = '_' + name;
    	if (!me[tplName]) {
      		var tplFn = me[name];
      	if (typeof tplFn !== 'function') {
        	throw new Error('找不到对应模板');
      	}
      	me[tplName] =me[name]
    	}
    	return me[tplName];
 	  }
  }
  return tpl.get(tplName)();
}
//更改html属性
NewUI.prototype.attr=function(){
  var arg=arguments;
  if(arg.length>2){
      arg[0].setAttribute(arg[1],arg[2]);
  }else{
      Object.keys(arg[1]).forEach(function(item,index){
      arg[0].setAttribute(item,arg[1][item])
    })
  }
}
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

//获取switch对象
NewUI.prototype.getSwitch=function(domName){
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
		this.callBack=function(){};
		this.init();
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
			})
		}
		//执行传递过来的回调函数
		self.callBack(self);
	}
	_switch.prototype.on=function(){
		var self=this;
		if(!me.hasClass(self.element,me.className+"switch-active")){
			//添加active类
			me.addClass(self.element,me.className+"switch-active")
			me.children(self.element,me.className+'switch-handle').forEach(function(item){
				item.setAttribute('style','transform:translate('+(self.width-30)+'px,0);')
				self.active=true;
			})
		}
		//执行传递过来的回调函数
		self.callBack(self);
		
	}
	_switch.prototype.initEvent=function(){
		var self=this;
		this.element.addEventListener("mousedown",function(){
			if(self.active){
				self.off();
			}else{
				self.on()
			}
		})
	}
	//switch状态改变时的回调函数
	_switch.prototype.toggle=function(fn){
		if(fn){
			this.callBack=fn;
		}
	}
	_switch.prototype.getStatus=function(){
		return this.active;
	}
	if(domName && domName.indexOf("#")>=0){
		return new _switch(document.querySelector(domName));
	}
	else{
		var _switchArry=[];
		var switchs;
		if(!domName){
			switchs=me.getByClassName('switch');
		}else{
			switchs=document.querySelectorAll(domName);
		}
		switchs.forEach(function(item,index){
			_switchArry.push(new _switch(item))
		})
		return _switchArry;
	}
}