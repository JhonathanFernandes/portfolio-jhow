(() => {
  "use strict";

  /*
   * Configure liveUrl e githubUrl somente quando os endereços forem públicos.
   * As duas imagens de cada projeto ficam nos caminhos informados em `images`.
   */
  const projects = {
    "bolao-da-resenha": {
      name: "Bolão da Resenha",
      category: "SaaS",
      status: "Em evolução",
      summary: "Plataforma esportiva para organizar palpites, acompanhar resultados e consultar classificações.",
      about: [
        "O Bolão da Resenha centraliza a experiência de participantes e organizadores de bolões esportivos. Os participantes podem registrar palpites, consultar seus jogos e acompanhar classificações, enquanto os organizadores administram rodadas, partidas, usuários e pagamentos em um painel dedicado.",
        "A plataforma possui arquitetura SaaS multi-tenant, permitindo atender diferentes organizadores com dados, configurações e acessos separados por organização. Também conta com cadastro de organizadores, gestão de planos e assinaturas e integração com o Mercado Pago para pagamentos via PIX.",
        "O projeto está funcional e segue em evolução, com refatoração modular do back-end, aprimoramento da interface e uma landing page integrada para apresentar o produto.",
      ],
      features: [
        "Gestão de bolões, rodadas e partidas.",
        "Registro e consulta de palpites.",
        "Acompanhamento de resultados, rankings e ganhadores.",
        "Pagamentos via PIX e confirmações processadas por webhooks.",
        "Painel administrativo com indicadores e relatórios.",
        "Gestão de organizações, planos e assinaturas.",
        "Experiência responsiva com instalação como PWA.",
      ],
      technologies: {
        "Front-end e PWA": ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Service Worker", "Web App Manifest"],
        "Back-end": ["Node.js", "Express", "TypeScript", "API REST", "Arquitetura modular por domínio"],
        "Banco de dados": ["MySQL", "Prisma ORM", "Migrations"],
        "Autenticação e acesso": ["JWT", "Renovação de sessão", "Controle de permissões", "Acesso por nome e telefone"],
        "Pagamentos": ["Mercado Pago", "PIX", "Webhooks"],
        "Arquitetura SaaS": ["Multi-tenant", "Monorepo", "Pacote compartilhado", "Isolamento por organização", "Gestão de assinaturas"],
      },
      featuredTechnologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "Prisma ORM", "MySQL", "Mercado Pago", "PWA"],
      liveUrl: "https://www.bolaodaresenha.site/jhowtestenovo-9fc76d",
      githubUrl: "",
      images: [
        {
          src: "assets/projetos/bolao-da-resenha/tela-principal.png?v=2",
          alt: "Tela principal do Bolão da Resenha",
          caption: "Página inicial do Bolão da Resenha e estimativa de premiação.",
        },
        {
          src: "assets/projetos/bolao-da-resenha/funcionalidade.png?v=2",
          alt: "Funcionalidade do Bolão da Resenha",
          caption: "Fluxo de participação e orientações de jogo responsável.",
        },
      ],
    },
    "conectando-a-comunidade": {
      name: "Conectando a Comunidade",
      category: "Web",
      status: "Em produção",
      summary: "Projeto web publicado, desenvolvido para conectar a comunidade.",
      about: [
        "Conectando a Comunidade é um projeto publicado construído com React, TypeScript e PostgreSQL.",
        "As funcionalidades e o público específico ainda precisam ser documentados. Por isso, esta página não atribui ao produto recursos que não foram confirmados.",
      ],
      technologies: {
        "Front-end": ["React", "TypeScript"],
        "Banco de dados": ["PostgreSQL"],
      },
      liveUrl: "https://conectando-a-comunidade.vercel.app/",
      githubUrl: "",
      images: [
        {
          src: "assets/projetos/conectando-a-comunidade/tela-principal.png?v=2",
          alt: "Tela principal do Conectando a Comunidade",
          caption: "Página inicial do portal Conectando a Comunidade.",
        },
        {
          src: "assets/projetos/conectando-a-comunidade/funcionalidade.png?v=2",
          alt: "Funcionalidade do Conectando a Comunidade",
          caption: "Busca de comércios locais com visualização no mapa.",
        },
      ],
    },
    "sistema-medico": {
      name: "Sistema médico",
      category: "SaaS",
      status: "Em desenvolvimento",
      summary: "Plataforma SaaS para centralizar a gestão de clínicas, pacientes, atendimentos e acessos em um único ambiente.",
      about: [
        "O Sistema médico foi desenvolvido para centralizar e otimizar a gestão de clínicas, reunindo cadastro de pacientes, organização dos atendimentos e administração de acessos em uma única plataforma.",
        "A arquitetura multi-tenant permite que várias clínicas utilizem o mesmo sistema com segurança, mantendo dados e operações devidamente isolados. O controle de acesso restringe funcionalidades e informações conforme as permissões de cada usuário.",
        "Os fluxos de atendimento e as integrações com a aplicação principal ficam concentrados em um serviço dedicado. Essa separação facilita a manutenção das regras de negócio e a evolução dos módulos. O projeto está em fase avançada de desenvolvimento, com as principais funcionalidades implementadas, mas ainda não é apresentado como produto finalizado.",
      ],
      technologies: {
        "Back-end": ["Node.js", "TypeScript", "Prisma ORM"],
        "Banco de dados": ["PostgreSQL"],
        "Arquitetura": ["Multi-tenant", "Isolamento de dados por clínica", "Controle de acesso por permissões"],
        "Serviços": ["Gerenciamento de atendimentos", "Integração entre módulos", "Centralização das regras de negócio"],
      },
      featuredTechnologies: ["Node.js", "TypeScript", "Prisma ORM", "PostgreSQL", "Multi-tenant", "Controle de acesso"],
      liveUrl: "https://frontend-iota-beryl-76.vercel.app/",
      githubUrl: "",
      images: [
        {
          src: "assets/medico.png?v=2",
          alt: "Tela principal do sistema médico",
          caption: "Tela principal da aplicação.",
        },
        {
          src: "assets/medico2.png?v=2",
          alt: "Funcionalidade do sistema médico",
          caption: "Tela de uma funcionalidade relevante do projeto.",
        },
      ],
    },
    "motorista-mobile": {
      name: "Motorista Copiloto",
      category: "Mobile",
      status: "Em evolução",
      summary: "Plataforma financeira e operacional para motoristas de aplicativo, com controle de corridas, custos, metas, jornadas e lucro real.",
      about: [
        "O Motorista Copiloto foi criado para ajudar motoristas de aplicativo a entender quanto realmente sobra depois de considerar combustível, manutenção, desgaste do veículo, despesas e quilômetros percorridos. Em vez de mostrar apenas faturamento, ele acompanha lucro, custo operacional, metas, jornadas e desempenho por período.",
        "A plataforma reúne registro de corridas e despesas, gestão de veículos, abastecimentos, manutenções, carteira, relatórios e comparações de desempenho. Também funciona como PWA instalável, possui suporte offline com sincronização posterior e foi projetada para uso responsivo no celular e no notebook.",
        "No Android, o Radar identifica ofertas exibidas por aplicativos de mobilidade usando Accessibility Service e OCR quando necessário. Ele calcula valor por quilômetro e por hora, compara a oferta com o custo real do veículo e exibe a análise em uma janela flutuante. O sistema apenas informa a rentabilidade: nunca aceita ou recusa corridas automaticamente.",
      ],
      technologies: {
        "Front-end e PWA": ["HTML5", "CSS3", "JavaScript Vanilla", "Service Worker", "Web App Manifest"],
        "Back-end e dados": ["Node.js", "Express.js", "PostgreSQL", "API REST", "SQL Migrations"],
        "Android": ["Java", "Android WebView", "Accessibility Service", "ML Kit OCR", "Accessibility Overlay"],
        "Integrações e infraestrutura": ["OpenStreetMap Nominatim", "OSRM", "Google Maps", "Supabase Realtime", "Render"],
        "Segurança": ["PBKDF2 com SHA-512", "Sessões por dispositivo", "Cookies HttpOnly e Secure", "Rate limiting"],
      },
      featuredTechnologies: ["Node.js", "Express.js", "PostgreSQL", "JavaScript", "PWA", "Java", "Android", "ML Kit OCR"],
      liveUrl: "https://controle-passe-uber.onrender.com/",
      githubUrl: "",
      images: [
        {
          src: "assets/projetos/motorista-mobile/tela-principal.png?v=2",
          alt: "Tela principal do Motorista Copiloto",
          caption: "Cadastro inicial das plataformas utilizadas pelo motorista.",
        },
        {
          src: "assets/projetos/motorista-mobile/funcionalidade.png?v=2",
          alt: "Funcionalidade do Motorista Copiloto",
          caption: "Dashboard financeiro com meta, jornada e custo real do veículo.",
        },
      ],
    },
  };

  const slug = new URLSearchParams(location.search).get("id");
  const project = projects[slug];
  const page = document.querySelector("#projectPage");

  if (!project) {
    document.title = "Projeto não encontrado | JHOW.DEV";
    page.className = "project-page project-error";
    page.innerHTML = '<div><p class="project-kicker">/* erro 404 */</p><h1>Projeto não encontrado.</h1><p><a class="project-footer-back" href="index.html?from=project#projetos">← Voltar aos projetos</a></p></div>';
    return;
  }

  document.title = `${project.name} | JHOW.DEV`;
  const projectTitle = document.querySelector("#projectTitle");
  projectTitle.textContent = project.name;
  projectTitle.dataset.text = project.name;
  document.querySelector("#projectCategory").textContent = project.category;
  const status = document.querySelector("#projectStatus");
  status.textContent = project.status;
  status.dataset.status = project.status;
  document.querySelector("#projectSummary").textContent = project.summary;

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const originalTitle = project.name;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#*";
    const duration = 800;
    const totalFrames = Math.round(duration / 30);
    let frame = 0;
    const scramble = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / totalFrames) * originalTitle.length);
      projectTitle.textContent = [...originalTitle]
        .map((character, index) =>
          character === " " || index < revealed
            ? character
            : characters[Math.floor(Math.random() * characters.length)],
        )
        .join("");
      if (frame >= totalFrames) {
        clearInterval(scramble);
        projectTitle.textContent = originalTitle;
      }
    }, 30);

    const pulseGlitch = () => {
      projectTitle.classList.remove("glitching");
      void projectTitle.offsetWidth;
      projectTitle.classList.add("glitching");
      setTimeout(() => projectTitle.classList.remove("glitching"), 350);
    };
    setTimeout(pulseGlitch, 850);
    setInterval(pulseGlitch, 9000);
  }

  const allTechnologies = project.featuredTechnologies || [
    ...new Set(Object.values(project.technologies).flat()),
  ];
  const techList = document.querySelector("#projectTechList");
  if (allTechnologies.length) {
    allTechnologies.forEach((technology) => {
      const item = document.createElement("li");
      item.textContent = technology;
      techList.appendChild(item);
    });
  } else {
    const item = document.createElement("li");
    item.textContent = "Tecnologias a confirmar";
    techList.appendChild(item);
  }

  const about = document.querySelector("#projectAbout");
  project.about.forEach((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    about.appendChild(element);
  });

  const featuresSection = document.querySelector("#projectFeaturesSection");
  const featuresList = document.querySelector("#projectFeatures");
  if (project.features?.length) {
    featuresSection.hidden = false;
    project.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      featuresList.appendChild(item);
    });
  }

  const architecture = document.querySelector("#projectArchitecture");
  const architectureEntries = Object.entries(project.technologies);
  if (!architectureEntries.length) {
    architecture.innerHTML = '<article class="architecture-card"><h3>Informações pendentes</h3><ul><li>Tecnologias e arquitetura a confirmar</li></ul></article>';
  } else {
    architectureEntries.forEach(([group, technologies]) => {
      const card = document.createElement("article");
      card.className = "architecture-card";
      const title = document.createElement("h3");
      title.textContent = group;
      const list = document.createElement("ul");
      technologies.forEach((technology) => {
        const item = document.createElement("li");
        item.textContent = technology;
        list.appendChild(item);
      });
      card.append(title, list);
      architecture.appendChild(card);
    });
  }

  const liveLink = document.querySelector("#projectLiveLink");
  const githubLink = document.querySelector("#projectGithubLink");
  const pendingLink = document.querySelector("#projectLinkPending");
  if (project.liveUrl) {
    liveLink.href = project.liveUrl;
    pendingLink.hidden = true;
  } else {
    liveLink.hidden = true;
    pendingLink.textContent = project.liveNote || "URL da aplicação a configurar";
  }
  if (project.githubUrl) githubLink.href = project.githubUrl;
  else githubLink.hidden = true;

  const gallery = document.querySelector("#projectGallery");
  const lightbox = document.querySelector("#imageLightbox");
  const lightboxImage = document.querySelector("#lightboxImage");
  const lightboxCaption = document.querySelector("#lightboxCaption");
  const lightboxClose = document.querySelector("#lightboxClose");
  const openLightbox = (image) => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.caption;
    lightbox.showModal();
  };

  lightboxClose.addEventListener("click", () => lightbox.close());
  lightboxImage.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-content")) {
      lightbox.close();
    }
  });
  lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
  });

  project.images.forEach((image, index) => {
    const figure = document.createElement("figure");
    figure.className = "project-shot";
    const media = document.createElement("div");
    media.className = "project-shot-media";
    const placeholder = document.createElement("div");
    placeholder.className = "shot-placeholder";
    placeholder.innerHTML = `<strong>Imagem ${index + 1} pendente</strong><span>${image.src}</span>`;
    const screenshot = new Image();
    screenshot.alt = image.alt;
    screenshot.loading = "lazy";
    screenshot.addEventListener("error", () => media.replaceChildren(placeholder));
    screenshot.addEventListener("load", () => {
      media.classList.add("has-image");
      media.tabIndex = 0;
      media.setAttribute("role", "button");
      media.setAttribute("aria-label", `Ampliar: ${image.alt}`);
    });
    screenshot.src = new URL(image.src, document.baseURI).href;
    media.appendChild(screenshot);
    media.addEventListener("click", () => {
      if (media.classList.contains("has-image")) openLightbox(image);
    });
    media.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key) || !media.classList.contains("has-image")) return;
      event.preventDefault();
      openLightbox(image);
    });
    const caption = document.createElement("figcaption");
    caption.textContent = image.caption;
    figure.append(media, caption);
    gallery.appendChild(figure);
  });
})();
