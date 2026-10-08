(() => {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentLanguage = localStorage.getItem("language") === "en" ? "en" : "pt";
  document.body.classList.add("intro-pending");

  // Efeito de TV (glitch + flicker): usado nos títulos e na tela de boot.
  const blinkTitle = (element, ms = 800) => {
    element.classList.remove("glitching");
    void element.offsetWidth;
    element.classList.add("glitching");
    setTimeout(() => element.classList.remove("glitching"), ms);
  };

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (location.hash)
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  const resetToHero = () => scrollTo({ top: 0, left: 0, behavior: "instant" });
  resetToHero();
  addEventListener("pageshow", () => {
    resetToHero();
    requestAnimationFrame(resetToHero);
  });

  const boot = document.querySelector("#boot");
  const bootBox = document.querySelector("#bootLines");
  const bootGlitch = document.querySelector("#bootGlitch");
  const bootLines = [
    ["jhow@dev:~$ ./init.sh", ""],
    ["carregando domínio...............[ok]", "ok"],
    ["conectando ao banco..............[ok]", "ok"],
    ["aplicando migrations.............[ok]", "ok"],
    ["servidor pronto na porta 3000", "ok"],
    ["", ""],
    ["BEM VINDO AO MEU MUNDO!", "ok"],
    ["WELCOME TO MY WORLD!", "dim"],
  ];
  // Bloco centralizado na tela, com todas as linhas alinhadas à esquerda na mesma margem.
  boot.style.setProperty(
    "--boot-chars",
    Math.max(...bootLines.map(([text]) => text.length)),
  );
  boot.style.setProperty("--boot-count", bootLines.length);
  const renderBoot = (activeLine, activeChars, showCaret = true) => {
    const lastLine = Math.min(activeLine, bootLines.length - 1);
    const shown = bootLines.slice(0, lastLine + 1);
    const visible = shown.map(([text], index) =>
      index < activeLine ? text : text.slice(0, activeChars),
    );
    bootBox.dataset.text = visible.join("\n"); // camadas coloridas do efeito de TV
    bootBox.innerHTML = shown
      .map(([text, cls], index) => {
        const caret =
          showCaret && index === lastLine ? '<span id="bootCaret"></span>' : "";
        return `<span class="boot-line ${cls}" style="--line-chars:${text.length}">${visible[index]}${caret}</span>`;
      })
      .join("");
  };
  const finishBoot = () => {
    document.body.style.overflow = "";
    boot.classList.add("done");
    setTimeout(
      () => {
        document.body.classList.remove("intro-pending");
        document.body.classList.add("hero-ready");
      },
      reduce ? 0 : 320,
    );
    setTimeout(() => {
      boot.style.display = "none";
    }, 700);
  };
  if (reduce) {
    bootBox.innerHTML = bootLines
      .map(
        ([text, cls]) =>
          `<span class="boot-line ${cls}" style="--line-chars:${text.length}">${text}</span>`,
      )
      .join("");
    setTimeout(finishBoot, 650);
  } else {
    document.body.style.overflow = "hidden";
    let line = 0,
      char = 0;
    renderBoot(line, char);
    let glitchTimer;
    const glitchBoot = () => {
      blinkTitle(bootGlitch, 450);
      glitchTimer = setTimeout(glitchBoot, 1600 + Math.random() * 1200);
    };
    glitchBoot();
    const typeBoot = () => {
      if (line >= bootLines.length) {
        clearTimeout(glitchTimer);
        return setTimeout(finishBoot, 650);
      }
      const [text] = bootLines[line];
      if (char < text.length) {
        char++;
        renderBoot(line, char);
        setTimeout(typeBoot, 26 + Math.random() * 34);
      } else {
        line++;
        char = 0;
        if (line < bootLines.length) renderBoot(line, char);
        else
          renderBoot(
            bootLines.length - 1,
            bootLines[bootLines.length - 1][0].length,
          );
        setTimeout(typeBoot, 260);
      }
    };
    typeBoot();
  }

  const canvas = document.querySelector("#dust");
  const ctx = canvas.getContext("2d");
  let particles = [],
    width = 0,
    height = 0;
  let particleEnergy = 0.08,
    scrollImpulse = 0,
    lastParticleScroll = scrollY;
  const sizeCanvas = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth;
    height = innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const resetCanvas = () => {
    sizeCanvas();
    particles = Array.from(
      { length: Math.min(105, Math.round(width / 13)) },
      () => ({
        x:
          Math.random() < 0.7
            ? width * (0.18 + Math.random() * 0.64)
            : Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.45,
        speed: Math.random() * 0.32 + 0.07,
        alpha: Math.random() * 0.5 + 0.18,
        depth: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.72 ? "255,255,255" : "220,248,234",
      }),
    );
  };
  const animateDust = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y -= p.speed + scrollImpulse * p.depth;
      p.x += Math.sin(performance.now() * 0.00055 + p.phase) * 0.08 * p.depth;
      if (p.y < -8) {
        p.y = height + 8;
        p.x = width * (0.16 + Math.random() * 0.68);
      }
      if (p.y > height + 8) {
        p.y = -8;
        p.x = width * (0.16 + Math.random() * 0.68);
      }
      const center = Math.max(
        0.25,
        1 - Math.abs(p.x - width / 2) / (width * 0.7),
      );
      const alpha = Math.min(
        0.9,
        p.alpha * center * (0.32 + particleEnergy * 1.55),
      );
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    particleEnergy += (0.08 - particleEnergy) * 0.045;
    scrollImpulse *= 0.86;
    requestAnimationFrame(animateDust);
  };
  resetCanvas();
  if (!reduce) animateDust();
  // No celular a barra de endereço dispara resize ao rolar: só recria as partículas se a largura mudou.
  let lastCanvasWidth = innerWidth;
  addEventListener(
    "resize",
    () => {
      if (innerWidth !== lastCanvasWidth) {
        lastCanvasWidth = innerWidth;
        resetCanvas();
      } else sizeCanvas();
    },
    { passive: true },
  );
  addEventListener(
    "scroll",
    () => {
      const delta = scrollY - lastParticleScroll;
      lastParticleScroll = scrollY;
      particleEnergy = Math.min(1, particleEnergy + Math.abs(delta) / 85);
      scrollImpulse = Math.max(-3.2, Math.min(3.2, delta * 0.035));
    },
    { passive: true },
  );

  const title = document.querySelector("#heroTitle");
  title.dataset.text = title.innerText;
  const sectionTitles = [...document.querySelectorAll("main section h2")];
  sectionTitles.forEach((sectionTitle) => {
    sectionTitle.classList.add("tv-glitch");
    sectionTitle.dataset.text = sectionTitle.innerText;
  });
  const glitchTitles = [title, ...sectionTitles];
  if (!reduce) {
    setInterval(() => glitchTitles.forEach((heading) => blinkTitle(heading)), 4200);
    const titleObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          blinkTitle(entry.target);
          titleObserver.unobserve(entry.target);
        }),
      { threshold: 0.55 },
    );
    glitchTitles.forEach((glitchTitle) => titleObserver.observe(glitchTitle));
  }

  const root = document.documentElement;
  const themeButton = document.querySelector("#themeBtn");
  const updateThemeButton = () => {
    const targetIsLight = root.dataset.theme === "dark";
    themeButton.textContent = targetIsLight ? "☀" : "☾";
    const targetName = currentLanguage === "en"
      ? targetIsLight ? "light theme" : "dark theme"
      : targetIsLight ? "tema claro" : "tema escuro";
    const label = currentLanguage === "en"
      ? `Switch to ${targetName}`
      : `Mudar para ${targetName}`;
    themeButton.setAttribute("aria-label", label);
    themeButton.title = targetName.charAt(0).toUpperCase() + targetName.slice(1);
  };
  themeButton.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    updateThemeButton();
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage bloqueado: segue sem salvar */
    }
  });
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark")
      root.dataset.theme = savedTheme;
  } catch (e) {
    /* storage bloqueado: mantém o tema padrão */
  }
  updateThemeButton();

  // Mantém o avatar animado em loop mesmo em navegadores que pausam WebM transparente.
  const avatarVideo = document.querySelector(".hero-logo");
  const playAvatar = (restart = false) => {
    if (!avatarVideo || document.hidden) return;
    avatarVideo.muted = true;
    if (restart || avatarVideo.ended) avatarVideo.currentTime = 0;
    if (avatarVideo.paused) avatarVideo.play().catch(() => {});
  };
  avatarVideo.addEventListener("loadeddata", () => playAvatar());
  avatarVideo.addEventListener("ended", () => playAvatar(true));
  avatarVideo.addEventListener("pause", () => {
    if (!avatarVideo.ended) setTimeout(() => playAvatar(), 120);
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) playAvatar(avatarVideo.ended);
  });
  setInterval(() => playAvatar(avatarVideo.ended), 1800);
  playAvatar();

  const navLinks = document.querySelector("#navLinks");
  const burger = document.querySelector("#burger");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  const sections = [...document.querySelectorAll("section[id]")];
  const anchors = [...document.querySelectorAll(".nav-links a")];
  addEventListener(
    "scroll",
    () => {
      let current = "";
      const y = scrollY + 140;
      sections.forEach((section) => {
        if (section.offsetTop <= y) current = section.id;
      });
      anchors.forEach((a) =>
        a.classList.toggle("active", a.hash === `#${current}`),
      );
    },
    { passive: true },
  );

  const timeline = document.querySelector(".tl");
  const updateTimeline = () => {
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    const trigger = innerHeight * 0.72;
    const progress = Math.max(
      0,
      Math.min(1, (trigger - rect.top) / rect.height),
    );
    timeline.style.setProperty("--timeline-progress", progress.toFixed(3));
  };
  addEventListener("scroll", updateTimeline, { passive: true });
  addEventListener("resize", updateTimeline, { passive: true });
  updateTimeline();

  const aboutSection = document.querySelector("#sobre");
  const heroSection = document.querySelector("#hero");
  const cinematicSections = [
    ...document.querySelectorAll("main > section.sec:not(#hero)"),
  ];
  if (!reduce) document.body.classList.add("scroll-cinematic");
  const updateCinematicReveal = () => {
    if (!aboutSection || reduce) return;
    const mobile = innerWidth <= 980;
    const initialScale = mobile ? 0.86 : 0.82;
    const lift = 48;
    const radius = mobile ? 32 : 42;
    const start = innerHeight;
    const end = 66;
    cinematicSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / (start - end)),
      );
      section.style.setProperty(
        "--reveal-scale",
        (initialScale + progress * (1 - initialScale)).toFixed(4),
      );
      section.style.setProperty(
        "--reveal-opacity",
        Math.max(0.08, progress).toFixed(4),
      );
      section.style.setProperty(
        "--reveal-lift",
        `${((1 - progress) * lift).toFixed(1)}px`,
      );
      section.style.setProperty(
        "--reveal-radius",
        `${((1 - progress) * radius).toFixed(1)}px`,
      );
    });
    const aboutRect = aboutSection.getBoundingClientRect();
    const aboutProgress = Math.max(
      0,
      Math.min(1, (start - aboutRect.top) / (start - end)),
    );
    const heroFadeProgress = Math.max(
      0,
      Math.min(1, (aboutProgress - 0.2) / 0.6),
    );
    const heroOpacity = 1 - heroFadeProgress;
    heroSection.style.setProperty("--hero-opacity", heroOpacity.toFixed(4));
    heroSection.style.setProperty(
      "--hero-scale",
      (1 - aboutProgress * 0.035).toFixed(4),
    );
    heroSection.style.pointerEvents = heroOpacity < 0.08 ? "none" : "";
  };
  addEventListener("scroll", updateCinematicReveal, { passive: true });
  addEventListener("resize", updateCinematicReveal, { passive: true });
  updateCinematicReveal();

  const skills = [
    ["TypeScript", 88],
    ["Node.js / Express", 85],
    ["Prisma / SQL", 82],
    ["Clean Architecture", 80],
    ["React", 74],
    ["Docker / Deploy", 70],
  ];
  document.querySelector(".skills").innerHTML =
    '<p class="lead" style="margin:0 0 26px">Nível de domínio autoavaliado.</p>' +
    skills
      .map(
        ([name, value]) =>
          `<div class="bar"><div class="bar-h"><span>${name}</span><span>${value}%</span></div><div class="bar-track"><div class="bar-fill" data-w="${value}"></div></div></div>`,
      )
      .join("");

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        entry.target.querySelectorAll("[data-count]").forEach((el) => {
          if (el.dataset.done) return;
          el.dataset.done = "1";
          const end = +el.dataset.count,
            suffix = el.dataset.suffix || "";
          let start;
          const count = (time) => {
            if (start === undefined) start = time;
            const p = Math.min((time - start) / 1200, 1);
            el.textContent =
              Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(count);
          };
          requestAnimationFrame(count);
        });
        entry.target
          .querySelectorAll(".bar-fill")
          .forEach((bar) => (bar.style.width = `${bar.dataset.w}%`));
        observer.unobserve(entry.target);
      }),
    { threshold: 0.18 },
  );
  document
    .querySelectorAll(".reveal,.stack-grid")
    .forEach((el) => observer.observe(el));

  const term = document.querySelector("#termBody");
  const commands = [
    ["p", "jhow@infra:~$ ", "docker compose up -d"],
    ["o", "", "api ✓   postgres ✓   redis ✓"],
    ["p", "jhow@infra:~$ ", "npx prisma migrate deploy"],
    ["o", "", { pt: "3 migrations aplicadas · schema em dia", en: "3 migrations applied · schema up to date" }],
    ["p", "jhow@infra:~$ ", "railway logs --tail"],
    ["o", "", { pt: "[api] listening on :3000 · tenant resolver ativo", en: "[api] listening on :3000 · tenant resolver active" }],
    ["p", "jhow@infra:~$ ", ""],
  ];
  let terminalStarted = false;
  new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || terminalStarted) return;
      terminalStarted = true;
      let row = 0,
        char = 0,
        output = "";
      const type = () => {
        if (row >= commands.length)
          return (term.innerHTML = `${output}<span class="term-caret"></span>`);
        const [kind, prompt, translatedText] = commands[row];
        const text = typeof translatedText === "string"
          ? translatedText
          : translatedText[currentLanguage];
        if (kind === "o") {
          output += `<span class="out">${text}</span>\n`;
          row++;
          term.innerHTML = output;
          return setTimeout(type, 420);
        }
        if (!char) output += `<span class="pr">${prompt}</span>`;
        if (char < text.length) {
          output += text[char++];
          term.innerHTML = `${output}<span class="term-caret"></span>`;
          setTimeout(type, reduce ? 0 : 42);
        } else {
          if (text) output += "\n";
          row++;
          char = 0;
          setTimeout(type, 300);
        }
      };
      type();
    },
    { threshold: 0.3 },
  ).observe(term);

  const projects = [...document.querySelectorAll(".proj")];
  const filterButtons = [...document.querySelectorAll(".fchip")];
  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      filterButtons.forEach((x) => {
        x.classList.remove("on");
        x.setAttribute("aria-pressed", "false");
      });
      button.classList.add("on");
      button.setAttribute("aria-pressed", "true");
      let shown = 0;
      projects.forEach((project) => {
        const visible =
          button.dataset.f === "todos" ||
          project.dataset.tag === button.dataset.f;
        project.classList.toggle("hidden", !visible);
        if (visible) shown++;
      });
      document.querySelector("#projCount").textContent = currentLanguage === "en"
        ? shown === 1 ? "1 project" : `${shown} total`
        : shown === 1 ? "1 projeto" : `${shown} no total`;
    }),
  );

  if (!reduce && matchMedia("(hover:hover)").matches)
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const maxTilt = 10;
        const ry = (px - 0.5) * maxTilt * 2;
        const rx = (0.5 - py) * maxTilt * 2;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transform = `perspective(900px) translateY(-9px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px) scale(1.035)`;
      });
      card.addEventListener("mouseleave", () => (card.style.transform = ""));
    });

  const englishContent = {
    ".nav-links li:nth-child(1) a": "About",
    ".nav-links li:nth-child(2) a": "Projects",
    ".nav-links li:nth-child(3) a": "Architecture",
    ".nav-links li:nth-child(4) a": "Stack",
    ".nav-links li:nth-child(5) a": "Journey",
    ".nav-links li:nth-child(6) a": "Contact",
    ".hero-sub": "I build multi-tenant back ends with Node.js and TypeScript — domain separated from infrastructure, versioned migrations and reliable deployments.",
    ".btn-solid": "View projects",
    ".btn-ghost": "&gt;_ OPEN RÉSUMÉ",
    ".stat:nth-child(1) .k": "isolated_tenants",
    ".stat:nth-child(2) .k": "projects_in_production",
    ".stat:nth-child(2) .l": "running for real",
    ".stat:nth-child(3) .k": "domain_layers",
    ".stat:nth-child(4) .k": "migrations_run",
    ".about-copy > .kicker": "/* who writes the code */",
    "#sobre h2": "Back end is where<br>the rules live.",
    ".about-copy .reveal > p:nth-child(1)": "I'm <strong>Jhonathan</strong>, a developer based in Curitiba, studying <em>Systems Analysis and Development</em> at UNINTER.",
    ".about-copy .reveal > p:nth-child(2)": "My main project today is a <strong>multi-tenant medical SaaS</strong>: clinic management with tenant isolation, access control and a patient-flow microservice.",
    ".about-copy .reveal > p:nth-child(3)": "I follow <em>Clean Architecture</em>: domain at the center, framework at the edge and tests in between.",
    "#projetos .head-row > div .kicker": "/* projects I've built */",
    "#projetos h2": "Where front end, back end<br>and systems meet.",
    "#projetos > .sec-in > .lead": "Each project below solves a real problem — architecture, data, integration or experience.",
    ".fchip[data-f='todos']": "All",
    ".proj:nth-child(1) .p-desc": "Multi-tenant clinic management platform with scheduling, patients, RBAC and isolation.",
    ".proj:nth-child(2) .p-desc": "Patient-flow microservice integrated with the main platform.",
    ".proj:nth-child(3) h3": "Prediction League",
    ".proj:nth-child(3) .p-desc": "Predictions, automatic scoring and real-time rankings.",
    ".p-link": "View details",
    ".proj:nth-child(4) h3": "Your next project",
    ".proj:nth-child(4) .p-desc": "Space reserved for the next system launched into production.",
    ".proj:nth-child(4) .p-link": "Let's talk",
    "#arquitetura > .sec-in > .kicker": "/* infrastructure and deployment */",
    "#arquitetura h2": "Going live is<br>part of the job.",
    "#arquitetura > .sec-in > .lead": "Versioned migrations, variables outside the codebase, accessible logs and possible rollbacks.",
    "#arquitetura .side-block:nth-child(1) .side-t": "what I handle",
    "#arquitetura .side-block:nth-child(2) .side-t": "principle I follow",
    "#arquitetura .side-block:nth-child(2) > p:last-child": "The database is the source of truth, the schema is code, and every environment starts from scratch with one command.",
    "#arquitetura .chip:last-child": "Basic CI",
    "#stack > .sec-in > .kicker": "/* everyday tools */",
    "#stack h2": "The stack behind<br>the projects.",
    ".skills > .lead": "Self-assessed proficiency level.",
    "#trajetoria > .sec-in > .kicker": "/* how I got here */",
    "#trajetoria h2": "Journey.",
    ".tl-item:nth-child(1) .tl-what": "First production systems",
    ".tl-item:nth-child(1) > p:last-child": "Authentication, relational databases and deployment for real users.",
    ".tl-item:nth-child(2) .tl-what": "Architecture and discipline",
    ".tl-item:nth-child(2) > p:last-child": "Isolated use cases, repositories as contracts and Prisma as an infrastructure detail.",
    ".tl-item:nth-child(3) .tl-when": "2026 — now",
    ".tl-item:nth-child(3) .tl-what": "Multi-tenant medical SaaS",
    ".tl-item:nth-child(3) > p:last-child": "MVP with domain modeling, tenant isolation, RBAC and a microservice.",
    "#contato > .sec-in > .kicker": "/* contact me */",
    "#contato h2": "Shall we build<br>something together?",
    "#contato .contact-grid .lead": "Freelance work, collaboration or a back-end role — send me a message.",
    "label[for='f-nome']": "name",
    "label[for='f-mail']": "email",
    "label[for='f-msg']": "message",
    ".send": "Send message",
    "footer": "JHOW.DEV — back end, architecture and systems that go live."
  };
  const portugueseContent = new Map();
  Object.keys(englishContent).forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      portugueseContent.set(`${selector}::${index}`, element.innerHTML);
    });
  });
  const placeholders = {
    "#f-nome": { pt: "Seu nome", en: "Your name" },
    "#f-mail": { pt: "voce@email.com", en: "you@email.com" },
    "#f-msg": { pt: "Conta o que você precisa...", en: "Tell me what you need..." }
  };
  const updateProjectCount = () => {
    const shown = projects.filter((project) => !project.classList.contains("hidden")).length;
    document.querySelector("#projCount").textContent = currentLanguage === "en"
      ? shown === 1 ? "1 project" : `${shown} total`
      : shown === 1 ? "1 projeto" : `${shown} no total`;
  };
  const applyLanguage = (language) => {
    currentLanguage = language;
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
    Object.entries(englishContent).forEach(([selector, english]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.innerHTML = language === "en"
          ? english
          : portugueseContent.get(`${selector}::${index}`);
      });
    });
    Object.entries(placeholders).forEach(([selector, values]) => {
      document.querySelector(selector).placeholder = values[language];
    });
    document.querySelector('meta[name="description"]').content = language === "en"
      ? "Jhonathan Fernandes' portfolio — back end, APIs and systems."
      : "Portfólio de Jhonathan Fernandes — backend, APIs e sistemas.";
    document.title = language === "en" ? "JHOW.DEV — Back End & Systems" : "JHOW.DEV — Backend & Sistemas";
    document.querySelector("header nav").setAttribute("aria-label", language === "en" ? "Main navigation" : "Navegação principal");
    document.querySelector("#burger").setAttribute("aria-label", language === "en" ? "Open menu" : "Abrir menu");
    updateThemeButton();
    const langButton = document.querySelector("#langBtn");
    langButton.textContent = language === "en" ? "PT" : "EN";
    langButton.setAttribute("aria-label", language === "en" ? "Mudar idioma para português" : "Mudar idioma para inglês");
    const commandButton = document.querySelector("#cmdkTrigger");
    const commandDialog = document.querySelector(".cmdk-box");
    const commandCloseButton = document.querySelector("#cmdkClose");
    commandButton.setAttribute("aria-label", language === "en" ? "Open navigation terminal" : "Abrir terminal de navegação");
    commandButton.title = language === "en" ? "Open terminal (press /)" : "Abrir terminal (pressione /)";
    commandDialog.setAttribute("aria-label", language === "en" ? "Navigation terminal" : "Terminal de navegação");
    commandCloseButton.setAttribute("aria-label", language === "en" ? "Close terminal" : "Fechar terminal");
    document.querySelectorAll("main section h2").forEach((heading) => heading.dataset.text = heading.innerText);
    title.dataset.text = title.innerText;
    updateProjectCount();
    term.querySelectorAll(".out").forEach((line, index) => {
      const outputCommands = commands.filter(([kind]) => kind === "o");
      const value = outputCommands[index]?.[2];
      if (value && typeof value !== "string") line.textContent = value[language];
    });
    localStorage.setItem("language", language);
  };
  document.querySelector("#langBtn").addEventListener("click", () => {
    applyLanguage(currentLanguage === "pt" ? "en" : "pt");
  });
  applyLanguage(currentLanguage);

  document.querySelector("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [...e.currentTarget.querySelectorAll("[required]")];
    const empty = fields.some((field) => !field.value.trim());
    const badMail =
      !empty && !document.querySelector("#f-mail").checkValidity();
    document.querySelector("#formMsg").textContent = currentLanguage === "en"
      ? empty
        ? "Fill in your name, email and message."
        : badMail
          ? "Enter a valid email address."
          : "The form is ready; a delivery service still needs to be connected."
      : empty
        ? "Preencha nome, email e mensagem para enviar."
        : badMail
          ? "Informe um email válido."
          : "Formulário pronto; falta conectar um serviço de envio.";
  });

  // Barra de progresso e navegação com transparência progressiva.
  const scrollProgress = document.querySelector("#scrollProgress");
  const mainNav = document.querySelector(".nav");
  const updateScrollUi = () => {
    const page = document.documentElement;
    const available = page.scrollHeight - page.clientHeight;
    const progress = available > 0 ? (page.scrollTop / available) * 100 : 0;
    scrollProgress.style.width = `${Math.min(100, progress)}%`;
    mainNav.classList.toggle("scrolled", scrollY > 40);
  };
  addEventListener("scroll", updateScrollUi, { passive: true });
  addEventListener("resize", updateScrollUi);
  updateScrollUi();

  // Ripple e magnetismo leve nos CTAs, sem interferir com toque ou acessibilidade.
  const interactiveButtons = document.querySelectorAll(".btn, .send");
  const finePointer = matchMedia("(pointer: fine)").matches;
  interactiveButtons.forEach((button) => {
    if (!reduce && finePointer) {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
      });
      button.addEventListener("mouseleave", () => (button.style.transform = ""));
    }
    button.addEventListener("click", (event) => {
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.7;
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  // Terminal de navegação: clique no >_ ou pressione "/".
  const commandOverlay = document.querySelector("#cmdk");
  const commandInput = document.querySelector("#cmdkInput");
  const commandOutput = document.querySelector("#cmdkOutput");
  const commandTrigger = document.querySelector("#cmdkTrigger");
  const commandClose = document.querySelector("#cmdkClose");
  const commandText = (pt, en) => currentLanguage === "en" ? en : pt;
  const openCommand = () => {
    commandOverlay.classList.add("open");
    commandOverlay.setAttribute("aria-hidden", "false");
    commandInput.placeholder = commandText('digite "help"...', 'type "help"...');
    commandInput.value = "";
    setTimeout(() => commandInput.focus(), 30);
  };
  const closeCommand = () => {
    commandOverlay.classList.remove("open");
    commandOverlay.setAttribute("aria-hidden", "true");
    commandTrigger.focus();
  };
  const navigateCommand = (section) => {
    location.hash = section;
    closeCommand();
    return commandText(`navegando para ${section}...`, `navigating to ${section}...`);
  };
  const commandActions = {
    help: () => commandText(
      "comandos: inicio · sobre · projetos · arquitetura · stack · trajetoria · contato · tema · idioma · github · clear",
      "commands: home · about · projects · architecture · stack · journey · contact · theme · language · github · clear",
    ),
    inicio: () => navigateCommand("#hero"),
    home: () => navigateCommand("#hero"),
    sobre: () => navigateCommand("#sobre"),
    about: () => navigateCommand("#sobre"),
    projetos: () => navigateCommand("#projetos"),
    projects: () => navigateCommand("#projetos"),
    arquitetura: () => navigateCommand("#arquitetura"),
    architecture: () => navigateCommand("#arquitetura"),
    stack: () => navigateCommand("#stack"),
    trajetoria: () => navigateCommand("#trajetoria"),
    journey: () => navigateCommand("#trajetoria"),
    contato: () => navigateCommand("#contato"),
    contact: () => navigateCommand("#contato"),
    tema: () => { themeButton.click(); return commandText("tema alternado.", "theme switched."); },
    theme: () => commandActions.tema(),
    idioma: () => { applyLanguage(currentLanguage === "pt" ? "en" : "pt"); return commandText("idioma alternado.", "language switched."); },
    language: () => commandActions.idioma(),
    github: () => { open("https://github.com/jhowads25", "_blank", "noopener"); return "github.com/jhowads25 ↗"; },
    clear: () => { commandOutput.innerHTML = ""; return null; },
    exit: () => { closeCommand(); return null; },
  };
  commandTrigger.addEventListener("click", openCommand);
  commandClose.addEventListener("click", closeCommand);
  commandOverlay.addEventListener("click", (event) => {
    if (event.target === commandOverlay) closeCommand();
  });
  document.addEventListener("keydown", (event) => {
    const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
    if (event.key === "/" && !typing) {
      event.preventDefault();
      openCommand();
    } else if (event.key === "Escape" && commandOverlay.classList.contains("open")) {
      closeCommand();
    }
  });
  commandInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const raw = commandInput.value.trim();
    if (!raw) return;
    const line = document.createElement("div");
    line.className = "cmdk-line";
    line.textContent = `$ ${raw}`;
    commandOutput.appendChild(line);
    const action = commandActions[raw.toLowerCase()];
    const result = action
      ? action()
      : commandText(`comando não encontrado: ${raw}`, `command not found: ${raw}`);
    if (result) {
      const response = document.createElement("div");
      response.className = `cmdk-result${action ? "" : " cmdk-error"}`;
      response.textContent = result;
      commandOutput.appendChild(response);
    }
    commandOutput.scrollTop = commandOutput.scrollHeight;
    commandInput.value = "";
  });
})();
