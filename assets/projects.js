/**
 * Fuente de datos del portafolio INNOTEC.
 * Futuro: reemplazar por API/CMS sin cambiar componentes visuales.
 */
window.INNOTEC_PROJECTS = [
  {
    slug: "progeox",
    title: "Progeox / Promine",
    category: "Software especializado · Minería",
    type: "case-study",
    featured: true,
    filters: ["mining", "mobile", "enterprise"],
    shortDescription:
      "Participación en el desarrollo de software especializado para mapeo geológico subterráneo, visualización 3D e integración con bases de datos.",
    image: "assets/projects/progeox.jpg",
    imageAlt: "Software especializado para geología y minería — Progeox",
    platforms: ["Android", "Tablets"],
    technologies: ["Java", "Android", "DXF", "3D", "Bases de datos", "CAD"],
    links: [
      { label: "Promine", url: "https://www.promine.com/" },
      { label: "Progeox", url: "https://www.promine.com/es/productos/progeox/" },
      { label: "Progeox App", url: "https://www.promine.com/es/productos/progeox/progeox-app/" }
    ],
    detailUrl: "proyectos/progeox.html"
  },
  {
    slug: "llama-express",
    title: "Llama Express",
    category: "Delivery · Marketplace",
    type: "product",
    featured: false,
    filters: ["mobile", "web"],
    shortDescription:
      "Plataforma de delivery en Huacho y Lima con ecosistema de apps para clientes, comercios, repartidores y administración.",
    image: "assets/projects/llama-express.jpg",
    imageAlt: "Llama Express — plataforma de delivery",
    platforms: ["Android", "Backend", "Panel admin"],
    technologies: ["Flutter", "TypeScript", "Firebase", "Cloud Functions", "APIs"],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.abraxas.llamaexpress&hl=es_PE" },
      { label: "Instagram", url: "https://www.instagram.com/llamaexpress20/" }
    ],
    detailUrl: "proyectos/llama-express.html"
  },
  {
    slug: "filo",
    title: "FILO",
    category: "Mobile · Web · Barberías",
    type: "product",
    featured: false,
    filters: ["mobile", "web"],
    shortDescription:
      "App móvil y web para barberos, barberías y clientes: reservas a domicilio o en local, paneles de barbería, POS y fidelización.",
    image: "assets/projects/filo.jpg",
    imageAlt: "FILO — app para barberos, barberías y clientes",
    platforms: ["Web", "Mobile"],
    technologies: ["Web", "Mobile", "Panel admin", "APIs"],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.abraxas.filo&hl=es_PE" },
      { label: "Ver FILO", url: "https://filobarberco.com/" }
    ],
    detailUrl: "proyectos/filo.html"
  },
  {
    slug: "plataforma-multiservicio",
    title: "Plataforma multiservicio",
    category: "Mobile · Web · E-commerce",
    type: "product",
    featured: false,
    filters: ["mobile", "web", "ai"],
    shortDescription:
      "Ecosistema digital con apps móviles y web: social, comercio, pagos, delivery, entretenimiento y funcionalidades con IA.",
    image: "assets/projects/plataforma-multiservicio.jpg",
    imageAlt: "Plataforma digital multiservicio con apps móviles",
    platforms: ["Android", "iOS", "Web"],
    technologies: ["Kotlin", "Swift", "Node.js", "TypeScript", "APIs", "Bases de datos"],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.cmlnwilcu&hl=es_PE" }
    ],
    detailUrl: "proyectos/plataforma-multiservicio.html"
  },
  {
    slug: "automatizacion-empresarial",
    title: "Automatización empresarial",
    category: "Automatización · Integraciones",
    type: "case-study",
    featured: false,
    filters: ["automation", "enterprise"],
    shortDescription:
      "Automatización de procesos empresariales: SAP Business One, facturas, guías de remisión e integraciones con APIs.",
    image: "assets/projects/automatizacion.jpg",
    imageAlt: "Automatización de procesos empresariales e integraciones",
    platforms: ["SAP B1", "Azure", "AWS", "APIs"],
    technologies: ["SAP Business One", "Rocketbot", "Power Automate", "APIs", "Reportes"],
    links: [],
    detailUrl: "proyectos/automatizacion-empresarial.html"
  },
  {
    slug: "ia-documentos",
    title: "Procesamiento inteligente de documentos",
    category: "Inteligencia artificial",
    type: "capability",
    featured: false,
    filters: ["ai", "automation"],
    shortDescription:
      "Backends y APIs para reconocimiento de texto, clasificación y procesamiento automático de documentos empresariales.",
    image: "assets/projects/ia-documentos.jpg",
    imageAlt: "Procesamiento inteligente de documentos con IA",
    platforms: ["Backend", "APIs", "Cloud"],
    technologies: ["OCR", "Clasificación documental", "APIs", "Backend", "Automatización"],
    links: [],
    detailUrl: "proyectos/ia-documentos.html"
  },
  {
    slug: "desarrollo-software",
    title: "Desarrollo de software y soluciones digitales",
    category: "Software a medida",
    type: "capability",
    featured: false,
    filters: ["web", "mobile", "enterprise"],
    shortDescription:
      "Aplicaciones web y móviles, sistemas administrativos, backends, APIs e integraciones para distintos tipos de negocio.",
    image: "assets/projects/desarrollo-software.jpg",
    imageAlt: "Desarrollo de software y soluciones digitales a medida",
    platforms: ["Web", "Mobile", "Backend", "Cloud"],
    technologies: ["APIs", "Azure", "AWS", "Integraciones", "Reportes", "Cloud"],
    links: [
      { label: "FILO — barberos", url: "https://filobarberco.com/" }
    ],
    detailUrl: "proyectos/desarrollo-software.html"
  }
];

window.INNOTEC_PORTFOLIO_FILTERS = [
  { id: "all", label: "Todos" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "automation", label: "Automatización" },
  { id: "ai", label: "IA" },
  { id: "enterprise", label: "Enterprise" },
  { id: "mining", label: "Mining" }
];
