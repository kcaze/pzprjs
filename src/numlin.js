//
// パズル固有スクリプト部 ナンバーリンク版 numlin.js v3.4.0
//
pzprv3.custom.numlin = {
//---------------------------------------------------------
// マウス入力系
MouseEvent:{
	inputedit : function(){
		if(this.mousestart){ this.inputqnum();}
	},
	inputplay : function(){
		if(this.mousestart || this.mousemove){
			if     (this.btn.Left) { this.inputLine();}
			else if(this.btn.Right){ this.inputpeke();}
		}
		else if(this.mouseend && this.notInputted()){
			if(this.btn.Left){ this.inputpeke();}
		}
	},
	inputRed : function(){ this.dispRedLine();}
},

//---------------------------------------------------------
// キーボード入力系
KeyEvent:{
	enablemake : true,

	enablemake_p : true,
	paneltype    : 10
},

//---------------------------------------------------------
// 盤面管理系
Board:{
	isborder : 1
},

LineManager:{
	isCenterLine : true
},

AreaManager:{
	lineToArea : true
},

Menu:{
	menufix : function(){
		this.addRedLineToFlags();
	}
},

//---------------------------------------------------------
// 画像表示系
Graphic:{
	setColors : function(){
		this.gridcolor = this.gridcolor_LIGHT;
	},
	paint : function(){
		this.drawBGCells();
		this.drawGrid();

		this.drawPekes(0);
		this.drawLines();

		this.drawCellSquare();
		this.drawNumbers();

		this.drawChassis();

		this.drawTarget();
	},

	drawCellSquare : function(){
		var g = this.vinc('cell_number_base', 'crispEdges');

		var mgnw = this.cw*0.15;
		var mgnh = this.ch*0.15;
		var header = "c_sq_";

		var clist = this.range.cells;
		for(var i=0;i<clist.length;i++){
			var c = clist[i];
			if(bd.cell[c].qnum!==-1){
				if     (bd.cell[c].error===1){ g.fillStyle = this.errbcolor1;}
				else if(bd.cell[c].error===2){ g.fillStyle = this.errbcolor2;}
				else                         { g.fillStyle = "white";}

				if(this.vnop(header+c,this.FILL)){
					g.fillRect(bd.cell[c].px+mgnw+1, bd.cell[c].py+mgnh+1, this.cw-mgnw*2-1, this.ch-mgnh*2-1);
				}
			}
			else{ this.vhide(header+c);}
		}
	}
},

//---------------------------------------------------------
// URLエンコード/デコード処理
Encode:{
	pzlimport : function(type){
		this.decodeNumber16();
	},
	pzlexport : function(type){
		this.encodeNumber16();
	},

	decodeKanpen : function(){
		fio.decodeCellQnum_kanpen();
	},
	encodeKanpen : function(){
		fio.encodeCellQnum_kanpen();
	}
},
//---------------------------------------------------------
FileIO:{
	decodeData : function(){
			this.decodeCellQnum();
			this.decodeBorderLine();
	},
	encodeData : function(){
			this.encodeCellQnum();
			this.encodeBorderLine();
	},

	kanpenOpen : function(){
		this.decodeCellQnum_kanpen();
		this.decodeBorderLine();
	},
	kanpenSave : function(){
		this.encodeCellQnum_kanpen();
		this.encodeBorderLine();
	}
},

//---------------------------------------------------------
// 正解判定処理実行部
AnsCheck:{
	checkAns : function(){
		this.performAsLine = true;

		if( !this.checkLcntCell(3) ){
			this.setAlert('分岐している線があります。','There is a branch line.'); return false;
		}
		if( !this.checkLcntCell(4) ){
			this.setAlert('線が交差しています。','There is a crossing line.'); return false;
		}

		var linfo = bd.areas.getLareaInfo();
		if( !this.checkTripleNumber(linfo) ){
			this.setAlert('3つ以上の数字がつながっています。','Three or more numbers are connected.'); return false;
		}

		if( !this.checkSameObjectInRoom(linfo, function(c){ return bd.getNum(c);}) ){
			this.setAlert('異なる数字がつながっています。','Different numbers are connected.'); return false;
		}

		if( !this.check2Line() ){
			this.setAlert('数字の上を線が通過しています。','A line goes through a number.'); return false;
		}
		if( !this.check1Line() ){
			this.setAlert('途切れている線があります。','There is a dead-end line.'); return false;
		}
		if( !this.checkDisconnectLine(linfo) ){
			this.setAlert('数字につながっていない線があります。','A line doesn\'t connect any number.'); return false;
		}

		if( !this.checkAllCell(function(c){ return (bd.lines.lcntCell(c)==0 && bd.isNum(c));}) ){
			this.setAlert('どこにもつながっていない数字があります。','A number is not connected another number.'); return false;
		}

		return true;
	},

	check1Line : function(){ return this.checkLine(function(c){ return (bd.lines.lcntCell(c)===1 && bd.noNum(c));}); },
	check2Line : function(){ return this.checkLine(function(c){ return (bd.lines.lcntCell(c)>= 2 && bd.isNum(c));}); },
	checkLine : function(func){
		var result = true;
		for(var c=0;c<bd.cellmax;c++){
			if(!func(c)){ continue;}

			if(this.inAutoCheck){ return false;}
			if(result){ bd.sErBAll(2);}
			bd.setCellLineError(c,true);
			result = false;
		}
		return result;
	}
}
};
