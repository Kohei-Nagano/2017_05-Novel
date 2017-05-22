// ============================================================================
// 
// common.js
// 
// ============================================================================

// - point --------------------------------------------------------------------
function Point(){
	this.x = 0;
	this.y = 0;
}
Point.prototype.Distance = function (p) {
    var q = new Point();
    q.x = p.x - this.x;
    q.y = p.y - this.y;
    return q;
};

Point.prototype.Length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Point.prototype.Normalize = function () {
    var i = this.Length();
    if (i > 0) {
        var j = 1 / i;
        this.x *= j;
        this.y *= j;
    }
};

function drawCircle(ctx){
        // パスの設定を開始
        ctx.beginPath();

        // 円の色を設定する
        ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';

        // 円を描くパスを設定
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);

        // 円を描く
        ctx.fill();
}
