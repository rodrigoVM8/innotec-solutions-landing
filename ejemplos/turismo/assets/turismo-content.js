window.TURISMO_DEMO = {
  company: {
    name: "Andes Soul Lodge & Experiences",
    tagline: "Hospedaje boutique · Tours auténticos · Perú",
    phone: "+51 984 567 890",
    phoneWa: "51984567890",
    email: "reservas@andessoul.pe",
    address: "Calle Suecia 480, San Blas, Cusco",
    hours: "Atención diaria 7:00–21:00 · Reservas 24/7 por WhatsApp",
    whatsappMessage: "Hola, quiero consultar disponibilidad para una experiencia.",
    whatsappReserveMessage: "Hola, quiero reservar una habitación / tour con Andes Soul.",
    whatsappConsultPrefix: "Hola, me interesa consultar: ",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.771803574!2d-71.96746!3d-13.51643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd0277f8c6e3b%3A0x8c5e5e5e5e5e5e5e!2sCusco!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe",
    social: {
      instagram: "#",
      facebook: "#",
      tripadvisor: "#"
    }
  },
  hero: {
    headline: "Vive el Perú con alma andina",
    subtext:
      "Hospedaje boutique en Cusco y experiencias diseñadas por guías locales. Desde Machu Picchu hasta la selva: aventura, cultura y confort en un solo lugar.",
    image: "assets/images/hero.jpg",
    imageAlt: "Vista panorámica de Machu Picchu al amanecer"
  },
  experiences: [
    {
      id: "day-tours",
      title: "Tours de un día",
      description: "Machu Picchu, Valle Sagrado, Laguna Humantay y más. Salidas diarias.",
      image: "assets/images/dest-machu.jpg",
      icon: "day"
    },
    {
      id: "adventure",
      title: "Aventura",
      description: "Trekking, ciclismo de montaña, rafting y rutas off-road.",
      image: "assets/images/tour-1.jpg",
      icon: "adventure"
    },
    {
      id: "gastronomy",
      title: "Gastronomía",
      description: "Clases de cocina peruana, mercados locales y cenas andinas.",
      image: "assets/images/dest-cusco.jpg",
      icon: "food"
    },
    {
      id: "culture",
      title: "Cultura",
      description: "Comunidades vivenciales, textiles, ceremonias y arqueología.",
      image: "assets/images/gallery-3.jpg",
      icon: "culture"
    },
    {
      id: "weekend",
      title: "Escapadas de fin de semana",
      description: "Paquetes 2–3 días desde Cusco o Lima. Listos para reservar.",
      image: "assets/images/dest-paracas.jpg",
      icon: "weekend"
    }
  ],
  destinations: [
    {
      name: "Machu Picchu",
      region: "Cusco",
      image: "assets/images/dest-machu.jpg"
    },
    {
      name: "Cañón del Colca",
      region: "Arequipa",
      image: "assets/images/dest-colca.jpg"
    },
    {
      name: "Paracas & Islas Ballestas",
      region: "Ica",
      image: "assets/images/dest-paracas.jpg"
    },
    {
      name: "Amazonas peruano",
      region: "Madre de Dios",
      image: "assets/images/dest-amazon.jpg"
    },
    {
      name: "Cusco histórico",
      region: "Cusco",
      image: "assets/images/dest-cusco.jpg"
    },
    {
      name: "Lima costera",
      region: "Lima",
      image: "assets/images/dest-lima.jpg"
    }
  ],
  rooms: [
    {
      id: "suite-andina",
      name: "Suite Andina",
      capacity: "2 personas",
      services: ["Cama king", "Vista montaña", "Desayuno incluido", "WiFi"],
      price: "Desde S/ 280 / noche",
      image: "assets/images/room-1.jpg"
    },
    {
      id: "doble-tradicional",
      name: "Habitación Doble Tradicional",
      capacity: "2 personas",
      services: ["Camas dobles", "Baño privado", "Calefacción", "Té de coca"],
      price: "Desde S/ 180 / noche",
      image: "assets/images/room-2.jpg"
    },
    {
      id: "familiar-valle",
      name: "Familiar Valle Sagrado",
      capacity: "4 personas",
      services: ["2 habitaciones", "Terraza", "Desayuno", "Estacionamiento"],
      price: "Desde S/ 380 / noche",
      image: "assets/images/room-3.jpg"
    }
  ],
  itineraries: [
    {
      id: "machu-2d",
      title: "Machu Picchu Express 2D/1N",
      duration: "2 días · 1 noche",
      difficulty: "Moderada",
      price: "Desde S/ 890 por persona",
      image: "assets/images/dest-machu.jpg",
      description:
        "La experiencia esencial: tren panorámico, guía oficial y amanecer en la ciudadela inca.",
      includes: [
        "Traslados hotel–estación",
        "Tren turístico ida y vuelta",
        "Entrada a Machu Picchu",
        "Guía certificado en español/inglés",
        "1 noche en aguas calientes"
      ],
      excludes: ["Almuerzos del día 1", "Propinas", "Seguro de viaje"]
    },
    {
      id: "valle-3d",
      title: "Valle Sagrado & Cusco 3D/2N",
      duration: "3 días · 2 noches",
      difficulty: "Fácil",
      price: "Desde S/ 1,250 por persona",
      image: "assets/images/tour-2.jpg",
      description:
        "Pisaq, Ollantaytambo, Moray y city tour en Cusco. Ideal para primera visita.",
      includes: [
        "2 noches en lodge boutique",
        "Desayunos",
        "Transporte privado",
        "Guía local",
        "Entradas a sitios arqueológicos"
      ],
      excludes: ["Cena", "Boletos extras", "Bebidas"]
    },
    {
      id: "amazon-4d",
      title: "Selva Amazónica 4D/3N",
      duration: "4 días · 3 noches",
      difficulty: "Moderada",
      price: "Desde S/ 1,680 por persona",
      image: "assets/images/dest-amazon.jpg",
      description:
        "Lodge en la selva, avistamiento de fauna, caminatas nocturnas y comunidad nativa.",
      includes: [
        "Vuelo Cusco–Puerto Maldonado",
        "Lodge ecológico",
        "Todas las comidas",
        "Actividades con guía naturalista",
        "Equipo de lluvia básico"
      ],
      excludes: ["Vuelos internacionales", "Bebidas alcohólicas", "Gastos personales"]
    }
  ],
  benefits: [
    {
      title: "Atención personalizada",
      description: "Itinerarios a medida según tu tiempo, presupuesto e intereses.",
      icon: "care"
    },
    {
      title: "Guías locales certificados",
      description: "Profesionales nacidos en la región, con conocimiento profundo y pasión.",
      icon: "guide"
    },
    {
      title: "Pagos seguros",
      description: "Reserva con depósito y opciones de pago en soles o dólares.",
      icon: "secure"
    },
    {
      title: "Experiencias auténticas",
      description: "Conexión real con comunidades, naturaleza y cultura viva del Perú.",
      icon: "authentic"
    }
  ],
  gallery: [
    { image: "assets/images/gallery-1.jpg", alt: "Paisaje costero peruano" },
    { image: "assets/images/gallery-2.jpg", alt: "Selva amazónica" },
    { image: "assets/images/gallery-3.jpg", alt: "Viajeros en ruta de montaña" },
    { image: "assets/images/gallery-4.jpg", alt: "Aventura al aire libre" },
    { image: "assets/images/gallery-5.jpg", alt: "Vista urbana de Lima" },
    { image: "assets/images/gallery-6.jpg", alt: "Habitación boutique del lodge" }
  ],
  testimonials: [
    {
      quote:
        "El lodge es hermoso y el tour a Machu Picchu estuvo impecablemente organizado. Nuestro guía Wilmer hizo toda la diferencia.",
      name: "Sophie & Tom",
      role: "Viajeros de Bélgica"
    },
    {
      quote:
        "Reservamos por WhatsApp y en minutos teníamos confirmación. La habitación con vista a los Andes fue un sueño.",
      name: "Mariana P.",
      role: "Hospedaje + Valle Sagrado"
    },
    {
      quote:
        "Hicimos el paquete de 4 días a la Amazonía. Todo incluido, guías excelentes y experiencias que no olvidaremos.",
      name: "James K.",
      role: "Tour selva amazónica"
    },
    {
      quote:
        "Atención cálida, precios claros y cero sorpresas. Recomendado para quien busca Perú auténtico sin estrés.",
      name: "Lucía & Pedro",
      role: "Escapada fin de semana"
    }
  ],
  faq: [
    {
      question: "¿Cómo reservo una habitación o tour?",
      answer:
        "Escríbenos por WhatsApp, completa el formulario de consulta o envíanos un email. Confirmamos disponibilidad en menos de 24 horas."
    },
    {
      question: "¿Qué formas de pago aceptan?",
      answer:
        "Transferencia bancaria, tarjeta (Visa/Mastercard) y pago en efectivo en soles o dólares. Se requiere un depósito del 30% para confirmar."
    },
    {
      question: "¿Cuál es la mejor época para visitar Cusco?",
      answer:
        "La temporada seca (abril–octubre) ofrece cielos despejados. De noviembre a marzo hay más lluvia, pero paisajes verdes y menos turistas."
    },
    {
      question: "¿Qué debo llevar para los tours?",
      answer:
        "Ropa en capas, protector solar, gorra, botella de agua, documento de identidad y —para altura— considera unos días de aclimatación en Cusco."
    },
    {
      question: "¿Cuál es la política de cancelación?",
      answer:
        "Cancelación gratuita hasta 7 días antes. Entre 7 y 3 días: reembolso del 50%. Menos de 3 días: sujeto a condiciones del proveedor."
    },
    {
      question: "¿Los guías hablan inglés?",
      answer:
        "Sí. Todos nuestros guías principales hablan español e inglés. Otros idiomas bajo solicitud previa."
    }
  ],
  form: {
    types: ["Habitación / hospedaje", "Tour de un día", "Paquete multi-día", "Consulta general"],
    dates: ["Próximas 2 semanas", "Este mes", "Próximos 3 meses", "Fecha flexible"]
  }
};
