/* Native transforms only; portraits retain their supplied file/name mapping. */
(()=>{
  const album=document.getElementById('wnTeamAlbum');
  if(!album)return;
  const stage=album.querySelector('.wn-album-stage');
  const cards=[...album.querySelectorAll('.wn-album-card')];
  const dots=[...album.querySelectorAll('.wn-album-dot')];
  const toggle=album.querySelector('.wn-album-toggle');
  const status=album.querySelector('.wn-album-status');
  const live=album.querySelector('.wn-album-sr');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const opening=Math.max(0,cards.findIndex(card=>card.querySelector('h3').textContent.trim()==='Hamza'));
  let active=opening,timer,visible=false,hover=false,focused=false,paused=false,pointer=null,suppressClick=false;
  function schedule(){
    clearTimeout(timer);
    const stopped=paused||reduce.matches;
    toggle.innerHTML=stopped?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z"/></svg>':'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zm6 0h4v12H9z"/></svg>';
    toggle.setAttribute('aria-label',stopped?'Play team album':'Pause team album');
    toggle.setAttribute('aria-pressed',String(!stopped));
    toggle.disabled=reduce.matches;
    toggle.title=reduce.matches?'Autoplay disabled by your reduced motion preference':'';
    if(!stopped&&!document.hidden&&visible&&!hover&&!focused&&!pointer)timer=setTimeout(()=>show(active+1),10000);
  }
  function show(index,announce=false){
    active=(index+cards.length)%cards.length;
    const styles=getComputedStyle(album);
    const sides=Number(styles.getPropertyValue('--album-sides'));
    const wide=sides===3;
    const step=wide?Math.max(95,Math.min(200,(album.clientWidth-280)/4.2)):parseFloat(styles.getPropertyValue('--album-step'));
    cards.forEach((card,i)=>{
      let d=(i-active+cards.length)%cards.length;
      if(d>cards.length/2)d-=cards.length;
      const distance=Math.abs(d),old=Number(card.dataset.distance??9);
      // The wrap takes place behind the visible stack, never across its front.
      card.style.transition=(old>sides&&distance>sides)?'none':'';
      const x=d===0?0:Math.sign(d)*(wide?step*([0,1,1.85,2.55,3.1][distance]):(distance===1?step:step*1.73+(distance-2)*60));
      const scale=wide?[1,.86,.71,.57,.5][distance]:(distance===0?1:distance===1?.87:.71);
      card.style.transform=`translate3d(${x}px,${distance*10}px,${-distance*(wide?30:85)}px) rotateY(${d===0?0:-Math.sign(d)*18}deg) scale(${scale})`;
      card.style.opacity=distance>sides?'0':distance===0?'1':distance===1?'.92':distance===2?'.76':'.58';
      card.style.zIndex=String(10-distance);
      card.style.pointerEvents=distance<=sides?'auto':'none';
      card.dataset.distance=distance;
      card.setAttribute('aria-hidden',String(i!==active));
      card.querySelectorAll('a').forEach(a=>a.tabIndex=i===active?0:-1);
      if(distance<=sides)card.querySelector('img').loading='eager';
    });
    dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===active)));
    const name=cards[active].querySelector('h3').textContent;
    status.textContent=`${String(active+1).padStart(2,'0')} / 09 · ${name}`;
    if(announce)live.textContent=`${name}, team member ${active+1} of ${cards.length}`;
    schedule();
  }
  album.querySelector('[data-album-prev]').addEventListener('click',()=>show(active-1,true));
  album.querySelector('[data-album-next]').addEventListener('click',()=>show(active+1,true));
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i,true)));
  cards.forEach((card,i)=>card.addEventListener('click',()=>{if(!suppressClick)show(i,true)}));
  toggle.addEventListener('click',()=>{paused=!paused;schedule()});
  album.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
      e.preventDefault();show(active+(e.key==='ArrowRight'?1:-1),true);
    }
  });
  album.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;schedule()}});
  album.addEventListener('pointerleave',()=>{hover=false;schedule()});
  album.addEventListener('focusin',()=>{focused=true;schedule()});
  album.addEventListener('focusout',()=>{queueMicrotask(()=>{focused=album.contains(document.activeElement);schedule()})});
  stage.addEventListener('pointerdown',e=>{
    if(!e.isPrimary||e.button!==0||e.target.closest('a,button'))return;
    pointer={id:e.pointerId,x:e.clientX,y:e.clientY};suppressClick=false;
    stage.setPointerCapture(e.pointerId);schedule();
  });
  stage.addEventListener('pointerup',e=>{
    if(!pointer||e.pointerId!==pointer.id)return;
    const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
    pointer=null;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){
      suppressClick=true;show(active+(dx<0?1:-1),true);
      setTimeout(()=>suppressClick=false,0);
    }else schedule();
  });
  const cancel=()=>{pointer=null;schedule()};
  stage.addEventListener('pointercancel',cancel);
  stage.addEventListener('lostpointercapture',cancel);
  document.addEventListener('visibilitychange',schedule);
  reduce.addEventListener('change',schedule);
  new ResizeObserver(()=>show(active)).observe(album);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.2}).observe(album);
  window.addEventListener('hashchange',()=>{if(location.hash==='#team')show(opening)});
  show(opening);
})();

