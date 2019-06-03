var canvas = document.querySelector('canvas');
canvas.height  = (window.innerHeight)/3;
canvas.width = (window.innerWidth)/3;


var context = canvas.getContext("2d");

context.fillStyle="blue";
var totalLines=[];
var dict={};
var arrr=[];

context.beginPath();
function point(p,q){
    context.fillRect(p,q,3,3);
}
//This is for plotting points.
for(var j=40;j<=250;j+=30){
    for(var i=40;i<=250;i+=30){
        point(i,j);
    }
}
//context.fillStyle="orange";
//context.fillText("2",55,55);
//context.fillRect(70,70,-30,-30);
//this function will store all initial array without lines.
function storeData(){
    for(var j=40;j<=250;j+=30){
        for(var i=40;i<=250;i+=30){
            arrr=[[j,i],[j+30,i]];
            dict[arrr]=0;
            totalLines.push(dict);
            arr=[[j+30,i],[j,i]];
            dict[arrr]=0;
            totalLines.push(dict);
        }
    }
    console.log(totalLines[0]);
}
storeData();
//This function will draw line and swap player turns.
 function drawLine(arr,brr){
    context.moveTo(arr[0],arr[1]);
    context.lineTo(brr[0],brr[1]);
    // if(Math.abs(arr[0]-brr[0])===30 || Math.abs(arr[1]-brr[1])===30){
    var bg = [ [arr[0],arr[1]],[brr[0],brr[1]] ];
    totalLines[0][bg]=1;
    context.stroke();
    bg = [ [brr[0],brr[1]],[arr[0],arr[1]] ];
    totalLines[0][bg]=1;
    console.log(totalLines[0]);
    if(isLine(arr,brr)===1)
    {
        console.log("isline equals to 1")
        if(turnFlag%2===0){
            isBox();
            if(!isBoxFlag){
            console.log(" player 1isBoxFlag :"+isBoxFlag);
            document.getElementById("turn2").innerHTML="Your turn";
            document.getElementById("turn1").innerHTML="wait for your turn";
            }
        }
        else{
            isBox();
            if(!isBoxFlag){
            console.log("player 2isBoxFlag :"+isBoxFlag);
            document.getElementById("turn1").innerHTML = "Your turn";
            document.getElementById("turn2").innerHTML = "Wait for your turn";
            }
        }
        turnFlag+=1;
    }
    //}
    else{
        document.getElementById("sc").innerHTML="Draw at points";
        arr[0]=brr[0]=arr[1]=brr[1]=0;
    }
 }
$("#canvas").click(function(e){
    getPosition(e);
});
var arr = new Array(2);
var brr = new Array(2);
var flag=-1,i=0;
var altstr="";
var turnFlag=2;
//This function will takes coordinate and rounds it.
function roundCoord(xcor){
    var pg = xcor%10;
    if(pg<5)
        xcor=xcor-pg;
    else 
        xcor = xcor+(10-pg);
    console.log("xcor:"+xcor);
    return xcor;
}
 function getPosition(event){
     if(flag<0){
      arr[0] = roundCoord(event.clientX);
      arr[1] = roundCoord(event.clientY);
      i++;
      console.log(i);
      console.log(arr[0],arr[1]);
    }
      else{
          brr[0] = roundCoord(event.clientX);
          brr[1] = roundCoord(event.clientY);
          i++;
          console.log(i);
          console.log(brr[0],brr[1]);
      }
      flag=flag*(-1);
      //this function will call after 2 calls of getposition function.
      if(i!=0 && i%2===0){
        console.log("drawing line");
        if((Math.abs(arr[0]-brr[0])===30&&Math.abs(arr[1]-brr[1])===0)||(Math.abs(arr[0]-brr[0])===0&&Math.abs(arr[1]-brr[1])===30)){
        drawLine(arr,brr);
        isBox(arr,brr);
        document.getElementById("sc").innerHTML="msg";
        }
        else{
            document.getElementById("sc").innerHTML="Draw at given points";
        }
   }
 }
 
 var cnt1=0,cnt2=0;
 var isBoxFlag=false;
//document.getElementById("sc").innerHTML=st;
function isBox(){
    var st="";
    isBoxFlag=false;
    for(var j=40;j<=250;j++){
        for(var i=40;i<=250;i++){
            var cond1 = totalLines[0][[ [i,j],[i+30,j]]]&&totalLines[0][[ [i+30,j],[i+30,j+30]]]&&totalLines[0][[ [i+30,j+30],[i,j+30]]]&&totalLines[0][[ [i,j+30],[i,j]]];
            //totalLines[0][[ [i,j],[i+30,j]]]=totalLines[0][[ [i+30,j],[i+30,j+30]]]=totalLines[0][[ [i+30,j+30],[i,j+30]]]=totalLines[0][[ [i,j+30],[i,j]]]=0;
            if(cond1){
                totalLines[0][[ [i,j],[i+30,j]]]=totalLines[0][[ [i+30,j],[i+30,j+30]]]=totalLines[0][[ [i+30,j+30],[i,j+30]]]=totalLines[0][[ [i,j+30],[i,j]]]=0;
                if(document.getElementById("turn1").innerHTML==="Your turn"){
                    cnt1+=1;
                    context.fillStyle="green";
                    context.fillRect(i+30,j+30,-30,-30);
                    isBoxFlag=true;
                    //st+="player got :"+cnt;
                    //document.getElementById("sc").innerHTML=st;
                    console.log("score got : "+cnt1);
                }
                else{
                    cnt2+=1;
                    context.fillStyle="red";
                    context.fillRect(i+30,j+30,-30,-30);
                    isBoxFlag=true;
                }

            }
        }
    }
    //st+="player got :"+cnt;
    //document.getElementById("sc").innerHTML=st;
     if(document.getElementById("turn1").innerHTML==="Your turn"){
         document.getElementById("score1").innerHTML="score: "+cnt1;
     }
    else{
         document.getElementById("score2").innerHTML="score: "+cnt2;
     }
     if(cnt1+cnt2===30){
         if(cnt1>cnt2){
             altstr="Game Over!! Player 1 win";
             window.alert(altstr);
         }
         else if(cnt1<cnt2){
             altstr ="Game Over!! Player 2 win";
             window.alert(altstr);

         }
         else if(cnt1===cnt2){
             altstr = "Well Play.Your Game Tie";
             window.alert(altstr);
         }
         
     }
    
}
//isBox();
function isLine(arr,brr){
    var bg = [ [arr[0],arr[1]],[brr[0],brr[1]] ];
    if(totalLines[0][bg]===1){
        return 1;
    }
    else
        return 0;
    
}