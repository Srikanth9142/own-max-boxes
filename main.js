var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.height = (window.innerHeight)/3;
canvas.width = (window.innerWidth)/3;

var mouseClicked = false,mouseReleased=true;

document.addEventListener('click',onmouseClick,false);
document.addEventListener('mousemove',onmouseReleased,false);


function onmouseClick(e){
    mouseClicked = !mouseClicked;
}
function point(p,q){
    context.fillRect(p,q,3,3);
}
//point(100,150);
// point(40,40);
// point(70,40);
// point(100,40);
// point(130,40);
// point(160,40);
// point(190,40);
// point(40,70);
// point(70,70);
// point(100,70);
// point(130,70);
// point(160,70);
// point(190,70);
for(var j=40;j<=250;j+=30){
    for(var i=40;i<=250;i+=30){
        point(i,j);
    }
}

function onmouseReleased(e){
    if(mouseClicked){
        context.beginPath();
        context.arc(e.clientX, e.clientY, 1.5, 0, Math.PI * 2, false);
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
var c1=0;
var c2=0;
function count1(){
    c1+=1;
    var st = "Score : "+c1;
    document.getElementById("score1").innerHTML=st;
}
function count2(){
    c2+=1;
    var st = "Score : "+c2;
    document.getElementById("score2").innerHTML=st;

}
function checkWinner(){
    if(c1===0 && c2===0){
        var st = "I can sense that you didn't made a box!! Play the game."
        document.getElementById("windet").innerHTML=st;
    }
    else if(c1>c2){
        // console.log("Player 1 wins");
        var st = "Player1 wins! Heartly congratulations";
        document.getElementById("windet").innerHTML = st;
    }
    else if(c2>c1){
        var st = "Player2 wins! Heartly congratulations";
        document.getElementById("windet").innerHTML = st;
    }
    else{
        document.getElementById("windet").innerHTML = "Don\n't fight You both Win the game!";
    }
}