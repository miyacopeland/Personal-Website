const svg=document.getElementById('chirp');
if(svg){
  const p=svg.querySelector('path'),m=svg.querySelector('line'),t=svg.querySelector('text');
  let d='';
  for(let x=0;x<=360;x++){
    let a,ph;
    if(x<=260){const u=x/260;a=6+70*u**3.4;ph=8*u**1.6*Math.PI}
    else{const k=(x-260)/100;a=46*Math.exp(-5*k);ph=8*Math.PI+k*10}
    d+=(x?'L':'M')+(x+10)+' '+(100-a*Math.sin(ph)).toFixed(1);
  }
  p.setAttribute('d',d);
  p.setAttribute('fill','none');p.setAttribute('stroke','#ffb35c');p.setAttribute('stroke-width','2.4');p.setAttribute('stroke-linecap','round');
  m.setAttribute('stroke','#ffffff');m.setAttribute('stroke-width','1.5');m.setAttribute('stroke-dasharray','4 5');
  t.setAttribute('fill','#6fe3ff');t.setAttribute('font-size','13');t.setAttribute('letter-spacing','2');
  const L=p.getTotalLength();
  let busy=false,timer;
  function play(){
    clearTimeout(timer);busy=true;
    p.style.transition='none';p.style.strokeDasharray=L;p.style.strokeDashoffset=L;
    m.style.transition='none';t.style.transition='none';m.style.opacity=0;t.style.opacity=0;
    void p.getBoundingClientRect();
    p.style.transition='stroke-dashoffset 5s linear';p.style.strokeDashoffset=0;
    timer=setTimeout(()=>{m.style.transition='opacity .8s';t.style.transition='opacity .8s';m.style.opacity=1;t.style.opacity=1;busy=false},5000);
  }
  play();
  svg.addEventListener('mouseenter',()=>{if(!busy)play()});
}