/* Open Abdul Haseeb's full portfolio from the team album and desk. */
(()=>{
 const url='abdul-haseeb.html';
 const style=document.createElement('style');
 style.textContent='.wn-haseeb-portfolio{display:inline-flex!important;align-items:center;justify-content:center;padding:9px 14px!important;margin-top:12px!important;border-radius:7px;background:#fff!important;color:#064d91!important;font:600 14px/1.2 Inter,Arial,sans-serif!important;letter-spacing:0;text-decoration:none;position:relative;z-index:2;min-height:38px}.wn-haseeb-portfolio:hover{background:#dceeff!important}.wn-haseeb-portfolio:focus-visible{outline:3px solid #54bbff;outline-offset:3px}.wn-album-caption:has(.wn-haseeb-portfolio){padding-bottom:18px}.pol .pb .wn-haseeb-portfolio{background:#0869cc!important;color:#fff!important;font-size:12px!important;margin-top:10px!important;padding:8px 10px!important}.wn-haseeb-team-link{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:28px 0 20px;padding:25px 30px;border:1px solid #c6dff0;border-radius:14px;background:linear-gradient(110deg,#f3f9ff,#e4f2ff);color:#082345}.wn-haseeb-team-link strong{display:block;font-size:19px;line-height:1.3}.wn-haseeb-team-link p{margin:7px 0 0;font-size:14px;color:#526d85}.wn-haseeb-team-link a{background:#0869cc!important;color:#fff!important;margin:0!important;white-space:nowrap}@media(max-width:580px){.wn-haseeb-team-link{flex-direction:column;align-items:flex-start;padding:23px;gap:18px}.wn-haseeb-team-link strong{font-size:18px}}';
 document.head.appendChild(style);
 function addLink(parent){const a=document.createElement('a');a.href=url;a.className='wn-haseeb-portfolio';a.textContent='View Portfolio';a.setAttribute('aria-label','View Abdul Haseeb’s full portfolio');a.addEventListener('pointerdown',e=>e.stopPropagation());a.addEventListener('click',e=>e.stopPropagation());parent.appendChild(a);return a}
 document.querySelectorAll('.wn-album-card').forEach(card=>{if(card.querySelector('h3')?.textContent.trim()==='Abdul Haseeb'){const link=addLink(card.querySelector('.wn-album-caption'));link.tabIndex=card.getAttribute('aria-hidden')==='true'?-1:0}});
 document.querySelectorAll('#wnDesk .pol').forEach(card=>{const back=card.querySelector('.pb');if(back?.querySelector('b')?.textContent.trim()==='Abdul Haseeb'){back.querySelectorAll('a').forEach(a=>{if(/\\bcv\\b|resume/i.test(a.textContent))a.remove()});addLink(back)}});
 const album=document.getElementById('wnTeamAlbum');
 if(album){const promo=document.createElement('div');promo.className='wn-haseeb-team-link';promo.innerHTML='<div><strong>Abdul Haseeb · Web Designer &amp; Motion Creator</strong><p>Explore the full Haseeb Crafts portfolio, selected work and creative toolkit.</p></div>';addLink(promo);album.insertAdjacentElement('afterend',promo)}
})();
