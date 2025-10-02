// Blog rotator logic (autoplay ~10s, pause on hover, swipe on touch)
const DURATION_MS = 10000;

function initRotator(root){
  const frame = root.querySelector('.blog-frame');
  const track = frame.querySelector('.blog-track');
  const slides = Array.from(frame.querySelectorAll('.blog-slide'));
  const prevBtn = frame.querySelector('.blog-nav.prev');
  const nextBtn = frame.querySelector('.blog-nav.next');
  const dotsWrap = frame.querySelector('.blog-dots');
  if(!frame || slides.length === 0) return;

  let i = 0, auto, hovering = false, touching = false;
  const N = slides.length;

  // Dots
  slides.forEach((_, idx)=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Ir al artículo ${idx+1}`);
    b.addEventListener('click', ()=>goTo(idx, true));
    dotsWrap.appendChild(b);
  });

  function update(){
    track.style.transform = `translateX(${-i*100}%)`;
    Array.from(dotsWrap.children).forEach((d, k)=>{
      d.setAttribute('aria-current', k===i ? 'true' : 'false');
    });
  }
  function goNext(manual=false){ i = (i+1)%N; update(); if(manual) restart(); }
  function goPrev(manual=false){ i = (i-1+N)%N; update(); if(manual) restart(); }
  function goTo(k, manual=false){ i = (k+N)%N; update(); if(manual) restart(); }
  function start(){ clearInterval(auto); auto = setInterval(()=>{ if(!hovering && !touching) goNext(); }, DURATION_MS); }
  function restart(){ clearInterval(auto); start(); }

  // Hover pause
  frame.addEventListener('mouseenter', ()=>{ hovering = true; });
  frame.addEventListener('mouseleave', ()=>{ hovering = false; });

  // Touch swipe
  let x0 = null;
  frame.addEventListener('touchstart', e=>{ touching = true; x0 = e.touches[0].clientX; }, {passive:true});
  frame.addEventListener('touchmove', e=>{
    if(x0 == null) return;
    const dx = e.touches[0].clientX - x0;
    if(Math.abs(dx) > 40){ dx>0 ? goPrev(true) : goNext(true); x0 = null; }
  }, {passive:true});
  frame.addEventListener('touchend', ()=>{ touching = false; x0 = null; });

  // Buttons
  prevBtn?.addEventListener('click', ()=>goPrev(true));
  nextBtn?.addEventListener('click', ()=>goNext(true));

  // Pause autoplay if not visible
  const io = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting) start(); else clearInterval(auto);
  }, {threshold:.25});
  io.observe(frame);

  update(); start();
}

// Init all rotators on page (safe if none)
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.blog-rotator').forEach(initRotator);
});
