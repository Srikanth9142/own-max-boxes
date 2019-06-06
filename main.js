var canvas = document.querySelector('canvas');
canvas.height  = (window.innerHeight)/3;
canvas.width = (window.innerWidth)/3;


var context = canvas.getContext("2d");

context.fillStyle="blue";
var totalLines=[];
var dict={};
var arrr=[];

var possiClicks=[];//This two lines will makes array with all possible user clicks.
for(var k=40;k<=250;k+=30){
    possiClicks.push(k);
}

context.beginPath();
function point(p,q){
    context.fillRect(p,q,3.5,3.5);
}
//This is for plotting points.
for(var j=40;j<=250;j+=30){
    for(var i=40;i<=250;i+=30){
        point(i,j);
    }
}

context.fillStyle="green";
context.fillRect(280,40,30,30);
context.fillStyle="black";
context.fillText("Player1",320,60);
context.fillStyle="red";
context.fillRect(280,100,30,30);
context.fillStyle="black";
context.fillText("Player2",320,120);
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
    //console.log(totalLines[0]);
}
storeData();

img = document.createElement("img");

//This function will draw line and swap player turns.
function drawLine(arr,brr){
    context.moveTo(arr[0],arr[1]);
    context.lineTo(brr[0],brr[1]);
    var bg = [ [arr[0],arr[1]],[brr[0],brr[1]] ];
    totalLines[0][bg]=1;
    context.stroke();
    bg = [ [brr[0],brr[1]],[arr[0],arr[1]] ];
    totalLines[0][bg]=1;
    if(isLine(arr,brr)===1)
    {
         isBox(); //this will sets the flag whether a box made or not
         console.log(isBoxFlag);
        if(turnFlag%2===0){ //player1
            if(isBoxFlag){ //if player1 made a box donot change turn give a bonus turn and donot increment flag
                document.getElementById("turn1").innerHTML="Bonus!! Your turn";
                document.getElementById("turn2").innerHTML="Wait for your turn";
                var sx  = document.getElementById("turnSound");
                //document.getElementById("smile").src = "images/happy-emoji.gif";
                
                sx.play();
                addHappy();
                //addSad(2)
                console.log("isboxflag paly1 exed");
                turnFlag-=1;
            }
            else{ //turns swap condition
            document.getElementById("turn1").innerHTML="wait for your turn";
            document.getElementById("turn2").innerHTML="Your turn";
            addPlaying();
              //
            }
        }
        else{ //player2
            if(isBoxFlag){ //if player2 made a box donot change turn give a bonus turn and donot increment flag
                console.log("isboxflag paly2 exec");
                document.getElementById("turn2").innerHTML="Bonus!! Your turn"
                document.getElementById("turn1").innerHTML="Wait for your turn";
                var sx  = document.getElementById("turnSound");
                //document.getElementById("smile").src = "images/happy-emoji.gif";
                sx.play();
                addHappy();
                //addSad(1);
                turnFlag-=1;
            }
            else{ //turns swap condition
            document.getElementById("turn1").innerHTML = "Your turn";
            document.getElementById("turn2").innerHTML = "Wait for your turn";
            addPlaying();}
        }
        turnFlag+=1; //flag increment
    }
    else{ //wrong positions selected
        document.getElementById("sc").innerHTML="Draw at points";
        var scObj = document.getElementById("sc");
        addDoubt();
        var sy  = document.getElementById("wrongSound");
        sy.play();
        //scObj.style.color='red';
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
var turnFlag=0;
//This function will takes coordinate and rounds it.
function roundCoord(xcor){
    var pg = xcor%10;
    if(pg<5)
        xcor=xcor-pg;
    else 
        xcor = xcor+(10-pg);
    return xcor;
}
 function getPosition(event){
     if(flag<0){
      if(clickCheck(roundCoord(event.clientX)))
          arr[0]=roundCoord(event.clientX);
       if(clickCheck(roundCoord(event.clientY)))
            arr[1]=roundCoord(event.clientY);
      i++;
    }//to draw aline x1,y1,x2,y2 needed those store in arr and brr arrays
      else{
          if(clickCheck(roundCoord(event.clientX)))
            brr[0]=roundCoord(event.clientX);
          if(clickCheck(roundCoord(event.clientY)))
            brr[1]=roundCoord(event.clientY);
          i++;
      }
      flag=flag*(-1);
      //this function will call after 2 calls of getposition function.
      if(i!=0 && i%2===0){
        if((Math.abs(arr[0]-brr[0])===30&&Math.abs(arr[1]-brr[1])===0)||(Math.abs(arr[0]-brr[0])===0&&Math.abs(arr[1]-brr[1])===30)){
        drawLine(arr,brr);
        isBox();
        document.getElementById("sc").innerHTML="Keep Playing!!";
        }
        else{
            document.getElementById("sc").innerHTML="Draw at given points";
            addDoubt();
            var sy  = document.getElementById("wrongSound");
            sy.play();
        }
   }
 }
 
 var cnt1=0,cnt2=0;
 var isBoxFlag;


function isBox(){
    var st="";
    isBoxFlag=false;
    for(var j=40;j<=250;j++){
        for(var i=40;i<=250;i++){
            var cond1 = totalLines[0][[ [i,j],[i+30,j]]]&&totalLines[0][[ [i+30,j],[i+30,j+30]]]&&totalLines[0][[ [i+30,j+30],[i,j+30]]]&&totalLines[0][[ [i,j+30],[i,j]]];
            if(cond1){
                totalLines[0][[ [i,j],[i+30,j]]]=totalLines[0][[ [i+30,j],[i+30,j+30]]]=totalLines[0][[ [i+30,j+30],[i,j+30]]]=totalLines[0][[ [i,j+30],[i,j]]]=0;
                isBoxFlag=true;
                if(document.getElementById("turn1").innerHTML==="Your turn"||document.getElementById("turn1").innerHTML==="Bonus!! Your turn"){
                    cnt1+=1; //player1 score 
                    context.fillStyle="green";
                    context.fillRect(i+30,j+30,-30,-30); //player1 boxes colored 
                }
                else{
                    cnt2+=1; //player2 score
                    context.fillStyle="red";
                    context.fillRect(i+30,j+30,-30,-30); //player2 boxes colored.
                }

            }
        }
    }
     if(document.getElementById("turn1").innerHTML==="Your turn"){
         document.getElementById("score1").innerHTML="score: "+cnt1;
     }
    else{
         document.getElementById("score2").innerHTML="score: "+cnt2;
     }
     if(cnt1+cnt2===35){
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

//This function will check the user clicks whether valid or not
function clickCheck(x){
    if(possiClicks.includes(x,0)){
        return true;
    }
    else{
        return false;
    }
}

function addHappy(){
    
    img.src = "images/happy-emoji.gif";
    img.id = "smile1";
    img.setAttribute("height","100");
    img.setAttribute("width","100");
    document.getElementById("smile").appendChild(img);
   
}

function addPlaying(){
    img.src = "images/sunglasses_Emoji.png";
    img.id = "smile1";
    img.setAttribute("height","100");
    img.setAttribute("width","100");
    document.getElementById("smile").appendChild(img);
}

function addDoubt(){
    img.src = "images/doubt-emoji.png";
    img.id = "smile1";
    img.setAttribute("height","100");
    img.setAttribute("width","100");
    document.getElementById("smile").appendChild(img);
}