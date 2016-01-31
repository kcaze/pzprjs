// Variety.js v3.4.1
/* jshint latedef: false */
/* global pzpr:false */

pzpr.variety = {
	info   : {},
	exists : function(name){
		return !!this.toPID(name);
	},
	toPID : function(name){
		if(!!this.info[name] && !!this.info[name].ja){ return name;}
		for(var pid in this.info){
			if(!this.info[pid].alias){ continue;}
			for(var type in this.info[pid].alias){
				if(this.info[pid].alias[type]===name){ return pid;}
			}
		}
		return '';
	},
	toScript : function(pid){
		return (!!this.info[pid] ? this.info[pid].script : '');
	},
	toURLID : function(pid){
		return (!!this.info[pid].alias.pzprurl ? this.info[pid].alias.pzprurl : pid);
	},
	toKanpen : function(pid){
		return (!!this.info[pid].alias.kanpen ? this.info[pid].alias.kanpen : pid);
	}
};

(function(Variety, obj){
	for(var pzprid in obj){
		pzpr.variety.info[pzprid] = new Variety(pzprid,obj[pzprid]);
	}
})
(function Variety(pzprid, datalist){
	this.pzprid = pzprid;		/* パズルID */
	this.script = (!!datalist[4] ? datalist[4] : pzprid);	/* スクリプトファイル(クラス) */
	this.ja     = datalist[2];	/* 日本語パズル名 */
	this.en     = datalist[3];	/* 英語パズル名 */
	this.exists = {
		pzprapp : !!datalist[0],
		kanpen  : !!datalist[1],
		pencilbox : !!datalist[1]
	};
	this.exists.pencilbox = this.exists.pencilbox &&
						 (pzprid!=="nanro" && pzprid!=="ayeheya" && pzprid!=="kurochute");
	/* pzprurl : ぱずぷれID(URL出力用) */
	/* kanpen  : カンペンID            */
	/* kanpen2 : カンペンID(入力のみ)  */
	this.alias  = (!!datalist[5] ? datalist[5] : {});
},
{
	aho       :[0,0,"アホになり切れ","Aho-ni-Narikire",'shikaku'],
	amibo     :[0,0,"あみぼー","Amibo",'amibo'],
	ayeheya   :[0,1,"∀人∃ＨＥＹＡ","ekawayeh",'heyawake'],
	bag       :[1,0,"バッグ","BAG (Corral)",'',{alias:'correl'}],
	barns     :[1,0,"バーンズ","Barns"],
	bdblock   :[1,0,"ボーダーブロック","Border Block"],
	bonsan    :[1,0,"ぼんさん","Bonsan",'bonsan'],
	bosanowa  :[1,0,"ボサノワ","Bosanowa"],
	box       :[0,0,"ボックス","Box"],
	cbblock   :[0,0,"コンビブロック","Combi Block"],
	chocona   :[0,0,"チョコナ","Chocona",'shimaguni'],
	cojun     :[0,0,"コージュン","Cojun",'ripple'],
	country   :[1,0,"カントリーロード","Country Road"],
	creek     :[1,0,"クリーク","Creek"],
	dosufuwa  :[0,0,"ドッスンフワリ","Dosun-Fuwari"],
	factors   :[0,0,"因子の部屋","Rooms of Factors"],
	fillmat   :[1,0,"フィルマット","Fillmat",'fillmat'],
	fillomino :[0,1,"フィルオミノ","Fillomino",'',{kanpen2:'fillomino01'}],
	firefly   :[1,0,"ホタルビーム","Hotaru Beam (Glow of Fireflies)"],
	fivecells :[0,0,"ファイブセルズ","FiveCells",'nawabari'],
	fourcells :[0,0,"フォーセルズ","FourCells",'nawabari'],
	goishi    :[0,1,"碁石ひろい","Goishi"],
	gokigen   :[1,0,"ごきげんななめ","Gokigen-naname",'gokigen'],
	hakoiri   :[1,0,"はこいり○△□","Hokoiri-masashi"],
	hanare    :[0,0,"はなれ組","Hanare-gumi",'hanare'],
	hashikake :[0,1,"橋をかけろ","Hashiwokakero (Bridges)",'',{pzprurl:'hashi',kanpen:'hashi',alias:'bridges'}],
	herugolf  :[0,0,"ヘルゴルフ","Herugolf"],
	heyawake  :[0,1,"へやわけ","Heyawake",'heyawake'],
	heyabon   :[1,1,"へやぼん","Heya-Bon",'bonsan',{kanpen:'satogaeri'}],
	hitori    :[0,1,"ひとりにしてくれ","Hitori"],
	icebarn   :[1,0,"アイスバーン","Icebarn",'icebarn'],
	icelom    :[0,0,"アイスローム","Icelom",'icebarn'],
	icelom2   :[0,0,"アイスローム２","Icelom2",'icebarn'],
	ichimaga  :[0,0,"イチマガ","Ichimaga",'ichimaga'],
	ichimagam :[0,0,"磁石イチマガ","Magnetic Ichimaga",'ichimaga'],
	ichimagax :[0,0,"一回曲がって交差もするの","Crossing Ichimaga",'ichimaga'],
	juosan    :[0,0,"縦横さん","Juosan"],
	kazunori  :[0,0,"かずのりのへや","Kazunori Room"],
	kaero     :[1,0,"お家に帰ろう","Return Home"],
	kakuro    :[0,1,"カックロ","Kakuro"],
	kakuru    :[0,0,"カックル","Kakuru"],
	kinkonkan :[1,0,"キンコンカン","Kin-Kon-Kan"],
	kouchoku  :[0,0,"交差は直角に限る","Kouchoku"],
	kramma    :[0,0,"快刀乱麻","KaitoRamma",'kramma'],
	kramman   :[0,0,"新・快刀乱麻","New KaitoRamma",'kramma'],
	kurochute :[0,1,"クロシュート","Kurochute"],
	kurodoko  :[0,1,"黒どこ(黒マスはどこだ)","Kurodoko"],
	kurotto   :[0,0,"クロット","Kurotto"],
	kusabi    :[0,0,"クサビリンク","Kusabi"],
	lightup   :[0,1,"美術館","Akari (Light Up)",'',{pzprurl:'akari',kanpen:'bijutsukan'}],
	lits      :[1,1,"ＬＩＴＳ","LITS",'lits'],
	lookair   :[0,0,"るっくえあ","Look-Air"],
	loopsp    :[1,0,"環状線スペシャル","Loop Special"],
	loute     :[0,0,"エルート","L-route"],
	makaro    :[0,0,"マカロ","Makaro"],
	mashu     :[0,1,"ましゅ","Masyu (Pearl Puzzle)",'',{kanpen:'masyu',alias:'pearl'}],
	mejilink  :[0,0,"メジリンク","Mejilink"],
	minarism  :[1,0,"マイナリズム","Minarism"],
	mochikoro :[1,0,"モチコロ","Mochikoro",'nurikabe'],
	mochinyoro:[1,0,"モチにょろ","Mochinyoro",'nurikabe'],
	nagare    :[0,0,"流れるループ","Nagareru-Loop"],
	nagenawa  :[0,0,"なげなわ","Nagenawa",'nagenawa'],
	nanro     :[0,1,"ナンロー","Nanro"],
	nawabari  :[1,0,"なわばり","Territory",'nawabari'],
	norinori  :[0,1,"のりのり","Norinori",'lits'],
	numlin    :[0,1,"ナンバーリンク","Numberlink",'',{kanpen:'numberlink'}],
	nuribou   :[1,0,"ぬりぼう","Nuribou",'nurikabe'],
	nurikabe  :[0,1,"ぬりかべ","Nurikabe",'nurikabe'],
	nurimaze  :[0,0,"ぬりめいず","Nuri-Maze",'nurimaze'],
	paintarea :[1,0,"ペイントエリア","Paintarea"],
	pipelink  :[1,0,"パイプリンク","Pipelink",'pipelink'],
	pipelinkr :[1,0,"帰ってきたパイプリンク","Pipelink Returns",'pipelink'],
	rectslider:[0,0,"四角スライダー","Rectangle-Slider",'bonsan'],
	reflect   :[1,0,"リフレクトリンク","Reflect Link"],
	renban    :[0,0,"連番窓口","Renban-Madoguchi"],
	ringring  :[0,0,"リングリング","Ring-ring",'nagenawa'],
	ripple    :[0,1,"波及効果","Ripple Effect",'ripple',{kanpen:'hakyukoka'}],
	roma      :[0,0,"ろーま","Roma"],
	sashigane :[0,0,"さしがね","Sashigane",'loute'],
	shakashaka:[0,1,"シャカシャカ","ShakaShaka"],
	shikaku   :[0,1,"四角に切れ","Shikaku (Devide by Box)",'shikaku'],
	shimaguni :[1,0,"島国","Islands",'shimaguni'],
	shugaku   :[1,0,"修学旅行の夜","School Trip"],
	shwolf    :[0,0,"ヤギとオオカミ","Sheeps and Wolves",'kramma'],
	slalom    :[1,1,"スラローム","Slalom"],
	slither   :[0,1,"スリザーリンク","Slitherlink",'',{kanpen:'slitherlink'}],
	snakes    :[1,0,"へびいちご","Hebi-Ichigo"],
	sudoku    :[0,1,"数独","Sudoku"],
	sukoro    :[1,0,"数コロ","Sukoro",'sukoro'],
	sukororoom:[0,0,"数コロ部屋","Sukoro-room",'sukoro'],
	tapa      :[0,0,"Tapa","Tapa"],
	tasquare  :[0,0,"たすくえあ","Tasquare"],
	tatamibari:[1,0,"タタミバリ","Tatamibari"],
	tateyoko  :[1,0,"タテボーヨコボー","Tatebo-Yokobo"],
	tawa      :[0,0,"たわむれんが","Tawamurenga"],
	tentaisho :[0,1,"天体ショー","Tentaisho"],
	tilepaint :[1,0,"タイルペイント","Tilepaint"],
	toichika  :[0,0,"遠い誓い","Toichika"],
	triplace  :[0,0,"トリプレイス","Tri-place"],
	usotatami :[0,0,"ウソタタミ","Uso-tatami",'fillmat'],
	view      :[1,0,"ヴィウ","View",'sukoro'],
	wagiri    :[0,0,"ごきげんななめ・輪切","Gokigen-naname:wagiri",'gokigen'],
	wblink    :[0,0,"シロクロリンク","Shirokuro-link"],
	yajikazu  :[1,0,"やじさんかずさん","Yajisan-Kazusan"],
	yajirin   :[0,1,"ヤジリン","Yajilin",'',{pzprurl:'yajilin',kanpen:'yajilin'}],
	yajitatami:[0,0,"ヤジタタミ","Yajitatami"],
	yosenabe  :[0,0,"よせなべ","Yosenabe"]
});
