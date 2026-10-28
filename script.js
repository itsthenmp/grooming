const bar=document.querySelector('.progress'),reduced=matchMedia('(prefers-reduced-motion: reduce)');let queued=false;function update(){queued=false;const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max?scrollY/max:0})`;if(!reduced.matches){document.querySelectorAll('.content-section').forEach(section=>{const r=section.getBoundingClientRect();section.classList.toggle('revealed',r.top<innerHeight*.9)});const title=document.querySelector('h1');title.style.transform=`translateY(${Math.min(scrollY*.18,150)}px)`;title.style.opacity=Math.max(.1,1-scrollY/innerHeight)}}function queue(){if(!queued){queued=true;requestAnimationFrame(update)}}addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduced.addEventListener('change',()=>{document.querySelector('h1').style.transform='none';document.querySelector('h1').style.opacity='1';update()});document.querySelectorAll('.comparison input').forEach(input=>input.addEventListener('input',()=>{input.parentElement.style.setProperty('--split',input.value+'%');input.setAttribute('aria-valuetext',input.value+' percent before photo')}));update();
const hero=document.querySelector('.intro'),heroMedia=document.querySelector('.hero-media');let spotFrame=0,spotX=0,spotY=0;function moveSpot(event){if(reduced.matches)return;const rect=hero.getBoundingClientRect();spotX=event.clientX-rect.left;spotY=event.clientY-rect.top;if(!spotFrame)spotFrame=requestAnimationFrame(()=>{heroMedia.style.setProperty('--spot-x',spotX+'px');heroMedia.style.setProperty('--spot-y',spotY+'px');spotFrame=0})}hero.addEventListener('pointermove',moveSpot,{passive:true});hero.addEventListener('pointerdown',moveSpot,{passive:true});hero.addEventListener('pointerleave',()=>{if(spotFrame){cancelAnimationFrame(spotFrame);spotFrame=0}heroMedia.style.removeProperty('--spot-x');heroMedia.style.removeProperty('--spot-y')});reduced.addEventListener('change',()=>{if(reduced.matches){if(spotFrame)cancelAnimationFrame(spotFrame);spotFrame=0;heroMedia.style.removeProperty('--spot-x');heroMedia.style.removeProperty('--spot-y')}});
const galleryGrid=document.querySelector('.gallery-grid');
if(galleryGrid){
  const cards=[...galleryGrid.children];
  for(let i=cards.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [cards[i],cards[j]]=[cards[j],cards[i]];
  }
  galleryGrid.replaceChildren(...cards);
}
const photos=[...document.querySelectorAll('.photo-link')];
const lightbox=document.querySelector('.lightbox');
const fullImage=lightbox.querySelector('img');
const caption=lightbox.querySelector('figcaption');
const ageGate=document.querySelector('.age-gate');
const birthDate=ageGate.querySelector('#birth-date');
const ageError=ageGate.querySelector('.age-error');
let currentPhoto=0;
let pendingPhoto=null;
let ageVerified=false;
function showPhoto(index){
  currentPhoto=(index+photos.length)%photos.length;
  const photo=photos[currentPhoto];
  fullImage.src=photo.href;
  fullImage.alt=photo.querySelector('img').alt;
  caption.textContent=`${currentPhoto+1} / ${photos.length}`;
  if(!lightbox.open)lightbox.showModal();
}
function openPhoto(index){
  const target=(index+photos.length)%photos.length;
  if(photos[target].hasAttribute('data-age-restricted')&&!ageVerified){
    pendingPhoto=target;
    ageError.hidden=true;
    birthDate.value='';
    ageGate.showModal();
    birthDate.focus();
    return;
  }
  showPhoto(target);
}
photos.forEach((photo,index)=>photo.addEventListener('click',event=>{
  event.preventDefault();
  openPhoto(index);
}));
ageGate.querySelector('form').addEventListener('submit',event=>{
  event.preventDefault();
  const parts=birthDate.value.split('-').map(Number);
  const birth=new Date(parts[0],parts[1]-1,parts[2]);
  const today=new Date();
  const valid=parts.length===3&&parts.every(Number.isInteger)&&
    birth.getFullYear()===parts[0]&&birth.getMonth()===parts[1]-1&&
    birth.getDate()===parts[2]&&birth<=today;
  let age=valid?today.getFullYear()-parts[0]:0;
  if(valid&&(today.getMonth()<parts[1]-1||
    (today.getMonth()===parts[1]-1&&today.getDate()<parts[2])))age--;
  if(!valid||age<18){
    ageError.textContent=valid?'You must be at least 18 to view this photo.':'Enter a valid date of birth.';
    ageError.hidden=false;
    return;
  }
  ageVerified=true;
  document.body.classList.add('age-verified');
  const target=pendingPhoto;
  pendingPhoto=null;
  ageGate.close();
  if(target!==null)showPhoto(target);
});
ageGate.querySelector('.age-cancel').addEventListener('click',()=>ageGate.close());
ageGate.addEventListener('close',()=>{pendingPhoto=null});
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>openPhoto(currentPhoto-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>openPhoto(currentPhoto+1));
lightbox.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'){event.preventDefault();openPhoto(currentPhoto+1)}
  if(event.key==='ArrowLeft'){event.preventDefault();openPhoto(currentPhoto-1)}
});
let swipeStart=null;
fullImage.addEventListener('pointerdown',event=>{
  if(event.pointerType==='touch')swipeStart=event.clientX
},{passive:true});
fullImage.addEventListener('pointerup',event=>{
  if(swipeStart!==null&&Math.abs(event.clientX-swipeStart)>50)
    openPhoto(currentPhoto+(event.clientX<swipeStart?1:-1));
  swipeStart=null
},{passive:true});
fullImage.addEventListener('pointercancel',()=>swipeStart=null);
lightbox.addEventListener('close',()=>photos[currentPhoto].focus({preventScroll:true}));
const curtainGallery=document.querySelector('.gallery');if(curtainGallery&&!reduced.matches){curtainGallery.classList.add('curtain-ready');let curtainOpened=false;function openCurtains(){if(curtainOpened)return;curtainOpened=true;curtainGallery.classList.add('curtain-open');setTimeout(()=>curtainGallery.classList.add('curtain-finished'),3300)}const curtainObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){openCurtains();curtainObserver.disconnect()}},{rootMargin:'0px 0px -15% 0px',threshold:0});curtainObserver.observe(curtainGallery);curtainGallery.addEventListener('focusin',openCurtains);reduced.addEventListener('change',()=>{if(reduced.matches){openCurtains();curtainObserver.disconnect();curtainGallery.classList.add('curtain-finished')}})}
// Type every heading once while preserving its line breaks and emphasis.
const headingCleanups=[];if(!reduced.matches){document.querySelectorAll('main h1,main h2,main h3').forEach(heading=>{const original=heading.innerHTML;heading.setAttribute('aria-label',heading.innerText.replace(/\s+/g,' ').trim());const layout=document.createElement('span');layout.className='typing-layout';layout.setAttribute('aria-hidden','true');layout.innerHTML=original;const output=document.createElement('span');output.className='typing-output';output.setAttribute('aria-hidden','true');output.innerHTML=original;heading.replaceChildren(layout,output);heading.classList.add('typing-heading');const walker=document.createTreeWalker(output,NodeFilter.SHOW_TEXT);const nodes=[];let node;while(node=walker.nextNode()){nodes.push({node,text:node.textContent});node.textContent=''}const length=nodes.reduce((sum,x)=>sum+x.text.length,0);let count=0,timer=0,done=false;function finish(){clearTimeout(timer);heading.innerHTML=original;heading.classList.remove('typing-heading','is-typing');done=true}function tick(){if(done)return;count++;let remaining=count;nodes.forEach(x=>{x.node.textContent=x.text.slice(0,Math.max(0,remaining));remaining-=x.text.length});if(count<length)timer=setTimeout(tick,Math.min(60,1500/Math.max(1,length)));else heading.classList.remove('is-typing')}const watch=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){watch.disconnect();heading.classList.add('is-typing');tick()}},{threshold:.25});watch.observe(heading);headingCleanups.push(()=>{watch.disconnect();finish()})})}reduced.addEventListener('change',()=>{if(reduced.matches)headingCleanups.forEach(fn=>fn())});
const strip=document.querySelector('.creator-strip');document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;strip.querySelectorAll('.creator-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.look!==filter;if(!card.hidden)count++});strip.scrollTo({left:0,behavior:'instant'});document.querySelector('.portfolio-count').textContent=count+' photographs'}));document.querySelectorAll('.portfolio-arrows button').forEach((button,i)=>button.addEventListener('click',()=>strip.scrollBy({left:strip.clientWidth*.85*(i?1:-1),behavior:reduced.matches?'instant':'smooth'})));const brandStrip=document.querySelector('.brand-slider');document.querySelector('.brand-prev').addEventListener('click',()=>brandStrip.scrollBy({left:-250,behavior:'smooth'}));document.querySelector('.brand-next').addEventListener('click',()=>brandStrip.scrollBy({left:250,behavior:'smooth'}));let brandHovered=false;brandStrip.addEventListener('pointerenter',()=>brandHovered=true);brandStrip.addEventListener('pointerleave',()=>brandHovered=false);setInterval(()=>{if(!reduced.matches&&!brandHovered&&!brandStrip.contains(document.activeElement)){const r=brandStrip.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)brandStrip.scrollTo({left:brandStrip.scrollLeft+brandStrip.clientWidth>=brandStrip.scrollWidth-5?0:brandStrip.scrollLeft+250,behavior:'smooth'})}},4500);const music=document.querySelector('#background-music'),musicButton=document.querySelector('.music-toggle');music.volume=.16;musicButton.addEventListener('click',async()=>{if(music.paused){try{await music.play();musicButton.setAttribute('aria-pressed','true');musicButton.setAttribute('aria-label','Pause background music');musicButton.querySelector('span').textContent='Music on'}catch{musicButton.querySelector('span').textContent='Tap to retry'}}else{music.pause();musicButton.setAttribute('aria-pressed','false');musicButton.setAttribute('aria-label','Play background music');musicButton.querySelector('span').textContent='Music off'}});
