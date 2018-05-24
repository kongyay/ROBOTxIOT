window.fbAsyncInit = function() {
    FB.init({
      appId      : '1449083385318999',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/th_TH/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


var game = new Phaser.Game(window.innerWidth /** window.devicePixelRatio*/, window.innerHeight /** window.devicePixelRatio*/, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render:render });

var salmons = new Array();
var tunas = new Array();
var tuna_startX = new Array();
var tuna_startY;
var tuna_line = new Array();
var tuna_from = new Array();
var tuna_color = new Array();
var iot_base = [null,null,null,null];
var iot_value = [0,1,2,3];
var iot_text = [0,1,2,3];
var isStarted = false,isFirstTime = true;
var rb_base,dragBoundSalmon,dragBoundTuna;
var tunaRoll=0,salmonSushi=0,counter = 10;
var pointtxt1,pointtxt2;
var loadbg=null,loadbar=null;
var ShareBtn=null,RestartBtn=null,openBG=null;
var tweenSpeed=1000;
var Pic=null,banner=null,ShowSum=null,step=0,textShow='หยุดโกงได้แล้วจ้า',offsetter;
var ScorePic = ['http://www.cesmartcamp.com/game/image/T012LETD1SMX.png',
				'http://www.cesmartcamp.com/game/image/Q02AUDG4MKJU.png',
				'http://www.cesmartcamp.com/game/image/X03NUK6J0HR2.png',
				'http://www.cesmartcamp.com/game/image/C04976ZXJL0G.png',
				'http://www.cesmartcamp.com/game/image/Z05HZ8UOXR2B.png',
				'http://www.cesmartcamp.com/game/image/F061FYMHQNCL.png',
				'http://www.cesmartcamp.com/game/image/Z0710ORKW7UL.png',
				'http://www.cesmartcamp.com/game/image/E086YMMBUK6U.png',
				'http://www.cesmartcamp.com/game/image/O09V01WM3ZC4.png',
				'http://www.cesmartcamp.com/game/image/W10V33Q2BDQ9.png',
				'http://www.cesmartcamp.com/game/image/V11PMNLQW3H5.png',
				'http://www.cesmartcamp.com/game/image/612G02WANLID.png',
				'http://www.cesmartcamp.com/game/image/7139G5MYHPWC.png',
				'http://www.cesmartcamp.com/game/image/F14B8X3FVGSA.png'];

function preload() {
	game.load.image('loadbg','image/loading.png');
	game.load.image('loadbar','image/loaded.png');
	
}

function render() {
    //game.debug.text("ROBOTxIOT war - เลื่อนหุ่นให้ลงตรงกลาง x ต่อสายจัมพ์ให้ถูกรู !", 10, 20);
}



function create() {
    game.load.onFileComplete.add(fileComplete, this);
	game.load.resetLocked = true;
	
	
	game.load.image('buttonShare','image/button_share.png');
	game.load.image('buttonStart','image/button_start.png');
	game.load.image('iot','image/tunahead.png');
	game.load.image('robot0','image/salmonsplash1.png');
	game.load.image('robot1','image/salmonsplash2.png');
	game.load.image('robot2','image/salmonsplash3.png');
	game.load.image('plate','image/salmontable.png');
	game.load.image('tunasplash','image/tunasplash.png');
	game.load.image('tunatable','image/tunatable.png');
	game.load.image('pin','image/tunapoint.jpg');
	game.load.image('banner','image/banner.png');
	
	game.load.image('bg','image/bg.jpg');
	game.load.image('Openbg','image/opening.png');
	
	game.load.audio('bass', 'audio/runbg.wav');
	game.load.audio('end', 'audio/end.mp3');
	game.load.audio('correct', 'audio/punch.mp3');
	game.load.audio('wrong', 'audio/wrong.mp3');
	
	game.load.start();
	
	
}

//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	if(game.cache.checkImageKey('loadbg') && loadbg==null) {
		loadbg = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'loadbg');
		loadbg.anchor.setTo(0.5, 0.5);
		loadbg.width = window.innerWidth;
		loadbg.height = game.math.clamp(loadbg.width/2, window.innerHeight/2, window.innerHeight);
	}
	else if(game.cache.checkImageKey('loadbar') && loadbar==null) {
		loadbar = game.add.sprite(window.innerWidth*0.01, loadbg.y + loadbg.height/2*0.6, 'loadbar');
		loadbar.anchor.setTo(0, 0.5);
		loadbar.width = window.innerWidth*0.9;
		loadbar.height = loadbg.height * 0.3;
	}
	else if(game.cache.checkImageKey('loadbar') ) {
		loadbar.width = window.innerWidth*0.6*totalLoaded/totalFiles;
	}
	
	if(totalLoaded==totalFiles&&isFirstTime) StartGame();
}

