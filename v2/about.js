 function draw(){
  tick=false;
  var p=prog(),cx=W/2,cy=H/2,M=.68,S=Math.min(W,H),R0=S*.32;
  ctx.clearRect(0,0,W,H);
  if(p<M){
   var u=p/M,r=R0*Math.pow(1-u,.65)+26,th=u*u*40+u*4;
   hole(cx+Math.cos(th)*r*.4,cy+Math.sin(th)*r*.4,15);
   hole(cx-Math.cos(th)*r*.6,cy-Math.sin(th)*r*.6,11);
   if(u>.85){var f=(u-.85)/.15,FR=S*.6*f+10,g=ctx.createRadialGradient(cx,cy,0,cx,cy,FR);
    g.addColorStop(0,'rgba(255,245,215,'+(.9*f)+')');g.addColorStop(.4,'rgba(255,179,92,'+(.4*f)+')');g.addColorStop(1,'rgba(255,179,92,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,FR,0,7);ctx.fill();}
   cap.textContent=p<.05?'Scroll to bring them together':'Two black holes spiral inward';
  }else{
   var q=(p-M)/(1-M),maxR=Math.max(W,H)*.65;
   var gl=S*.6*(1-q);
   if(gl>0){var g2=ctx.createRadialGradient(cx,cy,0,cx,cy,gl+10);
    g2.addColorStop(0,'rgba(255,245,215,'+(.7*(1-q))+')');g2.addColorStop(1,'rgba(255,179,92,0)');
    ctx.fillStyle=g2;ctx.beginPath();ctx.arc(cx,cy,gl+10,0,7);ctx.fill();}
   for(var k=0;k<5;k++){
    var rr=26+q*maxR-k*maxR*.1;
    if(rr>26){ctx.strokeStyle='rgba(255,213,138,'+((1-q*.85)*(1-k*.18)*.7)+')';ctx.lineWidth=2.5-k*.3;
     ctx.beginPath();ctx.arc(cx,cy,rr,0,7);ctx.stroke();}
   }
   hole(cx,cy,24+3*Math.sin(q*40)*(1-q));
   cap.textContent='The ringdown carries the story.';
  }
 }
