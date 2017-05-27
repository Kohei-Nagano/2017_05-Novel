// ============================================================================
// 
// bullet.js
// 
// ============================================================================

// - const --------------------------------------------------------------------
var SHOT_SPEED = 2.0;

// - bullet ----------------------------------------------------------------

var Bullet = function(id, ctx, position, mouse) {
    this.BULLET_COLOR = 'rgba(0, 0, 255, 0.75)';
    this.velocity = new Point(mouse.x - position.x, mouse.y - position.y);
    this.velocity.Normalize();
    this.isDead = false;
    this.position = new Point(position.x, position.y);
    this.ctx = ctx;
    this.size = 8;

    if(id === "right"){
        this.BULLET_COLOR = 'rgba(0, 0, 255, 0.75)';
    }
    if(id === "left"){
        this.BULLET_COLOR = 'rgba(0, 0, 0, 0.75)';
    }
}

Bullet.prototype.Update = function () {
    this.position.x += this.velocity.x * SHOT_SPEED;
    this.position.y += this.velocity.y * SHOT_SPEED;

    //if (this.position.x < -this.img.width / 2 || this.position.x > this.screenSize.x + this.img.width / 2 ||
    //   this.position.y < -this.img.height / 2 || this.position.y > this.screenSize.y + this.img.height / 2)
    //    this.isDead = true;
}

Bullet.prototype.Draw = function () {
    drawCircle(this.ctx, this.position, this.size, this.BULLET_COLOR);
}

Bullet.prototype.IsCollide = function(position, radius){
    //return this.position.Distance(position) < this.img.width /2 + radius;
    return this.position.Distance(position) < this.size /2 + radius;
}

Bullet.prototype.Collide = function () {
    this.isDead = true;
}

