# 功能介绍

#全局公共方法

extend()  继承类
	继承jquery，用法同jquery

getById(name)  通过id名获取dom
	Parameters
		name:dom的id名

	Returns
		dom

getByClassName(className) 通过类名获取dom
	Parameters
		className:去掉namespace的类名

	Returns
		dom

hasClass(dom,className)  判断是否包含某类
	Parameters
		dom:父节点
		className:类名

	Returns
		Boolean

addClass(dom,className)  添加类
		Parameters
		dom:父节点
		className:类名

	Returns
		Boolean

removeClass（dom,className）去掉类
	Parameters
		dom:父节点
		className:类名

	Returns
		Boolean

children（parent,childName）判断是否包含某个子节点
	Parameters
		parent:父节点
		childName:子节Id名字

	Returns
		Boolean

getSwitch（）获取switch对象



#switch  开关按钮  方法

init（） switch初始化

getHeight（） 获取switch高度
	Returns
		number   switch 高度

getWidth()   获取switch宽度
	Returns
		number  switch宽度

getElement()  获取switch Element对象
    Returns
    	element  switch Element对象

off() 关闭switch

on() 打开switch

initEvent() 初始化绑定事件

toggle(fn)  switch开关事件
	Parameters
		fn    事件



