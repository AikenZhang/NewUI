NewUI.prototype.getGrid=function(elem){
	var me=this;
	/*<div class="NewUI-Grid-tfoot">
			<div class="NewUI-Grid-Page">
				<div class="NewUI-Grid-PageSize">
					<label>每页</label>
					<select class="NewUI-Grid-PageSize">
						<option value="10">10</option>
						<option value="100">100</option>
						<option value="1000">1000</option>
						<option value="10000">10000</option>
					</select>
					<label>条</label>
				</div>
				<div class="NewUI-Grid-Goto">
					<div class="NewUI-Grid-Goto-left">
						<i class="fa fa-angle-double-left"></i>
						<i class="fa fa-angle-left"></i>
					</div>
					<div class="NewUI-Grid-Goto-content">
						<label>第</label>
						<input type="text" name="ts" style="width:50px;">
						<label>页</label>
						<label class="NewUI-Grid-Goto-pageAll">共0页</label>
					</div>
					<div class="NewUI-Grid-Goto-right">
						<i class="fa fa-angle-double-right"></i>
						<i class="fa fa-angle-right"></i>
					</div>
				</div>
				<div class="NewUI-Grid-refresh">
					<i class="fa fa-refresh"></i>
				</div>
			</div>
			<div class="NewUI-Grid-detail">
				<label>显示</label>
				<label class="NewUI-Grid-detail-show">-</label>
				<label>共</label>
				<label class="NewUI-Grid-detail-number">0</label>
				<label>条</label>
			</div>
		</div>*/
	var grid=function(){
		this.element=elem?me.getElement(elem):me.getElement("."+me.className+"Grid")[0];
		this.config={
			isPage:false,
			pageSize:[50,500,5000],
			firstPage:0,
			refresh:true
		};
	}
	Grid.init=function(){
		console.log(this);
	}
	return new grid;
}