/* Restore original carousel: photos, names and roles only. */
(function(){
"use strict";
function clean(){
 const root=document.getElementById("wnTeamAlbum");
 if(root){
  root.querySelectorAll(".wn-album-member-actions,.wn-team-inline-actions,.wn-haseeb-portfolio,.wn-album-member-btn").forEach(el=>el.remove());
  root.querySelectorAll(".wn-album-caption a,.wn-album-caption button").forEach(el=>{
   if(/view\s+(profile|portfolio)/i.test(el.textContent||""))el.remove();
  });
 }
 document.querySelectorAll("#wnMemberDirectory").forEach(el=>el.remove());
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",clean,{once:true});else clean();
})();