function StartGame() {
	bass = game.add.audio('bass');
	end = game.add.audio('end');
	correct = game.add.audio('correct');
	wrong = game.add.audio('wrong');
	
	bg = game.add.sprite(0, 0, 'bg');
	bg.width = window.innerWidth;
	bg.height = window.innerHeight;
	
	openBG = game.add.sprite(0, 0, 'Openbg');
	openBG.width = window.innerWidth;
	openBG.height = window.innerHeight;
	
	
	
	pointtxt1 = game.add.text(window.innerWidth/2*0.5, window.innerHeight/2, '', { font: "300px Arial", fill: "#ffffff", align: "center" });
	pointtxt1.width = window.innerWidth/3;
	pointtxt1.height = window.innerHeight/3;
    pointtxt1.anchor.setTo(0.5, 0.5);
	pointtxt1.alpha = 0.3;
	
	pointtxt2 = game.add.text(window.innerWidth/2*1.5, window.innerHeight/2, '', { font: "300px Arial", fill: "#ffffff", align: "center" });
	pointtxt2.width = window.innerWidth/3;
	pointtxt2.height = window.innerHeight/3;
    pointtxt2.anchor.setTo(0.5, 0.5);
	pointtxt2.alpha = 0.3;
	
	tunaStart = game.add.sprite(window.innerWidth*0.50,0, 'tunasplash');
	tunaStart.width = window.innerWidth*0.5;
	tunaStart.height = window.innerHeight*0.23;
	tunaStart.visible = false;
	
	tunaStop = game.add.sprite(window.innerWidth*0.50,window.innerHeight, 'tunatable');
	tunaStop.anchor.setTo(0, 1);
	tunaStop.width = window.innerWidth*0.5;
	tunaStop.height = window.innerHeight*0.15;
	tuna_startY = window.innerHeight*0.20;
	
	
	for(var i=0;i<4;i++) {
		tuna_startX[i] = window.innerWidth*(0.61 + 0.1*i);
		iot_base[i] = this.game.add.sprite(window.innerWidth*(0.55 + 0.134*i),tunaStop.y- tunaStop.height*0.8, 'pin');
		iot_base[i].anchor.setTo(0.5, 0.5);
		iot_base[i].height = window.innerHeight*0.05;
		iot_base[i].width = window.innerWidth*0.05;
		game.physics.enable(iot_base[i],Phaser.Physics.ARCADE);
		iot_base[i].body.allowGravity = false;
		iot_base[i].body.immovable = true;
		
		iot_text[i] = game.add.text(iot_base[i].x-iot_base[i].width/2.5, iot_base[i].y+window.innerHeight*0.05, 'PIN', { font: "20px Arial", fill: "#000000", align: "center" });
		iot_text[i].height = window.innerHeight*0.05;
		iot_text[i].width = window.innerWidth*0.05;
	}
	
	rb_base = this.game.add.sprite(window.innerWidth*0.25,window.innerHeight, 'plate');
	rb_base.anchor.setTo(0.5, 1);
	rb_base.height = window.innerHeight*0.1;
	rb_base.width = window.innerWidth*0.125;
	game.physics.enable(rb_base,Phaser.Physics.ARCADE);
	rb_base.body.allowGravity = false;
	rb_base.body.immovable = true;
	
	banner = game.add.button(window.innerWidth*0.5, window.innerHeight*0.95, 'banner', OnClick_SSSS, this, 2, 1, 0);
	banner.anchor.setTo(0.5,0.5);
	banner.height = window.innerHeight*0.1;
	banner.width = banner.height*3;

	ShareBtn = game.add.button(window.innerWidth/2, window.innerHeight*0.6, 'buttonShare', OnClick_Share, this, 2, 1, 0);	
	ShareBtn.height = window.innerHeight*0.15;
	ShareBtn.anchor.setTo(0.5,0.5);
	ShareBtn.visible = false;
	RestartBtn = game.add.button(window.innerWidth/2, window.innerHeight*0.6+ShareBtn.height, 'buttonStart', OnClick_Restart, this, 2, 1, 0);	
	RestartBtn.height = window.innerHeight*0.15;
	RestartBtn.anchor.setTo(0.5,0.5);
	
	ShowSum = game.add.text(window.innerWidth/2, RestartBtn.y + RestartBtn.height*0.9, '0', { font: "30px Arial", fill: "#00ff00", align: "center" });
	ShowSum.anchor.setTo(0.5, 0.5);
	ShowSum.width = window.innerWidth*0.030;
	ShowSum.height = ShowSum.width*1.6;
	
	ShowSum.visible = false;
	ShowSum.stroke = '#000000';
    ShowSum.strokeThickness = 6;
    ShowSum.fill = '#43d637';
	
	dragBoundSalmon = new Phaser.Rectangle(0, 0, window.innerWidth/2, window.innerHeight);
	dragBoundTuna = new Phaser.Rectangle(window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight);
	
	
}

