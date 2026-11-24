/* Remove the duplicate three-column Team directory.
   The original horizontal Team profiles layout is rendered by album.js. */
(function(){
  "use strict";
  function cleanup(){
    document.querySelectorAll("#wnMemberDirectory").forEach(node=>node.remove());
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",cleanup,{once:true});
  else cleanup();
})();
