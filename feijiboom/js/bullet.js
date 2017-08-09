
function bullet(){
	
	//ele:属性
	this.ele=document.createElement("div")
	this.id=Math.random()*1000000+""
	//init：方法
	this.init=function(){
		gameEngine.ele.appendChild(this.ele)
		gameEngine.allbullet[this.id]=this

		
		if(/^[1-2]$/.test(gameEngine.Firelevel)){
           this.ele.className="bullet"
		this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/3-this.ele.offsetWidth/2+pageXOffset+"px";
		
		}
		else if(/^[3-4]$/.test(gameEngine.Firelevel)){
			this.ele.className="nb"
this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2+pageXOffset+"px";
		}
		else if(/^[5-6]$/.test(gameEngine.Firelevel)){
			this.ele.className="nb"
this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/3-this.ele.offsetWidth/2+pageXOffset+"px";
		}
		else if(/^[7-8]$/.test(gameEngine.Firelevel)){
			this.ele.className="nb2"
this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/3-this.ele.offsetWidth/2+pageXOffset+"px";
		}
		else if(gameEngine.Firelevel>=9){
           this.ele.className="nb3"
this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2+pageXOffset+"px";
		}else{
			this.ele.className="bullet"
			this.ele.style.left=myPlane.ele.offsetLeft+myPlane.ele.offsetWidth/2-this.ele.offsetWidth/2+pageXOffset+"px";
		}

		
		
		this.ele.style.top=myPlane.ele.offsetTop-this.ele.offsetHeight+"px";
		return this;
	}
	
	//move:方法
	this.move=function(){
	  var that=this
	  var speedx = 0;
	  var ss= that.ele.offsetLeft+10+gameEngine.Firelevel*3
		this.timer=setInterval(function(){
		var y=that.ele.offsetTop-5-gameEngine.Firelevel
		var currentx = parseInt(that.ele.offsetLeft);
		speedx += (ss-currentx)/(10-gameEngine.Firelevel);
		if(y<-18){
			gameEngine.ele.removeChild(that.ele)
			clearInterval( that.timer)
			 
			//删除
			delete gameEngine.allbullet[that.id]
		}else{
			that.ele.style.left = currentx + speedx + "px";
			that.ele.style.top=y+"px"
		}
		
		},50-gameEngine.Firelevel)	
	}
	
	
	
	//方法  boom  
	this.boom=function(){
		this.ele.className="bullet-die"
		clearInterval(this.timer)
		var i=0;
		var that=this
		var imgs=["images2/die1.png","images2/die2.png"]
	  var dietimer=setInterval(function(){
	  	if(i>=1){
	  		clearInterval(dietimer)
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
