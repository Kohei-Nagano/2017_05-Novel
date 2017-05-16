// ============================================================================
// 
// main.js
// 
// ============================================================================

// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();

// - main ---------------------------------------------------------------------
window.onload = function(){
	
	// 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ縺ｮ蛻晄悄蛹�
	screenCanvas = document.getElementById('screen');
	screenCanvas.width = 256;
	screenCanvas.height = 256;
	
	// 繧､繝吶Φ繝医・逋ｻ骭ｲ
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	window.addEventListener('keydown', keyDown, true);
	
	// 繧ｨ繝ｬ繝｡繝ｳ繝磯未騾｣
	info = document.getElementById('info');
	
	// 繝ｫ繝ｼ繝怜・逅・ｒ蜻ｼ縺ｳ蜃ｺ縺�
	(function(){
		// HTML繧呈峩譁ｰ
		info.innerHTML = mouse.x + ' : ' + mouse.y;
		
		// 繝輔Λ繧ｰ縺ｫ繧医ｊ蜀榊ｸｰ蜻ｼ縺ｳ蜃ｺ縺�
		if(run){setTimeout(arguments.callee, fps);}
	})();
};

// - event --------------------------------------------------------------------
function mouseMove(event){
	// 繝槭え繧ｹ繧ｫ繝ｼ繧ｽ繝ｫ蠎ｧ讓吶・譖ｴ譁ｰ
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
	// Esc繧ｭ繝ｼ縺梧款縺輔ｌ縺ｦ縺・◆繧峨ヵ繝ｩ繧ｰ繧帝剄繧阪☆
	if(event.keyCode === 27){run = false;}
}