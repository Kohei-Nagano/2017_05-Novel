// ============================================================================
// 
// player.js
// 
// ============================================================================

// - const --------------------------------------------------------------------
var PLAYER_COLOR = 'rgba(0, 255, 0, 0.75)';

// - player ----------------------------------------------------------------

var Player = function(ctx, position, size){
	this.ctx = ctx;
	this.position = position;
	this.size = size;
	this.bullets = new Array();
	this.flag = false;
}

Player.prototype.Update = function(){

	if(this.flag){
		this.Shot();
		this.flag = false;
		alert("Shot");
	}

	// 玉更新
	for(var i = 0; i < this.bullets.length; i++){
		this.bullets[i].Update();
	}
};

Player.prototype.Draw = function(){
	// 円を描画
	drawCircle(this.ctx, this.position, this.size, PLAYER_COLOR);

	// 玉描画
	for(var i = 0; i < this.bullets.length; i++){
		this.bullets[i].Draw();
	}
};

Player.prototype.Shot = function(){
	var target = new Point(event.clientX - screenCanvas.offsetLeft, event.clientY - screenCanvas.offsetTop);
	
	this.bullets.push(new Bullet(this.ctx, this.position, target));
}

Player.prototype.mouseDown = function(event){
	// canvas内のマウスの座標を代入
	//var target = new Point(event.clientX - screenCanvas.offsetLeft, event.clientY - screenCanvas.offsetTop);
	// 玉生成
	//this.bullets.push(new Bullet());//this.ctx, target);

	//Player.prototype.Shot();
	this.flag = true;
	
	
}
