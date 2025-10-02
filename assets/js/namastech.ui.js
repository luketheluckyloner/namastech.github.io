// /assets/js/namastech-ui.js
class NamastechHeader extends HTMLElement {
  connectedCallback() {
    const logo   = this.getAttribute('logo-src')   || '/assets/img/profile2.png';
    const video  = this.getAttribute('video-src')  || '/assets/banner.mp4';
    const poster = this.getAttribute('poster-src') || logo;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
<style>
:host{
  display:block;
  position:relative;            /* eleva el header sobre el resto */
  z-index:3000;
  --bg:#011019; --panel:#0b0b0b; --ink:#e8f7f7;
  --cyan:#00ffe7; --magenta:#ff00cc; --cyanDim:#00ffcc55;
}

*,*:before,*:after{ box-sizing:border-box }
a{ color:var(--cyan); text-decoration:none }
a:hover{ color:var(--magenta) }
ul,li{ margin:0; padding:0; list-style:none }
.container{ width:min(1100px,100% - 24px); margin:0 auto }

/* ===== TOP NAV ===== */
.topbar{
  position:sticky; top:0; z-index:3100;
  background:#000; border-bottom:1px solid var(--cyanDim);
}
.toprow{ display:flex; align-items:center; justify-content:center; gap:16px; padding:10px 0 }
.menu-toggle{
  display:none; margin-left:auto; background:#000; color:var(--cyan);
  border:1px solid var(--cyanDim); border-radius:10px; padding:8px 12px; font-weight:800;
}
nav.primary{
  display:flex; gap:26px; align-items:center; justify-content:center; flex-wrap:wrap;
  padding:6px 0 10px;
}
nav.primary a{
  color:var(--cyan); text-transform:uppercase; letter-spacing:.04em; font-weight:800;
}
nav.primary a:hover{ color:var(--magenta); text-shadow:0 0 6px var(--magenta) }

/* ===== BANNER ===== */
.banner{ position:relative; width:100%; overflow:hidden; background:#000; height:clamp(160px,28vw,260px) }
.banner video{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.6 }
.overlay{
  position:relative; z-index:1; display:grid; place-items:center; gap:8px;
  text-align:center; padding:24px 0;
}
.overlay img{ max-height:90px; width:auto; opacity:.75; filter:drop-shadow(0 0 10px var(--cyan)) }
.overlay h1{
  margin:0; color:var(--cyan); text-shadow:0 0 12px rgba(0,255,200,.8);
  letter-spacing:.02em; font-size:clamp(16px,4.5vw,22px);
}

/* ===== CYBER BAR ===== */
.cyberbar{
  background:#000; border-top:2px solid var(--cyan); border-bottom:2px solid var(--cyan);
  box-shadow:0 0 15px var(--cyan); position:relative; z-index:3200;
}
.cb-wrap{ display:flex; align-items:center; justify-content:center; gap:40px; padding:10px 6px }
.cb-link, .cb-btn{
  color:var(--cyan); font-weight:800; text-transform:uppercase;
  text-shadow:0 0 8px var(--cyan); background:none; border:none; cursor:pointer; font:inherit;
}
.cb-link:hover, .cb-btn:hover{ color:var(--magenta); text-shadow:0 0 10px var(--magenta) }

.cb-drop{ position:relative }
.cb-menu{
  position:absolute; top:calc(100% + 10px); left:50%; transform:translateX(-50%);
  background:#0b0b0b; border:2px solid var(--cyan); border-radius:10px;
  box-shadow:0 0 16px var(--cyan); padding:10px; display:none;
  min-width:260px; max-height:70vh; overflow:auto; z-index:10050;
}
.cb-menu a{ display:block; padding:8px 10px; white-space:nowrap }
.cb-menu a:hover{ background:#07151a }

.cb-drop:hover .cb-menu,
.cb-drop:focus-within .cb-menu,
.cb-drop.open .cb-menu{ display:block }

/* Tooltip */
.cb-tip{
  position:absolute; left:50%; transform:translateX(-50%); top:calc(100% + 8px);
  background:#0c0c0c; color:#ddd; border:2px solid var(--cyan); border-radius:8px;
  padding:10px 12px; white-space:nowrap; display:none; z-index:10050;
}
.cb-drop.tip:hover .cb-tip,
.cb-drop.tip:focus-within .cb-tip{ display:block }

/* ===== MOBILE ===== */
@media (max-width:860px){
  .menu-toggle{ display:inline-flex }
  nav.primary{ display:none; width:100% }
  nav.primary.open{ display:grid; grid-template-columns:1fr; gap:10px; padding:8px 0 }
  nav.primary a{ padding:10px 12px; text-align:center }

  .cb-wrap{
    justify-content:flex-start; gap:12px; overflow-x:auto; padding:10px 10px;
    scroll-snap-type:x mandatory;
  }
  .cb-wrap::-webkit-scrollbar{ display:none }
  .cb-link, .cb-btn{
    border:1px solid var(--cyanDim); border-radius:999px; padding:10px 14px;
    scroll-snap-align:center; line-height:1.15; white-space:normal; /* evita cortes de texto */
  }

  /* El menú del dropdown se vuelve fijo y full-width (se ajusta por JS) */
  .cb-menu{
    position:fixed; left:12px; right:12px;
    transform:none; min-width:auto; max-height:70vh; overflow:auto;
  }
}
</style>

<div class="topbar">
  <div class="container toprow">
    <button class="menu-toggle" aria-expanded="false" aria-controls="pri">☰ MENÚ</button>
  </div>
  <div class="container">
    <nav id="pri" class="primary" role="navigation" aria-label="Principal">
      <a href="/index.html">INICIO</a>
      <a href="/cursos.html">CURSOS</a>
      <a href="/envios.html">ENVÍOS</a>
      <a href="/about.html">QUIENES SOMOS</a>
      <a href="/contacto.html">CONTÁCTANOS</a>
    </nav>
  </div>
</div>

<div class="banner">
  <video autoplay muted loop playsinline poster="${poster}">
    <source src="${video}" type="video/mp4" />
  </video>
  <div class="overlay container">
    <img src="${logo}" alt="Namastech">
    <h1>Namastech: Ciberseguridad, gadgets y hardware al alcance de tu mano.</h1>
  </div>
</div>

<div class="cyberbar">
  <div class="container cb-wrap">
    <!-- PRODUCTOS -->
    <div class="cb-drop" id="cbProductos">
      <button class="cb-btn" type="button" aria-haspopup="true" aria-expanded="false">PRODUCTOS ▾</button>
      <div class="cb-menu" role="menu" aria-label="Lista de productos">
        <a href="/catnugget.html">HakCat WiFi Nugget</a>
        <a href="/flipper.html">Flipper Zero</a>
        <a href="/pineapple.html">WiFi Pineapple Mark VII</a>
        <a href="/pineappletetra.html">WiFi Pineapple TETRA</a>
        <a href="/cydmarauder.html">CYD-WiFi Marauder</a>
        <a href="/m5stick.html">M5StickC PLUS 2</a>
        <a href="/ducky.html">USB Rubber Ducky</a>
        <a href="/watch.html">DSTIKE Deauther Watch X</a>
        <a href="/evilcrow.html">EvilCrow RF V2</a>
        <!-- nuevos -->
        <a href="/irblaster.html">IR Blaster</a>
        <a href="/kiisuu.html">Kiisuu V4B</a>
        <a href="/proxmark.html">Proxmark Clonador Tarjetas</a>
        <a href="/esp32div.html">Desautenticador Armageddon</a>
        <a href="/luck.html">Consola Luck X616 PRO</a>
        <!-- cierre -->
        <a href="/productos.html"><strong>Ver más…</strong></a>
      </div>
    </div>

    <a class="cb-link" href="/cursos.html">Cursos</a>

    <div class="cb-drop tip">
      <button class="cb-btn" type="button" aria-haspopup="true" aria-expanded="false">Caja-Hacker Mensual ▾</button>
      <div class="cb-tip">Próximamente</div>
    </div>

    <a class="cb-link" href="/certificaciones.html">Certificaciones</a>
  </div>
</div>
    `;

    // === Interacciones ===
    const hostEl = this;
    const btn = shadow.querySelector('.menu-toggle');
    const nav = shadow.querySelector('nav.primary');
    btn?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });

    const prodDrop = shadow.getElementById('cbProductos');
    const prodBtn  = prodDrop?.querySelector('.cb-btn');
    const prodMenu = prodDrop?.querySelector('.cb-menu');

    // Abrir/cerrar en móvil con posicionamiento fijo
    const placeMenuMobile = () => {
      if (!prodBtn || !prodMenu) return;
      if (!matchMedia('(max-width:860px)').matches) {
        // desktop: limpiar estilos inline
        prodMenu.style.top = '';
        prodMenu.style.left = '';
        prodMenu.style.right = '';
        return;
      }
      const r = prodBtn.getBoundingClientRect();
      prodMenu.style.top = `${Math.round(r.bottom + 8)}px`;
      prodMenu.style.left = '12px';
      prodMenu.style.right = '12px';
    };

    prodBtn?.addEventListener('click', (e) => {
      if (matchMedia('(max-width:860px)').matches) {
        e.preventDefault();
        const open = !prodDrop.classList.contains('open');
        prodDrop.classList.toggle('open', open);
        prodBtn.setAttribute('aria-expanded', String(open));
        if (open) placeMenuMobile();
      }
    });

    // Reposicionar al hacer scroll/resize (solo móvil)
    window.addEventListener('scroll', () => {
      if (prodDrop?.classList.contains('open') && matchMedia('(max-width:860px)').matches) {
        placeMenuMobile();
      }
    }, { passive:true });

    window.addEventListener('resize', () => {
      if (prodDrop?.classList.contains('open')) placeMenuMobile();
    });

    // Cerrar si se hace click fuera
    document.addEventListener('click', (ev) => {
      if (!matchMedia('(max-width:860px)').matches) return;
      const insideHeader = hostEl.contains(ev.target);
      // Si el click no fue sobre el dropdown productos, cerramos
      if (!insideHeader || (insideHeader && prodDrop && !prodDrop.contains(ev.target))) {
        prodDrop?.classList.remove('open');
        prodBtn?.setAttribute('aria-expanded','false');
      }
    });
  }
}

class NamastechFooter extends HTMLElement {
  connectedCallback() {
    const map = this.getAttribute('map-src') || '';
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
<style>
:host{ display:block }
footer{ background:#0b0b0b; color:var(--ink); border-top:2px solid var(--cyan); padding:28px 0 }
.container{ width:min(1100px,100% - 24px); margin:0 auto }
.cols{ display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:16px }
h4{ margin:0 0 10px; color:var(--cyan); text-shadow:0 0 6px #00ffcc88 }
a{ color:#ccc } a:hover{ color:var(--magenta) }
.map{ margin-top:16px; border:2px solid #00ffcc44; border-radius:10px; overflow:hidden; box-shadow:0 0 15px #00ffcc22 }
.copy{ text-align:center; margin-top:12px; color:#93a1a1; font-size:.9rem }
</style>

<footer>
  <div class="container">
    <div class="cols">
      <div>
        <h4>QUIÉNES SOMOS</h4>
        <p>En <strong>Namastech</strong> acercamos la ciberseguridad, gadgets y hardware al alcance de todos, combinando innovación con aprendizaje.</p>
      </div>
      <div>
        <h4>CONTÁCTANOS</h4>
        <p><a href="/contacto.html">📧 contacto@namastech.studio</a></p>
        <p>📱 +56 9 3558 4876</p>
      </div>
      <div>
        <h4>PRODUCTOS</h4>
        <p><a href="/productos.html">Ver todos los productos</a></p>
      </div>
    </div>
    ${map ? `<div class="map"><iframe src="${map}" width="100%" height="300" style="border:0" loading="lazy" allowfullscreen=""></iframe></div>` : ''}
    <div class="copy">© 2025 Namastech. Todos los derechos reservados.</div>
  </div>
</footer>
    `;
  }
}

customElements.define('namastech-header', NamastechHeader);
customElements.define('namastech-footer', NamastechFooter);
