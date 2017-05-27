// ============================================================================
// 
// main.js
// 
// ============================================================================

var screenCanvas, info;
var player;
var enemyManager;
var ctx; // canvas2d コンテキスト格納用
var run = true;
var fps = 1000 / 30;
var mouse = new Point();

// シャドウボール使用回数
var ShadowBallCount = 0;
// マジカル社員使用回数
var MagicalShineCount = 0;

var Game = function() {
	this.init();
}

Game.prototype.init = function () {
		// canvasの取得
	screenCanvas = document.getElementById('screen');
	// canvasの横幅の設定
	screenCanvas.width = 256;
	// canvasの縦幅の設定
	screenCanvas.height = 256;
	
	// thisを_this_に代入
	var _this_ = this
	// マウスの座標取得をイベントとして登録
	screenCanvas.addEventListener('mousemove', function(event){ return _this_.mouseMove(event);}, true);
	// マウスの入力をイベントとして登録
	screenCanvas.addEventListener('mousedown', function(event){ return _this_.mouseDown(event);}, true);
	// キー入力の取得をイベントとして登録
	window.addEventListener('keydown', function(event){ return _this_.keyDown(event);}, true);

	// infoの取得
	info = document.getElementById('info');

	// canvas2dコンテキストを取得
	ctx = screenCanvas.getContext('2d');

	//プレイヤーの生成
	player = new Player(ctx, new Point(screenCanvas.width / 2, screenCanvas.height / 2), 10);
	//敵の生成
	enemyManager = new EnemyManager(new Point(screenCanvas.width, screenCanvas.height), ctx);

	// メインループ
    (function () {
        
		// キャラ更新処理
        player.Update();
		enemyManager.Update();
		
		// HTMLの更新
		info.innerHTML = mouse.x + ' : ' + mouse.y + ' : ' + ShadowBallCount + ' : ' + MagicalShineCount;
		
		// screenをクリア 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

		// キャラ描画処理
		player.Draw();
        enemyManager.Draw();

		// 衝突判定
		player.Collide(enemyManager.enemyArray);
		
		// プレイヤーが死んだら停止
        if(player.IsDead() === true){
			run = false;
		}
		
		// 再帰呼び出しによりループを実現
		// argument.callee => 自身の関数を参照できる
		if(run){setTimeout(arguments.callee, fps);}
	})();
}

// ゲーム開始
Game.prototype.start = function () {
	run = true;
	this.init();
}

// シャドウボール使用回数取得
Game.prototype.getShadowCount = function () {
	return ShadowBallCount;
}

// マジがる社員使用回数取得
Game.prototype.getShineCount = function () {
	return MagicalShineCount;
}

// - event --------------------------------------------------------------------
// マウスが移動したときの処理
Game.prototype.mouseMove = function (event) {
	// canvas内のマウスの座標を代入
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

// マウスが押された時の処理
Game.prototype.mouseDown = function (event) {
	switch (event.button) {
    case 0 : 
		player.Shot(event, mouse, "left");
    	ShadowBallCount++;
	break;
    case 1 : str = "middle click";
    break;
    case 2 : 
		player.Shot(event, mouse, "right");
		MagicalShineCount++;
	break;
	}
}

// キーが押された時の処理
Game.prototype.keyDown = function (event) {
	// Escを押すことでループを停止
    if (event.keyCode === 27) { run = false; }

    alert(enemyArray.length);
}
