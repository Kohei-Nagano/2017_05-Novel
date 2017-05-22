var SHOT_MAX_COUNT = 50;
//コンストラクタ
var Enemy = function (src,hp, attack, speed, position, ctx,screenSize) {
    this.hp = hp;
    this.attack = attack;
    this.speed = speed;
    this.position = position;
    
    this.ctx = ctx;
    /* Imageオブジェクトを生成 */
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
    /* 画像を描画 */
    this.ctx.drawImage(this.img, this.position.x - this.img.width / 2, this.position.y - this.img.height / 2);
}

Enemy.prototype.IsCollide = function(position, radius)
{
    return this.position.Distance(position) < this.img.width /2 + radius;
}

Enemy.prototype.Collide = function () {
    this.isDead = true;
}

var ENEMY_ID = {
    GASTLY: 0,//ゴース
    HAUNTER : 1//ゴースト
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
    var indices = new Array();//削除するindex
    for (var i = 0; i < this.enemyArray.length; i++) {
        this.enemyArray[i].Update();
        if (this.enemyArray[i].isDead)
            indices.push(i);
    }

    //削除処理
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
            //ゴース
        }
        else {
            //ゴースト
            imgIndex = ENEMY_ID.HAUNTER;
        }
        //位置の確率
        var posPersec = createPersent / 4;
        if (r <= posPersec)//左固定
        {
            p.x = -this.imgArray[imgIndex].width / 2;
        }
        else if (r <= posPersec*2) {//右固定
            p.x = this.screenSize.x + this.imgArray[imgIndex].width / 2;
        }
        else if (r <= posPersec*3) {//上固定
            p.y = -this.imgArray[imgIndex].height / 2;
        }
        else {//下固定
            p.y = this.screenSize.y + this.imgArray[imgIndex].height / 2;

        }
        //imgIndex * でかけている数値がゴーストの+ステータス
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