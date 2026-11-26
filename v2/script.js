(function(){
var svg=document.getElementById('chirp');
if(!svg)return;
var path=svg.querySelector('path'),line=svg.querySelector('line'),txt=svg.querySelector('text');
var d='',pi2=Math.PI*2;
for(var x=10;x<=370;x+=.5){
 var y;
 if(x<=270){var s=(x-10)/260;y=100-(8+42*Math.pow(s,2.5))*Math.sin(pi2*(2*s+18*Math.pow(s,4)));}
 else{var r=(x-270)/100;y=100-50*Math.exp(-4*r)*Math.sin(pi2*(20+28*r));}
 d+=(x===10?'M':'L')+x+' '+y.toFixed(2)+' ';
}
path.setAttribute('d',d);
path.setAttribute('fill','none');path.setAttribute('stroke','#ffb35c');path.setAttribute('stroke-width','2');path.setAttribute('stroke-linecap','round');
var L=path.getTotalLength(),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,raf;
function set(t){
 path.style.strokeDasharray=L;path.style.strokeDashoffset=L*(1-t);
 var a=Math.max(0,Math.min(1,(t-.7)/.2));line.style.opacity=a*.8;txt.style.opacity=a;
}
function play(){
 if(rm){set(1);return;}
 cancelAnimationFrame(raf);var t0=null,dur=4200;
 function f(ts){if(!t0)t0=ts;var t=Math.min(1,(ts-t0)/dur);set(1-Math.pow(1-t,2));if(t<1)raf=requestAnimationFrame(f);}
 set(0);raf=requestAnimationFrame(f);
}
svg.addEventListener('mouseenter',play);
play();
})();
