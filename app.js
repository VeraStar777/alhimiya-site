(function(){
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG' || e.target.closest('.level__img')) e.preventDefault();
  });
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  const $ = (s,r=document)=>r.querySelector(s);
  const el = (html)=>{const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstElementChild};

  // LEVELS
  const levelsGrid = $('#levels-grid');
  (window.LEVELS||[]).forEach(l=>{
    const node = el(`
      <article class="level">
        <div class="level__img" style="background-image:url('${l.image}')"></div>
        <div class="level__body">
          <div class="level__stage">${l.stage}</div>
          <h3 class="level__title">${l.title}</h3>
          <p class="level__short">${l.short}</p>
          <p class="level__desc">${l.description}</p>
        </div>
      </article>`);
    node.addEventListener('click',()=>node.classList.toggle('is-open'));
    levelsGrid.appendChild(node);
  });

  // LAWS
  const lawsGrid = $('#laws-grid');
  (window.LAWS||[]).forEach(law=>{
    const imgHtml = law.image ? `<div class="law__img"><img src="${law.image}" alt=""></div>` : '';
    const node = el(`
      <article class="law">
        <div class="law__n">${String(law.n).padStart(2,'0')}</div>
        <h3 class="law__title">${law.title}</h3>
        <p class="law__slogan">${law.slogan}</p>
        <p class="law__text">${law.text}</p>
        ${imgHtml}
      </article>`);
    node.addEventListener('click',()=>node.classList.toggle('is-open'));
    lawsGrid.appendChild(node);
  });

  // FORMATS
  const fGrid = $('#formats-grid');
  (window.FORMATS||[]).forEach(f=>{
    const node = el(`
      <article class="format ${f.featured?'format--featured':''}">
        <div class="format__duration">${f.duration}</div>
        <h3 class="format__title">${f.title}</h3>
        <div class="format__price">${f.price}</div>
        <ul class="format__points">${f.points.map(p=>`<li>${p}</li>`).join('')}</ul>
        <a href="#cta" class="btn ${f.featured?'btn--gold':'btn--ghost'}">${f.cta}</a>
      </article>`);
    fGrid.appendChild(node);
  });

  // FAQ
  const faqList = $('#faq-list');
  (window.FAQ||[]).forEach(item=>{
    const node = el(`
      <div class="faq__item">
        <div class="faq__q">${item.q}</div>
        <div class="faq__a">${item.a}</div>
      </div>`);
    node.addEventListener('click',()=>node.classList.toggle('is-open'));
    faqList.appendChild(node);
  });

  // FORM → mailto
  const form = $('#cta-form');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const d = new FormData(form);
    const body = `Имя: ${d.get('name')}%0D%0AКонтакт: ${d.get('contact')}%0D%0AФормат: ${d.get('format')}%0D%0A%0D%0A${d.get('message')||''}`;
    window.location.href = `mailto:veva.v2020@gmail.com?subject=Заявка%20%C2%ABАлхимия%20личности%C2%BB&body=${body}`;
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const id = a.getAttribute('href');
      if(id.length>1 && document.querySelector(id)){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
})();
