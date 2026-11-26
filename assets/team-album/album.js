/* Native transforms only; portraits retain their supplied file/name mapping. */
(()=>{
  const album=document.getElementById('wnTeamAlbum');
  if(!album)return;
  const stage=album.querySelector('.wn-album-stage');
  if(!stage.querySelector('[data-member="muhammad-abuzar"]')) {
    const card=document.createElement('article');
    card.className='wn-album-card';card.dataset.member='muhammad-abuzar';
    const img=document.createElement('img');img.src='/assets/team-album/muhammad-abuzar.webp';img.alt='Muhammad Abuzar';img.loading='lazy';img.addEventListener('error',()=>{img.removeAttribute('src');img.alt='Muhammad Abuzar — portrait pending';},{once:true});
    const caption=document.createElement('div');caption.className='wn-album-caption';
    const name=document.createElement('h3');name.textContent='Muhammad Abuzar';
    const role=document.createElement('p');role.textContent='Video Editor · Animator · Graphic Designer';caption.append(name,role);card.append(img,caption);stage.append(card);
    const dot=document.createElement('button');dot.type='button';dot.className='wn-album-dot';dot.setAttribute('aria-label','Show Muhammad Abuzar');album.querySelector('.wn-album-dots').append(dot);
  }
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
      const x=d===0?0:Math.sign(d)*(wide?step*([0,1,1.85,2.55,3.1][Math.min(distance,4)]):(distance===1?step:step*1.73+(distance-2)*60));
      const scale=wide?[1,.86,.71,.57,.5][Math.min(distance,4)]:(distance===0?1:distance===1?.87:.71);
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
    status.textContent=`${String(active+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')} · ${name}`;
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

/* Shared team profile directory, with the CEO first and completed portfolios linked. */
(()=>{
 const album=document.getElementById('wnTeamAlbum');
 if(!album)return;
 const members=[...album.querySelectorAll('.wn-album-card')].map((card,index)=>{
  const raw=card.querySelector('h3').textContent.trim(),isCEO=/^Hamza(?: Farooq)?$/.test(raw),isHaseeb=raw==='Abdul Haseeb';
  return {name:isCEO?'Hamza Farooq':raw,role:isCEO?'Chief Executive Officer (CEO)':isHaseeb?'Web Designer & Motion Creator':card.querySelector('.wn-album-caption p')?.textContent.trim()||'Team Member',photo:card.querySelector('img').src,ceo:isCEO,index,url:isCEO?'/hamza-farooq/':isHaseeb?'/abdul-haseeb/':null,rank:isCEO?0:isHaseeb?1:index+2};
 }).sort((a,b)=>a.rank-b.rank);
 const style=document.createElement('style');
 style.textContent='.wn-team-profiles{padding:0;margin:30px 0 28px;color:#082345}.wn-team-profiles-head{margin-bottom:21px}.wn-team-profiles-head>p{font-size:12px;font-weight:700;letter-spacing:.13em;color:#1373b2;margin:0 0 8px}.wn-team-profiles-head h2{font:700 clamp(24px,3vw,32px)/1.2 Poppins,Arial,sans-serif;letter-spacing:-.035em;margin:0}.wn-profile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.wn-team-profile{display:flex;align-items:center;gap:18px;min-height:148px;padding:24px;border:1px solid #c8deef;border-radius:17px;background:linear-gradient(115deg,#f2f8ff,#e5f2ff);box-shadow:0 3px 10px #164d7e06;min-width:0}.wn-team-profile.wn-profile-ceo{grid-column:1/-1;padding:27px 30px;background:linear-gradient(110deg,#e8f4ff,#d6ecff);border-color:#91c9ed;box-shadow:0 7px 20px #145b9710}.wn-profile-avatar{display:block;flex:none;width:67px;height:84px;border-radius:11px;object-fit:cover;object-position:50% 22%;border:1px solid #b4d2e6;background:#082c3d}.wn-profile-ceo .wn-profile-avatar{width:85px;height:108px}.wn-profile-info{min-width:0;flex:1}.wn-profile-badge{display:inline-flex;border-radius:5px;background:#075f9e;color:#fff;font:700 11px/1 Arial,sans-serif;letter-spacing:.1em;padding:6px 9px;margin-bottom:9px}.wn-team-profile h3{font:700 19px/1.25 Poppins,Arial,sans-serif;letter-spacing:-.03em;color:#082345;margin:0 0 6px}.wn-profile-ceo h3{font-size:24px}.wn-profile-role{font-size:13px;line-height:1.45;color:#42627e;margin:0}.wn-profile-ceo .wn-profile-role{font-size:15px;font-weight:600;color:#125a8c}.wn-profile-description{font-size:13px;line-height:1.5;color:#526d85;margin:8px 0 0}.wn-profile-action{display:inline-flex;justify-content:center;align-items:center;flex:none;min-height:42px;padding:11px 17px;border:1px solid #a7cce7;border-radius:8px;background:#fff;color:#085f9d;font:600 13px/1.2 Poppins,Arial,sans-serif;white-space:nowrap;text-decoration:none;cursor:pointer}.wn-profile-action.wn-profile-full{background:#086bc2;border-color:#086bc2;color:#fff}.wn-profile-action:hover{background:#d5eaff;color:#054978}.wn-profile-action.wn-profile-full:hover{background:#07529a;color:#fff}.wn-profile-action:focus-visible{outline:3px solid #2093dd;outline-offset:3px}#wnMemberDialog{width:min(780px,94vw);max-height:92dvh;padding:0;border:1px solid #a9cce5;border-radius:18px;background:#f4f9ff;color:#082345;box-shadow:0 24px 100px #001a3e66}#wnMemberDialog::backdrop{background:#031a35db;backdrop-filter:blur(7px)}.wn-member-dialog-head{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:19px 23px;border-bottom:1px solid #c8dfed}.wn-member-dialog-head>span{font:700 13px/1.2 Poppins,Arial,sans-serif;letter-spacing:.06em}.wn-member-close{padding:8px 13px;background:#fff;border:1px solid #b5d1e5;border-radius:6px;color:#0a4778;cursor:pointer}.wn-member-dialog-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:26px;padding:26px;align-items:center}.wn-member-dialog-body img{display:block;width:100%;max-height:62dvh;object-fit:contain;border-radius:10px;background:#062936}.wn-member-dialog-body h2{font:700 27px/1.2 Poppins,Arial,sans-serif;letter-spacing:-.035em;color:#082345;margin:0 0 14px}.wn-member-dialog-body p{font:500 16px/1.6 Poppins,Arial,sans-serif;color:#4e6b83;margin:0 0 22px}.wn-member-dialog-body small{display:block;font:700 12px/1.4 Poppins,Arial,sans-serif;letter-spacing:.12em;color:#0875b5;margin-bottom:12px}.wn-member-modal-open{overflow:hidden}@media(max-width:1050px){.wn-team-profile{flex-wrap:wrap;padding:22px;gap:14px}.wn-profile-info{flex-basis:calc(100% - 85px)}.wn-team-profile>.wn-profile-action{margin-left:81px}.wn-profile-ceo>.wn-profile-info{flex-basis:calc(100% - 180px)}.wn-profile-ceo>.wn-profile-action{margin-left:0}.wn-team-profile h3{font-size:18px}}@media(max-width:650px){.wn-profile-grid{grid-template-columns:1fr;gap:14px}.wn-team-profile,.wn-team-profile.wn-profile-ceo{padding:22px;gap:15px}.wn-profile-ceo>.wn-profile-info{flex-basis:calc(100% - 105px)}.wn-profile-ceo>.wn-profile-action{margin-left:100px}.wn-profile-ceo h3{font-size:21px}.wn-profile-ceo .wn-profile-role{font-size:14px}.wn-profile-action{font-size:13px}.wn-member-dialog-body{grid-template-columns:1fr;padding:20px;gap:20px}.wn-member-dialog-body img{max-height:45dvh}.wn-member-dialog-body h2{font-size:24px}.wn-member-dialog-body p{font-size:15px}}';
 document.head.appendChild(style);
 const section=document.createElement('section');section.className='wn-team-profiles';section.setAttribute('aria-labelledby','wnTeamProfilesTitle');section.id='team-portfolios';
 const head=document.createElement('div');head.className='wn-team-profiles-head';
 const eyebrow=document.createElement('p');eyebrow.textContent='THE PEOPLE BEHIND WEBNEXTONLINE';
 const title=document.createElement('h2');title.id='wnTeamProfilesTitle';title.textContent='Team portfolios & profiles';head.append(eyebrow,title);
 const grid=document.createElement('div');grid.className='wn-profile-grid';section.append(head,grid);
 const dialog=document.createElement('dialog');dialog.id='wnMemberDialog';dialog.setAttribute('aria-labelledby','wnMemberName');
 dialog.innerHTML='<div class="wn-member-dialog-head"><span>WEBNEXTONLINE TEAM</span><button class="wn-member-close" type="button" autofocus>Close</button></div><div class="wn-member-dialog-body"><img id="wnMemberPhoto" alt=""><div><small>MEET THE TEAM</small><h2 id="wnMemberName"></h2><p id="wnMemberRole"></p><a class="wn-profile-action wn-profile-full" href="/#contact">Contact the team</a></div></div>';
 document.body.appendChild(dialog);let opener=null;
 function openProfile(member,button){opener=button;dialog.querySelector('#wnMemberName').textContent=member.name;dialog.querySelector('#wnMemberRole').textContent=member.role;const img=dialog.querySelector('#wnMemberPhoto');img.src=member.photo;img.alt=member.name+' — WebNextOnline team portrait';dialog.querySelector('[data-taimoor-portfolio]')?.remove();if(/^Taimoor(?: Farooq)?$/i.test(member.name)){const link=document.createElement('a');link.dataset.taimoorPortfolio='';link.className='wn-profile-action wn-profile-full';link.href='/taimoor-farooq/';link.textContent='View Portfolio';link.style.marginRight='10px';dialog.querySelector('.wn-member-dialog-body>div').insertBefore(link,dialog.querySelector('.wn-member-dialog-body a'));}dialog.showModal();document.body.classList.add('wn-member-modal-open')}
 dialog.querySelector('.wn-member-close').addEventListener('click',()=>dialog.close());dialog.querySelector('a').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{document.body.classList.remove('wn-member-modal-open');opener?.focus()});
 members.forEach(member=>{
  const card=document.createElement('article');card.className='wn-team-profile'+(member.ceo?' wn-profile-ceo':'');card.dataset.member=member.name;
  const photo=document.createElement('img');photo.className='wn-profile-avatar';photo.src=member.photo;photo.alt=member.name;photo.width=member.ceo?85:67;photo.height=member.ceo?108:84;photo.loading='lazy';
  const info=document.createElement('div');info.className='wn-profile-info';
  if(member.ceo){const badge=document.createElement('span');badge.className='wn-profile-badge';badge.textContent='CEO · LEADERSHIP';info.appendChild(badge)}
  const name=document.createElement('h3');name.textContent=member.name;const role=document.createElement('p');role.className='wn-profile-role';role.textContent=member.role;info.append(name,role);
  if(member.ceo){const description=document.createElement('p');description.className='wn-profile-description';description.textContent='Leading WebNextOnline’s digital services and practical IT training.';info.appendChild(description)}
  const action=document.createElement(member.url?'a':'button');action.className='wn-profile-action'+(member.url?' wn-profile-full':'');action.textContent=member.url?'View Portfolio':'View Profile';action.setAttribute('aria-label',(member.url?'View portfolio for ':'View profile for ')+member.name);
  if(member.url)action.href=member.url;else{action.type='button';action.addEventListener('click',()=>openProfile(member,action))}
  card.append(photo,info,action);grid.appendChild(card);
 });
 const old=document.querySelector('.wn-haseeb-team-link');if(old)old.replaceWith(section);else album.insertAdjacentElement('afterend',section);
})();