function spawnRobot() {
	var newsalmon = 0;
	newsalmon = game.add.sprite(game.rnd.integerInRange(window.innerWidth*0.1, window.innerWidth*0.4),10, 'robot'+game.rnd.integerInRange(0,2));
	newsalmon.anchor.setTo(0.5, 0.5);
	newsalmon.height = window.innerHeight*0.125;
	newsalmon.width = window.innerWidth*0.125;
	
	newsalmon.inputEnabled = true;
	newsalmon.input.enableDrag();
	newsalmon.input.setDragLock(true, false);
	newsalmon.input.boundsRect = dragBoundSalmon;
	newsalmon.events.onDragStop.add(onDragStopSalmon);
	
	game.physics.enable(newsalmon,Phaser.Physics.ARCADE);
	newsalmon.body.gravity.y = 50+tunaRoll*45;
	//newsalmon.hitArea = new Phaser.Rectangle(-newsalmon.x,-newsalmon.y, window.innerWidth/2, window.innerHeight*2);
	newsalmon.hitArea = new Phaser.Rectangle(-newsalmon.width/2-newsalmon.width*2,-newsalmon.height/2-window.innerHeight, newsalmon.width*4, window.innerHeight*2);
	
	salmons.push(newsalmon);
}

function spawnIOT() {
	var newtuna = 0;
	var i = game.rnd.integerInRange(0,3);
	newtuna = game.add.sprite(tuna_startX[i],tuna_startY, 'iot');
	
	newtuna.height = window.innerHeight*0.125;
	newtuna.width = window.innerWidth*0.05;
	newtuna.anchor.setTo(0.5, 0);
	
	newtuna.inputEnabled = true;
	newtuna.input.enableDrag();
	newtuna.input.setDragLock(true, true);
	newtuna.input.boundsRect = dragBoundTuna;
			
	newtuna.events.onDragStart.add(onDragStart);
	newtuna.events.onDragStop.add(onDragStopTuna);
	newtuna.events.onDragUpdate.add(onDragUpdate);
			
	game.physics.enable(newtuna,Phaser.Physics.ARCADE);
	newtuna.body.gravity.y = 40+tunaRoll*25;
	newtuna.body.checkCollision.up = true;
	newtuna.body.checkCollision.left = false;
	newtuna.body.checkCollision.right = false;
	newtuna.body.checkCollision.down = false;
	newtuna.hitArea = new Phaser.Rectangle(-newtuna.width/2-newtuna.width*2,0-window.innerHeight, newtuna.width*4, window.innerHeight*2);
	//new Phaser.Rectangle(-newtuna.x + window.innerWidth/2,-newtuna.y, window.innerWidth/3, window.innerHeight*2); 
	
	var newline = game.add.graphics(0, 0);
	
	tuna_from.push(i);
	tuna_line.push(newline);
	tuna_color.push(game.rnd.integerInRange(0,1)*0xFF + game.rnd.integerInRange(0,1)*0xFF00 + game.rnd.integerInRange(0,1)*0xFF0000);
	tunas.push(newtuna);

}

