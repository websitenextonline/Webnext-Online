/* Add each member's social URLs here later. Empty values render visible inactive buttons. */
(()=>{
'use strict';
const SOCIAL_LINKS={
 'hamza-farooq':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'abdul-haseeb':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'taimoor':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'muhammad-abuzar':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'jahanzeb':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'shahzaib':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'rehman':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'talal':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'abdullah':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''},
 'sohail':{whatsapp:'',linkedin:'',facebook:'',instagram:'',tiktok:'',youtube:'',website:''}
};
const PORTFOLIOS={'hamza-farooq':'/hamza-farooq/','abdul-haseeb':'/abdul-haseeb/','taimoor':'/taimoor-farooq/'};
const keyFor=name=>{const n=name.trim().toLowerCase();if(n.startsWith('hamza'))return 'hamza-farooq';if(n.startsWith('taimoor'))return 'taimoor';if(n.startsWith('sohail'))return 'sohail';if(/^jahan/.test(n))return 'jahanzeb';return n.replace(/\s+/g,'-')};
const ICONS={
 whatsapp:['WhatsApp','<path d="m3 21 1.5-5A9 9 0 1 1 8 20z"/><path d="M8 7c0 4 4 8 8 8l1-2-3-1-1 1-3-3 1-1-1-2z"/>'],
 linkedin:['LinkedIn','<rect x="3" y="8" width="4" height="13"/><circle cx="5" cy="4" r="2"/><path d="M11 21V8h4v2c4-4 6 0 6 3v8h-4v-7c0-3-2-3-2 0v7z"/>'],
 facebook:['Facebook','<path d="M14 21v-8h3l1-4h-4V7c0-1 1-2 2-2h2V2h-3c-4 0-5 3-5 5v2H7v4h3v8z"/>'],
 instagram:['Instagram','<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r=".7"/>'],
 tiktok:['TikTok','<path d="M14 3v12a4 4 0 1 1-4-4M14 3c1 4 3 5 7 5"/>'],
 youtube:['YouTube','<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3z"/>'],
 website:['Website','<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>']
};
function socialRow(key){const row=document.createElement('div');row.className='wn-member-socials';row.setAttribute('aria-label','Social media');Object.entries(ICONS).forEach(([platform,[label,paths]])=>{const url=SOCIAL_LINKS[key]?.[platform]||'';const valid=/^https:\/\//i.test(url);const el=document.createElement(valid?'a':'button');el.className='wn-member-social wn-social-'+platform;el.title=valid?label:label+' — link not added';el.setAttribute('aria-label',el.title);if(valid){el.href=url;el.target='_blank';el.rel='noopener noreferrer'}else{el.type='button';el.setAttribute('aria-disabled','true');el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation()})}el.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';row.append(el)});return row}
function actions(key,name){const row=document.createElement('div');row.className='wn-member-links';const profile=document.createElement('a');profile.className='wn-profile-action';profile.href='/team/profile/?member='+encodeURIComponent(key);profile.textContent='View Profile';profile.setAttribute('aria-label','View profile for '+name);row.append(profile);const portfolio=document.createElement(PORTFOLIOS[key]?'a':'button');portfolio.className='wn-profile-action wn-profile-full';portfolio.textContent='View Portfolio';portfolio.setAttribute('aria-label','View portfolio for '+name);if(PORTFOLIOS[key])portfolio.href=PORTFOLIOS[key];else{portfolio.type='button';portfolio.setAttribute('aria-disabled','true');portfolio.title='Portfolio not added yet';portfolio.addEventListener('click',e=>{e.preventDefault();e.stopPropagation()})}row.append(portfolio);return row}
function init(){document.querySelectorAll('.wn-team-profile').forEach(card=>{if(card.dataset.actionsReady)return;const name=card.querySelector('h3')?.textContent||card.dataset.member;const key=keyFor(name);card.querySelectorAll(':scope>.wn-profile-action').forEach(el=>el.remove());const wrap=document.createElement('div');wrap.className='wn-member-actions';wrap.append(actions(key,name),socialRow(key));card.append(wrap);card.dataset.actionsReady='true'});document.querySelectorAll('#wnDesk .pol').forEach(card=>{if(card.dataset.actionsReady)return;const back=card.querySelector('.pb');if(!back)return;const name=back.querySelector('b')?.textContent||'';const key=keyFor(name);back.querySelectorAll('.soc').forEach(el=>el.remove());back.append(actions(key,name),socialRow(key));card.dataset.actionsReady='true'});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
