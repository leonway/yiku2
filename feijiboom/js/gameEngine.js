var gameEngine={
	
	//属性ele：游戏主界面；
	ele:null,
	gift:{},
	allbullet:{},
	allbullet2:{},
	allenemy:{},
	la:null,
	mi:null,
	sm:null,
	totalScore:0,
	runtimer:null,
	level:0,
	Firelevel:0,
	//方法init：初始化属性ele
	init:function(){
		gameEngine.ele=document.getElementById("main")
		return this
	},
	 
	//方法showscore
	showscore:function(){
	var that=this
		setInterval(function(){
			rank.innerHTML=that.totalScore
		},30)
	},
	//方法start：开始游戏
	start:function(){
	  console.log("sss")
	  //加载游戏：
	  this.loading(function(){
//	  	console.log("游戏加载完成")
	  	
	  	//开始计时
	  	gameEngine.runningtimer();
	  	
	  	//显示实时分数
	  	gameEngine.showscore();
	  	
	  	//
	  	myPlane.init().move();
	  	myPlane.fire();
	  	  
	  	  //创建敌机
     	gameEngine.createEnemy();
	  	
	  	//监听键盘
	  	gameEngine.listeningKeybord();
	  	
	  	//碰撞检测
	  	gameEngine.listeningCrash();
	  });
	},
	  
	//方法loading：加载游戏
	loading:function(callback){
		var logo=document.createElement("div")
		logo.className="logo"
		gameEngine.ele.appendChild(logo)
		var  load=document.createElement("div")
		load.className="load"	
		gameEngine.ele.appendChild(load)
		var  imgs=["images2/loading1.png","images2/loading2.png","images2/loading3.png"]
	      var i=0;
	    timer=setInterval(function(){
	      	if(i>=0){
	      		clearInterval(timer)
	      		gameEngine.ele.removeChild(load)
	      		gameEngine.ele.removeChild(logo)
	      		callback();
	      	}
	       	load.style.background="url("+imgs[(++i)%3]+") no-repeat"
	       },500)
	},
	
	//游戏开始计时：
	runningtimer:function(){
			var s=0,m=0,h=0,i=0;
			var	hour=document.getElementById("h");
			var	min=document.getElementById("m");
			var	sec=document.getElementById("s");
			var that=this
		  clearInterval(this.runtimer)
	  this.runtimer=setInterval(function(){			 					
	    		i++;
	    var h = parseInt(i/3600)%24; //时
		var m = parseInt(i/60)%60; //分
		var s = i%60; 
			that.level=parseInt(i/30) 
	    sec.innerHTML = s>10? s : "0" + s;
		min.innerHTML = m>10? m : "0" + m;
		hour.innerHTML = h>10? h : "0" + h;
		
	  },1000)
	},
	
	//游戏 终止计时
	 stopRunTimer:function(){
	  	var	hour=document.getElementById("h");
		var	min=document.getElementById("m");
		var	sec=document.getElementById("s");
			
		   clearInterval(this.runtimer)
		   this.runtimer=false;
		   sec.innerHTML = "00";
			min.innerHTML = "00";
			hour.innerHTML = "00";
		},
							
	//监听键盘：
	listeningKeybord:function(){
		var speedx=0;
		var speedy=0;
	     window.onkeydown=function(e){
	   	    e=e||event
	   	if(e.keyCode==37){
	   		speedx=-10
	   	}else if(e.keyCode==38){
	   		speedy=-10
	   	}else if(e.keyCode==39){
	   		speedx=10
	   	}else if(e.keyCode==40){
	   		speedy=10
	   	}
	   }
	     window.onkeyup=function(){
	     speedx=0
	     speedy=0
	     }
	    setInterval(function(){
	    var x=myPlane.ele.offsetLeft+speedx
			if(x<0)x=0
			else if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
				x=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth
			}
			myPlane.ele.style.left=x+"px"
			myPlane.ele.style.top=myPlane.ele.offsetTop+speedy+"px"
	    },30)
	},
	
	//创建敌机
	createEnemy:function(){
		
		this.la=setInterval(function(){
			if(Math.random()>0.5){
			var enemy=new Enemy(Enemy.prototype.Enemy_type_large)
			enemy.init().moveAndFire();
			}
		},6000)
		this.mi=setInterval(function(){
			if(Math.random()>0.6){
				var enemy=new Enemy(Enemy.prototype.Enemy_type_middle)
				enemy.init().moveAndFire();
			} 
		},4000)
		this.sm=setInterval(function(){
			if(Math.random()>0.5){
				var enemy=new Enemy(Enemy.prototype.Enemy_type_small)
				enemy.init().moveAndFire();
			}
		},1000)
		
		
	}, 
	
	//碰撞检测
	listeningCrash:function(){
		 var isCrashMyPlane = false; //表示是否碰撞到我的飞机
		setInterval(function(){
	    	for(var j in gameEngine.allenemy){
	    		for(var i in gameEngine.allbullet){
	    			if(isCrash(gameEngine.allbullet[i].ele,gameEngine.allenemy[j].ele)){
	    			gameEngine.allbullet[i].boom();
	    			delete	gameEngine.allbullet[i] 
					gameEngine.allenemy[j].hurt();
	    			}
	    		
//	    		飞机和飞机相撞
	    		if(!isCrashMyPlane&&isCrash(myPlane.ele,gameEngine.allenemy[j].ele)){
					isCrashMyPlane = true;
	    			myPlane.boom();
	    			gameEngine.stopRunTimer();
	    			gameEngine.allenemy[j].boom();
	    			clearInterval(gameEngine.la);
					clearInterval(gameEngine.mi);
					clearInterval(gameEngine.sm);
	    		}
	    		} 
	    	}  
	    	for(var p in gameEngine.allbullet2){
	    		//敌机子弹和我机相撞
	    	if(!isCrashMyPlane&&isCrash(myPlane.ele,gameEngine.allbullet2[p].ele)){
	    		isCrashMyPlane = true;
	    		myPlane.boom();
	    		gameEngine.stopRunTimer();
	    		gameEngine.allbullet2[p].boom();
	    		delete	gameEngine.allbullet2[p];
	    		clearInterval(gameEngine.la);
				clearInterval(gameEngine.mi);
				clearInterval(gameEngine.sm);
	    	}
	    	}
	    	for(var q in gameEngine.gift){
	    	
	    	if(!isCrashMyPlane&&isCrash(myPlane.ele,gameEngine.gift[q].ele)){
	    	
	    	    gameEngine.Firelevel+=1
	    		gameEngine.gift[q].boom();
	    		delete	gameEngine.allbullet2[p];
	    	}
	    	}
        },30)
	}
}
