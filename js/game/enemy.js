var SHOT_MAX_COUNT = 50;
//�R���X�g���N�^
var Enemy = function (hp, attack, speed, position, ctx) {
    this.hp = hp;
    this.attack = attack;
    this.speed = speed;
    this.position = position;
    
    this.ctx = ctx;
    /* Image�I�u�W�F�N�g�𐶐� */
    this.img = new Image();
    this.img.src = "../../image/sample.png";
    this.shotTimer = 0.0;//���˃^�C�}
}

Enemy.prototype.Update = function () {
    this.shotTimer += 1.0;
    this.position.x += 1.0 * this.speed;

    if (this.shotTimer > 5)
    {
        this.shotTimer = 0.0;
        var b = new EnemyBullet();
        b.Update();
        //shot!!
        
    }
}
Enemy.prototype.Draw = function () {
    /* �摜��`�� */
    ctx.drawImage(this.img, this.position.x, this.position.y);
}