function update() {
	
	if(isDrag) {
		holdThatTuna++;
		if(holdThatTuna>300) {
			game.add.tween(tunas[salmonSushi]).to({ y: window.innerHeight }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false); 
			holdThatTuna = 0;
			isDrag = false;
		}
	}
		
	if(counter>0 && isStarted)	{
		if(game.device.desktop)
			if(game.physics.arcade.distanceToPointer(salmons[tunaRoll])<=game.physics.arcade.distanceToPointer(tunas[salmonSushi])) {
				salmons[tunaRoll].inputEnabled = true;
				tunas[salmonSushi].inputEnabled = false;
			} else {
				salmons[tunaRoll].inputEnabled = false;
				tunas[salmonSushi].inputEnabled = true;
			}
		
		for(var i=tunaRoll;i<salmons.length;i++) {
			game.physics.arcade.collide(salmons[i], (i>0)? salmons[i-1]:rb_base, collisionSalmonHandler, null, this);
			if(salmons[i].y>window.innerHeight) {
				wrong.play();
				counter = 0;
			}
		}
	
		for(var i=salmonSushi;i<tunas.length;i++) {
			for(var j=0;j<4;j++) {
				game.physics.arcade.collide(tunas[i], iot_base[j], collisionTunaHandler, null, this);
			}
			tuna_line[i].clear();
			tuna_line[i].lineStyle(10,tuna_color[i], 1);
			tuna_line[i].drawCircle(tuna_startX[tuna_from[i]], tuna_startY, window.innerWidth*0.01);
			tuna_line[i].drawCircle(tunas[i].position.x, tunas[i].position.y, window.innerWidth*0.01);
			tuna_line[i].moveTo(tuna_startX[tuna_from[i]],tuna_startY);
			tuna_line[i].lineTo(tunas[i].position.x, tunas[i].position.y);
			
			if(tunas[i].y>window.innerHeight) counter = 0;
		}
	}
	else if(!isFirstTime) {
		GameOver();
	}
		
	
	
}
function GameOver() {
	if(counter>-1) {
		counter = -1;
		
		var sum = tunaRoll+salmonSushi;
		if(sum<=10) {
			step = 0;
			textShow = 'หะ! ได้แค่ ' + sum + ' คะแนน ลองพยายามอีกนิดน้า';
		}
		else if(sum<=15) {
			step = 1;
			textShow = 'ได้ ' + sum + ' คะแนนแน่ะ ใช้ได้เลยนะ';
		}
		else if(sum<=20) {
			step = 2;
			textShow = 'ว้าว! ได้ตั้ง ' + sum + ' คะแนนเลยนะ';
		}
		else if(sum<=25) {
			step = 3;
			textShow = 'โอ้โห! ได้ ' + sum + ' คะแนน เก่งนะเนี่ย';
		}
		else if(sum<=30) {
			step = 4;
			textShow = 'โอ้ว้าววโว้ว! ได้ตั้ง ' + sum + ' คะแนนเลยนะเนี่ย';
		}
		else if(sum<=35) {
			step = 5;
			textShow = 'โอ้วมายกอด! ได้ตั้ง ' + sum + ' คะแนน!!';
		}
		else if(sum<=40) {
			step = 6;
			textShow = 'OMGGG ได้ ' + sum + ' คะแนนเลยนะ!!!!';
		}
		else if(sum<=50) {
			step = 7;
			textShow = 'ขุ่นพระขุ่นเจ้า!! ได้ ' + sum + ' คะแนนเลยนะ!!!!';
		}
		else if(sum<=60) {
			step = 8;
			textShow = 'เดี๋ยวว ได้' + sum + ' คะแนน เยอะไปไหนเนี่ย!!!';
		}
		else if(sum<=70) {
			step = 9;
			textShow = 'เห้ยยเห้ยยยยย ได้ ' + sum + ' คะแนนเลยเหรอ สุดยอด!!!!';
		}
		else if(sum<=80) {
			step = 10;
			textShow = 'ได้ ' + sum + ' คะแนนเหรอ นี่ชักจะเยอะเกินไปแล้วนะ!!!';
		}
		else if(sum<=90) {
			step = 11;
			textShow = 'ปาดดด  ได้ ' + sum + ' คะแนน ไม่รู้จะพูดยังไงแล้ว!!!';
		}
		else if(sum<=100) {
			step = 12;
			textShow = 'เอ่อ.... ได้ ' + sum + ' คะแนน ตามสบายเลยนะ ไม่สู้แล้วจ่ะ พักผ่อนบ้างนะ';
		}
		else {
			step = 13;
			textShow = 'ขี้โกง!!!!!!!!! ' + sum + ' คะแนน มันทำได้ด้วยเหรอ!!!!!!!';
		}
		
			
			tunaStart.visible = false;
			openBG.visible = true;
			RestartBtn.visible = true;
			ShareBtn.visible = true;
			banner.visible = true;
			
			ShowSum.visible = true;
			ShowSum.setText(textShow);
			
			game.world.bringToTop(ShowSum);
			game.world.bringToTop(ShareBtn);
			game.world.bringToTop(RestartBtn);
			
			
			
			bass.stop();
			end.play();
			
			for(var i=tunaRoll;i<salmons.length;i++) {
				if(salmons[i].position.y < window.innerHeight*0.8) {
					salmons[i].destroy();
				}
				
			}
			for(var i=salmonSushi;i<tunas.length;i++) {
				if(tunas[i].position.y < window.innerHeight*0.8) {
					tunas[i].destroy();
					tuna_line[i].destroy();
				}
			}
	} else if(counter==-1) {
		
		
		if(game.cache.checkImageKey('scorepic'+step) && Pic ==null) {
			Pic = game.add.sprite(window.innerWidth/2, 0, 'scorepic'+step);
			Pic.anchor.setTo(0.5, 0);
			Pic.height = window.innerHeight *0.5;
			Pic.width = game.math.clamp(Pic.height * 1.5, 0, window.innerWidth);
			pointtxt1.visible = true;
			pointtxt2.visible = true;
			ShareBtn.visible = true;
			pointtxt1.setText(tunaRoll);
			pointtxt2.setText(salmonSushi);
			
			ShowSum.visible = true;
			ShowSum.setText(textShow);
			
			game.world.bringToTop(textShow);
			game.world.bringToTop(ShareBtn);
			game.world.bringToTop(RestartBtn);
			
			counter = -2;
		} else {
			game.load.image('scorepic'+step,ScorePic[step]);
			game.load.start();
		}
	} 
	

}

