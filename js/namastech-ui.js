// /assets/js/namastech-ui.js  (ES Module)

// Ensure Orbitron is available once
(() => {
  if (!document.querySelector('link[data-namastech-font]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap';
    l.setAttribute('data-namastech-font', '1');
    document.head.appendChild(l);
  }
})();

const styles = `
:host { --bg:#011019; --panel:#000; --ink:#e8f7f7; --muted:#b9c7c7; --cyan:#00ffe7; --cyan2:#00ffcc; --magenta:#ff00cc; font-family:'Orbitron', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color:var(--ink); display:block; }
* { box-sizing:border-box; }
a { color:var(--cyan); text-decoration:none; }
a:hover { color:var(--magenta); }

/* container */
.container { width:min(1200px, 100% - 2rem); margin:0 auto; }

/* TOP BAR */
.topbar { background:#000; border-bottom:2px solid #00ffcc55; position:sticky; top:0; z-index:999; }
.topbar .row { display:flex; gap:1.1rem; align-items:center; justify-content:center; padding:.8rem 0; }
.topbar a { text-transform:uppercase; font-weight:700; letter-spacing:.04em; position:relative; padding:.2rem .4rem; }

/* Dropdown base */
.dropdown { position:relative; }
.dropdown > a::after { content:" ▾"; font-size:.85em; opacity:.9; }

/* The menu */
.menu {
  position:absolute; left:50%; transform:translate(-50%, 0);
  top:100%; /* no gap */
  min-width:280px; max-height:70vh; overflow:auto;
  background:#0c0c0c; border:2px solid var(--cyan2); border-radius:12px;
  box-shadow:0 0 25px rgba(0,255,231,.45);
  opacity:0; visibility:hidden; pointer-events:none;
  transition:opacity .15s ease, transform .15s ease;
}
.menu a { display:block; padding:.7rem .9rem; white-space:nowrap; color:#dfe; border-bottom:1px solid #0c3a37; }
.menu a:last-child { border-bottom:none; }
.menu a:hover { background:#011f2b; color:var(--magenta); }

/* Keep open on hover and when JS adds .open */
.dropdown:hover .menu,
.dropdown.open .menu { opacity:1; visibility:visible; pointer-events:auto; }

/* Hover bridge to prevent flicker when moving from trigger to menu */
.dropdown::after {
  content:"";
  position:absolute;
  left:-10px; right:-10px;
  top:100%;
  height:16px;
}

/* Banner */
.banner { position:relative; width:100%; background:#000; overflow:hidden; }
.banner video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.6; z-index:1; }
.banner .overlay { position:relative; z-index:2; display:grid; place-items:center; text-align:center; padding:18px 0; }
.logo { max-height:110px; filter:drop-shadow(0 0 10px var(--cyan2)); opacity:.75; }
.slogan { margin:.25rem 0 0; font-weight:700; color:var(--cyan2); text-shadow:0 0 12px rgba(0,255,200,.8); letter-spacing:.04em; font-size:clamp(1rem,3.3vw,1.6rem); }
.banner.spaced { aspect-ratio:16/9; max-height:420px; min-height:220px; }

/* Cyber Bar */
.cyberbar { background:#000; border-top:2px solid var(--cyan2); border-bottom:2px solid var(--cyan2); box-shadow:0 0 15px var(--cyan2); }
.cyberbar .row { display:flex; gap:clamp(18px, 6vw, 80px); justify-content:center; align-items:center; padding:.55rem 0; }
.cyberbar a { font-weight:700; text-transform:uppercase; text-shadow:0 0 8px var(--cyan2); }
.cyberbar a:hover { color:var(--magenta); text-shadow:0 0 10px var(--magenta); }

/* Small dropdown for HackBox */
.dropdown.small .menu { min-width:190px; }
.note { display:block; padding:.7rem .9rem; color:#ccc; }

/* Footer */
footer { background:#0b0b0b; color:var(--cyan2); border-top:2px solid #00ffcc55; padding:2rem 0 1.5rem; }
.footer-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:1rem; }
footer h4 { margin:0 0 .6rem; text-shadow:0 0 6px #00ffcc88; }
footer p, footer a { color:#ccc; font-size:.95rem; }
footer a:hover { color:var(--magenta); }

@media (max-width: 820px) {
  .topbar .row { flex-wrap:wrap; }
}
`;

const productsList = [
  { href:'/catnugget.html', label:'HakCat WiFi Nugget' },
  { href:'/flipper.html', label:'Flipper Zero' },
  { href:'/pineapple.html', label:'WiFi Pineapple Mark VII' },
  { href:'/cydmarauder.html', label:'CYD-WiFi Marauder' },
  { href:'/m5stick.html', label:'M5StickC PLUS 2' },
  { href:'/ducky.html', label:'USB Rubber Ducky' },
  { href:'/watch.html', label:'DSTIKE Deauther Watch X' },
  { href:'/evilcrow.html', label:'EvilCrow RF V2' },
  { href:'/productos.html', label:'Ver más…' },
];

class NamastechHeader extends HTMLElement {
  constructor(){ super(); this.attachShadow({mode:'open'}); }
  connectedCallback(){ this.render(); this.wireDropdowns(); }

  render(){
    const productLinks = productsList.map(p=>`<a href="${p.href}">${p.label}</a>`).join("");
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <header>
        <div class="topbar">
          <div class="container row">
            <a href="/index.html">INICIO</a>

            <div class="dropdown" id="products-dd">
              <a href="/productos.html" data-slug="productos" aria-haspopup="true" aria-expanded="false">PRODUCTOS</a>
              <div class="menu" role="menu" aria-label="Productos">${productLinks}</div>
            </div>

            <a href="/cursos.html">CURSOS</a>
            <a href="/envios.html">ENVÍOS</a>
            <a href="/about.html">QUIENES SOMOS</a>
            <a href="/contacto.html">CONTÁCTANOS</a>
          </div>
        </div>

        <div class="banner spaced">
          <video autoplay muted loop playsinline>
            <source src="/assets/banner.mp4" type="video/mp4">
          </video>
          <div class="overlay container">
            <img class="logo" src="/assets/img/profile2.png" alt="Namastech Logo"/>
            <p class="slogan">Namastech: Ciberseguridad, gadgets y hardware al alcance de tu mano.</p>
          </div>
        </div>

        <div class="cyberbar">
          <div class="container row">
            <a href="/cursos.html">CURSOS</a>

            <div class="dropdown small" id="hackbox-dd">
              <a href="#" aria-haspopup="true" aria-expanded="false">CAJA-HACKER MENSUAL</a>
              <div class="menu" role="menu"><span class="note">Próximamente</span></div>
            </div>

            <a href="/certificaciones.html">CERTIFICACIONES</a>
          </div>
        </div>
      </header>
    `;
  }

  wireDropdowns(){
    const dd = this.shadowRoot.getElementById('products-dd');
    if (dd){
      let closeTimer;
      const trigger = dd.querySelector('a[data-slug="productos"]');
      const setOpen = (state) => {
        clearTimeout(closeTimer);
        dd.classList.toggle('open', state);
        trigger.setAttribute('aria-expanded', String(state));
      };
      dd.addEventListener('mouseenter', () => setOpen(true));
      dd.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(() => dd.classList.remove('open'), 180);
        trigger.setAttribute('aria-expanded','false');
      });
      trigger.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault();
          setOpen(!dd.classList.contains('open'));
        }
      });
    }

    const hb = this.shadowRoot.getElementById('hackbox-dd');
    if (hb){
      let t;
      const open = (s)=>{ clearTimeout(t); hb.classList.toggle('open', s); hb.querySelector('a').setAttribute('aria-expanded', String(s)); };
      hb.addEventListener('mouseenter', ()=>open(true));
      hb.addEventListener('mouseleave', ()=>{ t = setTimeout(()=>hb.classList.remove('open'), 180); hb.querySelector('a').setAttribute('aria-expanded','false'); });
      hb.querySelector('a').addEventListener('click', (e)=>{ e.preventDefault(); open(!hb.classList.contains('open')); });
    }
  }
}

class NamastechFooter extends HTMLElement {
  constructor(){ super(); this.attachShadow({mode:'open'}); }
  connectedCallback(){ this.render(); }
  render(){
    const mapSrc = this.getAttribute('map-src') || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.4567116433087!2d-70.64848092350427!3d-33.437109495057404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a64024a7af%3A0x4d0773f9d3a4fe0!2sEnrique%20Mac%20Iver%20412%2C%20Santiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1693939542335!5m2!1ses!2scl';
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <footer>
        <div class="container footer-grid">
          <div>
            <h4>QUIÉNES SOMOS</h4>
            <p>En Namastech acercamos la ciberseguridad, gadgets y hardware al alcance de todos, combinando innovación con aprendizaje.</p>
          </div>
          <div>
            <h4>CONTÁCTANOS</h4>
            <p><a href="/contacto.html">📧 contacto@namastech.studio</a></p>
            <p>📱 +56 9 3558 4876</p>
          </div>
          <div>
            <h4>UBICACIÓN</h4>
            <div style="border:2px solid #00ffcc44;border-radius:10px;overflow:hidden;box-shadow:0 0 15px #00ffcc22;">
              <iframe src="${mapSrc}" width="100%" height="210" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <div class="container" style="text-align:center; margin-top:1rem; color:#93a1a1; font-size:.9rem;">
          © ${new Date().getFullYear()} Namastech. Todos los derechos reservados.
        </div>
      </footer>
    `;
  }
}

customElements.define('namastech-header', NamastechHeader);
customElements.define('namastech-footer', NamastechFooter);
