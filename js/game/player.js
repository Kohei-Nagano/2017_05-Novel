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
	this.isDead = false;
	this.img = new Image();
	this.img.src = "image/game/player.png";
}

Player.prototype.Update = function(){

	var indices = new Array();
	
	// 玉更新
	for(var i = 0; i < this.bullets.length; i++){
		this.bullets[i].Update();
		if (this.bullets[i].isDead){
        	indices.push(i);
		}
	}

	//削除処理
    for (var i = 0; i < indices.length; i++) {
        this.bullets.splice(indices[i], 1);
    }
};

Player.prototype.Draw = function(){
	// 描画
	this.ctx.drawImage(this.img, this.position.x - this.img.width / 2, this.position.y - this.img.height / 2);

	// 玉描画
	for(var i = 0; i < this.bullets.length; i++){
		this.bullets[i].Draw();
	}
};

Player.prototype.IsDead = function(){
	return this.isDead;
};

Player.prototype.Shot = function(event, mouse, id){
	this.bullets.push(new Bullet(id, this.ctx, this.position, mouse));
}

Player.prototype.CalcLength = function(mouse){
	var vector = new Point(this.position.x - mouse.x, this.position.y - mouse.y)
	return vector.Length();
}

Player.prototype.Collide = function(array){
	for (var i = 0; i < array.length; i++) {
		// プレイヤーとの判定
		if (array[i].IsCollide(this.position, this.img.width / 2)){
            array[i].Collide();
			//this.isDead = true;
		}

		for(var j = 0; j < this.bullets.length; j++){
        	if (array[i].IsCollide(this.bullets[j].position, this.bullets[j].img.width / 2)){
            	array[i].Collide();
				this.bullets[j].Collide();
			}
    	}			
	}
}

