(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('intro-pending');

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', `${location.pathname}${location.search}`);
  const resetToHero = () => scrollTo(0, 0);
  resetToHero();
  addEventListener('pageshow', () => {
    resetToHero();
    requestAnimationFrame(resetToHero);
  });

  const boot = document.querySelector('#boot');
  const bootBox = document.querySelector('#bootLines');
  const bootLines = [
    ['jhow@dev:~$ ./init.sh', ''], ['carregando domínio........... ok', 'ok'],
    ['conectando ao banco.......... ok', 'ok'], ['aplicando migrations......... ok', 'ok'],
    ['servidor pronto na porta 3000', 'ok'], ['bem-vindo.', 'dim']
  ];
  const finishBoot = () => {
    document.body.style.overflow = '';
    boot.classList.add('done');
    setTimeout(() => {
      document.body.classList.remove('intro-pending');
      document.body.classList.add('hero-ready');
    }, reduce ? 0 : 320);
    setTimeout(() => { boot.style.display = 'none'; }, 700);
  };
  if (reduce) {
    bootBox.innerHTML = bootLines.map(([text, cls]) => `<span class="${cls}">${text}</span>`).join('\n');
    setTimeout(finishBoot, 650);
  } else {
    document.body.style.overflow = 'hidden';
    let line = 0, char = 0, html = '';
    const typeBoot = () => {
      if (line >= bootLines.length) return setTimeout(finishBoot, 650);
      const [text, cls] = bootLines[line];
      if (!char) html += `<span class="${cls}">`;
      if (char < text.length) {
        html += text[char++]; bootBox.innerHTML = `${html}</span><span id="bootCaret"></span>`;
        setTimeout(typeBoot, 16 + Math.random() * 22);
      } else {
        html += '</span>\n'; line++; char = 0;
        bootBox.innerHTML = `${html}<span id="bootCaret"></span>`; setTimeout(typeBoot, 190);
      }
    };
    typeBoot();
  }

  const canvas = document.querySelector('#dust');
  const ctx = canvas.getContext('2d');
  let particles = [], width = 0, height = 0;
  let particleEnergy = .08, scrollImpulse = 0, lastParticleScroll = scrollY;
  const resetCanvas = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth; height = innerHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({length: Math.min(105, Math.round(width / 13))}, () => ({
      x: Math.random() < .7 ? width * (.18 + Math.random() * .64) : Math.random() * width,
      y: Math.random() * height, r: Math.random() * 2 + .45,
      speed: Math.random() * .32 + .07, alpha: Math.random() * .5 + .18,
      depth: Math.random() * .8 + .2, phase: Math.random() * Math.PI * 2,
      color: Math.random() > .72 ? '124,255,196' : '53,230,160'
    }));
  };
  const animateDust = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.y -= p.speed + scrollImpulse * p.depth;
      p.x += Math.sin(performance.now() * .00055 + p.phase) * .08 * p.depth;
      if (p.y < -8) { p.y = height + 8; p.x = width * (.16 + Math.random() * .68); }
      if (p.y > height + 8) { p.y = -8; p.x = width * (.16 + Math.random() * .68); }
      const center = Math.max(.25, 1 - Math.abs(p.x - width / 2) / (width * .7));
      const alpha = Math.min(.9, p.alpha * center * (.32 + particleEnergy * 1.55));
      ctx.beginPath(); ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    particleEnergy += (.08 - particleEnergy) * .045;
    scrollImpulse *= .86;
    requestAnimationFrame(animateDust);
  };
  resetCanvas(); if (!reduce) animateDust();
  addEventListener('resize', resetCanvas, {passive: true});
  addEventListener('scroll', () => {
    const delta = scrollY - lastParticleScroll;
    lastParticleScroll = scrollY;
    particleEnergy = Math.min(1, particleEnergy + Math.abs(delta) / 85);
    scrollImpulse = Math.max(-3.2, Math.min(3.2, delta * .035));
  }, {passive: true});

  const title = document.querySelector('#heroTitle');
  const sectionTitles = [...document.querySelectorAll('main section h2')];
  sectionTitles.forEach(sectionTitle => {
    sectionTitle.classList.add('tv-glitch');
    sectionTitle.dataset.text = sectionTitle.innerText;
  });
  const glitchTitles = [title, ...sectionTitles];
  const blinkTitle = element => {
    element.classList.remove('glitching');
    void element.offsetWidth;
    element.classList.add('glitching');
    setTimeout(() => element.classList.remove('glitching'), 300);
  };
  if (!reduce) {
    setInterval(() => glitchTitles.forEach(blinkTitle), 9000);
    const titleObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      blinkTitle(entry.target);
      titleObserver.unobserve(entry.target);
    }), {threshold: .55});
    glitchTitles.forEach(glitchTitle => titleObserver.observe(glitchTitle));
  }

  const root = document.documentElement;
  document.querySelector('#themeBtn').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next; localStorage.setItem('theme', next);
  });
  const savedTheme = localStorage.getItem('theme'); if (savedTheme) root.dataset.theme = savedTheme;

  const navLinks = document.querySelector('#navLinks');
  const burger = document.querySelector('#burger');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open'); burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', e => { if (e.target.matches('a')) { navLinks.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });

  const sections = [...document.querySelectorAll('section[id]')];
  const anchors = [...document.querySelectorAll('.nav-links a')];
  addEventListener('scroll', () => {
    let current = ''; const y = scrollY + 140;
    sections.forEach(section => { if (section.offsetTop <= y) current = section.id; });
    anchors.forEach(a => a.classList.toggle('active', a.hash === `#${current}`));
  }, {passive: true});

  const timeline = document.querySelector('.tl');
  const updateTimeline = () => {
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const trigger = innerHeight * .72;
    const progress = Math.max(0, Math.min(1, (trigger - rect.top) / rect.height));
    timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
  };
  addEventListener('scroll', updateTimeline, {passive: true});
  addEventListener('resize', updateTimeline, {passive: true});
  updateTimeline();

  const aboutSection = document.querySelector('#sobre');
  const heroSection = document.querySelector('#hero');
  const cinematicSections = [...document.querySelectorAll('main > section.sec:not(#hero)')];
  if (!reduce) document.body.classList.add('scroll-cinematic');
  const updateCinematicReveal = () => {
    if (!aboutSection || reduce) return;
    const mobile = innerWidth <= 980;
    const initialScale = mobile ? .86 : .82;
    const lift = mobile ? 48 : 48;
    const radius = mobile ? 32 : 42;
    const start = innerHeight;
    const end = 66;
    cinematicSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      section.style.setProperty('--reveal-scale', (initialScale + progress * (1 - initialScale)).toFixed(4));
      section.style.setProperty('--reveal-opacity', Math.max(.08, progress).toFixed(4));
      section.style.setProperty('--reveal-lift', `${((1 - progress) * lift).toFixed(1)}px`);
      section.style.setProperty('--reveal-radius', `${((1 - progress) * radius).toFixed(1)}px`);
    });
    const aboutRect = aboutSection.getBoundingClientRect();
    const aboutProgress = Math.max(0, Math.min(1, (start - aboutRect.top) / (start - end)));
    const heroFadeProgress = Math.max(0, Math.min(1, (aboutProgress - .2) / .6));
    const heroOpacity = 1 - heroFadeProgress;
    heroSection.style.setProperty('--hero-opacity', heroOpacity.toFixed(4));
    heroSection.style.setProperty('--hero-scale', (1 - aboutProgress * .035).toFixed(4));
    heroSection.style.pointerEvents = heroOpacity < .08 ? 'none' : '';
  };
  addEventListener('scroll', updateCinematicReveal, {passive: true});
  addEventListener('resize', updateCinematicReveal, {passive: true});
  updateCinematicReveal();

  const skills = [['TypeScript',88],['Node.js / Express',85],['Prisma / SQL',82],['Clean Architecture',80],['React',74],['Docker / Deploy',70]];
  document.querySelector('.skills').innerHTML = '<p class="lead" style="margin:0 0 26px">Nível de domínio autoavaliado.</p>' + skills.map(([name,value]) => `<div class="bar"><div class="bar-h"><span>${name}</span><span>${value}%</span></div><div class="bar-track"><div class="bar-fill" data-w="${value}"></div></div></div>`).join('');

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      if (el.dataset.done) return; el.dataset.done = '1';
      const end = +el.dataset.count, suffix = el.dataset.suffix || ''; let start;
      const count = time => { start ??= time; const p = Math.min((time-start)/1200,1); el.textContent = Math.round(end*(1-Math.pow(1-p,3)))+suffix; if(p<1) requestAnimationFrame(count); };
      requestAnimationFrame(count);
    });
    entry.target.querySelectorAll('.bar-fill').forEach(bar => bar.style.width = `${bar.dataset.w}%`);
    observer.unobserve(entry.target);
  }), {threshold: .18});
  document.querySelectorAll('.reveal,.stack-grid').forEach(el => observer.observe(el));

  const term = document.querySelector('#termBody');
  const commands = [
    ['p','jhow@infra:~$ ','docker compose up -d'], ['o','','api ✓   postgres ✓   redis ✓'],
    ['p','jhow@infra:~$ ','npx prisma migrate deploy'], ['o','','3 migrations aplicadas · schema em dia'],
    ['p','jhow@infra:~$ ','railway logs --tail'], ['o','','[api] listening on :3000 · tenant resolver ativo'], ['p','jhow@infra:~$ ','']
  ];
  let terminalStarted = false;
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || terminalStarted) return; terminalStarted = true;
    let row = 0, char = 0, output = '';
    const type = () => {
      if (row >= commands.length) return term.innerHTML = `${output}<span class="term-caret"></span>`;
      const [kind,prompt,text] = commands[row];
      if (kind === 'o') { output += `<span class="out">${text}</span>\n`; row++; term.innerHTML = output; return setTimeout(type,420); }
      if (!char) output += `<span class="pr">${prompt}</span>`;
      if (char < text.length) { output += text[char++]; term.innerHTML = `${output}<span class="term-caret"></span>`; setTimeout(type, reduce?0:42); }
      else { output += '\n'; row++; char=0; setTimeout(type,300); }
    }; type();
  }, {threshold:.3}).observe(term);

  const projects = [...document.querySelectorAll('.proj')];
  const filterButtons = [...document.querySelectorAll('.fchip')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(x => x.classList.remove('on')); button.classList.add('on'); let shown=0;
    projects.forEach(project => { const visible = button.dataset.f === 'todos' || project.dataset.tag === button.dataset.f; project.classList.toggle('hidden',!visible); if(visible) shown++; });
    document.querySelector('#projCount').textContent = shown === 1 ? '1 projeto' : `${shown} no total`;
  }));

  if (!reduce && matchMedia('(hover:hover)').matches) document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => { const r=card.getBoundingClientRect(); const rx=((e.clientY-r.top)/r.height-.5)*-7; const ry=((e.clientX-r.left)/r.width-.5)*7; card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`; });
    card.addEventListener('mouseleave', () => card.style.transform='');
  });

  document.querySelector('#contactForm').addEventListener('submit', e => {
    e.preventDefault(); const fields=[...e.currentTarget.querySelectorAll('[required]')];
    document.querySelector('#formMsg').textContent = fields.some(field => !field.value.trim()) ? 'Preencha nome, email e mensagem para enviar.' : 'Formulário pronto; falta conectar um serviço de envio.';
  });
})();
