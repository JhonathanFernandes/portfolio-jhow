(() => {
  "use strict";

  /*
   * Configure liveUrl e githubUrl somente quando os endereços forem públicos.
   * As duas imagens de cada projeto ficam nos caminhos informados em `images`.
   */
  const projects = {
    "bolao-da-resenha": {
      name: "Bolão da Resenha",
      category: "Web",
      status: "Em evolução",
      summary: "Plataforma esportiva para organizar palpites, acompanhar resultados e consultar classificações.",
      about: [
        "O Bolão da Resenha transforma a organização de palpites esportivos em uma experiência centralizada, permitindo acompanhar resultados e classificações em uma única aplicação.",
        "A aplicação está funcional e atualmente passa por refatoração, além de receber uma landing page. Novas funcionalidades não foram descritas aqui para evitar apresentar recursos ainda não confirmados.",
      ],
      technologies: {
        "Front-end e PWA": ["React", "Vite", "Service Worker", "Web App Manifest"],
        "Back-end": ["Node.js", "API REST", "JWT"],
        "Banco de dados": ["MySQL"],
        "Autenticação": ["Firebase Authentication", "Login por telefone"],
        "Pagamentos": ["Mercado Pago", "PIX"],
      },
      featuredTechnologies: ["React", "Vite", "Node.js", "MySQL", "Firebase Authentication", "Mercado Pago", "PWA"],
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
      summary: "Plataforma de gestão de clínicas com foco em atendimentos, pacientes e controle de acesso.",
      about: [
        "O sistema médico foi pensado para organizar a operação de clínicas, reunindo a gestão de pacientes, atendimentos e permissões de acesso.",
        "A arquitetura utiliza isolamento por tenant e um serviço de atendimento que concentra a lógica dos fluxos e integrações da aplicação principal. O projeto está próximo da conclusão, mas ainda não é apresentado como produto finalizado.",
      ],
      technologies: {
        "Back-end": ["Node.js", "TypeScript", "Prisma"],
        "Banco de dados": ["PostgreSQL"],
        "Arquitetura": ["Multi-tenant", "Controle de acesso", "Serviço de atendimento"],
      },
      liveUrl: "",
      githubUrl: "",
      images: [
        {
          src: "assets/projetos/sistema-medico/tela-principal.webp",
          alt: "Tela principal do sistema médico",
          caption: "Tela principal da aplicação.",
        },
        {
          src: "assets/projetos/sistema-medico/funcionalidade.webp",
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
  }
  if (project.githubUrl) githubLink.href = project.githubUrl;
  else githubLink.hidden = true;

  const gallery = document.querySelector("#projectGallery");
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
    screenshot.src = new URL(image.src, document.baseURI).href;
    media.appendChild(screenshot);
    const caption = document.createElement("figcaption");
    caption.textContent = image.caption;
    figure.append(media, caption);
    gallery.appendChild(figure);
  });
})();
