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