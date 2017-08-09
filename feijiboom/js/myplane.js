

//我的飞机
var myPlane={
	//属性ele：
	ele:null,
	fireinterval:400,
	dieImgs:["images2/me_die1.png","images2/me_die2.png","images2/me_die3.png","images2/me_die4.png"],
	//方法init
	init:function(){
		this.ele=document.createElement("div")
		gameEngine.ele.appendChild(this.ele)
		this.ele.className="myplane"
		this.ele.style.left=(gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px";
		this.ele.style.top=gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px";
		return this;
	},
	//方法move
	move:function(){
			var that=this
			this.ele.onmousedown=function(e){
				e=e||event
				if(e.stopPropagation){
					e.stopPropagation();
					}
				else{
					e.cancelBubble = true
				};
				if (e.preventDefault) {
					e.preventDefault(); //非IE
					}
				else {
					e.returnValue = false; // IE
					}
				var dix=e.pageX-gameEngine.ele.offsetLeft-myPlane.ele.offsetLeft;
				var diy=e.pageY-myPlane.ele.offsetTop;
				document.onmousemove=function(e){
					e=e||event
				var x=e.pageX-gameEngine.ele.offsetLeft-dix
				if(x<0)x=0
				else if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
					x=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth
				}
					that.ele.style.left=x+"px";
					that.ele.style.top=e.pageY-gameEngine.ele.offsetTop-diy+"px";
			}
				document.onmouseup=function(){
			   document.onmousemove=null;
			   document.onmouseup=null;
			}
		} 
	},
	
	//方法fire
	fire:function(){
		var timer=setInterval(function(){
			if(/^[1-2]$/.test(gameEngine.Firelevel)||/^[5-8]$/.test(gameEngine.Firelevel)){
				 new bullet().init().move();
				  new bullet3().init().move();
			}
			else
		 new bullet().init().move();
		},this.fireInterval-gameEngine.Firelevel*200)
	},
	
	//方法boom
		boom:function(){
		this.ele.onmousedown=null;
		document.onmousemove=null;
		document.onmouseup=null;
		var u=0; 
		var that=this;
		for(var p in gameEngine.allbullet2){
			 gameEngine.allbullet2[p].Stop()
		}
		for(var i in gameEngine.allbullet){
             gameEngine.allbullet[i].Stop()
		}
	    for(var j in gameEngine.allenemy){
	      gameEngine.allenemy[j].Stop()
	    }
	    
		this.dietimer=setInterval(function(){
			if(u>=3){
				clearInterval(that.dietimer)
				gameEngine.ele.removeChild(that.ele)
				
			setTimeout(function(){
			var myName = prompt("您的总分数是:"+ gameEngine.totalScore +", 请输入您的大名");
			if(myName){
				ajax({
				type:"post",
				url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
				data:{name:myName,score:gameEngine.totalScore},
				success:function(data){
					console.log(data)
						//进入排行榜
						location.href = "rank.html";
				},
				error:function(){
					console.log("error");
				}
			})
			}
			else{
				//点击了取消
						location.reload();
			}
			
			},1000)
			}else
			that.ele.style.background="url("+that.dieImgs[++u]+") no-repeat"
		},150)
	}
	
}

