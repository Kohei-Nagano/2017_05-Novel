
var Bullet = function () {
}

Bullet.prototype.Update = function () {
    alert("");
}
Bullet.prototype.Draw = function () {
}

var inherits = function (childCtor, parentCtor) {
    // �q�N���X�� prototype �̃v���g�^�C�v�Ƃ��� �e�N���X��
    // prototype ���w�肷�邱�ƂŌp�������������
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
    // ��`����Ă��郁�\�b�h�� call ���g���ČĂяo���B
    Bullet.prototype.Update.call(this);
}