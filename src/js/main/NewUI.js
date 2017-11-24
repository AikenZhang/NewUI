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