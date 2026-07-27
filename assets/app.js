const header=document.querySelector('.site-header');
const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>20);
window.addEventListener('scroll',updateHeader);updateHeader();
document.getElementById('currentYear').textContent=new Date().getFullYear();
const dialogs={chooser:document.getElementById('chooserDialog'),buyer:document.getElementById('buyerDialog'),seller:document.getElementById('sellerDialog')};
function openDialog(name){Object.values(dialogs).forEach(d=>d?.open&&d.close());dialogs[name]?.showModal();document.body.classList.add('dialog-open')}
function closeDialogs(){Object.values(dialogs).forEach(d=>d?.open&&d.close());document.body.classList.remove('dialog-open')}
document.querySelectorAll('[data-open-form]').forEach(b=>b.addEventListener('click',()=>openDialog(b.dataset.openForm)));
document.querySelectorAll('[data-switch-form]').forEach(b=>b.addEventListener('click',()=>openDialog(b.dataset.switchForm)));
document.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',closeDialogs));
Object.values(dialogs).forEach(d=>{d?.addEventListener('click',e=>{if(e.target===d)closeDialogs()});d?.addEventListener('close',()=>document.body.classList.remove('dialog-open'))});
document.querySelectorAll('.multi-step-form').forEach(form=>{
  const type=form.dataset.formType; const steps=[...form.querySelectorAll('.form-step')]; let current=0;
  const next=form.querySelector('[data-next]'),prev=form.querySelector('[data-prev]'),submit=form.querySelector('.submit-button');
  function render(){steps.forEach((s,i)=>s.classList.toggle('active',i===current));prev.style.visibility=current===0?'hidden':'visible';next.style.display=current===steps.length-1?'none':'inline-flex';submit.style.display=current===steps.length-1?'inline-flex':'none';const pct=((current+1)/steps.length)*100;document.querySelector(`[data-progress="${type}"]`).style.width=`${pct}%`;document.querySelector(`[data-step-label="${type}"]`).textContent=`Paso ${current+1} de ${steps.length}`}
  function validStep(){const fields=[...steps[current].querySelectorAll('input,select,textarea')];for(const f of fields){if(!f.checkValidity()){f.reportValidity();return false}}return true}
  next.addEventListener('click',()=>{if(validStep()&&current<steps.length-1){current++;render()}});prev.addEventListener('click',()=>{if(current>0){current--;render()}});render();
});
