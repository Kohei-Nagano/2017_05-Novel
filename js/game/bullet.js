// ============================================================================
// 
// bullet.js
// 
// ============================================================================

// - bullet ----------------------------------------------------------------
var Bullet = function(id, ctx, position, mouse) {
    this.id = id;
    this.screenSize = new Point(position.x * 2, position.y * 2);
    this.BULLET_COLOR = 'rgba(0, 0, 255, 0.75)';
    this.velocity = new Point(mouse.x - position.x, mouse.y - position.y);
    this.velocity.Normalize();
    this.isDead = false;
    this.position = new Point(position.x, position.y);
    this.ctx = ctx;
    this.size = 0;
    this.speed = 0;
    this.deadLength = this.screenSize.x;
    this.img = new Image();
    this.au = $("#" + id).get(0);
    this.au.play();

    if(id === "shine"){
        this.BULLET_COLOR = 'rgba(125, 255, 125, 0.75)';
        this.speed = 10;
        this.img.src = "image/game/shine.png";        
    }
    else if(id === "shadow"){
        this.BULLET_COLOR = 'rgba(0, 0, 0, 0.75)';
        this.speed = 20;
        this.img.src = "image/game/shadow_ball.png";
    }
    else if(id === "comet"){
        this.BULLET_COLOR = 'rgba(255, 255, 125, 0.75)';
        this.speed = 8;
        this.deadLength = 50;
        this.img.src = "image/game/punch.png";
    }
}

Bullet.prototype.Update = function () {
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;

    var length = new Point(this.position.x - this.screenSize.x / 2, this.position.y - this.screenSize.y / 2);
    if (length.Length() > this.deadLength){
        this.isDead = true;
    }
}

Bullet.prototype.Draw = function () {
    // 描画
	this.ctx.drawImage(this.img, this.position.x - this.img.width / 2, this.position.y - this.img.height / 2);
}

Bullet.prototype.IsCollide = function(position, radius){
    return this.position.Distance(position) < this.size / 2 + radius;
}

Bullet.prototype.Collide = function () {
    if(this.id != "shadow"){
        this.isDead = true;
    }
}

