(function(){
"use strict";
const members=[
["Shahzaib","Coding Expert & WordPress","shahzaib.webp","shahzaib"],
["Jahanzeb","Canva & MS Office","jahanzeb.webp","jahanzeb"],
["Rehman","Canva, MS Office & Social Media Marketing","rehman.webp","rehman"],
["Talal","Video Editing & Graphic Designing","talal.webp","talal"],
["Abdul Haseeb","WordPress, AI & Social Media Marketing","abdul-haseeb.webp","abdul-haseeb"],
["Taimoor","Graphic Designer & Social Media Marketer","taimoor.webp","taimoor"],
["Hamza Farooq","Chief Executive Officer · WordPress & Marketing","hamza.webp","hamza-farooq"],
["Abdullah","Team Member","abdullah.webp","abdullah"],
["Sohail","WordPress, Quranic Teaching & Social Media Marketing","sohail.webp","sohail"]];
function render(){
 const album=document.getElementById("wnTeamAlbum");if(!album||document.getElementById("wnMemberDirectory"))return;
 const section=document.createElement("section");section.className="wn-member-directory";section.id="wnMemberDirectory";
 section.setAttribute("aria-labelledby","wnMemberDirectoryTitle");
 section.innerHTML='<div class="wn-member-intro"><div><span class="wn-member-eyebrow">Meet our people</span><h2 id="wnMemberDirectoryTitle">Team profiles & portfolios</h2></div><p>Meet the people behind our work. Open a profile to explore their skills and available projects.</p></div>';
 const grid=document.createElement("div");grid.className="wn-member-grid";
 members.forEach((m,i)=>{
 const card=document.createElement("article");card.className="wn-member-card";
 const photo=document.createElement("div");photo.className="wn-member-photo";
 const img=document.createElement("img");img.src="/assets/team-album/"+m[2];img.alt=m[0]+" team portrait";img.loading="lazy";img.decoding="async";
 const number=document.createElement("span");number.className="wn-member-number";number.textContent=String(i+1).padStart(2,"0");
 photo.append(img,number);
 const info=document.createElement("div");info.className="wn-member-info";
 const h=document.createElement("h3");h.textContent=m[0];
 const role=document.createElement("p");role.className="wn-member-role";role.textContent=m[1];
 const buttons=document.createElement("div");buttons.className="wn-member-actions";
 const link=document.createElement("a");link.className="wn-member-link";link.textContent="View profile ↗";
 link.href="/team/profile/?member="+encodeURIComponent(m[3]);buttons.append(link);
 const portfolio=document.createElement("a");
 portfolio.href=(m[3]==="abdul-haseeb"||m[3]==="hamza-farooq")?"/"+m[3]+"/":"/team/profile/?member="+encodeURIComponent(m[3])+"#portfolio";
 portfolio.textContent="View portfolio ↗";
 portfolio.className="wn-member-link secondary";
 buttons.append(portfolio);
 info.append(h,role,buttons);card.append(photo,info);grid.append(card);
 });
 section.append(grid);album.insertAdjacentElement("afterend",section);
 // Both controls also appear on the original portrait carousel cards.
 const slides=[...album.querySelectorAll(".wn-album-card")];
 members.forEach((m,i)=>{
  const slide=slides[i];if(!slide)return;
  const caption=slide.querySelector(".wn-album-caption");if(!caption)return;
  let actions=caption.querySelector(".wn-album-member-actions");
  if(actions)return;
  actions=document.createElement("div");actions.className="wn-album-member-actions";
  const profile=document.createElement("a");profile.href="/team/profile/?member="+encodeURIComponent(m[3]);profile.textContent="View Profile";profile.className="wn-album-member-btn";
  const work=document.createElement("a");work.href=(m[3]==="abdul-haseeb"||m[3]==="hamza-farooq")?"/"+m[3]+"/":"/team/profile/?member="+encodeURIComponent(m[3])+"#portfolio";
  work.textContent="View Portfolio";work.className="wn-album-member-btn is-secondary";
  actions.append(profile,work);caption.append(actions);
 });
 
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});else render();
})();
