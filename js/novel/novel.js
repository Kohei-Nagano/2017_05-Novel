var MAIN_SCENARIO = [
      {com:"BG", val:"url(image/bg/BG003.png)"}
    , {com:"S",  val:"ここはおつきみ山。<br>地理的には、カントー地方のニビシティとハナダシティの間に位置するところにある山だ。"}
    , {com:"S",  val:"この山には言い伝えがあり、<br>"}
    , {com:"BG", val:"url(image/bg/BG004.png)"}
    , {com:"S",  val:"『山の洞窟一室にて、<br>　そこで満月の月の光を浴びた石は輝きだし<br>　それは「月の石」となるであろう』<br>"}
    , {com:"BG", val:"url(image/bg/BG003.png)"}
    , {com:"S",  val:"というものだ。<br>"}
    , {com:"S",  val:"この話を聞きつけたピッピは、<br>月の石を手に入れるべくおつきみ山に探索しに行くのであった。<br>"}
    , {com:"PA",  val:""}
    , {com:"S",  val:"吾輩はピッピである。<br>ニックネームはまだない。"}
    , {com:"S",  val:"どこで生まれたか…<br>まあ、この辺はいいとしよう。"}
    , {com:"S",  val:"吾輩といえば、第六世代になってタイプがノーマルからフェアリーへ変更されたポケモンの一匹である。"}
    , {com:"S",  val:"隠れ特性の「フレンドガード」と進化前のポケモンにのみ許される「進化のきせき」を組み合わせた耐久戦法で、"}
    , {com:"S",  val:"ダブルバトルやトリプルバトルに<br>それなりに出番があった。"}
    , {com:"S",  val:"出番があった。<br>そう、これは過去形なのだ。"}
    , {com:"S",  val:"今の時代トリプルバトルの文化は消え、めっきり吾輩の出番は減ってしまったのだ。"}
    , {com:"S",  val:"ダブルバトルはまだあるとしても、吾輩をわざわざ出すまでもないのだ。"}
    , {com:"S",  val:"バトルロイヤル？そんなもの知らぬ。"}
    , {com:"S",  val:"………"}
    , {com:"S",  val:"まぁ、時代の流れに文句を言っても意味はないな。<br>ここは、吾輩自らが時代の流れに追いつくべきなのだ。"}
    , {com:"S",  val:"幸い、ピクシーになれば割と出番が多いらしいな。"}
    , {com:"S",  val:"天然とマジックガード。<br>メロメロボディは…、まぁいいとしよう。"}
    , {com:"S",  val:"ムーンフォースにコメットパンチ、その他もろもろの準備は大丈夫そうだな。"}
    , {com:"S",  val:"なんたって、進化したらもとには戻れないのだからな。"}
    , {com:"S",  val:"…"}
    , {com:"S",  val:"よし、では月の石探索に行くとしよう。"}
    , {com:"S",  val:"………"}
    , {com:"S",  val:"……"}
    , {com:"S",  val:"…"}
    , {com:"BG", val:"url(image/bg/BG005.png)"}
    , {com:"S",  val:"結構奥に来てみたはいいが、なかなか見つからないな"}
    , {com:"SE",  val:"#gastly"}
    , {com:"S",  val:"キシャァァァァッァァー"}
    , {com:"S",  val:"この鳴き声はゴースか？"}
    , {com:"S",  val:"おつきみ山にゴースは生息していただろうか？"}
    , {com:"S",  val:"まぁいい。<br>この際ゴースには、吾輩の強化の為の踏み台になってもらおう"}
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
        this.game = new Game(this);
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
    $("#serif").html("");
}

// ノーマルシナリオセット
Novel.prototype.setNormalScenario = function(){
    this.max = NORMAL_SCENARIO.length;
    this.scenario = SCENARIO.NORMAL;
    $("#serif").html("");
}

// トゥルーシナリオセット
Novel.prototype.setTrueScenario = function(){
    this.max = TRUE_SCENARIO.length;
    this.scenario = SCENARIO.TRUE;
    $("#serif").html("");
}

// バッドシナリオセット
Novel.prototype.setBadScenario = function(){
    this.max = BAD_SCENARIO.length;
    this.scenario = SCENARIO.BAD;
    $("#serif").html("");
}

// デッドシナリオセット
Novel.prototype.setDeadScenario = function(){
    this.max = DEAD_SCENARIO.length;
    this.scenario = SCENARIO.DEAD;
    $("#serif").html("");
}

Novel.prototype.mainScenario = function(){
    switch(MAIN_SCENARIO[this.cursor].com){
        // セリフ再生
        case "S":
            $("#serif").html(MAIN_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
        // セリフ再生
        case "PA":
            $("#serif").css("width", "450px");
            $("#chara").show();
            this.cursor++;
            this.play();
            break;
        // 背景変更
        case "BG":
            $("#mainScreen").css("background-image", MAIN_SCENARIO[this.cursor].val);
            this.cursor++;
            this.play();
            break;
        // SE再生
        case "SE":
            var au = $("#gastly").get(0);
            au.play();
            this.cursor++;
            this.play();
            break;
        //
        case "E":
            this.cursor = 0;
            //this.setTrueScenario();
            //this.play();
            $("#gameScreen").css("width", "800px");
            $("#gameScreen").css("height", "600px");
            $("#mainScreen").hide();
            $("#gameScreen").show();
            // ゲーム開始
            this.game.start();
            
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
            $("#mainScreen").css("background-image", NORMAL_SCENARIO[this.cursor].val);
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
            $("#mainScreen").html(TRUE_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#mainScreen").css("background-image", TRUE_SCENARIO[this.cursor].val);
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
            $("#mainScreen").html(BAD_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#mainScreen").css("background-image", BAD_SCENARIO[this.cursor].val);
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
            $("#mainScreen").html(DEAD_SCENARIO[this.cursor].val);
            this.cursor++;
            break;
    // 背景変更
    case "BG":
            $("#mainScreen").css("background-image", DEAD_SCENARIO[this.cursor].val);
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