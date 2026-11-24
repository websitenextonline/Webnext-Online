/* Adds controls inside the EXISTING WebNextOnline Team cards. No duplicate directory. */
(function(){
"use strict";
const MEMBERS=[
["Shahzaib","shahzaib"],["Jahanzeb","jahanzeb"],["Rehman","rehman"],
["Talal","talal"],["Abdul Haseeb","abdul-haseeb"],["Taimoor","taimoor"],
["Hamza","hamza-farooq"],["Abdullah","abdullah"],["Sohail","sohail"]
];
const href=(id,portfolio)=>portfolio&&["abdul-haseeb","hamza-farooq"].includes(id)?"/"+id+"/":"/team/profile/?member="+encodeURIComponent(id)+(portfolio?"#portfolio":"");
function actions(id){
 const wrap=document.createElement("div");wrap.className="wn-team-inline-actions";
 for(const [name,portfolio] of [["View Profile",false],["View Portfolio",true]]){
  const a=document.createElement("a");a.href=href(id,portfolio);a.textContent=name;
  a.className="wn-team-inline-button"+(portfolio?" secondary":"");
  a.addEventListener("click",e=>e.stopPropagation());
  wrap.append(a);
 }return wrap;
}
function enhance(){
 const root=document.getElementById("vt");if(!root)return;
 // Remove duplicate cards added by the older version.
 root.querySelector("#wnMemberDirectory")?.remove();
 const album=root.querySelector("#wnTeamAlbum");
 if(album){
  album.querySelectorAll(".wn-album-card").forEach((card,i)=>{
   const member=MEMBERS[i];if(!member)return;
   const caption=card.querySelector(".wn-album-caption");if(!caption)return;
   caption.querySelector(".wn-album-member-actions")?.remove();
   if(!caption.querySelector(".wn-team-inline-actions"))caption.append(actions(member[1]));
  });
 }
 // Enhance any original horizontal/leadership card with an existing View Portfolio CTA.
 root.querySelectorAll('a,button').forEach(btn=>{
  if(!/view portfolio/i.test(btn.textContent||"")||btn.closest(".wn-team-inline-actions"))return;
  const parent=btn.parentElement;if(!parent||parent.querySelector(".wn-profile-inline-link"))return;
  const context=(parent.parentElement?.textContent||"").toLowerCase();
  const member=MEMBERS.find(m=>context.includes(m[0].toLowerCase()));
  if(!member)return;
  const link=document.createElement("a");link.className="wn-profile-inline-link wn-team-inline-button";
  link.href=href(member[1],false);link.textContent="View Profile";
  link.addEventListener("click",e=>e.stopPropagation());btn.before(link);
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",enhance,{once:true});else enhance();
})();
