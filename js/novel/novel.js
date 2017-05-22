var MAIN_SCENARIO = [
      {com:"BG", val:"url(image/bg/BG001.jpg)"}
    , {com:"S",  val:"吾輩は猫である<br>"}
    , {com:"S",  val:"名前はまだない"}
    , {com:"BG", val:"url(image/bg/BG002.jpg)"}
    , {com:"S",  val:"吾輩は猫である"}
    , {com:"S",  val:"名前は猫である"}
    , {com:"E",  val:""}
];
var NORMAL_SCENARIO = [
      {com:"BG", val:"url(image/bg/BG001.jpg)"}
    , {com:"S",  val:"ノーマルエンドである<br>"}
    , {com:"E",  val:""}
];
var TRUE_SCENARIO = [
      {com:"BG", val:"url(image/bg/BG001.jpg)"}
    , {com:"S",  val:"昔々、あるところに"}
    , {com:"S",  val:"おじいさんとおばあさんがおりましたとさ"}
    , {com:"BG", val:"url(image/bg/BG002.jpg)"}
    , {com:"S",  val:"めでたしめでたし"}
];
var BAD_SCENARIO = [
      {com:"BG", val:"url(image/bg/BG001.jpg)"}
    , {com:"S",  val:"バッドエンドである<br>"}
    , {com:"E",  val:""}
];
var DEAD_SCENARIO = [
      {com:"BG", val:"url(image/bg/BG001.jpg)"}
    , {com:"S",  val:"デッドエンドである<br>"}
    , {com:"E",  val:""}
];

var SCENARIO = {
    MAIN    : 0,
    TRUE    : 1,
    NORMAL  : 2,
    BAD     : 3,
    DEAD    : 4,
};

var Novel = function() {    
        this.max = 0;
        this.cursor = 0;
        this.setMainScenario();
    }

// 初期化
Novel.prototype.init = function(){
        this.setMainScenario();
        this.play();
    }

// 読み込み
Novel.prototype.play = function(){
        if(this.cursor >= this.max){
            return(false);
        }

        switch(this.scenario){
            case SCENARIO.MAIN:     this.mainScenario();    break;
            case SCENARIO.NORMAL:   this.normalScenario();  break;
            case SCENARIO.TRUE:     this.trueScenario();    break;
            case SCENARIO.BAD:      this.badScenario();     break;
            case SCENARIO.DEAD:     this.deadScenario();    break;
            default:                alert("default");       break;
        }
    }

// メインシナリオセット
Novel.prototype.setMainScenario = function(){
    this.max = MAIN_SCENARIO.length;
    this.scenario = SCENARIO.MAIN;
}

// ノーマルシナリオセット
Novel.prototype.setNormalScenario = function(){
    this.max = MAIN_SCENARIO.length;
    this.scenario = SCENARIO.NORMAL;
}

// トゥルーシナリオセット
Novel.prototype.setTrueScenario = function(){
    this.max = TRUE_SCENARIO.length;
    this.scenario = SCENARIO.TRUE;
}

// バッドシナリオセット
Novel.prototype.setBadScenario = function(){
    this.max = BAD_SCENARIO.length;
    this.scenario = SCENARIO.BAD;
}

// デッドシナリオセット
Novel.prototype.setDeadScenario = function(){
    this.max = DEAD_SCENARIO.length;
    this.scenario = SCENARIO.DEAD;
}

Novel.prototype.mainScenario = function(){
    switch(MAIN_SCENARIO[this.cursor].com){
        // セリフ再生
        case "S":
            $("#serif").html(MAIN_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
        // 背景変更
        case "BG":
            $("#canvas").css("background-image", MAIN_SCENARIO[this.cursor].val);
            this.cursor++;
            this.play();
            break;
        //
        case "E":
            this.cursor = 0;
            this.setTrueScenario();
            this.play();
        default:
            break;
    }
}

Novel.prototype.normalScenario = function(){
    switch(NORMAL_SCENARIO[this.cursor].com){
    // セリフ再生
    case "S":
            $("#serif").html(NORMAL_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#canvas").css("background-image", NORMAL_SCENARIO[this.cursor].val);
            this.cursor++;
            this.play();
            break;
    // 終了
    case "E":
            break;
    default:
            break;
    }

}

Novel.prototype.trueScenario = function(){
    switch(TRUE_SCENARIO[this.cursor].com){
    // セリフ再生
    case "S":
            $("#serif").html(TRUE_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#canvas").css("background-image", TRUE_SCENARIO[this.cursor].val);
            this.cursor++;
            this.play();
            break;
    // 終了
    case "E":
            break;
    default:
            break;
    }
}

Novel.prototype.badScenario = function(){
    switch(BAD_SCENARIO[this.cursor].com){
    // セリフ再生
    case "S":
            $("#serif").html(BAD_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#canvas").css("background-image", BAD_SCENARIO[this.cursor].val);
            this.cursor++;
            this.play();
            break;
    // 終了
    case "E":
            break;
    default:
            break;
    }
}

Novel.prototype.deadScenario = function(){
    switch(DEAD_SCENARIO[this.cursor].com){
    // セリフ再生
    case "S":
            $("#serif").html(DEAD_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#canvas").css("background-image", DEAD_SCENARIO[this.cursor].val);
            this.cursor++;
            this.play();
            break;
    // 終了
    case "E":
            break;
    default:
            break;
    }
}