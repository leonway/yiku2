
function gift(xix){
	
	this.ele=document.createElement("div")
    this.id=Math.random()*1000000+""
    
    this.init=function(){
    	//添加
		gameEngine.gift[this.id] = this;
	    gameEngine.ele.appendChild(this.ele);
		this.ele.className = "gift";
		this.ele.style.left = gameEngine.allenemy[xix].ele.offsetLeft + gameEngine.allenemy[xix].ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.ele.style.top = gameEngine.allenemy[xix].ele.offsetTop+ gameEngine.allenemy[xix].ele.offsetHeight/2-this.ele.offsetHeight/2+"px";
		return this;
    }
	
	
	this.move=function(){
		var that=this
		 this.timer=setInterval(function(){
			var x=that.ele.offsetTop+3
			if(x==document.documentElement.clientHeight){
				gameEngine.ele.removeChild(that.ele);
				clearInterval(that.firetimer);
			//删除
			delete gameEngine.gift[that.id]
			}
			that.ele.style.top=x+"px";
			
		},30) 
	}
	
	this.boom=function(){
		var x=this.ele.offsetleft
		var y=this.ele.offsetTop
		gameEngine.ele.removeChild(this.ele);
		delete gameEngine.gift[this.id]
		var count = 30 + parseInt(Math.random()*31); //随机30~60 => 30 + 0~30
		for (var i=0; i<count; i++) {
			spark(x, y);	
		}
		
	}
	this.spark=function(x, y){
					//创建星火节点
					var that=this
					var sparkNode = document.createElement("div");
					gameEngine.ele.appendChild(sparkNode);
					sparkNode.className = "spark";
					sparkNode.style.left = x + "px";
					sparkNode.style.top = y + "px";
					sparkNode.style.backgroundColor = this.randomColor();
					
					//抛物线运动
					var xSpeed = parseInt(Math.random()*21) * (Math.random()>0.5 ? 1 : -1); //-20~20
					var ySpeed = parseInt(Math.random()*21) * (Math.random()>0.6 ? 1 : -1); //-20~20
					
					this.sparktimer = setInterval(function(){
						ySpeed++;
						sparkNode.style.left = sparkNode.offsetLeft + xSpeed + "px";
						sparkNode.style.top = sparkNode.offsetTop + ySpeed + "px";
						
						//如果超出界面
						if (sparkNode.offsetLeft < 0 
							|| sparkNode.offsetLeft > gameEngine.ele.offsetWidth
							|| sparkNode.offsetTop > gameEngine.ele.offsetHeight)
						{
							clearInterval(that.sparktimer); //关闭定时器
							gameEngine.ele.removeChild(sparkNode); //移除星火节点
						}
						
					}, 50);
					
					
				}
				
				//16进制的随机颜色
				//#ffffff
	this.randomColor=function(){
					var arr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
					var str = "#";
					for (var i=0; i<6; i++) {
						str += arr[ parseInt(Math.random()*16) ];
					}
					return str;
				}
	
	
	
}


