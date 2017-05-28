// ============================================================================
// 
// bullet.js
// 
// ============================================================================

// - const --------------------------------------------------------------------
var SHOT_SPEED = 2.0;

// - bullet ----------------------------------------------------------------

var Bullet = function(id, ctx, position, mouse) {
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

    if(id === "shine"){
        this.BULLET_COLOR = 'rgba(125, 255, 125, 0.75)';
        this.size = 10;
        this.speed = 5;
    }
    else if(id === "shadow"){
        this.BULLET_COLOR = 'rgba(0, 0, 0, 0.75)';
        this.size = 20;
        this.speed = 10;
    }
    else if(id === "comet"){
        this.BULLET_COLOR = 'rgba(255, 255, 125, 0.75)';
        this.size = 30;
        this.speed = 15;
        this.deadLength = 10;
    }
}

Bullet.prototype.Update = function () {
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;

    var length = new Point(this.position.x - this.screenSize.x / 2, this.position.y - this.screenSize.y / 2);
    length.Length();
    if (length > this.deadLength){
        this.isDead = true;
    }
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