function collisionSalmonHandler(obj1, obj2) {
	correct.play();
	tunaRoll++;
	pointtxt1.setText(tunaRoll);
	obj1.body.allowGravity = false;
	obj1.body.immovable = true;
	obj1.inputEnabled = false;
	obj1.input.draggable = false;
	spawnRobot();
	
	game.add.tween(obj2).to( { alpha: 0.5 }, 100, "Linear", true);

	//game.add.tween(obj1).to({ x: obj2.position.x }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false); 
	
	if(obj1.y < window.innerHeight*0.8) {
		for(i=0;i<tunaRoll;i++) {
			if(salmons[i].y+salmons[i].height>window.innerHeight) salmons[i].destroy();
			else game.add.tween(salmons[i]).to({ y: (i>0&&salmons[i-1]!=null)? salmons[i-1].position.y:salmons[i].position.y+salmons[i].height }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false); 
			//to(properties, duration, ease, autoStart, delay, repeat, yoyo) )
		}
		game.add.tween(rb_base).to({ y: rb_base.position.y+salmons[i].height }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false);
		
	}
}

function collisionTunaHandler(obj1, obj2) {
	var i = tunas.indexOf(obj1);
	var j = iot_base.indexOf(obj2);
	if(tuna_from[i] == iot_value[j]) {
		if(salmonSushi>0) tunas[salmonSushi-1].destroy();
		if(salmonSushi>5) tuna_line[salmonSushi-5].destroy();
		
		correct.play();
		salmonSushi++;
		pointtxt2.setText(salmonSushi);
		obj1.body.allowGravity = false;
		obj1.body.immovable = true;
		obj1.inputEnabled = false;
		obj1.input.draggable = false;
		isDrag = false;
		holdThatTuna =0;	
			
		game.add.tween(tuna_line[i]).to( { alpha: 0.1 }, 100, "Linear", true);	
		game.add.tween(tunas[i]).to( { alpha: 0.1 }, 100, "Linear", true);	
		game.add.tween(tunas[i]).to({ y: tunas[i].position.y+tunas[i].height }, 100, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, false); 
		
		
		spawnIOT();
	} else {
		wrong.play();
		counter = 0;
	}
}

