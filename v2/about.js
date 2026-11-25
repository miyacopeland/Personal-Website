(function(){
var cv=document.getElementById('merger');
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(cv&&!rm){
 var stage=document.querySelector('.stage'),cap=document.getElementById('mcap'),ctx=cv.getContext('2d'),W,H,tick=false;
 function size(){var d=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);}
 function prog(){var r=stage.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));}
 function hole(x,y,r){
  var g=ctx.createRadialGradient(x,y,r*.9,x,y,r*3.4);
  g.addColorStop(0,'rgba(255,179,92,.45)');g.addColorStop(1,'rgba(255,179,92,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*3.4,0,7);ctx.fill();
  ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
  ctx.strokeStyle='rgba(255,213,138,.9)';ctx.lineWidth=1.5;ctx.stroke();
 }
 function draw(){
  tick=false;
  var p=prog(),cx=W/2,cy=H/2,M=.68,R0=Math.min(W,H)*.32;
  ctx.clearRect(0,0,W,H);
  if(p<M){
   var u=p/M,r=R0*Math.pow(1-u,.65)+26,th=u*u*40+u*4;
   hole(cx+Math.cos(th)*r*.4,cy+Math.sin(th)*r*.4,15);
   hole(cx-Math.cos(th)*r*.6,cy-Math.sin(th)*r*.6,11);
   if(u>.9){var f=(u-.9)/.1,g=ctx.createRadialGradient(cx,cy,0,cx,cy,120*f+10);
    g.addColorStop(0,'rgba(255,240,200,'+(.55*f)+')');g.addColorStop(1,'rgba(255,179,92,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,120*f+10,0,7);ctx.fill();}
   cap.textContent=p<.05?'Scroll to bring them together':'Two black holes spiral inward';
  }else{
   var q=(p-M)/(1-M),maxR=Math.min(W,H)*.7;
   for(var k=0;k<4;k++){
    var rr=24+q*maxR-k*maxR*.13;
    if(rr>24){ctx.strokeStyle='rgba(255,213,138,'+((1-q*.8)*(1-k*.22)*.6)+')';ctx.lineWidth=1.5;
     ctx.beginPath();ctx.arc(cx,cy,rr,0,7);ctx.stroke();}
   }
   hole(cx,cy,20+2.5*Math.sin(q*40)*(1-q));
   cap.textContent='The ringdown carries the story.';
  }
 }
 function req(){if(!tick){tick=true;requestAnimationFrame(draw);}}
 addEventListener('scroll',req,{passive:true});
 addEventListener('resize',function(){size();req();});
 size();draw();
}
var els=document.querySelectorAll('.after > *');
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
 els.forEach(function(e){e.classList.add('reveal');io.observe(e);});
}
})();
