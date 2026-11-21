(()=>{
const links=[...document.querySelectorAll('.contents-nav a')];
links.forEach(link=>link.addEventListener('click',()=>{links.forEach(a=>a.removeAttribute('aria-current'));link.setAttribute('aria-current','location')}));
const dialog=document.getElementById('project-viewer'),image=document.getElementById('preview-image');
let opener=null;
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{
 opener=button;image.src=button.dataset.preview;image.alt=button.dataset.title+' design preview';
 document.getElementById('preview-title').textContent=button.dataset.title;
 document.getElementById('preview-description').textContent=button.dataset.description;
 dialog.showModal();document.body.classList.add('viewer-open');
}));
document.getElementById('preview-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');if(opener)opener.focus()});
})();
