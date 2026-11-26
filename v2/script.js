const svg=document.getElementById('chirp');
if(svg){
  const SX=1.4,N=360,WALL=260,DUR=5000;
  const p=svg.querySelector('path'),m=svg.querySelector('line'),t=svg.querySelector('text');
  svg.setAttribute('viewBox','0 0 540 200');
  const wx=WALL*SX+10;
  m.setAttribute('x1',wx);m.setAttribute('x2',wx);m.setAttribute('y1',55);m.setAttribute('y2',145);
  t.setAttribute('x',wx+6);t.setAttribute('y',62);
  const pts=[];
  for(let x=0;x<=N;x++){
    let a,ph;
    if(x<=WALL){const u=x/WALL;a=6+70*u**3.4;ph=26*u**2.2*Math.PI}
    else{const k=(x-WALL)/100;a=46*Math.exp(-5*k);ph=26*Math.PI+k*18}
    pts.push((x?'L':'M')+(x*SX+10).toFixed(1)+' '+(100-a*Math.sin(ph)).toFixed(1));
  }
  p.setAttribute('d',pts[0]);
  p.setAttribute('fill','none');p.setAttribute('stroke','#ffb35c');p.setAttribute('stroke-width','2.4');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');
  m.setAttribute('stroke','#ffffff');m.setAttribute('stroke-width','1.5');m.setAttribute('stroke-dasharray','4 5');
  t.setAttribute('fill','#6fe3ff');t.setAttribute('font-size','13');t.setAttribute('letter-spacing','2');
  let raf,start=null,shown=false,busy=false;
  function step(ts){
    if(start===null)start=ts;
    const k=Math.min(1,(ts-start)/DUR),n=Math.floor(k*N);
    p.setAttribute('d',pts.slice(0,n+1).join(' '));
    if(!shown&&n>=WALL){shown=true;m.style.transition='opacity .25s';t.style.transition='opacity .25s';m.style.opacity=1;t.style.opacity=1}
    if(k<1)raf=requestAnimationFrame(step);else busy=false;
  }
  function play(){
    cancelAnimationFrame(raf);busy=true;shown=false;start=null;
    m.style.transition='none';t.style.transition='none';m.style.opacity=0;t.style.opacity=0;
    p.setAttribute('d',pts[0]);
    raf=requestAnimationFrame(step);
  }
  play();
  svg.addEventListener('mouseenter',()=>{if(!busy)play()});
}
