
var Bullet = function () {
}

Bullet.prototype.Update = function () {
    alert("");
}
Bullet.prototype.Draw = function () {
}

var inherits = function (childCtor, parentCtor) {
    // 子クラスの prototype のプロトタイプとして 親クラスの
    // prototype を指定することで継承が実現される
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

var EnemyBullet = function () {
    Bullet.call(this);
}
// inherits を使って親子関係を明示する
inherits(EnemyBullet, Bullet);
//override
EnemyBullet.prototype.Update = function () {
    // 親クラスのメソッドを呼び出す場合は親クラスの prototype に
    // 定義されているメソッドを call を使って呼び出す。
    Bullet.prototype.Update.call(this);
}