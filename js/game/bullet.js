// ============================================================================
// 
// bullet.js
// 
// ============================================================================

// - const --------------------------------------------------------------------
//var BULLET_COLOR = 'rgba(0, 0, 255, 0.75)';

// - bullet ----------------------------------------------------------------

var Bullet = function(ctx, position, target) {
    //this.vector = target - new Point(screenCanvas.width, screenCanvas.height) / 2;
    this.position = position;
    this.ctx = ctx;
    this.size = 3;
    alert("Shot");
}

Bullet.prototype.Update = function () {
    //alert("");
    this.position += new Point(0, 3);// this.vector;
}

Bullet.prototype.Draw = function () {
    drawCircle(this.ctx, this.position, this.size, BULLET_COLOR);
}

var inherits = function (childCtor, parentCtor) {
    // �q�N���X�� prototype �̃v���g�^�C�v�Ƃ��� �e�N���X��
    // prototype ���w�肷�邱�ƂŌp��������������
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

var EnemyBullet = function () {
    Bullet.call(this);
}
// inherits ���g���Đe�q�֌W�𖾎�����
inherits(EnemyBullet, Bullet);
//override
EnemyBullet.prototype.Update = function () {
    // �e�N���X�̃��\�b�h���Ăяo���ꍇ�͐e�N���X�� prototype ��
    // ���`�����Ă��郁�\�b�h�� call ���g���ČĂяo���B
    Bullet.prototype.Update.call(this);
}