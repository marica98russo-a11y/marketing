const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('.nav-links');toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Chiudi menu':'Apri menu');menu.classList.toggle('open',open);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.click();toggle.focus();}});
const sectorLabels={weblab:'Weblab — digitale',eventlab:'Eventlab — eventi',businesslab:'Businesslab — corsi',orientamento:'Da definire insieme'};
const params=new URLSearchParams(location.search);const sector=params.get('lab');if(document.querySelector('#laboratorio')&&Object.hasOwn(sectorLabels,sector??''))document.querySelector('#laboratorio').value=sector;
function updateFields(form){const value=form.querySelector('[name=laboratorio]')?.value||form.dataset.lab;form.querySelectorAll('[data-for]').forEach(group=>{const show=group.dataset.for===value;group.hidden=!show;group.querySelectorAll('input,textarea,select').forEach(field=>field.disabled=!show);});}
const whatsappNumber='393493652160';
document.querySelectorAll('.brief').forEach(form=>{
 updateFields(form);
 form.querySelector('[name=laboratorio]')?.addEventListener('change',()=>updateFields(form));
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const values=new FormData(form);
  const lab=values.get('laboratorio')||form.dataset.lab;
  const labels={nome:'Nome',telefono:'Telefono',attivita:'Attività / professione',idea:'La mia idea',budget:'Budget indicativo',evento:'Tipo di evento',data:'Data indicativa',ospiti:'Numero di ospiti',citta:'Città',social:'Canali social',pubblico:'A chi vorrei insegnare'};
  const lines=['Ciao Marketing Lab!','Vorrei informazioni su: '+(sectorLabels[lab]||sectorLabels.orientamento),''];
  for(const [key,value] of values){if(labels[key] && String(value).trim())lines.push(labels[key]+': '+String(value).trim());}
  const message=lines.join('\n');
  const url='https://wa.me/'+whatsappNumber+'?text='+encodeURIComponent(message);
  const output=form.querySelector('.output');
  output.hidden=false;output.querySelector('textarea').value=message;
  let link=output.querySelector('.whatsapp-fallback');
  if(!link){link=document.createElement('a');link.className='pill primary whatsapp-fallback';link.target='_blank';link.rel='noopener noreferrer';link.textContent='Apri WhatsApp';output.prepend(link);}
  link.href=url;
  form.querySelector('.status').textContent='Messaggio pronto: premi Invia in WhatsApp per confermare. Se non si apre, usa il pulsante qui sotto.';
  window.open(url,'_blank','noopener,noreferrer');
 });
});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));const filter=button.dataset.filter;let count=0;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=filter!=='tutti'&&card.dataset.lab!==filter;if(!card.hidden)count++;});document.querySelector('#project-status').textContent=count+' esempi di progetto visibili';}));

// The photographic scene lights up once; existing text never moves.
const agencyScene=document.querySelector('.agency-scene');
if(agencyScene && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
 agencyScene.classList.add('scene-ready');
 const photo=agencyScene.querySelector('img');
 const startScene=()=>{
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){
    agencyScene.classList.add('scene-play');
    // Speed up the whole scene together, including every start delay.
    agencyScene.getAnimations({subtree:true}).forEach(animation=>animation.updatePlaybackRate(1.5));
    observer.disconnect();
   }
  },{threshold:.25});
  observer.observe(agencyScene);
 };
 if(photo.complete && photo.naturalWidth)startScene();
 else photo.addEventListener('load',startScene,{once:true});
 photo.addEventListener('error',()=>agencyScene.classList.remove('scene-ready'),{once:true});
}

// Decorative stickers sit in existing section padding and add no layout height.
if(!location.pathname.startsWith('/privacy') && !location.pathname.startsWith('/contatti')){
 const stickerArt=[
  '<path d="m43 8 9 18 20-7-7 21 19 9-19 9 7 21-20-7-9 18-9-18-20 7 7-21-19-9 19-9-7-21 20 7z" fill="#ff664e" stroke="white" stroke-width="4" stroke-linejoin="round"/><path class="sticker-detail" d="M43 28v27m-13-14h26" stroke="#ffdf54" stroke-width="4" stroke-linecap="round"/>',
  '<rect x="11" y="14" width="66" height="59" rx="13" fill="#24c8b4" stroke="white" stroke-width="3"/><path d="M23 60h42" stroke="#ffffffaa" stroke-width="3" stroke-linecap="round"/><g class="sticker-detail" fill="#163a84"><rect x="24" y="46" width="8" height="13" rx="2"/><rect x="38" y="37" width="8" height="22" rx="2" fill="#ffdf54"/><rect x="52" y="27" width="8" height="32" rx="2" fill="#ff664e"/></g><path d="m64 14 8-8m-3 20h10" stroke="#ff664e" stroke-width="3" stroke-linecap="round"/>',
  '<circle cx="44" cy="44" r="32" fill="#ffcf36" stroke="white" stroke-width="4"/><g class="sticker-detail"><path d="m31 22 2 43 12-12 11 17 9-6-11-17 16-3z" fill="#1449ee" stroke="white" stroke-width="3" stroke-linejoin="round"/></g><path d="M68 14v12m-6-6h12M15 58v10m-5-5h10" stroke="#ff664e" stroke-width="3" stroke-linecap="round"/>'
 ];
 const hosts=[...document.querySelectorAll('main section > .wrap')].filter(wrap=>wrap.querySelector('.head,.steps,.idea,h2.title')).slice(0,3);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const observer=!reduced && 'IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){
   const sticker=entry.target.querySelector('.section-sticker');
   sticker?.classList.remove('sticker-wait');sticker?.classList.add('sticker-active');observer.unobserve(entry.target);
  }});
 },{threshold:0,rootMargin:'0px 0px -40px 0px'}):null;
 hosts.forEach((host,index)=>{
  host.classList.add('sticker-host');
  const sticker=document.createElement('span');
  const isMethod=[...host.querySelectorAll('.eyebrow')].some(label=>label.textContent.toLowerCase().includes('metodo'));
  const artIndex=isMethod?1:index;
  sticker.className='section-sticker sticker-'+artIndex+(isMethod?' sticker-method':'')+(observer?' sticker-wait':'');
  sticker.setAttribute('aria-hidden','true');
  sticker.innerHTML='<svg viewBox="0 0 88 88" focusable="false">'+stickerArt[artIndex]+'</svg>';
  const heading=host.querySelector('h2');
  if(heading){
   const row=document.createElement('div');
   row.className='sticker-title-row';
   heading.before(row);row.append(heading,sticker);
  }else host.append(sticker);
  observer?.observe(host);
 });
}