function Rand_iot() {
	for(var i=0;i<4;i++) {
		var temp = iot_value[i];
		var rand = i + game.rnd.integerInRange(0-i,3-i);
		iot_value[i] = iot_value[rand];
		iot_value[rand] = temp;
	}
	for(var i=0;i<4;i++)
		if(iot_value[i]==0)
			iot_text[i].setText("3V3");
		else if(iot_value[i]==1)
			iot_text[i].setText("GND");
		else if(iot_value[i]==2)
			iot_text[i].setText("TX");
		else if(iot_value[i]==3)
			iot_text[i].setText("RX");
		else 
			iot_text[i].setText("NOP");
}

function OnClick_Share () {
		FB.ui({
			method: 'share',
			href: 'cesmartcamp.com/game',     // The same than link in feed method
			title: textShow + ' (ต่อซิ๊)',  // The same than name in feed method
			hashtag: '#CESCX',
			picture: ScorePic[step],  
			description: 'เราต่อหุ่นได้ ' + tunaRoll + ' ชั้น และโยงสายจัมพ์ได้ ' + salmonSushi + ' เส้นเลยนะ ! ลองมาเล่นดูบ้างซิ เห็นง่ายๆ แบบนี้ ก็เล่นยากนะจ๊ะ',  
			caption: 'ค่าย CE Smart Camp X ค่ายคอมที่จะเปิดโลกใบใหม่ให้แก่น้องๆ มัธยม น้องๆ สามารถเลือกได้ว่าอยากอยู่ฝ่าย Robot หรือ Iot....'

		}, function(response){
			  //console.log(response);
		}); 

}

function OnClick_Restart () {
	for(var i=0;i<salmons.length;i++) 
		if(salmons[i]!=null) salmons[i].destroy();
	for(var i=0;i<tunas.length;i++) 
		if(tunas[i]!=null) tunas[i].destroy();
	for(var i=0;i<tuna_line.length;i++) 
		if(tuna_line[i]!=null) tuna_line[i].destroy();
	salmons = [];
	tunas = [];
	tuna_line = [];
	tuna_from = [];
	tuna_color = [];
	tunaRoll = salmonSushi = 0;
	counter = 10;
	pointtxt1.setText('0');
	pointtxt2.setText('0');
	ShareBtn.visible = false;
	RestartBtn.visible = false;
	isFirstTime = false;
	isStarted = true;
	openBG.visible = false;
	rb_base.x = window.innerWidth*0.25;
	rb_base.y = window.innerHeight;
	rb_base.alpha = 1;
	ShowSum.visible = false;
	banner.visible = false;
	
	if(Pic!=null) {
		Pic.destroy();
		Pic = null;
	}
	tunaStart.visible = true;
	
	
	bass.loopFull(0.6);
	
	spawnRobot();
	spawnIOT();
	Rand_iot();
}

function OnClick_SSSS() {
	window.open("https://www.facebook.com/sleepingpillstudio/", "_blank");
}

function onDragStart(sprite, pointer) {
	sprite.body.allowGravity = false;
	sprite.body.reset();
	isDrag = true;
}
function onDragStopSalmon(sprite, pointer) {
	//sprite.hitArea = new Phaser.Rectangle(-sprite.x,-sprite.y, window.innerWidth/2, window.innerHeight*2);
}

function onDragStopTuna(sprite, pointer) {
	sprite.body.allowGravity = true;
	sprite.body.reset();
	holdThatTuna = 0;
	isDrag = false;
	//sprite.hitArea = new Phaser.Circle(0,sprite.height/2,sprite.height*4);
}

var holdThatTuna = 0;
function onDragUpdate(sprite, pointer) {

	
}

var isDrag = false;
var holdThatTuna =0;
