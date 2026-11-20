/* Native anchor navigation remains usable with JavaScript disabled. */
(()=>{
 const links=[...document.querySelectorAll('.contents-nav a')];
 links.forEach(link=>link.addEventListener('click',()=>{
  links.forEach(item=>item.removeAttribute('aria-current'));
  link.setAttribute('aria-current','location');
 }));
})();
