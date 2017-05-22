// ============================================================================
// 
// main.js
// 
// ============================================================================

// - global -------------------------------------------------------------------
var screenCanvas, info;
var enemy;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx; // canvas2d コンテキスト格納用

// - main ---------------------------------------------------------------------
window.onload = function(){
	
	// canvasの取得
	screenCanvas = document.getElementById('screen');
	// canvasの横幅の設定
	screenCanvas.width = 256;
	// canvasの縦幅の設定
	screenCanvas.height = 256;
	
	// マウスの座標取得をイベントとして登録
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	// キー入力の取得をイベントとして登録
	window.addEventListener('keydown', keyDown, true);
	
	// infoの取得
	info = document.getElementById('info');
	
	// canvas2dコンテキストを取得
	ctx = screenCanvas.getContext('2d');
    //エネミーの生成
	enemy = new Enemy(10, 5, 2, new Point(0, 20), this.ctx);

	// メインループ
    (function () {
        enemy.Update();
		// HTMLの更新
		info.innerHTML = mouse.x + ' : ' + mouse.y;
		
		// screenをクリア 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

        enemy.Draw();
		// 円を描画
		drawCircle(ctx);

		// 再帰呼び出しによりループを実現
		// argument.callee => 自身の関数を参照できる
		if(run){setTimeout(arguments.callee, fps);}
	})();
};

// - event --------------------------------------------------------------------
function mouseMove(event){
	// canvas内のマウスの座標を代入
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
	// Escを押すことでループを停止
	if(event.keyCode === 27){run = false;}
}


