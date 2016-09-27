window.onload=function(){

	//开始层
	var oStart=document.getElementById('start'); 
	//开始按钮
	var oP1=document.getElementById('p1');
	//庄家牌
	var oRobotContainer=document.getElementById('robotContainer');
	var aChild_con=document.getElementsByClassName('child_con');
	//庄家每一张牌容器
	var oRobotOne=document.getElementById('robotOne');
	var oRobotTwo=document.getElementById('robotTwo');
	var oRobotThree=document.getElementById('robotThree');
	var oRobotFour=document.getElementById('robotFour');
	var oRobotFive=document.getElementById('robotFive');
	//玩家牌
	var oYouContainer=document.getElementById('youContainer');
	//玩家每一张牌容器
	var oYouOne=document.getElementById('youOne');
	var oYouTwo=document.getElementById('youTwo');
	var oYouThree=document.getElementById('youThree');
	var oYouFour=document.getElementById('youFour');
	var oYouFive=document.getElementById('youFive');
	//下注层
	var oBtn=document.getElementById('btn');
	//下注按钮
	var oBottomPour=document.getElementById('bottomPour');
	//洗牌按钮
	var oShuffle=document.getElementById('shuffle');
	//保险按钮
	var oInsurance=document.getElementById('insurance');
	//是否买保险
	var oAlert=document.getElementById('Alert');
	//确定买保险
	var oSub=document.getElementById('sub');
	//取消买保险
	var oRes=document.getElementById('res');
	//停牌按钮
	var oStop=document.getElementById('stop');
	//筹码按钮
	var oChip=document.getElementById('chip');
	//筹码值为100按钮
	var oC100=document.getElementById('C100');
	//筹码值为300按钮
	var oC300=document.getElementById('C300');
	//筹码值为800按钮
	var oC800=document.getElementById('C800');
	//筹码值为1000按钮
	var oC1000=document.getElementById('C1000');
	//选中的倍数按钮
	var oShow=document.getElementById('show').getElementsByTagName('span')[0];
	//加牌按钮
	var oAdd=document.getElementById('add');
	//庄家总分
	var oRobotSum=document.getElementById('robotSum');
	//玩家总分
	var oYouSum=document.getElementById('youSum');
	//重玩按钮
	var oRestart=document.getElementById('restart');
	//钱数
	var oMoney=document.getElementById('money').getElementsByTagName('span')[0];
	
	//开始游戏
	oP1.onclick=function(){
		cssStyle(oBtn,'display','block');
		cssStyle(oStart,'display','none');
	};
	//游戏开始，点击下注
	oBottomPour.onclick=function(){
		//显示筹码栏
		var val01=cssStyle(oChip,'display');
		if(val01=='none')
		{
			cssStyle(oChip,'display','block');
		}else{
			cssStyle(oChip,'display','none');
		}
		choise(1);
		document.getElementById('shuffle').disabled=false;
		oBottomPour.innerHTML='下注';
	};

	//显示选择倍数的和
	//筹码为100
	oC100.onclick=function(){
		oBottomPour.innerHTML='sure?';
		oShow.innerHTML=Number(oShow.innerHTML)+Number(oC100.value);
	};
	//筹码为300
	oC300.onclick=function(){
		oBottomPour.innerHTML='sure?';
		oShow.innerHTML=Number(oShow.innerHTML)+Number(oC300.value);
	}
	//筹码为800
	oC800.onclick=function(){
		oBottomPour.innerHTML='sure?';
		oShow.innerHTML=Number(oShow.innerHTML)+Number(oC800.value);
	};
	//筹码为1000
	oC1000.onclick=function(){
		oBottomPour.innerHTML='sure?';
		oShow.innerHTML=Number(oShow.innerHTML)+Number(oC1000.value);
	}

	//用数组存取每个牌
	var arr=Array(52);
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=i;
	}
	//存庄家产生的随机数
	var arr01=Array();
	//存玩家产生的随机数
	var arr02=Array(); 
	//存放ran_num()产生的随机数
	var j=ran_num();
	var k=ran_num();
	//存比牌后庄家第一张牌
	var show01=0;

	//洗牌的同时发两张牌，一张明牌，一张暗牌
	oShuffle.onclick=function(){
		cssStyle(oChip,'display','none');
		document.getElementById('bottomPour').disabled=true;
		choise(); //调用choise函数,设置筹码
		//一张暗牌
		aChild_con[0].style.backgroundImage="url('images/tengxun01.jpg')";	
	 	aChild_con[5].style.backgroundImage="url('images/img"+arr[k+1]+".jpg')";
		arr01.push(arr[j]);
		arr02.push(arr[k]);
		//为每张牌对应相应的数字
		if(j>=36)
		{
			//10,j,Q,k,为10 
			//aChild_con[0].innerHTML=10;
			arr01[0]=10;
		}
		else{
			//aChild_con[0].innerHTML=Math.floor(j/4)+1;
			arr01[0]=Math.floor(j/4)+1;	
		}
		show01=j+1;

		if(k>=36)
		{
			arr02[0]=10;
		}
		else{
			arr02[0]=Math.floor(k/4)+1;
		}
		oYouSum.innerHTML=Number(arr02[0]);
		A(oYouSum,k);
		//A(oRobotSum,j);
	 	//一张明牌
	 	j=ran_num();
	 	k=ran_num();
	 	aChild_con[1].style.backgroundImage="url('images/img"+arr[j+1]+".jpg')";
		aChild_con[6].style.backgroundImage="url('images/img"+arr[k+1]+".jpg')";
		arr01.push(arr[j]);
		arr02.push(arr[k]);
		if(j>=36)
		{
			arr01[1]=10;
		}else{
			arr01[1]=Math.floor(j/4)+1;
		}
		if(k>=36)
		{
			arr02[1]=10;
		}else{
			arr02[1]=Math.floor(k/4)+1;
		}

		oYouSum.innerHTML=Number(oYouSum.innerHTML)+Number(arr02[1]);
		A(oYouSum,k);
		document.getElementById('shuffle').disabled=true;
		if(arr01[1]==1)
		{ 
			//设置保险按钮可用
			document.getElementById('insurance').disabled=false;
			//保险
			oInsurance.onclick=function(){
				cssStyle(oAlert,'display','block');
				document.getElementById('add').disabled=false;
				document.getElementById('stop').disabled=false;
				//取消买保险按钮
				oRes.onclick=function(){
					cssStyle(oAlert,'display','none');
					//加牌
					oAdd.onclick=function(){	
						add();
					};
				};
				//确定买保险按钮
				oSub.onclick=function(){
					oMoney.innerHTML=Number(oMoney.innerHTML)-Number(oShow.innerHTML)/2;
					cssStyle(oAlert,'display','none');
					//加牌
					oAdd.onclick=function(){
						add();
						oAdd.onclick=function(){	
							add();
						};
					};
				};
			};
		}
		else{
			document.getElementById('add').disabled=false;
			document.getElementById('stop').disabled=false;
			oAdd.onclick=function(){
				add();
			};
		}
		oStop.onclick=function(){
			oRestart.innerHTML='再玩一局';
			aChild_con[0].style.backgroundImage="url('images/img"+arr[show01]+".jpg')";
			var val04=Number(arr01[0])+Number(arr01[1]);
			oRobotSum.innerHTML=val04;
			zhuangjia();
		};
	};
	//玩家点完停牌按钮
	oStop.onclick=function(){
		oRestart.innerHTML='再玩一局';
		zhuangjia();
		//设置加牌按钮禁用
		document.getElementById("add").disabled=true;
		//设置比牌按钮可用
		document.getElementById("compare").disabled=false;
		document.getElementById("stop").disabled=true;
	};

	//重玩
	oRestart.onclick=function(){
		restart();
		document.getElementById('bottomPour').disabled=false;
		index=7;
		flag=2;
	};  

	//按F5键，刷新页面，之前设置的内容全重置
	document.onkeydown=function(ev){
		var oEvent=ev||event;
		//alert("确定刷新?刷新之后信息将不会保存？")
		if(oEvent.keyCode==116)
		{
			//重新加载页面
			location.reload(true) ;
			return false;
		}
	};

	//加牌函数
	var index=7;
	function add(){
		//显示玩家发的牌
		k=ran_num();
		aChild_con[index].style.backgroundImage="url('images/img"+arr[k+1]+".jpg')";
		if(k>=36)
			{ 
				arr02[index-5]=10;
			}else{
				arr02[index-5]=Math.floor(k/4)+1;
			}
		oYouSum.innerHTML=Number(oYouSum.innerHTML)+Number(arr02[index-5]);
		A(oYouSum,k);
		index++;
		cssStyle(oChip,'display','none');
		//判断当点数大于21
		if(oYouSum.innerHTML>21)
		{
			alert("你爆牌啦!你输啦！");
			cssStyle(oAdd,'display','none');
			cssStyle(oBottomPour,'display','none');
			cssStyle(oChip,'display','none');
			cssStyle(oShuffle,'display','none');
			cssStyle(oInsurance,'display','none');
			cssStyle(oStop,'display','none');
			aChild_con[0].style.backgroundImage="url('images/img"+arr[show01]+".jpg')";
			oRobotSum.innerHTML=Number(arr01[0])+Number(arr01[1]);
			oRestart.innerHTML='再玩一局';
		}
		document.getElementById('stop').disabled=false;
		document.getElementById('insurance').disabled=true;
	}

	//money函数	
	function choise(ch){
		if(ch==1)
		{
			var val03=oShow.innerHTML-oMoney.innerHTML;
			if(val03>0)
			{
				alert("你的余额不足，请选择合适的金额！");
				oShow.innerHTML=0;
			}else{
				oMoney.innerHTML=Number(oMoney.innerHTML)-Number(oShow.innerHTML);
			}
		}
		else{
			//未选择筹码时,默认为筹码最小100
			if(oShow.innerHTML==0)
			{
				oShow.innerHTML=100;
				oMoney.innerHTML=Number(oMoney.innerHTML)-Number(oShow.innerHTML);
			}
		}
	}

	//存在A时
	function A(obj,i){
		for(var m=0;m<arr02.length;m++)
		{
			if(arr[i]<=3)
			{
				if(Number(obj.innerHTML)+10<=21)
				{
					obj.innerHTML=Number(obj.innerHTML)+10;
				}
			}	
		}
		
	}

	//比牌函数
	function compare(){
		var val02=oRobotSum.innerHTML-oYouSum.innerHTML;
		if(val02>0)
		{
			alert("很抱歉!庄家赢了！");
			//oMoney.innerHTML=Number(oMoney.innerHTML)-Number(oShow.innerHTML);
		}else if(val02<0){
			alert("恭喜你！你赢了！");
			oMoney.innerHTML=Number(oMoney.innerHTML)+2*Number(oShow.innerHTML);
		}else{
			alert("平手！")
			oMoney.innerHTML=Number(oMoney.innerHTML)+Number(oShow.innerHTML);
		}
		cssStyle(oAdd,'display','none');
		cssStyle(oBottomPour,'display','none');
		cssStyle(oChip,'display','none');
		cssStyle(oShuffle,'display','none');
		cssStyle(oInsurance,'display','none');
		cssStyle(oStop,'display','none');
		cssStyle(oCompare,'display','none');
		document.getElementById("compare").disabled=true;
		aChild_con[0].style.backgroundImage="url('images/img"+arr[show01]+".jpg')";
	}

	//重玩函数
	function restart(){
		cssStyle(oStart,'display','block');
		cssStyle(oBtn,'display','none');
		for(var i=0;i<aChild_con.length;i++)
		{
			aChild_con[i].style.backgroundImage="";
			aChild_con[i].innerHTML=null;
		}
		oRobotSum.innerHTML=0;
		oYouSum.innerHTML=0;
		oShow.innerHTML=0;
		cssStyle(oChip,'display','none');
		oP1.onclick=function(){
			cssStyle(oStart,'display','none');
			cssStyle(oBottomPour,'display','inline-block');
			cssStyle(oShuffle,'display','inline-block');
			cssStyle(oStop,'display','inline-block');
			cssStyle(oInsurance,'display','inline-block');
			cssStyle(oAdd,'display','inline-block');
			cssStyle(oBtn,'display','block');
			document.getElementById('add').disabled=true;
			document.getElementById('stop').disabled=true;
			oRestart.innerHTML='重玩';
		};
	}

	//庄家牌自动加牌函数
	var flag=2;
	function zhuangjia(){
		//显示庄家发的牌
		while(oRobotSum.innerHTML<=16)
		{
			j=ran_num();
	 		aChild_con[flag].style.backgroundImage="url('images/img"+arr[j+1]+".jpg')";
	 		arr01.push(arr[j]);
	 		if(j>=36)
			{
				arr01[flag]=10;
			}else{
				arr01[flag]=Math.floor(j/4)+1;
			}
			if(flag==2)
			{
				oRobotSum.innerHTML=Number(arr01[0])+Number(arr01[1])+Number(arr01[2]);
			}else if(flag==3){
				oRobotSum.innerHTML=Number(arr01[0])+Number(arr01[1])+Number(arr01[2])+Number(arr01[3]);
			}else{
				oRobotSum.innerHTML=Number(arr01[0])+Number(arr01[1])+Number(arr01[2])+Number(arr01[3])+Number(arr01[4]);
			}
	 		
			flag++;
		}
		
		//判断当点数大于21
		if(oRobotSum.innerHTML>21)
		{
			alert("庄家爆牌啦!你赢啦！");
			oAdd.disabled='true';
			cssStyle(oAdd,'display','none');
			cssStyle(oBottomPour,'display','none');
			cssStyle(oChip,'display','none');
			cssStyle(oShuffle,'display','none');
			cssStyle(oInsurance,'display','none');
			cssStyle(oStop,'display','none');
			oMoney.innerHTML=Number(oMoney.innerHTML)+2*Number(oShow.innerHTML);
			aChild_con[0].style.backgroundImage="url('images/img"+arr[show01]+".jpg')";
		}else{
			compare();
		}
	}

	//产生不重复的随机数
	function ran_num(){
		var ran_num=parseInt(51*Math.random());
		while(arr[ran_num]==-1)
		{
			ran_num=parseInt(51*Math.random());
		}
		
		return ran_num;
		arr[ran_num]=-1;
	}
	
	//样式的获取和设置函数
	function cssStyle(obj,prop,value)
	{
		//样式的获取
		if(arguments.length==2)
		{
			if(obj.currentStyle)
			{
				return obj.currentStyle[prop];//IE
			}
			else
			{
				return getComputedStyle(obj,false)[prop];//高版本浏览器	
			}
		}
		//样式的设置
		else
		{
			if(arguments.length==3)
			{
				obj.style[prop]=value;	
			}	
		}
	}

};