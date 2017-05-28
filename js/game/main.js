// ============================================================================
// 
// main.js
// 
// ============================================================================

var GAME_LIMIT = 60 * 30;

var screenCanvas, info;
var player;
var enemyManager;
var ctx; // canvas2d コンテキスト格納用
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var back_img = new Image();
var frameCount = 0;

// シャドウボール使用回数
var ShadowBallCount = 0;
// マジカル社員使用回数
var MagicalShineCount = 0;
// コメットパンチ使用回数
var CometPunchCount = 0;

var Game = function(novel) {
	this.novel = novel;
	this.init();
}

Game.prototype.init = function () {
		// canvasの取得
	screenCanvas = document.getElementById('screen');
	// canvasの横幅の設定
	screenCanvas.width = 800;
	// canvasの縦幅の設定
	screenCanvas.height = 600;
	
	// マウスの座標取得をイベントとして登録
	screenCanvas.addEventListener('mousemove', this.mouseMove, true);
	// マウスの入力をイベントとして登録
	screenCanvas.addEventListener('mousedown', this.mouseDown, true);
	// キー入力の取得をイベントとして登録
	window.addEventListener('keydown', this.keyDown, true);

	// infoの取得
	info = document.getElementById('info');

	// canvas2dコンテキストを取得
	ctx = screenCanvas.getContext('2d');

	//プレイヤーの生成
	player = new Player(ctx, new Point(screenCanvas.width / 2, screenCanvas.height / 2), 10);
	//敵の生成
	enemyManager = new EnemyManager(new Point(screenCanvas.width, screenCanvas.height), ctx);
	//背景画像設定
	back_img.src = "image/game/game_back.jpg";

	// メインループ
    (function () {
        frameCount++;

		// キャラ更新処理
        player.Update();
		enemyManager.Update();
		
		// HTMLの更新
		info.innerHTML = mouse.x + ' : ' + mouse.y + ' : ' + ShadowBallCount + ' : ' + MagicalShineCount + ' : ' + CometPunchCount  + ' : ' +  frameCount;
		
		// screenをクリア 
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

		// キャラ描画処理
		ctx.drawImage(back_img, 0, 0);
		player.Draw();
        enemyManager.Draw();

		// 衝突判定
		player.Collide(enemyManager.enemyArray);
		
		// プレイヤーが死んだら停止＆シナリオ分岐
    	if(player.IsDead() === true){
			run = false;
			this.novel.setDeadScenario();
		}		
		// 制限時間終了時ゲーム終了分岐
		else if(frameCount > GAME_LIMIT){
			run = false;
	
			if(MagicalShineCount > ShadowBallCount && 
	   		   MagicalShineCount > CometPunchCount){
				this.novel.setTrueScenario();
			}
			else if(ShadowBallCount > MagicalShineCount && 
	   				ShadowBallCount > CometPunchCount){
				this.novel.setBadScenario();
			}
			else if(CometPunchCount > ShadowBallCount && 
	   				CometPunchCount > MagicalShineCount){
				this.novel.setNormalScenario();		
			}
		}

		// 再帰呼び出しによりループを実現
		// argument.callee => 自身の関数を参照できる
		if(run){setTimeout(arguments.callee, fps);}
	})();

}

// ゲーム開始
Game.prototype.start = function () {
	alert(
		"遊び方\n左クリック：マジカルシャイン\n右クリック(遠距離)：シャドウボール\n右クリック(近距離)：コメットパンチ");
	run = true;
	this.init();
}

Game.prototype.End = function () {

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
		player.Shot(event, mouse, "shine");
		MagicalShineCount++;
	break;
    case 1 : 
    break;
    case 2 : 
		if(player.CalcLength(mouse) > 200){
			player.Shot(event, mouse, "shadow");
			ShadowBallCount++;
		}
		else{
			player.Shot(event, mouse, "comet");
			CometPunchCount++
		}		
	break;
	}
}

// キーが押された時の処理
Game.prototype.keyDown = function (event) {
	// Escを押すことでループを停止
    if (event.keyCode === 27) { run = false; }

    alert(enemyArray.length);
}
