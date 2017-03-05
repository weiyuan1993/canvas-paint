var canvas = document.getElementById("canvas");

if(canvas.getContext){
  var ctx = canvas.getContext('2d');
  canvas.width = screen.width*0.9965;
  canvas.height = screen.height*0.7;
}else{
  alert("你的瀏覽器不支援Canvas");
}
var colors = ['red','blue','green', 'purple', 'yellow', 'orange', 'pink', 'black', 'white'];

function colorListener(i){
  document.getElementById(colors[i]).addEventListener('click',function(){
    ctx.strokeStyle = colors[i];
  });
}
//return 滑鼠在canvas畫布上的座標
function getMousePosition(canvas, event){
  var rect = canvas.getBoundingClientRect();
  return{x:event.clientX-rect.left,y:event.clientY-rect.top};
}
function getTouchPosition(canvas, event){
  var rect = canvas.getBoundingClientRect();
  return{x:event.touches[0].pageX-rect.left,y:event.touches[0].pageY-rect.top};
}

function mouseMove(event){
  var mousePosition = getMousePosition(canvas,event);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineTo(mousePosition.x,mousePosition.y);
  ctx.stroke();
  if(mousePosition.x>=canvas.width-1||mousePosition.x<=1||mousePosition.y>=canvas.height-1||mousePosition.y<=1){
    canvas.removeEventListener('mousemove',mouseMove);
  }
}
function touchMove(event){
  var touchPosition = getTouchPosition(canvas,event);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineTo(touchPosition.x,touchPosition.y);
  ctx.stroke();
  if(touchPosition.x>=canvas.width-1||touchPosition.x<=1||touchPosition.y>=canvas.height-1||touchPosition.y<=1){
    canvas.removeEventListener('touchmove',touchMove);
  }
}

canvas.addEventListener('mousedown',function(event){
  var mousePosition = getMousePosition(canvas,event);
  event.preventDefault();
  //點擊圓點
  ctx.beginPath();
  ctx.arc(event.pageX,event.pageY,document.getElementById('lineWidth').value/2,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
  //開始畫
  ctx.beginPath();
  ctx.moveTo(mousePosition.x, mousePosition.y);

  canvas.addEventListener('mousemove',mouseMove);
});
canvas.addEventListener('touchstart',function(event){
  var touchPosition = getTouchPosition(canvas,event);
  event.preventDefault();
  ctx.beginPath();
  ctx.arc(event.touches[0].pageX,event.touches[0].pageY,document.getElementById('lineWidth').value/2,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
  //開始新的路徑
  ctx.beginPath();
  ctx.moveTo(touchPosition.x, touchPosition.y);
  canvas.addEventListener('touchmove',touchMove);
});

canvas.addEventListener('mouseup',function(event){
  canvas.removeEventListener('mousemove',mouseMove);
});
canvas.addEventListener('touchend',function(event){
  canvas.removeEventListener('touchmove',touchMove);
});

document.getElementById('reset').addEventListener('click',function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
document.getElementById('save').addEventListener('click',function(){
  var url = canvas.toDataURL();
  this.href= url;
});
document.getElementById('lineWidth').addEventListener('change',function(){
  ctx.lineWidth = document.getElementById('lineWidth').value;
});
for(var i=0; i<colors.length; i++){
  colorListener(i);
}
