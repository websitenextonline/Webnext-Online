/* Add a member here only after their portfolio page is published. */
(()=>{
const members=[
 {name:'Hamza Farooq',aliases:['Hamza'],url:'/hamza-farooq/'},
 {name:'Abdul Haseeb',aliases:[],url:'/abdul-haseeb/'},
 {name:'Taimoor Farooq',aliases:['Taimoor'],url:'/taimoor-farooq/'}
];
const norm=s=>String(s).trim().toLowerCase();
const find=name=>members.find(m=>[m.name,...m.aliases].some(n=>norm(n)===norm(name)));
window.WNPortfolioRegistry={members,find};
function init(){document.querySelectorAll('#wnDesk .pol .pb').forEach(back=>{const member=find(back.querySelector('b')?.textContent);if(!member||back.querySelector('.wn-pol-portfolio'))return;const a=document.createElement('a');a.className='wn-pol-portfolio';a.href=member.url;a.textContent='View Portfolio';a.setAttribute('aria-label','View portfolio for '+member.name);back.append(a)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
const style=document.createElement('style');style.textContent='.wn-pol-portfolio{display:inline-flex;align-items:center;justify-content:center;padding:8px 12px;margin-top:9px;border-radius:7px;background:#086bc2;color:#fff;font:600 11px/1.2 Poppins,Arial,sans-serif;text-decoration:none}.wn-pol-portfolio:hover{background:#07529a}.wn-pol-portfolio:focus-visible{outline:3px solid #2093dd;outline-offset:3px}';document.head.append(style);
})();
