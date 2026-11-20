(()=>{
 const dialog=document.getElementById('art-dialog');
 const close=document.getElementById('close-art');
 const open=()=>{dialog.showModal();document.body.classList.add('art-open')};
 const shut=()=>dialog.close();
 document.getElementById('open-art').addEventListener('click',open);
 document.getElementById('enlarge-art').addEventListener('click',open);
 close.addEventListener('click',shut);
 dialog.addEventListener('click',e=>{if(e.target===dialog)shut()});
 dialog.addEventListener('close',()=>document.body.classList.remove('art-open'));
})();
