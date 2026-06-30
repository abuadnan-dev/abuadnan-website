const profileData = {
  name: 'Abu Adnan',
  title: 'Deputy Engineering Manager',
  roles: [
    'Deputy Engineering Manager',
    'Software Architect',
    'Cloud Engineer',
    'AI Enthusiast',
    'Full Stack Engineer'
  ],
  experiences: [
    {
      title: 'Deputy Engineering Manager',
      meta: 'Leading product and platform engineering teams',
      summary: 'Driving delivery excellence, architectural strategy, and team growth while partnering closely with stakeholders and clients.',
      bullets: [
        'Engineering leadership and delivery planning',
        'Team mentoring and coaching',
        'Cloud architecture and platform excellence',
        'Requirement analysis and stakeholder communication',
        'Technical decision-making and production excellence'
      ]
    },
    {
      title: 'Software Engineer / Architect',
      meta: 'Enterprise and business systems',
      summary: 'Built and modernized line-of-business applications across ERP, CRM, manufacturing, sales, and service management domains.',
      bullets: [
        'Enterprise software and workflow systems',
        'CRM and ERP integrations',
        'Windows desktop and ASP.NET MVC applications',
        'Modernization toward APIs, cloud, and services'
      ]
    }
  ],
  skills: [
    {
      category: 'Leadership',
      items: ['Engineering Management', 'Team Leadership', 'Mentoring', 'Agile', 'Scrum', 'Stakeholder Management']
    },
    {
      category: 'Backend',
      items: ['C#', '.NET', 'ASP.NET Core', 'Web API', 'Microservices']
    },
    {
      category: 'Frontend',
      items: ['React', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS']
    },
    {
      category: 'Cloud',
      items: ['Azure', 'Azure App Service', 'Azure Functions', 'Azure Storage', 'Azure DevOps']
    },
    {
      category: 'Database',
      items: ['SQL Server', 'PostgreSQL', 'Redis']
    },
    {
      category: 'Architecture',
      items: ['REST APIs', 'Event-driven Architecture', 'Clean Architecture', 'Domain Driven Design']
    },
    {
      category: 'AI',
      items: ['OpenAI APIs', 'LLM Integration', 'AI Automation', 'AI Assisted Development']
    },
    {
      category: 'DevOps',
      items: ['Docker', 'GitHub Actions', 'CI/CD']
    }
  ],
  projects: [
    {
      title: 'Platform Modernization Program',
      description: 'Led the evolution of a legacy enterprise platform into a modular, cloud-ready architecture with improved reliability and faster delivery cycles.',
      tech: ['Azure', 'C#', 'Microservices', 'Docker']
    },
    {
      title: 'AI Assist for Engineering Teams',
      description: 'Introduced AI-assisted workflows for requirement analysis, documentation, and internal knowledge discovery to increase delivery efficiency.',
      tech: ['OpenAI', 'TypeScript', 'Azure Functions']
    },
    {
      title: 'Cloud-native Service Mesh',
      description: 'Architected a resilient set of APIs and services with strong observability, automation, and deployment guardrails for growing product demand.',
      tech: ['ASP.NET Core', 'Azure', 'PostgreSQL', 'CI/CD']
    }
  ],
};

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const backToTop = document.querySelector('.back-to-top');
const yearEl = document.getElementById('year');
const roleText = document.querySelector('.hero-role__text');

function initTheme() {
  const storedTheme = localStorage.getItem('abuadnan-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☾' : '☀︎';
}

function toggleTheme() {
  const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', currentTheme);
  localStorage.setItem('abuadnan-theme', currentTheme);
  updateThemeIcon(currentTheme);
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  container.innerHTML = profileData.experiences
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <h3>${item.title}</h3>
          <p class="meta">${item.meta}</p>
          <p>${item.summary}</p>
          <ul>
            ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderSkills() {
  const container = document.getElementById('skills-grid');
  container.innerHTML = profileData.skills
    .map(
      (skillGroup) => `
        <article class="skill-card reveal">
          <h3>${skillGroup.category}</h3>
          <div class="tag-list">
            ${skillGroup.items.map((item) => `<span>${item}</span>`).join('')}
          </div>
        </article>
      `
    )
    .join('');
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  container.innerHTML = profileData.projects
    .map(
      (project) => `
        <article class="project-card reveal">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tag-list">
            ${project.tech.map((item) => `<span>${item}</span>`).join('')}
          </div>

        </article>
      `
    )
    .join('');
}

function initTypingEffect() {
  if (!roleText) return;
  let index = 0;
  const roles = profileData.roles;
  const typeCycle = () => {
    roleText.textContent = roles[index % roles.length];
    index += 1;
    setTimeout(typeCycle, 2200);
  };
  setTimeout(typeCycle, 500);
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function initNavigation() {
  const sectionIds = ['home', 'about', 'experience', 'projects', 'talks', 'resume', 'contact'];
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const linkMap = new Map(navLinks.map((link) => [link.getAttribute('href').replace('#', ''), link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const currentId = entry.target.id;
          const activeLink = linkMap.get(currentId);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

function initMobileNav() {
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

  siteNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    });
  });
}

function initBackToTop() {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initFooterYear() {
  yearEl.textContent = new Date().getFullYear();
}

function init() {
  initTheme();
  renderExperience();
  renderSkills();
  renderProjects();
  initRevealAnimations();
  initNavigation();
  initMobileNav();
  initBackToTop();
  initFooterYear();
  initTypingEffect();
}

document.addEventListener('DOMContentLoaded', init);
themeToggle?.addEventListener('click', toggleTheme);
