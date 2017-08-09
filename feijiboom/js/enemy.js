

function Enemy(type){
	
	this.ele=document.createElement("div");
	this.hp=10;
	this.speed=4;
	this.id=Math.random()*1000000+""
	this.dieImgs=[];
	this.score=10;
	this.fireInterval=null;
	this.init=function(){
		gameEngine.ele.appendChild(this.ele);
		gameEngine.allenemy[this.id]=this
		switch(type){
			case this.Enemy_type_large:
			this.score=600;
			this.ele.className="enemy-large";
			this.hp=this.Enemy_hp_large;
			this.speed=this.Enemy_speed_large;
			this.dieImgs=["images2/plane3_die1.png","images2/plane3_die2.png","images2/plane3_die3.png","images2/plane3_die4.png","images2/plane3_die5.png","images2/plane3_die6.png"]
			this.fireInterval=500-gameEngine.level*100;
			break;
			
			case this.Enemy_type_middle:
			this.score=300;
			this.ele.className="enemy-middle";
			this.hp=this.Enemy_hp_middle;
			this.speed=this.Enemy_speed_middle;
			this.dieImgs=["images2/plane2_die1.png","images2/plane2_die2.png","images2/plane2_die3.png","images2/plane2_die4.png"]
			this.fireInterval=300-gameEngine.level*100;
			break;
			
			case this.Enemy_type_small:
			this.score=100;
			this.ele.className="enemy-small";
			this.hp=this.Enemy_hp_small;
			this.speed=this.Enemy_speed_small;
			this.dieImgs=["images2/plane1_die1.png","images2/plane1_die2.png","images2/plane1_die3.png"]
			this.fireInterval=500-gameEngine.level*100;
			break;
			
			default:
			this.score=100;
			this.ele.className="enemy-small";
			this.hp=this.Enemy_hp_small;
			this.dieImgs=["images2/plane1_die1.png","images2/plane1_die2.png","images2/plane1_die3.png"]
			this.speed=this.Enemy_speed_small;
			break;
			
		}
		this.ele.style.left=parseInt((Math.random()+0.0000000001)*(gameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px";
		this.ele.style.top=-this.ele.offsetHeight+"px";
		return this;
	};
	//方法：moveAndFire
	this.moveAndFire=function(){
		var  that=this
		 this.firetimer=setInterval(function(){
		   new bullet2(that.id).init().move();
		},this.fireInterval)
		 this.timer=setInterval(function(){
			var x=that.ele.offsetTop+that.speed
			if(x==document.documentElement.clientHeight){
				gameEngine.ele.removeChild(that.ele);
				clearInterval(that.firetimer);
			//删除
			delete gameEngine[that.id]
			}
			that.ele.style.top=x+"px";
			
		},30) 
	};
	
	//方法掉血
	this.hurt=function(){
		this.hp--
		if(this.hp==0){
			this.boom();
		gameEngine.totalScore+=this.score
		gameEngine.Firelevel=parseInt(gameEngine.totalScore/1000) 
		}
	};
	 
	//方法：爆炸
	this.boom=function(){
		var that=this
		var i=0
		clearInterval(this.firetimer)
		clearInterval(this.timer)
	var	dietimer=setInterval(function(){ 
		 if(i>=that.dieImgs.length-1){
		 	clearInterval(dietimer)
		 	if(that.speed==3){
		 		new gift(that.id).init().move()
		 	}
		 	gameEngine.ele.removeChild(that.ele)
		 	delete gameEngine.allenemy[that.id]
		 }else
		 that.ele.style.background="url("+that.dieImgs[++i]+") no-repeat"
		},150)
 };
	//stop
	this.Stop=function(){
		clearInterval(this.timer)
	};
}
 
Enemy.prototype={

   Enemy_type_large:1,
   Enemy_type_middle:2,
   Enemy_type_small:3,
   
   Enemy_speed_large:3,
   Enemy_speed_middle:5,
   Enemy_speed_small:8,
   
   Enemy_hp_large:8,
   Enemy_hp_middle:3,
   Enemy_hp_small:1
 }






