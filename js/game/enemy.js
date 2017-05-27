var SHOT_MAX_COUNT = 50;
//?申R?申?申?申X?申g?申?申?申N?申^
var Enemy = function (src,hp, attack, speed, position, ctx,screenSize) {
    this.hp = hp;
    this.attack = attack;
    this.speed = speed;
    this.position = position;
    
    this.ctx = ctx;
    /* Image?申I?申u?申W?申F?申N?申g?申?��鐃� */
    this.img = new Image();
    this.img.src = src;
    this.screenSize = screenSize;
    this.velocity = Sub(new Point(screenSize.x/2,screenSize.y/2), this.position);//.Normalize();
    this.velocity.Normalize();
    this.isDead = false;
}

Enemy.prototype.Update = function () {
    
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;

    if (this.position.x < -this.img.width / 2 || this.position.x > this.screenSize.x + this.img.width / 2 ||
        this.position.y < -this.img.height / 2 || this.position.y > this.screenSize.y + this.img.height / 2)
        this.isDead = true;
}
Enemy.prototype.Draw = function () {
    //alert(this.img.width / 2);
// �~���`��
	drawCircle(this.ctx, this.position, 10, PLAYER_COLOR);

    //this.ctx.drawImage(this.img, this.position.x - this.img.width / 2, this.position.y - this.img.height / 2);
}

Enemy.prototype.IsCollide = function(position, radius)
{
    return this.position.Distance(position) < this.img.width /2 + radius;
}

Enemy.prototype.Collide = function () {
    this.isDead = true;
}

var ENEMY_ID = {
    GASTLY: 0,//?申S?申[?申X
    HAUNTER : 1//?申S?申[?申X?申g
};

var ENEMY_CREATE_INTERVAL = 60.0;

var EnemyManager = function(screenSize,ctx)
{
    this.enemyArray = new Array();
    this.screenSize = screenSize;
    this.ctx = ctx;
    this.createTimer = 0.0;
    this.imgArray = new Array(2);
    var img1 = new Image();
    img1.src = "../../image/sample.png";
    this.imgArray[ENEMY_ID.GASTLY] = img1;

    var img2 = new Image();
    img2.src = "../../image/shot_sample.png";
    this.imgArray[ENEMY_ID.HAUNTER] = img2;
}

EnemyManager.prototype.Update = function()
{
    this.createTimer += 1.0;
    this.Create();
    var indices = new Array();//?申���鐃�?申?申?申index
    for (var i = 0; i < this.enemyArray.length; i++) {
        this.enemyArray[i].Update();
        if (this.enemyArray[i].isDead)
            indices.push(i);
    }

    //?申���鐃�?申?申?申
    for (var i = 0; i < indices.length; i++) {
        this.enemyArray.splice(indices[i], 1);
    }
}

EnemyManager.prototype.Create = function () {
    var createPersent = 60;
    //0~100
    var r = Math.floor(Math.random() * 101);
    if (this.createTimer >= ENEMY_CREATE_INTERVAL && r < createPersent)
    {
        var p = new Point(Math.random() * this.screenSize.x, Math.random() * this.screenSize.y);
        var imgIndex;
        if (r % 2 == 0) {
            imgIndex = ENEMY_ID.GASTLY;
            //?申S?申[?申X
        }
        else {
            //?申S?申[?申X?申g
            imgIndex = ENEMY_ID.HAUNTER;
        }
        //?申��u?申��m?申?申
        var posPersec = createPersent / 4;
        if (r <= posPersec)//?申?申?申��鐃�
        {
            p.x = -this.imgArray[imgIndex].width / 2;
        }
        else if (r <= posPersec*2) {//?申E?申��鐃�
            p.x = this.screenSize.x + this.imgArray[imgIndex].width / 2;
        }
        else if (r <= posPersec*3) {//?申?申?申��鐃�
            p.y = -this.imgArray[imgIndex].height / 2;
        }
        else {//?申?申?申��鐃�
            p.y = this.screenSize.y + this.imgArray[imgIndex].height / 2;

        }
        //imgIndex * ?申��鐃�?申?申?申��鐃�?申���鐃�l?申?申?申S?申[?申X?申g?申?申+?申X?申e?申[?申^?申X
        this.enemyArray.push(new Enemy(this.imgArray[imgIndex].src,10 + (imgIndex * 5), 5 + (imgIndex * 2), 2 + (imgIndex * 1), p, this.ctx, this.screenSize));
        this.createTimer = 0.0;
    }
}

EnemyManager.prototype.Draw = function () {
    for (var i = 0; i < this.enemyArray.length; i++) {
        this.enemyArray[i].Draw();
    }
}

EnemyManager.prototype.IsCollide = function(position,radius){
    for (var i = 0; i < this.enemyArray.length; i++) {
        if (this.enemyArray[i].IsCollide(position, radius))
            this.enemyArray[i].Collide();
    }
}