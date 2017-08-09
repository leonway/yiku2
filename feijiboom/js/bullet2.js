function bullet2(xix){
	//ele:属性
	this.ele=document.createElement("div")
	this.id=Math.random()*1000000+""
	
	//方法init
	this.init = function(){
		//添加
		gameEngine.allbullet2[this.id] = this;
	    gameEngine.ele.appendChild(this.ele);
		this.ele.className = "e_bullet";
		this.ele.style.left = gameEngine.allenemy[xix].ele.offsetLeft + gameEngine.allenemy[xix].ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.ele.style.top = gameEngine.allenemy[xix].ele.offsetTop+ gameEngine.allenemy[xix].ele.offsetHeight+"px";
		return this;
	}
	
	////方法move
	this.move= function(){
		var that = this; 
		this.timer = setInterval(function(){
			var y = that.ele.offsetTop + 10+gameEngine.level;
			if (y >(gameEngine.ele.offsetHeight+16)) {
				
				gameEngine.ele.removeChild(that.ele); //移除子弹
				clearInterval(that.timer); //停止移动
				//删除
				delete gameEngine.allbullet2[that.id];
			}
			else {
				that.ele.style.top = y + "px"; //移动
			}
		}, 30);
	}
	
	//方法  boom  
	this.boom=function(){
		this.ele.className="bullet-die"
		clearInterval(this.timer)
		var i=0;
		var that=this
		var imgs=["images2/die1.png","images2/die2.png"]
	   this.dietimer=setInterval(function(){
	  	if(i>=1){
	  		clearInterval(this.dietimer)
	  		gameEngine.ele.removeChild(that.ele)
	  	}else
	  	that.ele.style.background="url("+imgs[++i]+") no-repeat"
	  },100)
	}
	
	//stop
	this.Stop=function(){
		clearInterval(this.timer)
		}
	
	
	
	
	
	
	
	
}