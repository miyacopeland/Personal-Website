const svg=document.getElementById('chirp');
if(svg){
  const p=svg.querySelector('path'),m=svg.querySelector('line'),t=svg.querySelector('text');
  let d='';
  for(let x=0;x<=360;x++){
    let a,ph;
    if(x<=260){const u=x/260;a=6+70*u**3.4;ph=26*u**2.2*Math.PI}
    else{const k=(x-260)/100;a=46*Math.exp(-5*k);ph=26*Math.PI+k*18}
    d+=(x?'L':'M')+(x+10)+' '+(100-a*Math.sin(ph)).toFixed(1);
  }
  p.setAttribute('d',d);
  const L=p.getTotalLength();
  p.style.strokeDasharray=L;
  let anims=[];
  const play=()=>{
    anims.forEach(a=>a.cancel());
    anims=[
      p.animate([{strokeDashoffset:L},{strokeDashoffset:0}],{duration:2000,easing:'cubic-bezier(.5,0,.3,1)',fill:'forwards'}),
      m.animate([{opacity:0},{opacity:.8}],{duration:500,delay:1500,fill:'forwards'}),
      t.animate([{opacity:0},{opacity:.9}],{duration:500,delay:1700,fill:'forwards'})
    ];
  };
  play();
  svg.addEventListener('mouseenter',()=>{if(anims[0].playState==='finished')play()});
}
