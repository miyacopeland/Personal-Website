<script>
(function(){
 var C=function(x){return Math.max(0,Math.min(1,x))};
 var back=function(x){return 1+2.9*Math.pow(x-1,3)+1.9*Math.pow(x-1,2)};
 var secs=[].slice.call(document.querySelectorAll('.journey'));
 secs.forEach(function(s){s.style.height=s.dataset.h||'300vh'});
 var wv=document.getElementById('waves');
 if(wv){var d='M0 35';for(var i=0;i<60;i++)d+=' Q'+(i*40+20)+' '+(i%2?65:5)+' '+(i*40+40)+' 35';
  wv.setAttribute('viewBox','0 0 2400 70');wv.setAttribute('preserveAspectRatio','none');
  wv.innerHTML='<path d="'+d+'"/>';}
 function run(s){
  var p=C(-s.getBoundingClientRect().top/(s.offsetHeight-innerHeight));
  [].forEach.call(s.querySelectorAll('[data-t]'),function(el){
   var w=el.dataset.t.split(',').map(Number),fx=el.dataset.fx;
   var i=C((p-w[0])/(w[1]-w[0])),o=C((p-w[2])/(w[3]-w[2])),op=Math.min(i,1-o),t='',f='';
   if(fx==='suck'){var q=o*o;op=i*(o>=1?0:1-q*.6);t='scale('+(1-q*.98)+') rotate('+(-900*q)+'deg)';f='blur('+(o*8)+'px)';}
   else if(fx==='hole'){t='scale('+(.3+.9*i-.7*o)+')';}
   else if(fx==='pop'){op=C(i*3)*(1-o);t='scale('+(.5+.5*back(i))+')';}
   else{t='translateY('+((1-i)*30)+'px)';}
   if(el.classList.contains('jit')){t+=' translate('+(Math.sin(p*400)*4)+'px,'+(Math.cos(p*330)*3)+'px)';}
   el.style.opacity=op;el.style.visibility=op<.01?'hidden':'visible';
   el.style.transform=t;el.style.filter=f;
  });
  if(s.dataset.scene==='2'){
   var L=C((p-.56)/.41),W=C((p-.64)/.2);
   document.getElementById('rocket').style.transform='translateY('+(150-330*L)+'px) rotate('+(Math.sin(p*90)*5*W)+'deg)';
   wv.style.transform='translateX('+(-p*900)+'px)';
   var stop=.8;document.getElementById('hand').style.transform='rotate('+(3600*Math.min(p,stop))+'deg)';
   document.getElementById('wlabel').textContent=p>stop?'Watch paused. Time dilation takes it from here.':'';
  }
 }
 function all(){secs.forEach(run)}
 addEventListener('scroll',all,{passive:true});addEventListener('resize',all);all();
})();
</script>
